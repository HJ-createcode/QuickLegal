import type { NDAData } from "@/lib/questionnaire-configs/nda";

function formatParty(
  nom: string,
  type: string,
  forme: string,
  siret: string,
  adresse: string,
  representant: string
): string {
  if (type === "societe") {
    const parts = [nom.toUpperCase()];
    if (forme) parts.push(forme);
    if (siret) parts.push(siret);
    parts.push(`dont le siège social est situé ${adresse}`);
    if (representant) parts.push(`représentée par ${representant}, dûment habilité(e)`);
    return parts.join(", ");
  }
  return `${nom}, demeurant ${adresse}`;
}

export function generateNDA(data: NDAData): string {
  const today = new Date();
  const dateStr = today.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  const isBilateral = data.type_nda === "bilateral";

  const partieA = formatParty(
    data.partie_a_nom,
    data.partie_a_type,
    data.partie_a_forme,
    data.partie_a_siret,
    data.partie_a_adresse,
    data.partie_a_representant
  );

  const partieB = formatParty(
    data.partie_b_nom,
    data.partie_b_type,
    data.partie_b_forme,
    data.partie_b_siret,
    data.partie_b_adresse,
    data.partie_b_representant
  );

  const emetteurLabel = isBilateral ? "Partie divulgatrice" : "l'Émetteur";
  const recepteurLabel = isBilateral ? "Partie réceptrice" : "le Récepteur";

  let content = `ACCORD DE CONFIDENTIALITÉ

${isBilateral ? "(RÉCIPROQUE)" : "(UNILATÉRAL)"}



ENTRE LES SOUSSIGNÉS :

${partieA},

ci-après dénommée « ${isBilateral ? "Partie A" : "l'Émetteur"} »,

D'UNE PART,


ET :

${partieB},

ci-après dénommée « ${isBilateral ? "Partie B" : "le Récepteur"} »,

D'AUTRE PART,


${isBilateral ? "Ensemble ci-après dénommées « les Parties », et individuellement « une Partie »." : "Ci-après dénommés ensemble « les Parties »."}



PRÉAMBULE

${data.contexte}

Dans le cadre de ces échanges, ${isBilateral ? "les Parties seront amenées à se communiquer mutuellement" : "l'Émetteur sera amené à communiquer au Récepteur"} des informations confidentielles dont la divulgation ou l'utilisation non autorisée causerait un préjudice.

Il a donc été convenu ce qui suit.


ARTICLE 1 - OBJET

Le présent accord a pour objet de définir les conditions dans lesquelles les Parties s'engagent à préserver la confidentialité des informations qui leur seront transmises dans le cadre du contexte exposé en préambule.


ARTICLE 2 - DÉFINITION DES INFORMATIONS CONFIDENTIELLES

Constituent des « Informations Confidentielles » au sens du présent accord :

${data.nature_informations}.

Les Informations Confidentielles peuvent être transmises sous toute forme : orale, écrite, électronique, visuelle, ou sur tout autre support, qu'elles soient ou non marquées comme « confidentielles ».


ARTICLE 3 - EXCLUSIONS

Ne sont pas considérées comme des Informations Confidentielles les informations pour lesquelles ${recepteurLabel} peut établir par des éléments de preuve :

- qu'elles étaient licitement en sa possession avant leur divulgation par ${emetteurLabel} ;
- qu'elles étaient ou sont tombées dans le domaine public sans faute ni manquement imputable au ${recepteurLabel} ;
- qu'elles ont été reçues de manière licite d'un tiers non tenu par une obligation de confidentialité ;
- qu'elles ont été développées de manière indépendante par ses propres salariés ou collaborateurs, sans accès aux Informations Confidentielles ;
- qu'elles doivent être divulguées en vertu d'une obligation légale ou réglementaire, d'une décision de justice ou d'une demande émanant d'une autorité compétente, à condition que ${recepteurLabel} en informe préalablement ${emetteurLabel} dans les meilleurs délais, sauf interdiction légale.


ARTICLE 4 - ENGAGEMENTS ${isBilateral ? "DES PARTIES" : "DU RÉCEPTEUR"}

${isBilateral ? "Chacune des Parties s'engage, au titre des Informations Confidentielles reçues de l'autre Partie" : "Le Récepteur s'engage"} à :

- traiter les Informations Confidentielles avec le même degré de soin que celui qu'${isBilateral ? "elle apporterait" : "il apporterait"} à ses propres informations confidentielles de même nature, sans que ce degré de soin ne puisse être inférieur à celui d'une personne raisonnablement prudente et diligente ;

- ne pas divulguer les Informations Confidentielles, en tout ou en partie, à quelque tiers que ce soit, sans l'accord écrit et préalable de ${emetteurLabel} ;

- ne communiquer les Informations Confidentielles qu'à ceux de ses salariés, dirigeants, conseils ou sous-traitants qui ont strictement besoin d'en connaître pour les finalités décrites en préambule, et à la condition qu'ils soient soumis à une obligation de confidentialité au moins équivalente à celle du présent accord ;

- n'utiliser les Informations Confidentielles que pour les finalités prévues en préambule, à l'exclusion de toute autre finalité, notamment commerciale ou concurrentielle, directe ou indirecte ;

- ne reproduire ou copier les Informations Confidentielles que dans la stricte mesure nécessaire aux finalités de l'accord ;

- mettre en œuvre toutes mesures techniques et organisationnelles raisonnables pour assurer la sécurité et la confidentialité des Informations Confidentielles.


ARTICLE 5 - PROPRIÉTÉ

Les Informations Confidentielles restent la propriété exclusive de ${isBilateral ? "la Partie les ayant divulguées" : "l'Émetteur"}. Le présent accord ne confère au ${recepteurLabel} aucun droit de propriété intellectuelle sur les Informations Confidentielles, ni aucune licence d'exploitation.

Aucune obligation de conclure un accord ultérieur ne résulte du présent accord.


ARTICLE 6 - DURÉE

Le présent accord prend effet à compter de sa date de signature et demeure en vigueur pendant toute la durée des échanges entre les Parties.

L'obligation de confidentialité se poursuit pendant une durée de ${data.duree_confidentialite} (${data.duree_confidentialite === 3 ? "trois" : data.duree_confidentialite === 5 ? "cinq" : data.duree_confidentialite === 7 ? "sept" : data.duree_confidentialite}) années à compter de la cessation des échanges entre les Parties, quelle qu'en soit la cause.


ARTICLE 7 - RESTITUTION OU DESTRUCTION

À la cessation des échanges ou sur simple demande écrite de ${emetteurLabel}, ${recepteurLabel} s'engage à restituer ou à détruire, au choix de ${emetteurLabel}, l'ensemble des Informations Confidentielles en sa possession, ainsi que toutes copies, reproductions ou résumés qui en auraient été faits, sur quelque support que ce soit.

${recepteurLabel} fournira une attestation écrite certifiant cette restitution ou cette destruction.


ARTICLE 8 - SANCTIONS EN CAS DE VIOLATION

Toute violation du présent accord ouvre droit, pour la Partie lésée, à réparation intégrale du préjudice subi, sans préjudice de toute autre action ou recours.

${
  data.penalites
    ? `\nÀ titre de clause pénale et sans préjudice de l'évaluation du préjudice réel, tout manquement avéré aux obligations du présent accord ouvrira droit au paiement d'une indemnité forfaitaire minimale de ${Number(data.penalites).toLocaleString("fr-FR")} euros par violation constatée. Cette indemnité pourra être majorée pour atteindre le montant du préjudice effectivement subi.\n`
    : ""
}

${emetteurLabel.charAt(0).toUpperCase() + emetteurLabel.slice(1)} pourra en outre solliciter en référé toute mesure d'interdiction, de cessation ou de conservation nécessaire à la préservation de ses droits.


${
  data.contient_donnees_personnelles
    ? `ARTICLE 9 - PROTECTION DES DONNÉES PERSONNELLES

Dans l'hypothèse où les Informations Confidentielles échangées contiendraient des données à caractère personnel au sens du Règlement (UE) 2016/679 (« RGPD »), les Parties s'engagent à respecter l'ensemble des obligations qui leur incombent à ce titre.

Chaque Partie agit, pour ce qui la concerne, en qualité de responsable de traitement autonome. Les Parties mettent en œuvre les mesures techniques et organisationnelles appropriées pour garantir un niveau de sécurité adapté au risque, notamment en matière de confidentialité, d'intégrité et de disponibilité des données.

Les Parties s'engagent à :
- limiter l'accès aux données aux seules personnes ayant strictement besoin d'en connaître ;
- informer leurs personnels autorisés de leurs obligations de confidentialité ;
- notifier à l'autre Partie, sans délai, toute violation de données susceptible d'affecter les informations échangées ;
- coopérer, le cas échéant, dans la réponse aux demandes d'exercice de droits des personnes concernées et aux demandes des autorités de contrôle.

Chaque Partie demeure seule responsable de ses obligations d'information et de recueil du consentement des personnes concernées, le cas échéant.


ARTICLE 10`
    : "ARTICLE 9"
} - INVALIDITÉ PARTIELLE

Si l'une des stipulations du présent accord venait à être déclarée nulle ou inapplicable, les autres stipulations conserveront leur plein effet. Les Parties s'efforceront de remplacer la clause invalide par une clause valide produisant un effet économique et juridique équivalent.


${data.contient_donnees_personnelles ? "ARTICLE 11" : "ARTICLE 10"} - INTÉGRALITÉ DE L'ACCORD

Le présent accord constitue l'intégralité des engagements des Parties relativement à son objet. Il annule et remplace tous accords antérieurs, écrits ou oraux, portant sur le même objet.

Toute modification devra faire l'objet d'un avenant écrit signé par les Parties.


${data.contient_donnees_personnelles ? "ARTICLE 12" : "ARTICLE 11"} - DROIT APPLICABLE - JURIDICTION

Le présent accord est soumis au droit français.

Tout différend relatif à son interprétation, son exécution ou sa cessation sera, à défaut de résolution amiable, soumis à la compétence exclusive du Tribunal compétent de ${data.tribunal_competent}, nonobstant pluralité de défendeurs ou appel en garantie.



Fait en deux (2) exemplaires originaux, un pour chaque Partie.
Le ${dateStr}.




Pour ${isBilateral ? "la Partie A" : "l'Émetteur"}                           Pour ${isBilateral ? "la Partie B" : "le Récepteur"}

${data.partie_a_nom}                          ${data.partie_b_nom}
${data.partie_a_representant || "_______________"}                          ${data.partie_b_representant || "_______________"}

(signature précédée de la mention « Lu et approuvé »)     (signature précédée de la mention « Lu et approuvé »)


`;

  return content;
}
