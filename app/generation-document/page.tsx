import Link from "next/link";
import { auth } from "@/lib/auth";

const documents = [
  {
    title: "Statuts de SAS",
    price: "79",
    originalPrice: "1 500",
    desc: "Statuts complets avec clauses d'agrément, répartition du capital, nomination du président.",
    href: "/documents/statuts-sas",
    features: ["~25 articles", "Clauses agrément & préemption", "Conforme RGPD"],
  },
  {
    title: "Statuts de SCI",
    price: "89",
    originalPrice: "1 800",
    desc: "Société civile immobilière avec gérance, parts sociales et régime fiscal au choix.",
    href: "/documents/statuts-sci",
    features: ["~20 articles", "IR ou IS au choix", "Conforme RGPD"],
  },
  {
    title: "CGV E-commerce",
    price: "49",
    originalPrice: "900",
    desc: "Conditions générales de vente conformes au Code de la consommation et au RGPD.",
    href: "/documents/cgv-ecommerce",
    features: ["Droit de rétractation", "Article RGPD complet", "Médiateur consommation"],
  },
  {
    title: "Accord de confidentialité (NDA)",
    price: "39",
    originalPrice: "500",
    desc: "Accord de confidentialité unilatéral ou réciproque, adapté à votre contexte.",
    href: "/documents/nda",
    features: ["Unilatéral ou réciproque", "Durée personnalisable", "Conforme RGPD"],
  },
];

export default async function GenerationDocumentPage() {
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
            <Link href="/generation-document" className="text-slate-900 font-medium">
              Génération de document
            </Link>
            <Link href="/comment-ca-marche" className="text-slate-600 hover:text-slate-900">
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
      <section className="pt-36 pb-12 px-6 bg-gradient-to-b from-sky-50 via-white to-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-blue-500 text-sm font-semibold uppercase tracking-widest mb-3">
            Notre catalogue
          </p>
          <h1 className="font-serif text-5xl sm:text-6xl font-bold tracking-tight mb-6 leading-[1.05] text-slate-900">
            Génération de document
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Choisissez le document à générer. Chaque modèle est rédigé par des
            juristes et revu par un avocat d'affaires inscrit au Barreau de Paris,
            puis personnalisé avec vos réponses.
          </p>
        </div>
      </section>

      {/* DOCUMENTS */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {documents.map((doc) => (
              <div
                key={doc.title}
                className="group relative rounded-2xl bg-white border border-slate-200 p-8 shadow-premium shadow-premium-hover transition-all hover:-translate-y-0.5"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-slate-900 mb-1">
                      {doc.title}
                    </h2>
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
