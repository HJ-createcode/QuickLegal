import type { StatutsSCIData, SCIAssocieData } from "@/lib/questionnaire-configs/statuts-sci";

function formatAssocie(a: SCIAssocieData): string {
  return `${a.prenom} ${a.nom.toUpperCase()}, né(e) le ${a.date_naissance} à ${a.lieu_naissance}, de nationalité ${a.nationalite}, demeurant ${a.adresse}`;
}

function getGerant(data: StatutsSCIData): string {
  if (data.gerant_type === "cogerance") {
    return "Tous les associés sont cogérants de la Société.";
  }
  if (data.gerant_type === "associe") {
    const idx = (data.gerant_index || 1) - 1;
    const a = data.associes_list[idx];
    if (!a) return "[GÉRANT À DÉSIGNER]";
    return `${a.prenom} ${a.nom.toUpperCase()}, demeurant ${a.adresse}`;
  }
  return `${data.gerant_tiers_nom || "[NOM DU GÉRANT]"}, demeurant ${data.gerant_tiers_adresse || "[ADRESSE]"}`;
}

function extractCity(address: string): string {
  const parts = address.split(",");
  const last = parts[parts.length - 1]?.trim() || "";
  const cityMatch = last.match(/\d{5}\s+(.+)/);
  if (cityMatch) return cityMatch[1];
  return last || "[VILLE]";
}

export function generateStatutsSCI(data: StatutsSCIData): string {
  const nbParts = Math.floor(data.capital_montant / data.valeur_nominale);
  const today = new Date();
  const dateStr = today.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  const associesList = data.associes_list || [];
  const gerantStr = getGerant(data);

  let content = `STATUTS DE SOCIÉTÉ CIVILE IMMOBILIÈRE

${data.denomination.toUpperCase()}

Société Civile Immobilière
au capital de ${data.capital_montant.toLocaleString("fr-FR")} euros



LES SOUSSIGNÉS :

`;

  associesList.forEach((a, i) => {
    content += `${i + 1}. ${formatAssocie(a)}

`;
  });

  content += `Ont établi ainsi qu'il suit les statuts de la Société Civile Immobilière devant exister entre eux.


TITRE I - FORME - OBJET - DÉNOMINATION - SIÈGE - DURÉE

Article 1 - Forme

Il est constitué entre les soussignés une Société Civile Immobilière régie par les articles 1832 à 1870-1 du Code civil, par les dispositions législatives et réglementaires en vigueur, ainsi que par les présents statuts.


Article 2 - Objet social

La Société a pour objet, exclusivement civil :

${data.objet_social}

Et plus généralement, toutes opérations civiles, mobilières ou immobilières se rattachant directement ou indirectement à cet objet ou susceptibles d'en faciliter la réalisation, à la condition que ces opérations ne soient pas susceptibles de faire perdre à la Société son caractère civil.


Article 3 - Dénomination sociale

La dénomination de la Société est : ${data.denomination.toUpperCase()}

Dans tous les actes et documents émanant de la Société, la dénomination sociale sera précédée ou suivie immédiatement des mots « Société Civile Immobilière » ou des initiales « SCI », ainsi que du montant du capital social.


Article 4 - Siège social

Le siège social est fixé à l'adresse suivante :
${data.siege_social}

Il pourra être transféré par décision de la gérance, sous réserve de ratification par les associés réunis en assemblée générale.


Article 5 - Durée

La durée de la Société est fixée à ${data.duree} années à compter de son immatriculation au Registre du Commerce et des Sociétés, sauf dissolution anticipée ou prorogation.


TITRE II - APPORTS - CAPITAL SOCIAL

Article 6 - Apports

Les associés font les apports suivants :

`;

  associesList.forEach((a) => {
    const montant = a.nombre_actions * data.valeur_nominale;
    content += `- ${a.prenom} ${a.nom.toUpperCase()} : apport en numéraire de ${montant.toLocaleString("fr-FR")} euros, soit ${a.nombre_actions} parts sociales de ${data.valeur_nominale} euros chacune.
`;
  });

  if (data.type_apports === "numeraire_nature") {
    content += `
[NOTE : Les apports en nature (notamment les apports d'immeubles) doivent faire l'objet d'une évaluation précise et, le cas échéant, d'un acte notarié aux frais de la Société. Cette évaluation doit être détaillée en annexe aux présents statuts.]

`;
  }

  content += `
Soit un total de ${data.capital_montant.toLocaleString("fr-FR")} euros correspondant à ${nbParts} parts sociales de ${data.valeur_nominale} euros de valeur nominale chacune.


Article 7 - Capital social

Le capital social est fixé à la somme de ${data.capital_montant.toLocaleString("fr-FR")} euros.

Il est divisé en ${nbParts.toLocaleString("fr-FR")} parts sociales de ${data.valeur_nominale} euros de valeur nominale chacune, numérotées de 1 à ${nbParts}, intégralement libérées et réparties entre les associés dans les proportions indiquées à l'article 6.


TITRE III - PARTS SOCIALES

Article 8 - Représentation des parts

Les parts sociales ne peuvent être représentées par des titres négociables. Les droits de chaque associé résultent seulement des présents statuts, des actes ultérieurs modifiant le capital social et des cessions régulièrement consenties.


Article 9 - Droits et obligations attachés aux parts

Chaque part sociale donne droit, dans les bénéfices et dans l'actif social, à une fraction proportionnelle au nombre de parts existantes.

À l'égard des tiers, les associés répondent indéfiniment des dettes sociales à proportion de leurs parts dans le capital social (article 1857 du Code civil).


Article 10 - Cession et transmission des parts

Les parts sociales sont librement cessibles entre associés et entre conjoints, ascendants et descendants.

`;

  if (data.clause_agrement) {
    content += `Toute cession de parts à un tiers étranger à la Société est soumise à l'agrément préalable de la collectivité des associés statuant à l'unanimité (ou à la majorité indiquée dans la notification d'agrément).

Le projet de cession est notifié par l'associé cédant, avec indication du cessionnaire, du nombre de parts cédées et du prix convenu, à la Société et à chacun des associés par lettre recommandée avec avis de réception.

Les associés disposent d'un délai de trois (3) mois à compter de cette notification pour se prononcer. À défaut de réponse, l'agrément est réputé acquis.

En cas de refus d'agrément, les associés doivent, dans un délai de six (6) mois, acquérir ou faire acquérir les parts sociales à un prix fixé d'un commun accord ou, à défaut, déterminé par un expert désigné conformément à l'article 1843-4 du Code civil.

`;
  } else {
    content += `Les parts sociales sont librement cessibles à des tiers.

`;
  }

  content += `
TITRE IV - GÉRANCE

Article 11 - Désignation de la gérance

La Société est gérée par un ou plusieurs gérants, associés ou non, personnes physiques, nommés par les associés statuant à la majorité simple.

La durée des fonctions de gérant n'est pas limitée. Le gérant peut démissionner ou être révoqué à tout moment par décision des associés statuant à la majorité simple.


Article 12 - Pouvoirs de la gérance

Dans les rapports avec les associés, la gérance dispose des pouvoirs les plus étendus pour effectuer tous actes de gestion dans l'intérêt de la Société.

Dans les rapports avec les tiers, la gérance engage la Société par les actes entrant dans l'objet social.

Toutefois, les actes suivants ne peuvent être accomplis par la gérance qu'avec l'autorisation préalable des associés statuant à la majorité :

- L'acquisition, la cession, l'apport en société ou l'hypothèque de tout immeuble social ;
- Les emprunts contractés au nom de la Société excédant [MONTANT] euros.

`;

  if (data.gerant_remuneration) {
    content += `Le gérant peut percevoir une rémunération fixée par décision collective des associés.

`;
  } else {
    content += `Le gérant exerce ses fonctions à titre gratuit.

`;
  }

  content += `
TITRE V - DÉCISIONS COLLECTIVES

Article 13 - Décisions collectives des associés

Les décisions collectives sont prises en assemblée générale ou par consultation écrite à l'initiative de la gérance.

Les décisions ordinaires sont prises à la majorité des parts sociales des associés présents ou représentés.

Les décisions extraordinaires (modification des statuts, augmentation ou réduction du capital, transformation, dissolution) sont prises à l'unanimité des associés, sauf stipulation contraire des présents statuts.

Chaque associé dispose d'un nombre de voix égal au nombre de parts sociales qu'il détient.


Article 14 - Assemblées générales

Les associés se réunissent en assemblée générale ordinaire au moins une fois par an dans les six (6) mois de la clôture de l'exercice, afin d'approuver les comptes de cet exercice.

Les convocations sont adressées par la gérance, par lettre simple ou par tout moyen écrit, au moins quinze (15) jours avant la date de la réunion.


TITRE VI - EXERCICE SOCIAL - COMPTES - BÉNÉFICES

Article 15 - Exercice social

L'exercice social commence le ${data.date_cloture_exercice === "30/06" ? "1er juillet" : "1er janvier"} et se termine le ${data.date_cloture_exercice} de chaque année.

Le premier exercice comprendra le temps écoulé entre l'immatriculation de la Société et le ${data.date_cloture_exercice} suivant.


Article 16 - Comptes annuels

À la clôture de chaque exercice, la gérance établit un inventaire, les comptes annuels et un rapport écrit sur la gestion pendant l'exercice écoulé.


Article 17 - Affectation et répartition des résultats

`;

  if (data.regime_fiscal === "is") {
    content += `La Société a opté pour l'assujettissement à l'impôt sur les sociétés, conformément à l'article 206 du Code général des impôts. Cette option est irrévocable.

Le bénéfice net, diminué des pertes antérieures, constitue le bénéfice distribuable après dotation de la réserve légale.

`;
  } else {
    content += `La Société relève du régime fiscal de droit commun applicable aux sociétés civiles : les bénéfices (ou déficits) sont imposés entre les mains des associés dans la catégorie des revenus fonciers ou des bénéfices non commerciaux, chacun pour la part lui revenant.

`;
  }

  content += `Les bénéfices distribuables sont répartis entre les associés proportionnellement au nombre de parts sociales qu'ils détiennent.


TITRE VII - DISSOLUTION - LIQUIDATION

Article 18 - Dissolution - Liquidation

La Société est dissoute par l'arrivée de son terme, sauf prorogation, ou par toute autre cause prévue par la loi ou par décision extraordinaire des associés.

La liquidation est effectuée par le ou les gérants en exercice ou par un liquidateur nommé par les associés.

Après règlement du passif, le solde est réparti entre les associés proportionnellement au nombre de leurs parts.


TITRE VIII - PROTECTION DES DONNÉES PERSONNELLES

Article 19 - Traitement des données personnelles

Conformément au Règlement (UE) 2016/679 (RGPD) et à la loi n° 78-17 du 6 janvier 1978 modifiée, la Société procède au traitement des données personnelles des associés (identité, date et lieu de naissance, nationalité, adresse) pour l'exécution des présents statuts (article 6.1.b du RGPD) et pour le respect de ses obligations légales (article 6.1.c du RGPD).

Les données sont conservées pendant toute la durée de la qualité d'associé puis archivées conformément aux durées de conservation légales.

Les associés disposent des droits d'accès, de rectification, d'effacement, de limitation, d'opposition et de portabilité, qu'ils peuvent exercer auprès de la gérance. Ils peuvent également introduire une réclamation auprès de la CNIL.


TITRE IX - CONTESTATIONS

Article 20 - Contestations

Toutes les contestations relatives à la Société et à sa liquidation sont soumises à la compétence du Tribunal Judiciaire du lieu du siège social.


DÉSIGNATION DU PREMIER GÉRANT

${gerantStr}

${data.gerant_remuneration ? "dont la rémunération sera fixée par décision collective des associés." : "qui exercera ses fonctions à titre gratuit."}


Fait à ${extractCity(data.siege_social)}, le ${dateStr}
En autant d'exemplaires originaux que requis par la loi.


`;

  associesList.forEach((a) => {
    content += `
${a.prenom} ${a.nom.toUpperCase()}
(signature précédée de la mention « Lu et approuvé »)



`;
  });

  return content;
}
