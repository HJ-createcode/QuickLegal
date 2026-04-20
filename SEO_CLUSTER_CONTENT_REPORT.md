# Rapport — Clusters éditoriaux SEO

> Phase suivant le socle technique, les landings produit et la refonte
> home/catalogue/confiance. Objet : créer une couche éditoriale utile
> pour couvrir les intentions informationnelles et décisionnelles, sans
> cannibaliser les pages produit transactionnelles.

## 1. Audit éditorial

### Ce qui existait avant cette phase

- 13 landings produit `/documents/<slug>` — intention transactionnelle
- Home, catalogue, comment ça marche, notre méthode, comment nous
  rédigeons, FAQ globale — intentions de navigation et de confiance
- Mentions légales, CGV service, politique confidentialité, cookies —
  intentions de conformité
- Rien sur les intentions décisionnelles (« SAS vs SASU »),
  comparatives (« CGV vs CGU »), coûts (« combien coûte »), ou
  méta-comparatives (« avocat vs legaltech »)

### Trous majeurs identifiés

Par famille :

**Création de société** : aucun comparatif SAS/SASU, aucun guide SCI
IR/IS, aucun guide coût, aucune explication structurée sur la
domiciliation.

**Gouvernance & vie sociale** : aucun comparatif AGO/AGE (alors que
c&apos;est la confusion la plus courante chez les utilisateurs non
juristes).

**Contrats commerciaux** : aucun guide de choix NDA unilatéral /
bilatéral.

**Conformité & mentions légales** : aucun document qui explique les
trois documents web majeurs (CGV / CGU / mentions légales) en un seul
endroit.

**Transverse** : aucun guide pour positionner QuickLegal par rapport
aux alternatives — modèle gratuit ou avocat.

### Potentiel business par type de guide

| Guide potentiel | Volume estimé | Intent | Proximité conversion |
|---|---|---|---|
| SAS vs SASU | Très élevé | Décisionnel | Haute |
| SCI IR ou IS | Élevé | Décisionnel | Haute |
| Combien coûte la création d&apos;une SAS | Très élevé | Commercial | Très haute |
| Domiciliation siège social | Moyen | Pratique | Moyenne |
| AGO vs AGE | Moyen | Décisionnel | Haute |
| NDA unilatéral / bilatéral | Moyen | Décisionnel | Haute |
| CGV vs CGU vs mentions légales | Élevé | Décisionnel | Haute |
| Avocat vs legaltech vs gratuit | Moyen | Sélection | Très haute |

Les 8 retenus pour cette phase.

### Produits nécessitant un soutien éditorial

- **Fort** : Statuts de SAS, Statuts de SCI (volume + concurrence +
  complexité). Chaque SAS/SCI est soutenu par 2 à 3 guides cette phase.
- **Moyen** : CGV, NDA, PV AGO/AGE, Mentions légales, CGU.
- **Léger** : Attestation de domiciliation, Déclaration de
  non-condamnation, Convocation AG, Ordre du jour AG, Feuille de
  présence AG — la landing dédiée suffit, sans guide autonome à fort
  volume à soutenir.

### Risques de cannibalisation — approche retenue

Pour éviter qu&apos;un guide ne prenne la place d&apos;une landing
produit sur une requête transactionnelle :

1. **Règle d&apos;intention distincte** : aucun guide n&apos;a un H1
   qui reprend le nom nu d&apos;un produit. Les titres sont comparatifs
   (« X vs Y »), interrogatifs (« combien coûte »), ou sélectionnels
   (« comment choisir »).
2. **Canonical propre à chaque URL** : `/guides/<slug>` canonical vers
   lui-même, pas vers la landing. Google voit deux entités distinctes.
3. **Maillage strict vers le produit** : chaque guide renvoie via au
   moins 3 CTA vers la(les) landing(s) correspondante(s), jamais
   l&apos;inverse dans la même direction.
4. **Tests manuels** : lecture du H1 et de la méta-description de chaque
   guide pour vérifier qu&apos;ils ne concurrencent pas le H1 de la
   landing associée.

## 2. Architecture des clusters

### URL convention

- `/guides` — pilier (hub listant tous les guides, groupés par famille)
- `/guides/<slug>` — feuilles, slug explicite de l&apos;intention

Exemples de patterns de slugs :

- Comparatifs : `sas-vs-sasu`, `sci-ir-ou-is`, `ago-vs-age`
- Coûts : `cout-creation-sas`
- Pratique : `domiciliation-siege-social`
- Sélection : `avocat-vs-legaltech-vs-gratuit`
- Différenciation : `cgv-cgu-mentions-legales-differences`

### Silos logiques (non imposés dans l&apos;URL mais visibles sur le hub)

| Silo | Guides de cette phase | Produits servis |
|---|---|---|
| Création de société | sas-vs-sasu, sci-ir-ou-is, cout-creation-sas, domiciliation-siege-social | Statuts SAS, Statuts SCI, Attestation domiciliation, Déclaration non-condamnation |
| Gouvernance & vie sociale | ago-vs-age | PV AGO, PV AGE, Convocation, Ordre du jour, Feuille de présence |
| Contrats commerciaux | nda-unilateral-ou-bilateral | NDA, CGV e-commerce |
| Conformité & mentions légales | cgv-cgu-mentions-legales-differences | Mentions légales, CGU, CGV e-commerce |
| Transverse (sélection prestataire) | avocat-vs-legaltech-vs-gratuit | Tous les produits |

### Maillage

- **Pilier `/guides` →** tous les guides, plus lien vers
  `/generation-document`
- **Chaque guide →** 1 à 3 landings produit (section « Passer à
  l&apos;action ») + 2 à 3 autres guides liés (section « À lire aussi »)
- **Chaque landing produit (déjà en place) →** pas de changement, la
  navigation inverse guide → produit est celle qui compte pour la
  conversion
- **Nav top** : ajout du lien « Guides » (entre « Catalogue » et
  « Comment ça marche »)
- **Footer** : ajout de « Guides » dans la colonne Informations

### Anti-cannibalisation (règles concrètes appliquées)

Pour chaque guide publié :

- H1 en forme de question ou de comparaison ; aucun H1 de type « Statuts
  de SAS »
- Méta-description orientée intention (« comment choisir », « combien
  coûte », « que contient ») ; jamais une promesse transactionnelle
- Canonical URL pointant vers `/guides/<slug>`
- `noindex` absent — chaque guide est pleinement indexable
- Article JSON-LD pour signaler à Google qu&apos;il s&apos;agit d&apos;un
  contenu éditorial, distinct du Product schema de la landing

## 3. Pages créées

| Route | Longueur | Structure | Schema |
|---|---|---|---|
| `/guides` (pilier) | ~350 mots | Hero + 5 sections de catégories + CTA | BreadcrumbList + CollectionPage ItemList |
| `/guides/sas-vs-sasu` | ~1 700 mots | Intro + TL;DR + 5 sections (dont tableau ligne à ligne) + FAQ 5 Q/R | Article + Breadcrumb + FAQPage |
| `/guides/sci-ir-ou-is` | ~1 700 mots | Intro + TL;DR + 6 sections (dont tableau + piège plus-value) + FAQ | Article + Breadcrumb + FAQPage |
| `/guides/cout-creation-sas` | ~1 800 mots | Intro + TL;DR + 5 sections (3 tableaux + 3 cards options) + FAQ | Article + Breadcrumb + FAQPage |
| `/guides/domiciliation-siege-social` | ~1 500 mots | Intro + TL;DR + 8 sections (tableau + détails par option) + FAQ | Article + Breadcrumb + FAQPage |
| `/guides/ago-vs-age` | ~1 700 mots | Intro + TL;DR + 7 sections (2 tableaux + listes de décisions) + FAQ | Article + Breadcrumb + FAQPage |
| `/guides/nda-unilateral-ou-bilateral` | ~1 500 mots | Intro + TL;DR + 6 sections (tableau + clauses) + FAQ | Article + Breadcrumb + FAQPage |
| `/guides/cgv-cgu-mentions-legales-differences` | ~1 700 mots | Intro + TL;DR + 6 sections (3 tableaux + 3 documents détaillés) + FAQ | Article + Breadcrumb + FAQPage |
| `/guides/avocat-vs-legaltech-vs-gratuit` | ~1 600 mots | Intro + TL;DR + 6 sections (3 cards options + tableau + grille) + FAQ | Article + Breadcrumb + FAQPage |

**Total** : ≈ 13 500 mots de contenu éditorial, réparti sur 9 URLs
(1 pilier + 8 guides).

## 4. Composants et infrastructure

### Créés

| Fichier | Rôle |
|---|---|
| `components/GuidePageLayout.tsx` | Chrome commune : nav + breadcrumb + hero + body + CTA produits + « À lire aussi » + footer + Article/Breadcrumb JSON-LD. Plus helpers `GuideSection`, `GuideCallout` |
| `lib/guides-registry.ts` | Source unique : GUIDES[], GUIDE_FAMILY_LABELS, getGuidesByFamily() |
| `app/guides/page.tsx` | Hub pilier |
| `app/guides/<8 slugs>/page.tsx` | Feuilles |
| `SEO_CLUSTER_CONTENT_REPORT.md` | Ce rapport |

### Modifiés

| Fichier | Modification |
|---|---|
| `app/sitemap.ts` | Ajout de `/guides` + des 8 URLs guides, issues du registry. 25 → 34 URLs |
| `components/SiteFooter.tsx` | Ajout de « Guides » en tête de la colonne « Informations » |
| `components/SiteNav.tsx` | Ajout de « Guides » entre « Catalogue » (renommage de « Génération de document ») et « Comment ça marche » |
| `components/SiteNavClient.tsx` | Même changement pour les pages client (/login, /signup) |

## 5. Justification des choix de priorisation

**Pourquoi 8 guides et pas plus** :

Le brief en mentionnait une trentaine potentielle. En retenir 30
aurait produit 30 pages moyennes, dont beaucoup seraient redondantes
avec les FAQ déjà présentes sur les landings. Quinze auraient allongé
la dilution. Huit permettent de :

- Couvrir les 4 familles de produits (min. 1 guide par famille)
- Viser les 3 intentions les plus commercialement rentables :
  décisionnel, coût, sélection prestataire
- Maintenir un niveau de rédaction qui évite le ton scolaire ou
  générique
- Laisser de la place pour de nouveaux guides si une intention
  spécifique apparaît à l&apos;usage (par exemple via les requêtes
  Search Console)

**Pourquoi ces 8 précisément** :

- `sas-vs-sasu` + `sci-ir-ou-is` : les deux confusions
  décisionnelles les plus massives en droit français des sociétés.
- `cout-creation-sas` : intent commercial pur, très haute proximité
  conversion.
- `domiciliation-siege-social` : clarifie un point pratique qui
  concerne TOUTES les formalités de création, donc maille avec SAS +
  SCI + Attestation.
- `ago-vs-age` : seul comparatif nécessaire sur la famille
  gouvernance (les autres candidats — « comment rédiger un PV »,
  « feuille de présence obligatoire » — recoupent trop le contenu
  déjà présent sur les landings).
- `nda-unilateral-ou-bilateral` : intent décisionnel clair, ROI
  évident.
- `cgv-cgu-mentions-legales-differences` : ce guide sert à lui seul
  trois produits et résout la confusion la plus fréquente côté web.
- `avocat-vs-legaltech-vs-gratuit` : méta-positionnement qui joue un
  rôle de conversion sur tout le catalogue.

## 6. Contrôles effectués

```bash
rm -rf .next
npx tsc --noEmit                 # 0 erreur
npx next build                   # succès, 9 nouvelles routes
```

### Routes (toutes HTTP 200)

```
/guides
/guides/sas-vs-sasu
/guides/sci-ir-ou-is
/guides/cout-creation-sas
/guides/domiciliation-siege-social
/guides/ago-vs-age
/guides/nda-unilateral-ou-bilateral
/guides/cgv-cgu-mentions-legales-differences
/guides/avocat-vs-legaltech-vs-gratuit
```

### Sitemap

34 URLs (25 avant cette phase + 9 nouvelles). Guides placés juste
après les pages marketing, avant les produits, dans l&apos;ordre de
priorité SEO.

### Metadata par guide

Vérifié sur `/guides/sas-vs-sasu` :

- Title : « SAS ou SASU : quelle forme choisir pour créer sa société ? »
- Description : phrase intentionnelle orientée décision
- `robots: index, follow`
- Canonical : `https://quick-legal-xi.vercel.app/guides/sas-vs-sasu`
- Open Graph + Twitter Card
- JSON-LD : Article + BreadcrumbList + FAQPage + Organization (hérité)

### Maillage interne vérifié

Depuis `/guides/sas-vs-sasu`, les liens présents incluent :

- 13 landings `/documents/...` (footer partagé, pour le crawl profond)
- 3 landings contextuelles dans le corps : `statuts-sas`,
  `declaration-non-condamnation`, `attestation-domiciliation`
- 3 guides connexes via « À lire aussi » : `cout-creation-sas`,
  `avocat-vs-legaltech-vs-gratuit`, `domiciliation-siege-social`
- 2 liens vers la hub `/guides` (breadcrumb + nav)

Même densité sur les 7 autres guides.

### Anti-cannibalisation vérifiée

Revue manuelle de chaque paire (landing, guide) potentiellement
concurrente :

| Landing | Guide le plus proche | Intent distinct ? |
|---|---|---|
| `/documents/statuts-sas` | `/guides/sas-vs-sasu` | Oui : décision vs achat |
| `/documents/statuts-sas` | `/guides/cout-creation-sas` | Oui : coût vs achat |
| `/documents/statuts-sci` | `/guides/sci-ir-ou-is` | Oui : régime fiscal vs achat |
| `/documents/nda` | `/guides/nda-unilateral-ou-bilateral` | Oui : choix vs achat |
| `/documents/pv-ag-ordinaire` | `/guides/ago-vs-age` | Oui : type d&apos;AG vs achat |
| `/documents/mentions-legales` | `/guides/cgv-cgu-mentions-legales-differences` | Oui : distinction de 3 docs vs achat d&apos;un seul |

Aucun risque de cannibalisation identifié.

## 7. Points à produire plus tard

### Batch suivant prioritaire (qualité élevée)

- `/guides/clauses-essentielles-statuts-sas` — pédagogique, soutient
  SAS
- `/guides/clauses-indispensables-nda` — idem pour NDA
- `/guides/cgv-obligatoires-e-commerce` — pratique, fort volume
- `/guides/comment-rediger-pv-assemblee-generale` — pratique gouvernance

### Batch secondaire (à évaluer selon le trafic)

- `/guides/cout-creation-sci`
- `/guides/capital-fixe-ou-variable-sas`
- `/guides/sci-familiale-avantages-limites`
- `/guides/duree-dun-nda`

### Hors scope tant qu&apos;il n&apos;y a pas de signal fort

- Guides « erreurs fréquentes dans X » : chaque landing contient déjà
  une section « Erreurs fréquentes à éviter » bien structurée — un
  guide dédié cannibaliserait.
- Guides « convocation d&apos;assemblée : règles à respecter »,
  « feuille de présence : obligatoire ou pas » — couverts par les FAQ
  des landings respectives.
- Guides marque spécifique (« CGV pour Shopify / WooCommerce ») : à
  envisager quand le trafic justifiera une granularité plus fine.

### Infra potentielle

- Composant `<ComparisonTable/>` réutilisable (chaque guide en
  ré-implémente une version locale aujourd&apos;hui). À factoriser
  quand ≥5 tableaux cohabitent.
- Sitemap d&apos;articles (si le nombre de guides dépasse 30).

## 8. Impact attendu

Horizon 3-6 mois après indexation complète :

- Couverture des 4 familles sur des requêtes informationnelles à fort
  volume
- Baisse du taux de rebond sur la home — les visiteurs en phase
  d&apos;exploration trouvent un point d&apos;entrée adapté à leur
  intention
- Signaux de maillage vers les landings renforcés — chaque guide
  pousse 3 à 6 liens contextualisés, dans un contenu éditorial de
  1 500 à 1 800 mots
- Positionnement prestataire — `avocat-vs-legaltech-vs-gratuit`
  capte des requêtes post-recherche au moment où l&apos;utilisateur
  arbitre entre les trois voies

Les 8 guides publiés posent une base suffisante pour mesurer sur 90
jours avant d&apos;étendre. Nous recommandons de suivre :

- Le CTR sur `/guides` depuis la home
- Les conversions attribuées aux landings quand la dernière page
  d&apos;entrée est un guide (analytics à brancher quand un outil sera
  choisi)
- Les requêtes dans Search Console qui pointent vers les guides mais
  sans clic : signal d&apos;un titre à retravailler
