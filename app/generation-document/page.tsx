import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/lib/auth";
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

export const metadata: Metadata = {
  title: "Génération de document",
  description:
    "Catalogue QuickLegal : statuts de société, PV d'assemblée, mentions légales, CGU, CGV e-commerce, NDA et plus. Chaque modèle est rédigé par des juristes et revu par un avocat au Barreau de Paris.",
  alternates: { canonical: "/generation-document" },
  openGraph: {
    url: `${SITE_URL}/generation-document`,
    title: "Catalogue des documents juridiques | QuickLegal",
    description:
      "Statuts, gouvernance, contrats commerciaux, conformité web : tous nos modèles à prix fixe.",
  },
};

const CATEGORY_ORDER: DocumentCategory[] = [
  "statuts",
  "gouvernance",
  "commercial",
  "conformite",
];

export default async function GenerationDocumentPage() {
  const session = await auth().catch(() => null);
  const sessionUser = session?.user as { id?: string } | undefined;
  const isLoggedIn = !!sessionUser?.id;

  const grouped = listByCategory();

  return (
    <main>
      {/* NAV */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-serif text-2xl font-bold tracking-tight text-slate-900">
              Quick<span className="text-blue-500">Legal</span>
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm">
            <Link href="/generation-document" className="text-slate-900 font-medium">
              Génération de document
            </Link>
            <Link href="/comment-ca-marche" className="text-slate-600 hover:text-slate-900">
              Comment ça marche
            </Link>
            <Link href="/#garanties" className="text-slate-600 hover:text-slate-900">
              Garanties
            </Link>
          </div>
          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <Link
                href="/dashboard"
                className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium shadow-sm"
              >
                Mon espace
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="hidden sm:inline-block px-4 py-2 text-sm text-slate-700 hover:text-slate-900 font-medium"
                >
                  Connexion
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium shadow-sm"
                >
                  Créer un compte
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* HEADER */}
      <section className="pt-36 pb-12 px-6 bg-gradient-to-b from-sky-50 via-white to-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-blue-500 text-sm font-semibold uppercase tracking-widest mb-3">
            Notre catalogue
          </p>
          <h1 className="font-serif text-5xl sm:text-6xl font-bold tracking-tight mb-6 leading-[1.05] text-slate-900">
            Génération de document
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Choisissez le document à générer. Chaque modèle est rédigé par des
            juristes et revu par un avocat d'affaires inscrit au Barreau de
            Paris, puis personnalisé avec vos réponses.
          </p>
        </div>
      </section>

      {/* DOCUMENTS BY CATEGORY */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto space-y-16">
          {CATEGORY_ORDER.map((cat) => {
            const docs = grouped[cat];
            if (!docs || docs.length === 0) return null;
            return (
              <div key={cat}>
                <h2 className="font-serif text-3xl font-bold text-slate-900 mb-6">
                  {CATEGORY_LABELS[cat]}
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {docs.map((doc) => (
                    <DocumentCard key={doc.type} doc={doc} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <SiteFooter />

      {/* Breadcrumbs pour /generation-document */}
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

      {/* CollectionPage pour signaler que la page liste notre catalogue.
          Hub pour les 13 URLs produit sans aller jusqu'au schema Product
          par item (réservé à la phase d'enrichissement rédactionnel). */}
      <JsonLd
        id="ld-collection"
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Catalogue des documents juridiques QuickLegal",
          url: `${SITE_URL}/generation-document`,
          inLanguage: "fr-FR",
          hasPart: listDocuments().map((d) => ({
            "@type": "WebPage",
            name: d.label,
            url: `${SITE_URL}/documents/${d.type}`,
          })),
        }}
      />
    </main>
  );
}

function DocumentCard({ doc }: { doc: DocumentDefinition }) {
  const euros = Math.round(doc.priceCents / 100);
  return (
    <div className="group relative rounded-2xl bg-white border border-slate-200 p-8 shadow-premium shadow-premium-hover transition-all hover:-translate-y-0.5">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-serif text-2xl font-bold text-slate-900 mb-1">
            {doc.label}
          </h3>
          <p className="text-slate-600 text-sm">{doc.description}</p>
        </div>
      </div>

      <div className="flex items-baseline gap-2 mb-6">
        <span className="text-4xl font-bold text-slate-900 font-serif">
          {euros}
        </span>
        <span className="text-slate-500 text-sm">€ TTC</span>
        <span className="text-slate-400 text-xs line-through ml-2">
          ≈ {doc.originalPriceDisplay} € en cabinet
        </span>
      </div>

      <ul className="space-y-2 mb-8">
        {doc.features.map((f) => (
          <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
            <svg
              className="w-4 h-4 text-blue-500 flex-shrink-0"
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

      <Link
        href={`/documents/${doc.type}`}
        className="block text-center w-full px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold text-sm shadow-md"
      >
        Générer ce document
      </Link>
    </div>
  );
}
