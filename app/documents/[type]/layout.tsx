import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { getDocumentDef, listDocuments } from "@/lib/document-registry";
import { SITE_URL } from "@/lib/site-url";

interface Props {
  children: React.ReactNode;
  params: Promise<{ type: string }>;
}

/**
 * Per-product metadata + structured data.
 *
 * The page component (page.tsx) is a Client Component because the Wizard
 * needs useState/useEffect. We keep this layout as a Server Component so
 * we can:
 *   - emit `export async function generateMetadata` per slug
 *   - inject BreadcrumbList JSON-LD pre-hydration (no layout shift)
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
  const description = `${def.description} Prix fixe : ${price} € TTC. Rédigé par des juristes, revu par un avocat au Barreau de Paris. Généré en quelques minutes.`;
  const canonical = `/documents/${def.type}`;
  const absoluteUrl = `${SITE_URL}${canonical}`;

  return {
    title: def.label,
    description,
    alternates: { canonical },
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
 * Pre-compute the list of slugs at build time so static metadata generation
 * can resolve synchronously. Dynamic routes work without this but we keep
 * a stable list in case we move to `dynamic = "force-static"` later.
 */
export function generateStaticParams() {
  return listDocuments().map((d) => ({ type: d.type }));
}

export default async function DocumentLayout({ children, params }: Props) {
  const { type } = await params;
  const def = getDocumentDef(type);
  if (!def) notFound();

  const canonical = `${SITE_URL}/documents/${def.type}`;

  return (
    <>
      {children}

      {/* Breadcrumb : Accueil > Génération > Document */}
      <JsonLd
        id="ld-breadcrumb"
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Accueil",
              item: `${SITE_URL}/`,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Génération de document",
              item: `${SITE_URL}/generation-document`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: def.label,
              item: canonical,
            },
          ],
        }}
      />
    </>
  );
}
