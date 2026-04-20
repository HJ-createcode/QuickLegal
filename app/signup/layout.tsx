import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Créer un compte",
  description:
    "Créez votre compte QuickLegal pour générer vos documents juridiques en 10 minutes. Sans abonnement, vous ne payez que les documents générés.",
  alternates: { canonical: "/signup" },
  openGraph: {
    title: "Créer un compte | QuickLegal",
    description: "Démarrez en moins d'une minute, sans abonnement.",
  },
};

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
