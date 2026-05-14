import Link from "next/link";
import {
  IconArrowRight,
  IconDotsVertical,
  IconEdit,
  IconExternalLink,
  IconEye,
  IconFilter,
  IconLayoutDashboard,
  IconPhoto,
  IconPlus,
  IconSearch,
  IconSparkles,
  IconTrash,
} from "@tabler/icons-react";
import { getPortfolioProjects } from "@/lib/portfolio-config";

const categories = ["Semua", "Live Project", "Draft"];

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("id-ID", { day: "2-digit", month: "short", year: "numeric" }).format(date);
}

export default async function ManagePortfolioPage() {
  const projects = await getPortfolioProjects();
  const publishedCount = projects.filter((item) => Boolean(item.link)).length;
  const draftCount = projects.length - publishedCount;
  const featuredCount = projects.filter((item) => Boolean(item.gifUrl)).length;
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
              <IconLayoutDashboard size={16} />
              Edit Intro Portfolio
            </Link>
            <Link href="/#portfolio" target="_blank" className="inline-flex items-center gap-2 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-50">
              <IconExternalLink size={16} />
              Preview Website
            </Link>
            <button className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-700">
              <IconPlus size={16} />
              Tambah Project
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Total Project", value: projects.length, icon: IconPhoto, tone: "text-neutral-700", hint: "Data real dari Project" },
          { label: "Published", value: publishedCount, icon: IconEye, tone: "text-indigo-700", hint: "Project punya link" },
          { label: "Draft", value: draftCount, icon: IconEdit, tone: "text-amber-700", hint: "Project tanpa link" },
          { label: "Animated", value: featuredCount, icon: IconSparkles, tone: "text-violet-700", hint: "Punya GIF preview" },
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
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="relative flex-1">
                <IconSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
                <input placeholder="Cari project..." className="w-full rounded-md border border-neutral-200 bg-neutral-50 py-2 pl-9 pr-3 text-sm outline-none transition-colors focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100" />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button className="inline-flex items-center gap-2 rounded-md border border-neutral-200 px-3 py-2 text-sm font-semibold text-neutral-600 hover:bg-neutral-50">
                  <IconFilter size={15} />
                  Filter
                </button>
                {categories.map((category) => (
                  <button key={category} className={category === "Semua" ? "rounded-md bg-indigo-600 px-3 py-2 text-xs font-semibold text-white" : "rounded-md border border-neutral-200 px-3 py-2 text-xs font-semibold text-neutral-600 hover:bg-neutral-50"}>
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

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
                    {item.link ? <Link href={item.link} target="_blank" className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-neutral-200 bg-white text-neutral-500 transition-colors hover:bg-neutral-50 hover:text-neutral-900" title="Preview"><IconExternalLink size={15} /></Link> : null}
                    <button className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-neutral-200 bg-white text-neutral-500 transition-colors hover:bg-neutral-50 hover:text-neutral-900" title="Edit"><IconEdit size={15} /></button>
                    <button className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-red-200 bg-red-50 text-red-500 transition-colors hover:bg-red-100" title="Hapus"><IconTrash size={15} /></button>
                    <button className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-neutral-200 bg-white text-neutral-400 transition-colors hover:bg-neutral-50 hover:text-neutral-900" title="More"><IconDotsVertical size={15} /></button>
                  </div>
                </article>
              );
            }) : (
              <div className="p-10 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 text-indigo-600"><IconPhoto size={22} /></div>
                <h2 className="mt-4 text-lg font-bold text-neutral-900">Belum ada project portfolio</h2>
                <p className="mt-1 text-sm text-neutral-500">Tambahkan data ke tabel Project untuk menampilkannya di sini dan di landing page.</p>
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
                  {selectedProject.link ? <Link href={selectedProject.link} target="_blank" className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-white px-4 py-2.5 text-sm font-bold text-neutral-950">Lihat Detail <IconArrowRight size={15} /></Link> : null}
                </div>
              </div>
            ) : null}
          </div>
        </aside>
      </div>
    </div>
  );
}
