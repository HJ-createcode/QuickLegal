"use client";

import { Wizard } from "@/components/Wizard";
import { CGV_ECOMMERCE_STEPS } from "@/lib/questionnaire-configs/cgv-ecommerce";

const INITIAL: Record<string, unknown> = {
  forme_juridique: "sas",
  clientele: "b2c",
  zones_livraison: "france",
  delai_livraison: "3 à 5 jours ouvrés",
  moyens_paiement: "Carte bancaire, PayPal",
  duree_retractation: "14",
  mediateur_nom: "CNPM - Médiation de la consommation",
  mediateur_url: "https://cnpm-mediation-consommation.eu",
  duree_conservation_commandes: 10,
  utilise_cookies: true,
};

function RecapCGV({ data }: { data: Record<string, unknown> }) {
  return (
    <div className="space-y-4">
      <Section title="Le vendeur">
        <Row label="Dénomination" value={(data.denomination as string) || "—"} />
        <Row label="Forme" value={((data.forme_juridique as string) || "").toUpperCase()} />
        <Row label="SIRET" value={(data.siret as string) || "—"} />
        <Row label="RCS" value={(data.rcs as string) || "—"} />
        <Row label="Siège" value={(data.siege_social as string) || "—"} />
      </Section>
      <Section title="Activité">
        <Row label="Site" value={(data.site_url as string) || "—"} />
        <Row label="Produits" value={(data.type_produits as string) || "—"} />
        <Row
          label="Clientèle"
          value={
            data.clientele === "b2c"
              ? "Consommateurs (B2C)"
              : data.clientele === "b2b"
                ? "Professionnels (B2B)"
                : "Mixte"
          }
        />
      </Section>
      <Section title="Livraison et paiement">
        <Row label="Délai" value={(data.delai_livraison as string) || "—"} />
        <Row label="Paiement" value={(data.moyens_paiement as string) || "—"} />
      </Section>
      <Section title="Clauses juridiques">
        <Row label="Rétractation" value={`${data.duree_retractation} jours`} />
        <Row label="Médiateur" value={(data.mediateur_nom as string) || "—"} />
        <Row label="Tribunal" value={(data.tribunal_competent as string) || "—"} />
      </Section>
      <Section title="RGPD">
        <Row label="DPO" value={(data.dpo_email as string) || (data.email_contact as string) || "—"} />
        <Row
          label="Conservation"
          value={`${data.duree_conservation_commandes} ans`}
        />
        <Row label="Cookies" value={data.utilise_cookies ? "Oui" : "Non"} />
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
      <dd className="font-medium text-slate-900 text-right truncate max-w-[60%]">{value}</dd>
    </div>
  );
}

export default function CGVPage() {
  return (
    <Wizard
      documentType="cgv-ecommerce"
      documentLabel="CGV E-commerce"
      price={49}
      steps={CGV_ECOMMERCE_STEPS}
      storageKey="quicklegal_cgv_ecommerce"
      initialData={INITIAL}
      renderRecap={(data) => <RecapCGV data={data} />}
    />
  );
}
