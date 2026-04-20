import type { QuestionnaireStep } from "./statuts-sas";

export interface OrdreDuJourAGData {
  forme_juridique: "sas" | "sarl" | "sci" | "snc" | "association";
  denomination: string;
  siege_social: string;
  siren?: string;
  type_ag: "ordinaire" | "extraordinaire" | "mixte";
  date_ag: string;
  heure_ag?: string;
  lieu_ag?: string;
  points: string;
  etabli_par_nom: string;
  etabli_par_qualite: string;
  lieu_signature: string;
  date_signature: string;
}

export const ORDRE_DU_JOUR_AG_STEPS: QuestionnaireStep[] = [
  {
    id: "societe",
    title: "La société / structure",
    description:
      "Identification de la personne morale dont l'assemblée va se tenir.",
    fields: [
      {
        id: "forme_juridique",
        label: "Forme juridique",
        type: "select",
        options: [
          { value: "sas", label: "SAS / SASU" },
          { value: "sarl", label: "SARL / EURL" },
          { value: "sci", label: "SCI" },
          { value: "snc", label: "SNC" },
          { value: "association", label: "Association loi 1901" },
        ],
        defaultValue: "sas",
        required: true,
      },
      {
        id: "denomination",
        label: "Dénomination sociale",
        type: "text",
        placeholder: "Ex : MA SOCIETE",
        required: true,
      },
      {
        id: "siege_social",
        label: "Adresse du siège social",
        type: "text",
        placeholder: "Ex : 10 rue de la Paix, 75002 Paris",
        required: true,
      },
      {
        id: "siren",
        label: "Numéro SIREN",
        type: "text",
        placeholder: "Ex : 123 456 789",
      },
    ],
  },
  {
    id: "ag",
    title: "Assemblée concernée",
    description: "Date et nature de l'assemblée.",
    fields: [
      {
        id: "type_ag",
        label: "Type d'assemblée",
        type: "select",
        options: [
          { value: "ordinaire", label: "Ordinaire (AGO)" },
          { value: "extraordinaire", label: "Extraordinaire (AGE)" },
          { value: "mixte", label: "Mixte" },
        ],
        defaultValue: "ordinaire",
        required: true,
      },
      {
        id: "date_ag",
        label: "Date de l'assemblée (JJ/MM/AAAA)",
        type: "text",
        placeholder: "Ex : 15/06/2026",
        required: true,
      },
      {
        id: "heure_ag",
        label: "Heure",
        type: "text",
        placeholder: "Ex : 10h00",
      },
      {
        id: "lieu_ag",
        label: "Lieu",
        type: "text",
        placeholder: "Ex : au siège social",
      },
    ],
  },
  {
    id: "points",
    title: "Points à l'ordre du jour",
    description:
      "Listez les points qui seront soumis au vote, en vous assurant de leur clarté et de leur précision.",
    fields: [
      {
        id: "points",
        label: "Points à l'ordre du jour",
        type: "textarea",
        placeholder:
          "Un par ligne. Ex :\nApprobation des comptes annuels de l'exercice clos le 31/12/2025\nAffectation du résultat\nQuitus au Président\nRenouvellement du mandat du commissaire aux comptes\nQuestions diverses et pouvoirs",
        required: true,
        help:
          "Chaque point sera numéroté automatiquement. L'assemblée ne peut délibérer que sur les points figurant à l'ordre du jour (art. L.225-105 C. com.).",
      },
    ],
  },
  {
    id: "signature",
    title: "Auteur de l'ordre du jour",
    description:
      "L'ordre du jour est établi par l'auteur de la convocation.",
    fields: [
      {
        id: "etabli_par_nom",
        label: "Nom et prénom",
        type: "text",
        placeholder: "Ex : Jean Dupont",
        required: true,
      },
      {
        id: "etabli_par_qualite",
        label: "Qualité",
        type: "text",
        placeholder: "Ex : Président, Gérant",
        required: true,
      },
      {
        id: "lieu_signature",
        label: "Lieu de signature",
        type: "text",
        placeholder: "Ex : Paris",
        required: true,
      },
      {
        id: "date_signature",
        label: "Date de signature",
        type: "text",
        placeholder: "Ex : 25/05/2026",
        required: true,
      },
    ],
  },
];
