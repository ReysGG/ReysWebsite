import React from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SiteConfig } from "@/lib/site-config";

type PricingContent = SiteConfig["pricing"];

const fallbackPricingTiers = [
  {
    title: "Starter",
    price: "5 juta",
    timeline: "7-10 hari",
    description: "Sempurna untuk personal branding dan bisnis pemula.",
    features: [
      "Landing page profesional",
      "Desain responsif mobile-first",
      "Form kontak dan integrasi WhatsApp",
      "Basic SEO setup",
      "Setup domain dan hosting",
    ],
    buttonText: "Mulai Sekarang",
    popular: false,
  },
];

export const PricingSection = ({ content }: { content: PricingContent }) => {
  const pricingTiers = content.tiers.length ? content.tiers : fallbackPricingTiers;

  return (
    <section id="pricing" className="w-full bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-4 text-xs font-bold uppercase tracking-wider text-[#ff8a00]">
            {content.eyebrow}
          </p>
          <h2 className="text-3xl font-bold leading-tight text-slate-950 md:text-5xl">
            {content.heading}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
            {content.description}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {pricingTiers.map((tier) => (
            <article
              key={tier.title}
              className={cn(
                "relative flex min-h-[620px] flex-col rounded-lg border bg-[#f7f9fb] p-7",
                tier.popular ? "border-[#ff8a00] bg-white" : "border-slate-200",
              )}
            >
              {tier.popular ? (
                <span className="mb-6 w-fit rounded-md bg-[#ff8a00] px-3 py-2 text-xs font-bold uppercase tracking-wider text-white">
                  Paling sesuai
                </span>
              ) : null}

              <div>
                <h3 className="text-2xl font-bold text-slate-950">{tier.title}</h3>
                <div className="mt-5 flex items-end gap-2 text-slate-950">
                  {tier.price !== "Custom" ? <span className="pb-1 text-xl font-semibold text-slate-500">Rp</span> : null}
                  <span className="text-4xl font-bold leading-none">{tier.price}</span>
                </div>
                <div className="mt-4 w-fit rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600">
                  Estimasi {tier.timeline}
                </div>
                <p className="mt-5 text-sm leading-relaxed text-slate-600">{tier.description}</p>
              </div>

              <div className="my-7 h-px bg-slate-200" />

              <ul className="flex-1 space-y-4">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm leading-relaxed text-slate-700">
                    <span
                      className={cn(
                        "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md",
                        tier.popular ? "bg-[#ff8a00] text-white" : "bg-slate-200 text-slate-700",
                      )}
                    >
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href="#cta"
                className={cn(
                  "mt-8 inline-flex w-full items-center justify-center rounded-md px-6 py-4 text-sm font-bold transition-colors duration-200",
                  tier.popular
                    ? "bg-[#ff8a00] text-white hover:bg-[#f4b738]"
                    : "border border-slate-300 bg-white text-slate-950 hover:border-[#ffcd80] hover:bg-slate-50",
                )}
              >
                {tier.buttonText}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
