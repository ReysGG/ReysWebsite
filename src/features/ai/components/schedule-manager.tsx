"use client";

import { useCallback, useState, useTransition } from "react";
import { CalendarClock, ListOrdered, Pencil, Play, Plus, Power, Trash2 } from "lucide-react";
import { deleteScheduleAction, runScheduleNowAction, toggleScheduleAction } from "@/features/ai/actions/schedule-actions";
import type { AiScheduleView } from "@/features/ai/services/schedule-service";
import { aiPrimaryButtonClass, aiSecondaryButtonClass } from "./ai-studio-header";
import { ScheduleForm } from "./schedule-form";

const MODE_LABEL = { DRAFT: "Draft", SCHEDULE: "Jadwalkan terbit", PUBLISH: "Langsung publish" } as const;

function fmt(iso: string | null, timezone = "Asia/Jakarta") {
  if (!iso) return "-";
  return new Intl.DateTimeFormat("id-ID", { dateStyle: "medium", timeStyle: "short", timeZone: timezone }).format(new Date(iso));
}

export function ScheduleManager({ schedules, categories, hasProvider }: { schedules: AiScheduleView[]; categories: string[]; hasProvider: boolean }) {
  const [editing, setEditing] = useState<string | "new" | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [notice, setNotice] = useState<{ id: string; ok: boolean; text: string } | null>(null);
  const [pending, startTransition] = useTransition();
  const closeForm = useCallback(() => setEditing(null), []);

  return (
    <div className="space-y-4">
      {!hasProvider && (
        <p className="rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Belum ada provider AI aktif. Jadwal tetap tersimpan, tapi run akan gagal sampai provider ditambahkan.
        </p>
      )}
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-neutral-500">Cron endpoint mengecek jadwal setiap 5 menit. Maksimal 1 artikel per jam per jadwal.</p>
        {editing === null && (
          <button type="button" onClick={() => setEditing("new")} className={aiPrimaryButtonClass}>
            <Plus className="h-4 w-4" /> Jadwal baru
          </button>
        )}
      </div>

      {editing === "new" && <ScheduleForm categories={categories} onDone={closeForm} />}

      {schedules.length === 0 && editing !== "new" && (
        <div className="rounded-md border border-dashed border-neutral-300 bg-white p-10 text-center">
          <CalendarClock className="mx-auto h-8 w-8 text-brand" />
          <p className="mt-2 font-semibold text-neutral-900">Belum ada jadwal auto-artikel.</p>
          <p className="mt-1 text-sm text-neutral-500">Contoh: 3 artikel SEO per minggu dari antrian keyword, otomatis terbit 24 jam kemudian.</p>
        </div>
      )}

      <div className="grid gap-3">
        {schedules.map((schedule) =>
          editing === schedule.id ? (
            <ScheduleForm key={schedule.id} schedule={schedule} categories={categories} onDone={closeForm} />
          ) : (
            <article key={schedule.id} className={`rounded-md border bg-white p-4 ${schedule.enabled ? "border-neutral-200" : "border-dashed border-neutral-300 opacity-75"}`}>
              <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-neutral-900">{schedule.name}</h3>
                    <span className="rounded bg-brand-tint px-1.5 py-0.5 font-mono text-[11px] font-semibold text-brand-deep">{schedule.cron}</span>
                    <span className="rounded bg-neutral-100 px-1.5 py-0.5 text-[11px] font-semibold text-neutral-600">
                      {MODE_LABEL[schedule.mode]}{schedule.mode === "SCHEDULE" ? ` +${schedule.publishDelayHours}j` : ""}
                    </span>
                    {!schedule.enabled && <span className="rounded bg-neutral-100 px-1.5 py-0.5 text-[11px] font-semibold text-neutral-500">Nonaktif</span>}
                  </div>
                  <p className="text-sm text-neutral-600">
                    Berikutnya: <span className="font-medium text-neutral-900">{fmt(schedule.nextRunAt, schedule.timezone)}</span> · terakhir: {fmt(schedule.lastRunAt, schedule.timezone)}
                  </p>
                  <p className="flex items-center gap-1 text-xs text-neutral-500">
                    <ListOrdered className="h-3.5 w-3.5" />
                    {schedule.topics.length
                      ? `${schedule.topics.length} topik di antrian — berikutnya: "${schedule.topics[0]}"`
                      : "Antrian kosong — AI memilih topik sendiri"}
                    {schedule.category && ` · kategori ${schedule.category}`}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    type="button"
                    disabled={pending}
                    onClick={() =>
                      startTransition(async () => {
                        const result = await runScheduleNowAction(schedule.id);
                        setNotice({ id: schedule.id, ok: Boolean(result.ok), text: result.message ?? result.error ?? "" });
                      })
                    }
                    className={aiSecondaryButtonClass}
                  >
                    <Play className="h-4 w-4" /> Jalankan sekarang
                  </button>
                  <button type="button" disabled={pending} onClick={() => setEditing(schedule.id)} className={aiSecondaryButtonClass} aria-label="Edit"><Pencil className="h-4 w-4" /></button>
                  <button
                    type="button"
                    disabled={pending}
                    aria-label={schedule.enabled ? "Nonaktifkan" : "Aktifkan"}
                    onClick={() => startTransition(async () => { await toggleScheduleAction(schedule.id, !schedule.enabled); })}
                    className={aiSecondaryButtonClass}
                  >
                    <Power className="h-4 w-4" />
                  </button>
                  {confirmDelete === schedule.id ? (
                    <button
                      type="button"
                      disabled={pending}
                      onClick={() => startTransition(async () => { await deleteScheduleAction(schedule.id); setConfirmDelete(null); })}
                      className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white hover:bg-red-700"
                    >
                      Yakin hapus?
                    </button>
                  ) : (
                    <button type="button" aria-label="Hapus" disabled={pending} onClick={() => setConfirmDelete(schedule.id)} className={aiSecondaryButtonClass}><Trash2 className="h-4 w-4" /></button>
                  )}
                </div>
              </div>
              {notice?.id === schedule.id && (
                <p className={`mt-3 rounded-md px-3 py-2 text-xs ${notice.ok ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>{notice.text}</p>
              )}
            </article>
          ),
        )}
      </div>
    </div>
  );
}
