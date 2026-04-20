import type { QuestionnaireStep } from "./statuts-sas";

export interface DeclarationNonCondamnationData {
  // Déclarant
  prenom: string;
  nom: string;
  nom_naissance?: string;
  date_naissance: string;
  lieu_naissance: string;
  nationalite: string;
  adresse: string;
  // Filiation (exigée par le greffe)
  pere_prenom: string;
  pere_nom: string;
  mere_prenom: string;
  mere_nom: string;
  // Qualité
  qualite: string;
  societe_denomination: string;
  societe_forme: string;
  // Signature
  lieu_signature: string;
  date_signature: string;
}

export const DECLARATION_NON_CONDAMNATION_STEPS: QuestionnaireStep[] = [
  {
    id: "identite",
    title: "Votre identité",
    description:
      "Informations d'état civil requises par le greffe du tribunal de commerce.",
    fields: [
      {
        id: "prenom",
        label: "Prénom(s)",
        type: "text",
        placeholder: "Ex : Jean",
        required: true,
        help: "Indiquez tous vos prénoms dans l'ordre de l'état civil.",
      },
      {
        id: "nom",
        label: "Nom d'usage",
        type: "text",
        placeholder: "Ex : Dupont",
        required: true,
      },
      {
        id: "nom_naissance",
        label: "Nom de naissance (si différent)",
        type: "text",
        placeholder: "Ex : Martin",
        help: "À remplir uniquement si votre nom d'usage diffère du nom de naissance.",
      },
      {
        id: "date_naissance",
        label: "Date de naissance",
        type: "text",
        placeholder: "Ex : 15/03/1985",
        required: true,
      },
      {
        id: "lieu_naissance",
        label: "Lieu de naissance (ville, département, pays)",
        type: "text",
        placeholder: "Ex : Paris (75), France",
        required: true,
      },
      {
        id: "nationalite",
        label: "Nationalité",
        type: "text",
        placeholder: "Ex : Française",
        defaultValue: "Française",
        required: true,
      },
      {
        id: "adresse",
        label: "Adresse personnelle complète",
        type: "text",
        placeholder: "Ex : 10 rue de la Paix, 75002 Paris",
        required: true,
      },
    ],
  },
  {
    id: "filiation",
    title: "Filiation",
    description:
      "Le greffe exige les noms et prénoms des parents pour l'inscription au RCS (article R.123-54 du Code de commerce).",
    fields: [
      {
        id: "pere_prenom",
        label: "Prénom du père",
        type: "text",
        placeholder: "Ex : Pierre",
        required: true,
      },
      {
        id: "pere_nom",
        label: "Nom du père",
        type: "text",
        placeholder: "Ex : Dupont",
        required: true,
      },
      {
        id: "mere_prenom",
        label: "Prénom de la mère",
        type: "text",
        placeholder: "Ex : Marie",
        required: true,
      },
      {
        id: "mere_nom",
        label: "Nom de naissance de la mère",
        type: "text",
        placeholder: "Ex : Durand",
        required: true,
        help: "Nom de jeune fille, tel qu'indiqué à l'état civil.",
      },
    ],
  },
  {
    id: "mandat",
    title: "Votre mandat social",
    description: "La fonction que vous êtes nommé(e) à exercer.",
    fields: [
      {
        id: "qualite",
        label: "Qualité / fonction",
        type: "select",
        options: [
          { value: "Président", label: "Président (SAS/SASU)" },
          { value: "Directeur Général", label: "Directeur Général" },
          { value: "Gérant", label: "Gérant (SARL/EURL/SCI/SNC)" },
          { value: "Cogérant", label: "Cogérant" },
          { value: "Administrateur", label: "Administrateur (SA)" },
          { value: "Membre du directoire", label: "Membre du directoire" },
          { value: "Président du conseil de surveillance", label: "Président du conseil de surveillance" },
          { value: "Liquidateur", label: "Liquidateur" },
        ],
        defaultValue: "Président",
        required: true,
      },
      {
        id: "societe_denomination",
        label: "Dénomination de la société",
        type: "text",
        placeholder: "Ex : MA SOCIETE",
        required: true,
      },
      {
        id: "societe_forme",
        label: "Forme juridique",
        type: "text",
        placeholder: "Ex : SAS, SARL, SCI",
        required: true,
      },
    ],
  },
  {
    id: "signature",
    title: "Lieu et date",
    description: "Signez et datez la déclaration.",
    fields: [
      {
        id: "lieu_signature",
        label: "Lieu de signature",
        type: "text",
        placeholder: "Ex : Paris",
        required: true,
      },
      {
        id: "date_signature",
        label: "Date de signature",
        type: "text",
        placeholder: "Ex : 15/05/2026",
        required: true,
      },
    ],
  },
];
