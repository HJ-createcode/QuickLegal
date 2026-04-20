import type { OrdreDuJourAGData } from "@/lib/questionnaire-configs/ordre-du-jour-ag";

function typeAGLabel(t: OrdreDuJourAGData["type_ag"]): string {
  switch (t) {
    case "ordinaire":
      return "Ordinaire";
    case "extraordinaire":
      return "Extraordinaire";
    case "mixte":
      return "Mixte (Ordinaire et Extraordinaire)";
  }
}

export function generateOrdreDuJourAG(data: OrdreDuJourAGData): string {
  const lignes = (data.points || "")
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  const points =
    lignes.length > 0
      ? lignes.map((p, i) => `${i + 1}. ${p}`).join("\n")
      : "(à compléter)";

  const siren = data.siren ? `SIREN : ${data.siren}` : "";
  const header =
    data.forme_juridique === "association"
      ? "Association régie par la loi du 1er juillet 1901"
      : data.forme_juridique.toUpperCase();
  const siege = `Siège social : ${data.siege_social}`;

  const ouAQuand =
    data.heure_ag && data.lieu_ag
      ? `qui se tiendra le ${data.date_ag} à ${data.heure_ag}, ${data.lieu_ag}`
      : data.heure_ag
        ? `qui se tiendra le ${data.date_ag} à ${data.heure_ag}`
        : data.lieu_ag
          ? `qui se tiendra le ${data.date_ag}, ${data.lieu_ag}`
          : `qui se tiendra le ${data.date_ag}`;

  return `${data.denomination}
${header}
${siege}
${siren}


ORDRE DU JOUR
DE L'ASSEMBLÉE GÉNÉRALE ${typeAGLabel(data.type_ag).toUpperCase()}
DU ${data.date_ag}


Le présent ordre du jour est établi par ${data.etabli_par_nom}, ${data.etabli_par_qualite}, en vue de l'assemblée générale ${typeAGLabel(data.type_ag).toLowerCase()} ${data.forme_juridique === "association" ? "de l'association" : `de la société ${data.denomination}`} ${ouAQuand}.


Les ${data.forme_juridique === "association" ? "membres" : "associés"} seront appelés à délibérer sur les points suivants :


${points}

Questions diverses et pouvoirs pour formalités de dépôt et de publication.


Il est rappelé que, conformément ${data.forme_juridique === "sarl" ? "à l'article L.223-27 du Code de commerce" : "aux statuts et à la loi"}, l'assemblée ne peut délibérer que sur les points portés au présent ordre du jour, sauf question ayant le caractère d'une simple question diverse et n'ayant aucune incidence sur la gestion ou la marche sociale.

${data.forme_juridique !== "association" ? `\nLes ${data.forme_juridique === "sarl" ? "associés" : "associés et actionnaires"} peuvent, dans les conditions fixées par la loi et les statuts, demander l'inscription de projets de résolutions complémentaires à l'ordre du jour avant la tenue de l'assemblée.\n` : ""}

Fait à ${data.lieu_signature}, le ${data.date_signature}.



${data.etabli_par_nom}
${data.etabli_par_qualite}


(signature)`;
}
