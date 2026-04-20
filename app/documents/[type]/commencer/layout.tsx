import type { Metadata } from "next";
import { getDocumentDef } from "@/lib/document-registry";
import { SITE_URL } from "@/lib/site-url";

interface Props {
  children: React.ReactNode;
  params: Promise<{ type: string }>;
}

/**
 * Per-questionnaire metadata.
 *
 * The landing page at `/documents/[type]` is the indexable, canonical
 * version of the product. This subroute is a transactional form — we
 * mark it `noindex, nofollow` and set its canonical to the parent
 * landing page so any inbound link ranks the right URL.
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type } = await params;
  const def = getDocumentDef(type);
  if (!def) {
    return { title: "Document introuvable", robots: { index: false, follow: false } };
  }
  return {
    title: `Questionnaire ${def.label}`,
    description: `Questionnaire QuickLegal pour générer votre ${def.label.toLowerCase()}.`,
    alternates: { canonical: `${SITE_URL}/documents/${def.type}` },
    robots: { index: false, follow: false },
  };
}

export default async function StartLayout({ children }: Props) {
  return <>{children}</>;
}
