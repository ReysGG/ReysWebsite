"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FlipWords } from "@/components/ui/flip-words";
import type { SiteConfig } from "@/lib/site-config";

type WorkflowContent = SiteConfig["workflow"];

const workflowSlides = [
  {
    step: "01",
    title: "Discovery Call",
    description: "Bahas kebutuhan bisnis, target customer, fitur wajib, dan contoh referensi agar arah project jelas.",
    src: "/Asset/Modern SaaS website process illustration.png",
  },
  {
    step: "02",
    title: "Scope & Estimate",
    description: "Halaman, fitur, timeline, harga, dan deliverable dirapikan supaya estimasi project lebih transparan.",
    src: "/Asset/Modern web agency scope and estimate illustration.png",
  },
  {
    step: "03",
    title: "Design & Build",
    description: "Desain dan development berjalan dengan preview staging link agar progress bisa dicek.",
    src: "/Asset/Modern design and development process illustration.png",
  },
  {
    step: "04",
    title: "Launch & Handover",
    description: "Deploy ke domain, serah terima akses admin, dokumentasi singkat, dan support awal.",
    src: "/Asset/Modern website launch and handover illustration,.png",
  },
] as const;

function WorkflowImageSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = workflowSlides[activeIndex];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % workflowSlides.length);
    }, 4000);

    return () => window.clearInterval(timer);
  }, []);

  const goToPrevious = () => {
    setActiveIndex((current) => (current - 1 + workflowSlides.length) % workflowSlides.length);
  };

  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % workflowSlides.length);
  };

  return (
    <div className="w-full max-w-5xl overflow-hidden rounded-lg border border-slate-200 bg-white p-3 shadow-sm md:p-4">
      <div className="relative aspect-video overflow-hidden rounded-lg bg-slate-950">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide.src}
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -28 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={activeSlide.src}
              alt={`${activeSlide.title} - preview proses kerja Build With Reys`}
              fill
              sizes="(max-width: 768px) 100vw, 960px"
              className="object-cover"
              priority={activeIndex === 0}
            />
          </motion.div>
        </AnimatePresence>

        <div className="pointer-events-none absolute inset-0 z-10 bg-linear-to-t from-black/72 via-black/10 to-black/20" />

        <div className="absolute left-4 top-4 z-20 rounded-md border border-white/15 bg-black/45 px-3 py-2 text-xs font-bold uppercase tracking-wider text-[#fffcc9] backdrop-blur md:left-5 md:top-5">
          {activeSlide.step} / {activeSlide.title}
        </div>

        <div className="absolute bottom-5 left-5 z-20 max-w-2xl pr-16 md:bottom-7 md:left-7">
          <h3 className="text-xl font-bold tracking-tight text-white md:text-3xl">
            {activeSlide.title}
          </h3>
          <p className="mt-2 max-w-xl text-sm leading-6 text-white/78 md:text-base">
            {activeSlide.description}
          </p>
        </div>

        <button
          type="button"
          onClick={goToPrevious}
          aria-label="Slide sebelumnya"
          className="absolute left-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-md border border-white/15 bg-black/45 text-white transition hover:bg-[#ff8a00] md:left-4"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={goToNext}
          aria-label="Slide berikutnya"
          className="absolute right-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-md border border-white/15 bg-black/45 text-white transition hover:bg-[#ff8a00] md:right-4"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <div className="absolute bottom-5 right-5 z-20 flex gap-2 rounded-md border border-white/10 bg-black/40 px-3 py-2 backdrop-blur md:bottom-7 md:right-7">
          {workflowSlides.map((slide, index) => (
            <button
              key={slide.step}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Tampilkan slide ${slide.step}`}
              className={[
                "h-2.5 rounded-full transition-all",
                activeIndex === index ? "w-8 bg-[#ff8a00]" : "w-2.5 bg-white/45 hover:bg-[#ffcd80]",
              ].join(" ")}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export const WorkflowSection = ({ content }: { content: WorkflowContent }) => {
  return (
    <section id="workflow" className="w-full bg-[#f7f9fb] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-12 max-w-3xl"
        >
          <p className="mb-4 text-xs font-bold uppercase tracking-wider text-[#ff8a00]">
            {content.eyebrow}
          </p>
          <h2 className="max-w-4xl text-3xl font-bold leading-tight text-slate-950 md:text-5xl">
            {content.headingPrefix}{" "}
            <span className="text-[#ff8a00]">
              <FlipWords words={content.rotatingWords} className="px-0 font-bold text-[#ff8a00]" />
            </span>
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
            {content.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="w-full"
        >
          <WorkflowImageSlider />
        </motion.div>
      </div>
    </section>
  );
};
