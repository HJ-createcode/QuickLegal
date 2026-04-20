import type { ProductPageContent } from "./types";

export const STATUTS_SCI_CONTENT: ProductPageContent = {
  h1: "Statuts de SCI, pour investir à plusieurs dans l'immobilier",
  promise:
    "Un acte constitutif conforme au Code civil, adapté à votre projet patrimonial, avec le choix du régime fiscal et les clauses d'agrément nécessaires.",
  introduction: [
    "La société civile immobilière est l'outil de référence pour acquérir et gérer un bien immobilier à plusieurs, qu'il s'agisse d'un projet familial, d'un investissement locatif ou d'une opération patrimoniale. Elle simplifie la détention, organise la transmission et facilite la gestion des revenus locatifs.",
    "Nos statuts couvrent les particularités de la forme civile — parts sociales et non actions, pluralité obligatoire d'associés, responsabilité indéfinie des associés — et vous laissent choisir entre impôt sur le revenu et impôt sur les sociétés en connaissance de cause.",
  ],
  audience: {
    summary:
      "La SCI s'adresse à tout groupe d'au moins deux personnes qui veut détenir ensemble un bien immobilier de manière organisée.",
    items: [
      "Couples non mariés souhaitant acquérir leur résidence principale sans indivision",
      "Familles organisant la transmission d'un bien entre parents et enfants",
      "Fratries héritant d'un bien et cherchant à sortir du régime d'indivision",
      "Investisseurs locatifs constituant un patrimoine à plusieurs",
      "Dirigeants isolant l'immobilier d'exploitation de leur société opérationnelle",
    ],
  },
  timing: {
    summary:
      "Les statuts sont signés avant l'acquisition du bien, pour que la SCI soit acheteur le jour de la signature chez le notaire.",
    items: [
      "Avant la signature du compromis de vente du bien à acquérir",
      "Au moment d'un apport d'un bien détenu en indivision",
      "Pour une restructuration patrimoniale (transfert de biens entre structures)",
      "À l'occasion d'un rachat familial de parts d'une SCI existante",
    ],
  },
  contains: {
    summary:
      "Environ 20 articles calibrés pour la forme civile : pas d'actions, pas de commissaire aux comptes, pas de RCS obligatoire pour l'activité civile.",
    items: [
      "Dénomination, siège, objet (civil, non commercial), durée jusqu'à 99 ans",
      "Capital et parts sociales, valeur nominale, apports en numéraire ou en nature",
      "Choix du régime fiscal : IR transparent ou IS irrévocable",
      "Nomination d'un gérant associé, d'un gérant tiers ou d'une cogérance",
      "Pouvoirs du gérant et limites aux actes les plus graves",
      "Clause d'agrément pour les cessions de parts hors cercle familial",
      "Modalités des décisions collectives et règles de majorité",
      "Affectation des résultats et distribution des bénéfices",
      "Transmission des parts en cas de décès",
      "Exercice social, clôture et approbation des comptes",
    ],
  },
  included: [
    "PDF final prêt à signer, conforme aux articles 1832 et suivants du Code civil",
    "Option IR ou IS avec mise en garde sur l'irrévocabilité de l'IS",
    "Clause d'agrément paramétrable (exclusion possible pour les cessions entre époux, ascendants, descendants)",
    "Structuration compatible avec la détention d'une résidence principale",
    "Accès à vie au document dans votre espace client",
  ],
  notIncluded: [
    "L'évaluation du bien immobilier à apporter ou à acquérir",
    "La simulation fiscale IR vs IS (arbitrage à faire avec votre conseil)",
    "La rédaction de l'acte notarié d'acquisition du bien",
    "Le dépôt au SIE et les formalités de déclaration des revenus fonciers",
  ],
  mistakes: [
    {
      title: "Créer une SCI seul",
      body: "La SCI exige au minimum deux associés (article 1832 du Code civil). Une SCI unipersonnelle n'existe pas : si vous êtes seul, l'achat en nom propre ou via une SASU familiale reste plus adapté.",
    },
    {
      title: "Opter pour l'IS sans avoir simulé les conséquences",
      body: "L'option pour l'impôt sur les sociétés est irrévocable et change complètement le régime fiscal de la SCI (amortissement du bien, mais imposition double des dividendes). Ne basculez pas à l'IS sans une simulation avec votre expert-comptable.",
    },
    {
      title: "Oublier la clause d'agrément sur les parts",
      body: "Sans clause d'agrément, un associé peut céder ses parts librement, y compris à un tiers avec qui vous n'avez aucune affinité. Pour une SCI familiale, une clause d'agrément avec exclusion pour les cessions aux descendants directs est l'équilibre le plus courant.",
    },
    {
      title: "Rédiger un objet social commercial",
      body: "Une SCI qui exerce une activité commerciale (achat-revente, location meublée habituelle) bascule automatiquement en société de fait commerciale et perd le bénéfice du régime civil. Limitez l'objet à la gestion patrimoniale et à la location nue.",
    },
    {
      title: "Confondre parts sociales et actions",
      body: "La cession de parts de SCI est formellement lourde : enregistrement au SIE dans le mois, droits d'enregistrement de 5 %, agrément éventuel des coassociés. Anticipez cette lourdeur au moment de rédiger les statuts.",
    },
  ],
  faqs: [
    {
      question: "Puis-je créer une SCI pour acheter ma résidence principale ?",
      answer:
        "Oui, mais la SCI à l'IR reste plus adaptée qu'une SCI à l'IS dans ce cas, car la transparence fiscale conserve les avantages applicables à la résidence principale (plus-value exonérée à la revente, par exemple).",
    },
    {
      question: "La SCI doit-elle être immatriculée au RCS ?",
      answer:
        "Oui. Toute SCI doit être immatriculée au RCS du ressort de son siège social, même si son activité est purement civile. Le dépôt s'effectue via le guichet unique de l'INPI.",
    },
    {
      question: "Quelle est la responsabilité des associés d'une SCI ?",
      answer:
        "Les associés d'une SCI sont responsables indéfiniment des dettes sociales, à proportion de leur part dans le capital. Contrairement à une SARL ou à une SAS, leur patrimoine personnel peut être engagé en cas de dette impayée par la société.",
    },
    {
      question: "Puis-je détenir des parts de SCI avec des enfants mineurs ?",
      answer:
        "Oui. Les parents exercent alors la gérance des parts au nom des enfants. Une autorisation du juge des tutelles est nécessaire pour certains actes importants (cession, hypothèque). C'est un schéma courant de transmission patrimoniale précoce.",
    },
    {
      question: "Une SCI peut-elle acheter un bien à crédit ?",
      answer:
        "Oui. La SCI contracte l'emprunt en son nom ; les associés se portent généralement cautions. Les statuts doivent autoriser le gérant à engager ce type d'acte — notre modèle prévoit cette faculté par défaut.",
    },
    {
      question: "Comment transmettre des parts de SCI à ses enfants ?",
      answer:
        "La donation de parts de SCI bénéficie des abattements classiques (100 000 € par parent et par enfant tous les 15 ans) et d'une décote éventuelle pour tenir compte des contraintes liées aux parts. C'est un outil patrimonial puissant, à utiliser en coordination avec un notaire.",
    },
  ],
  related: [
    "declaration-non-condamnation",
    "attestation-domiciliation",
    "pv-ag-ordinaire",
  ],
};
