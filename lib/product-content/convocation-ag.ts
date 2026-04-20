import type { ProductPageContent } from "./types";

export const CONVOCATION_AG_CONTENT: ProductPageContent = {
  h1: "Convocation d'Assemblée Générale",
  promise:
    "Une lettre de convocation personnalisée, conforme aux délais légaux, prête à envoyer par LRAR ou par email.",
  introduction: [
    "Avant toute assemblée, chaque associé ou membre doit être invité dans les formes et les délais prévus par la loi et les statuts. Une convocation irrégulière entraîne la nullité de l'assemblée et de ses décisions — un risque juridique et opérationnel disproportionné pour un document aussi simple.",
    "Notre modèle adapte le texte à votre forme juridique, calcule automatiquement les éléments à mentionner (heure, lieu, ordre du jour, documents joints) et rappelle les délais minimaux à respecter. Vous générez une convocation par destinataire, en quelques minutes.",
  ],
  audience: {
    summary:
      "Toute personne habilitée à convoquer une assemblée : dirigeants, liquidateurs, associés requérants, bureau d'association.",
    items: [
      "Gérants de SARL et de SCI (art. L.223-27 C. com. pour la SARL)",
      "Présidents de SAS ou organe désigné par les statuts",
      "Président et membres du bureau d'associations",
      "Liquidateurs en période de liquidation",
      "Associés minoritaires sollicitant une AG sur demande",
    ],
  },
  timing: {
    summary:
      "La convocation doit être adressée avant l'assemblée, dans le respect du préavis statutaire et des minima légaux.",
    items: [
      "15 jours minimum avant l'AG en SARL (art. R.223-20 C. com.)",
      "15 jours minimum avant l'AGO de SAS, sauf stipulation statutaire plus longue",
      "30 jours minimum avant l'AG de SA cotée (art. R.225-73 C. com.)",
      "Pour les associations, selon la durée fixée par les statuts",
      "Le délai court à compter de l'envoi de la convocation",
    ],
  },
  contains: {
    summary:
      "Une lettre courte, structurée, personnalisable par destinataire.",
    items: [
      "En-tête avec identité complète de la société convocante",
      "Nom et adresse du destinataire (un document par destinataire)",
      "Date, heure et lieu précis de l'assemblée",
      "Type d'assemblée : ordinaire, extraordinaire ou mixte",
      "Ordre du jour complet, tel qu'il sera soumis au vote",
      "Liste des documents joints (comptes, rapport de gestion, projets de résolutions)",
      "Mode d'envoi (LRAR, email, remise en mains propres)",
      "Information sur les modalités de représentation par pouvoir",
      "Signature de l'auteur de la convocation",
    ],
  },
  included: [
    "Adaptation à la forme juridique choisie",
    "Rappel du préavis légal applicable",
    "Mention des modalités de représentation par pouvoir",
    "Personnalisation par destinataire",
    "Accès à vie au document dans votre espace client",
  ],
  notIncluded: [
    "L'impression et l'envoi effectif par LRAR (formalité à votre charge)",
    "La feuille de présence à faire signer le jour de l'AG (document séparé)",
    "Le pouvoir à remplir par le représenté (modèle à fournir en parallèle)",
    "Les comptes et rapports à joindre (établis par la direction)",
  ],
  mistakes: [
    {
      title: "Envoyer la convocation trop tard",
      body: "Un préavis inférieur à 15 jours en SARL rend l'assemblée irrégulière. Le PV peut être annulé et toutes les décisions avec lui. Comptez toujours 15 jours francs avant l'AG, et ajoutez une marge pour la distribution postale ou l'acheminement email.",
    },
    {
      title: "Oublier un associé dans la liste des convoqués",
      body: "Omettre un seul associé entraîne la nullité des décisions. Vérifiez votre registre des associés et envoyez une convocation à chacun, même aux associés minoritaires ou passifs.",
    },
    {
      title: "Convoquer par email sans stipulation statutaire",
      body: "La convocation par email n'est valable que si les statuts l'autorisent ou si chaque associé y a consenti par écrit. À défaut, utilisez la lettre recommandée avec accusé de réception, qui fait foi en cas de contestation.",
    },
    {
      title: "Rédiger un ordre du jour imprécis",
      body: "L'assemblée ne peut délibérer que sur les points figurant à l'ordre du jour. Un intitulé vague comme « questions diverses » ne couvre que les sujets mineurs. Pour toute décision importante, rédigez un point explicite et intelligible.",
    },
    {
      title: "Convoquer sans joindre les documents préparatoires",
      body: "Pour l'AGO d'approbation des comptes, les comptes annuels et le rapport de gestion doivent être adressés ou mis à disposition en même temps que la convocation (art. L.223-26 C. com. pour la SARL). L'absence de communication est un motif fréquent de contestation.",
    },
  ],
  faqs: [
    {
      question: "Faut-il une convocation pour une société à associé unique ?",
      answer:
        "Non. En EURL ou en SASU, l'associé unique prend ses décisions seul et n'a pas à se convoquer lui-même. En revanche, il formalise ses décisions dans un registre spécifique (décisions de l'associé unique).",
    },
    {
      question: "Peut-on convoquer par email seul ?",
      answer:
        "Oui, à condition que les statuts le prévoient ou que l'associé ait donné son accord exprès. À défaut, la LRAR reste la méthode la plus sûre. En pratique, de nombreuses SAS ont intégré cette faculté à leurs statuts modernes.",
    },
    {
      question: "Que se passe-t-il si un associé ne reçoit pas sa convocation ?",
      answer:
        "Si l'associé n'est pas présent ni représenté, il peut demander la nullité de l'assemblée. Si tous les associés étaient présents malgré l'omission, l'assemblée est régulière (assemblée « non convoquée mais réunie » au sens de la jurisprudence). Assurez-vous toujours d'envoyer une convocation formelle.",
    },
    {
      question: "Quel est le délai légal de convocation en SAS ?",
      answer:
        "La loi ne fixe pas de minimum légal : ce sont les statuts qui déterminent le préavis. La pratique la plus courante retient 15 jours, aligné sur la SARL. Si les statuts sont muets, 15 jours restent la référence la plus sûre.",
    },
    {
      question: "L'AG peut-elle se tenir sans convocation ?",
      answer:
        "Oui si tous les associés sont présents ou représentés et acceptent expressément de délibérer. Cela s'appelle une assemblée générale ordinaire « plénière ». Le PV doit constater ce consentement unanime.",
    },
  ],
  related: [
    "ordre-du-jour-ag",
    "feuille-presence-ag",
    "pv-ag-ordinaire",
  ],
};
