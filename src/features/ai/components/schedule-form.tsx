"use client";

import { useActionState, useMemo, useState } from "react";
import { CronExpressionParser } from "cron-parser";
import { Save } from "lucide-react";
import { saveScheduleAction } from "@/features/ai/actions/schedule-actions";
import type { AiActionState } from "@/features/ai/actions/provider-actions";
import type { AiScheduleView } from "@/features/ai/services/schedule-service";
import { aiInputClass, aiLabelClass, aiPrimaryButtonClass, aiSecondaryButtonClass } from "./ai-studio-header";
import { FormFeedback } from "./form-feedback";

const PRESETS = [
  { label: "Setiap hari 08:00", cron: "0 8 * * *" },
  { label: "Senin, Rabu, Jumat 08:00", cron: "0 8 * * 1,3,5" },
  { label: "Selasa & Kamis 10:00", cron: "0 10 * * 2,4" },
  { label: "Setiap Senin 09:00", cron: "0 9 * * 1" },
  { label: "2x sehari (08:00 & 16:00)", cron: "0 8,16 * * *" },
];

const TIMEZONES = ["Asia/Jakarta", "Asia/Makassar", "Asia/Jayapura", "UTC"];

const MODES = [
  { value: "DRAFT", label: "Simpan draft", hint: "Admin review & publish manual." },
  { value: "SCHEDULE", label: "Jadwalkan terbit", hint: "Terbit otomatis setelah jeda (jika skor SEO lolos)." },
  { value: "PUBLISH", label: "Langsung publish", hint: "Terbit segera jika skor SEO lolos." },
] as const;

export function ScheduleForm({ schedule, categories, onDone }: { schedule?: AiScheduleView; categories: string[]; onDone: () => void }) {
  const [state, formAction, pending] = useActionState(async (prev: AiActionState, formData: FormData) => {
    const result = await saveScheduleAction(prev, formData);
    if (result.ok) onDone();
    return result;
  }, {} as AiActionState);
  const [cron, setCron] = useState(schedule?.cron ?? PRESETS[1].cron);
  const [timezone, setTimezone] = useState(schedule?.timezone ?? "Asia/Jakarta");
  const [mode, setMode] = useState<string>(schedule?.mode ?? "DRAFT");

  const preview = useMemo(() => {
    try {
      const interval = CronExpressionParser.parse(cron, { tz: timezone });
      const fmt = new Intl.DateTimeFormat("id-ID", { dateStyle: "full", timeStyle: "short", timeZone: timezone });
      return { ok: true as const, runs: [0, 1, 2].map(() => fmt.format(interval.next().toDate())) };
    } catch {
      return { ok: false as const, runs: [] };
    }
  }, [cron, timezone]);

  return (
    <form action={formAction} className="space-y-4 rounded-md border border-brand-soft bg-white p-5">
      {schedule && <input type="hidden" name="id" value={schedule.id} />}
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-1.5">
          <span className={aiLabelClass}>Nama jadwal</span>
          <input name="name" required defaultValue={schedule?.name ?? ""} placeholder="Artikel SEO mingguan" className={aiInputClass} />
        </label>
        <label className="space-y-1.5">
          <span className={aiLabelClass}>Kategori</span>
          <input name="category" list="ai-categories" defaultValue={schedule?.category ?? ""} placeholder="Kosongkan = AI pilih" className={aiInputClass} />
          <datalist id="ai-categories">{categories.map((c) => <option key={c} value={c} />)}</datalist>
        </label>

        <div className="space-y-1.5 md:col-span-2">
          <span className={aiLabelClass}>Frekuensi</span>
          <div className="flex flex-wrap gap-1.5">
            {PRESETS.map((preset) => (
              <button
                key={preset.cron}
                type="button"
                onClick={() => setCron(preset.cron)}
                className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${cron === preset.cron ? "border-brand bg-brand text-white" : "border-neutral-200 bg-white text-neutral-600 hover:border-brand-soft"}`}
              >
                {preset.label}
              </button>
            ))}
          </div>
          <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_200px]">
            <input name="cron" value={cron} onChange={(e) => setCron(e.target.value)} className={`${aiInputClass} font-mono`} aria-label="Cron expression" />
            <select name="timezone" value={timezone} onChange={(e) => setTimezone(e.target.value)} className={aiInputClass} aria-label="Timezone">
              {TIMEZONES.map((tz) => <option key={tz} value={tz}>{tz}</option>)}
            </select>
          </div>
          <p className={`text-xs ${preview.ok ? "text-neutral-500" : "text-red-600"}`}>
            {preview.ok ? `Berikutnya: ${preview.runs.join(" · ")}` : "Format cron tidak valid (menit jam tanggal bulan hari)."}
          </p>
        </div>

        <label className="space-y-1.5 md:col-span-2">
          <span className={aiLabelClass}>Antrian topik / keyword (satu per baris)</span>
          <textarea
            name="topics"
            rows={5}
            defaultValue={schedule?.topics.join("\n") ?? ""}
            placeholder={"biaya pembuatan website company profile\ncara memilih jasa pembuatan aplikasi\n..."}
            className={aiInputClass}
          />
          <span className="block text-xs text-neutral-500">Setiap run mengambil 1 topik teratas. Jika kosong, AI memilih topik sendiri (menghindari duplikasi).</span>
        </label>

        <label className="space-y-1.5 md:col-span-2">
          <span className={aiLabelClass}>Instruksi khusus (opsional)</span>
          <textarea name="instructions" rows={2} defaultValue={schedule?.instructions ?? ""} placeholder="Fokus ke studi kasus UMKM kuliner." className={aiInputClass} />
        </label>

        <fieldset className="space-y-2 md:col-span-2">
          <legend className={aiLabelClass}>Setelah artikel selesai</legend>
          <div className="grid gap-2 sm:grid-cols-3">
            {MODES.map((m) => (
              <label key={m.value} className={`cursor-pointer rounded-md border p-3 text-sm transition ${mode === m.value ? "border-brand bg-brand-tint" : "border-neutral-200 hover:border-brand-soft"}`}>
                <input type="radio" name="mode" value={m.value} checked={mode === m.value} onChange={() => setMode(m.value)} className="sr-only" />
                <span className="block font-semibold text-neutral-900">{m.label}</span>
                <span className="text-xs text-neutral-500">{m.hint}</span>
              </label>
            ))}
          </div>
        </fieldset>

        {mode === "SCHEDULE" && (
          <label className="space-y-1.5">
            <span className={aiLabelClass}>Jeda sebelum terbit (jam)</span>
            <input type="number" name="publishDelayHours" min={1} max={720} defaultValue={schedule?.publishDelayHours || 24} className={aiInputClass} />
          </label>
        )}
      </div>

      <label className="flex items-center gap-2 text-sm text-neutral-700">
        <input type="checkbox" name="enabled" defaultChecked={schedule?.enabled ?? true} className="h-4 w-4 rounded border-neutral-300 accent-brand" />
        Aktif
      </label>
      <FormFeedback state={state} />
      <div className="flex justify-end gap-2">
        <button type="button" onClick={onDone} className={aiSecondaryButtonClass}>Batal</button>
        <button type="submit" disabled={pending || !preview.ok} className={aiPrimaryButtonClass}>
          <Save className="h-4 w-4" /> {pending ? "Menyimpan..." : "Simpan jadwal"}
        </button>
      </div>
    </form>
  );
}
