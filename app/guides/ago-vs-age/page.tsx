import type { Metadata } from "next";
import {
  GuidePageLayout,
  GuideSection,
  GuideCallout,
} from "@/components/GuidePageLayout";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL } from "@/lib/site-url";

const TITLE = "AGO ou AGE : quelle assemblée tenir et pour quelle décision ?";
const SLUG = "ago-vs-age";
const INTRO =
  "L'AGO (ordinaire) approuve les comptes et règle la vie courante. L'AGE (extraordinaire) modifie les statuts et les éléments fondamentaux de la société. La distinction n'est pas une subtilité rédactionnelle — elle détermine les règles de quorum, de majorité, et les formalités de publicité à accomplir.";
const TLDR =
  "AGO pour tout ce qui ne touche pas aux statuts : approbation des comptes, affectation du résultat, quitus, renouvellement d'un mandat. AGE pour toute modification des statuts, y compris le transfert de siège, l'augmentation de capital, la transformation et la dissolution. Les deux peuvent être combinées en une seule assemblée mixte quand c'est cohérent.";

const FAQS = [
  {
    q: "Peut-on tenir une AGO et une AGE le même jour ?",
    a: "Oui, c'est fréquent. On parle alors d'assemblée mixte : l'ordre du jour mentionne distinctement les résolutions ordinaires et extraordinaires, et le PV applique les règles de majorité propres à chaque catégorie de résolutions. Notre modèle de convocation supporte le type « mixte ».",
  },
  {
    q: "L'AGO d'approbation des comptes est-elle annuelle ?",
    a: "Oui. Les articles L.223-26 (SARL) et L.225-100 (SA) imposent la tenue d'une AGO dans les six mois qui suivent la clôture de l'exercice. En SAS, les statuts fixent le délai, généralement aligné sur ces dispositions. À défaut de tenue dans les délais, la responsabilité du dirigeant peut être engagée.",
  },
  {
    q: "Quelle majorité pour une AGE en SAS ?",
    a: "En SAS, la majorité applicable à une AGE est fixée par les statuts (article L.227-9 C. com.). La liberté est quasi totale : unanimité pour les décisions les plus structurantes, majorité renforcée ou simple pour le reste. Lisez toujours vos statuts avant de convoquer.",
  },
  {
    q: "Le transfert de siège est-il une AGE ?",
    a: "Oui, car il modifie les statuts (article relatif au siège social). Dans certaines formes sociales, le transfert dans le même département peut être décidé par le dirigeant sous réserve de ratification en AGE. Renseignez-vous sur ce qu'autorisent vos statuts avant de choisir le type d'assemblée.",
  },
  {
    q: "Faut-il publier une annonce légale après une AGE ?",
    a: "Oui pour toutes les décisions modifiant les éléments publiés au RCS : dénomination, siège, capital, forme, objet, dirigeants. L'annonce légale précède l'inscription modificative au greffe. Les décisions d'AGO n'exigent pas d'annonce légale — seul le dépôt des comptes annuels est à faire.",
  },
];

export const metadata: Metadata = {
  title: TITLE,
  description:
    "AGO ou AGE : la bonne assemblée pour chaque décision. Différences de majorité, formalités de publicité, règles propres à chaque forme (SAS, SARL, SCI, SNC).",
  alternates: { canonical: `/guides/${SLUG}` },
  openGraph: {
    url: `${SITE_URL}/guides/${SLUG}`,
    title: `${TITLE} | Guides QuickLegal`,
  },
};

export default function AgoVsAgePage() {
  return (
    <>
      <GuidePageLayout
        slug={SLUG}
        eyebrow="Comparatif"
        title={TITLE}
        intro={INTRO}
        tldr={TLDR}
        lastUpdated="avril 2026"
        products={[
          {
            slug: "pv-ag-ordinaire",
            label: "PV d'Assemblée Générale Ordinaire",
            priceEuros: 29,
            description:
              "Approbation des comptes, affectation du résultat, quitus aux dirigeants. Multi-forme : SAS, SARL, SCI, SNC, association.",
          },
          {
            slug: "pv-ag-extraordinaire",
            label: "PV d'Assemblée Générale Extraordinaire",
            priceEuros: 39,
            description:
              "Modifications de statuts, transfert de siège, augmentation de capital, dissolution. 11 types de décisions pris en charge.",
          },
          {
            slug: "convocation-ag",
            label: "Convocation d'Assemblée Générale",
            priceEuros: 9,
            description:
              "Lettre personnalisée avec rappel des délais légaux, valable pour AGO, AGE ou assemblée mixte.",
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
        ]}
      >
        <GuideSection title="Le partage des compétences : une règle simple">
          <p>
            La distinction AGO / AGE repose sur une règle simple à retenir :
          </p>
          <GuideCallout tone="info">
            <strong>AGO</strong> = tout ce qui ne modifie pas les statuts.{" "}
            <br />
            <strong>AGE</strong> = toute modification des statuts ou décision
            majeure prévue comme telle par la loi.
          </GuideCallout>
          <p>
            Cette règle a deux conséquences immédiates :
          </p>
          <ul className="list-disc pl-6 space-y-1 marker:text-slate-400">
            <li>
              La convocation et le PV doivent refléter clairement le type
              d&apos;assemblée — un intitulé erroné rend la décision
              contestable.
            </li>
            <li>
              Les règles de quorum et de majorité ne sont pas les mêmes. Une
              AGE exige généralement une majorité renforcée, parfois
              l&apos;unanimité dans certaines formes sociales.
            </li>
          </ul>
        </GuideSection>

        <GuideSection title="Comparaison ligne à ligne">
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr>
                  <th className="text-left py-3 px-2 font-semibold text-slate-900 border-b border-slate-200 w-1/3">
                    Critère
                  </th>
                  <th className="text-left py-3 px-2 font-semibold text-slate-900 border-b border-slate-200">
                    AGO
                  </th>
                  <th className="text-left py-3 px-2 font-semibold text-slate-900 border-b border-slate-200">
                    AGE
                  </th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                <Row
                  a="Objet"
                  b="Décisions courantes ne modifiant pas les statuts"
                  c="Modification des statuts et décisions structurantes"
                />
                <Row
                  a="Fréquence"
                  b="Au moins une fois par an (approbation des comptes)"
                  c="Au besoin, sans calendrier fixe"
                />
                <Row
                  a="Quorum SARL (1re convoc.)"
                  b="Aucun quorum légal obligatoire"
                  c="1/4 des parts sociales"
                />
                <Row
                  a="Majorité SARL"
                  b="Majorité simple des parts détenues par les associés présents ou représentés"
                  c="2/3 des parts détenues par les associés présents ou représentés (sociétés postérieures à août 2005)"
                />
                <Row
                  a="Majorité SAS"
                  b="Fixée par les statuts"
                  c="Fixée par les statuts — souvent renforcée"
                />
                <Row
                  a="Majorité SCI"
                  b="Fixée par les statuts (souvent majorité simple)"
                  c="Souvent unanimité sauf clause contraire (art. 1836 C. civ.)"
                />
                <Row
                  a="Majorité SNC"
                  b="Unanimité par défaut (sauf clause statutaire)"
                  c="Unanimité (art. L.221-6 C. com.)"
                />
                <Row
                  a="Formalités après AG"
                  b="Dépôt des comptes au greffe dans le mois"
                  c="Annonce légale + inscription modificative au RCS"
                />
              </tbody>
            </table>
          </div>
        </GuideSection>

        <GuideSection title="Les décisions typiques d'une AGO">
          <ul className="list-disc pl-6 space-y-2 marker:text-slate-400">
            <li>
              <strong>Approbation des comptes annuels</strong> : bilan,
              compte de résultat, annexe.
            </li>
            <li>
              <strong>Affectation du résultat</strong> : réserves légale /
              facultative, dividendes, report à nouveau.
            </li>
            <li>
              <strong>Quitus aux dirigeants</strong> pour leur gestion.
            </li>
            <li>
              <strong>Renouvellement du mandat du commissaire aux comptes</strong>
              , quand il existe.
            </li>
            <li>
              <strong>Approbation des conventions réglementées</strong>{" "}
              conclues entre la société et un dirigeant ou un associé.
            </li>
            <li>
              <strong>Nomination ou révocation d&apos;un dirigeant</strong> —
              dans les formes où les statuts ne rattachent pas cette
              décision à l&apos;AGE.
            </li>
          </ul>
        </GuideSection>

        <GuideSection title="Les décisions typiques d'une AGE">
          <ul className="list-disc pl-6 space-y-2 marker:text-slate-400">
            <li>
              <strong>Modification d&apos;une clause statutaire</strong>{" "}
              (durée, exercice, conditions d&apos;agrément, etc.).
            </li>
            <li>
              <strong>Transfert du siège social</strong>.
            </li>
            <li>
              <strong>Changement de dénomination sociale</strong>.
            </li>
            <li>
              <strong>Changement d&apos;objet social</strong>.
            </li>
            <li>
              <strong>Augmentation ou réduction de capital</strong>.
            </li>
            <li>
              <strong>Transformation</strong> de la société en une autre
              forme (ex. SARL vers SAS).
            </li>
            <li>
              <strong>Dissolution anticipée</strong> et nomination du
              liquidateur.
            </li>
            <li>
              <strong>Fusion, scission, apport partiel d&apos;actif</strong>.
            </li>
          </ul>
        </GuideSection>

        <GuideSection title="L'assemblée mixte, quand les deux coexistent">
          <p>
            Il arrive qu&apos;une même séance soit l&apos;occasion de
            traiter à la fois une décision ordinaire (approbation des
            comptes) et une décision extraordinaire (transfert de siège,
            augmentation de capital). On tient alors une assemblée mixte.
          </p>
          <p>
            Le formalisme est simple :
          </p>
          <ul className="list-disc pl-6 space-y-1 marker:text-slate-400">
            <li>
              La convocation mentionne « assemblée mixte » et l&apos;ordre
              du jour distingue clairement chaque type de résolution.
            </li>
            <li>
              Le PV applique les règles de majorité propres à chaque
              catégorie : une résolution AGO adoptée à la majorité simple,
              une résolution AGE à la majorité renforcée ou à
              l&apos;unanimité selon la forme et les statuts.
            </li>
            <li>
              Les formalités post-assemblée sont cumulatives : dépôt des
              comptes (si AGO d&apos;approbation) + annonce légale et
              inscription modificative (si AGE).
            </li>
          </ul>
        </GuideSection>

        <GuideSection title="Les formalités à anticiper">
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr>
                  <th className="text-left py-3 px-2 font-semibold text-slate-900 border-b border-slate-200">
                    Étape
                  </th>
                  <th className="text-left py-3 px-2 font-semibold text-slate-900 border-b border-slate-200">
                    AGO
                  </th>
                  <th className="text-left py-3 px-2 font-semibold text-slate-900 border-b border-slate-200">
                    AGE
                  </th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                <Row
                  a="Convocation"
                  b="15 jours min. en SARL (R.223-20), statuts en SAS"
                  c="Mêmes délais légaux"
                />
                <Row
                  a="Ordre du jour"
                  b="Précis, point par point"
                  c="Idem + rappel des textes de résolutions"
                />
                <Row
                  a="Feuille de présence"
                  b="Recommandée"
                  c="Fortement recommandée, parfois obligatoire (SA)"
                />
                <Row
                  a="PV signé"
                  b="Signé par le bureau (Président + secrétaire si désigné)"
                  c="Idem"
                />
                <Row
                  a="Annonce légale"
                  b="Non"
                  c="Oui (dans un JAL du département du siège)"
                />
                <Row
                  a="Inscription modificative RCS"
                  b="Non (sauf changement d'organe)"
                  c="Oui (au guichet unique de l'INPI)"
                />
                <Row
                  a="Dépôt au greffe"
                  b="Dépôt des comptes si AGO d'approbation"
                  c="Dépôt du PV + statuts modifiés"
                />
              </tbody>
            </table>
          </div>
        </GuideSection>

        <GuideSection title="Les erreurs à éviter">
          <ul className="list-disc pl-6 space-y-2 marker:text-slate-400">
            <li>
              <strong>Tenir une AGO pour une décision qui relève de l&apos;AGE</strong> :
              la résolution est nulle. Cas fréquent : voter un transfert
              de siège lors de l&apos;AGO annuelle sans avoir requalifié
              l&apos;ordre du jour en mixte.
            </li>
            <li>
              <strong>Dépasser le délai de six mois pour l&apos;AGO d&apos;approbation des comptes</strong> :
              une prorogation doit être sollicitée auprès du président du
              tribunal. À défaut, la responsabilité du dirigeant peut être
              engagée.
            </li>
            <li>
              <strong>Oublier l&apos;annonce légale après une AGE</strong> :
              la modification est inopposable aux tiers tant qu&apos;elle
              n&apos;est pas publiée.
            </li>
            <li>
              <strong>Appliquer la mauvaise règle de majorité</strong> : en
              SCI et en SNC, l&apos;unanimité est souvent la règle pour
              l&apos;AGE, même quand l&apos;usage des praticiens SAS
              suggère une majorité simple. Relisez vos statuts avant de
              voter.
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
