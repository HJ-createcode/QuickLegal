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

export default async function CommentCaMarchePage() {
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
            <Link href="/#documents" className="text-slate-600 hover:text-slate-900">
              Documents
            </Link>
            <Link href="/comment-ca-marche" className="text-slate-900 font-medium">
              Comment ça marche
            </Link>
            <Link href="/#garanties" className="text-slate-600 hover:text-slate-900">
              Garanties
            </Link>
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

      {/* HEADER */}
      <section className="pt-36 pb-16 px-6 bg-gradient-to-b from-sky-50 via-white to-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-blue-500 text-sm font-semibold uppercase tracking-widest mb-3">
            Procédure
          </p>
          <h1 className="font-serif text-5xl sm:text-6xl font-bold tracking-tight mb-6 leading-[1.05] text-slate-900">
            Comment ça marche
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Trois étapes, zéro friction. De la première question au PDF signé, en
            moins de dix minutes.
          </p>
        </div>
      </section>

      {/* STEPS */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div
              key={step.num}
              className="relative p-8 rounded-2xl bg-white border border-slate-200 shadow-premium"
            >
              <div className="font-serif text-5xl font-bold text-blue-200 mb-4">
                {step.num}
              </div>
              <h3 className="font-serif text-xl font-semibold mb-3 text-slate-900">
                {step.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOREVER ACCESS */}
      <section className="py-20 px-6 bg-gradient-to-b from-white via-sky-50/50 to-white">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-3xl bg-white border border-slate-200 shadow-premium p-10 sm:p-14">
            <div className="flex flex-col sm:flex-row items-start gap-8">
              <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center">
                <svg
                  className="w-7 h-7 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                  />
                </svg>
              </div>
              <div>
                <p className="text-blue-500 text-sm font-semibold uppercase tracking-widest mb-2">
                  Accès à vie
                </p>
                <h2 className="font-serif text-3xl font-bold text-slate-900 mb-4">
                  Vos documents restent accessibles pour toujours
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  Chaque document généré est conservé dans votre espace personnel,
                  sans limite de durée. Vous pouvez le retélécharger à tout moment,
                  retrouver vos réponses, et y revenir pour une mise à jour. Aucun
                  abonnement, aucune échéance : le document vous appartient.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-4xl sm:text-5xl font-bold mb-5 text-slate-900">
            Prêt à commencer ?
          </h2>
          <p className="text-slate-600 text-lg mb-10">
            Choisissez votre document et générez-le en quelques minutes.
          </p>
          <Link
            href="/#documents"
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
