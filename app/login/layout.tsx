import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connexion",
  description:
    "Connectez-vous à votre espace QuickLegal pour retrouver vos documents, en télécharger de nouveaux et suivre vos paiements.",
  alternates: { canonical: "/login" },
  openGraph: {
    title: "Connexion | QuickLegal",
    description: "Accédez à votre espace QuickLegal.",
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
