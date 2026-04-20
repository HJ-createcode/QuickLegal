import type { Metadata } from "next";
import {
  GuidePageLayout,
  GuideSection,
  GuideCallout,
} from "@/components/GuidePageLayout";
import { FaqSection, type FaqItem } from "@/components/FaqSection";
import { ComparisonTable } from "@/components/ComparisonTable";
import { buildMetadata } from "@/lib/seo";

const TITLE = "SAS ou SASU : quelle forme choisir pour créer sa société ?";
const SLUG = "sas-vs-sasu";
const INTRO =
  "La SAS et la SASU partagent le même régime juridique — même souplesse, même fiscalité par défaut, même statut social du dirigeant. Une seule variable les sépare : le nombre d'associés. Pourtant, le choix initial a des conséquences concrètes qu'il vaut mieux anticiper.";
const TLDR =
  "SASU si vous démarrez seul, SAS si vous êtes au moins deux. Passer de l'une à l'autre est possible par une simple décision de l'associé unique, mais mieux vaut partir sur la bonne forme dès le départ pour éviter de refaire les formalités.";

const FAQS: FaqItem[] = [
  {
    question: "Peut-on passer d'une SASU à une SAS sans dissoudre la société ?",
    answer:
      "Oui. La cession d'actions à un nouvel associé fait automatiquement basculer la SASU en SAS. Il n'y a pas de dissolution, pas de nouvelle immatriculation — simplement une mise à jour des statuts et une inscription modificative au RCS.",
  },
  {
    question: "La SASU permet-elle de toucher du chômage ?",
    answer:
      "Le président de SASU est assimilé-salarié au sens du régime général, mais il ne cotise pas à Pôle emploi sur ses rémunérations : il ne peut donc pas ouvrir de droits au chômage au titre de son mandat. Il peut en revanche conserver ses droits ARE acquis avant, et les cumuler avec sa rémunération dans les conditions fixées par France Travail.",
  },
  {
    question: "Quel capital social choisir en SAS ou SASU ?",
    answer:
      "Le minimum légal est d'un euro. En pratique, 1 000 à 5 000 € suffisent pour la plupart des projets et rassurent les banques. Un capital plus élevé est utile si vous anticipez une levée de fonds ou des appels d'offres exigeants.",
  },
  {
    question: "Les statuts sont-ils différents entre SAS et SASU ?",
    answer:
      "La trame est presque identique : articles sur la dénomination, l'objet, le siège, le capital, les actions, le Président, la clôture. En SASU, on ajoute les mentions propres à l'associé unique (pouvoirs, décisions consignées dans un registre dédié). Nos modèles adaptent automatiquement la rédaction.",
  },
  {
    question: "La SASU est-elle obligatoirement soumise à l'IS ?",
    answer:
      "Par défaut oui, mais l'option pour l'IR est possible pendant 5 exercices si vous remplissez les conditions (activité commerciale, industrielle, artisanale ou agricole, chiffre d'affaires limité, associé personne physique dirigeant). Après ces 5 ans, retour automatique à l'IS.",
  },
];

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description:
    "SAS ou SASU : le choix ne dépend que du nombre d'associés, mais les conséquences pratiques sont réelles. Grille de décision claire, conseils sur les statuts et passerelles entre les deux formes.",
  path: `/guides/${SLUG}`,
});

export default function SasVsSasuPage() {
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
          slug: "statuts-sas",
          label: "Statuts de SAS",
          priceEuros: 79,
          description:
            "Statuts complets avec clauses d'agrément et de préemption, nomination du Président, régime fiscal — adaptés dès deux associés.",
        },
        {
          slug: "declaration-non-condamnation",
          label: "Déclaration de non-condamnation",
          priceEuros: 9,
          description:
            "Pièce obligatoire pour toute nomination à la direction, en SAS comme en SASU.",
        },
      ]}
      related={[
        {
          slug: "cout-creation-sas",
          label: "Combien coûte réellement la création d'une SAS ?",
          description: "Décomposition des frais, des formalités aux statuts.",
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
      <GuideSection title="La différence tient au nombre d'associés">
        <p>
          La SAS (société par actions simplifiée) est la forme commerciale
          par excellence depuis les années 1990. Elle laisse une très grande
          liberté statutaire — gouvernance sur mesure, clauses d&apos;agrément
          paramétrables, actions de préférence possibles. Elle exige{" "}
          <strong>au moins deux associés</strong>.
        </p>
        <p>
          La SASU (société par actions simplifiée unipersonnelle) est la
          même forme, avec <strong>un seul associé</strong>, personne
          physique ou morale. Tout le reste est identique : même régime
          fiscal par défaut (IS), même statut social du dirigeant
          (assimilé-salarié), mêmes obligations comptables, même capital
          librement fixé.
        </p>
        <p>
          Le choix initial se fait donc mécaniquement : solo, SASU ; à
          plusieurs, SAS. Cela dit, la SASU n&apos;est pas qu&apos;une
          « SAS à un associé » — elle a ses propres particularités
          pratiques qu&apos;il vaut mieux connaître avant de trancher.
        </p>
      </GuideSection>

      <GuideSection title="Comparaison ligne à ligne">
        <ComparisonTable
          columns={["Critère", "SAS", "SASU"]}
          rows={[
            { label: "Nombre d'associés", values: ["2 minimum, sans maximum", "1 seul (personne physique ou morale)"] },
            { label: "Capital social", values: ["Libre, 1 € minimum", "Libre, 1 € minimum"] },
            { label: "Fiscalité par défaut", values: ["Impôt sur les sociétés", "Impôt sur les sociétés"] },
            { label: "Option IR", values: ["5 ans sous conditions", "5 ans sous conditions"] },
            { label: "Statut social du dirigeant", values: ["Assimilé-salarié", "Assimilé-salarié"] },
            { label: "Décisions collectives", values: ["Assemblées ou consultations écrites selon statuts", "Décisions de l'associé unique consignées dans un registre"] },
            { label: "Commissaire aux comptes", values: ["Obligatoire au-delà de seuils (chiffre d'affaires, total bilan, effectif)", "Mêmes seuils"] },
            { label: "Cession d'actions", values: ["Clauses d'agrément paramétrables", "Sans objet tant que l'associé reste unique"] },
            { label: "Passage de l'une à l'autre", values: ["Devient SASU si rachat total par un associé", "Devient SAS dès la cession d'une action à un second associé"] },
          ]}
        />
      </GuideSection>

      <GuideSection title="Pourquoi choisir la SASU quand on est seul">
        <p>
          Si vous lancez un projet sans associé à ce jour, la SASU présente
          plusieurs avantages concrets :
        </p>
        <ul className="list-disc pl-6 space-y-2 marker:text-slate-400">
          <li>
            <strong>Statut social protecteur</strong> : vous êtes
            assimilé-salarié, ce qui vous ouvre la protection sociale du
            régime général (couverture maladie, retraite). Les cotisations
            sont plus élevées qu&apos;en régime TNS, mais la couverture
            l&apos;est aussi.
          </li>
          <li>
            <strong>Séparation claire du patrimoine</strong> : contrairement
            à une entreprise individuelle, la SASU est une personne morale
            à part entière. Votre patrimoine personnel est protégé, sauf
            garantie spécifique signée à titre personnel.
          </li>
          <li>
            <strong>Ouverture future à des associés</strong> : dès que vous
            cédez une action, la société devient SAS, sans dissolution ni
            nouvelle immatriculation. Pratique pour préparer une levée de
            fonds ou l&apos;arrivée d&apos;un cofondateur.
          </li>
          <li>
            <strong>Simplicité administrative</strong> : pas d&apos;assemblée
            formelle, pas de convocation — les décisions de l&apos;associé
            unique sont simplement consignées dans un registre spécifique.
          </li>
        </ul>
      </GuideSection>

      <GuideSection title="Pourquoi partir directement en SAS">
        <p>
          Si vous êtes au moins deux dès le départ, la SAS est la seule
          forme possible — et elle offre une souplesse unique :
        </p>
        <ul className="list-disc pl-6 space-y-2 marker:text-slate-400">
          <li>
            <strong>Liberté contractuelle</strong> : les statuts peuvent
            prévoir presque tout — répartition des pouvoirs, conditions
            d&apos;agrément, droit de préemption, catégories
            d&apos;actions, dividendes prioritaires.
          </li>
          <li>
            <strong>Accueil naturel des investisseurs</strong> : les
            investisseurs professionnels préfèrent la SAS à la SARL pour sa
            flexibilité. C&apos;est la forme dominante des startups
            françaises et des opérations de haut de bilan.
          </li>
          <li>
            <strong>Pacte d&apos;associés hors statuts</strong> : les
            engagements entre fondateurs (vesting, bad leaver,
            anti-dilution) peuvent être formalisés dans un pacte séparé,
            confidentiel, ce que la rigidité d&apos;une SARL rend plus
            difficile.
          </li>
        </ul>
      </GuideSection>

      <GuideSection title="Les points d'attention communs aux deux formes">
        <GuideCallout tone="warning" title="Clause d'agrément">
          En SAS, la clause d&apos;agrément est presque toujours
          recommandée : elle empêche un associé de céder ses actions à un
          tiers sans l&apos;accord des autres. Nos modèles de statuts la
          prévoient par défaut, avec possibilité de la désactiver.
        </GuideCallout>
        <p>Quelques pièges classiques à éviter :</p>
        <ul className="list-disc pl-6 space-y-2 marker:text-slate-400">
          <li>
            <strong>Objet social trop étroit</strong> : un objet limité à
            « conseil en marketing » interdit tout pivot. Formulez
            largement, en couvrant votre activité et ses prolongements
            naturels.
          </li>
          <li>
            <strong>Libération partielle mal documentée</strong> : en SAS /
            SASU, les apports en numéraire doivent être libérés d&apos;au
            moins la moitié à la constitution. Les statuts doivent
            expressément le prévoir si vous optez pour la libération
            partielle.
          </li>
          <li>
            <strong>Nomination sans pièces</strong> : le Président doit
            fournir une{" "}
            <a
              href="/documents/declaration-non-condamnation"
              className="text-blue-500 hover:text-blue-600"
            >
              déclaration de non-condamnation
            </a>{" "}
            au greffe. Sans elle, l&apos;immatriculation est refusée.
          </li>
          <li>
            <strong>Siège non justifié</strong> : le greffe exige une pièce
            prouvant la jouissance du local — l&apos;
            <a
              href="/documents/attestation-domiciliation"
              className="text-blue-500 hover:text-blue-600"
            >
              attestation de domiciliation
            </a>{" "}
            en est la forme la plus courante.
          </li>
        </ul>
      </GuideSection>

      <GuideSection title="Questions fréquentes">
        <FaqSection faqs={FAQS} />
      </GuideSection>
    </GuidePageLayout>
  );
}
