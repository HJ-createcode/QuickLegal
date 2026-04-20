import type { ProductPageContent } from "./types";

export const NDA_CONTENT: ProductPageContent = {
  h1: "Accord de confidentialité (NDA) — unilatéral ou réciproque",
  promise:
    "Un contrat clair pour protéger vos informations sensibles avant toute négociation ou collaboration, adapté à votre contexte.",
  introduction: [
    "Un accord de confidentialité — ou Non-Disclosure Agreement — encadre l'échange d'informations sensibles entre deux parties qui explorent un partenariat, une transaction, un recrutement ou une prestation. Il fixe les règles du jeu : ce qui est couvert, pour combien de temps, avec quelles exceptions, et quelles sanctions en cas de violation.",
    "Notre modèle s'adapte au contexte unilatéral (une seule partie communique) ou réciproque (chaque partie échange des informations), aux personnes physiques comme aux sociétés, et intègre les clauses modernes attendues en 2026 : conformité RGPD, retour ou destruction des informations, juridiction, clause pénale optionnelle.",
  ],
  audience: {
    summary:
      "Toute partie qui doit partager des informations confidentielles avant de s'engager contractuellement.",
    items: [
      "Fondateurs échangeant avec des investisseurs avant une levée de fonds",
      "Entreprises en discussion de partenariat, d'apport d'affaires ou de joint-venture",
      "Cédants et acquéreurs préparant une opération de haut de bilan",
      "Entreprises engageant un prestataire (consultant, développeur, agence) avec accès à des données stratégiques",
      "Candidats à un poste sensible (direction, R&D, data) avant contrat de travail",
    ],
  },
  timing: {
    summary:
      "Le NDA précède l'échange d'informations confidentielles. Un accord signé après l'échange reste valable, mais ne protège qu'imparfaitement.",
    items: [
      "Avant toute data room, audit ou due diligence",
      "Avant la présentation d'un business plan, de données techniques ou financières",
      "Au début d'une négociation commerciale portant sur un contrat futur",
      "À l'arrivée d'un prestataire externe sur un projet sensible",
      "Lors d'une étude de faisabilité préalable à un développement partagé",
    ],
  },
  contains: {
    summary:
      "Un contrat court, lisible, prêt à signer, couvrant l'essentiel des situations.",
    items: [
      "Identification précise des parties (personne physique ou morale)",
      "Préambule rappelant le contexte de l'échange",
      "Définition large des informations confidentielles couvertes",
      "Engagements de confidentialité et d'usage limité aux finalités convenues",
      "Exceptions classiques (information publique, déjà connue, divulgation ordonnée par un juge)",
      "Durée de confidentialité post-échange (5 ans par défaut, paramétrable)",
      "Obligation de restitution ou de destruction des informations",
      "Clause pénale optionnelle avec montant chiffré",
      "Mentions RGPD lorsque les informations incluent des données personnelles",
      "Droit applicable français et juridiction compétente",
    ],
  },
  included: [
    "Unilatéral ou bilatéral, selon votre situation",
    "Durée de confidentialité personnalisable",
    "Clause pénale optionnelle",
    "Clause RGPD en cas d'échange de données personnelles",
    "Accès à vie au document dans votre espace client",
  ],
  notIncluded: [
    "Les accords de non-concurrence (document séparé, plus spécifique)",
    "Les conventions de stage ou lettres d'engagement RH",
    "Les clauses de non-sollicitation de clients ou de salariés",
    "La classification formelle (Top Secret / Confidentiel) demandée dans certains secteurs régulés",
  ],
  mistakes: [
    {
      title: "Définir trop largement les informations confidentielles",
      body: "Une définition floue du type « toute information transmise à l'autre partie » est contre-productive : elle couvre des informations publiques et devient inopposable en pratique. Préférez une définition précise, complétée par une obligation de marquer explicitement chaque document sensible.",
    },
    {
      title: "Prévoir une durée excessive",
      body: "Une confidentialité illimitée ou excessivement longue (20 ans et plus) est souvent requalifiée par les juges en durée raisonnable. Pour l'essentiel des projets, cinq ans après la fin des échanges sont suffisants ; dix ans se justifient pour des informations stratégiques ou des secrets industriels.",
    },
    {
      title: "Oublier les exceptions légitimes",
      body: "L'obligation de confidentialité doit connaître des exceptions : information déjà publique, information déjà connue de l'autre partie, information obtenue d'un tiers sans obligation de confidentialité, divulgation ordonnée par un juge. Sans ces exceptions, la clause peut être considérée comme abusive.",
    },
    {
      title: "Ne pas prévoir le sort des informations à la fin",
      body: "À la fin des échanges, les informations doivent être restituées ou détruites, y compris les copies électroniques. Une clause de restitution ou destruction est essentielle ; sa violation est un cas typique d'action judiciaire.",
    },
    {
      title: "Signer un NDA et négliger les clauses annexes",
      body: "Un NDA seul ne couvre pas la propriété intellectuelle, la non-sollicitation ou l'exclusivité. Si votre échange inclut la co-construction d'un prototype ou le partage d'une liste clients, prévoyez des clauses complémentaires ou un contrat cadre dédié.",
    },
  ],
  faqs: [
    {
      question: "Faut-il un NDA avec un employé ?",
      answer:
        "Le contrat de travail contient généralement une clause de confidentialité. Un NDA séparé peut être utile pour certaines fonctions très exposées (direction, R&D, données personnelles) ou pour encadrer l'accès à des informations stratégiques pendant la période d'essai.",
    },
    {
      question: "Quelle durée de confidentialité choisir ?",
      answer:
        "Cinq ans couvrent la majorité des situations commerciales. Dix ans se justifient pour des secrets industriels, des innovations brevetables ou des informations patrimoniales. Au-delà, le juge requalifie souvent la clause en durée raisonnable.",
    },
    {
      question: "La clause pénale est-elle obligatoire ?",
      answer:
        "Non. Elle est optionnelle mais utile : elle fixe d'avance le montant dû en cas de violation, évitant d'avoir à démontrer le préjudice. Attention : un montant disproportionné peut être réduit par le juge (art. 1231-5 C. civ.).",
    },
    {
      question: "Un NDA signé par email suffit-il ?",
      answer:
        "Oui, à condition que les deux parties aient manifestement consenti. La signature électronique (DocuSign, Yousign, certificat eIDAS) est préférable pour sécuriser la preuve. Un simple échange d'emails « accepté » peut suffire mais expose à des contestations.",
    },
    {
      question: "Un NDA protège-t-il contre le vol d'idées ?",
      answer:
        "Il protège contre la divulgation et l'usage non autorisé d'informations précises et identifiables. Il ne protège pas une idée générale non concrétisée. Pour sécuriser une innovation, combinez le NDA avec un dépôt (brevet, enveloppe Soleau, horodatage notarié).",
    },
    {
      question: "Quel droit et quelle juridiction choisir ?",
      answer:
        "Si les parties sont françaises, le droit français et le tribunal de commerce du siège du défendeur sont le choix par défaut. En contexte international, négociez le droit applicable et, le cas échéant, une clause compromissoire (arbitrage) pour éviter les contentieux longs à l'étranger.",
    },
  ],
  related: [
    "cgv-ecommerce",
    "cgu",
    "convocation-ag",
  ],
};
