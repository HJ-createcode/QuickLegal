import type { ProductPageContent } from "./types";

export const DECLARATION_NON_CONDAMNATION_CONTENT: ProductPageContent = {
  h1: "Déclaration sur l'honneur de non-condamnation",
  promise:
    "La déclaration exigée par le greffe pour nommer un dirigeant, avec mention de filiation — acceptée dans toutes les juridictions.",
  introduction: [
    "Toute personne nommée à la direction d'une société commerciale doit justifier qu'elle n'a fait l'objet d'aucune condamnation lui interdisant l'exercice de cette fonction. Cette obligation découle de l'article L.128-1 du Code de commerce. Sans cette déclaration, le greffier refuse l'immatriculation.",
    "Notre modèle couvre les mentions requises : identité complète, filiation, qualité du mandat, engagement sur l'honneur, et renvoi aux sanctions pénales en cas de fausse déclaration. Il est accepté sans réserve par le guichet unique et par les principaux greffes.",
  ],
  audience: {
    summary:
      "Tout dirigeant nouvellement nommé, qu'il soit associé fondateur ou tiers extérieur recruté.",
    items: [
      "Président ou Directeur Général de SAS / SASU",
      "Gérant ou cogérant de SARL / EURL / SCI / SNC",
      "Administrateur et membre du directoire de SA",
      "Liquidateur nommé en cas de dissolution",
      "Toute personne appelée à engager la société par sa signature",
    ],
  },
  timing: {
    summary:
      "La déclaration accompagne le dossier d'immatriculation ou de modification déposé au guichet unique.",
    items: [
      "À la constitution, pour chaque dirigeant nommé dans les statuts",
      "Lors du changement ou de la nomination d'un nouveau dirigeant",
      "Au renouvellement d'un mandat social",
      "En cas de transformation de société avec désignation d'un nouvel organe",
    ],
  },
  contains: {
    summary:
      "Une déclaration structurée reprenant les mentions exigées par l'article R.123-54 du Code de commerce.",
    items: [
      "État civil complet : nom, nom de naissance, prénoms, date et lieu de naissance, nationalité, adresse",
      "Filiation (noms et prénoms des parents, nom de naissance de la mère)",
      "Qualité au sein de la société (Président, Gérant, DG, etc.)",
      "Engagement sur l'honneur de non-condamnation pénale, civile ou administrative interdisant la fonction",
      "Déclaration d'absence de faillite personnelle ou d'interdiction de gérer",
      "Rappel des sanctions pénales applicables en cas de fausse déclaration",
    ],
  },
  included: [
    "Mentions requises par les articles L.128-1 et R.123-54 C. com.",
    "Filiation complète, acceptée par tous les greffes",
    "Rappel des articles 441-1 et suivants du Code pénal",
    "PDF signé, accepté au guichet unique de l'INPI",
    "Conservation à vie dans votre espace client",
  ],
  notIncluded: [
    "L'extrait de casier judiciaire (document distinct, à demander sur casier-judiciaire.justice.gouv.fr)",
    "La vérification effective de votre situation judiciaire (déclaration sur l'honneur)",
    "Les formalités de dépôt au guichet unique",
  ],
  mistakes: [
    {
      title: "Omettre les noms et prénoms des parents",
      body: "L'article R.123-54 du Code de commerce exige la mention des noms et prénoms du père et de la mère, avec le nom de naissance de la mère. Un oubli entraîne un refus de prise en compte par le greffe et un retard d'immatriculation.",
    },
    {
      title: "Confondre nom d'usage et nom de naissance",
      body: "Si votre nom d'usage diffère de votre nom de naissance (mariage, adoption), les deux doivent figurer. La mention de filiation doit utiliser le nom de naissance de la mère, pas son nom d'épouse.",
    },
    {
      title: "Sous-estimer la portée de la déclaration",
      body: "La déclaration est un acte sur l'honneur assimilable à une attestation. Une fausse déclaration expose jusqu'à trois ans d'emprisonnement et 45 000 € d'amende (art. 441-1 du Code pénal), en plus de la radiation du dirigeant et de la possible dissolution de la société.",
    },
    {
      title: "Utiliser le même document pour plusieurs fonctions successives",
      body: "La déclaration est datée et vise un mandat précis. En cas de renouvellement ou de changement de qualité (passage de DG à Président, par exemple), une nouvelle déclaration doit être établie.",
    },
  ],
  faqs: [
    {
      question: "La déclaration remplace-t-elle le casier judiciaire ?",
      answer:
        "Oui, au stade de l'immatriculation. Le greffe accepte la déclaration sur l'honneur pour ne pas exiger un extrait de casier à chaque nomination. Il peut toutefois vérifier a posteriori, et toute fausse déclaration engage la responsabilité pénale du dirigeant.",
    },
    {
      question: "Pour un dirigeant étranger, la déclaration suffit-elle ?",
      answer:
        "Elle reste obligatoire. Le greffier peut toutefois demander un document équivalent du pays d'origine (casier judiciaire étranger) pour les dirigeants nommés dans certaines sociétés cotées ou soumises à des autorisations réglementaires. En pratique, pour une SAS ou une SARL classique, la déclaration sur l'honneur est suffisante.",
    },
    {
      question: "Faut-il une déclaration signée manuscritement ?",
      answer:
        "Oui, traditionnellement par la mention « Lu et approuvé » précédant la signature. La plupart des greffes acceptent désormais une signature électronique qualifiée. Notre modèle prévoit les deux usages.",
    },
    {
      question: "Que faire si j'ai eu une condamnation par le passé ?",
      answer:
        "Toute condamnation n'entraîne pas une interdiction de gérer. Seules certaines peines (faillite personnelle, banqueroute, certaines infractions économiques) emportent cette interdiction. Si vous avez un doute, consultez un avocat avant de signer — une fausse déclaration serait beaucoup plus lourde de conséquences.",
    },
    {
      question: "Une déclaration par dirigeant, ou une seule déclaration pour tous ?",
      answer:
        "Une déclaration par dirigeant. Chaque Président, Gérant ou DG produit sa propre déclaration individuelle, avec sa filiation et sa signature.",
    },
  ],
  related: [
    "statuts-sas",
    "statuts-sci",
    "attestation-domiciliation",
  ],
};
