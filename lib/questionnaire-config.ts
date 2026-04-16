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
    title: "La societe",
    description: "Informations generales sur la societe a creer",
    fields: [
      {
        id: "denomination",
        label: "Denomination sociale",
        type: "text",
        placeholder: "Ex : Ma Societe",
        required: true,
        help: "Le nom officiel de votre societe, tel qu'il apparaitra sur le Kbis.",
      },
      {
        id: "objet_social",
        label: "Objet social",
        type: "textarea",
        placeholder:
          "Ex : La conception, le developpement et la commercialisation de solutions logicielles...",
        required: true,
        help: "Decrivez l'activite principale de la societe. Soyez suffisamment large pour couvrir vos activites futures.",
      },
      {
        id: "siege_social",
        label: "Adresse du siege social",
        type: "text",
        placeholder: "Ex : 10 rue de la Paix, 75002 Paris",
        required: true,
      },
      {
        id: "duree",
        label: "Duree de la societe (en annees)",
        type: "number",
        defaultValue: 99,
        required: true,
        help: "La duree maximale est de 99 ans, renouvelable.",
      },
    ],
  },
  {
    id: "capital",
    title: "Le capital social",
    description: "Montant et repartition du capital",
    fields: [
      {
        id: "capital_montant",
        label: "Montant du capital social (EUR)",
        type: "number",
        placeholder: "Ex : 1000",
        required: true,
        help: "Le minimum legal est de 1 EUR. En pratique, 1 000 EUR est un standard courant.",
      },
      {
        id: "valeur_nominale",
        label: "Valeur nominale d'une action (EUR)",
        type: "number",
        placeholder: "Ex : 10",
        defaultValue: 10,
        required: true,
        help: "Le capital divise par la valeur nominale donne le nombre total d'actions.",
      },
      {
        id: "type_apports",
        label: "Type d'apports",
        type: "select",
        options: [
          { value: "numeraire", label: "Apports en numeraire uniquement (argent)" },
          { value: "numeraire_nature", label: "Apports en numeraire et en nature" },
        ],
        defaultValue: "numeraire",
        required: true,
      },
      {
        id: "liberation_partielle",
        label: "Liberation partielle du capital",
        type: "select",
        options: [
          { value: "totale", label: "Liberation integrale a la constitution" },
          { value: "moitie", label: "Liberation de 50% a la constitution (solde sous 5 ans)" },
        ],
        defaultValue: "totale",
        required: true,
        help: "La loi impose la liberation d'au moins 50% des apports en numeraire a la constitution.",
      },
    ],
  },
  {
    id: "associes",
    title: "Les associes",
    description: "Identite et repartition des parts entre les associes",
    fields: [
      {
        id: "associes_list",
        label: "Associes",
        type: "associes",
        required: true,
        help: "Ajoutez chaque associe avec ses informations et sa participation au capital.",
      },
    ],
  },
  {
    id: "president",
    title: "Le president",
    description: "Designation et pouvoirs du president de la SAS",
    fields: [
      {
        id: "president_type",
        label: "Le president est...",
        type: "select",
        options: [
          { value: "associe", label: "Un des associes" },
          { value: "tiers", label: "Une personne exterieure (tiers)" },
        ],
        defaultValue: "associe",
        required: true,
      },
      {
        id: "president_index",
        label: "Quel associe est president ? (numero)",
        type: "number",
        defaultValue: 1,
        help: "Numero de l'associe dans la liste (1 = premier associe).",
      },
      {
        id: "president_tiers_nom",
        label: "Nom complet du president (si tiers)",
        type: "text",
        placeholder: "Ex : Jean Dupont",
      },
      {
        id: "president_tiers_adresse",
        label: "Adresse du president (si tiers)",
        type: "text",
        placeholder: "Ex : 5 avenue des Champs-Elysees, 75008 Paris",
      },
      {
        id: "president_remuneration",
        label: "Le president est-il remunere ?",
        type: "toggle",
        defaultValue: false,
        help: "Si oui, la remuneration sera fixee par decision collective des associes.",
      },
    ],
  },
  {
    id: "clauses",
    title: "Clauses specifiques",
    description: "Options et clauses particulieres de vos statuts",
    fields: [
      {
        id: "clause_agrement",
        label: "Clause d'agrement",
        type: "toggle",
        defaultValue: true,
        help: "Toute cession d'actions a un tiers doit etre approuvee par les associes. Fortement recommande.",
      },
      {
        id: "clause_preemption",
        label: "Clause de preemption",
        type: "toggle",
        defaultValue: true,
        help: "En cas de cession, les associes existants sont prioritaires pour racheter les actions.",
      },
      {
        id: "date_cloture_exercice",
        label: "Date de cloture de l'exercice social",
        type: "select",
        options: [
          { value: "31/12", label: "31 decembre (standard)" },
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
          { value: "proportionnelle", label: "Proportionnelle aux actions detenues" },
          { value: "statutaire", label: "Selon des regles statutaires specifiques" },
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
  // Societe
  denomination: string;
  objet_social: string;
  siege_social: string;
  duree: number;
  // Capital
  capital_montant: number;
  valeur_nominale: number;
  type_apports: string;
  liberation_partielle: string;
  // Associes
  associes_list: AssocieData[];
  // President
  president_type: string;
  president_index: number;
  president_tiers_nom: string;
  president_tiers_adresse: string;
  president_remuneration: boolean;
  // Clauses
  clause_agrement: boolean;
  clause_preemption: boolean;
  date_cloture_exercice: string;
  distribution_dividendes: string;
}
