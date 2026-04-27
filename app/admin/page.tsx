import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth, signOut } from "@/lib/auth";
import {
  getAdminStats,
  listAllUsersWithStats,
  listAllDocumentsWithUser,
  type AdminStats,
  type AdminUserRow,
  type AdminDocumentRow,
} from "@/lib/db";

export const dynamic = "force-dynamic";

// Admin-only. Middleware redirects non-admins; we also block indexation as
// defence in depth.
export const metadata: Metadata = {
  title: "Administration",
  robots: { index: false, follow: false },
};

const TYPE_LABELS: Record<string, string> = {
  "statuts-sas": "Statuts SAS",
  "statuts-sci": "Statuts SCI",
  "cgv-ecommerce": "CGV",
  nda: "NDA",
};

const TYPE_COLORS: Record<string, string> = {
  "statuts-sas": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "statuts-sci": "bg-indigo-50 text-indigo-700 border-indigo-200",
  "cgv-ecommerce": "bg-emerald-50 text-emerald-700 border-emerald-200",
  nda: "bg-amber-50 text-amber-700 border-amber-200",
};

async function logoutAction() {
  "use server";
  await signOut({ redirectTo: "/" });
}

function formatEuros(cents: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format((cents || 0) / 100);
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function AdminPage() {
  const session = await auth();
  const sessionUser = session?.user as
    | { id?: string; isAdmin?: boolean }
    | undefined;

  // Defense in depth: even if the proxy/middleware is bypassed, the page
  // itself refuses to render for non-admin users.
  if (!sessionUser?.id) {
    redirect("/login?callbackUrl=/admin");
  }
  if (!sessionUser.isAdmin) {
    redirect("/dashboard");
  }

  let stats: AdminStats | null = null;
  let users: AdminUserRow[] = [];
  let documents: AdminDocumentRow[] = [];
  let dbError = "";

  try {
    [stats, users, documents] = await Promise.all([
      getAdminStats(),
      listAllUsersWithStats(),
      listAllDocumentsWithUser(),
    ]);
  } catch {
    // Never surface raw DB error messages (host names, schema info, SQL text)
    // to the UI — even to admins. Real error is in server logs only.
    dbError = "Base de données temporairement indisponible.";
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50/60 via-white to-white">
      <nav className="border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">
          <div className="flex items-center gap-4">
            <Link href="/" className="font-serif text-xl font-bold text-slate-900">
              Quick<span className="text-emerald-700">Legal</span>
            </Link>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
              Administration
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-600 hidden sm:inline">
              {session?.user?.email}
            </span>
            <form action={logoutAction}>
              <button type="submit" className="text-sm text-slate-600 hover:text-slate-900">
                Déconnexion
              </button>
            </form>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="font-serif text-4xl font-bold text-slate-900">
            Panneau d&apos;administration
          </h1>
          <p className="text-slate-600 mt-1">
            Gestion des utilisateurs, documents et paiements.
          </p>
        </div>

        {dbError && (
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-sm mb-6">
            <strong>Base de données non connectée.</strong> {dbError}
          </div>
        )}

        {stats && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            <StatCard
              label="Utilisateurs"
              value={stats.total_users.toString()}
              sub={`${stats.total_admins} admin(s)`}
            />
            <StatCard
              label="Documents totaux"
              value={stats.total_documents.toString()}
              sub={`${stats.documents_last_30d} sur 30 jours`}
            />
            <StatCard
              label="Documents payés"
              value={stats.paid_documents.toString()}
              sub={`${stats.total_documents > 0 ? Math.round((stats.paid_documents / stats.total_documents) * 100) : 0} % de conversion`}
            />
            <StatCard
              label="Revenu total"
              value={formatEuros(stats.total_revenue_cents)}
              sub="Cumul des paiements"
              accent
            />
          </div>
        )}

        {/* USERS TABLE */}
        <section className="mb-12">
          <div className="flex items-end justify-between mb-4">
            <h2 className="font-serif text-2xl font-bold text-slate-900">
              Utilisateurs ({users.length})
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow-premium border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <Th>Email</Th>
                    <Th>Nom</Th>
                    <Th>Inscription</Th>
                    <Th right>Documents</Th>
                    <Th right>Payés</Th>
                    <Th right>CA généré</Th>
                    <Th>Rôle</Th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {users.length === 0 && (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-slate-500">
                        Aucun utilisateur.
                      </td>
                    </tr>
                  )}
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50/50">
                      <Td>
                        <span className="font-medium text-slate-900">{u.email}</span>
                      </Td>
                      <Td>{u.name || "—"}</Td>
                      <Td>
                        <span className="text-slate-500">{formatDate(u.created_at)}</span>
                      </Td>
                      <Td right>{u.doc_count}</Td>
                      <Td right>
                        {u.paid_count > 0 ? (
                          <span className="text-emerald-700 font-medium">{u.paid_count}</span>
                        ) : (
                          <span className="text-slate-400">0</span>
                        )}
                      </Td>
                      <Td right>
                        {u.total_cents > 0 ? (
                          <span className="font-semibold text-emerald-700">
                            {formatEuros(u.total_cents)}
                          </span>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </Td>
                      <Td>
                        {u.is_admin ? (
                          <span className="px-2 py-0.5 rounded-md bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold">
                            Admin
                          </span>
                        ) : (
                          <span className="text-slate-400 text-xs">Client</span>
                        )}
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* DOCUMENTS TABLE */}
        <section>
          <div className="flex items-end justify-between mb-4">
            <h2 className="font-serif text-2xl font-bold text-slate-900">
              Documents générés ({documents.length})
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow-premium border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <Th>Date</Th>
                    <Th>Type</Th>
                    <Th>Titre</Th>
                    <Th>Utilisateur</Th>
                    <Th>Statut</Th>
                    <Th right>Montant</Th>
                    <Th>PDF</Th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {documents.length === 0 && (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-slate-500">
                        Aucun document généré.
                      </td>
                    </tr>
                  )}
                  {documents.map((d) => (
                    <tr key={d.id} className="hover:bg-slate-50/50">
                      <Td>
                        <span className="text-slate-500 text-xs">
                          {formatDateTime(d.created_at)}
                        </span>
                      </Td>
                      <Td>
                        <span
                          className={`px-2 py-0.5 rounded-md border text-xs font-medium ${TYPE_COLORS[d.type] || "bg-slate-50 text-slate-700 border-slate-200"}`}
                        >
                          {TYPE_LABELS[d.type] || d.type}
                        </span>
                      </Td>
                      <Td>
                        <span className="font-medium text-slate-900">{d.title}</span>
                      </Td>
                      <Td>
                        <div>
                          <div className="text-slate-900">{d.user_email}</div>
                          {d.user_name && (
                            <div className="text-slate-500 text-xs">{d.user_name}</div>
                          )}
                        </div>
                      </Td>
                      <Td>
                        {d.paid ? (
                          <span className="px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
                            Payé
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-600 text-xs font-semibold">
                            Brouillon
                          </span>
                        )}
                      </Td>
                      <Td right>
                        {d.price_cents ? (
                          <span className="font-semibold text-slate-900">
                            {formatEuros(d.price_cents)}
                          </span>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </Td>
                      <Td>
                        {d.pdf_url ? (
                          <a
                            href={`/api/documents/${d.id}/download`}
                            className="text-emerald-700 hover:text-emerald-800 font-medium"
                          >
                            Ouvrir
                          </a>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function StatCard({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-premium">
      <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
        {label}
      </div>
      <div
        className={`font-serif text-3xl font-bold ${accent ? "text-emerald-600" : "text-slate-900"}`}
      >
        {value}
      </div>
      {sub && <div className="text-xs text-slate-500 mt-1">{sub}</div>}
    </div>
  );
}

function Th({ children, right }: { children: React.ReactNode; right?: boolean }) {
  return (
    <th
      className={`px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wider ${right ? "text-right" : "text-left"}`}
    >
      {children}
    </th>
  );
}

function Td({ children, right }: { children: React.ReactNode; right?: boolean }) {
  return (
    <td className={`px-4 py-3 ${right ? "text-right" : "text-left"}`}>{children}</td>
  );
}
