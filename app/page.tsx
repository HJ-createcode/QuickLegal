import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { JsonLd } from "@/components/JsonLd";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site-url";
import {
  CATEGORY_LABELS,
  listByCategory,
  listDocuments,
  type DocumentCategory,
  type DocumentDefinition,
} from "@/lib/document-registry";
import { CATEGORY_CONTENT } from "@/lib/category-content";
import { getCatalogPriceRange } from "@/lib/site-facts";
import { GUIDES } from "@/lib/guides-registry";

// Slugs mis en avant dans la section guides de la home — choisis pour
// la diversité d'intentions (décision, coût, sélection prestataire).
const HOME_GUIDE_SLUGS = [
  "sas-vs-sasu",
  "sci-ir-ou-is",
  "cout-creation-sas",
  "avocat-vs-legaltech-vs-gratuit",
];

export const metadata: Metadata = {
  title: {
    absolute: `${SITE_NAME} — Documents juridiques français, rédigés par des juristes`,
  },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    url: SITE_URL,
    title: `${SITE_NAME} — Documents juridiques en 10 minutes`,
    description: SITE_DESCRIPTION,
  },
};

// Ordre stable des catégories dans l'ensemble du site.
const CATEGORY_ORDER: DocumentCategory[] = [
  "statuts",
  "gouvernance",
  "commercial",
  "conformite",
];

// Slugs mis en avant dans la section « documents phares » du hero. Choisis
// pour couvrir chaque famille et pour correspondre aux intentions de
// recherche les plus fréquentes. Si un slug ne figure plus au registry, il
// est simplement filtré.
const FLAGSHIP_SLUGS = [
  "statuts-sas",
  "statuts-sci",
  "cgv-ecommerce",
  "nda",
  "pv-ag-ordinaire",
  "mentions-legales",
];

const HOME_FAQS = [
  {
    question: "Qui rédige les modèles QuickLegal ?",
    answer:
      "Les modèles sont rédigés par des juristes puis revus par un avocat d'affaires inscrit au Barreau de Paris. Chaque document est mis à jour en fonction de l'évolution du droit français — changements législatifs, nouvelles jurisprudences, mises en conformité du Code de la consommation ou du RGPD.",
  },
  {
    question: "Le document est-il vraiment prêt à signer après génération ?",
    answer:
      "Oui. Le PDF final reprend vos réponses dans un modèle paramétré, sans filigrane, avec les articles et clauses attendus par le greffe ou par les cocontractants. Pour les actes constitutifs (statuts de SAS, SCI…), il reste à réaliser les formalités extérieures : dépôt de capital, annonce légale, immatriculation au RCS.",
  },
  {
    question: "QuickLegal est-il un cabinet d'avocats ?",
    answer:
      "Non. QuickLegal est une plateforme d'édition de modèles juridiques. Elle ne fournit pas de consultation personnalisée. Pour une situation atypique ou une structuration patrimoniale complexe, nous recommandons de faire relire le document par votre conseil habituel avant signature.",
  },
  {
    question: "Y a-t-il un abonnement ?",
    answer:
      "Non. QuickLegal fonctionne à l'acte : vous payez uniquement le document que vous générez, au prix fixe indiqué sur sa page. Aucun prélèvement récurrent, aucun engagement, aucune facturation cachée.",
  },
  {
    question: "Mes documents restent-ils accessibles après téléchargement ?",
    answer:
      "Oui. Chaque document généré est conservé dans votre espace personnel, sans limite de durée. Vous pouvez le retélécharger à tout moment, retrouver vos réponses, ou rouvrir le questionnaire pour générer une variante.",
  },
  {
    question: "Dans quelle langue et pour quelle juridiction sont les modèles ?",
    answer:
      "Tous les modèles sont rédigés en français et calibrés pour le droit français. Ils référencent les textes du Code de commerce, du Code civil, du Code de la consommation et du RGPD. Ils ne sont pas adaptés à une juridiction étrangère.",
  },
  {
    question: "Comment se déroule le paiement ?",
    answer:
      "Le paiement s'effectue en ligne via Stripe, par carte bancaire sécurisée. Le document final est immédiatement disponible dans votre espace, et un lien de téléchargement apparaît sur la page de confirmation.",
  },
  {
    question: "Et si mon projet ne colle pas à un modèle proposé ?",
    answer:
      "Chaque produit indique clairement son périmètre (« inclus » / « non inclus ») sur sa page dédiée. Si votre besoin sort de ce périmètre — actionnariat complexe, opérations internationales, structuration patrimoniale — faites relire le document par un avocat avant signature, ou consultez-le pour une rédaction entièrement sur mesure.",
  },
];

export default function HomePage() {
  const documents = listDocuments();
  const grouped = listByCategory();
  const { minEuros, maxEuros } = getCatalogPriceRange(documents);
  const flagship = FLAGSHIP_SLUGS.map((slug) =>
    documents.find((d) => d.type === slug)
  ).filter((d): d is DocumentDefinition => !!d);

  return (
    <main>
      <SiteNav />

      {/* HERO */}
      <section className="pt-36 pb-20 px-6 bg-gradient-to-b from-sky-50 via-white to-white">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200/60 text-amber-700 text-xs font-semibold mb-8 shadow-sm">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
            Droit français · Revu par un avocat au Barreau de Paris
          </div>

          <h1 className="font-serif text-5xl sm:text-7xl font-bold tracking-tight mb-8 leading-[1.05] text-slate-900">
            Vos documents juridiques,
            <br />
            <span className="italic text-emerald-700">signés en 10 minutes.</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Statuts de société, procès-verbaux d&apos;assemblée, CGV, NDA,
            mentions légales, CGU : {documents.length} modèles rédigés par des
            juristes et revus par un avocat d&apos;affaires, personnalisés avec
            vos réponses. Sans abonnement.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/generation-document"
              className="px-8 py-3.5 rounded-xl bg-[#0f1e3d] hover:bg-[#0a1428] text-white font-semibold text-base shadow-lg shadow-slate-900/10"
            >
              Voir le catalogue complet
            </Link>
            <Link
              href="/comment-ca-marche"
              className="px-8 py-3.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-white text-slate-900 font-medium text-base"
            >
              Comment ça marche
            </Link>
          </div>

          <p className="text-slate-500 text-sm mt-6">
            Paiement sécurisé · Téléchargement immédiat · Conservé à vie · de{" "}
            {minEuros}&nbsp;€ à {maxEuros}&nbsp;€&nbsp;TTC
          </p>
        </div>
      </section>

      {/* CATÉGORIES */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-emerald-700 text-sm font-semibold uppercase tracking-widest mb-3">
              Quatre familles, un catalogue
            </p>
            <h2 className="font-serif text-4xl font-bold text-slate-900 mb-4">
              Couvrir toute la vie juridique d&apos;une entreprise
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              De la création aux décisions annuelles, en passant par les
              contrats commerciaux et la conformité web.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {CATEGORY_ORDER.map((cat) => {
              const docs = grouped[cat];
              const content = CATEGORY_CONTENT[cat];
              if (!docs || docs.length === 0) return null;
              return (
                <div
                  key={cat}
                  className="p-7 rounded-2xl border border-slate-200 bg-white shadow-premium hover:shadow-premium-hover transition"
                >
                  <p className="text-emerald-700 text-xs font-semibold uppercase tracking-widest mb-2">
                    {content.byline}
                  </p>
                  <h3 className="font-serif text-2xl font-bold text-slate-900 mb-2">
                    {CATEGORY_LABELS[cat]}
                  </h3>
                  <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                    {content.description}
                  </p>
                  <ul className="space-y-1 mb-5 text-sm text-slate-700">
                    {docs.slice(0, 4).map((doc) => (
                      <li key={doc.type} className="flex items-baseline gap-2">
                        <span className="text-emerald-700" aria-hidden="true">
                          ·
                        </span>
                        <Link
                          href={`/documents/${doc.type}`}
                          className="hover:text-slate-900"
                        >
                          {doc.label}
                        </Link>
                      </li>
                    ))}
                    {docs.length > 4 && (
                      <li className="text-slate-400 text-xs pl-3">
                        +{docs.length - 4} autres dans cette famille
                      </li>
                    )}
                  </ul>
                  <Link
                    href="/generation-document"
                    className="text-sm font-medium text-emerald-700 hover:text-emerald-800"
                  >
                    Voir cette catégorie →
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* DOCUMENTS PHARES */}
      <section className="py-16 px-6 bg-slate-50/60 border-y border-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="font-serif text-3xl font-bold text-slate-900 mb-2">
                Documents les plus demandés
              </h2>
              <p className="text-slate-600 text-sm max-w-xl">
                Pour démarrer une société, sécuriser une activité marchande ou
                documenter la vie d&apos;un groupe.
              </p>
            </div>
            <Link
              href="/generation-document"
              className="text-sm font-medium text-emerald-700 hover:text-emerald-800 whitespace-nowrap"
            >
              Voir les {documents.length} documents →
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {flagship.map((doc) => (
              <Link
                key={doc.type}
                href={`/documents/${doc.type}`}
                className="block p-5 rounded-2xl border border-slate-200 bg-white hover:border-emerald-300 hover:shadow-premium transition"
              >
                <p className="text-xs text-emerald-700 font-semibold uppercase tracking-wider mb-1.5">
                  {CATEGORY_LABELS[doc.category]}
                </p>
                <h3 className="font-serif text-lg font-semibold text-slate-900 mb-1">
                  {doc.label}
                </h3>
                <p className="text-slate-500 text-xs mb-3 leading-relaxed">
                  {doc.description}
                </p>
                <p className="text-slate-900 text-sm font-semibold">
                  {Math.round(doc.priceCents / 100)}&nbsp;€&nbsp;TTC
                  <span className="text-slate-400 text-xs font-normal ml-2">
                    → voir le détail
                  </span>
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* COMMENT ÇA MARCHE */}
      <section id="comment-ca-marche" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-emerald-700 text-sm font-semibold uppercase tracking-widest mb-3">
              Procédure
            </p>
            <h2 className="font-serif text-4xl font-bold text-slate-900 mb-4">
              Trois étapes, zéro friction
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <StepCard
              num="01"
              title="Répondez au questionnaire"
              body="Un parcours guidé, sans jargon, avec des explications contextuelles à chaque question. Vos réponses sont sauvegardées automatiquement."
            />
            <StepCard
              num="02"
              title="Payez en ligne"
              body="Paiement sécurisé par carte bancaire, prix fixe affiché avant validation. Aucun abonnement."
            />
            <StepCard
              num="03"
              title="Téléchargez et conservez"
              body="PDF personnalisé immédiatement disponible, sans filigrane. Conservé à vie dans votre espace personnel."
            />
          </div>

          <div className="text-center mt-10">
            <Link
              href="/comment-ca-marche"
              className="text-sm font-medium text-emerald-700 hover:text-emerald-800"
            >
              Lire la méthode détaillée →
            </Link>
          </div>
        </div>
      </section>

      {/* POURQUOI QUICKLEGAL */}
      <section id="garanties" className="py-20 px-6 bg-slate-50/60 border-y border-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-emerald-700 text-sm font-semibold uppercase tracking-widest mb-3">
              Ce qui nous distingue
            </p>
            <h2 className="font-serif text-4xl font-bold text-slate-900 mb-4">
              Pourquoi QuickLegal
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Le sérieux d&apos;un cabinet, la fluidité d&apos;un service en ligne.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            <TrustCard
              title="Rédaction par des juristes"
              body="Chaque modèle est conçu par des juristes dédiés au droit français, puis revu par un avocat d'affaires inscrit au Barreau de Paris."
            />
            <TrustCard
              title="Mises à jour régulières"
              body="Les textes évoluent : nos modèles intègrent les changements législatifs, jurisprudentiels et réglementaires au fil des mises à jour."
            />
            <TrustCard
              title="Questionnaire intelligent"
              body="Les questions sont filtrées selon vos réponses : pas de champs inutiles, pas de jargon, des explications en ligne."
            />
            <TrustCard
              title="Sans abonnement"
              body="Vous payez uniquement le document généré. Pas de prélèvement récurrent, pas d'engagement."
            />
            <TrustCard
              title="Accessibles à vie"
              body="Vos documents sont conservés sans limite dans votre espace. Téléchargement illimité, modification possible à tout moment."
            />
            <TrustCard
              title="Conformes au RGPD"
              body="Toute collecte de données personnelles est encadrée, toute génération intègre les clauses RGPD attendues."
            />
          </div>

          <div className="text-center mt-12 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/notre-methode"
              className="text-sm font-medium text-emerald-700 hover:text-emerald-800"
            >
              Découvrir notre méthode →
            </Link>
            <span className="text-slate-300 hidden sm:inline">·</span>
            <Link
              href="/comment-nous-redigeons"
              className="text-sm font-medium text-emerald-700 hover:text-emerald-800"
            >
              Comment nous rédigeons nos modèles →
            </Link>
          </div>
        </div>
      </section>

      {/* COMPARATIFS */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-emerald-700 text-sm font-semibold uppercase tracking-widest mb-3">
              Situer notre offre
            </p>
            <h2 className="font-serif text-4xl font-bold text-slate-900 mb-4">
              Entre le modèle gratuit et le cabinet d&apos;avocats
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Le document juridique ne doit ni être une loterie, ni coûter un
              mois de CA pour un acte courant. Voici où nous nous situons.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr>
                  <th className="text-left py-4 px-3 font-serif font-semibold text-slate-900 border-b border-slate-200 w-1/4">
                    Critère
                  </th>
                  <th className="text-left py-4 px-3 font-serif text-sm text-slate-500 border-b border-slate-200 w-1/4">
                    Modèle gratuit
                  </th>
                  <th className="text-left py-4 px-3 font-serif text-sm font-semibold text-emerald-700 border-b border-slate-200 w-1/4 bg-emerald-50/40">
                    QuickLegal
                  </th>
                  <th className="text-left py-4 px-3 font-serif text-sm text-slate-500 border-b border-slate-200 w-1/4">
                    Cabinet d&apos;avocats
                  </th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                <ComparisonRow
                  label="Rédaction"
                  free="Anonyme, qualité variable"
                  quicklegal="Juristes + revue avocat Barreau de Paris"
                  cabinet="Avocat personnel"
                />
                <ComparisonRow
                  label="Personnalisation"
                  free="Copier-coller, rares options"
                  quicklegal="Questionnaire guidé, clauses paramétrables"
                  cabinet="Sur mesure"
                />
                <ComparisonRow
                  label="Délai"
                  free="Immédiat"
                  quicklegal="10 minutes"
                  cabinet="Plusieurs jours à plusieurs semaines"
                />
                <ComparisonRow
                  label="Prix"
                  free="Gratuit"
                  quicklegal={`${minEuros} à ${maxEuros} € TTC, à l'acte`}
                  cabinet="Plusieurs centaines à plusieurs milliers d'euros"
                />
                <ComparisonRow
                  label="Mises à jour juridiques"
                  free="Jamais garanties"
                  quicklegal="Intégrées, sans surcoût"
                  cabinet="Au cas par cas"
                />
                <ComparisonRow
                  label="Conseil personnalisé"
                  free="Aucun"
                  quicklegal="Aucun — plateforme d'édition"
                  cabinet="Oui"
                />
                <ComparisonRow
                  label="Accès au document"
                  free="Selon la plateforme"
                  quicklegal="Conservé à vie dans votre espace"
                  cabinet="À demander au cabinet"
                />
              </tbody>
            </table>
          </div>

          <p className="text-slate-500 text-xs mt-6 text-center max-w-2xl mx-auto">
            QuickLegal n&apos;est pas un cabinet d&apos;avocats et ne fournit pas
            de consultation personnalisée. Pour les situations complexes ou
            atypiques, faites relire le document par votre conseil habituel.
          </p>
        </div>
      </section>

      {/* CAS D'USAGE */}
      <section className="py-20 px-6 bg-slate-50/60 border-y border-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-emerald-700 text-sm font-semibold uppercase tracking-widest mb-3">
              Cas d&apos;usage
            </p>
            <h2 className="font-serif text-4xl font-bold text-slate-900 mb-4">
              Les moments où QuickLegal fait gagner du temps
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <UseCaseCard
              title="Créer une SAS entre associés"
              body="Rédigez vos statuts avec clauses d'agrément et de préemption, la déclaration de non-condamnation du Président et l'attestation de domiciliation — les trois pièces requises par le greffe — en une séance."
              primary={{ label: "Statuts de SAS", href: "/documents/statuts-sas" }}
              secondary={[
                { label: "Déclaration de non-condamnation", href: "/documents/declaration-non-condamnation" },
                { label: "Attestation de domiciliation", href: "/documents/attestation-domiciliation" },
              ]}
            />
            <UseCaseCard
              title="Monter une SCI familiale"
              body="Rédigez des statuts de société civile immobilière adaptés à votre projet patrimonial, avec le choix du régime fiscal et les clauses d'agrément entre membres de la famille."
              primary={{ label: "Statuts de SCI", href: "/documents/statuts-sci" }}
              secondary={[
                { label: "Attestation de domiciliation", href: "/documents/attestation-domiciliation" },
              ]}
            />
            <UseCaseCard
              title="Tenir l'assemblée annuelle"
              body="Convoquez vos associés, formalisez l'ordre du jour, faites émarger la feuille de présence, rédigez le PV d'AGO avec affectation du résultat et quitus au dirigeant."
              primary={{ label: "PV d'AGO", href: "/documents/pv-ag-ordinaire" }}
              secondary={[
                { label: "Convocation AG", href: "/documents/convocation-ag" },
                { label: "Ordre du jour", href: "/documents/ordre-du-jour-ag" },
                { label: "Feuille de présence", href: "/documents/feuille-presence-ag" },
              ]}
            />
            <UseCaseCard
              title="Lancer une boutique en ligne"
              body="Publiez des CGV e-commerce conformes au Code de la consommation, des mentions légales selon la LCEN et des CGU adaptées à votre site — la base légale d'une activité marchande en ligne."
              primary={{ label: "CGV E-commerce", href: "/documents/cgv-ecommerce" }}
              secondary={[
                { label: "Mentions légales", href: "/documents/mentions-legales" },
                { label: "CGU", href: "/documents/cgu" },
              ]}
            />
          </div>
        </div>
      </section>

      {/* GUIDES PREVIEW */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <p className="text-emerald-700 text-sm font-semibold uppercase tracking-widest mb-3">
                Avant de générer
              </p>
              <h2 className="font-serif text-4xl font-bold text-slate-900 mb-2">
                Comprendre, comparer, décider
              </h2>
              <p className="text-slate-600 text-sm max-w-2xl">
                Une poignée de guides courts pour trancher les questions les
                plus fréquentes avant de remplir un questionnaire.
              </p>
            </div>
            <Link
              href="/guides"
              className="text-sm font-medium text-emerald-700 hover:text-emerald-800 whitespace-nowrap"
            >
              Tous les guides →
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {HOME_GUIDE_SLUGS.map((slug) => {
              const guide = GUIDES.find((g) => g.slug === slug);
              if (!guide) return null;
              return (
                <Link
                  key={guide.slug}
                  href={`/guides/${guide.slug}`}
                  className="block p-5 rounded-2xl border border-slate-200 bg-white hover:border-emerald-300 hover:shadow-premium transition"
                >
                  <p className="text-xs text-emerald-700 font-semibold uppercase tracking-wider mb-2">
                    {guide.eyebrow}
                  </p>
                  <h3 className="font-serif text-lg font-semibold text-slate-900 mb-2 leading-snug">
                    {guide.title}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed mb-3">
                    {guide.summary}
                  </p>
                  <p className="text-emerald-700 text-xs font-medium">
                    Lire le guide →
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 bg-slate-50/40 border-y border-slate-100">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-emerald-700 text-sm font-semibold uppercase tracking-widest mb-3">
              Questions fréquentes
            </p>
            <h2 className="font-serif text-4xl font-bold text-slate-900 mb-4">
              Ce qu&apos;il faut savoir avant de commencer
            </h2>
          </div>

          <div className="space-y-3">
            {HOME_FAQS.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-xl border border-slate-200 bg-white p-5"
              >
                <summary className="flex justify-between items-start gap-4 cursor-pointer font-medium text-slate-900 text-sm list-none">
                  {faq.question}
                  <span
                    aria-hidden="true"
                    className="text-slate-400 text-lg leading-none transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/faq"
              className="text-sm font-medium text-emerald-700 hover:text-emerald-800"
            >
              Toutes les questions fréquentes →
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 px-6 bg-gradient-to-b from-sky-50/40 to-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-4xl sm:text-5xl font-bold mb-5 text-slate-900">
            Prêt à générer votre document ?
          </h2>
          <p className="text-slate-600 text-lg mb-10">
            Sauvegarde automatique, paiement sécurisé, téléchargement immédiat.
            Conservé à vie.
          </p>
          <Link
            href="/generation-document"
            className="inline-block px-10 py-4 rounded-xl bg-[#0f1e3d] hover:bg-[#0a1428] text-white font-semibold text-lg shadow-xl shadow-slate-900/15"
          >
            Voir le catalogue complet
          </Link>
        </div>
      </section>

      <SiteFooter />

      {/* WebSite + FAQPage JSON-LD */}
      <JsonLd
        id="ld-website"
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: SITE_NAME,
          url: SITE_URL,
          inLanguage: "fr-FR",
          description: SITE_DESCRIPTION,
        }}
      />

      <JsonLd
        id="ld-faq"
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: HOME_FAQS.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }}
      />
    </main>
  );
}

function StepCard({
  num,
  title,
  body,
}: {
  num: string;
  title: string;
  body: string;
}) {
  return (
    <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-premium">
      <div className="font-serif text-5xl font-bold text-emerald-200 mb-4">
        {num}
      </div>
      <h3 className="font-serif text-xl font-semibold mb-3 text-slate-900">
        {title}
      </h3>
      <p className="text-slate-600 text-sm leading-relaxed">{body}</p>
    </div>
  );
}

function TrustCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-premium">
      <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center mb-4">
        <svg
          className="w-5 h-5 text-emerald-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
          />
        </svg>
      </div>
      <h3 className="font-serif text-lg font-semibold text-slate-900 mb-2">
        {title}
      </h3>
      <p className="text-slate-600 text-sm leading-relaxed">{body}</p>
    </div>
  );
}

function ComparisonRow({
  label,
  free,
  quicklegal,
  cabinet,
}: {
  label: string;
  free: string;
  quicklegal: string;
  cabinet: string;
}) {
  return (
    <tr>
      <td className="py-3 px-3 font-medium text-slate-900 border-b border-slate-100 align-top">
        {label}
      </td>
      <td className="py-3 px-3 border-b border-slate-100 align-top text-slate-600">
        {free}
      </td>
      <td className="py-3 px-3 border-b border-slate-100 align-top bg-emerald-50/20 text-slate-900">
        {quicklegal}
      </td>
      <td className="py-3 px-3 border-b border-slate-100 align-top text-slate-600">
        {cabinet}
      </td>
    </tr>
  );
}

function UseCaseCard({
  title,
  body,
  primary,
  secondary,
}: {
  title: string;
  body: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string }[];
}) {
  return (
    <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-premium">
      <h3 className="font-serif text-xl font-semibold text-slate-900 mb-3">
        {title}
      </h3>
      <p className="text-slate-600 text-sm leading-relaxed mb-5">{body}</p>
      <Link
        href={primary.href}
        className="inline-block px-5 py-2.5 rounded-lg bg-[#0f1e3d] hover:bg-[#0a1428] text-white text-sm font-medium mb-4"
      >
        {primary.label} →
      </Link>
      {secondary.length > 0 && (
        <div className="pt-4 border-t border-slate-100">
          <p className="text-xs text-slate-500 mb-2">Également utile :</p>
          <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
            {secondary.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-emerald-700 hover:text-emerald-800"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
