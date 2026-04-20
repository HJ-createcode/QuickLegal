import type { Metadata } from "next";

/**
 * Post-payment landing page. Transactional and user-specific (contains a
 * doc_id bound to a Stripe session). Never useful in search results.
 */
export const metadata: Metadata = {
  title: "Paiement confirmé",
  robots: { index: false, follow: false },
};

export default function SuccessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
