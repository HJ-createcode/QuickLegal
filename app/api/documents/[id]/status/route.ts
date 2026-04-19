import { NextResponse, type NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { getDocument } from "@/lib/db";

interface RouteContext {
  params: Promise<{ id: string }>;
}

/**
 * Lightweight status endpoint for the post-checkout polling loop.
 *
 * Returns only the fields the client needs to decide whether to offer the
 * download: paid flag and whether the server has stored pdf_url. We never
 * expose the raw Blob URL — the client downloads through /download which
 * streams the file through our origin.
 */
export async function GET(_request: NextRequest, context: RouteContext) {
  const session = await auth().catch(() => null);
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) {
    return NextResponse.json({ error: "Non authentifié." }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    const doc = await getDocument(id, userId);
    if (!doc) {
      return NextResponse.json({ error: "Introuvable." }, { status: 404 });
    }
    return NextResponse.json(
      {
        id: doc.id,
        type: doc.type,
        title: doc.title,
        paid: doc.paid,
        ready: !!doc.pdf_url,
      },
      { headers: { "Cache-Control": "private, no-store" } }
    );
  } catch {
    return NextResponse.json(
      { error: "Service temporairement indisponible." },
      { status: 503 }
    );
  }
}
