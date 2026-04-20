import type { QuestionnaireStep } from "./statuts-sas";

export interface PVAGOrdinaireData {
  // Société
  forme_juridique: "sas" | "sarl" | "sci" | "snc" | "association";
  denomination: string;
  capital_social?: number;
  siege_social: string;
  siren?: string;
  rcs_ville?: string;
  // Exercice
  date_cloture_exercice: string;
  // Assemblée
  date_assemblee: string;
  heure_assemblee?: string;
  lieu_assemblee: string;
  // Présidence
  president_seance_nom: string;
  president_seance_qualite: string;
  secretaire_seance_nom?: string;
  // Quorum
  total_parts: number;
  participants_description: string;
  // Résultats
  resultat_montant: number;
  resultat_nature: "benefice" | "perte";
  // Affectation du résultat
  dotation_reserve_legale?: number;
  dotation_reserve_facultative?: number;
  distribution_dividende?: number;
  report_a_nouveau?: number;
  // Quitus
  quitus_dirigeants: boolean;
  nom_dirigeant_quitus?: string;
  // CAC
  renouvelle_cac: boolean;
  nom_cac?: string;
  // Autres
  autres_resolutions?: string;
}

export const PV_AG_ORDINAIRE_STEPS: QuestionnaireStep[] = [
  {
    id: "societe",
    title: "La société / structure",
    description:
      "Informations d'identification de la personne morale dont se tient l'assemblée.",
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
        help:
          "Détermine la terminologie utilisée (associés / membres, parts / actions, Président / gérant, etc.) et les règles de majorité applicables.",
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
        id: "capital_social",
        label: "Capital social (€)",
        type: "number",
        placeholder: "Ex : 10000",
        help: "À renseigner pour les sociétés. Laissez vide pour les associations.",
      },
      {
        id: "siren",
        label: "Numéro SIREN",
        type: "text",
        placeholder: "Ex : 123 456 789",
        help: "À renseigner pour les sociétés immatriculées.",
      },
      {
        id: "rcs_ville",
        label: "Ville du greffe RCS",
        type: "text",
        placeholder: "Ex : Paris",
        help: "Pour les sociétés commerciales uniquement.",
      },
    ],
  },
  {
    id: "assemblee",
    title: "Tenue de l'assemblée",
    description: "Date, lieu et exercice concerné.",
    fields: [
      {
        id: "date_cloture_exercice",
        label: "Date de clôture de l'exercice approuvé (JJ/MM/AAAA)",
        type: "text",
        placeholder: "Ex : 31/12/2025",
        required: true,
      },
      {
        id: "date_assemblee",
        label: "Date de l'assemblée (JJ/MM/AAAA)",
        type: "text",
        placeholder: "Ex : 15/06/2026",
        required: true,
        help:
          "L'AGO d'approbation des comptes doit en principe être tenue dans les six mois suivant la clôture de l'exercice (art. L.225-100, L.223-26 C. com.).",
      },
      {
        id: "heure_assemblee",
        label: "Heure",
        type: "text",
        placeholder: "Ex : 10h00",
      },
      {
        id: "lieu_assemblee",
        label: "Lieu de l'assemblée",
        type: "text",
        placeholder: "Ex : au siège social, à Paris",
        required: true,
        help: "Indiquez si elle s'est tenue au siège, à distance, ou dans un autre lieu.",
      },
    ],
  },
  {
    id: "presidence",
    title: "Bureau de l'assemblée",
    description:
      "Président et secrétaire de séance. Pour une SAS, le bureau est facultatif sauf stipulation statutaire contraire.",
    fields: [
      {
        id: "president_seance_nom",
        label: "Nom et prénom du président de séance",
        type: "text",
        placeholder: "Ex : Jean Dupont",
        required: true,
      },
      {
        id: "president_seance_qualite",
        label: "Qualité du président de séance",
        type: "text",
        placeholder: "Ex : Président, Gérant, associé désigné à cet effet",
        required: true,
      },
      {
        id: "secretaire_seance_nom",
        label: "Nom et prénom du secrétaire de séance (facultatif)",
        type: "text",
        placeholder: "Ex : Marie Martin",
      },
    ],
  },
  {
    id: "participants",
    title: "Participants et quorum",
    description:
      "Liste des associés/membres présents, représentés ou absents et nombre total de parts/actions.",
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
        id: "participants_description",
        label: "Liste des participants",
        type: "textarea",
        placeholder:
          "Un par ligne, format libre.\nEx :\nJean Dupont — 400 actions — présent\nMarie Martin — 300 actions — représentée par Jean Dupont\nPierre Durand — 300 actions — représenté par pouvoir",
        required: true,
        help:
          "Inscrivez une ligne par participant, en indiquant nom, nombre de parts/actions détenues et statut (présent / représenté / absent).",
      },
    ],
  },
  {
    id: "resultat",
    title: "Résultat de l'exercice",
    description: "Les comptes de l'exercice clos.",
    fields: [
      {
        id: "resultat_nature",
        label: "Nature du résultat",
        type: "select",
        options: [
          { value: "benefice", label: "Bénéfice" },
          { value: "perte", label: "Perte" },
        ],
        defaultValue: "benefice",
        required: true,
      },
      {
        id: "resultat_montant",
        label: "Montant du résultat (€, en valeur absolue)",
        type: "number",
        placeholder: "Ex : 15000",
        required: true,
        help: "Indiquez le montant positif ; la nature ci-dessus indique si c'est un bénéfice ou une perte.",
      },
    ],
  },
  {
    id: "affectation",
    title: "Affectation du résultat",
    description:
      "Répartition du bénéfice ou imputation de la perte. La somme doit égaler le résultat.",
    fields: [
      {
        id: "dotation_reserve_legale",
        label: "Dotation à la réserve légale (€)",
        type: "number",
        placeholder: "Ex : 750",
        help:
          "5 % minimum du bénéfice, jusqu'à ce que la réserve atteigne 10 % du capital (art. L.232-10 C. com.). Laissez vide pour une association ou en cas de perte.",
      },
      {
        id: "dotation_reserve_facultative",
        label: "Dotation à une réserve facultative ou statutaire (€)",
        type: "number",
        placeholder: "Ex : 2000",
      },
      {
        id: "distribution_dividende",
        label: "Dividendes distribués (€)",
        type: "number",
        placeholder: "Ex : 10000",
        help:
          "Pour les sociétés uniquement et uniquement en cas de bénéfice distribuable. Laissez vide si pas de distribution.",
      },
      {
        id: "report_a_nouveau",
        label: "Report à nouveau (€)",
        type: "number",
        placeholder: "Ex : 2250",
        help: "Le solde non affecté ci-dessus. En cas de perte, inscrire la perte reportée.",
      },
    ],
  },
  {
    id: "autres",
    title: "Autres résolutions",
    description:
      "Quitus aux dirigeants, renouvellement du commissaire aux comptes, et autres décisions.",
    fields: [
      {
        id: "quitus_dirigeants",
        label: "Donner quitus au(x) dirigeant(s) pour l'exercice écoulé ?",
        type: "toggle",
        defaultValue: true,
      },
      {
        id: "nom_dirigeant_quitus",
        label: "Nom du (des) dirigeant(s) à qui donner quitus",
        type: "text",
        placeholder: "Ex : Jean Dupont, Président",
        help: "Vous pouvez nommer plusieurs personnes séparées par des virgules.",
      },
      {
        id: "renouvelle_cac",
        label: "Renouveler le mandat du commissaire aux comptes ?",
        type: "toggle",
        defaultValue: false,
        help:
          "Cochez si la société est dotée d'un CAC dont le mandat arrive à échéance.",
      },
      {
        id: "nom_cac",
        label: "Nom du commissaire aux comptes",
        type: "text",
        placeholder: "Ex : Cabinet ABC, représenté par M. X",
        help: "À remplir uniquement si vous renouvelez le mandat du CAC.",
      },
      {
        id: "autres_resolutions",
        label: "Autres résolutions à acter",
        type: "textarea",
        placeholder:
          "Ex :\n- Fixation de la rémunération du Président à 30 000 € bruts annuels\n- Approbation d'une convention réglementée relative au prêt d'associé du 01/03/2026",
        help:
          "Une résolution par ligne. Ces résolutions seront numérotées à la suite des résolutions principales.",
      },
    ],
  },
];
