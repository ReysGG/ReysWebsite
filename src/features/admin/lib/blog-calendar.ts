import type { BlogCalendarFilters, BlogCalendarTab, CalendarPost } from "@/features/admin/types/blog-calendar";

export const BLOG_CALENDAR_DAYS_PER_WEEK = 7;
export const BLOG_CALENDAR_WEEKLY_GOAL = 3;
export const BLOG_CALENDAR_POST_LIMIT = 120;

export const blogCalendarDayFormatter = new Intl.DateTimeFormat("id-ID", { weekday: "short" });
export const blogCalendarMonthFormatter = new Intl.DateTimeFormat("id-ID", { month: "long", year: "numeric" });
export const blogCalendarTimeFormatter = new Intl.DateTimeFormat("id-ID", { hour: "2-digit", minute: "2-digit" });

export function normalizeBlogCalendarTab(value: string | undefined): BlogCalendarTab {
  if (value === "drafts" || value === "seo") return value;
  return "goals";
}

export function startOfWeek(date: Date) {
  const next = new Date(date);
  const day = next.getDay();
  next.setHours(0, 0, 0, 0);
  next.setDate(next.getDate() - day);
  return next;
}

export function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

export function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

export function getPostDate(post: CalendarPost) {
  return post.publishedAt ?? post.updatedAt ?? post.createdAt;
}

export function getSeoIssues(post: CalendarPost) {
  const issues: string[] = [];
  if (!post.metaTitle) issues.push("meta title");
  if (!post.metaDesc) issues.push("meta desc");
  if (!post.coverImage) issues.push("cover");
  return issues;
}

export function parseBlogCalendarFilters(params: { week?: string; tab?: string }): BlogCalendarFilters {
  const selectedDate = params.week ? new Date(`${params.week}T00:00:00`) : new Date();
  const weekStart = startOfWeek(Number.isNaN(selectedDate.getTime()) ? new Date() : selectedDate);
  const weekEnd = addDays(weekStart, BLOG_CALENDAR_DAYS_PER_WEEK);

  return {
    activeTab: normalizeBlogCalendarTab(params.tab),
    requestedWeek: params.week,
    weekStart,
    weekEnd,
    weekDays: Array.from({ length: BLOG_CALENDAR_DAYS_PER_WEEK }, (_, index) => addDays(weekStart, index)),
  };
}

export function buildBlogCalendarWeekHref(base: Date, direction: number) {
  const date = addDays(base, direction * BLOG_CALENDAR_DAYS_PER_WEEK);
  return `/admin/blog/calendar?week=${date.toISOString().slice(0, 10)}`;
}

export function buildBlogCalendarTabHref(filters: Pick<BlogCalendarFilters, "requestedWeek">, tab: BlogCalendarTab) {
  const sp = new URLSearchParams();
  if (filters.requestedWeek) sp.set("week", filters.requestedWeek);
  if (tab !== "goals") sp.set("tab", tab);
  const qs = sp.toString();
  return `/admin/blog/calendar${qs ? `?${qs}` : ""}`;
}
