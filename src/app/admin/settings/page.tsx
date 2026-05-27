import { CheckCircle2, ExternalLink, KeyRound, RefreshCw, ServerCog, TriangleAlert } from "lucide-react";
import { getSiteSettings } from "@/lib/site-settings";
import { SiteSettingsForm } from "@/features/admin/components/settings/site-settings-form";
import { revalidatePath } from "next/cache";

const settingsChecks = [
  {
    label: "Database URL",
    description: "Koneksi Prisma ke Supabase PostgreSQL.",
    ready: Boolean(process.env.DATABASE_URL),
    env: "DATABASE_URL",
  },
  {
    label: "Clerk Publishable Key",
    description: "Key publik untuk autentikasi admin.",
    ready: Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY),
    env: "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY",
  },
  {
    label: "Clerk Secret Key",
    description: "Secret key server-side Clerk.",
    ready: Boolean(process.env.CLERK_SECRET_KEY),
    env: "CLERK_SECRET_KEY",
  },
  {
    label: "Supabase S3 Endpoint",
    description: "Endpoint upload image untuk blog dan media.",
    ready: Boolean(process.env.SUPABASE_S3_ENDPOINT),
    env: "SUPABASE_S3_ENDPOINT",
  },
  {
    label: "Supabase S3 Access Key",
    description: "Credential upload storage.",
    ready: Boolean(process.env.SUPABASE_S3_ACCESS_KEY_ID && process.env.SUPABASE_S3_SECRET_ACCESS_KEY),
    env: "SUPABASE_S3_ACCESS_KEY_ID / SECRET",
  },
];

async function revalidateAll() {
  "use server";
  revalidatePath("/", "layout");
}

export default async function AdminSettingsPage() {
  const readyCount = settingsChecks.filter((item) => item.ready).length;
  const siteSettings = await getSiteSettings();

  return (
    <div className="space-y-6">
      <div className="rounded-md border border-neutral-200 bg-white p-6 shadow-none">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#ff8a00]">System</p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-neutral-900">Settings</h1>
            <p className="mt-1 text-sm text-neutral-500">Konfigurasi global website dan status integrasi.</p>
          </div>
          <div className="flex items-center gap-3">
            <form action={revalidateAll}>
              <button type="submit" className="inline-flex items-center gap-2 rounded-md border border-neutral-200 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-700 transition-colors hover:border-[#ffcd80] hover:bg-[#fffcc9] hover:text-[#ff8a00]">
                <RefreshCw className="h-4 w-4" />
                Revalidate Cache
              </button>
            </form>
            <div className="flex items-center gap-2 rounded-md bg-[#ff8a00] px-4 py-3 text-white">
              <ServerCog className="h-4 w-4" />
              <span className="text-sm font-semibold">{readyCount}/{settingsChecks.length} configured</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        {/* Site Settings Form */}
        <SiteSettingsForm settings={siteSettings} />

        {/* Right panel */}
        <div className="space-y-4">
          {/* Env Checklist */}
          <div className="rounded-md border border-neutral-200 bg-white p-5 shadow-none">
            <div className="mb-4 flex items-center gap-2">
              <KeyRound className="h-4 w-4 text-neutral-500" />
              <h2 className="text-sm font-semibold text-neutral-900">Environment Checklist</h2>
            </div>
            <p className="mb-4 text-xs text-neutral-500">Tidak menampilkan nilai rahasia, hanya status tersedia/tidak.</p>
            <div className="space-y-3">
              {settingsChecks.map((item) => (
                <div key={item.env} className="flex items-start gap-3">
                  {item.ready ? (
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  ) : (
                    <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                  )}
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-neutral-900">{item.label}</p>
                    <p className="text-xs text-neutral-500">{item.description}</p>
                    <code className="mt-1 block text-[10px] text-neutral-400">{item.env}</code>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Security note */}
          <div className="rounded-md border border-amber-200 bg-amber-50 p-4">
            <p className="text-xs font-semibold text-amber-800">Catatan Keamanan</p>
            <p className="mt-1 text-xs text-amber-700">Jangan pernah commit file <code>.env.local</code> ke repository. Gunakan environment variables dari platform deploy (Vercel, Railway, dll).</p>
          </div>

          {/* Preview link */}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-md border border-neutral-200 bg-white p-4 transition-colors hover:border-[#ffcd80] hover:bg-[#fffcc9]"
          >
            <div>
              <p className="text-xs font-semibold text-neutral-900">Preview Website</p>
              <p className="text-xs text-neutral-500">Lihat tampilan publik website.</p>
            </div>
            <ExternalLink className="h-4 w-4 text-neutral-400" />
          </a>
        </div>
      </div>
    </div>
  );
}
