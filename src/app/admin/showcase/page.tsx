import Link from "next/link";
import { Eye, FolderKanban, Layers3, Pencil, Plus, Send } from "lucide-react";
import { ShowcaseTable } from "@/features/admin/components/showcase/showcase-table";
import {
  emptyAdminShowcaseDashboard,
  getAdminShowcaseDashboard,
  type AdminShowcaseSearchParams,
} from "@/features/admin/services/showcase-service";

export const metadata = { title: "Showcase | Admin" };
export const dynamic = "force-dynamic";

export default async function AdminShowcaseListPage({
  searchParams,
}: {
  searchParams?: Promise<AdminShowcaseSearchParams>;
}) {
  const params = (await searchParams) || {};
  let databaseError = false;
  let data = emptyAdminShowcaseDashboard();

  try {
    data = await getAdminShowcaseDashboard(params);
  } catch {
    databaseError = true;
  }

  const stats = [
    { label: "Total Showcase", value: data.stats.total, icon: Layers3 },
    { label: "Published", value: data.stats.published, icon: Send },
    { label: "Draft", value: data.stats.draft, icon: Pencil },
    { label: "Kategori", value: data.stats.categories, icon: FolderKanban },
  ];

  return (
    <div className="space-y-6">
      {databaseError && (
        <div className="rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">
          Database tidak bisa diakses. Data showcase ditampilkan kosong.
        </div>
      )}

      <div className="rounded-md border border-neutral-200 bg-white p-6 shadow-none">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">Prototype Workspace</p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-neutral-900">Kelola Showcase</h1>
            <p className="mt-1 max-w-2xl text-sm text-neutral-500">
              Upload prototype HTML, atur metadata card, dan kontrol item yang tampil di halaman publik.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/admin/showcase/new"
              className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              <Plus className="h-4 w-4" />
              Showcase Baru
            </Link>
            <Link
              href="/showcase"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-md border border-neutral-200 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50"
            >
              <Eye className="h-4 w-4" />
              Lihat Publik
            </Link>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-md border border-neutral-200 bg-white p-5 shadow-none">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-neutral-500">{label}</p>
              <span className="rounded-md bg-indigo-50 p-2 text-indigo-600">
                <Icon className="h-4 w-4" />
              </span>
            </div>
            <p className="mt-3 text-2xl font-bold text-neutral-900">{value}</p>
          </div>
        ))}
      </div>

      <ShowcaseTable
        key={`${data.filters.q}:${data.filters.status}:${data.filters.category}:${data.filters.page}`}
        items={data.items}
        categories={data.categories}
        filters={data.filters}
        pagination={data.pagination}
      />
    </div>
  );
}
