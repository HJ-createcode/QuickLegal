import type { QuestionnaireStep } from "./statuts-sas";

export const NDA_STEPS: QuestionnaireStep[] = [
  {
    id: "type",
    title: "Type d'accord",
    description: "Unilatéral ou réciproque",
    fields: [
      {
        id: "type_nda",
        label: "Type d'accord de confidentialité",
        type: "select",
        options: [
          { value: "unilateral", label: "Unilatéral (une seule partie divulgue les informations)" },
          { value: "bilateral", label: "Bilatéral / réciproque (les deux parties partagent des informations)" },
        ],
        defaultValue: "bilateral",
        required: true,
        help: "Un NDA bilatéral protège les deux parties. Unilatéral si une seule partie divulgue des informations confidentielles.",
      },
    ],
  },
  {
    id: "partie_a",
    title: "Partie A",
    description: "Identification de la première partie (divulgateur dans un NDA unilatéral)",
    fields: [
      {
        id: "partie_a_type",
        label: "La partie A est...",
        type: "select",
        options: [
          { value: "societe", label: "Une société (personne morale)" },
          { value: "personne", label: "Une personne physique" },
        ],
        defaultValue: "societe",
        required: true,
      },
      {
        id: "partie_a_nom",
        label: "Dénomination ou nom complet",
        type: "text",
        placeholder: "Ex : Acme SAS ou Jean Dupont",
        required: true,
      },
      {
        id: "partie_a_forme",
        label: "Forme juridique (si société)",
        type: "text",
        placeholder: "Ex : SAS au capital de 10 000 €",
      },
      {
        id: "partie_a_siret",
        label: "SIRET ou RCS (si société)",
        type: "text",
        placeholder: "Ex : RCS Paris 123 456 789",
      },
      {
        id: "partie_a_adresse",
        label: "Adresse",
        type: "text",
        placeholder: "Ex : 10 rue de la Paix, 75002 Paris",
        required: true,
      },
      {
        id: "partie_a_representant",
        label: "Nom du représentant légal (si société)",
        type: "text",
        placeholder: "Ex : M. Jean Dupont, Président",
      },
    ],
  },
  {
    id: "partie_b",
    title: "Partie B",
    description: "Identification de la seconde partie (récepteur dans un NDA unilatéral)",
    fields: [
      {
        id: "partie_b_type",
        label: "La partie B est...",
        type: "select",
        options: [
          { value: "societe", label: "Une société (personne morale)" },
          { value: "personne", label: "Une personne physique" },
        ],
        defaultValue: "societe",
        required: true,
      },
      {
        id: "partie_b_nom",
        label: "Dénomination ou nom complet",
        type: "text",
        placeholder: "Ex : Beta Tech ou Marie Martin",
        required: true,
      },
      {
        id: "partie_b_forme",
        label: "Forme juridique (si société)",
        type: "text",
        placeholder: "Ex : SARL au capital de 5 000 €",
      },
      {
        id: "partie_b_siret",
        label: "SIRET ou RCS (si société)",
        type: "text",
        placeholder: "Ex : RCS Lyon 987 654 321",
      },
      {
        id: "partie_b_adresse",
        label: "Adresse",
        type: "text",
        placeholder: "Ex : 5 rue de la République, 69002 Lyon",
        required: true,
      },
      {
        id: "partie_b_representant",
        label: "Nom du représentant légal (si société)",
        type: "text",
        placeholder: "Ex : Mme Marie Martin, Gérante",
      },
    ],
  },
  {
    id: "contexte",
    title: "Contexte et objet",
    description: "Pourquoi les parties souhaitent-elles échanger des informations confidentielles ?",
    fields: [
      {
        id: "contexte",
        label: "Contexte de la relation",
        type: "textarea",
        placeholder:
          "Ex : Les parties envisagent une éventuelle collaboration commerciale consistant en...",
        required: true,
        help: "Décrivez brièvement le projet, le partenariat ou la discussion qui justifie l'échange d'informations confidentielles.",
      },
      {
        id: "nature_informations",
        label: "Nature des informations confidentielles",
        type: "textarea",
        placeholder:
          "Ex : Savoir-faire technique, données commerciales, informations financières, stratégie...",
        defaultValue:
          "Toute information de nature technique, commerciale, financière, stratégique, opérationnelle ou relative aux savoir-faire, échangée dans le cadre des discussions entre les parties",
        required: true,
      },
    ],
  },
  {
    id: "conditions",
    title: "Durée et conditions",
    description: "Durée de la confidentialité et juridiction",
    fields: [
      {
        id: "duree_confidentialite",
        label: "Durée de l'obligation de confidentialité (années)",
        type: "number",
        defaultValue: 5,
        required: true,
        help: "Durée pendant laquelle les informations doivent rester confidentielles. Standard : 3 à 5 ans.",
      },
      {
        id: "penalites",
        label: "Clause pénale (montant forfaitaire en € en cas de violation)",
        type: "number",
        placeholder: "Ex : 50000",
        help: "Facultatif. Fixe un montant minimum de dédommagement en cas de violation. Laissez vide pour une évaluation au cas par cas.",
      },
      {
        id: "tribunal_competent",
        label: "Ville du tribunal compétent",
        type: "text",
        placeholder: "Ex : Paris",
        defaultValue: "Paris",
        required: true,
      },
      {
        id: "contient_donnees_personnelles",
        label: "Les informations échangées contiennent-elles des données à caractère personnel (clients, salariés...) ?",
        type: "toggle",
        defaultValue: true,
        help: "Si oui, une clause RGPD dédiée sera ajoutée à l'accord.",
      },
    ],
  },
];

export interface NDAData {
  type_nda: string;
  partie_a_type: string;
  partie_a_nom: string;
  partie_a_forme: string;
  partie_a_siret: string;
  partie_a_adresse: string;
  partie_a_representant: string;
  partie_b_type: string;
  partie_b_nom: string;
  partie_b_forme: string;
  partie_b_siret: string;
  partie_b_adresse: string;
  partie_b_representant: string;
  contexte: string;
  nature_informations: string;
  duree_confidentialite: number;
  penalites: number;
  tribunal_competent: string;
  contient_donnees_personnelles: boolean;
}
