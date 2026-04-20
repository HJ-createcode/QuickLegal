import type { QuestionnaireStep } from "./statuts-sas";

export interface CGUData {
  // Service
  denomination: string;
  site_url: string;
  nature_service: string;
  clientele: "b2c" | "b2b" | "mixte";
  // Accès
  inscription_requise: boolean;
  service_payant: boolean;
  description_tarifs?: string;
  // Contenu
  contenu_utilisateurs: boolean;
  // Éditeur
  siege_social: string;
  email_contact: string;
  // Juridique
  tribunal_competent: string;
}

export const CGU_STEPS: QuestionnaireStep[] = [
  {
    id: "service",
    title: "Le service",
    description:
      "Informations sur le site ou la plateforme dont vous rédigez les CGU.",
    fields: [
      {
        id: "denomination",
        label: "Dénomination de l'éditeur",
        type: "text",
        placeholder: "Ex : Ma Société SAS",
        required: true,
        help:
          "Personne morale ou physique qui exploite le service. Les utilisateurs s'engagent envers elle.",
      },
      {
        id: "site_url",
        label: "URL du site ou de la plateforme",
        type: "text",
        placeholder: "https://www.monsite.fr",
        required: true,
      },
      {
        id: "nature_service",
        label: "Nature du service proposé",
        type: "textarea",
        placeholder:
          "Ex : Plateforme SaaS permettant à ses utilisateurs de gérer des listes de tâches collaboratives.",
        required: true,
        help: "Décrivez en 1 à 3 phrases l'objet du service.",
      },
      {
        id: "clientele",
        label: "À qui s'adresse le service ?",
        type: "select",
        options: [
          { value: "b2c", label: "Consommateurs (B2C)" },
          { value: "b2b", label: "Professionnels (B2B)" },
          { value: "mixte", label: "Les deux (mixte)" },
        ],
        defaultValue: "b2c",
        required: true,
      },
    ],
  },
  {
    id: "acces",
    title: "Accès et tarification",
    description: "Conditions d'accès au service.",
    fields: [
      {
        id: "inscription_requise",
        label: "L'utilisation du service requiert-elle la création d'un compte ?",
        type: "toggle",
        defaultValue: true,
      },
      {
        id: "service_payant",
        label: "Le service est-il payant (en tout ou partie) ?",
        type: "toggle",
        defaultValue: false,
      },
      {
        id: "description_tarifs",
        label: "Description des offres payantes",
        type: "textarea",
        placeholder:
          "Ex : Abonnement mensuel à 9,99 € TTC donnant accès aux fonctionnalités premium. Paiement par carte bancaire via Stripe.",
        help:
          "Décrivez brièvement vos offres. Les tarifs détaillés peuvent figurer sur une page séparée référencée dans les CGU. Laissez vide si le service est entièrement gratuit.",
      },
      {
        id: "contenu_utilisateurs",
        label: "Les utilisateurs peuvent-ils publier du contenu (UGC) ?",
        type: "toggle",
        defaultValue: false,
        help:
          "Par exemple commentaires, messages, fichiers, photos… Ajoute automatiquement une clause sur la licence accordée et la modération.",
      },
    ],
  },
  {
    id: "societe",
    title: "Coordonnées de l'éditeur",
    description: "Adresse et moyen de contact.",
    fields: [
      {
        id: "siege_social",
        label: "Adresse du siège social / établissement",
        type: "text",
        placeholder: "Ex : 10 rue de la Paix, 75002 Paris",
        required: true,
      },
      {
        id: "email_contact",
        label: "Email de contact",
        type: "text",
        placeholder: "contact@monsite.fr",
        required: true,
      },
    ],
  },
  {
    id: "juridique",
    title: "Droit applicable",
    description: "Clauses de résolution des litiges.",
    fields: [
      {
        id: "tribunal_competent",
        label: "Ville du tribunal compétent",
        type: "text",
        placeholder: "Ex : Paris",
        defaultValue: "Paris",
        required: true,
        help:
          "Vis-à-vis d'un consommateur, la clause attributive de juridiction est inopposable : le consommateur peut toujours saisir le tribunal de son domicile.",
      },
    ],
  },
];
