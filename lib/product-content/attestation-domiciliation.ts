import type { ProductPageContent } from "./types";

export const ATTESTATION_DOMICILIATION_CONTENT: ProductPageContent = {
  h1: "Attestation de domiciliation du siège social",
  promise:
    "L'autorisation écrite requise par le greffe pour établir le siège d'une société à une adresse personnelle ou professionnelle.",
  introduction: [
    "Pour immatriculer une société au RCS, le greffier exige une preuve de la jouissance des locaux fixés comme siège social. Lorsque le local n'est pas détenu en propre par la société, la personne qui en a la disposition doit produire une attestation écrite autorisant la domiciliation.",
    "Notre modèle couvre les quatre cas de figure les plus fréquents — dirigeant domicilié chez lui, domiciliation chez un tiers, chez une société du groupe, ou dans une pépinière — et s'adapte selon que l'attestant est une personne physique ou morale.",
  ],
  audience: {
    summary:
      "L'attestation est produite par la personne qui occupe légalement les locaux choisis comme siège.",
    items: [
      "Dirigeants qui domicilient la société à leur adresse personnelle",
      "Associés qui mettent à disposition un local professionnel qu'ils louent ou possèdent",
      "Sociétés mères ou sœurs qui hébergent une filiale dans leurs locaux",
      "Tiers (parent, ami, associé professionnel) qui acceptent d'accueillir une société en création",
    ],
  },
  timing: {
    summary:
      "L'attestation accompagne le dossier d'immatriculation ou de transfert de siège déposé au guichet unique.",
    items: [
      "À la constitution, jointe à la demande d'immatriculation au RCS",
      "En cas de transfert de siège social vers une nouvelle adresse",
      "Au renouvellement d'une domiciliation arrivée à échéance",
      "Lors d'une régularisation demandée par le greffe",
    ],
  },
  contains: {
    summary:
      "Un document court, clair, signé, attestant du droit d'usage et de l'autorisation donnée à la société.",
    items: [
      "Identité complète de l'attestant (personne physique ou personne morale)",
      "Justification du titre d'occupation (propriétaire, locataire, sous-locataire)",
      "Adresse exacte du local mis à disposition",
      "Dénomination et forme juridique de la société hébergée",
      "Statut de la société (en cours de constitution ou déjà immatriculée)",
      "Durée de l'autorisation et modalités de résiliation",
      "Obligations incombant à la société hébergée",
    ],
  },
  included: [
    "Version pour personne physique et version pour personne morale",
    "Mention expresse de la jouissance du local par l'attestant",
    "Clauses de résiliation et de préavis conformes à la pratique",
    "PDF signé, accepté au guichet unique de l'INPI",
  ],
  notIncluded: [
    "La vérification du règlement de copropriété ou du bail d'habitation",
    "La demande d'accord préalable au bailleur en cas de location",
    "Les formalités déclaratives auprès du guichet unique (dépôt du dossier)",
  ],
  mistakes: [
    {
      title: "Domicilier une société dans un appartement loué sans l'accord du bailleur",
      body: "La plupart des baux d'habitation interdisent expressément la domiciliation d'une société. Avant d'établir l'attestation, vérifiez votre bail et obtenez, si nécessaire, une autorisation écrite du propriétaire. Le dirigeant peut domicilier sans autorisation, mais seulement pendant cinq ans maximum (art. L.123-11-1 C. com.).",
    },
    {
      title: "Omettre la qualité de l'occupant",
      body: "Le greffe refuse les attestations qui ne précisent pas à quel titre la personne dispose du local (propriétaire, locataire, occupant à titre gratuit). Précisez systématiquement votre statut d'occupation.",
    },
    {
      title: "Domicilier dans un local contraire au règlement de copropriété",
      body: "Un règlement de copropriété peut interdire toute activité professionnelle dans les parties privatives. Une domiciliation en violation du règlement expose à une action en cessation et à la nullité éventuelle de l'immatriculation.",
    },
    {
      title: "Signer pour une société en cours de constitution sans s'identifier",
      body: "L'attestation doit identifier la société bénéficiaire par sa future dénomination et sa forme juridique, même avant immatriculation. Précisez qu'elle est « en cours de constitution » — c'est prévu dans notre questionnaire.",
    },
  ],
  faqs: [
    {
      question: "Peut-on domicilier une société à l'adresse personnelle du dirigeant ?",
      answer:
        "Oui, pour une durée maximale de cinq ans (art. L.123-11-1 du Code de commerce). Si le dirigeant est locataire, le bail doit l'autoriser ou ne pas l'interdire explicitement. À l'expiration des cinq ans, le siège doit être transféré.",
    },
    {
      question: "Une société de domiciliation délivre-t-elle cette attestation ?",
      answer:
        "Oui, mais elle est appelée « contrat de domiciliation » et suit un formalisme renforcé (art. R.123-166-1 C. com.). Le présent modèle concerne uniquement l'attestation simple, hors société de domiciliation agréée par la préfecture.",
    },
    {
      question: "Combien de temps est valable l'attestation ?",
      answer:
        "Notre modèle prévoit une autorisation à durée indéterminée, résiliable avec un préavis d'un mois. Vous pouvez modifier ces durées si votre situation l'exige (bail à durée déterminée, pépinière avec engagement ferme).",
    },
    {
      question: "Le document est-il accepté par tous les greffes ?",
      answer:
        "Oui. Notre modèle reprend les mentions exigées par l'article R.123-54 du Code de commerce et par la pratique des greffes parisien, de Bobigny, de Nanterre et des principales juridictions. Il est également accepté par le guichet unique géré par l'INPI.",
    },
    {
      question: "Puis-je utiliser la même attestation pour deux sociétés différentes ?",
      answer:
        "Non. Une attestation vise une seule société bénéficiaire, clairement identifiée. Générez une attestation par société hébergée. Chaque document est conservé à vie dans votre espace client.",
    },
  ],
  related: [
    "statuts-sas",
    "statuts-sci",
    "declaration-non-condamnation",
  ],
};
