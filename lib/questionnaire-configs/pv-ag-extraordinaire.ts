import type { QuestionnaireStep } from "./statuts-sas";

export interface PVAGExtraordinaireData {
  // Société
  forme_juridique: "sas" | "sarl" | "sci" | "snc" | "association";
  denomination: string;
  capital_social?: number;
  siege_social: string;
  siren?: string;
  rcs_ville?: string;
  // Assemblée
  date_assemblee: string;
  heure_assemblee?: string;
  lieu_assemblee: string;
  // Présidence
  president_seance_nom: string;
  president_seance_qualite: string;
  secretaire_seance_nom?: string;
  // Quorum
  total_parts: number;
  participants_description: string;
  // Objet principal
  objet_decision:
    | "modification_statuts"
    | "transfert_siege"
    | "changement_denomination"
    | "changement_objet_social"
    | "augmentation_capital"
    | "reduction_capital"
    | "transformation"
    | "dissolution_anticipee"
    | "nomination_dirigeant"
    | "revocation_dirigeant"
    | "autre";
  // Détails selon l'objet
  nouveau_siege?: string;
  nouvelle_denomination?: string;
  nouvel_objet_social?: string;
  montant_augmentation?: number;
  modalites_augmentation?: string;
  montant_reduction?: number;
  motif_reduction?: string;
  nouvelle_forme?: string;
  motif_dissolution?: string;
  nom_liquidateur?: string;
  adresse_liquidation?: string;
  nouveau_dirigeant_nom?: string;
  nouveau_dirigeant_qualite?: string;
  dirigeant_revoque_nom?: string;
  motif_revocation?: string;
  // Autre
  description_autre_decision?: string;
  // Résolutions additionnelles
  autres_resolutions?: string;
}

export const PV_AG_EXTRAORDINAIRE_STEPS: QuestionnaireStep[] = [
  {
    id: "societe",
    title: "La société / structure",
    description:
      "Identification de la personne morale dont se tient l'assemblée.",
    fields: [
      {
        id: "forme_juridique",
        label: "Forme juridique",
        type: "select",
        options: [
          { value: "sas", label: "SAS / SASU" },
          { value: "sarl", label: "SARL / EURL" },
          { value: "sci", label: "SCI" },
          { value: "snc", label: "SNC" },
          { value: "association", label: "Association loi 1901" },
        ],
        defaultValue: "sas",
        required: true,
      },
      {
        id: "denomination",
        label: "Dénomination sociale",
        type: "text",
        placeholder: "Ex : MA SOCIETE",
        required: true,
      },
      {
        id: "siege_social",
        label: "Adresse du siège social",
        type: "text",
        placeholder: "Ex : 10 rue de la Paix, 75002 Paris",
        required: true,
      },
      {
        id: "capital_social",
        label: "Capital social (€)",
        type: "number",
        placeholder: "Ex : 10000",
      },
      {
        id: "siren",
        label: "Numéro SIREN",
        type: "text",
        placeholder: "Ex : 123 456 789",
      },
      {
        id: "rcs_ville",
        label: "Ville du greffe RCS",
        type: "text",
        placeholder: "Ex : Paris",
      },
    ],
  },
  {
    id: "assemblee",
    title: "Tenue de l'assemblée",
    description: "Date et lieu.",
    fields: [
      {
        id: "date_assemblee",
        label: "Date de l'assemblée (JJ/MM/AAAA)",
        type: "text",
        placeholder: "Ex : 15/06/2026",
        required: true,
      },
      {
        id: "heure_assemblee",
        label: "Heure",
        type: "text",
        placeholder: "Ex : 10h00",
      },
      {
        id: "lieu_assemblee",
        label: "Lieu de l'assemblée",
        type: "text",
        placeholder: "Ex : au siège social",
        required: true,
      },
    ],
  },
  {
    id: "presidence",
    title: "Bureau de l'assemblée",
    description: "Président et secrétaire de séance.",
    fields: [
      {
        id: "president_seance_nom",
        label: "Nom et prénom du président de séance",
        type: "text",
        placeholder: "Ex : Jean Dupont",
        required: true,
      },
      {
        id: "president_seance_qualite",
        label: "Qualité du président de séance",
        type: "text",
        placeholder: "Ex : Président, Gérant",
        required: true,
      },
      {
        id: "secretaire_seance_nom",
        label: "Nom et prénom du secrétaire de séance (facultatif)",
        type: "text",
        placeholder: "Ex : Marie Martin",
      },
    ],
  },
  {
    id: "participants",
    title: "Participants et quorum",
    description: "Liste des associés/membres présents, représentés ou absents.",
    fields: [
      {
        id: "total_parts",
        label: "Nombre total de parts sociales / actions émises",
        type: "number",
        placeholder: "Ex : 1000",
        required: true,
        help:
          "Pour une association, indiquez le nombre total de membres à jour de cotisation. Les règles de quorum et de majorité applicables aux AGE sont renforcées (art. L.223-30 pour la SARL, L.225-96 pour la SA, statuts pour la SAS).",
      },
      {
        id: "participants_description",
        label: "Liste des participants",
        type: "textarea",
        placeholder:
          "Un par ligne.\nEx :\nJean Dupont — 400 actions — présent\nMarie Martin — 300 actions — représentée par Jean Dupont\nPierre Durand — 300 actions — absent",
        required: true,
        help:
          "Une ligne par participant, avec nom, parts/actions détenues et statut (présent / représenté / absent).",
      },
    ],
  },
  {
    id: "objet",
    title: "Objet principal de l'AGE",
    description:
      "Choisissez la décision principale. Une seule peut être sélectionnée — les décisions secondaires sont à ajouter à l'étape « Autres résolutions ».",
    fields: [
      {
        id: "objet_decision",
        label: "Nature de la décision",
        type: "select",
        options: [
          { value: "modification_statuts", label: "Modification d'une clause statutaire" },
          { value: "transfert_siege", label: "Transfert du siège social" },
          { value: "changement_denomination", label: "Changement de dénomination sociale" },
          { value: "changement_objet_social", label: "Changement d'objet social" },
          { value: "augmentation_capital", label: "Augmentation de capital" },
          { value: "reduction_capital", label: "Réduction de capital" },
          { value: "transformation", label: "Transformation en une autre forme" },
          { value: "dissolution_anticipee", label: "Dissolution anticipée" },
          { value: "nomination_dirigeant", label: "Nomination d'un dirigeant" },
          { value: "revocation_dirigeant", label: "Révocation d'un dirigeant" },
          { value: "autre", label: "Autre décision extraordinaire" },
        ],
        defaultValue: "modification_statuts",
        required: true,
      },
    ],
  },
  {
    id: "details_objet",
    title: "Détails de la décision",
    description:
      "Complétez uniquement les champs correspondant à l'objet choisi ci-dessus.",
    fields: [
      {
        id: "nouveau_siege",
        label: "Nouvelle adresse du siège",
        type: "text",
        placeholder: "Ex : 25 avenue des Champs-Élysées, 75008 Paris",
        help: "À remplir en cas de transfert de siège.",
      },
      {
        id: "nouvelle_denomination",
        label: "Nouvelle dénomination sociale",
        type: "text",
        placeholder: "Ex : NOUVEAU NOM SAS",
        help: "À remplir en cas de changement de dénomination.",
      },
      {
        id: "nouvel_objet_social",
        label: "Nouveau texte de l'objet social",
        type: "textarea",
        placeholder:
          "Ex : La conception, le développement, l'édition et la commercialisation de solutions logicielles ; toute prestation de conseil et de formation s'y rapportant ; plus généralement, toutes opérations se rattachant directement ou indirectement à l'objet social.",
        help: "À remplir en cas de changement d'objet social.",
      },
      {
        id: "montant_augmentation",
        label: "Montant de l'augmentation de capital (€)",
        type: "number",
        placeholder: "Ex : 50000",
      },
      {
        id: "modalites_augmentation",
        label: "Modalités de l'augmentation",
        type: "textarea",
        placeholder:
          "Ex : Par émission de 5 000 actions nouvelles de 10 € de valeur nominale chacune, souscrites en numéraire, libérées intégralement à la souscription, avec prime d'émission de 40 € par action.",
        help: "À remplir en cas d'augmentation de capital. Précisez mode, prime éventuelle, droit préférentiel de souscription.",
      },
      {
        id: "montant_reduction",
        label: "Montant de la réduction de capital (€)",
        type: "number",
        placeholder: "Ex : 5000",
      },
      {
        id: "motif_reduction",
        label: "Motif et modalités de la réduction",
        type: "textarea",
        placeholder:
          "Ex : Réduction motivée par des pertes, par imputation sur le compte « Report à nouveau débiteur ».",
        help: "À remplir en cas de réduction de capital.",
      },
      {
        id: "nouvelle_forme",
        label: "Nouvelle forme juridique cible",
        type: "text",
        placeholder: "Ex : SAS",
        help: "À remplir en cas de transformation.",
      },
      {
        id: "motif_dissolution",
        label: "Motif de la dissolution anticipée",
        type: "textarea",
        placeholder:
          "Ex : Cessation d'activité, mésentente entre associés, opportunité stratégique…",
        help: "À remplir en cas de dissolution.",
      },
      {
        id: "nom_liquidateur",
        label: "Nom du liquidateur",
        type: "text",
        placeholder: "Ex : Jean Dupont, associé",
        help: "À remplir en cas de dissolution.",
      },
      {
        id: "adresse_liquidation",
        label: "Adresse du lieu de liquidation",
        type: "text",
        placeholder: "Ex : 10 rue de la Paix, 75002 Paris",
        help: "À remplir en cas de dissolution. Par défaut, le siège social peut être conservé.",
      },
      {
        id: "nouveau_dirigeant_nom",
        label: "Nom du dirigeant nommé",
        type: "text",
        placeholder: "Ex : Marie Martin",
      },
      {
        id: "nouveau_dirigeant_qualite",
        label: "Qualité du nouveau dirigeant",
        type: "text",
        placeholder: "Ex : Président, Gérant, DG",
      },
      {
        id: "dirigeant_revoque_nom",
        label: "Nom du dirigeant révoqué",
        type: "text",
        placeholder: "Ex : Jean Dupont",
      },
      {
        id: "motif_revocation",
        label: "Motif de la révocation",
        type: "textarea",
        placeholder: "Ex : Pour juste motif, conformément aux statuts.",
        help:
          "La rédaction des motifs engage la responsabilité de la société. Vérifiez qu'ils constituent un juste motif au sens de la loi ou des statuts.",
      },
      {
        id: "description_autre_decision",
        label: "Description libre de la décision",
        type: "textarea",
        placeholder: "Décrivez précisément la décision soumise à l'AGE.",
        help: "À remplir uniquement si vous avez choisi « Autre décision extraordinaire ».",
      },
    ],
  },
  {
    id: "autres",
    title: "Résolutions additionnelles",
    description:
      "Si l'AGE vote plusieurs résolutions, listez les suivantes ici. Elles s'ajouteront après la résolution principale.",
    fields: [
      {
        id: "autres_resolutions",
        label: "Autres résolutions à acter",
        type: "textarea",
        placeholder:
          "Ex :\n- Modification corrélative de l'article 4 des statuts\n- Pouvoirs au Président pour accomplir les formalités auprès du greffe",
        help: "Une résolution par ligne.",
      },
    ],
  },
];
