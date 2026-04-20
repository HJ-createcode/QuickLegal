import type { Metadata } from "next";
import {
  GuidePageLayout,
  GuideSection,
  GuideCallout,
} from "@/components/GuidePageLayout";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL } from "@/lib/site-url";

const TITLE = "NDA unilatéral ou bilatéral : comment choisir ?";
const SLUG = "nda-unilateral-ou-bilateral";
const INTRO =
  "Un accord de confidentialité peut être à sens unique — une seule partie livre des informations confidentielles — ou réciproque, chaque partie s'engageant vis-à-vis de l'autre. Le choix dépend entièrement de la nature de l'échange, pas d'un usage contractuel général.";
const TLDR =
  "NDA unilatéral quand une seule partie communique des informations (exemple : un prestataire à qui vous confiez vos données). NDA bilatéral dès que chaque partie partage de l'information (due diligence, levée de fonds, joint-venture). En cas de doute, préférez le bilatéral — plus équilibré, mieux accepté en pratique.";

const FAQS = [
  {
    q: "Peut-on transformer un NDA unilatéral en bilatéral en cours de négociation ?",
    a: "Oui, en signant un avenant. Mais c'est plus simple de partir d'un bilatéral dès que l'échange est manifestement mutuel : l'ajout ultérieur de clauses de réciprocité peut générer des incohérences et laisser des zones grises sur les informations échangées avant l'avenant.",
  },
  {
    q: "Quelle durée pour un NDA ?",
    a: "Trois à cinq ans couvrent la majorité des échanges commerciaux. Dix ans se justifient pour des secrets industriels, des innovations brevetables ou des données patrimoniales sensibles. Au-delà, le juge requalifie souvent la clause en « durée raisonnable » plus courte.",
  },
  {
    q: "Un NDA protège-t-il les idées ?",
    a: "Il protège les informations précises, identifiables et non publiques — pas une idée abstraite non concrétisée. Pour protéger une innovation, combinez le NDA avec un dépôt probant (brevet, enveloppe Soleau, horodatage notarié) qui établit la date et le contenu de votre création.",
  },
  {
    q: "Le NDA est-il utile avant un simple premier contact ?",
    a: "Rarement. Un premier contact se limite généralement à des informations générales — positionnement, vision, besoins. Un NDA est pertinent dès que l'échange s'apprête à porter sur du contenu structurant : chiffres financiers, roadmap technique, liste clients, architecture produit.",
  },
  {
    q: "Une clause pénale est-elle nécessaire ?",
    a: "Elle est optionnelle. Sa fonction est de fixer par avance le montant dû en cas de violation, ce qui évite d'avoir à prouver le préjudice en justice. Un montant disproportionné sera néanmoins réduit par le juge (article 1231-5 du Code civil). Bien calibrée, elle est dissuasive.",
  },
];

export const metadata: Metadata = {
  title: TITLE,
  description:
    "NDA unilatéral ou bilatéral : dans quel cas chaque forme s'impose, quelles clauses privilégier, quelle durée retenir, et pourquoi le bilatéral est souvent plus stratégique.",
  alternates: { canonical: `/guides/${SLUG}` },
  openGraph: {
    url: `${SITE_URL}/guides/${SLUG}`,
    title: `${TITLE} | Guides QuickLegal`,
  },
};

export default function NdaUnilateralOuBilateralPage() {
  return (
    <>
      <GuidePageLayout
        slug={SLUG}
        eyebrow="Décision"
        title={TITLE}
        intro={INTRO}
        tldr={TLDR}
        lastUpdated="avril 2026"
        products={[
          {
            slug: "nda",
            label: "Accord de confidentialité (NDA)",
            priceEuros: 39,
            description:
              "Unilatéral ou bilatéral, personne physique ou morale, durée paramétrable, clause pénale optionnelle. Adapté aux échanges B2B standards.",
          },
        ]}
        related={[
          {
            slug: "cgv-cgu-mentions-legales-differences",
            label: "CGV, CGU et mentions légales : quelles différences ?",
          },
          {
            slug: "avocat-vs-legaltech-vs-gratuit",
            label: "Modèle gratuit, legaltech ou avocat : comment choisir ?",
          },
        ]}
      >
        <GuideSection title="La question à se poser : qui livre quoi ?">
          <p>
            La réponse au choix unilatéral / bilatéral dépend d&apos;une
            seule variable : la direction du flux d&apos;information.
          </p>
          <ul className="list-disc pl-6 space-y-2 marker:text-slate-400">
            <li>
              Une seule partie confie des informations confidentielles à
              l&apos;autre → <strong>NDA unilatéral</strong>.
            </li>
            <li>
              Chaque partie partage des informations sensibles avec la
              première → <strong>NDA bilatéral</strong>.
            </li>
          </ul>
          <p>
            Toutes les autres considérations (durée, clauses, sanctions)
            découlent de cette décision initiale.
          </p>
        </GuideSection>

        <GuideSection title="Situations typiques">
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr>
                  <th className="text-left py-3 px-2 font-semibold text-slate-900 border-b border-slate-200">
                    Situation
                  </th>
                  <th className="text-left py-3 px-2 font-semibold text-slate-900 border-b border-slate-200">
                    Flux
                  </th>
                  <th className="text-left py-3 px-2 font-semibold text-slate-900 border-b border-slate-200">
                    Bon choix
                  </th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                <Row
                  a="Mission de conseil avec accès à vos données"
                  b="Vous → consultant"
                  c="Unilatéral (en votre faveur)"
                />
                <Row
                  a="Recrutement d'un DSI sur des systèmes sensibles"
                  b="Vous → candidat"
                  c="Unilatéral"
                />
                <Row
                  a="Démarchage d'un prospect avec présentation détaillée"
                  b="Vous → prospect"
                  c="Unilatéral"
                />
                <Row
                  a="Due diligence avant acquisition"
                  b="Cible ↔ acquéreur"
                  c="Bilatéral"
                />
                <Row
                  a="Levée de fonds avec échange de données financières"
                  b="Société ↔ investisseur"
                  c="Bilatéral"
                />
                <Row
                  a="Joint-venture et partage de R&D"
                  b="Partenaire A ↔ Partenaire B"
                  c="Bilatéral"
                />
                <Row
                  a="Évaluation croisée de partenariat"
                  b="Éditeur ↔ intégrateur"
                  c="Bilatéral"
                />
              </tbody>
            </table>
          </div>
        </GuideSection>

        <GuideSection title="Pourquoi le bilatéral est souvent préférable en pratique">
          <p>
            Même dans les cas où un NDA unilatéral serait techniquement
            suffisant, plusieurs arguments plaident pour le bilatéral :
          </p>
          <ul className="list-disc pl-6 space-y-2 marker:text-slate-400">
            <li>
              <strong>Mieux accepté</strong> par la contrepartie. Recevoir
              un NDA qui vous impose des obligations sans en imposer à
              l&apos;émetteur est mal perçu — particulièrement en
              négociation B2B.
            </li>
            <li>
              <strong>Plus équilibré juridiquement</strong> : un juge est
              moins susceptible de remettre en cause un accord symétrique
              qu&apos;un accord déséquilibré qui pourrait être qualifié de
              clause abusive.
            </li>
            <li>
              <strong>Anticipe les échanges futurs</strong>. Une mission
              qui commence unilatérale peut devenir mutuelle — le
              prestataire peut vouloir partager une méthodologie
              propriétaire. Partir en bilatéral évite un avenant à mi-course.
            </li>
            <li>
              <strong>Rédaction à peine plus complexe</strong> : basculer
              d&apos;un unilatéral à un bilatéral consiste essentiellement
              à rendre symétrique chaque obligation. Nos modèles le font
              automatiquement selon le choix du questionnaire.
            </li>
          </ul>
          <GuideCallout tone="info" title="Règle de décision rapide">
            En cas d&apos;hésitation, choisissez le bilatéral. Il vous
            engage aussi, mais il vous rend plus crédible et couvre
            davantage de scénarios sans surcoût rédactionnel.
          </GuideCallout>
        </GuideSection>

        <GuideSection title="Les clauses indispensables, quelle que soit la version">
          <ul className="list-disc pl-6 space-y-2 marker:text-slate-400">
            <li>
              <strong>Définition des informations confidentielles</strong> :
              ni trop large (toute information échangée deviendrait
              confidentielle, ce qui couvre aussi l&apos;information
              publique) ni trop étroite (ce qui laisserait des failles).
              La pratique : définir par catégories et compléter par
              l&apos;obligation de marquer explicitement les documents.
            </li>
            <li>
              <strong>Exceptions classiques</strong> : information déjà
              publique, information déjà connue de l&apos;autre partie,
              information obtenue d&apos;un tiers sans obligation de
              confidentialité, divulgation ordonnée par un juge.
            </li>
            <li>
              <strong>Durée de l&apos;obligation</strong>, généralement 5
              ans après la fin de l&apos;échange. L&apos;obligation
              survivant à la fin des négociations est essentielle.
            </li>
            <li>
              <strong>Restitution ou destruction</strong> des informations
              à la fin des échanges, avec copie numérique incluse.
            </li>
            <li>
              <strong>Droit applicable et juridiction</strong> : droit
              français pour des parties françaises, tribunal de commerce
              du siège du défendeur par défaut.
            </li>
          </ul>
        </GuideSection>

        <GuideSection title="Les clauses optionnelles à évaluer">
          <p>
            Ces clauses ne sont pas obligatoires mais peuvent renforcer la
            portée du NDA selon l&apos;enjeu :
          </p>
          <ul className="list-disc pl-6 space-y-2 marker:text-slate-400">
            <li>
              <strong>Clause pénale</strong> avec montant forfaitaire en
              cas de violation. Utile quand le préjudice serait difficile
              à prouver. Le juge peut la réduire si elle est
              manifestement excessive (article 1231-5 C. civ.).
            </li>
            <li>
              <strong>Clause de non-sollicitation</strong> de clients ou
              de salariés, lorsque l&apos;échange fait courir un risque de
              détournement.
            </li>
            <li>
              <strong>Clause RGPD</strong> dès que les informations
              échangées contiennent des données personnelles (fichiers
              clients, données RH, données utilisateurs).
            </li>
            <li>
              <strong>Clause de propriété intellectuelle</strong> précisant
              que l&apos;échange ne confère aucun droit sur les
              inventions, marques ou œuvres partagées. Utile quand le
              contexte inclut un démonstrateur technique.
            </li>
          </ul>
        </GuideSection>

        <GuideSection title="Les erreurs qui cassent un NDA">
          <ul className="list-disc pl-6 space-y-2 marker:text-slate-400">
            <li>
              <strong>Définition trop vague des informations couvertes</strong>,
              qui la rend inopposable en pratique (impossible de prouver
              qu&apos;une information précise était « confidentielle »
              selon la définition retenue).
            </li>
            <li>
              <strong>Durée illimitée ou excessive</strong> — souvent
              requalifiée par le juge.
            </li>
            <li>
              <strong>Oubli du sort des informations à la fin</strong> :
              sans clause de restitution ou destruction, les
              informations peuvent rester en la possession de l&apos;autre
              partie sans obligation de suppression.
            </li>
            <li>
              <strong>Signature par une personne non habilitée</strong> :
              un salarié sans pouvoir ne peut pas engager sa société.
              Signataire : représentant légal, ou délégataire avec
              pouvoir écrit.
            </li>
            <li>
              <strong>Confusion NDA / pacte d&apos;associés</strong> : un
              NDA ne couvre pas les engagements de co-construction
              (vesting, IP commune). Pour ces cas, un contrat plus
              complet est nécessaire.
            </li>
          </ul>
        </GuideSection>

        <GuideSection title="Questions fréquentes">
          <div className="space-y-3">
            {FAQS.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-xl border border-slate-200 bg-white p-5"
              >
                <summary className="flex justify-between items-start gap-4 cursor-pointer font-medium text-slate-900 text-sm list-none">
                  {faq.q}
                  <span
                    aria-hidden="true"
                    className="text-slate-400 text-lg leading-none transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </GuideSection>
      </GuidePageLayout>

      <JsonLd
        id="ld-faq"
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
    </>
  );
}

function Row({ a, b, c }: { a: string; b: string; c: string }) {
  return (
    <tr>
      <td className="py-2.5 px-2 font-medium text-slate-900 border-b border-slate-100 align-top">
        {a}
      </td>
      <td className="py-2.5 px-2 border-b border-slate-100 align-top">{b}</td>
      <td className="py-2.5 px-2 border-b border-slate-100 align-top">{c}</td>
    </tr>
  );
}
