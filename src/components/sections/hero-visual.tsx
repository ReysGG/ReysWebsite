"use client";

import { motion } from "framer-motion";
import { CalendarDays, Check, RotateCcw, type LucideIcon } from "lucide-react";
import { Iphone17Pro } from "@/components/ui/iphone-17-pro";
import { MacbookPro } from "@/components/ui/macbook-pro";
import { cn } from "@/lib/utils";
import type { SiteConfig } from "@/lib/site-config";

type HeroContent = SiteConfig["hero"];

const heroMockups = {
  desktop: "/home_gif/Create_a_polished_digital_product_interface_a.gif",
  mobile: "/home_gif/Create_a_clean_animated_website_dashboard_int.gif",
};

type GlassCardConfig = {
  eyebrow: string;
  title: string;
  description: string;
  icon: LucideIcon;
  compact?: boolean;
  showProgress?: boolean;
};

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
          "relative overflow-hidden rounded-[18px] border border-white/65 bg-white/45 shadow-[0_24px_60px_rgba(15,23,42,0.12),0_14px_34px_rgba(255,138,0,0.16)] ring-1 ring-white/45 backdrop-blur-2xl",
          card.compact ? "p-3.5" : "p-4",
        )}
      >
        <span className="pointer-events-none absolute inset-px rounded-[17px] bg-[linear-gradient(135deg,rgba(255,255,255,0.78),rgba(255,255,255,0.18)_46%,rgba(255,205,128,0.16))]" />
        <span className="pointer-events-none absolute -left-14 -top-10 h-16 w-[150%] rotate-[-9deg] bg-white/45 blur-xl" />
        <span className="pointer-events-none absolute -bottom-10 right-3 h-20 w-24 rounded-full bg-[#ff8a00]/12 blur-2xl" />

        <div className="relative flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/70 bg-white/55 text-[#ff8a00] shadow-[inset_0_1px_0_rgba(255,255,255,0.65),0_10px_22px_rgba(255,138,0,0.12)] backdrop-blur-xl">
            <Icon className="h-4.5 w-4.5 h-[18px] w-[18px]" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-[10px] font-bold text-[#ff8a00]">{card.eyebrow}</p>
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
                  className="h-full rounded-full bg-gradient-to-r from-[#fffcc9] via-[#f4b738] to-[#ff8a00]"
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
      <div className="relative overflow-hidden rounded-[12px] border border-white/65 bg-white/55 p-2 shadow-[0_10px_28px_rgba(15,23,42,0.1),0_8px_22px_rgba(255,138,0,0.12)] backdrop-blur-2xl">
        <div className="relative flex items-center gap-2">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-white/70 bg-white/55 text-[#ff8a00] backdrop-blur-xl">
            <Icon className="h-3 w-3" />
          </div>
          <div className="min-w-0">
            <p className="text-[8px] font-bold text-[#ff8a00]">{card.eyebrow}</p>
            <p className="truncate text-[10px] font-bold leading-tight text-slate-900">{card.title}</p>
          </div>
          <span className="ml-auto flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-emerald-400 text-white">
            <Check className="h-1.5 w-1.5" />
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export function HeroVisual({ content }: { content: HeroContent }) {
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
      className="relative mx-auto h-[360px] w-full overflow-hidden sm:h-[480px] sm:overflow-visible md:h-[540px] lg:mr-0 lg:ml-auto lg:h-[700px] lg:max-w-[900px] lg:-translate-x-6 lg:-translate-y-12 xl:max-w-[960px] xl:-translate-x-8 xl:-translate-y-14"
      aria-label="Preview deliverable Build With Reys"
    >
      {/* Glow orbs behind mockups */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[55%] w-[65%] rounded-full bg-[#ff8a00]/10 blur-[80px]" />
      <div className="pointer-events-none absolute right-[8%] top-[8%] h-[38%] w-[38%] rounded-full bg-[#ffcd80]/20 blur-[60px]" />

      {/* Dashed connector lines — desktop only, one per card */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        <span className="absolute left-[22%] top-[14%] h-[14%] w-[10%] rounded-tl-[2rem] border-l border-t border-dashed border-[#ffcd80]/70 xl:left-[24%] xl:w-[11%]" />
        <span className="absolute right-[22%] top-[10%] h-[20%] w-[10%] rounded-tr-[2rem] border-r border-t border-dashed border-[#ffcd80]/70 xl:right-[23%]" />
      </div>

      {/* Detached oval shadows are rendered inside each device wrapper so they stay visible above the warm background. */}

      <motion.div
        className="absolute left-[1%] top-[15%] z-20 w-[86%] text-slate-950 sm:left-[0%] sm:top-[21%] sm:w-[82%] lg:left-[6%] lg:top-[28%] lg:w-[78%] xl:left-[7%] xl:top-[27%] xl:w-[76%]"
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.05, ease: "easeOut" }}
      >
        <motion.div
          className="relative"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="pointer-events-none absolute left-[11%] top-[93%] z-0 hidden h-[46px] w-[78%] rounded-full bg-slate-950/32 blur-[26px] lg:block" />
          <MacbookPro
            width={650}
            height={400}
            src={heroMockups.desktop}
            className="relative z-10 h-auto w-full"
            aria-label="Preview website dalam frame MacBook Pro"
          />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute right-[2%] top-[7%] z-30 w-[28%] text-slate-950 sm:right-[3%] sm:top-[15%] sm:w-[23%] lg:right-[7%] lg:top-[30%] lg:w-[22%] xl:right-[8%] xl:top-[31%] xl:w-[20%]"
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.16, ease: "easeOut" }}
      >
        <motion.div
          className="relative"
          animate={{ y: [0, -9, 0] }}
          transition={{ duration: 7.16, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="pointer-events-none absolute left-[12%] top-[94%] z-0 hidden h-[34px] w-[80%] rounded-full bg-slate-950/30 blur-[22px] lg:block" />
          <div className="origin-bottom [perspective:900px]">
            <div className="origin-bottom-right [transform:rotateY(-11deg)_rotateX(4deg)_rotateZ(-1.5deg)] [transform-style:preserve-3d]">
              <Iphone17Pro
                width={200}
                height={400}
                src={heroMockups.mobile}
                className="relative z-10 h-auto w-full"
                aria-label="Preview website mobile dalam frame iPhone 17 Pro"
              />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Desktop / tablet — 2 cards only, well-spaced */}
      <GlassMetricCard
        card={featuredCards[0]}
        delay={0.2}
        className="left-[0%] top-[4%] hidden w-[210px] sm:block md:w-[215px] lg:left-[8%] lg:top-[13%] lg:w-[215px] xl:left-[10%] xl:top-[12%] xl:w-[225px]"
      />
      <GlassMetricCard
        card={featuredCards[1]}
        delay={0.3}
        className="right-[0%] top-[1%] hidden w-[240px] sm:block md:w-[245px] lg:right-[8%] lg:top-[11%] lg:w-[245px] xl:right-[9%] xl:top-[12%] xl:w-[255px]"
      />

      {/* Mobile only: same 2 cards, compact */}
      <div className="absolute bottom-0 left-0 right-0 z-50 flex gap-1.5 px-2 pb-2 sm:hidden">
        <MiniCard card={featuredCards[0]} delay={0.18} />
        <MiniCard card={featuredCards[1]} delay={0.26} />
      </div>
    </motion.div>
  );
}
