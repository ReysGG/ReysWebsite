"use client";

import React from "react";
import { Spotlight } from "@/components/ui/spotlight";
import { cn } from "@/lib/utils";
import { IconCheck } from "@tabler/icons-react";

const pricingTiers = [
  {
    title: "Starter",
    price: "5.000k",
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
    price: "15.000k",
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

export const PricingSection = () => {
  return (
    <section id="pricing" className="relative w-full py-24 md:py-32 overflow-hidden flex flex-col items-center justify-center bg-white border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full mb-16 items-center text-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 mb-6">
          Investasi <span className="text-neutral-900">Berkelas</span>
        </h2>
        <p className="text-base md:text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
          Harga yang transparan untuk hasil karya digital yang tidak murahan. Pilih paket yang sesuai dengan visi besar bisnis Anda.
        </p>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 md:px-12 lg:grid-cols-3 relative z-10">
        {pricingTiers.map((tier, idx) => (
          <div
            key={idx}
            className={cn(
              "relative flex flex-col rounded-3xl p-8 shadow-sm transition-transform duration-300 hover:scale-[1.02]",
              tier.popular
                ? "bg-white border-2 border-black overflow-hidden shadow-md"
                : "bg-neutral-50 border border-neutral-200"
            )}
          >
            <div className="relative z-10 flex flex-col h-full">
              <div className="mb-8">
                {tier.popular && (
                  <span className="inline-block px-4 py-1 mb-6 text-xs font-semibold tracking-wider text-white uppercase bg-black rounded-full">
                    Most Popular
                  </span>
                )}
                <h3 className="text-2xl font-semibold text-neutral-900">{tier.title}</h3>
                <div className="mt-4 flex items-baseline text-4xl font-extrabold text-neutral-900">
                  {tier.price !== "Custom" && <span className="text-2xl font-medium text-neutral-500 mr-1">Rp</span>}
                  {tier.price}
                </div>
                <p className="mt-4 text-sm text-neutral-600 line-clamp-2">
                  {tier.description}
                </p>
              </div>

              <ul className="mb-8 flex-1 space-y-4">
                {tier.features.map((feature, featureIdx) => (
                  <li key={featureIdx} className="flex items-start">
                    <div className={cn(
                      "flex-shrink-0 flex items-center justify-center p-1 rounded-full mr-3 mt-0.5",
                      tier.popular ? "bg-black text-white" : "bg-neutral-200 text-neutral-600"
                    )}>
                      <IconCheck className="w-4 h-4" stroke={3} />
                    </div>
                    <span className="text-sm text-neutral-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={cn(
                  "mt-auto w-full py-4 px-8 rounded-xl font-bold tracking-wide transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2",
                  tier.popular
                    ? "bg-black text-white hover:bg-neutral-800 focus:ring-black"
                    : "bg-white border border-neutral-300 text-neutral-900 hover:bg-neutral-100 focus:ring-neutral-200"
                )}
              >
                {tier.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
