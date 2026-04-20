import type { Metadata } from "next";
import {
  GuidePageLayout,
  GuideSection,
  GuideCallout,
} from "@/components/GuidePageLayout";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL } from "@/lib/site-url";

const TITLE = "CGV, CGU et mentions légales : quelles différences ?";
const SLUG = "cgv-cgu-mentions-legales-differences";
const INTRO =
  "Trois documents juridiques obligatoires ou fortement recommandés sur un site web professionnel, souvent confondus, parfois fusionnés à tort. Chacun remplit une fonction distincte. Pris ensemble, ils couvrent l'intégralité du cadre légal d'un site — séparément, ils ne se remplacent pas.";
const TLDR =
  "Mentions légales : obligatoires pour tout site pro (LCEN). CGU : règles d'usage d'un site ou d'un service, utiles dès que les utilisateurs interagissent. CGV : encadrent la vente de biens ou services — obligatoires dès qu'un euro est encaissé. Chaque document a son périmètre et son propre régime juridique.";

const FAQS = [
  {
    q: "Un site vitrine a-t-il besoin de CGV ?",
    a: "Non, si aucun produit ni service n'est vendu directement en ligne. Les CGV ne deviennent obligatoires qu'à partir du moment où le site permet une transaction (commande, paiement, abonnement). Pour un site purement informatif, seules les mentions légales sont obligatoires. Des CGU sont utiles si vous proposez une inscription ou un compte utilisateur.",
  },
  {
    q: "Peut-on regrouper CGV, CGU et mentions légales en un seul document ?",
    a: "C'est possible mais déconseillé. Le regroupement brouille les responsabilités (l'éditeur et le vendeur ne sont pas toujours la même entité), rend la page illisible et affaiblit la preuve d'acceptation des CGV — qui doit être expressément recueillie avant toute commande. La pratique recommandée : trois pages distinctes, accessibles depuis le pied de page du site.",
  },
  {
    q: "Sur un SaaS freemium, faut-il CGU et CGV ?",
    a: "Oui, dès lors qu'il existe une offre payante. Les CGU s'appliquent à tous les utilisateurs (gratuits et payants) pour encadrer l'usage du service. Les CGV ne concernent que les souscripteurs payants : elles définissent l'offre, le prix, la durée de l'abonnement, les modalités de résiliation et, pour les consommateurs, le droit de rétractation applicable.",
  },
  {
    q: "Les trois documents doivent-ils être signés par l'utilisateur ?",
    a: "Non. Les mentions légales ne se signent pas — elles doivent être accessibles en un clic depuis chaque page. Les CGU et les CGV exigent une acceptation expresse (case à cocher ou bouton dédié) avant la création de compte pour les CGU, avant la validation du paiement pour les CGV. Conservez la preuve de cette acceptation (date, version, IP) pendant au moins cinq ans.",
  },
  {
    q: "Quel lien entre ces documents et la politique de confidentialité ?",
    a: "La politique de confidentialité est un quatrième document distinct, imposé par le RGPD dès qu'un site collecte des données personnelles (même un simple formulaire de contact). Les mentions légales peuvent y renvoyer mais ne la remplacent pas. De même, les CGV et CGU peuvent mentionner les traitements mais doivent pointer vers la politique dédiée pour le détail.",
  },
];

export const metadata: Metadata = {
  title: TITLE,
  description:
    "CGV, CGU et mentions légales : ce qui les distingue, ce qui est obligatoire selon votre site (vitrine, e-commerce, SaaS), et comment les articuler sans doublons.",
  alternates: { canonical: `/guides/${SLUG}` },
  openGraph: {
    url: `${SITE_URL}/guides/${SLUG}`,
    title: `${TITLE} | Guides QuickLegal`,
  },
};

export default function CgvCguMentionsLegalesPage() {
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
            slug: "mentions-legales",
            label: "Mentions légales",
            priceEuros: 19,
            description:
              "Conformes à la LCEN et au Code de la consommation, adaptées aux sociétés, entrepreneurs individuels et professions réglementées.",
          },
          {
            slug: "cgu",
            label: "Conditions Générales d'Utilisation",
            priceEuros: 29,
            description:
              "Pour SaaS, application mobile ou plateforme. B2C / B2B / mixte, service gratuit ou payant, UGC optionnel.",
          },
          {
            slug: "cgv-ecommerce",
            label: "CGV E-commerce",
            priceEuros: 49,
            description:
              "Conformes au Code de la consommation et au RGPD : rétractation, livraison, garanties, médiation.",
          },
        ]}
        related={[
          {
            slug: "avocat-vs-legaltech-vs-gratuit",
            label: "Modèle gratuit, legaltech ou avocat : comment choisir ?",
          },
          {
            slug: "nda-unilateral-ou-bilateral",
            label: "NDA unilatéral ou bilatéral : comment choisir ?",
          },
        ]}
      >
        <GuideSection title="Trois documents, trois fonctions">
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr>
                  <th className="text-left py-3 px-2 font-semibold text-slate-900 border-b border-slate-200">
                    Document
                  </th>
                  <th className="text-left py-3 px-2 font-semibold text-slate-900 border-b border-slate-200">
                    Fonction
                  </th>
                  <th className="text-left py-3 px-2 font-semibold text-slate-900 border-b border-slate-200">
                    Base légale
                  </th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                <Row
                  a="Mentions légales"
                  b="Identifier qui édite et qui héberge le site"
                  c="Art. 6-III LCEN, art. L.111-1 C. conso"
                />
                <Row
                  a="CGU"
                  b="Encadrer l'accès et l'usage du service"
                  c="Liberté contractuelle, RGPD, LCEN"
                />
                <Row
                  a="CGV"
                  b="Encadrer la vente de biens ou services"
                  c="Code de la consommation, art. L.221-1 et s."
                />
              </tbody>
            </table>
          </div>
          <p>
            Aucun de ces documents ne remplace les autres. Un site
            marchand typique les utilise tous les trois, chacun dans sa
            fonction propre. Un site SaaS gratuit n&apos;a pas de CGV mais
            a besoin des deux autres. Un site vitrine se limite aux
            mentions légales.
          </p>
        </GuideSection>

        <GuideSection title="Mentions légales : l'identité de l'éditeur">
          <p>
            Les mentions légales sont le document d&apos;identification.
            Elles sont obligatoires pour tout site exploité dans un cadre
            professionnel (article 6-III de la loi pour la confiance dans
            l&apos;économie numérique). Elles doivent être accessibles en
            un clic depuis chaque page, généralement via un lien en pied
            de page.
          </p>
          <p className="font-medium text-slate-900 mt-4">
            Ce qu&apos;elles contiennent :
          </p>
          <ul className="list-disc pl-6 space-y-1 marker:text-slate-400">
            <li>Identité de l&apos;éditeur (raison sociale, forme, capital, SIRET, RCS, siège)</li>
            <li>Numéro de TVA intracommunautaire</li>
            <li>Directeur de la publication</li>
            <li>Coordonnées de l&apos;hébergeur (nom, adresse, téléphone)</li>
            <li>Pour les professions réglementées : ordre et numéro d&apos;inscription</li>
            <li>Pour une activité B2C : coordonnées du médiateur de la consommation</li>
          </ul>
          <GuideCallout tone="warning" title="Sanction">
            Les mentions manquantes ou inexactes exposent à une amende
            administrative jusqu&apos;à 75 000 € pour une personne morale
            (article L.111-1 C. conso) et à 3 ans d&apos;emprisonnement et
            75 000 € d&apos;amende en cas de mauvaise foi caractérisée
            (article 6 VI LCEN).
          </GuideCallout>
        </GuideSection>

        <GuideSection title="CGU : les règles d'usage du service">
          <p>
            Les CGU fixent les règles du jeu pour les utilisateurs du
            site ou du service. Elles ne sont pas formellement
            obligatoires, mais elles deviennent indispensables dès que
            les utilisateurs interagissent au-delà de la simple lecture :
            création de compte, publication de contenu, accès à des
            fonctionnalités.
          </p>
          <p className="font-medium text-slate-900 mt-4">
            Ce qu&apos;elles contiennent typiquement :
          </p>
          <ul className="list-disc pl-6 space-y-1 marker:text-slate-400">
            <li>Objet du service et identification de l&apos;éditeur</li>
            <li>Conditions d&apos;accès (création de compte, éligibilité)</li>
            <li>Obligations et comportements interdits de l&apos;utilisateur</li>
            <li>
              Clause de propriété intellectuelle et éventuelle licence sur
              les contenus publiés par les utilisateurs
            </li>
            <li>Disponibilité et responsabilité de l&apos;éditeur</li>
            <li>Résiliation, suspension, clôture de compte</li>
            <li>Droit applicable et juridiction</li>
          </ul>
          <p>
            Elles doivent être expressément acceptées — case à cocher à
            l&apos;inscription ou bouton dédié avant le premier usage.
            Une simple mise à disposition en pied de page ne suffit pas à
            les rendre opposables.
          </p>
        </GuideSection>

        <GuideSection title="CGV : l'encadrement de la vente">
          <p>
            Les CGV encadrent la vente de biens ou de services. Elles
            sont obligatoires dès qu&apos;un euro est encaissé, que ce
            soit pour un bien physique, un service ponctuel ou un
            abonnement. Pour les consommateurs, elles doivent respecter
            une série d&apos;obligations du Code de la consommation —
            délais, garanties, droit de rétractation, médiation — sous
            peine d&apos;amendes administratives de la DGCCRF.
          </p>
          <p className="font-medium text-slate-900 mt-4">
            Ce qu&apos;elles contiennent :
          </p>
          <ul className="list-disc pl-6 space-y-1 marker:text-slate-400">
            <li>Identification complète du vendeur</li>
            <li>Description de l&apos;offre, prix, modalités de paiement</li>
            <li>Délais et modalités de livraison, zones couvertes</li>
            <li>
              Droit de rétractation de 14 jours pour les consommateurs (art.
              L.221-18 C. conso), avec exceptions limitées
            </li>
            <li>
              Garanties légales (conformité et vices cachés) — impossibles
              à exclure en B2C
            </li>
            <li>Clause de médiation consommation</li>
            <li>Responsabilité, force majeure, traitement RGPD</li>
            <li>Droit applicable, juridiction, règlement en ligne des litiges (ODR)</li>
          </ul>
          <GuideCallout tone="info" title="Formalisme d'acceptation">
            L&apos;acceptation des CGV doit être expresse et
            <strong> avant </strong>la validation du paiement. Case à
            cocher « J&apos;ai lu et j&apos;accepte les CGV » ou bouton
            équivalent. Conservez la trace (date, version, IP) pendant 5
            ans minimum.
          </GuideCallout>
        </GuideSection>

        <GuideSection title="Quel document pour quel site ?">
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr>
                  <th className="text-left py-3 px-2 font-semibold text-slate-900 border-b border-slate-200">
                    Type de site
                  </th>
                  <th className="text-left py-3 px-2 font-semibold text-slate-900 border-b border-slate-200">
                    Mentions
                  </th>
                  <th className="text-left py-3 px-2 font-semibold text-slate-900 border-b border-slate-200">
                    CGU
                  </th>
                  <th className="text-left py-3 px-2 font-semibold text-slate-900 border-b border-slate-200">
                    CGV
                  </th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                <RowMulti a="Site vitrine institutionnel" b="Oui" c="Non" d="Non" />
                <RowMulti
                  a="Site vitrine avec formulaire de contact / newsletter"
                  b="Oui"
                  c="Recommandé si inscription"
                  d="Non"
                />
                <RowMulti
                  a="Blog éditorial professionnel"
                  b="Oui"
                  c="Recommandé si commentaires"
                  d="Non"
                />
                <RowMulti
                  a="SaaS gratuit avec compte"
                  b="Oui"
                  c="Oui"
                  d="Non"
                />
                <RowMulti
                  a="SaaS payant (freemium, abonnement)"
                  b="Oui"
                  c="Oui"
                  d="Oui"
                />
                <RowMulti
                  a="E-commerce B2C"
                  b="Oui"
                  c="Recommandé si compte"
                  d="Oui (renforcées : rétractation, garanties, médiation)"
                />
                <RowMulti
                  a="E-commerce B2B"
                  b="Oui"
                  c="Recommandé si compte"
                  d="Oui (moins contraignantes qu'en B2C)"
                />
                <RowMulti
                  a="Marketplace / plateforme d'annonces"
                  b="Oui"
                  c="Indispensables (UGC, responsabilité)"
                  d="Oui"
                />
              </tbody>
            </table>
          </div>
        </GuideSection>

        <GuideSection title="La politique de confidentialité : un quatrième document">
          <p>
            La politique de confidentialité complète ces trois documents.
            Elle est imposée par le RGPD dès qu&apos;un site collecte des
            données personnelles — même un simple formulaire de contact,
            un compteur d&apos;audience, ou une newsletter. Elle décrit
            les traitements, les finalités, les bases légales, les
            durées, les destinataires et les droits des personnes.
          </p>
          <p>
            Les mentions légales renvoient à la politique de
            confidentialité ; les CGU et CGV peuvent y référer ; mais
            aucun de ces trois documents ne la remplace. Elle est
            publiée dans une page dédiée, accessible depuis le pied de
            page au même titre que les autres.
          </p>
        </GuideSection>

        <GuideSection title="Erreurs d'articulation à éviter">
          <ul className="list-disc pl-6 space-y-2 marker:text-slate-400">
            <li>
              <strong>Fusionner les trois en un seul document</strong> :
              rend l&apos;ensemble illisible, affaiblit la preuve
              d&apos;acceptation des CGV, mélange des responsabilités qui
              peuvent incomber à des entités différentes (éditeur vs
              vendeur).
            </li>
            <li>
              <strong>Oublier le médiateur dans les mentions légales
              d&apos;un site B2C</strong> : sanction DGCCRF.
            </li>
            <li>
              <strong>Faire des CGV qui renvoient aux CGU pour la
              rétractation</strong> : la rétractation est un mécanisme
              propre à la vente, elle doit figurer dans les CGV avec le
              formulaire type en annexe.
            </li>
            <li>
              <strong>Négliger les CGU sur une plateforme communautaire</strong> :
              l&apos;absence de clause UGC vous expose à une
              responsabilité potentielle sur les contenus publiés par les
              utilisateurs (article 6 LCEN).
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

function RowMulti({
  a,
  b,
  c,
  d,
}: {
  a: string;
  b: string;
  c: string;
  d: string;
}) {
  return (
    <tr>
      <td className="py-2.5 px-2 font-medium text-slate-900 border-b border-slate-100 align-top">
        {a}
      </td>
      <td className="py-2.5 px-2 border-b border-slate-100 align-top">{b}</td>
      <td className="py-2.5 px-2 border-b border-slate-100 align-top">{c}</td>
      <td className="py-2.5 px-2 border-b border-slate-100 align-top">{d}</td>
    </tr>
  );
}
