"use client";

import React from "react";
import { motion } from "framer-motion";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import type { PublicTestimonial } from "@/lib/testimonials";

export const TestimonialsSection = ({ testimonials }: { testimonials: PublicTestimonial[] }) => {
  if (!testimonials.length) return null;

  return (
    <section id="testimonials" className="relative w-full py-24 md:py-32 overflow-hidden bg-[#f5f3ff]">
      {/* Gradient orbs */}
      <div className="pointer-events-none absolute -top-20 -left-20 w-[400px] h-[400px] rounded-full bg-indigo-100/60 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 w-[400px] h-[400px] rounded-full bg-rose-100/40 blur-[100px]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center justify-center mb-16 md:mb-20 text-center"
        >
          <p className="text-xs font-bold tracking-widest text-indigo-600 uppercase mb-4">
            Testimoni
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 mb-6">
            Dipercaya Para Founder
          </h2>
          <p className="text-base md:text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            Jangan hanya percaya kata-kata kami. Dengarkan langsung dari para klien yang telah bekerja sama dengan kami.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="h-[20rem] rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden"
        >
          <InfiniteMovingCards
            items={testimonials}
            direction="left"
            speed="normal"
          />
        </motion.div>
      </div>
    </section>
  );
};
