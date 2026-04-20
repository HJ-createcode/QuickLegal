/**
 * Shape of the SEO/marketing content attached to each document of the
 * registry. Kept intentionally rigid so every product page follows the same
 * structure and ranks on similar intents without duplicating copy.
 *
 * One content file per product lives in `lib/product-content/<slug>.ts`.
 * The dynamic route `app/documents/[type]/page.tsx` renders them via the
 * shared `components/ProductLandingPage.tsx` template.
 */

export interface ContentSection<TItem = string> {
  /** Sub-title displayed below the section heading. */
  summary: string;
  /** Bullet items rendered as a list. */
  items: TItem[];
}

export interface MistakeItem {
  /** Short imperative description of the mistake. */
  title: string;
  /** One or two sentences explaining the consequence / remedy. */
  body: string;
}

export interface FaqItem {
  question: string;
  /** Plain paragraph answer. Can use sentences with commas and periods,
   *  but no HTML. Rendered inside a <p>. */
  answer: string;
}

export interface ProductPageContent {
  /**
   * Page H1. Should contain the product name + a benefit (e.g. "Statuts
   * de SAS rédigés par des juristes, prêts en 10 minutes"). Distinct
   * from the registry `label` which is a short catalog title.
   */
  h1: string;

  /** Short one-line promise displayed under the H1. */
  promise: string;

  /**
   * Opening paragraphs — 2 or 3 sentences each. Appears just below the
   * hero CTA and anchors the product for both humans and search engines.
   */
  introduction: string[];

  /** "À qui s'adresse ce document". */
  audience: ContentSection;

  /** "Quand l'utiliser". */
  timing: ContentSection;

  /** "Ce que contient votre document". */
  contains: ContentSection;

  /** "Inclus" bullets. */
  included: string[];

  /** "Non inclus" bullets — transparency about what we don't cover. */
  notIncluded: string[];

  /** "Erreurs fréquentes à éviter" — expanded explanations. */
  mistakes: MistakeItem[];

  /** FAQ rendered as an accordion + FAQPage schema.org. */
  faqs: FaqItem[];

  /** Slugs of related products. Resolved at render time against the
   *  registry to build internal-linking cards. */
  related: string[];

  /**
   * Optional override for the hero's secondary CTA label. Defaults to
   * "Voir comment ça marche" when omitted.
   */
  secondaryCtaLabel?: string;
}
