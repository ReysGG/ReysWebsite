"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { IconCheck } from "@tabler/icons-react";
import type { SiteConfig } from "@/lib/site-config";

type PricingContent = SiteConfig["pricing"];

const fallbackPricingTiers = [
  {
    title: "Starter",
    price: "5 juta",
    timeline: "7-10 hari",
    description: "Sempurna untuk personal branding & bisnis pemula.",
    features: [
      "Landing Page Profesional",
      "Desain Responsif (Mobile Friendly)",
      "Form Kontak & Integrasi WhatsApp",
      "Basic SEO Setup",
      "Gratis Domain & Hosting 1 Tahun",
    ],
    buttonText: "Mulai Sekarang",
    popular: false,
  },
  {
    title: "Professional",
    price: "15 juta",
    timeline: "14-21 hari",
    description: "Untuk bisnis yang siap berskala dengan fitur tingkat lanjut.",
    features: [
      "Semua fitur Starter",
      "Up to 10 Halaman (Company Profile)",
      "Sistem CMS (Content Management)",
      "Animasi UI/UX Premium",
      "Advanced SEO & Analytics",
      "Prioritas Support 24/7",
    ],
    buttonText: "Pilih Professional",
    popular: true, // Gold / Aceternity effect handled here
  },
  {
    title: "Enterprise",
    price: "Custom",
    timeline: "Sesuai scope",
    description: "Solusi eksklusif untuk korporat / kebutuhan kompleks.",
    features: [
      "Semua fitur Professional",
      "E-Commerce / Web Application UI",
      "Animasi 3D & Micro-interactions",
      "Custom Backend / API Integration",
      "A/B Testing & Conversion Optimization",
      "Dedicated Project Manager",
    ],
    buttonText: "Hubungi Kami",
    popular: false,
  },
];

export const PricingSection = ({ content }: { content: PricingContent }) => {
  const pricingTiers = content.tiers.length ? content.tiers : fallbackPricingTiers;

  return (
    <section id="pricing" className="relative w-full py-16 md:py-20 overflow-hidden flex flex-col items-center justify-center bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full mb-10 items-center text-center">
        <p className="text-xs font-bold tracking-widest text-indigo-600 uppercase mb-4">{content.eyebrow}</p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 mb-6">
          {content.heading}
        </h2>
        <p className="text-base md:text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
          {content.description}
        </p>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 md:px-12 lg:grid-cols-3 lg:pt-3 relative z-10">
        {pricingTiers.map((tier, idx) => (
          <div
            key={idx}
            className={cn(
              "relative flex flex-col rounded-lg p-7 shadow-none transition-all duration-300",
              tier.popular
                ? "overflow-hidden border-2 border-indigo-500 bg-white shadow-none lg:-translate-y-3"
                : "bg-white border border-neutral-200"
            )}
          >
            <div className="relative z-10 flex flex-col h-full">
              <div className="mb-8">
                {tier.popular && (
                  <span className="inline-block px-4 py-1 mb-6 text-xs font-semibold tracking-wider text-white uppercase bg-indigo-600 rounded-md">
                    Paling Populer
                  </span>
                )}
                <h3 className="text-2xl font-semibold text-neutral-900">{tier.title}</h3>
                <div className="mt-4 flex items-baseline text-4xl font-extrabold text-neutral-900">
                  {tier.price !== "Custom" && <span className="text-2xl font-medium text-neutral-500 mr-1">Rp</span>}
                  {tier.price}
                </div>
                <div className="mt-3 inline-flex rounded-md bg-neutral-100 px-3 py-1 text-xs font-bold text-neutral-600">
                  Estimasi {tier.timeline}
                </div>
                <p className="mt-4 text-sm text-neutral-600">
                  {tier.description}
                </p>
              </div>

              <ul className="mb-8 flex-1 space-y-4">
                {tier.features.map((feature, featureIdx) => (
                  <li key={featureIdx} className="flex items-start">
                    <div className={cn(
                      "flex-shrink-0 flex items-center justify-center p-1 rounded-md mr-3 mt-0.5",
                      tier.popular ? "bg-indigo-600 text-white" : "bg-neutral-200 text-neutral-600"
                    )}>
                      <IconCheck className="w-4 h-4" stroke={3} />
                    </div>
                    <span className="text-sm text-neutral-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="#cta"
                className={cn(
                  "mt-auto inline-flex w-full items-center justify-center py-4 px-8 rounded-md font-bold tracking-wide transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2",
                  tier.popular
                    ? "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500"
                    : "bg-white border border-neutral-300 text-neutral-900 hover:bg-neutral-100 hover:border-indigo-300 focus:ring-neutral-200"
                )}
              >
                {tier.buttonText}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
