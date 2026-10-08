import { timingSafeEqual } from "node:crypto";
import { after } from "next/server";
import { safeRevalidateBlogPaths } from "@/features/blog/lib/revalidate-blog";
import { publishDueScheduledPosts } from "@/features/admin/services/blog-post-mutation-service";
import { runArticleAgent } from "@/features/ai/services/article-agent-service";
import { failStaleRuns } from "@/features/ai/services/run-service";
import { claimDueSchedules } from "@/features/ai/services/schedule-service";

export const dynamic = "force-dynamic";
export const maxDuration = 1800;

function authorized(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || secret.length < 16) return false;
  const header = req.headers.get("authorization") ?? "";
  const expected = Buffer.from(`Bearer ${secret}`);
  const received = Buffer.from(header);
  return received.length === expected.length && timingSafeEqual(received, expected);
}

/**
 * Called every ~5 minutes by the cron sidecar / host crontab:
 * 1) publishes scheduled posts that are due, 2) claims due AI schedules and runs them after the response.
 */
async function handle(req: Request) {
  if (!authorized(req)) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const now = new Date();
  const publishedSlugs = await publishDueScheduledPosts(now);
  if (publishedSlugs.length) {
    safeRevalidateBlogPaths(null, ...publishedSlugs);
  }

  await failStaleRuns();
  const claimed = await claimDueSchedules(now);

  if (claimed.length) {
    after(async () => {
      // Sequential on purpose: keeps provider rate limits and DB pool (max 1) happy.
      for (const schedule of claimed) {
        await runArticleAgent({
          trigger: "schedule",
          scheduleId: schedule.id,
          topic: schedule.topic,
          category: schedule.category,
          instructions: schedule.instructions,
          mode: schedule.mode,
          publishDelayHours: schedule.publishDelayHours,
        });
      }
    });
  }

  return Response.json({
    ok: true,
    at: now.toISOString(),
    publishedPosts: publishedSlugs,
    startedSchedules: claimed.map((s) => ({ id: s.id, name: s.name, topic: s.topic })),
  });
}

export const GET = handle;
export const POST = handle;
