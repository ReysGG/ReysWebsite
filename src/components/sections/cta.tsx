"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { IconArrowRight, IconBrandWhatsapp } from "@tabler/icons-react";
import type { SiteConfig } from "@/lib/site-config";

type CtaContent = SiteConfig["cta"];

export const CtaSection = ({ content }: { content: CtaContent }) => {
  return (
    <section
      id="cta"
      className="w-full relative py-16 md:py-20 overflow-hidden bg-white"
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.8) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 flex flex-col items-center text-center">

        {/* Badge — black style */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-md border border-indigo-200 bg-indigo-50 text-xs font-semibold uppercase tracking-widest text-indigo-600"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
          {content.badge}
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-6 text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl"
        >
          <span className="text-neutral-900">{content.headingTop}</span>
          <br />
          <span className="text-indigo-600">
            {content.headingAccent}
          </span>
        </motion.h2>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mb-9 max-w-2xl text-base leading-relaxed text-neutral-600 md:text-lg"
        >
          {content.description}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-10 flex flex-col items-center gap-3 sm:flex-row"
        >
          {/* Primary — Black solid button */}
          <Link
            href={content.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-md bg-indigo-600 px-7 py-3.5 text-base font-bold text-white shadow-none transition-colors duration-300 hover:bg-indigo-700"
          >
            <IconBrandWhatsapp className="w-5 h-5" />
            {content.primaryCta}
            <IconArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          {/* Secondary — bordered */}
          <Link
            href="#portfolio"
            className="inline-flex items-center gap-2 rounded-md border border-neutral-300 px-7 py-3.5 text-base font-semibold text-neutral-700 transition-colors duration-200 hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-600"
          >
            {content.secondaryCta}
          </Link>
        </motion.div>

        {/* Social proof strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-6 text-neutral-600 text-sm"
        >
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-indigo-50 text-indigo-600">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </span>
            <span>{content.socialProof}</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-neutral-300" />
          <div className="flex items-center gap-1">
            {[1,2,3,4,5].map(i => (
              <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-1">{content.ratingText}</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
