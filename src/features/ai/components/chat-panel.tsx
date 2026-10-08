"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { useChat } from "@ai-sdk/react";
import {
  DefaultChatTransport,
  getToolName,
  isToolUIPart,
  lastAssistantMessageIsCompleteWithApprovalResponses,
  type UIMessage,
} from "ai";
import { Bot, RotateCcw, SendHorizontal, Square, User } from "lucide-react";
import { ChatMarkdown } from "./chat-markdown";
import { ChatToolCard } from "./chat-tool-card";

const QUICK_PROMPTS = [
  "Tulis artikel SEO lengkap tentang biaya pembuatan website company profile, lalu simpan sebagai draft.",
  "Audit SEO semua draft dan perbaiki yang skornya di bawah threshold.",
  "Cari 5 ide topik artikel yang belum pernah kita bahas untuk target UMKM.",
  "Jadwalkan draft terbaru untuk terbit besok jam 09:00.",
];

export function ChatPanel({ sessionId, initialMessages, providersReady }: { sessionId: string; initialMessages: UIMessage[]; providersReady: boolean }) {
  const router = useRouter();
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const transport = useMemo(() => new DefaultChatTransport({ api: "/api/admin/ai/chat" }), []);

  const { messages, sendMessage, status, stop, error, regenerate, addToolApprovalResponse, clearError } = useChat({
    id: sessionId,
    messages: initialMessages,
    transport,
    sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithApprovalResponses,
    onFinish: () => router.refresh(),
  });

  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, status]);

  const submit = (text: string) => {
    const value = text.trim();
    if (!value || busy || !providersReady) return;
    clearError();
    void sendMessage({ text: value });
    setInput("");
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    submit(input);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault();
      submit(input);
    }
  };

  return (
    <div className="flex h-[calc(100vh-15rem)] min-h-[520px] flex-col rounded-md border border-neutral-200 bg-white">
      <div className="flex-1 space-y-5 overflow-y-auto p-4 sm:p-6">
        {messages.length === 0 && (
          <div className="mx-auto max-w-xl py-8 text-center">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-cyan to-brand text-white">
              <Bot className="h-6 w-6" />
            </span>
            <h2 className="mt-3 text-lg font-semibold text-neutral-900">Reys AI siap membantu</h2>
            <p className="mt-1 text-sm text-neutral-500">Menulis artikel SEO, audit, cari gambar, jadwalkan, dan publish — langsung dari sini.</p>
            <div className="mt-5 grid gap-2 text-left sm:grid-cols-2">
              {QUICK_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  disabled={!providersReady}
                  onClick={() => submit(prompt)}
                  className="rounded-md border border-neutral-200 p-3 text-sm text-neutral-700 transition hover:border-brand-soft hover:bg-brand-tint disabled:opacity-50"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((message) => (
          <div key={message.id} className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}>
            <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${message.role === "user" ? "bg-neutral-900 text-white" : "bg-brand-tint text-brand-deep"}`}>
              {message.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
            </span>
            <div className={`min-w-0 max-w-[85%] space-y-2 ${message.role === "user" ? "items-end text-right" : ""}`}>
              {message.parts.map((part, index) => {
                if (part.type === "text") {
                  return message.role === "user" ? (
                    <p key={index} className="inline-block whitespace-pre-wrap rounded-2xl rounded-tr-sm bg-brand px-4 py-2.5 text-left text-sm text-white">{part.text}</p>
                  ) : (
                    <ChatMarkdown key={index} text={part.text} />
                  );
                }
                if (isToolUIPart(part)) {
                  return (
                    <ChatToolCard
                      key={part.toolCallId}
                      part={part}
                      toolName={getToolName(part)}
                      onApprove={(id, approved) => void addToolApprovalResponse({ id, approved })}
                    />
                  );
                }
                return null;
              })}
            </div>
          </div>
        ))}

        {status === "submitted" && (
          <div className="flex items-center gap-2 text-sm text-neutral-500">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-tint text-brand-deep"><Bot className="h-4 w-4" /></span>
            <span className="animate-pulse">Berpikir…</span>
          </div>
        )}

        {error && (
          <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            <p className="font-semibold">Terjadi error</p>
            <p className="mt-1 break-words text-xs">{error.message}</p>
            <button type="button" onClick={() => void regenerate()} className="mt-2 inline-flex items-center gap-1 text-xs font-semibold underline">
              <RotateCcw className="h-3.5 w-3.5" /> Coba lagi
            </button>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={onSubmit} className="border-t border-neutral-100 p-3 sm:p-4">
        {!providersReady && (
          <p className="mb-2 text-xs text-amber-700">Tambahkan minimal satu provider AI aktif di tab Providers untuk mulai chat.</p>
        )}
        <div className="flex items-end gap-2 rounded-md border border-neutral-200 bg-neutral-50 p-2 focus-within:border-brand focus-within:bg-white focus-within:ring-2 focus-within:ring-brand-tint">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            rows={2}
            placeholder="Minta Reys AI menulis, mengedit, audit, atau menjadwalkan artikel… (Enter kirim, Shift+Enter baris baru)"
            className="max-h-48 min-h-[44px] flex-1 resize-y bg-transparent px-2 py-1.5 text-sm text-neutral-900 outline-none"
            disabled={!providersReady}
          />
          {busy ? (
            <button type="button" onClick={() => void stop()} className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-neutral-900 text-white" aria-label="Stop">
              <Square className="h-4 w-4" />
            </button>
          ) : (
            <button type="submit" disabled={!input.trim() || !providersReady} className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-brand text-white hover:bg-brand-deep disabled:opacity-50" aria-label="Kirim">
              <SendHorizontal className="h-4 w-4" />
            </button>
          )}
        </div>
        <p className="mt-1.5 text-[11px] text-neutral-400">Publish, jadwal, unpublish & hapus selalu meminta persetujuanmu. Proses tetap berjalan walau tab ditutup.</p>
      </form>
    </div>
  );
}
