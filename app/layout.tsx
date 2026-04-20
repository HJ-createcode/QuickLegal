import type { Metadata, Viewport } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { SessionProviderWrapper } from "@/components/SessionProviderWrapper";
import { JsonLd } from "@/components/JsonLd";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  SITE_URL_OBJECT,
} from "@/lib/site-url";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

/**
 * Root metadata.
 *
 * Per-page `metadata` or `generateMetadata` exports override these defaults.
 * When a child page sets e.g. `title: "Comment ça marche"`, the template
 * below combines it into "Comment ça marche | QuickLegal" — child pages
 * should NOT include "QuickLegal" themselves.
 *
 * `metadataBase` lets Next.js turn every relative Open Graph / canonical URL
 * into an absolute one based on the production host resolved in lib/site-url.
 */
export const metadata: Metadata = {
  metadataBase: SITE_URL_OBJECT,
  title: {
    default: `${SITE_NAME} — Documents juridiques rédigés par des juristes`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  generator: "Next.js",
  keywords: [
    "documents juridiques",
    "statuts SAS",
    "statuts SCI",
    "CGV",
    "NDA",
    "PV assemblée générale",
    "mentions légales",
    "CGU",
    "avocat Barreau de Paris",
    "création entreprise",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Documents juridiques en 10 minutes`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Documents juridiques en 10 minutes`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#3b82f6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Organization JSON-LD emitted on every page. Keeps our entity consistent
  // across all routes; Google consolidates it into a single Knowledge-Panel
  // candidate. Kept intentionally minimal — we add more properties once the
  // site has official pages to link to (logo, sameAs social profiles, etc.).
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
  };

  return (
    <html
      lang="fr"
      className={`${inter.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#fafbff] text-slate-900">
        <SessionProviderWrapper>{children}</SessionProviderWrapper>
        <JsonLd data={organizationJsonLd} id="ld-organization" />
      </body>
    </html>
  );
}
