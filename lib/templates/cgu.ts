import type { CGUData } from "@/lib/questionnaire-configs/cgu";

export function generateCGU(data: CGUData): string {
  const isB2C = data.clientele === "b2c" || data.clientele === "mixte";

  return `CONDITIONS GÉNÉRALES D'UTILISATION

Article 1 - Objet

Les présentes Conditions Générales d'Utilisation (ci-après les « CGU ») ont pour objet de définir les modalités et conditions d'utilisation du site ${data.site_url} (ci-après le « Service »), édité par ${data.denomination} (ci-après l'« Éditeur »).

Le Service a pour nature : ${data.nature_service}

Toute utilisation du Service suppose l'acceptation préalable et sans réserve des présentes CGU par l'utilisateur.


Article 2 - Acceptation et modification

L'accès au Service emporte acceptation pleine et entière des présentes CGU. L'Éditeur se réserve la faculté de modifier les CGU à tout moment ; les modifications sont opposables à l'utilisateur dès leur publication sur le site. L'utilisateur est invité à consulter régulièrement la dernière version des CGU, accessible en permanence depuis le pied de page du Service.


${
  data.inscription_requise
    ? `Article 3 - Accès au Service et création de compte

L'accès à tout ou partie du Service nécessite la création d'un compte utilisateur. L'utilisateur s'engage à fournir des informations exactes, complètes et à jour lors de son inscription, et à maintenir ces informations à jour.

Les identifiants de connexion (email et mot de passe) sont strictement personnels et confidentiels. L'utilisateur est seul responsable de l'usage qui est fait de son compte et des conséquences qui en découlent. Toute utilisation non autorisée du compte doit être immédiatement signalée à l'Éditeur à l'adresse ${data.email_contact}.

L'Éditeur se réserve le droit de suspendre ou résilier tout compte en cas de manquement aux présentes CGU, sans préjudice de tous dommages et intérêts.

`
    : `Article 3 - Accès au Service

L'accès au Service est libre et ne nécessite pas la création d'un compte utilisateur, sauf pour les fonctionnalités spécifiquement identifiées comme réservées.

`
}
${
  data.service_payant
    ? `Article 4 - Tarifs et modalités de paiement

${data.description_tarifs || "Certaines fonctionnalités du Service sont accessibles moyennant paiement. Les tarifs applicables sont indiqués sur la page dédiée du site, accessible avant toute souscription."}

Les tarifs sont indiqués en euros, toutes taxes comprises. Le paiement s'effectue en ligne, par les moyens proposés lors de la commande. Le Service ou la fonctionnalité payante est activé(e) après confirmation du paiement.

${
  isB2C
    ? `Conformément à l'article L.221-28 du Code de la consommation, l'utilisateur consommateur renonce expressément à son droit de rétractation lorsque l'exécution du service commence immédiatement après son acceptation. Dans les autres cas, l'utilisateur consommateur dispose d'un délai de 14 jours à compter de la souscription pour exercer son droit de rétractation, sauf exécution déjà intégralement effectuée.`
    : `Les présentes CGU s'adressant à des professionnels, aucun droit de rétractation n'est applicable, sauf accord contractuel particulier.`
}

`
    : ""
}
Article ${data.service_payant ? "5" : "4"} - Obligations de l'utilisateur

L'utilisateur s'engage à utiliser le Service dans le respect des présentes CGU et de l'ensemble des dispositions légales et réglementaires applicables. Il s'interdit notamment :

- d'utiliser le Service à des fins illicites, frauduleuses ou contraires à l'ordre public ;
- de porter atteinte aux droits de l'Éditeur ou de tiers, notamment aux droits de propriété intellectuelle ;
- de compromettre le fonctionnement du Service, sa sécurité ou son intégrité ;
- de tenter d'accéder sans autorisation à des données, comptes ou systèmes ;
- de collecter ou traiter des données personnelles relatives à d'autres utilisateurs sans leur consentement ;
- de publier ou transmettre tout contenu illégal, diffamatoire, injurieux, discriminatoire, à caractère pornographique ou pédopornographique, incitant à la haine ou à la violence, ou portant atteinte à la vie privée.

${
  data.contenu_utilisateurs
    ? `
Article ${data.service_payant ? "6" : "5"} - Contenu publié par les utilisateurs

L'utilisateur reste seul titulaire des droits de propriété intellectuelle sur les contenus qu'il publie via le Service. Il concède toutefois à l'Éditeur une licence non exclusive, mondiale, à titre gratuit, pour toute la durée légale de protection, lui permettant d'héberger, de reproduire et de représenter les contenus strictement aux fins de fonctionnement du Service.

L'utilisateur garantit à l'Éditeur qu'il dispose de l'ensemble des droits nécessaires sur les contenus qu'il publie et l'indemnise de toute réclamation de tiers à ce titre.

L'Éditeur se réserve le droit, sans y être tenu, de retirer tout contenu manifestement illicite, de restreindre l'accès à ce contenu et de suspendre l'auteur du contenu, conformément à l'article 6 de la loi pour la Confiance dans l'Économie Numérique.

`
    : ""
}
Article ${(data.service_payant ? 6 : 5) + (data.contenu_utilisateurs ? 1 : 0)} - Propriété intellectuelle

Le Service, son architecture, son contenu éditorial, ses marques, logos, graphismes, interfaces et textes sont la propriété exclusive de l'Éditeur ou de tiers lui ayant concédé les droits correspondants. Toute reproduction, représentation, adaptation, modification, publication ou exploitation, totale ou partielle, par quelque procédé que ce soit, sans autorisation préalable et écrite de l'Éditeur, est interdite et constitue une contrefaçon au sens des articles L.335-2 et suivants du Code de la propriété intellectuelle.


Article ${(data.service_payant ? 7 : 6) + (data.contenu_utilisateurs ? 1 : 0)} - Responsabilité et disponibilité

L'Éditeur met en œuvre les moyens raisonnables pour assurer la disponibilité, la continuité et la sécurité du Service. Il ne peut toutefois garantir l'absence d'interruption, ni que le Service fonctionnera sans erreur.

${
  isB2C
    ? `L'Éditeur est responsable de plein droit à l'égard du consommateur de la bonne exécution des obligations résultant du contrat conclu à distance, conformément à l'article L.221-15 du Code de la consommation. Il peut s'exonérer de tout ou partie de sa responsabilité en apportant la preuve que l'inexécution ou la mauvaise exécution du contrat est imputable soit à l'utilisateur, soit au fait, imprévisible et insurmontable, d'un tiers étranger à la fourniture des services, soit à un cas de force majeure.`
    : `La responsabilité de l'Éditeur ne saurait être engagée qu'en cas de faute prouvée, exclusivement pour les dommages directs et prévisibles. Elle est en tout état de cause plafonnée, pour l'ensemble des réclamations sur une même année, au montant des sommes effectivement versées par l'utilisateur à l'Éditeur au titre des douze derniers mois.`
}


Article ${(data.service_payant ? 8 : 7) + (data.contenu_utilisateurs ? 1 : 0)} - Données personnelles et cookies

Les traitements de données personnelles mis en œuvre dans le cadre du Service sont décrits dans la politique de confidentialité de l'Éditeur, accessible depuis le pied de page du site. L'utilisateur dispose à tout moment des droits d'accès, de rectification, d'effacement, de limitation, d'opposition et à la portabilité prévus par le RGPD et la loi Informatique et Libertés. Ces droits peuvent être exercés à l'adresse ${data.email_contact}.

L'utilisation de cookies est encadrée par la politique de cookies du Service.


Article ${(data.service_payant ? 9 : 8) + (data.contenu_utilisateurs ? 1 : 0)} - Résiliation

${
  data.inscription_requise
    ? `L'utilisateur peut à tout moment résilier son compte, par simple demande adressée à ${data.email_contact} ou, le cas échéant, depuis l'espace de son compte.

L'Éditeur peut suspendre ou résilier l'accès au Service en cas de manquement grave ou répété aux présentes CGU, après mise en demeure restée sans effet pendant 15 jours, sauf urgence ou manquement rendant impossible la poursuite de la relation.`
    : `L'Éditeur peut à tout moment cesser l'exploitation du Service ou en modifier substantiellement les fonctionnalités. Dans la mesure du possible, un préavis raisonnable est donné aux utilisateurs.`
}


Article ${(data.service_payant ? 10 : 9) + (data.contenu_utilisateurs ? 1 : 0)} - Droit applicable et juridiction

Les présentes CGU sont régies par le droit français. En cas de litige, les parties s'efforceront de trouver une solution amiable avant toute action judiciaire.

${
  isB2C
    ? `Conformément aux articles L.611-1 et suivants du Code de la consommation, l'utilisateur consommateur peut recourir gratuitement à un médiateur de la consommation, dont les coordonnées figurent dans les mentions légales du site. Il peut également utiliser la plateforme européenne de règlement en ligne des litiges (RLL) disponible à l'adresse https://ec.europa.eu/consumers/odr.

À défaut d'accord amiable, les tribunaux français sont seuls compétents, sous réserve des règles impératives protectrices du consommateur.`
    : `À défaut de résolution amiable, tout litige sera de la compétence exclusive des tribunaux de ${data.tribunal_competent}, y compris en cas de pluralité de défendeurs ou d'appel en garantie.`
}


Dernière mise à jour : ${new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}`;
}
