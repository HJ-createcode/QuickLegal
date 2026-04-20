import type { QuestionnaireStep } from "./statuts-sas";

export interface MentionsLegalesData {
  // Éditeur
  forme_editeur: "societe" | "entrepreneur_individuel" | "association";
  denomination: string;
  forme_juridique?: string;
  capital_social?: number;
  siren: string;
  rcs_ville?: string;
  siege_social: string;
  tva_intra?: string;
  // Publication
  directeur_publication: string;
  // Contact
  email_contact: string;
  telephone_contact?: string;
  site_url: string;
  // Hébergeur
  hebergeur_nom: string;
  hebergeur_adresse: string;
  hebergeur_telephone?: string;
  // Activité réglementée
  activite_reglementee: boolean;
  ordre_nom?: string;
  ordre_numero?: string;
  // Médiation consommation (si B2C)
  mediation_applicable: boolean;
  mediateur_nom?: string;
  mediateur_url?: string;
}

export const MENTIONS_LEGALES_STEPS: QuestionnaireStep[] = [
  {
    id: "editeur",
    title: "L'éditeur du site",
    description:
      "Identité de la personne ou structure qui publie le site, au sens de l'article 6-III de la LCEN.",
    fields: [
      {
        id: "forme_editeur",
        label: "Nature de l'éditeur",
        type: "select",
        options: [
          { value: "societe", label: "Société" },
          { value: "entrepreneur_individuel", label: "Entrepreneur individuel / micro-entreprise" },
          { value: "association", label: "Association loi 1901" },
        ],
        defaultValue: "societe",
        required: true,
      },
      {
        id: "denomination",
        label: "Dénomination / Nom de la structure",
        type: "text",
        placeholder: "Ex : Ma Société",
        required: true,
      },
      {
        id: "forme_juridique",
        label: "Forme juridique (SAS, SARL, SCI…)",
        type: "text",
        placeholder: "Ex : SAS",
        help: "Laissez vide pour un entrepreneur individuel.",
      },
      {
        id: "capital_social",
        label: "Capital social (€)",
        type: "number",
        placeholder: "Ex : 10000",
        help: "Pour les sociétés uniquement. Laissez vide pour un entrepreneur individuel ou une association.",
      },
      {
        id: "siege_social",
        label: "Adresse du siège social / établissement principal",
        type: "text",
        placeholder: "Ex : 10 rue de la Paix, 75002 Paris",
        required: true,
      },
      {
        id: "siren",
        label: "Numéro SIREN ou SIRET",
        type: "text",
        placeholder: "Ex : 123 456 789",
        required: true,
      },
      {
        id: "rcs_ville",
        label: "Ville du greffe RCS",
        type: "text",
        placeholder: "Ex : Paris",
        help: "Pour les sociétés commerciales. Laissez vide pour les associations.",
      },
      {
        id: "tva_intra",
        label: "Numéro TVA intracommunautaire",
        type: "text",
        placeholder: "Ex : FR12 123456789",
        help: "Obligatoire si vous êtes assujetti à la TVA intra-UE.",
      },
    ],
  },
  {
    id: "publication",
    title: "Direction de publication et contact",
    description: "Informations obligatoires pour joindre l'éditeur.",
    fields: [
      {
        id: "directeur_publication",
        label: "Directeur de la publication (nom prénom)",
        type: "text",
        placeholder: "Ex : Jean Dupont",
        required: true,
        help:
          "Personne physique responsable du contenu éditorial. Pour une société, il s'agit généralement du représentant légal.",
      },
      {
        id: "site_url",
        label: "URL du site",
        type: "text",
        placeholder: "https://www.monsite.fr",
        required: true,
      },
      {
        id: "email_contact",
        label: "Email de contact",
        type: "text",
        placeholder: "contact@monsite.fr",
        required: true,
      },
      {
        id: "telephone_contact",
        label: "Téléphone de contact",
        type: "text",
        placeholder: "Ex : 01 23 45 67 89",
      },
    ],
  },
  {
    id: "hebergeur",
    title: "L'hébergeur du site",
    description:
      "L'article 6-III de la LCEN impose d'indiquer l'identité et les coordonnées de l'hébergeur.",
    fields: [
      {
        id: "hebergeur_nom",
        label: "Nom ou raison sociale de l'hébergeur",
        type: "text",
        placeholder: "Ex : Vercel Inc.",
        required: true,
      },
      {
        id: "hebergeur_adresse",
        label: "Adresse de l'hébergeur",
        type: "text",
        placeholder: "Ex : 440 N Barranca Ave #4133, Covina, CA 91723, USA",
        required: true,
      },
      {
        id: "hebergeur_telephone",
        label: "Téléphone de l'hébergeur",
        type: "text",
        placeholder: "Ex : +1 559-288-7060",
      },
    ],
  },
  {
    id: "specificites",
    title: "Activités réglementées et médiation",
    description:
      "Clauses spécifiques si vous exercez une profession réglementée ou vendez à des consommateurs.",
    fields: [
      {
        id: "activite_reglementee",
        label: "L'éditeur exerce-t-il une profession réglementée ?",
        type: "toggle",
        defaultValue: false,
        help:
          "Ex : avocat, médecin, expert-comptable, architecte, agent immobilier…",
      },
      {
        id: "ordre_nom",
        label: "Ordre / organisme professionnel",
        type: "text",
        placeholder: "Ex : Ordre des avocats du Barreau de Paris",
      },
      {
        id: "ordre_numero",
        label: "Numéro d'inscription à l'Ordre",
        type: "text",
        placeholder: "Ex : Toque C1234",
      },
      {
        id: "mediation_applicable",
        label: "Vous vendez à des consommateurs (B2C) ?",
        type: "toggle",
        defaultValue: true,
        help:
          "Dans ce cas, vous devez indiquer le médiateur de la consommation auquel vous êtes rattaché (art. L.612-1 Code conso).",
      },
      {
        id: "mediateur_nom",
        label: "Nom du médiateur de la consommation",
        type: "text",
        placeholder: "Ex : CNPM - Médiation de la consommation",
      },
      {
        id: "mediateur_url",
        label: "Site du médiateur",
        type: "text",
        placeholder: "Ex : https://cnpm-mediation-consommation.eu",
      },
    ],
  },
];
