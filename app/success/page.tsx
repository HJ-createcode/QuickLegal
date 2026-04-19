"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const TYPE_LABELS: Record<string, string> = {
  "statuts-sas": "Statuts de SAS",
  "statuts-sci": "Statuts de SCI",
  "cgv-ecommerce": "CGV E-commerce",
  nda: "Accord de confidentialité",
};

const STORAGE_KEYS: Record<string, string> = {
  "statuts-sas": "quicklegal_statuts_sas",
  "statuts-sci": "quicklegal_statuts_sci",
  "cgv-ecommerce": "quicklegal_cgv_ecommerce",
  nda: "quicklegal_nda",
};

function SuccessContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "statuts-sas";
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [error, setError] = useState("");

  const label = TYPE_LABELS[type] || "Document";

  useEffect(() => {
    // Auto-trigger the download once on mount
    handleDownload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleDownload() {
    setDownloading(true);
    setError("");
    try {
      const key = STORAGE_KEYS[type];
      const saved = key ? localStorage.getItem(key) : null;
      if (!saved) {
        throw new Error(
          "Données du formulaire introuvables. Veuillez régénérer votre document."
        );
      }
      const formData = JSON.parse(saved);

      const res = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, data: formData }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Erreur de génération");
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const name =
        (formData.denomination as string) ||
        (formData.partie_a_nom as string) ||
        label;
      a.download = `${type}-${name.replace(/[^a-zA-Z0-9]/g, "_")}.pdf`;
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
    <main className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-b from-sky-50/60 via-white to-white">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-10 h-10 text-emerald-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="font-serif text-3xl font-bold text-slate-900 mb-2">
          Paiement confirmé
        </h1>
        <p className="text-slate-600 mb-8">
          Votre {label.toLowerCase()} est prêt. Le téléchargement a démarré automatiquement.
        </p>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
            {error}
          </div>
        )}

        {downloaded ? (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700">
              Document téléchargé avec succès.
            </div>
            <button
              onClick={handleDownload}
              className="w-full py-3 rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 font-medium transition text-sm"
            >
              Télécharger à nouveau
            </button>
          </div>
        ) : (
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="w-full py-3.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold text-lg shadow-md transition disabled:opacity-50"
          >
            {downloading ? "Génération du PDF..." : "Télécharger mon document"}
          </button>
        )}

        <div className="mt-8 pt-6 border-t border-slate-200 text-sm text-slate-600 text-left">
          <p className="font-medium text-slate-900 mb-3">Prochaines étapes :</p>
          <ul className="space-y-1.5 text-slate-600 pl-4 list-disc">
            <li>Relisez attentivement votre document</li>
            <li>Faites signer chaque partie concernée</li>
            <li>Conservez un exemplaire original</li>
            {(type === "statuts-sas" || type === "statuts-sci") && (
              <li>Déposez le dossier d&apos;immatriculation au guichet unique INPI</li>
            )}
          </ul>
        </div>

        <div className="mt-8 flex gap-3 justify-center text-sm">
          <Link href="/dashboard" className="text-blue-500 hover:text-blue-600 font-medium">
            Aller à mon espace
          </Link>
          <span className="text-slate-300">•</span>
          <Link href="/" className="text-slate-600 hover:text-slate-900 font-medium">
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Chargement...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
