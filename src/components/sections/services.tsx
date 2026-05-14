"use client";

import React from "react";
import { motion } from "framer-motion";
import { Layout, Server, ShoppingBag, LineChart } from "lucide-react";
import type { SiteConfig } from "@/lib/site-config";

const SERVICE_STYLES = [
  {
    number: "01",
    title: "Website yang membangun trust",
    description:
      "Company profile modern untuk membuat bisnis terlihat kredibel, jelas, dan mudah dihubungi calon pelanggan.",
    icon: <Layout className="w-5 h-5 text-indigo-600" />,
    iconBg: "bg-indigo-50 border-indigo-200",
    cta: "Lihat paket Company Profile",
  },
  {
    number: "02",
    title: "Dashboard operasional",
    description:
      "Web app kustom untuk POS, inventory, booking, CRM, atau workflow internal yang masih berantakan di spreadsheet.",
    icon: <Server className="w-5 h-5 text-indigo-600" />,
    iconBg: "bg-indigo-50 border-indigo-200",
    cta: "Diskusikan kebutuhan sistem",
  },
  {
    number: "03",
    title: "Toko online siap transaksi",
    description:
      "E-commerce cepat dengan katalog produk, checkout, pembayaran, dan integrasi WhatsApp agar proses jualan lebih praktis.",
    icon: <ShoppingBag className="w-5 h-5 text-indigo-600" />,
    iconBg: "bg-indigo-50 border-indigo-200",
    cta: "Mulai toko online",
  },
  {
    number: "04",
    title: "SEO dan performa loading",
    description:
      "Struktur halaman, metadata, dan optimasi teknis supaya website lebih cepat, mudah dibaca Google, dan nyaman dibuka mobile.",
    icon: <LineChart className="w-5 h-5 text-indigo-600" />,
    iconBg: "bg-indigo-50 border-indigo-200",
    cta: "Audit website saya",
  },
];

type ServicesContent = SiteConfig["services"];

export const ServicesSection = ({ content }: { content: ServicesContent }) => {
  return (
    <section
      id="services"
      className="w-full py-20 md:py-24 relative overflow-hidden bg-[#f5f3ff]"
    >
      {/* Gradient orbs */}
      <div className="pointer-events-none absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-indigo-100/60 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-cyan-100/50 blur-[100px]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="flex flex-col mb-16 md:mb-20"
        >
          <p className="text-xs font-bold tracking-widest text-indigo-600 uppercase mb-4">
            {content.eyebrow}
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 mb-6">
            {content.heading}
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {content.items.map((service, index) => {
            const style = SERVICE_STYLES[index % SERVICE_STYLES.length];
            return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative flex flex-col p-8 rounded-2xl bg-white border border-neutral-200 hover:border-indigo-200 transition-all duration-300 overflow-hidden cursor-pointer shadow-sm hover:shadow-md hover:shadow-indigo-50/50"
            >
              {/* Top row: icon + number accent */}
              <div className="relative z-10 flex items-start justify-between mb-8">
                <div className={`p-2.5 rounded-xl border ${style.iconBg}`}>
                  {style.icon}
                </div>
                <span className="text-5xl font-black text-neutral-100 select-none leading-none">
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
                <a
                  href="#cta"
                  className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors group/link"
                >
                  {style.cta}
                  <svg className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>
              </div>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
