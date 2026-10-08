"use client";

import { useActionState, useMemo, useState, type FormEvent } from "react";
import { Eye, Save } from "lucide-react";
import { saveWriterRulesAction } from "@/features/ai/actions/writer-rules-actions";
import type { AiActionState } from "@/features/ai/actions/provider-actions";
import { buildRulesBlock } from "@/features/ai/lib/prompts";
import { normalizeWriterRules, type AiWriterRules } from "@/features/ai/lib/writer-rules";
import { aiInputClass, aiLabelClass, aiPrimaryButtonClass } from "./ai-studio-header";
import { FormFeedback } from "./form-feedback";

type FieldProps = { rules: AiWriterRules; name: keyof AiWriterRules; label: string; hint?: string };

function Text({ rules, name, label, hint }: FieldProps) {
  return (
    <label className="space-y-1.5">
      <span className={aiLabelClass}>{label}</span>
      <input name={name} defaultValue={String(rules[name])} className={aiInputClass} />
      {hint && <span className="block text-xs text-neutral-500">{hint}</span>}
    </label>
  );
}

function Area({ rules, name, label, hint, rows = 3 }: FieldProps & { rows?: number }) {
  return (
    <label className="space-y-1.5 md:col-span-2">
      <span className={aiLabelClass}>{label}</span>
      <textarea name={name} rows={rows} defaultValue={String(rules[name])} className={aiInputClass} />
      {hint && <span className="block text-xs text-neutral-500">{hint}</span>}
    </label>
  );
}

function Num({ rules, name, label, min, max }: FieldProps & { min: number; max: number }) {
  return (
    <label className="space-y-1.5">
      <span className={aiLabelClass}>{label}</span>
      <input type="number" name={name} min={min} max={max} defaultValue={Number(rules[name])} className={aiInputClass} />
    </label>
  );
}

function Check({ rules, name, label }: FieldProps) {
  return (
    <label className="flex items-center gap-2 text-sm text-neutral-700">
      <input type="checkbox" name={name} defaultChecked={Boolean(rules[name])} className="h-4 w-4 rounded border-neutral-300 accent-brand" />
      {label}
    </label>
  );
}

function readForm(form: HTMLFormElement): AiWriterRules {
  const data = new FormData(form);
  const raw: Record<string, unknown> = Object.fromEntries(data.entries());
  ["requireFaq", "requireTldr", "requireCta"].forEach((key) => (raw[key] = data.get(key) === "on"));
  return normalizeWriterRules(raw);
}

export function WriterRulesForm({ rules }: { rules: AiWriterRules }) {
  const [state, formAction, pending] = useActionState(saveWriterRulesAction, {} as AiActionState);
  const [draft, setDraft] = useState(rules);
  const preview = useMemo(() => buildRulesBlock(draft), [draft]);
  const onChange = (event: FormEvent<HTMLFormElement>) => setDraft(readForm(event.currentTarget));

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
      <form action={formAction} onChange={onChange} className="space-y-6 rounded-md border border-neutral-200 bg-white p-6">
        <section className="space-y-4">
          <h2 className="text-base font-semibold text-neutral-900">Gaya & audiens</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Text rules={rules} name="language" label="Bahasa" />
            <Text rules={rules} name="authorName" label="Nama author" />
            <Text rules={rules} name="tone" label="Tone" />
            <Text rules={rules} name="audience" label="Target pembaca" />
            <Area rules={rules} name="brandVoice" label="Brand voice" hint="Siapa 'kita', apa yang dijual, bagaimana cara bicara." />
          </div>
        </section>

        <section className="space-y-4 border-t border-neutral-100 pt-6">
          <h2 className="text-base font-semibold text-neutral-900">Standar SEO</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <Num rules={rules} name="minWords" label="Min kata" min={300} max={6000} />
            <Num rules={rules} name="maxWords" label="Max kata" min={400} max={8000} />
            <Num rules={rules} name="seoScoreThreshold" label="Skor SEO minimal" min={40} max={100} />
            <Num rules={rules} name="internalLinks" label="Internal link" min={0} max={10} />
            <Num rules={rules} name="externalLinks" label="External link" min={0} max={10} />
            <Num rules={rules} name="maxAgentSteps" label="Max langkah agent" min={8} max={60} />
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Check rules={rules} name="requireTldr" label="Wajib TL;DR" />
            <Check rules={rules} name="requireFaq" label="Wajib FAQ" />
            <Check rules={rules} name="requireCta" label="Wajib CTA" />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Text rules={rules} name="ctaText" label="Teks CTA" />
            <Text rules={rules} name="defaultCategory" label="Kategori default" hint="Kosongkan agar AI memilih." />
          </div>
        </section>

        <section className="space-y-4 border-t border-neutral-100 pt-6">
          <h2 className="text-base font-semibold text-neutral-900">Gambar</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-1.5">
              <span className={aiLabelClass}>Sumber gambar</span>
              <select name="imageSource" defaultValue={rules.imageSource} className={aiInputClass}>
                <option value="stock-then-ai">Stock dulu, AI jika tidak ada</option>
                <option value="stock">Hanya stock (Unsplash/Pexels)</option>
                <option value="ai">Hanya AI generate</option>
                <option value="none">Tanpa gambar</option>
              </select>
            </label>
            <Num rules={rules} name="inlineImages" label="Gambar inline" min={0} max={5} />
          </div>
        </section>

        <section className="space-y-4 border-t border-neutral-100 pt-6">
          <h2 className="text-base font-semibold text-neutral-900">Larangan & aturan tambahan</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Area rules={rules} name="forbiddenTopics" label="Topik terlarang" rows={2} />
            <Area rules={rules} name="forbiddenPhrases" label="Frasa terlarang (klise)" rows={2} />
            <Area rules={rules} name="extraRules" label="Aturan tambahan" rows={5} hint="Bebas, satu aturan per baris. Contoh: selalu sebut estimasi harga dalam Rupiah." />
          </div>
        </section>

        <FormFeedback state={state} />
        <div className="flex justify-end border-t border-neutral-100 pt-5">
          <button type="submit" disabled={pending} className={aiPrimaryButtonClass}>
            <Save className="h-4 w-4" /> {pending ? "Menyimpan..." : "Simpan rules"}
          </button>
        </div>
      </form>

      <aside className="h-fit rounded-md border border-neutral-200 bg-white p-5 xl:sticky xl:top-20">
        <div className="mb-3 flex items-center gap-2">
          <Eye className="h-4 w-4 text-brand" />
          <h2 className="text-sm font-semibold text-neutral-900">Preview instruksi ke AI</h2>
        </div>
        <pre className="max-h-[70vh] overflow-auto whitespace-pre-wrap rounded-md bg-neutral-950 p-4 text-xs leading-relaxed text-neutral-100">{preview}</pre>
      </aside>
    </div>
  );
}
