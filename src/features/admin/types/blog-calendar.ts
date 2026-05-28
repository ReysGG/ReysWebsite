export type BlogCalendarTab = "goals" | "drafts" | "seo";

export type CalendarPost = {
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

export type BlogCalendarFilters = {
  activeTab: BlogCalendarTab;
  requestedWeek?: string;
  weekStart: Date;
  weekEnd: Date;
  weekDays: Date[];
};

export type BlogCalendarData = {
  posts: CalendarPost[];
  publishedThisWeek: CalendarPost[];
  drafts: CalendarPost[];
  seoIssues: CalendarPost[];
  databaseError: boolean;
};
