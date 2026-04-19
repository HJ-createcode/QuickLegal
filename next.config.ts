import type { NextConfig } from "next";

// HTTP security headers applied to every response. Defense-in-depth against
// clickjacking, MIME-type sniffing, cross-site leaks, and privilege misuse.
const securityHeaders = [
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "X-DNS-Prefetch-Control",
    value: "off",
  },
  {
    // Best-effort cross-origin isolation: the app never embeds third-party
    // resources that need to be cross-origin-opener-openable.
    key: "Cross-Origin-Opener-Policy",
    value: "same-origin",
  },
  {
    key: "Cross-Origin-Resource-Policy",
    value: "same-origin",
  },
  {
    // Allow Stripe Checkout redirection and Vercel Blob downloads; keep the
    // rest tight. Inline scripts/styles remain allowed because Next.js injects
    // small bootstrap scripts during hydration — tightening those to nonces
    // requires refactoring every client component. 'unsafe-eval' is removed:
    // production Next.js doesn't need it (only dev/React Refresh).
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://js.stripe.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: blob: https://*.public.blob.vercel-storage.com",
      "connect-src 'self' https://api.stripe.com https://*.vercel-storage.com",
      "frame-src https://js.stripe.com https://hooks.stripe.com https://checkout.stripe.com",
      "form-action 'self' https://checkout.stripe.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "object-src 'none'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  // Strip the X-Powered-By header (small info-disclosure hardening).
  poweredByHeader: false,

  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
