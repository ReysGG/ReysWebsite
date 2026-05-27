"use client";

import { BlogErrorState } from "@/features/blog/components/blog-error-state";

export default function BlogError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main className="min-h-screen bg-[#fffcc9] px-6 pt-32 pb-24"><BlogErrorState reset={reset} /></main>;
}
