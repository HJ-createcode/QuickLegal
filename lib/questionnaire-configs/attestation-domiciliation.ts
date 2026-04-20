import type { QuestionnaireStep } from "./statuts-sas";

export interface AttestationDomiciliationData {
  // Qui atteste ?
  attestant_type: "personne_physique" | "personne_morale";
  // Personne physique
  attestant_prenom?: string;
  attestant_nom?: string;
  attestant_date_naissance?: string;
  attestant_lieu_naissance?: string;
  attestant_nationalite?: string;
  attestant_adresse_personnelle?: string;
  // Personne morale
  attestant_denomination?: string;
  attestant_forme?: string;
  attestant_capital?: number;
  attestant_siret?: string;
  attestant_rcs_ville?: string;
  attestant_siege?: string;
  attestant_representant_nom?: string;
  attestant_representant_qualite?: string;
  // Nature occupation
  attestant_occupation: "proprietaire" | "locataire" | "sous_locataire" | "autre";
  attestant_occupation_autre?: string;
  // Local
  adresse_domiciliation: string;
  // Société domiciliée
  societe_denomination: string;
  societe_forme: string;
  societe_statut: "en_cours_constitution" | "existante";
  societe_siret?: string;
  // Signature
  lieu_signature: string;
  date_signature: string;
}

export const ATTESTATION_DOMICILIATION_STEPS: QuestionnaireStep[] = [
  {
    id: "attestant",
    title: "Qui établit l'attestation ?",
    description:
      "Il s'agit de la personne qui atteste autoriser la société à établir son siège à son adresse.",
    fields: [
      {
        id: "attestant_type",
        label: "Nature de l'attestant",
        type: "select",
        options: [
          { value: "personne_physique", label: "Personne physique (dirigeant, proche, particulier)" },
          { value: "personne_morale", label: "Personne morale (société, association)" },
        ],
        defaultValue: "personne_physique",
        required: true,
      },
      {
        id: "attestant_prenom",
        label: "Prénom de l'attestant (si personne physique)",
        type: "text",
        placeholder: "Ex : Jean",
      },
      {
        id: "attestant_nom",
        label: "Nom de l'attestant (si personne physique)",
        type: "text",
        placeholder: "Ex : Dupont",
      },
      {
        id: "attestant_date_naissance",
        label: "Date de naissance (si personne physique)",
        type: "text",
        placeholder: "Ex : 15/03/1985",
      },
      {
        id: "attestant_lieu_naissance",
        label: "Lieu de naissance (si personne physique)",
        type: "text",
        placeholder: "Ex : Paris (75)",
      },
      {
        id: "attestant_nationalite",
        label: "Nationalité (si personne physique)",
        type: "text",
        placeholder: "Ex : Française",
        defaultValue: "Française",
      },
      {
        id: "attestant_adresse_personnelle",
        label: "Adresse personnelle de l'attestant (si différente du lieu domicilié)",
        type: "text",
        placeholder: "Laisser vide si c'est la même adresse",
        help:
          "À remplir uniquement si la personne atteste depuis une adresse différente de celle proposée à la domiciliation.",
      },
    ],
  },
  {
    id: "attestant_pm",
    title: "Si l'attestant est une personne morale",
    description: "À remplir uniquement si vous avez choisi « personne morale » à l'étape précédente.",
    fields: [
      {
        id: "attestant_denomination",
        label: "Dénomination sociale",
        type: "text",
        placeholder: "Ex : HOLDING EXEMPLE",
      },
      {
        id: "attestant_forme",
        label: "Forme juridique",
        type: "text",
        placeholder: "Ex : SAS, SARL, SCI, Association",
      },
      {
        id: "attestant_capital",
        label: "Capital social (€)",
        type: "number",
        placeholder: "Ex : 10000",
      },
      {
        id: "attestant_siret",
        label: "SIREN / SIRET",
        type: "text",
        placeholder: "Ex : 123 456 789",
      },
      {
        id: "attestant_rcs_ville",
        label: "Ville du greffe RCS",
        type: "text",
        placeholder: "Ex : Paris",
      },
      {
        id: "attestant_siege",
        label: "Siège social de l'attestant",
        type: "text",
        placeholder: "Ex : 10 rue de la Paix, 75002 Paris",
      },
      {
        id: "attestant_representant_nom",
        label: "Nom du représentant légal",
        type: "text",
        placeholder: "Ex : Jean Dupont",
      },
      {
        id: "attestant_representant_qualite",
        label: "Qualité du représentant",
        type: "text",
        placeholder: "Ex : Président, Gérant",
      },
    ],
  },
  {
    id: "occupation",
    title: "Nature de l'occupation",
    description:
      "Vous devez justifier du droit de disposer du local pour y domicilier une société (art. L.123-11 C. com.).",
    fields: [
      {
        id: "attestant_occupation",
        label: "À quel titre occupez-vous le local ?",
        type: "select",
        options: [
          { value: "proprietaire", label: "Propriétaire" },
          { value: "locataire", label: "Locataire (bail autorisant la domiciliation)" },
          { value: "sous_locataire", label: "Sous-locataire (avec accord du bailleur principal)" },
          { value: "autre", label: "Autre" },
        ],
        defaultValue: "proprietaire",
        required: true,
        help:
          "Si vous êtes locataire, vérifiez que votre bail n'interdit pas la domiciliation d'une société (clause classique dans les baux d'habitation).",
      },
      {
        id: "attestant_occupation_autre",
        label: "Précisez",
        type: "text",
        placeholder: "Ex : Occupant à titre gratuit avec accord du propriétaire",
        help: "À remplir uniquement si vous avez choisi « Autre ».",
      },
      {
        id: "adresse_domiciliation",
        label: "Adresse complète du local domicilié",
        type: "text",
        placeholder: "Ex : 10 rue de la Paix, 75002 Paris",
        required: true,
        help: "L'adresse où la société établira son siège social.",
      },
    ],
  },
  {
    id: "societe",
    title: "La société domiciliée",
    description: "Informations sur la société qui sera hébergée à cette adresse.",
    fields: [
      {
        id: "societe_denomination",
        label: "Dénomination de la société hébergée",
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
      {
        id: "societe_statut",
        label: "Statut de la société",
        type: "select",
        options: [
          { value: "en_cours_constitution", label: "En cours de constitution" },
          { value: "existante", label: "Déjà immatriculée" },
        ],
        defaultValue: "en_cours_constitution",
        required: true,
      },
      {
        id: "societe_siret",
        label: "SIREN / SIRET (si déjà immatriculée)",
        type: "text",
        placeholder: "Ex : 123 456 789",
        help: "Laissez vide si la société est en cours de constitution.",
      },
    ],
  },
  {
    id: "signature",
    title: "Lieu et date",
    description: "Informations de signature.",
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
        help: "Au format JJ/MM/AAAA.",
      },
    ],
  },
];
