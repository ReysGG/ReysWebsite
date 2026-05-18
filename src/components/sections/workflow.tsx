"use client";

import React from "react";
import { motion } from "framer-motion";
import { FlipWords } from "@/components/ui/flip-words";
import type { SiteConfig } from "@/lib/site-config";

type WorkflowContent = SiteConfig["workflow"];

const fallbackSteps = [
  {
    step: "01",
    title: "Discovery",
    description: "Sesi singkat untuk pahami bisnis, target pengguna, dan fitur yang dibutuhkan.",
  },
  {
    step: "02",
    title: "Scope",
    description: "Halaman, fitur, timeline, harga, dan deliverable dirapikan sebelum coding.",
  },
  {
    step: "03",
    title: "Build",
    description: "Development berjalan dengan staging link agar progress bisa dicek.",
  },
  {
    step: "04",
    title: "Handover",
    description: "Deploy ke domain, akses penuh, dokumentasi, dan support awal.",
  },
];

export const WorkflowSection = ({ content }: { content: WorkflowContent }) => {
  const steps = content.steps.length ? content.steps : fallbackSteps;

  return (
    <section id="workflow" className="w-full border-y border-slate-200 bg-[#f2f4f6] py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 md:px-12 lg:grid-cols-12 lg:items-start">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-4"
        >
          <p className="mb-4 text-xs font-bold uppercase tracking-wider text-blue-600">
            {content.eyebrow}
          </p>
          <h2 className="text-3xl font-bold leading-tight text-slate-950 md:text-5xl">
            {content.headingPrefix}{" "}
            <span className="text-blue-600">
              <FlipWords words={content.rotatingWords} className="px-0 font-bold text-blue-600" />
            </span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-slate-600">
            {content.description}
          </p>
        </motion.div>

        <div className="grid gap-5 lg:col-span-8 lg:grid-cols-2">
          {steps.map((item, index) => (
            <motion.article
              key={`${item.step}-${item.title}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="rounded-lg border border-slate-200 bg-white p-7"
            >
              <div className="mb-8 flex items-center justify-between gap-6">
                <span className="flex h-12 w-12 items-center justify-center rounded-lg border border-blue-100 bg-blue-50 text-sm font-bold text-blue-600">
                  {item.step}
                </span>
                <span className="h-px flex-1 bg-slate-200" />
              </div>
              <h3 className="text-xl font-bold text-slate-950">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
