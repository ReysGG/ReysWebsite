import db from "@/lib/db";
import type { ChartDataPoint } from "@/features/admin/components/analytics-chart";

const DAY_LABELS = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

/**
 * Fetch views aggregated per day for the last N days.
 * Uses Post.publishedAt as the date dimension and Post.views as the metric.
 * For each day, sums up views from posts published on that day.
 */
export async function getDailyViewsChart(days: number = 7): Promise<ChartDataPoint[]> {
  const now = new Date();
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() - (days - 1));

  try {
    const posts = await db.post.findMany({
      where: {
        published: true,
        publishedAt: {
          gte: start,
          lte: now,
        },
      },
      select: { publishedAt: true, views: true },
    });

    // Build per-day buckets
    const buckets: ChartDataPoint[] = [];
    for (let i = 0; i < days; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      buckets.push({
        day: DAY_LABELS[d.getDay()],
        views: 0,
      });
    }

    // Aggregate
    for (const post of posts) {
      if (!post.publishedAt) continue;
      const offset = Math.floor((post.publishedAt.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      if (offset >= 0 && offset < days) {
        buckets[offset].views += post.views;
      }
    }

    return buckets;
  } catch {
    return [];
  }
}
