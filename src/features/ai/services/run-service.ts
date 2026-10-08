import "server-only";

import type { AiRunStatus, Prisma } from "@prisma/client";
import db from "@/lib/db";

export type AiRunStep = {
  step: number;
  text?: string;
  tools: { name: string; input?: string; output?: string }[];
};

export type AiRunView = {
  id: string;
  trigger: string;
  topic: string | null;
  scheduleName: string | null;
  status: AiRunStatus;
  postId: string | null;
  postSlug: string | null;
  postTitle: string | null;
  providerName: string | null;
  model: string | null;
  summary: string | null;
  error: string | null;
  inputTokens: number;
  outputTokens: number;
  steps: AiRunStep[];
  createdAt: string;
  finishedAt: string | null;
};

export async function startRun(data: { trigger: string; topic?: string | null; scheduleId?: string | null }) {
  return db.aiRun.create({
    data: { trigger: data.trigger, topic: data.topic ?? null, scheduleId: data.scheduleId ?? null },
    select: { id: true },
  });
}

export async function finishRun(
  id: string,
  data: {
    status: Exclude<AiRunStatus, "RUNNING">;
    postId?: string | null;
    providerName?: string | null;
    model?: string | null;
    steps?: AiRunStep[];
    summary?: string | null;
    error?: string | null;
    inputTokens?: number;
    outputTokens?: number;
  },
) {
  await db.aiRun.update({
    where: { id },
    data: {
      status: data.status,
      postId: data.postId ?? null,
      providerName: data.providerName ?? null,
      model: data.model ?? null,
      steps: (data.steps ?? []) as unknown as Prisma.InputJsonValue,
      summary: data.summary?.slice(0, 2000) ?? null,
      error: data.error?.slice(0, 4000) ?? null,
      inputTokens: data.inputTokens ?? 0,
      outputTokens: data.outputTokens ?? 0,
      finishedAt: new Date(),
    },
    select: { id: true },
  });
}

/** Marks runs stuck in RUNNING (e.g. container restarted mid-run) as failed. */
export async function failStaleRuns(olderThanMinutes = 45) {
  await db.aiRun.updateMany({
    where: { status: "RUNNING", createdAt: { lt: new Date(Date.now() - olderThanMinutes * 60_000) } },
    data: { status: "FAILED", error: "Run terhenti (timeout atau server restart).", finishedAt: new Date() },
  });
}

export async function listRecentRuns(limit = 20): Promise<AiRunView[]> {
  const runs = await db.aiRun.findMany({
    orderBy: { createdAt: "desc" },
    take: limit,
    select: {
      id: true, trigger: true, topic: true, status: true, postId: true, providerName: true, model: true, summary: true,
      error: true, inputTokens: true, outputTokens: true, steps: true, createdAt: true, finishedAt: true,
      schedule: { select: { name: true } },
    },
  });
  const postIds = runs.map((r) => r.postId).filter((id): id is string => Boolean(id));
  const posts = postIds.length
    ? await db.post.findMany({ where: { id: { in: postIds } }, select: { id: true, slug: true, title: true } })
    : [];
  const postById = new Map(posts.map((p) => [p.id, p]));

  return runs.map((run) => ({
    id: run.id,
    trigger: run.trigger,
    topic: run.topic,
    scheduleName: run.schedule?.name ?? null,
    status: run.status,
    postId: run.postId,
    postSlug: run.postId ? postById.get(run.postId)?.slug ?? null : null,
    postTitle: run.postId ? postById.get(run.postId)?.title ?? null : null,
    providerName: run.providerName,
    model: run.model,
    summary: run.summary,
    error: run.error,
    inputTokens: run.inputTokens,
    outputTokens: run.outputTokens,
    steps: Array.isArray(run.steps) ? (run.steps as unknown as AiRunStep[]) : [],
    createdAt: run.createdAt.toISOString(),
    finishedAt: run.finishedAt?.toISOString() ?? null,
  }));
}

export async function getRunStats(sinceDays = 30) {
  const since = new Date(Date.now() - sinceDays * 86_400_000);
  const [grouped, tokens] = await db.$transaction([
    db.aiRun.groupBy({ by: ["status"], where: { createdAt: { gte: since } }, orderBy: { status: "asc" }, _count: { _all: true } }),
    db.aiRun.aggregate({ where: { createdAt: { gte: since } }, _sum: { inputTokens: true, outputTokens: true } }),
  ]);
  const count = (status: AiRunStatus) => {
    const row = grouped.find((g) => g.status === status);
    return typeof row?._count === "object" ? row._count._all ?? 0 : 0;
  };
  return {
    success: count("SUCCESS"),
    failed: count("FAILED"),
    running: count("RUNNING"),
    inputTokens: tokens._sum.inputTokens ?? 0,
    outputTokens: tokens._sum.outputTokens ?? 0,
  };
}
