"use client";

import { Wizard } from "@/components/Wizard";
import { STATUTS_SAS_STEPS } from "@/lib/questionnaire-configs/statuts-sas";
import type { AssocieData } from "@/lib/questionnaire-configs/statuts-sas";

const INITIAL: Record<string, unknown> = {
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
  associes_list: [
    {
      nom: "",
      prenom: "",
      date_naissance: "",
      lieu_naissance: "",
      nationalite: "Française",
      adresse: "",
      nombre_actions: 0,
    },
  ],
};

function RecapSAS({ data }: { data: Record<string, unknown> }) {
  const associes = (data.associes_list as AssocieData[]) || [];
  const capital = Number(data.capital_montant) || 0;
  const vn = Number(data.valeur_nominale) || 10;
  const nbActions = capital > 0 && vn > 0 ? Math.floor(capital / vn) : 0;
  const total = associes.reduce((s, a) => s + (a.nombre_actions || 0), 0);

  return (
    <div className="space-y-4">
      <Section title="La société">
        <Row label="Dénomination" value={(data.denomination as string) || "—"} />
        <Row label="Siège social" value={(data.siege_social as string) || "—"} />
        <Row label="Durée" value={`${data.duree} ans`} />
      </Section>

      <Section title="Capital social">
        <Row label="Montant" value={`${capital.toLocaleString("fr-FR")} €`} />
        <Row label="Actions" value={nbActions.toLocaleString("fr-FR")} />
        <Row label="Valeur nominale" value={`${vn} €`} />
        <Row
          label="Libération"
          value={data.liberation_partielle === "totale" ? "Intégrale" : "50 % à la constitution"}
        />
        {total !== nbActions && nbActions > 0 && (
          <div className="mt-2 p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs">
            Attention : les associés détiennent {total} actions mais le capital en prévoit {nbActions}.
          </div>
        )}
      </Section>

      <Section title={`Associés (${associes.length})`}>
        {associes.map((a, i) => (
          <Row
            key={i}
            label={`${a.prenom} ${a.nom.toUpperCase()}`}
            value={`${a.nombre_actions} actions (${((a.nombre_actions / (nbActions || 1)) * 100).toFixed(1)} %)`}
          />
        ))}
      </Section>

      <Section title="Président">
        <p className="text-sm text-slate-700">
          {data.president_type === "associe"
            ? `Associé n° ${data.president_index} : ${associes[Number(data.president_index) - 1]?.prenom || ""} ${associes[Number(data.president_index) - 1]?.nom?.toUpperCase() || ""}`
            : (data.president_tiers_nom as string) || "—"}
        </p>
        <p className="text-xs text-slate-500 mt-1">
          {data.president_remuneration ? "Rémunéré" : "Non rémunéré"}
        </p>
      </Section>

      <Section title="Clauses">
        <Row label="Clause d'agrément" value={data.clause_agrement ? "Oui" : "Non"} />
        <Row label="Clause de préemption" value={data.clause_preemption ? "Oui" : "Non"} />
        <Row label="Clôture exercice" value={data.date_cloture_exercice as string} />
        <Row
          label="Dividendes"
          value={data.distribution_dividendes === "proportionnelle" ? "Proportionnels" : "Statutaires"}
        />
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-premium">
      <h3 className="font-serif font-semibold text-slate-900 mb-3">{title}</h3>
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm py-1">
      <dt className="text-slate-500">{label}</dt>
      <dd className="font-medium text-slate-900 text-right">{value}</dd>
    </div>
  );
}

export default function StatutsSASPage() {
  return (
    <Wizard
      documentType="statuts-sas"
      documentLabel="Statuts de SAS"
      price={79}
      steps={STATUTS_SAS_STEPS}
      storageKey="quicklegal_statuts_sas"
      initialData={INITIAL}
      renderRecap={(data) => <RecapSAS data={data} />}
      shouldShowField={(field, data) => {
        if (field.id === "president_index" && data.president_type !== "associe") return false;
        if (field.id === "president_tiers_nom" && data.president_type !== "tiers") return false;
        if (field.id === "president_tiers_adresse" && data.president_type !== "tiers") return false;
        return true;
      }}
    />
  );
}
