"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Layout, Server, ShoppingBag, LineChart, Sparkles } from "lucide-react";
import type { SiteConfig } from "@/lib/site-config";

const SERVICE_ICONS = [
  <Layout key="layout" className="w-5 h-5 text-indigo-600" />,
  <Server key="server" className="w-5 h-5 text-indigo-600" />,
  <ShoppingBag key="shopping" className="w-5 h-5 text-indigo-600" />,
  <LineChart key="line" className="w-5 h-5 text-indigo-600" />,
];

const FALLBACK_ICON = <Sparkles className="w-5 h-5 text-indigo-600" />;

type ServicesContent = SiteConfig["services"];

function buildServiceCtaHref(whatsappUrl: string | undefined, serviceTitle: string) {
  if (!whatsappUrl) return "#cta";
  try {
    const url = new URL(whatsappUrl);
    const baseText = url.searchParams.get("text") ?? "";
    const message = baseText
      ? `${baseText}\n\nLayanan yang diminati: ${serviceTitle}`
      : `Halo, saya tertarik dengan layanan: ${serviceTitle}.`;
    url.searchParams.set("text", message);
    return url.toString();
  } catch {
    return whatsappUrl;
  }
}

export const ServicesSection = ({
  content,
  whatsappUrl,
}: {
  content: ServicesContent;
  whatsappUrl?: string;
}) => {
  return (
    <section
      id="services"
      className="w-full py-16 md:py-20 relative overflow-hidden bg-[#f5f3ff]"
    >
      {/* Gradient orbs */}
      <div className="pointer-events-none absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-indigo-100/60 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-indigo-100/40 blur-[100px]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="flex flex-col mb-10 md:mb-12"
        >
          <p className="text-xs font-bold tracking-widest text-indigo-600 uppercase mb-4">
            {content.eyebrow}
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 mb-6">
            {content.heading}
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {content.items.map((service, index) => {
            const icon = SERVICE_ICONS[index] ?? FALLBACK_ICON;
            const ctaHref = whatsappUrl
              ? buildServiceCtaHref(whatsappUrl, service.title)
              : "#cta";
            const isExternal = ctaHref.startsWith("http");
            return (
              <motion.div
                key={service.title || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative flex flex-col rounded-lg border border-neutral-200 bg-white p-6 shadow-none transition-all duration-300 hover:border-indigo-200 hover:bg-white"
              >
                {/* Top row: icon + number accent */}
                <div className="relative z-10 flex items-start justify-between mb-8">
                  <div className="rounded-md p-2.5 border bg-indigo-50 border-indigo-200">
                    {icon}
                  </div>
                  <span className="text-4xl font-black text-neutral-100 select-none leading-none">
                    {service.number}
                  </span>
                </div>

                {/* Body */}
                <div className="relative z-10 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-neutral-900 group-hover:text-indigo-600 tracking-tight leading-snug mb-3 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed flex-1">
                    {service.description}
                  </p>
                  <Link
                    href={ctaHref}
                    {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors group/link"
                  >
                    Diskusikan layanan ini
                    <svg className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
