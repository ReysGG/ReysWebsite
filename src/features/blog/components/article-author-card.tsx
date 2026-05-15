import { User } from "lucide-react";

export function ArticleAuthorCard({ author, role }: { author: string | null; role?: string }) {
  const name = author && author.trim() ? author : "WebServices Team";
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <section className="mt-10 rounded-2xl border border-indigo-100 bg-white/90 p-6 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-lg font-bold text-white">
          {initials || <User className="h-6 w-6" />}
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">Penulis</p>
          <p className="mt-0.5 text-base font-bold text-neutral-900">{name}</p>
          <p className="mt-0.5 text-sm text-neutral-600">
            {role || "Tim editorial WebServices, menulis tentang web, SEO, dan strategi bisnis digital."}
          </p>
        </div>
      </div>
    </section>
  );
}
