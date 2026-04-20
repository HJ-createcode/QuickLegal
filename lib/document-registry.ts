/**
 * Central registry of every document QuickLegal can generate.
 *
 * Each entry carries everything server-side code needs to:
 *   - validate the submitted form_data
 *   - generate the PDF content
 *   - price the Stripe checkout
 *   - render the catalog card
 *
 * This file is server-safe: no React, no browser-only APIs. The client-side
 * Wizard recap components live in `components/recaps.tsx` and look up the
 * document by `type` to decide which JSX to render.
 *
 * Adding a new document type:
 *   1. Drop a questionnaire config in `lib/questionnaire-configs/<slug>.ts`
 *   2. Drop a template generator in `lib/templates/<slug>.ts`
 *   3. Append a new entry to `DOCUMENT_REGISTRY` below
 *   4. (Optional) Add a recap component in `components/recaps.tsx`
 *   5. No other code changes required — pricing, validation, routes all
 *      read from this registry.
 */

import type { QuestionnaireStep } from "./questionnaire-configs/statuts-sas";
import { STATUTS_SAS_STEPS } from "./questionnaire-configs/statuts-sas";
import { STATUTS_SCI_STEPS } from "./questionnaire-configs/statuts-sci";
import { CGV_ECOMMERCE_STEPS } from "./questionnaire-configs/cgv-ecommerce";
import { NDA_STEPS } from "./questionnaire-configs/nda";
import { MENTIONS_LEGALES_STEPS } from "./questionnaire-configs/mentions-legales";
import { CGU_STEPS } from "./questionnaire-configs/cgu";
import { ATTESTATION_DOMICILIATION_STEPS } from "./questionnaire-configs/attestation-domiciliation";
import { DECLARATION_NON_CONDAMNATION_STEPS } from "./questionnaire-configs/declaration-non-condamnation";
import { PV_AG_ORDINAIRE_STEPS } from "./questionnaire-configs/pv-ag-ordinaire";
import { PV_AG_EXTRAORDINAIRE_STEPS } from "./questionnaire-configs/pv-ag-extraordinaire";
import { CONVOCATION_AG_STEPS } from "./questionnaire-configs/convocation-ag";
import { ORDRE_DU_JOUR_AG_STEPS } from "./questionnaire-configs/ordre-du-jour-ag";
import { FEUILLE_PRESENCE_AG_STEPS } from "./questionnaire-configs/feuille-presence-ag";

import { generateStatutsSAS } from "./templates/statuts-sas";
import { generateStatutsSCI } from "./templates/statuts-sci";
import { generateCGVEcommerce } from "./templates/cgv-ecommerce";
import { generateNDA } from "./templates/nda";
import { generateMentionsLegales } from "./templates/mentions-legales";
import { generateCGU } from "./templates/cgu";
import { generateAttestationDomiciliation } from "./templates/attestation-domiciliation";
import { generateDeclarationNonCondamnation } from "./templates/declaration-non-condamnation";
import { generatePVAGOrdinaire } from "./templates/pv-ag-ordinaire";
import { generatePVAGExtraordinaire } from "./templates/pv-ag-extraordinaire";
import { generateConvocationAG } from "./templates/convocation-ag";
import { generateOrdreDuJourAG } from "./templates/ordre-du-jour-ag";
import { generateFeuillePresenceAG } from "./templates/feuille-presence-ag";

import type { StatutsSASData } from "./questionnaire-configs/statuts-sas";
import type { StatutsSCIData } from "./questionnaire-configs/statuts-sci";
import type { CGVEcommerceData } from "./questionnaire-configs/cgv-ecommerce";
import type { NDAData } from "./questionnaire-configs/nda";
import type { MentionsLegalesData } from "./questionnaire-configs/mentions-legales";
import type { CGUData } from "./questionnaire-configs/cgu";
import type { AttestationDomiciliationData } from "./questionnaire-configs/attestation-domiciliation";
import type { DeclarationNonCondamnationData } from "./questionnaire-configs/declaration-non-condamnation";
import type { PVAGOrdinaireData } from "./questionnaire-configs/pv-ag-ordinaire";
import type { PVAGExtraordinaireData } from "./questionnaire-configs/pv-ag-extraordinaire";
import type { ConvocationAGData } from "./questionnaire-configs/convocation-ag";
import type { OrdreDuJourAGData } from "./questionnaire-configs/ordre-du-jour-ag";
import type { FeuillePresenceAGData } from "./questionnaire-configs/feuille-presence-ag";

export type DocumentCategory =
  | "statuts"
  | "gouvernance"
  | "commercial"
  | "conformite";

export const CATEGORY_LABELS: Record<DocumentCategory, string> = {
  statuts: "Création de société",
  gouvernance: "Gouvernance & vie sociale",
  commercial: "Contrats commerciaux",
  conformite: "Conformité & mentions légales",
};

export interface DocumentDefinition {
  /** URL slug and DB `type` column value. Must be stable. */
  type: string;
  /** Short label used in catalog cards and nav. */
  label: string;
  /** Used as PDF subtitle and window title. */
  longLabel: string;
  /** Catalog grouping. */
  category: DocumentCategory;
  /** Price charged to the customer, in cents. */
  priceCents: number;
  /** Marketing "crossed-out" display value, e.g. "1 500" for comparison. */
  originalPriceDisplay: string;
  /** One-paragraph description for the catalog card. */
  description: string;
  /** Three-item bullet list for the catalog card. */
  features: string[];
  /** Wizard questionnaire structure. */
  questionnaire: QuestionnaireStep[];
  /** Defaults pre-populated in the Wizard before the user types anything. */
  initialData: Record<string, unknown>;
  /**
   * Run server-side on every generation / checkout attempt. Return null when
   * the submission is good, or a short user-facing string to reject it.
   */
  validate: (data: Record<string, unknown>) => string | null;
  /** Produce the plain-text body fed to the PDF renderer. */
  generateContent: (data: Record<string, unknown>) => string;
  /** Extract a short title stored in the documents.title column. */
  extractTitle: (data: Record<string, unknown>) => string;
  /** Extract the "subject" displayed at the top of every PDF page. */
  pdfHeaderTitle: (data: Record<string, unknown>) => string;
  /**
   * Optional field visibility predicate for the Wizard (e.g. hide
   * `president_tiers_nom` unless `president_type === "tiers"`).
   */
  shouldShowField?: (
    fieldId: string,
    data: Record<string, unknown>
  ) => boolean;
}

// ===== Existing four documents =====

const STATUTS_SAS_INITIAL: Record<string, unknown> = {
  duree: 99,
  valeur_nominale: 10,
  type_apports: "numeraire",
  liberation_partielle: "totale",
  president_type: "associe",
  president_index: 1,
  president_remuneration: false,
  clause_agrement: true,
  clause_preemption: true,
  date_cloture_exercice: "31/12",
  distribution_dividendes: "proportionnelle",
  associes_list: [
    {
      nom: "",
      prenom: "",
      date_naissance: "",
      lieu_naissance: "",
      nationalite: "Française",
      adresse: "",
      nombre_actions: 0,
    },
  ],
};

const STATUTS_SCI_INITIAL: Record<string, unknown> = {
  duree: 99,
  valeur_nominale: 10,
  type_apports: "numeraire",
  gerant_type: "associe",
  gerant_index: 1,
  gerant_remuneration: false,
  regime_fiscal: "ir",
  clause_agrement: true,
  date_cloture_exercice: "31/12",
  associes_list: [
    {
      nom: "",
      prenom: "",
      date_naissance: "",
      lieu_naissance: "",
      nationalite: "Française",
      adresse: "",
      nombre_actions: 0,
    },
    {
      nom: "",
      prenom: "",
      date_naissance: "",
      lieu_naissance: "",
      nationalite: "Française",
      adresse: "",
      nombre_actions: 0,
    },
  ],
};

const CGV_INITIAL: Record<string, unknown> = {
  forme_juridique: "sas",
  clientele: "b2c",
  zones_livraison: "france",
  delai_livraison: "3 à 5 jours ouvrés",
  moyens_paiement: "Carte bancaire, PayPal",
  duree_retractation: "14",
  mediateur_nom: "CNPM - Médiation de la consommation",
  mediateur_url: "https://cnpm-mediation-consommation.eu",
  duree_conservation_commandes: 10,
  utilise_cookies: true,
};

const NDA_INITIAL: Record<string, unknown> = {
  type_nda: "bilateral",
  partie_a_type: "societe",
  partie_b_type: "societe",
  duree_confidentialite: 5,
  tribunal_competent: "Paris",
  contient_donnees_personnelles: true,
  nature_informations:
    "Toute information de nature technique, commerciale, financière, stratégique, opérationnelle ou relative aux savoir-faire, échangée dans le cadre des discussions entre les parties",
};

function validateStatutsGeneric(data: Record<string, unknown>): string | null {
  if (!data.denomination || !data.objet_social || !data.siege_social) {
    return "Données incomplètes. Veuillez remplir tous les champs obligatoires.";
  }
  const associes = data.associes_list as unknown[] | undefined;
  if (!associes || associes.length === 0) {
    return "Au moins un associé est requis.";
  }
  return null;
}

export const DOCUMENT_REGISTRY: DocumentDefinition[] = [
  {
    type: "statuts-sas",
    label: "Statuts de SAS",
    longLabel: "Statuts de SAS",
    category: "statuts",
    priceCents: 7900,
    originalPriceDisplay: "1 500",
    description:
      "Statuts complets avec clauses d'agrément, répartition du capital, nomination du président.",
    features: ["~25 articles", "Clauses agrément & préemption", "Conforme RGPD"],
    questionnaire: STATUTS_SAS_STEPS,
    initialData: STATUTS_SAS_INITIAL,
    validate: validateStatutsGeneric,
    generateContent: (data) =>
      generateStatutsSAS(data as unknown as StatutsSASData),
    extractTitle: (data) => String(data.denomination || "Société"),
    pdfHeaderTitle: (data) => String(data.denomination || "Société"),
    shouldShowField: (fieldId, data) => {
      if (fieldId === "president_index" && data.president_type !== "associe")
        return false;
      if (fieldId === "president_tiers_nom" && data.president_type !== "tiers")
        return false;
      if (
        fieldId === "president_tiers_adresse" &&
        data.president_type !== "tiers"
      )
        return false;
      return true;
    },
  },
  {
    type: "statuts-sci",
    label: "Statuts de SCI",
    longLabel: "Statuts de SCI",
    category: "statuts",
    priceCents: 8900,
    originalPriceDisplay: "1 800",
    description:
      "Société civile immobilière avec gérance, parts sociales et régime fiscal au choix.",
    features: ["~20 articles", "IR ou IS au choix", "Conforme RGPD"],
    questionnaire: STATUTS_SCI_STEPS,
    initialData: STATUTS_SCI_INITIAL,
    validate: validateStatutsGeneric,
    generateContent: (data) =>
      generateStatutsSCI(data as unknown as StatutsSCIData),
    extractTitle: (data) => String(data.denomination || "SCI"),
    pdfHeaderTitle: (data) => String(data.denomination || "SCI"),
    shouldShowField: (fieldId, data) => {
      if (fieldId === "gerant_index" && data.gerant_type !== "associe")
        return false;
      if (fieldId === "gerant_tiers_nom" && data.gerant_type !== "tiers")
        return false;
      if (fieldId === "gerant_tiers_adresse" && data.gerant_type !== "tiers")
        return false;
      return true;
    },
  },
  {
    type: "cgv-ecommerce",
    label: "CGV E-commerce",
    longLabel: "Conditions Générales de Vente E-commerce",
    category: "commercial",
    priceCents: 4900,
    originalPriceDisplay: "900",
    description:
      "Conditions générales de vente conformes au Code de la consommation et au RGPD.",
    features: [
      "Droit de rétractation",
      "Article RGPD complet",
      "Médiateur consommation",
    ],
    questionnaire: CGV_ECOMMERCE_STEPS,
    initialData: CGV_INITIAL,
    validate: (data) => {
      if (!data.denomination || !data.siret || !data.siege_social) {
        return "Informations du vendeur incomplètes.";
      }
      return null;
    },
    generateContent: (data) =>
      generateCGVEcommerce(data as unknown as CGVEcommerceData),
    extractTitle: (data) => String(data.denomination || "Boutique"),
    pdfHeaderTitle: (data) => String(data.denomination || "Boutique"),
  },
  {
    type: "nda",
    label: "Accord de confidentialité (NDA)",
    longLabel: "Accord de confidentialité",
    category: "commercial",
    priceCents: 3900,
    originalPriceDisplay: "500",
    description:
      "Accord de confidentialité unilatéral ou réciproque, adapté à votre contexte.",
    features: [
      "Unilatéral ou réciproque",
      "Durée personnalisable",
      "Conforme RGPD",
    ],
    questionnaire: NDA_STEPS,
    initialData: NDA_INITIAL,
    validate: (data) => {
      if (!data.partie_a_nom || !data.partie_b_nom || !data.contexte) {
        return "Informations des parties ou du contexte incomplètes.";
      }
      return null;
    },
    generateContent: (data) => generateNDA(data as unknown as NDAData),
    extractTitle: (data) => String(data.partie_a_nom || "NDA"),
    pdfHeaderTitle: (data) => String(data.partie_a_nom || "NDA"),
  },

  // ===== Conformité web =====
  {
    type: "mentions-legales",
    label: "Mentions légales",
    longLabel: "Mentions légales de site web",
    category: "conformite",
    priceCents: 1900,
    originalPriceDisplay: "300",
    description:
      "Mentions légales complètes conformes à la LCEN et au Code de la consommation.",
    features: [
      "LCEN art. 6-III",
      "Profession réglementée",
      "Médiation consommation",
    ],
    questionnaire: MENTIONS_LEGALES_STEPS,
    initialData: {
      forme_editeur: "societe",
      activite_reglementee: false,
      mediation_applicable: true,
      mediateur_nom: "CNPM - Médiation de la consommation",
      mediateur_url: "https://cnpm-mediation-consommation.eu",
    },
    validate: (data) => {
      if (!data.denomination || !data.siege_social || !data.siren) {
        return "Informations de l'éditeur incomplètes.";
      }
      if (!data.directeur_publication || !data.site_url || !data.email_contact) {
        return "Informations de publication ou de contact incomplètes.";
      }
      if (!data.hebergeur_nom || !data.hebergeur_adresse) {
        return "Informations de l'hébergeur incomplètes.";
      }
      return null;
    },
    generateContent: (data) =>
      generateMentionsLegales(data as unknown as MentionsLegalesData),
    extractTitle: (data) => String(data.denomination || "Site web"),
    pdfHeaderTitle: (data) => String(data.denomination || "Site web"),
  },
  {
    type: "cgu",
    label: "Conditions Générales d'Utilisation (CGU)",
    longLabel: "Conditions Générales d'Utilisation",
    category: "conformite",
    priceCents: 2900,
    originalPriceDisplay: "500",
    description:
      "CGU adaptées à votre service, qu'il soit gratuit ou payant, B2C ou B2B.",
    features: [
      "Clause UGC optionnelle",
      "B2C / B2B adapté",
      "Médiation & droit applicable",
    ],
    questionnaire: CGU_STEPS,
    initialData: {
      clientele: "b2c",
      inscription_requise: true,
      service_payant: false,
      contenu_utilisateurs: false,
      tribunal_competent: "Paris",
    },
    validate: (data) => {
      if (
        !data.denomination ||
        !data.site_url ||
        !data.nature_service ||
        !data.email_contact
      ) {
        return "Informations incomplètes.";
      }
      return null;
    },
    generateContent: (data) => generateCGU(data as unknown as CGUData),
    extractTitle: (data) => String(data.denomination || "Service"),
    pdfHeaderTitle: (data) => String(data.denomination || "Service"),
  },

  // ===== Formalités de création / mandat =====
  {
    type: "attestation-domiciliation",
    label: "Attestation de domiciliation",
    longLabel: "Attestation de domiciliation du siège social",
    category: "statuts",
    priceCents: 900,
    originalPriceDisplay: "100",
    description:
      "Autorisation écrite d'établir le siège social d'une société à une adresse donnée.",
    features: [
      "Personne physique ou morale",
      "Acceptée au greffe",
      "Durée illimitée",
    ],
    questionnaire: ATTESTATION_DOMICILIATION_STEPS,
    initialData: {
      attestant_type: "personne_physique",
      attestant_nationalite: "Française",
      attestant_occupation: "proprietaire",
      societe_statut: "en_cours_constitution",
    },
    validate: (data) => {
      if (!data.adresse_domiciliation || !data.societe_denomination) {
        return "Adresse ou société domiciliée manquante.";
      }
      if (!data.lieu_signature || !data.date_signature) {
        return "Lieu et date de signature requis.";
      }
      return null;
    },
    generateContent: (data) =>
      generateAttestationDomiciliation(
        data as unknown as AttestationDomiciliationData
      ),
    extractTitle: (data) => String(data.societe_denomination || "Société"),
    pdfHeaderTitle: (data) => String(data.societe_denomination || "Société"),
  },
  {
    type: "declaration-non-condamnation",
    label: "Déclaration de non-condamnation",
    longLabel: "Déclaration sur l'honneur de non-condamnation",
    category: "statuts",
    priceCents: 900,
    originalPriceDisplay: "100",
    description:
      "Déclaration exigée par le greffe pour nommer un dirigeant, avec mention de filiation.",
    features: [
      "Art. L.128-1 C. com.",
      "Filiation RCS",
      "Acceptée au greffe",
    ],
    questionnaire: DECLARATION_NON_CONDAMNATION_STEPS,
    initialData: {
      nationalite: "Française",
      qualite: "Président",
    },
    validate: (data) => {
      if (!data.prenom || !data.nom || !data.date_naissance) {
        return "Informations d'identité incomplètes.";
      }
      if (!data.pere_nom || !data.mere_nom) {
        return "Filiation incomplète (requise par le greffe).";
      }
      if (!data.societe_denomination || !data.qualite) {
        return "Société ou qualité manquante.";
      }
      return null;
    },
    generateContent: (data) =>
      generateDeclarationNonCondamnation(
        data as unknown as DeclarationNonCondamnationData
      ),
    extractTitle: (data) =>
      `${String(data.prenom || "")} ${String(data.nom || "")}`.trim() ||
      "Déclaration",
    pdfHeaderTitle: (data) =>
      `${String(data.prenom || "")} ${String(data.nom || "")}`.trim() ||
      "Déclaration",
  },

  // ===== Gouvernance =====
  {
    type: "pv-ag-ordinaire",
    label: "PV d'Assemblée Générale Ordinaire",
    longLabel: "Procès-verbal d'Assemblée Générale Ordinaire",
    category: "gouvernance",
    priceCents: 2900,
    originalPriceDisplay: "400",
    description:
      "PV d'AGO avec approbation des comptes, affectation du résultat et quitus aux dirigeants.",
    features: [
      "Multi-forme (SAS, SARL, SCI, SNC, asso)",
      "Affectation du résultat",
      "Résolutions libres",
    ],
    questionnaire: PV_AG_ORDINAIRE_STEPS,
    initialData: {
      forme_juridique: "sas",
      resultat_nature: "benefice",
      quitus_dirigeants: true,
      renouvelle_cac: false,
    },
    validate: (data) => {
      if (!data.denomination || !data.siege_social) {
        return "Société incomplète.";
      }
      if (!data.date_assemblee || !data.lieu_assemblee || !data.date_cloture_exercice) {
        return "Date, lieu ou exercice manquant.";
      }
      if (!data.president_seance_nom || !data.president_seance_qualite) {
        return "Président de séance requis.";
      }
      if (!data.participants_description) {
        return "Liste des participants requise.";
      }
      return null;
    },
    generateContent: (data) =>
      generatePVAGOrdinaire(data as unknown as PVAGOrdinaireData),
    extractTitle: (data) =>
      `${String(data.denomination || "AGO")} — ${String(data.date_assemblee || "")}`,
    pdfHeaderTitle: (data) => String(data.denomination || "AGO"),
  },
  {
    type: "pv-ag-extraordinaire",
    label: "PV d'Assemblée Générale Extraordinaire",
    longLabel: "Procès-verbal d'Assemblée Générale Extraordinaire",
    category: "gouvernance",
    priceCents: 3900,
    originalPriceDisplay: "600",
    description:
      "PV d'AGE : modification des statuts, transfert de siège, augmentation de capital, dissolution, etc.",
    features: [
      "11 types de décisions",
      "Multi-forme",
      "Résolutions complémentaires",
    ],
    questionnaire: PV_AG_EXTRAORDINAIRE_STEPS,
    initialData: {
      forme_juridique: "sas",
      objet_decision: "modification_statuts",
    },
    validate: (data) => {
      if (!data.denomination || !data.siege_social) {
        return "Société incomplète.";
      }
      if (!data.date_assemblee || !data.lieu_assemblee) {
        return "Date ou lieu de l'assemblée manquant.";
      }
      if (!data.president_seance_nom || !data.president_seance_qualite) {
        return "Président de séance requis.";
      }
      if (!data.participants_description) {
        return "Liste des participants requise.";
      }
      if (!data.objet_decision) {
        return "Objet de la décision requis.";
      }
      return null;
    },
    generateContent: (data) =>
      generatePVAGExtraordinaire(data as unknown as PVAGExtraordinaireData),
    extractTitle: (data) =>
      `${String(data.denomination || "AGE")} — ${String(data.date_assemblee || "")}`,
    pdfHeaderTitle: (data) => String(data.denomination || "AGE"),
  },
  {
    type: "convocation-ag",
    label: "Convocation d'Assemblée Générale",
    longLabel: "Convocation à Assemblée Générale",
    category: "gouvernance",
    priceCents: 900,
    originalPriceDisplay: "100",
    description:
      "Lettre de convocation personnalisée, à envoyer à chaque associé dans le respect du préavis statutaire.",
    features: [
      "AGO / AGE / mixte",
      "Documents joints",
      "Rappel des délais",
    ],
    questionnaire: CONVOCATION_AG_STEPS,
    initialData: {
      forme_juridique: "sas",
      type_ag: "ordinaire",
      mode_envoi: "lrar",
    },
    validate: (data) => {
      if (!data.denomination || !data.siege_social) {
        return "Société incomplète.";
      }
      if (!data.destinataire_nom || !data.destinataire_adresse) {
        return "Destinataire incomplet.";
      }
      if (!data.date_ag || !data.heure_ag || !data.lieu_ag) {
        return "Date, heure ou lieu de l'AG manquant.";
      }
      if (!data.ordre_du_jour) {
        return "Ordre du jour requis.";
      }
      return null;
    },
    generateContent: (data) =>
      generateConvocationAG(data as unknown as ConvocationAGData),
    extractTitle: (data) =>
      `Convocation ${String(data.destinataire_nom || "")} — ${String(data.date_ag || "")}`,
    pdfHeaderTitle: (data) => String(data.denomination || "Convocation"),
  },
  {
    type: "ordre-du-jour-ag",
    label: "Ordre du jour d'Assemblée Générale",
    longLabel: "Ordre du jour d'Assemblée Générale",
    category: "gouvernance",
    priceCents: 900,
    originalPriceDisplay: "100",
    description:
      "Document formel listant les points soumis au vote, annexé à la convocation.",
    features: [
      "AGO / AGE / mixte",
      "Numérotation automatique",
      "Prêt à annexer",
    ],
    questionnaire: ORDRE_DU_JOUR_AG_STEPS,
    initialData: {
      forme_juridique: "sas",
      type_ag: "ordinaire",
    },
    validate: (data) => {
      if (!data.denomination || !data.siege_social) {
        return "Société incomplète.";
      }
      if (!data.date_ag || !data.points) {
        return "Date ou liste des points manquante.";
      }
      if (!data.etabli_par_nom || !data.etabli_par_qualite) {
        return "Auteur de l'ordre du jour manquant.";
      }
      return null;
    },
    generateContent: (data) =>
      generateOrdreDuJourAG(data as unknown as OrdreDuJourAGData),
    extractTitle: (data) =>
      `ODJ ${String(data.denomination || "AG")} — ${String(data.date_ag || "")}`,
    pdfHeaderTitle: (data) => String(data.denomination || "Ordre du jour"),
  },
  {
    type: "feuille-presence-ag",
    label: "Feuille de présence d'Assemblée Générale",
    longLabel: "Feuille de présence d'Assemblée Générale",
    category: "gouvernance",
    priceCents: 900,
    originalPriceDisplay: "100",
    description:
      "Feuille de présence à faire signer par chaque participant, annexée au PV de l'assemblée.",
    features: [
      "Multi-forme",
      "Calcul des voix",
      "Zone signatures",
    ],
    questionnaire: FEUILLE_PRESENCE_AG_STEPS,
    initialData: {
      forme_juridique: "sas",
      type_ag: "ordinaire",
    },
    validate: (data) => {
      if (!data.denomination || !data.siege_social) {
        return "Société incomplète.";
      }
      if (!data.date_ag || !data.lieu_ag) {
        return "Date ou lieu manquant.";
      }
      if (!data.participants) {
        return "Liste des participants requise.";
      }
      if (!data.president_seance_nom) {
        return "Président de séance requis.";
      }
      return null;
    },
    generateContent: (data) =>
      generateFeuillePresenceAG(data as unknown as FeuillePresenceAGData),
    extractTitle: (data) =>
      `Présence ${String(data.denomination || "AG")} — ${String(data.date_ag || "")}`,
    pdfHeaderTitle: (data) => String(data.denomination || "Présence AG"),
  },
];

// ===== Lookup helpers =====

const BY_TYPE = new Map<string, DocumentDefinition>(
  DOCUMENT_REGISTRY.map((d) => [d.type, d])
);

export function getDocumentDef(type: string): DocumentDefinition | undefined {
  return BY_TYPE.get(type);
}

export function isValidDocumentType(type: unknown): type is string {
  return typeof type === "string" && BY_TYPE.has(type);
}

export function listDocuments(): DocumentDefinition[] {
  return DOCUMENT_REGISTRY;
}

export function listByCategory(): Record<DocumentCategory, DocumentDefinition[]> {
  const out: Record<DocumentCategory, DocumentDefinition[]> = {
    statuts: [],
    gouvernance: [],
    commercial: [],
    conformite: [],
  };
  for (const d of DOCUMENT_REGISTRY) out[d.category].push(d);
  return out;
}
