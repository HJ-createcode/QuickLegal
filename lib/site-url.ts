/**
 * Absolute, canonical base URL of the site.
 *
 * Resolution order:
 *   1. `NEXT_PUBLIC_APP_URL` env var (set this in Vercel when the custom
 *      domain is ready, e.g. `https://quicklegal.fr`).
 *   2. Fallback to the current Vercel preview URL.
 *
 * Used for:
 *   - `metadataBase` in the root layout
 *   - absolute URLs in `robots.ts` and `sitemap.ts`
 *   - JSON-LD structured data
 *   - Open Graph / Twitter card URLs
 *
 * Important: Next.js `Metadata.alternates.canonical` uses relative paths and
 * resolves them against `metadataBase`. So callers should pass `/path`, not
 * the absolute URL, to avoid double-prefixing.
 */
export const SITE_URL: string = (
  process.env.NEXT_PUBLIC_APP_URL || "https://quick-legal-xi.vercel.app"
).replace(/\/+$/, "");

/** Parsed URL object used where a `URL` instance is required. */
export const SITE_URL_OBJECT = new URL(SITE_URL);

/** Human-readable host, e.g. `quick-legal-xi.vercel.app`. */
export const SITE_HOST = SITE_URL_OBJECT.host;

/** Site name used consistently in Open Graph, JSON-LD, etc. */
export const SITE_NAME = "QuickLegal";

/** One-line default description re-used by routes that don't override it. */
export const SITE_DESCRIPTION =
  "Générez vos documents juridiques en 10 minutes : statuts de société, CGV, NDA, PV d'assemblée, mentions légales, CGU et plus. Modèles rédigés par des juristes, revus par un avocat au Barreau de Paris.";
