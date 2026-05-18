"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { FlipWords } from "@/components/ui/flip-words";
import type { SiteConfig } from "@/lib/site-config";

type HeroContent = SiteConfig["hero"];

export const HeroSection = ({ content }: { content: HeroContent }) => {
  const scopeItems = [
    content.scopePreview.pages,
    content.scopePreview.features,
    content.scopePreview.timeline,
    content.scopePreview.deliverable,
  ].filter(Boolean);

  return (
    <section className="relative w-full overflow-hidden bg-[#f7f9fb] pt-32 pb-20 antialiased md:pt-36 md:pb-28">
      <div className="pointer-events-none absolute inset-0 hidden md:block">
        <svg
          className="absolute right-0 top-0 h-[520px] w-[520px] text-slate-950 opacity-[0.035]"
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.2"
        >
          {[12, 24, 36, 48, 60, 72].map((n) => (
            <polyline key={n} points={`${n},-8 ${n},${100 - n} 108,${100 - n}`} />
          ))}
        </svg>
        <svg
          className="absolute -left-20 bottom-0 h-[420px] w-[420px] text-slate-950 opacity-[0.035]"
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.2"
        >
          {[18, 30, 42, 54, 66].map((n) => (
            <polyline key={n} points={`-8,${n} ${100 - n},${n} ${100 - n},108`} />
          ))}
        </svg>
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 px-6 md:px-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,1fr)] lg:items-center">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-6 inline-flex items-center gap-3 rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm"
          >
            <span className="h-2 w-2 rounded-full bg-blue-600" />
            {content.trustText}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease: "easeOut" }}
            className="text-4xl font-bold leading-[1.08] text-slate-950 md:text-6xl"
          >
            {content.headlinePrefix}
            <br />
            <span className="inline-flex min-h-[1.15em] min-w-[280px] text-blue-600 sm:min-w-[360px] md:min-w-[480px]">
              <FlipWords className="px-0 font-bold text-blue-600" words={content.rotatingWords} />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.16, ease: "easeOut" }}
            className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 md:text-lg"
          >
            {content.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.24, ease: "easeOut" }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <Link
              href="#cta"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 px-7 py-4 text-sm font-bold text-white transition-colors duration-200 hover:bg-blue-700"
            >
              {content.primaryCta}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#workflow"
              className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-7 py-4 text-sm font-bold text-slate-950 transition-colors duration-200 hover:border-blue-300 hover:bg-slate-50"
            >
              {content.secondaryCta}
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 36 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.18, ease: "easeOut" }}
          className="relative min-h-[420px] w-full md:min-h-[560px]"
        >
          <div className="absolute inset-4 rounded-lg border border-slate-200 bg-slate-100" />
          <div className="absolute inset-0 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="absolute inset-x-0 top-0 flex h-12 items-center gap-2 border-b border-slate-200 bg-slate-50 px-4">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </div>
            <div className="flex h-full items-center justify-center px-8 pb-8 pt-16">
              <Image
                src={content.visualImage}
                alt="Mockup laptop project scope Build With Reys"
                width={1672}
                height={941}
                priority
                className="h-auto w-full max-w-[760px] object-contain drop-shadow-[0_24px_70px_rgba(15,23,42,0.18)]"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 52vw, 760px"
              />
            </div>
          </div>

          <div className="absolute left-4 top-20 max-w-[230px] rounded-lg border border-slate-200 bg-white/90 p-4 shadow-sm backdrop-blur">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {content.scopePreview.eyebrow}
            </p>
            <p className="mt-2 text-sm font-bold leading-snug text-slate-950">
              {content.scopePreview.title}
            </p>
          </div>

          <div className="absolute bottom-5 right-5 w-[min(92%,330px)] rounded-lg border border-slate-200 bg-slate-950 p-4 text-white shadow-sm">
            <div className="mb-3 text-xs font-bold uppercase tracking-wider text-blue-200">
              {content.scopePreview.projectLabel}
            </div>
            <div className="space-y-2">
              {scopeItems.map((item) => (
                <div key={item} className="flex items-start gap-2 text-xs leading-relaxed text-slate-200">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-300" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
