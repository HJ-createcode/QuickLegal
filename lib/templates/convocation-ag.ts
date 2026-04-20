import type { ConvocationAGData } from "@/lib/questionnaire-configs/convocation-ag";

function numberFR(n: number | undefined | null): string {
  if (n == null || Number.isNaN(Number(n))) return "0";
  return Number(n).toLocaleString("fr-FR");
}

function typeAGLabel(t: ConvocationAGData["type_ag"]): string {
  switch (t) {
    case "ordinaire":
      return "Ordinaire";
    case "extraordinaire":
      return "Extraordinaire";
    case "mixte":
      return "Mixte (Ordinaire et Extraordinaire)";
  }
}

function modeEnvoiLabel(m: ConvocationAGData["mode_envoi"]): string {
  switch (m) {
    case "lrar":
      return "lettre recommandée avec accusé de réception";
    case "email":
      return "courrier électronique";
    case "remise_en_mains_propres":
      return "remise en mains propres contre décharge";
  }
}

function enTete(data: ConvocationAGData): string {
  const lines = [data.denomination];
  if (data.forme_juridique !== "association") {
    const forme = data.forme_juridique.toUpperCase();
    const cap = data.capital_social
      ? `${forme} au capital de ${numberFR(data.capital_social)} €`
      : forme;
    lines.push(cap);
  } else {
    lines.push("Association régie par la loi du 1er juillet 1901");
  }
  lines.push(`Siège social : ${data.siege_social}`);
  if (data.siren) {
    const rcs = data.rcs_ville ? `RCS ${data.rcs_ville} ` : "";
    lines.push(`${rcs}${data.siren}`);
  }
  return lines.join("\n");
}

export function generateConvocationAG(data: ConvocationAGData): string {
  const appellation =
    data.forme_juridique === "association" ? "Cher Membre" : "Cher Associé";

  const pointsOdj = (data.ordre_du_jour || "")
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);
  const ordreDuJourBlock =
    pointsOdj.length > 0
      ? pointsOdj.map((p, i) => `${i + 1}. ${p}`).join("\n")
      : "(à compléter)";

  const documentsJoints = (data.documents_joints || "")
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  return `${enTete(data)}


Envoyé par ${modeEnvoiLabel(data.mode_envoi)}

À : ${data.destinataire_nom}
Adresse : ${data.destinataire_adresse}


${data.lieu_signature}, le ${data.date_envoi}


Objet : Convocation à l'Assemblée Générale ${typeAGLabel(data.type_ag)} du ${data.date_ag}


${appellation},

J'ai l'honneur de vous convoquer à l'Assemblée Générale ${typeAGLabel(data.type_ag)} ${data.forme_juridique === "association" ? "de l'association" : `de la société ${data.denomination}`}, qui se tiendra le :


${data.date_ag} à ${data.heure_ag}

${data.lieu_ag}


Cette assemblée délibérera sur l'ordre du jour suivant :


${ordreDuJourBlock}

Questions diverses.


${
  documentsJoints.length > 0
    ? `Conformément aux dispositions légales et statutaires, vous trouverez ${data.mode_envoi === "email" ? "en pièce jointe" : "joints à la présente"} les documents suivants, qui seront examinés lors de l'assemblée :

${documentsJoints.map((d) => `- ${d}`).join("\n")}

`
    : ""
}Si vous ne pouviez assister personnellement à cette assemblée, vous pouvez vous y faire représenter par toute personne de votre choix dans les conditions prévues ${data.forme_juridique === "association" ? "par les statuts de l'association" : data.forme_juridique === "sarl" ? "par l'article L.223-28 du Code de commerce" : "par les statuts"}. Un pouvoir en blanc peut vous être adressé sur simple demande.

Je vous prie d'agréer, ${appellation}, l'expression de mes salutations distinguées.



${data.expediteur_nom}
${data.expediteur_qualite}${data.forme_juridique === "association" ? " de l'association" : ` de ${data.denomination}`}


(signature)`;
}
