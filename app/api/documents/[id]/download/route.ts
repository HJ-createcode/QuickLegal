import { NextResponse, type NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { getDocument, getDocumentAsAdmin } from "@/lib/db";

interface RouteContext {
  params: Promise<{ id: string }>;
}

// Only allow fetching PDFs from the official Vercel Blob public storage hosts.
// This is a hard allowlist — any other host (including internal IPs, localhost,
// loopback, or arbitrary attacker domains) is rejected to prevent SSRF.
const ALLOWED_BLOB_HOST_SUFFIX = ".public.blob.vercel-storage.com";

// Hard cap on PDF size to prevent memory / bandwidth exhaustion.
const MAX_PDF_BYTES = 25 * 1024 * 1024; // 25 MB
const UPSTREAM_TIMEOUT_MS = 15_000;

function isAllowedBlobUrl(raw: string): boolean {
  try {
    const url = new URL(raw);
    if (url.protocol !== "https:") return false;
    if (!url.hostname.endsWith(ALLOWED_BLOB_HOST_SUFFIX)) return false;
    return true;
  } catch {
    return false;
  }
}

/**
 * Authenticated download of a paid document PDF.
 *
 * Flow:
 *  1. Require a logged-in user.
 *  2. Verify the document belongs to that user (getDocument scopes by user_id).
 *  3. Validate the stored pdf_url is on the Vercel Blob allowlist (anti-SSRF).
 *  4. Fetch with redirect: "error" and a hard timeout, cap body size.
 *  5. Stream the PDF back through our origin (never expose the raw Blob URL).
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
    // Regular users can only access their own documents. Admins can access any
    // document, for customer-support purposes.
    const doc = sessionUser.isAdmin
      ? await getDocumentAsAdmin(id)
      : await getDocument(id, sessionUser.id);

    if (!doc) {
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

    // SSRF hard stop: refuse anything that isn't an official Vercel Blob URL.
    if (!isAllowedBlobUrl(doc.pdf_url)) {
      return NextResponse.json(
        { error: "URL de stockage invalide." },
        { status: 400 }
      );
    }

    // Fetch upstream with strict options: no redirects, timeout, limited body.
    const upstream = await fetch(doc.pdf_url, {
      redirect: "error",
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    });

    if (!upstream.ok || !upstream.body) {
      return NextResponse.json(
        { error: "Impossible de récupérer le fichier." },
        { status: 502 }
      );
    }

    // Stream with size cap: abort if upstream sends more than MAX_PDF_BYTES.
    let received = 0;
    const capped = new ReadableStream<Uint8Array>({
      async start(controller) {
        const reader = upstream.body!.getReader();
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            received += value.byteLength;
            if (received > MAX_PDF_BYTES) {
              controller.error(new Error("size cap exceeded"));
              await reader.cancel();
              return;
            }
            controller.enqueue(value);
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    const safeTypeSegment = doc.type.replace(/[^a-z0-9-]/gi, "");
    const safeName = doc.title.slice(0, 60).replace(/[^a-zA-Z0-9]/g, "_");
    const filename = `${safeTypeSegment}-${safeName}.pdf`;

    return new NextResponse(capped, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"; filename*=UTF-8''${encodeURIComponent(filename)}`,
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
