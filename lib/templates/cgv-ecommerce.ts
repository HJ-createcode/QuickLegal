import type { CGVEcommerceData } from "@/lib/questionnaire-configs/cgv-ecommerce";

export function generateCGVEcommerce(data: CGVEcommerceData): string {
  const today = new Date();
  const dateStr = today.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  const formeLabels: Record<string, string> = {
    sas: "Société par Actions Simplifiée (SAS)",
    sarl: "Société à Responsabilité Limitée (SARL)",
    sasu: "Société par Actions Simplifiée Unipersonnelle (SASU)",
    eurl: "Entreprise Unipersonnelle à Responsabilité Limitée (EURL)",
    sa: "Société Anonyme (SA)",
    ei: "Entreprise Individuelle",
    autre: "société",
  };
  const forme = formeLabels[data.forme_juridique] || "société";
  const isConsumer = data.clientele === "b2c" || data.clientele === "mixte";
  const retractation = data.duree_retractation || "14";

  const content = `CONDITIONS GÉNÉRALES DE VENTE

${data.denomination.toUpperCase()}

En vigueur au ${dateStr}



ARTICLE 1 - IDENTIFICATION DU VENDEUR

Les présentes Conditions Générales de Vente (ci-après les « CGV ») sont conclues entre :

${data.denomination.toUpperCase()}, ${forme}${data.capital_social ? ` au capital social de ${Number(data.capital_social).toLocaleString("fr-FR")} euros` : ""}, immatriculée au Registre du Commerce et des Sociétés de ${data.rcs} sous le numéro SIRET ${data.siret}${data.tva_intracom ? `, numéro de TVA intracommunautaire ${data.tva_intracom}` : ""}, dont le siège social est situé ${data.siege_social}, ci-après dénommée « le Vendeur »,

exploitant le site internet accessible à l'adresse ${data.site_url} (ci-après « le Site »),

et toute personne, physique ou morale, procédant à l'achat de produits ou services sur le Site, ci-après dénommée « le Client ».

Service client : ${data.email_contact}${data.telephone ? ` — ${data.telephone}` : ""}.


ARTICLE 2 - OBJET

Les présentes CGV ont pour objet de définir les droits et obligations des parties dans le cadre de la vente en ligne de produits et/ou services proposés par le Vendeur sur le Site.

Le Client déclare avoir pris connaissance et accepté les présentes CGV avant la passation de sa commande. La validation de la commande vaut acceptation sans restriction ni réserve des présentes CGV.


ARTICLE 3 - PRODUITS

Les produits proposés à la vente sont ceux figurant sur le Site, dans la limite des stocks disponibles. Le Vendeur se réserve le droit, à tout moment et sans préavis, de modifier l'offre de produits.

Les produits commercialisés sont : ${data.type_produits}.

Les photographies et visuels illustrant les produits ne sont pas contractuels. Le Vendeur s'efforce de présenter au mieux les caractéristiques essentielles des produits.


ARTICLE 4 - PRIX

Les prix des produits sont indiqués en euros toutes taxes comprises (TTC), hors frais de livraison. Les frais de livraison sont précisés avant la validation de la commande et facturés en sus.

Le Vendeur se réserve le droit de modifier ses prix à tout moment. Les produits seront facturés au prix en vigueur au moment de l'enregistrement de la commande.

En cas de commande à destination d'un pays extérieur à l'Union Européenne, des droits de douane et taxes locales peuvent être dus par le Client.


ARTICLE 5 - COMMANDE

5.1 Processus de commande

Le Client sélectionne les produits qu'il souhaite acheter, les ajoute à son panier, puis valide sa commande après avoir :
- Vérifié le contenu de son panier et les informations renseignées ;
- Accepté les présentes CGV en cochant la case prévue à cet effet ;
- Procédé au paiement.

5.2 Confirmation

Le Vendeur adresse au Client, par courrier électronique, une confirmation de sa commande récapitulant les produits commandés, les prix, les modalités de livraison et les présentes CGV.

5.3 Refus de commande

Le Vendeur se réserve le droit de refuser toute commande en cas de litige antérieur, de rupture de stock, de prix manifestement erroné, ou pour tout motif légitime.


ARTICLE 6 - PAIEMENT

Le paiement s'effectue en ligne, au moment de la commande, par les moyens suivants : ${data.moyens_paiement}.

Les paiements par carte bancaire sont sécurisés par un prestataire de paiement certifié PCI-DSS. Le Vendeur n'a à aucun moment connaissance des données bancaires du Client.

La commande n'est enregistrée qu'après encaissement effectif du paiement.


ARTICLE 7 - LIVRAISON

7.1 Zones de livraison

Les produits sont livrés à l'adresse indiquée par le Client lors de la commande. Les zones de livraison desservies sont : ${
    {
      france: "France métropolitaine",
      france_corse: "France métropolitaine et Corse",
      france_domtom: "France (métropole, Corse, DOM-TOM)",
      ue: "Union Européenne",
      monde: "International (monde entier)",
    }[data.zones_livraison] || "France métropolitaine"
  }.

7.2 Délais

Le délai moyen de livraison est de ${data.delai_livraison} à compter de la confirmation de la commande. Ce délai est donné à titre indicatif.

En cas de retard de livraison de plus de sept (7) jours par rapport au délai indicatif, le Client peut, après avoir mis en demeure le Vendeur de livrer dans un délai raisonnable, résoudre le contrat et obtenir le remboursement des sommes versées.

7.3 Risques

Le risque de perte ou d'endommagement du produit est transféré au Client au moment où celui-ci prend physiquement possession du produit.

${
  isConsumer
    ? `\nARTICLE 8 - DROIT DE RÉTRACTATION

Conformément aux articles L. 221-18 et suivants du Code de la consommation, le Client consommateur dispose d'un délai de ${retractation} jours à compter de la réception du produit pour exercer son droit de rétractation, sans avoir à justifier de motifs ni à payer de pénalités.

Pour exercer ce droit, le Client doit notifier sa décision au Vendeur par une déclaration dénuée d'ambiguïté (lettre recommandée avec avis de réception ou email à ${data.email_contact}), en utilisant le formulaire type de rétractation mis à sa disposition ou par toute autre forme de déclaration expresse.

Les produits doivent être retournés en parfait état, dans leur emballage d'origine, accompagnés de la facture, dans un délai de quatorze (14) jours à compter de la notification de la rétractation. Les frais de retour restent à la charge du Client.

Le Vendeur remboursera au Client l'intégralité des sommes versées, y compris les frais de livraison standard, dans un délai de quatorze (14) jours à compter de la récupération des produits ou de la preuve de leur expédition.

Exclusions : conformément à l'article L. 221-28 du Code de la consommation, le droit de rétractation ne s'applique pas notamment aux biens confectionnés sur mesure, aux biens périssables, aux biens scellés ouverts après livraison pour des raisons d'hygiène, ni aux contenus numériques exécutés après accord exprès du Client.\n\n`
    : ""
}
ARTICLE ${isConsumer ? "9" : "8"} - GARANTIES

Les produits vendus bénéficient de plein droit des garanties légales suivantes, indépendamment de toute garantie commerciale :

- La garantie légale de conformité (articles L. 217-3 et suivants du Code de la consommation) : le Vendeur répond des défauts de conformité existants à la délivrance pendant une durée de deux (2) ans à compter de cette date. Le Client peut obtenir la réparation ou le remplacement du produit, ou, à défaut, le remboursement ou une réduction du prix.

- La garantie des vices cachés (articles 1641 et suivants du Code civil) : le Vendeur garantit les défauts cachés rendant le produit impropre à sa destination, dans un délai de deux (2) ans à compter de la découverte du vice.

Toute demande au titre de ces garanties doit être adressée à : ${data.email_contact}.


ARTICLE ${isConsumer ? "10" : "9"} - RESPONSABILITÉ

Le Vendeur est responsable de plein droit à l'égard du Client de la bonne exécution des obligations résultant du contrat conclu à distance.

Toutefois, le Vendeur peut s'exonérer de tout ou partie de sa responsabilité en apportant la preuve que l'inexécution ou la mauvaise exécution du contrat est imputable soit au Client, soit au fait, imprévisible et insurmontable, d'un tiers étranger à la fourniture des prestations, soit à un cas de force majeure.


ARTICLE ${isConsumer ? "11" : "10"} - PROPRIÉTÉ INTELLECTUELLE

L'ensemble des éléments du Site (textes, images, logos, marques, logiciels) est protégé par le droit de la propriété intellectuelle et reste la propriété exclusive du Vendeur ou de ses ayants droit.

Toute reproduction, représentation, modification ou adaptation, totale ou partielle, de ces éléments est strictement interdite sans l'autorisation écrite préalable du Vendeur.


ARTICLE ${isConsumer ? "12" : "11"} - DONNÉES PERSONNELLES (RGPD)

12.1 Responsable de traitement

Le Vendeur, en sa qualité de responsable de traitement, collecte et traite les données personnelles du Client conformément au Règlement (UE) 2016/679 du 27 avril 2016 (« RGPD ») et à la loi n° 78-17 du 6 janvier 1978 modifiée.

12.2 Données collectées

Les données collectées sont notamment : identité (nom, prénom), coordonnées (adresse postale, email, téléphone), informations de commande et de facturation, historique de navigation (cookies, le cas échéant).

12.3 Finalités et bases légales

Les données sont traitées pour les finalités suivantes :
- Traitement et suivi des commandes, livraisons et facturations (base légale : exécution du contrat — article 6.1.b du RGPD) ;
- Respect des obligations comptables, fiscales et légales (base légale : obligation légale — article 6.1.c du RGPD) ;
- Prospection commerciale sur les produits du Vendeur (base légale : intérêt légitime — article 6.1.f du RGPD, avec droit d'opposition) ;
- Mesure d'audience et amélioration du Site (base légale : consentement — article 6.1.a du RGPD).

12.4 Destinataires

Les données sont destinées aux services internes du Vendeur habilités à en connaître, ainsi qu'à ses sous-traitants (prestataires de paiement, transporteurs, hébergeur, prestataires marketing). Aucune donnée n'est cédée ou vendue à des tiers à des fins commerciales.

12.5 Durée de conservation

Les données relatives aux commandes et à la facturation sont conservées pendant ${data.duree_conservation_commandes || 10} ans conformément aux obligations comptables. Les données de prospection sont conservées pendant trois (3) ans à compter du dernier contact.

12.6 Transferts hors Union Européenne

Si un transfert de données vers un pays hors Union Européenne est nécessaire, il est encadré par les garanties appropriées (clauses contractuelles types de la Commission européenne, décision d'adéquation, ou toute autre garantie prévue par le RGPD).

12.7 Droits du Client

Conformément au RGPD, le Client dispose des droits suivants : accès, rectification, effacement, limitation du traitement, opposition, portabilité des données, et retrait du consentement à tout moment.

Ces droits peuvent être exercés en écrivant à : ${data.dpo_email || data.email_contact}.

Le Client dispose également du droit d'introduire une réclamation auprès de la Commission Nationale de l'Informatique et des Libertés (CNIL) — www.cnil.fr.

${
  data.utilise_cookies
    ? `12.8 Cookies

Le Site utilise des cookies techniques nécessaires à son fonctionnement ainsi que, sous réserve du consentement du Client, des cookies de mesure d'audience et publicitaires. Le Client peut à tout moment modifier ses préférences via le bandeau de gestion des cookies accessible en bas de chaque page.\n\n`
    : ""
}
ARTICLE ${isConsumer ? "13" : "12"} - MÉDIATION DE LA CONSOMMATION

${
  isConsumer
    ? `Conformément à l'article L. 612-1 du Code de la consommation, en cas de litige non résolu avec le service client, le Client consommateur peut recourir gratuitement au médiateur de la consommation suivant :

${data.mediateur_nom}
${data.mediateur_url}

Le Client peut également recourir à la plateforme européenne de règlement en ligne des litiges (RLL) : https://ec.europa.eu/consumers/odr.\n\n`
    : `Les présentes CGV étant conclues entre professionnels, les dispositions relatives à la médiation de la consommation ne s'appliquent pas. En cas de litige, les parties s'efforceront, préalablement à toute action contentieuse, de rechercher une solution amiable.\n\n`
}
ARTICLE ${isConsumer ? "14" : "13"} - DROIT APPLICABLE ET JURIDICTION

Les présentes CGV sont soumises au droit français.

${
  isConsumer
    ? `Tout litige relatif à leur interprétation ou exécution relève de la compétence des tribunaux français. Le Client consommateur peut saisir, à son choix, la juridiction du lieu où il demeurait au moment de la conclusion du contrat ou de la survenance du fait dommageable.`
    : `Tout litige relatif à leur interprétation ou exécution relève de la compétence exclusive du Tribunal de Commerce de ${data.tribunal_competent}, y compris en cas de pluralité de défendeurs ou d'appel en garantie.`
}


ARTICLE ${isConsumer ? "15" : "14"} - DISPOSITIONS FINALES

Si une ou plusieurs stipulations des présentes CGV sont tenues pour non valides ou déclarées comme telles par application d'une loi, d'un règlement ou d'une décision définitive d'une juridiction compétente, les autres stipulations conservent toute leur force et leur portée.

Le fait pour le Vendeur de ne pas se prévaloir à un moment donné d'une disposition des présentes CGV ne peut être interprété comme une renonciation à s'en prévaloir ultérieurement.


Fait le ${dateStr}
`;

  return content;
}
