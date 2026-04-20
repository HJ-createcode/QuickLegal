/**
 * Wizard recap components, keyed by document type.
 *
 * The registry (lib/document-registry.ts) is server-safe and cannot hold
 * JSX. This file maps a document `type` slug to the React component that
 * renders the « Récapitulatif » step of the Wizard before payment.
 *
 * The client-side dynamic route `app/documents/[type]/page.tsx` looks up
 * the component via `getRecapComponent(type)`.
 */

"use client";

import type { ReactNode } from "react";
import type {
  AssocieData,
  StatutsSASData,
} from "@/lib/questionnaire-configs/statuts-sas";
import type { SCIAssocieData } from "@/lib/questionnaire-configs/statuts-sci";

// ---------- Shared primitives ----------

function Section({ title, children }: { title: string; children: ReactNode }) {
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

// ---------- Per-document recaps ----------

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
            : ((data as unknown as StatutsSASData).president_tiers_nom as string) || "—"}
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
        <Row
          label="Régime fiscal"
          value={data.regime_fiscal === "is" ? "IS (irrévocable)" : "IR (par défaut)"}
        />
        <Row label="Clause d'agrément" value={data.clause_agrement ? "Oui" : "Non"} />
        <Row label="Clôture exercice" value={data.date_cloture_exercice as string} />
      </Section>
    </div>
  );
}

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
        <Row label="Conservation" value={`${data.duree_conservation_commandes} ans`} />
        <Row label="Cookies" value={data.utilise_cookies ? "Oui" : "Non"} />
      </Section>
    </div>
  );
}

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

// ---------- Generic recap used by simpler documents ----------

export interface GenericRecapSection {
  title: string;
  /** field id => human label. Rendered in order. Empty values show "—". */
  fields: Array<{ id: string; label: string; format?: (v: unknown) => string }>;
}

export function makeGenericRecap(sections: GenericRecapSection[]) {
  return function GenericRecap({ data }: { data: Record<string, unknown> }) {
    return (
      <div className="space-y-4">
        {sections.map((s) => (
          <Section key={s.title} title={s.title}>
            {s.fields.map((f) => {
              const raw = data[f.id];
              const value = f.format
                ? f.format(raw)
                : raw == null || raw === ""
                  ? "—"
                  : typeof raw === "boolean"
                    ? raw
                      ? "Oui"
                      : "Non"
                    : String(raw);
              return <Row key={f.id} label={f.label} value={value} />;
            })}
          </Section>
        ))}
      </div>
    );
  };
}

// ---------- Registry of recap components ----------

type RecapComponent = (props: { data: Record<string, unknown> }) => ReactNode;

function yn(v: unknown) {
  return v ? "Oui" : "Non";
}
function eurosFormat(v: unknown) {
  const n = Number(v);
  if (!n) return "—";
  return `${n.toLocaleString("fr-FR")} €`;
}

const FORME_LABELS: Record<string, string> = {
  sas: "SAS / SASU",
  sarl: "SARL / EURL",
  sci: "SCI",
  snc: "SNC",
  association: "Association",
};
const formeFormat = (v: unknown) => (typeof v === "string" ? FORME_LABELS[v] || v : "—");

const TYPE_AG_LABELS: Record<string, string> = {
  ordinaire: "Ordinaire",
  extraordinaire: "Extraordinaire",
  mixte: "Mixte",
};
const typeAGFormat = (v: unknown) => (typeof v === "string" ? TYPE_AG_LABELS[v] || v : "—");

const RECAP_COMPONENTS: Record<string, RecapComponent> = {
  "statuts-sas": RecapSAS,
  "statuts-sci": RecapSCI,
  "cgv-ecommerce": RecapCGV,
  nda: RecapNDA,

  "mentions-legales": makeGenericRecap([
    {
      title: "Éditeur",
      fields: [
        { id: "denomination", label: "Dénomination" },
        { id: "forme_juridique", label: "Forme" },
        { id: "capital_social", label: "Capital", format: eurosFormat },
        { id: "siren", label: "SIREN/SIRET" },
        { id: "siege_social", label: "Siège" },
      ],
    },
    {
      title: "Publication",
      fields: [
        { id: "directeur_publication", label: "Directeur publication" },
        { id: "site_url", label: "Site" },
        { id: "email_contact", label: "Email" },
      ],
    },
    {
      title: "Hébergeur",
      fields: [
        { id: "hebergeur_nom", label: "Nom" },
        { id: "hebergeur_adresse", label: "Adresse" },
      ],
    },
    {
      title: "Spécificités",
      fields: [
        { id: "activite_reglementee", label: "Profession réglementée", format: yn },
        { id: "mediation_applicable", label: "Médiation applicable", format: yn },
        { id: "mediateur_nom", label: "Médiateur" },
      ],
    },
  ]),

  cgu: makeGenericRecap([
    {
      title: "Service",
      fields: [
        { id: "denomination", label: "Éditeur" },
        { id: "site_url", label: "URL" },
        {
          id: "clientele",
          label: "Public",
          format: (v) =>
            v === "b2c" ? "Consommateurs" : v === "b2b" ? "Professionnels" : "Mixte",
        },
      ],
    },
    {
      title: "Accès",
      fields: [
        { id: "inscription_requise", label: "Inscription requise", format: yn },
        { id: "service_payant", label: "Service payant", format: yn },
        { id: "contenu_utilisateurs", label: "UGC (contenu utilisateur)", format: yn },
      ],
    },
    {
      title: "Juridique",
      fields: [
        { id: "tribunal_competent", label: "Tribunal compétent" },
        { id: "email_contact", label: "Contact" },
      ],
    },
  ]),

  "attestation-domiciliation": makeGenericRecap([
    {
      title: "Attestant",
      fields: [
        {
          id: "attestant_type",
          label: "Nature",
          format: (v) =>
            v === "personne_morale" ? "Personne morale" : "Personne physique",
        },
        { id: "attestant_nom", label: "Nom (si PP)" },
        { id: "attestant_denomination", label: "Dénomination (si PM)" },
        {
          id: "attestant_occupation",
          label: "Occupation",
          format: (v) =>
            v === "proprietaire"
              ? "Propriétaire"
              : v === "locataire"
                ? "Locataire"
                : v === "sous_locataire"
                  ? "Sous-locataire"
                  : "Autre",
        },
      ],
    },
    {
      title: "Local et société",
      fields: [
        { id: "adresse_domiciliation", label: "Adresse du local" },
        { id: "societe_denomination", label: "Société hébergée" },
        { id: "societe_forme", label: "Forme" },
        {
          id: "societe_statut",
          label: "Statut",
          format: (v) =>
            v === "en_cours_constitution" ? "En cours de constitution" : "Existante",
        },
      ],
    },
    {
      title: "Signature",
      fields: [
        { id: "lieu_signature", label: "Lieu" },
        { id: "date_signature", label: "Date" },
      ],
    },
  ]),

  "declaration-non-condamnation": makeGenericRecap([
    {
      title: "Déclarant",
      fields: [
        { id: "prenom", label: "Prénom(s)" },
        { id: "nom", label: "Nom" },
        { id: "date_naissance", label: "Né(e) le" },
        { id: "lieu_naissance", label: "À" },
        { id: "nationalite", label: "Nationalité" },
        { id: "adresse", label: "Adresse" },
      ],
    },
    {
      title: "Filiation",
      fields: [
        {
          id: "pere_prenom",
          label: "Père",
          format: (v) => String(v || "—"),
        },
        { id: "pere_nom", label: "Nom du père" },
        { id: "mere_prenom", label: "Mère" },
        { id: "mere_nom", label: "Nom de naissance de la mère" },
      ],
    },
    {
      title: "Mandat",
      fields: [
        { id: "qualite", label: "Qualité" },
        { id: "societe_denomination", label: "Société" },
        { id: "societe_forme", label: "Forme" },
      ],
    },
  ]),

  "pv-ag-ordinaire": makeGenericRecap([
    {
      title: "Société",
      fields: [
        { id: "denomination", label: "Dénomination" },
        { id: "forme_juridique", label: "Forme", format: formeFormat },
        { id: "capital_social", label: "Capital", format: eurosFormat },
        { id: "siege_social", label: "Siège" },
      ],
    },
    {
      title: "Assemblée",
      fields: [
        { id: "date_assemblee", label: "Date" },
        { id: "heure_assemblee", label: "Heure" },
        { id: "lieu_assemblee", label: "Lieu" },
        { id: "date_cloture_exercice", label: "Exercice clos le" },
      ],
    },
    {
      title: "Résultat",
      fields: [
        {
          id: "resultat_nature",
          label: "Nature",
          format: (v) => (v === "benefice" ? "Bénéfice" : "Perte"),
        },
        { id: "resultat_montant", label: "Montant", format: eurosFormat },
        { id: "distribution_dividende", label: "Dividendes", format: eurosFormat },
      ],
    },
    {
      title: "Autres",
      fields: [
        { id: "quitus_dirigeants", label: "Quitus", format: yn },
        { id: "renouvelle_cac", label: "Renouvellement CAC", format: yn },
      ],
    },
  ]),

  "pv-ag-extraordinaire": makeGenericRecap([
    {
      title: "Société",
      fields: [
        { id: "denomination", label: "Dénomination" },
        { id: "forme_juridique", label: "Forme", format: formeFormat },
        { id: "capital_social", label: "Capital", format: eurosFormat },
        { id: "siege_social", label: "Siège" },
      ],
    },
    {
      title: "Assemblée",
      fields: [
        { id: "date_assemblee", label: "Date" },
        { id: "heure_assemblee", label: "Heure" },
        { id: "lieu_assemblee", label: "Lieu" },
      ],
    },
    {
      title: "Objet",
      fields: [
        {
          id: "objet_decision",
          label: "Nature",
          format: (v) => {
            const labels: Record<string, string> = {
              modification_statuts: "Modification statutaire",
              transfert_siege: "Transfert de siège",
              changement_denomination: "Changement de dénomination",
              changement_objet_social: "Changement d'objet social",
              augmentation_capital: "Augmentation de capital",
              reduction_capital: "Réduction de capital",
              transformation: "Transformation",
              dissolution_anticipee: "Dissolution anticipée",
              nomination_dirigeant: "Nomination de dirigeant",
              revocation_dirigeant: "Révocation de dirigeant",
              autre: "Autre",
            };
            return (typeof v === "string" && labels[v]) || "—";
          },
        },
      ],
    },
  ]),

  "convocation-ag": makeGenericRecap([
    {
      title: "Société",
      fields: [
        { id: "denomination", label: "Dénomination" },
        { id: "forme_juridique", label: "Forme", format: formeFormat },
      ],
    },
    {
      title: "Destinataire",
      fields: [
        { id: "destinataire_nom", label: "Nom" },
        { id: "destinataire_adresse", label: "Adresse" },
      ],
    },
    {
      title: "Assemblée",
      fields: [
        { id: "type_ag", label: "Type", format: typeAGFormat },
        { id: "date_ag", label: "Date" },
        { id: "heure_ag", label: "Heure" },
        { id: "lieu_ag", label: "Lieu" },
      ],
    },
    {
      title: "Envoi",
      fields: [
        {
          id: "mode_envoi",
          label: "Mode",
          format: (v) =>
            v === "lrar"
              ? "LRAR"
              : v === "email"
                ? "Email"
                : v === "remise_en_mains_propres"
                  ? "Remise en mains propres"
                  : "—",
        },
        { id: "date_envoi", label: "Date d'envoi" },
        { id: "expediteur_nom", label: "Expéditeur" },
      ],
    },
  ]),

  "ordre-du-jour-ag": makeGenericRecap([
    {
      title: "Société",
      fields: [
        { id: "denomination", label: "Dénomination" },
        { id: "forme_juridique", label: "Forme", format: formeFormat },
      ],
    },
    {
      title: "Assemblée",
      fields: [
        { id: "type_ag", label: "Type", format: typeAGFormat },
        { id: "date_ag", label: "Date" },
        { id: "heure_ag", label: "Heure" },
        { id: "lieu_ag", label: "Lieu" },
      ],
    },
    {
      title: "Auteur",
      fields: [
        { id: "etabli_par_nom", label: "Établi par" },
        { id: "etabli_par_qualite", label: "Qualité" },
        { id: "date_signature", label: "Date de signature" },
      ],
    },
  ]),

  "feuille-presence-ag": makeGenericRecap([
    {
      title: "Société",
      fields: [
        { id: "denomination", label: "Dénomination" },
        { id: "forme_juridique", label: "Forme", format: formeFormat },
        { id: "capital_social", label: "Capital", format: eurosFormat },
      ],
    },
    {
      title: "Assemblée",
      fields: [
        { id: "type_ag", label: "Type", format: typeAGFormat },
        { id: "date_ag", label: "Date" },
        { id: "heure_ag", label: "Heure" },
        { id: "lieu_ag", label: "Lieu" },
      ],
    },
    {
      title: "Quorum",
      fields: [
        {
          id: "total_parts",
          label: "Total parts/actions",
          format: (v) => {
            const n = Number(v);
            return n ? n.toLocaleString("fr-FR") : "—";
          },
        },
        { id: "president_seance_nom", label: "Président de séance" },
      ],
    },
  ]),
};

export function registerRecap(type: string, component: RecapComponent) {
  RECAP_COMPONENTS[type] = component;
}

export function getRecapComponent(type: string): RecapComponent {
  return (
    RECAP_COMPONENTS[type] ||
    (function FallbackRecap({ data }: { data: Record<string, unknown> }) {
      // Shown if a document type was added to the registry but no recap was
      // wired up. Still usable — the user sees every submitted field.
      return (
        <div className="space-y-2">
          {Object.entries(data).map(([k, v]) => (
            <Row key={k} label={k} value={typeof v === "object" ? JSON.stringify(v) : String(v ?? "—")} />
          ))}
        </div>
      );
    })
  );
}
