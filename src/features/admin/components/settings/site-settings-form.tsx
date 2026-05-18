import { Save } from "lucide-react";
import { saveSiteSettings } from "@/features/admin/actions/settings-actions";
import type { SiteSettings } from "@/lib/site-settings";

export function SiteSettingsForm({ settings }: { settings: SiteSettings }) {
  const inputClass = "w-full rounded-md border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-900 outline-none transition-colors focus:border-indigo-300 focus:bg-white focus:ring-2 focus:ring-indigo-100";
  const labelClass = "text-xs font-semibold uppercase tracking-widest text-neutral-500";

  return (
    <form action={saveSiteSettings} className="rounded-md border border-neutral-200 bg-white p-6 shadow-none">
      <div className="border-b border-neutral-100 pb-5">
        <h2 className="text-base font-semibold text-neutral-900">Site Settings</h2>
        <p className="mt-1 text-sm text-neutral-500">Konten global website yang aman diedit dari admin.</p>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <div className="space-y-1.5">
          <label className={labelClass} htmlFor="siteName">Nama Website</label>
          <input id="siteName" name="siteName" defaultValue={settings.siteName} className={inputClass} />
        </div>
        <div className="space-y-1.5">
          <label className={labelClass} htmlFor="tagline">Tagline</label>
          <input id="tagline" name="tagline" defaultValue={settings.tagline} className={inputClass} />
        </div>
        <div className="space-y-1.5 md:col-span-2">
          <label className={labelClass} htmlFor="description">Meta Description</label>
          <textarea id="description" name="description" rows={3} defaultValue={settings.description} className={inputClass} />
        </div>
        <div className="space-y-1.5">
          <label className={labelClass} htmlFor="contactEmail">Contact Email</label>
          <input id="contactEmail" name="contactEmail" type="email" defaultValue={settings.contactEmail} className={inputClass} />
        </div>
        <div className="space-y-1.5">
          <label className={labelClass} htmlFor="whatsapp">WhatsApp</label>
          <input id="whatsapp" name="whatsapp" defaultValue={settings.whatsapp} placeholder="08123456789 atau https://wa.me/..." className={inputClass} />
        </div>
        <div className="space-y-1.5">
          <label className={labelClass} htmlFor="instagram">Instagram</label>
          <input id="instagram" name="instagram" defaultValue={settings.instagram} placeholder="@username, username, atau full link" className={inputClass} />
        </div>
        <div className="space-y-1.5">
          <label className={labelClass} htmlFor="linkedin">LinkedIn</label>
          <input id="linkedin" name="linkedin" defaultValue={settings.linkedin} placeholder="nama-profile, company/nama, atau full link" className={inputClass} />
        </div>
        <div className="space-y-1.5">
          <label className={labelClass} htmlFor="twitter">Twitter / X</label>
          <input id="twitter" name="twitter" defaultValue={settings.twitter} placeholder="@username, username, atau full link" className={inputClass} />
        </div>
        <div className="space-y-1.5">
          <label className={labelClass} htmlFor="github">GitHub</label>
          <input id="github" name="github" defaultValue={settings.github} placeholder="username atau full link" className={inputClass} />
        </div>
      </div>

      <p className="mt-4 rounded-md border border-blue-100 bg-blue-50 px-3 py-2 text-xs font-medium leading-relaxed text-blue-800">
        Untuk social media, boleh isi username saja. Contoh: <span className="font-bold">@buildwithreys</span> akan otomatis dibuat menjadi link sesuai platform.
      </p>

      <div className="mt-6 flex justify-end border-t border-neutral-100 pt-5">
        <button type="submit" className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700">
          <Save className="h-4 w-4" />
          Simpan Settings
        </button>
      </div>
    </form>
  );
}
