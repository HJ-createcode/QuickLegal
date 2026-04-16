import Link from "next/link";

const steps = [
  {
    num: "1",
    title: "Repondez au questionnaire",
    desc: "Des questions simples et guidees sur votre projet. Pas besoin de jargon juridique.",
  },
  {
    num: "2",
    title: "Votre document est genere",
    desc: "Notre moteur injecte vos reponses dans un modele redige et valide par un avocat.",
  },
  {
    num: "3",
    title: "Telechargez votre PDF",
    desc: "Vous obtenez un document juridique complet, pret a signer et a deposer.",
  },
];

const documents = [
  {
    title: "Statuts de SAS",
    price: "79",
    originalPrice: "1 500",
    desc: "Statuts complets avec clauses d'agrement, repartition du capital, nomination du president.",
    href: "/documents/statuts-sas",
    available: true,
  },
  {
    title: "CGV E-commerce",
    price: "49",
    originalPrice: "800",
    desc: "Conditions generales de vente conformes au droit de la consommation et au RGPD.",
    href: "#",
    available: false,
  },
  {
    title: "Contrat Freelance",
    price: "39",
    originalPrice: "600",
    desc: "Contrat de prestation de services adapte a votre activite d'independant.",
    href: "#",
    available: false,
  },
  {
    title: "NDA",
    price: "29",
    originalPrice: "500",
    desc: "Accord de confidentialite bilateral ou unilateral, adapte a votre contexte.",
    href: "#",
    available: false,
  },
];

const guarantees = [
  {
    title: "Redige par un avocat",
    desc: "Chaque modele est redige et valide par un avocat inscrit au Barreau.",
  },
  {
    title: "Pret en 10 minutes",
    desc: "Repondez au questionnaire, payez, telechargez. C'est aussi simple que ca.",
  },
  {
    title: "10x moins cher",
    desc: "La meme qualite juridique qu'un cabinet, a une fraction du prix.",
  },
];

export default function HomePage() {
  return (
    <main>
      {/* NAV */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 h-16">
          <Link href="/" className="text-xl font-bold tracking-tight">
            <span className="text-blue-400">Quick</span>Legal
          </Link>
          <div className="flex items-center gap-6 text-sm">
            <a href="#documents" className="text-slate-400 hover:text-white transition">
              Documents
            </a>
            <a href="#comment-ca-marche" className="text-slate-400 hover:text-white transition">
              Comment ca marche
            </a>
            <Link
              href="/documents/statuts-sas"
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition"
            >
              Commencer
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
            Redige et valide par un avocat
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            Vos documents juridiques
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              en 10 minutes
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10">
            Statuts de SAS, CGV, contrats, NDA... Repondez a un questionnaire simple,
            obtenez un document juridique complet pret a signer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/documents/statuts-sas"
              className="px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-lg transition shadow-lg shadow-blue-600/20"
            >
              Generer mes statuts de SAS — 79 EUR
            </Link>
          </div>
          <p className="text-slate-500 text-sm mt-4">
            Pas d&apos;abonnement. Vous payez uniquement le document genere.
          </p>
        </div>
      </section>

      {/* GUARANTEES */}
      <section className="py-16 px-6 border-y border-slate-800/50">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          {guarantees.map((g) => (
            <div key={g.title} className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-blue-500/10 text-blue-400 mb-4 text-2xl font-bold">
                {g.title === "Redige par un avocat" ? "\u2696" : g.title === "Pret en 10 minutes" ? "\u23F1" : "\u20AC"}
              </div>
              <h3 className="font-semibold text-lg mb-2">{g.title}</h3>
              <p className="text-slate-400 text-sm">{g.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DOCUMENTS / PRICING */}
      <section id="documents" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Nos documents</h2>
          <p className="text-slate-400 text-center mb-12 max-w-xl mx-auto">
            Chaque document est genere a partir d&apos;un modele redige par un avocat,
            personnalise avec vos reponses.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {documents.map((doc) => (
              <div
                key={doc.title}
                className={`rounded-2xl border p-6 flex flex-col ${
                  doc.available
                    ? "border-blue-500/30 bg-slate-900/50"
                    : "border-slate-800 bg-slate-900/30 opacity-60"
                }`}
              >
                <h3 className="font-bold text-lg mb-1">{doc.title}</h3>
                <p className="text-slate-400 text-sm mb-4 flex-1">{doc.desc}</p>
                <div className="mb-4">
                  <span className="text-3xl font-extrabold">{doc.price}</span>
                  <span className="text-slate-400 text-sm"> EUR</span>
                  <span className="text-slate-500 text-xs line-through ml-2">
                    {doc.originalPrice} EUR chez un avocat
                  </span>
                </div>
                {doc.available ? (
                  <Link
                    href={doc.href}
                    className="block text-center px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition text-sm"
                  >
                    Generer ce document
                  </Link>
                ) : (
                  <span className="block text-center px-4 py-2.5 rounded-lg bg-slate-800 text-slate-500 font-medium text-sm">
                    Bientot disponible
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="comment-ca-marche" className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Comment ca marche</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.num} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white font-bold text-lg mb-4">
                  {step.num}
                </div>
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-slate-400 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Pret a creer votre societe ?</h2>
          <p className="text-slate-400 mb-8">
            Generez vos statuts de SAS en 10 minutes. Rediges par un avocat, a 79 EUR au lieu de 1 500 EUR.
          </p>
          <Link
            href="/documents/statuts-sas"
            className="inline-block px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-lg transition shadow-lg shadow-blue-600/20"
          >
            Commencer maintenant
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800/50 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <span>
            <span className="text-blue-400 font-semibold">Quick</span>Legal — Documents juridiques en ligne
          </span>
          <span>2026 QuickLegal. Tous droits reserves.</span>
        </div>
      </footer>
    </main>
  );
}
