import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

let _sql: NeonQueryFunction<false, false> | null = null;

function getSql(): NeonQueryFunction<false, false> {
  if (_sql) return _sql;
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error(
      "Base de données non configurée. Ajoutez DATABASE_URL dans vos variables d'environnement (via Vercel Storage > Neon)."
    );
  }
  _sql = neon(connectionString);
  return _sql;
}

// ===== Types =====
export interface UserRow {
  id: string;
  email: string;
  password_hash: string;
  name: string | null;
  created_at: string;
}

export interface DocumentRow {
  id: string;
  user_id: string;
  type: "statuts-sas" | "statuts-sci" | "cgv-ecommerce" | "nda";
  title: string;
  form_data: Record<string, unknown>;
  pdf_url: string | null;
  paid: boolean;
  created_at: string;
}

// ===== Queries =====
export async function getUserByEmail(email: string): Promise<UserRow | null> {
  const sql = getSql();
  const rows = (await sql`SELECT * FROM users WHERE email = ${email} LIMIT 1`) as UserRow[];
  return rows[0] || null;
}

export async function getUserById(id: string): Promise<UserRow | null> {
  const sql = getSql();
  const rows = (await sql`SELECT * FROM users WHERE id = ${id} LIMIT 1`) as UserRow[];
  return rows[0] || null;
}

export async function createUser(
  email: string,
  passwordHash: string,
  name: string | null
) {
  const sql = getSql();
  const rows = (await sql`
    INSERT INTO users (email, password_hash, name)
    VALUES (${email}, ${passwordHash}, ${name})
    RETURNING *
  `) as UserRow[];
  return rows[0];
}

export async function listUserDocuments(userId: string): Promise<DocumentRow[]> {
  const sql = getSql();
  const rows = (await sql`
    SELECT * FROM documents
    WHERE user_id = ${userId}
    ORDER BY created_at DESC
  `) as DocumentRow[];
  return rows;
}

export async function getDocument(
  id: string,
  userId: string
): Promise<DocumentRow | null> {
  const sql = getSql();
  const rows = (await sql`
    SELECT * FROM documents
    WHERE id = ${id} AND user_id = ${userId}
    LIMIT 1
  `) as DocumentRow[];
  return rows[0] || null;
}

export async function createDocument(
  userId: string,
  type: DocumentRow["type"],
  title: string,
  formData: Record<string, unknown>,
  pdfUrl: string | null = null,
  paid: boolean = false
): Promise<DocumentRow> {
  const sql = getSql();
  const rows = (await sql`
    INSERT INTO documents (user_id, type, title, form_data, pdf_url, paid)
    VALUES (${userId}, ${type}, ${title}, ${JSON.stringify(formData)}, ${pdfUrl}, ${paid})
    RETURNING *
  `) as DocumentRow[];
  return rows[0];
}
