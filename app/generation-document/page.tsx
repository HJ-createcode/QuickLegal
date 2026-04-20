import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL } from "@/lib/site-url";
import {
  CATEGORY_LABELS,
  listByCategory,
  listDocuments,
  type DocumentCategory,
  type DocumentDefinition,
} from "@/lib/document-registry";
import { CATEGORY_CONTENT } from "@/lib/category-content";
import { getCatalogPriceRange } from "@/lib/site-facts";

export const metadata: Metadata = {
  title: "Catalogue des documents juridiques",
  description:
    "Tout le catalogue QuickLegal, rangé par famille : création de société, gouvernance & vie sociale, contrats commerciaux, conformité & mentions légales. Modèles rédigés par des juristes, à prix fixe.",
  alternates: { canonical: "/generation-document" },
  openGraph: {
    url: `${SITE_URL}/generation-document`,
    title: "Catalogue des documents juridiques | QuickLegal",
    description:
      "Statuts, PV d'assemblée, CGV, NDA, mentions légales, CGU et plus. Chaque modèle à prix fixe.",
  },
};

const CATEGORY_ORDER: DocumentCategory[] = [
  "statuts",
  "gouvernance",
  "commercial",
  "conformite",
];

const CATALOG_FAQS = [
  {
    question: "Comment choisir le bon document dans le catalogue ?",
    answer:
      "Chaque page produit décrit précisément le périmètre du modèle, les cas d'usage et les erreurs fréquentes. Si plusieurs documents couvrent des besoins proches (par exemple CGV e-commerce et CGU), les pages dédiées comparent clairement leurs apports respectifs.",
  },
  {
    question: "Tous les prix sont-ils affichés ?",
    answer:
      "Oui. Chaque document est facturé à un prix fixe TTC indiqué sur sa carte et sur sa page produit. Pas d'abonnement, pas de frais cachés, pas de supplément au paiement.",
  },
  {
    question: "Puis-je générer plusieurs fois le même document ?",
    answer:
      "Oui. Chaque génération crée une version personnalisée conservée dans votre espace. Vous pouvez régénérer une variante (nouveau siège, nouvel associé…) à tout moment, au même prix à l'acte.",
  },
  {
    question: "Le catalogue évolue-t-il ?",
    answer:
      "Oui. Nous ajoutons régulièrement de nouveaux modèles, prioritairement sur les demandes récurrentes des utilisateurs. Les pages déjà en ligne sont mises à jour lorsque le droit évolue.",
  },
];

export default function GenerationDocumentPage() {
  const documents = listDocuments();
  const grouped = listByCategory();
  const { minEuros, maxEuros } = getCatalogPriceRange(documents);

  return (
    <main>
      <SiteNav current="/generation-document" />

      {/* HERO */}
      <section className="pt-36 pb-12 px-6 bg-gradient-to-b from-sky-50 via-white to-white">
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
              <li className="text-slate-700">Génération de document</li>
            </ol>
          </nav>

          <p className="text-blue-500 text-sm font-semibold uppercase tracking-widest mb-3">
            Notre catalogue
          </p>
          <h1 className="font-serif text-5xl sm:text-6xl font-bold tracking-tight mb-6 leading-[1.05] text-slate-900">
            Catalogue des documents juridiques
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8">
            {documents.length} modèles rangés par famille, tous rédigés par des
            juristes et revus par un avocat d&apos;affaires inscrit au Barreau
            de Paris. De {minEuros}&nbsp;€ à {maxEuros}&nbsp;€&nbsp;TTC, à l&apos;acte.
          </p>

          <div className="flex flex-wrap justify-center gap-2 text-xs">
            {CATEGORY_ORDER.map((cat) => (
              <a
                key={cat}
                href={`#${cat}`}
                className="px-3 py-1.5 rounded-full border border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:text-blue-500 transition"
              >
                {CATEGORY_LABELS[cat]}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="py-10 px-6 bg-white border-y border-slate-100">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <TrustItem label="Revus au Barreau de Paris" />
          <TrustItem label="Conformes RGPD" />
          <TrustItem label="Sans abonnement" />
          <TrustItem label="Accessibles à vie" />
        </div>
      </section>

      {/* CATEGORIES + DOCUMENTS */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto space-y-20">
          {CATEGORY_ORDER.map((cat) => {
            const docs = grouped[cat];
            const content = CATEGORY_CONTENT[cat];
            if (!docs || docs.length === 0) return null;
            return (
              <section key={cat} id={cat} className="scroll-mt-24">
                <div className="mb-8 md:flex md:items-start md:justify-between md:gap-10">
                  <div className="md:max-w-xl mb-4 md:mb-0">
                    <p className="text-blue-500 text-xs font-semibold uppercase tracking-widest mb-2">
                      {content.byline}
                    </p>
                    <h2 className="font-serif text-3xl font-bold text-slate-900 mb-3">
                      {CATEGORY_LABELS[cat]}
                    </h2>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {content.description}
                    </p>
                  </div>
                  <div className="md:text-right">
                    <p className="text-xs text-slate-500 uppercase tracking-widest mb-2">
                      Cas d&apos;usage typiques
                    </p>
                    <ul className="text-sm text-slate-600 space-y-1 md:text-right">
                      {content.useCases.map((uc) => (
                        <li key={uc}>· {uc}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {docs.map((doc) => (
                    <DocumentCard key={doc.type} doc={doc} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </section>

      {/* RÉASSURANCE + METHODE */}
      <section className="py-16 px-6 bg-slate-50/60 border-y border-slate-100">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-blue-500 text-sm font-semibold uppercase tracking-widest mb-3">
            Notre promesse éditoriale
          </p>
          <h2 className="font-serif text-3xl font-bold text-slate-900 mb-4">
            Un document à prix fixe ne veut pas dire un document à moindre soin
          </h2>
          <p className="text-slate-600 leading-relaxed mb-8 max-w-2xl mx-auto">
            Chaque modèle est construit à partir de la pratique courante du
            droit français, validé par un avocat d&apos;affaires inscrit au
            Barreau de Paris, puis maintenu à jour au fil des évolutions
            législatives et jurisprudentielles. Nous ne fournissons pas de
            conseil personnalisé : nous fournissons un document cadré, sur
            lequel votre situation se projette via le questionnaire.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link
              href="/notre-methode"
              className="px-6 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-white text-slate-900 font-medium text-sm"
            >
              Notre méthode
            </Link>
            <Link
              href="/comment-nous-redigeons"
              className="px-6 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-white text-slate-900 font-medium text-sm"
            >
              Comment nous rédigeons
            </Link>
            <Link
              href="/faq"
              className="px-6 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-white text-slate-900 font-medium text-sm"
            >
              Questions fréquentes
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ CATALOGUE */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl font-bold text-slate-900 mb-8 text-center">
            Questions sur le catalogue
          </h2>
          <div className="space-y-3">
            {CATALOG_FAQS.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-xl border border-slate-200 bg-white p-5"
              >
                <summary className="flex justify-between items-start gap-4 cursor-pointer font-medium text-slate-900 text-sm list-none">
                  {faq.question}
                  <span
                    aria-hidden="true"
                    className="text-slate-400 text-lg leading-none transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />

      {/* Breadcrumbs */}
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
          ],
        }}
      />

      {/* CollectionPage + ItemList */}
      <JsonLd
        id="ld-collection"
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Catalogue des documents juridiques QuickLegal",
          url: `${SITE_URL}/generation-document`,
          inLanguage: "fr-FR",
          mainEntity: {
            "@type": "ItemList",
            itemListElement: documents.map((doc, idx) => ({
              "@type": "ListItem",
              position: idx + 1,
              url: `${SITE_URL}/documents/${doc.type}`,
              name: doc.label,
            })),
          },
        }}
      />

      {/* FAQPage */}
      <JsonLd
        id="ld-faq"
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: CATALOG_FAQS.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }}
      />
    </main>
  );
}

function TrustItem({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 justify-center">
      <svg
        className="w-4 h-4 text-emerald-600 flex-shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2.5"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      <span className="text-sm font-medium text-slate-700">{label}</span>
    </div>
  );
}

function DocumentCard({ doc }: { doc: DocumentDefinition }) {
  const euros = Math.round(doc.priceCents / 100);
  return (
    <Link
      href={`/documents/${doc.type}`}
      className="group block rounded-2xl bg-white border border-slate-200 p-7 shadow-premium hover:shadow-premium-hover hover:border-blue-300 transition-all hover:-translate-y-0.5"
    >
      <div className="mb-4">
        <h3 className="font-serif text-2xl font-bold text-slate-900 mb-1.5 group-hover:text-blue-500 transition-colors">
          {doc.label}
        </h3>
        <p className="text-slate-600 text-sm leading-relaxed">
          {doc.description}
        </p>
      </div>

      <div className="flex items-baseline gap-2 mb-5">
        <span className="text-3xl font-bold text-slate-900 font-serif">
          {euros}
        </span>
        <span className="text-slate-500 text-sm">€ TTC</span>
        <span className="text-slate-400 text-xs line-through ml-2">
          ≈ {doc.originalPriceDisplay} € en cabinet
        </span>
      </div>

      <ul className="space-y-1.5 mb-5">
        {doc.features.map((f) => (
          <li
            key={f}
            className="flex items-center gap-2 text-xs text-slate-600"
          >
            <svg
              className="w-3.5 h-3.5 text-blue-500 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
            {f}
          </li>
        ))}
      </ul>

      <p className="text-sm font-medium text-blue-500 group-hover:text-blue-600">
        Voir la page du document →
      </p>
    </Link>
  );
}
