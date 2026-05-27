"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Check,
  RotateCcw,
  type LucideIcon,
} from "lucide-react";
import { FlipWords } from "@/components/ui/flip-words";
import { cn } from "@/lib/utils";
import type { SiteConfig } from "@/lib/site-config";

type HeroContent = SiteConfig["hero"];

const ASSET_BASE = "/Asset/Build%20With%20Reys_20260527_120546_";
const HERO_CANVAS = { width: 1080, height: 1350 };

type HeroAsset = {
  src: string;
  alt: string;
  box: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
};

const heroAssets = {
  laptop: {
    src: `${ASSET_BASE}0005.png`,
    alt: "Mockup laptop project dashboard Build With Reys",
    box: { x: 40, y: 366, width: 965, height: 651 },
  },
  phone: {
    src: `${ASSET_BASE}0006.png`,
    alt: "Mockup mobile website Build With Reys",
    box: { x: 350, y: 118, width: 379, height: 1105 },
  },
} satisfies Record<string, HeroAsset>;

type GlassCardConfig = {
  eyebrow: string;
  title: string;
  description: string;
  icon: LucideIcon;
  compact?: boolean;
  showProgress?: boolean;
};

function CroppedAsset({
  asset,
  className,
  priority = false,
  sizes = "(max-width: 768px) 72vw, 280px",
}: {
  asset: HeroAsset;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div
      className={cn("pointer-events-none relative overflow-hidden", className)}
      style={{ aspectRatio: `${asset.box.width} / ${asset.box.height}` }}
    >
      <Image
        src={asset.src}
        alt={asset.alt}
        width={HERO_CANVAS.width}
        height={HERO_CANVAS.height}
        priority={priority}
        draggable={false}
        className="absolute h-auto max-w-none select-none"
        style={{
          width: `${(HERO_CANVAS.width / asset.box.width) * 100}%`,
          left: `${(-asset.box.x / asset.box.width) * 100}%`,
          top: `${(-asset.box.y / asset.box.height) * 100}%`,
        }}
        sizes={sizes}
      />
    </div>
  );
}

function FloatingAsset({
  asset,
  className,
  imageClassName,
  priority = false,
  sizes,
  delay = 0,
  float = 8,
}: {
  asset: HeroAsset;
  className: string;
  imageClassName?: string;
  priority?: boolean;
  sizes: string;
  delay?: number;
  float?: number;
}) {
  return (
    <motion.div
      className={cn("absolute", className)}
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
    >
      <motion.div
        animate={{ y: [0, -float, 0] }}
        transition={{ duration: 7 + delay, repeat: Infinity, ease: "easeInOut" }}
      >
        <CroppedAsset asset={asset} priority={priority} sizes={sizes} className={cn("w-full", imageClassName)} />
      </motion.div>
    </motion.div>
  );
}

function GlassMetricCard({
  card,
  className,
  delay = 0,
}: {
  card: GlassCardConfig;
  className?: string;
  delay?: number;
}) {
  const Icon = card.icon;

  return (
    <motion.div
      className={cn("absolute z-40", className)}
      initial={{ opacity: 0, y: 18, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
    >
      <motion.div
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 5.8 + delay, repeat: Infinity, ease: "easeInOut" }}
        className={cn(
          "relative overflow-hidden rounded-[16px] border border-white/75 bg-white/70 shadow-[0_20px_52px_rgba(79,70,229,0.14)] ring-1 ring-blue-100/80 backdrop-blur-xl",
          card.compact ? "p-3.5" : "p-4",
        )}
      >
        <span className="pointer-events-none absolute inset-px rounded-[15px] bg-[linear-gradient(135deg,rgba(255,255,255,0.88),rgba(255,255,255,0.28)_44%,rgba(96,165,250,0.12))]" />
        <span className="pointer-events-none absolute -left-12 -top-9 h-16 w-[145%] rotate-[-9deg] bg-white/55 blur-xl" />
        <span className="pointer-events-none absolute -bottom-10 right-3 h-20 w-24 rounded-full bg-blue-500/10 blur-2xl" />

        <div className="relative flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/80 bg-white/80 text-blue-600 shadow-[0_10px_22px_rgba(79,70,229,0.12)]">
            <Icon className="h-4.5 w-4.5 h-[18px] w-[18px]" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-[10px] font-bold text-blue-600">{card.eyebrow}</p>
                <p className="mt-0.5 text-xs font-bold leading-snug text-slate-950">{card.title}</p>
              </div>
              <span className="mt-0.5 flex h-4.5 h-[18px] w-[18px] w-4.5 shrink-0 items-center justify-center rounded-full bg-emerald-400 text-white shadow-[0_6px_16px_rgba(16,185,129,0.28)]">
                <Check className="h-2.5 w-2.5" />
              </span>
            </div>
            <p className="mt-1.5 text-[10px] font-medium leading-snug text-slate-500">{card.description}</p>
            {card.showProgress && (
              <div className="mt-2 h-1 overflow-hidden rounded-full bg-slate-200/70">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-violet-500 via-blue-600 to-cyan-400"
                  initial={{ width: "24%" }}
                  animate={{ width: ["24%", "92%", "84%"] }}
                  transition={{ duration: 3.8, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
                />
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/** Smaller pill-style card used only on mobile */
function MiniCard({
  card,
  delay = 0,
}: {
  card: GlassCardConfig;
  delay?: number;
}) {
  const Icon = card.icon;
  return (
    <motion.div
      className="relative flex-1 min-w-0"
      initial={{ opacity: 0, y: 12, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      <div className="relative overflow-hidden rounded-[14px] border border-white/75 bg-white/80 p-3 shadow-[0_12px_36px_rgba(79,70,229,0.12)] backdrop-blur-xl">
        <span className="pointer-events-none absolute inset-px rounded-[13px] bg-[linear-gradient(135deg,rgba(255,255,255,0.9),rgba(255,255,255,0.3)_44%,rgba(96,165,250,0.1))]" />
        <div className="relative flex items-center gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/80 bg-white/90 text-blue-600">
            <Icon className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <p className="text-[9px] font-bold text-blue-600">{card.eyebrow}</p>
            <p className="text-[11px] font-bold leading-tight text-slate-900 truncate">{card.title}</p>
          </div>
          <span className="ml-auto flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-400 text-white">
            <Check className="h-2 w-2" />
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function HeroVisual({ content }: { content: HeroContent }) {
  const featuredCards: GlassCardConfig[] = [
    {
      eyebrow: "Revisions",
      title: "2 Rounds",
      description: "All revisions completed",
      icon: RotateCcw,
      compact: true,
    },
    {
      eyebrow: "Timeline",
      title: content.scopePreview.timeline || "14–21 hari kerja",
      description: "On time delivery",
      icon: CalendarDays,
      showProgress: true,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 36 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, delay: 0.18, ease: "easeOut" }}
      className="relative mx-auto h-[360px] w-full overflow-hidden sm:h-[480px] sm:overflow-visible md:h-[540px] lg:mr-0 lg:ml-auto lg:h-[700px] lg:max-w-[900px] xl:max-w-[960px]"
      aria-label="Preview deliverable Build With Reys"
    >
      {/* Dashed connector lines — desktop only, one per card */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        {/* Revisions → laptop top-left */}
        <span className="absolute left-[22%] top-[14%] h-[14%] w-[10%] rounded-tl-[2rem] border-l border-t border-dashed border-blue-400/50 xl:left-[24%] xl:w-[11%]" />
        {/* Timeline → phone top-right */}
        <span className="absolute right-[22%] top-[10%] h-[20%] w-[10%] rounded-tr-[2rem] border-r border-t border-dashed border-blue-400/50 xl:right-[23%]" />
      </div>

      {/* Laptop mockup */}
      <FloatingAsset
        asset={heroAssets.laptop}
        priority
        className="left-[3%] top-[6%] z-20 w-[70%] sm:left-[3%] sm:top-[16%] sm:w-[71%] lg:left-[3%] lg:top-[24%] lg:w-[74%]"
        imageClassName="drop-shadow-[0_42px_82px_rgba(15,23,42,0.42)]"
        sizes="(max-width: 640px) 72vw, (max-width: 768px) 71vw, (max-width: 1200px) 52vw, 690px"
        delay={0.05}
        float={6}
      />
      {/* Phone mockup */}
      <FloatingAsset
        asset={heroAssets.phone}
        priority
        className="right-[2%] top-[1%] z-30 w-[24%] sm:right-[1%] sm:top-[13%] sm:w-[21%] lg:right-[0%] lg:top-[18%] lg:w-[23%] xl:right-[1%] xl:w-[22%]"
        imageClassName="drop-shadow-[0_44px_86px_rgba(15,23,42,0.45)]"
        sizes="(max-width: 640px) 25vw, (max-width: 768px) 22vw, 190px"
        delay={0.16}
        float={9}
      />

      {/* Desktop / tablet — 2 cards only, well-spaced */}
      <GlassMetricCard
        card={featuredCards[0]}
        delay={0.2}
        className="left-[0%] top-[4%] hidden w-[210px] sm:block md:w-[215px] lg:left-[0%] lg:top-[5%] lg:w-[215px] xl:left-[2%] xl:w-[225px]"
      />
      <GlassMetricCard
        card={featuredCards[1]}
        delay={0.3}
        className="right-[0%] top-[1%] hidden w-[240px] sm:block md:w-[245px] lg:right-[0%] lg:w-[245px] xl:right-[1%] xl:w-[255px]"
      />

      {/* Mobile only: same 2 cards, compact */}
      <div className="absolute bottom-0 left-0 right-0 z-50 flex gap-2 px-3 pb-3 sm:hidden">
        <MiniCard card={featuredCards[0]} delay={0.18} />
        <MiniCard card={featuredCards[1]} delay={0.26} />
      </div>
    </motion.div>
  );
}

export const HeroSection = ({
  content,
  secondaryHref = "#workflow",
}: {
  content: HeroContent;
  secondaryHref?: string;
}) => {
  return (
    <section className="relative w-full overflow-x-hidden border-b border-slate-200 bg-[#f8fbff] pt-28 pb-10 antialiased md:pt-32 lg:pt-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(180deg,rgba(15,23,42,0.035)_1px,transparent_1px)] bg-[size:112px_112px] opacity-35" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.74),rgba(248,251,255,0.96))]" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-[1536px] gap-6 px-4 sm:px-6 md:px-12 lg:min-h-[700px] lg:grid-cols-[minmax(360px,0.88fr)_minmax(560px,1.12fr)] xl:grid-cols-[minmax(420px,0.82fr)_minmax(700px,1.18fr)] lg:items-center xl:px-14">
        <div className="max-w-[620px] lg:pb-16">
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
            className="text-[2rem] font-bold leading-[1.08] text-slate-950 sm:text-5xl md:text-[52px] lg:text-[44px] xl:text-[56px]"
          >
            {content.headlinePrefix}
            <br />
            <span className="inline-flex min-h-[1.15em] w-full min-w-0 text-blue-600">
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
              className="inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 px-7 py-4 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-colors duration-200 hover:bg-blue-700"
            >
              {content.primaryCta}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={secondaryHref}
              className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-7 py-4 text-sm font-bold text-slate-950 transition-colors duration-200 hover:border-blue-300 hover:bg-slate-50"
            >
              {content.secondaryCta}
            </Link>
          </motion.div>
        </div>

        <HeroVisual content={content} />
      </div>
    </section>
  );
};
