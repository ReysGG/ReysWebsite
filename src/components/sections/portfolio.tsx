import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BarChart3, BriefcaseBusiness, LineChart, ShoppingBag } from "lucide-react";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import type { Project } from "@prisma/client";
import type { PortfolioIntroConfig } from "@/lib/portfolio-config";
import { DEFAULT_SOLUTIONS_CONFIG, type SolutionsConfig } from "@/lib/solutions-config";

const SOLUTION_EXAMPLES = [
  {
    title: "UMKM Storefront",
    description:
      "Storefront cepat untuk katalog produk, promo, checkout ringan, dan jalur kontak WhatsApp agar calon pembeli tidak berhenti di tengah jalan.",
    tags: ["Katalog", "WhatsApp", "SEO awal"],
    icon: ShoppingBag,
    className: "col-span-3 lg:col-span-1",
    media: "/gif/Create_a_clean_modern_ui_animation_for_a_smal.gif",
  },
  {
    title: "Dashboard Operasional",
    description:
      "Dashboard internal untuk monitoring stok, transaksi, dan laporan harian agar owner bisa mengambil keputusan lebih cepat.",
    tags: ["Admin panel", "Laporan", "Workflow"],
    icon: BarChart3,
    className: "col-span-3 lg:col-span-2",
    media: "/gif/Create_a_clean_operations_dashboard_ui_animat.gif",
  },
  {
    title: "Profil Bisnis Profesional",
    description:
      "Website representasi brand dengan struktur layanan, portfolio, testimoni, dan CTA yang jelas untuk meningkatkan trust pengunjung.",
    tags: ["Trust", "Layanan", "CTA"],
    icon: BriefcaseBusiness,
    className: "col-span-3 lg:col-span-2",
    media: "/gif/Create_a_clean_company_profile_website_animat.gif",
  },
  {
    title: "Landing Page Campaign",
    description:
      "Halaman campaign dengan pesan yang fokus, section benefit, social proof, dan CTA yang disusun untuk mengubah visitor menjadi lead.",
    tags: ["Campaign", "Copywriting", "Lead"],
    icon: LineChart,
    className: "col-span-3 lg:col-span-1",
    media: "/gif/Create_a_clean_landing_page_campaign_ui_anima.gif",
  },
];

type PortfolioSectionProps = {
  intro: PortfolioIntroConfig;
  projects: Project[];
  solutions?: SolutionsConfig;
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
    <article className="group flex h-full flex-col rounded-lg border border-slate-200 bg-white p-6 transition-colors duration-300 hover:border-[#ffcd80]">
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
        <span className="rounded-md bg-[#fffcc9] px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#ff8a00]">
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

      <span className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#ff8a00] transition-colors duration-200 group-hover:text-slate-950">
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

function SolutionExampleCard({ example, fallback }: { example: SolutionsConfig["items"][number]; fallback: (typeof SOLUTION_EXAMPLES)[number] }) {
  return (
    <BentoCard
      name={example.title}
      description={example.description}
      Icon={fallback.icon}
      href="#cta"
      cta="Bahas scope"
      className={[
        "border border-slate-200 bg-white text-slate-950 [&_svg]:text-[#ff8a00] [&_h3]:font-bold [&_h3]:text-slate-950 [&_p]:text-slate-600 [&_a]:text-[#ff8a00]",
        fallback.className,
      ].join(" ")}
      background={
        example.media ? (
          <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <img
              src={example.media}
              alt=""
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-linear-to-t from-white via-white/30 to-transparent" />
          </div>
        ) : (
          <div />
        )
      }
    />
  );
}

export const PortfolioSection = ({ intro, projects, solutions }: PortfolioSectionProps) => {
  const hasPublishedProjects = projects.length > 0;
  const solutionContent = solutions ?? DEFAULT_SOLUTIONS_CONFIG;

  if (!hasPublishedProjects) {
    return (
      <section id="portfolio" className="w-full bg-[#f7f9fb] py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="mb-12 max-w-3xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-wider text-[#ff8a00]">
              {solutionContent.eyebrow}
            </p>
            <h2 className="text-3xl font-bold leading-tight text-slate-950 md:text-5xl">
              {solutionContent.heading}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 md:text-lg">
              {solutionContent.description}
            </p>
          </div>

          <BentoGrid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {solutionContent.items.slice(0, 4).map((example, index) => (
              <SolutionExampleCard key={example.title} example={example} fallback={SOLUTION_EXAMPLES[index] ?? SOLUTION_EXAMPLES[0]} />
            ))}
          </BentoGrid>
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
          <p className="mb-4 text-xs font-bold uppercase tracking-wider text-[#ff8a00]">
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
                  ? "rounded-md border border-[#ff8a00] bg-[#ff8a00] px-5 py-2.5 text-sm font-bold text-white"
                  : "rounded-md border border-slate-300 bg-white px-5 py-2.5 text-sm font-bold text-slate-600 transition-colors duration-200 hover:border-[#ffcd80] hover:text-[#ff8a00]"
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
