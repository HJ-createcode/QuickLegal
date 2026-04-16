"use client";

import { useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "quicklegal_statuts_sas";

export default function SuccessPage() {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [error, setError] = useState("");

  async function handleDownload() {
    setDownloading(true);
    setError("");
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        throw new Error("Donnees du formulaire introuvables. Veuillez regenerer vos statuts.");
      }
      const formData = JSON.parse(saved);

      const res = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Erreur de generation");
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `statuts-${(formData.denomination || "SAS").replace(/[^a-zA-Z0-9]/g, "_")}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
      setDownloaded(true);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Erreur");
    } finally {
      setDownloading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-3xl font-bold mb-2">Paiement confirme</h1>
        <p className="text-slate-400 mb-8">
          Vos statuts de SAS sont prets. Telechargez votre document ci-dessous.
        </p>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        {!downloaded ? (
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-lg transition disabled:opacity-50"
          >
            {downloading ? "Generation du PDF..." : "Telecharger mes statuts (PDF)"}
          </button>
        ) : (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400">
              Document telecharge avec succes.
            </div>
            <button
              onClick={handleDownload}
              className="w-full py-2.5 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 transition text-sm"
            >
              Telecharger a nouveau
            </button>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-slate-800 text-sm text-slate-500 space-y-2">
          <p>Prochaines etapes :</p>
          <ul className="text-left space-y-1.5 ml-4 list-disc">
            <li>Relisez attentivement vos statuts</li>
            <li>Faites signer chaque associe (paraphes + signature finale)</li>
            <li>Deposez le capital a la banque</li>
            <li>Publiez l&apos;annonce legale de constitution</li>
            <li>Immatriculez la societe au greffe (guichet unique INPI)</li>
          </ul>
        </div>

        <Link
          href="/"
          className="inline-block mt-8 text-blue-400 hover:text-blue-300 text-sm transition"
        >
          Retour a l&apos;accueil
        </Link>
      </div>
    </main>
  );
}
