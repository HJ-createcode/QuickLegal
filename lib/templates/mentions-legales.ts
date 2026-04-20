import type { MentionsLegalesData } from "@/lib/questionnaire-configs/mentions-legales";

function ifTxt(label: string, value: string | number | undefined | null): string {
  if (value == null || value === "") return "";
  return `${label} : ${value}`;
}

export function generateMentionsLegales(data: MentionsLegalesData): string {
  const identiteParts: string[] = [];

  if (data.forme_editeur === "societe") {
    if (data.forme_juridique) identiteParts.push(`Forme juridique : ${data.forme_juridique}`);
    if (data.capital_social) {
      identiteParts.push(`Capital social : ${Number(data.capital_social).toLocaleString("fr-FR")} €`);
    }
  } else if (data.forme_editeur === "association") {
    identiteParts.push("Statut : Association loi 1901");
  } else {
    identiteParts.push("Statut : Entrepreneur individuel");
  }

  const content = `MENTIONS LÉGALES

Conformément aux articles 6-III et 19 de la loi n° 2004-575 du 21 juin 2004 pour la Confiance dans l'Économie Numérique (LCEN) et aux articles L.111-1 et suivants du Code de la consommation, les utilisateurs du site ${data.site_url} sont informés de l'identité des différents intervenants dans le cadre de sa réalisation et de son suivi.


Article 1 - Éditeur du site

Le site ${data.site_url} est édité par :

${data.denomination}
${identiteParts.join("\n")}
Siège social : ${data.siege_social}
Numéro d'identification (SIREN / SIRET) : ${data.siren}
${data.rcs_ville ? `Immatriculation au RCS de ${data.rcs_ville}` : ""}
${ifTxt("Numéro de TVA intracommunautaire", data.tva_intra)}


Article 2 - Direction de la publication

Directeur de la publication : ${data.directeur_publication}

Email de contact : ${data.email_contact}
${ifTxt("Téléphone", data.telephone_contact)}


Article 3 - Hébergeur

Le site est hébergé par :

${data.hebergeur_nom}
Adresse : ${data.hebergeur_adresse}
${ifTxt("Téléphone", data.hebergeur_telephone)}

${
  data.activite_reglementee
    ? `
Article 4 - Profession réglementée

L'éditeur exerce une activité réglementée.
${ifTxt("Organisme professionnel", data.ordre_nom)}
${ifTxt("Numéro d'inscription", data.ordre_numero)}

Les règles professionnelles et déontologiques applicables sont consultables auprès de l'organisme susmentionné.

`
    : ""
}
Article ${data.activite_reglementee ? "5" : "4"} - Propriété intellectuelle

L'ensemble du contenu du site ${data.site_url}, sans que cette énumération soit limitative, notamment les textes, graphismes, logos, icônes, images, vidéos, sons, ainsi que leur mise en forme, sont la propriété exclusive de ${data.denomination} ou de ses partenaires, et sont protégés par les lois françaises et internationales relatives à la propriété intellectuelle.

Toute reproduction, représentation, modification, publication, adaptation ou exploitation, totale ou partielle, de l'un quelconque de ces éléments, par quelque procédé que ce soit, sans l'autorisation préalable et écrite de ${data.denomination}, est interdite et constitue une contrefaçon sanctionnée par les articles L.335-2 et suivants du Code de la propriété intellectuelle.


Article ${data.activite_reglementee ? "6" : "5"} - Données personnelles

Le traitement des données personnelles collectées sur le site ${data.site_url} est régi par la politique de confidentialité de ${data.denomination}, accessible depuis le pied de page du site.

Conformément au Règlement (UE) 2016/679 (RGPD) et à la loi n° 78-17 du 6 janvier 1978 modifiée, les utilisateurs disposent d'un droit d'accès, de rectification, d'effacement, de limitation du traitement, d'opposition et à la portabilité de leurs données. Ces droits peuvent être exercés à l'adresse : ${data.email_contact}.

Toute réclamation peut être adressée à la Commission Nationale de l'Informatique et des Libertés (CNIL).


Article ${data.activite_reglementee ? "7" : "6"} - Cookies

Le site ${data.site_url} est susceptible d'utiliser des cookies. Pour toute information concernant la nature des cookies déposés, leur finalité et la durée de leur conservation, l'utilisateur peut consulter la politique de cookies du site.

${
  data.mediation_applicable && data.mediateur_nom
    ? `
Article ${data.activite_reglementee ? "8" : "7"} - Médiation de la consommation

Conformément aux articles L.611-1 à L.616-3 et R.612-1 à R.616-2 du Code de la consommation, ${data.denomination} adhère au service du médiateur de la consommation suivant :

${data.mediateur_nom}
${ifTxt("Site internet", data.mediateur_url)}

Tout litige de nature contractuelle, opposant un consommateur à ${data.denomination} et n'ayant pu être résolu dans le cadre d'une réclamation préalablement introduite auprès du service client, peut être soumis gratuitement à ce médiateur.

`
    : ""
}
Article ${data.activite_reglementee ? (data.mediation_applicable && data.mediateur_nom ? "9" : "8") : data.mediation_applicable && data.mediateur_nom ? "8" : "7"} - Droit applicable et juridiction compétente

Les présentes mentions légales sont régies par le droit français. En cas de litige, et après échec de toute tentative de résolution amiable, les tribunaux français seront seuls compétents, sous réserve des dispositions impératives applicables aux consommateurs.


Dernière mise à jour : ${new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}`;

  // Clean up consecutive blank lines that appear when optional blocks are skipped
  return content.replace(/\n\n\n+/g, "\n\n\n");
}
