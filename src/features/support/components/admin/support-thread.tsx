"use client";

import { useActionState, useEffect, useRef } from "react";
import { Bot, CheckCheck, Headset, RotateCcw, SendHorizontal, User } from "lucide-react";
import {
  replyToConversationAction,
  setConversationStatusAction,
  type SupportActionState,
} from "@/features/support/actions/support-admin-actions";
import type { SupportMessageView } from "@/features/support/services/support-service";
import { ChatMarkdown } from "@/features/ai/components/chat-markdown";

function fmt(iso: string) {
  return new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit", timeZone: "Asia/Jakarta" }).format(new Date(iso));
}

export function SupportThread({
  conversationId,
  status,
  messages,
}: {
  conversationId: string;
  status: "AI" | "WAITING_HUMAN" | "HUMAN" | "CLOSED";
  messages: SupportMessageView[];
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [state, formAction, pending] = useActionState(async (prev: SupportActionState, formData: FormData) => {
    const result = await replyToConversationAction(conversationId, prev, formData);
    if (result.ok) formRef.current?.reset();
    return result;
  }, {} as SupportActionState);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "end" });
  }, [messages.length]);


  return (
    <div className="flex h-[calc(100vh-16rem)] min-h-[480px] flex-col rounded-md border border-neutral-200 bg-white">
      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.map((m) => {
          if (m.role === "SYSTEM") {
            return <p key={m.id} className="text-center text-xs text-neutral-500">{m.content} · {fmt(m.createdAt)}</p>;
          }
          const mine = m.role === "ADMIN";
          return (
            <div key={m.id} className={`flex gap-2 ${mine ? "flex-row-reverse" : ""}`}>
              <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${m.role === "USER" ? "bg-neutral-900 text-white" : m.role === "AI" ? "bg-brand-tint text-brand-deep" : "bg-emerald-100 text-emerald-700"}`}>
                {m.role === "USER" ? <User className="h-3.5 w-3.5" /> : m.role === "AI" ? <Bot className="h-3.5 w-3.5" /> : <Headset className="h-3.5 w-3.5" />}
              </span>
              <div className={`max-w-[75%] ${mine ? "text-right" : ""}`}>
                <p className="mb-0.5 text-[11px] text-neutral-500">
                  {m.role === "USER" ? "Pengunjung" : m.role === "AI" ? "Asisten AI" : m.authorName || "Admin"} · {fmt(m.createdAt)}
                </p>
                <div className={`inline-block rounded-2xl px-3 py-2 text-left ${m.role === "USER" ? "bg-neutral-100" : m.role === "AI" ? "bg-brand-tint" : "bg-emerald-50"}`}>
                  <ChatMarkdown text={m.content} />
                </div>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      <form ref={formRef} action={formAction} className="space-y-2 border-t border-neutral-100 p-3">
        {state.error && <p className="text-xs text-red-600">{state.error}</p>}
        <div className="flex items-end gap-2">
          <textarea
            name="content"
            rows={2}
            required
            placeholder={status === "CLOSED" ? "Percakapan sudah ditutup — balasan tetap terkirim ke pengunjung." : "Tulis balasan sebagai admin… (AI berhenti membalas setelah admin menjawab)"}
            className="min-h-[44px] flex-1 resize-y rounded-md border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm outline-none focus:border-brand focus:bg-white"
          />
          <button type="submit" disabled={pending} className="inline-flex h-11 items-center gap-1.5 rounded-md bg-brand px-4 text-sm font-semibold text-white hover:bg-brand-deep disabled:opacity-60">
            <SendHorizontal className="h-4 w-4" /> {pending ? "Mengirim…" : "Kirim"}
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {status !== "AI" && status !== "CLOSED" && (
            <button type="button" onClick={() => void setConversationStatusAction(conversationId, "AI")} className="inline-flex items-center gap-1 rounded-md border border-neutral-200 px-2.5 py-1 text-xs font-semibold text-neutral-600 hover:bg-neutral-50">
              <RotateCcw className="h-3.5 w-3.5" /> Kembalikan ke AI
            </button>
          )}
          {status !== "CLOSED" && (
            <button type="button" onClick={() => void setConversationStatusAction(conversationId, "CLOSED")} className="inline-flex items-center gap-1 rounded-md border border-neutral-200 px-2.5 py-1 text-xs font-semibold text-neutral-600 hover:bg-neutral-50">
              <CheckCheck className="h-3.5 w-3.5" /> Tutup percakapan
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
