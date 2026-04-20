import type { ProductPageContent } from "./types";

export const ORDRE_DU_JOUR_AG_CONTENT: ProductPageContent = {
  h1: "Ordre du jour d'Assemblée Générale",
  promise:
    "Un document formel listant, dans l'ordre, les points soumis au vote — à annexer à la convocation et au PV.",
  introduction: [
    "L'ordre du jour fixe le périmètre des délibérations : l'assemblée ne peut voter que sur les points qui y figurent. Un ordre du jour bien rédigé protège la société contre les décisions hors champ et sert de repère au président de séance pour conduire les débats.",
    "Notre modèle numérote automatiquement chaque point, rappelle les règles de délibération propres à chaque forme juridique et produit un document prêt à annexer à la convocation et à recopier dans le PV final.",
  ],
  audience: {
    summary:
      "Toute personne qui convoque une assemblée et souhaite formaliser clairement les points à l'étude.",
    items: [
      "Dirigeants convocants (Président de SAS, gérant de SARL ou SCI)",
      "Secrétaires d'association préparant l'assemblée statutaire",
      "Liquidateurs formalisant les décisions de fin de vie sociale",
      "Associés minoritaires requérant l'inscription de résolutions additionnelles",
    ],
  },
  timing: {
    summary:
      "L'ordre du jour est établi avant l'envoi de la convocation. Il peut être complété dans les délais légaux par des demandes d'inscription de résolutions.",
    items: [
      "Avant l'envoi de la convocation, en même temps que sa préparation",
      "À modifier si des associés demandent l'ajout d'une résolution (art. L.225-105 pour la SA, règles similaires)",
      "À recopier en tête du PV lors de la tenue de l'assemblée",
      "À conserver dans le registre des assemblées pendant 10 ans",
    ],
  },
  contains: {
    summary:
      "Un document court, intelligible, prêt à joindre à tout dossier d'AG.",
    items: [
      "Identification de la société (dénomination, forme, siège, SIREN)",
      "Type d'assemblée (ordinaire, extraordinaire, mixte)",
      "Date et heure prévues pour l'assemblée",
      "Lieu de réunion",
      "Liste numérotée des points soumis au vote",
      "Mention « Questions diverses et pouvoirs pour les formalités »",
      "Rappel que l'assemblée ne peut délibérer que sur les points inscrits",
      "Signature de l'auteur (dirigeant, organe compétent)",
    ],
  },
  included: [
    "Numérotation automatique des points",
    "Adaptation aux formes juridiques (SAS, SARL, SCI, SNC, association)",
    "Rappel de la règle de l'article L.225-105 sur les délibérations hors ordre du jour",
    "Mise en page prête à annexer à la convocation",
    "Accès à vie au document dans votre espace client",
  ],
  notIncluded: [
    "La convocation proprement dite (document séparé, à générer avec notre modèle dédié)",
    "Les projets de résolutions détaillés à voter (rédigés dans la convocation ou joints)",
    "La feuille de présence (document distinct)",
  ],
  mistakes: [
    {
      title: "Rédiger des intitulés trop vagues",
      body: "« Questions diverses » ou « Divers » ne couvre que les sujets mineurs et non des décisions importantes. Pour une décision structurante, rédigez un point explicite et autoportant que chaque associé comprendra sans contexte.",
    },
    {
      title: "Oublier d'inscrire à l'ordre du jour les pouvoirs pour formalités",
      body: "Les formalités de dépôt au greffe et de publication légale exigent un mandat spécial. Inscrivez systématiquement en dernier point « Pouvoirs pour formalités » pour éviter un retour en assemblée après coup.",
    },
    {
      title: "Modifier l'ordre du jour après l'envoi de la convocation",
      body: "Toute modification après envoi rend l'assemblée irrégulière. Si un point nouveau est nécessaire, convoquez une assemblée complémentaire ou attendez l'assemblée suivante. Les statuts peuvent prévoir un mécanisme dérogatoire.",
    },
    {
      title: "Voter sur un point absent de l'ordre du jour",
      body: "Une décision prise hors ordre du jour est annulable. La jurisprudence est stricte : même l'unanimité des associés présents ne suffit pas toujours à régulariser. Tenez-vous à la liste préparée.",
    },
  ],
  faqs: [
    {
      question: "L'ordre du jour est-il obligatoire pour toutes les assemblées ?",
      answer:
        "Oui, pour les assemblées de sociétés commerciales et d'associations disposant d'un pacte social ou statutaire. Seules les décisions prises à l'unanimité des associés, hors assemblée formelle, peuvent se passer d'ordre du jour écrit — cas très rare en pratique.",
    },
    {
      question: "Qui rédige l'ordre du jour ?",
      answer:
        "En principe, l'organe qui convoque (Président, gérant, bureau). Dans certaines formes sociales, des associés détenant une fraction minimale du capital peuvent demander l'inscription de points supplémentaires. Notre modèle attribue l'ordre du jour à l'auteur de la convocation.",
    },
    {
      question: "Peut-on voter plusieurs résolutions sur un seul point ?",
      answer:
        "Oui, à condition que chaque résolution concernée figure distinctement dans le texte de l'ordre du jour. Une formulation du type « Modification des articles 4 et 7 des statuts » est acceptable si les deux modifications sont détaillées dans les projets joints à la convocation.",
    },
    {
      question: "Faut-il signer l'ordre du jour ?",
      answer:
        "L'usage recommande une signature de l'auteur, car elle authentifie le document annexé à la convocation. Notre modèle inclut une zone de signature avec lieu et date.",
    },
    {
      question: "Un associé peut-il demander l'ajout d'un point ?",
      answer:
        "Oui, sous conditions : en SARL, un associé peut demander une convocation d'AG s'il détient une certaine fraction du capital (art. L.223-27 C. com.). En SAS, les statuts fixent la règle. Le point demandé doit être inscrit à l'ordre du jour si la demande est régulière.",
    },
  ],
  related: [
    "convocation-ag",
    "feuille-presence-ag",
    "pv-ag-ordinaire",
  ],
};
