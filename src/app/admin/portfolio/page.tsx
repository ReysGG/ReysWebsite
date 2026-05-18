import Link from "next/link";
import { ArrowRight, Edit, ExternalLink, Eye, LayoutDashboard, ImageIcon, Plus, Search, Sparkles } from 'lucide-react';
import { getPortfolioProjects } from "@/lib/portfolio-config";
import { DeleteProjectButton } from "@/features/admin/components/portfolio/delete-project-button";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("id-ID", { day: "2-digit", month: "short", year: "numeric" }).format(date);
}

export default async function ManagePortfolioPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q.trim().toLowerCase() : "";
  const category = typeof params.category === "string" ? params.category : "all";

  const allProjects = await getPortfolioProjects();

  // Filter
  let projects = allProjects;
  if (category === "live") {
    projects = projects.filter((p) => Boolean(p.link));
  } else if (category === "draft") {
    projects = projects.filter((p) => !p.link);
  }
  if (q) {
    projects = projects.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }

  const publishedCount = allProjects.filter((item) => Boolean(item.link)).length;
  const draftCount = allProjects.length - publishedCount;
  const featuredCount = allProjects.filter((item) => Boolean(item.gifUrl)).length;
  const selectedProject = projects[0];

  return (
    <div className="space-y-6">
      <div className="sticky top-0 z-30 rounded-md border border-neutral-200 bg-white/95 p-4 shadow-none backdrop-blur">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">Portfolio Content</p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-neutral-900">Manage Portfolio</h1>
            <p className="mt-1 text-sm text-neutral-500">Kurasi project dari tabel Project dan preview kartu portfolio dari satu tempat.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/admin/portfolio/hero" className="inline-flex items-center gap-2 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-50">
              <LayoutDashboard size={16} />
              Edit Intro Portfolio
            </Link>
            <Link href="/#portfolio" target="_blank" className="inline-flex items-center gap-2 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-50">
              <ExternalLink size={16} />
              Preview Website
            </Link>
            <Link href="/admin/portfolio/add" className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-700">
              <Plus size={16} />
              Tambah Project
            </Link>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Total Project", value: allProjects.length, icon: ImageIcon, tone: "text-neutral-700", hint: "Data real dari Project" },
          { label: "Published", value: publishedCount, icon: Eye, tone: "text-indigo-700", hint: "Project punya link" },
          { label: "Draft", value: draftCount, icon: Edit, tone: "text-amber-700", hint: "Project tanpa link" },
          { label: "Animated", value: featuredCount, icon: Sparkles, tone: "text-violet-700", hint: "Punya GIF preview" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-md border border-neutral-200 bg-white p-5 shadow-none">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-3xl font-bold tracking-tight text-neutral-900">{stat.value}</p>
                <p className="mt-1 text-sm font-semibold text-neutral-700">{stat.label}</p>
                <p className="mt-1 text-xs text-neutral-400">{stat.hint}</p>
              </div>
              <div className="rounded-md border border-neutral-200 bg-neutral-50 p-2">
                <stat.icon className={stat.tone} size={18} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
        <section className="overflow-hidden rounded-md border border-neutral-200 bg-white shadow-none">
          <div className="border-b border-neutral-200 p-4">
            <form className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
                <input
                  name="q"
                  defaultValue={q}
                  placeholder="Cari project..."
                  className="w-full rounded-md border border-neutral-200 bg-neutral-50 py-2 pl-9 pr-3 text-sm outline-none transition-colors focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { key: "all", label: "Semua" },
                  { key: "live", label: "Live Project" },
                  { key: "draft", label: "Draft" },
                ].map((cat) => (
                  <button
                    key={cat.key}
                    type="submit"
                    name="category"
                    value={cat.key}
                    className={category === cat.key
                      ? "rounded-md bg-indigo-600 px-3 py-2 text-xs font-semibold text-white"
                      : "rounded-md border border-neutral-200 px-3 py-2 text-xs font-semibold text-neutral-600 hover:bg-neutral-50"
                    }
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </form>
          </div>

          {projects.length > 0 && (
            <div className="border-b border-neutral-100 px-4 py-3">
              <p className="text-xs text-neutral-500">
                Menampilkan {projects.length} dari {allProjects.length} project
                {q && <span> · Pencarian: &quot;{q}&quot;</span>}
              </p>
            </div>
          )}

          <div className="divide-y divide-neutral-100">
            {projects.length ? projects.map((item) => {
              const status = item.link ? "Published" : "Draft";
              const tags = [item.link ? "Live Project" : "Draft", item.gifUrl ? "Animated Preview" : "Static Preview"];
              return (
                <article key={item.id} className="grid gap-4 p-4 transition-colors hover:bg-neutral-50 lg:grid-cols-[180px_minmax(0,1fr)_auto] lg:items-center">
                  <div className="relative h-32 overflow-hidden rounded-md border border-neutral-200 bg-neutral-100 lg:h-24">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover" />
                    {item.gifUrl ? <span className="absolute left-2 top-2 rounded-md bg-indigo-600 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-white">Animated</span> : null}
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="truncate text-base font-bold text-neutral-900">{item.title}</h2>
                      <span className={status === "Published" ? "rounded-md border border-indigo-200 bg-indigo-50 px-2 py-0.5 text-xs font-semibold text-indigo-700" : "rounded-md border border-neutral-200 bg-neutral-100 px-2 py-0.5 text-xs font-semibold text-neutral-500"}>{status}</span>
                    </div>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-neutral-400">Project · Updated {formatDate(item.updatedAt)}</p>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-neutral-600">{item.description}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {tags.map((tech) => <span key={tech} className="rounded-md bg-neutral-100 px-2 py-1 text-xs font-semibold text-neutral-600">{tech}</span>)}
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2">
                    {item.link ? <Link href={item.link} target="_blank" className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-neutral-200 bg-white text-neutral-500 transition-colors hover:bg-neutral-50 hover:text-neutral-900" title="Preview"><ExternalLink size={15} /></Link> : null}
                    <Link href={`/admin/portfolio/${item.id}/edit`} className="inline-flex items-center gap-1.5 rounded-md border border-neutral-200 bg-white px-3 py-2 text-xs font-semibold text-neutral-700 transition-colors hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"><Edit size={14} /> Edit</Link>
                    <DeleteProjectButton id={item.id} />
                  </div>
                </article>
              );
            }) : (
              <div className="p-10 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 text-indigo-600"><ImageIcon size={22} /></div>
                <h2 className="mt-4 text-lg font-bold text-neutral-900">
                  {q || category !== "all" ? "Tidak ada project ditemukan" : "Belum ada project portfolio"}
                </h2>
                <p className="mt-1 text-sm text-neutral-500">
                  {q || category !== "all" ? "Coba ubah filter atau kata kunci pencarian." : "Tambahkan data ke tabel Project untuk menampilkannya di sini dan di landing page."}
                </p>
              </div>
            )}
          </div>
        </section>

        <aside className="space-y-4">
          <div className="rounded-md border border-neutral-200 bg-white p-5 shadow-none">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">Live Card Preview</p>
                <h2 className="mt-2 text-lg font-bold text-neutral-900">{selectedProject?.title ?? "Belum ada project"}</h2>
              </div>
              <span className="rounded-md bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700">Real data</span>
            </div>

            {selectedProject ? (
              <div className="mt-5 overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-950">
                <div className="relative h-48 bg-neutral-900">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={selectedProject.imageUrl} alt={`${selectedProject.title} preview`} className="h-full w-full object-cover opacity-90" />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/10 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-xs font-semibold uppercase tracking-widest text-indigo-200">{selectedProject.link ? "Live Project" : "Draft"}</p>
                    <h3 className="mt-1 text-xl font-bold text-white">{selectedProject.title}</h3>
                  </div>
                </div>
                <div className="space-y-4 p-4">
                  <p className="text-sm leading-relaxed text-neutral-300">{selectedProject.description}</p>
                  {selectedProject.link ? <Link href={selectedProject.link} target="_blank" className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-white px-4 py-2.5 text-sm font-bold text-neutral-950">Lihat Detail <ArrowRight size={15} /></Link> : null}
                </div>
              </div>
            ) : null}
          </div>
        </aside>
      </div>
    </div>
  );
}
