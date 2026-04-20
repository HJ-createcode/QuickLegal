import type { PVAGOrdinaireData } from "@/lib/questionnaire-configs/pv-ag-ordinaire";

interface Terminology {
  associe: string;
  associesPluriel: string;
  titreCollectif: string;
  actions: string;
  dirigeant: string;
  dirigeantPluriel: string;
}

function getTerminology(forme: PVAGOrdinaireData["forme_juridique"]): Terminology {
  switch (forme) {
    case "sas":
      return {
        associe: "actionnaire",
        associesPluriel: "actionnaires",
        titreCollectif: "collectivité des associés",
        actions: "actions",
        dirigeant: "Président",
        dirigeantPluriel: "dirigeants",
      };
    case "sarl":
      return {
        associe: "associé",
        associesPluriel: "associés",
        titreCollectif: "assemblée des associés",
        actions: "parts sociales",
        dirigeant: "Gérant",
        dirigeantPluriel: "gérants",
      };
    case "sci":
    case "snc":
      return {
        associe: "associé",
        associesPluriel: "associés",
        titreCollectif: "assemblée des associés",
        actions: "parts sociales",
        dirigeant: "Gérant",
        dirigeantPluriel: "gérants",
      };
    case "association":
      return {
        associe: "membre",
        associesPluriel: "membres",
        titreCollectif: "assemblée générale",
        actions: "voix",
        dirigeant: "Président",
        dirigeantPluriel: "membres du bureau",
      };
  }
}

function enTete(data: PVAGOrdinaireData): string {
  const lines = [data.denomination];
  if (data.forme_juridique !== "association") {
    const forme = data.forme_juridique.toUpperCase();
    const cap = data.capital_social
      ? `${forme} au capital de ${Number(data.capital_social).toLocaleString("fr-FR")} €`
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

function numberFR(n: number | undefined | null): string {
  if (n == null || Number.isNaN(Number(n))) return "0";
  return Number(n).toLocaleString("fr-FR");
}

export function generatePVAGOrdinaire(data: PVAGOrdinaireData): string {
  const term = getTerminology(data.forme_juridique);
  const isAsso = data.forme_juridique === "association";
  const benefice = data.resultat_nature === "benefice";
  const resultatLabel = benefice ? "bénéfice" : "perte";
  const resultatSigne = benefice ? "+" : "-";

  // Compose affectation block
  const affectLines: string[] = [];
  if (data.dotation_reserve_legale) {
    affectLines.push(
      `- Dotation à la réserve légale : ${numberFR(data.dotation_reserve_legale)} €`
    );
  }
  if (data.dotation_reserve_facultative) {
    affectLines.push(
      `- Dotation à une réserve facultative ou statutaire : ${numberFR(data.dotation_reserve_facultative)} €`
    );
  }
  if (data.distribution_dividende) {
    affectLines.push(
      `- Distribution de dividendes aux ${term.associesPluriel} : ${numberFR(data.distribution_dividende)} €`
    );
  }
  if (data.report_a_nouveau) {
    affectLines.push(
      `- Report à nouveau : ${resultatSigne === "-" ? "-" : ""}${numberFR(data.report_a_nouveau)} €`
    );
  }
  const affectationBlock =
    affectLines.length > 0
      ? affectLines.join("\n")
      : "- Intégralité du résultat affectée en report à nouveau";

  // Compose other resolutions
  const autres = (data.autres_resolutions || "")
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  let resNum = 2;
  const resolutionsExtras: string[] = [];

  if (data.quitus_dirigeants) {
    resNum++;
    resolutionsExtras.push(
      `TROISIÈME RÉSOLUTION - Quitus aux dirigeants

La ${term.titreCollectif} donne quitus entier et sans réserve ${
        data.nom_dirigeant_quitus
          ? `à ${data.nom_dirigeant_quitus}`
          : `au${term.dirigeant.endsWith("s") ? "x" : ""} ${term.dirigeant}${
              term.dirigeant.endsWith("s") ? "" : ""
            }`
      } pour l'exécution de son mandat au titre de l'exercice clos le ${data.date_cloture_exercice}.

Cette résolution, mise aux voix, est adoptée.`
    );
  }

  if (data.renouvelle_cac && data.nom_cac) {
    const num = resolutionsExtras.length + 3;
    const numLabel = num === 3 ? "TROISIÈME" : num === 4 ? "QUATRIÈME" : num === 5 ? "CINQUIÈME" : `${num}ÈME`;
    resolutionsExtras.push(
      `${numLabel} RÉSOLUTION - Renouvellement du commissaire aux comptes

La ${term.titreCollectif} décide de renouveler le mandat de ${data.nom_cac} en qualité de commissaire aux comptes, pour une nouvelle durée de six (6) exercices, soit jusqu'à l'assemblée appelée à statuer sur les comptes du sixième exercice à venir.

Cette résolution, mise aux voix, est adoptée.`
    );
  }

  autres.forEach((res, idx) => {
    const num = resolutionsExtras.length + 3 + idx;
    const numLabel =
      num === 3
        ? "TROISIÈME"
        : num === 4
          ? "QUATRIÈME"
          : num === 5
            ? "CINQUIÈME"
            : num === 6
              ? "SIXIÈME"
              : num === 7
                ? "SEPTIÈME"
                : `${num}ÈME`;
    resolutionsExtras.push(
      `${numLabel} RÉSOLUTION

${res}

Cette résolution, mise aux voix, est adoptée.`
    );
  });

  void resNum; // reserved for later numbering audit

  return `${enTete(data)}


PROCÈS-VERBAL DE L'ASSEMBLÉE GÉNÉRALE ORDINAIRE
EN DATE DU ${data.date_assemblee}


L'an deux mille ${
    data.date_assemblee.split("/")[2]?.slice(2) || "…"
  }, le ${data.date_assemblee}${data.heure_assemblee ? `, à ${data.heure_assemblee}` : ""},

${isAsso ? "les membres" : `les ${term.associesPluriel}`} de ${isAsso ? "l'association" : `la société ${data.denomination}`} se sont réunis en assemblée générale ordinaire ${data.lieu_assemblee}, sur convocation régulièrement adressée par ${
    isAsso ? "le Président" : `le${term.dirigeant === "Gérant" ? "" : ""} ${term.dirigeant}`
  }, conformément ${isAsso ? "aux statuts de l'association" : "aux dispositions légales et statutaires"}.


BUREAU DE L'ASSEMBLÉE

L'assemblée est présidée par ${data.president_seance_nom}, ${data.president_seance_qualite}.
${
  data.secretaire_seance_nom
    ? `\nMonsieur / Madame ${data.secretaire_seance_nom} est désigné(e) comme secrétaire de séance.`
    : ""
}


COMPOSITION DE L'ASSEMBLÉE

${
  isAsso
    ? `Sont présents ou représentés les membres de l'association ci-après :`
    : `Sont présents ou représentés les ${term.associesPluriel} ci-après, détenteurs ensemble de ${numberFR(data.total_parts)} ${term.actions} sur ${numberFR(data.total_parts)} composant le capital social :`
}

${data.participants_description}

${
  isAsso
    ? "Le Président constate que le quorum statutaire est atteint et que l'assemblée peut valablement délibérer."
    : `Le Président constate que l'assemblée, réunissant ${
        data.forme_juridique === "sarl"
          ? "plus de la moitié des parts sociales sur première convocation (art. L.223-29 C. com.)"
          : data.forme_juridique === "sas"
            ? "les conditions de quorum fixées par les statuts"
            : "les conditions de quorum statutaires"
      }, peut valablement délibérer.`
}


DOCUMENTS COMMUNIQUÉS ET RAPPELÉS

Le Président dépose sur le bureau et met à la disposition de l'assemblée :

- les comptes annuels de l'exercice clos le ${data.date_cloture_exercice} (bilan, compte de résultat, annexe) ;
- le rapport de gestion${
    isAsso ? " ou rapport moral du Président" : " établi par la direction"
  } ;
- le texte des résolutions proposées ;
- la feuille de présence et les pouvoirs.


ORDRE DU JOUR

Il est rappelé à l'assemblée l'ordre du jour :

1. Approbation des comptes de l'exercice clos le ${data.date_cloture_exercice}
2. Affectation du résultat
${data.quitus_dirigeants ? `3. Quitus ${term.dirigeantPluriel}` : ""}
${data.renouvelle_cac ? `${data.quitus_dirigeants ? "4" : "3"}. Renouvellement du commissaire aux comptes` : ""}
${autres.length > 0 ? `${(data.quitus_dirigeants ? 3 : 2) + (data.renouvelle_cac ? 1 : 0) + 1}. Autres résolutions` : ""}
Questions diverses et pouvoirs pour formalités.


Après lecture des rapports et après discussion, l'assemblée adopte successivement les résolutions suivantes :



PREMIÈRE RÉSOLUTION - Approbation des comptes de l'exercice

${isAsso ? "L'" : "La "}${term.titreCollectif}, après avoir pris connaissance des comptes annuels et du rapport${
    isAsso ? " moral et financier" : " de gestion"
  } relatifs à l'exercice clos le ${data.date_cloture_exercice}, approuve lesdits comptes tels qu'ils ont été présentés, ainsi que les opérations qu'ils traduisent, se soldant par un ${resultatLabel} de ${numberFR(data.resultat_montant)} €.

En conséquence, ${isAsso ? "l'" : "la "}${term.titreCollectif} donne acte ${
    isAsso ? "au Président" : `au${term.dirigeant === "Gérant" ? "" : ""} ${term.dirigeant}`
  } de la sincérité et de la régularité des comptes présentés.

Cette résolution, mise aux voix, est adoptée.


DEUXIÈME RÉSOLUTION - Affectation du résultat

${isAsso ? "L'" : "La "}${term.titreCollectif} décide d'affecter le ${resultatLabel} de l'exercice, soit ${resultatSigne}${numberFR(data.resultat_montant)} €, de la manière suivante :

${affectationBlock}

Cette résolution, mise aux voix, est adoptée.

${resolutionsExtras.map((r) => `\n${r}\n`).join("")}


POUVOIRS POUR FORMALITÉS

${isAsso ? "L'" : "La "}${term.titreCollectif} confère tous pouvoirs au porteur d'un original, d'une copie ou d'un extrait du présent procès-verbal pour effectuer toutes formalités de dépôt, publication et, plus généralement, toutes formalités légales.

Cette résolution, mise aux voix, est adoptée.


Plus rien n'étant à l'ordre du jour, la séance est levée${data.heure_assemblee ? "" : ""}.

Le présent procès-verbal a été établi et signé par les membres du bureau.



Le Président de séance,                                  ${data.secretaire_seance_nom ? "Le Secrétaire de séance," : ""}


${data.president_seance_nom}                                                  ${data.secretaire_seance_nom || ""}


(signature précédée de la mention « Lu et approuvé »)`;
}
