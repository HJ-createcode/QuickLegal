import type { AttestationDomiciliationData } from "@/lib/questionnaire-configs/attestation-domiciliation";

function occupationLabel(d: AttestationDomiciliationData): string {
  switch (d.attestant_occupation) {
    case "proprietaire":
      return "propriétaire";
    case "locataire":
      return "locataire en titre";
    case "sous_locataire":
      return "sous-locataire autorisé";
    case "autre":
      return d.attestant_occupation_autre || "occupant";
  }
}

function attestantParagraph(d: AttestationDomiciliationData): string {
  if (d.attestant_type === "personne_morale") {
    const parts: string[] = [];
    parts.push(
      `La société ${d.attestant_denomination || ""}${d.attestant_forme ? `, ${d.attestant_forme}` : ""}`
    );
    if (d.attestant_capital) {
      parts.push(
        `au capital de ${Number(d.attestant_capital).toLocaleString("fr-FR")} €`
      );
    }
    if (d.attestant_siret) parts.push(`immatriculée sous le numéro ${d.attestant_siret}`);
    if (d.attestant_rcs_ville)
      parts.push(`au RCS de ${d.attestant_rcs_ville}`);
    if (d.attestant_siege)
      parts.push(`dont le siège social est situé ${d.attestant_siege}`);
    let s = parts.join(", ") + ",";
    if (d.attestant_representant_nom) {
      s += `\nreprésentée par ${d.attestant_representant_nom}`;
      if (d.attestant_representant_qualite) {
        s += `, en qualité de ${d.attestant_representant_qualite}, dûment habilité(e)`;
      }
      s += ",";
    }
    return s;
  }

  const parts: string[] = [];
  const nom = [d.attestant_prenom, d.attestant_nom].filter(Boolean).join(" ");
  parts.push(`Je soussigné(e) ${nom || "……………………"}`);
  if (d.attestant_date_naissance) {
    parts.push(`né(e) le ${d.attestant_date_naissance}`);
  }
  if (d.attestant_lieu_naissance) {
    parts.push(`à ${d.attestant_lieu_naissance}`);
  }
  if (d.attestant_nationalite) {
    parts.push(`de nationalité ${d.attestant_nationalite.toLowerCase()}`);
  }
  if (d.attestant_adresse_personnelle) {
    parts.push(`demeurant ${d.attestant_adresse_personnelle}`);
  }
  return parts.join(", ") + ",";
}

export function generateAttestationDomiciliation(
  data: AttestationDomiciliationData
): string {
  const isSociete = data.attestant_type === "personne_morale";
  const intro = isSociete ? "Le soussigné," : "";
  const statutSoc =
    data.societe_statut === "en_cours_constitution"
      ? "en cours de constitution"
      : data.societe_siret
        ? `immatriculée sous le numéro ${data.societe_siret}`
        : "existante";

  return `ATTESTATION DE DOMICILIATION DU SIÈGE SOCIAL

${intro}${attestantParagraph(data)}

ci-après dénommé(e) « le Domiciliataire »,


ATTESTE ET DÉCLARE CE QUI SUIT :


Article 1 - Objet

Le Domiciliataire atteste, en sa qualité de ${occupationLabel(data)} du local situé :

${data.adresse_domiciliation}

${
  isSociete
    ? "disposer du droit d'y autoriser l'établissement du siège social"
    : "disposer du droit d'y autoriser l'établissement du siège social"
}, et autorise expressément la société ci-après désignée à y fixer le siège social de son activité.


Article 2 - Société domiciliée

La présente autorisation bénéficie à :

${data.societe_denomination}, ${data.societe_forme}, ${statutSoc},

ci-après dénommée « la Société ».


Article 3 - Durée

La présente autorisation de domiciliation est consentie pour une durée indéterminée.

Elle prendra fin :
- sur décision écrite du Domiciliataire, moyennant un préavis d'un (1) mois notifié à la Société, sauf urgence ou manquement grave ;
- de plein droit en cas de cessation du droit d'occupation du local par le Domiciliataire (vente, fin de bail, résiliation) ;
- sur décision de la Société, par déclaration de transfert du siège social.

En cas de cessation de l'autorisation, la Société s'engage à procéder sans délai aux formalités de transfert de son siège social.


Article 4 - Obligations de la Société

La Société s'engage à :

- justifier à tout moment du siège social indiqué sur son Kbis à la présente adresse ;
- recevoir et traiter diligemment toute correspondance qui lui serait adressée à ce siège ;
- ne pas exercer, à cette adresse, d'activité incompatible avec la destination du local ou la réglementation applicable (règlement de copropriété, bail, règles de voisinage) ;
- informer immédiatement le Domiciliataire de toute difficulté susceptible d'affecter l'usage du local ou la présente autorisation.


Article 5 - Usage

La présente attestation est établie pour servir et valoir ce que de droit, notamment en vue des formalités d'immatriculation ou de modification du siège social de la Société auprès du greffe du tribunal de commerce compétent.


Fait à ${data.lieu_signature}, le ${data.date_signature}.


Le Domiciliataire,


(signature précédée de la mention « Lu et approuvé »)`;
}
