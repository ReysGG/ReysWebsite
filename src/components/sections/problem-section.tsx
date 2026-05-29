import React from "react";
import type { SiteConfig } from "@/lib/site-config";

const COLUMN_CLASSES: Record<number, string> = {
  1: "md:grid-cols-1 lg:grid-cols-1",
  2: "md:grid-cols-2 lg:grid-cols-2",
  3: "md:grid-cols-2 lg:grid-cols-3",
  4: "md:grid-cols-2 lg:grid-cols-4",
};

export const ProblemSection = ({ content }: { content: SiteConfig["problems"] }) => {
  const count = content.items.length;
  const columnClass = COLUMN_CLASSES[count] ?? "md:grid-cols-2 lg:grid-cols-3";

  return (
    <section className="w-full bg-white py-14 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12">
        <div className="mb-8 max-w-3xl md:mb-14">
          <p className="mb-4 text-xs font-bold uppercase tracking-wider text-[#ff8a00]">
            {content.eyebrow}
          </p>
          <h2 className="text-[1.7rem] font-bold leading-tight text-slate-950 md:text-5xl">
            {content.heading}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-slate-600 md:text-lg">
            {content.description}
          </p>
        </div>

        <div className={`grid grid-cols-1 gap-6 ${columnClass}`}>
          {content.items.map((problem, index) => (
            <article
              key={problem.title}
              className="rounded-lg border border-slate-200 bg-[#f7f9fb] p-5 transition-colors duration-300 hover:border-[#ffcd80] md:p-7"
            >
              <span className="mb-7 flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 bg-white text-sm font-bold text-[#ff8a00]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-lg font-bold leading-snug text-slate-950">{problem.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">{problem.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
