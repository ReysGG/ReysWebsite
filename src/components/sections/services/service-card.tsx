import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ServiceItemConfig } from "@/lib/site-config";

type ServiceCardProps = {
  service: ServiceItemConfig;
  href: string;
  icon: React.ReactNode;
  tags?: string[];
  featured?: boolean;
  className?: string;
};

export function ServiceCard({
  service,
  href,
  icon,
  tags = [],
  featured = false,
  className,
}: ServiceCardProps) {
  const isExternal = href.startsWith("http");

  return (
    <article
      className={cn(
        "group relative flex min-h-[260px] flex-col overflow-hidden rounded-lg border border-slate-200 bg-white p-5 transition-colors duration-300 hover:border-[#ffcd80] md:min-h-[320px] md:p-7",
        featured && "min-h-[300px] md:min-h-[390px] md:p-10",
        className,
      )}
    >
      <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 -translate-y-12 translate-x-12 rounded-full bg-[#fffcc9] opacity-80 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative z-10 mb-6 flex items-start justify-between gap-6 md:mb-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-950">
          {icon}
        </div>
        <span className="text-sm font-bold uppercase tracking-wider text-slate-400">
          {service.number}
        </span>
      </div>

      <div className="relative z-10 flex flex-1 flex-col">
        <h3
          className={cn(
            "max-w-xl text-xl font-bold leading-snug text-slate-950 transition-colors duration-300 group-hover:text-[#ff8a00]",
            featured && "text-2xl md:text-3xl",
          )}
        >
          {service.title}
        </h3>
        <p
          className={cn(
            "mt-4 max-w-2xl text-sm leading-relaxed text-slate-600",
            featured && "text-base md:max-w-xl",
          )}
        >
          {service.description}
        </p>

        {tags.length ? (
          <div className="mt-7 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        <Link
          href={href}
          {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="mt-auto inline-flex min-h-11 w-fit items-center gap-2 pt-6 text-sm font-bold text-[#ff8a00] transition-colors duration-200 hover:text-slate-950 md:pt-8"
        >
          Diskusikan layanan
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
