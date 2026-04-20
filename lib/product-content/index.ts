import type { ProductPageContent } from "./types";

import { STATUTS_SAS_CONTENT } from "./statuts-sas";
import { STATUTS_SCI_CONTENT } from "./statuts-sci";
import { ATTESTATION_DOMICILIATION_CONTENT } from "./attestation-domiciliation";
import { DECLARATION_NON_CONDAMNATION_CONTENT } from "./declaration-non-condamnation";
import { PV_AG_ORDINAIRE_CONTENT } from "./pv-ag-ordinaire";
import { PV_AG_EXTRAORDINAIRE_CONTENT } from "./pv-ag-extraordinaire";
import { CONVOCATION_AG_CONTENT } from "./convocation-ag";
import { ORDRE_DU_JOUR_AG_CONTENT } from "./ordre-du-jour-ag";
import { FEUILLE_PRESENCE_AG_CONTENT } from "./feuille-presence-ag";
import { CGV_ECOMMERCE_CONTENT } from "./cgv-ecommerce";
import { NDA_CONTENT } from "./nda";
import { MENTIONS_LEGALES_CONTENT } from "./mentions-legales";
import { CGU_CONTENT } from "./cgu";

/**
 * Map each registry slug to its marketing content.
 *
 * Adding a new product means:
 *   1. Register it in `lib/document-registry.ts`
 *   2. Create `lib/product-content/<slug>.ts` exporting a `ProductPageContent`
 *   3. Import it here and add a row below
 * If a slug has no content entry, the landing page falls back to a minimal
 * render based solely on the registry metadata — legal but clearly incomplete.
 */
export const PRODUCT_CONTENTS: Record<string, ProductPageContent> = {
  "statuts-sas": STATUTS_SAS_CONTENT,
  "statuts-sci": STATUTS_SCI_CONTENT,
  "attestation-domiciliation": ATTESTATION_DOMICILIATION_CONTENT,
  "declaration-non-condamnation": DECLARATION_NON_CONDAMNATION_CONTENT,
  "pv-ag-ordinaire": PV_AG_ORDINAIRE_CONTENT,
  "pv-ag-extraordinaire": PV_AG_EXTRAORDINAIRE_CONTENT,
  "convocation-ag": CONVOCATION_AG_CONTENT,
  "ordre-du-jour-ag": ORDRE_DU_JOUR_AG_CONTENT,
  "feuille-presence-ag": FEUILLE_PRESENCE_AG_CONTENT,
  "cgv-ecommerce": CGV_ECOMMERCE_CONTENT,
  nda: NDA_CONTENT,
  "mentions-legales": MENTIONS_LEGALES_CONTENT,
  cgu: CGU_CONTENT,
};

export function getProductContent(
  slug: string
): ProductPageContent | undefined {
  return PRODUCT_CONTENTS[slug];
}

export { type ProductPageContent } from "./types";
