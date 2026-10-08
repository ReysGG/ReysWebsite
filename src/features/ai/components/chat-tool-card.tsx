"use client";

import Link from "next/link";
import { Check, CheckCircle2, ChevronDown, Loader2, ShieldQuestion, X, XCircle } from "lucide-react";
import type { DynamicToolUIPart, ToolUIPart, UITools } from "ai";

export const TOOL_LABELS: Record<string, string> = {
  getBlogTaxonomy: "Membaca kategori & tag",
  listPosts: "Mencari artikel",
  getPost: "Membaca artikel",
  findInternalLinks: "Mencari internal link",
  webResearch: "Riset web",
  seoAudit: "Audit SEO",
  createDraft: "Membuat draft",
  updatePost: "Memperbarui artikel",
  searchImages: "Mencari gambar stock",
  generateImage: "Membuat gambar AI",
  attachImage: "Memasang gambar",
  publishPost: "Publish artikel",
  unpublishPost: "Unpublish artikel",
  schedulePost: "Menjadwalkan artikel",
  deletePost: "Menghapus artikel",
};

type AnyToolPart = ToolUIPart<UITools> | DynamicToolUIPart;
type Json = Record<string, unknown>;

function asObject(value: unknown): Json {
  return value && typeof value === "object" ? (value as Json) : {};
}

function SeoBadge({ seo }: { seo: unknown }) {
  const s = asObject(seo);
  if (typeof s.score !== "number") return null;
  const passed = Boolean(s.passed);
  return (
    <span className={`rounded px-1.5 py-0.5 text-[11px] font-bold ${passed ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
      SEO {s.score}/100
    </span>
  );
}

function OutputSummary({ toolName, output }: { toolName: string; output: unknown }) {
  const o = asObject(output);
  if (o.ok === false) return <p className="text-xs text-red-600">{String(o.error ?? "Gagal")}</p>;

  if (toolName === "searchImages" && Array.isArray(o.images)) {
    return (
      <div className="mt-1 grid grid-cols-3 gap-1.5 sm:grid-cols-6">
        {(o.images as Json[]).map((img) => (
          // eslint-disable-next-line @next/next/no-img-element -- remote stock thumbnails, not optimized on purpose
          <img key={String(img.imageId)} src={String(img.thumbUrl)} alt={String(img.alt)} title={String(img.credit)} className="aspect-video w-full rounded object-cover" loading="lazy" />
        ))}
      </div>
    );
  }
  if ((toolName === "generateImage" || toolName === "attachImage") && typeof o.url === "string") {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- storage URL preview
      <img src={o.url} alt="" className="mt-1 aspect-video w-48 rounded object-cover" loading="lazy" />
    );
  }
  if (typeof o.editUrl === "string") {
    return (
      <div className="mt-1 flex flex-wrap items-center gap-2 text-xs">
        <SeoBadge seo={o.seo} />
        {typeof o.status === "string" && <span className="font-semibold text-neutral-700">Status: {o.status}</span>}
        <Link href={o.editUrl} className="font-semibold text-brand-deep underline underline-offset-2">Edit</Link>
        {typeof o.previewUrl === "string" && <Link href={o.previewUrl} className="font-semibold text-brand-deep underline underline-offset-2">Preview</Link>}
      </div>
    );
  }
  if (toolName === "webResearch" && typeof o.summary === "string") {
    const sources = Array.isArray(o.sources) ? (o.sources as Json[]) : [];
    return (
      <div className="mt-1 space-y-1 text-xs">
        <p className="line-clamp-4 whitespace-pre-wrap text-neutral-700">{o.summary}</p>
        {sources.length > 0 && (
          <ul className="space-y-0.5">
            {sources.slice(0, 6).map((src) => (
              <li key={String(src.url)} className="truncate">
                <a href={String(src.url)} target="_blank" rel="noopener noreferrer" className="text-brand-deep underline underline-offset-2">{String(src.title || src.url)}</a>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
  if (toolName === "seoAudit" && typeof o.score === "number") {
    return (
      <div className="mt-1 space-y-1 text-xs">
        <SeoBadge seo={o} />
        {Array.isArray(o.issues) && o.issues.length > 0 && (
          <ul className="list-disc pl-4 text-neutral-600">{(o.issues as string[]).slice(0, 6).map((issue) => <li key={issue}>{issue}</li>)}</ul>
        )}
      </div>
    );
  }
  if (Array.isArray(output)) return <p className="text-xs text-neutral-500">{output.length} hasil</p>;
  return null;
}

export function ChatToolCard({
  part,
  toolName,
  onApprove,
}: {
  part: AnyToolPart;
  toolName: string;
  onApprove: (approvalId: string, approved: boolean) => void;
}) {
  const label = TOOL_LABELS[toolName] ?? toolName;
  const input = asObject(part.input);

  if (part.state === "approval-requested" && !part.approval.isAutomatic) {
    return (
      <div className="rounded-md border border-brand-soft bg-brand-tint p-3">
        <p className="flex items-center gap-2 text-sm font-semibold text-neutral-900">
          <ShieldQuestion className="h-4 w-4 text-brand-deep" /> Butuh persetujuan: {label}
        </p>
        <p className="mt-1 text-sm text-neutral-700">
          {typeof input.title === "string" ? `"${input.title}"` : String(input.postId ?? "")}
          {typeof input.publishAt === "string" &&
            ` → ${new Intl.DateTimeFormat("id-ID", { dateStyle: "full", timeStyle: "short", timeZone: "Asia/Jakarta" }).format(new Date(input.publishAt))}`}
        </p>
        <div className="mt-2 flex gap-2">
          <button type="button" onClick={() => onApprove(part.approval.id, true)} className="inline-flex items-center gap-1 rounded-md bg-brand px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-deep">
            <Check className="h-3.5 w-3.5" /> Setujui
          </button>
          <button type="button" onClick={() => onApprove(part.approval.id, false)} className="inline-flex items-center gap-1 rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-700 hover:bg-neutral-50">
            <X className="h-3.5 w-3.5" /> Tolak
          </button>
        </div>
      </div>
    );
  }

  const running = part.state === "input-streaming" || part.state === "input-available" || part.state === "approval-responded";
  const failed = part.state === "output-error" || part.state === "output-denied" || asObject(part.state === "output-available" ? part.output : null).ok === false;

  return (
    <details className="group rounded-md border border-neutral-200 bg-white">
      <summary className="flex cursor-pointer list-none items-center gap-2 px-3 py-2 text-xs">
        {running ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin text-brand" />
        ) : failed ? (
          <XCircle className="h-3.5 w-3.5 text-red-500" />
        ) : (
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
        )}
        <span className="font-semibold text-neutral-800">{label}</span>
        {typeof input.query === "string" && <span className="truncate text-neutral-500">&quot;{input.query}&quot;</span>}
        {typeof input.title === "string" && toolName !== "searchImages" && <span className="truncate text-neutral-500">{input.title}</span>}
        {part.state === "output-denied" && <span className="text-neutral-500">— ditolak</span>}
        <ChevronDown className="ml-auto h-3.5 w-3.5 shrink-0 text-neutral-400 transition group-open:rotate-180" />
      </summary>
      <div className="space-y-2 border-t border-neutral-100 px-3 py-2">
        {part.state === "output-available" && <OutputSummary toolName={toolName} output={part.output} />}
        {part.state === "output-error" && <p className="text-xs text-red-600">{part.errorText}</p>}
        <pre className="max-h-48 overflow-auto rounded bg-neutral-50 p-2 text-[11px] text-neutral-600">
          {JSON.stringify(part.state === "output-available" ? { input: part.input, output: part.output } : { input: part.input }, (key, value) =>
            key === "content" && typeof value === "string" && value.length > 400 ? `${value.slice(0, 400)}… (${value.length} karakter)` : value, 2)}
        </pre>
      </div>
    </details>
  );
}
