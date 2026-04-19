import { put } from "@vercel/blob";

/**
 * Upload a PDF to Vercel Blob.
 *
 * The file is stored in a non-guessable path (random suffix) so that the URL
 * cannot be easily enumerated. Access control must still be enforced at the
 * application layer via the /api/documents/[id]/download endpoint — this
 * function returns a URL that should only be surfaced to the owning user.
 */
export async function uploadPDF(
  filename: string,
  pdfBuffer: Buffer | Uint8Array
): Promise<string> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error("BLOB_READ_WRITE_TOKEN n'est pas configuré.");
  }

  const buf = Buffer.isBuffer(pdfBuffer) ? pdfBuffer : Buffer.from(pdfBuffer);

  // Vercel Blob currently supports only public access, but uses a random
  // 32-char suffix which makes URLs unguessable. We additionally proxy the
  // download through an authenticated route so we can revoke access server-side.
  const blob = await put(filename, buf, {
    access: "public",
    contentType: "application/pdf",
    addRandomSuffix: true,
  });

  return blob.url;
}
