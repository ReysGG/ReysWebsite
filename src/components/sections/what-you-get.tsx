import React from "react";
import { Check } from "lucide-react";
import type { SiteConfig } from "@/lib/site-config";

export const WhatYouGetSection = ({ content }: { content: SiteConfig["whatYouGet"] }) => {
  return (
    <section className="w-full border-y border-slate-200 bg-[#f2f4f6] py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 md:px-12 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-4">
          <p className="mb-4 text-xs font-bold uppercase tracking-wider text-blue-600">
            {content.eyebrow}
          </p>
          <h2 className="text-3xl font-bold leading-tight text-slate-950 md:text-5xl">
            {content.heading}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-slate-600">
            {content.description}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-8">
          {content.items.map((item) => (
            <div key={item} className="flex gap-4 rounded-lg border border-slate-200 bg-white p-5">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-blue-600 text-white">
                <Check className="h-4 w-4" strokeWidth={3} />
              </span>
              <p className="text-sm font-semibold leading-relaxed text-slate-700">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
