"use client";

import { useState } from "react";
import { CalendarClock, X } from "lucide-react";

function toDateTimeLocal(value?: Date | string | null) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
}

/**
 * Auto-publish schedule for drafts. The visible input is in the admin's local time;
 * the hidden `scheduledAt` field carries an ISO string so the server never guesses the timezone.
 */
export function BlogScheduleField({ defaultValue }: { defaultValue?: Date | string | null }) {
  const [local, setLocal] = useState(() => toDateTimeLocal(defaultValue));
  const parsed = local ? new Date(local) : null;
  const iso = parsed && !Number.isNaN(parsed.getTime()) ? parsed.toISOString() : "";

  return (
    <div className="space-y-2 rounded-md border border-brand-soft/60 bg-brand-tint/50 p-3">
      <span className="flex items-center gap-1.5 text-sm font-medium text-neutral-800">
        <CalendarClock className="h-4 w-4 text-brand" /> Jadwalkan publish otomatis
      </span>
      <div className="flex gap-2">
        <input
          type="datetime-local"
          value={local}
          onChange={(event) => setLocal(event.target.value)}
          className="w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm focus-visible:border-brand-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
        />
        {local && (
          <button
            type="button"
            onClick={() => setLocal("")}
            aria-label="Hapus jadwal"
            className="rounded-md border border-neutral-200 bg-white px-2 text-neutral-500 hover:bg-neutral-50"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      <input type="hidden" name="scheduledAt" value={iso} />
      <p className="text-xs text-neutral-500">
        Biarkan &quot;Published&quot; tidak dicentang. Draft akan terbit otomatis pada waktu ini (dicek tiap 5 menit).
      </p>
    </div>
  );
}
