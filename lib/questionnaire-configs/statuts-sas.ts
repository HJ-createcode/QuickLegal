export interface QuestionField {
  id: string;
  label: string;
  type: "text" | "number" | "select" | "date" | "textarea" | "toggle" | "associes";
  placeholder?: string;
  options?: { value: string; label: string }[];
  defaultValue?: string | number | boolean;
  required?: boolean;
  help?: string;
}

export interface QuestionnaireStep {
  id: string;
  title: string;
  description: string;
  fields: QuestionField[];
}

export const STATUTS_SAS_STEPS: QuestionnaireStep[] = [
  {
    id: "societe",
    title: "La société",
    description: "Informations générales sur la société à créer",
    fields: [
      {
        id: "denomination",
        label: "Dénomination sociale",
        type: "text",
        placeholder: "Ex : Ma Société",
        required: true,
        help: "Le nom officiel de votre société, tel qu'il apparaîtra sur le Kbis.",
      },
      {
        id: "objet_social",
        label: "Objet social",
        type: "textarea",
        placeholder:
          "Ex : La conception, le développement et la commercialisation de solutions logicielles...",
        required: true,
        help: "Décrivez l'activité principale de la société. Soyez suffisamment large pour couvrir vos activités futures.",
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
    description: "Montant et répartition du capital",
    fields: [
      {
        id: "capital_montant",
        label: "Montant du capital social (€)",
        type: "number",
        placeholder: "Ex : 1000",
        required: true,
        help: "Le minimum légal est de 1 €. En pratique, 1 000 € est un standard courant.",
      },
      {
        id: "valeur_nominale",
        label: "Valeur nominale d'une action (€)",
        type: "number",
        placeholder: "Ex : 10",
        defaultValue: 10,
        required: true,
        help: "Le capital divisé par la valeur nominale donne le nombre total d'actions.",
      },
      {
        id: "type_apports",
        label: "Type d'apports",
        type: "select",
        options: [
          { value: "numeraire", label: "Apports en numéraire uniquement (argent)" },
          { value: "numeraire_nature", label: "Apports en numéraire et en nature" },
        ],
        defaultValue: "numeraire",
        required: true,
      },
      {
        id: "liberation_partielle",
        label: "Libération du capital",
        type: "select",
        options: [
          { value: "totale", label: "Libération intégrale à la constitution" },
          { value: "moitie", label: "Libération de 50 % à la constitution (solde sous 5 ans)" },
        ],
        defaultValue: "totale",
        required: true,
        help: "La loi impose la libération d'au moins 50 % des apports en numéraire à la constitution.",
      },
    ],
  },
  {
    id: "associes",
    title: "Les associés",
    description: "Identité et répartition des parts entre les associés",
    fields: [
      {
        id: "associes_list",
        label: "Associés",
        type: "associes",
        required: true,
        help: "Ajoutez chaque associé avec ses informations et sa participation au capital.",
      },
    ],
  },
  {
    id: "president",
    title: "Le président",
    description: "Désignation et pouvoirs du président de la SAS",
    fields: [
      {
        id: "president_type",
        label: "Le président est...",
        type: "select",
        options: [
          { value: "associe", label: "Un des associés" },
          { value: "tiers", label: "Une personne extérieure (tiers)" },
        ],
        defaultValue: "associe",
        required: true,
      },
      {
        id: "president_index",
        label: "Quel associé est président ? (numéro)",
        type: "number",
        defaultValue: 1,
        help: "Numéro de l'associé dans la liste (1 = premier associé).",
      },
      {
        id: "president_tiers_nom",
        label: "Nom complet du président (si tiers)",
        type: "text",
        placeholder: "Ex : Jean Dupont",
      },
      {
        id: "president_tiers_adresse",
        label: "Adresse du président (si tiers)",
        type: "text",
        placeholder: "Ex : 5 avenue des Champs-Élysées, 75008 Paris",
      },
      {
        id: "president_remuneration",
        label: "Le président est-il rémunéré ?",
        type: "toggle",
        defaultValue: false,
        help: "Si oui, la rémunération sera fixée par décision collective des associés.",
      },
    ],
  },
  {
    id: "clauses",
    title: "Clauses spécifiques",
    description: "Options et clauses particulières de vos statuts",
    fields: [
      {
        id: "clause_agrement",
        label: "Clause d'agrément",
        type: "toggle",
        defaultValue: true,
        help: "Toute cession d'actions à un tiers doit être approuvée par les associés. Fortement recommandé.",
      },
      {
        id: "clause_preemption",
        label: "Clause de préemption",
        type: "toggle",
        defaultValue: true,
        help: "En cas de cession, les associés existants sont prioritaires pour racheter les actions.",
      },
      {
        id: "date_cloture_exercice",
        label: "Date de clôture de l'exercice social",
        type: "select",
        options: [
          { value: "31/12", label: "31 décembre (standard)" },
          { value: "30/06", label: "30 juin" },
          { value: "30/09", label: "30 septembre" },
          { value: "31/03", label: "31 mars" },
        ],
        defaultValue: "31/12",
        required: true,
      },
      {
        id: "distribution_dividendes",
        label: "Distribution de dividendes",
        type: "select",
        options: [
          { value: "proportionnelle", label: "Proportionnelle aux actions détenues" },
          { value: "statutaire", label: "Selon des règles statutaires spécifiques" },
        ],
        defaultValue: "proportionnelle",
        required: true,
      },
    ],
  },
];

export interface AssocieData {
  nom: string;
  prenom: string;
  date_naissance: string;
  lieu_naissance: string;
  nationalite: string;
  adresse: string;
  nombre_actions: number;
}

export interface StatutsSASData {
  denomination: string;
  objet_social: string;
  siege_social: string;
  duree: number;
  capital_montant: number;
  valeur_nominale: number;
  type_apports: string;
  liberation_partielle: string;
  associes_list: AssocieData[];
  president_type: string;
  president_index: number;
  president_tiers_nom: string;
  president_tiers_adresse: string;
  president_remuneration: boolean;
  clause_agrement: boolean;
  clause_preemption: boolean;
  date_cloture_exercice: string;
  distribution_dividendes: string;
}
