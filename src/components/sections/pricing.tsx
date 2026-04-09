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
    <section id="pricing" className="relative w-full py-24 md:py-32 bg-black overflow-hidden flex flex-col items-center justify-center">
      {/* Background Spotlight for premium feeling */}
      <Spotlight
        className="-top-40 right-0 md:right-[-20%] md:-top-20"
        fill="gold"
      />
      <Spotlight
        className="top-40 left-0 md:left-[-20%] md:top-20"
        fill="white"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full mb-16 items-center text-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
          Investasi <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500">Berkelas</span>
        </h2>
        <p className="text-base md:text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
          Harga yang transparan untuk hasil karya digital yang tidak murahan. Pilih paket yang sesuai dengan visi besar bisnis Anda.
        </p>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 md:px-12 lg:grid-cols-3 relative z-10">
        {pricingTiers.map((tier, idx) => (
          <div
            key={idx}
            className={cn(
              "relative flex flex-col rounded-3xl p-8 shadow-2xl backdrop-blur-sm transition-transform duration-300 hover:scale-[1.02]",
              tier.popular
                ? "bg-neutral-900 border border-yellow-500/30 overflow-hidden"
                : "bg-neutral-900/50 border border-neutral-800"
            )}
          >
            {/* Aceternity Background Gradient emulation for the popular tier */}
            {tier.popular && (
              <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none"></div>
            )}
            
            {tier.popular && (
              <div className="absolute top-0 right-0 -mr-4 -mt-4 w-32 h-32 rounded-full bg-yellow-500/20 blur-3xl"></div>
            )}

            <div className="relative z-10 flex flex-col h-full">
              <div className="mb-8">
                {tier.popular && (
                  <span className="inline-block px-4 py-1 mb-6 text-xs font-semibold tracking-wider text-black uppercase bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 rounded-full shadow-[0_0_15px_rgba(250,204,21,0.3)]">
                    Most Popular
                  </span>
                )}
                <h3 className="text-2xl font-semibold text-white">{tier.title}</h3>
                <div className="mt-4 flex items-baseline text-4xl font-extrabold text-white">
                  {tier.price !== "Custom" && <span className="text-2xl font-medium text-neutral-400 mr-1">Rp</span>}
                  {tier.price}
                </div>
                <p className="mt-4 text-sm text-neutral-400 line-clamp-2">
                  {tier.description}
                </p>
              </div>

              <ul className="mb-8 flex-1 space-y-4">
                {tier.features.map((feature, featureIdx) => (
                  <li key={featureIdx} className="flex items-start">
                    <div className={cn(
                      "flex-shrink-0 flex items-center justify-center p-1 rounded-full mr-3 mt-0.5",
                      tier.popular ? "bg-amber-500/20 text-yellow-500" : "bg-neutral-800 text-neutral-300"
                    )}>
                      <IconCheck className="w-4 h-4" stroke={3} />
                    </div>
                    <span className="text-sm text-neutral-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={cn(
                  "mt-auto w-full py-4 px-8 rounded-xl font-bold tracking-wide transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black",
                  tier.popular
                    ? "bg-gradient-to-r from-amber-300 via-yellow-500 to-amber-600 text-black shadow-[0_0_20px_rgba(250,204,21,0.4)] hover:shadow-[0_0_30px_rgba(250,204,21,0.6)] focus:ring-yellow-500"
                    : "bg-white text-black hover:bg-neutral-200 focus:ring-white"
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
