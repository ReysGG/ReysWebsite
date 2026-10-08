import "server-only";

import { generateText, isStepCount } from "ai";
import type { AiScheduleMode } from "@prisma/client";
import { DEFAULT_SITE_SETTINGS, getSiteSettings } from "@/lib/site-settings";
import { safeRevalidateBlogPaths } from "@/features/blog/lib/revalidate-blog";
import { schedulePostRecord, setPostPublished } from "@/features/admin/services/blog-post-mutation-service";
import { buildScheduledInstructions, buildScheduledPrompt } from "@/features/ai/lib/prompts";
import { auditSeo } from "@/features/ai/lib/seo-audit";
import { getPostForAi, getTopicInventory } from "@/features/ai/services/ai-blog-service";
import { getChatModel } from "@/features/ai/services/model-router";
import { finishRun, startRun, type AiRunStep } from "@/features/ai/services/run-service";
import { getWriterRules } from "@/features/ai/services/writer-rules-service";
import { buildArticleTools, createToolContext } from "@/features/ai/tools";

export type ArticleJob = {
  trigger: "schedule" | "manual";
  scheduleId?: string | null;
  topic: string | null;
  category: string | null;
  instructions: string | null;
  mode: AiScheduleMode;
  publishDelayHours: number;
};

const truncate = (value: unknown, max: number) => {
  const text = typeof value === "string" ? value : JSON.stringify(value);
  if (!text) return undefined;
  return text.length > max ? `${text.slice(0, max)}…` : text;
};

export function siteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "https://buildwithreys.com";
}

/**
 * Runs the unattended article agent: research → write draft → SEO fix loop → images,
 * then applies the schedule's publish mode deterministically (never left to the model).
 */
export async function runArticleAgent(job: ArticleJob) {
  const run = await startRun({ trigger: job.trigger, topic: job.topic, scheduleId: job.scheduleId });
  let tracker: Awaited<ReturnType<typeof getChatModel>>["tracker"] | null = null;

  try {
    const [rules, settings, inventory, chat] = await Promise.all([
      getWriterRules(),
      // Cached read; fall back to defaults if the cache store is unavailable in this background context.
      getSiteSettings().catch(() => DEFAULT_SITE_SETTINGS),
      getTopicInventory(),
      getChatModel(),
    ]);
    tracker = chat.tracker;
    const ctx = createToolContext("schedule", rules);

    const result = await generateText({
      model: chat.model,
      instructions: buildScheduledInstructions(rules, {
        siteName: settings.siteName || "Buildwithreys",
        siteUrl: siteUrl(),
        now: new Date(),
        existingTopics: inventory.map((p) => (p.focusKeyword ? `${p.title} [${p.focusKeyword}]` : p.title)),
      }),
      prompt: buildScheduledPrompt({ topic: job.topic, category: job.category || rules.defaultCategory || null, instructions: job.instructions }),
      tools: buildArticleTools(ctx),
      stopWhen: isStepCount(rules.maxAgentSteps),
      maxRetries: 1,
      timeout: { totalMs: 25 * 60_000, stepMs: 5 * 60_000 },
    });

    const steps: AiRunStep[] = result.steps.map((step, index) => ({
      step: index + 1,
      text: truncate(step.text, 400),
      tools: step.toolCalls.map((call) => {
        const output = step.toolResults.find((r) => r.toolCallId === call.toolCallId)?.output;
        return { name: call.toolName, input: truncate(call.input, 300), output: truncate(output, 500) };
      }),
    }));
    const usage = { inputTokens: result.totalUsage.inputTokens ?? 0, outputTokens: result.totalUsage.outputTokens ?? 0 };

    const postId = ctx.createdPostIds.at(-1) ?? null;
    if (!postId) {
      await finishRun(run.id, {
        status: "FAILED", steps, ...usage, providerName: tracker.providerName, model: tracker.modelId,
        error: `Agent selesai tanpa membuat draft. Jawaban terakhir: ${truncate(result.text, 500) ?? "-"}`,
      });
      return { runId: run.id, ok: false as const };
    }

    // Deterministic finalize based on schedule mode + SEO gate.
    const post = await getPostForAi(postId);
    const audit = post
      ? auditSeo(post, { ...rules, siteHost: new URL(siteUrl()).host })
      : null;
    const passed = Boolean(audit && audit.score >= rules.seoScoreThreshold);
    let outcome = "disimpan sebagai draft";

    if (post && passed && job.mode === "PUBLISH") {
      const published = await setPostPublished(postId, true);
      safeRevalidateBlogPaths(published.slug);
      outcome = "dipublish";
    } else if (post && passed && job.mode === "SCHEDULE") {
      const at = new Date(Date.now() + Math.max(1, job.publishDelayHours) * 3_600_000);
      const scheduled = await schedulePostRecord(postId, at);
      safeRevalidateBlogPaths(scheduled.slug);
      outcome = `dijadwalkan terbit ${at.toISOString()}`;
    } else if (post && !passed && job.mode !== "DRAFT") {
      outcome = `tetap draft karena skor SEO ${audit?.score} < ${rules.seoScoreThreshold}`;
    }

    await finishRun(run.id, {
      status: "SUCCESS",
      postId,
      steps,
      ...usage,
      providerName: tracker.providerName,
      model: tracker.modelId,
      summary: `"${post?.title ?? postId}" ${outcome}. Skor SEO: ${audit?.score ?? "-"}.${tracker.failures.length ? ` Fallback: ${Array.from(new Set(tracker.failures.map((f) => f.providerName))).join(", ")} gagal.` : ""}`,
    });
    return { runId: run.id, ok: true as const, postId };
  } catch (error) {
    await finishRun(run.id, {
      status: "FAILED",
      providerName: tracker?.providerName,
      model: tracker?.modelId,
      error: [
        error instanceof Error ? error.message : String(error),
        ...(tracker?.failures.map((f) => `${f.providerName}: ${f.error}`) ?? []),
      ].join("\n"),
    });
    return { runId: run.id, ok: false as const };
  }
}
