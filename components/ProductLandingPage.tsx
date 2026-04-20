import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL } from "@/lib/site-url";
import {
  CATEGORY_LABELS,
  getDocumentDef,
  type DocumentDefinition,
} from "@/lib/document-registry";
import type { ProductPageContent } from "@/lib/product-content/types";

interface ProductLandingPageProps {
  doc: DocumentDefinition;
  content: ProductPageContent;
}

/**
 * Server-rendered landing page for a product.
 *
 * This template hosts the SEO content (H1, long description, includes,
 * mistakes, FAQ, internal links) and renders two CTAs toward the
 * questionnaire at `/documents/<slug>/commencer`.
 *
 * Kept entirely server-side: no Client Component here. The Wizard lives
 * on its own subroute to keep the landing page fast, crawlable and free
 * of useless JavaScript.
 */
export function ProductLandingPage({ doc, content }: ProductLandingPageProps) {
  const euros = Math.round(doc.priceCents / 100);
  const startUrl = `/documents/${doc.type}/commencer`;
  const canonicalUrl = `${SITE_URL}/documents/${doc.type}`;

  const relatedDefs = content.related
    .map((slug) => getDocumentDef(slug))
    .filter((d): d is DocumentDefinition => !!d);

  return (
    <main>
      <SiteNav current="/generation-document" />

      {/* HERO */}
      <section className="pt-28 pb-16 px-6 bg-gradient-to-b from-sky-50 via-white to-white">
        <div className="max-w-5xl mx-auto">
          <nav
            aria-label="Fil d'Ariane"
            className="text-xs text-slate-500 mb-6"
          >
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-slate-900">
                  Accueil
                </Link>
              </li>
              <li aria-hidden="true">›</li>
              <li>
                <Link href="/generation-document" className="hover:text-slate-900">
                  Génération de document
                </Link>
              </li>
              <li aria-hidden="true">›</li>
              <li className="text-slate-700">{doc.label}</li>
            </ol>
          </nav>

          <p className="text-blue-500 text-sm font-semibold uppercase tracking-widest mb-3">
            {CATEGORY_LABELS[doc.category]}
          </p>

          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight mb-4 leading-[1.1] text-slate-900">
            {content.h1}
          </h1>

          <p className="text-lg text-slate-600 max-w-3xl mb-8 leading-relaxed">
            {content.promise}
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
            <Link
              href={startUrl}
              className="px-7 py-3.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold text-base shadow-lg shadow-blue-500/20"
            >
              Commencer le questionnaire
            </Link>
            <div className="text-sm text-slate-700">
              <span className="font-serif text-2xl font-bold text-slate-900">
                {euros}&nbsp;€
              </span>
              <span className="text-slate-500"> TTC</span>
              <span className="text-slate-400 text-xs ml-2">
                ≈ {doc.originalPriceDisplay}&nbsp;€ en cabinet
              </span>
            </div>
          </div>
          <p className="text-slate-500 text-xs">
            Paiement sécurisé · Téléchargement immédiat · Document conservé à vie
          </p>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="py-12 px-6">
        <div className="max-w-3xl mx-auto space-y-4">
          <h2 className="font-serif text-2xl font-bold text-slate-900">
            À quoi sert {doc.label.toLowerCase()}
          </h2>
          {content.introduction.map((paragraph, i) => (
            <p key={i} className="text-slate-700 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* AUDIENCE + TIMING */}
      <section className="py-12 px-6 bg-slate-50/50 border-y border-slate-100">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="font-serif text-2xl font-bold text-slate-900 mb-3">
              À qui s&apos;adresse ce document
            </h2>
            <p className="text-slate-600 text-sm mb-4">
              {content.audience.summary}
            </p>
            <ul className="space-y-2">
              {content.audience.items.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-slate-700">
                  <span className="text-blue-500 flex-shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-serif text-2xl font-bold text-slate-900 mb-3">
              Quand l&apos;utiliser
            </h2>
            <p className="text-slate-600 text-sm mb-4">
              {content.timing.summary}
            </p>
            <ul className="space-y-2">
              {content.timing.items.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-slate-700">
                  <span className="text-blue-500 flex-shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CONTAINS */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-2xl font-bold text-slate-900 mb-3">
            Ce que contient votre document
          </h2>
          <p className="text-slate-600 text-sm mb-6 max-w-3xl">
            {content.contains.summary}
          </p>
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-2">
            {content.contains.items.map((item) => (
              <div
                key={item}
                className="flex gap-3 items-start text-sm text-slate-700"
              >
                <svg
                  className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5"
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
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INCLUDED / NOT INCLUDED */}
      <section className="py-12 px-6 bg-slate-50/50 border-y border-slate-100">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
          <div>
            <h3 className="font-serif text-xl font-semibold text-slate-900 mb-4">
              Inclus dans le prix
            </h3>
            <ul className="space-y-2">
              {content.included.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 items-start text-sm text-slate-700"
                >
                  <svg
                    className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5"
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
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-serif text-xl font-semibold text-slate-900 mb-4">
              Non inclus
            </h3>
            <ul className="space-y-2">
              {content.notIncluded.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 items-start text-sm text-slate-600"
                >
                  <svg
                    className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-2xl font-bold text-slate-900 mb-8">
            Comment ça fonctionne
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <HowItWorksStep
              num="1"
              title="Répondez au questionnaire"
              body="Un parcours guidé, étape par étape, sans jargon juridique. Sauvegarde automatique dans votre navigateur."
            />
            <HowItWorksStep
              num="2"
              title="Payez en ligne"
              body={`Paiement sécurisé par carte bancaire. ${euros} € TTC tout compris, aucun abonnement.`}
            />
            <HowItWorksStep
              num="3"
              title="Téléchargez votre PDF"
              body="Document personnalisé, sans filigrane, prêt à signer. Conservé à vie dans votre espace."
            />
          </div>
        </div>
      </section>

      {/* PRICING CTA */}
      <section className="py-16 px-6 bg-gradient-to-b from-sky-50/60 to-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl font-bold text-slate-900 mb-3">
            Un prix fixe, pas d&apos;abonnement
          </h2>
          <p className="text-slate-600 mb-8">
            {euros} € TTC pour un document complet, personnalisé, conservé
            à vie dans votre espace. À comparer aux ~{doc.originalPriceDisplay} € pratiqués en
            cabinet pour un résultat équivalent.
          </p>
          <Link
            href={startUrl}
            className="inline-block px-10 py-4 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold text-lg shadow-xl shadow-blue-500/25"
          >
            Commencer le questionnaire
          </Link>
        </div>
      </section>

      {/* MISTAKES */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-2xl font-bold text-slate-900 mb-8">
            Erreurs fréquentes à éviter
          </h2>
          <div className="space-y-6">
            {content.mistakes.map((mistake) => (
              <div
                key={mistake.title}
                className="p-5 rounded-2xl border border-slate-200 bg-white shadow-premium"
              >
                <h3 className="font-semibold text-slate-900 mb-1.5">
                  {mistake.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {mistake.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6 bg-slate-50/50 border-y border-slate-100">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-2xl font-bold text-slate-900 mb-8">
            Questions fréquentes
          </h2>
          <div className="space-y-3">
            {content.faqs.map((faq) => (
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

      {/* RELATED */}
      {relatedDefs.length > 0 && (
        <section className="py-16 px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-serif text-2xl font-bold text-slate-900 mb-6">
              Documents liés
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {relatedDefs.map((related) => (
                <Link
                  key={related.type}
                  href={`/documents/${related.type}`}
                  className="block p-5 rounded-2xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-premium transition"
                >
                  <p className="text-xs text-blue-500 font-semibold uppercase tracking-wider mb-2">
                    {CATEGORY_LABELS[related.category]}
                  </p>
                  <h3 className="font-serif text-lg font-semibold text-slate-900 mb-1">
                    {related.label}
                  </h3>
                  <p className="text-slate-500 text-xs mb-3">
                    {related.description}
                  </p>
                  <p className="text-slate-700 text-sm font-medium">
                    {Math.round(related.priceCents / 100)} € TTC →
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FINAL CTA */}
      <section className="py-16 px-6 bg-gradient-to-b from-white to-sky-50/60">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl font-bold text-slate-900 mb-4">
            Prêt à générer votre document ?
          </h2>
          <p className="text-slate-600 mb-8">
            Moins de dix minutes de questionnaire. PDF prêt à signer à la fin.
          </p>
          <Link
            href={startUrl}
            className="inline-block px-10 py-4 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold text-lg shadow-xl shadow-blue-500/25"
          >
            Commencer maintenant
          </Link>
        </div>
      </section>

      <SiteFooter />

      {/* Structured data : Product + FAQPage */}
      <JsonLd
        id="ld-product"
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: doc.label,
          description: content.promise,
          url: canonicalUrl,
          category: CATEGORY_LABELS[doc.category],
          brand: { "@type": "Brand", name: "QuickLegal" },
          offers: {
            "@type": "Offer",
            url: canonicalUrl,
            priceCurrency: "EUR",
            price: euros.toString(),
            availability: "https://schema.org/InStock",
            seller: { "@type": "Organization", name: "QuickLegal" },
          },
        }}
      />

      <JsonLd
        id="ld-faq"
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: content.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }}
      />
    </main>
  );
}

function HowItWorksStep({
  num,
  title,
  body,
}: {
  num: string;
  title: string;
  body: string;
}) {
  return (
    <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-premium">
      <div className="font-serif text-4xl font-bold text-blue-200 mb-3">
        {num}
      </div>
      <h3 className="font-serif text-lg font-semibold text-slate-900 mb-2">
        {title}
      </h3>
      <p className="text-slate-600 text-sm leading-relaxed">{body}</p>
    </div>
  );
}
