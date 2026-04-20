import type { ProductPageContent } from "./types";

export const FEUILLE_PRESENCE_AG_CONTENT: ProductPageContent = {
  h1: "Feuille de présence d'Assemblée Générale",
  promise:
    "Le document signé par chaque participant, attestant du quorum et annexé au procès-verbal de l'assemblée.",
  introduction: [
    "La feuille de présence fige, le jour de l'assemblée, la liste des associés ou membres présents, représentés ou absents, avec le nombre de parts ou de voix qu'ils détiennent. Elle sert à vérifier le quorum et à calculer la majorité sur chaque résolution. Sans feuille de présence signée, le PV est fragilisé en cas de contestation.",
    "Notre modèle produit une feuille complète adaptée à votre forme juridique, avec une zone de signatures pour chaque participant. Elle s'annexe directement au procès-verbal de l'assemblée et au registre des assemblées.",
  ],
  audience: {
    summary:
      "Les présidents de séance, assistés le cas échéant d'un secrétaire, qui veulent sécuriser la traçabilité de leur assemblée.",
    items: [
      "Présidents de séance en SAS, SARL, SCI, SNC et associations",
      "Gérants et dirigeants procédant à l'approbation annuelle des comptes",
      "Équipes organisant une AGE pour une décision structurante",
      "Liquidateurs formalisant la fin de vie sociale",
    ],
  },
  timing: {
    summary:
      "La feuille est établie au moment de l'émargement, juste avant l'ouverture effective des débats.",
    items: [
      "Le jour de l'assemblée, à l'entrée en séance",
      "Au fil des arrivées des participants, avant chaque vote",
      "Pour chaque assemblée sans exception (AGO, AGE, mixte, consultation écrite matérialisée)",
      "À annexer au PV dans la foulée et à conserver dans le registre des assemblées",
    ],
  },
  contains: {
    summary:
      "Un tableau structuré identifiant chaque participant, son statut et sa signature.",
    items: [
      "En-tête complet de la société",
      "Date, heure et lieu de l'assemblée",
      "Type d'AG et ordre du jour sommaire",
      "Nombre total de parts ou d'actions émises",
      "Liste de chaque associé ou membre, avec : nom, nombre de parts, statut (présent, représenté, absent)",
      "Nom du mandataire en cas de représentation, avec référence du pouvoir",
      "Zone de signature pour chaque participant",
      "Signature du président de séance attestant l'exactitude des présences",
    ],
  },
  included: [
    "Adaptation aux parts sociales ou actions selon la forme juridique",
    "Zone de signatures individuelles préformatée",
    "Calcul implicite du quorum par le total des parts représentées",
    "Format prêt à annexer au PV",
    "Accès à vie au document dans votre espace client",
  ],
  notIncluded: [
    "Les pouvoirs individuels signés par les associés représentés (documents distincts)",
    "Le PV de l'assemblée (document séparé, à générer en parallèle)",
    "L'enregistrement dans le registre des assemblées (formalité à votre charge)",
  ],
  mistakes: [
    {
      title: "Oublier de faire signer le président de séance",
      body: "La feuille tire sa valeur probante de la signature du président, qui certifie l'exactitude des présences et du quorum. Sans cette signature, la feuille est contestable et le PV fragilisé.",
    },
    {
      title: "Ne pas mentionner les mandats de représentation",
      body: "Chaque associé représenté doit être rattaché nominativement à un mandataire, avec référence du pouvoir (date, personne). L'absence de cette traçabilité permet de contester la validité des votes émis par le mandataire.",
    },
    {
      title: "Omettre le total des parts émises",
      body: "Sans total rappelé, il est impossible de vérifier si le quorum est atteint. Inscrivez systématiquement le nombre total de parts ou d'actions représentant le capital social, et rapprochez-le de la somme des parts présentes et représentées.",
    },
    {
      title: "Établir la feuille a posteriori",
      body: "Une feuille reconstituée après l'assemblée est considérée comme peu fiable par la jurisprudence. Constituez-la en séance, au fil des émargements, et ajoutez-y la signature du président à la clôture.",
    },
  ],
  faqs: [
    {
      question: "La feuille de présence est-elle obligatoire ?",
      answer:
        "Oui pour les SA et certaines opérations des SAS et SARL. Pour les autres sociétés, l'usage et la jurisprudence recommandent fortement son établissement, car elle constitue la preuve du quorum et des votes. Son absence ne rend pas automatiquement l'assemblée nulle mais expose à contestations.",
    },
    {
      question: "Peut-on tenir une feuille de présence numérique ?",
      answer:
        "Oui, en cas d'assemblée en visioconférence, une feuille dématérialisée signée électroniquement par chaque participant est admise. Les règles de signature électronique du règlement eIDAS s'appliquent.",
    },
    {
      question: "Comment traiter un pouvoir en blanc ?",
      answer:
        "Le pouvoir en blanc est un pouvoir sans mandataire désigné, qui revient traditionnellement au président de l'assemblée. La feuille mentionne alors l'associé comme « représenté par le président en vertu d'un pouvoir en blanc ». Cette pratique est de plus en plus contestée et peut être interdite par les statuts.",
    },
    {
      question: "Combien de temps faut-il conserver la feuille ?",
      answer:
        "La feuille s'annexe au PV et suit la même durée de conservation : au minimum 10 ans dans le registre des assemblées. Pour les sociétés cotées ou soumises à une réglementation spécifique, cette durée peut être étendue.",
    },
    {
      question: "Un associé absent et non représenté doit-il figurer ?",
      answer:
        "Oui. La feuille liste l'ensemble des associés ou membres, avec leur statut : présent, représenté ou absent. L'inscription des absents permet de vérifier que la convocation a bien été adressée à tous et que le quorum est calculé correctement.",
    },
  ],
  related: [
    "convocation-ag",
    "ordre-du-jour-ag",
    "pv-ag-ordinaire",
  ],
};
