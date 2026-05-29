"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { FlipWords } from "@/components/ui/flip-words";
import type { SiteConfig } from "@/lib/site-config";
import { HeroVisual } from "@/components/sections/hero-visual";

type HeroContent = SiteConfig["hero"];

const HERO_AVATAR_COLORS = ["#ff8a00", "#f4b738", "#ffcd80", "#fffcc9"] as const;
const HERO_AVATAR_LABELS = ["A", "B", "C", "D"] as const;

function HeroTrustBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="mb-6 inline-flex items-center gap-3 rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 shadow-sm shadow-[#ffcd80]/40 backdrop-blur-sm"
    >
      <div className="flex -space-x-2">
        {HERO_AVATAR_COLORS.map((color, index) => (
          <div
            key={color}
            className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white text-[9px] font-bold text-white"
            style={{ backgroundColor: color, zIndex: HERO_AVATAR_COLORS.length - index }}
          >
            {HERO_AVATAR_LABELS[index]}
          </div>
        ))}
      </div>
      <div className="h-3.5 w-px bg-slate-200" />
      <div className="flex items-center gap-1.5">
        <div className="flex">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star key={index} className="h-3 w-3 fill-amber-400 text-amber-400" />
          ))}
        </div>
        <span className="text-xs font-semibold text-slate-700">50+ klien puas</span>
      </div>
    </motion.div>
  );
}

export const HeroSection = ({ content, secondaryHref = "#workflow" }: { content: HeroContent; secondaryHref?: string }) => {
  return (
    <section className="relative flex min-h-screen w-full items-center overflow-hidden border-b border-slate-200 bg-[#fffcc9]/25 pt-28 pb-10 antialiased md:pt-32 lg:min-h-[100svh] lg:pt-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(180deg,rgba(15,23,42,0.035)_1px,transparent_1px)] bg-[size:112px_112px] opacity-35" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.74),rgba(255,252,201,0.96))]" />
        <div className="absolute -top-24 right-[5%] h-[520px] w-[520px] rounded-full bg-[#ff8a00]/10 blur-[110px]" />
        <div className="absolute -bottom-20 -left-16 h-[420px] w-[420px] rounded-full bg-[#ffcd80]/15 blur-[100px]" />
        <div className="absolute top-1/2 left-[30%] h-[280px] w-[560px] -translate-y-1/2 rounded-full bg-[#f4b738]/10 blur-[130px]" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-[1536px] gap-6 px-4 sm:px-6 md:px-12 lg:min-h-[700px] lg:grid-cols-[minmax(360px,0.88fr)_minmax(560px,1.12fr)] lg:items-center xl:grid-cols-[minmax(420px,0.82fr)_minmax(700px,1.18fr)] xl:px-14">
        <div className="max-w-[620px] lg:pb-16">
          <HeroTrustBadge />

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease: "easeOut" }}
            className="text-[2rem] font-bold leading-[1.08] sm:text-5xl md:text-[52px] lg:text-[44px] xl:text-[56px]"
          >
            <span className="bg-gradient-to-br from-slate-950 via-slate-800 to-slate-700 bg-clip-text text-transparent">
              {content.headlinePrefix}
            </span>
            <br />
            <span className="inline-flex min-h-[1.15em] w-full min-w-0 text-[#ff8a00]">
              <FlipWords className="px-0 font-bold text-[#ff8a00]" words={content.rotatingWords} />
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
            <Link href="#cta" className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-[#ff8a00] to-[#f4b738] px-7 py-4 text-sm font-bold text-white shadow-lg shadow-[#ff8a00]/25 transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-[#ff8a00]/35">
              <span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-white/20 transition-transform duration-700 group-hover:translate-x-[200%]" />
              {content.primaryCta}
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
            <Link href={secondaryHref} className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white/80 px-7 py-4 text-sm font-bold text-slate-950 backdrop-blur-sm transition-all duration-200 hover:scale-[1.02] hover:border-[#ffcd80] hover:bg-white hover:shadow-md">
              {content.secondaryCta}
            </Link>
          </motion.div>
        </div>

        <HeroVisual content={content} />
      </div>
    </section>
  );
};
