import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-url";

/**
 * Production robots.txt.
 *
 * We explicitly disallow transactional and private routes to prevent them
 * from eating crawl budget or appearing in search results even if someone
 * links to them externally. API routes are disallowed for the same reason.
 *
 * `noindex` is also emitted via route-level metadata on the same routes as
 * defence in depth: robots.txt is a hint, route metadata is a directive.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/dashboard",
          "/admin",
          "/success",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
