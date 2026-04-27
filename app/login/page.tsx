"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Suspense } from "react";
import { SiteNavClient } from "@/components/SiteNavClient";

// Only accept relative URLs starting with a single "/", to prevent open-redirect
// attacks such as /login?callbackUrl=https://phishing.com.
function safeCallbackUrl(raw: string | null): string {
  if (!raw) return "/dashboard";
  if (!raw.startsWith("/")) return "/dashboard";
  if (raw.startsWith("//")) return "/dashboard";
  if (raw.startsWith("/\\")) return "/dashboard";
  return raw;
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = safeCallbackUrl(searchParams.get("callbackUrl"));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error("Email ou mot de passe incorrect.");
      }

      router.push(callbackUrl);
      router.refresh();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Erreur inconnue.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50/60 via-white to-white">
      <SiteNavClient variant="solid" current="/login" />
      <div className="flex items-center justify-center px-4 py-12 min-h-[calc(100vh-4rem)]">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-premium border border-slate-200 p-8">
          <h1 className="font-serif text-2xl font-bold text-slate-900 mb-2">Connexion</h1>
          <p className="text-slate-600 text-sm mb-6">
            Accédez à votre espace personnel.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
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
                className="w-full px-3 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-900 placeholder-slate-400"
              />
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-[#0f1e3d] hover:bg-[#0a1428] text-white font-semibold shadow-md transition disabled:opacity-50"
            >
              {loading ? "Connexion..." : "Se connecter"}
            </button>
          </form>

          <p className="text-center text-sm text-slate-600 mt-6">
            Pas encore de compte ?{" "}
            <Link href="/signup" className="text-emerald-700 hover:text-emerald-800 font-medium">
              Créez-en un
            </Link>
          </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Chargement...</div>}>
      <LoginForm />
    </Suspense>
  );
}
