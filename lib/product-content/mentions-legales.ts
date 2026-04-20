import type { ProductPageContent } from "./types";

export const MENTIONS_LEGALES_CONTENT: ProductPageContent = {
  h1: "Mentions légales pour votre site web",
  promise:
    "Un document conforme à la LCEN, à jour du Code de la consommation, exigé pour tout site professionnel — en vente ou en information.",
  introduction: [
    "Tout site édité dans un cadre professionnel doit afficher des mentions légales identifiant l'éditeur, le directeur de la publication, l'hébergeur, et informer les visiteurs de la gestion de leurs données. L'obligation découle de l'article 6-III de la loi pour la Confiance dans l'Économie Numérique (LCEN) et des articles L.111-1 et suivants du Code de la consommation.",
    "Nos mentions légales s'adaptent à la nature de l'éditeur — société, entrepreneur individuel, association — et intègrent les mentions spécifiques aux professions réglementées (avocat, médecin, architecte). Elles incluent également, lorsque votre public est consommateur, la clause de médiation obligatoire.",
  ],
  audience: {
    summary:
      "Tout éditeur d'un site web ayant une activité économique, informative ou associative.",
    items: [
      "TPE, PME et ETI publiant un site vitrine ou un site marchand",
      "Entrepreneurs individuels et micro-entreprises ayant une présence en ligne",
      "Associations disposant d'un site d'information ou d'adhésion",
      "Professions réglementées (avocat, expert-comptable, architecte, agent immobilier, notaire)",
      "Blogs éditoriaux monétisés ou adossés à une activité commerciale",
    ],
  },
  timing: {
    summary:
      "Les mentions légales doivent être disponibles dès la mise en ligne du site. Elles se mettent à jour à chaque changement de l'éditeur ou de l'hébergeur.",
    items: [
      "Dès la mise en ligne du site",
      "Lors d'un changement de siège social, de dirigeant ou de forme juridique",
      "Après un changement d'hébergeur (migration technique)",
      "En cas d'évolution de votre activité déclarée (nouveau SIRET, nouvelle activité)",
    ],
  },
  contains: {
    summary:
      "Un document structuré en sections claires, idéal pour une page « mentions légales » accessible depuis le pied de page du site.",
    items: [
      "Identité complète de l'éditeur (dénomination, forme, capital, adresse)",
      "Numéro SIREN ou SIRET et lieu d'immatriculation au RCS",
      "Numéro de TVA intracommunautaire le cas échéant",
      "Directeur de la publication (personne physique responsable)",
      "Coordonnées de contact (email, téléphone)",
      "Identification de l'hébergeur (nom, adresse, téléphone)",
      "Profession réglementée, ordre professionnel et numéro d'inscription (si applicable)",
      "Propriété intellectuelle et protection du contenu",
      "Politique de traitement des données personnelles (renvoi à la politique de confidentialité)",
      "Politique de cookies (renvoi à la politique dédiée)",
      "Médiateur de la consommation (obligatoire en B2C)",
      "Droit applicable et juridiction compétente",
    ],
  },
  included: [
    "Mentions conformes à l'article 6-III de la LCEN",
    "Adaptation société, entrepreneur individuel, association",
    "Mentions spécifiques aux professions réglementées",
    "Clause de médiation consommation (B2C)",
    "Accès à vie au document dans votre espace client",
  ],
  notIncluded: [
    "La politique de confidentialité complète (document distinct à venir)",
    "La politique de cookies et la bannière de consentement (phase 3)",
    "Les conditions générales de vente ou d'utilisation (documents disponibles au catalogue)",
    "L'hébergement du document sur votre site (à votre charge)",
  ],
  mistakes: [
    {
      title: "Omettre l'identité de l'hébergeur",
      body: "L'article 6-III-2 de la LCEN impose d'identifier l'hébergeur (nom, adresse, téléphone). Pour un site hébergé sur Vercel, Cloudflare, AWS ou OVH, c'est cette entité qu'il faut mentionner, pas un fournisseur intermédiaire ou un revendeur.",
    },
    {
      title: "Copier les mentions d'un concurrent",
      body: "Au-delà du risque d'inexactitude (SIREN, RCS, TVA spécifiques à votre structure), c'est aussi une atteinte aux droits d'auteur si le texte est substantiellement repris. Des mentions erronées vous exposent à une amende administrative jusqu'à 75 000 € pour une personne morale.",
    },
    {
      title: "Oublier le médiateur pour une activité B2C",
      body: "Tout vendeur à distance à un consommateur doit adhérer à un médiateur de la consommation et en publier les coordonnées. L'absence de mention est sanctionnée par la DGCCRF (amende jusqu'à 15 000 € par manquement, multipliée par le nombre d'infractions).",
    },
    {
      title: "Mentionner un numéro SIRET invalide",
      body: "Le SIREN / SIRET doit correspondre exactement à l'entreprise qui édite le site. Un SIRET inactif, celui d'un autre établissement du groupe ou un SIRET erroné rend les mentions non conformes et peut exposer à des poursuites pour pratique commerciale trompeuse.",
    },
    {
      title: "Négliger les mentions pour les professions réglementées",
      body: "Les professions réglementées (avocat, expert-comptable, architecte) doivent indiquer leur ordre, leur numéro d'inscription et les règles professionnelles applicables. L'omission peut entraîner des sanctions disciplinaires, au-delà des sanctions administratives de droit commun.",
    },
  ],
  faqs: [
    {
      question: "Les mentions légales sont-elles obligatoires pour un blog personnel ?",
      answer:
        "Oui dès qu'il existe une activité éditoriale régulière identifiable et, a fortiori, toute monétisation (affiliation, publicités). Les blogs strictement privés, sans public, échappent à l'obligation. En pratique, la frontière est ténue et la DGCCRF est attentive.",
    },
    {
      question: "Peut-on afficher les mentions légales dans un simple pied de page ?",
      answer:
        "La présence en pied de page ne suffit pas : il faut une page dédiée, accessible en un clic depuis chaque page du site (généralement via un lien en pied de page). L'accès doit être « direct et permanent » (art. 6-III LCEN).",
    },
    {
      question: "Faut-il les traduire en anglais si le site est multilingue ?",
      answer:
        "Pour un public francophone, le français est obligatoire. Pour un public international, une traduction est recommandée mais la version française reste la référence juridique. Conservez les deux et renvoyez vers la version française depuis chaque mention linguistique.",
    },
    {
      question: "Dois-je indiquer mon adresse personnelle ?",
      answer:
        "Pour une société, c'est l'adresse du siège social qui s'affiche. Pour un entrepreneur individuel, l'adresse du domicile personnel est en principe requise sauf si vous avez choisi de la rendre confidentielle (art. L.526-7 C. com.). Dans ce cas, l'adresse du siège de l'activité suffit.",
    },
    {
      question: "À quelle fréquence faut-il mettre à jour les mentions ?",
      answer:
        "À chaque changement substantiel : déménagement, changement de dirigeant, changement d'hébergeur, changement de médiateur. Au minimum une fois par an, vérifiez que toutes les mentions sont toujours exactes.",
    },
  ],
  related: [
    "cgu",
    "cgv-ecommerce",
    "nda",
  ],
};
