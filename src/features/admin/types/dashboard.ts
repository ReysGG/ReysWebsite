export type AdminDashboardChartPoint = {
  day: string;
  views: number;
};

export type AdminDashboardTrendingPost = {
  id: string;
  title: string;
  slug: string;
  views: number;
  createdAt: Date;
  coverImage: string | null;
};

export type AdminDashboardMetrics = {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  postsWithoutSeo: number;
  totalProjects: number;
  projectsWithoutImage: number;
  totalServices: number;
  totalTestimonials: number;
  testimonialsWithoutAvatar: number;
  totalFaqItems: number;
};

export type AdminDashboardData = {
  databaseError: boolean;
  metrics: AdminDashboardMetrics;
  trendingPosts: AdminDashboardTrendingPost[];
  chartData: AdminDashboardChartPoint[];
};

export type AdminDashboardHealthItem = {
  label: string;
  description: string;
  href: string;
  ready: boolean;
  value: string;
};
