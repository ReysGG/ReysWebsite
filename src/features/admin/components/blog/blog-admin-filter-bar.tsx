import { Search } from "lucide-react";

export function BlogAdminFilterBar({
  search,
  status,
  category,
  lockedStatus = false,
}: {
  search?: string;
  status?: string;
  category?: string;
  lockedStatus?: boolean;
}) {
  return (
    <form className="grid gap-3 sm:grid-cols-[1fr_160px_180px_auto]">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
        <input
          name="q"
          defaultValue={search || ""}
          placeholder="Cari judul, slug, excerpt..."
          className="w-full rounded-md border border-neutral-200 bg-neutral-50 px-3 py-2 pl-9 text-sm outline-none focus:border-[#ff8a00] focus:bg-white focus:ring-2 focus:ring-[#fffcc9]"
        />
      </div>
      <select
        name="status"
        defaultValue={status || "all"}
        disabled={lockedStatus}
        className="rounded-md border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-700 outline-none focus:border-[#ff8a00] focus:bg-white focus:ring-2 focus:ring-[#fffcc9] disabled:cursor-not-allowed disabled:opacity-60"
      >
        <option value="all">Semua status</option>
        <option value="published">Published</option>
        <option value="draft">Draft</option>
      </select>
      <input
        name="category"
        defaultValue={category || ""}
        placeholder="Kategori / tag"
        className="rounded-md border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm outline-none focus:border-[#ff8a00] focus:bg-white focus:ring-2 focus:ring-[#fffcc9]"
      />
      <button className="rounded-md bg-[#ff8a00] px-4 py-2 text-sm font-semibold text-white hover:bg-[#f4b738]">
        Filter
      </button>
    </form>
  );
}
