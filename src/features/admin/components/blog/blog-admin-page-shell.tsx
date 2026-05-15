import Link from "next/link";
import { FileText, Plus, Send, Pencil, Eye, AlertTriangle, Sparkles } from "lucide-react";
import { BlogAdminFilterBar } from "./blog-admin-filter-bar";
import { BlogAdminTable } from "./blog-admin-table";
import { getAdminPosts } from "@/features/blog/data/posts";
import db from "@/lib/db";

type BlogAdminSearchParams = { q?: string; status?: string; category?: string; page?: string };
type BlogView = "all" | "published" | "draft" | "seo";

const viewCopy: Record<BlogView, { eyebrow: string; title: string; description: string }> = {
  all: {
    eyebrow: "Publishing Workspace",
    title: "Semua Artikel",
    description: "Kelola draft, publikasi, SEO, kategori, dan performa artikel blog.",
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

export async function BlogAdminPageShell({ params, view = "all" }: { params: BlogAdminSearchParams; view?: BlogView }) {
  let result: Awaited<ReturnType<typeof getAdminPosts>> = {
    posts: [],
    pagination: { page: 1, pageSize: 10, total: 0, totalPages: 1, hasNextPage: false, hasPreviousPage: false, skip: 0, take: 10 },
  };
  let totals = { all: 0, published: 0, draft: 0, seoIssues: 0, views: 0 };
  let databaseError = false;

  try {
    const status = view === "published" ? "published" : view === "draft" ? "draft" : params.status === "published" || params.status === "draft" ? params.status : "all";
    const [postsResult, all, published, draft, seoIssuesAgg, viewsAgg] = await Promise.all([
      getAdminPosts({ page: Math.max(1, Number(params.page || 1)), q: params.q, category: params.category, status }),
      db.post.count(),
      db.post.count({ where: { published: true } }),
      db.post.count({ where: { published: false } }),
      db.post.count({ where: { OR: [{ metaTitle: null }, { metaTitle: "" }, { metaDesc: null }, { metaDesc: "" }, { coverImage: null }, { coverImage: "" }] } }),
      db.post.aggregate({ _sum: { views: true } }),
    ]);
    result = postsResult;
    totals = { all, published, draft, seoIssues: seoIssuesAgg, views: viewsAgg._sum.views ?? 0 };
  } catch {
    databaseError = true;
  }

  const copy = viewCopy[view];
  const posts = view === "seo" ? result.posts.filter(missingSeo) : result.posts;
  const status = view === "published" ? "published" : view === "draft" ? "draft" : params.status || "all";

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
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">{copy.eyebrow}</p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-neutral-900">{copy.title}</h1>
            <p className="mt-1 text-sm text-neutral-500">{copy.description}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/admin/blog/create" className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">
              <Plus className="h-4 w-4" /> Tulis Artikel
            </Link>
            <Link href="/blog" target="_blank" className="inline-flex items-center gap-2 rounded-md border border-neutral-200 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-700 hover:bg-neutral-50">
              <Eye className="h-4 w-4" /> Lihat Blog
            </Link>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, href }) => (
          <Link key={label} href={href} className="rounded-md border border-neutral-200 bg-white p-5 shadow-none transition-colors hover:border-indigo-200 hover:bg-indigo-50/40">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-neutral-500">{label}</p>
              <span className="rounded-md bg-indigo-50 p-2 text-indigo-600"><Icon className="h-4 w-4" /></span>
            </div>
            <p className="mt-3 text-2xl font-bold text-neutral-900">{value}</p>
          </Link>
        ))}
      </div>

      <div className="rounded-md border border-neutral-200 bg-white p-4 shadow-none">
        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            <Link href="/admin/blog" className={`rounded-md px-3 py-2 text-xs font-semibold ${view === "all" ? "bg-indigo-600 text-white" : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"}`}>Semua</Link>
            <Link href="/admin/blog/published" className={`rounded-md px-3 py-2 text-xs font-semibold ${view === "published" ? "bg-indigo-600 text-white" : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"}`}>Published</Link>
            <Link href="/admin/blog/drafts" className={`rounded-md px-3 py-2 text-xs font-semibold ${view === "draft" ? "bg-indigo-600 text-white" : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"}`}>Draft</Link>
            <Link href="/admin/blog/seo" className={`rounded-md px-3 py-2 text-xs font-semibold ${view === "seo" ? "bg-indigo-600 text-white" : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"}`}>SEO Issues</Link>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-neutral-500">
            <Sparkles className="h-4 w-4 text-indigo-500" /> Total views: {totals.views.toLocaleString("id-ID")}
          </div>
        </div>
        <BlogAdminFilterBar search={params.q} status={status} category={params.category} lockedStatus={view === "published" || view === "draft"} />
      </div>

      <BlogAdminTable posts={posts} page={result.pagination.page} totalPages={view === "seo" ? 1 : result.pagination.totalPages} />
    </div>
  );
}
