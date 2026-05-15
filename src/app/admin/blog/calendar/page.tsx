import Link from "next/link";
import Image from "next/image";
import db from "@/lib/db";
import {
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Clock3,
  FileText,
  Lightbulb,
  Plus,
  Search,
  Send,
  Sparkles,
  Target,
} from "lucide-react";

type CalendarPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  coverImage: string | null;
  category: string | null;
  published: boolean;
  publishedAt: Date | null;
  updatedAt: Date;
  createdAt: Date;
  metaTitle: string | null;
  metaDesc: string | null;
  views: number;
};

const dayFormatter = new Intl.DateTimeFormat("id-ID", { weekday: "short" });
const monthFormatter = new Intl.DateTimeFormat("id-ID", { month: "long", year: "numeric" });
const timeFormatter = new Intl.DateTimeFormat("id-ID", { hour: "2-digit", minute: "2-digit" });

function startOfWeek(date: Date) {
  const next = new Date(date);
  const day = next.getDay();
  next.setHours(0, 0, 0, 0);
  next.setDate(next.getDate() - day);
  return next;
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function getPostDate(post: CalendarPost) {
  return post.publishedAt ?? post.updatedAt ?? post.createdAt;
}

function getSeoIssues(post: CalendarPost) {
  const issues: string[] = [];
  if (!post.metaTitle) issues.push("meta title");
  if (!post.metaDesc) issues.push("meta desc");
  if (!post.coverImage) issues.push("cover");
  return issues;
}

function buildWeekHref(base: Date, direction: number) {
  const date = addDays(base, direction * 7);
  return `/admin/blog/calendar?week=${date.toISOString().slice(0, 10)}`;
}

export default async function EditorialCalendarPage({
  searchParams,
}: {
  searchParams?: Promise<{ week?: string; tab?: string }>;
}) {
  const params = (await searchParams) || {};
  const activeTab = params.tab === "drafts" || params.tab === "seo" ? params.tab : "goals";
  const selectedDate = params.week ? new Date(`${params.week}T00:00:00`) : new Date();
  const weekStart = startOfWeek(Number.isNaN(selectedDate.getTime()) ? new Date() : selectedDate);
  const weekDays = Array.from({ length: 7 }, (_, index) => addDays(weekStart, index));
  const weekEnd = addDays(weekStart, 7);
  const today = new Date();

  let posts: CalendarPost[] = [];
  let databaseError = false;

  try {
    posts = await db.post.findMany({
      where: {
        OR: [
          { publishedAt: { gte: weekStart, lt: weekEnd } },
          { published: false },
        ],
      },
      orderBy: [{ publishedAt: "asc" }, { updatedAt: "desc" }],
      take: 120,
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        coverImage: true,
        category: true,
        published: true,
        publishedAt: true,
        updatedAt: true,
        createdAt: true,
        metaTitle: true,
        metaDesc: true,
        views: true,
      },
    });
  } catch {
    databaseError = true;
  }

  const publishedThisWeek = posts.filter((post) => post.published && post.publishedAt && post.publishedAt >= weekStart && post.publishedAt < weekEnd);
  const drafts = posts.filter((post) => !post.published);
  const seoIssues = posts.filter((post) => getSeoIssues(post).length > 0);
  const goalReady = Math.min(100, Math.round((publishedThisWeek.length / 3) * 100));

  function buildTabHref(tab: "goals" | "drafts" | "seo") {
    const sp = new URLSearchParams();
    if (params.week) sp.set("week", params.week);
    if (tab !== "goals") sp.set("tab", tab);
    const qs = sp.toString();
    return `/admin/blog/calendar${qs ? `?${qs}` : ""}`;
  }

  return (
    <div className="space-y-6">
      <div className="rounded-md border border-neutral-200 bg-white p-6 shadow-none">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">Blog Planner</p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-neutral-900">Planner</h1>
            <p className="mt-1 text-sm text-neutral-500">Rencanakan kalender editorial dengan membuat, menjadwalkan, dan mengelola konten blog.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/admin/blog" className="inline-flex items-center gap-2 rounded-md border border-neutral-200 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-700 hover:bg-neutral-50">
              <Search className="h-4 w-4" /> Semua Artikel
            </Link>
            <Link href="/admin/blog/create" className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">
              <Plus className="h-4 w-4" /> Create post
            </Link>
          </div>
        </div>
      </div>

      {databaseError && <div className="rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">Database tidak bisa diakses.</div>}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <section className="overflow-hidden rounded-md border border-neutral-200 bg-white shadow-none">
          <div className="flex flex-col gap-4 border-b border-neutral-200 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex rounded-md border border-neutral-200 bg-neutral-50 p-1">
                <button className="rounded-md bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700">Week</button>
                <button className="rounded-md px-3 py-1.5 text-xs font-semibold text-neutral-500">Month</button>
              </div>
              <div className="inline-flex items-center gap-1 rounded-md border border-neutral-200 bg-white p-1">
                <Link href={buildWeekHref(weekStart, -1)} className="flex h-8 w-8 items-center justify-center rounded-md text-neutral-500 hover:bg-neutral-100"><ChevronLeft className="h-4 w-4" /></Link>
                <Link href="/admin/blog/calendar" className="rounded-md px-3 py-1.5 text-xs font-semibold text-neutral-700 hover:bg-neutral-100">Today</Link>
                <Link href={buildWeekHref(weekStart, 1)} className="flex h-8 w-8 items-center justify-center rounded-md text-neutral-500 hover:bg-neutral-100"><ChevronRight className="h-4 w-4" /></Link>
              </div>
            </div>
            <div className="text-sm font-bold text-neutral-900">{monthFormatter.format(weekStart)}</div>
            <div className="flex flex-wrap gap-2">
              <button className="rounded-md border border-neutral-200 bg-white px-3 py-2 text-xs font-semibold text-neutral-600">Content type: all</button>
              <button className="rounded-md border border-neutral-200 bg-white px-3 py-2 text-xs font-semibold text-neutral-600">Status: all</button>
            </div>
          </div>

          <div className="grid min-h-[720px] grid-cols-7 overflow-x-auto">
            {weekDays.map((day) => {
              const dayPosts = publishedThisWeek.filter((post) => post.publishedAt && sameDay(post.publishedAt, day));
              const isToday = sameDay(day, today);
              return (
                <div key={day.toISOString()} className="min-w-[165px] border-r border-neutral-100 last:border-r-0">
                  <div className="sticky top-0 z-10 border-b border-neutral-100 bg-white px-3 py-3">
                    <div className={isToday ? "rounded-md bg-indigo-600 px-2 py-1.5 text-center text-white" : "px-2 py-1.5 text-center text-neutral-500"}>
                      <p className="text-[11px] font-semibold uppercase">{dayFormatter.format(day)}</p>
                      <p className="text-lg font-bold leading-none">{day.getDate()}</p>
                    </div>
                  </div>

                  <div className={isToday ? "min-h-[660px] space-y-3 bg-indigo-50/35 p-3" : "min-h-[660px] space-y-3 p-3"}>
                    {dayPosts.length === 0 && (
                      <div className="rounded-md border border-dashed border-neutral-200 bg-neutral-50 px-3 py-6 text-center text-xs text-neutral-400">No posts</div>
                    )}
                    {dayPosts.map((post) => <CalendarPostCard key={post.id} post={post} />)}
                    {isToday && <SuggestionCard />}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <aside className="space-y-6">
          <div className="rounded-md border border-neutral-200 bg-white p-5 shadow-none">
            <div className="mb-4 inline-flex rounded-md bg-neutral-100 p-1">
              <Link href={buildTabHref("goals")} className={activeTab === "goals" ? "rounded-md bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700" : "rounded-md px-3 py-1.5 text-xs font-semibold text-neutral-500 hover:text-neutral-900"}>Goals</Link>
              <Link href={buildTabHref("drafts")} className={activeTab === "drafts" ? "rounded-md bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700" : "rounded-md px-3 py-1.5 text-xs font-semibold text-neutral-500 hover:text-neutral-900"}>Drafts</Link>
              <Link href={buildTabHref("seo")} className={activeTab === "seo" ? "rounded-md bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700" : "rounded-md px-3 py-1.5 text-xs font-semibold text-neutral-500 hover:text-neutral-900"}>SEO</Link>
            </div>

            {activeTab === "goals" ? (
              <>
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-indigo-50 text-indigo-600"><Target className="h-5 w-5" /></div>
                  <div>
                    <h2 className="text-sm font-semibold text-neutral-900">Weekly publishing goal</h2>
                    <p className="mt-1 text-xs leading-relaxed text-neutral-500">Target minimal 3 artikel published per minggu untuk menjaga blog terlihat aktif.</p>
                  </div>
                </div>
                <div className="mt-5">
                  <div className="mb-2 flex items-center justify-between text-xs font-semibold text-neutral-500"><span>{publishedThisWeek.length}/3 published</span><span>{goalReady}%</span></div>
                  <div className="h-2 overflow-hidden rounded-md bg-neutral-100"><div className="h-full rounded-md bg-indigo-600" style={{ width: `${goalReady}%` }} /></div>
                </div>
                <Link href="/admin/blog/create" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"><Plus className="h-4 w-4" /> Start new post</Link>
              </>
            ) : activeTab === "drafts" ? (
              <>
                <h2 className="flex items-center gap-2 text-sm font-semibold text-neutral-900"><FileText className="h-4 w-4 text-indigo-600" /> Draft Queue</h2>
                <div className="mt-4 space-y-3">
                  {drafts.slice(0, 8).map((post) => (
                    <Link key={post.id} href={`/admin/blog/${post.slug}/edit`} className="block rounded-md border border-neutral-200 bg-neutral-50 p-3 hover:border-indigo-200 hover:bg-indigo-50/50">
                      <p className="line-clamp-1 text-xs font-semibold text-neutral-900">{post.title}</p>
                      <p className="mt-1 text-[11px] text-neutral-500">Updated {timeFormatter.format(post.updatedAt)}</p>
                    </Link>
                  ))}
                  {drafts.length === 0 && <p className="rounded-md bg-neutral-50 p-3 text-xs text-neutral-400">Tidak ada draft tertunda.</p>}
                </div>
                <Link href="/admin/blog/drafts" className="mt-4 inline-flex w-full justify-center rounded-md border border-neutral-200 px-3 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-50">Lihat semua draft</Link>
              </>
            ) : (
              <>
                <h2 className="flex items-center gap-2 text-sm font-semibold text-neutral-900"><Lightbulb className="h-4 w-4 text-indigo-600" /> SEO Recommendations</h2>
                <div className="mt-4 space-y-3">
                  <Recommendation text={`${seoIssues.length} artikel punya SEO issue. Lengkapi meta title, meta description, dan cover image.`} href="/admin/blog/seo" />
                  {seoIssues.slice(0, 5).map((post) => (
                    <Link key={post.id} href={`/admin/blog/${post.slug}/edit`} className="block rounded-md border border-amber-200 bg-amber-50 p-3 hover:bg-amber-100">
                      <p className="line-clamp-1 text-xs font-semibold text-amber-900">{post.title}</p>
                      <p className="mt-1 text-[11px] text-amber-700">Missing: {getSeoIssues(post).join(", ")}</p>
                    </Link>
                  ))}
                  {seoIssues.length === 0 && <p className="rounded-md bg-emerald-50 p-3 text-xs font-semibold text-emerald-700">Semua artikel minggu ini SEO-ready.</p>}
                </div>
              </>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

function CalendarPostCard({ post }: { post: CalendarPost }) {
  const issues = getSeoIssues(post);
  const date = getPostDate(post);
  return (
    <Link href={`/admin/blog/${post.slug}/edit`} className={issues.length ? "block rounded-md border border-amber-200 bg-amber-50 p-2.5 hover:bg-amber-100" : "block rounded-md border border-indigo-100 bg-indigo-50 p-2.5 hover:bg-indigo-100"}>
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className={issues.length ? "inline-flex items-center gap-1 text-[11px] font-bold text-amber-700" : "inline-flex items-center gap-1 text-[11px] font-bold text-indigo-700"}>
          <Clock3 className="h-3 w-3" /> {timeFormatter.format(date)}
        </span>
        {issues.length ? <AlertTriangle className="h-3.5 w-3.5 text-amber-600" /> : <CheckCircle2 className="h-3.5 w-3.5 text-indigo-600" />}
      </div>
      <div className="relative mb-2 flex h-20 items-center justify-center overflow-hidden rounded-md bg-white">
        {post.coverImage ? <Image src={post.coverImage} alt="" fill unoptimized className="object-cover" /> : <FileText className="h-6 w-6 text-neutral-300" />}
      </div>
      <p className="line-clamp-2 text-xs font-semibold text-neutral-900">{post.title}</p>
      <div className="mt-2 flex items-center justify-between gap-2">
        <span className="rounded-md bg-white px-2 py-0.5 text-[10px] font-semibold text-neutral-600">{post.category ?? "Blog"}</span>
        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-neutral-500"><Send className="h-3 w-3" /> Published</span>
      </div>
    </Link>
  );
}

function SuggestionCard() {
  return (
    <div className="rounded-md border border-dashed border-indigo-200 bg-white p-3">
      <div className="flex items-center gap-1 text-[11px] font-bold text-indigo-700"><Sparkles className="h-3.5 w-3.5" /> 19:00</div>
      <div className="mt-3 flex h-16 items-center justify-center rounded-md bg-indigo-50 text-indigo-600"><Lightbulb className="h-7 w-7" /></div>
      <p className="mt-3 text-xs font-medium leading-relaxed text-neutral-600">Slot rekomendasi untuk publish artikel baru hari ini.</p>
      <Link href="/admin/blog/create" className="mt-3 inline-flex w-full items-center justify-center rounded-md border border-indigo-200 bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-700 hover:bg-indigo-100">Schedule</Link>
    </div>
  );
}

function Recommendation({ text, href }: { text: string; href: string }) {
  return (
    <Link href={href} className="block rounded-md border border-neutral-200 bg-neutral-50 p-3 text-xs leading-relaxed text-neutral-600 hover:border-indigo-200 hover:bg-indigo-50/50">
      {text}
    </Link>
  );
}
