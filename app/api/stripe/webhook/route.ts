import { NextResponse, type NextRequest } from "next/server";
import {
  finalizeDocumentPayment,
  getDocumentAsAdmin,
  markDocumentPaid,
  type DocumentRow,
} from "@/lib/db";
import { generatePDF } from "@/lib/pdf-generator";
import { uploadPDF } from "@/lib/blob";
import { isValidDocumentType } from "@/lib/document-registry";

/**
 * Stripe webhook handler.
 *
 * Configure in Vercel:
 *   STRIPE_WEBHOOK_SECRET = whsec_... (from Stripe Dashboard > Developers > Webhooks)
 *
 * And create a webhook endpoint in Stripe pointing to:
 *   https://<your-domain>/api/stripe/webhook
 * listening on the event:
 *   checkout.session.completed
 *
 * This route is the ONLY place `paid = true` and `pdf_url` can be set on a
 * document. The client never controls payment state.
 *
 * Flow on checkout.session.completed:
 *   1. Verify Stripe signature against raw bytes.
 *   2. Load the draft document by id from session metadata.
 *   3. Generate the final PDF WITHOUT watermark from the stored form_data.
 *   4. Upload to Vercel Blob.
 *   5. Atomically set paid=true, pdf_url=<blob>, price_cents, stripe_session_id.
 */

// Webhook bodies must be verified against the raw bytes, so we disable the
// default JSON parser and read the raw text.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function sanitizeSlug(s: string): string {
  return s.slice(0, 60).replace(/[^a-zA-Z0-9]/g, "_") || "document";
}

export async function POST(request: NextRequest) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const blobToken = process.env.BLOB_READ_WRITE_TOKEN;

  if (!stripeKey || !webhookSecret) {
    return NextResponse.json(
      { error: "Webhook Stripe non configuré." },
      { status: 503 }
    );
  }

  // If Blob storage is missing, the finalization step will fail mid-flow,
  // leaving Stripe to retry for days without the customer getting their PDF.
  // Fail fast with a 503 so the misconfiguration is visible in Stripe's
  // dashboard and caught before the signature check consumes the body.
  if (!blobToken) {
    return NextResponse.json(
      { error: "Stockage Blob non configuré." },
      { status: 503 }
    );
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json(
      { error: "Signature manquante." },
      { status: 400 }
    );
  }

  const rawBody = await request.text();

  const StripeLib = (await import("stripe")).default;
  const stripe = new StripeLib(stripeKey);

  let event: import("stripe").Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch {
    return NextResponse.json(
      { error: "Signature invalide." },
      { status: 400 }
    );
  }

  if (event.type !== "checkout.session.completed") {
    // We only act on completed checkouts. Return 200 so Stripe doesn't retry.
    return NextResponse.json({ ok: true, ignored: event.type });
  }

  const session = event.data.object;
  const metadata = (session.metadata || {}) as Record<string, string>;
  const userId = metadata.user_id;
  const documentType = metadata.document_type;
  const documentId = metadata.document_id;
  const amountCents = session.amount_total ?? null;
  const stripeSessionId = session.id;

  if (!userId || !documentType) {
    return NextResponse.json({ ok: true, skipped: "missing metadata" });
  }

  if (!isValidDocumentType(documentType)) {
    return NextResponse.json({ ok: true, skipped: "invalid type" });
  }

  // Legacy fallback: older checkouts didn't include document_id. Mark paid on
  // the most recent matching draft without touching pdf_url.
  if (!documentId) {
    try {
      await markDocumentPaid(
        userId,
        documentType as DocumentRow["type"],
        stripeSessionId,
        amountCents
      );
    } catch {
      return NextResponse.json({ error: "db" }, { status: 500 });
    }
    return NextResponse.json({ ok: true, legacy: true });
  }

  // Load the draft. Using the admin-scoped lookup because the webhook is
  // system-level (no session cookie), but we still verify it belongs to the
  // userId recorded in the Stripe metadata.
  const draft = await getDocumentAsAdmin(documentId);
  if (!draft) {
    return NextResponse.json({ ok: true, skipped: "draft not found" });
  }
  if (draft.user_id !== userId) {
    return NextResponse.json({ ok: true, skipped: "user mismatch" });
  }

  // Idempotency: if already finalized with this session id, no-op.
  if (draft.paid && draft.pdf_url && draft.stripe_session_id === stripeSessionId) {
    return NextResponse.json({ ok: true, idempotent: true });
  }

  // Generate the final PDF (no watermark) and upload to Blob.
  let pdfUrl: string;
  try {
    const pdfBuffer = generatePDF(draft.type, draft.form_data, {
      watermark: false,
    });
    const filename = `${draft.type}-${sanitizeSlug(draft.title)}.pdf`;
    pdfUrl = await uploadPDF(filename, pdfBuffer);
  } catch {
    // Returning 500 causes Stripe to retry the webhook, which is desirable
    // for transient Blob outages.
    return NextResponse.json(
      { error: "Generation / upload failed." },
      { status: 500 }
    );
  }

  try {
    await finalizeDocumentPayment(
      documentId,
      stripeSessionId,
      amountCents,
      pdfUrl
    );
  } catch {
    return NextResponse.json({ error: "db" }, { status: 500 });
  }

  return NextResponse.json({ ok: true, document_id: documentId });
}
