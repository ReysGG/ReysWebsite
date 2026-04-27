"use client";

import React from "react";
import { motion } from "framer-motion";
import { Layout, Server, ShoppingBag, LineChart } from "lucide-react";

const SERVICES_CONTENT = [
  {
    number: "01",
    title: "Company Profile Profesional",
    description:
      "Bangun kredibilitas pelanggan dengan desain website modern, elegan, dan responsif. Dirancang untuk menonjolkan nilai bisnis Anda.",
    icon: <Layout className="w-5 h-5 text-cyan-400" />,
    iconBg: "bg-cyan-400/8 border-cyan-400/15",
  },
  {
    number: "02",
    title: "Sistem Kustom & Web App",
    description:
      "Sederhanakan proses bisnis dengan aplikasi web kustom. POS, Inventory, hingga CRM dengan arsitektur yang scalable.",
    icon: <Server className="w-5 h-5 text-indigo-400" />,
    iconBg: "bg-indigo-400/8 border-indigo-400/15",
  },
  {
    number: "03",
    title: "E-Commerce Integrasi Penuh",
    description:
      "Platform e-commerce cepat terintegrasi langsung dengan payment gateway lokal (GoPay, VA) dan layanan ekspedisi otomatis.",
    icon: <ShoppingBag className="w-5 h-5 text-rose-400" />,
    iconBg: "bg-rose-400/8 border-rose-400/15",
  },
  {
    number: "04",
    title: "Technical SEO & Performa",
    description:
      "Kode yang sangat teroptimasi untuk mesin pencari. Dapatkan peringkat Google lebih baik dengan loading super cepat.",
    icon: <LineChart className="w-5 h-5 text-emerald-400" />,
    iconBg: "bg-emerald-400/8 border-emerald-400/15",
  },
];

export const ServicesSection = () => {
  return (
    <section
      id="services"
      className="w-full py-24 md:py-32 relative overflow-hidden bg-white"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="flex flex-col mb-16 md:mb-20"
        >
          <p className="text-xs font-bold tracking-widest text-neutral-400 uppercase mb-4">
            Core Competencies
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 mb-6">
            Precision Engineering for Modern Scale.
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES_CONTENT.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative flex flex-col p-8 rounded-none bg-white border border-neutral-200 hover:border-neutral-400 transition-all duration-300 overflow-hidden cursor-pointer shadow-sm hover:shadow-md"
            >
              {/* Top row: icon */}
              <div className="relative z-10 flex items-start justify-between mb-8">
                <div className="text-neutral-900">
                  {service.icon}
                </div>
              </div>

              {/* Body */}
              <div className="relative z-10 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-neutral-900 tracking-tight leading-snug mb-3">
                  {service.title}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed flex-1">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};