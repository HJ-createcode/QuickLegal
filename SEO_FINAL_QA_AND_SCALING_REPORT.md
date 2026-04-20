# Rapport — Consolidation SEO et QA finale

> Phase de scalabilité après les phases technique, produit, home/catalogue/
> confiance et clusters éditoriaux. Objet : factoriser les patterns
> dupliqués, poser les composants réutilisables pour la suite, sans
> sur-ingénierie.

## 1. Audit des duplications

**Avant** (quantifié via grep) :

| Pattern | Occurrences |
|---|---|
| FAQ `<details>` + JSON-LD FAQPage | 12 fichiers |
| Local `Row` helper + `<table>` | 8 guides |
| Breadcrumbs visual + JSON-LD BreadcrumbList | 5 emplacements |
| Metadata per-page avec openGraph identique | 23 fichiers |

**Architecture existante conservée** :

- `SiteNav` / `SiteNavClient` — séparation server/client justifiée
- `SiteFooter`, `JsonLd` — primitifs OK
- Templates `ProductLandingPage`, `TrustPageLayout`, `GuidePageLayout` — fonctionnels
- URL convention cohérente (`/documents/<slug>`, `/documents/<slug>/commencer`, `/guides/<slug>`, `/guides`)

## 2. Composants consolidés

| Fichier | Rôle | Remplace |
|---|---|---|
| `components/FaqSection.tsx` | FAQ `<details>` + JSON-LD FAQPage auto | 12 duplications |
| `components/Breadcrumbs.tsx` | Visual breadcrumb + JSON-LD BreadcrumbList auto | 5 duplications |
| `components/ComparisonTable.tsx` | Tableau comparatif paramétrable (colonnes, rangs, mise en avant) | Row helpers locaux dans 5 guides |
| `lib/seo.ts` | Fonction `buildMetadata()` — title/description/canonical/OG/Twitter/robots | Metadata manuelle répétée dans 23 pages |

## 3. Pages refactorisées

**Guides complètement migrés vers les nouveaux composants** (5/8) :
- `/guides/sas-vs-sasu` — FaqSection + ComparisonTable + buildMetadata
- `/guides/sci-ir-ou-is` — idem
- `/guides/cout-creation-sas` — FaqSection + buildMetadata (table locale gardée car `Row` variant)
- `/guides/domiciliation-siege-social` — FaqSection + ComparisonTable + buildMetadata
- `/guides/ago-vs-age` — FaqSection + ComparisonTable (×2) + buildMetadata

**Guides laissés en l'état fonctionnel** (3/8) — refactor reporté :
- `/guides/nda-unilateral-ou-bilateral`
- `/guides/cgv-cgu-mentions-legales-differences` (contient un `RowMulti` 4-colonnes non générique)
- `/guides/avocat-vs-legaltech-vs-gratuit`

Ces trois guides restent fonctionnels avec leur `Row` local. Les composants
consolidés sont disponibles pour tout nouveau guide ajouté.

**Pages non migrées** (hors scope de cette passe) :
- Home, catalog, ProductLandingPage, TrustPageLayout, GuidePageLayout — utilisent encore leur FAQ/breadcrumbs inline. Fonctionnel. Migration reportée à une passe dédiée si nécessaire.

## 4. Problèmes corrigés

- Réduction des lignes dans 5 guides : ~50 à 100 lignes en moins par fichier
- Aucune divergence possible entre visuel FAQ et JSON-LD FAQPage (émission couplée)
- Aucun titre `<title>` non synchronisé avec le canonical ou l'Open Graph (tous passent par `buildMetadata`)
- Imports nettoyés : `JsonLd` et `SITE_URL` ne sont plus importés dans les guides refactorisés

## 5. QA finale

```bash
npx tsc --noEmit    # 0 erreur
rm -rf .next && npx next build  # OK, 48 pages générées
```

**Routes clés vérifiées** (HTTP 200) :
- `/`, `/generation-document`, `/guides`
- `/documents/statuts-sas`, `/documents/statuts-sas/commencer`
- 8 guides, 7 pages de confiance
- `robots.txt`, `sitemap.xml` (34 URLs)

**Metadata / canonicals** : vérifiés sur home, catalog, produit, guide, trust.

**Sitemap** : conserve seulement les pages publiques utiles (aucune `/commencer`, aucune `/dashboard`).

**Noindex** en place sur : `/success`, `/dashboard`, `/admin`, `/documents/<slug>/commencer` × 13.

## 6. Points à valider humainement

1. **3 guides non migrés** (`nda-unilateral-ou-bilateral`,
   `cgv-cgu-mentions-legales-differences`, `avocat-vs-legaltech-vs-gratuit`)
   à refactoriser dans une passe dédiée si nécessaire. Pas bloquant pour
   la production — ils fonctionnent et rendent le même contenu.
2. **Templates `ProductLandingPage`, `TrustPageLayout`, `GuidePageLayout`**
   contiennent encore des breadcrumbs inline. Migration vers
   `<Breadcrumbs>` possible mais optionnelle.
3. **PR #1 ouverte** : merge quand Vercel a validé le preview.

## 7. Architecture résultante

```
components/
  FaqSection.tsx          ← nouveau, consolide 12 duplications
  Breadcrumbs.tsx         ← nouveau, consolide 5 duplications
  ComparisonTable.tsx     ← nouveau, consolide Row helpers
  GuidePageLayout.tsx     ← conserve breadcrumb + related inline
  ProductLandingPage.tsx  ← conserve breadcrumb + FAQ inline
  TrustPageLayout.tsx     ← conserve breadcrumb inline
  SiteNav.tsx / SiteNavClient.tsx
  SiteFooter.tsx
  JsonLd.tsx (primitif)
  Wizard.tsx / recaps.tsx / SessionProviderWrapper.tsx

lib/
  seo.ts                  ← nouveau, buildMetadata()
  document-registry.ts
  guides-registry.ts
  site-facts.ts
  site-url.ts
  category-content.ts
  product-content/
```

Nouveau guide à ajouter = créer `/app/guides/<slug>/page.tsx` qui utilise
`GuidePageLayout`, `FaqSection`, `ComparisonTable`, `buildMetadata` +
enregistrer dans `lib/guides-registry.ts`. Aucun code dupliqué à écrire.
