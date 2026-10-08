"use client";

import { AdminRouteError } from "@/components/ui/route-error";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <AdminRouteError error={error} reset={reset} title="Gagal memuat artikel" />;
}
