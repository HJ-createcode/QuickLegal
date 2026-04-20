import Link from "next/link";
import { auth } from "@/lib/auth";

type Variant = "transparent" | "solid";

interface SiteNavProps {
  /**
   * Visual style:
   * - "transparent" (default): fixed, translucent white background. Meant for
   *   pages with a hero that scrolls beneath it.
   * - "solid": static (not fixed), solid white background with a bottom border.
   *   Meant for centered short pages (login, signup) where the nav must sit
   *   above the content without overlapping.
   */
  variant?: Variant;
  /**
   * When set, highlight the matching nav link. Accepts the href prefix:
   * "/generation-document", "/comment-ca-marche", "/login", "/signup".
   */
  current?: string;
}

/**
 * Site-wide top navigation. Resolves the session server-side to decide whether
 * to show « Mon espace » or the auth links. Intended to be rendered once per
 * page (importing as a Server Component keeps auth() cookies accessible).
 */
export async function SiteNav({ variant = "transparent", current }: SiteNavProps) {
  const session = await auth().catch(() => null);
  const sessionUser = session?.user as { id?: string } | undefined;
  const isLoggedIn = !!sessionUser?.id;

  const navClass =
    variant === "solid"
      ? "border-b border-slate-200/80 bg-white"
      : "fixed top-0 inset-x-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-md";

  const linkClass = (href: string) =>
    current === href
      ? "text-slate-900 font-medium"
      : "text-slate-600 hover:text-slate-900";

  return (
    <nav className={navClass}>
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 h-16">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-serif text-2xl font-bold tracking-tight text-slate-900">
            Quick<span className="text-blue-500">Legal</span>
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-7 text-sm">
          <Link href="/generation-document" className={linkClass("/generation-document")}>
            Catalogue
          </Link>
          <Link href="/guides" className={linkClass("/guides")}>
            Guides
          </Link>
          <Link href="/comment-ca-marche" className={linkClass("/comment-ca-marche")}>
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
                className={
                  current === "/login"
                    ? "hidden sm:inline-block px-4 py-2 text-sm text-slate-900 font-semibold"
                    : "hidden sm:inline-block px-4 py-2 text-sm text-slate-700 hover:text-slate-900 font-medium"
                }
              >
                Connexion
              </Link>
              <Link
                href="/signup"
                className={
                  current === "/signup"
                    ? "px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold shadow-sm"
                    : "px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium shadow-sm"
                }
              >
                Créer un compte
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
