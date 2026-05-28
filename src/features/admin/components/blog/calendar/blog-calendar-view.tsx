import Link from "next/link";
import Image from "next/image";
import { AlertTriangle, ChevronLeft, ChevronRight, CheckCircle2, Clock3, FileText, Lightbulb, Plus, Search, Send, Sparkles, Target } from "lucide-react";
import {
  BLOG_CALENDAR_WEEKLY_GOAL,
  blogCalendarDayFormatter,
  blogCalendarMonthFormatter,
  blogCalendarTimeFormatter,
  buildBlogCalendarTabHref,
  buildBlogCalendarWeekHref,
  getPostDate,
  getSeoIssues,
  sameDay,
} from "@/features/admin/lib/blog-calendar";
import type { BlogCalendarData, BlogCalendarFilters, CalendarPost } from "@/features/admin/types/blog-calendar";

type BlogCalendarViewProps = {
  filters: BlogCalendarFilters;
  data: BlogCalendarData;
};

export function BlogCalendarView({ filters, data }: BlogCalendarViewProps) {
  const { activeTab, weekStart, weekDays } = filters;
  const { publishedThisWeek, drafts, seoIssues, databaseError } = data;
  const goalReady = Math.min(100, Math.round((publishedThisWeek.length / BLOG_CALENDAR_WEEKLY_GOAL) * 100));
  const today = new Date();

  return (
    <div className="space-y-6">
      <div className="rounded-md border border-neutral-200 bg-white p-6 shadow-none">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#ff8a00]">Blog Planner</p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-neutral-900">Planner</h1>
            <p className="mt-1 text-sm text-neutral-500">Rencanakan kalender editorial dengan membuat, menjadwalkan, dan mengelola konten blog.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/admin/blog" className="inline-flex items-center gap-2 rounded-md border border-neutral-200 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-700 hover:bg-neutral-50"><Search className="h-4 w-4" /> Semua Artikel</Link>
            <Link href="/admin/blog/create" className="inline-flex items-center gap-2 rounded-md bg-[#ff8a00] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#f4b738]"><Plus className="h-4 w-4" /> Create post</Link>
          </div>
        </div>
      </div>

      {databaseError && <div className="rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">Database tidak bisa diakses.</div>}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <section className="overflow-hidden rounded-md border border-neutral-200 bg-white shadow-none">
          <div className="flex flex-col gap-4 border-b border-neutral-200 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex rounded-md border border-neutral-200 bg-neutral-50 p-1">
                <button className="rounded-md bg-[#fffcc9] px-3 py-1.5 text-xs font-semibold text-[#ff8a00]">Week</button>
                <button className="rounded-md px-3 py-1.5 text-xs font-semibold text-neutral-500">Month</button>
              </div>
              <div className="inline-flex items-center gap-1 rounded-md border border-neutral-200 bg-white p-1">
                <Link href={buildBlogCalendarWeekHref(weekStart, -1)} className="flex h-8 w-8 items-center justify-center rounded-md text-neutral-500 hover:bg-neutral-100"><ChevronLeft className="h-4 w-4" /></Link>
                <Link href="/admin/blog/calendar" className="rounded-md px-3 py-1.5 text-xs font-semibold text-neutral-700 hover:bg-neutral-100">Today</Link>
                <Link href={buildBlogCalendarWeekHref(weekStart, 1)} className="flex h-8 w-8 items-center justify-center rounded-md text-neutral-500 hover:bg-neutral-100"><ChevronRight className="h-4 w-4" /></Link>
              </div>
            </div>
            <div className="text-sm font-bold text-neutral-900">{blogCalendarMonthFormatter.format(weekStart)}</div>
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
                    <div className={isToday ? "rounded-md bg-[#ff8a00] px-2 py-1.5 text-center text-white" : "px-2 py-1.5 text-center text-neutral-500"}>
                      <p className="text-[11px] font-semibold uppercase">{blogCalendarDayFormatter.format(day)}</p>
                      <p className="text-lg font-bold leading-none">{day.getDate()}</p>
                    </div>
                  </div>
                  <div className={isToday ? "min-h-[660px] space-y-3 bg-[#fffcc9]/35 p-3" : "min-h-[660px] space-y-3 p-3"}>
                    {dayPosts.length === 0 && <div className="rounded-md border border-dashed border-neutral-200 bg-neutral-50 px-3 py-6 text-center text-xs text-neutral-400">No posts</div>}
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
              <Link href={buildBlogCalendarTabHref(filters, "goals")} className={activeTab === "goals" ? "rounded-md bg-[#fffcc9] px-3 py-1.5 text-xs font-semibold text-[#ff8a00]" : "rounded-md px-3 py-1.5 text-xs font-semibold text-neutral-500 hover:text-neutral-900"}>Goals</Link>
              <Link href={buildBlogCalendarTabHref(filters, "drafts")} className={activeTab === "drafts" ? "rounded-md bg-[#fffcc9] px-3 py-1.5 text-xs font-semibold text-[#ff8a00]" : "rounded-md px-3 py-1.5 text-xs font-semibold text-neutral-500 hover:text-neutral-900"}>Drafts</Link>
              <Link href={buildBlogCalendarTabHref(filters, "seo")} className={activeTab === "seo" ? "rounded-md bg-[#fffcc9] px-3 py-1.5 text-xs font-semibold text-[#ff8a00]" : "rounded-md px-3 py-1.5 text-xs font-semibold text-neutral-500 hover:text-neutral-900"}>SEO</Link>
            </div>

            {activeTab === "goals" ? (
              <>
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#fffcc9] text-[#ff8a00]"><Target className="h-5 w-5" /></div>
                  <div>
                    <h2 className="text-sm font-semibold text-neutral-900">Weekly publishing goal</h2>
                    <p className="mt-1 text-xs leading-relaxed text-neutral-500">Target minimal {BLOG_CALENDAR_WEEKLY_GOAL} artikel published per minggu untuk menjaga blog terlihat aktif.</p>
                  </div>
                </div>
                <div className="mt-5">
                  <div className="mb-2 flex items-center justify-between text-xs font-semibold text-neutral-500"><span>{publishedThisWeek.length}/{BLOG_CALENDAR_WEEKLY_GOAL} published</span><span>{goalReady}%</span></div>
                  <div className="h-2 overflow-hidden rounded-md bg-neutral-100"><div className="h-full rounded-md bg-[#ff8a00]" style={{ width: `${goalReady}%` }} /></div>
                </div>
                <Link href="/admin/blog/create" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#ff8a00] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#f4b738]"><Plus className="h-4 w-4" /> Start new post</Link>
              </>
            ) : activeTab === "drafts" ? (
              <DraftQueue posts={drafts} />
            ) : (
              <SeoRecommendations posts={seoIssues} />
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

function DraftQueue({ posts }: { posts: CalendarPost[] }) {
  return (
    <>
      <h2 className="flex items-center gap-2 text-sm font-semibold text-neutral-900"><FileText className="h-4 w-4 text-[#ff8a00]" /> Draft Queue</h2>
      <div className="mt-4 space-y-3">
        {posts.slice(0, 8).map((post) => (
          <Link key={post.id} href={`/admin/blog/${post.slug}/edit`} className="block rounded-md border border-neutral-200 bg-neutral-50 p-3 hover:border-[#ffcd80] hover:bg-[#fffcc9]/50">
            <p className="line-clamp-1 text-xs font-semibold text-neutral-900">{post.title}</p>
            <p className="mt-1 text-[11px] text-neutral-500">Updated {blogCalendarTimeFormatter.format(post.updatedAt)}</p>
          </Link>
        ))}
        {posts.length === 0 && <p className="rounded-md bg-neutral-50 p-3 text-xs text-neutral-400">Tidak ada draft tertunda.</p>}
      </div>
      <Link href="/admin/blog/drafts" className="mt-4 inline-flex w-full justify-center rounded-md border border-neutral-200 px-3 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-50">Lihat semua draft</Link>
    </>
  );
}

function SeoRecommendations({ posts }: { posts: CalendarPost[] }) {
  return (
    <>
      <h2 className="flex items-center gap-2 text-sm font-semibold text-neutral-900"><Lightbulb className="h-4 w-4 text-[#ff8a00]" /> SEO Recommendations</h2>
      <div className="mt-4 space-y-3">
        <Recommendation text={`${posts.length} artikel punya SEO issue. Lengkapi meta title, meta description, dan cover image.`} href="/admin/blog/seo" />
        {posts.slice(0, 5).map((post) => (
          <Link key={post.id} href={`/admin/blog/${post.slug}/edit`} className="block rounded-md border border-amber-200 bg-amber-50 p-3 hover:bg-amber-100">
            <p className="line-clamp-1 text-xs font-semibold text-amber-900">{post.title}</p>
            <p className="mt-1 text-[11px] text-amber-700">Missing: {getSeoIssues(post).join(", ")}</p>
          </Link>
        ))}
        {posts.length === 0 && <p className="rounded-md bg-emerald-50 p-3 text-xs font-semibold text-emerald-700">Semua artikel minggu ini SEO-ready.</p>}
      </div>
    </>
  );
}

function CalendarPostCard({ post }: { post: CalendarPost }) {
  const issues = getSeoIssues(post);
  const date = getPostDate(post);
  return (
    <Link href={`/admin/blog/${post.slug}/edit`} className={issues.length ? "block rounded-md border border-amber-200 bg-amber-50 p-2.5 hover:bg-amber-100" : "block rounded-md border border-[#ffcd80] bg-[#fffcc9] p-2.5 hover:bg-[#ffcd80]/40"}>
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className={issues.length ? "inline-flex items-center gap-1 text-[11px] font-bold text-amber-700" : "inline-flex items-center gap-1 text-[11px] font-bold text-[#ff8a00]"}><Clock3 className="h-3 w-3" /> {blogCalendarTimeFormatter.format(date)}</span>
        {issues.length ? <AlertTriangle className="h-3.5 w-3.5 text-amber-600" /> : <CheckCircle2 className="h-3.5 w-3.5 text-[#ff8a00]" />}
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
    <div className="rounded-md border border-dashed border-[#ffcd80] bg-white p-3">
      <div className="flex items-center gap-1 text-[11px] font-bold text-[#ff8a00]"><Sparkles className="h-3.5 w-3.5" /> 19:00</div>
      <div className="mt-3 flex h-16 items-center justify-center rounded-md bg-[#fffcc9] text-[#ff8a00]"><Lightbulb className="h-7 w-7" /></div>
      <p className="mt-3 text-xs font-medium leading-relaxed text-neutral-600">Slot rekomendasi untuk publish artikel baru hari ini.</p>
      <Link href="/admin/blog/create" className="mt-3 inline-flex w-full items-center justify-center rounded-md border border-[#ffcd80] bg-[#fffcc9] px-3 py-2 text-xs font-semibold text-[#ff8a00] hover:bg-[#ffcd80]/40">Schedule</Link>
    </div>
  );
}

function Recommendation({ text, href }: { text: string; href: string }) {
  return <Link href={href} className="block rounded-md border border-neutral-200 bg-neutral-50 p-3 text-xs leading-relaxed text-neutral-600 hover:border-[#ffcd80] hover:bg-[#fffcc9]/50">{text}</Link>;
}
