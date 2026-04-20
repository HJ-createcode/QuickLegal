import type { FeuillePresenceAGData } from "@/lib/questionnaire-configs/feuille-presence-ag";

function numberFR(n: number | undefined | null): string {
  if (n == null || Number.isNaN(Number(n))) return "0";
  return Number(n).toLocaleString("fr-FR");
}

function typeAGLabel(t: FeuillePresenceAGData["type_ag"]): string {
  switch (t) {
    case "ordinaire":
      return "Ordinaire";
    case "extraordinaire":
      return "Extraordinaire";
    case "mixte":
      return "Mixte (Ordinaire et Extraordinaire)";
  }
}

function enTete(data: FeuillePresenceAGData): string {
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

export function generateFeuillePresenceAG(
  data: FeuillePresenceAGData
): string {
  const associeLabel =
    data.forme_juridique === "association" ? "membres" : "associés";
  const partsLabel =
    data.forme_juridique === "sas"
      ? "actions"
      : data.forme_juridique === "association"
        ? "voix"
        : "parts sociales";

  const lignes = (data.participants || "")
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  const lignesNumerotees =
    lignes.length > 0
      ? lignes.map((p, i) => `${i + 1}. ${p}`).join("\n\n")
      : "(à compléter)";

  return `${enTete(data)}


FEUILLE DE PRÉSENCE
ASSEMBLÉE GÉNÉRALE ${typeAGLabel(data.type_ag).toUpperCase()}
DU ${data.date_ag}${data.heure_ag ? ` À ${data.heure_ag.toUpperCase()}` : ""}


Tenue : ${data.lieu_ag}


La présente feuille de présence est établie aux fins de constater la participation des ${associeLabel} à l'assemblée générale ${typeAGLabel(data.type_ag).toLowerCase()} ${data.forme_juridique === "association" ? "de l'association" : `de la société ${data.denomination}`}, ainsi que le nombre total de ${partsLabel} représentées pour l'appréciation des règles de quorum et de majorité.


Nombre total de ${partsLabel} émises : ${numberFR(data.total_parts)}


PARTICIPANTS :

${lignesNumerotees}


Le président de séance certifie que la présente feuille de présence est exacte et que les ${associeLabel} y figurant ont bien été présents, représentés ou dûment excusés.

Elle est signée par chaque ${data.forme_juridique === "association" ? "membre présent" : "associé présent"} et par les mandataires des ${associeLabel} représentés. Elle est annexée au procès-verbal de l'assemblée.


Fait le ${data.date_ag}.


Le Président de séance,


${data.president_seance_nom}


(signature précédée de la mention « Certifié exact »)



---

SIGNATURES DES PARTICIPANTS :

${lignes.length > 0 ? lignes.map((p) => `${p.split("—")[0]?.trim() || p} : ____________________________________`).join("\n\n") : "(à compléter)"}`;
}
