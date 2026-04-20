import type { Metadata } from "next";
import {
  GuidePageLayout,
  GuideSection,
  GuideCallout,
} from "@/components/GuidePageLayout";
import { FaqSection, type FaqItem } from "@/components/FaqSection";
import { ComparisonTable } from "@/components/ComparisonTable";
import { buildMetadata } from "@/lib/seo";

const TITLE = "SCI à l'IR ou à l'IS : comment choisir le régime fiscal ?";
const SLUG = "sci-ir-ou-is";
const INTRO =
  "Une SCI est par défaut à l'impôt sur le revenu. L'option pour l'impôt sur les sociétés est ouverte — mais irrévocable, et elle change complètement la logique fiscale de la société. Le bon choix dépend du projet : location nue à long terme, locations meublées, volonté d'amortir le bien, arbitrage entre revenus et plus-value.";
const TLDR =
  "IR par défaut pour la location nue patrimoniale, avec transparence fiscale et fiscalité personnelle sur les loyers. IS si vous amortissez le bien, générez peu de cash sortant, et privilégiez le long terme sur la revente. L'option IS est irrévocable : pas de retour possible.";

const FAQS: FaqItem[] = [
  {
    question: "L'option pour l'IS est-elle vraiment irrévocable ?",
    answer:
      "Oui, définitivement. Une SCI qui opte pour l'IS ne peut plus revenir à l'IR, même en cas de changement de projet ou de cession des parts. C'est la principale précaution à prendre avant de basculer.",
  },
  {
    question: "Une SCI à l'IR peut-elle louer en meublé ?",
    answer:
      "Non. La location meublée est considérée comme commerciale. Une SCI qui fait de la location meublée habituelle bascule automatiquement à l'IS, même sans l'avoir demandé. Pour de la location meublée, une autre structure (SARL de famille à l'IR, par exemple) est généralement préférable.",
  },
  {
    question: "Dans quels cas l'IS est-il intéressant ?",
    answer:
      "Quand vous voulez amortir comptablement le bien (déduction fiscale du prix d'acquisition), éviter l'imposition personnelle des loyers au barème progressif, et accepter la double imposition en cas de distribution de dividendes. Typique : grosses opérations locatives professionnelles, SCI familiales patrimoniales long terme.",
  },
  {
    question: "Quel impact sur la plus-value à la revente ?",
    answer:
      "À l'IR, la plus-value est calculée selon le régime des particuliers, avec abattement progressif aboutissant à une exonération complète au bout de 22 ans (IR) et 30 ans (prélèvements sociaux). À l'IS, la plus-value est taxée à l'impôt sur les sociétés sur la base de la différence entre le prix de vente et la valeur comptable — or, comme le bien a été amorti, la valeur comptable peut être très basse, ce qui peut entraîner une plus-value très élevée.",
  },
  {
    question: "Peut-on créer une SCI sans option dès la constitution ?",
    answer:
      "Oui, et c'est même le cas par défaut. Les statuts peuvent toutefois prévoir l'option pour l'IS dès le départ — au même moment que la constitution — si vous avez déjà fait l'arbitrage. À défaut, vous pouvez opter ultérieurement dans les conditions fixées par l'article 239 du Code général des impôts.",
  },
];

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description:
    "SCI à l'IR ou à l'IS : les conséquences fiscales, les cas où chaque régime reste optimal, et le point critique de l'irrévocabilité de l'option IS avant de trancher.",
  path: `/guides/${SLUG}`,
});

export default function SciIrOuIsPage() {
  return (
    <GuidePageLayout
      slug={SLUG}
      eyebrow="Décision"
      title={TITLE}
      intro={INTRO}
      tldr={TLDR}
      lastUpdated="avril 2026"
      products={[
        {
          slug: "statuts-sci",
          label: "Statuts de SCI",
          priceEuros: 89,
          description:
            "Statuts avec choix IR ou IS, clause d'agrément paramétrable, gérance associée ou tierce. Mise en garde explicite sur l'irrévocabilité de l'IS.",
        },
      ]}
      related={[
        {
          slug: "domiciliation-siege-social",
          label: "Où domicilier le siège social ?",
        },
        {
          slug: "avocat-vs-legaltech-vs-gratuit",
          label: "Modèle gratuit, legaltech ou avocat : comment choisir ?",
        },
      ]}
    >
      <GuideSection title="Deux régimes, deux logiques">
        <p>
          La SCI est une société civile : son régime fiscal par défaut est
          la <strong>transparence</strong>. Cela veut dire qu&apos;elle ne
          paye pas l&apos;impôt : ses résultats sont répartis entre les
          associés, qui les déclarent dans leurs propres revenus (revenus
          fonciers s&apos;il s&apos;agit de loyers de location nue).
        </p>
        <p>
          L&apos;option pour l&apos;impôt sur les sociétés transforme la
          SCI en contribuable à part entière. Elle paye l&apos;IS sur ses
          bénéfices (15 % puis 25 % selon les seuils), amortit ses biens
          comptablement, et ne verse aux associés que ce qu&apos;elle
          décide de distribuer en dividendes — eux-mêmes soumis au
          prélèvement forfaitaire unique de 30 % ou au barème progressif.
        </p>
        <GuideCallout tone="warning" title="Attention : option irrévocable">
          L&apos;option pour l&apos;IS est définitive. Une fois exercée,
          la SCI ne peut plus revenir à l&apos;IR, même si le projet
          change. Cette décision doit se prendre avec une simulation
          chiffrée préalable, de préférence avec l&apos;aide d&apos;un
          expert-comptable.
        </GuideCallout>
      </GuideSection>

      <GuideSection title="Comparaison des deux régimes">
        <ComparisonTable
          columns={["Critère", "SCI à l'IR (défaut)", "SCI à l'IS (option)"]}
          rows={[
            { label: "Imposition des loyers", values: ["Revenus fonciers, barème progressif + prélèvements sociaux", "IS : 15 % jusqu'à 42 500 €, puis 25 %"] },
            { label: "Amortissement du bien", values: ["Non (impossible en revenus fonciers)", "Oui, déductible du résultat chaque année"] },
            { label: "Déduction des charges", values: ["Limitée au régime des revenus fonciers", "Toutes charges réelles liées à l'exploitation"] },
            { label: "Distribution aux associés", values: ["Loyers répartis automatiquement selon quote-parts", "Dividendes distribués au choix du gérant, avec PFU de 30 %"] },
            { label: "Plus-value à la revente", values: ["Régime des particuliers (abattement à partir de la 6e année, exonération à 22 ans IR / 30 ans PS)", "Différence entre prix de vente et valeur comptable amortie, taxée à l'IS"] },
            { label: "Déficit", values: ["Imputable sur les revenus fonciers du foyer, plafonné à 10 700 € par an", "Reportable sans limitation sur les bénéfices futurs de la société"] },
            { label: "Location meublée", values: ["Impossible — bascule automatique à l'IS", "Autorisée"] },
            { label: "Réversibilité", values: ["L'option IS est définitive", "L'option IS est définitive"] },
          ]}
        />
      </GuideSection>

      <GuideSection title="Cas où l'IR reste optimal">
        <p>
          L&apos;IR reste le bon choix dans la majorité des projets
          patrimoniaux classiques :
        </p>
        <ul className="list-disc pl-6 space-y-2 marker:text-slate-400">
          <li>
            <strong>Location nue</strong> d&apos;un bien résidentiel, avec
            des loyers modestes face au revenu du foyer.
          </li>
          <li>
            <strong>Projet familial de transmission</strong> — les parts
            peuvent être données progressivement avec abattement
            (100 000 € par parent et par enfant tous les 15 ans) sans
            impact fiscal sur la SCI.
          </li>
          <li>
            <strong>Vision patrimoniale long terme</strong> avec revente
            envisagée : l&apos;abattement progressif pour durée de détention
            rend la plus-value très favorable à partir de 22 ans.
          </li>
          <li>
            <strong>Travaux importants</strong> : les déficits fonciers
            (issus de travaux par exemple) sont imputables sur le revenu
            global jusqu&apos;à 10 700 € par an.
          </li>
        </ul>
      </GuideSection>

      <GuideSection title="Cas où l'IS devient pertinent">
        <p>L&apos;IS s&apos;impose dans des configurations spécifiques :</p>
        <ul className="list-disc pl-6 space-y-2 marker:text-slate-400">
          <li>
            <strong>Associés fortement imposés à l&apos;IR</strong>, qui
            veulent éviter d&apos;ajouter les loyers à leur tranche
            marginale élevée.
          </li>
          <li>
            <strong>Volonté d&apos;amortir le bien</strong> : l&apos;amortissement
            réduit fortement le résultat imposable chaque année, ce qui
            comprime la charge d&apos;IS. En contrepartie, la plus-value à
            la revente sera élevée.
          </li>
          <li>
            <strong>Réinvestissement des loyers</strong> dans la société :
            pas de distribution = pas de PFU de 30 %. Les loyers
            s&apos;accumulent dans la SCI et peuvent financer
            l&apos;acquisition d&apos;autres biens.
          </li>
          <li>
            <strong>Location meublée</strong> : impossible en IR pour une
            SCI, l&apos;IS devient obligatoire.
          </li>
        </ul>
      </GuideSection>

      <GuideSection title="Le piège de la plus-value IS">
        <p>
          L&apos;amortissement à l&apos;IS est un puissant levier fiscal
          pendant l&apos;exploitation : il réduit le bénéfice imposable
          chaque année. Mais à la revente, la valeur comptable du bien est
          très basse (prix d&apos;acquisition amorti), et la plus-value
          imposable devient énorme.
        </p>
        <p>
          Un bien acheté 500 000 € et amorti pendant 20 ans peut avoir une
          valeur nette comptable proche de 150 000 €. S&apos;il est revendu
          600 000 €, la plus-value à l&apos;IS est de 450 000 €, contre
          100 000 € seulement à l&apos;IR (prix de vente moins prix
          d&apos;achat).
        </p>
        <p>
          Cette différence peut être rédhibitoire si l&apos;intention
          initiale est une revente dans les 10 à 20 ans. L&apos;arbitrage
          IR/IS est donc aussi — et surtout — un arbitrage sur
          l&apos;horizon patrimonial.
        </p>
      </GuideSection>

      <GuideSection title="Comment formaliser le choix dans les statuts">
        <p>
          Le choix IR/IS se formalise dans les statuts de la SCI dès la
          constitution, ou par délibération ultérieure. Notre{" "}
          <a
            href="/documents/statuts-sci"
            className="text-blue-500 hover:text-blue-600"
          >
            modèle de statuts de SCI
          </a>{" "}
          intègre un choix explicite au questionnaire, avec rappel de
          l&apos;irrévocabilité de l&apos;option IS.
        </p>
        <p>
          Dans tous les cas, ne basculez pas à l&apos;IS sans avoir réalisé
          une simulation chiffrée avec votre conseil fiscal ou votre
          expert-comptable, particulièrement sur l&apos;hypothèse de
          revente.
        </p>
      </GuideSection>

      <GuideSection title="Questions fréquentes">
        <FaqSection faqs={FAQS} />
      </GuideSection>
    </GuidePageLayout>
  );
}
