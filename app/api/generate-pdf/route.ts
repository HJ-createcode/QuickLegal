import { NextRequest, NextResponse } from "next/server";
import { generatePDF, type DocumentType } from "@/lib/pdf-generator";

const VALID_TYPES: DocumentType[] = ["statuts-sas", "statuts-sci", "cgv-ecommerce", "nda"];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Support both new format {type, data} and legacy (direct data for SAS)
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

    // Basic validation per type
    if (type === "statuts-sas" || type === "statuts-sci") {
      if (!data.denomination || !data.objet_social || !data.siege_social) {
        return NextResponse.json(
          { error: "Données incomplètes. Veuillez remplir tous les champs obligatoires." },
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

    const filename = (data.denomination || data.partie_a_nom || type) as string;
    const safeName = filename.replace(/[^a-zA-Z0-9]/g, "_");

    return new NextResponse(uint8, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${type}-${safeName}.pdf"`,
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la génération du PDF." },
      { status: 500 }
    );
  }
}
