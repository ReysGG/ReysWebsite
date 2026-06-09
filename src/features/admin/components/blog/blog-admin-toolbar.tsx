import Link from "next/link";
import { Plus } from "lucide-react";

export function BlogAdminToolbar() {
  return <div className="rounded-md border border-neutral-200 bg-white p-6"><div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-xs font-semibold uppercase tracking-widest text-[#ff8a00]">Content</p><h1 className="mt-2 text-2xl font-bold text-neutral-900">Blog Dashboard</h1><p className="mt-1 text-sm text-neutral-500">Kelola draft, publikasi, SEO, dan konten artikel.</p></div><Link href="/admin/blog/create" className="inline-flex items-center gap-2 rounded-md bg-[#ff8a00] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#f4b738] active:bg-[#e07a00] active:scale-[0.98] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffcd80]"><Plus className="h-4 w-4"/> Create Blog</Link></div></div>;
}
