import type { StatutsSASData, AssocieData } from "@/lib/questionnaire-configs/statuts-sas";

function formatAssocieIdentity(a: AssocieData): string {
  return `${a.prenom} ${a.nom.toUpperCase()}, né(e) le ${a.date_naissance} à ${a.lieu_naissance}, de nationalité ${a.nationalite}, demeurant ${a.adresse}`;
}

function getPresident(data: StatutsSASData): string {
  if (data.president_type === "associe") {
    const idx = (data.president_index || 1) - 1;
    const a = data.associes_list[idx];
    if (!a) return "[PRÉSIDENT À DÉSIGNER]";
    return `${a.prenom} ${a.nom.toUpperCase()}, demeurant ${a.adresse}`;
  }
  return `${data.president_tiers_nom || "[NOM DU PRÉSIDENT]"}, demeurant ${data.president_tiers_adresse || "[ADRESSE]"}`;
}

function getExerciceStart(cloture: string): string {
  const map: Record<string, string> = {
    "31/12": "1er janvier",
    "30/06": "1er juillet",
    "30/09": "1er octobre",
    "31/03": "1er avril",
  };
  return map[cloture] || "1er janvier";
}

function extractCity(address: string): string {
  const parts = address.split(",");
  const last = parts[parts.length - 1]?.trim() || "";
  const cityMatch = last.match(/\d{5}\s+(.+)/);
  if (cityMatch) return cityMatch[1];
  return last || "[VILLE]";
}

function numberToWords(n: number): string {
  const simples: Record<number, string> = {
    1: "un", 2: "deux", 3: "trois", 4: "quatre", 5: "cinq",
    10: "dix", 20: "vingt", 30: "trente", 50: "cinquante",
    99: "quatre-vingt-dix-neuf",
  };
  return simples[n] || String(n);
}

export function generateStatutsSAS(data: StatutsSASData): string {
  const nbActions = Math.floor(data.capital_montant / data.valeur_nominale);
  const today = new Date();
  const dateStr = today.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });

  const associesList = data.associes_list || [];
  const presidentStr = getPresident(data);

  let content = `STATUTS DE SOCIÉTÉ PAR ACTIONS SIMPLIFIÉE

${data.denomination.toUpperCase()}

Société par Actions Simplifiée
au capital de ${data.capital_montant.toLocaleString("fr-FR")} euros



LES SOUSSIGNÉS :

`;

  associesList.forEach((a, i) => {
    content += `${i + 1}. ${formatAssocieIdentity(a)}

`;
  });

  content += `Ont établi ainsi qu'il suit les statuts de la Société par Actions Simplifiée devant exister entre eux.


TITRE I - FORME - OBJET - DÉNOMINATION - SIÈGE - DURÉE

Article 1 - Forme

Il est constitué entre les soussignés une Société par Actions Simplifiée (SAS) régie par les dispositions législatives et réglementaires en vigueur, notamment les articles L. 227-1 à L. 227-20 du Code de commerce, ainsi que par les présents statuts.


Article 2 - Objet social

La Société a pour objet, en France et à l'étranger :

${data.objet_social}

Et plus généralement, toutes opérations industrielles, commerciales, financières, civiles, mobilières ou immobilières, pouvant se rattacher directement ou indirectement à l'objet social ou à tous objets similaires, connexes ou complémentaires.


Article 3 - Dénomination sociale

La dénomination de la Société est : ${data.denomination.toUpperCase()}

Dans tous les actes et documents émanant de la Société et destinés aux tiers, la dénomination sociale devra toujours être précédée ou suivie des mots « Société par Actions Simplifiée » ou des initiales « SAS », du montant du capital social, et du numéro d'immatriculation au Registre du Commerce et des Sociétés.


Article 4 - Siège social

Le siège social est fixé à l'adresse suivante :
${data.siege_social}

Il pourra être transféré en tout autre endroit par décision du Président, sous réserve de ratification par la collectivité des associés.


Article 5 - Durée

La durée de la Société est fixée à ${data.duree} (${numberToWords(data.duree)}) années à compter de la date de son immatriculation au Registre du Commerce et des Sociétés, sauf dissolution anticipée ou prorogation.


TITRE II - APPORTS - CAPITAL SOCIAL

Article 6 - Apports

Les associés font les apports suivants :

`;

  associesList.forEach((a) => {
    const montant = a.nombre_actions * data.valeur_nominale;
    content += `- ${a.prenom} ${a.nom.toUpperCase()} : apport en numéraire de ${montant.toLocaleString("fr-FR")} euros, soit ${a.nombre_actions} actions de ${data.valeur_nominale} euros chacune.
`;
  });

  if (data.type_apports === "numeraire_nature") {
    content += `
[NOTE : Les apports en nature devront faire l'objet d'une évaluation par un Commissaire aux apports désigné par les associés, conformément à l'article L. 225-147 du Code de commerce, sauf dispense prévue à l'article L. 227-1 alinéa 3.]

`;
  }

  content += `
Soit un total de ${data.capital_montant.toLocaleString("fr-FR")} euros correspondant à ${nbActions} actions de ${data.valeur_nominale} euros de valeur nominale chacune.


Article 7 - Capital social

Le capital social est fixé à la somme de ${data.capital_montant.toLocaleString("fr-FR")} euros.

Il est divisé en ${nbActions.toLocaleString("fr-FR")} actions de ${data.valeur_nominale} euros de valeur nominale chacune, intégralement souscrites et ${data.liberation_partielle === "totale" ? "entièrement libérées" : "libérées de la moitié de leur valeur nominale"}.

`;

  if (data.liberation_partielle === "moitie") {
    content += `Les fonds correspondant à la libération partielle, soit la somme de ${(data.capital_montant / 2).toLocaleString("fr-FR")} euros, ont été déposés sur un compte ouvert au nom de la Société en formation auprès de [NOM DE LA BANQUE].

Le solde, soit ${(data.capital_montant / 2).toLocaleString("fr-FR")} euros, devra être libéré dans un délai de cinq (5) ans à compter de l'immatriculation de la Société au Registre du Commerce et des Sociétés, sur appel du Président.

`;
  } else {
    content += `Les fonds correspondant aux apports en numéraire, soit la somme de ${data.capital_montant.toLocaleString("fr-FR")} euros, ont été déposés sur un compte ouvert au nom de la Société en formation auprès de [NOM DE LA BANQUE].

`;
  }

  content += `
Article 8 - Modifications du capital social

Le capital social peut être augmenté ou réduit par décision collective des associés statuant dans les conditions prévues aux présents statuts, conformément aux dispositions légales et réglementaires en vigueur.


TITRE III - ACTIONS

Article 9 - Droits et obligations attachés aux actions

Chaque action donne droit, dans la propriété de l'actif social et dans le partage des bénéfices, à une part proportionnelle au nombre d'actions existantes.

Les droits et obligations attachés à chaque action suivent le titre dans quelque main qu'il passe.

La propriété d'une action emporte de plein droit adhésion aux statuts de la Société et aux décisions prises par la collectivité des associés.

Les héritiers, ayants droit et créanciers d'un associé ne peuvent, sous quelque prétexte que ce soit, provoquer l'apposition de scellés sur les biens et documents de la Société, ni s'immiscer en aucune manière dans les actes de son administration.


Article 10 - Cession et transmission des actions

Les actions sont librement cessibles entre associés.

`;

  if (data.clause_agrement) {
    content += `Toute cession d'actions à un tiers non associé est soumise à l'agrément préalable de la collectivité des associés statuant à la majorité des voix des associés disposant du droit de vote.

La demande d'agrément doit être notifiée par lettre recommandée avec avis de réception au Président de la Société, avec indication du nombre d'actions dont la cession est envisagée, du prix proposé et de l'identité du cessionnaire.

La décision de la collectivité des associés doit intervenir dans un délai de trois (3) mois à compter de la notification de la demande. À défaut de réponse dans ce délai, l'agrément est réputé acquis.

En cas de refus d'agrément, les associés sont tenus, dans un délai de trois (3) mois à compter de la notification du refus, d'acquérir ou de faire acquérir les actions dont la cession était projetée, à un prix fixé d'un commun accord ou, à défaut, déterminé par un expert désigné conformément à l'article 1843-4 du Code civil.

`;
  } else {
    content += `Les actions sont librement cessibles à des tiers.

`;
  }

  if (data.clause_preemption) {
    content += `
Article 10 bis - Droit de préemption

En cas de projet de cession d'actions à un tiers, les associés bénéficient d'un droit de préemption, proportionnellement au nombre d'actions qu'ils détiennent.

L'associé cédant doit notifier son projet de cession à l'ensemble des associés et au Président par lettre recommandée avec avis de réception, en indiquant le nombre d'actions, le prix et l'identité du cessionnaire.

Les associés disposent d'un délai de trente (30) jours à compter de la réception de cette notification pour exercer leur droit de préemption. À défaut d'exercice dans ce délai, l'associé cédant est libre de céder ses actions au tiers aux conditions notifiées.

`;
  }

  content += `
TITRE IV - DIRECTION DE LA SOCIÉTÉ

Article 11 - Président

La Société est représentée, dirigée et administrée par un Président, personne physique ou personne morale.

Le Président est investi des pouvoirs les plus étendus pour agir en toute circonstance au nom de la Société, dans la limite de l'objet social et sous réserve des pouvoirs expressément attribués par la loi et les présents statuts à la collectivité des associés.

Le Président représente la Société à l'égard des tiers. La Société est engagée même par les actes du Président qui ne relèvent pas de l'objet social, à moins qu'elle ne prouve que le tiers savait que l'acte dépassait cet objet ou qu'il ne pouvait l'ignorer compte tenu des circonstances.

`;

  if (data.president_remuneration) {
    content += `La rémunération du Président est fixée par décision collective des associés.

`;
  } else {
    content += `Le Président exerce ses fonctions à titre gratuit.

`;
  }

  content += `
Article 12 - Directeur Général

Le Président peut proposer la nomination d'un ou plusieurs Directeurs Généraux, personnes physiques, dont il fixe les pouvoirs et la durée des fonctions.

Les Directeurs Généraux disposent des mêmes pouvoirs que le Président à l'égard des tiers.


TITRE V - DÉCISIONS COLLECTIVES

Article 13 - Décisions collectives des associés

Les décisions collectives des associés sont prises en assemblée générale ou par consultation écrite.

Les décisions collectives ordinaires sont prises à la majorité simple des voix des associés présents ou représentés.

Les décisions collectives extraordinaires (modification des statuts, augmentation ou réduction du capital, fusion, dissolution) sont prises à la majorité des deux tiers des voix des associés présents ou représentés.

Chaque action donne droit à une voix.


Article 14 - Assemblée générale

Les associés se réunissent en assemblée générale sur convocation du Président, adressée par tout moyen (lettre recommandée, email avec accusé de réception) au moins quinze (15) jours avant la date de la réunion.

L'assemblée générale est présidée par le Président de la Société.

Il est dressé un procès-verbal de chaque assemblée, signé par le Président et conservé au siège social.


Article 15 - Consultation écrite

Les décisions collectives peuvent également être prises par consultation écrite des associés à l'initiative du Président.

Le texte des résolutions proposées et les documents nécessaires à l'information des associés sont adressés par tout moyen écrit. Les associés disposent d'un délai de quinze (15) jours à compter de la réception du projet de résolutions pour émettre leur vote.


Article 16 - Décisions de l'associé unique

Si la Société ne comporte qu'un seul associé, celui-ci exerce les pouvoirs dévolus à la collectivité des associés. Ses décisions sont reportées sur un registre spécial.


TITRE VI - COMPTES SOCIAUX - BÉNÉFICES - DIVIDENDES

Article 17 - Exercice social

L'exercice social a une durée de douze (12) mois.

Il commence le ${getExerciceStart(data.date_cloture_exercice)} et se termine le ${data.date_cloture_exercice} de chaque année.

Par exception, le premier exercice social comprendra le temps écoulé entre la date d'immatriculation de la Société au Registre du Commerce et des Sociétés et le ${data.date_cloture_exercice} suivant.


Article 18 - Comptes annuels

À la clôture de chaque exercice, le Président établit les comptes annuels (bilan, compte de résultat et annexe) conformément aux dispositions légales et réglementaires en vigueur.

Il établit également un rapport de gestion exposant la situation de la Société durant l'exercice écoulé, son évolution prévisible, les événements importants survenus depuis la clôture et les activités en matière de recherche et de développement.


Article 19 - Affectation et répartition des bénéfices

Le bénéfice net de l'exercice, diminué des pertes antérieures, constitue le bénéfice distribuable après dotation de la réserve légale.

Il est prélevé sur ce bénéfice cinq pour cent (5 %) au moins pour constituer le fonds de réserve légale. Ce prélèvement cesse d'être obligatoire lorsque la réserve légale a atteint le dixième du capital social.

Le solde, augmenté le cas échéant des reports bénéficiaires antérieurs, constitue le bénéfice distribuable.

`;

  if (data.distribution_dividendes === "proportionnelle") {
    content += `Les dividendes sont répartis entre les associés proportionnellement au nombre d'actions qu'ils détiennent.

`;
  } else {
    content += `Les dividendes sont répartis entre les associés selon les modalités fixées par décision collective des associés.

`;
  }

  content += `La collectivité des associés peut décider la mise en distribution de tout ou partie du bénéfice distribuable, ou son report à nouveau.


TITRE VII - DISSOLUTION - LIQUIDATION

Article 20 - Dissolution

La Société est dissoute par l'arrivée de son terme, sauf prorogation, ou par décision collective extraordinaire des associés, ou encore pour toute autre cause prévue par la loi.

La réunion de toutes les actions en une seule main n'entraîne pas la dissolution de plein droit de la Société.


Article 21 - Liquidation

En cas de dissolution, la liquidation est effectuée par le Président en exercice, à moins que la collectivité des associés ne désigne un ou plusieurs liquidateurs.

Le liquidateur représente la Société. Il dispose des pouvoirs les plus étendus pour réaliser l'actif et acquitter le passif.

Le produit net de la liquidation, après apurement du passif et remboursement aux associés du montant nominal de leurs actions, est réparti entre les associés proportionnellement au nombre d'actions qu'ils détiennent.


TITRE VIII - PROTECTION DES DONNÉES PERSONNELLES

Article 22 - Traitement des données personnelles

Conformément au Règlement (UE) 2016/679 du 27 avril 2016 (Règlement Général sur la Protection des Données, ou « RGPD ») et à la loi n° 78-17 du 6 janvier 1978 modifiée, la Société procède au traitement des données personnelles des associés (identité, date et lieu de naissance, nationalité, adresse, coordonnées bancaires le cas échéant) pour les finalités suivantes :

- L'exécution et le suivi des présents statuts (base légale : exécution du contrat, article 6.1.b du RGPD) ;
- Le respect des obligations légales et réglementaires incombant à la Société, notamment en matière comptable, fiscale et sociale (base légale : obligation légale, article 6.1.c du RGPD) ;
- La gestion des relations avec les associés et la convocation aux assemblées générales (base légale : intérêt légitime, article 6.1.f du RGPD).

Les données personnelles des associés sont conservées pendant toute la durée de leur qualité d'associé, puis archivées conformément aux durées de conservation légales applicables (notamment l'article L. 123-22 du Code de commerce pour les documents comptables).

Les associés disposent, à tout moment, des droits d'accès, de rectification, d'effacement, de limitation du traitement, d'opposition et de portabilité de leurs données, qu'ils peuvent exercer par écrit auprès du Président de la Société. Ils disposent également du droit d'introduire une réclamation auprès de la Commission Nationale de l'Informatique et des Libertés (CNIL).


TITRE IX - CONTESTATIONS

Article 23 - Contestations

Toutes les contestations qui pourraient s'élever pendant la durée de la Société ou lors de sa liquidation, soit entre les associés, soit entre la Société et les associés, relativement aux affaires sociales, seront soumises à la compétence du Tribunal de Commerce du lieu du siège social.


TITRE X - DISPOSITIONS DIVERSES

Article 24 - Actes accomplis pour le compte de la Société en formation

Les associés déclarent approuver les actes accomplis pour le compte de la Société en formation, tels qu'ils figurent dans un état annexé aux présents statuts.

La Société, une fois immatriculée, reprendra les engagements résultant de ces actes, qui seront alors réputés avoir été souscrits dès l'origine par la Société.


Article 25 - Frais

Les frais, droits et honoraires des présents statuts et de leurs suites sont à la charge de la Société.


Article 26 - Pouvoirs

Tous pouvoirs sont donnés au Président pour accomplir les formalités de publicité et de dépôt prévues par la loi, et notamment pour effectuer les formalités d'immatriculation de la Société au Registre du Commerce et des Sociétés.


DÉSIGNATION DU PREMIER PRÉSIDENT

Les soussignés désignent en qualité de premier Président de la Société :

${presidentStr}

${data.president_remuneration ? "dont la rémunération sera fixée par décision collective des associés." : "qui exercera ses fonctions à titre gratuit."}

Le Président déclare accepter les fonctions qui lui sont conférées et n'être frappé d'aucune incompatibilité ni interdiction.


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
