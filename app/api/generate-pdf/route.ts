import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { generatePDF, type DocumentType } from "@/lib/pdf-generator";

const VALID_TYPES: DocumentType[] = [
  "statuts-sas",
  "statuts-sci",
  "cgv-ecommerce",
  "nda",
];

// Hard limit on text field length to prevent DoS / buffer abuse.
const MAX_TEXT_LEN = 5000;
const MAX_SHORT_LEN = 500;
const MAX_ASSOCIES = 50;

function tooLong(value: unknown, limit: number): boolean {
  return typeof value === "string" && value.length > limit;
}

function validateInputLengths(data: Record<string, unknown>): string | null {
  if (tooLong(data.denomination, MAX_SHORT_LEN)) return "Dénomination trop longue.";
  if (tooLong(data.objet_social, MAX_TEXT_LEN)) return "Objet social trop long.";
  if (tooLong(data.siege_social, MAX_SHORT_LEN)) return "Siège social trop long.";
  if (tooLong(data.contexte, MAX_TEXT_LEN)) return "Contexte trop long.";
  if (tooLong(data.nature_informations, MAX_TEXT_LEN))
    return "Champ « nature des informations » trop long.";
  if (tooLong(data.type_produits, MAX_SHORT_LEN)) return "Champ « type de produits » trop long.";
  if (tooLong(data.partie_a_nom, MAX_SHORT_LEN)) return "Nom partie A trop long.";
  if (tooLong(data.partie_b_nom, MAX_SHORT_LEN)) return "Nom partie B trop long.";
  if (Array.isArray(data.associes_list) && data.associes_list.length > MAX_ASSOCIES) {
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
    const body = await request.json();

    let type: DocumentType;
    let data: Record<string, unknown>;

    if (body.type && body.data) {
      type = body.type;
      data = body.data;
    } else {
      type = "statuts-sas";
      data = body;
    }

    if (!VALID_TYPES.includes(type)) {
      return NextResponse.json(
        { error: "Type de document inconnu." },
        { status: 400 }
      );
    }

    // --- Length validation (DoS prevention) ---
    const lengthError = validateInputLengths(data);
    if (lengthError) {
      return NextResponse.json({ error: lengthError }, { status: 400 });
    }

    // --- Per-document-type validation ---
    if (type === "statuts-sas" || type === "statuts-sci") {
      if (!data.denomination || !data.objet_social || !data.siege_social) {
        return NextResponse.json(
          {
            error: "Données incomplètes. Veuillez remplir tous les champs obligatoires.",
          },
          { status: 400 }
        );
      }
      const associes = data.associes_list as unknown[];
      if (!associes || associes.length === 0) {
        return NextResponse.json(
          { error: "Au moins un associé est requis." },
          { status: 400 }
        );
      }
    }

    if (type === "cgv-ecommerce") {
      if (!data.denomination || !data.siret || !data.siege_social) {
        return NextResponse.json(
          { error: "Informations du vendeur incomplètes." },
          { status: 400 }
        );
      }
    }

    if (type === "nda") {
      if (!data.partie_a_nom || !data.partie_b_nom || !data.contexte) {
        return NextResponse.json(
          { error: "Informations des parties ou du contexte incomplètes." },
          { status: 400 }
        );
      }
    }

    const pdfBuffer = generatePDF(type, data);
    const uint8 = new Uint8Array(pdfBuffer);

    const filenameBase = (data.denomination || data.partie_a_nom || type) as string;
    const safeName = filenameBase.slice(0, 60).replace(/[^a-zA-Z0-9]/g, "_");

    return new NextResponse(uint8, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${type}-${safeName}.pdf"`,
      },
    });
  } catch {
    // Do not leak internal error details
    return NextResponse.json(
      { error: "Erreur lors de la génération du PDF." },
      { status: 500 }
    );
  }
}
