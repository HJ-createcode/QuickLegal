import type { Metadata } from "next";
import {
  GuidePageLayout,
  GuideSection,
  GuideCallout,
} from "@/components/GuidePageLayout";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL } from "@/lib/site-url";

const TITLE = "Combien coûte réellement la création d'une SAS en 2026 ?";
const SLUG = "cout-creation-sas";
const INTRO =
  "Le coût d'une SAS dépend essentiellement de la voie choisie pour rédiger les statuts — avocat, legaltech, modèle gratuit — et des formalités obligatoires qui sont, elles, incompressibles. Voici la décomposition chiffrée, poste par poste.";
const TLDR =
  "Les formalités obligatoires (annonce légale, dépôt au greffe, INPI) coûtent environ 225 à 290 € quelle que soit la voie choisie. S'y ajoute le coût des statuts : 0 € (modèle gratuit), 80 à 300 € (legaltech, notre zone de prix), 1 000 à 3 000 € (avocat). Le capital social minimum est d'un euro mais doit être libéré à hauteur d'au moins 50 %.";

const FAQS = [
  {
    q: "Peut-on créer une SAS avec un capital d'un euro ?",
    a: "Oui. Le minimum légal est effectivement d'un euro. En pratique, un capital de 1 000 à 5 000 € est perçu comme plus crédible par les banques, les bailleurs et les fournisseurs, sans alourdir significativement la trésorerie de démarrage.",
  },
  {
    q: "L'annonce légale est-elle vraiment obligatoire ?",
    a: "Oui, pour toute société commerciale. Elle doit être publiée dans un journal habilité du département du siège social. Les tarifs sont fixés par arrêté et dépendent du nombre de caractères — comptez généralement 180 à 220 € pour une SAS.",
  },
  {
    q: "Faut-il un commissaire aux apports si on apporte un bien en nature ?",
    a: "Oui, sauf si la valeur de l'apport est inférieure à 30 000 € et que la somme de tous les apports en nature ne dépasse pas la moitié du capital. En dessous de ces seuils, les associés peuvent s'en dispenser à l'unanimité. Au-delà, le commissaire aux apports est obligatoire et facture 500 à 2 000 € selon la complexité.",
  },
  {
    q: "Combien coûte le dépôt de capital ?",
    a: "Gratuit dans la plupart des banques ou chez un notaire. Le dépôt chez un notaire est payant (environ 100 à 150 €) et généralement choisi quand la banque retarde l'ouverture du compte professionnel.",
  },
  {
    q: "Y a-t-il des coûts récurrents après la création ?",
    a: "Oui, essentiellement la tenue annuelle des comptes (expert-comptable : 1 500 à 3 000 € par an selon l'activité), l'approbation des comptes (un PV d'AGO par an, gratuit si vous le rédigez vous-même, 30 à 50 € via une legaltech), et le dépôt des comptes au greffe (environ 50 € par dépôt).",
  },
];

export const metadata: Metadata = {
  title: TITLE,
  description:
    "Coût de création d'une SAS : formalités obligatoires, statuts (gratuit, legaltech, avocat), capital social, commissaire aux apports éventuel. Décomposition chiffrée complète.",
  alternates: { canonical: `/guides/${SLUG}` },
  openGraph: {
    url: `${SITE_URL}/guides/${SLUG}`,
    title: `${TITLE} | Guides QuickLegal`,
  },
};

export default function CoutCreationSasPage() {
  return (
    <>
      <GuidePageLayout
        slug={SLUG}
        eyebrow="Coût"
        title={TITLE}
        intro={INTRO}
        tldr={TLDR}
        lastUpdated="avril 2026"
        products={[
          {
            slug: "statuts-sas",
            label: "Statuts de SAS",
            priceEuros: 79,
            description:
              "Statuts complets revus par un avocat au Barreau de Paris. Tout le poste « rédaction des statuts » à 79 € TTC au lieu de plusieurs centaines d'euros en cabinet.",
          },
          {
            slug: "declaration-non-condamnation",
            label: "Déclaration de non-condamnation",
            priceEuros: 9,
            description:
              "Pièce obligatoire exigée par le greffe pour chaque dirigeant — 9 € TTC.",
          },
          {
            slug: "attestation-domiciliation",
            label: "Attestation de domiciliation",
            priceEuros: 9,
            description:
              "Autorisation d'établir le siège à une adresse, exigée au greffe — 9 € TTC.",
          },
        ]}
        related={[
          {
            slug: "sas-vs-sasu",
            label: "SAS ou SASU : quelle forme choisir ?",
          },
          {
            slug: "avocat-vs-legaltech-vs-gratuit",
            label: "Modèle gratuit, legaltech ou avocat : comment choisir ?",
          },
          {
            slug: "domiciliation-siege-social",
            label: "Où domicilier le siège social ?",
          },
        ]}
      >
        <GuideSection title="Les trois postes incompressibles">
          <p>
            Trois postes sont obligatoires et ne dépendent pas du prestataire
            choisi pour vos statuts :
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr>
                  <th className="text-left py-3 px-2 font-semibold text-slate-900 border-b border-slate-200">
                    Poste
                  </th>
                  <th className="text-left py-3 px-2 font-semibold text-slate-900 border-b border-slate-200">
                    Coût indicatif
                  </th>
                  <th className="text-left py-3 px-2 font-semibold text-slate-900 border-b border-slate-200">
                    Payable à
                  </th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                <Row a="Annonce légale de constitution" b="180 à 220 € TTC" c="Journal habilité (JAL)" />
                <Row a="Immatriculation au RCS" b="37,45 € + 21,41 € INPI" c="Guichet unique INPI" />
                <Row a="Dépôt des statuts au greffe" b="Compris dans l'immatriculation" c="—" />
              </tbody>
            </table>
          </div>
          <p className="text-sm text-slate-600">
            Total incompressible : environ{" "}
            <strong>240 à 280 €</strong> pour une SAS standard.
          </p>
        </GuideSection>

        <GuideSection title="Le coût variable : la rédaction des statuts">
          <p>
            C&apos;est là que les écarts sont les plus importants. Trois
            voies cohabitent sur le marché :
          </p>
          <div className="space-y-4 mt-4">
            <OptionCard
              title="Modèle gratuit téléchargé"
              price="0 €"
              description="Les CCI et certains organismes publient des modèles types. Le coût est nul, mais la personnalisation est minimale et la validité dépend fortement de votre projet. Convient à des statuts extrêmement simples, sans clauses avancées."
              caveat="Risque principal : omettre une clause qui s'avèrera décisive plus tard (agrément, préemption, pouvoirs du Président), ce qui nécessitera une AGE de modification statutaire ultérieure — entre 200 et 400 € de formalités en plus."
            />
            <OptionCard
              title="Legaltech (dont QuickLegal)"
              price="80 à 300 € TTC"
              description="Questionnaire guidé, trame revue par un juriste, souvent validée par un avocat. Nos statuts de SAS à 79 € TTC intègrent les clauses d'agrément, de préemption et la structuration du pouvoir du Président."
              caveat="Exclusions habituelles : structurations très spécifiques (holding complexe, actions de préférence, classes d'actions multiples). Pour ces cas, un avocat reste pertinent."
            />
            <OptionCard
              title="Avocat d'affaires"
              price="1 000 à 3 000 € HT"
              description="Rédaction sur mesure, conseil stratégique personnalisé, intégration des spécificités du projet. Adapté aux levées de fonds, aux montages complexes et aux patrimoines importants."
              caveat="Le budget augmente rapidement avec la complexité : pacte d'associés, actions de préférence, clauses anti-dilution peuvent porter le total au-delà de 5 000 €."
            />
          </div>
        </GuideSection>

        <GuideSection title="Autres postes potentiels">
          <p>
            Selon votre situation, d&apos;autres frais peuvent s&apos;ajouter :
          </p>
          <ul className="list-disc pl-6 space-y-2 marker:text-slate-400">
            <li>
              <strong>Capital social</strong> : libre, 1 € minimum. Les
              apports en numéraire doivent être libérés à au moins 50 % à
              la constitution (le solde dans les cinq ans).
            </li>
            <li>
              <strong>Dépôt de capital</strong> : gratuit dans la plupart
              des banques, 100 à 150 € chez un notaire.
            </li>
            <li>
              <strong>Commissaire aux apports</strong> : requis pour les
              apports en nature dépassant 30 000 € ou la moitié du capital.
              Comptez 500 à 2 000 €.
            </li>
            <li>
              <strong>Domiciliation commerciale</strong> : si vous ne
              domiciliez pas à votre adresse personnelle, une société de
              domiciliation ou une pépinière facture entre 15 et 80 € par
              mois. Pièce obligatoire :{" "}
              <a
                href="/documents/attestation-domiciliation"
                className="text-blue-500 hover:text-blue-600"
              >
                attestation de domiciliation
              </a>
              .
            </li>
            <li>
              <strong>Pièces dirigeant</strong> : une{" "}
              <a
                href="/documents/declaration-non-condamnation"
                className="text-blue-500 hover:text-blue-600"
              >
                déclaration de non-condamnation
              </a>{" "}
              est requise pour chaque Président nommé — 9 € TTC chez
              QuickLegal, souvent facturée 30 à 50 € ailleurs.
            </li>
          </ul>
        </GuideSection>

        <GuideSection title="Budget type selon le profil">
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr>
                  <th className="text-left py-3 px-2 font-semibold text-slate-900 border-b border-slate-200">
                    Profil
                  </th>
                  <th className="text-left py-3 px-2 font-semibold text-slate-900 border-b border-slate-200">
                    Total estimé
                  </th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                <Row a="Modèle gratuit + formalités seules (risque élevé)" b="≈ 250 €" c="" />
                <Row a="QuickLegal (statuts 79 € + pièces 18 € + formalités)" b="≈ 350 €" c="" />
                <Row a="Legaltech standard + formalités" b="≈ 400 à 600 €" c="" />
                <Row a="Avocat « starter » + formalités" b="≈ 1 300 à 2 500 €" c="" />
                <Row a="Avocat + pacte d'associés + opérations complexes" b="≈ 3 000 à 6 000 €" c="" />
              </tbody>
            </table>
          </div>
          <GuideCallout tone="info" title="Le bon calcul">
            Pour un projet standard sans complexité particulière, la
            combinaison legaltech de qualité + formalités reste le meilleur
            compromis qualité/prix. Pour un projet à levée de fonds immédiate
            ou avec pacte sophistiqué, l&apos;investissement cabinet se
            justifie — le coût évité sur un contentieux ultérieur est bien
            supérieur.
          </GuideCallout>
        </GuideSection>

        <GuideSection title="Ce que vous ne payez pas chez QuickLegal">
          <p>
            Notre tarification est à l&apos;acte : vous payez chaque
            document indépendamment, sans abonnement, sans frais cachés. Ne
            figurent jamais dans la facture :
          </p>
          <ul className="list-disc pl-6 space-y-1 marker:text-slate-400">
            <li>L&apos;annonce légale — vous la publiez directement dans un JAL habilité.</li>
            <li>Les frais INPI et de greffe — vous les réglez au guichet unique.</li>
            <li>Le dépôt de capital — réalisé par votre banque ou notaire.</li>
            <li>Un abonnement mensuel — inexistant.</li>
            <li>Des frais de modification — chaque document généré est final.</li>
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

function Row({ a, b, c }: { a: string; b: string; c?: string }) {
  return (
    <tr>
      <td className="py-2.5 px-2 font-medium text-slate-900 border-b border-slate-100 align-top">
        {a}
      </td>
      <td className="py-2.5 px-2 border-b border-slate-100 align-top">{b}</td>
      {c !== undefined && (
        <td className="py-2.5 px-2 border-b border-slate-100 align-top">
          {c}
        </td>
      )}
    </tr>
  );
}

function OptionCard({
  title,
  price,
  description,
  caveat,
}: {
  title: string;
  price: string;
  description: string;
  caveat: string;
}) {
  return (
    <div className="p-5 rounded-2xl border border-slate-200 bg-white">
      <div className="flex items-baseline justify-between mb-2">
        <h3 className="font-semibold text-slate-900 text-base">{title}</h3>
        <span className="text-slate-900 font-serif font-bold text-lg">
          {price}
        </span>
      </div>
      <p className="text-slate-700 text-sm leading-relaxed mb-3">
        {description}
      </p>
      <p className="text-slate-500 text-xs leading-relaxed italic">
        {caveat}
      </p>
    </div>
  );
}
