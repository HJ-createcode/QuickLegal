import { notFound } from "next/navigation";
import { ProductLandingPage } from "@/components/ProductLandingPage";
import { getDocumentDef } from "@/lib/document-registry";
import { getProductContent } from "@/lib/product-content";

interface Props {
  params: Promise<{ type: string }>;
}

/**
 * SEO landing page for a product.
 *
 * Server Component: no hydration JS, fully crawlable.
 * Wizard lives at `/documents/[type]/commencer`.
 */
export default async function ProductPage({ params }: Props) {
  const { type } = await params;
  const doc = getDocumentDef(type);
  if (!doc) notFound();

  const content = getProductContent(type);
  if (!content) {
    // Should never happen because every registered product has content,
    // but this guard avoids rendering an empty shell if the two registries
    // diverge during a refactor.
    notFound();
  }

  return <ProductLandingPage doc={doc} content={content} />;
}
