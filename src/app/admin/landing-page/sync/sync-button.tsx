"use client";

import { useTransition } from "react";
import { IconRefresh } from "@tabler/icons-react";
import { syncProfessionalLandingPageDefaults } from "@/features/admin/actions/landing-page-actions";

export function SyncButton() {
  const [isPending, startTransition] = useTransition();

  function handleSync() {
    startTransition(async () => {
      await syncProfessionalLandingPageDefaults();
    });
  }

  return (
    <button
      onClick={handleSync}
      disabled={isPending}
      className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
    >
      <IconRefresh size={16} className={isPending ? "animate-spin" : ""} />
      {isPending ? "Syncing..." : "Sync ke Database"}
    </button>
  );
}
