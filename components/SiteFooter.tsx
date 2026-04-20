import Link from "next/link";
import {
  CATEGORY_LABELS,
  listByCategory,
  type DocumentCategory,
} from "@/lib/document-registry";
import { CONTACT, isPlaceholder } from "@/lib/site-facts";

const CATEGORY_ORDER: DocumentCategory[] = [
  "statuts",
  "gouvernance",
  "commercial",
  "conformite",
];

const INFO_LINKS = [
  { href: "/comment-ca-marche", label: "Comment ça marche" },
  { href: "/notre-methode", label: "Notre méthode" },
  { href: "/comment-nous-redigeons", label: "Comment nous rédigeons" },
  { href: "/faq", label: "Questions fréquentes" },
];

const LEGAL_LINKS = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/cgv", label: "CGV du service" },
  { href: "/politique-de-confidentialite", label: "Politique de confidentialité" },
  { href: "/cookies", label: "Cookies" },
];

/**
 * Shared site-wide footer.
 *
 * Strengthens internal linking and surfaces every trust-building page —
 * product catalog by category, information pages, legal pages, contact.
 */
export function SiteFooter() {
  const grouped = listByCategory();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          {/* Brand + support */}
          <div className="col-span-2">
            <Link href="/" className="inline-block">
              <span className="font-serif text-2xl font-bold text-slate-900">
                Quick<span className="text-blue-500">Legal</span>
              </span>
            </Link>
            <p className="text-slate-500 text-sm mt-2 max-w-xs leading-relaxed">
              Documents juridiques français rédigés par des juristes, revus
              par un avocat d&apos;affaires inscrit au Barreau de Paris.
            </p>
            {!isPlaceholder(CONTACT.supportEmail) && (
              <p className="text-xs text-slate-500 mt-4">
                Support :{" "}
                <a
                  href={`mailto:${CONTACT.supportEmail}`}
                  className="text-slate-700 hover:text-slate-900"
                >
                  {CONTACT.supportEmail}
                </a>
              </p>
            )}
          </div>

          {/* Produits par catégorie */}
          {CATEGORY_ORDER.map((cat) => {
            const docs = grouped[cat];
            if (!docs || docs.length === 0) return null;
            return (
              <div key={cat}>
                <h2 className="font-serif text-sm font-semibold text-slate-900 mb-3">
                  {CATEGORY_LABELS[cat]}
                </h2>
                <ul className="space-y-2">
                  {docs.map((doc) => (
                    <li key={doc.type}>
                      <Link
                        href={`/documents/${doc.type}`}
                        className="text-slate-500 hover:text-slate-900 text-xs leading-snug"
                      >
                        {doc.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Second rang : info + legal */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-8 border-t border-slate-100">
          <div>
            <h2 className="font-serif text-sm font-semibold text-slate-900 mb-3">
              Catalogue
            </h2>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/generation-document"
                  className="text-slate-500 hover:text-slate-900 text-xs leading-snug"
                >
                  Tous les documents
                </Link>
              </li>
              {CATEGORY_ORDER.map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/generation-document#${cat}`}
                    className="text-slate-500 hover:text-slate-900 text-xs leading-snug"
                  >
                    {CATEGORY_LABELS[cat]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-sm font-semibold text-slate-900 mb-3">
              Informations
            </h2>
            <ul className="space-y-2">
              {INFO_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-500 hover:text-slate-900 text-xs leading-snug"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-sm font-semibold text-slate-900 mb-3">
              Légal
            </h2>
            <ul className="space-y-2">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-500 hover:text-slate-900 text-xs leading-snug"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-sm font-semibold text-slate-900 mb-3">
              Mon espace
            </h2>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/login"
                  className="text-slate-500 hover:text-slate-900 text-xs leading-snug"
                >
                  Connexion
                </Link>
              </li>
              <li>
                <Link
                  href="/signup"
                  className="text-slate-500 hover:text-slate-900 text-xs leading-snug"
                >
                  Créer un compte
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-slate-500 hover:text-slate-900 text-xs leading-snug"
                >
                  Mes documents
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom strip : copyright */}
        <div className="pt-10 mt-10 border-t border-slate-100 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} QuickLegal. Tous droits réservés.
          </p>
          <p className="text-xs text-slate-400">
            Modèles rédigés pour le droit français. Pas de consultation
            juridique personnalisée.
          </p>
        </div>
      </div>
    </footer>
  );
}
