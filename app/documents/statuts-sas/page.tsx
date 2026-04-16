"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  STATUTS_SAS_STEPS,
  type AssocieData,
  type StatutsSASData,
} from "@/lib/questionnaire-config";

const STORAGE_KEY = "quicklegal_statuts_sas";

function emptyAssocie(): AssocieData {
  return {
    nom: "",
    prenom: "",
    date_naissance: "",
    lieu_naissance: "",
    nationalite: "Francaise",
    adresse: "",
    nombre_actions: 0,
  };
}

export default function StatutsSASPage() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, unknown>>({
    duree: 99,
    valeur_nominale: 10,
    type_apports: "numeraire",
    liberation_partielle: "totale",
    president_type: "associe",
    president_index: 1,
    president_remuneration: false,
    clause_agrement: true,
    clause_preemption: true,
    date_cloture_exercice: "31/12",
    distribution_dividendes: "proportionnelle",
    associes_list: [emptyAssocie()],
  });
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
      } catch {
        // ignore
      }
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  const updateField = useCallback((id: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  }, []);

  const currentStep = step < STATUTS_SAS_STEPS.length ? STATUTS_SAS_STEPS[step] : null;
  const isRecap = step === STATUTS_SAS_STEPS.length;
  const totalSteps = STATUTS_SAS_STEPS.length + 1;

  // ===== ASSOCIES MANAGEMENT =====
  const associes = (formData.associes_list as AssocieData[]) || [emptyAssocie()];

  function updateAssocie(index: number, field: keyof AssocieData, value: string | number) {
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

  // ===== NAVIGATION =====
  function next() {
    if (step < totalSteps - 1) setStep(step + 1);
  }
  function prev() {
    if (step > 0) setStep(step - 1);
  }

  // ===== GENERATE PDF =====
  async function handleGeneratePDF() {
    setGenerating(true);
    setError("");
    try {
      const res = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Erreur inconnue");
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `statuts-${(formData.denomination as string || "SAS").replace(/[^a-zA-Z0-9]/g, "_")}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Erreur lors de la generation");
    } finally {
      setGenerating(false);
    }
  }

  // ===== STRIPE CHECKOUT =====
  async function handleStripeCheckout() {
    setError("");
    try {
      const res = await fetch("/api/stripe/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData }),
      });
      const data = await res.json();
      if (data.demo) {
        // Stripe not configured, show message
        setError("Stripe non configure. Utilisez le bouton 'Generer le PDF (demo)' pour tester.");
        return;
      }
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      setError("Erreur lors de la redirection vers le paiement.");
    }
  }

  // ===== RENDER FIELD =====
  function renderField(field: (typeof STATUTS_SAS_STEPS)[0]["fields"][0]) {
    const value = formData[field.id];

    // Special case: associes list
    if (field.type === "associes") {
      return (
        <div key={field.id}>
          {associes.map((a, i) => (
            <div
              key={i}
              className="mb-6 p-5 rounded-xl border border-slate-700 bg-slate-800/50"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-blue-400">
                  Associe {i + 1}
                </h4>
                {associes.length > 1 && (
                  <button
                    onClick={() => removeAssocie(i)}
                    className="text-red-400 hover:text-red-300 text-sm"
                  >
                    Supprimer
                  </button>
                )}
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Prenom</label>
                  <input
                    type="text"
                    value={a.prenom}
                    onChange={(e) => updateAssocie(i, "prenom", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white focus:border-blue-500 focus:outline-none"
                    placeholder="Jean"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Nom</label>
                  <input
                    type="text"
                    value={a.nom}
                    onChange={(e) => updateAssocie(i, "nom", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white focus:border-blue-500 focus:outline-none"
                    placeholder="Dupont"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Date de naissance</label>
                  <input
                    type="text"
                    value={a.date_naissance}
                    onChange={(e) => updateAssocie(i, "date_naissance", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white focus:border-blue-500 focus:outline-none"
                    placeholder="15/03/1990"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Lieu de naissance</label>
                  <input
                    type="text"
                    value={a.lieu_naissance}
                    onChange={(e) => updateAssocie(i, "lieu_naissance", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white focus:border-blue-500 focus:outline-none"
                    placeholder="Paris (75)"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Nationalite</label>
                  <input
                    type="text"
                    value={a.nationalite}
                    onChange={(e) => updateAssocie(i, "nationalite", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white focus:border-blue-500 focus:outline-none"
                    placeholder="Francaise"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Adresse</label>
                  <input
                    type="text"
                    value={a.adresse}
                    onChange={(e) => updateAssocie(i, "adresse", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white focus:border-blue-500 focus:outline-none"
                    placeholder="10 rue de la Paix, 75002 Paris"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm text-slate-400 mb-1">
                    Nombre d&apos;actions souscrites
                  </label>
                  <input
                    type="number"
                    value={a.nombre_actions || ""}
                    onChange={(e) => updateAssocie(i, "nombre_actions", parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white focus:border-blue-500 focus:outline-none"
                    placeholder="50"
                    min={1}
                  />
                  {Number(formData.valeur_nominale) > 0 && a.nombre_actions > 0 ? (
                    <p className="text-xs text-slate-500 mt-1">
                      = {(a.nombre_actions * Number(formData.valeur_nominale)).toLocaleString("fr-FR")} EUR
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={addAssocie}
            className="w-full py-2.5 rounded-lg border-2 border-dashed border-slate-600 text-slate-400 hover:border-blue-500 hover:text-blue-400 transition text-sm"
          >
            + Ajouter un associe
          </button>
        </div>
      );
    }

    if (field.type === "toggle") {
      return (
        <div key={field.id} className="flex items-center justify-between py-3">
          <div className="flex-1">
            <label className="font-medium">{field.label}</label>
            {field.help && (
              <p className="text-xs text-slate-500 mt-0.5">{field.help}</p>
            )}
          </div>
          <button
            onClick={() => updateField(field.id, !value)}
            className={`relative w-12 h-6 rounded-full transition ${
              value ? "bg-blue-600" : "bg-slate-700"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
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
          <label className="block text-sm text-slate-400 mb-1">{field.label}</label>
          <select
            value={(value as string) || field.defaultValue?.toString() || ""}
            onChange={(e) => updateField(field.id, e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white focus:border-blue-500 focus:outline-none"
          >
            {field.options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {field.help && (
            <p className="text-xs text-slate-500 mt-1">{field.help}</p>
          )}
        </div>
      );
    }

    if (field.type === "textarea") {
      return (
        <div key={field.id}>
          <label className="block text-sm text-slate-400 mb-1">{field.label}</label>
          <textarea
            value={(value as string) || ""}
            onChange={(e) => updateField(field.id, e.target.value)}
            placeholder={field.placeholder}
            rows={4}
            className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white focus:border-blue-500 focus:outline-none resize-y"
          />
          {field.help && (
            <p className="text-xs text-slate-500 mt-1">{field.help}</p>
          )}
        </div>
      );
    }

    // text / number / date
    return (
      <div key={field.id}>
        <label className="block text-sm text-slate-400 mb-1">{field.label}</label>
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
          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white focus:border-blue-500 focus:outline-none"
        />
        {field.help && (
          <p className="text-xs text-slate-500 mt-1">{field.help}</p>
        )}
      </div>
    );
  }

  // ===== RECAP =====
  function renderRecap() {
    const capital = (formData.capital_montant as number) || 0;
    const vn = (formData.valeur_nominale as number) || 10;
    const nbActions = capital > 0 && vn > 0 ? Math.floor(capital / vn) : 0;
    const totalActionsAssocies = associes.reduce((s, a) => s + (a.nombre_actions || 0), 0);

    return (
      <div className="space-y-6">
        <div className="p-5 rounded-xl bg-slate-800/50 border border-slate-700">
          <h3 className="font-semibold text-blue-400 mb-3">La societe</h3>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-slate-400">Denomination</dt>
              <dd className="font-medium">{(formData.denomination as string) || "—"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-400">Siege social</dt>
              <dd className="font-medium">{(formData.siege_social as string) || "—"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-400">Duree</dt>
              <dd className="font-medium">{formData.duree as number} ans</dd>
            </div>
          </dl>
        </div>

        <div className="p-5 rounded-xl bg-slate-800/50 border border-slate-700">
          <h3 className="font-semibold text-blue-400 mb-3">Capital social</h3>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-slate-400">Montant</dt>
              <dd className="font-medium">{capital.toLocaleString("fr-FR")} EUR</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-400">Nombre d&apos;actions</dt>
              <dd className="font-medium">{nbActions.toLocaleString("fr-FR")}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-400">Valeur nominale</dt>
              <dd className="font-medium">{vn} EUR</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-400">Liberation</dt>
              <dd className="font-medium">
                {formData.liberation_partielle === "totale" ? "Integrale" : "50% a la constitution"}
              </dd>
            </div>
            {totalActionsAssocies !== nbActions && nbActions > 0 && (
              <div className="mt-2 p-2 rounded bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                Attention : les associes detiennent {totalActionsAssocies} actions mais le capital prevoit {nbActions} actions.
              </div>
            )}
          </dl>
        </div>

        <div className="p-5 rounded-xl bg-slate-800/50 border border-slate-700">
          <h3 className="font-semibold text-blue-400 mb-3">
            Associes ({associes.length})
          </h3>
          {associes.map((a, i) => (
            <div
              key={i}
              className="flex justify-between items-center py-2 border-b border-slate-700/50 last:border-0 text-sm"
            >
              <span>
                {a.prenom} {a.nom.toUpperCase() || "—"}
              </span>
              <span className="text-slate-400">
                {a.nombre_actions} actions ({((a.nombre_actions / (nbActions || 1)) * 100).toFixed(1)}%)
              </span>
            </div>
          ))}
        </div>

        <div className="p-5 rounded-xl bg-slate-800/50 border border-slate-700">
          <h3 className="font-semibold text-blue-400 mb-3">President</h3>
          <p className="text-sm">
            {formData.president_type === "associe"
              ? `Associe n${"\u00B0"}${formData.president_index} : ${associes[(formData.president_index as number) - 1]?.prenom || ""} ${associes[(formData.president_index as number) - 1]?.nom?.toUpperCase() || ""}`
              : (formData.president_tiers_nom as string) || "—"}
          </p>
          <p className="text-xs text-slate-500 mt-1">
            {formData.president_remuneration ? "Remunere" : "Non remunere"}
          </p>
        </div>

        <div className="p-5 rounded-xl bg-slate-800/50 border border-slate-700">
          <h3 className="font-semibold text-blue-400 mb-3">Clauses</h3>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-slate-400">Clause d&apos;agrement</dt>
              <dd>{formData.clause_agrement ? "Oui" : "Non"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-400">Clause de preemption</dt>
              <dd>{formData.clause_preemption ? "Oui" : "Non"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-400">Cloture exercice</dt>
              <dd>{formData.date_cloture_exercice as string}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-400">Dividendes</dt>
              <dd>{formData.distribution_dividendes === "proportionnelle" ? "Proportionnels" : "Statutaires"}</dd>
            </div>
          </dl>
        </div>
      </div>
    );
  }

  // ===== CONDITIONAL FIELD VISIBILITY =====
  function shouldShowField(field: (typeof STATUTS_SAS_STEPS)[0]["fields"][0]): boolean {
    if (field.id === "president_index" && formData.president_type !== "associe") return false;
    if (field.id === "president_tiers_nom" && formData.president_type !== "tiers") return false;
    if (field.id === "president_tiers_adresse" && formData.president_type !== "tiers") return false;
    return true;
  }

  return (
    <main className="min-h-screen">
      {/* NAV */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 h-16">
          <Link href="/" className="text-xl font-bold tracking-tight">
            <span className="text-blue-400">Quick</span>Legal
          </Link>
          <span className="text-sm text-slate-400">Statuts de SAS — 79 EUR</span>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-4 max-w-2xl mx-auto">
        {/* PROGRESS BAR */}
        <div className="mb-8">
          <div className="flex justify-between text-xs text-slate-500 mb-2">
            <span>
              Etape {step + 1} / {totalSteps}
            </span>
            <span>{isRecap ? "Recapitulatif" : currentStep?.title}</span>
          </div>
          <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-300"
              style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* STEP CONTENT */}
        {!isRecap && currentStep && (
          <div>
            <h2 className="text-2xl font-bold mb-1">{currentStep.title}</h2>
            <p className="text-slate-400 text-sm mb-8">{currentStep.description}</p>
            <div className="space-y-5">
              {currentStep.fields
                .filter(shouldShowField)
                .map((field) => renderField(field))}
            </div>
          </div>
        )}

        {/* RECAP */}
        {isRecap && (
          <div>
            <h2 className="text-2xl font-bold mb-1">Recapitulatif</h2>
            <p className="text-slate-400 text-sm mb-8">
              Verifiez les informations avant de generer vos statuts.
            </p>
            {renderRecap()}

            {error && (
              <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error}
              </div>
            )}

            <div className="mt-8 space-y-3">
              <button
                onClick={handleStripeCheckout}
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-lg transition"
              >
                Payer 79 EUR et telecharger
              </button>
              <button
                onClick={handleGeneratePDF}
                disabled={generating}
                className="w-full py-3 rounded-xl border border-slate-600 text-slate-300 hover:bg-slate-800 font-medium transition text-sm disabled:opacity-50"
              >
                {generating ? "Generation en cours..." : "Generer le PDF (demo gratuite)"}
              </button>
              <p className="text-xs text-slate-600 text-center">
                La demo genere un PDF avec filigrane. Le paiement donne acces au document final.
              </p>
            </div>
          </div>
        )}

        {/* NAVIGATION */}
        <div className="flex justify-between mt-10">
          <button
            onClick={prev}
            disabled={step === 0}
            className="px-6 py-2.5 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 transition disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Precedent
          </button>
          {!isRecap && (
            <button
              onClick={next}
              className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition"
            >
              {step === STATUTS_SAS_STEPS.length - 1 ? "Recapitulatif" : "Suivant"}
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
