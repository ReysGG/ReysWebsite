import Link from "next/link";
import { Bot, CalendarClock, CheckCircle2, Coins, KeyRound, TriangleAlert, XCircle } from "lucide-react";
import { AiStudioHeader, aiSecondaryButtonClass } from "@/features/ai/components/ai-studio-header";
import { QuickArticleForm } from "@/features/ai/components/quick-article-form";
import { RunList } from "@/features/ai/components/run-list";
import { getAiOverview } from "@/features/ai/services/ai-overview-service";

export const dynamic = "force-dynamic";

function fmt(iso: string, timeZone: string) {
  return new Intl.DateTimeFormat("id-ID", { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit", timeZone }).format(new Date(iso));
}

export default async function AiStudioPage() {
  const data = await getAiOverview();
  const envChecks = [
    { label: "AI_ENCRYPTION_KEY", ready: data.env.encryption, hint: "Wajib untuk menyimpan API key." },
    { label: "CRON_SECRET", ready: data.env.cronSecret, hint: "Wajib untuk jadwal otomatis." },
    { label: "UNSPLASH_ACCESS_KEY", ready: data.env.unsplash, hint: "Opsional — foto stock." },
    { label: "PEXELS_API_KEY", ready: data.env.pexels, hint: "Opsional — foto stock." },
  ];

  return (
    <div className="space-y-6">
      <AiStudioHeader
        title="AI Studio"
        description="Asisten AI untuk menulis, mengoptimasi SEO, dan menjadwalkan artikel blog. Hanya untuk admin."
        active="/admin/ai"
        actions={
          <Link href="/admin/ai/chat" className="inline-flex items-center gap-2 rounded-md bg-brand px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-deep">
            <Bot className="h-4 w-4" /> Buka Chat
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Provider aktif", value: data.activeProviders, icon: KeyRound },
          { label: "Run sukses (30h)", value: data.stats.success, icon: CheckCircle2 },
          { label: "Run gagal (30h)", value: data.stats.failed, icon: XCircle },
          { label: "Token (30h)", value: (data.stats.inputTokens + data.stats.outputTokens).toLocaleString("id-ID"), icon: Coins },
        ].map((stat) => (
          <div key={stat.label} className="rounded-md border border-neutral-200 bg-white p-5">
            <stat.icon className="h-5 w-5 text-brand" />
            <p className="mt-3 text-2xl font-bold text-neutral-900">{stat.value}</p>
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-neutral-500">Riwayat run</h2>
          <RunList runs={data.runs} />
        </section>

        <aside className="space-y-4">
          <QuickArticleForm categories={data.categories} disabled={data.activeProviders === 0} />

          <div className="rounded-md border border-neutral-200 bg-white p-5">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-neutral-900">Providers</h2>
              <Link href="/admin/ai/providers" className="text-xs font-semibold text-brand-deep">Kelola →</Link>
            </div>
            {data.providers.length === 0 ? (
              <p className="text-sm text-neutral-500">Belum ada provider.</p>
            ) : (
              <ol className="space-y-2">
                {data.providers.map((p, i) => (
                  <li key={p.id} className={`flex items-center gap-2 text-sm ${p.enabled ? "" : "opacity-50"}`}>
                    <span className="w-4 text-xs font-bold text-neutral-400">{i + 1}</span>
                    {p.hasError ? <TriangleAlert className="h-4 w-4 text-amber-500" /> : <CheckCircle2 className="h-4 w-4 text-emerald-600" />}
                    <span className="font-medium text-neutral-800">{p.name}</span>
                    <span className="truncate font-mono text-xs text-neutral-500">{p.model}</span>
                  </li>
                ))}
              </ol>
            )}
          </div>

          <div className="rounded-md border border-neutral-200 bg-white p-5">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-sm font-semibold text-neutral-900"><CalendarClock className="h-4 w-4 text-brand" /> Jadwal berikutnya</h2>
              <Link href="/admin/ai/schedules" className="text-xs font-semibold text-brand-deep">Kelola →</Link>
            </div>
            {data.upcoming.length === 0 ? (
              <p className="text-sm text-neutral-500">Tidak ada jadwal aktif.</p>
            ) : (
              <ul className="space-y-2 text-sm">
                {data.upcoming.map((s) => (
                  <li key={s.id}>
                    <p className="font-medium text-neutral-800">{s.name} <span className="text-xs text-neutral-500">· {fmt(s.nextRunAt, s.timezone)}</span></p>
                    <p className="truncate text-xs text-neutral-500">{s.nextTopic ? `Topik: ${s.nextTopic}` : "Topik dipilih AI"}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="rounded-md border border-neutral-200 bg-white p-5">
            <h2 className="mb-3 text-sm font-semibold text-neutral-900">Environment</h2>
            <ul className="space-y-2">
              {envChecks.map((check) => (
                <li key={check.label} className="flex items-start gap-2 text-xs">
                  {check.ready ? <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" /> : <TriangleAlert className="h-4 w-4 shrink-0 text-amber-500" />}
                  <span><code className="font-semibold text-neutral-800">{check.label}</code> <span className="text-neutral-500">— {check.hint}</span></span>
                </li>
              ))}
            </ul>
            <Link href="/admin/settings" className={`${aiSecondaryButtonClass} mt-3 w-full text-xs`}>Lihat semua env</Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
