"use client";

import React from "react";
import { motion } from "framer-motion";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import type { Project } from "@prisma/client";
import type { PortfolioIntroConfig } from "@/lib/portfolio-config";

const FALLBACK_PORTFOLIO_DATA = [
  {
    category: "E-Commerce",
    title: "UMKM Storefront",
    src: "/images/homepage-slider-reference.png",
    content: (
      <div className="text-neutral-600 dark:text-neutral-400">
        <p className="mb-4">
          Storefront cepat untuk katalog produk, promo, checkout ringan, dan jalur kontak WhatsApp agar calon pembeli tidak berhenti di tengah jalan.
        </p>
        <div className="flex gap-2 mt-4 text-xs font-semibold">
          <span className="px-3 py-1 bg-neutral-200 dark:bg-neutral-800 rounded-full">Next.js</span>
          <span className="px-3 py-1 bg-neutral-200 dark:bg-neutral-800 rounded-full">WhatsApp</span>
        </div>
      </div>
    ),
  },
  {
    category: "Web Application",
    title: "Dashboard Operasional",
    src: "/images/image.png",
    content: (
      <div className="text-neutral-600 dark:text-neutral-400">
        <p className="mb-4">Dashboard internal untuk monitoring stok, transaksi, dan laporan harian agar owner bisa mengambil keputusan lebih cepat.</p>
        <div className="flex gap-2 mt-4 text-xs font-semibold">
          <span className="px-3 py-1 bg-neutral-200 dark:bg-neutral-800 rounded-full">React</span>
          <span className="px-3 py-1 bg-neutral-200 dark:bg-neutral-800 rounded-full">Prisma</span>
        </div>
      </div>
    ),
  },
  {
    category: "Company Profile",
    title: "Profil Bisnis Profesional",
    src: "/images/homepage-slider-reference.png",
    content: (
      <div className="text-neutral-600 dark:text-neutral-400">
        <p className="mb-4">Website representasi brand dengan struktur layanan, portfolio, testimoni, dan CTA yang jelas untuk meningkatkan trust pengunjung.</p>
        <div className="flex gap-2 mt-4 text-xs font-semibold">
          <span className="px-3 py-1 bg-neutral-200 dark:bg-neutral-800 rounded-full">SEO</span>
          <span className="px-3 py-1 bg-neutral-200 dark:bg-neutral-800 rounded-full">Tailwind</span>
        </div>
      </div>
    ),
  },
  {
    category: "Landing Page",
    title: "Landing Page Campaign",
    src: "/images/image.png",
    content: (
      <div className="text-neutral-600 dark:text-neutral-400">
        <p className="mb-4">Halaman campaign dengan pesan yang fokus, section benefit, social proof, dan CTA yang disusun untuk mengubah visitor menjadi lead.</p>
        <div className="flex gap-2 mt-4 text-xs font-semibold">
          <span className="px-3 py-1 bg-neutral-200 dark:bg-neutral-800 rounded-full">Next.js</span>
          <span className="px-3 py-1 bg-neutral-200 dark:bg-neutral-800 rounded-full">Copywriting</span>
        </div>
      </div>
    ),
  },
];

type PortfolioSectionProps = {
  intro: PortfolioIntroConfig;
  projects: Project[];
};

function projectToCard(project: Project) {
  return {
    category: project.link ? "Live Project" : "Project",
    title: project.title,
    src: project.imageUrl,
    content: (
      <div className="text-neutral-600 dark:text-neutral-400">
        <p className="mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mt-4 text-xs font-semibold">
          <span className="px-3 py-1 bg-neutral-200 dark:bg-neutral-800 rounded-full">{project.link ? "Published" : "Draft"}</span>
          {project.gifUrl ? <span className="px-3 py-1 bg-neutral-200 dark:bg-neutral-800 rounded-full">Animated Preview</span> : null}
        </div>
      </div>
    ),
  };
}

export const PortfolioSection = ({ intro, projects }: PortfolioSectionProps) => {
  const data = projects.length ? projects.map(projectToCard) : FALLBACK_PORTFOLIO_DATA;
  const cards = data.map((card, index) => <Card key={card.title} card={card} index={index} />);

  return (
    <section id="portfolio" className="relative w-full py-24 md:py-32 overflow-hidden bg-[#f5f3ff]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-8 pt-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="flex flex-col mb-4"
        >
          <p className="text-xs font-bold tracking-widest text-indigo-600 uppercase mb-4">{intro.eyebrow}</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 mb-6">{intro.heading}</h2>
          <div className="max-w-2xl">
            <TextGenerateEffect words={intro.description} className="text-base md:text-lg text-neutral-600 font-normal leading-relaxed" />
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="w-full"
      >
        <Carousel items={cards} />
      </motion.div>
    </section>
  );
};
