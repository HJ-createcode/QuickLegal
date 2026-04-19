"use client";

import { Wizard } from "@/components/Wizard";
import { STATUTS_SCI_STEPS } from "@/lib/questionnaire-configs/statuts-sci";
import type { SCIAssocieData } from "@/lib/questionnaire-configs/statuts-sci";

const INITIAL: Record<string, unknown> = {
  duree: 99,
  valeur_nominale: 10,
  type_apports: "numeraire",
  gerant_type: "associe",
  gerant_index: 1,
  gerant_remuneration: false,
  regime_fiscal: "ir",
  clause_agrement: true,
  date_cloture_exercice: "31/12",
  associes_list: [
    { nom: "", prenom: "", date_naissance: "", lieu_naissance: "", nationalite: "Française", adresse: "", nombre_actions: 0 },
    { nom: "", prenom: "", date_naissance: "", lieu_naissance: "", nationalite: "Française", adresse: "", nombre_actions: 0 },
  ],
};

function RecapSCI({ data }: { data: Record<string, unknown> }) {
  const associes = (data.associes_list as SCIAssocieData[]) || [];
  const capital = Number(data.capital_montant) || 0;
  const vn = Number(data.valeur_nominale) || 10;
  const nbParts = capital > 0 && vn > 0 ? Math.floor(capital / vn) : 0;

  return (
    <div className="space-y-4">
      <Section title="La société">
        <Row label="Dénomination" value={(data.denomination as string) || "—"} />
        <Row label="Siège social" value={(data.siege_social as string) || "—"} />
        <Row label="Durée" value={`${data.duree} ans`} />
      </Section>
      <Section title="Capital social">
        <Row label="Montant" value={`${capital.toLocaleString("fr-FR")} €`} />
        <Row label="Parts sociales" value={nbParts.toLocaleString("fr-FR")} />
        <Row label="Valeur nominale" value={`${vn} €`} />
      </Section>
      <Section title={`Associés (${associes.length})`}>
        {associes.map((a, i) => (
          <Row
            key={i}
            label={`${a.prenom} ${a.nom.toUpperCase()}`}
            value={`${a.nombre_actions} parts (${((a.nombre_actions / (nbParts || 1)) * 100).toFixed(1)} %)`}
          />
        ))}
        {associes.length < 2 && (
          <div className="mt-2 p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs">
            Une SCI requiert au moins deux associés.
          </div>
        )}
      </Section>
      <Section title="Gérance">
        <p className="text-sm text-slate-700">
          {data.gerant_type === "cogerance"
            ? "Cogérance (tous les associés)"
            : data.gerant_type === "associe"
              ? `Associé n° ${data.gerant_index} : ${associes[Number(data.gerant_index) - 1]?.prenom || ""} ${associes[Number(data.gerant_index) - 1]?.nom?.toUpperCase() || ""}`
              : (data.gerant_tiers_nom as string) || "—"}
        </p>
        <p className="text-xs text-slate-500 mt-1">
          {data.gerant_remuneration ? "Rémunéré" : "Non rémunéré"}
        </p>
      </Section>
      <Section title="Régime et clauses">
        <Row label="Régime fiscal" value={data.regime_fiscal === "is" ? "IS (irrévocable)" : "IR (par défaut)"} />
        <Row label="Clause d'agrément" value={data.clause_agrement ? "Oui" : "Non"} />
        <Row label="Clôture exercice" value={data.date_cloture_exercice as string} />
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

export default function StatutsSCIPage() {
  return (
    <Wizard
      documentType="statuts-sci"
      documentLabel="Statuts de SCI"
      price={89}
      steps={STATUTS_SCI_STEPS}
      storageKey="quicklegal_statuts_sci"
      initialData={INITIAL}
      renderRecap={(data) => <RecapSCI data={data} />}
      shouldShowField={(field, data) => {
        if (field.id === "gerant_index" && data.gerant_type !== "associe") return false;
        if (field.id === "gerant_tiers_nom" && data.gerant_type !== "tiers") return false;
        if (field.id === "gerant_tiers_adresse" && data.gerant_type !== "tiers") return false;
        return true;
      }}
    />
  );
}
