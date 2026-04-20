"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { Wizard } from "@/components/Wizard";
import { getDocumentDef } from "@/lib/document-registry";
import { getRecapComponent } from "@/components/recaps";

interface Props {
  params: Promise<{ type: string }>;
}

/**
 * Questionnaire page.
 *
 * Distinct from the SEO landing at `/documents/[type]`. Rendered as a
 * Client Component because the Wizard uses `useState` / `useEffect` for
 * its step state and localStorage autosave.
 *
 * Marked `noindex, nofollow` at the layout level — the canonical version
 * of the product is its landing page, not this form.
 */
export default function DocumentStartPage({ params }: Props) {
  const { type } = use(params);
  const def = getDocumentDef(type);

  if (!def) {
    notFound();
  }

  const Recap = getRecapComponent(type);

  return (
    <Wizard
      documentType={def.type}
      documentLabel={def.label}
      price={def.priceCents / 100}
      steps={def.questionnaire}
      storageKey={`quicklegal_${def.type.replace(/-/g, "_")}`}
      initialData={def.initialData}
      renderRecap={(data) => <Recap data={data} />}
      shouldShowField={
        def.shouldShowField
          ? (field, data) => def.shouldShowField!(field.id, data)
          : undefined
      }
    />
  );
}
