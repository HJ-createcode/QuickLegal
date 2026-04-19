import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createUser, getUserByEmail } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email et mot de passe requis." },
        { status: 400 }
      );
    }

    const normalizedEmail = String(email).toLowerCase().trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      return NextResponse.json({ error: "Email invalide." }, { status: 400 });
    }

    if (String(password).length < 8) {
      return NextResponse.json(
        { error: "Le mot de passe doit contenir au moins 8 caractères." },
        { status: 400 }
      );
    }

    try {
      const existing = await getUserByEmail(normalizedEmail);
      if (existing) {
        return NextResponse.json(
          { error: "Un compte existe déjà avec cet email." },
          { status: 409 }
        );
      }

      const passwordHash = await bcrypt.hash(String(password), 10);
      const user = await createUser(normalizedEmail, passwordHash, name || null);

      return NextResponse.json({
        id: user.id,
        email: user.email,
      });
    } catch (dbError) {
      console.error("DB error:", dbError);
      return NextResponse.json(
        {
          error:
            "La base de données n'est pas configurée. Connectez une base Neon via Vercel Storage pour activer les comptes.",
        },
        { status: 503 }
      );
    }
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'inscription." },
      { status: 500 }
    );
  }
}
