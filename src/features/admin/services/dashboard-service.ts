import "server-only";

import db from "@/lib/db";
import { getDailyViewsChart } from "@/features/admin/lib/analytics";
import type { AdminDashboardData, AdminDashboardMetrics } from "@/features/admin/types/dashboard";

const TRENDING_POST_LIMIT = 5;
const DASHBOARD_CHART_DAYS = 7;

const EMPTY_METRICS: AdminDashboardMetrics = {
  totalPosts: 0,
  publishedPosts: 0,
  draftPosts: 0,
  postsWithoutSeo: 0,
  totalProjects: 0,
  projectsWithoutImage: 0,
  totalServices: 0,
  totalTestimonials: 0,
  testimonialsWithoutAvatar: 0,
  totalFaqItems: 0,
};

type LandingPageFaqConfig = {
  faq?: {
    items?: unknown[];
  };
};

function countFaqItems(value: unknown) {
  const landingValue = value as LandingPageFaqConfig | null;
  return Array.isArray(landingValue?.faq?.items) ? landingValue.faq.items.length : 0;
}

export async function getAdminDashboardData(): Promise<AdminDashboardData> {
  const chartData = await getDailyViewsChart(DASHBOARD_CHART_DAYS);

  try {
    const [
      totalPosts,
      publishedPosts,
      draftPosts,
      postsWithoutSeo,
      totalProjects,
      projectsWithoutImage,
      totalServices,
      totalTestimonials,
      testimonialsWithoutAvatar,
      trendingPosts,
      landingConfig,
    ] = await db.$transaction([
      db.post.count(),
      db.post.count({ where: { published: true } }),
      db.post.count({ where: { published: false } }),
      db.post.count({
        where: {
          OR: [
            { metaTitle: null },
            { metaTitle: "" },
            { metaDesc: null },
            { metaDesc: "" },
          ],
        },
      }),
      db.project.count(),
      db.project.count({ where: { OR: [{ imageUrl: "" }] } }),
      db.service.count(),
      db.testimonial.count(),
      db.testimonial.count({ where: { OR: [{ avatar: null }, { avatar: "" }] } }),
      db.post.findMany({
        orderBy: { views: "desc" },
        take: TRENDING_POST_LIMIT,
        select: { id: true, title: true, slug: true, views: true, createdAt: true, coverImage: true },
      }),
      db.siteConfig.findUnique({ where: { key: "landing-page" }, select: { value: true } }),
    ]);

    return {
      databaseError: false,
      chartData,
      trendingPosts,
      metrics: {
        totalPosts,
        publishedPosts,
        draftPosts,
        postsWithoutSeo,
        totalProjects,
        projectsWithoutImage,
        totalServices,
        totalTestimonials,
        testimonialsWithoutAvatar,
        totalFaqItems: countFaqItems(landingConfig?.value),
      },
    };
  } catch {
    return {
      databaseError: true,
      chartData,
      trendingPosts: [],
      metrics: EMPTY_METRICS,
    };
  }
}
