import Link from "next/link";

interface StickyCtaProps {
  /** Short context label shown on the left, e.g. "Statuts de SAS — 79 € TTC". */
  label: string;
  /** CTA href. */
  href: string;
  /** CTA button text. */
  ctaText: string;
  /** Optional sub-line shown under the label, e.g. "Conservé à vie · Sans abonnement". */
  hint?: string;
}

/**
 * Fixed CTA bar pinned to the bottom of the viewport on long pages.
 *
 * Implemented as pure CSS (`fixed bottom-0`) — no client component, no
 * scroll listener, no JS bundle on the page that uses it. The bar is
 * always rendered; it only takes meaningful screen real estate on
 * desktops and disappears below the user's natural touch zone on mobile.
 *
 * Use sparingly — one per page max — on long product or guide pages
 * where the primary CTA can otherwise scroll out of reach.
 */
export function StickyCta({ label, href, ctaText, hint }: StickyCtaProps) {
  return (
    <div
      role="region"
      aria-label="Action principale"
      className="fixed bottom-0 inset-x-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur-md shadow-[0_-4px_20px_rgba(15,23,42,0.06)]"
    >
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-slate-900 truncate">
            {label}
          </p>
          {hint && (
            <p className="text-xs text-slate-500 truncate hidden sm:block">
              {hint}
            </p>
          )}
        </div>
        <Link
          href={href}
          className="flex-shrink-0 px-5 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold text-sm shadow-md whitespace-nowrap"
        >
          {ctaText}
        </Link>
      </div>
    </div>
  );
}
