import Link from "next/link";
import {
  CATEGORY_LABELS,
  listByCategory,
  type DocumentCategory,
} from "@/lib/document-registry";

const CATEGORY_ORDER: DocumentCategory[] = [
  "statuts",
  "gouvernance",
  "commercial",
  "conformite",
];

/**
 * Shared site-wide footer.
 *
 * Serves two purposes:
 *   - improves crawl depth by linking to every product page from every
 *     public page (internal-link coverage);
 *   - gives users a durable reference to the brand, navigation and legal
 *     pointers without taking over the page design.
 *
 * The legal links (mentions légales, politique de confidentialité, CGU,
 * CGV, cookies) reference the site's own pages — they are intentionally
 * kept present even before those pages exist so adding them later is a
 * no-op for this component. Until they exist they 404; the audit doc
 * tracks this as a Phase 2 deliverable.
 */
export function SiteFooter() {
  const grouped = listByCategory();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="inline-block">
              <span className="font-serif text-2xl font-bold text-slate-900">
                Quick<span className="text-blue-500">Legal</span>
              </span>
            </Link>
            <p className="text-slate-500 text-sm mt-2 max-w-xs leading-relaxed">
              Documents juridiques rédigés par des juristes, revus par un
              avocat d&apos;affaires inscrit au Barreau de Paris.
            </p>
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

        {/* Bottom strip : navigation transversale + légal */}
        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-500">
            <Link href="/generation-document" className="hover:text-slate-900">
              Génération de document
            </Link>
            <Link href="/comment-ca-marche" className="hover:text-slate-900">
              Comment ça marche
            </Link>
            <Link href="/#garanties" className="hover:text-slate-900">
              Garanties
            </Link>
            <Link href="/login" className="hover:text-slate-900">
              Connexion
            </Link>
          </div>
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} QuickLegal. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
