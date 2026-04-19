import type { QuestionnaireStep } from "./statuts-sas";

export const CGV_ECOMMERCE_STEPS: QuestionnaireStep[] = [
  {
    id: "vendeur",
    title: "Le vendeur",
    description: "Identification de l'entreprise qui commercialise les produits",
    fields: [
      {
        id: "denomination",
        label: "Dénomination sociale du vendeur",
        type: "text",
        placeholder: "Ex : Ma Boutique SAS",
        required: true,
      },
      {
        id: "forme_juridique",
        label: "Forme juridique",
        type: "select",
        options: [
          { value: "sas", label: "SAS" },
          { value: "sarl", label: "SARL" },
          { value: "sasu", label: "SASU" },
          { value: "eurl", label: "EURL" },
          { value: "sa", label: "SA" },
          { value: "ei", label: "Entreprise individuelle" },
          { value: "autre", label: "Autre" },
        ],
        defaultValue: "sas",
        required: true,
      },
      {
        id: "capital_social",
        label: "Capital social (€)",
        type: "number",
        placeholder: "Ex : 10000",
        help: "Laissez vide si entreprise individuelle.",
      },
      {
        id: "siret",
        label: "Numéro SIRET",
        type: "text",
        placeholder: "Ex : 123 456 789 00012",
        required: true,
      },
      {
        id: "rcs",
        label: "Ville d'immatriculation RCS",
        type: "text",
        placeholder: "Ex : Paris",
        required: true,
      },
      {
        id: "tva_intracom",
        label: "Numéro de TVA intracommunautaire",
        type: "text",
        placeholder: "Ex : FR12345678901",
      },
      {
        id: "siege_social",
        label: "Adresse du siège social",
        type: "text",
        placeholder: "Ex : 10 rue de la Paix, 75002 Paris",
        required: true,
      },
      {
        id: "email_contact",
        label: "Email de contact client",
        type: "text",
        placeholder: "Ex : contact@maboutique.fr",
        required: true,
      },
      {
        id: "telephone",
        label: "Téléphone du service client",
        type: "text",
        placeholder: "Ex : 01 23 45 67 89",
      },
    ],
  },
  {
    id: "site",
    title: "Le site et les produits",
    description: "Informations sur votre boutique en ligne",
    fields: [
      {
        id: "site_url",
        label: "URL du site",
        type: "text",
        placeholder: "Ex : www.maboutique.fr",
        required: true,
      },
      {
        id: "type_produits",
        label: "Nature des produits vendus",
        type: "text",
        placeholder: "Ex : Vêtements, cosmétiques, livres...",
        required: true,
      },
      {
        id: "clientele",
        label: "Type de clientèle",
        type: "select",
        options: [
          { value: "b2c", label: "Consommateurs (B2C)" },
          { value: "b2b", label: "Professionnels (B2B)" },
          { value: "mixte", label: "Mixte (consommateurs et professionnels)" },
        ],
        defaultValue: "b2c",
        required: true,
        help: "Le statut de consommateur ouvre droit à des protections supplémentaires (rétractation, garanties).",
      },
    ],
  },
  {
    id: "livraison",
    title: "Livraison et paiement",
    description: "Modalités de livraison et moyens de paiement acceptés",
    fields: [
      {
        id: "zones_livraison",
        label: "Zones de livraison",
        type: "select",
        options: [
          { value: "france", label: "France métropolitaine uniquement" },
          { value: "france_corse", label: "France métropolitaine et Corse" },
          { value: "france_domtom", label: "France (métropole, Corse, DOM-TOM)" },
          { value: "ue", label: "Union Européenne" },
          { value: "monde", label: "International (monde entier)" },
        ],
        defaultValue: "france",
        required: true,
      },
      {
        id: "delai_livraison",
        label: "Délai moyen de livraison",
        type: "text",
        placeholder: "Ex : 3 à 5 jours ouvrés",
        defaultValue: "3 à 5 jours ouvrés",
        required: true,
      },
      {
        id: "moyens_paiement",
        label: "Moyens de paiement acceptés",
        type: "text",
        placeholder: "Ex : Carte bancaire, PayPal, virement",
        defaultValue: "Carte bancaire, PayPal",
        required: true,
      },
    ],
  },
  {
    id: "juridique",
    title: "Clauses juridiques",
    description: "Droits, garanties et juridiction",
    fields: [
      {
        id: "duree_retractation",
        label: "Durée du droit de rétractation",
        type: "select",
        options: [
          { value: "14", label: "14 jours (minimum légal)" },
          { value: "30", label: "30 jours" },
        ],
        defaultValue: "14",
        required: true,
        help: "Le minimum légal est de 14 jours pour les ventes aux consommateurs.",
      },
      {
        id: "mediateur_nom",
        label: "Nom du médiateur de la consommation",
        type: "text",
        placeholder: "Ex : CNPM - Médiation de la consommation",
        defaultValue: "CNPM - Médiation de la consommation",
        required: true,
        help: "Obligatoire pour tout vendeur B2C. Si vous n'en avez pas encore, CNPM est un médiateur référencé.",
      },
      {
        id: "mediateur_url",
        label: "Site du médiateur",
        type: "text",
        placeholder: "Ex : https://cnpm-mediation-consommation.eu",
        defaultValue: "https://cnpm-mediation-consommation.eu",
      },
      {
        id: "tribunal_competent",
        label: "Ville du tribunal compétent",
        type: "text",
        placeholder: "Ex : Paris",
        required: true,
      },
    ],
  },
  {
    id: "donnees",
    title: "Données personnelles (RGPD)",
    description: "Informations sur le traitement des données",
    fields: [
      {
        id: "dpo_email",
        label: "Email du Délégué à la Protection des Données (DPO)",
        type: "text",
        placeholder: "Ex : dpo@maboutique.fr",
        help: "Si vous n'avez pas de DPO formel, utilisez une adresse dédiée (ex : privacy@maboutique.fr).",
      },
      {
        id: "duree_conservation_commandes",
        label: "Durée de conservation des données de commande (années)",
        type: "number",
        defaultValue: 10,
        required: true,
        help: "10 ans est la durée légale pour les documents comptables.",
      },
      {
        id: "utilise_cookies",
        label: "Le site utilise-t-il des cookies de mesure d'audience ou publicitaires ?",
        type: "toggle",
        defaultValue: true,
      },
    ],
  },
];

export interface CGVEcommerceData {
  denomination: string;
  forme_juridique: string;
  capital_social: number;
  siret: string;
  rcs: string;
  tva_intracom: string;
  siege_social: string;
  email_contact: string;
  telephone: string;
  site_url: string;
  type_produits: string;
  clientele: string;
  zones_livraison: string;
  delai_livraison: string;
  moyens_paiement: string;
  duree_retractation: string;
  mediateur_nom: string;
  mediateur_url: string;
  tribunal_competent: string;
  dpo_email: string;
  duree_conservation_commandes: number;
  utilise_cookies: boolean;
}
