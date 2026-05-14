import Link from "next/link";

export function BlogPagination({ page, totalPages, query }: { page: number; totalPages: number; query: Record<string, string> }) {
  if (totalPages <= 1) return null;
  const href = (nextPage: number) => { const params = new URLSearchParams(query); params.set("page", String(nextPage)); return `/blog?${params.toString()}`; };
  return <nav className="mt-10 flex items-center justify-center gap-3"><Link aria-disabled={page <= 1} className="rounded-full border border-indigo-100 bg-white px-4 py-2 text-sm font-bold text-neutral-700 aria-disabled:pointer-events-none aria-disabled:opacity-40" href={href(Math.max(1, page - 1))}>Sebelumnya</Link><span className="text-sm font-semibold text-neutral-500">{page} / {totalPages}</span><Link aria-disabled={page >= totalPages} className="rounded-full border border-indigo-100 bg-white px-4 py-2 text-sm font-bold text-neutral-700 aria-disabled:pointer-events-none aria-disabled:opacity-40" href={href(Math.min(totalPages, page + 1))}>Berikutnya</Link></nav>;
}
