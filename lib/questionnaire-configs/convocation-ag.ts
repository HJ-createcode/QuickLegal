import type { QuestionnaireStep } from "./statuts-sas";

export interface ConvocationAGData {
  // Société
  forme_juridique: "sas" | "sarl" | "sci" | "snc" | "association";
  denomination: string;
  capital_social?: number;
  siege_social: string;
  siren?: string;
  rcs_ville?: string;
  // Expéditeur
  expediteur_nom: string;
  expediteur_qualite: string;
  // Destinataire
  destinataire_nom: string;
  destinataire_adresse: string;
  // AG
  type_ag: "ordinaire" | "extraordinaire" | "mixte";
  date_ag: string;
  heure_ag: string;
  lieu_ag: string;
  // Ordre du jour
  ordre_du_jour: string;
  // Documents mis à disposition
  documents_joints?: string;
  // Logistique
  mode_envoi: "lrar" | "email" | "remise_en_mains_propres";
  date_envoi: string;
  lieu_signature: string;
}

export const CONVOCATION_AG_STEPS: QuestionnaireStep[] = [
  {
    id: "societe",
    title: "La société / structure",
    description: "Identification de la personne morale qui convoque.",
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
    id: "expediteur",
    title: "Auteur de la convocation",
    description: "Personne habilitée à convoquer l'assemblée.",
    fields: [
      {
        id: "expediteur_nom",
        label: "Nom et prénom",
        type: "text",
        placeholder: "Ex : Jean Dupont",
        required: true,
      },
      {
        id: "expediteur_qualite",
        label: "Qualité (pouvoir de convocation)",
        type: "text",
        placeholder: "Ex : Président, Gérant",
        required: true,
        help:
          "Pour une SARL, le gérant est compétent (art. L.223-27 C. com.). Pour une SAS, les statuts déterminent l'organe compétent.",
      },
    ],
  },
  {
    id: "destinataire",
    title: "Destinataire de la convocation",
    description: "Associé, membre ou mandataire convoqué.",
    fields: [
      {
        id: "destinataire_nom",
        label: "Nom et prénom du destinataire",
        type: "text",
        placeholder: "Ex : Marie Martin",
        required: true,
        help: "Générez une convocation par destinataire.",
      },
      {
        id: "destinataire_adresse",
        label: "Adresse du destinataire",
        type: "text",
        placeholder: "Ex : 20 rue Victor Hugo, 75016 Paris",
        required: true,
      },
    ],
  },
  {
    id: "assemblee",
    title: "Tenue de l'assemblée",
    description:
      "Type d'AG, date, heure et lieu de réunion.",
    fields: [
      {
        id: "type_ag",
        label: "Type d'assemblée",
        type: "select",
        options: [
          { value: "ordinaire", label: "Ordinaire (AGO)" },
          { value: "extraordinaire", label: "Extraordinaire (AGE)" },
          { value: "mixte", label: "Mixte (ordinaire et extraordinaire)" },
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
        required: true,
      },
      {
        id: "lieu_ag",
        label: "Lieu",
        type: "text",
        placeholder: "Ex : au siège social, 10 rue de la Paix, 75002 Paris",
        required: true,
      },
    ],
  },
  {
    id: "ordre",
    title: "Ordre du jour",
    description: "Points qui seront soumis à l'assemblée.",
    fields: [
      {
        id: "ordre_du_jour",
        label: "Points à l'ordre du jour",
        type: "textarea",
        placeholder:
          "Un par ligne. Ex :\nApprobation des comptes de l'exercice clos le 31/12/2025\nAffectation du résultat\nQuitus au gérant\nQuestions diverses",
        required: true,
        help:
          "Inscrivez chaque point sur une ligne. Ils seront numérotés automatiquement dans la convocation.",
      },
      {
        id: "documents_joints",
        label: "Documents joints ou mis à disposition",
        type: "textarea",
        placeholder:
          "Un par ligne. Ex :\nComptes annuels et annexes\nRapport de gestion\nTexte des résolutions proposées\nFormulaire de pouvoir",
        help:
          "Pour une AGO d'approbation des comptes, ces documents doivent être communiqués en amont conformément à l'article L.223-26 (SARL) ou aux statuts (SAS).",
      },
    ],
  },
  {
    id: "logistique",
    title: "Envoi et signature",
    description: "Modalités d'envoi de la convocation.",
    fields: [
      {
        id: "mode_envoi",
        label: "Mode d'envoi",
        type: "select",
        options: [
          { value: "lrar", label: "Lettre recommandée avec accusé de réception" },
          { value: "email", label: "Email (si prévu par les statuts / accord préalable)" },
          { value: "remise_en_mains_propres", label: "Remise en mains propres contre décharge" },
        ],
        defaultValue: "lrar",
        required: true,
        help:
          "En SARL, le délai légal minimal est de 15 jours avant la date de l'assemblée (art. R.223-20 C. com.). Les statuts peuvent prévoir un délai plus long.",
      },
      {
        id: "date_envoi",
        label: "Date d'envoi (JJ/MM/AAAA)",
        type: "text",
        placeholder: "Ex : 25/05/2026",
        required: true,
      },
      {
        id: "lieu_signature",
        label: "Lieu de signature",
        type: "text",
        placeholder: "Ex : Paris",
        required: true,
      },
    ],
  },
];
