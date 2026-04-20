import type { QuestionnaireStep } from "./statuts-sas";

export interface FeuillePresenceAGData {
  forme_juridique: "sas" | "sarl" | "sci" | "snc" | "association";
  denomination: string;
  capital_social?: number;
  siege_social: string;
  siren?: string;
  rcs_ville?: string;
  type_ag: "ordinaire" | "extraordinaire" | "mixte";
  date_ag: string;
  heure_ag?: string;
  lieu_ag: string;
  total_parts: number;
  participants: string;
  president_seance_nom: string;
}

export const FEUILLE_PRESENCE_AG_STEPS: QuestionnaireStep[] = [
  {
    id: "societe",
    title: "La société / structure",
    description: "Informations d'identification.",
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
        id: "capital_social",
        label: "Capital social (€)",
        type: "number",
        placeholder: "Ex : 10000",
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
      {
        id: "rcs_ville",
        label: "Ville du greffe RCS",
        type: "text",
        placeholder: "Ex : Paris",
      },
    ],
  },
  {
    id: "ag",
    title: "L'assemblée",
    description: "Date, heure et lieu.",
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
        label: "Lieu de l'assemblée",
        type: "text",
        placeholder: "Ex : au siège social",
        required: true,
      },
    ],
  },
  {
    id: "participants",
    title: "Participants",
    description:
      "Liste des associés / membres ayant participé à l'assemblée (présents, représentés ou absents).",
    fields: [
      {
        id: "total_parts",
        label: "Nombre total de parts sociales / actions émises",
        type: "number",
        placeholder: "Ex : 1000",
        required: true,
        help:
          "Pour une association, indiquez le nombre total de membres à jour de cotisation.",
      },
      {
        id: "participants",
        label: "Liste des participants",
        type: "textarea",
        placeholder:
          "Une ligne par associé/membre, format libre.\nEx :\nJean Dupont — 400 actions — présent\nMarie Martin — 300 actions — représentée par Jean Dupont (pouvoir du 10/06/2026)\nPierre Durand — 300 actions — absent",
        required: true,
        help:
          "Format conseillé : « Nom Prénom — Nombre de parts/actions — Présent / Représenté par X / Absent ».",
      },
      {
        id: "president_seance_nom",
        label: "Nom du président de séance",
        type: "text",
        placeholder: "Ex : Jean Dupont",
        required: true,
        help:
          "Le président de séance signe la feuille de présence et certifie son exactitude.",
      },
    ],
  },
];
