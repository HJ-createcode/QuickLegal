import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createDocument, listUserDocuments } from "@/lib/db";

export async function GET() {
  const session = await auth();
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) {
    return NextResponse.json({ error: "Non authentifié." }, { status: 401 });
  }

  try {
    const docs = await listUserDocuments(userId);
    return NextResponse.json({ documents: docs });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Erreur de base de données." },
      { status: 503 }
    );
  }
}

export async function POST(request: NextRequest) {
  const session = await auth();
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) {
    return NextResponse.json({ error: "Non authentifié." }, { status: 401 });
  }

  try {
    const { type, title, formData, pdfUrl, paid } = await request.json();
    const doc = await createDocument(userId, type, title, formData, pdfUrl || null, !!paid);
    return NextResponse.json({ document: doc });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Erreur de base de données." },
      { status: 503 }
    );
  }
}
