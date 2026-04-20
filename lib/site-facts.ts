/**
 * Single source of truth for every factual claim displayed on the site
 * (legal entity, contact, support, provider chain, etc.).
 *
 * Rule: we NEVER invent a fact. When a piece of information is not yet
 * known, we expose an explicit placeholder marker — `PLACEHOLDER` — so the
 * UI renders a visible "à compléter" hint rather than a plausible-looking
 * lie. Replacing a placeholder with a real value is then a single edit
 * here, which cascades to every page that references it.
 *
 * Categories of facts:
 *   - Legal entity (company name, SIRET, RCS, address, capital, director)
 *   - Contact (email, support, DPO)
 *   - Infrastructure providers (hosting, database, payment, blob storage)
 *   - Review/editorial chain (jurists, avocat reviewer — we only surface
 *     the existing claim level, not individual names we don't control)
 */

/**
 * Literal sentinel used when a fact is not yet filled in. Pages can
 * compare against this to render explicit "[à compléter]" badges.
 */
export const PLACEHOLDER = "__PLACEHOLDER__";

export function isPlaceholder(value: string): boolean {
  return value === PLACEHOLDER;
}

/**
 * Render helper: returns the value if known, or a clearly marked
 * placeholder string otherwise.
 */
export function orTodo(value: string, label?: string): string {
  if (isPlaceholder(value)) return label ? `[à compléter : ${label}]` : "[à compléter]";
  return value;
}

// ------------------------------------------------------------------
// Legal entity
// ------------------------------------------------------------------

export const LEGAL = {
  /** Company legal name (e.g. "QUICKLEGAL SAS"). */
  legalName: PLACEHOLDER,
  /** Legal form (SAS, SARL, EURL, entrepreneur individuel). */
  legalForm: PLACEHOLDER,
  /** Share capital amount in euros, as displayed string. */
  capital: PLACEHOLDER,
  /** SIREN (9 digits). */
  siren: PLACEHOLDER,
  /** SIRET of the principal establishment (14 digits). */
  siret: PLACEHOLDER,
  /** RCS city where the company is registered. */
  rcsCity: PLACEHOLDER,
  /** Intracommunity VAT number, if applicable. */
  vatNumber: PLACEHOLDER,
  /** Registered office postal address (one-line). */
  registeredOffice: PLACEHOLDER,
  /** Director of publication (natural person responsible for content). */
  publicationDirector: PLACEHOLDER,
} as const;

// ------------------------------------------------------------------
// Contact
// ------------------------------------------------------------------

export const CONTACT = {
  /** General contact email shown in the footer and trust pages. */
  generalEmail: PLACEHOLDER,
  /** Customer support email (may equal generalEmail). */
  supportEmail: PLACEHOLDER,
  /** Data protection contact (DPO if appointed, or general contact). */
  dpoEmail: PLACEHOLDER,
  /** Optional phone number. */
  phone: PLACEHOLDER,
} as const;

// ------------------------------------------------------------------
// Infrastructure (verifiable from the repo)
// ------------------------------------------------------------------

/**
 * Facts that we can assert with certainty because they are visible in
 * package.json / env / config and don't require human confirmation.
 */
export const INFRASTRUCTURE = {
  framework: "Next.js (App Router)",
  hostingProvider: "Vercel Inc.",
  hostingAddress: "440 N Barranca Ave #4133, Covina, CA 91723, USA",
  databaseProvider: "Neon (Postgres serverless)",
  blobProvider: "Vercel Blob",
  paymentProvider: "Stripe Payments Europe",
  paymentProviderAddress:
    "Stripe Payments Europe, Limited — 1 Grand Canal Street Lower, Dublin 2, Irlande",
} as const;

// ------------------------------------------------------------------
// Editorial chain
// ------------------------------------------------------------------

/**
 * The project-wide claim, kept as one string so every page uses the same
 * phrasing. We don't expose names of individual jurists or the reviewing
 * lawyer — the user (avocat inscrit au Barreau de Paris) can expand this
 * later if she/he decides to.
 */
export const EDITORIAL_CHAIN =
  "Les modèles QuickLegal sont rédigés par des juristes et revus par un avocat d'affaires inscrit au Barreau de Paris.";

// ------------------------------------------------------------------
// Mediation (required for B2C services)
// ------------------------------------------------------------------

export const MEDIATOR = {
  /** Default mediator — can be replaced if the company adheres to a
   * different one. CNPM is one of the most widely used in France. */
  name: "CNPM - Médiation de la consommation",
  url: "https://cnpm-mediation-consommation.eu",
} as const;

// ------------------------------------------------------------------
// Pricing (derived from the document registry at render time)
// ------------------------------------------------------------------

/**
 * Lowest and highest product prices in the catalog, used by home copy to
 * state "de 9 € à 89 €". Updated automatically when new products are
 * registered.
 */
export function getCatalogPriceRange(
  documents: readonly { priceCents: number }[]
): { minEuros: number; maxEuros: number } {
  const cents = documents.map((d) => d.priceCents);
  const min = Math.min(...cents);
  const max = Math.max(...cents);
  return {
    minEuros: Math.round(min / 100),
    maxEuros: Math.round(max / 100),
  };
}
