"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Erreur lors de la création du compte.");
      }

      // Auto sign in after signup. If the email was already in use (the API
      // does not disclose this to prevent user enumeration), the credentials
      // we just submitted will likely not match the existing account's
      // password, so signIn will return an error. In that case, ask the user
      // to log in manually.
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(
          "Inscription enregistrée. Merci de vous connecter avec vos identifiants."
        );
      }

      router.push("/dashboard");
      router.refresh();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Erreur inconnue.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-b from-sky-50/60 via-white to-white">
      <div className="max-w-md w-full">
        <Link href="/" className="block text-center mb-8">
          <span className="font-serif text-3xl font-bold text-slate-900">
            Quick<span className="text-blue-500">Legal</span>
          </span>
        </Link>

        <div className="bg-white rounded-2xl shadow-premium border border-slate-200 p-8">
          <h1 className="font-serif text-2xl font-bold text-slate-900 mb-2">Créer un compte</h1>
          <p className="text-slate-600 text-sm mb-6">
            Accédez à votre espace personnel et retrouvez vos documents générés.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Nom complet (facultatif)
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jean Dupont"
                className="w-full px-3 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-900 placeholder-slate-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="vous@exemple.fr"
                className="w-full px-3 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-900 placeholder-slate-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={10}
                placeholder="Au moins 10 caractères, 1 lettre, 1 chiffre"
                className="w-full px-3 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-900 placeholder-slate-400"
              />
              <p className="text-xs text-slate-500 mt-1.5">
                10 caractères minimum, avec au moins une lettre et un chiffre.
              </p>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow-md transition disabled:opacity-50"
            >
              {loading ? "Création en cours..." : "Créer mon compte"}
            </button>
          </form>

          <p className="text-center text-sm text-slate-600 mt-6">
            Déjà un compte ?{" "}
            <Link href="/login" className="text-blue-500 hover:text-blue-600 font-medium">
              Connectez-vous
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
