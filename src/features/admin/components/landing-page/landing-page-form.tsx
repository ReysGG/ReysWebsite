"use client";

import React, { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import type { SiteConfig } from "@/lib/site-config";
import { addLandingPageFaqItem, saveLandingPageField } from "@/features/admin/actions/landing-page-actions";
import {
  getInlineEditFields,
  isSectionKey,
  LANDING_PAGE_SECTIONS,
  type InlineEditField,
  type SectionKey,
  type SectionMeta,
} from "@/features/admin/lib/landing-page-edit";

import { cn } from "@/lib/utils";
import { CtaSection } from "@/components/sections/cta";
import { FaqSection } from "@/components/sections/faq";
import { HeroSection } from "@/components/sections/hero";
import { PricingSection } from "@/components/sections/pricing";
import { ServicesSection } from "@/components/sections/services";
import { StatsSection } from "@/components/sections/stats";
import { WorkflowSection } from "@/components/sections/workflow";
import { HomepageShowcaseSection } from "@/components/sections/homepage-showcase";
import {
  BarChart3,
  CircleHelp,
  DollarSign,
  Layout,
  LineChart,
  ExternalLink,
  LayoutTemplate,
  ListChecks,
  Megaphone,
  MousePointerClick,
  Server,
  ShoppingBag,
  Pencil,
  Save,
} from "lucide-react";

const SERVICE_EDITOR_STYLES = [
  { icon: <Layout className="h-5 w-5 text-indigo-600" />, iconBg: "bg-indigo-50 border-indigo-200", cta: "Lihat paket Company Profile" },
  { icon: <Server className="h-5 w-5 text-indigo-600" />, iconBg: "bg-indigo-50 border-indigo-200", cta: "Diskusikan kebutuhan sistem" },
  { icon: <ShoppingBag className="h-5 w-5 text-indigo-600" />, iconBg: "bg-indigo-50 border-indigo-200", cta: "Mulai toko online" },
  { icon: <LineChart className="h-5 w-5 text-indigo-600" />, iconBg: "bg-indigo-50 border-indigo-200", cta: "Audit website saya" },
];

const SECTION_ICONS: Record<SectionKey, React.ReactNode> = {
  hero: <LayoutTemplate className="h-4 w-4" />,
  stats: <BarChart3 className="h-4 w-4" />,
  services: <ListChecks className="h-4 w-4" />,
  workflow: <MousePointerClick className="h-4 w-4" />,
  pricing: <DollarSign className="h-4 w-4" />,
  cta: <Megaphone className="h-4 w-4" />,
  faq: <CircleHelp className="h-4 w-4" />,
};

function SectionRenderer({
  section,
  config,
  editMode,
  onQuickEdit,
}: {
  section: SectionKey;
  config: SiteConfig;
  editMode: boolean;
  onQuickEdit: (field: InlineEditField) => void;
}) {
  switch (section) {
    case "hero":
      return editMode ? <HeroEditorPreview config={config} onQuickEdit={onQuickEdit} /> : <HeroSection content={config.hero} />;
    case "stats":
      return editMode ? <StatsEditorPreview config={config} onQuickEdit={onQuickEdit} /> : <StatsSection stats={config.stats} />;
    case "services":
      return editMode ? <ServicesEditorPreview config={config} onQuickEdit={onQuickEdit} /> : <ServicesSection content={config.services} />;
    case "workflow":
      return editMode ? <WorkflowEditorPreview config={config} onQuickEdit={onQuickEdit} /> : <WorkflowSection content={config.workflow} />;
    case "pricing":
      return editMode ? <PricingEditorPreview config={config} onQuickEdit={onQuickEdit} /> : <PricingSection content={config.pricing} />;
    case "cta":
      return editMode ? <CtaEditorPreview config={config} onQuickEdit={onQuickEdit} /> : <CtaSection content={config.cta} />;
    case "faq":
      return editMode ? <FaqEditorPreview config={config} onQuickEdit={onQuickEdit} /> : <FaqSection content={config.faq} />;
  }
}

function EditableTextButton({
  field,
  onClick,
  children,
  className,
}: {
  field: InlineEditField;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group/edit relative rounded-md outline-none transition-colors hover:bg-indigo-50/60 focus:bg-indigo-50/60 focus:ring-2 focus:ring-indigo-100",
        className
      )}
      title={`Edit ${field.label}`}
    >
      {children}
      <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-md border border-indigo-200 bg-white text-indigo-600 opacity-0 shadow-none transition-opacity group-hover/edit:opacity-100 group-focus/edit:opacity-100">
        <Pencil className="h-3 w-3" />
      </span>
    </button>
  );
}

function HeroEditorPreview({ config, onQuickEdit }: { config: SiteConfig; onQuickEdit: (field: InlineEditField) => void }) {
  const fields = getInlineEditFields("hero", config);
  const fieldByName = new Map(fields.map((field) => [field.name, field]));
  const field = (name: string) => fieldByName.get(name)!;

  return (
    <section className="relative flex min-h-[720px] w-full items-center justify-center overflow-hidden bg-[#f5f3ff] antialiased">
      <div className="pointer-events-none absolute inset-0 hidden overflow-hidden md:block">
        <svg className="absolute -top-[5%] right-0 h-[500px] w-[500px] text-black opacity-[0.04]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.2">
          {[10, 20, 30, 40, 50, 60, 70].map((n) => (
            <polyline key={n} points={`${n},-10 ${n},${100 - n} 110,${100 - n}`} />
          ))}
        </svg>
      </div>

      <div className="relative z-10 flex w-full flex-col items-center gap-10 px-6 py-16 md:px-12 lg:flex-row lg:gap-0">
        <div className="flex w-full flex-1 flex-col lg:flex-[0.95]">
          <EditableTextButton field={field("hero.trustText")} onClick={() => onQuickEdit(field("hero.trustText"))} className="mb-6 inline-flex w-fit items-center gap-3 border border-indigo-200 bg-indigo-50 px-4 py-2 text-xs font-semibold text-indigo-700 md:mb-8 md:text-sm">
            <span className="flex -space-x-2">
              {["DB", "AR", "SK", "MY"].map((init) => (
                <span key={init} className="flex h-6 w-6 items-center justify-center rounded-md border-2 border-[#EFECE6] bg-indigo-100 text-[9px] font-bold text-indigo-700 md:h-7 md:w-7">
                  {init}
                </span>
              ))}
            </span>
            <span className="tracking-tight">{config.hero.trustText}</span>
          </EditableTextButton>

          <h1 className="text-4xl font-bold leading-[1.05] tracking-tighter text-[#1A1A1A] sm:text-5xl md:text-6xl lg:text-7xl">
            <EditableTextButton field={field("hero.headlinePrefix")} onClick={() => onQuickEdit(field("hero.headlinePrefix"))} className="px-1 text-left">
              {config.hero.headlinePrefix}
            </EditableTextButton>
            <br className="hidden sm:block" />
            <EditableTextButton field={field("hero.rotatingWords")} onClick={() => onQuickEdit(field("hero.rotatingWords"))} className="mt-2 inline-flex flex-wrap gap-2 px-1 text-left text-indigo-600">
              {config.hero.rotatingWords.map((word) => (
                <span key={word} className="rounded-md border border-indigo-200 bg-white/60 px-2 py-1">
                  {word}
                </span>
              ))}
            </EditableTextButton>
          </h1>

          <EditableTextButton field={field("hero.description")} onClick={() => onQuickEdit(field("hero.description"))} className="mt-6 max-w-md px-2 py-1 text-left text-sm font-medium leading-relaxed text-neutral-600 md:text-base lg:text-lg">
            {config.hero.description}
          </EditableTextButton>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row md:gap-4">
            <EditableTextButton field={field("hero.primaryCta")} onClick={() => onQuickEdit(field("hero.primaryCta"))} className="inline-flex items-center justify-center bg-indigo-600 px-8 py-3.5 text-sm font-medium text-white hover:bg-indigo-700 md:text-base">
              {config.hero.primaryCta}
            </EditableTextButton>
            <EditableTextButton field={field("hero.secondaryCta")} onClick={() => onQuickEdit(field("hero.secondaryCta"))} className="inline-flex items-center justify-center border border-black/10 bg-white/60 px-8 py-3.5 text-sm font-medium text-[#111] backdrop-blur-sm hover:bg-white/80 md:text-base">
              {config.hero.secondaryCta}
            </EditableTextButton>
          </div>
        </div>

        <div className="pointer-events-none w-full flex-1 lg:flex-[1.05]">
          <HomepageShowcaseSection />
        </div>
      </div>
    </section>
  );
}

function StatsEditorPreview({ config, onQuickEdit }: { config: SiteConfig; onQuickEdit: (field: InlineEditField) => void }) {
  const fields = getInlineEditFields("stats", config);
  const fieldByName = new Map(fields.map((field) => [field.name, field]));

  const getField = (name: string) => {
    const field = fieldByName.get(name);
    if (!field) throw new Error(`Missing edit field: ${name}`);
    return field;
  };

  return (
    <section className="relative w-full overflow-hidden bg-white py-16">
      <div className="pointer-events-none absolute inset-0 flex select-none items-center justify-center overflow-hidden">
        <span
          className="text-[160px] font-black leading-none tracking-tighter md:text-[220px]"
          style={{ WebkitTextStroke: "1.5px rgba(99,102,241,0.06)", color: "transparent" }}
        >
          STATS
        </span>
      </div>

      <div className="w-full border-y border-indigo-100">
        <div className="w-full px-6 md:px-12">
          <div className="grid grid-cols-2 divide-x divide-indigo-100 py-8 md:grid-cols-4">
            {config.stats.map((stat, index) => {
              const valueField = getField(`stats.${index}.value`);
              const suffixField = getField(`stats.${index}.suffix`);
              const labelField = getField(`stats.${index}.label`);
              const descriptionField = getField(`stats.${index}.description`);

              return (
                <div key={index} className="flex flex-col items-center px-6 py-4 text-center md:px-10 first:pl-0 last:pr-0">
                  <div className="mb-2 text-4xl font-bold tracking-tight text-indigo-600 md:text-5xl lg:text-6xl">
                    <EditableTextButton field={valueField} onClick={() => onQuickEdit(valueField)} className="px-1">
                      {stat.value}
                    </EditableTextButton>
                    <EditableTextButton field={suffixField} onClick={() => onQuickEdit(suffixField)} className="px-1">
                      {stat.suffix}
                    </EditableTextButton>
                  </div>
                  <EditableTextButton field={labelField} onClick={() => onQuickEdit(labelField)} className="mb-1 px-2 text-sm font-semibold text-neutral-900">
                    {stat.label}
                  </EditableTextButton>
                  <EditableTextButton field={descriptionField} onClick={() => onQuickEdit(descriptionField)} className="px-2 text-xs leading-relaxed text-neutral-500">
                    {stat.description}
                  </EditableTextButton>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesEditorPreview({ config, onQuickEdit }: { config: SiteConfig; onQuickEdit: (field: InlineEditField) => void }) {
  const fields = getInlineEditFields("services", config);
  const fieldByName = new Map(fields.map((field) => [field.name, field]));

  const getField = (name: string) => {
    const field = fieldByName.get(name);
    if (!field) throw new Error(`Missing edit field: ${name}`);
    return field;
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#f5f3ff] py-20 md:py-24">
      <div className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-indigo-100/60 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full bg-cyan-100/50 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
        <div className="mb-16 flex flex-col md:mb-20">
          <EditableTextButton field={getField("services.eyebrow")} onClick={() => onQuickEdit(getField("services.eyebrow"))} className="mb-4 w-fit px-1 text-left text-xs font-bold uppercase tracking-widest text-indigo-600">
            {config.services.eyebrow}
          </EditableTextButton>
          <EditableTextButton field={getField("services.heading")} onClick={() => onQuickEdit(getField("services.heading"))} className="max-w-4xl px-1 text-left text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl lg:text-6xl">
            {config.services.heading}
          </EditableTextButton>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {config.services.items.map((service, index) => {
            const style = SERVICE_EDITOR_STYLES[index % SERVICE_EDITOR_STYLES.length];
            const numberField = getField(`services.items.${index}.number`);
            const titleField = getField(`services.items.${index}.title`);
            const descriptionField = getField(`services.items.${index}.description`);

            return (
              <div key={index} className="group relative flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm transition-all duration-300 hover:border-indigo-200 hover:shadow-md hover:shadow-indigo-50/50">
                <div className="relative z-10 mb-8 flex items-start justify-between">
                  <div className={`rounded-xl border p-2.5 ${style.iconBg}`}>{style.icon}</div>
                  <EditableTextButton field={numberField} onClick={() => onQuickEdit(numberField)} className="px-1 text-5xl font-black leading-none text-neutral-100">
                    {service.number}
                  </EditableTextButton>
                </div>

                <div className="relative z-10 flex flex-1 flex-col">
                  <EditableTextButton field={titleField} onClick={() => onQuickEdit(titleField)} className="mb-3 px-1 text-left text-lg font-bold leading-snug tracking-tight text-neutral-900 transition-colors group-hover:text-indigo-600">
                    {service.title}
                  </EditableTextButton>
                  <EditableTextButton field={descriptionField} onClick={() => onQuickEdit(descriptionField)} className="flex-1 px-1 text-left text-sm leading-relaxed text-neutral-600">
                    {service.description}
                  </EditableTextButton>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600">
                    {style.cta}
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


function WorkflowEditorPreview({ config, onQuickEdit }: { config: SiteConfig; onQuickEdit: (field: InlineEditField) => void }) {
  const fields = getInlineEditFields("workflow", config);
  const fieldByName = new Map(fields.map((field) => [field.name, field]));
  const getField = (name: string) => {
    const field = fieldByName.get(name);
    if (!field) throw new Error(`Missing edit field: ${name}`);
    return field;
  };

  return (
    <section className="relative w-full overflow-hidden bg-white py-20 md:py-24">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[700px] -translate-x-1/2 rounded-full bg-indigo-100/50 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[350px] w-[350px] rounded-full bg-violet-100/40 blur-[100px]" />
      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
        <div className="relative z-10 mb-16 flex flex-col items-center text-center md:mb-20">
          <EditableTextButton field={getField("workflow.eyebrow")} onClick={() => onQuickEdit(getField("workflow.eyebrow"))} className="mb-4 px-1 text-xs font-bold uppercase tracking-widest text-indigo-600">
            {config.workflow.eyebrow}
          </EditableTextButton>
          <h2 className="mb-6 text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl lg:text-6xl">
            <EditableTextButton field={getField("workflow.headingPrefix")} onClick={() => onQuickEdit(getField("workflow.headingPrefix"))} className="px-1">
              {config.workflow.headingPrefix}
            </EditableTextButton>{" "}
            <EditableTextButton field={getField("workflow.rotatingWords")} onClick={() => onQuickEdit(getField("workflow.rotatingWords"))} className="px-1 text-neutral-600">
              {config.workflow.rotatingWords.join(", ")}
            </EditableTextButton>
          </h2>
          <EditableTextButton field={getField("workflow.description")} onClick={() => onQuickEdit(getField("workflow.description"))} className="max-w-2xl px-2 text-base leading-relaxed text-neutral-600 md:text-lg">
            {config.workflow.description}
          </EditableTextButton>
        </div>
        <div className="relative z-10 mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          <div className="absolute left-[12%] top-[40px] z-0 hidden h-px w-[76%] bg-gradient-to-r from-indigo-200 via-indigo-300 to-indigo-200 lg:block" />
          {config.workflow.steps.map((item, idx) => {
            const stepField = getField(`workflow.steps.${idx}.step`);
            const titleField = getField(`workflow.steps.${idx}.title`);
            const descriptionField = getField(`workflow.steps.${idx}.description`);
            return (
              <div key={idx} className="group relative z-10 flex flex-col items-center text-center lg:items-start lg:text-left">
                <EditableTextButton field={stepField} onClick={() => onQuickEdit(stepField)} className="mb-8 flex h-20 w-20 items-center justify-center rounded-2xl border border-indigo-200 bg-indigo-50 text-2xl font-bold text-indigo-600 shadow-sm transition-all duration-500 group-hover:border-indigo-400 group-hover:shadow-md">
                  {item.step}
                </EditableTextButton>
                <EditableTextButton field={titleField} onClick={() => onQuickEdit(titleField)} className="mb-3 px-1 text-xl font-semibold text-neutral-900 transition-colors duration-500 group-hover:text-indigo-600">
                  {item.title}
                </EditableTextButton>
                <EditableTextButton field={descriptionField} onClick={() => onQuickEdit(descriptionField)} className="mx-auto max-w-[250px] px-1 text-sm leading-relaxed text-neutral-600 lg:mx-0">
                  {item.description}
                </EditableTextButton>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PricingEditorPreview({ config, onQuickEdit }: { config: SiteConfig; onQuickEdit: (field: InlineEditField) => void }) {
  const fields = getInlineEditFields("pricing", config);
  const fieldByName = new Map(fields.map((field) => [field.name, field]));
  const getField = (name: string) => {
    const field = fieldByName.get(name);
    if (!field) throw new Error(`Missing edit field: ${name}`);
    return field;
  };

  return (
    <section className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-white py-20 md:py-24">
      <div className="relative z-10 mx-auto mb-16 w-full max-w-7xl px-6 text-center md:px-12">
        <EditableTextButton field={getField("pricing.eyebrow")} onClick={() => onQuickEdit(getField("pricing.eyebrow"))} className="mb-4 px-1 text-xs font-bold uppercase tracking-widest text-indigo-600">
          {config.pricing.eyebrow}
        </EditableTextButton>
        <EditableTextButton field={getField("pricing.heading")} onClick={() => onQuickEdit(getField("pricing.heading"))} className="mx-auto mb-6 block px-1 text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl lg:text-6xl">
          {config.pricing.heading}
        </EditableTextButton>
        <EditableTextButton field={getField("pricing.description")} onClick={() => onQuickEdit(getField("pricing.description"))} className="mx-auto block max-w-2xl px-2 text-base leading-relaxed text-neutral-600 md:text-lg">
          {config.pricing.description}
        </EditableTextButton>
      </div>
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 md:px-12 lg:grid-cols-3">
        {config.pricing.tiers.map((tier, idx) => {
          const popular = tier.popular;
          const titleField = getField(`pricing.tiers.${idx}.title`);
          const priceField = getField(`pricing.tiers.${idx}.price`);
          const timelineField = getField(`pricing.tiers.${idx}.timeline`);
          const descriptionField = getField(`pricing.tiers.${idx}.description`);
          const featuresField = getField(`pricing.tiers.${idx}.features`);
          const buttonField = getField(`pricing.tiers.${idx}.buttonText`);
          return (
            <div key={idx} className={cn("relative flex flex-col rounded-3xl p-8 shadow-sm transition-all duration-300", popular ? "overflow-hidden border-2 border-indigo-500 bg-white shadow-lg shadow-indigo-100 lg:-translate-y-4 lg:scale-[1.03]" : "border border-neutral-200 bg-white")}>
              {popular ? <span className="mb-6 inline-block w-fit rounded-full bg-indigo-600 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-white">Paling Populer</span> : null}
              <EditableTextButton field={titleField} onClick={() => onQuickEdit(titleField)} className="mb-4 px-1 text-left text-2xl font-semibold text-neutral-900">
                {tier.title}
              </EditableTextButton>
              <div className="mb-3 flex items-baseline text-4xl font-extrabold text-neutral-900">
                {tier.price !== "Custom" && <span className="mr-1 text-2xl font-medium text-neutral-500">Rp</span>}
                <EditableTextButton field={priceField} onClick={() => onQuickEdit(priceField)} className="px-1">{tier.price}</EditableTextButton>
              </div>
              <EditableTextButton field={timelineField} onClick={() => onQuickEdit(timelineField)} className="mb-4 w-fit rounded-full bg-neutral-100 px-3 py-1 text-xs font-bold text-neutral-600">
                Estimasi {tier.timeline}
              </EditableTextButton>
              <EditableTextButton field={descriptionField} onClick={() => onQuickEdit(descriptionField)} className="mb-6 px-1 text-left text-sm text-neutral-600">
                {tier.description}
              </EditableTextButton>
              <EditableTextButton field={featuresField} onClick={() => onQuickEdit(featuresField)} className="mb-8 flex-1 px-1 text-left">
                <ul className="space-y-4">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start text-sm text-neutral-600"><span className={cn("mr-3 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold", popular ? "bg-indigo-600 text-white" : "bg-neutral-200 text-neutral-600")}>✓</span>{feature}</li>
                  ))}
                </ul>
              </EditableTextButton>
              <EditableTextButton field={buttonField} onClick={() => onQuickEdit(buttonField)} className={cn("mt-auto inline-flex w-full items-center justify-center rounded-xl px-8 py-4 font-bold tracking-wide", popular ? "bg-indigo-600 text-white" : "border border-neutral-300 bg-white text-neutral-900")}>
                {tier.buttonText}
              </EditableTextButton>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function CtaEditorPreview({ config, onQuickEdit }: { config: SiteConfig; onQuickEdit: (field: InlineEditField) => void }) {
  const fields = getInlineEditFields("cta", config);
  const fieldByName = new Map(fields.map((field) => [field.name, field]));
  const getField = (name: string) => {
    const field = fieldByName.get(name);
    if (!field) throw new Error(`Missing edit field: ${name}`);
    return field;
  };

  return (
    <section className="relative w-full overflow-hidden bg-white py-24 md:py-32">
      <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.8) 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 text-center md:px-12">
        <EditableTextButton field={getField("cta.badge")} onClick={() => onQuickEdit(getField("cta.badge"))} className="mb-8 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-indigo-600">
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />{config.cta.badge}
        </EditableTextButton>
        <h2 className="mb-8 text-5xl font-bold leading-none tracking-tight md:text-7xl lg:text-8xl">
          <EditableTextButton field={getField("cta.headingTop")} onClick={() => onQuickEdit(getField("cta.headingTop"))} className="px-1 text-neutral-900">{config.cta.headingTop}</EditableTextButton>
          <br />
          <EditableTextButton field={getField("cta.headingAccent")} onClick={() => onQuickEdit(getField("cta.headingAccent"))} className="px-1 text-indigo-600">{config.cta.headingAccent}</EditableTextButton>
        </h2>
        <EditableTextButton field={getField("cta.description")} onClick={() => onQuickEdit(getField("cta.description"))} className="mx-auto mb-12 max-w-2xl px-2 text-lg leading-relaxed text-neutral-600 md:text-xl">
          {config.cta.description}
        </EditableTextButton>
        <div className="mb-16 flex flex-col items-center gap-4 sm:flex-row">
          <EditableTextButton field={getField("cta.primaryCta")} onClick={() => onQuickEdit(getField("cta.primaryCta"))} className="inline-flex items-center gap-3 rounded-full bg-indigo-600 px-8 py-4 text-base font-bold text-white shadow-md shadow-neutral-900/10">
            {config.cta.primaryCta} →
          </EditableTextButton>
          <EditableTextButton field={getField("cta.secondaryCta")} onClick={() => onQuickEdit(getField("cta.secondaryCta"))} className="inline-flex items-center gap-2 rounded-full border border-neutral-300 px-8 py-4 text-base font-semibold text-neutral-700">
            {config.cta.secondaryCta}
          </EditableTextButton>
        </div>
        <div className="flex flex-col items-center gap-6 text-sm text-neutral-600 sm:flex-row">
          <EditableTextButton field={getField("cta.socialProof")} onClick={() => onQuickEdit(getField("cta.socialProof"))} className="inline-flex items-center gap-3 px-1">
            <span className="flex -space-x-2">{["DB", "AR", "SK", "MY"].map((init) => <span key={init} className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-indigo-100 text-[10px] font-bold text-indigo-700">{init}</span>)}</span>{config.cta.socialProof}
          </EditableTextButton>
          <div className="hidden h-4 w-px bg-neutral-300 sm:block" />
          <EditableTextButton field={getField("cta.ratingText")} onClick={() => onQuickEdit(getField("cta.ratingText"))} className="inline-flex items-center gap-1 px-1">
            <span className="text-amber-400">★★★★★</span><span>{config.cta.ratingText}</span>
          </EditableTextButton>
        </div>
      </div>
    </section>
  );
}

function FaqEditorPreview({ config, onQuickEdit }: { config: SiteConfig; onQuickEdit: (field: InlineEditField) => void }) {
  const fields = getInlineEditFields("faq", config);
  const fieldByName = new Map(fields.map((field) => [field.name, field]));
  const getField = (name: string) => {
    const field = fieldByName.get(name);
    if (!field) throw new Error(`Missing edit field: ${name}`);
    return field;
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#f5f3ff] py-24 md:py-32">
      <div className="mx-auto flex max-w-7xl flex-col gap-16 px-6 md:flex-row md:px-12 lg:gap-24">
        <div className="flex w-full flex-col md:w-1/3">
          <EditableTextButton field={getField("faq.eyebrow")} onClick={() => onQuickEdit(getField("faq.eyebrow"))} className="mb-4 w-fit px-1 text-left text-xs font-bold uppercase tracking-widest text-indigo-600">
            {config.faq.eyebrow}
          </EditableTextButton>
          <EditableTextButton field={getField("faq.heading")} onClick={() => onQuickEdit(getField("faq.heading"))} className="px-1 text-left text-4xl font-bold leading-tight tracking-tight text-neutral-900 md:text-5xl lg:text-6xl">
            {config.faq.heading}
          </EditableTextButton>
        </div>
        <div className="flex w-full flex-col md:w-7/12 lg:w-2/3">
          {config.faq.items.map((faq, index) => {
            const questionField = getField(`faq.items.${index}.question`);
            const answerField = getField(`faq.items.${index}.answer`);
            return (
              <div key={index} className={cn("flex flex-col border-b border-neutral-200", index === 0 && "border-t")}>
                <div className="flex w-full items-center gap-6 py-6 text-left">
                  <span className="shrink-0 text-indigo-600">+</span>
                  <EditableTextButton field={questionField} onClick={() => onQuickEdit(questionField)} className="px-1 text-left text-lg font-medium text-neutral-800 md:text-xl">
                    {faq.question}
                  </EditableTextButton>
                </div>
                <EditableTextButton field={answerField} onClick={() => onQuickEdit(answerField)} className="mb-6 ml-11 px-1 text-left text-base leading-relaxed text-neutral-600">
                  {faq.answer}
                </EditableTextButton>
              </div>
            );
          })}
          <AddFaqItemForm />
        </div>
      </div>
    </section>
  );
}

function AddFaqItemForm() {
  const [state, formAction, isPending] = useActionState(addLandingPageFaqItem, { success: false });

  return (
    <form action={formAction} className="mt-8 rounded-2xl border border-dashed border-indigo-200 bg-white/70 p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-neutral-900">Tambah FAQ baru</p>
          <p className="mt-1 text-xs text-neutral-500">Isi pertanyaan dan jawaban, lalu simpan. Item baru akan muncul di bawah daftar FAQ.</p>
        </div>
        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-600">Create</span>
      </div>

      <div className="mt-4 space-y-3">
        <label className="block text-xs font-semibold uppercase tracking-widest text-neutral-500" htmlFor="faq-question">
          Pertanyaan
        </label>
        <input
          id="faq-question"
          name="question"
          placeholder="Contoh: Apakah bisa request desain custom?"
          className="w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 outline-none transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />

        <label className="block text-xs font-semibold uppercase tracking-widest text-neutral-500" htmlFor="faq-answer">
          Jawaban
        </label>
        <textarea
          id="faq-answer"
          name="answer"
          rows={4}
          placeholder="Tulis jawaban FAQ di sini..."
          className="w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 outline-none transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />
      </div>

      {state.error ? <p className="mt-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">{state.error}</p> : null}
      {state.success && state.message ? <p className="mt-3 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">{state.message}</p> : null}

      <div className="mt-4 flex justify-end">
        <button disabled={isPending} className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-300">
          <Save className="h-4 w-4" />
          {isPending ? "Menambahkan..." : "Tambah Pertanyaan"}
        </button>
      </div>
    </form>
  );
}

function EditableFrame({
  section,
  active,
  quickFields,
  editMode,
  onQuickEdit,
  children,
}: {
  section: SectionMeta;
  active: boolean;
  editMode: boolean;
  quickFields: InlineEditField[];
  onQuickEdit: (field: InlineEditField) => void;
  children: React.ReactNode;
}) {
  return (
    <section
      id={`preview-${section.key}`}
      className={cn(
        "group relative overflow-hidden rounded-md border bg-white shadow-none transition-colors",
        active && editMode ? "border-indigo-500 ring-2 ring-indigo-100" : "border-neutral-200"
      )}
    >
      <div className="sticky top-0 z-20 flex items-center justify-between border-b border-neutral-200 bg-white/95 px-3 py-2 backdrop-blur">
        <div className="flex items-center gap-2 text-sm font-semibold text-neutral-800">
          <span className={cn("text-neutral-400", active && "text-indigo-600")}>{SECTION_ICONS[section.key]}</span>
          <span>{section.label}</span>
        </div>
        <p className="text-xs text-neutral-400">
          {editMode ? "Klik elemen untuk edit" : "Preview mode"}
        </p>
      </div>
      <div className="relative bg-white">
        <div className={cn(editMode && quickFields.length === 0 ? "" : "pointer-events-none")}>{children}</div>
        {editMode && quickFields.length ? (
          quickFields.some((field) => field.hotspotClassName) ? (
            <div className="absolute inset-0 z-10">
              {quickFields.map((field) => (
                <ElementHotspot key={field.name} field={field} onClick={() => onQuickEdit(field)} />
              ))}
            </div>
          ) : (
            <div className="absolute left-3 top-16 z-10 flex max-w-[calc(100%-1.5rem)] flex-wrap gap-2">
              {quickFields.map((field) => (
                <QuickEditButton key={field.name} field={field} onClick={() => onQuickEdit(field)} />
              ))}
            </div>
          )
        ) : null}
      </div>
    </section>
  );
}

function QuickEditButton({ field, onClick }: { field: InlineEditField; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1.5 rounded-md border border-indigo-200 bg-white/95 px-2.5 py-1.5 text-xs font-semibold text-indigo-700 shadow-none backdrop-blur transition-colors hover:border-indigo-300 hover:bg-indigo-50"
    >
      <Pencil className="h-3.5 w-3.5" />
      {field.label}
    </button>
  );
}

function ElementHotspot({ field, onClick }: { field: InlineEditField; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={field.label}
      className={cn(
        "absolute rounded-md border border-transparent bg-transparent text-left shadow-none outline-none transition-colors hover:border-indigo-300/70 hover:bg-indigo-50/20 focus:border-indigo-400 focus:bg-indigo-50/20 focus:ring-2 focus:ring-indigo-100",
        field.hotspotClassName ?? "left-3 top-16 h-9 w-32"
      )}
    >
      <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-md border border-indigo-200 bg-white text-indigo-600 opacity-80 shadow-none transition-opacity hover:opacity-100">
        <Pencil className="h-3 w-3" />
      </span>
      <span className="sr-only">Edit {field.label}</span>
    </button>
  );
}

function InlineEditModal({ field, onClose }: { field: InlineEditField | null; onClose: () => void }) {
  const [state, formAction, isPending] = useActionState(saveLandingPageField, { success: false });

  if (!field) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/40 p-4" role="dialog" aria-modal="true">
      <div className="w-full max-w-xl rounded-md border border-neutral-200 bg-white p-5 shadow-none">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">Inline Edit</p>
            <h3 className="mt-2 text-lg font-bold text-neutral-900">{field.label}</h3>
            <p className="mt-1 text-sm text-neutral-500">Field: {field.name}</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-md border border-neutral-200 px-3 py-1.5 text-sm font-semibold text-neutral-700 hover:bg-neutral-50">
            Tutup
          </button>
        </div>

        <form action={formAction} className="mt-5 space-y-4">
          <input type="hidden" name="name" value={field.name} />
          <label className="block text-sm font-semibold text-neutral-700" htmlFor={`inline-${field.name}`}>
            Konten
          </label>
          {field.textarea ? (
            <textarea
              id={`inline-${field.name}`}
              name="value"
              defaultValue={field.value}
              rows={6}
              className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm text-neutral-900 outline-none transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          ) : (
            <input
              id={`inline-${field.name}`}
              name="value"
              defaultValue={field.value}
              className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm text-neutral-900 outline-none transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          )}
          {state.error ? <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">{state.error}</p> : null}
          {state.success && state.message ? <p className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">{state.message}</p> : null}
          <div className="flex justify-end gap-2 border-t border-neutral-200 pt-4">
            <button type="button" onClick={onClose} className="rounded-md border border-neutral-200 px-4 py-2 text-sm font-semibold text-neutral-700 hover:bg-neutral-50">
              Batal
            </button>
            <button disabled={isPending} className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-none transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-300">
              <Save className="h-4 w-4" />
              {isPending ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function LandingPageForm({ config, initialSection = "hero" }: { config: SiteConfig; initialSection?: SectionKey }) {
  const [activeSection, setActiveSection] = useState<SectionKey>(initialSection);
  const [inlineField, setInlineField] = useState<InlineEditField | null>(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const syncHash = () => {
      const hash = window.location.hash.replace("#", "").replace("preview-", "");
      if (isSectionKey(hash)) setActiveSection(hash);
    };

    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  const active = LANDING_PAGE_SECTIONS.find((section) => section.key === activeSection) ?? LANDING_PAGE_SECTIONS[0];

  return (
    <>
      <div className="space-y-4">
        <div className="sticky top-0 z-30 rounded-md border border-neutral-200 bg-white/95 p-3 shadow-none backdrop-blur">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">Visual Editor</p>
              <p className="mt-1 text-sm text-neutral-600">Preview bersih secara default. Aktifkan mode edit untuk klik elemen dan ubah konten.</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-700">Aktif: {active.label}</span>
              <button
                type="button"
                onClick={() => setEditMode((current) => !current)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold transition-colors",
                  editMode
                    ? "bg-indigo-600 text-white hover:bg-indigo-700"
                    : "border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50"
                )}
              >
                <Pencil className="h-4 w-4" />
                {editMode ? "Mode Preview" : "Mode Edit"}
              </button>
              <Link href="/" target="_blank" className="inline-flex items-center gap-2 rounded-md border border-neutral-200 px-3 py-2 text-sm font-semibold text-neutral-700 hover:bg-neutral-50">
                Lihat Website <ExternalLink className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        <div className="rounded-md border border-neutral-200 bg-neutral-50 p-3 shadow-none">
          <EditableFrame
            section={active}
            active
            editMode={editMode}
            quickFields={editMode ? [] : getInlineEditFields(activeSection, config)}
            onQuickEdit={(field) => {
              setActiveSection(field.section);
              setInlineField(field);
            }}
          >
            <SectionRenderer
              section={activeSection}
              config={config}
              editMode={editMode}
              onQuickEdit={(field) => {
                setActiveSection(field.section);
                setInlineField(field);
              }}
            />
          </EditableFrame>
        </div>
      </div>
      <InlineEditModal field={inlineField} onClose={() => setInlineField(null)} />
    </>
  );
}
