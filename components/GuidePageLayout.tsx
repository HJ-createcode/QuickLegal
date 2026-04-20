import type { ReactNode } from "react";
import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL, SITE_NAME } from "@/lib/site-url";

export interface GuideRelated {
  slug: string;
  label: string;
  description?: string;
}

export interface GuideProductLink {
  slug: string;
  label: string;
  priceEuros: number;
  description: string;
}

interface GuidePageLayoutProps {
  /** Short eyebrow label, e.g. "Comparatif" or "Coût". */
  eyebrow: string;
  /** Page title (H1). Must NOT be a product label — avoids cannibalising
   *  the corresponding `/documents/<slug>` landing page. */
  title: string;
  /** Two or three sentences placed under the H1. */
  intro: string;
  /** Optional one-line takeaway displayed just under the intro. */
  tldr?: string;
  /** Articles / FAQ / sections long-form. */
  children: ReactNode;
  /** Products to promote after the body. */
  products: GuideProductLink[];
  /** Related guides shown below the body. */
  related?: GuideRelated[];
  /** Date of last update, e.g. "avril 2026". */
  lastUpdated?: string;
  /** Full current slug, e.g. "sas-vs-sasu" — used for Article JSON-LD. */
  slug: string;
}

/**
 * Shared chrome for every guide under `/guides/<slug>`.
 *
 * Renders nav + breadcrumb + H1 + body (passed as children) + product
 * CTAs + related guides + footer. Also emits an Article JSON-LD and a
 * BreadcrumbList JSON-LD. FAQPage schema can be added by the page itself
 * via `<JsonLd />` if the guide has a FAQ.
 */
export function GuidePageLayout({
  eyebrow,
  title,
  intro,
  tldr,
  children,
  products,
  related,
  lastUpdated,
  slug,
}: GuidePageLayoutProps) {
  const canonicalUrl = `${SITE_URL}/guides/${slug}`;

  return (
    <main>
      <SiteNav />

      {/* HERO */}
      <section className="pt-32 pb-10 px-6 bg-gradient-to-b from-sky-50 via-white to-white border-b border-slate-100">
        <div className="max-w-3xl mx-auto">
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
              <li>
                <Link href="/guides" className="hover:text-slate-900">
                  Guides
                </Link>
              </li>
              <li aria-hidden="true">›</li>
              <li className="text-slate-700 truncate max-w-md">{title}</li>
            </ol>
          </nav>
          <p className="text-blue-500 text-sm font-semibold uppercase tracking-widest mb-3">
            {eyebrow}
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 mb-5 leading-[1.1]">
            {title}
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed mb-4">{intro}</p>
          {tldr && (
            <div className="mt-6 p-4 rounded-xl border border-blue-100 bg-blue-50/40">
              <p className="text-xs font-semibold text-blue-500 uppercase tracking-widest mb-1">
                En bref
              </p>
              <p className="text-sm text-slate-700 leading-relaxed">{tldr}</p>
            </div>
          )}
          {lastUpdated && (
            <p className="text-xs text-slate-500 mt-6">
              Mis à jour en {lastUpdated}
            </p>
          )}
        </div>
      </section>

      {/* BODY */}
      <article className="py-14 px-6">
        <div className="max-w-3xl mx-auto space-y-10">{children}</div>
      </article>

      {/* PRODUCT CTA */}
      {products.length > 0 && (
        <section className="py-12 px-6 bg-slate-50/60 border-t border-slate-100">
          <div className="max-w-3xl mx-auto">
            <p className="text-blue-500 text-xs font-semibold uppercase tracking-widest mb-3">
              Passer à l&apos;action
            </p>
            <h2 className="font-serif text-2xl font-bold text-slate-900 mb-5">
              Le document QuickLegal{" "}
              {products.length > 1 ? "correspondant" : "correspondant à ce guide"}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {products.map((product) => (
                <Link
                  key={product.slug}
                  href={`/documents/${product.slug}`}
                  className="block p-5 rounded-2xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-premium transition"
                >
                  <h3 className="font-serif text-lg font-semibold text-slate-900 mb-1">
                    {product.label}
                  </h3>
                  <p className="text-slate-500 text-xs mb-3 leading-relaxed">
                    {product.description}
                  </p>
                  <p className="text-slate-900 text-sm font-semibold">
                    {product.priceEuros}&nbsp;€&nbsp;TTC
                    <span className="text-slate-400 text-xs font-normal ml-2">
                      → générer →
                    </span>
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* RELATED GUIDES */}
      {related && related.length > 0 && (
        <section className="py-12 px-6 border-t border-slate-100">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-2xl font-bold text-slate-900 mb-5">
              À lire aussi
            </h2>
            <ul className="space-y-3">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/guides/${item.slug}`}
                    className="block p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-300 transition"
                  >
                    <p className="font-medium text-slate-900 text-sm">
                      {item.label}
                    </p>
                    {item.description && (
                      <p className="text-slate-500 text-xs mt-1">
                        {item.description}
                      </p>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <SiteFooter />

      {/* Article JSON-LD */}
      <JsonLd
        id="ld-article"
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: title,
          description: intro,
          url: canonicalUrl,
          inLanguage: "fr-FR",
          mainEntityOfPage: canonicalUrl,
          publisher: {
            "@type": "Organization",
            name: SITE_NAME,
            url: SITE_URL,
          },
          ...(lastUpdated
            ? { dateModified: new Date().toISOString().slice(0, 10) }
            : {}),
        }}
      />

      {/* BreadcrumbList JSON-LD */}
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
            {
              "@type": "ListItem",
              position: 3,
              name: title,
              item: canonicalUrl,
            },
          ],
        }}
      />
    </main>
  );
}

/**
 * Section wrapper for guide long-form content. Use inside the body of a
 * GuidePageLayout.
 */
export function GuideSection({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="font-serif text-2xl font-bold text-slate-900 mb-4">
        {title}
      </h2>
      <div className="space-y-4 text-slate-700 leading-relaxed text-[15px]">
        {children}
      </div>
    </section>
  );
}

/**
 * Callout used for key takeaways, warnings or caveats.
 */
export function GuideCallout({
  tone = "info",
  title,
  children,
}: {
  tone?: "info" | "warning";
  title?: string;
  children: ReactNode;
}) {
  const bg =
    tone === "warning"
      ? "bg-amber-50 border-amber-200 text-amber-900"
      : "bg-blue-50/60 border-blue-100 text-slate-800";
  return (
    <div className={`my-2 p-4 rounded-xl border ${bg}`}>
      {title && (
        <p className="font-semibold text-sm mb-1">{title}</p>
      )}
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );
}
