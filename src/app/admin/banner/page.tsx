import { getPromoBanner, isBannerInSchedule } from "@/lib/promo-banner";
import { savePromoBanner } from "@/features/admin/actions/promo-banner-actions";
import { Calendar, Eye, Megaphone, Power, Save, Sparkles } from "lucide-react";

function toLocalInputValue(iso: string) {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function formatRange(startAt: string, endAt: string) {
  if (!startAt && !endAt) return "Tampil terus selama aktif";
  const fmt = (iso: string) => new Date(iso).toLocaleString("id-ID", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
  if (startAt && endAt) return `${fmt(startAt)} – ${fmt(endAt)}`;
  if (startAt) return `Mulai ${fmt(startAt)}`;
  return `Berakhir ${fmt(endAt)}`;
}

export default async function AdminBannerPage() {
  const banner = await getPromoBanner();
  const live = isBannerInSchedule(banner);
  const inputClass = "w-full rounded-md border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-900 outline-none transition-colors focus:border-indigo-300 focus:bg-white focus:ring-2 focus:ring-indigo-100";
  const labelClass = "text-xs font-semibold uppercase tracking-widest text-neutral-500";
  const previewClass = banner.variant === "amber" ? "bg-amber-500 text-neutral-900" : banner.variant === "emerald" ? "bg-emerald-600 text-white" : banner.variant === "neutral" ? "bg-neutral-900 text-white" : "bg-indigo-600 text-white";

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-md border border-indigo-100 bg-gradient-to-br from-white via-indigo-50/60 to-white p-6 shadow-none">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">Marketing</p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-neutral-900">Promo Banner</h1>
            <p className="mt-1 max-w-2xl text-sm text-neutral-500">Kelola pengumuman di atas navbar public website: status, konten, warna, CTA, dan jadwal tampil.</p>
          </div>
          <span className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${live ? "border border-emerald-200 bg-emerald-50 text-emerald-700" : banner.enabled ? "border border-amber-200 bg-amber-50 text-amber-700" : "border border-neutral-200 bg-neutral-100 text-neutral-600"}`}>
            <Power className="h-3.5 w-3.5" /> {live ? "Live" : banner.enabled ? "Terjadwal / Lewat" : "Nonaktif"}
          </span>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <form action={savePromoBanner} className="space-y-6 rounded-md border border-neutral-200 bg-white p-6 shadow-none">
          <section className="rounded-md border border-neutral-200 bg-neutral-50 p-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-sm font-semibold text-neutral-900">Status & Visibility</h2>
                <p className="mt-1 text-xs text-neutral-500">Banner hanya muncul jika aktif dan masuk rentang jadwal.</p>
              </div>
              <label className="flex cursor-pointer items-center gap-3 rounded-md border border-neutral-200 bg-white px-4 py-3">
                <input id="enabled" name="enabled" type="checkbox" defaultChecked={banner.enabled} className="peer sr-only" />
                <span className="relative h-6 w-11 rounded-full bg-neutral-300 transition-colors peer-checked:bg-indigo-600 after:absolute after:left-1 after:top-1 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-transform peer-checked:after:translate-x-5" />
                <span className="text-sm font-semibold text-neutral-800">Tampilkan banner</span>
              </label>
            </div>
          </section>

          <section className="space-y-4">
            <div>
              <h2 className="text-sm font-semibold text-neutral-900">Konten Banner</h2>
              <p className="mt-1 text-xs text-neutral-500">Pesan singkat + CTA opsional.</p>
            </div>
            <div className="space-y-1.5">
              <label className={labelClass} htmlFor="message">Pesan Banner</label>
              <input id="message" name="message" defaultValue={banner.message} placeholder="Contoh: Diskon 20% untuk semua layanan bulan ini!" className={inputClass} />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1.5"><label className={labelClass} htmlFor="ctaLabel">Label Tombol</label><input id="ctaLabel" name="ctaLabel" defaultValue={banner.ctaLabel} placeholder="Contoh: Lihat promo" className={inputClass} /></div>
              <div className="space-y-1.5"><label className={labelClass} htmlFor="ctaHref">Link Tombol</label><input id="ctaHref" name="ctaHref" defaultValue={banner.ctaHref} placeholder="Contoh: /#pricing" className={inputClass} /></div>
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1.5"><label className={labelClass} htmlFor="variant">Warna</label><select id="variant" name="variant" defaultValue={banner.variant} className={inputClass}><option value="indigo">Indigo</option><option value="amber">Amber</option><option value="emerald">Emerald</option><option value="neutral">Neutral</option></select></div>
            <div className="space-y-1.5"><label className={labelClass} htmlFor="schedulePreset">Preset Jadwal</label><select id="schedulePreset" name="schedulePreset" defaultValue="custom" className={inputClass}><option value="custom">Custom tanggal</option><option value="always">Tampil terus</option><option value="today">Hari ini</option><option value="7days">7 hari dari sekarang</option><option value="month">1 bulan dari sekarang</option></select></div>
          </section>

          <section className="space-y-4 rounded-md border border-indigo-100 bg-indigo-50/40 p-4">
            <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-indigo-600" /><h2 className="text-sm font-semibold text-neutral-900">Jadwal Tampil</h2><span className="ml-auto text-xs text-neutral-500">Dipakai jika preset Custom</span></div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1.5"><label className={labelClass} htmlFor="startAt">Mulai Tampil</label><input id="startAt" name="startAt" type="datetime-local" defaultValue={toLocalInputValue(banner.startAt)} className={inputClass} /></div>
              <div className="space-y-1.5"><label className={labelClass} htmlFor="endAt">Berakhir</label><input id="endAt" name="endAt" type="datetime-local" defaultValue={toLocalInputValue(banner.endAt)} className={inputClass} /></div>
            </div>
          </section>

          <div className="flex justify-end border-t border-neutral-100 pt-5"><button type="submit" className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"><Save className="h-4 w-4" />Simpan Banner</button></div>
        </form>

        <aside className="space-y-6 xl:sticky xl:top-24 xl:self-start">
          <div className="rounded-md border border-neutral-200 bg-white shadow-none">
            <div className="flex items-center gap-2 border-b border-neutral-100 px-5 py-4 text-xs font-semibold uppercase tracking-widest text-neutral-500"><Eye className="h-3.5 w-3.5" />Live Preview</div>
            <div className="p-5">
              {banner.enabled && banner.message ? <div className={`rounded-md px-4 py-3 text-center text-sm font-medium ${previewClass}`}><Sparkles className="mr-2 inline h-4 w-4 opacity-70" />{banner.message}{banner.ctaLabel && <span className="ml-2 underline">{banner.ctaLabel}</span>}</div> : <div className="rounded-md border border-dashed border-neutral-300 bg-neutral-50 px-4 py-8 text-center text-sm text-neutral-400">Preview akan muncul setelah banner aktif dan pesan diisi.</div>}
            </div>
          </div>
          <div className="rounded-md border border-neutral-200 bg-white p-5 shadow-none">
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-neutral-900"><Megaphone className="h-4 w-4 text-indigo-600" />Summary</div>
            <dl className="space-y-3 text-sm"><div className="flex justify-between gap-4"><dt className="text-neutral-500">Status</dt><dd className="font-semibold text-neutral-900">{live ? "Live" : banner.enabled ? "Scheduled" : "Disabled"}</dd></div><div className="flex justify-between gap-4"><dt className="text-neutral-500">Jadwal</dt><dd className="max-w-[190px] text-right font-medium text-neutral-700">{formatRange(banner.startAt, banner.endAt)}</dd></div><div className="flex justify-between gap-4"><dt className="text-neutral-500">CTA</dt><dd className="font-semibold text-neutral-900">{banner.ctaLabel && banner.ctaHref ? "Ada" : "Tidak ada"}</dd></div><div className="flex justify-between gap-4"><dt className="text-neutral-500">Versi</dt><dd className="font-mono text-xs text-neutral-600">{banner.version}</dd></div></dl>
          </div>
        </aside>
      </div>
    </div>
  );
}
