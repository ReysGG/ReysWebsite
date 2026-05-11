"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  CheckCircle2,
  Gauge,
  Layers3,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type WorkflowStep = {
  label: string;
  meta: string;
  progress: number;
  accent: string;
};

type Metric = {
  icon: LucideIcon;
  label: string;
  value: string;
  accent: string;
};

const WORKFLOW_STEPS: WorkflowStep[] = [
  { label: "Brief", meta: "Tujuan & konten terkunci", progress: 100, accent: "bg-emerald-500" },
  { label: "Build", meta: "UI dan fitur utama", progress: 72, accent: "bg-blue-500" },
  { label: "Launch", meta: "QA, SEO, dan deploy", progress: 48, accent: "bg-neutral-900" },
];

const METRICS: Metric[] = [
  { icon: Gauge, label: "Performance target", value: "98", accent: "text-emerald-600" },
  { icon: CheckCircle2, label: "Mobile ready", value: "100%", accent: "text-blue-600" },
];

type Props = { className?: string };

export const HomepageShowcaseSection = ({ className }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((current) => (current + 1) % WORKFLOW_STEPS.length);
    }, 2400);

    return () => clearInterval(id);
  }, []);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    x.set((event.clientX - rect.left) / rect.width - 0.5);
    y.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("relative w-full select-none perspective-[1200px]", className)}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative mx-auto aspect-[1.08] w-full max-w-[680px]"
      >
        <div className="absolute inset-x-[11%] bottom-[8%] h-[18%] rounded-full bg-black/15 blur-3xl" />

        <div className="absolute left-[6%] top-[8%] z-20 flex items-center gap-2 rounded-lg border border-white/70 bg-white/85 px-3 py-2 shadow-[0_16px_45px_rgba(20,20,20,0.12)] backdrop-blur-md">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-[#111] text-white">
            <Rocket className="h-4 w-4" />
          </span>
          <span className="leading-tight">
            <span className="block text-[11px] font-medium text-neutral-500">Estimasi launch</span>
            <span className="block text-sm font-bold text-neutral-950">14-21 hari</span>
          </span>
        </div>

        <div className="absolute left-[4%] top-[22%] z-10 w-[64%] rounded-lg border border-neutral-800 bg-[#111] p-4 text-white shadow-[0_28px_70px_rgba(20,20,20,0.24)]">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-white/55">Project flow</div>
              <div className="mt-1 text-xl font-bold tracking-tight">Dari brief ke live</div>
            </div>
            <Layers3 className="h-5 w-5 text-white/50" />
          </div>

          <div className="mt-5 space-y-3">
            {WORKFLOW_STEPS.map((step, index) => {
              const isActive = index === activeIndex;

              return (
                <div
                  key={step.label}
                  className={cn(
                    "rounded-lg border p-3 transition-colors",
                    isActive
                      ? "border-white/30 bg-white/10"
                      : "border-white/10 bg-white/[0.04]"
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold">{step.label}</div>
                      <div className="mt-0.5 truncate text-[11px] text-white/50">{step.meta}</div>
                    </div>
                    <div className="text-xs font-bold text-white/80">{step.progress}%</div>
                  </div>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className={cn("h-full rounded-full", step.accent)}
                      initial={false}
                      animate={{ width: `${isActive ? step.progress : Math.max(step.progress - 18, 22)}%` }}
                      transition={{ duration: 0.45, ease: "easeOut" }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="absolute right-[5%] top-[26%] z-20 w-[40%] rounded-lg border border-white/70 bg-white/90 p-4 shadow-[0_24px_65px_rgba(20,20,20,0.16)] backdrop-blur-md">
          <div className="text-xs font-semibold text-neutral-500">Quality checks</div>
          <div className="mt-4 grid gap-2">
            {METRICS.map((metric) => {
              const Icon = metric.icon;

              return (
                <div key={metric.label} className="flex items-center justify-between gap-3 rounded-md border border-neutral-200 bg-neutral-50 px-3 py-2">
                  <div>
                    <div className="text-base font-bold text-neutral-950">{metric.value}</div>
                    <div className="text-[10px] font-medium text-neutral-500">{metric.label}</div>
                  </div>
                  <Icon className={cn("h-4 w-4", metric.accent)} />
                </div>
              );
            })}
          </div>
        </div>

        <div className="absolute bottom-[15%] right-[13%] z-30 hidden w-[48%] rounded-lg border border-neutral-200 bg-white p-3 shadow-[0_22px_60px_rgba(20,20,20,0.16)] sm:block">
          <div className="text-xs font-bold text-neutral-950">Output yang disiapkan</div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {["Landing", "CMS", "SEO"].map((item) => (
              <div key={item} className="rounded-md bg-neutral-50 px-2 py-2 text-center text-[10px] font-bold text-neutral-600">
                {item}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
