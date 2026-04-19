import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

const PRICES: Record<string, { amount: number; label: string }> = {
  "statuts-sas": { amount: 7900, label: "Statuts de SAS" },
  "statuts-sci": { amount: 8900, label: "Statuts de SCI" },
  "cgv-ecommerce": { amount: 4900, label: "CGV E-commerce" },
  nda: { amount: 3900, label: "Accord de confidentialité (NDA)" },
};

export async function POST(request: NextRequest) {
  // --- Authentication required ---
  const session = await auth().catch(() => null);
  const user = session?.user as { id?: string; email?: string } | undefined;
  if (!user?.id) {
    return NextResponse.json(
      { error: "Authentification requise." },
      { status: 401 }
    );
  }

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
    const rawTitle =
      (formData?.denomination as string) ||
      (formData?.partie_a_nom as string) ||
      priceInfo.label;
    const title = String(rawTitle).slice(0, 120);

    const StripeLib = (await import("stripe")).default;
    const stripe = new StripeLib(stripeKey);

    // Prefer a pinned app URL (defense in depth against spoofed Host headers
    // on non-Vercel deployments). Fall back to the request origin.
    const appUrl = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") || request.nextUrl.origin;

    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: user.email,
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
      success_url: `${appUrl}/success?type=${encodeURIComponent(type)}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/documents/${type}`,
      metadata: {
        document_type: type,
        title,
        user_id: user.id,
      },
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch {
    return NextResponse.json(
      { error: "Erreur lors de la création de la session de paiement." },
      { status: 500 }
    );
  }
}
