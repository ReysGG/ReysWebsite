import React from "react";
import Image from "next/image";
import { BarChart3, BriefcaseBusiness, LineChart, MonitorSmartphone, ShoppingBag } from "lucide-react";
import { ServiceCard } from "@/components/sections/services/service-card";
import type { SiteConfig } from "@/lib/site-config";

type ServicesContent = SiteConfig["services"];

const SERVICE_META = [
  {
    icon: <BriefcaseBusiness className="h-5 w-5" />,
    tags: ["Company profile", "Landing page", "Trust"],
  },
  {
    icon: <BarChart3 className="h-5 w-5" />,
    tags: ["Dashboard", "Workflow", "Admin panel"],
  },
  {
    icon: <ShoppingBag className="h-5 w-5" />,
    tags: ["Katalog", "Checkout", "WhatsApp"],
  },
  {
    icon: <LineChart className="h-5 w-5" />,
    tags: ["SEO", "Performance", "Analytics"],
  },
];

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

function ServicesVisualPanel() {
  return (
    <aside className="relative min-h-[240px] overflow-hidden rounded-lg border border-slate-200 bg-slate-100 sm:min-h-[320px] lg:col-span-4">
      <Image
        src="/hero-desk-clean.jpg"
        alt="Workspace pengembangan website Build With Reys"
        fill
        className="object-cover opacity-90"
        sizes="(max-width: 1024px) 100vw, 420px"
      />
      <div className="absolute inset-0 bg-linear-to-t from-slate-950/50 via-slate-950/5 to-transparent" />
      <div className="absolute bottom-4 left-4 right-4 rounded-lg border border-white/20 bg-white/85 p-3 backdrop-blur sm:bottom-5 sm:left-5 sm:right-5 sm:p-4">
        <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
          <MonitorSmartphone className="h-4 w-4 text-[#ff8a00]" />
          Scope sebelum coding
        </div>
        <p className="text-sm font-semibold leading-relaxed text-slate-950">
          Setiap halaman, fitur, timeline, dan deliverable dirapikan sebelum development dimulai.
        </p>
      </div>
    </aside>
  );
}

export const ServicesSection = ({
  content,
  whatsappUrl,
}: {
  content: ServicesContent;
  whatsappUrl?: string;
}) => {
  const [featuredService, ...otherServices] = content.items;

  if (!featuredService) return null;

  return (
    <section id="services" className="w-full bg-[#f7f9fb] py-14 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12">
        <div className="mb-8 max-w-3xl md:mb-14">
          <div className="mb-6 inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-[#ff8a00]" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              {content.eyebrow}
            </span>
          </div>
          <h2 className="max-w-4xl text-[1.7rem] font-bold leading-tight text-slate-950 md:text-5xl">
            {content.heading}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <ServiceCard
            service={featuredService}
            href={buildServiceCtaHref(whatsappUrl, featuredService.title)}
            icon={SERVICE_META[0]?.icon}
            tags={SERVICE_META[0]?.tags}
            featured
            className="lg:col-span-8"
          />

          <ServicesVisualPanel />

          {otherServices.map((service, index) => {
            const meta = SERVICE_META[index + 1] ?? SERVICE_META[0];
            const colSpan = otherServices.length === 3 ? "lg:col-span-4" : "lg:col-span-6";

            return (
              <ServiceCard
                key={service.title}
                service={service}
                href={buildServiceCtaHref(whatsappUrl, service.title)}
                icon={meta.icon}
                tags={meta.tags}
                className={colSpan}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};
