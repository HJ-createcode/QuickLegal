/**
 * Central registry of every published guide under `/guides/<slug>`.
 *
 * Adding a new guide means:
 *   1. Register it here (slug, title, family, short description, tag)
 *   2. Create `app/guides/<slug>/page.tsx` using <GuidePageLayout/>
 *   3. Update `app/sitemap.ts` — the pillar hub and the sitemap read from
 *      this registry so no manual cross-update is required.
 *
 * Rule: each guide must target an intention distinct from a product
 * landing page. Use comparative, decisional or pedagogical angles —
 * never a product name as-is.
 */

import type { DocumentCategory } from "./document-registry";

export type GuideFamily = DocumentCategory | "transverse";

export const GUIDE_FAMILY_LABELS: Record<GuideFamily, string> = {
  statuts: "Création de société",
  gouvernance: "Gouvernance & vie sociale",
  commercial: "Contrats commerciaux",
  conformite: "Conformité & mentions légales",
  transverse: "Choisir votre prestataire",
};

export interface GuideEntry {
  slug: string;
  /** H1 of the guide. Must not match a product label. */
  title: string;
  /** Short description used on the hub and in "related" cards. */
  summary: string;
  family: GuideFamily;
  /** Tag displayed on the hub card. */
  eyebrow:
    | "Comparatif"
    | "Coût"
    | "Pratique"
    | "Décision"
    | "Méthode"
    | "Choisir";
}

export const GUIDES: GuideEntry[] = [
  // Création de société
  {
    slug: "sas-vs-sasu",
    title: "SAS ou SASU : quelle forme choisir pour créer sa société ?",
    summary:
      "Les deux formes partagent le même régime, mais servent des projets différents. Comment trancher entre solo et plusieurs associés, et quand préférer l'une à l'autre.",
    family: "statuts",
    eyebrow: "Comparatif",
  },
  {
    slug: "sci-ir-ou-is",
    title: "SCI à l'IR ou à l'IS : comment choisir le régime fiscal ?",
    summary:
      "Deux régimes fiscaux, deux logiques radicalement opposées. Location nue, amortissement, dividendes, revente : dans quel cas l'IR reste optimal, dans quel cas basculer à l'IS.",
    family: "statuts",
    eyebrow: "Décision",
  },
  {
    slug: "cout-creation-sas",
    title: "Combien coûte réellement la création d'une SAS en 2026 ?",
    summary:
      "Décomposition claire du coût d'une SAS : formalités obligatoires, annonce légale, capital, statuts — selon que vous passez par un avocat, une legaltech ou un modèle gratuit.",
    family: "statuts",
    eyebrow: "Coût",
  },
  {
    slug: "domiciliation-siege-social",
    title: "Où domicilier le siège social de sa société ?",
    summary:
      "Chez soi, chez un tiers, dans une pépinière ou via une société de domiciliation agréée : les options, leurs contraintes, et la pièce à produire au greffe.",
    family: "statuts",
    eyebrow: "Pratique",
  },

  // Gouvernance
  {
    slug: "ago-vs-age",
    title: "AGO ou AGE : quelle assemblée tenir et pour quelle décision ?",
    summary:
      "L'assemblée ordinaire pour approuver les comptes, l'extraordinaire pour modifier les statuts. Les cas classiques, les règles de majorité et le formalisme associé.",
    family: "gouvernance",
    eyebrow: "Comparatif",
  },

  // Contrats commerciaux
  {
    slug: "nda-unilateral-ou-bilateral",
    title: "NDA unilatéral ou bilatéral : comment choisir ?",
    summary:
      "Quand une seule partie doit protéger ses informations, la version unilatérale suffit. Dès lors que l'échange est mutuel, il faut passer au bilatéral — explications.",
    family: "commercial",
    eyebrow: "Décision",
  },

  // Conformité
  {
    slug: "cgv-cgu-mentions-legales-differences",
    title: "CGV, CGU et mentions légales : quelles différences ?",
    summary:
      "Trois documents distincts, souvent confondus. Ce qu'ils couvrent respectivement, lesquels vous sont obligatoires selon votre site, et comment les articuler.",
    family: "conformite",
    eyebrow: "Comparatif",
  },

  // Transverse
  {
    slug: "avocat-vs-legaltech-vs-gratuit",
    title: "Modèle gratuit, legaltech ou avocat : comment choisir ?",
    summary:
      "Trois options pour rédiger un document juridique, trois niveaux de sécurité et de coût. Grille de décision claire, selon la valeur du document et votre budget.",
    family: "transverse",
    eyebrow: "Choisir",
  },
];

export function getGuideBySlug(slug: string): GuideEntry | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

export function getGuidesByFamily(): Record<GuideFamily, GuideEntry[]> {
  const out: Record<GuideFamily, GuideEntry[]> = {
    statuts: [],
    gouvernance: [],
    commercial: [],
    conformite: [],
    transverse: [],
  };
  for (const g of GUIDES) out[g.family].push(g);
  return out;
}
