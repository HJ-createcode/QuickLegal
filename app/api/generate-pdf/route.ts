import { NextRequest, NextResponse } from "next/server";
import { generateStatutsPDF } from "@/lib/pdf-generator";
import type { StatutsSASData } from "@/lib/questionnaire-config";

export async function POST(request: NextRequest) {
  try {
    const data: StatutsSASData = await request.json();

    // Basic validation
    if (!data.denomination || !data.objet_social || !data.siege_social) {
      return NextResponse.json(
        { error: "Donnees incompletes. Veuillez remplir tous les champs obligatoires." },
        { status: 400 }
      );
    }

    if (!data.associes_list || data.associes_list.length === 0) {
      return NextResponse.json(
        { error: "Au moins un associe est requis." },
        { status: 400 }
      );
    }

    const pdfBuffer = generateStatutsPDF(data);
    const uint8 = new Uint8Array(pdfBuffer);

    return new NextResponse(uint8, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="statuts-${data.denomination.replace(/[^a-zA-Z0-9]/g, "_")}.pdf"`,
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la generation du PDF." },
      { status: 500 }
    );
  }
}
