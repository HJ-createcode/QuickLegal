import { put } from "@vercel/blob";

export async function uploadPDF(
  filename: string,
  pdfBuffer: Buffer | Uint8Array
): Promise<string> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error("BLOB_READ_WRITE_TOKEN n'est pas configuré.");
  }

  const buf = Buffer.isBuffer(pdfBuffer) ? pdfBuffer : Buffer.from(pdfBuffer);
  const blob = await put(filename, buf, {
    access: "public",
    contentType: "application/pdf",
  });

  return blob.url;
}
