import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL } from "@/lib/site-url";

export interface BreadcrumbItem {
  /** Label displayed to users. */
  label: string;
  /**
   * Path (relative or absolute). Omit for the current page — the last
   * item is rendered as plain text and marked as non-linkable.
   */
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  /**
   * Override if multiple Breadcrumbs appear on the same page (rare).
   */
  schemaId?: string;
  /**
   * Optional extra className applied to the <nav> for margin adjustments.
   */
  className?: string;
}

/**
 * Visual + structured breadcrumb.
 *
 * Renders a semantic <nav aria-label="Fil d'Ariane"> with an ordered
 * list, and emits a schema.org BreadcrumbList JSON-LD in the same
 * component so pages never forget to ship the structured data with the
 * visual trail.
 */
export function Breadcrumbs({
  items,
  schemaId = "ld-breadcrumb",
  className = "",
}: BreadcrumbsProps) {
  if (!items || items.length === 0) return null;

  return (
    <>
      <nav
        aria-label="Fil d'Ariane"
        className={`text-xs text-slate-500 ${className}`}
      >
        <ol className="inline-flex items-center flex-wrap gap-1.5">
          {items.map((item, idx) => {
            const isLast = idx === items.length - 1;
            return (
              <li key={`${item.label}-${idx}`} className="inline-flex items-center gap-1.5">
                {!isLast && item.href ? (
                  <Link
                    href={item.href}
                    className="hover:text-slate-900"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-slate-700">{item.label}</span>
                )}
                {!isLast && <span aria-hidden="true">›</span>}
              </li>
            );
          })}
        </ol>
      </nav>

      <JsonLd
        id={schemaId}
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: items.map((item, idx) => ({
            "@type": "ListItem",
            position: idx + 1,
            name: item.label,
            ...(item.href
              ? {
                  item: item.href.startsWith("http")
                    ? item.href
                    : `${SITE_URL}${item.href}`,
                }
              : {}),
          })),
        }}
      />
    </>
  );
}
