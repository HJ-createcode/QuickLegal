import type { StatutsSASData, AssocieData } from "./questionnaire-config";

function formatAssocieIdentity(a: AssocieData, idx: number): string {
  return `${a.prenom} ${a.nom.toUpperCase()}, ne(e) le ${a.date_naissance} a ${a.lieu_naissance}, de nationalite ${a.nationalite}, demeurant ${a.adresse}`;
}

function getPresident(data: StatutsSASData): string {
  if (data.president_type === "associe") {
    const idx = (data.president_index || 1) - 1;
    const a = data.associes_list[idx];
    if (!a) return "[PRESIDENT A DESIGNER]";
    return `${a.prenom} ${a.nom.toUpperCase()}, demeurant ${a.adresse}`;
  }
  return `${data.president_tiers_nom || "[NOM DU PRESIDENT]"}, demeurant ${data.president_tiers_adresse || "[ADRESSE]"}`;
}

export function generateStatutsSAS(data: StatutsSASData): string {
  const nbActions = Math.floor(data.capital_montant / data.valeur_nominale);
  const today = new Date();
  const dateStr = today.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });

  const associesList = data.associes_list || [];
  const presidentStr = getPresident(data);

  let content = `STATUTS DE SOCIETE PAR ACTIONS SIMPLIFIEE

${data.denomination.toUpperCase()}

Societe par Actions Simplifiee
au capital de ${data.capital_montant.toLocaleString("fr-FR")} euros



LES SOUSSIGNES :

`;

  // Liste des associes
  associesList.forEach((a, i) => {
    content += `${i + 1}. ${formatAssocieIdentity(a, i)}

`;
  });

  content += `Ont etabli ainsi qu'il suit les statuts de la Societe par Actions Simplifiee devant exister entre eux.


TITRE I - FORME - OBJET - DENOMINATION - SIEGE - DUREE

Article 1 - Forme

Il est constitue entre les soussignes une Societe par Actions Simplifiee (SAS) regie par les dispositions legislatives et reglementaires en vigueur, notamment les articles L. 227-1 a L. 227-20 du Code de commerce, ainsi que par les presents statuts.


Article 2 - Objet social

La Societe a pour objet, en France et a l'etranger :

${data.objet_social}

Et plus generalement, toutes operations industrielles, commerciales, financieres, civiles, mobilieres ou immobilieres, pouvant se rattacher directement ou indirectement a l'objet social ou a tous objets similaires, connexes ou complementaires.


Article 3 - Denomination sociale

La denomination de la Societe est : ${data.denomination.toUpperCase()}

Dans tous les actes et documents emanant de la Societe et destines aux tiers, la denomination sociale devra toujours etre precedee ou suivie des mots "Societe par Actions Simplifiee" ou des initiales "SAS", du montant du capital social, et du numero d'immatriculation au Registre du Commerce et des Societes.


Article 4 - Siege social

Le siege social est fixe a l'adresse suivante :
${data.siege_social}

Il pourra etre transfere en tout autre endroit par decision du President, sous reserve de ratification par la collectivite des associes.


Article 5 - Duree

La duree de la Societe est fixee a ${data.duree} (${numberToWords(data.duree)}) annees a compter de la date de son immatriculation au Registre du Commerce et des Societes, sauf dissolution anticipee ou prorogation.


TITRE II - APPORTS - CAPITAL SOCIAL

Article 6 - Apports

Les associes font les apports suivants :

`;

  // Detail des apports par associe
  let totalActions = 0;
  associesList.forEach((a, i) => {
    const montant = a.nombre_actions * data.valeur_nominale;
    totalActions += a.nombre_actions;
    content += `- ${a.prenom} ${a.nom.toUpperCase()} : apport en numeraire de ${montant.toLocaleString("fr-FR")} euros, soit ${a.nombre_actions} actions de ${data.valeur_nominale} euros chacune.
`;
  });

  if (data.type_apports === "numeraire_nature") {
    content += `
[NOTE : Les apports en nature devront faire l'objet d'une evaluation par un Commissaire aux apports designe par les associes, conformement a l'article L. 225-147 du Code de commerce, sauf dispense prevue a l'article L. 227-1 alinea 3.]

`;
  }

  content += `
Soit un total de ${data.capital_montant.toLocaleString("fr-FR")} euros correspondant a ${nbActions} actions de ${data.valeur_nominale} euros de valeur nominale chacune.


Article 7 - Capital social

Le capital social est fixe a la somme de ${data.capital_montant.toLocaleString("fr-FR")} euros.

Il est divise en ${nbActions.toLocaleString("fr-FR")} actions de ${data.valeur_nominale} euros de valeur nominale chacune, integralement souscrites et ${data.liberation_partielle === "totale" ? "entierement liberees" : "liberees de la moitie de leur valeur nominale"}.

`;

  if (data.liberation_partielle === "moitie") {
    content += `Les fonds correspondant a la liberation partielle, soit la somme de ${(data.capital_montant / 2).toLocaleString("fr-FR")} euros, ont ete deposes sur un compte ouvert au nom de la Societe en formation aupres de [NOM DE LA BANQUE].

Le solde, soit ${(data.capital_montant / 2).toLocaleString("fr-FR")} euros, devra etre libere dans un delai de cinq (5) ans a compter de l'immatriculation de la Societe au Registre du Commerce et des Societes, sur appel du President.

`;
  } else {
    content += `Les fonds correspondant aux apports en numeraire, soit la somme de ${data.capital_montant.toLocaleString("fr-FR")} euros, ont ete deposes sur un compte ouvert au nom de la Societe en formation aupres de [NOM DE LA BANQUE].

`;
  }

  content += `
Article 8 - Modifications du capital social

Le capital social peut etre augmente ou reduit par decision collective des associes statuant dans les conditions prevues aux presents statuts, conformement aux dispositions legales et reglementaires en vigueur.


TITRE III - ACTIONS

Article 9 - Droits et obligations attaches aux actions

Chaque action donne droit, dans la propriete de l'actif social et dans le partage des benefices, a une part proportionnelle au nombre d'actions existantes.

Les droits et obligations attaches a chaque action suivent le titre dans quelque main qu'il passe.

La propriete d'une action emporte de plein droit adhesion aux statuts de la Societe et aux decisions prises par la collectivite des associes.

Les heritiers, ayants droit et creanciers d'un associe ne peuvent, sous quelque pretexte que ce soit, provoquer l'apposition de scelles sur les biens et documents de la Societe, ni s'immiscer en aucune maniere dans les actes de son administration.


Article 10 - Cession et transmission des actions

Les actions sont librement cessibles entre associes.

`;

  if (data.clause_agrement) {
    content += `Toute cession d'actions a un tiers non associe est soumise a l'agrement prealable de la collectivite des associes statuant a la majorite des voix des associes disposant du droit de vote.

La demande d'agrement doit etre notifiee par lettre recommandee avec avis de reception au President de la Societe, avec indication du nombre d'actions dont la cession est envisagee, du prix propose et de l'identite du cessionnaire.

La decision de la collectivite des associes doit intervenir dans un delai de trois (3) mois a compter de la notification de la demande. A defaut de reponse dans ce delai, l'agrement est repute acquis.

En cas de refus d'agrement, les associes sont tenus, dans un delai de trois (3) mois a compter de la notification du refus, d'acquerir ou de faire acquerir les actions dont la cession etait projetee, a un prix fixe d'un commun accord ou, a defaut, determine par un expert designe conformement a l'article 1843-4 du Code civil.

`;
  } else {
    content += `Les actions sont librement cessibles a des tiers.

`;
  }

  if (data.clause_preemption) {
    content += `
Article 10 bis - Droit de preemption

En cas de projet de cession d'actions a un tiers, les associes beneficient d'un droit de preemption, proportionnellement au nombre d'actions qu'ils detiennent.

L'associe cedant doit notifier son projet de cession a l'ensemble des associes et au President par lettre recommandee avec avis de reception, en indiquant le nombre d'actions, le prix et l'identite du cessionnaire.

Les associes disposent d'un delai de trente (30) jours a compter de la reception de cette notification pour exercer leur droit de preemption. A defaut d'exercice dans ce delai, l'associe cedant est libre de ceder ses actions au tiers aux conditions notifiees.

`;
  }

  content += `
TITRE IV - DIRECTION DE LA SOCIETE

Article 11 - President

La Societe est representee, dirigee et administree par un President, personne physique ou personne morale.

Le President est investi des pouvoirs les plus etendus pour agir en toute circonstance au nom de la Societe, dans la limite de l'objet social et sous reserve des pouvoirs expressement attribues par la loi et les presents statuts a la collectivite des associes.

Le President represente la Societe a l'egard des tiers. La Societe est engagee meme par les actes du President qui ne relevent pas de l'objet social, a moins qu'elle ne prouve que le tiers savait que l'acte depassait cet objet ou qu'il ne pouvait l'ignorer compte tenu des circonstances.

`;

  if (data.president_remuneration) {
    content += `La remuneration du President est fixee par decision collective des associes.

`;
  } else {
    content += `Le President exerce ses fonctions a titre gratuit.

`;
  }

  content += `
Article 12 - Directeur General

Le President peut proposer la nomination d'un ou plusieurs Directeurs Generaux, personnes physiques, dont il fixe les pouvoirs et la duree des fonctions.

Les Directeurs Generaux disposent des memes pouvoirs que le President a l'egard des tiers.


TITRE V - DECISIONS COLLECTIVES

Article 13 - Decisions collectives des associes

Les decisions collectives des associes sont prises en assemblee generale ou par consultation ecrite.

Les decisions collectives ordinaires sont prises a la majorite simple des voix des associes presents ou representes.

Les decisions collectives extraordinaires (modification des statuts, augmentation ou reduction du capital, fusion, dissolution) sont prises a la majorite des deux tiers des voix des associes presents ou representes.

Chaque action donne droit a une voix.


Article 14 - Assemblee generale

Les associes se reunissent en assemblee generale sur convocation du President, adressee par tout moyen (lettre recommandee, email avec accuse de reception) au moins quinze (15) jours avant la date de la reunion.

L'assemblee generale est presidee par le President de la Societe.

Il est dresse un proces-verbal de chaque assemblee, signe par le President et conserve au siege social.


Article 15 - Consultation ecrite

Les decisions collectives peuvent egalement etre prises par consultation ecrite des associes a l'initiative du President.

Le texte des resolutions proposees et les documents necessaires a l'information des associes sont adresses par tout moyen ecrit. Les associes disposent d'un delai de quinze (15) jours a compter de la reception du projet de resolutions pour emettre leur vote.


Article 16 - Decisions de l'associe unique

Si la Societe ne comporte qu'un seul associe, celui-ci exerce les pouvoirs devolus a la collectivite des associes. Ses decisions sont reportees sur un registre special.


TITRE VI - COMPTES SOCIAUX - BENEFICES - DIVIDENDES

Article 17 - Exercice social

L'exercice social a une duree de douze (12) mois.

Il commence le ${getExerciceStart(data.date_cloture_exercice)} et se termine le ${data.date_cloture_exercice} de chaque annee.

Par exception, le premier exercice social comprendra le temps ecoule entre la date d'immatriculation de la Societe au Registre du Commerce et des Societes et le ${data.date_cloture_exercice} suivant.


Article 18 - Comptes annuels

A la cloture de chaque exercice, le President etablit les comptes annuels (bilan, compte de resultat et annexe) conformement aux dispositions legales et reglementaires en vigueur.

Il etablit egalement un rapport de gestion exposant la situation de la Societe durant l'exercice ecoule, son evolution previsible, les evenements importants survenus depuis la cloture et les activites en matiere de recherche et de developpement.


Article 19 - Affectation et repartition des benefices

Le benefice net de l'exercice, diminue des pertes anterieures, constitue le benefice distribuable apres dotation de la reserve legale.

Il est preleve sur ce benefice cinq pour cent (5%) au moins pour constituer le fonds de reserve legale. Ce prelevement cesse d'etre obligatoire lorsque la reserve legale a atteint le dixieme du capital social.

Le solde, augmente le cas echeant des reports beneficiaires anterieurs, constitue le benefice distribuable.

`;

  if (data.distribution_dividendes === "proportionnelle") {
    content += `Les dividendes sont repartis entre les associes proportionnellement au nombre d'actions qu'ils detiennent.

`;
  } else {
    content += `Les dividendes sont repartis entre les associes selon les modalites fixees par decision collective des associes.

`;
  }

  content += `La collectivite des associes peut decider la mise en distribution de tout ou partie du benefice distribuable, ou son report a nouveau.


TITRE VII - DISSOLUTION - LIQUIDATION

Article 20 - Dissolution

La Societe est dissoute par l'arrivee de son terme, sauf prorogation, ou par decision collective extraordinaire des associes, ou encore pour toute autre cause prevue par la loi.

La reunion de toutes les actions en une seule main n'entraine pas la dissolution de plein droit de la Societe.


Article 21 - Liquidation

En cas de dissolution, la liquidation est effectuee par le President en exercice, a moins que la collectivite des associes ne designe un ou plusieurs liquidateurs.

Le liquidateur represente la Societe. Il dispose des pouvoirs les plus etendus pour realiser l'actif et acquitter le passif.

Le produit net de la liquidation, apres apurement du passif et remboursement aux associes du montant nominal de leurs actions, est reparti entre les associes proportionnellement au nombre d'actions qu'ils detiennent.


TITRE VIII - CONTESTATIONS

Article 22 - Contestations

Toutes les contestations qui pourraient s'elever pendant la duree de la Societe ou lors de sa liquidation, soit entre les associes, soit entre la Societe et les associes, relativement aux affaires sociales, seront soumises a la competence du Tribunal de Commerce du lieu du siege social.


TITRE IX - DISPOSITIONS DIVERSES

Article 23 - Actes accomplis pour le compte de la Societe en formation

Les associes declarent approuver les actes accomplis pour le compte de la Societe en formation, tels qu'ils figurent dans un etat annexe aux presents statuts.

La Societe, une fois immatriculee, reprendra les engagements resultant de ces actes, qui seront alors reputes avoir ete souscrits des l'origine par la Societe.


Article 24 - Frais

Les frais, droits et honoraires des presents statuts et de leurs suites sont a la charge de la Societe.


Article 25 - Pouvoirs

Tous pouvoirs sont donnes au President pour accomplir les formalites de publicite et de depot prevues par la loi, et notamment pour effectuer les formalites d'immatriculation de la Societe au Registre du Commerce et des Societes.


DESIGNATION DU PREMIER PRESIDENT

Les soussignes designent en qualite de premier President de la Societe :

${presidentStr}

${data.president_remuneration ? "dont la remuneration sera fixee par decision collective des associes." : "qui exercera ses fonctions a titre gratuit."}

Le President declare accepter les fonctions qui lui sont conferees et n'etre frappe d'aucune incompatibilite ni interdiction.


Fait a ${extractCity(data.siege_social)}, le ${dateStr}
En autant d'exemplaires originaux que requis par la loi.


`;

  // Signatures
  associesList.forEach((a) => {
    content += `
${a.prenom} ${a.nom.toUpperCase()}
(signature precedee de la mention "Lu et approuve")



`;
  });

  return content;
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
  // Try to extract city name (remove postal code)
  const cityMatch = last.match(/\d{5}\s+(.+)/);
  if (cityMatch) return cityMatch[1];
  return last || "[VILLE]";
}

function numberToWords(n: number): string {
  if (n === 99) return "quatre-vingt-dix-neuf";
  if (n === 50) return "cinquante";
  return String(n);
}
