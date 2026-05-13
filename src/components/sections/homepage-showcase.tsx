"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { CheckCircle2, Gauge, Layers3, Rocket, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type WorkflowStep = { label: string; meta: string; progress: number; accent: string };
type Metric = { icon: LucideIcon; label: string; value: string; accent: string };

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
  const rotateX = useTransform(useSpring(y), [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(useSpring(x), [-0.5, 0.5], ["-7deg", "7deg"]);

  useEffect(() => {
    const id = setInterval(() => setActiveIndex(c => (c + 1) % WORKFLOW_STEPS.length), 2400);
    return () => clearInterval(id);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className={cn("relative w-full select-none perspective-[1200px]", className)}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative mx-auto w-full max-w-[560px] flex flex-col gap-4"
      >
        {/* Top row: launch badge + quality checks */}
        <div className="flex gap-4">
          {/* Launch badge */}
          <div className="flex items-center gap-2 rounded-xl border border-white/70 bg-white/90 px-4 py-3 shadow-lg backdrop-blur-md flex-1">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-[#111] text-white shrink-0">
              <Rocket className="h-4 w-4" />
            </span>
            <span className="leading-tight">
              <span className="block text-[11px] font-medium text-neutral-500">Estimasi launch</span>
              <span className="block text-sm font-bold text-neutral-950">14-21 hari</span>
            </span>
          </div>

          {/* Quality checks */}
          <div className="rounded-xl border border-white/70 bg-white/90 p-3 shadow-lg backdrop-blur-md flex-1">
            <div className="text-[10px] font-semibold text-neutral-500 mb-2">Quality checks</div>
            <div className="grid gap-1.5">
              {METRICS.map((metric) => {
                const Icon = metric.icon;
                return (
                  <div key={metric.label} className="flex items-center justify-between gap-2 rounded-md border border-neutral-200 bg-neutral-50 px-2.5 py-1.5">
                    <div>
                      <div className="text-sm font-bold text-neutral-950">{metric.value}</div>
                      <div className="text-[9px] font-medium text-neutral-500">{metric.label}</div>
                    </div>
                    <Icon className={cn("h-4 w-4 shrink-0", metric.accent)} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main project flow card */}
        <div className="rounded-xl border border-neutral-800 bg-[#111] p-5 text-white shadow-2xl">
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="text-xs font-semibold text-white/55">Project flow</div>
              <div className="mt-0.5 text-xl font-bold tracking-tight">Dari brief ke live</div>
            </div>
            <Layers3 className="h-5 w-5 text-white/40" />
          </div>

          <div className="space-y-3">
            {WORKFLOW_STEPS.map((step, index) => {
              const isActive = index === activeIndex;
              return (
                <div
                  key={step.label}
                  className={cn(
                    "rounded-lg border p-3 transition-colors",
                    isActive ? "border-white/30 bg-white/10" : "border-white/10 bg-white/[0.04]"
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
      </motion.div>
    </div>
  );
};
