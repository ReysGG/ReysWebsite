import "server-only";

import { CronExpressionParser } from "cron-parser";
import type { AiScheduleMode } from "@prisma/client";
import db from "@/lib/db";

export type AiScheduleView = {
  id: string;
  name: string;
  cron: string;
  timezone: string;
  topics: string[];
  category: string | null;
  instructions: string | null;
  mode: AiScheduleMode;
  publishDelayHours: number;
  enabled: boolean;
  nextRunAt: string | null;
  lastRunAt: string | null;
  upcoming: string[];
};

export type AiScheduleInput = {
  name: string;
  cron: string;
  timezone: string;
  topics: string[];
  category?: string | null;
  instructions?: string | null;
  mode: AiScheduleMode;
  publishDelayHours: number;
  enabled: boolean;
};

export type ClaimedSchedule = {
  id: string;
  name: string;
  topic: string | null;
  category: string | null;
  instructions: string | null;
  mode: AiScheduleMode;
  publishDelayHours: number;
};

export function nextRunsFor(cron: string, timezone: string, count = 1, from = new Date()) {
  const interval = CronExpressionParser.parse(cron, { tz: timezone, currentDate: from });
  return Array.from({ length: count }, () => interval.next().toDate());
}

function validateSchedule(input: AiScheduleInput) {
  if (!input.name.trim()) throw new Error("Nama jadwal wajib diisi.");
  try {
    const [first, second] = nextRunsFor(input.cron.trim(), input.timezone, 2);
    // Guard against runaway costs: at most one article per hour.
    if (second.getTime() - first.getTime() < 60 * 60_000) throw new Error("Interval minimal 1 jam.");
  } catch (error) {
    throw new Error(error instanceof Error && error.message === "Interval minimal 1 jam." ? error.message : "Format cron tidak valid.");
  }
}

function cleanTopics(topics: string[]) {
  return topics.map((t) => t.trim()).filter(Boolean).slice(0, 200);
}

export async function listSchedules(): Promise<AiScheduleView[]> {
  const rows = await db.aiSchedule.findMany({
    orderBy: { createdAt: "asc" },
    select: {
      id: true, name: true, cron: true, timezone: true, topics: true, category: true, instructions: true, mode: true,
      publishDelayHours: true, enabled: true, nextRunAt: true, lastRunAt: true,
    },
  });
  return rows.map((row) => {
    let upcoming: string[] = [];
    try {
      upcoming = row.enabled ? nextRunsFor(row.cron, row.timezone, 3).map((d) => d.toISOString()) : [];
    } catch {
      upcoming = [];
    }
    return { ...row, nextRunAt: row.nextRunAt?.toISOString() ?? null, lastRunAt: row.lastRunAt?.toISOString() ?? null, upcoming };
  });
}

export async function createSchedule(input: AiScheduleInput) {
  validateSchedule(input);
  return db.aiSchedule.create({
    data: {
      name: input.name.trim(),
      cron: input.cron.trim(),
      timezone: input.timezone,
      topics: cleanTopics(input.topics),
      category: input.category?.trim() || null,
      instructions: input.instructions?.trim() || null,
      mode: input.mode,
      publishDelayHours: Math.max(0, Math.min(720, input.publishDelayHours)),
      enabled: input.enabled,
      nextRunAt: input.enabled ? nextRunsFor(input.cron.trim(), input.timezone)[0] : null,
    },
    select: { id: true },
  });
}

export async function updateSchedule(id: string, input: AiScheduleInput) {
  validateSchedule(input);
  return db.aiSchedule.update({
    where: { id },
    data: {
      name: input.name.trim(),
      cron: input.cron.trim(),
      timezone: input.timezone,
      topics: cleanTopics(input.topics),
      category: input.category?.trim() || null,
      instructions: input.instructions?.trim() || null,
      mode: input.mode,
      publishDelayHours: Math.max(0, Math.min(720, input.publishDelayHours)),
      enabled: input.enabled,
      nextRunAt: input.enabled ? nextRunsFor(input.cron.trim(), input.timezone)[0] : null,
    },
    select: { id: true },
  });
}

export async function deleteSchedule(id: string) {
  await db.aiSchedule.delete({ where: { id } });
}

export async function setScheduleEnabled(id: string, enabled: boolean) {
  const schedule = await db.aiSchedule.findUnique({ where: { id }, select: { cron: true, timezone: true } });
  if (!schedule) throw new Error("Jadwal tidak ditemukan.");
  await db.aiSchedule.update({
    where: { id },
    data: { enabled, nextRunAt: enabled ? nextRunsFor(schedule.cron, schedule.timezone)[0] : null },
    select: { id: true },
  });
}

/**
 * Atomically claims due schedules. Each claim advances nextRunAt and pops the first topic
 * inside a conditional update, so overlapping cron ticks can never run the same slot twice.
 */
export async function claimDueSchedules(now = new Date(), limit = 3): Promise<ClaimedSchedule[]> {
  const due = await db.aiSchedule.findMany({
    where: { enabled: true, nextRunAt: { lte: now } },
    orderBy: { nextRunAt: "asc" },
    take: limit,
    select: {
      id: true, name: true, cron: true, timezone: true, topics: true, category: true, instructions: true, mode: true,
      publishDelayHours: true, nextRunAt: true,
    },
  });

  const claimed: ClaimedSchedule[] = [];
  for (const schedule of due) {
    let nextRunAt: Date | null;
    try {
      nextRunAt = nextRunsFor(schedule.cron, schedule.timezone, 1, now)[0];
    } catch {
      nextRunAt = null; // invalid cron: disable instead of looping
    }
    const [topic, ...rest] = schedule.topics;
    const result = await db.aiSchedule.updateMany({
      where: { id: schedule.id, enabled: true, nextRunAt: schedule.nextRunAt },
      data: { nextRunAt, lastRunAt: now, topics: rest, ...(nextRunAt ? {} : { enabled: false }) },
    });
    if (result.count === 1 && nextRunAt) {
      claimed.push({
        id: schedule.id,
        name: schedule.name,
        topic: topic ?? null,
        category: schedule.category,
        instructions: schedule.instructions,
        mode: schedule.mode,
        publishDelayHours: schedule.publishDelayHours,
      });
    }
  }
  return claimed;
}

/** For "Run now": same payload as a claim but without touching nextRunAt. Pops the next topic. */
export async function claimScheduleNow(id: string): Promise<ClaimedSchedule> {
  const schedule = await db.aiSchedule.findUnique({
    where: { id },
    select: { id: true, name: true, topics: true, category: true, instructions: true, mode: true, publishDelayHours: true },
  });
  if (!schedule) throw new Error("Jadwal tidak ditemukan.");
  const [topic, ...rest] = schedule.topics;
  await db.aiSchedule.update({ where: { id }, data: { topics: rest, lastRunAt: new Date() }, select: { id: true } });
  return {
    id: schedule.id,
    name: schedule.name,
    topic: topic ?? null,
    category: schedule.category,
    instructions: schedule.instructions,
    mode: schedule.mode,
    publishDelayHours: schedule.publishDelayHours,
  };
}
