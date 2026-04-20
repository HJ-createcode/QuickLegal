import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { generatePDF } from "@/lib/pdf-generator";
import { getDocumentDef, isValidDocumentType } from "@/lib/document-registry";

// Hard limits on field/array sizes to prevent DoS / buffer abuse. These apply
// to ANY document type: we cap the raw JSON body and a handful of known text
// fields that are large enough to be tempting as abuse vectors.
const MAX_TEXT_LEN = 5000;
const MAX_SHORT_LEN = 500;
const MAX_ASSOCIES = 50;
const MAX_BODY_BYTES = 50_000;

const LONG_TEXT_FIELDS = [
  "objet_social",
  "contexte",
  "nature_informations",
  "description_activite",
];
const SHORT_TEXT_FIELDS = [
  "denomination",
  "siege_social",
  "type_produits",
  "partie_a_nom",
  "partie_b_nom",
];

function enforceLimits(data: Record<string, unknown>): string | null {
  for (const k of SHORT_TEXT_FIELDS) {
    const v = data[k];
    if (typeof v === "string" && v.length > MAX_SHORT_LEN) {
      return `Champ "${k}" trop long.`;
    }
  }
  for (const k of LONG_TEXT_FIELDS) {
    const v = data[k];
    if (typeof v === "string" && v.length > MAX_TEXT_LEN) {
      return `Champ "${k}" trop long.`;
    }
  }
  if (
    Array.isArray(data.associes_list) &&
    data.associes_list.length > MAX_ASSOCIES
  ) {
    return `Nombre maximum d'associés dépassé (${MAX_ASSOCIES}).`;
  }
  return null;
}

export async function POST(request: NextRequest) {
  // --- Authentication required ---
  const session = await auth().catch(() => null);
  const user = session?.user as { id?: string } | undefined;
  if (!user?.id) {
    return NextResponse.json(
      { error: "Authentification requise." },
      { status: 401 }
    );
  }

  try {
    const rawBody = await request.text();
    if (rawBody.length > MAX_BODY_BYTES) {
      return NextResponse.json(
        { error: "Requête trop volumineuse." },
        { status: 413 }
      );
    }
    const body = JSON.parse(rawBody);

    let type: string;
    let data: Record<string, unknown>;

    if (body.type && body.data) {
      type = String(body.type);
      data = body.data as Record<string, unknown>;
    } else {
      type = "statuts-sas";
      data = body as Record<string, unknown>;
    }

    if (!isValidDocumentType(type)) {
      return NextResponse.json(
        { error: "Type de document inconnu." },
        { status: 400 }
      );
    }

    const def = getDocumentDef(type)!;

    const limitsError = enforceLimits(data);
    if (limitsError) {
      return NextResponse.json({ error: limitsError }, { status: 400 });
    }

    const docError = def.validate(data);
    if (docError) {
      return NextResponse.json({ error: docError }, { status: 400 });
    }

    const pdfBuffer = generatePDF(type, data);
    const uint8 = new Uint8Array(pdfBuffer);

    const safeName = def
      .extractTitle(data)
      .slice(0, 60)
      .replace(/[^a-zA-Z0-9]/g, "_") || "document";

    return new NextResponse(uint8, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${type}-${safeName}.pdf"`,
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Erreur lors de la génération du PDF." },
      { status: 500 }
    );
  }
}
