import Link from "next/link";
import { auth, signOut } from "@/lib/auth";
import { listUserDocuments } from "@/lib/db";
import type { DocumentRow } from "@/lib/db";

export const dynamic = "force-dynamic";

const TYPE_LABELS: Record<string, string> = {
  "statuts-sas": "Statuts de SAS",
  "statuts-sci": "Statuts de SCI",
  "cgv-ecommerce": "CGV E-commerce",
  nda: "Accord de confidentialité",
};

const TYPE_COLORS: Record<string, string> = {
  "statuts-sas": "bg-blue-50 text-blue-700 border-blue-200",
  "statuts-sci": "bg-indigo-50 text-indigo-700 border-indigo-200",
  "cgv-ecommerce": "bg-emerald-50 text-emerald-700 border-emerald-200",
  nda: "bg-amber-50 text-amber-700 border-amber-200",
};

async function logoutAction() {
  "use server";
  await signOut({ redirectTo: "/" });
}

export default async function DashboardPage() {
  const session = await auth();
  const sessionUser = session?.user as
    | { id?: string; isAdmin?: boolean }
    | undefined;
  const userId = sessionUser?.id;
  const isAdmin = !!sessionUser?.isAdmin;

  let documents: DocumentRow[] = [];
  let dbError = "";

  if (userId) {
    try {
      documents = await listUserDocuments(userId);
    } catch {
      // Never surface raw DB error details (host, schema, SQL text) to the UI.
      dbError = "Service temporairement indisponible.";
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50/60 via-white to-white">
      <nav className="border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 h-16">
          <Link href="/" className="font-serif text-xl font-bold text-slate-900">
            Quick<span className="text-blue-500">Legal</span>
          </Link>
          <div className="flex items-center gap-4">
            {isAdmin && (
              <Link
                href="/admin"
                className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold hover:bg-amber-100"
              >
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
                Admin
              </Link>
            )}
            <span className="text-sm text-slate-600 hidden sm:inline">
              {session?.user?.email}
            </span>
            <form action={logoutAction}>
              <button
                type="submit"
                className="text-sm text-slate-600 hover:text-slate-900"
              >
                Déconnexion
              </button>
            </form>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="font-serif text-4xl font-bold text-slate-900">Mon espace</h1>
            <p className="text-slate-600 mt-1">
              Retrouvez tous vos documents générés et relancez un questionnaire si besoin.
            </p>
          </div>
          <Link
            href="/generation-document"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold text-sm shadow-md"
          >
            + Nouveau document
          </Link>
        </div>

        {dbError && (
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-sm mb-6">
            {dbError}
          </div>
        )}

        {!dbError && documents.length === 0 && (
          <div className="bg-white rounded-2xl shadow-premium border border-slate-200 p-12 text-center">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <h3 className="font-serif text-xl font-semibold text-slate-900 mb-2">
              Aucun document pour le moment
            </h3>
            <p className="text-slate-600 text-sm mb-6">
              Lancez votre premier questionnaire pour générer un document juridique.
            </p>
            <Link
              href="/generation-document"
              className="inline-block px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold text-sm shadow-md"
            >
              Voir nos documents
            </Link>
          </div>
        )}

        {documents.length > 0 && (
          <div className="grid gap-4">
            {documents.map((doc) => {
              const date = new Date(doc.created_at).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              });
              return (
                <div
                  key={doc.id}
                  className="bg-white rounded-2xl shadow-premium border border-slate-200 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`px-2 py-0.5 rounded-md border text-xs font-medium ${TYPE_COLORS[doc.type] || "bg-slate-50 text-slate-700 border-slate-200"}`}
                      >
                        {TYPE_LABELS[doc.type] || doc.type}
                      </span>
                      {doc.paid ? (
                        <span className="px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium">
                          Payé
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-600 text-xs font-medium">
                          Brouillon
                        </span>
                      )}
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-slate-900">
                      {doc.title}
                    </h3>
                    <p className="text-slate-500 text-sm">Créé le {date}</p>
                  </div>
                  <div className="flex gap-2">
                    {doc.pdf_url && (
                      <a
                        href={`/api/documents/${doc.id}/download`}
                        className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium"
                      >
                        Télécharger
                      </a>
                    )}
                    <Link
                      href={`/documents/${doc.type}`}
                      className="px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 text-sm font-medium"
                    >
                      Rouvrir
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
