import Link from "next/link";

export function BlogFilterBar({ q = "", tag = "", category = "", year = "", tags = [], categories = [], years = [] }: { q?: string; tag?: string; category?: string; year?: string; tags?: string[]; categories?: string[]; years?: number[] }) {
  return <form action="/blog" className="mb-8 rounded-3xl border border-indigo-100 bg-white/85 p-4 shadow-sm md:p-5">
    <div className="grid gap-3 md:grid-cols-[1fr_180px_180px_150px_auto]">
      <input name="q" defaultValue={q} placeholder="Cari artikel..." className="rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-400" />
      <select name="category" defaultValue={category} className="rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-400"><option value="">Semua kategori</option>{categories.map((item) => <option key={item} value={item}>{item}</option>)}</select>
      <select name="tag" defaultValue={tag} className="rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-400"><option value="">Semua tag</option>{tags.map((item) => <option key={item} value={item}>{item}</option>)}</select>
      <select name="year" defaultValue={year} className="rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-400"><option value="">Semua tahun</option>{years.map((item) => <option key={item} value={String(item)}>{item}</option>)}</select>
      <button className="rounded-2xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-indigo-700">Filter</button>
    </div>
    {(q || tag || category || year) && <Link href="/blog" className="mt-3 inline-flex text-sm font-semibold text-indigo-700 hover:underline">Reset filter</Link>}
  </form>;
}
