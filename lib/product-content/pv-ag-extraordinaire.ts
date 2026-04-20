import type { ProductPageContent } from "./types";

export const PV_AG_EXTRAORDINAIRE_CONTENT: ProductPageContent = {
  h1: "PV d'Assemblée Générale Extraordinaire",
  promise:
    "Le procès-verbal requis pour toute décision modifiant les statuts, le capital, le siège ou la forme de la société.",
  introduction: [
    "Dès qu'une décision touche aux statuts — transfert de siège, changement de dénomination, augmentation ou réduction de capital, transformation, dissolution — elle relève de l'assemblée générale extraordinaire. Le PV formalise la délibération, fixe la majorité obtenue et sert de base à toutes les formalités de publicité légale.",
    "Notre modèle couvre onze types de décisions extraordinaires parmi les plus fréquentes, adapte la terminologie à votre forme juridique et rappelle les règles de majorité applicables. Vous pouvez ajouter plusieurs résolutions complémentaires pour un même PV.",
  ],
  audience: {
    summary:
      "Toute société qui modifie un élément fondamental de son pacte social.",
    items: [
      "Dirigeants procédant à un transfert de siège ou à un changement de dénomination",
      "Associés engagés dans une opération d'augmentation ou de réduction de capital",
      "Sociétés en transformation (SARL vers SAS, SAS vers SA, etc.)",
      "Équipes fondatrices modifiant les règles d'agrément ou de gouvernance",
      "Dirigeants en phase de dissolution-liquidation anticipée",
    ],
  },
  timing: {
    summary:
      "L'AGE se tient au moment opportun de la vie sociale, avec un préavis et des règles de quorum renforcées par rapport à l'AGO.",
    items: [
      "Avant toute opération de haut de bilan (levée de fonds, fusion, scission)",
      "Au moment du transfert du siège social vers une nouvelle adresse",
      "À l'occasion d'une transformation de société en une autre forme",
      "À la décision de dissolution anticipée et de nomination d'un liquidateur",
      "Pour toute modification substantielle des statuts",
    ],
  },
  contains: {
    summary:
      "Un PV structuré autour d'une résolution principale précisément rédigée selon l'objet choisi.",
    items: [
      "En-tête complet de la société",
      "Lieu, date et heure de l'AGE",
      "Bureau de séance et liste des participants",
      "Constatation du quorum renforcé propre à l'AGE",
      "Ordre du jour",
      "Résolution principale détaillée : modification statutaire, transfert, augmentation ou réduction de capital, transformation, dissolution, nomination ou révocation de dirigeant, ou décision libre",
      "Résolutions complémentaires libres (modifications corrélatives, pouvoirs spéciaux)",
      "Rappel des règles de majorité applicables à la forme juridique",
      "Pouvoirs pour les formalités de publicité",
    ],
  },
  included: [
    "11 types de décisions extraordinaires prises en charge",
    "Adaptation automatique des règles de majorité à la forme juridique",
    "Multiples résolutions complémentaires dans un même PV",
    "Rappel des formalités de publicité à accomplir",
    "Accès à vie au document dans votre espace client",
  ],
  notIncluded: [
    "L'annonce légale consécutive à la modification",
    "Le dépôt au greffe et l'inscription modificative au RCS",
    "La rédaction des statuts modifiés (à mettre à jour en parallèle)",
    "L'intervention du commissaire aux apports en cas d'apport en nature",
  ],
  mistakes: [
    {
      title: "Ignorer les règles de majorité propres à chaque forme",
      body: "En SCI et en SNC, l'unanimité est souvent exigée pour modifier les statuts, sauf clause contraire. En SARL, les décisions modifiant les statuts requièrent la majorité des deux-tiers des parts détenues par les associés présents ou représentés (art. L.223-30 C. com.). En SAS, les statuts fixent librement ces règles. Vérifier la règle applicable avant de convoquer.",
    },
    {
      title: "Négliger les formalités de publicité après l'AGE",
      body: "Une modification statutaire inopposable aux tiers tant qu'elle n'est pas publiée (annonce légale + inscription modificative au RCS). Anticipez ces étapes et les coûts associés dès la tenue de l'assemblée.",
    },
    {
      title: "Oublier le commissaire aux apports en cas d'apport en nature",
      body: "Toute augmentation de capital par apport en nature exige en principe l'intervention d'un commissaire aux apports (art. L.225-14 C. com. pour la SA, règles similaires en SAS et SARL). L'omission peut entraîner la nullité de l'opération.",
    },
    {
      title: "Confondre dissolution et liquidation",
      body: "La dissolution ouvre la liquidation : ce sont deux phases distinctes, chacune avec son formalisme. Le PV d'AGE acte la dissolution et nomme le liquidateur ; la clôture fera l'objet d'un second PV une fois les comptes de liquidation approuvés.",
    },
    {
      title: "Confier la transformation sans l'avis du commissaire à la transformation",
      body: "La transformation d'une SARL en SAS exige un rapport du commissaire à la transformation sur la situation de la société et la valeur des biens composant l'actif social (art. L.224-3 C. com.). Prévoyez son intervention en amont de l'AGE.",
    },
  ],
  faqs: [
    {
      question: "Combien de résolutions peut-on prendre lors d'une AGE ?",
      answer:
        "Autant que nécessaire, à condition qu'elles figurent à l'ordre du jour. Notre modèle propose une résolution principale détaillée et une zone de résolutions complémentaires pour les modifications corrélatives (ex. pouvoir au Président de mettre à jour les statuts).",
    },
    {
      question: "Le PV d'AGE doit-il être enregistré ?",
      answer:
        "Il doit être déposé au greffe dans le mois suivant la décision, accompagné des statuts mis à jour et d'un exemplaire de l'annonce légale. Certaines décisions (transformation, dissolution, augmentation de capital) exigent en outre un enregistrement au service des impôts.",
    },
    {
      question: "Une AGE peut-elle être tenue par consultation écrite ?",
      answer:
        "Oui dans certaines conditions. En SAS, les statuts fixent la règle. En SARL, la consultation écrite est possible pour certaines décisions mais pas pour l'approbation des comptes. En SCI, les statuts déterminent les modes de consultation. Vérifiez le cadre statutaire avant de choisir ce mode.",
    },
    {
      question: "Dois-je tenir une AGO et une AGE séparément ?",
      answer:
        "Non : une assemblée mixte (ordinaire et extraordinaire) peut combiner les deux, à condition que l'ordre du jour et les règles de majorité soient respectés pour chaque type de résolution. La convocation et le PV doivent alors identifier clairement la nature de chaque décision.",
    },
    {
      question: "Qui doit signer le PV ?",
      answer:
        "Le président de séance, et selon les statuts, le secrétaire de séance et un ou deux scrutateurs choisis parmi les associés les plus présents. En SAS, cela dépend de la configuration statutaire. Les signatures engagent la régularité du PV.",
    },
  ],
  related: [
    "convocation-ag",
    "ordre-du-jour-ag",
    "feuille-presence-ag",
  ],
};
