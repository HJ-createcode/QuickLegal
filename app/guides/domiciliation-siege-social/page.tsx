import type { Metadata } from "next";
import {
  GuidePageLayout,
  GuideSection,
  GuideCallout,
} from "@/components/GuidePageLayout";
import { FaqSection, type FaqItem } from "@/components/FaqSection";
import { ComparisonTable } from "@/components/ComparisonTable";
import { buildMetadata } from "@/lib/seo";

const TITLE = "Où domicilier le siège social de sa société ?";
const SLUG = "domiciliation-siege-social";
const INTRO =
  "Le siège social est l'adresse officielle de la société, celle qui figure sur le Kbis, sur les factures et sur les documents contractuels. Quatre options s'offrent aux créateurs — chacune avec ses avantages, ses contraintes et sa pièce à produire au greffe.";
const TLDR =
  "Chez le dirigeant, chez un tiers, dans une pépinière ou via une société de domiciliation agréée. Dans tous les cas, une attestation ou un contrat prouvant votre droit d'occupation est exigé par le greffe. L'adresse du siège fixe aussi votre tribunal compétent et votre centre des impôts.";

const FAQS: FaqItem[] = [
  {
    question: "Peut-on domicilier une société à l'adresse de son domicile locataire ?",
    answer:
      "Oui, mais à deux conditions : le bail ne doit pas l'interdire explicitement, et la durée maximale est de cinq ans (article L.123-11-1 du Code de commerce). Au-delà, la société doit déménager son siège. Pour un propriétaire, la domiciliation peut rester indéfiniment si le règlement de copropriété ne s'y oppose pas.",
  },
  {
    question: "La domiciliation chez soi donne-t-elle une adresse commerciale visible ?",
    answer:
      "Oui — le siège social figure sur le Kbis, sur les factures et sur toute la communication commerciale. Si la confidentialité du domicile est importante (pour des raisons de vie privée, par exemple), une société de domiciliation ou une pépinière permettent d'afficher une adresse professionnelle neutre.",
  },
  {
    question: "Peut-on changer de siège social après la création ?",
    answer:
      "Oui, via une assemblée générale extraordinaire et une inscription modificative au RCS. Le nouveau siège nécessite sa propre attestation de domiciliation. Attention : si le nouveau siège change de département, une nouvelle annonce légale doit être publiée.",
  },
  {
    question: "Une société de domiciliation est-elle légale ?",
    answer:
      "Oui, à condition qu'elle soit agréée par la préfecture (article L.123-11-3 du Code de commerce). Le contrat de domiciliation suit un formalisme renforcé : durée, tarifs, obligations de réception et de transfert du courrier. Le contrat fait foi auprès du greffe en lieu et place de l'attestation classique.",
  },
  {
    question: "Que dois-je fournir au greffe pour prouver le siège ?",
    answer:
      "Soit une attestation de domiciliation signée par la personne ayant la jouissance du local (propriétaire, locataire, occupant à titre gratuit), soit un contrat de domiciliation conclu avec une société agréée. Dans les deux cas, le greffe vérifie que l'occupant ou le domicilié dispose bien du droit d'héberger la société.",
  },
];

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description:
    "Domicilier son siège social : chez soi, chez un tiers, en pépinière ou via une société agréée. Avantages, contraintes, pièces à fournir au greffe et durée maximale.",
  path: `/guides/${SLUG}`,
});

export default function DomiciliationPage() {
  return (
    <GuidePageLayout
        slug={SLUG}
        eyebrow="Pratique"
        title={TITLE}
        intro={INTRO}
        tldr={TLDR}
        lastUpdated="avril 2026"
        products={[
          {
            slug: "attestation-domiciliation",
            label: "Attestation de domiciliation",
            priceEuros: 9,
            description:
              "La pièce écrite exigée par le greffe. Couvre les quatre cas classiques : domicile du dirigeant, local d'un tiers, siège d'une autre société, occupation à titre gratuit.",
          },
          {
            slug: "statuts-sas",
            label: "Statuts de SAS",
            priceEuros: 79,
            description:
              "Statuts complets pour créer votre SAS — l'adresse du siège y figure expressément et détermine votre greffe.",
          },
          {
            slug: "statuts-sci",
            label: "Statuts de SCI",
            priceEuros: 89,
            description:
              "Pour un projet immobilier patrimonial : la SCI a aussi son siège, souvent à l'adresse d'un associé.",
          },
        ]}
        related={[
          {
            slug: "sas-vs-sasu",
            label: "SAS ou SASU : quelle forme choisir ?",
          },
          {
            slug: "cout-creation-sas",
            label: "Combien coûte la création d'une SAS ?",
          },
          {
            slug: "avocat-vs-legaltech-vs-gratuit",
            label: "Modèle gratuit, legaltech ou avocat : comment choisir ?",
          },
        ]}
      >
        <GuideSection title="Les quatre options à connaître">
          <p>
            La loi française autorise quatre grands modes de domiciliation
            du siège social d&apos;une société. Chacun répond à un besoin
            différent et s&apos;accompagne d&apos;un formalisme spécifique.
          </p>
          <ComparisonTable
            columns={["Option", "Idéal pour", "Pièce à produire"]}
            rows={[
              { label: "Domicile du dirigeant", values: ["Projet démarrant sans local commercial, petite structure", "Attestation de domiciliation signée par le dirigeant"] },
              { label: "Local d'un tiers", values: ["Accueil chez un proche, chez un associé ou chez une société du groupe", "Attestation signée par l'occupant du local"] },
              { label: "Pépinière ou incubateur", values: ["Startups, projets à accompagnement, besoin de locaux partagés", "Contrat d'hébergement + attestation émise par la pépinière"] },
              { label: "Société de domiciliation agréée", values: ["Image professionnelle, confidentialité du domicile, adresse prestigieuse", "Contrat de domiciliation conforme à l'art. R.123-166-1 C. com."] },
            ]}
          />
        </GuideSection>

        <GuideSection title="1. Domicilier chez le dirigeant">
          <p>
            C&apos;est l&apos;option la plus simple et la plus fréquente
            pour les jeunes projets. L&apos;article L.123-11-1 du Code de
            commerce autorise tout dirigeant à fixer le siège de sa société
            à son domicile personnel, sous deux conditions :
          </p>
          <ul className="list-disc pl-6 space-y-2 marker:text-slate-400">
            <li>
              <strong>Si le dirigeant est locataire</strong>, le bail ne
              doit pas l&apos;interdire explicitement. En pratique, les
              baux d&apos;habitation standards contiennent souvent cette
              interdiction — lisez-le avant de signer.
            </li>
            <li>
              <strong>Durée limitée à cinq ans</strong> pour un locataire
              ou pour un propriétaire dans un bien soumis à un règlement
              de copropriété qui restreint l&apos;usage. Au terme, le siège
              doit être transféré.
            </li>
            <li>
              Pour un propriétaire sans contrainte copropriétaire, la
              durée est illimitée.
            </li>
          </ul>
          <GuideCallout tone="warning" title="Bail et copropriété">
            Domicilier en violation d&apos;un bail ou d&apos;un règlement
            de copropriété expose à la nullité de l&apos;occupation et
            possiblement de l&apos;immatriculation. Prenez quinze minutes
            pour relire votre bail avant de rédiger l&apos;attestation.
          </GuideCallout>
        </GuideSection>

        <GuideSection title="2. Domicilier chez un tiers">
          <p>
            Le tiers peut être un particulier (parent, ami) ou une
            personne morale (associé, société du groupe). L&apos;attestation
            est signée par la personne ayant la jouissance effective du
            local — propriétaire ou locataire en titre — et précise le
            titre de l&apos;occupation, la durée, et la société
            bénéficiaire.
          </p>
          <p>
            Cette formule est fréquente chez les holdings, où toutes les
            filiales sont domiciliées au siège de la société mère. Elle
            est aussi utile quand un associé met à disposition un local
            dont il a la jouissance, avec ou sans loyer selon
            l&apos;accord des parties.
          </p>
        </GuideSection>

        <GuideSection title="3. Domicilier en pépinière ou incubateur">
          <p>
            Les pépinières d&apos;entreprises et les incubateurs proposent
            un hébergement administratif (adresse + réception du courrier),
            souvent doublé d&apos;un accompagnement métier. L&apos;accès
            y est généralement conditionné à un dossier de sélection et
            à une période limitée (24 à 48 mois en moyenne).
          </p>
          <p>
            Côté formalité : la pépinière produit une attestation
            d&apos;hébergement ou un contrat, que vous joignez au dossier
            d&apos;immatriculation. Le formalisme est léger, comparable à
            une domiciliation chez un tiers.
          </p>
        </GuideSection>

        <GuideSection title="4. Société de domiciliation agréée">
          <p>
            Les sociétés de domiciliation commerciale (ABC Liv, Les
            Tricolores, IDOMICILE… il en existe plusieurs centaines en
            France) proposent une adresse professionnelle dans une ville
            prestigieuse, un service de réception et de réexpédition du
            courrier, et parfois des salles de réunion à la demande.
          </p>
          <p>
            Le contrat suit un formalisme légal renforcé (article
            R.123-166-1 du Code de commerce) : durée de trois mois minimum
            reconductible, obligation pour le domiciliataire de transmettre
            les courriers, tenue d&apos;un registre des sociétés
            domiciliées. Tarif : de 15 à 80 € par mois selon la ville et
            les services inclus.
          </p>
          <GuideCallout tone="info" title="Agrément préfectoral obligatoire">
            Avant de signer, vérifiez que le domiciliataire dispose de
            l&apos;agrément préfectoral (numéro visible dans les mentions
            légales de son site). Sans cet agrément, le contrat est
            inopposable et votre immatriculation peut être refusée.
          </GuideCallout>
        </GuideSection>

        <GuideSection title="La pièce centrale : l'attestation">
          <p>
            Pour les trois premiers cas (dirigeant, tiers, pépinière sans
            agrément), la pièce à produire est une{" "}
            <a
              href="/documents/attestation-domiciliation"
              className="text-blue-500 hover:text-blue-600"
            >
              attestation de domiciliation
            </a>
            . Elle doit contenir :
          </p>
          <ul className="list-disc pl-6 space-y-1 marker:text-slate-400">
            <li>Identité complète de la personne qui atteste ;</li>
            <li>
              Justification du titre d&apos;occupation (propriétaire,
              locataire, sous-locataire, occupant à titre gratuit) ;
            </li>
            <li>Adresse exacte du local ;</li>
            <li>
              Identité de la société domiciliée (en cours de constitution
              ou déjà immatriculée) ;
            </li>
            <li>Durée de l&apos;autorisation et modalités de résiliation ;</li>
            <li>
              Signature et date, précédées de la mention « Lu et approuvé ».
            </li>
          </ul>
          <p>
            Dans le dernier cas (société de domiciliation agréée), le
            contrat spécifique remplit ce rôle et reprend ces éléments
            sous une forme plus développée.
          </p>
        </GuideSection>

        <GuideSection title="Conséquences du choix du siège">
          <p>Le siège détermine plusieurs éléments pratiques :</p>
          <ul className="list-disc pl-6 space-y-2 marker:text-slate-400">
            <li>
              <strong>Greffe compétent</strong> : le RCS du ressort du
              siège (Paris, Nanterre, Bobigny…). C&apos;est là que vous
              déposerez vos comptes annuels et toute modification
              statutaire.
            </li>
            <li>
              <strong>Tribunal compétent</strong> : en cas de litige
              commercial, le tribunal de commerce compétent est en
              principe celui du siège du défendeur.
            </li>
            <li>
              <strong>Service des impôts des entreprises</strong> (SIE)
              de rattachement, notamment pour la TVA et la CFE.
            </li>
            <li>
              <strong>CFE</strong> (Cotisation Foncière des Entreprises) :
              son taux dépend de la commune du siège. Un siège à Paris ou
              à Lyon peut entraîner une CFE plus élevée qu&apos;en zone
              rurale.
            </li>
            <li>
              <strong>Image commerciale</strong> : une adresse dans un
              arrondissement parisien ou dans une capitale régionale
              rassure certains fournisseurs et clients institutionnels —
              un argument à évaluer selon votre cible.
            </li>
          </ul>
        </GuideSection>

        <GuideSection title="Questions fréquentes">
          <FaqSection faqs={FAQS} />
        </GuideSection>
      </GuidePageLayout>
  );
}
