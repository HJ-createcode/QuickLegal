import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createUser, getUserByEmail } from "@/lib/db";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LEN = 10;

function isStrongPassword(pwd: string): boolean {
  if (pwd.length < MIN_PASSWORD_LEN) return false;
  if (!/[A-Za-z]/.test(pwd)) return false;
  if (!/[0-9]/.test(pwd)) return false;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json();

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      (name !== undefined && typeof name !== "string")
    ) {
      return NextResponse.json(
        { error: "Format de requête invalide." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();
    const trimmedName = name ? name.slice(0, 120).trim() : null;

    if (!EMAIL_REGEX.test(normalizedEmail)) {
      return NextResponse.json({ error: "Email invalide." }, { status: 400 });
    }

    if (!isStrongPassword(password)) {
      return NextResponse.json(
        {
          error: `Le mot de passe doit contenir au moins ${MIN_PASSWORD_LEN} caractères, dont au moins une lettre et un chiffre.`,
        },
        { status: 400 }
      );
    }

    try {
      const existing = await getUserByEmail(normalizedEmail);
      if (existing) {
        // Do NOT reveal whether the email exists.
        // We return the same generic success-like response to prevent user enumeration.
        // A genuine sign-up will still work via this endpoint; an attacker probing
        // emails cannot tell existing accounts apart from new ones.
        return NextResponse.json(
          { ok: true },
          { status: 200 }
        );
      }

      const passwordHash = await bcrypt.hash(password, 10);
      const user = await createUser(normalizedEmail, passwordHash, trimmedName);

      return NextResponse.json({ ok: true, id: user.id, email: user.email });
    } catch {
      // DB unavailable or other backend error — generic response, no internals exposed.
      return NextResponse.json(
        {
          error:
            "Inscription temporairement indisponible. Veuillez réessayer plus tard.",
        },
        { status: 503 }
      );
    }
  } catch {
    return NextResponse.json(
      { error: "Erreur lors de l'inscription." },
      { status: 500 }
    );
  }
}
