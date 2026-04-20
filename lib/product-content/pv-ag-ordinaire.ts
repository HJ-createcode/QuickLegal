import type { ProductPageContent } from "./types";

export const PV_AG_ORDINAIRE_CONTENT: ProductPageContent = {
  h1: "PV d'Assemblée Générale Ordinaire",
  promise:
    "Le procès-verbal annuel d'approbation des comptes, structuré selon la forme juridique de votre société.",
  introduction: [
    "Chaque année, les associés ou membres doivent se prononcer sur les comptes de l'exercice écoulé et en tirer les conséquences : affectation du résultat, quitus aux dirigeants, renouvellements éventuels de mandats. Le procès-verbal est la trace écrite de cette assemblée, opposable aux tiers et exigé par le greffe lors du dépôt des comptes.",
    "Notre modèle produit un PV complet adapté à votre forme juridique — SAS, SARL, SCI, SNC ou association — avec la bonne terminologie et les bonnes règles de majorité. Les résolutions courantes (approbation, affectation, quitus) sont déjà rédigées ; vous pouvez en ajouter librement.",
  ],
  audience: {
    summary:
      "Toute structure dotée d'associés ou de membres et soumise à l'obligation annuelle d'approbation des comptes.",
    items: [
      "Présidents de SAS tenus d'organiser l'approbation annuelle des comptes",
      "Gérants de SARL, SCI et SNC dans les six mois suivant la clôture de l'exercice",
      "Trésoriers d'associations préparant l'AG statutaire",
      "Dirigeants uniques de SASU et EURL formalisant les décisions annuelles de l'associé unique",
      "Groupes familiaux exploitant une SCI patrimoniale",
    ],
  },
  timing: {
    summary:
      "L'AGO d'approbation des comptes se tient dans les six mois qui suivent la clôture de l'exercice (art. L.223-26 et L.225-100 C. com.).",
    items: [
      "Dans les six mois suivant la clôture de l'exercice, sauf prorogation accordée par le président du tribunal",
      "Après établissement des comptes par le dirigeant et, le cas échéant, le commissaire aux comptes",
      "Une fois la convocation adressée dans les délais statutaires (15 jours minimum en SARL)",
      "Avant le dépôt des comptes annuels au greffe (dans le mois suivant l'AG)",
    ],
  },
  contains: {
    summary:
      "Un PV complet, structuré en résolutions numérotées et signées par les membres du bureau de séance.",
    items: [
      "En-tête avec dénomination, forme, capital, siège et numéro SIREN",
      "Lieu, date et heure de l'assemblée",
      "Composition du bureau (président et éventuel secrétaire de séance)",
      "Constatation du quorum et liste des participants (présents, représentés, absents)",
      "Rappel de l'ordre du jour",
      "Résolution d'approbation des comptes de l'exercice clos",
      "Résolution d'affectation du résultat (réserve légale, dividendes, report à nouveau)",
      "Résolution de quitus aux dirigeants",
      "Résolutions libres (renouvellement CAC, conventions réglementées, autres)",
      "Pouvoirs pour les formalités de dépôt",
    ],
  },
  included: [
    "Adaptation automatique à la forme juridique choisie (SAS, SARL, SCI, SNC, association)",
    "Calcul assisté de l'affectation du résultat (réserve légale, report, dividendes)",
    "Format prêt à signer et à annexer à la feuille de présence",
    "Multiples résolutions additionnelles libres",
    "Accès à vie au document dans votre espace client",
  ],
  notIncluded: [
    "La convocation adressée aux associés (document séparé)",
    "L'ordre du jour formel (document séparé)",
    "La feuille de présence à annexer (document séparé)",
    "Le dépôt des comptes annuels au greffe",
    "L'annonce légale en cas de distribution exceptionnelle de dividendes",
  ],
  mistakes: [
    {
      title: "Tenir l'AGO après le délai de six mois",
      body: "Au-delà de six mois après la clôture de l'exercice, l'AGO est en retard. Une prorogation doit être sollicitée auprès du président du tribunal de commerce. À défaut, la responsabilité du dirigeant peut être engagée et des sanctions pénales sont théoriquement encourues.",
    },
    {
      title: "Ne pas respecter les règles d'affectation du résultat",
      body: "La dotation à la réserve légale (5 % du bénéfice jusqu'à ce que la réserve atteigne 10 % du capital) est obligatoire en SAS, SARL et SA. L'oublier rend la résolution d'affectation contestable et peut entraîner une action en nullité.",
    },
    {
      title: "Distribuer des dividendes sans les réserves suffisantes",
      body: "Les dividendes ne peuvent être prélevés que sur le bénéfice distribuable (bénéfice de l'exercice diminué des pertes antérieures et des dotations obligatoires, augmenté du report à nouveau). Une distribution en violation de cette règle expose à une action en répétition contre les associés.",
    },
    {
      title: "Oublier de vérifier le quorum",
      body: "Pour une SARL, la première convocation exige la présence d'associés représentant au moins le quart des parts (art. L.223-29 C. com.). En SAS, les statuts fixent le quorum. Inscrivez toujours ce constat dans le PV.",
    },
    {
      title: "Signer un PV avec des résolutions contradictoires",
      body: "Un PV qui donne quitus tout en réservant des actions en responsabilité crée une ambiguïté préjudiciable. Si des griefs existent contre le dirigeant, reportez la question à une AGE dédiée plutôt que de mélanger les deux dans l'AGO.",
    },
  ],
  faqs: [
    {
      question: "Le PV doit-il être enregistré auprès d'une administration ?",
      answer:
        "Non pour une AGO classique d'approbation des comptes. Il est conservé dans le registre des assemblées de la société et joint aux formalités de dépôt des comptes. Certaines résolutions (transformation, changement de siège) exigent en revanche un enregistrement au SIE.",
    },
    {
      question: "L'associé unique d'une EURL ou SASU doit-il signer un PV ?",
      answer:
        "Oui. L'associé unique formalise ses décisions dans un registre spécifique : les décisions de l'associé unique (DAU). Le formalisme est simplifié mais l'écrit reste obligatoire. Notre modèle s'adapte à cette configuration.",
    },
    {
      question: "Peut-on tenir l'AGO à distance ou par écrit ?",
      answer:
        "Oui, si les statuts le prévoient, et plus généralement depuis les ordonnances Covid qui ont élargi les possibilités de tenue dématérialisée. Le PV doit mentionner explicitement le mode de tenue (visioconférence, consultation écrite) et le respect des conditions statutaires.",
    },
    {
      question: "Faut-il désigner un bureau en SAS ?",
      answer:
        "Non, sauf stipulation contraire des statuts. La SAS bénéficie d'une grande liberté : les décisions peuvent être prises selon les modalités fixées par les statuts, sans bureau formel. Notre modèle propose un bureau par défaut, facultatif.",
    },
    {
      question: "Le PV doit-il être signé de manière manuscrite ?",
      answer:
        "La signature manuscrite reste la pratique majoritaire. La signature électronique qualifiée est admise pour les actes authentiques et progresse dans les usages courants. Vérifiez auprès de votre greffe local avant de dématérialiser entièrement.",
    },
  ],
  related: [
    "convocation-ag",
    "ordre-du-jour-ag",
    "feuille-presence-ag",
  ],
};
