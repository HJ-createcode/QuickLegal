# Rapport — Pages produit SEO transactionnelles

> Phase suivant le socle technique SEO (`SEO_AUDIT_AND_TECH_BASE.md`).
> Objet : transformer les 13 pages produit, qui atterrissaient
> directement sur l'étape 1 d'un formulaire, en vraies landing pages
> indexables et convaincantes, sans casser le parcours transactionnel.

## 1. Audit initial

### Routes produit avant cette phase

- `/documents/[type]` — route dynamique unique, rend **directement** un
  Wizard client (étape 1 sur 5 ou 6). 13 slugs couvrent le catalogue.
- `/generation-document` — hub catalogue, renvoie vers chacun des 13
  slugs.
- Liens internes pointant vers `/documents/[type]` :
  - catalogue `/generation-document` (CTA carte)
  - footer partagé (liens par catégorie)
  - dashboard (bouton « Rouvrir »)
  - Stripe `cancel_url` dans `create-checkout`
  - `sitemap.xml`

### Problème identifié

L'intention de recherche principale (« statuts de SAS », « PV d'AG »,
« mentions légales ») atterrissait sur un formulaire sans contexte :
- aucun contenu indexable (pas de H1 spécifique, pas de description,
  pas de FAQ, pas de preuves sociales)
- aucun schema Product ni FAQPage
- aucune réassurance avant le paiement
- taux de rebond probable élevé en trafic froid

### Décision d'architecture

**Option retenue : inversion des routes.**

| URL | Avant | Après |
|---|---|---|
| `/documents/<slug>` | Wizard client | **Landing SEO** server component, indexable |
| `/documents/<slug>/commencer` | n'existait pas | Wizard client, `noindex, nofollow` |

Justification :
- `/documents/<slug>` est l'URL naturelle pour le SEO ; la cible de
  recherche est informationnelle et transactionnelle, pas « où est le
  formulaire ».
- Tous les liens internes existants conservent leur cible et gagnent en
  qualité : la page devient un vrai contenu, pas un mur de formulaire.
- Aucune redirection serveur nécessaire — le chemin historique continue
  de fonctionner, son contenu change simplement.
- Le sitemap n'indexe que les landing pages. Les URLs `/commencer`
  restent crawlables mais portent un `noindex` explicite et un canonical
  renvoyant à la landing parente.

Alternative rejetée : créer `/guides/<slug>` pour le SEO et garder le
Wizard à `/documents/<slug>`. Cela aurait laissé la meilleure URL pour
du SEO à un formulaire peu rankable, et créé un risque de duplication.

## 2. Changements livrés

### Nouvelle architecture type

```
app/documents/[type]/
├── layout.tsx               # metadata de la landing (title, canonical, OG)
├── page.tsx                 # landing page SEO (server component)
└── commencer/
    ├── layout.tsx           # noindex + canonical vers la landing
    └── page.tsx             # wizard (client)
```

### Fichiers créés

| Fichier | Rôle |
|---|---|
| `lib/product-content/types.ts` | Interface `ProductPageContent` (H1, promise, intro, audience, timing, contains, included, notIncluded, mistakes, faqs, related) |
| `lib/product-content/index.ts` | Registry des contenus + `getProductContent(slug)` |
| `lib/product-content/statuts-sas.ts` | Contenu unique |
| `lib/product-content/statuts-sci.ts` | Contenu unique |
| `lib/product-content/attestation-domiciliation.ts` | Contenu unique |
| `lib/product-content/declaration-non-condamnation.ts` | Contenu unique |
| `lib/product-content/pv-ag-ordinaire.ts` | Contenu unique |
| `lib/product-content/pv-ag-extraordinaire.ts` | Contenu unique |
| `lib/product-content/convocation-ag.ts` | Contenu unique |
| `lib/product-content/ordre-du-jour-ag.ts` | Contenu unique |
| `lib/product-content/feuille-presence-ag.ts` | Contenu unique |
| `lib/product-content/cgv-ecommerce.ts` | Contenu unique |
| `lib/product-content/nda.ts` | Contenu unique |
| `lib/product-content/mentions-legales.ts` | Contenu unique |
| `lib/product-content/cgu.ts` | Contenu unique |
| `components/ProductLandingPage.tsx` | Template partagé rendant la landing depuis la définition + le contenu |
| `app/documents/[type]/commencer/page.tsx` | Wizard déplacé |
| `app/documents/[type]/commencer/layout.tsx` | Metadata `noindex, nofollow` + canonical vers landing |

### Fichiers modifiés

| Fichier | Modification |
|---|---|
| `app/documents/[type]/page.tsx` | Ancien Wizard remplacé par un server component qui charge le contenu et rend `ProductLandingPage` |
| `app/documents/[type]/layout.tsx` | Metadata enrichie (description prise depuis `content.promise`) ; BreadcrumbList supprimé (ré-émis par la landing) ; `generateStaticParams` conservé pour SSG |
| `app/dashboard/page.tsx` | Bouton « Rouvrir » bascule vers `/documents/<slug>/commencer` pour préserver le flux de reprise de brouillon |
| `app/api/stripe/create-checkout/route.ts` | `cancel_url` pointe désormais vers `/documents/<slug>/commencer` pour renvoyer l'utilisateur dans son questionnaire en cas d'annulation Stripe |

## 3. Structure de chaque landing page

Chaque landing contient, dans l'ordre :

1. **Hero** : fil d'Ariane visible, catégorie, H1 personnalisé, promesse,
   CTA principal vers `/commencer`, prix affiché.
2. **Introduction** : 2 à 3 paragraphes de contexte rédigé (intention
   informationnelle).
3. **À qui s'adresse / Quand l'utiliser** : deux colonnes, bullets.
4. **Ce que contient le document** : liste détaillée des articles ou
   sections produites.
5. **Inclus / Non inclus** : transparence sur le périmètre exact.
6. **Comment ça fonctionne** : 3 étapes standardisées (questionnaire,
   paiement, téléchargement).
7. **CTA intermédiaire** : comparaison de prix avec le marché.
8. **Erreurs fréquentes à éviter** : 4 à 5 pièges rédigés en entités,
   chacun avec titre et corps explicatif.
9. **FAQ** : 5 à 7 questions/réponses, rendues en `<details>` natif —
   pas de JavaScript client, bonne performance Lighthouse.
10. **Documents liés** : 2 à 3 cartes vers d'autres produits du catalogue
    (maillage interne).
11. **CTA final** : dernier rappel vers `/commencer`.
12. **Footer** : footer partagé (brand + 13 produits + nav + copyright).

### Structured data par landing

- `Organization` (hérité du layout racine)
- `Product` avec `offers` (prix, devise, disponibilité, vendeur)
- `FAQPage` alimentée par `content.faqs`
- `BreadcrumbList` visible + sémantique via le fil d'Ariane HTML

## 4. Mapping ancien parcours / nouveau parcours

| Parcours | Avant | Après |
|---|---|---|
| Recherche Google « statuts de SAS » | arrive sur `/documents/statuts-sas` = étape 1 du formulaire | arrive sur `/documents/statuts-sas` = landing riche avec H1, FAQ, Product schema |
| Clic catalogue `/generation-document` | ouvre directement le wizard | ouvre la landing, CTA « Commencer le questionnaire » |
| Clic footer | ouvre directement le wizard | ouvre la landing |
| Clic « Rouvrir » dashboard | rouvrait le wizard | rouvre désormais le wizard à `/commencer` (même UX) |
| `cancel_url` Stripe | renvoyait vers `/documents/<slug>` (ancien wizard) | renvoie vers `/documents/<slug>/commencer` (reprise du questionnaire intact) |
| Recherche Google « statuts de SAS QuickLegal commencer » | inexistant | existe mais `noindex` → n'apparaîtra pas dans les SERP |

## 5. Routes créées ou modifiées

**Créées**
- `GET /documents/<slug>/commencer` × 13 — transactionnel, `noindex`,
  canonical vers la landing

**Modifiées sémantiquement (sans changement d'URL)**
- `GET /documents/<slug>` × 13 — anciennement Wizard, désormais landing
  SEO. Aucune redirection. Les liens externes restent valides.

**Inchangées**
- `/generation-document` — hub catalogue (liens toujours vers la landing)
- `/comment-ca-marche` — page générique
- `/dashboard`, `/admin`, `/success`, `/login`, `/signup` — non-produit
- `robots.ts`, `sitemap.ts` — déjà corrects (le sitemap liste seulement
  les landing)

## 6. Hiérarchisation respectée

Les catégories du footer partagé et de `/generation-document` reflètent
les 4 familles du catalogue :

- **Création de société** — Statuts de SAS, Statuts de SCI, Attestation
  de domiciliation, Déclaration de non-condamnation
- **Gouvernance & vie sociale** — PV AGO, PV AGE, Convocation AG, Ordre
  du jour, Feuille de présence
- **Contrats commerciaux** — CGV E-commerce, NDA
- **Conformité & mentions légales** — Mentions légales, CGU

Les `related` de chaque contenu pointent vers des produits de la même
famille ou d'une famille complémentaire (ex. Statuts de SAS renvoie vers
Déclaration de non-condamnation, Attestation de domiciliation, PV AGO).

## 7. Contrôles effectués

```bash
rm -rf .next        # purge du cache Turbopack
npx tsc --noEmit    # 0 erreur
npx next build      # succès, 41 pages prérendues statiquement
npx eslint ...      # 6 erreurs préexistantes (apostrophes home, prefer-const template NDA) — pas introduites par cette phase
```

### Vérifications live

- `curl /documents/statuts-sas` → H1 correct, canonical, OG, Twitter, 3
  CTAs vers `/commencer`, Product + FAQPage + Organization JSON-LD
- `curl /documents/statuts-sas/commencer` → `<meta name="robots"
  content="noindex, nofollow">` + canonical vers la landing
- `curl /sitemap.xml` → 18 URLs dont 13 landing produits, aucune URL
  `/commencer`
- `curl /robots.txt` → toujours correct, disallow déjà en place

## 8. Points à valider humainement

1. **Revue juridique des contenus** — 13 × ~800 mots de contenu
   rédigé. À relire par toi (juriste) pour valider la justesse légale,
   notamment :
   - références aux articles du Code de commerce / du Code de la
     consommation (vérifier que les numéros sont à jour en 2026)
   - formulations sur la responsabilité (pas de promesse juridique
     trompeuse)
   - montants / amendes indicatives données dans les « Erreurs
     fréquentes à éviter »
2. **Prix affichés** — les prix proviennent du registry
   (`doc.priceCents`). Les pages disent « 79 € » pour SAS, « 89 € » pour
   SCI, etc. — cohérents avec le checkout Stripe. Si tu changes un prix,
   il se répercute automatiquement.
3. **Témoignages / preuves sociales** — pas encore intégrés. Quand tu
   auras des avis clients, ajouter `aggregateRating` dans le schema
   Product est un quick win.
4. **Image Open Graph** — toujours pas d'image OG globale
   (`/og-image.png`). Les preview de partage des landing produits
   s'afficheront sans illustration.
5. **Politique de confidentialité & cookies** — référencées dans
   plusieurs contenus comme « document distinct ». À créer en phase
   suivante (pages légales du site lui-même).
6. **Clic-through `cancel_url` Stripe** — à tester sur une vraie session
   Stripe. Aujourd'hui le projet est en mode démo (secrets Stripe non
   configurés dans Vercel — cf. `SEO_AUDIT_AND_TECH_BASE.md`).
7. **Apostrophes non-échappées dans `/app/page.tsx` et
   `/app/generation-document/page.tsx`** — erreurs lint préexistantes,
   non bloquantes pour le build. À corriger dans un commit de nettoyage
   futur (`&apos;` au lieu de `'`).

## 9. Performances

### Choix techniques pour préserver les performances

- **Tout en server component** : `ProductLandingPage.tsx`, `page.tsx`,
  `layout.tsx` sont server only. Zéro JavaScript de cette landing n'est
  envoyé au navigateur pour le rendu initial.
- **`<details>` natif** pour la FAQ : pas d'accordéon custom, pas de
  JS de cette UI.
- **SSG** via `generateStaticParams` : les 13 landing + 13 wizards sont
  prérendus statiquement au build, servis en HTML immédiat.
- **Aucun composant client dans le template** : le seul JS qui descend
  sur la landing est celui nécessaire à la nav (éventuellement), à la
  session (SessionProviderWrapper) et aux polyfills.
- **FAQ rendue en `<details>`** : indexable par Google (les réponses
  sont dans le DOM initial), contrairement à un accordéon JS qui les
  chargerait tard.

### Core Web Vitals attendus

- LCP : texte uniquement, pas d'image héro → LCP rapide
- CLS : layout stable, pas d'insertion tardive
- INP : pas d'interaction lourde

## 10. Ce qui est reporté en phases suivantes

### Phase 3 (qui succède directement à celle-ci)

- Pages légales du site QuickLegal lui-même (`/mentions-legales`,
  `/politique-de-confidentialite`, `/cgu`, `/cgv`, `/cookies`)
- Image Open Graph globale + images hero par produit (si pertinent
  graphiquement)
- Ajout d'un schema `HowTo` sur les landings qui s'y prêtent
  (convocation-ag, declaration-non-condamnation)

### Phase marketing

- Témoignages clients + `aggregateRating` dans le schema Product
- Page « À propos » avec biographie juriste
- Blog éditorial (`/blog`) pour les intentions informationnelles pures
  (« Comment créer une SCI familiale », « Quel régime fiscal pour une
  SAS ? »)

### Non-bloquant

- Manifest PWA + icônes multi-résolutions
- Illustrations personnalisées pour chaque landing (actuellement
  uniquement du texte stylé)
