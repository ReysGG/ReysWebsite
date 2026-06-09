import Link from "next/link";
import { OverviewBento } from "@/components/admin/overview-bento";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnalyticsChart } from "@/features/admin/components/analytics-chart";
import { TrendingPosts } from "@/features/admin/components/trending-posts";
import { ArrowRight, Briefcase, CheckCircle2, ExternalLink, FilePlus2, FileText, Globe2, LayoutList, LayoutTemplate, MessageCircle, Plus, TriangleAlert } from "lucide-react";
import type { AdminDashboardData, AdminDashboardHealthItem } from "@/features/admin/types/dashboard";

type AdminDashboardViewProps = {
  data: AdminDashboardData;
};

const MIN_PUBLISHED_POSTS = 3;
const MIN_PORTFOLIO_PROJECTS = 3;
const MIN_TESTIMONIALS = 3;
const MIN_FAQ_ITEMS = 4;

const headerActions = [
  { label: "Edit Landing Page", href: "/admin/landing-page", icon: LayoutTemplate, primary: true },
  { label: "Artikel Baru", href: "/admin/blog/create", icon: FilePlus2 },
  { label: "Tambah Portfolio", href: "/admin/portfolio", icon: Plus },
  { label: "Lihat Website", href: "/", icon: ExternalLink, external: true },
];

function buildHealthItems(data: AdminDashboardData): AdminDashboardHealthItem[] {
  const { metrics } = data;

  return [
    {
      label: "Minimal 3 artikel published",
      description: "Blog terlihat aktif dan cukup kuat untuk SEO awal.",
      href: "/admin/blog",
      ready: metrics.publishedPosts >= MIN_PUBLISHED_POSTS,
      value: `${metrics.publishedPosts}/${MIN_PUBLISHED_POSTS}`,
    },
    {
      label: "Minimal 3 portfolio",
      description: "Calon klien bisa melihat bukti kerja yang cukup.",
      href: "/admin/portfolio",
      ready: metrics.totalProjects >= MIN_PORTFOLIO_PROJECTS,
      value: `${metrics.totalProjects}/${MIN_PORTFOLIO_PROJECTS}`,
    },
    {
      label: "Minimal 3 testimoni",
      description: "Social proof cukup kuat sebelum campaign.",
      href: "/admin/testimonials",
      ready: metrics.totalTestimonials >= MIN_TESTIMONIALS,
      value: `${metrics.totalTestimonials}/${MIN_TESTIMONIALS}`,
    },
    {
      label: "FAQ minimal 4 item",
      description: "Kurangi pertanyaan berulang sebelum konsultasi.",
      href: "/admin/landing-page/faq",
      ready: metrics.totalFaqItems >= MIN_FAQ_ITEMS,
      value: `${metrics.totalFaqItems}/${MIN_FAQ_ITEMS}`,
    },
    {
      label: "SEO blog lengkap",
      description: "Artikel sebaiknya punya meta title dan meta description.",
      href: "/admin/blog",
      ready: metrics.postsWithoutSeo === 0,
      value: metrics.postsWithoutSeo === 0 ? "OK" : `${metrics.postsWithoutSeo} perlu dicek`,
    },
  ];
}

export function AdminDashboardView({ data }: AdminDashboardViewProps) {
  const { metrics } = data;
  const healthItems = buildHealthItems(data);
  const readyCount = healthItems.filter((item) => item.ready).length;
  const readinessPercent = Math.round((readyCount / healthItems.length) * 100);
  const statCards = [
    {
      title: "Artikel",
      value: metrics.totalPosts,
      description: `${metrics.publishedPosts} published · ${metrics.draftPosts} draft`,
      icon: FileText,
    },
    {
      title: "Portfolio",
      value: metrics.totalProjects,
      description: `${Math.max(metrics.totalProjects - metrics.projectsWithoutImage, 0)} dengan cover image`,
      icon: Briefcase,
    },
    {
      title: "Layanan",
      value: metrics.totalServices,
      description: "Layanan yang ditawarkan",
      icon: LayoutList,
    },
    {
      title: "Testimoni",
      value: metrics.totalTestimonials,
      description: `${Math.max(metrics.totalTestimonials - metrics.testimonialsWithoutAvatar, 0)} dengan avatar`,
      icon: MessageCircle,
    },
  ];

  return (
    <div className="space-y-6">
      {data.databaseError && <div className="rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">Database tidak bisa diakses. Dashboard ditampilkan dalam mode fallback.</div>}

      <div className="rounded-md border border-neutral-200 bg-white p-6 shadow-none">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#ff8a00]">Admin Overview</p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight leading-[1.15] text-neutral-900 md:text-3xl">Dashboard</h1>
            <p className="mt-1 text-sm text-neutral-500">Control center untuk konten, readiness launch, dan performa website.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {headerActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link key={action.href + action.label} href={action.href} target={action.external ? "_blank" : undefined} className={action.primary ? "inline-flex items-center gap-2 rounded-md bg-[#ff8a00] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#f4b738] active:bg-[#e07a00] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffcd80] disabled:opacity-50 disabled:pointer-events-none" : "inline-flex items-center gap-2 rounded-md border border-neutral-200 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50 active:bg-neutral-100 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffcd80] disabled:opacity-50 disabled:pointer-events-none"}>
                  <Icon className="h-4 w-4" />
                  {action.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <div className="rounded-md border border-neutral-200 bg-white p-6 shadow-none">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-semibold text-neutral-900">Quick Actions</h2>
            <p className="mt-1 text-sm text-neutral-500">Akses cepat ke task yang paling sering dikerjakan.</p>
          </div>
          <Link href="/admin/landing-page" className="inline-flex items-center gap-2 text-sm font-semibold text-[#ff8a00] hover:text-[#ff8a00]">Buka editor visual <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <OverviewBento />
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="rounded-md border border-neutral-200 bg-white p-6 shadow-none">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-base font-semibold text-neutral-900">Launch Readiness</h2>
              <p className="mt-1 text-sm text-neutral-500">Checklist konten penting sebelum website dipromosikan.</p>
            </div>
            <div className="rounded-md bg-[#fffcc9] px-3 py-2 text-sm font-bold text-[#ff8a00]">{readyCount}/{healthItems.length} siap</div>
          </div>
          <div className="mb-5 h-2 overflow-hidden rounded-md bg-neutral-100">
            <div className="h-full rounded-md bg-[#ff8a00]" style={{ width: `${readinessPercent}%` }} />
          </div>
          <div className="grid gap-3 lg:grid-cols-2">
            {readyCount === healthItems.length ? (
              <div className="lg:col-span-2 flex items-center gap-3 rounded-md border border-[#ffcd80] bg-[#fffcc9]/50 p-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#fffcc9] text-[#ff8a00]">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-900">Semua konten inti sudah lengkap</p>
                  <p className="mt-1 text-xs text-neutral-500">Website siap dipromosikan. Fokus ke konten baru dan pantau traffic di bawah.</p>
                </div>
              </div>
            ) : (
              healthItems.map((item) => (
                <Link key={item.label} href={item.href} className="group flex items-start gap-3 rounded-md border border-neutral-200 bg-neutral-50 p-4 transition-colors hover:border-[#ffcd80] hover:bg-[#fffcc9]/50">
                  <div className={item.ready ? "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#fffcc9] text-[#ff8a00]" : "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-amber-50 text-amber-600"}>
                    {item.ready ? <CheckCircle2 className="h-4 w-4" /> : <TriangleAlert className="h-4 w-4" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-neutral-900 group-hover:text-[#ff8a00]">{item.label}</p>
                      <span className="shrink-0 rounded-md bg-white px-2 py-1 text-sm font-bold text-[#ff8a00]">{item.value}</span>
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-neutral-500">{item.description}</p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        <div className="rounded-md border border-neutral-200 bg-white p-6 shadow-none">
          <div className="flex h-full flex-col justify-between gap-6">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#fffcc9] text-[#ff8a00]"><Globe2 className="h-5 w-5" /></div>
              <h2 className="mt-4 text-base font-semibold text-neutral-900">Site Status</h2>
              <p className="mt-1 text-sm text-neutral-500">Website readiness berdasarkan konten utama.</p>
            </div>
            <div>
              <p className="text-4xl font-bold tracking-tight leading-[1.1] text-neutral-900">{readinessPercent}%</p>
              <p className="mt-1 text-sm text-neutral-500">{readyCount === healthItems.length ? "Siap dipromosikan." : "Masih ada konten yang bisa dilengkapi."}</p>
            </div>
            <Link href="/" target="_blank" className="inline-flex items-center justify-center gap-2 rounded-md border border-neutral-200 px-4 py-2.5 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50 active:bg-neutral-100 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffcd80]">Preview website <ExternalLink className="h-4 w-4" /></Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="border-neutral-200 bg-white shadow-none">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-semibold text-neutral-500">{stat.title}</CardTitle>
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#fffcc9]"><Icon className="h-4 w-4 text-[#ff8a00]" /></div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold tracking-tight leading-[1.1] text-neutral-900">{stat.value}</div>
                <p className="mt-1 text-xs text-neutral-400">{stat.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2"><AnalyticsChart data={data.chartData} /></div>
        <div className="lg:col-span-1"><TrendingPosts posts={data.trendingPosts} /></div>
      </div>
    </div>
  );
}
