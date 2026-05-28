"use client";

import { motion } from "framer-motion";
import { FlipWords } from "@/components/ui/flip-words";
import type { SiteConfig } from "@/lib/site-config";
import { WorkflowImageSlider } from "@/components/sections/workflow-slider";

type WorkflowContent = SiteConfig["workflow"];

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
