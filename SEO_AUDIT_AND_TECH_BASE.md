# Audit SEO et socle technique — QuickLegal

> **Périmètre** : phase 1, socle technique uniquement. Pas de création de
> contenus longs, pas de refonte rédactionnelle, pas de nouvelles pages
> légales. Ce document trace l'état avant / après et liste les chantiers
> explicitement reportés.

## 1. Audit initial (état avant cette phase)

### Architecture observée

- **Framework** : Next.js 16.2.4, App Router, TypeScript, Tailwind v4.
- **Auth** : NextAuth v5 beta, session JWT, middleware `proxy.ts` à la
  racine (remplace `middleware.ts` dans cette version).
- **Base** : Neon Postgres (serverless).
- **Stockage PDF** : Vercel Blob.
- **Router** : App Router (fichiers `page.tsx` sous `app/`). Layout racine
  unique dans `app/layout.tsx`, un layout supplémentaire pour
  `/documents/[type]` créé par cette phase.

### Routes publiques identifiées

| Route | Type | Statut SEO avant |
|---|---|---|
| `/` | server | metadata globale unique, pas de canonical explicite |
| `/comment-ca-marche` | server | aucune metadata propre |
| `/generation-document` | server | aucune metadata propre |
| `/documents/[type]` (13 slugs) | client, dynamique | aucune metadata propre, non pré-rendue |
| `/login` | client | aucune metadata, indexable par défaut |
| `/signup` | client | aucune metadata, indexable par défaut |
| `/success` | client | **indexable par défaut** (problème) |
| `/dashboard` | server | **indexable par défaut** (problème) |
| `/admin` | server | **indexable par défaut** (problème) |

### Routes transactionnelles déguisées en pages business

- `/success` = page post-paiement, URL contient `doc_id` + `session_id`.
- `/dashboard` + `/admin` = accès authentifié uniquement.

→ Tous en `noindex` dans cette phase.

### État SEO mesuré en prod (avant)

- `/robots.txt` → **HTTP 404** (absence totale).
- `/sitemap.xml` → **HTTP 404**.
- Metadata par page → **aucune**. Un seul titre et une seule description
  pour les 9 pages publiques.
- Canonical URL → **aucune** déclarée explicitement.
- Open Graph / Twitter Card → **aucune**.
- JSON-LD / structured data → **aucun**.
- Manifest / apple-touch-icon → absent.
- Footer → **sans lien** (brand + copyright seuls).
- Navigation → 3 liens (Génération, Comment ça marche, Garanties).

### Quick wins identifiés

1. `app/robots.ts` et `app/sitemap.ts` (routes Next natives, 50 lignes).
2. `metadataBase` + defaults OG/Twitter/robots dans `app/layout.tsx`.
3. Metadata par route (directe sur server, via `layout.tsx` sur client).
4. JSON-LD Organization global, WebSite sur home, BreadcrumbList sur
   `/comment-ca-marche`, `/generation-document`, `/documents/[type]`,
   CollectionPage sur `/generation-document`.
5. Footer enrichi : liens vers les 13 produits + liens marketing.
6. `noindex` explicite sur `/success`, `/dashboard`, `/admin`.
7. `generateStaticParams` sur `/documents/[type]` pour un pré-rendu
   statique des 13 URLs produit.

### Problèmes critiques (tous corrigés dans cette phase)

1. Absence de `/robots.txt` et `/sitemap.xml` : le site est indexable
   mais Google n'a aucun plan de crawl ni signal de canonical.
2. Page `/success` et dashboard indexables : fuite potentielle d'URLs
   transactionnelles dans les SERP.
3. Metadata identique partout : Google ne peut pas distinguer les 13
   produits en listings de résultats.

## 2. Décisions d'implémentation

- **URL de base** : résolue par `lib/site-url.ts`, depuis
  `NEXT_PUBLIC_APP_URL` (à définir dans Vercel au moment du passage sous
  le domaine propriétaire), avec fallback
  `https://quick-legal-xi.vercel.app`.
- **Title template** : défini dans le layout racine (`%s | QuickLegal`).
  La home utilise `title.absolute` pour rester hors-template. Les pages
  enfants passent le nom court (ex. `"Comment ça marche"`).
- **Canonical** : chaque page déclare `alternates.canonical` en chemin
  relatif ; Next.js le résout en absolu via `metadataBase`.
- **JSON-LD** : composant `components/JsonLd.tsx`, serialisation sans
  espaces et avec échappement de `<`, `>` et `&` pour éviter toute
  fermeture prématurée du `<script>`.
- **Sitemap** : généré depuis `DOCUMENT_REGISTRY`. Ajouter une entrée au
  registry publie automatiquement son URL.
- **Pages client** (`/documents/[type]`, `/login`, `/signup`,
  `/success`) : metadata fournie via un `layout.tsx` server adjacent
  (contrainte Next.js : `export const metadata` n'est pas autorisé dans
  les Client Components).
- **Pas de Product schema** pour les pages `/documents/[type]` : le
  contenu produit est encore un wizard sans description longue ni
  preuves sociales. Un `Product` schema prématuré enverrait des signaux
  faibles à Google (pas de `aggregateRating`, pas de `review`). Ajouté
  lors de la phase 3.
- **Pas de création de pages légales du site** (mentions, politique de
  confidentialité, CGU, CGV, cookies) : explicitement reporté en phase 2
  conformément au cadrage. Le footer les référence toutefois déjà en
  texte (sans lien) pour un câblage trivial plus tard.

## 3. Implémentation livrée

### Fichiers créés

| Fichier | Rôle |
|---|---|
| `lib/site-url.ts` | URL canonique (env + fallback), SITE_NAME, SITE_DESCRIPTION partagées |
| `app/robots.ts` | `/robots.txt` généré par Next, allow `/`, disallow `/api/`, `/dashboard`, `/admin`, `/success`, référence le sitemap |
| `app/sitemap.ts` | `/sitemap.xml` généré depuis le registry (5 routes statiques + 13 produits) |
| `app/documents/[type]/layout.tsx` | `generateMetadata` par slug + `generateStaticParams` pour SSG + BreadcrumbList JSON-LD |
| `app/login/layout.tsx` | metadata connexion |
| `app/signup/layout.tsx` | metadata création de compte |
| `app/success/layout.tsx` | metadata + `noindex, nofollow` |
| `components/JsonLd.tsx` | émetteur JSON-LD sûr (échappement script-safe) |
| `components/SiteFooter.tsx` | footer partagé avec liens vers les 13 produits groupés par catégorie + liens transversaux |

### Fichiers modifiés

| Fichier | Modification |
|---|---|
| `app/layout.tsx` | `metadataBase`, title template `%s | QuickLegal`, defaults OG / Twitter / robots, Organization JSON-LD global, `viewport` avec theme-color |
| `app/page.tsx` | metadata (absolute title + canonical + OG), remplacement du footer par `<SiteFooter />`, WebSite JSON-LD |
| `app/comment-ca-marche/page.tsx` | metadata + canonical, remplacement du footer, BreadcrumbList JSON-LD |
| `app/generation-document/page.tsx` | metadata + canonical, remplacement du footer, BreadcrumbList + CollectionPage JSON-LD |
| `app/dashboard/page.tsx` | metadata + `noindex, nofollow` |
| `app/admin/page.tsx` | metadata + `noindex, nofollow` |

### Routes concernées (couverture finale)

| Route | Indexable ? | Canonical | Metadata dédiée | JSON-LD |
|---|---|---|---|---|
| `/` | ✅ | `/` | ✅ | Organization + WebSite |
| `/comment-ca-marche` | ✅ | `/comment-ca-marche` | ✅ | Organization + BreadcrumbList |
| `/generation-document` | ✅ | `/generation-document` | ✅ | Organization + BreadcrumbList + CollectionPage |
| `/documents/[type]` × 13 | ✅ | `/documents/{type}` | ✅ (par slug) | Organization + BreadcrumbList |
| `/login` | ✅ | `/login` | ✅ | Organization |
| `/signup` | ✅ | `/signup` | ✅ | Organization |
| `/success` | ❌ `noindex, nofollow` | — | ✅ | Organization |
| `/dashboard` | ❌ `noindex, nofollow` | — | ✅ | Organization |
| `/admin` | ❌ `noindex, nofollow` | — | ✅ | Organization |
| `/api/*` | — | — | — | Bloqué par `robots.txt` |

Toutes les pages produit sont maintenant **prérendues statiquement**
(SSG via `generateStaticParams`) → réponse instantanée pour Googlebot.

## 4. Contrôles effectués

```bash
npx tsc --noEmit         # 0 erreur
npx next build           # OK, 13 pages SSG pour /documents/[type]
npx eslint app lib components
```

Les erreurs eslint restantes (`react/no-unescaped-entities` dans
`app/page.tsx` et `app/generation-document/page.tsx`,
`prefer-const` dans `lib/templates/nda.ts`) sont **préexistantes** et
n'ont pas été introduites par cette phase. Elles ne bloquent pas le
build de production (Vercel déploie sans les corriger).

### Vérifications locales live

- `curl /robots.txt` → 200 avec règles correctes et référence sitemap.
- `curl /sitemap.xml` → 200 avec 18 `<url>` (5 statiques + 13 produits).
- `curl /` → canonical, OG, Twitter, WebSite JSON-LD présents.
- `curl /documents/statuts-sas` → titre `"Statuts de SAS | QuickLegal"`,
  description avec prix 79 €, BreadcrumbList à 3 niveaux.
- `curl /success` → `<meta name="robots" content="noindex, nofollow">`.

## 5. Points à valider humainement

1. **Variable d'env `NEXT_PUBLIC_APP_URL`** : actuellement vide en
   Vercel. Le site utilise donc le fallback
   `https://quick-legal-xi.vercel.app`. À définir au moment du passage
   sur le domaine propriétaire (ex. `https://quicklegal.fr`), sinon
   Google verra des canonicals pointant vers `.vercel.app`.
2. **Google Search Console** : ajouter la propriété (DNS ou balise
   meta), soumettre le sitemap `/sitemap.xml`. Cette phase n'inclut pas
   la balise de vérification car l'ajout dépend du compte GSC.
3. **Open Graph image** : pas d'image OG fournie ici. Les previews de
   partage s'afficheront sans illustration tant qu'une `/og-image.png`
   (1200×630) n'est pas ajoutée dans `public/` et référencée dans
   `app/layout.tsx` (`openGraph.images`).
4. **Pages légales** (mentions, politique de confidentialité, CGU, CGV,
   cookies) : doivent exister avant tout trafic payant significatif.
   Le footer les mentionne déjà sans lien pour faciliter le branchement
   futur.
5. **Favicon / apple-touch-icon** : `/favicon.ico` existe, mais pas
   d'icône PWA / Apple haute résolution. Non bloquant.

## 6. Ce qui est explicitement reporté

### Phase 2 — pages légales du site

Créer les routes suivantes et les lier depuis le footer :

- `/mentions-legales`
- `/politique-de-confidentialite`
- `/cgu` (celles du site QuickLegal lui-même, à différencier du produit
  `/documents/cgu` qui sert à générer des CGU pour les clients)
- `/cgv` (CGV de vente de QuickLegal, à différencier du produit
  `/documents/cgv-ecommerce`)
- `/cookies`

À la différence des autres ajouts, ces pages ne passent pas par le
registry documents — ce sont des pages de contenu statique que l'équipe
juridique rédigera elle-même.

### Phase 3 — enrichissement rédactionnel des pages produit

Pour chaque `/documents/[type]` :

- Ajouter un H1 contenant le label + un paragraphe de contexte long.
- Ajouter une FAQ avec 4 à 8 questions réelles (FAQPage schema.org).
- Ajouter un `Product` schema avec prix, devise, description, offres.
- Ajouter des liens internes croisés (« Vous aurez aussi besoin de »)
  entre documents liés (ex. depuis `statuts-sas` vers
  `declaration-non-condamnation` et `attestation-domiciliation`).

Cette phase demande un vrai investissement rédactionnel et une revue
juridique ; pas pertinent tant que le trafic organique ne justifie pas
la dépense.

### Phase marketing — home

- FAQ principale sur la home.
- Témoignages / preuves sociales (logos clients, citations).
- Section « Notre expertise » plus développée.
- Potentiellement Review / aggregateRating quand les avis clients sont
  disponibles.

### Non-bloquant

- Manifest PWA + icônes multi-résolutions.
- Sitemap d'images (quand la banque d'images existera).
- hreflang multi-langue (si ouverture à d'autres marchés).

## 7. Commandes utiles

```bash
# Vérifier les routes SEO en local
curl http://localhost:3000/robots.txt
curl http://localhost:3000/sitemap.xml
curl http://localhost:3000/ | grep -E 'canonical|og:|twitter:'

# Vérifier une page produit
curl http://localhost:3000/documents/statuts-sas | \
  grep -oE '<(meta|title|link|script[^>]*ld)[^>]*>'

# Regénérer le sitemap après ajout d'un document au registry
# (aucune action manuelle — lib/sitemap.ts lit le registry au build)
```
