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
  is_admin: boolean;
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
  price_cents: number | null;
  stripe_session_id: string | null;
  created_at: string;
}

export interface AdminUserRow extends UserRow {
  doc_count: number;
  paid_count: number;
  total_cents: number;
}

export interface AdminDocumentRow extends DocumentRow {
  user_email: string;
  user_name: string | null;
}

export interface AdminStats {
  total_users: number;
  total_admins: number;
  total_documents: number;
  paid_documents: number;
  total_revenue_cents: number;
  documents_last_30d: number;
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

// Maximum rows returned by listUserDocuments. Older documents remain in the
// database; they are not exposed via this endpoint but remain available to
// admins. Keeps payload bounded and protects against self-inflicted DoS.
export const USER_DOCUMENTS_LIMIT = 100;

// Maximum concurrent unpaid drafts a user can accumulate. Prevents a single
// authenticated user from flooding the documents table.
export const MAX_UNPAID_DRAFTS_PER_USER = 50;

export async function listUserDocuments(userId: string): Promise<DocumentRow[]> {
  const sql = getSql();
  const rows = (await sql`
    SELECT * FROM documents
    WHERE user_id = ${userId}
    ORDER BY created_at DESC
    LIMIT ${USER_DOCUMENTS_LIMIT}
  `) as DocumentRow[];
  return rows;
}

export async function countUnpaidDrafts(userId: string): Promise<number> {
  const sql = getSql();
  const rows = (await sql`
    SELECT COUNT(*)::int AS n FROM documents
    WHERE user_id = ${userId} AND (paid = FALSE OR paid IS NULL)
  `) as { n: number }[];
  return rows[0]?.n ?? 0;
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

/**
 * Admin-only: fetch any document by id regardless of owner, for SAV.
 * Callers MUST check isAdmin before using this.
 */
export async function getDocumentAsAdmin(
  id: string
): Promise<DocumentRow | null> {
  const sql = getSql();
  const rows = (await sql`
    SELECT * FROM documents
    WHERE id = ${id}
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
  paid: boolean = false,
  priceCents: number | null = null,
  stripeSessionId: string | null = null
): Promise<DocumentRow> {
  const sql = getSql();
  const rows = (await sql`
    INSERT INTO documents (user_id, type, title, form_data, pdf_url, paid, price_cents, stripe_session_id)
    VALUES (${userId}, ${type}, ${title}, ${JSON.stringify(formData)}, ${pdfUrl}, ${paid}, ${priceCents}, ${stripeSessionId})
    RETURNING *
  `) as DocumentRow[];
  return rows[0];
}

/**
 * Mark the most recent unpaid document of the given type for this user as
 * paid. Idempotent on stripe_session_id so webhook retries are safe.
 * Returns the document that was marked paid (or null if none matched).
 */
export async function markDocumentPaid(
  userId: string,
  type: DocumentRow["type"],
  stripeSessionId: string,
  priceCents: number | null
): Promise<DocumentRow | null> {
  const sql = getSql();
  const rows = (await sql`
    UPDATE documents
    SET paid = TRUE,
        price_cents = ${priceCents},
        stripe_session_id = ${stripeSessionId}
    WHERE id = (
      SELECT id FROM documents
      WHERE user_id = ${userId}
        AND type = ${type}
        AND (paid = FALSE OR paid IS NULL)
        AND (stripe_session_id IS NULL OR stripe_session_id = ${stripeSessionId})
      ORDER BY created_at DESC
      LIMIT 1
    )
    RETURNING *
  `) as DocumentRow[];
  return rows[0] || null;
}

/**
 * Finalize a document payment by id: set paid=true, store the Blob URL of the
 * generated PDF, and record the Stripe session & amount. Only the Stripe
 * webhook should call this — it looks the document up by id from the session
 * metadata. Idempotent on stripe_session_id.
 */
export async function finalizeDocumentPayment(
  docId: string,
  stripeSessionId: string,
  priceCents: number | null,
  pdfUrl: string
): Promise<DocumentRow | null> {
  const sql = getSql();
  const rows = (await sql`
    UPDATE documents
    SET paid = TRUE,
        price_cents = ${priceCents},
        stripe_session_id = ${stripeSessionId},
        pdf_url = ${pdfUrl}
    WHERE id = ${docId}
      AND (stripe_session_id IS NULL OR stripe_session_id = ${stripeSessionId})
    RETURNING *
  `) as DocumentRow[];
  return rows[0] || null;
}

// ===== Admin queries =====
export async function listAllUsersWithStats(): Promise<AdminUserRow[]> {
  const sql = getSql();
  const rows = (await sql`
    SELECT
      u.*,
      COALESCE(COUNT(d.id), 0)::int AS doc_count,
      COALESCE(SUM(CASE WHEN d.paid THEN 1 ELSE 0 END), 0)::int AS paid_count,
      COALESCE(SUM(CASE WHEN d.paid THEN d.price_cents ELSE 0 END), 0)::int AS total_cents
    FROM users u
    LEFT JOIN documents d ON d.user_id = u.id
    GROUP BY u.id
    ORDER BY u.created_at DESC
  `) as AdminUserRow[];
  return rows;
}

export async function listAllDocumentsWithUser(): Promise<AdminDocumentRow[]> {
  const sql = getSql();
  const rows = (await sql`
    SELECT
      d.*,
      u.email AS user_email,
      u.name AS user_name
    FROM documents d
    JOIN users u ON u.id = d.user_id
    ORDER BY d.created_at DESC
    LIMIT 500
  `) as AdminDocumentRow[];
  return rows;
}

export async function getAdminStats(): Promise<AdminStats> {
  const sql = getSql();
  const rows = (await sql`
    SELECT
      (SELECT COUNT(*)::int FROM users) AS total_users,
      (SELECT COUNT(*)::int FROM users WHERE is_admin) AS total_admins,
      (SELECT COUNT(*)::int FROM documents) AS total_documents,
      (SELECT COUNT(*)::int FROM documents WHERE paid) AS paid_documents,
      COALESCE((SELECT SUM(price_cents)::int FROM documents WHERE paid), 0) AS total_revenue_cents,
      (SELECT COUNT(*)::int FROM documents WHERE created_at > NOW() - INTERVAL '30 days') AS documents_last_30d
  `) as AdminStats[];
  return rows[0];
}
