import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import {
  createDocument,
  listUserDocuments,
  countUnpaidDrafts,
  MAX_UNPAID_DRAFTS_PER_USER,
} from "@/lib/db";

const MAX_TITLE_LEN = 200;
// form_data is stored verbatim as JSONB; cap it to prevent a single user
// from bloating the table with multi-MB blobs.
const MAX_FORM_DATA_BYTES = 50_000;
const VALID_TYPES = new Set([
  "statuts-sas",
  "statuts-sci",
  "cgv-ecommerce",
  "nda",
]);

export async function GET() {
  const session = await auth().catch(() => null);
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) {
    return NextResponse.json({ error: "Non authentifié." }, { status: 401 });
  }

  try {
    const docs = await listUserDocuments(userId);
    return NextResponse.json(
      { documents: docs },
      { headers: { "Cache-Control": "private, no-store" } }
    );
  } catch {
    return NextResponse.json(
      { error: "Service temporairement indisponible." },
      { status: 503 }
    );
  }
}

export async function POST(request: NextRequest) {
  const session = await auth().catch(() => null);
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) {
    return NextResponse.json({ error: "Non authentifié." }, { status: 401 });
  }

  try {
    const { type, title, formData } = await request.json();

    if (!VALID_TYPES.has(type)) {
      return NextResponse.json(
        { error: "Type de document inconnu." },
        { status: 400 }
      );
    }
    if (typeof title !== "string" || title.length === 0) {
      return NextResponse.json({ error: "Titre requis." }, { status: 400 });
    }
    const safeTitle = title.slice(0, MAX_TITLE_LEN);

    const serialized = JSON.stringify(formData || {});
    if (serialized.length > MAX_FORM_DATA_BYTES) {
      return NextResponse.json(
        { error: "Les données du formulaire dépassent la taille autorisée." },
        { status: 413 }
      );
    }

    const drafts = await countUnpaidDrafts(userId);
    if (drafts >= MAX_UNPAID_DRAFTS_PER_USER) {
      return NextResponse.json(
        {
          error: `Vous avez atteint la limite de ${MAX_UNPAID_DRAFTS_PER_USER} brouillons non payés. Finalisez ou supprimez-en avant d'en créer un nouveau.`,
        },
        { status: 429 }
      );
    }

    // Security: `paid` and `pdf_url` are NEVER trusted from client input.
    // Both are only set by the Stripe webhook after a successful payment.
    // Any incoming `paid` or `pdfUrl` in the body is silently ignored.
    const doc = await createDocument(
      userId,
      type,
      safeTitle,
      formData || {},
      null, // pdf_url — set by webhook
      false // paid — set by webhook
    );
    return NextResponse.json({ document: doc });
  } catch {
    return NextResponse.json(
      { error: "Service temporairement indisponible." },
      { status: 503 }
    );
  }
}
