import type { DocumentCategory } from "./document-registry";

/**
 * Short editorial copy for each catalog family. Reused on the home
 * category grid and on the catalog's per-family header.
 *
 * Keep descriptions factual and product-grounded. No made-up figures,
 * no marketing slogans.
 */
export const CATEGORY_CONTENT: Record<
  DocumentCategory,
  {
    /** Very short 1-line byline, used above the category title. */
    byline: string;
    /** One paragraph displayed on hover, below the title or next to it. */
    description: string;
    /** Bullet list of typical use cases covered by the category. */
    useCases: string[];
  }
> = {
  statuts: {
    byline: "Créer et immatriculer votre société",
    description:
      "Les actes fondateurs et les pièces exigées par le greffe du tribunal de commerce pour créer ou modifier une société en France.",
    useCases: [
      "Constituer une SAS ou une SCI à partir de zéro",
      "Formaliser la domiciliation du siège social",
      "Fournir une déclaration de non-condamnation à l'immatriculation",
    ],
  },
  gouvernance: {
    byline: "Tenir les assemblées et documenter les décisions",
    description:
      "Les documents qui organisent la vie sociale : convocations, ordres du jour, feuilles de présence, procès-verbaux d'assemblées ordinaires et extraordinaires.",
    useCases: [
      "Approuver les comptes annuels",
      "Transférer un siège ou modifier les statuts",
      "Documenter une décision d'associé unique",
    ],
  },
  commercial: {
    byline: "Encadrer vos relations commerciales",
    description:
      "Les contrats et conditions générales qui sécurisent vos échanges avec vos clients et vos partenaires.",
    useCases: [
      "Vendre en ligne en conformité avec le Code de la consommation",
      "Protéger des informations sensibles avant une négociation",
      "Formaliser un partenariat ou une prestation",
    ],
  },
  conformite: {
    byline: "Rendre votre site conforme",
    description:
      "Les mentions et conditions obligatoires pour tout site web professionnel : identité de l'éditeur, règles d'usage, traitement des données.",
    useCases: [
      "Publier des mentions légales conformes à la LCEN",
      "Encadrer l'accès à un service SaaS par des CGU",
      "Articuler CGU et CGV sur un site marchand",
    ],
  },
};
