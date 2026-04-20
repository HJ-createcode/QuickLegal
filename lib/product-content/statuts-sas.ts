import type { ProductPageContent } from "./types";

export const STATUTS_SAS_CONTENT: ProductPageContent = {
  h1: "Statuts de SAS rédigés par des juristes, prêts en 10 minutes",
  promise:
    "Un acte constitutif complet, à jour de la loi, personnalisé avec vos réponses et accepté par le greffe du tribunal de commerce.",
  introduction: [
    "La société par actions simplifiée est aujourd'hui la forme la plus choisie en France pour créer une entreprise à plusieurs ou la faire évoluer. Sa force tient à la grande liberté statutaire qu'elle laisse aux associés — à condition que les statuts soient bien rédigés dès le départ.",
    "Nos statuts couvrent tous les articles attendus par le greffe et par l'administration fiscale, tout en laissant la place aux choix qui vous sont propres : gouvernance, clauses d'agrément, régime fiscal, organisation des pouvoirs du Président. Chaque réponse du questionnaire se reflète dans le document final.",
  ],
  audience: {
    summary:
      "La SAS s'adresse aux projets qui veulent s'associer ou lever des fonds, sans les lourdeurs d'une SA ni les rigidités d'une SARL.",
    items: [
      "Fondateurs de startups et projets tech qui anticipent une levée de fonds",
      "Équipes de deux associés ou plus qui veulent préserver leur souplesse contractuelle",
      "Entrepreneurs du conseil, de l'agence ou de la prestation de services",
      "Dirigeants qui souhaitent bénéficier du régime assimilé-salarié",
      "Cédants préparant une holding ou une opération de reprise",
    ],
  },
  timing: {
    summary:
      "Les statuts sont signés avant le dépôt du capital et l'immatriculation au RCS. Un changement ultérieur passe par une AGE et une modification statutaire.",
    items: [
      "À la constitution de la société, avant l'ouverture du compte bancaire professionnel",
      "Lors d'une transformation d'EURL ou de SARL en SAS",
      "Pour remplacer d'anciens statuts devenus obsolètes ou mal adaptés à votre gouvernance",
      "Pour formaliser une structure de holding avant une opération de haut de bilan",
    ],
  },
  contains: {
    summary:
      "Environ 25 articles couvrant l'intégralité de ce que le greffe et les associés attendent de statuts de SAS.",
    items: [
      "Dénomination, siège, objet social, durée",
      "Capital social, valeur nominale des actions, libération et apports en numéraire",
      "Répartition du capital entre associés avec nombre d'actions attribuées",
      "Modalités de nomination, pouvoirs et rémunération du Président",
      "Clause d'agrément pour les cessions d'actions",
      "Clause de préemption entre associés",
      "Tenue des assemblées, modes de consultation, règles de majorité",
      "Approbation des comptes, affectation du résultat, distribution des dividendes",
      "Exercice social et modalités de clôture",
      "Transformation, dissolution et liquidation",
    ],
  },
  included: [
    "PDF final prêt à signer, sans filigrane, à la charte graphique QuickLegal",
    "Clauses d'agrément et de préemption paramétrables",
    "Choix entre président associé ou tiers",
    "Mentions RGPD obligatoires pour le traitement des données des associés",
    "Accès à vie au document dans votre espace client",
  ],
  notIncluded: [
    "Le dépôt de capital auprès d'une banque ou d'un notaire",
    "La rédaction d'un pacte d'associés séparé (document à part, à venir)",
    "Le dépôt du dossier d'immatriculation au guichet unique de l'INPI",
    "L'accompagnement fiscal ou la simulation de rémunération du Président",
  ],
  mistakes: [
    {
      title: "Rédiger un objet social trop étroit",
      body: "Un objet limité à « conseil informatique » interdit tout pivot vers l'édition de logiciel ou le matériel. Formulez un objet large couvrant votre activité principale, ses prolongements naturels et la mention « plus généralement, toutes opérations se rattachant directement ou indirectement à l'objet social ».",
    },
    {
      title: "Oublier la clause d'agrément",
      body: "Sans clause d'agrément, un associé peut céder ses actions à un tiers sans l'accord des autres. La clause ne protège pas seulement l'entreprise en cas de conflit, elle rassure aussi les futurs investisseurs lors d'une levée de fonds.",
    },
    {
      title: "Prévoir un associé unique dans des statuts de SAS",
      body: "Une SAS à un seul associé doit être une SASU et suit des règles rédactionnelles différentes. Vérifiez cet aspect avant de lancer la rédaction — le questionnaire vous oriente automatiquement.",
    },
    {
      title: "Sous-estimer la libération du capital",
      body: "Les apports en numéraire doivent être libérés d'au moins la moitié à la constitution (art. L.227-1 C. com.), le solde dans les cinq ans. Une libération partielle doit être expressément prévue dans les statuts et documentée auprès du greffe.",
    },
    {
      title: "Nommer un président sans vérifier son éligibilité",
      body: "Le Président doit fournir une déclaration sur l'honneur de non-condamnation. Générez ce document en parallèle pour éviter un rejet du greffe à la dernière minute.",
    },
  ],
  faqs: [
    {
      question: "Puis-je modifier les statuts après leur signature ?",
      answer:
        "Oui, mais une modification statutaire exige une assemblée générale extraordinaire, un procès-verbal signé, une annonce légale et une inscription modificative au RCS. Nous générons le PV d'AGE et l'ordre du jour associés dans la même plateforme.",
    },
    {
      question: "Quel capital social minimum faut-il prévoir ?",
      answer:
        "Le minimum légal est d'un euro. En pratique, un capital de 1 000 à 5 000 € est perçu comme plus crédible par les banques et les fournisseurs, sans alourdir la trésorerie. Les apports en numéraire doivent être libérés d'au moins 50 % à la constitution.",
    },
    {
      question: "Un pacte d'associés est-il inclus ?",
      answer:
        "Non. Le pacte d'associés est un document séparé qui encadre les rapports entre associés hors statuts (vesting, bad leaver, anti-dilution, droits préférentiels…). Il sera disponible dans le catalogue dans une prochaine version.",
    },
    {
      question: "Les statuts sont-ils compatibles avec une levée de fonds ultérieure ?",
      answer:
        "Oui. Le document inclut une clause d'agrément et une clause de préemption, qui sont attendues par les investisseurs professionnels. Des clauses avancées (catégories d'actions, prime d'émission, droit d'information renforcé) seront ajoutées lors d'une augmentation de capital ultérieure.",
    },
    {
      question: "Combien d'associés faut-il au minimum ?",
      answer:
        "Deux au minimum. Si vous êtes seul, choisissez la forme SASU dont les statuts seront disponibles prochainement sur QuickLegal. Le questionnaire vous oriente automatiquement dans ce cas.",
    },
    {
      question: "Ai-je besoin d'un avocat pour valider les statuts ?",
      answer:
        "Nos modèles ont été rédigés par des juristes et revus par un avocat d'affaires inscrit au Barreau de Paris. Pour une structuration patrimoniale complexe (holdings multiples, actions de préférence, clauses anti-dilution), nous recommandons une revue par un conseil personnel avant signature.",
    },
  ],
  related: [
    "declaration-non-condamnation",
    "attestation-domiciliation",
    "pv-ag-ordinaire",
  ],
};
