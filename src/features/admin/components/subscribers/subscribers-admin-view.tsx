import Link from "next/link";
import { ChevronLeft, ChevronRight, Download, Mail, Search, UserCheck, UserX } from "lucide-react";
import { SubscriberActions } from "@/features/admin/components/subscribers/subscriber-actions";
import type { SubscriberListFilters, SubscriberListResult } from "@/features/admin/types/subscribers";

type SubscribersAdminViewProps = {
  filters: SubscriberListFilters;
  result: SubscriberListResult;
};

function buildSubscriberPageUrl(filters: SubscriberListFilters, page: number) {
  const sp = new URLSearchParams();
  if (filters.q) sp.set("q", filters.q);
  if (filters.status !== "all") sp.set("status", filters.status);
  if (page > 1) sp.set("page", String(page));
  const qs = sp.toString();
  return `/admin/subscribers${qs ? `?${qs}` : ""}`;
}

export function SubscribersAdminView({ filters, result }: SubscribersAdminViewProps) {
  const { q, status, page } = filters;
  const { subscribers, totalCount, activeCount, inactiveCount, filteredCount, totalPages, pageSize, databaseError } = result;

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-md border border-[#ffcd80] bg-gradient-to-br from-white via-[#fffcc9]/60 to-white p-6 shadow-none">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#ff8a00]">Audience</p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-neutral-900">Subscribers</h1>
            <p className="mt-1 text-sm text-neutral-500">Pantau email subscriber dari newsletter, CTA, atau form website.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/api/admin/subscribers/export" className="inline-flex items-center gap-2 rounded-md border border-neutral-200 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-700 transition-colors hover:border-[#ffcd80] hover:bg-[#fffcc9] hover:text-[#ff8a00]">
              <Download className="h-4 w-4" />
              Export CSV
            </Link>
            <div className="flex items-center gap-2 rounded-md bg-[#ff8a00] px-4 py-3 text-white">
              <Mail className="h-4 w-4" />
              <span className="text-sm font-semibold">{activeCount} aktif</span>
            </div>
          </div>
        </div>
      </div>

      {databaseError && <div className="rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">Database tidak bisa diakses.</div>}

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
        <form className="flex flex-col gap-3 border-b border-neutral-200 px-5 py-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <input name="q" defaultValue={q} placeholder="Cari email atau source..." className="w-full rounded-md border border-neutral-200 bg-white py-2 pl-9 pr-3 text-sm text-neutral-900 outline-none transition-colors focus:border-[#ff8a00] focus:ring-2 focus:ring-[#fffcc9]" />
          </div>
          <select name="status" defaultValue={status} className="w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 outline-none transition-colors focus:border-[#ff8a00] focus:ring-2 focus:ring-[#fffcc9] md:w-40">
            <option value="all">Semua</option>
            <option value="active">Aktif</option>
            <option value="inactive">Nonaktif</option>
          </select>
          <button type="submit" className="rounded-md bg-[#ff8a00] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#f4b738]">Filter</button>
        </form>

        {filteredCount > 0 && (
          <div className="border-b border-neutral-100 px-5 py-3">
            <p className="text-xs text-neutral-500">Menampilkan {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, filteredCount)} dari {filteredCount} subscriber</p>
          </div>
        )}

        {subscribers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-[#fffcc9]"><Mail className="h-5 w-5 text-[#ff8a00]" /></div>
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
                      <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-semibold ${subscriber.active ? "bg-emerald-50 text-emerald-700" : "bg-neutral-100 text-neutral-500"}`}>
                        {subscriber.active ? <UserCheck className="h-3.5 w-3.5" /> : <UserX className="h-3.5 w-3.5" />}
                        {subscriber.active ? "Aktif" : "Nonaktif"}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-neutral-500">{subscriber.createdAt.toLocaleDateString("id-ID")}</td>
                    <td className="px-5 py-3"><SubscriberActions id={subscriber.id} active={subscriber.active} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-neutral-200 px-5 py-4">
            <p className="text-xs text-neutral-500">Halaman {page} dari {totalPages}</p>
            <div className="flex items-center gap-2">
              {page > 1 ? <Link href={buildSubscriberPageUrl(filters, page - 1)} className="inline-flex items-center gap-1 rounded-md border border-neutral-200 px-3 py-2 text-xs font-semibold text-neutral-700 transition-colors hover:bg-neutral-50"><ChevronLeft className="h-3.5 w-3.5" /> Prev</Link> : <span className="inline-flex items-center gap-1 rounded-md border border-neutral-100 px-3 py-2 text-xs font-semibold text-neutral-300"><ChevronLeft className="h-3.5 w-3.5" /> Prev</span>}
              {page < totalPages ? <Link href={buildSubscriberPageUrl(filters, page + 1)} className="inline-flex items-center gap-1 rounded-md border border-neutral-200 px-3 py-2 text-xs font-semibold text-neutral-700 transition-colors hover:bg-neutral-50">Next <ChevronRight className="h-3.5 w-3.5" /></Link> : <span className="inline-flex items-center gap-1 rounded-md border border-neutral-100 px-3 py-2 text-xs font-semibold text-neutral-300">Next <ChevronRight className="h-3.5 w-3.5" /></span>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
