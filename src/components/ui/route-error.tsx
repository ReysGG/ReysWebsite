"use client";

import { useEffect } from "react";
import { unstable_isUnrecognizedActionError } from "next/navigation";
import { RefreshCw, TriangleAlert } from "lucide-react";

const RELOAD_KEY = "stale-deploy-reload-at";

/**
 * After a redeploy, pages opened earlier still reference the old build: Server Action IDs and
 * JS chunks no longer exist on the server. Reloading fetches the new build and fixes it.
 */
export function isStaleDeployError(error: unknown) {
  if (unstable_isUnrecognizedActionError(error)) return true;
  const err = error as { name?: string; message?: string } | null;
  return err?.name === "ChunkLoadError" || /Failed to find Server Action|Loading chunk [\w-]+ failed/i.test(err?.message ?? "");
}

/** Reloads the page once (guarded against loops) when the error comes from an outdated deployment. */
export function useReloadOnStaleDeploy(error: unknown) {
  const stale = isStaleDeployError(error);
  useEffect(() => {
    if (!stale) return;
    try {
      const last = Number(sessionStorage.getItem(RELOAD_KEY) || 0);
      if (Date.now() - last < 30_000) return;
      sessionStorage.setItem(RELOAD_KEY, String(Date.now()));
    } catch {
      // storage unavailable: still reload once
    }
    window.location.reload();
  }, [stale]);
  return stale;
}

export function AdminRouteError({ error, reset, title = "Terjadi kesalahan" }: { error: Error & { digest?: string }; reset: () => void; title?: string }) {
  const stale = useReloadOnStaleDeploy(error);

  if (stale) {
    return (
      <div className="rounded-md border border-brand-soft bg-brand-tint p-6 text-neutral-800">
        <h2 className="flex items-center gap-2 font-bold text-brand-deep">
          <RefreshCw className="h-4 w-4 animate-spin" /> Website baru saja diperbarui
        </h2>
        <p className="mt-1 text-sm">Memuat ulang halaman ke versi terbaru… Jika belum tersimpan, ulangi aksi terakhir setelah halaman termuat.</p>
        <button type="button" onClick={() => window.location.reload()} className="mt-4 rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-deep">
          Muat ulang sekarang
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-md border border-red-200 bg-red-50 p-6 text-red-700">
      <h2 className="flex items-center gap-2 font-bold"><TriangleAlert className="h-4 w-4" /> {title}</h2>
      {error.digest && <p className="mt-1 text-xs text-red-600/80">Kode error: {error.digest}</p>}
      <button type="button" onClick={reset} className="mt-4 rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700">
        Coba lagi
      </button>
    </div>
  );
}
