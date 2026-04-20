import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDocumentDef, listDocuments } from "@/lib/document-registry";
import { getProductContent } from "@/lib/product-content";
import { SITE_URL } from "@/lib/site-url";

interface Props {
  children: React.ReactNode;
  params: Promise<{ type: string }>;
}

/**
 * Per-product metadata for the landing page at `/documents/<slug>`.
 *
 * Child route `/documents/<slug>/commencer` overrides these defaults
 * (noindex + canonical back to the landing).
 *
 * Structured data (Product, FAQPage, BreadcrumbList) is emitted inside
 * `components/ProductLandingPage.tsx` so it only appears on the SEO
 * page, not on the questionnaire subroute.
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type } = await params;
  const def = getDocumentDef(type);
  if (!def) {
    return {
      title: "Document introuvable",
      robots: { index: false, follow: false },
    };
  }

  const price = Math.round(def.priceCents / 100);
  const content = getProductContent(type);
  const description = content
    ? `${content.promise} Prix fixe : ${price} € TTC.`
    : `${def.description} Prix fixe : ${price} € TTC. Rédigé par des juristes, revu par un avocat au Barreau de Paris.`;

  const canonicalPath = `/documents/${def.type}`;
  const absoluteUrl = `${SITE_URL}${canonicalPath}`;

  return {
    title: def.label,
    description,
    alternates: { canonical: canonicalPath },
    openGraph: {
      url: absoluteUrl,
      title: `${def.label} | QuickLegal`,
      description,
    },
    twitter: {
      title: `${def.label} — ${price} € TTC`,
      description,
    },
  };
}

/**
 * Pre-render every product landing page as static HTML. 13 pages, built
 * at deploy time — Googlebot sees a full HTML response with zero SSR
 * overhead.
 */
export function generateStaticParams() {
  return listDocuments().map((d) => ({ type: d.type }));
}

export default async function DocumentLayout({ children, params }: Props) {
  const { type } = await params;
  if (!getDocumentDef(type)) notFound();
  return <>{children}</>;
}
