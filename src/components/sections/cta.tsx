import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MessageCircle } from "lucide-react";
import type { SiteConfig } from "@/lib/site-config";

type CtaContent = SiteConfig["cta"];

export const CtaSection = ({ content }: { content: CtaContent }) => {
  return (
    <section id="cta" className="w-full bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="relative overflow-hidden rounded-lg bg-slate-950 p-8 text-white md:p-14">
          <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 -translate-y-24 translate-x-20 rounded-full bg-brand/20 blur-3xl" />

          <div className="relative z-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div className="max-w-3xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold uppercase tracking-wider text-brand-tint">
                <span className="h-2 w-2 rounded-full bg-brand-cyan" />
                {content.badge}
              </div>
              <h2 className="text-3xl font-bold leading-tight md:text-5xl">
                {content.headingTop}
                <br />
                <span className="text-brand-soft">{content.headingAccent}</span>
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300">
                {content.description}
              </p>

              <div className="mt-8 grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-brand-soft" />
                  {content.socialProof}
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-brand-soft" />
                  {content.ratingText}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href={content.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-brand px-7 py-4 text-sm font-bold text-white transition-colors duration-200 hover:bg-brand-deep"
              >
                <MessageCircle className="h-5 w-5" />
                {content.primaryCta}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#portfolio"
                className="inline-flex items-center justify-center rounded-md border border-white/15 px-7 py-4 text-sm font-bold text-white transition-colors duration-200 hover:bg-white/10"
              >
                {content.secondaryCta}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
