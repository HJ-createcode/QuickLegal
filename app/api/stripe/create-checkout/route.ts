import { NextRequest, NextResponse } from "next/server";

const PRICES: Record<string, { amount: number; label: string }> = {
  "statuts-sas": { amount: 7900, label: "Statuts de SAS" },
  "statuts-sci": { amount: 8900, label: "Statuts de SCI" },
  "cgv-ecommerce": { amount: 4900, label: "CGV E-commerce" },
  nda: { amount: 3900, label: "Accord de confidentialité (NDA)" },
};

export async function POST(request: NextRequest) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;

  if (!stripeKey) {
    return NextResponse.json(
      {
        error:
          "Stripe non configuré. Utilisez le mode démo pour tester la génération PDF.",
        demo: true,
      },
      { status: 503 }
    );
  }

  try {
    const { type, formData } = await request.json();

    if (!type || !PRICES[type as string]) {
      return NextResponse.json(
        { error: "Type de document inconnu." },
        { status: 400 }
      );
    }

    const priceInfo = PRICES[type as string];
    const title =
      (formData?.denomination as string) ||
      (formData?.partie_a_nom as string) ||
      priceInfo.label;

    // Dynamic import to avoid requiring Stripe at build time when unused
    const StripeLib = (await import("stripe")).default;
    const stripe = new StripeLib(stripeKey);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: `${priceInfo.label} — ${title}`,
              description: "Document juridique généré par QuickLegal",
            },
            unit_amount: priceInfo.amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${request.nextUrl.origin}/success?type=${encodeURIComponent(type)}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}/documents/${type}`,
      metadata: {
        document_type: type,
        title,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création de la session de paiement." },
      { status: 500 }
    );
  }
}
