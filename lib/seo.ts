import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "./site-url";

export interface BuildMetadataOptions {
  /** Page title (without the site suffix — the template adds it). */
  title: string;
  /** Meta description and Open Graph description. */
  description: string;
  /** Canonical path, relative to site root. Must start with "/". */
  path: string;
  /**
   * When true, `title` becomes the full <title>, bypassing the site-wide
   * "%s | QuickLegal" template. Used by the home page.
   */
  absoluteTitle?: boolean;
  /** Overrides the Open Graph title (optional). */
  ogTitle?: string;
  /** Overrides the Twitter card title (optional). */
  twitterTitle?: string;
  /** When true, emit noindex/nofollow. Used on transactional pages. */
  noindex?: boolean;
}

/**
 * Builds a `Metadata` object with canonical, Open Graph and Twitter
 * defaults consistent across the site.
 *
 * Not all pages migrate to this helper — pages with very specific
 * metadata (dynamic product pages, the home page's "absolute" title)
 * can keep a bespoke declaration. But every new static page should use
 * this factory so the canonical/OG/Twitter trio stays in sync without
 * repeating the same six lines every time.
 *
 * Example:
 *
 *   export const metadata = buildMetadata({
 *     title: "Notre méthode",
 *     description: "…",
 *     path: "/notre-methode",
 *   });
 */
export function buildMetadata(opts: BuildMetadataOptions): Metadata {
  const {
    title,
    description,
    path,
    absoluteTitle = false,
    ogTitle,
    twitterTitle,
    noindex = false,
  } = opts;

  const absoluteUrl = `${SITE_URL}${path === "/" ? "" : path}`;
  const resolvedOgTitle = ogTitle ?? `${title} | ${SITE_NAME}`;
  const resolvedTwitterTitle = twitterTitle ?? resolvedOgTitle;

  const meta: Metadata = {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      url: absoluteUrl,
      title: resolvedOgTitle,
      description,
    },
    twitter: {
      title: resolvedTwitterTitle,
      description,
    },
  };

  if (noindex) {
    meta.robots = { index: false, follow: false };
  }

  return meta;
}
