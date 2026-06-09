import Link from "next/link";
import { FileText, Plus, Send, Pencil, Eye, AlertTriangle, Sparkles } from "lucide-react";
import { BlogAdminFilterBar } from "./blog-admin-filter-bar";
import { BlogAdminTable } from "./blog-admin-table";
import {
  getBlogAdminDashboard,
  type BlogAdminSearchParams,
  type BlogAdminView,
} from "@/features/admin/services/blog-admin-service";

const viewCopy: Record<BlogAdminView, { eyebrow: string; title: string; description: string }> = {
  all: {
    eyebrow: "Publishing Workspace",
    title: "Artikel Published",
    description: "Default workspace hanya menampilkan artikel yang tampil publik. Draft tetap ada di tab Draft agar tidak mengganggu review konten.",
  },
  published: {
    eyebrow: "Published Content",
    title: "Artikel Published",
    description: "Pantau artikel yang sudah tampil di website dan siap dibaca publik.",
  },
  draft: {
    eyebrow: "Editorial Drafts",
    title: "Draft Artikel",
    description: "Lanjutkan artikel yang belum dipublikasikan atau masih butuh review.",
  },
  seo: {
    eyebrow: "SEO Health",
    title: "SEO Issues",
    description: "Artikel yang perlu dilengkapi meta title, meta description, atau cover image.",
  },
};

function missingSeo(post: { metaTitle?: string | null; metaDesc?: string | null; coverImage?: string | null }) {
  return !post.metaTitle || !post.metaDesc || !post.coverImage;
}

export async function BlogAdminPageShell({
  params,
  view = "all",
}: {
  params: BlogAdminSearchParams;
  view?: BlogAdminView;
}) {
  const { result, totals, status, databaseError } = await getBlogAdminDashboard(params, view);

  const copy = viewCopy[view];
  const posts = view === "seo" ? result.posts.filter(missingSeo) : result.posts;

  const stats = [
    { label: "Total Artikel", value: totals.all, icon: FileText, href: "/admin/blog" },
    { label: "Published", value: totals.published, icon: Send, href: "/admin/blog/published" },
    { label: "Draft", value: totals.draft, icon: Pencil, href: "/admin/blog/drafts" },
    { label: "SEO Issues", value: totals.seoIssues, icon: AlertTriangle, href: "/admin/blog/seo" },
  ];

  return (
    <div className="space-y-6">
      {databaseError && (
        <div className="rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">
          Database tidak bisa diakses. Data blog ditampilkan kosong.
        </div>
      )}

      <div className="rounded-md border border-neutral-200 bg-white p-6 shadow-none">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#ff8a00]">{copy.eyebrow}</p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-neutral-900">{copy.title}</h1>
            <p className="mt-1 text-sm text-neutral-500">{copy.description}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/admin/blog/create" className="inline-flex items-center gap-2 rounded-md bg-[#ff8a00] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#f4b738] active:bg-[#e07a00] active:scale-[0.98] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffcd80]">
              <Plus className="h-4 w-4" /> Tulis Artikel
            </Link>
            <Link href="/blog" target="_blank" className="inline-flex items-center gap-2 rounded-md border border-neutral-200 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 active:bg-neutral-100 active:scale-[0.98] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffcd80]">
              <Eye className="h-4 w-4" /> Lihat Blog
            </Link>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, href }) => (
          <Link key={label} href={href} className="rounded-md border border-neutral-200 bg-white p-5 shadow-none transition-colors hover:border-[#ffcd80] hover:bg-[#fffcc9]/40">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-neutral-500">{label}</p>
              <span className="rounded-md bg-[#fffcc9] p-2 text-[#ff8a00]"><Icon className="h-4 w-4" /></span>
            </div>
            <p className="mt-3 text-2xl tracking-tight leading-[1.1] font-bold text-neutral-900">{value}</p>
          </Link>
        ))}
      </div>

      <div className="rounded-md border border-neutral-200 bg-white p-4 shadow-none">
        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            <Link href="/admin/blog" className={`rounded-md px-3 py-2 text-xs font-semibold ${view === "all" ? "bg-[#ff8a00] text-white" : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"}`}>Workspace</Link>
            <Link href="/admin/blog/published" className={`rounded-md px-3 py-2 text-xs font-semibold ${view === "published" ? "bg-[#ff8a00] text-white" : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"}`}>Published</Link>
            <Link href="/admin/blog/drafts" className={`rounded-md px-3 py-2 text-xs font-semibold ${view === "draft" ? "bg-[#ff8a00] text-white" : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"}`}>Draft</Link>
            <Link href="/admin/blog/seo" className={`rounded-md px-3 py-2 text-xs font-semibold ${view === "seo" ? "bg-[#ff8a00] text-white" : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"}`}>SEO Issues</Link>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-neutral-500">
            <Sparkles className="h-4 w-4 text-[#ff8a00]" /> Total views: {totals.views.toLocaleString("id-ID")}
          </div>
        </div>
        <BlogAdminFilterBar search={params.q} status={status} category={params.category} lockedStatus={view === "published" || view === "draft"} />
      </div>

      <BlogAdminTable posts={posts} page={result.pagination.page} totalPages={view === "seo" ? 1 : result.pagination.totalPages} />
    </div>
  );
}
