import Link from "next/link";
import { CheckCircle2, Clock3, Loader2, XCircle } from "lucide-react";
import type { AiRunView } from "@/features/ai/services/run-service";

function fmt(iso: string) {
  return new Intl.DateTimeFormat("id-ID", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Jakarta" }).format(new Date(iso));
}

function duration(run: AiRunView) {
  if (!run.finishedAt) return null;
  const seconds = Math.round((new Date(run.finishedAt).getTime() - new Date(run.createdAt).getTime()) / 1000);
  return seconds >= 60 ? `${Math.floor(seconds / 60)}m ${seconds % 60}d` : `${seconds}d`;
}

const STATUS = {
  RUNNING: { icon: Loader2, className: "text-brand animate-spin", label: "Berjalan" },
  SUCCESS: { icon: CheckCircle2, className: "text-emerald-600", label: "Sukses" },
  FAILED: { icon: XCircle, className: "text-red-600", label: "Gagal" },
} as const;

export function RunList({ runs }: { runs: AiRunView[] }) {
  if (runs.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-neutral-300 bg-white p-8 text-center text-sm text-neutral-500">
        <Clock3 className="mx-auto mb-2 h-6 w-6 text-brand" />
        Belum ada run. Jalankan &quot;Tulis artikel sekarang&quot; atau buat jadwal.
      </div>
    );
  }

  return (
    <ul className="divide-y divide-neutral-100 rounded-md border border-neutral-200 bg-white">
      {runs.map((run) => {
        const status = STATUS[run.status];
        return (
          <li key={run.id}>
            <details className="group">
              <summary className="flex cursor-pointer list-none items-start gap-3 p-4 hover:bg-neutral-50">
                <status.icon className={`mt-0.5 h-4 w-4 shrink-0 ${status.className}`} aria-label={status.label} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-neutral-900">
                    {run.postTitle ?? run.topic ?? "Topik dipilih AI"}
                  </p>
                  <p className="mt-0.5 text-xs text-neutral-500">
                    {fmt(run.createdAt)} · {run.trigger === "schedule" ? `Jadwal ${run.scheduleName ?? ""}` : "Manual"}
                    {run.providerName && ` · ${run.providerName}/${run.model}`}
                    {duration(run) && ` · ${duration(run)}`}
                    {(run.inputTokens > 0 || run.outputTokens > 0) && ` · ${(run.inputTokens + run.outputTokens).toLocaleString("id-ID")} token`}
                  </p>
                  {run.summary && <p className="mt-1 text-xs text-neutral-700">{run.summary}</p>}
                  {run.error && <p className="mt-1 line-clamp-2 text-xs text-red-600">{run.error}</p>}
                </div>
                {run.postSlug && (
                  <Link href={`/admin/blog/${run.postSlug}/edit`} className="shrink-0 rounded-md border border-neutral-200 px-2.5 py-1 text-xs font-semibold text-neutral-700 hover:border-brand-soft hover:text-brand-deep">
                    Buka draft
                  </Link>
                )}
              </summary>
              {run.steps.length > 0 && (
                <ol className="space-y-1.5 border-t border-neutral-100 bg-neutral-50 px-4 py-3 text-xs">
                  {run.steps.map((step) => (
                    <li key={step.step} className="space-y-1">
                      {step.tools.map((t, i) => (
                        <div key={i} className="rounded border border-neutral-200 bg-white px-2 py-1.5">
                          <span className="font-mono font-semibold text-brand-deep">{t.name}</span>
                          {t.input && <span className="ml-2 break-all text-neutral-500">{t.input}</span>}
                          {t.output && <p className="mt-1 break-all text-neutral-600">→ {t.output}</p>}
                        </div>
                      ))}
                      {step.text && <p className="whitespace-pre-wrap text-neutral-700">{step.text}</p>}
                    </li>
                  ))}
                </ol>
              )}
            </details>
          </li>
        );
      })}
    </ul>
  );
}
