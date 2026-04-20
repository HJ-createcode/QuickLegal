import type { Metadata } from "next";
import {
  GuidePageLayout,
  GuideSection,
  GuideCallout,
} from "@/components/GuidePageLayout";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL } from "@/lib/site-url";

const TITLE = "Modèle gratuit, legaltech ou avocat : comment choisir ?";
const SLUG = "avocat-vs-legaltech-vs-gratuit";
const INTRO =
  "Pour rédiger un document juridique, trois voies coexistent : modèle téléchargé gratuitement, plateforme legaltech type QuickLegal, ou rédaction sur mesure par un avocat. Le bon arbitrage dépend de la valeur du document, de la complexité du projet et du niveau de sécurité juridique recherché.";
const TLDR =
  "Modèle gratuit : pour un document à faible enjeu, si vous maîtrisez le sujet. Legaltech : pour la majorité des actes standards du droit français, à coût maîtrisé. Avocat : pour les situations atypiques, les enjeux patrimoniaux élevés et le conseil stratégique personnalisé. Ces trois options ne s'excluent pas — on peut combiner legaltech et relecture avocat.";

const FAQS = [
  {
    q: "Un modèle gratuit engage-t-il la responsabilité de celui qui le publie ?",
    a: "Quasi jamais. Les modèles téléchargés gratuitement sont généralement fournis « en l'état », sans garantie, avec mention expresse que l'utilisateur doit les adapter à sa situation. En cas de difficulté ultérieure, c'est la personne qui a signé le document qui supporte les conséquences, pas celle qui a mis le modèle à disposition.",
  },
  {
    q: "Que garantit une legaltech comme QuickLegal ?",
    a: "Un modèle rédigé par des juristes, revu par un avocat inscrit au Barreau, maintenu à jour des évolutions du droit français. Nous ne fournissons pas de conseil personnalisé — c'est la limite structurelle du produit. En revanche, le document est conçu pour répondre aux usages standards et aux exigences des greffes et administrations.",
  },
  {
    q: "Quand faut-il absolument passer par un avocat ?",
    a: "Dès que la situation sort du modèle standard : structurations patrimoniales complexes (holdings multiples, actions de préférence), opérations internationales, contentieux en cours, ou besoin d'un conseil stratégique personnalisé sur le droit applicable. L'avocat est aussi incontournable pour toute plaidoirie ou représentation en justice — monopole exclusif.",
  },
  {
    q: "Peut-on utiliser un modèle gratuit et le faire relire par un avocat ?",
    a: "Oui, mais c'est rarement économique. La relecture d'un document étranger par un avocat est souvent plus chère que la rédaction initiale, car il doit reconstruire le raisonnement, identifier les écarts avec la pratique et proposer des corrections. À budget équivalent, un document legaltech bien choisi + revue ciblée sur un ou deux points est souvent plus efficace.",
  },
  {
    q: "QuickLegal peut-il remplacer totalement un avocat ?",
    a: "Pour des actes standards du droit français — statuts de SAS ou SCI classiques, PV d'approbation des comptes, CGV e-commerce, NDA bilatéral, mentions légales — oui. Pour un conseil personnalisé, un contentieux, une plaidoirie ou une stratégie patrimoniale complexe, non. Nous le disons clairement dans nos CGV.",
  },
];

export const metadata: Metadata = {
  title: TITLE,
  description:
    "Comment choisir entre un modèle juridique gratuit, une legaltech et un avocat ? Grille de décision par type de document, niveau de risque et budget.",
  alternates: { canonical: `/guides/${SLUG}` },
  openGraph: {
    url: `${SITE_URL}/guides/${SLUG}`,
    title: `${TITLE} | Guides QuickLegal`,
  },
};

export default function AvocatVsLegaltechPage() {
  return (
    <>
      <GuidePageLayout
        slug={SLUG}
        eyebrow="Choisir"
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
              "La voie legaltech pour un acte standard : rédaction juriste, revue avocat, prix fixe.",
          },
          {
            slug: "cgv-ecommerce",
            label: "CGV E-commerce",
            priceEuros: 49,
            description:
              "Le document à fort volume d'usage, parfaitement adapté à la voie legaltech.",
          },
          {
            slug: "nda",
            label: "Accord de confidentialité",
            priceEuros: 39,
            description:
              "Un contrat B2B standard pour lequel le modèle bien calibré suffit dans la majorité des cas.",
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
            slug: "cgv-cgu-mentions-legales-differences",
            label: "CGV, CGU et mentions légales : quelles différences ?",
          },
        ]}
      >
        <GuideSection title="Trois voies, trois logiques">
          <div className="space-y-4">
            <OptionBlock
              title="Modèle gratuit"
              when="Document à faible enjeu, utilisateur expérimenté qui sait personnaliser."
              price="0 €"
              pros={[
                "Aucun coût",
                "Rapide pour un document simple",
                "Peut servir de base à une rédaction personnelle",
              ]}
              cons={[
                "Rarement à jour des dernières évolutions légales",
                "Pas de conseil ni de suivi",
                "Risque d'erreurs non détectées",
                "Aucune revue juridique",
              ]}
            />
            <OptionBlock
              title="Legaltech (QuickLegal et similaires)"
              when="Document standard du droit français, situation courante."
              price="9 à 300 € selon le document"
              pros={[
                "Modèle rédigé par des juristes",
                "Revue par un avocat au Barreau",
                "Mise à jour continue du droit applicable",
                "Personnalisation via questionnaire guidé",
                "Prix fixe, sans abonnement",
                "Document conservé dans un espace client",
              ]}
              cons={[
                "Pas de conseil personnalisé",
                "Périmètre limité au modèle proposé",
                "Inadapté aux montages complexes",
              ]}
            />
            <OptionBlock
              title="Avocat"
              when="Situation complexe, enjeu patrimonial élevé, besoin de conseil stratégique."
              price="500 à 5 000 € et au-delà"
              pros={[
                "Rédaction entièrement sur mesure",
                "Conseil stratégique personnalisé",
                "Responsabilité professionnelle engagée",
                "Seul habilité à plaider et à représenter en justice",
                "Couverture complète de situations atypiques",
              ]}
              cons={[
                "Coût important",
                "Délai de rédaction plus long",
                "Surdimensionné pour des actes standards",
              ]}
            />
          </div>
        </GuideSection>

        <GuideSection title="Grille de décision par type de document">
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr>
                  <th className="text-left py-3 px-2 font-semibold text-slate-900 border-b border-slate-200">
                    Document
                  </th>
                  <th className="text-left py-3 px-2 font-semibold text-slate-900 border-b border-slate-200">
                    Voie recommandée
                  </th>
                  <th className="text-left py-3 px-2 font-semibold text-slate-900 border-b border-slate-200">
                    Quand passer à l&apos;avocat
                  </th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                <Row
                  a="Statuts de SAS standards"
                  b="Legaltech"
                  c="Actions de préférence, pacte complexe, levée de fonds imminente"
                />
                <Row
                  a="Statuts de SCI patrimoniale"
                  b="Legaltech"
                  c="Stratégie patrimoniale sophistiquée, démembrement"
                />
                <Row
                  a="PV d'approbation des comptes"
                  b="Legaltech"
                  c="Contentieux entre associés"
                />
                <Row
                  a="CGV e-commerce courantes"
                  b="Legaltech"
                  c="Modèle économique atypique, international"
                />
                <Row
                  a="NDA commercial B2B"
                  b="Legaltech"
                  c="Négociation M&A, IP très sensible"
                />
                <Row
                  a="Mentions légales, CGU, politique confidentialité"
                  b="Legaltech"
                  c="Secteur réglementé, DPO externe imposé"
                />
                <Row
                  a="Pacte d'associés avancé (vesting, bad leaver)"
                  b="Avocat"
                  c="Toujours"
                />
                <Row
                  a="Fusion, scission, apport partiel d'actif"
                  b="Avocat"
                  c="Toujours"
                />
                <Row
                  a="Contrat international transfrontalier"
                  b="Avocat"
                  c="Toujours"
                />
                <Row
                  a="Contentieux, plaidoirie, représentation en justice"
                  b="Avocat"
                  c="Monopole exclusif"
                />
              </tbody>
            </table>
          </div>
        </GuideSection>

        <GuideSection title="Les trois critères de décision">
          <p>
            Trois critères permettent de trancher rapidement entre les
            voies disponibles :
          </p>
          <ol className="list-decimal pl-6 space-y-3 marker:text-slate-400">
            <li>
              <strong>Valeur du document</strong>. Plus l&apos;acte
              conditionne un patrimoine ou une opération stratégique, plus
              l&apos;investissement juridique est justifié. Des statuts
              pour une SAS à 5 000 € de capital n&apos;appellent pas le
              même traitement que ceux d&apos;une holding à 500 000 €.
            </li>
            <li>
              <strong>Atypicité de la situation</strong>. Un projet qui
              rentre dans les cases classiques bénéficie de la standardisation :
              la legaltech excelle. Dès qu&apos;il y a une particularité
              structurante (catégories d&apos;actions, ordre réglementé,
              dimension internationale, contentieux connexe), un avocat
              devient rentable.
            </li>
            <li>
              <strong>Besoin de conseil</strong>. Si la question est « quelle
              forme juridique choisir pour mon projet ? », l&apos;avocat
              ou l&apos;expert-comptable vous apporte un conseil. Si la
              question est « j&apos;ai décidé de monter une SAS, comment
              j&apos;obtiens mes statuts ? », la legaltech est
              l&apos;option optimale.
            </li>
          </ol>
        </GuideSection>

        <GuideSection title="La combinaison legaltech + avocat">
          <GuideCallout tone="info" title="Un usage qui monte">
            De plus en plus de professionnels combinent les deux voies :
            génération du document standard via une legaltech, puis
            relecture ciblée par un avocat sur les points qui posent
            question. L&apos;avocat ne rédige plus — il relit, challenge
            et valide. Le coût global est souvent moitié inférieur à une
            rédaction complète en cabinet.
          </GuideCallout>
          <p>
            Cette combinaison suppose un client suffisamment informé pour
            identifier les points de revue utiles. Elle fonctionne bien sur
            des documents structurés comme les statuts de SAS ou les CGV,
            moins sur des documents très personnels comme un pacte
            d&apos;associés sophistiqué.
          </p>
        </GuideSection>

        <GuideSection title="Les limites que QuickLegal assume">
          <p>
            Notre positionnement est clair et public : QuickLegal est une
            plateforme d&apos;édition de modèles, pas un cabinet. Les
            implications :
          </p>
          <ul className="list-disc pl-6 space-y-2 marker:text-slate-400">
            <li>
              Nous ne fournissons aucune <strong>consultation personnalisée</strong>.
              Pour une question propre à votre situation, adressez-vous à
              un avocat, un expert-comptable ou un notaire selon la nature
              du sujet.
            </li>
            <li>
              Nous ne produisons pas de <strong>rédaction sur mesure</strong>{" "}
              hors du périmètre de nos modèles. Pour un document qui sort
              du cadre (pacte avancé, structuration internationale), un
              avocat est plus adapté.
            </li>
            <li>
              Nous n&apos;intervenons pas en <strong>contentieux</strong> ni
              en <strong>représentation en justice</strong>. Monopole
              exclusif des avocats.
            </li>
          </ul>
          <p>
            Cette transparence vous aide à savoir quand QuickLegal est le
            bon choix — et quand il faut passer à autre chose.
          </p>
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

function OptionBlock({
  title,
  when,
  price,
  pros,
  cons,
}: {
  title: string;
  when: string;
  price: string;
  pros: string[];
  cons: string[];
}) {
  return (
    <div className="p-5 rounded-2xl border border-slate-200 bg-white">
      <div className="flex items-baseline justify-between gap-4 mb-2">
        <h3 className="font-semibold text-slate-900 text-base">{title}</h3>
        <span className="text-slate-900 font-serif font-bold text-lg">
          {price}
        </span>
      </div>
      <p className="text-slate-500 text-xs italic mb-3">{when}</p>
      <div className="grid sm:grid-cols-2 gap-4 mt-3">
        <div>
          <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-2">
            Avantages
          </p>
          <ul className="space-y-1">
            {pros.map((item) => (
              <li key={item} className="text-sm text-slate-700">
                · {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Limites
          </p>
          <ul className="space-y-1">
            {cons.map((item) => (
              <li key={item} className="text-sm text-slate-700">
                · {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
