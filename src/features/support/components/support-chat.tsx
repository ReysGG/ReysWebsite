"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { SignInButton, useAuth } from "@clerk/nextjs";
import { Headset, LogIn, MessageCircle, SendHorizontal } from "lucide-react";
import LatticeLoader from "@/components/LatticeLoader";
import { ChatMarkdown } from "@/features/ai/components/chat-markdown";

type Role = "USER" | "AI" | "ADMIN" | "SYSTEM";
type Status = "AI" | "WAITING_HUMAN" | "HUMAN" | "CLOSED";
type Message = { id: string; role: Role; content: string; authorName: string | null; createdAt: string };
type Payload = { conversation: { id: string; status: Status } | null; messages: Message[]; error?: string };

const SUGGESTIONS = ["Berapa harga landing page?", "Berapa lama pengerjaan website?", "Apa saja yang saya dapat?"];
const MAX_LENGTH = 1000;

function mergeMessages(current: Message[], incoming: Message[]) {
  const byId = new Map(current.filter((m) => !m.id.startsWith("temp-")).map((m) => [m.id, m]));
  incoming.forEach((m) => byId.set(m.id, m));
  return Array.from(byId.values()).sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}

function SignedOutView({ whatsappTarget }: { whatsappTarget: string | null }) {
  return (
    <div className="space-y-3 px-4 py-4">
      <p className="text-sm leading-6 text-neutral-700">
        Tanya apa saja soal layanan, harga, dan proses pembuatan website. Asisten AI kami menjawab instan, dan admin siap membantu bila perlu.
      </p>
      <SignInButton mode="modal">
        <button type="button" className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-bold text-white transition hover:bg-brand-deep">
          <LogIn className="h-4 w-4" /> Masuk untuk mulai chat
        </button>
      </SignInButton>
      {whatsappTarget && (
        <a
          href={whatsappTarget}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-xl border border-neutral-200 px-4 py-2.5 text-sm font-bold text-neutral-700 transition hover:border-[#25D366] hover:text-[#128C7E]"
        >
          <MessageCircle className="h-4 w-4" /> Atau chat via WhatsApp
        </a>
      )}
      <p className="text-center text-[11px] text-neutral-400">Gratis, tanpa komitmen.</p>
    </div>
  );
}

export function SupportChat({ whatsappTarget }: { whatsappTarget: string | null }) {
  const { isLoaded, isSignedIn } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [status, setStatus] = useState<Status | null>(null);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const lastAtRef = useRef<string | null>(null);
  const [slowAuth, setSlowAuth] = useState(false);

  // If the auth script never loads (blocked, DNS, network), don't spin forever.
  useEffect(() => {
    if (isLoaded) return;
    const timer = setTimeout(() => setSlowAuth(true), 8000);
    return () => clearTimeout(timer);
  }, [isLoaded]);

  const applyPayload = useCallback((data: Payload) => {
    if (data.conversation) setStatus(data.conversation.status);
    if (data.messages.length) {
      setMessages((current) => {
        const merged = mergeMessages(current, data.messages);
        lastAtRef.current = merged.at(-1)?.createdAt ?? lastAtRef.current;
        return merged;
      });
    }
  }, []);

  const poll = useCallback(async () => {
    const query = lastAtRef.current ? `?after=${encodeURIComponent(lastAtRef.current)}` : "";
    const res = await fetch(`/api/support${query}`, { cache: "no-store" }).catch(() => null);
    if (res?.ok) applyPayload((await res.json()) as Payload);
  }, [applyPayload]);

  // Initial load, then poll: fast while waiting for/talking to an admin, slow otherwise.
  useEffect(() => {
    if (!isSignedIn) return;
    void poll();
    const fast = status === "WAITING_HUMAN" || status === "HUMAN";
    const id = setInterval(() => void poll(), fast ? 4000 : 20000);
    return () => clearInterval(id);
  }, [isSignedIn, poll, status]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, sending]);

  const send = async (text: string) => {
    const content = text.trim();
    if (!content || sending) return;
    setError(null);
    setInput("");
    setSending(true);
    setMessages((current) => [...current, { id: `temp-${Date.now()}`, role: "USER", content, authorName: null, createdAt: new Date().toISOString() }]);
    try {
      const res = await fetch("/api/support", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ content }) });
      const data = (await res.json()) as Payload;
      if (!res.ok) {
        setMessages((current) => current.filter((m) => !m.id.startsWith("temp-")));
        setInput(content);
        setError(data.error ?? "Gagal mengirim pesan.");
        return;
      }
      applyPayload(data);
    } catch {
      setError("Koneksi bermasalah. Coba lagi.");
    } finally {
      setSending(false);
    }
  };

  const handoff = async () => {
    setError(null);
    const res = await fetch("/api/support/handoff", { method: "POST" }).catch(() => null);
    if (!res?.ok) {
      setError("Gagal menghubungi admin. Coba lagi.");
      return;
    }
    applyPayload((await res.json()) as Payload);
    await poll();
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    void send(input);
  };
  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault();
      void send(input);
    }
  };

  if (!isLoaded && slowAuth) {
    return (
      <div className="space-y-3 px-4 py-4 text-sm text-neutral-700">
        <p>Chat belum bisa dimuat di browser ini. Coba muat ulang halaman, atau hubungi kami via WhatsApp.</p>
        <button type="button" onClick={() => window.location.reload()} className="w-full rounded-xl bg-brand px-4 py-2.5 text-sm font-bold text-white hover:bg-brand-deep">Muat ulang</button>
        {whatsappTarget && (
          <a href={whatsappTarget} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-xl border border-neutral-200 px-4 py-2.5 font-bold text-neutral-700 hover:border-[#25D366]">
            <MessageCircle className="h-4 w-4" /> Chat via WhatsApp
          </a>
        )}
      </div>
    );
  }
  if (!isLoaded) {
    return <div className="flex h-40 items-center justify-center text-brand-deep"><LatticeLoader label="Memuat" showTimer={false} fontSize={13} cellSize={5} /></div>;
  }
  if (!isSignedIn) return <SignedOutView whatsappTarget={whatsappTarget} />;

  const humanMode = status === "WAITING_HUMAN" || status === "HUMAN";

  return (
    <div className="flex h-[26rem] max-h-[calc(100vh-14rem)] flex-col">
      {humanMode && (
        <div className="flex items-center gap-2 border-b border-brand-soft/60 bg-brand-tint px-4 py-2 text-xs font-semibold text-brand-deep">
          <Headset className="h-3.5 w-3.5" />
          {status === "WAITING_HUMAN" ? "Menunggu admin membalas…" : "Terhubung dengan admin"}
        </div>
      )}

      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
        {messages.length === 0 && (
          <div className="space-y-2">
            <p className="text-sm text-neutral-600">Hai! Saya asisten Buildwithreys. Mau tanya soal apa?</p>
            <div className="flex flex-wrap gap-1.5">
              {SUGGESTIONS.map((s) => (
                <button key={s} type="button" onClick={() => void send(s)} className="rounded-full border border-brand-soft px-3 py-1 text-xs font-medium text-brand-deep transition hover:bg-brand-tint">
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m) => {
          if (m.role === "SYSTEM") {
            return <p key={m.id} className="mx-auto max-w-[90%] text-center text-[11px] leading-snug text-neutral-500">{m.content}</p>;
          }
          if (m.role === "USER") {
            return (
              <div key={m.id} className="flex justify-end">
                <p className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-br-sm bg-brand px-3 py-2 text-sm text-white">{m.content}</p>
              </div>
            );
          }
          return (
            <div key={m.id} className="max-w-[90%]">
              <p className={`mb-0.5 text-[11px] font-semibold ${m.role === "ADMIN" ? "text-emerald-700" : "text-brand-deep"}`}>
                {m.role === "ADMIN" ? m.authorName || "Admin" : "Asisten AI"}
              </p>
              <div className={`rounded-2xl rounded-tl-sm px-3 py-2 ${m.role === "ADMIN" ? "bg-emerald-50" : "bg-neutral-100"}`}>
                <ChatMarkdown text={m.content} />
              </div>
            </div>
          );
        })}

        {sending && status !== "WAITING_HUMAN" && status !== "HUMAN" && (
          <div className="text-brand-deep"><LatticeLoader label="Mengetik" fontSize={12} cellSize={4} showTimer={false} /></div>
        )}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={onSubmit} className="border-t border-neutral-100 p-3">
        {error && <p role="alert" className="mb-2 text-xs text-red-600">{error}</p>}
        <div className="flex items-end gap-2 rounded-xl border border-neutral-200 bg-neutral-50 p-1.5 focus-within:border-brand focus-within:bg-white">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value.slice(0, MAX_LENGTH))}
            onKeyDown={onKeyDown}
            rows={1}
            placeholder={status === "CLOSED" ? "Kirim pesan untuk memulai percakapan baru…" : "Tulis pertanyaanmu…"}
            className="max-h-28 min-h-[36px] flex-1 resize-none bg-transparent px-2 py-1.5 text-sm text-neutral-900 outline-none"
          />
          <button type="submit" disabled={!input.trim() || sending} aria-label="Kirim" className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-white hover:bg-brand-deep disabled:opacity-50">
            <SendHorizontal className="h-4 w-4" />
          </button>
        </div>
        {!humanMode && (
          <button type="button" onClick={() => void handoff()} className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-neutral-500 hover:text-brand-deep">
            <Headset className="h-3 w-3" /> Bicara dengan admin
          </button>
        )}
      </form>
    </div>
  );
}
