import Link from "next/link";
import db from "@/lib/db";
import { Mail, UserCheck, UserX, Download, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { SubscriberActions } from "@/features/admin/components/subscribers/subscriber-actions";
import type { Prisma } from "@prisma/client";

const PAGE_SIZE = 20;

export default async function AdminSubscribersPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q.trim() : "";
  const status = typeof params.status === "string" ? params.status : "all";
  const page = Math.max(1, parseInt(typeof params.page === "string" ? params.page : "1", 10) || 1);

  let subscribers: Array<{ id: string; email: string; source: string | null; active: boolean; createdAt: Date }> = [];
  let totalCount = 0;
  let activeCount = 0;
  let inactiveCount = 0;
  let filteredCount = 0;
  let databaseError = false;

  try {
    const where: Prisma.SubscriberWhereInput = {};

    if (q) {
      where.OR = [
        { email: { contains: q, mode: "insensitive" } },
        { source: { contains: q, mode: "insensitive" } },
      ];
    }
    if (status === "active") where.active = true;
    else if (status === "inactive") where.active = false;

    [subscribers, totalCount, activeCount, inactiveCount, filteredCount] = await Promise.all([
      db.subscriber.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * PAGE_SIZE,
        take: PAGE_SIZE,
      }),
      db.subscriber.count(),
      db.subscriber.count({ where: { active: true } }),
      db.subscriber.count({ where: { active: false } }),
      db.subscriber.count({ where }),
    ]);
  } catch {
    databaseError = true;
  }

  const totalPages = Math.max(1, Math.ceil(filteredCount / PAGE_SIZE));

  function buildPageUrl(p: number) {
    const sp = new URLSearchParams();
    if (q) sp.set("q", q);
    if (status && status !== "all") sp.set("status", status);
    if (p > 1) sp.set("page", String(p));
    const qs = sp.toString();
    return `/admin/subscribers${qs ? `?${qs}` : ""}`;
  }

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-md border border-indigo-100 bg-gradient-to-br from-white via-indigo-50/60 to-white p-6 shadow-none">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">Audience</p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-neutral-900">Subscribers</h1>
            <p className="mt-1 text-sm text-neutral-500">Pantau email subscriber dari newsletter, CTA, atau form website.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/api/admin/subscribers/export"
              className="inline-flex items-center gap-2 rounded-md border border-neutral-200 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-700 transition-colors hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
            >
              <Download className="h-4 w-4" />
              Export CSV
            </Link>
            <div className="flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-3 text-white">
              <Mail className="h-4 w-4" />
              <span className="text-sm font-semibold">{activeCount} aktif</span>
            </div>
          </div>
        </div>
      </div>

      {databaseError && (
        <div className="rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">Database tidak bisa diakses.</div>
      )}

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-md border border-neutral-200 bg-white p-5 shadow-none">
          <p className="text-xs font-semibold text-neutral-500">Total Subscriber</p>
          <p className="mt-2 text-3xl font-bold text-neutral-900">{totalCount}</p>
        </div>
        <div className="rounded-md border border-neutral-200 bg-white p-5 shadow-none">
          <p className="text-xs font-semibold text-neutral-500">Aktif</p>
          <p className="mt-2 text-3xl font-bold text-emerald-600">{activeCount}</p>
        </div>
        <div className="rounded-md border border-neutral-200 bg-white p-5 shadow-none">
          <p className="text-xs font-semibold text-neutral-500">Nonaktif</p>
          <p className="mt-2 text-3xl font-bold text-neutral-900">{inactiveCount}</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-md border border-neutral-200 bg-white shadow-none">
        {/* Filter bar */}
        <form className="flex flex-col gap-3 border-b border-neutral-200 px-5 py-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <input
              name="q"
              defaultValue={q}
              placeholder="Cari email atau source..."
              className="w-full rounded-md border border-neutral-200 bg-white py-2 pl-9 pr-3 text-sm text-neutral-900 outline-none transition-colors focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
            />
          </div>
          <select
            name="status"
            defaultValue={status}
            className="w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 outline-none transition-colors focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 md:w-40"
          >
            <option value="all">Semua</option>
            <option value="active">Aktif</option>
            <option value="inactive">Nonaktif</option>
          </select>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
          >
            Filter
          </button>
        </form>

        {filteredCount > 0 && (
          <div className="border-b border-neutral-100 px-5 py-3">
            <p className="text-xs text-neutral-500">
              Menampilkan {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filteredCount)} dari {filteredCount} subscriber
            </p>
          </div>
        )}

        {subscribers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-indigo-50"><Mail className="h-5 w-5 text-indigo-600" /></div>
            <p className="text-sm font-semibold text-neutral-700">Tidak ada subscriber ditemukan</p>
            <p className="mt-1 text-xs text-neutral-400">Coba ubah filter atau kata kunci pencarian.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-neutral-50 text-xs font-semibold text-neutral-500">
                <tr>
                  <th className="px-5 py-3">Email</th>
                  <th className="px-5 py-3">Source</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Tanggal</th>
                  <th className="px-5 py-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {subscribers.map((subscriber) => (
                  <tr key={subscriber.id} className="hover:bg-neutral-50">
                    <td className="px-5 py-3 font-medium text-neutral-900">{subscriber.email}</td>
                    <td className="px-5 py-3 text-neutral-500">{subscriber.source ?? "-"}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-semibold ${
                        subscriber.active
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-neutral-100 text-neutral-500"
                      }`}>
                        {subscriber.active ? <UserCheck className="h-3.5 w-3.5" /> : <UserX className="h-3.5 w-3.5" />}
                        {subscriber.active ? "Aktif" : "Nonaktif"}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-neutral-500">{subscriber.createdAt.toLocaleDateString("id-ID")}</td>
                    <td className="px-5 py-3">
                      <SubscriberActions id={subscriber.id} active={subscriber.active} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-neutral-200 px-5 py-4">
            <p className="text-xs text-neutral-500">Halaman {page} dari {totalPages}</p>
            <div className="flex items-center gap-2">
              {page > 1 ? (
                <Link href={buildPageUrl(page - 1)} className="inline-flex items-center gap-1 rounded-md border border-neutral-200 px-3 py-2 text-xs font-semibold text-neutral-700 transition-colors hover:bg-neutral-50">
                  <ChevronLeft className="h-3.5 w-3.5" /> Prev
                </Link>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-md border border-neutral-100 px-3 py-2 text-xs font-semibold text-neutral-300">
                  <ChevronLeft className="h-3.5 w-3.5" /> Prev
                </span>
              )}
              {page < totalPages ? (
                <Link href={buildPageUrl(page + 1)} className="inline-flex items-center gap-1 rounded-md border border-neutral-200 px-3 py-2 text-xs font-semibold text-neutral-700 transition-colors hover:bg-neutral-50">
                  Next <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-md border border-neutral-100 px-3 py-2 text-xs font-semibold text-neutral-300">
                  Next <ChevronRight className="h-3.5 w-3.5" />
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
