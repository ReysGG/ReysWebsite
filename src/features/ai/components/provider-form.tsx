"use client";

import { useActionState, useState } from "react";
import { Save } from "lucide-react";
import { saveProviderAction, type AiActionState } from "@/features/ai/actions/provider-actions";
import { AI_PROVIDER_TYPES, PROVIDER_META, type AiProviderTypeValue } from "@/features/ai/lib/provider-catalog";
import type { AiProviderView } from "@/features/ai/services/provider-service";
import { aiInputClass, aiLabelClass, aiPrimaryButtonClass, aiSecondaryButtonClass } from "./ai-studio-header";
import { FormFeedback } from "./form-feedback";

export function ProviderForm({ provider, onDone }: { provider?: AiProviderView; onDone: () => void }) {
  const [state, formAction, pending] = useActionState(async (prev: AiActionState, formData: FormData) => {
    const result = await saveProviderAction(prev, formData);
    if (result.ok) onDone();
    return result;
  }, {} as AiActionState);
  const [type, setType] = useState<AiProviderTypeValue>(provider?.type ?? "OPENROUTER");
  const meta = PROVIDER_META[type];

  return (
    <form action={formAction} className="space-y-4 rounded-md border border-brand-soft bg-white p-5">
      {provider && <input type="hidden" name="id" value={provider.id} />}
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-1.5">
          <span className={aiLabelClass}>Tipe</span>
          <select name="type" value={type} onChange={(e) => setType(e.target.value as AiProviderTypeValue)} className={aiInputClass}>
            {AI_PROVIDER_TYPES.map((t) => (
              <option key={t} value={t}>{PROVIDER_META[t].label}</option>
            ))}
          </select>
        </label>
        <label className="space-y-1.5">
          <span className={aiLabelClass}>Nama</span>
          <input name="name" defaultValue={provider?.name ?? ""} placeholder={meta.label} className={aiInputClass} />
        </label>
        <label className="space-y-1.5 md:col-span-2">
          <span className={aiLabelClass}>Base URL {meta.baseUrlRequired ? "(wajib)" : "(opsional)"}</span>
          <input name="baseUrl" defaultValue={provider?.baseUrl ?? ""} placeholder={meta.defaultBaseUrl} required={meta.baseUrlRequired} className={aiInputClass} />
          <span className="block text-xs text-neutral-500">{meta.hint}</span>
        </label>
        <label className="space-y-1.5 md:col-span-2">
          <span className={aiLabelClass}>API Key</span>
          <input
            name="apiKey"
            type="password"
            autoComplete="off"
            required={!provider}
            placeholder={provider ? `Tersimpan: ${provider.keyPreview} — kosongkan jika tidak diubah` : "sk-..."}
            className={aiInputClass}
          />
          <span className="block text-xs text-neutral-500">Dienkripsi AES-256-GCM di database. Tidak pernah dikirim balik ke browser.</span>
        </label>
        <label className="space-y-1.5">
          <span className={aiLabelClass}>Default model</span>
          <input name="defaultModel" list="provider-models" required defaultValue={provider?.defaultModel ?? ""} placeholder={meta.modelPlaceholder} className={aiInputClass} />
          <datalist id="provider-models">
            {provider?.models.map((m) => <option key={m} value={m} />)}
          </datalist>
        </label>
        <label className="space-y-1.5">
          <span className={aiLabelClass}>Image model {meta.supportsImages ? "(opsional)" : "(tidak didukung)"}</span>
          <input
            name="imageModel"
            defaultValue={provider?.imageModel ?? ""}
            disabled={!meta.supportsImages}
            placeholder={meta.imageModelPlaceholder ?? "-"}
            className={aiInputClass}
          />
        </label>
        <label className="space-y-1.5 md:col-span-2">
          <span className={aiLabelClass}>Model lain (pisahkan koma / baris baru)</span>
          <textarea name="models" rows={2} defaultValue={provider?.models.join(", ") ?? ""} className={aiInputClass} />
        </label>
      </div>
      <label className="flex items-center gap-2 text-sm text-neutral-700">
        <input type="checkbox" name="enabled" defaultChecked={provider?.enabled ?? true} className="h-4 w-4 rounded border-neutral-300 accent-brand" />
        Aktif (ikut dalam rantai fallback)
      </label>
      <FormFeedback state={state} />
      <div className="flex justify-end gap-2">
        <button type="button" onClick={onDone} className={aiSecondaryButtonClass}>Batal</button>
        <button type="submit" disabled={pending} className={aiPrimaryButtonClass}>
          <Save className="h-4 w-4" /> {pending ? "Menyimpan..." : "Simpan provider"}
        </button>
      </div>
    </form>
  );
}
