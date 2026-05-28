import { FileText, Eye, Send, Pencil } from "lucide-react";
import type { Post } from "@prisma/client";

export function BlogDashboardStats({ posts }: { posts: Post[] }) {
  const stats = [
    { label: "Total Artikel", value: posts.length, icon: FileText },
    { label: "Published", value: posts.filter((p) => p.published).length, icon: Send },
    { label: "Draft", value: posts.filter((p) => !p.published).length, icon: Pencil },
    { label: "Views", value: posts.reduce((n, p) => n + (p.views || 0), 0), icon: Eye },
  ];
  return <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{stats.map(({ label, value, icon: Icon }) => <div key={label} className="rounded-md border border-neutral-200 bg-white p-5"><div className="flex items-center justify-between"><p className="text-xs font-medium text-neutral-500">{label}</p><span className="rounded-md bg-[#fffcc9] p-2 text-[#ff8a00]"><Icon className="h-4 w-4" /></span></div><p className="mt-3 text-2xl font-bold text-neutral-900">{value}</p></div>)}</div>;
}
