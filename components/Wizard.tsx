"use client";

import { useState, useEffect, useCallback, ReactNode } from "react";
import Link from "next/link";
import type { QuestionnaireStep, QuestionField } from "@/lib/questionnaire-configs/statuts-sas";

type AssocieRow = {
  nom: string;
  prenom: string;
  date_naissance: string;
  lieu_naissance: string;
  nationalite: string;
  adresse: string;
  nombre_actions: number;
};

function emptyAssocie(): AssocieRow {
  return {
    nom: "",
    prenom: "",
    date_naissance: "",
    lieu_naissance: "",
    nationalite: "Française",
    adresse: "",
    nombre_actions: 0,
  };
}

export interface WizardProps {
  documentType: string;
  documentLabel: string;
  price: number;
  steps: QuestionnaireStep[];
  storageKey: string;
  initialData: Record<string, unknown>;
  renderRecap: (data: Record<string, unknown>) => ReactNode;
  shouldShowField?: (field: QuestionField, data: Record<string, unknown>) => boolean;
}

export function Wizard({
  documentType,
  documentLabel,
  price,
  steps,
  storageKey,
  initialData,
  renderRecap,
  shouldShowField,
}: WizardProps) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, unknown>>(initialData);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        setFormData({ ...initialData, ...JSON.parse(saved) });
      } catch {
        // ignore
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(formData));
  }, [formData, storageKey]);

  const updateField = useCallback((id: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  }, []);

  const currentStep = step < steps.length ? steps[step] : null;
  const isRecap = step === steps.length;
  const totalSteps = steps.length + 1;

  const associes = ((formData.associes_list as AssocieRow[]) || [emptyAssocie()]);

  function updateAssocie(index: number, field: keyof AssocieRow, value: string | number) {
    const updated = [...associes];
    updated[index] = { ...updated[index], [field]: value };
    updateField("associes_list", updated);
  }

  function addAssocie() {
    updateField("associes_list", [...associes, emptyAssocie()]);
  }

  function removeAssocie(index: number) {
    if (associes.length <= 1) return;
    const updated = associes.filter((_, i) => i !== index);
    updateField("associes_list", updated);
  }

  function next() {
    if (step < totalSteps - 1) setStep(step + 1);
    window.scrollTo(0, 0);
  }
  function prev() {
    if (step > 0) setStep(step - 1);
    window.scrollTo(0, 0);
  }

  async function handleGeneratePDF() {
    setGenerating(true);
    setError("");
    try {
      const res = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: documentType, data: formData }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Erreur inconnue");
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const filename = (formData.denomination as string) || (formData.partie_a_nom as string) || documentLabel;
      a.download = `${documentType}-${filename.replace(/[^a-zA-Z0-9]/g, "_")}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Erreur lors de la génération");
    } finally {
      setGenerating(false);
    }
  }

  async function handleStripeCheckout() {
    setError("");
    try {
      const res = await fetch("/api/stripe/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: documentType, formData }),
      });
      const data = await res.json();
      if (data.demo) {
        setError("Stripe non configuré. Utilisez le bouton « Générer le PDF (démo) » pour tester.");
        return;
      }
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      setError("Erreur lors de la redirection vers le paiement.");
    }
  }

  function renderField(field: QuestionField) {
    const value = formData[field.id];
    const showIt = shouldShowField ? shouldShowField(field, formData) : true;
    if (!showIt) return null;

    if (field.type === "associes") {
      return (
        <div key={field.id}>
          {associes.map((a, i) => (
            <div
              key={i}
              className="mb-5 p-5 rounded-2xl border border-slate-200 bg-white shadow-premium"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-serif font-semibold text-slate-900 text-lg">
                  Associé {i + 1}
                </h4>
                {associes.length > 1 && (
                  <button
                    onClick={() => removeAssocie(i)}
                    className="text-red-500 hover:text-red-600 text-sm font-medium"
                  >
                    Supprimer
                  </button>
                )}
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Prénom</label>
                  <input
                    type="text"
                    value={a.prenom}
                    onChange={(e) => updateAssocie(i, "prenom", e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-900 placeholder-slate-400"
                    placeholder="Jean"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nom</label>
                  <input
                    type="text"
                    value={a.nom}
                    onChange={(e) => updateAssocie(i, "nom", e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-900 placeholder-slate-400"
                    placeholder="Dupont"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Date de naissance</label>
                  <input
                    type="text"
                    value={a.date_naissance}
                    onChange={(e) => updateAssocie(i, "date_naissance", e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-900 placeholder-slate-400"
                    placeholder="15/03/1990"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Lieu de naissance</label>
                  <input
                    type="text"
                    value={a.lieu_naissance}
                    onChange={(e) => updateAssocie(i, "lieu_naissance", e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-900 placeholder-slate-400"
                    placeholder="Paris (75)"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nationalité</label>
                  <input
                    type="text"
                    value={a.nationalite}
                    onChange={(e) => updateAssocie(i, "nationalite", e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-900 placeholder-slate-400"
                    placeholder="Française"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Adresse</label>
                  <input
                    type="text"
                    value={a.adresse}
                    onChange={(e) => updateAssocie(i, "adresse", e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-900 placeholder-slate-400"
                    placeholder="10 rue de la Paix, 75002 Paris"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Nombre {documentType === "statuts-sas" ? "d'actions" : "de parts"} souscrites
                  </label>
                  <input
                    type="number"
                    value={a.nombre_actions || ""}
                    onChange={(e) => updateAssocie(i, "nombre_actions", parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-900 placeholder-slate-400"
                    placeholder="50"
                    min={1}
                  />
                  {Number(formData.valeur_nominale) > 0 && a.nombre_actions > 0 ? (
                    <p className="text-xs text-slate-500 mt-1">
                      = {(a.nombre_actions * Number(formData.valeur_nominale)).toLocaleString("fr-FR")} €
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={addAssocie}
            className="w-full py-3 rounded-xl border-2 border-dashed border-slate-300 text-slate-600 hover:border-emerald-400 hover:text-emerald-700 hover:bg-emerald-50 transition text-sm font-medium"
          >
            + Ajouter un associé
          </button>
        </div>
      );
    }

    if (field.type === "toggle") {
      return (
        <div key={field.id} className="flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-200">
          <div className="flex-1">
            <label className="font-medium text-slate-900">{field.label}</label>
            {field.help && (
              <p className="text-xs text-slate-500 mt-1">{field.help}</p>
            )}
          </div>
          <button
            onClick={() => updateField(field.id, !value)}
            className={`relative flex-shrink-0 w-12 h-6 rounded-full transition ${
              value ? "bg-[#0f1e3d]" : "bg-slate-300"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                value ? "translate-x-6" : ""
              }`}
            />
          </button>
        </div>
      );
    }

    if (field.type === "select") {
      return (
        <div key={field.id}>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">{field.label}</label>
          <select
            value={(value as string) ?? (field.defaultValue?.toString() || "")}
            onChange={(e) => updateField(field.id, e.target.value)}
            className="w-full px-3 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-900"
          >
            {field.options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {field.help && (
            <p className="text-xs text-slate-500 mt-1.5">{field.help}</p>
          )}
        </div>
      );
    }

    if (field.type === "textarea") {
      return (
        <div key={field.id}>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">{field.label}</label>
          <textarea
            value={(value as string) ?? (field.defaultValue?.toString() || "")}
            onChange={(e) => updateField(field.id, e.target.value)}
            placeholder={field.placeholder}
            rows={4}
            className="w-full px-3 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-900 placeholder-slate-400 resize-y"
          />
          {field.help && (
            <p className="text-xs text-slate-500 mt-1.5">{field.help}</p>
          )}
        </div>
      );
    }

    return (
      <div key={field.id}>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">{field.label}</label>
        <input
          type={field.type}
          value={(value as string | number) ?? field.defaultValue ?? ""}
          onChange={(e) =>
            updateField(
              field.id,
              field.type === "number" ? parseFloat(e.target.value) || 0 : e.target.value
            )
          }
          placeholder={field.placeholder}
          className="w-full px-3 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-900 placeholder-slate-400"
        />
        {field.help && (
          <p className="text-xs text-slate-500 mt-1.5">{field.help}</p>
        )}
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50/60 via-white to-white">
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 h-16">
          <Link href="/" className="font-serif text-xl font-bold tracking-tight text-slate-900">
            Quick<span className="text-emerald-700">Legal</span>
          </Link>
          <span className="text-sm text-slate-500 font-medium">
            {documentLabel} — {price} €
          </span>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-4 max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between text-xs text-slate-500 mb-2">
            <span>
              Étape {step + 1} sur {totalSteps}
            </span>
            <span className="font-medium">
              {isRecap ? "Récapitulatif" : currentStep?.title}
            </span>
          </div>
          <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#0f1e3d] rounded-full transition-all duration-300"
              style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {!isRecap && currentStep && (
          <div>
            <h2 className="font-serif text-3xl font-bold text-slate-900 mb-2">{currentStep.title}</h2>
            <p className="text-slate-600 text-sm mb-8">{currentStep.description}</p>
            <div className="space-y-5">
              {currentStep.fields.map((field) => renderField(field))}
            </div>
          </div>
        )}

        {isRecap && (
          <div>
            <h2 className="font-serif text-3xl font-bold text-slate-900 mb-2">Récapitulatif</h2>
            <p className="text-slate-600 text-sm mb-8">
              Vérifiez les informations avant de générer votre document.
            </p>
            {renderRecap(formData)}

            {error && (
              <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                {error}
              </div>
            )}

            <div className="mt-8 space-y-3">
              <button
                onClick={handleStripeCheckout}
                className="w-full py-3.5 rounded-xl bg-[#0f1e3d] hover:bg-[#0a1428] text-white font-semibold text-lg transition shadow-lg shadow-slate-900/10"
              >
                Payer {price} € et télécharger
              </button>
              <button
                onClick={handleGeneratePDF}
                disabled={generating}
                className="w-full py-3 rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 font-medium transition text-sm disabled:opacity-50"
              >
                {generating ? "Génération en cours..." : "Générer le PDF (démo gratuite)"}
              </button>
              <p className="text-xs text-slate-500 text-center">
                La démo génère un PDF avec filigrane. Le paiement débloque le document final.
              </p>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-10">
          <button
            onClick={prev}
            disabled={step === 0}
            className="px-6 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 transition disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Précédent
          </button>
          {!isRecap && (
            <button
              onClick={next}
              className="px-6 py-2.5 rounded-lg bg-[#0f1e3d] hover:bg-[#0a1428] text-white font-medium transition shadow-sm"
            >
              {step === steps.length - 1 ? "Récapitulatif" : "Suivant"}
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
