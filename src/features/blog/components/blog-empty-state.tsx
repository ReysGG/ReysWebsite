import { FileText } from "lucide-react";

export function BlogEmptyState() {
  return <div className="rounded-3xl border border-brand-soft bg-white/85 p-12 text-center shadow-sm"><FileText className="mx-auto mb-4 h-10 w-10 text-brand-soft" /><h2 className="text-2xl font-bold text-neutral-950">Artikel tidak ditemukan</h2><p className="mt-2 text-sm text-neutral-500">Coba ubah kata kunci atau filter yang digunakan.</p></div>;
}
