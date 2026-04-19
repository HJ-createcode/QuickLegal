"use client";

import { Wizard } from "@/components/Wizard";
import { NDA_STEPS } from "@/lib/questionnaire-configs/nda";

const INITIAL: Record<string, unknown> = {
  type_nda: "bilateral",
  partie_a_type: "societe",
  partie_b_type: "societe",
  duree_confidentialite: 5,
  tribunal_competent: "Paris",
  contient_donnees_personnelles: true,
  nature_informations:
    "Toute information de nature technique, commerciale, financière, stratégique, opérationnelle ou relative aux savoir-faire, échangée dans le cadre des discussions entre les parties",
};

function RecapNDA({ data }: { data: Record<string, unknown> }) {
  return (
    <div className="space-y-4">
      <Section title="Type d'accord">
        <Row
          label="Type"
          value={data.type_nda === "bilateral" ? "Bilatéral (réciproque)" : "Unilatéral"}
        />
        <Row label="Durée" value={`${data.duree_confidentialite} ans`} />
      </Section>
      <Section title="Partie A">
        <Row label="Nom" value={(data.partie_a_nom as string) || "—"} />
        <Row
          label="Type"
          value={data.partie_a_type === "societe" ? "Société" : "Personne physique"}
        />
        {(data.partie_a_forme as string) && (
          <Row label="Forme" value={data.partie_a_forme as string} />
        )}
        <Row label="Adresse" value={(data.partie_a_adresse as string) || "—"} />
      </Section>
      <Section title="Partie B">
        <Row label="Nom" value={(data.partie_b_nom as string) || "—"} />
        <Row
          label="Type"
          value={data.partie_b_type === "societe" ? "Société" : "Personne physique"}
        />
        {(data.partie_b_forme as string) && (
          <Row label="Forme" value={data.partie_b_forme as string} />
        )}
        <Row label="Adresse" value={(data.partie_b_adresse as string) || "—"} />
      </Section>
      <Section title="Contexte">
        <p className="text-sm text-slate-700 leading-relaxed">
          {(data.contexte as string) || "—"}
        </p>
      </Section>
      <Section title="Clauses">
        {data.penalites ? (
          <Row
            label="Clause pénale"
            value={`${Number(data.penalites).toLocaleString("fr-FR")} €`}
          />
        ) : null}
        <Row label="Tribunal" value={(data.tribunal_competent as string) || "—"} />
        <Row
          label="Données personnelles"
          value={data.contient_donnees_personnelles ? "Oui (clause RGPD)" : "Non"}
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
    <div className="flex justify-between text-sm py-1 gap-3">
      <dt className="text-slate-500 flex-shrink-0">{label}</dt>
      <dd className="font-medium text-slate-900 text-right truncate">{value}</dd>
    </div>
  );
}

export default function NDAPage() {
  return (
    <Wizard
      documentType="nda"
      documentLabel="NDA"
      price={39}
      steps={NDA_STEPS}
      storageKey="quicklegal_nda"
      initialData={INITIAL}
      renderRecap={(data) => <RecapNDA data={data} />}
    />
  );
}
