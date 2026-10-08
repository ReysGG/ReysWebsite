"use client";

import { useCallback, useState, useTransition } from "react";
import {
  ArrowDown, ArrowUp, CheckCircle2, CircleOff, ImageIcon, ListRestart, Pencil, Plus, Power, Trash2, TriangleAlert, Zap,
} from "lucide-react";
import {
  deleteProviderAction,
  fetchModelsAction,
  reorderProvidersAction,
  testProviderAction,
  toggleProviderAction,
} from "@/features/ai/actions/provider-actions";
import { PROVIDER_META } from "@/features/ai/lib/provider-catalog";
import type { AiProviderView } from "@/features/ai/services/provider-service";
import { aiPrimaryButtonClass, aiSecondaryButtonClass } from "./ai-studio-header";
import { ProviderForm } from "./provider-form";

type Notice = { id: string; ok: boolean; text: string };

function formatDate(iso: string | null) {
  if (!iso) return "-";
  return new Intl.DateTimeFormat("id-ID", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Jakarta" }).format(new Date(iso));
}

export function ProviderManager({ providers, encryptionReady }: { providers: AiProviderView[]; encryptionReady: boolean }) {
  const [editing, setEditing] = useState<string | "new" | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [notice, setNotice] = useState<Notice | null>(null);
  const [pending, startTransition] = useTransition();
  const closeForm = useCallback(() => setEditing(null), []);

  const move = (index: number, delta: number) => {
    const ids = providers.map((p) => p.id);
    const target = index + delta;
    if (target < 0 || target >= ids.length) return;
    [ids[index], ids[target]] = [ids[target], ids[index]];
    startTransition(async () => {
      await reorderProvidersAction(ids);
    });
  };

  const run = (id: string, task: () => Promise<Notice | null>) =>
    startTransition(async () => {
      setNotice({ id, ok: true, text: "Memproses..." });
      setNotice(await task());
    });

  return (
    <div className="space-y-4">
      {!encryptionReady && (
        <p className="flex items-start gap-2 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" />
          <span><code>AI_ENCRYPTION_KEY</code> belum di-set di environment. Provider tidak bisa disimpan sampai key diisi (generate: <code>openssl rand -base64 32</code>).</span>
        </p>
      )}

      <div className="flex items-center justify-between">
        <p className="text-sm text-neutral-500">Urutan = prioritas fallback. Provider #1 dipakai duluan; jika error (rate limit, kuota, down), otomatis pindah ke berikutnya.</p>
        {editing === null && (
          <button type="button" onClick={() => setEditing("new")} className={aiPrimaryButtonClass}>
            <Plus className="h-4 w-4" /> Tambah provider
          </button>
        )}
      </div>

      {editing === "new" && <ProviderForm onDone={closeForm} />}

      {providers.length === 0 && editing !== "new" && (
        <div className="rounded-md border border-dashed border-neutral-300 bg-white p-10 text-center">
          <p className="font-semibold text-neutral-900">Belum ada provider.</p>
          <p className="mt-1 text-sm text-neutral-500">Tambahkan OpenRouter, OpenAI, Claude, Gemini, atau endpoint OpenAI-compatible (mis. 9router).</p>
        </div>
      )}

      <ol className="space-y-3">
        {providers.map((provider, index) =>
          editing === provider.id ? (
            <li key={provider.id}><ProviderForm provider={provider} onDone={closeForm} /></li>
          ) : (
            <li key={provider.id} className={`rounded-md border bg-white p-4 ${provider.enabled ? "border-neutral-200" : "border-dashed border-neutral-300 opacity-70"}`}>
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-start gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-brand-tint text-sm font-bold text-brand-deep">{index + 1}</span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-semibold text-neutral-900">{provider.name}</p>
                      <span className="rounded bg-neutral-100 px-1.5 py-0.5 text-[11px] font-semibold text-neutral-600">{PROVIDER_META[provider.type].label.split(" (")[0]}</span>
                      {provider.enabled ? (
                        provider.lastError && (!provider.lastUsedAt || (provider.lastErrorAt ?? "") > provider.lastUsedAt) ? (
                          <span className="inline-flex items-center gap-1 rounded bg-amber-50 px-1.5 py-0.5 text-[11px] font-semibold text-amber-700"><TriangleAlert className="h-3 w-3" /> Error terakhir</span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded bg-emerald-50 px-1.5 py-0.5 text-[11px] font-semibold text-emerald-700"><CheckCircle2 className="h-3 w-3" /> Aktif</span>
                        )
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded bg-neutral-100 px-1.5 py-0.5 text-[11px] font-semibold text-neutral-500"><CircleOff className="h-3 w-3" /> Nonaktif</span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-neutral-600">
                      <span className="font-mono text-xs">{provider.defaultModel}</span>
                      {provider.imageModel && (
                        <span className="ml-2 inline-flex items-center gap-1 text-xs text-neutral-500"><ImageIcon className="h-3 w-3" /> {provider.imageModel}</span>
                      )}
                    </p>
                    <p className="mt-1 text-xs text-neutral-500">
                      Key {provider.keyPreview} · {provider.models.length} model · terakhir dipakai {formatDate(provider.lastUsedAt)}
                      {provider.baseUrl && <> · <span className="font-mono">{provider.baseUrl}</span></>}
                    </p>
                    {provider.lastError && (
                      <p className="mt-1 line-clamp-2 text-xs text-amber-700" title={provider.lastError}>
                        {formatDate(provider.lastErrorAt)}: {provider.lastError}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  <button type="button" aria-label="Naikkan prioritas" disabled={pending || index === 0} onClick={() => move(index, -1)} className={aiSecondaryButtonClass}><ArrowUp className="h-4 w-4" /></button>
                  <button type="button" aria-label="Turunkan prioritas" disabled={pending || index === providers.length - 1} onClick={() => move(index, 1)} className={aiSecondaryButtonClass}><ArrowDown className="h-4 w-4" /></button>
                  <button
                    type="button"
                    disabled={pending}
                    onClick={() =>
                      run(provider.id, async () => {
                        const result = await testProviderAction(provider.id);
                        return result.ok
                          ? { id: provider.id, ok: true, text: `OK dalam ${result.latencyMs} ms — "${result.reply}"` }
                          : { id: provider.id, ok: false, text: result.error };
                      })
                    }
                    className={aiSecondaryButtonClass}
                  >
                    <Zap className="h-4 w-4" /> Test
                  </button>
                  <button
                    type="button"
                    disabled={pending}
                    onClick={() =>
                      run(provider.id, async () => {
                        const result = await fetchModelsAction(provider.id);
                        return { id: provider.id, ok: Boolean(result.ok), text: result.message ?? result.error ?? "" };
                      })
                    }
                    className={aiSecondaryButtonClass}
                  >
                    <ListRestart className="h-4 w-4" /> Models
                  </button>
                  <button type="button" disabled={pending} onClick={() => setEditing(provider.id)} className={aiSecondaryButtonClass}><Pencil className="h-4 w-4" /></button>
                  <button
                    type="button"
                    disabled={pending}
                    aria-label={provider.enabled ? "Nonaktifkan" : "Aktifkan"}
                    onClick={() => startTransition(async () => { await toggleProviderAction(provider.id, !provider.enabled); })}
                    className={aiSecondaryButtonClass}
                  >
                    <Power className="h-4 w-4" />
                  </button>
                  {confirmDelete === provider.id ? (
                    <button
                      type="button"
                      disabled={pending}
                      onClick={() => startTransition(async () => { await deleteProviderAction(provider.id); setConfirmDelete(null); })}
                      className="inline-flex items-center gap-1 rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white hover:bg-red-700"
                    >
                      Yakin hapus?
                    </button>
                  ) : (
                    <button type="button" aria-label="Hapus" disabled={pending} onClick={() => setConfirmDelete(provider.id)} className={aiSecondaryButtonClass}><Trash2 className="h-4 w-4" /></button>
                  )}
                </div>
              </div>
              {notice?.id === provider.id && (
                <p className={`mt-3 rounded-md px-3 py-2 text-xs ${notice.ok ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>{notice.text}</p>
              )}
            </li>
          ),
        )}
      </ol>
    </div>
  );
}
