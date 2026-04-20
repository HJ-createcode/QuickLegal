import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-url";
import { listDocuments } from "@/lib/document-registry";

/**
 * XML sitemap.
 *
 * The list is derived from the document registry so adding a new product
 * automatically publishes its URL, with no sitemap edit required.
 *
 * Priorities are relative, not absolute SEO signals. Google largely ignores
 * them, but they help us internally rank what we consider important.
 * Marketing pages stay above product pages.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/generation-document`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/comment-ca-marche`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    // Auth entry points — indexable but low priority. Users typically land
    // via CTAs, not organic search.
    {
      url: `${SITE_URL}/login`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/signup`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const productRoutes: MetadataRoute.Sitemap = listDocuments().map((doc) => ({
    url: `${SITE_URL}/documents/${doc.type}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...productRoutes];
}
