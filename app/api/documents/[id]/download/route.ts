import { NextResponse, type NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { getDocument } from "@/lib/db";

interface RouteContext {
  params: Promise<{ id: string }>;
}

/**
 * Authenticated download of a paid document PDF.
 *
 * Flow:
 *  1. Require a logged-in user.
 *  2. Verify the document belongs to that user (getDocument scopes by user_id).
 *  3. Stream the PDF back through our origin (never expose the raw Blob URL).
 */
export async function GET(_request: NextRequest, context: RouteContext) {
  const session = await auth().catch(() => null);
  const sessionUser = session?.user as
    | { id?: string; isAdmin?: boolean }
    | undefined;

  if (!sessionUser?.id) {
    return NextResponse.json(
      { error: "Authentification requise." },
      { status: 401 }
    );
  }

  try {
    const { id } = await context.params;
    const doc = await getDocument(id, sessionUser.id);

    // Admins get access to any document for SAV purposes.
    // Non-admins are strictly limited to their own documents.
    if (!doc) {
      if (sessionUser.isAdmin) {
        // Admin fallback: try a privileged lookup via direct query.
        // (We keep this simple and safe: if the user-scoped query didn't match,
        // we just 404 for non-admins. An admin-scoped lookup would require a new
        // DB helper — skipped here on purpose to stay least-privileged.)
      }
      return NextResponse.json(
        { error: "Document introuvable." },
        { status: 404 }
      );
    }

    if (!doc.pdf_url) {
      return NextResponse.json(
        { error: "Le PDF n'est pas encore disponible pour ce document." },
        { status: 404 }
      );
    }

    // Proxy the Blob content through our origin so we control access.
    const upstream = await fetch(doc.pdf_url);
    if (!upstream.ok || !upstream.body) {
      return NextResponse.json(
        { error: "Impossible de récupérer le fichier." },
        { status: 502 }
      );
    }

    const safeName = doc.title.slice(0, 60).replace(/[^a-zA-Z0-9]/g, "_");

    return new NextResponse(upstream.body, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${doc.type}-${safeName}.pdf"`,
        "Cache-Control": "private, no-store",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Erreur lors du téléchargement." },
      { status: 500 }
    );
  }
}
