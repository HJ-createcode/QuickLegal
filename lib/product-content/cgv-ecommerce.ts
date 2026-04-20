import type { ProductPageContent } from "./types";

export const CGV_ECOMMERCE_CONTENT: ProductPageContent = {
  h1: "CGV E-commerce, conformes au Code de la consommation et au RGPD",
  promise:
    "Des conditions générales de vente complètes, adaptées à votre activité, avec droit de rétractation, médiateur et clauses RGPD.",
  introduction: [
    "Un site marchand doit afficher des conditions générales de vente conformes à plus d'une vingtaine d'obligations issues du Code de la consommation, du Code civil et du RGPD. À défaut, le vendeur s'expose à des amendes de la DGCCRF, à l'opposabilité de conditions non acceptées et à la remise en cause des contrats conclus.",
    "Nos CGV couvrent l'ensemble des mentions obligatoires : identité du vendeur, prix, livraison, paiement, droit de rétractation de 14 jours, garantie de conformité, garantie des vices cachés, médiateur de la consommation, traitement des données personnelles. Elles s'adaptent à une clientèle B2C, B2B ou mixte.",
  ],
  audience: {
    summary:
      "Tout acteur qui vend des biens ou des services en ligne à des consommateurs ou à des professionnels.",
    items: [
      "Boutiques Shopify, Prestashop, WooCommerce, Wix, Squarespace",
      "Marques direct-to-consumer et distributeurs en ligne",
      "Artisans et TPE qui ajoutent une boutique à leur site vitrine",
      "Plateformes SaaS à facturation récurrente ou ponctuelle",
      "Marketplaces nécessitant un cadre contractuel vendeur / acheteur",
    ],
  },
  timing: {
    summary:
      "Les CGV doivent être en ligne dès le premier euro encaissé et accessibles avant la validation du panier.",
    items: [
      "Avant la mise en ligne de votre boutique",
      "Au lancement d'une nouvelle offre impliquant un cycle de vente différent (abonnement, précommande, drop)",
      "Lors d'un changement de modèle (ajout de prestations B2B à une boutique B2C)",
      "Pour une mise en conformité après un contrôle ou une réclamation",
    ],
  },
  contains: {
    summary:
      "Un document complet, structuré en articles, couvrant l'intégralité du parcours d'achat.",
    items: [
      "Identification complète du vendeur (raison sociale, forme, capital, SIRET, RCS, siège)",
      "Description de l'offre et des produits / services",
      "Prix, modalités de paiement, sécurisation des transactions",
      "Modalités et délais de livraison, zones couvertes",
      "Droit de rétractation de 14 jours avec formulaire type et exceptions",
      "Garantie légale de conformité (art. L.217-3 et suivants C. conso)",
      "Garantie des vices cachés (art. 1641 et suivants C. civ.)",
      "Clause de médiation de la consommation (art. L.611-1 C. conso)",
      "Responsabilité, force majeure, indisponibilité",
      "Traitement des données personnelles et cookies (RGPD)",
      "Droit applicable, juridiction compétente, règlement en ligne des litiges",
    ],
  },
  included: [
    "Mentions conformes au Code de la consommation et au RGPD",
    "Adaptation B2C, B2B ou mixte selon votre clientèle",
    "Droit de rétractation paramétrable (durée et exceptions)",
    "Clause médiateur avec coordonnées du CNPM par défaut",
    "Accès à vie au document dans votre espace client",
  ],
  notIncluded: [
    "Les conditions spécifiques à un marketplace (contrat vendeur)",
    "Les mentions légales du site (document distinct, disponible au catalogue)",
    "La politique de confidentialité détaillée (phase 3 de notre catalogue)",
    "La politique de cookies et la bannière de consentement",
  ],
  mistakes: [
    {
      title: "Ne pas afficher les CGV avant la validation du panier",
      body: "Le Code de la consommation exige une acceptation expresse des CGV avant la commande. Une simple mise à disposition en pied de page ne suffit pas : une case à cocher ou un bouton d'acceptation est obligatoire. À défaut, les CGV sont inopposables au consommateur.",
    },
    {
      title: "Omettre le médiateur de la consommation",
      body: "Tout vendeur à un consommateur doit adhérer à un service de médiation et en publier les coordonnées dans ses CGV (art. L.616-1 C. conso). Le non-respect est sanctionné par une amende administrative de 3 000 € par manquement. Notre modèle renseigne par défaut le CNPM, un médiateur reconnu.",
    },
    {
      title: "Minimiser le droit de rétractation",
      body: "Le consommateur dispose de 14 jours pour se rétracter après réception du bien (art. L.221-18 C. conso), sans justification. Des exceptions limitées existent (biens personnalisés, biens scellés ouverts pour des raisons d'hygiène, etc.). Tout aménagement contractuel restrictif est nul.",
    },
    {
      title: "Copier les CGV d'un concurrent",
      body: "Au-delà du risque de contrefaçon, des CGV non adaptées à votre activité exposent à une inopposabilité de clauses et à des litiges coûteux. Chaque commerce a ses spécificités : zones de livraison, produits, clientèle, garanties.",
    },
    {
      title: "Oublier le RGPD",
      body: "Les CGV d'un site marchand doivent mentionner les traitements de données (commandes, facturation, prospection, cookies), le délégué à la protection des données (DPO) si nommé et les droits des personnes. L'absence expose à une mise en demeure de la CNIL puis à des sanctions financières.",
    },
  ],
  faqs: [
    {
      question: "Faut-il faire signer les CGV par le client ?",
      answer:
        "Non, une acceptation en ligne par case à cocher suffit, à condition que les CGV soient consultables avant le paiement. Conservez la trace de l'acceptation (date, IP, version des CGV) pendant au moins cinq ans en cas de litige.",
    },
    {
      question: "Les CGV valent-elles pour les clients B2B ?",
      answer:
        "Oui, mais certaines clauses du Code de la consommation (rétractation, médiation) ne s'appliquent pas aux professionnels. Notre modèle adapte les clauses selon que votre clientèle est B2C, B2B ou mixte. Une clientèle mixte impose de conserver les deux régimes.",
    },
    {
      question: "À quelle fréquence faut-il mettre à jour ses CGV ?",
      answer:
        "Au minimum une fois par an, et à chaque modification légale significative. Le Code de la consommation évolue régulièrement (transposition de directives européennes, jurisprudence). Nos modèles sont tenus à jour ; régénérez un nouveau document lorsque vous modifiez votre activité ou tous les 12 mois.",
    },
    {
      question: "Puis-je limiter ma responsabilité dans mes CGV ?",
      answer:
        "Dans les CGV B2C, les clauses limitatives de responsabilité envers le consommateur sont encadrées et souvent considérées comme abusives (art. L.212-1 C. conso). Elles doivent être rédigées avec prudence. En B2B, la liberté contractuelle est plus grande mais certaines clauses (ex. libération totale de responsabilité) restent invalides.",
    },
    {
      question: "Faut-il des CGV distinctes pour la France et l'Europe ?",
      answer:
        "En B2C, le règlement Rome I permet au consommateur de bénéficier de la loi de son pays de résidence. Nos CGV prévoient donc des clauses compatibles avec les règles consuméristes européennes. Pour une commercialisation hors UE, une revue spécifique est recommandée.",
    },
    {
      question: "Les CGV couvrent-elles les abonnements ?",
      answer:
        "Partiellement. Les CGV e-commerce couvrent la vente unique et la rétractation standard. Pour un abonnement à reconduction tacite ou un service SaaS, des clauses complémentaires sont à prévoir (durée, reconduction, résiliation, non-exécution). Notre modèle CGU est plus adapté dans ce cas.",
    },
  ],
  related: [
    "mentions-legales",
    "cgu",
    "nda",
  ],
};
