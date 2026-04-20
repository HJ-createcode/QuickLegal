import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL } from "@/lib/site-url";
import {
  GUIDES,
  GUIDE_FAMILY_LABELS,
  getGuidesByFamily,
  type GuideFamily,
} from "@/lib/guides-registry";

export const metadata: Metadata = {
  title: "Guides QuickLegal",
  description:
    "Choisir la bonne forme de société, comparer les régimes fiscaux, comprendre les obligations d'un site e-commerce : nos guides pour décider avant de générer un document.",
  alternates: { canonical: "/guides" },
  openGraph: {
    url: `${SITE_URL}/guides`,
    title: "Guides QuickLegal — comparer, décider, rédiger",
    description:
      "Comparatifs et guides pratiques pour choisir la bonne structure, le bon régime et le bon document juridique avant de passer à l'action.",
  },
};

const FAMILY_ORDER: GuideFamily[] = [
  "statuts",
  "gouvernance",
  "commercial",
  "conformite",
  "transverse",
];

export default function GuidesHubPage() {
  const grouped = getGuidesByFamily();

  return (
    <main>
      <SiteNav />

      <section className="pt-36 pb-12 px-6 bg-gradient-to-b from-sky-50 via-white to-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto text-center">
          <nav
            aria-label="Fil d'Ariane"
            className="text-xs text-slate-500 mb-6"
          >
            <ol className="inline-flex items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-slate-900">
                  Accueil
                </Link>
              </li>
              <li aria-hidden="true">›</li>
              <li className="text-slate-700">Guides</li>
            </ol>
          </nav>
          <p className="text-blue-500 text-sm font-semibold uppercase tracking-widest mb-3">
            Comprendre, comparer, décider
          </p>
          <h1 className="font-serif text-5xl sm:text-6xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.05]">
            Guides QuickLegal
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Des repères courts pour choisir la bonne forme, le bon régime
            fiscal ou le bon document. Chaque guide renvoie vers le
            questionnaire correspondant lorsque vous avez tranché.
          </p>
        </div>
      </section>

      <section className="py-14 px-6">
        <div className="max-w-6xl mx-auto space-y-14">
          {FAMILY_ORDER.map((family) => {
            const guides = grouped[family];
            if (!guides || guides.length === 0) return null;
            return (
              <div key={family}>
                <h2 className="font-serif text-2xl font-bold text-slate-900 mb-6">
                  {GUIDE_FAMILY_LABELS[family]}
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {guides.map((guide) => (
                    <Link
                      key={guide.slug}
                      href={`/guides/${guide.slug}`}
                      className="block p-6 rounded-2xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-premium transition"
                    >
                      <p className="text-blue-500 text-xs font-semibold uppercase tracking-wider mb-2">
                        {guide.eyebrow}
                      </p>
                      <h3 className="font-serif text-lg font-semibold text-slate-900 mb-2">
                        {guide.title}
                      </h3>
                      <p className="text-slate-500 text-sm leading-relaxed">
                        {guide.summary}
                      </p>
                      <p className="text-blue-500 text-sm font-medium mt-3">
                        Lire le guide →
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="py-14 px-6 bg-slate-50/60 border-t border-slate-100">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl font-bold text-slate-900 mb-4">
            Déjà décidé ?
          </h2>
          <p className="text-slate-600 mb-8 leading-relaxed">
            Accédez directement au catalogue des 13 documents générables en
            10 minutes, à prix fixe.
          </p>
          <Link
            href="/generation-document"
            className="inline-block px-8 py-3.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold text-base shadow-lg shadow-blue-500/20"
          >
            Voir le catalogue complet
          </Link>
        </div>
      </section>

      <SiteFooter />

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
              name: "Guides",
              item: `${SITE_URL}/guides`,
            },
          ],
        }}
      />

      <JsonLd
        id="ld-collection"
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Guides QuickLegal",
          url: `${SITE_URL}/guides`,
          inLanguage: "fr-FR",
          mainEntity: {
            "@type": "ItemList",
            itemListElement: GUIDES.map((g, idx) => ({
              "@type": "ListItem",
              position: idx + 1,
              url: `${SITE_URL}/guides/${g.slug}`,
              name: g.title,
            })),
          },
        }}
      />
    </main>
  );
}
