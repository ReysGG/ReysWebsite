"use client";

import { useActionState } from "react";
import { Sparkles } from "lucide-react";
import { runQuickArticleAction } from "@/features/ai/actions/schedule-actions";
import type { AiActionState } from "@/features/ai/actions/provider-actions";
import { aiInputClass, aiLabelClass, aiPrimaryButtonClass } from "./ai-studio-header";
import { FormFeedback } from "./form-feedback";

export function QuickArticleForm({ categories, disabled }: { categories: string[]; disabled: boolean }) {
  const [state, formAction, pending] = useActionState(runQuickArticleAction, {} as AiActionState);

  return (
    <form action={formAction} className="space-y-4 rounded-md border border-neutral-200 bg-white p-5">
      <div>
        <h2 className="flex items-center gap-2 text-base font-semibold text-neutral-900">
          <Sparkles className="h-4 w-4 text-brand" /> Tulis artikel sekarang
        </h2>
        <p className="mt-1 text-sm text-neutral-500">AI riset, menulis, optimasi SEO, dan pasang gambar di background.</p>
      </div>
      <label className="block space-y-1.5">
        <span className={aiLabelClass}>Topik / keyword</span>
        <input name="topic" required minLength={3} placeholder="biaya pembuatan website toko online 2026" className={aiInputClass} />
      </label>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="space-y-1.5">
          <span className={aiLabelClass}>Kategori</span>
          <input name="category" list="quick-categories" placeholder="Opsional" className={aiInputClass} />
          <datalist id="quick-categories">{categories.map((c) => <option key={c} value={c} />)}</datalist>
        </label>
        <label className="space-y-1.5">
          <span className={aiLabelClass}>Hasil</span>
          <select name="mode" defaultValue="DRAFT" className={aiInputClass}>
            <option value="DRAFT">Simpan draft</option>
            <option value="SCHEDULE">Terbit otomatis +24 jam</option>
            <option value="PUBLISH">Langsung publish (jika SEO lolos)</option>
          </select>
        </label>
      </div>
      <FormFeedback state={state} />
      <button type="submit" disabled={pending || disabled} className={`${aiPrimaryButtonClass} w-full`}>
        <Sparkles className="h-4 w-4" /> {pending ? "Memulai..." : disabled ? "Tambahkan provider dulu" : "Mulai menulis"}
      </button>
    </form>
  );
}
