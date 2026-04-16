import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;

  if (!stripeKey) {
    return NextResponse.json(
      {
        error: "Stripe non configure. Utilisez le mode demo pour tester la generation PDF.",
        demo: true,
      },
      { status: 503 }
    );
  }

  try {
    const { formData } = await request.json();
    const stripe = require("stripe")(stripeKey);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: `Statuts SAS — ${formData.denomination}`,
              description: "Statuts de Societe par Actions Simplifiee generes par QuickLegal",
            },
            unit_amount: 7900, // 79.00 EUR
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${request.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}/documents/statuts-sas`,
      metadata: {
        document_type: "statuts-sas",
        denomination: formData.denomination,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la creation de la session de paiement." },
      { status: 500 }
    );
  }
}
