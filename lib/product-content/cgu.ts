import type { ProductPageContent } from "./types";

export const CGU_CONTENT: ProductPageContent = {
  h1: "Conditions Générales d'Utilisation (CGU)",
  promise:
    "Les règles du jeu de votre site ou plateforme : accès, contenus publiés, paiement, responsabilité, litiges.",
  introduction: [
    "Les conditions générales d'utilisation fixent le cadre dans lequel les utilisateurs accèdent à votre service. Elles diffèrent des CGV : là où les CGV encadrent la vente d'un bien ou d'un service, les CGU encadrent l'usage du site ou de l'application, avec ou sans dimension commerciale. Elles sont incontournables pour tout SaaS, toute application mobile et toute plateforme communautaire.",
    "Notre modèle couvre les situations courantes : service gratuit ou payant, création de compte ou accès libre, contenu publié par les utilisateurs (UGC), clientèle B2C ou B2B. Les articles sur la rétractation, la propriété intellectuelle, la responsabilité et la juridiction s'adaptent automatiquement à vos choix.",
  ],
  audience: {
    summary:
      "Tout éditeur de site ou d'application dont les utilisateurs interagissent au-delà de la simple lecture d'une page.",
    items: [
      "SaaS et outils en ligne avec compte utilisateur",
      "Plateformes communautaires, marketplaces, forums",
      "Applications mobiles avec fonctionnalités gratuites ou premium",
      "Sites éditoriaux acceptant des commentaires ou des contributions",
      "Services de création de contenu (design, vidéo, texte) à abonnement",
    ],
  },
  timing: {
    summary:
      "Les CGU doivent être en ligne dès l'ouverture du service aux premiers utilisateurs, avec une acceptation expresse à l'inscription ou au premier usage.",
    items: [
      "Avant l'ouverture du service au public, même en beta",
      "Avant toute création de compte ou facturation",
      "Lors d'une modification substantielle (nouvelles fonctionnalités, nouveau business model)",
      "Au passage d'un modèle gratuit à un modèle payant ou freemium",
    ],
  },
  contains: {
    summary:
      "Un document complet, structuré en articles numérotés, adapté à votre modèle économique et à votre clientèle.",
    items: [
      "Objet du service et identification de l'éditeur",
      "Acceptation des CGU et modalités de modification",
      "Conditions d'accès et création de compte éventuelle",
      "Tarification, paiement et droit de rétractation le cas échéant",
      "Obligations et comportements interdits de l'utilisateur",
      "Clause de contenu publié par l'utilisateur (UGC) : licence, modération, retrait",
      "Propriété intellectuelle sur le service et ses composants",
      "Disponibilité, responsabilité et force majeure",
      "Traitement des données personnelles (renvoi RGPD)",
      "Résiliation, suspension et fin des relations contractuelles",
      "Droit applicable, médiation et juridiction compétente",
    ],
  },
  included: [
    "Adaptation B2C, B2B ou mixte",
    "Service gratuit ou payant (avec clauses rétractation adaptées)",
    "Clause UGC optionnelle (pour les plateformes communautaires)",
    "Clauses RGPD et cookies coordonnées avec votre politique de confidentialité",
    "Accès à vie au document dans votre espace client",
  ],
  notIncluded: [
    "La politique de confidentialité détaillée (à rédiger en complément)",
    "Les mentions légales du site (document distinct, disponible au catalogue)",
    "Un contrat de licence d'usage logiciel négocié (SLA, niveau de service entreprise)",
    "La conformité à un secteur régulé spécifique (banque, assurance, santé)",
  ],
  mistakes: [
    {
      title: "Confondre CGV et CGU",
      body: "Les CGV concernent la vente d'un bien ou d'un service ; les CGU concernent l'usage d'un site ou d'une application. Un SaaS payant a besoin des deux (CGU pour l'accès + CGV pour l'abonnement) ; un service gratuit se contente des CGU. Nos deux modèles sont complémentaires et non redondants.",
    },
    {
      title: "Ne pas obtenir une acceptation expresse",
      body: "Une acceptation en ligne par case à cocher ou bouton dédié est indispensable pour rendre les CGU opposables. Une simple mention en pied de page ne lie pas l'utilisateur. Conservez la preuve de l'acceptation (date, IP, version).",
    },
    {
      title: "Imposer une juridiction inopposable au consommateur",
      body: "Vis-à-vis d'un consommateur, la clause attributive de juridiction est inopposable : le consommateur peut saisir le juge de son domicile (art. L.212-1 C. conso et règlement Bruxelles I bis). Vos CGU peuvent néanmoins fixer le droit applicable.",
    },
    {
      title: "Oublier la clause UGC pour les plateformes",
      body: "Si les utilisateurs publient du contenu (commentaires, posts, fichiers), vous devez définir la licence accordée, les règles de modération et les motifs de retrait. Sans ces clauses, l'éditeur est exposé à des litiges et à la responsabilité des contenus illicites en vertu de l'article 6 de la LCEN.",
    },
    {
      title: "Modifier les CGU sans notifier les utilisateurs",
      body: "Une modification substantielle doit être notifiée aux utilisateurs en place, avec un délai suffisant pour qu'ils puissent refuser. À défaut, l'ancienne version reste opposable. Une notification par email et une acceptation expresse à la prochaine connexion sont la pratique la plus sûre.",
    },
  ],
  faqs: [
    {
      question: "Faut-il des CGU pour une application mobile ?",
      answer:
        "Oui. Les CGU encadrent l'accès et l'usage de l'application, indépendamment du contrat avec l'app store. Apple et Google exigent par ailleurs des CGU accessibles depuis la fiche de votre application.",
    },
    {
      question: "Mon service est gratuit : les CGU sont-elles obligatoires ?",
      answer:
        "Oui. Même un service gratuit traite des données personnelles, encadre l'usage et engage la responsabilité de l'éditeur. Les CGU fixent les règles et protègent l'éditeur d'actions abusives ou d'usages frauduleux.",
    },
    {
      question: "Puis-je interdire certains usages dans les CGU ?",
      answer:
        "Oui, à condition que les interdictions soient claires, proportionnées et non discriminatoires. Les usages interdits typiques : spam, scraping non autorisé, atteinte aux droits d'un tiers, contenu illicite, revente non autorisée du service.",
    },
    {
      question: "Les CGU doivent-elles être signées ?",
      answer:
        "Non, une acceptation en ligne par case à cocher ou bouton suffit. Conservez la preuve de l'acceptation. La signature électronique qualifiée n'est requise que pour certains contrats spécifiques (crédit à la consommation par exemple).",
    },
    {
      question: "Comment gérer un utilisateur qui refuse les nouvelles CGU ?",
      answer:
        "Prévoyez dans les CGU que le refus entraîne la résiliation du service à compter de la date d'effet de la nouvelle version, avec remboursement prorata pour les abonnements payants. Cette clause est usuelle et acceptée par les tribunaux.",
    },
    {
      question: "Les CGU couvrent-elles la protection des données ?",
      answer:
        "Elles mentionnent les traitements de données et renvoient à une politique de confidentialité dédiée. La politique de confidentialité n'est pas incluse dans ce modèle : elle fait l'objet d'un document spécifique à rédiger en complément.",
    },
  ],
  related: [
    "mentions-legales",
    "cgv-ecommerce",
    "nda",
  ],
};
