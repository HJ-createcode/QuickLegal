import type { Metadata } from "next";
import {
  GuidePageLayout,
  GuideSection,
  GuideCallout,
} from "@/components/GuidePageLayout";
import { FaqSection, type FaqItem } from "@/components/FaqSection";
import { ComparisonTable } from "@/components/ComparisonTable";
import { buildMetadata } from "@/lib/seo";

const TITLE = "AGO ou AGE : quelle assemblée tenir et pour quelle décision ?";
const SLUG = "ago-vs-age";
const INTRO =
  "L'AGO (ordinaire) approuve les comptes et règle la vie courante. L'AGE (extraordinaire) modifie les statuts et les éléments fondamentaux de la société. La distinction n'est pas une subtilité rédactionnelle — elle détermine les règles de quorum, de majorité, et les formalités de publicité à accomplir.";
const TLDR =
  "AGO pour tout ce qui ne touche pas aux statuts : approbation des comptes, affectation du résultat, quitus, renouvellement d'un mandat. AGE pour toute modification des statuts, y compris le transfert de siège, l'augmentation de capital, la transformation et la dissolution. Les deux peuvent être combinées en une seule assemblée mixte quand c'est cohérent.";

const FAQS: FaqItem[] = [
  {
    question: "Peut-on tenir une AGO et une AGE le même jour ?",
    answer:
      "Oui, c'est fréquent. On parle alors d'assemblée mixte : l'ordre du jour mentionne distinctement les résolutions ordinaires et extraordinaires, et le PV applique les règles de majorité propres à chaque catégorie de résolutions. Notre modèle de convocation supporte le type « mixte ».",
  },
  {
    question: "L'AGO d'approbation des comptes est-elle annuelle ?",
    answer:
      "Oui. Les articles L.223-26 (SARL) et L.225-100 (SA) imposent la tenue d'une AGO dans les six mois qui suivent la clôture de l'exercice. En SAS, les statuts fixent le délai, généralement aligné sur ces dispositions. À défaut de tenue dans les délais, la responsabilité du dirigeant peut être engagée.",
  },
  {
    question: "Quelle majorité pour une AGE en SAS ?",
    answer:
      "En SAS, la majorité applicable à une AGE est fixée par les statuts (article L.227-9 C. com.). La liberté est quasi totale : unanimité pour les décisions les plus structurantes, majorité renforcée ou simple pour le reste. Lisez toujours vos statuts avant de convoquer.",
  },
  {
    question: "Le transfert de siège est-il une AGE ?",
    answer:
      "Oui, car il modifie les statuts (article relatif au siège social). Dans certaines formes sociales, le transfert dans le même département peut être décidé par le dirigeant sous réserve de ratification en AGE. Renseignez-vous sur ce qu'autorisent vos statuts avant de choisir le type d'assemblée.",
  },
  {
    question: "Faut-il publier une annonce légale après une AGE ?",
    answer:
      "Oui pour toutes les décisions modifiant les éléments publiés au RCS : dénomination, siège, capital, forme, objet, dirigeants. L'annonce légale précède l'inscription modificative au greffe. Les décisions d'AGO n'exigent pas d'annonce légale — seul le dépôt des comptes annuels est à faire.",
  },
];

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description:
    "AGO ou AGE : la bonne assemblée pour chaque décision. Différences de majorité, formalités de publicité, règles propres à chaque forme (SAS, SARL, SCI, SNC).",
  path: `/guides/${SLUG}`,
});

export default function AgoVsAgePage() {
  return (
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
          <ComparisonTable
            columns={["Critère", "AGO", "AGE"]}
            rows={[
              { label: "Objet", values: ["Décisions courantes ne modifiant pas les statuts", "Modification des statuts et décisions structurantes"] },
              { label: "Fréquence", values: ["Au moins une fois par an (approbation des comptes)", "Au besoin, sans calendrier fixe"] },
              { label: "Quorum SARL (1re convoc.)", values: ["Aucun quorum légal obligatoire", "1/4 des parts sociales"] },
              { label: "Majorité SARL", values: ["Majorité simple des parts détenues par les associés présents ou représentés", "2/3 des parts détenues par les associés présents ou représentés (sociétés postérieures à août 2005)"] },
              { label: "Majorité SAS", values: ["Fixée par les statuts", "Fixée par les statuts — souvent renforcée"] },
              { label: "Majorité SCI", values: ["Fixée par les statuts (souvent majorité simple)", "Souvent unanimité sauf clause contraire (art. 1836 C. civ.)"] },
              { label: "Majorité SNC", values: ["Unanimité par défaut (sauf clause statutaire)", "Unanimité (art. L.221-6 C. com.)"] },
              { label: "Formalités après AG", values: ["Dépôt des comptes au greffe dans le mois", "Annonce légale + inscription modificative au RCS"] },
            ]}
          />
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
          <ComparisonTable
            columns={["Étape", "AGO", "AGE"]}
            rows={[
              { label: "Convocation", values: ["15 jours min. en SARL (R.223-20), statuts en SAS", "Mêmes délais légaux"] },
              { label: "Ordre du jour", values: ["Précis, point par point", "Idem + rappel des textes de résolutions"] },
              { label: "Feuille de présence", values: ["Recommandée", "Fortement recommandée, parfois obligatoire (SA)"] },
              { label: "PV signé", values: ["Signé par le bureau (Président + secrétaire si désigné)", "Idem"] },
              { label: "Annonce légale", values: ["Non", "Oui (dans un JAL du département du siège)"] },
              { label: "Inscription modificative RCS", values: ["Non (sauf changement d'organe)", "Oui (au guichet unique de l'INPI)"] },
              { label: "Dépôt au greffe", values: ["Dépôt des comptes si AGO d'approbation", "Dépôt du PV + statuts modifiés"] },
            ]}
          />
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
          <FaqSection faqs={FAQS} />
        </GuideSection>
      </GuidePageLayout>
  );
}
