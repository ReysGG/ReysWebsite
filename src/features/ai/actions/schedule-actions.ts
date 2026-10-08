"use server";

import { after } from "next/server";
import { revalidatePath } from "next/cache";
import type { AiScheduleMode } from "@prisma/client";
import { requireAdmin } from "@/features/admin/lib/auth";
import { runArticleAgent } from "@/features/ai/services/article-agent-service";
import {
  claimScheduleNow,
  createSchedule,
  deleteSchedule,
  setScheduleEnabled,
  updateSchedule,
} from "@/features/ai/services/schedule-service";
import type { AiActionState } from "@/features/ai/actions/provider-actions";

const MODES: AiScheduleMode[] = ["DRAFT", "PUBLISH", "SCHEDULE"];

const str = (formData: FormData, key: string) => {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
};

function parseMode(value: string): AiScheduleMode {
  return MODES.includes(value as AiScheduleMode) ? (value as AiScheduleMode) : "DRAFT";
}

function revalidateSchedules() {
  try {
    revalidatePath("/admin/ai");
    revalidatePath("/admin/ai/schedules");
  } catch {
    // Called from after(); stale admin pages are acceptable.
  }
}

export async function saveScheduleAction(_prev: AiActionState, formData: FormData): Promise<AiActionState> {
  try {
    await requireAdmin();
    const input = {
      name: str(formData, "name"),
      cron: str(formData, "cron"),
      timezone: str(formData, "timezone") || "Asia/Jakarta",
      topics: str(formData, "topics").split("\n"),
      category: str(formData, "category"),
      instructions: str(formData, "instructions"),
      mode: parseMode(str(formData, "mode")),
      publishDelayHours: Number.parseInt(str(formData, "publishDelayHours") || "0", 10) || 0,
      enabled: formData.get("enabled") === "on",
    };
    const id = str(formData, "id");
    if (id) await updateSchedule(id, input);
    else await createSchedule(input);
    revalidateSchedules();
    return { ok: true, message: id ? "Jadwal diperbarui." : "Jadwal dibuat." };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Gagal menyimpan jadwal." };
  }
}

export async function deleteScheduleAction(id: string): Promise<AiActionState> {
  try {
    await requireAdmin();
    await deleteSchedule(id);
    revalidateSchedules();
    return { ok: true };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Gagal menghapus jadwal." };
  }
}

export async function toggleScheduleAction(id: string, enabled: boolean): Promise<AiActionState> {
  try {
    await requireAdmin();
    await setScheduleEnabled(id, enabled);
    revalidateSchedules();
    return { ok: true };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Gagal mengubah jadwal." };
  }
}

/** Runs a schedule immediately in the background (does not move its next cron slot). */
export async function runScheduleNowAction(id: string): Promise<AiActionState> {
  try {
    await requireAdmin();
    const job = await claimScheduleNow(id);
    after(() =>
      runArticleAgent({
        trigger: "manual",
        scheduleId: job.id,
        topic: job.topic,
        category: job.category,
        instructions: job.instructions,
        mode: job.mode,
        publishDelayHours: job.publishDelayHours,
      }).then(() => revalidateSchedules()),
    );
    revalidateSchedules();
    return { ok: true, message: `Berjalan di background${job.topic ? `: "${job.topic}"` : ""}. Lihat progres di AI Studio → Overview.` };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Gagal menjalankan jadwal." };
  }
}

/** One-off background article from the overview page. */
export async function runQuickArticleAction(_prev: AiActionState, formData: FormData): Promise<AiActionState> {
  try {
    await requireAdmin();
    const topic = str(formData, "topic");
    if (topic.length < 3) return { error: "Isi topik minimal 3 karakter." };
    const mode = parseMode(str(formData, "mode"));
    const category = str(formData, "category") || null;
    after(() =>
      runArticleAgent({ trigger: "manual", topic, category, instructions: null, mode, publishDelayHours: 24 }).then(() => revalidateSchedules()),
    );
    revalidateSchedules();
    return { ok: true, message: `Artikel "${topic}" sedang ditulis di background (±2–6 menit). Refresh halaman untuk melihat hasil.` };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Gagal memulai penulisan." };
  }
}
