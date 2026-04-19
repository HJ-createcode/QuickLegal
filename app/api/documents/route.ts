import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createDocument, listUserDocuments } from "@/lib/db";

const MAX_TITLE_LEN = 200;
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
    return NextResponse.json({ documents: docs });
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
