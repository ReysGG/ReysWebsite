"use client";

import { BlogErrorState } from "@/features/blog/components/blog-error-state";
import { useReloadOnStaleDeploy } from "@/components/ui/route-error";

export default function ArticleError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useReloadOnStaleDeploy(error);
  return <main className="min-h-screen bg-brand-tint px-6 pt-32 pb-24"><BlogErrorState reset={reset} /></main>;
}
