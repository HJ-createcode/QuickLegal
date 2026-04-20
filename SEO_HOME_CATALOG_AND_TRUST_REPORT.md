# Rapport — Home pilier, catalogue SEO et zones de confiance

> Phase suivant le socle technique (`SEO_AUDIT_AND_TECH_BASE.md`) et la
> transformation des pages produit en landings transactionnelles
> (`SEO_PRODUCT_PAGES_REPORT.md`).
> Objet : faire de la home une vraie page pilier, du catalogue une page
> d'entrée SEO-commerciale, et poser les pages de confiance manquantes
> du site QuickLegal.

## 1. Audit initial (état avant cette phase)

### Home

Structure précédente :
1. Hero avec proposition de valeur
2. Trust bar à 4 garanties
3. Bloc de deux boutons (Comment ça marche / Génération de document)
4. Bloc crédibilité avocat
5. CTA final
6. Footer

**Faiblesses SEO** : contenu court, une seule FAQ absente, aucun maillage
vers les 13 pages produit, pas de hiérarchisation par famille, pas de
cas d'usage, pas de comparatif.

**Faiblesses conversion** : l'utilisateur qui arrive en SEO n'a pas de
preview produit, pas d'explication du positionnement (vs gratuit, vs
cabinet), pas de FAQ répondant aux objections classiques.

### Catalogue

Structure précédente : hero + grille par catégorie, cards produit.

**Faiblesses SEO** : aucune description des familles, aucune
justification de leur cohérence, aucune FAQ catalogue, pas d'ancre
navigable, pas de bloc réassurance.

### Pages de confiance

**État** : aucune page légale ni page d'information ne préexistait. Le
footer ne contenait aucun lien vers ces pages (parce qu'elles
n'existaient pas). Un utilisateur qui voulait vérifier qui édite le
service, qui héberge, comment sont traitées ses données, n'avait aucune
ressource.

### Navigation

- Nav top : 3 entrées (Génération, Comment ça marche, Garanties)
- Footer : brand + 13 produits + nav transversale + copyright
- Aucun lien vers mentions légales, politique de confidentialité, CGV
  du service, FAQ globale, pages méthode

## 2. Décisions d'implémentation

### Centralisation des facts

Création de `lib/site-facts.ts` — source de vérité unique pour les
informations corporate, avec un sentinel `PLACEHOLDER` rendu visiblement
comme `[à compléter : ...]` lorsqu'une donnée manque. Aucune valeur
inventée ne peut se glisser dans les pages légales.

### Ton et cadrage

Sobre, premium, factuel. Pas de chiffre client, pas de nom d'équipe,
pas d'avocat nommé individuellement. Reprise de l'existant pour les
claims (« rédigé par des juristes, revu par un avocat d'affaires
inscrit au Barreau de Paris »), sans extrapolation.

### Positionnement préservé

Chaque page reprend les quatre marqueurs voulus :
- documents juridiques sérieux (méthode + revue avocat)
- pour le droit français (mention explicite)
- en quelques minutes (10 minutes, affiché)
- sans abonnement (mention explicite + CGV)
- premium accessible (comparatif prix entre gratuit et cabinet)
- made in France dans sa lecture défendable (droit français, juristes,
  avocat au Barreau de Paris)
- pas low-cost, pas faux cabinet d'avocat : tableau comparatif explicite
  qui positionne QuickLegal entre les deux, avec la phrase
  « QuickLegal n'est pas un cabinet d'avocats et ne fournit pas de
  consultation personnalisée »

## 3. Refonte de la home

### Nouvelles sections livrées

1. **Hero** — valeur prop claire, deux CTAs (catalogue, méthode),
   ligne de réassurance incluant la fourchette de prix calculée
   automatiquement depuis le registry (de 9 € à 89 €).
2. **Catégories** — 4 cards correspondant aux 4 familles du catalogue,
   chacune avec byline + description + aperçu des 4 premiers documents
   + lien vers la catégorie.
3. **Documents les plus demandés** — 6 cards flagship (SAS, SCI, CGV,
   NDA, PV AGO, Mentions légales), chacun linkable vers sa page produit.
4. **Comment ça marche** — 3 étapes (répondre, payer, télécharger),
   lien vers `/comment-ca-marche` pour la méthode détaillée.
5. **Pourquoi QuickLegal** — 6 cards factuelles avec `id="garanties"`
   (préservation du lien d'ancrage historique) + CTA vers la méthode et
   la politique éditoriale.
6. **Entre le modèle gratuit et le cabinet** — tableau comparatif à 4
   colonnes (critère, gratuit, QuickLegal, cabinet) avec 7 lignes
   (rédaction, personnalisation, délai, prix, mises à jour, conseil
   personnalisé, accès au document) + disclaimer « QuickLegal n'est pas
   un cabinet d'avocats ».
7. **Cas d'usage** — 4 cards concrètes : créer une SAS entre associés,
   monter une SCI familiale, tenir l'AG annuelle, lancer une boutique
   en ligne. Chaque cas lie vers 2 à 4 pages produit.
8. **FAQ home** — 8 questions, rendues en `<details>` natif + schema
   FAQPage.
9. **CTA final** vers le catalogue.

### Maillage interne de la home

- 4 liens vers `/generation-document` (hero, catégories, documents
  phares, CTA final)
- 6 liens vers les landings produit (documents phares)
- 13 liens indirects vers les landings produit (via les cas d'usage et
  les aperçus de catégories)
- 1 lien vers `/comment-ca-marche`
- 1 lien vers `/notre-methode`
- 1 lien vers `/comment-nous-redigeons`
- 1 lien vers `/faq`

### Structured data home

- Organization (hérité du layout racine)
- WebSite
- FAQPage (8 Q/R)

## 4. Refonte du catalogue

### Nouvelles sections

1. **Hero** avec fil d'Ariane, byline, H1, résumé, fourchette de prix,
   **barre d'ancres** vers chaque catégorie (`#statuts`,
   `#gouvernance`, `#commercial`, `#conformite`).
2. **Trust bar** 4 items : revus au Barreau, conformes RGPD, sans
   abonnement, accessibles à vie.
3. **Sections par catégorie** — chaque catégorie a désormais son propre
   bloc :
   - byline + H2 + description
   - liste des cas d'usage typiques à droite
   - grille de cards produit cliquables (la carte entière est un lien)
4. **Bloc « Promesse éditoriale »** — 3 CTAs vers `/notre-methode`,
   `/comment-nous-redigeons`, `/faq`.
5. **FAQ catalogue** — 4 questions spécifiques (comment choisir, prix
   affichés, régénérer, évolution du catalogue) + schema FAQPage.

### Structured data catalogue

- BreadcrumbList
- CollectionPage contenant un `mainEntity: ItemList` avec les 13 URLs
  produit (`@type: ListItem` avec `url` et `name`, numérotées)
- FAQPage

### Scalabilité

Ajouter un nouveau produit au registry le publie automatiquement sur le
catalogue — dans sa catégorie — sans toucher au code de la page. Les
cards, la grille et le schema `ItemList` se mettent à jour.

## 5. Pages de confiance créées

### Composants partagés

- `components/TrustPageLayout.tsx` — chrome commune : SiteNav, fil
  d'Ariane, hero avec eyebrow/title/subtitle/lastUpdated, conteneur
  prose, SiteFooter.
- `<TrustSection>` — h2 + corps avec interlignage prose.
- `<TodoMark label="…">` — badge jaune visible pour tout placeholder
  non rempli (raison sociale, SIRET, adresse, email de contact…).

### Pages créées

| Route | Contenu | Placeholders présents |
|---|---|---|
| `/mentions-legales` | Éditeur, direction publication, hébergeur, PI, données, médiation, juridiction | Raison sociale, forme, capital, SIREN, SIRET, RCS, TVA, siège, directeur publication, email, téléphone |
| `/politique-de-confidentialite` | Responsable, données collectées, finalités, destinataires, transferts, durées, droits, sécurité | Raison sociale, email DPO |
| `/cgv` (CGV du service QuickLegal) | Vendeur, objet, prix (tableau généré depuis le registry), commande, livraison, rétractation art. L.221-28 13°, portée, responsabilité, données, médiation, droit applicable | Raison sociale, email support |
| `/cookies` | Qu'est-ce qu'un cookie, cookies utilisés (session/auth/CSRF/Stripe), audience (indique absence actuelle), stockage local, gestion préférences | Email contact données |
| `/faq` | FAQ globale structurée en 5 groupes (service, produits, paiement, sécurité, comparaison cabinet), 20 questions au total + schema FAQPage | Aucun |
| `/notre-methode` | 6 sections : besoin, questionnaire, moteur, revue avocat, ce que nous ne faisons pas, ce que vous pouvez attendre | Aucun |
| `/comment-nous-redigeons` | 6 sections : origine des trames, clauses paramétrables, langage clair, revue avocat, cycle de mise à jour, confidentialité | Aucun |

### Page « Qui sommes-nous »

Non créée, conformément à la consigne — aucune donnée factuelle
suffisante dans le projet (pas d'équipe nommée, pas de biographie
vérifiable). La page `/notre-methode` et `/comment-nous-redigeons`
couvrent déjà l'équivalent narratif sans invention.

## 6. Footer enrichi

Nouveau footer en trois rangs :

1. **Rang principal** : brand + support + 4 colonnes produits (une par
   catégorie, avec tous les documents de la famille listés).
2. **Rang secondaire** : 4 colonnes — Catalogue (toutes les catégories,
   ancres directes), Informations (Comment ça marche, Notre méthode,
   Comment nous rédigeons, FAQ), Légal (Mentions légales, CGV,
   Politique de confidentialité, Cookies), Mon espace (Connexion,
   Signup, Dashboard).
3. **Rang bas** : copyright + disclaimer rappelant qu'il ne s'agit pas
   d'un cabinet.

Le support email n'apparaît que si l'utilisateur a rempli la facts-lib
— sinon il reste invisible (jamais de `[à compléter]` dans le footer,
qui est une zone de confiance et pas une page légale).

## 7. Sitemap mis à jour

25 URLs publiées, réparties :
- 1 home
- 1 catalogue
- 4 pages info (comment-ca-marche, notre-methode, comment-nous-redigeons, faq)
- 4 pages légales (mentions-legales, cgv, politique-de-confidentialite, cookies)
- 13 landings produit
- 2 auth (login, signup)

Avant cette phase : 18 URLs (pas de légal, pas d'info étendu). Les URLs
`/commencer` × 13 restent délibérément hors sitemap (noindex en place).

## 8. Liste des fichiers modifiés ou créés

### Créés (12)

| Fichier | Rôle |
|---|---|
| `lib/site-facts.ts` | Source unique des facts corporate + helpers placeholders |
| `lib/category-content.ts` | Byline, description et cas d'usage de chaque catégorie |
| `components/TrustPageLayout.tsx` | Chrome commune des pages de confiance |
| `app/mentions-legales/page.tsx` | Mentions légales conformes LCEN |
| `app/politique-de-confidentialite/page.tsx` | Politique RGPD complète |
| `app/cgv/page.tsx` | CGV du service QuickLegal (vente de documents) |
| `app/cookies/page.tsx` | Politique de cookies |
| `app/faq/page.tsx` | FAQ globale 20 Q/R + FAQPage schema |
| `app/notre-methode/page.tsx` | Méthode complète du parcours |
| `app/comment-nous-redigeons/page.tsx` | Politique éditoriale détaillée |
| `SEO_HOME_CATALOG_AND_TRUST_REPORT.md` | Ce rapport |

### Modifiés (4)

| Fichier | Modification |
|---|---|
| `app/page.tsx` | Refonte complète : 9 sections, maillage vers tous les clusters, FAQPage schema, tableau comparatif |
| `app/generation-document/page.tsx` | Refonte complète : fil d'Ariane, barre d'ancres, 4 sections catégorie enrichies, bloc promesse éditoriale, FAQ catalogue, ItemList schema |
| `components/SiteFooter.tsx` | Ajout des liens vers les 4 pages info, les 4 pages légales et le catalogue par catégorie. Email support affiché si configuré |
| `app/sitemap.ts` | Ajout des 7 nouvelles pages de confiance et d'info |

## 9. Mapping ancien / nouveau maillage

### Home

| Avant | Après |
|---|---|
| 2 liens internes : `/generation-document`, `/comment-ca-marche` | ≈20 liens internes couvrant 13 landings produit, 1 catalogue, 4 pages info, 1 ancre garanties |
| 1 seule FAQ implicite | FAQPage structurée (8 Q/R) + renvoi vers FAQ globale 20 Q/R |
| Aucun comparatif | Tableau 7 critères × 3 positionnements |
| Aucun cas d'usage | 4 cas d'usage avec 2-4 liens produits chacun |

### Catalogue

| Avant | Après |
|---|---|
| Pas de description par catégorie | 4 blocs complets (byline + description + cas d'usage) |
| Cards statiques | Cards entièrement cliquables, design renforcé |
| Pas d'ancres | Barre d'ancres au-dessus du fold |
| Pas de FAQ | 4 questions catalogue + FAQPage schema |

### Footer

| Avant | Après |
|---|---|
| 4 colonnes produits + 4 liens transversaux | 4 colonnes produits + 4 colonnes secondaires (catalogue/info/légal/espace) + email support (si rempli) |
| Aucun lien légal | 4 liens légaux |
| Aucun lien méthode ou FAQ | 4 liens info |

## 10. Points à valider humainement

### Bloquant pour mise en ligne grand public

1. **Remplir `lib/site-facts.ts`** — aujourd'hui `LEGAL.*` et `CONTACT.*`
   sont tous en `PLACEHOLDER`. Les pages `/mentions-legales`,
   `/politique-de-confidentialite`, `/cgv`, `/cookies` affichent des
   badges jaunes `[à compléter : ...]`. Une mise à jour de ce seul
   fichier cascade partout. Les champs à fournir :
   - `legalName`, `legalForm`, `capital`, `siren`, `siret`, `rcsCity`,
     `vatNumber`, `registeredOffice`, `publicationDirector`
   - `generalEmail`, `supportEmail`, `dpoEmail`, `phone`
2. **Confirmer `MEDIATOR`** — le médiateur par défaut est « CNPM -
   Médiation de la consommation ». Si la société adhère à un autre
   médiateur, remplacer le couple `name/url` dans `site-facts.ts`.

### Non-bloquant mais recommandé avant trafic payant

3. **Image Open Graph** — toujours non ajoutée. Les previews de partage
   s'afficheront sans illustration.
4. **CGV du service : renonciation au droit de rétractation** — la
   pratique actuelle du parcours de paiement ne recueille pas
   nécessairement la renonciation expresse mentionnée par l'article
   L.221-28 13° du Code de la consommation. À vérifier côté checkout
   Stripe (case à cocher dédiée sur la page `/commencer` ou équivalent).
5. **Review juridique des contenus** — la home et les pages de
   confiance contiennent des références textuelles (articles du Code,
   obligations RGPD). Relecture par un juriste/avocat avant
   publication commerciale recommandée, en particulier :
   - renonciation au droit de rétractation dans les CGV (art. L.221-28 13°)
   - obligation de médiation (art. L.616-1)
   - base légale du traitement et transferts hors UE dans la politique
     de confidentialité
6. **`NEXT_PUBLIC_APP_URL` toujours vide sur Vercel** — les canonicals
   et les URLs des Open Graph pointent vers `quick-legal-xi.vercel.app`.
   À remplir au moment du passage sur un domaine propre.

### Reporté aux prochaines phases

- Page « Qui sommes-nous » : restée en suspens par choix éditorial
  (aucune donnée factuelle vérifiable). À créer quand l'équipe est
  nommée ou quand l'avocat revue accepte d'apparaître.
- Témoignages / preuves sociales — aucun ajout tant que les avis
  clients ne sont pas disponibles.
- Bannière de consentement cookies si un outil d'audience est déployé
  (actuellement aucun, la politique en tient compte).
- Blog éditorial `/blog` pour des articles de fond — hors scope cette
  phase.

## 11. Contrôles effectués

```bash
rm -rf .next
npx tsc --noEmit                             # 0 erreur
npx next build                               # succès, 48 pages prérendues
npx eslint app lib components                # 6 erreurs préexistantes inchangées
```

### Vérification live

```
curl -o/dev/null -w "%{http_code}" http://localhost:3000/
/                                 HTTP 200
/generation-document              HTTP 200
/mentions-legales                 HTTP 200
/politique-de-confidentialite     HTTP 200
/cgv                              HTTP 200
/cookies                          HTTP 200
/faq                              HTTP 200
/notre-methode                    HTTP 200
/comment-nous-redigeons           HTTP 200
```

Sitemap : 25 URLs.

JSON-LD présent sur la home : `ld-website`, `ld-faq`, `ld-organization`.
JSON-LD sur le catalogue : `ld-breadcrumb`, `ld-collection` (avec
ItemList de 13 produits), `ld-faq`.

Metadata par page (title, description, canonical, OG, Twitter) vérifiés
sur home et pages de confiance.

Maillage home → catalogue → pages produit → pages clés confirmé : la
home renvoie vers toutes les catégories et vers 6 landings produit
flagship ; le catalogue renvoie vers les 13 landings ; le footer
couvre les 13 landings + les 4 pages info + les 4 pages légales.
