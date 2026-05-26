import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BarChart3, BriefcaseBusiness, LineChart, ShoppingBag } from "lucide-react";
import type { Project } from "@prisma/client";
import type { PortfolioIntroConfig } from "@/lib/portfolio-config";

const SOLUTION_EXAMPLES = [
  {
    category: "Contoh Scope",
    title: "UMKM Storefront",
    description:
      "Storefront cepat untuk katalog produk, promo, checkout ringan, dan jalur kontak WhatsApp agar calon pembeli tidak berhenti di tengah jalan.",
    tags: ["Katalog", "WhatsApp", "SEO awal"],
    icon: ShoppingBag,
  },
  {
    category: "Contoh Scope",
    title: "Dashboard Operasional",
    description:
      "Dashboard internal untuk monitoring stok, transaksi, dan laporan harian agar owner bisa mengambil keputusan lebih cepat.",
    tags: ["Admin panel", "Laporan", "Workflow"],
    icon: BarChart3,
  },
  {
    category: "Contoh Scope",
    title: "Profil Bisnis Profesional",
    description:
      "Website representasi brand dengan struktur layanan, portfolio, testimoni, dan CTA yang jelas untuk meningkatkan trust pengunjung.",
    tags: ["Trust", "Layanan", "CTA"],
    icon: BriefcaseBusiness,
  },
  {
    category: "Contoh Scope",
    title: "Landing Page Campaign",
    description:
      "Halaman campaign dengan pesan yang fokus, section benefit, social proof, dan CTA yang disusun untuk mengubah visitor menjadi lead.",
    tags: ["Campaign", "Copywriting", "Lead"],
    icon: LineChart,
  },
];

type PortfolioSectionProps = {
  intro: PortfolioIntroConfig;
  projects: Project[];
};

type PortfolioCardData = {
  category: string;
  title: string;
  src: string;
  description: string;
  tags: string[];
  href?: string | null;
};

function projectToCard(project: Project): PortfolioCardData {
  return {
    category: project.link ? "Live Project" : "Project",
    title: project.title,
    src: project.imageUrl || "/images/homepage-slider-reference.png",
    description: project.description,
    tags: [project.link ? "Published" : "Draft", project.gifUrl ? "Animated Preview" : "Case Study"].filter(Boolean),
    href: project.link,
  };
}

function PortfolioCard({
  project,
  actionLabel,
}: {
  project: PortfolioCardData;
  actionLabel: string;
}) {
  const card = (
    <article className="group flex h-full flex-col rounded-lg border border-slate-200 bg-white p-6 transition-colors duration-300 hover:border-blue-400">
      <div className="relative mb-7 aspect-video overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
        <Image
          src={project.src}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        <span className="rounded-md bg-blue-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-700">
          {project.category}
        </span>
        {project.tags.slice(0, 2).map((tag) => (
          <span key={tag} className="rounded-md bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
            {tag}
          </span>
        ))}
      </div>

      <h3 className="text-xl font-bold leading-snug text-slate-950">{project.title}</h3>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">{project.description}</p>

      <span className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-blue-600 transition-colors duration-200 group-hover:text-slate-950">
        {actionLabel}
        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
      </span>
    </article>
  );

  if (!project.href) return card;

  return (
    <Link href={project.href} target="_blank" rel="noopener noreferrer" className="block h-full">
      {card}
    </Link>
  );
}

function SolutionExampleCard({ example }: { example: (typeof SOLUTION_EXAMPLES)[number] }) {
  const Icon = example.icon;

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 transition-colors duration-300 hover:border-blue-400 md:p-6">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
        <Icon className="h-6 w-6" />
      </div>
      <span className="rounded-md bg-blue-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-700">
        {example.category}
      </span>
      <h3 className="mt-4 text-lg font-bold leading-snug text-slate-950">{example.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">{example.description}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {example.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}

export const PortfolioSection = ({ intro, projects }: PortfolioSectionProps) => {
  const hasPublishedProjects = projects.length > 0;

  if (!hasPublishedProjects) {
    return (
      <section id="portfolio" className="w-full bg-[#f7f9fb] py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="mb-10 max-w-3xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-wider text-blue-600">
              Contoh solusi
            </p>
            <h2 className="text-3xl font-bold leading-tight text-slate-950 md:text-5xl">
              Tidak semua project bisa dipublikasikan. Scope tetap bisa dinilai sejak awal.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 md:text-lg">
              Saat portfolio publik belum tersedia, cara paling aman menilai kerja sama adalah dari contoh scope, staging link, dan deliverable yang jelas sebelum development.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {SOLUTION_EXAMPLES.map((example) => (
              <SolutionExampleCard key={example.title} example={example} />
            ))}
          </div>

          <Link
            href="#cta"
            className="mt-8 inline-flex items-center gap-2 rounded-md border border-blue-200 bg-white px-5 py-3 text-sm font-bold text-blue-700 transition-colors hover:border-blue-400 hover:bg-blue-50"
          >
            Bahas scope project kamu
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    );
  }

  const data = projects.map(projectToCard);
  const filters = ["All", "Web App", "Landing Page", "Custom System"];

  return (
    <section id="portfolio" className="w-full bg-[#f7f9fb] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="mb-12 max-w-3xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-wider text-blue-600">
            {intro.eyebrow}
          </p>
          <h2 className="text-3xl font-bold leading-tight text-slate-950 md:text-5xl">
            {intro.heading}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-slate-600 md:text-lg">
            {intro.description}
          </p>
        </div>

        <div className="mb-10 flex flex-wrap gap-3">
          {filters.map((filter, index) => (
            <button
              key={filter}
              type="button"
              className={
                index === 0
                  ? "rounded-md border border-blue-600 bg-blue-600 px-5 py-2.5 text-sm font-bold text-white"
                  : "rounded-md border border-slate-300 bg-white px-5 py-2.5 text-sm font-bold text-slate-600 transition-colors duration-200 hover:border-blue-400 hover:text-blue-600"
              }
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {data.slice(0, 4).map((project) => (
            <PortfolioCard key={project.title} project={project} actionLabel="Lihat detail" />
          ))}
        </div>
      </div>
    </section>
  );
};
