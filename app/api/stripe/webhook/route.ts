import { NextResponse, type NextRequest } from "next/server";
import { markDocumentPaid, type DocumentRow } from "@/lib/db";

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
 * This route is the ONLY place `paid = true` can be set on a document.
 * The client never controls payment state.
 */

// Webhook bodies must be verified against the raw bytes, so we disable the
// default JSON parser and read the raw text.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripeKey || !webhookSecret) {
    return NextResponse.json(
      { error: "Webhook Stripe non configuré." },
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
  const title = metadata.title || "Document";
  const amountCents = session.amount_total ?? null;
  const stripeSessionId = session.id;

  if (!userId || !documentType) {
    // Not enough metadata to associate the payment to a document row.
    return NextResponse.json({ ok: true, skipped: "missing metadata" });
  }

  try {
    // Idempotent: markDocumentPaid looks up the most recent matching doc and
    // is safe against Stripe webhook retries (keyed on stripe_session_id).
    await markDocumentPaid(
      userId,
      documentType as DocumentRow["type"],
      stripeSessionId,
      amountCents
    );
  } catch {
    return NextResponse.json(
      { error: "Erreur base de données." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, session: stripeSessionId, title });
}
