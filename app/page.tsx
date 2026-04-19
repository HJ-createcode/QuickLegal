import Link from "next/link";
import { auth } from "@/lib/auth";

const steps = [
  {
    num: "01",
    title: "Répondez au questionnaire",
    desc: "Un parcours guidé, étape par étape. Nos questions vous dispensent du jargon juridique.",
  },
  {
    num: "02",
    title: "Votre document est généré",
    desc: "Notre moteur intègre vos réponses dans un modèle rédigé par des juristes et revu par un avocat d'affaires inscrit au Barreau de Paris.",
  },
  {
    num: "03",
    title: "Téléchargez votre PDF",
    desc: "Vous obtenez un document juridique complet, conforme au RGPD, prêt à être signé et déposé.",
  },
];

const documents = [
  {
    title: "Statuts de SAS",
    price: "79",
    originalPrice: "1 500",
    desc: "Statuts complets avec clauses d'agrément, répartition du capital, nomination du président.",
    href: "/documents/statuts-sas",
    available: true,
    features: ["~25 articles", "Clauses agrément & préemption", "Conforme RGPD"],
  },
  {
    title: "Statuts de SCI",
    price: "89",
    originalPrice: "1 800",
    desc: "Société civile immobilière avec gérance, parts sociales et régime fiscal au choix.",
    href: "/documents/statuts-sci",
    available: true,
    features: ["~20 articles", "IR ou IS au choix", "Conforme RGPD"],
  },
  {
    title: "CGV E-commerce",
    price: "49",
    originalPrice: "900",
    desc: "Conditions générales de vente conformes au Code de la consommation et au RGPD.",
    href: "/documents/cgv-ecommerce",
    available: true,
    features: ["Droit de rétractation", "Article RGPD complet", "Médiateur consommation"],
  },
  {
    title: "Accord de confidentialité (NDA)",
    price: "39",
    originalPrice: "500",
    desc: "Accord de confidentialité unilatéral ou réciproque, adapté à votre contexte.",
    href: "/documents/nda",
    available: true,
    features: ["Unilatéral ou réciproque", "Durée personnalisable", "Conforme RGPD"],
  },
];

const guarantees = [
  {
    title: "Rédigés par des juristes",
    desc: "Chaque modèle est rédigé par des juristes et revu par un avocat d'affaires inscrit au Barreau de Paris.",
  },
  {
    title: "Prêt en moins de 10 minutes",
    desc: "Un questionnaire guidé, un paiement, un PDF. La démarche la plus courte du marché.",
  },
  {
    title: "Jusqu'à 20× moins cher",
    desc: "La qualité juridique d'un cabinet d'avocats d'affaires à une fraction du prix.",
  },
  {
    title: "Conformes RGPD",
    desc: "Tous nos documents intègrent les clauses de conformité au Règlement Général sur la Protection des Données.",
  },
];

export default async function HomePage() {
  const session = await auth().catch(() => null);
  const sessionUser = session?.user as { id?: string } | undefined;
  const isLoggedIn = !!sessionUser?.id;

  return (
    <main>
      {/* NAV */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-serif text-2xl font-bold tracking-tight text-slate-900">
              Quick<span className="text-blue-500">Legal</span>
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm">
            <a href="#documents" className="text-slate-600 hover:text-slate-900">
              Documents
            </a>
            <a href="#comment-ca-marche" className="text-slate-600 hover:text-slate-900">
              Comment ça marche
            </a>
            <a href="#garanties" className="text-slate-600 hover:text-slate-900">
              Garanties
            </a>
          </div>
          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <Link
                href="/dashboard"
                className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium shadow-sm"
              >
                Mon espace
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="hidden sm:inline-block px-4 py-2 text-sm text-slate-700 hover:text-slate-900 font-medium"
                >
                  Connexion
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium shadow-sm"
                >
                  Créer un compte
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-36 pb-24 px-6 bg-gradient-to-b from-sky-50 via-white to-white">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200/60 text-amber-700 text-xs font-semibold mb-8 shadow-sm">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
            Rédigés par des juristes, revus par un avocat au Barreau de Paris
          </div>

          <h1 className="font-serif text-5xl sm:text-7xl font-bold tracking-tight mb-8 leading-[1.05] text-slate-900">
            Vos documents juridiques,
            <br />
            <span className="italic text-blue-500">signés en 10 minutes.</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Statuts de SAS, SCI, CGV e-commerce, NDA. Des documents rédigés par des
            juristes, revus par un avocat d'affaires inscrit au Barreau de Paris,
            conformes au RGPD, à un prix dix fois inférieur à celui d'un cabinet.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="#documents"
              className="px-8 py-3.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold text-base shadow-lg shadow-blue-500/20"
            >
              Découvrir nos documents
            </Link>
            <Link
              href="#comment-ca-marche"
              className="px-8 py-3.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-white text-slate-900 font-medium text-base"
            >
              Comment ça marche
            </Link>
          </div>

          <p className="text-slate-500 text-sm mt-6">
            Sans abonnement. Vous ne payez que le document généré.
          </p>
        </div>
      </section>

      {/* TRUST BAR */}
      <section id="garanties" className="py-16 px-6 border-y border-slate-100 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {guarantees.map((g) => (
            <div key={g.title} className="text-center md:text-left">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-4 mx-auto md:mx-0">
                <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <h3 className="font-serif text-lg font-semibold mb-2 text-slate-900">{g.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{g.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DOCUMENTS */}
      <section id="documents" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-blue-500 text-sm font-semibold uppercase tracking-widest mb-3">
              Notre catalogue
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold mb-4 text-slate-900">
              Des documents prêts à signer
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Chaque document est généré à partir d'un modèle rédigé par des juristes
              et revu par un avocat d'affaires inscrit au Barreau de Paris, personnalisé
              avec vos réponses.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {documents.map((doc) => (
              <div
                key={doc.title}
                className="group relative rounded-2xl bg-white border border-slate-200 p-8 shadow-premium shadow-premium-hover transition-all hover:-translate-y-0.5"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-slate-900 mb-1">
                      {doc.title}
                    </h3>
                    <p className="text-slate-600 text-sm">{doc.desc}</p>
                  </div>
                </div>

                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-4xl font-bold text-slate-900 font-serif">
                    {doc.price}
                  </span>
                  <span className="text-slate-500 text-sm">€ TTC</span>
                  <span className="text-slate-400 text-xs line-through ml-2">
                    ≈ {doc.originalPrice} € en cabinet
                  </span>
                </div>

                <ul className="space-y-2 mb-8">
                  {doc.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                      <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href={doc.href}
                  className="block text-center w-full px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold text-sm shadow-md"
                >
                  Générer ce document
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="comment-ca-marche" className="py-24 px-6 bg-gradient-to-b from-white via-sky-50/50 to-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-blue-500 text-sm font-semibold uppercase tracking-widest mb-3">
              Procédure
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold mb-4 text-slate-900">
              Trois étapes, zéro friction
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.num} className="relative p-8 rounded-2xl bg-white border border-slate-200 shadow-premium">
                <div className="font-serif text-5xl font-bold text-blue-200 mb-4">
                  {step.num}
                </div>
                <h3 className="font-serif text-xl font-semibold mb-3 text-slate-900">{step.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LAWYER CREDIBILITY */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-3xl bg-gradient-to-br from-blue-500 to-blue-600 p-12 sm:p-16 text-center text-white shadow-2xl shadow-blue-500/20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 text-white/90 text-xs font-semibold mb-6">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
              Expertise reconnue
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4">
              Une exigence juridique de cabinet d'affaires
            </h2>
            <p className="text-lg text-blue-50 max-w-2xl mx-auto leading-relaxed">
              Tous les modèles proposés sur QuickLegal sont rédigés par des juristes
              spécialisés et revus par un avocat d'affaires inscrit au Barreau de Paris,
              expert en droit des sociétés et droit commercial. Chaque document est
              régulièrement mis à jour pour refléter les évolutions législatives et
              jurisprudentielles.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-4xl sm:text-5xl font-bold mb-5 text-slate-900">
            Prêt à créer votre document ?
          </h2>
          <p className="text-slate-600 text-lg mb-10">
            Commencez dès maintenant. Sauvegarde automatique, paiement sécurisé,
            téléchargement immédiat.
          </p>
          <Link
            href="#documents"
            className="inline-block px-10 py-4 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold text-lg shadow-xl shadow-blue-500/25"
          >
            Voir nos documents
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 py-12 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <span className="font-serif text-2xl font-bold text-slate-900">
                Quick<span className="text-blue-500">Legal</span>
              </span>
              <p className="text-slate-500 text-sm mt-1 max-w-md">
                Documents juridiques rédigés par des juristes, revus par un avocat
                d'affaires inscrit au Barreau de Paris.
              </p>
            </div>
            <div className="text-slate-400 text-xs">
              © 2026 QuickLegal. Tous droits réservés.
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
