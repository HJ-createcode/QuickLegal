import type { QuestionnaireStep } from "./statuts-sas";

export const STATUTS_SCI_STEPS: QuestionnaireStep[] = [
  {
    id: "societe",
    title: "La société civile",
    description: "Informations générales sur la SCI à créer",
    fields: [
      {
        id: "denomination",
        label: "Dénomination sociale",
        type: "text",
        placeholder: "Ex : SCI Les Tilleuls",
        required: true,
        help: "Le nom officiel de votre SCI.",
      },
      {
        id: "objet_social",
        label: "Objet social",
        type: "textarea",
        placeholder:
          "Ex : L'acquisition, la gestion et l'administration de tous biens immobiliers...",
        required: true,
        help: "L'objet d'une SCI doit être civil (non commercial). Typiquement : acquisition, gestion et location d'immeubles.",
      },
      {
        id: "siege_social",
        label: "Adresse du siège social",
        type: "text",
        placeholder: "Ex : 10 rue de la Paix, 75002 Paris",
        required: true,
      },
      {
        id: "duree",
        label: "Durée de la société (en années)",
        type: "number",
        defaultValue: 99,
        required: true,
        help: "La durée maximale est de 99 ans, renouvelable.",
      },
    ],
  },
  {
    id: "capital",
    title: "Le capital social",
    description: "Montant et répartition du capital de la SCI",
    fields: [
      {
        id: "capital_montant",
        label: "Montant du capital social (€)",
        type: "number",
        placeholder: "Ex : 1000",
        required: true,
        help: "Il n'y a pas de capital minimum légal pour une SCI.",
      },
      {
        id: "valeur_nominale",
        label: "Valeur nominale d'une part sociale (€)",
        type: "number",
        placeholder: "Ex : 10",
        defaultValue: 10,
        required: true,
        help: "Le capital divisé par la valeur nominale donne le nombre total de parts sociales.",
      },
      {
        id: "type_apports",
        label: "Type d'apports",
        type: "select",
        options: [
          { value: "numeraire", label: "Apports en numéraire uniquement" },
          { value: "numeraire_nature", label: "Apports en numéraire et en nature (immeubles)" },
        ],
        defaultValue: "numeraire",
        required: true,
      },
    ],
  },
  {
    id: "associes",
    title: "Les associés",
    description: "Identité et répartition des parts (minimum 2 associés)",
    fields: [
      {
        id: "associes_list",
        label: "Associés",
        type: "associes",
        required: true,
        help: "Une SCI doit comporter au moins 2 associés. Ajoutez chaque associé avec sa participation.",
      },
    ],
  },
  {
    id: "gerant",
    title: "Le gérant",
    description: "Désignation du gérant de la SCI",
    fields: [
      {
        id: "gerant_type",
        label: "Le gérant est...",
        type: "select",
        options: [
          { value: "associe", label: "Un des associés" },
          { value: "tiers", label: "Une personne extérieure (tiers)" },
          { value: "cogerance", label: "Cogérance (tous les associés sont gérants)" },
        ],
        defaultValue: "associe",
        required: true,
      },
      {
        id: "gerant_index",
        label: "Quel associé est gérant ? (numéro)",
        type: "number",
        defaultValue: 1,
        help: "Numéro de l'associé dans la liste (1 = premier associé).",
      },
      {
        id: "gerant_tiers_nom",
        label: "Nom complet du gérant (si tiers)",
        type: "text",
        placeholder: "Ex : Jean Dupont",
      },
      {
        id: "gerant_tiers_adresse",
        label: "Adresse du gérant (si tiers)",
        type: "text",
        placeholder: "Ex : 5 avenue des Champs-Élysées, 75008 Paris",
      },
      {
        id: "gerant_remuneration",
        label: "Le gérant est-il rémunéré ?",
        type: "toggle",
        defaultValue: false,
      },
    ],
  },
  {
    id: "regime",
    title: "Régime fiscal et clauses",
    description: "Options fiscales et clauses particulières",
    fields: [
      {
        id: "regime_fiscal",
        label: "Régime fiscal",
        type: "select",
        options: [
          { value: "ir", label: "Impôt sur le revenu (transparent — par défaut)" },
          { value: "is", label: "Impôt sur les sociétés (option irrévocable)" },
        ],
        defaultValue: "ir",
        required: true,
        help: "Le régime IR est par défaut pour une SCI. L'option IS est irrévocable.",
      },
      {
        id: "clause_agrement",
        label: "Clause d'agrément pour les cessions",
        type: "toggle",
        defaultValue: true,
        help: "Toute cession de parts sociales à un tiers non associé doit être approuvée par les autres associés.",
      },
      {
        id: "date_cloture_exercice",
        label: "Date de clôture de l'exercice social",
        type: "select",
        options: [
          { value: "31/12", label: "31 décembre (standard)" },
          { value: "30/06", label: "30 juin" },
        ],
        defaultValue: "31/12",
        required: true,
      },
    ],
  },
];

export interface SCIAssocieData {
  nom: string;
  prenom: string;
  date_naissance: string;
  lieu_naissance: string;
  nationalite: string;
  adresse: string;
  nombre_actions: number; // parts sociales
}

export interface StatutsSCIData {
  denomination: string;
  objet_social: string;
  siege_social: string;
  duree: number;
  capital_montant: number;
  valeur_nominale: number;
  type_apports: string;
  associes_list: SCIAssocieData[];
  gerant_type: string;
  gerant_index: number;
  gerant_tiers_nom: string;
  gerant_tiers_adresse: string;
  gerant_remuneration: boolean;
  regime_fiscal: string;
  clause_agrement: boolean;
  date_cloture_exercice: string;
}
