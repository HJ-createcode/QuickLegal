import type { ReactNode } from "react";
import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

/**
 * Shared chrome for secondary/"trust" pages: legal pages, FAQ, method
 * pages, etc. Provides nav + breadcrumb + title + prose container +
 * footer without re-implementing them in each file.
 *
 * Children receive a styled long-form container. For table-of-contents
 * and structured sections use <TrustSection /> below.
 */
export function TrustPageLayout({
  eyebrow,
  title,
  subtitle,
  lastUpdated,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  /** Format long, e.g. "15 mars 2026". Displayed near the title. */
  lastUpdated?: string;
  children: ReactNode;
}) {
  return (
    <main>
      <SiteNav />

      <section className="pt-36 pb-10 px-6 bg-gradient-to-b from-sky-50 via-white to-white border-b border-slate-100">
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
              <li className="text-slate-700">{title}</li>
            </ol>
          </nav>
          {eyebrow && (
            <p className="text-blue-500 text-sm font-semibold uppercase tracking-widest mb-3">
              {eyebrow}
            </p>
          )}
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 mb-4 leading-[1.1]">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          )}
          {lastUpdated && (
            <p className="text-xs text-slate-500 mt-6">
              Dernière mise à jour : {lastUpdated}
            </p>
          )}
        </div>
      </section>

      <article className="py-14 px-6">
        <div className="max-w-3xl mx-auto space-y-10">{children}</div>
      </article>

      <SiteFooter />
    </main>
  );
}

/**
 * Standard section inside a TrustPageLayout. Yields an h2 followed by
 * Markdown-style spaced body content.
 */
export function TrustSection({
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
 * Render inline placeholder text that catches the eye. Use when a fact
 * is missing — never invent a value.
 */
export function TodoMark({ label }: { label: string }) {
  return (
    <span className="inline-block px-2 py-0.5 rounded-md bg-amber-50 border border-amber-200 text-amber-800 text-xs font-mono">
      [à compléter : {label}]
    </span>
  );
}
