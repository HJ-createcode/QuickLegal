"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const TYPE_LABELS: Record<string, string> = {
  "statuts-sas": "Statuts de SAS",
  "statuts-sci": "Statuts de SCI",
  "cgv-ecommerce": "CGV E-commerce",
  nda: "Accord de confidentialité",
};

const POLL_INTERVAL_MS = 2_000;
const POLL_TIMEOUT_MS = 60_000;

type DocStatus = {
  id: string;
  type: string;
  title: string;
  paid: boolean;
  ready: boolean;
};

function SuccessContent() {
  const searchParams = useSearchParams();
  const docId = searchParams.get("doc_id");
  const [status, setStatus] = useState<DocStatus | null>(null);
  const [error, setError] = useState("");
  const [downloading, setDownloading] = useState(false);
  const startedAtRef = useRef<number>(Date.now());

  useEffect(() => {
    if (!docId) {
      setError(
        "Référence du document manquante. Rendez-vous dans votre espace pour le retrouver."
      );
      return;
    }

    let cancelled = false;

    async function poll() {
      while (!cancelled) {
        try {
          const res = await fetch(`/api/documents/${docId}/status`, {
            cache: "no-store",
          });
          if (res.status === 404) {
            setError("Document introuvable.");
            return;
          }
          if (res.ok) {
            const data = (await res.json()) as DocStatus;
            setStatus(data);
            if (data.ready) return;
          }
        } catch {
          // transient network error, keep polling
        }

        if (Date.now() - startedAtRef.current > POLL_TIMEOUT_MS) {
          setError(
            "Votre document est en cours de préparation. Il apparaîtra dans votre espace dans un instant."
          );
          return;
        }

        await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS));
      }
    }

    poll();
    return () => {
      cancelled = true;
    };
  }, [docId]);

  useEffect(() => {
    if (status?.ready && !downloading) {
      triggerDownload();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status?.ready]);

  async function triggerDownload() {
    if (!docId) return;
    setDownloading(true);
    try {
      window.location.assign(`/api/documents/${docId}/download`);
    } finally {
      setDownloading(false);
    }
  }

  const label = status ? TYPE_LABELS[status.type] || "Document" : "Document";

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
          {status?.ready
            ? `Votre ${label.toLowerCase()} est prêt. Le téléchargement a démarré.`
            : "Nous préparons votre document. Cela prend quelques secondes."}
        </p>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-sm">
            {error}
          </div>
        )}

        {!status?.ready && !error && (
          <div className="flex items-center justify-center gap-3 text-slate-500 text-sm mb-6">
            <div className="w-4 h-4 border-2 border-slate-300 border-t-[#0f1e3d] rounded-full animate-spin" />
            <span>Génération en cours…</span>
          </div>
        )}

        {status?.ready && (
          <button
            onClick={triggerDownload}
            disabled={downloading}
            className="w-full py-3.5 rounded-xl bg-[#0f1e3d] hover:bg-[#0a1428] text-white font-semibold text-lg shadow-md transition disabled:opacity-50"
          >
            {downloading ? "Téléchargement…" : "Télécharger mon document"}
          </button>
        )}

        <div className="mt-8 pt-6 border-t border-slate-200 text-sm text-slate-600 text-left">
          <p className="font-medium text-slate-900 mb-3">Prochaines étapes :</p>
          <ul className="space-y-1.5 text-slate-600 pl-4 list-disc">
            <li>Relisez attentivement votre document</li>
            <li>Faites signer chaque partie concernée</li>
            <li>Conservez un exemplaire original</li>
            {status &&
              (status.type === "statuts-sas" || status.type === "statuts-sci") && (
                <li>Déposez le dossier d&apos;immatriculation au guichet unique INPI</li>
              )}
          </ul>
        </div>

        <div className="mt-8 flex gap-3 justify-center text-sm">
          <Link href="/dashboard" className="text-emerald-700 hover:text-emerald-800 font-medium">
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
