import type { PVAGExtraordinaireData } from "@/lib/questionnaire-configs/pv-ag-extraordinaire";

interface Terminology {
  associesPluriel: string;
  titreCollectif: string;
  actions: string;
  dirigeant: string;
}

function getTerminology(
  forme: PVAGExtraordinaireData["forme_juridique"]
): Terminology {
  switch (forme) {
    case "sas":
      return {
        associesPluriel: "associés",
        titreCollectif: "collectivité des associés",
        actions: "actions",
        dirigeant: "Président",
      };
    case "sarl":
      return {
        associesPluriel: "associés",
        titreCollectif: "assemblée des associés",
        actions: "parts sociales",
        dirigeant: "Gérant",
      };
    case "sci":
    case "snc":
      return {
        associesPluriel: "associés",
        titreCollectif: "assemblée des associés",
        actions: "parts sociales",
        dirigeant: "Gérant",
      };
    case "association":
      return {
        associesPluriel: "membres",
        titreCollectif: "assemblée générale",
        actions: "voix",
        dirigeant: "Président",
      };
  }
}

function numberFR(n: number | undefined | null): string {
  if (n == null || Number.isNaN(Number(n))) return "0";
  return Number(n).toLocaleString("fr-FR");
}

function majoriteAGE(
  forme: PVAGExtraordinaireData["forme_juridique"]
): string {
  switch (forme) {
    case "sarl":
      return "à la majorité des trois-quarts des parts sociales pour les sociétés constituées avant le 3 août 2005, ou à la majorité des deux-tiers des parts détenues par les associés présents ou représentés, sur première convocation représentant au moins le quart des parts, sur deuxième convocation au moins le cinquième (art. L.223-30 C. com.)";
    case "sas":
      return "dans les conditions de quorum et de majorité fixées par les statuts (art. L.227-9 C. com.)";
    case "sci":
      return "à l'unanimité des associés sauf clause statutaire contraire (art. 1836 C. civ.)";
    case "snc":
      return "à l'unanimité des associés (art. L.221-6 C. com.)";
    case "association":
      return "dans les conditions de quorum et de majorité fixées par les statuts";
  }
}

function resolutionObjet(data: PVAGExtraordinaireData, term: Terminology): string {
  switch (data.objet_decision) {
    case "transfert_siege":
      return `${term.titreCollectif === "assemblée générale" ? "L'" : "La "}${term.titreCollectif} décide de transférer le siège social de la ${data.forme_juridique.toUpperCase()} ${data.denomination} de son adresse actuelle, ${data.siege_social}, à la nouvelle adresse suivante :

${data.nouveau_siege || "………………………………………………"}

Le siège sera effectif à cette nouvelle adresse à compter de ce jour.

En conséquence, l'article des statuts relatif au siège social est modifié en ce sens. Le reste des statuts demeure inchangé.`;
    case "changement_denomination":
      return `${term.titreCollectif === "assemblée générale" ? "L'" : "La "}${term.titreCollectif} décide d'adopter, à compter de ce jour, la nouvelle dénomination sociale suivante :

${data.nouvelle_denomination || "………………………………………………"}

En conséquence, l'article des statuts relatif à la dénomination sociale est modifié en ce sens. Le reste des statuts demeure inchangé.`;
    case "changement_objet_social":
      return `${term.titreCollectif === "assemblée générale" ? "L'" : "La "}${term.titreCollectif} décide de modifier l'objet social de la société, qui sera désormais libellé comme suit :

${data.nouvel_objet_social || "………………………………………………"}

En conséquence, l'article des statuts relatif à l'objet social est modifié en ce sens. Le reste des statuts demeure inchangé.`;
    case "augmentation_capital":
      return `${term.titreCollectif === "assemblée générale" ? "L'" : "La "}${term.titreCollectif} décide de procéder à une augmentation de capital de ${numberFR(data.montant_augmentation)} €, portant ainsi le capital social de ${numberFR(data.capital_social)} € à ${numberFR((data.capital_social || 0) + (data.montant_augmentation || 0))} €.

Modalités de l'augmentation :

${data.modalites_augmentation || "………………………………………………"}

En conséquence, l'article des statuts relatif au capital est modifié pour refléter le nouveau montant. Tous pouvoirs sont donnés au ${term.dirigeant} pour constater la réalisation de l'augmentation de capital et procéder à la modification corrélative des statuts.`;
    case "reduction_capital":
      return `${term.titreCollectif === "assemblée générale" ? "L'" : "La "}${term.titreCollectif} décide de procéder à une réduction de capital de ${numberFR(data.montant_reduction)} €, ramenant ainsi le capital social de ${numberFR(data.capital_social)} € à ${numberFR(Math.max(0, (data.capital_social || 0) - (data.montant_reduction || 0)))} €.

Motif et modalités :

${data.motif_reduction || "………………………………………………"}

En conséquence, l'article des statuts relatif au capital est modifié pour refléter le nouveau montant. Tous pouvoirs sont donnés au ${term.dirigeant} pour accomplir les formalités de publicité légale et de dépôt au greffe.`;
    case "transformation":
      return `${term.titreCollectif === "assemblée générale" ? "L'" : "La "}${term.titreCollectif} décide de transformer la société en ${data.nouvelle_forme || "………………………"}, sans création d'un être moral nouveau, à compter de ce jour.

Les droits et obligations contractuels, fiscaux et sociaux de la société sont maintenus sous sa nouvelle forme. La personnalité morale et le patrimoine social subsistent.

Les nouveaux statuts, adaptés à la forme ${data.nouvelle_forme || "………"}, sont adoptés par l'assemblée et annexés au présent procès-verbal. Tous pouvoirs sont donnés au représentant légal pour accomplir l'ensemble des formalités.`;
    case "dissolution_anticipee":
      return `${term.titreCollectif === "assemblée générale" ? "L'" : "La "}${term.titreCollectif} décide la dissolution anticipée de la société à compter de ce jour et sa mise en liquidation amiable.

Motif invoqué : ${data.motif_dissolution || "………………………………………………"}

La société subsiste pour les besoins de la liquidation jusqu'à la clôture de celle-ci. La dénomination sociale sera suivie de la mention « en liquidation ».

Est nommé(e) liquidateur(trice) : ${data.nom_liquidateur || "………………………"}, investi(e) des pouvoirs les plus étendus pour réaliser l'actif, apurer le passif et répartir le solde éventuel entre les ${term.associesPluriel}, conformément aux articles L.237-1 et suivants du Code de commerce.

Le siège de la liquidation est fixé à : ${data.adresse_liquidation || data.siege_social}.

Tous pouvoirs sont donnés au liquidateur pour procéder aux formalités légales de dépôt au greffe et de publication.`;
    case "nomination_dirigeant":
      return `${term.titreCollectif === "assemblée générale" ? "L'" : "La "}${term.titreCollectif} décide de nommer, à compter de ce jour, ${data.nouveau_dirigeant_nom || "………………………"} en qualité de ${data.nouveau_dirigeant_qualite || term.dirigeant}.

${data.nouveau_dirigeant_nom ? `Monsieur / Madame ${data.nouveau_dirigeant_nom}` : "La personne nommée"} déclare accepter ces fonctions et satisfaire à l'ensemble des conditions requises par la loi et les statuts pour les exercer. ${data.nouveau_dirigeant_nom ? `Il / elle a justifié ne pas faire l'objet d'une mesure d'interdiction d'exercer les fonctions de dirigeant.` : ""}

Le nouveau dirigeant dispose des pouvoirs les plus étendus pour agir au nom de la société, dans la limite de l'objet social et sous réserve des pouvoirs réservés par la loi ou les statuts aux ${term.associesPluriel}.`;
    case "revocation_dirigeant":
      return `${term.titreCollectif === "assemblée générale" ? "L'" : "La "}${term.titreCollectif} décide la révocation de ${data.dirigeant_revoque_nom || "………………………"} de ses fonctions, à compter de ce jour.

Motif de la révocation : ${data.motif_revocation || "………………………………………………"}

La présente révocation prend effet immédiatement. Les formalités de dépôt au greffe et d'inscription modificative au RCS seront accomplies sans délai.`;
    case "autre":
      return (
        data.description_autre_decision ||
        "………………………………………………………………………………"
      );
    case "modification_statuts":
    default:
      return `${term.titreCollectif === "assemblée générale" ? "L'" : "La "}${term.titreCollectif} décide de modifier les statuts de la société. Le texte adopté figure en annexe du présent procès-verbal.

En conséquence, les statuts modifiés remplacent, à compter de ce jour, la version antérieure.`;
  }
}

function enTete(data: PVAGExtraordinaireData): string {
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

export function generatePVAGExtraordinaire(
  data: PVAGExtraordinaireData
): string {
  const term = getTerminology(data.forme_juridique);
  const isAsso = data.forme_juridique === "association";
  const annee =
    data.date_assemblee.split("/")[2]?.slice(2) || "……";

  const resolutionPrincipale = resolutionObjet(data, term);

  const autres = (data.autres_resolutions || "")
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);
  const autresRes = autres
    .map((res, idx) => {
      const num = idx + 2;
      const label =
        num === 2
          ? "DEUXIÈME"
          : num === 3
            ? "TROISIÈME"
            : num === 4
              ? "QUATRIÈME"
              : num === 5
                ? "CINQUIÈME"
                : `${num}ÈME`;
      return `${label} RÉSOLUTION

${res}

Cette résolution, mise aux voix, est adoptée.`;
    })
    .join("\n\n\n");

  return `${enTete(data)}


PROCÈS-VERBAL DE L'ASSEMBLÉE GÉNÉRALE EXTRAORDINAIRE
EN DATE DU ${data.date_assemblee}


L'an deux mille ${annee}, le ${data.date_assemblee}${data.heure_assemblee ? `, à ${data.heure_assemblee}` : ""},

${isAsso ? "les membres" : `les ${term.associesPluriel}`} de ${isAsso ? "l'association" : `la société ${data.denomination}`} se sont réunis en assemblée générale extraordinaire ${data.lieu_assemblee}, sur convocation régulièrement adressée par ${isAsso ? "le Président" : `le ${term.dirigeant}`}.


BUREAU DE L'ASSEMBLÉE

L'assemblée est présidée par ${data.president_seance_nom}, ${data.president_seance_qualite}.
${
  data.secretaire_seance_nom
    ? `\nMonsieur / Madame ${data.secretaire_seance_nom} est désigné(e) comme secrétaire de séance.`
    : ""
}


COMPOSITION DE L'ASSEMBLÉE ET QUORUM

${
  isAsso
    ? "Sont présents ou représentés les membres de l'association ci-après :"
    : `Sont présents ou représentés les ${term.associesPluriel} ci-après, détenteurs ensemble d'une partie des ${numberFR(data.total_parts)} ${term.actions} composant le capital social :`
}

${data.participants_description}

Le Président constate que les conditions de quorum applicables à une assemblée générale extraordinaire sont réunies. L'assemblée peut valablement délibérer ${majoriteAGE(data.forme_juridique)}.


ORDRE DU JOUR

Il est rappelé à l'assemblée l'ordre du jour :

1. Résolution principale relative à l'objet de l'assemblée
${autres.length > 0 ? autres.map((_, i) => `${i + 2}. Résolution complémentaire`).join("\n") + "\n" : ""}Pouvoirs pour formalités.


Après présentation par le Président des motifs et éléments nécessaires à la décision, et après discussion, l'assemblée adopte successivement les résolutions suivantes :



PREMIÈRE RÉSOLUTION

${resolutionPrincipale}

Cette résolution, mise aux voix, est adoptée ${majoriteAGE(data.forme_juridique)}.

${autresRes ? `\n\n${autresRes}\n\n` : ""}

POUVOIRS POUR FORMALITÉS

${isAsso ? "L'" : "La "}${term.titreCollectif} confère tous pouvoirs au porteur d'un original, d'une copie ou d'un extrait certifié conforme du présent procès-verbal pour effectuer l'ensemble des formalités de dépôt, d'inscription modificative au Registre du Commerce et des Sociétés, et de publication légale.

Cette résolution, mise aux voix, est adoptée.


Plus rien n'étant à l'ordre du jour, la séance est levée.

Le présent procès-verbal a été établi et signé par les membres du bureau.



Le Président de séance,                                  ${data.secretaire_seance_nom ? "Le Secrétaire de séance," : ""}


${data.president_seance_nom}                                                  ${data.secretaire_seance_nom || ""}


(signature précédée de la mention « Lu et approuvé »)`;
}
