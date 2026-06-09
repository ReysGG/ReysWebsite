"use client";

import { useTransition } from "react";
import { RefreshCw } from 'lucide-react';
import { syncProfessionalLandingPageDefaults } from "@/features/admin/actions/landing-page-actions";

export function SyncButton() {
  const [isPending, startTransition] = useTransition();

  function handleSync() {
    startTransition(async () => {
      await syncProfessionalLandingPageDefaults();
    });
  }

  return (
    <button type="button"
      onClick={handleSync}
      disabled={isPending}
      className="inline-flex items-center gap-2 rounded-md bg-[#ff8a00] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#f4b738] disabled:cursor-not-allowed disabled:opacity-60 active:bg-[#e07a00] active:scale-[0.98] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffcd80]"
    >
      <RefreshCw size={16} className={isPending ? "animate-spin" : ""} />
      {isPending ? "Syncing..." : "Sync ke Database"}
    </button>
  );
}
