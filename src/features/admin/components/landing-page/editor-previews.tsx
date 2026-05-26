"use client";

import React, { useActionState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  ClipboardList,
  Layout,
  LineChart,
  Monitor,
  Pencil,
  Save,
  Server,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
} from "lucide-react";
import { addLandingPageFaqItem } from "@/features/admin/actions/landing-page-actions";
import type { SiteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { CtaSection } from "@/components/sections/cta";
import { FaqSection } from "@/components/sections/faq";
import { HeroSection } from "@/components/sections/hero";
import { PricingSection } from "@/components/sections/pricing";
import { ServicesSection } from "@/components/sections/services";
import { StatsSection } from "@/components/sections/stats";
import { WorkflowSection } from "@/components/sections/workflow";
import { TrustStripSection } from "@/components/sections/trust-strip";
import { ProblemSection } from "@/components/sections/problem-section";
import { WhatYouGetSection } from "@/components/sections/what-you-get";

import { getInlineEditFields, type InlineEditField, type SectionKey } from "@/features/admin/lib/landing-page-edit";

const SERVICE_EDITOR_STYLES = [
  { icon: <Layout className="h-5 w-5" />, cta: "Lihat paket Company Profile" },
  { icon: <Server className="h-5 w-5" />, cta: "Diskusikan kebutuhan sistem" },
  { icon: <ShoppingBag className="h-5 w-5" />, cta: "Mulai toko online" },
  { icon: <LineChart className="h-5 w-5" />, cta: "Audit website saya" },
];

const TRUST_EDITOR_STYLES = [
  { icon: <ClipboardList className="h-7 w-7 stroke-[1.8] md:h-8 md:w-8" />, number: "01" },
  { icon: <Monitor className="h-7 w-7 stroke-[1.8] md:h-8 md:w-8" />, number: "02" },
  { icon: <Smartphone className="h-7 w-7 stroke-[1.8] md:h-8 md:w-8" />, number: "03" },
  { icon: <BookOpen className="h-7 w-7 stroke-[1.8] md:h-8 md:w-8" />, number: "04" },
];

const TRUST_EDITOR_DESCRIPTIONS: Record<string, string> = {
  "Scope jelas sebelum development":
    "Halaman, fitur, timeline, dan kebutuhan project disepakati di awal agar semua terarah dan sesuai tujuan.",
  "Progress bisa dicek via staging link":
    "Pantau hasil website secara real-time sebelum masuk tahap launch, jadi lebih transparan dan minim revisi.",
  "Mobile-first dan SEO-ready":
    "Website dibuat responsif, cepat, dan lebih mudah dipahami Google untuk performa yang lebih baik.",
  "Handover akses penuh setelah launch":
    "Akses, dokumentasi, dan panduan penggunaan diberikan setelah project selesai, jadi kamu bisa kelola sendiri.",
};

export function SectionRenderer({
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
    case "trustStrip":
      return editMode ? <TrustStripEditorPreview config={config} onQuickEdit={onQuickEdit} /> : <TrustStripSection items={config.trustStrip} />;
    case "problems":
      return editMode ? <ProblemsEditorPreview config={config} onQuickEdit={onQuickEdit} /> : <ProblemSection content={config.problems} />;
    case "stats":
      return editMode ? <StatsEditorPreview config={config} onQuickEdit={onQuickEdit} /> : <StatsSection stats={config.stats} />;
    case "services":
      return editMode ? <ServicesEditorPreview config={config} onQuickEdit={onQuickEdit} /> : <ServicesSection content={config.services} whatsappUrl={config.cta.whatsappUrl} />;
    case "workflow":
      return editMode ? <WorkflowEditorPreview config={config} onQuickEdit={onQuickEdit} /> : <WorkflowSection content={config.workflow} />;
    case "pricing":
      return editMode ? <PricingEditorPreview config={config} onQuickEdit={onQuickEdit} /> : <PricingSection content={config.pricing} />;
    case "whatYouGet":
      return editMode ? <WhatYouGetEditorPreview config={config} onQuickEdit={onQuickEdit} /> : <WhatYouGetSection content={config.whatYouGet} />;
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
        "group/edit relative rounded-md outline-none transition-colors hover:bg-blue-50/70 focus:bg-blue-50/70 focus:ring-2 focus:ring-blue-100",
        className
      )}
      title={`Edit ${field.label}`}
    >
      {children}
      <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-md border border-blue-200 bg-white text-blue-600 opacity-0 shadow-none transition-opacity group-hover/edit:opacity-100 group-focus/edit:opacity-100">
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
    <section className="relative w-full overflow-hidden bg-[#f7f9fb] py-20 antialiased md:py-24">
      <div className="pointer-events-none absolute inset-0 hidden md:block">
        <svg className="absolute right-0 top-0 h-[520px] w-[520px] text-slate-950 opacity-[0.035]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.2">
          {[12, 24, 36, 48, 60, 72].map((n) => (
            <polyline key={n} points={`${n},-8 ${n},${100 - n} 108,${100 - n}`} />
          ))}
        </svg>
      </div>

      <div className="relative z-10 grid w-full gap-12 px-6 md:px-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,1fr)] lg:items-center">
        <div className="max-w-2xl">
          <EditableTextButton field={field("hero.trustText")} onClick={() => onQuickEdit(field("hero.trustText"))} className="mb-6 inline-flex w-fit items-center gap-3 border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-blue-600" />
            <span>{config.hero.trustText}</span>
          </EditableTextButton>

          <h1 className="text-4xl font-bold leading-[1.08] text-slate-950 md:text-6xl">
            <EditableTextButton field={field("hero.headlinePrefix")} onClick={() => onQuickEdit(field("hero.headlinePrefix"))} className="px-1 text-left">
              {config.hero.headlinePrefix}
            </EditableTextButton>
            <br />
            <EditableTextButton field={field("hero.rotatingWords")} onClick={() => onQuickEdit(field("hero.rotatingWords"))} className="mt-2 inline-flex flex-wrap gap-2 px-1 text-left text-blue-600">
              {config.hero.rotatingWords.map((word) => (
                <span key={word} className="rounded-md border border-blue-100 bg-white px-2 py-1">
                  {word}
                </span>
              ))}
            </EditableTextButton>
          </h1>

          <EditableTextButton field={field("hero.description")} onClick={() => onQuickEdit(field("hero.description"))} className="mt-6 max-w-xl px-2 py-1 text-left text-base leading-relaxed text-slate-600 md:text-lg">
            {config.hero.description}
          </EditableTextButton>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <EditableTextButton field={field("hero.primaryCta")} onClick={() => onQuickEdit(field("hero.primaryCta"))} className="inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 px-7 py-4 text-sm font-bold text-white hover:bg-blue-700">
              {config.hero.primaryCta}
              <ArrowRight className="h-4 w-4" />
            </EditableTextButton>
            <EditableTextButton field={field("hero.secondaryCta")} onClick={() => onQuickEdit(field("hero.secondaryCta"))} className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-7 py-4 text-sm font-bold text-slate-950 hover:border-blue-300 hover:bg-slate-50">
              {config.hero.secondaryCta}
            </EditableTextButton>
          </div>
        </div>

        <div className="pointer-events-auto w-full">
          <HeroScopeEditorPreview config={config} onQuickEdit={onQuickEdit} />
        </div>
      </div>
    </section>
  );
}

function HeroScopeEditorPreview({ config, onQuickEdit }: { config: SiteConfig; onQuickEdit: (field: InlineEditField) => void }) {
  const visualField = getInlineEditFields("hero", config).find((field) => field.name === "hero.visualImage");
  if (!visualField) throw new Error("Missing edit field: hero.visualImage");
  const scopeItems = [
    config.hero.scopePreview.pages,
    config.hero.scopePreview.features,
    config.hero.scopePreview.timeline,
    config.hero.scopePreview.deliverable,
  ].filter(Boolean);

  return (
    <div className="relative min-h-[420px] w-full md:min-h-[540px]">
      <div className="absolute inset-4 rounded-lg border border-slate-200 bg-slate-100" />
      <div className="absolute inset-0 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="absolute inset-x-0 top-0 flex h-12 items-center gap-2 border-b border-slate-200 bg-slate-50 px-4">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        </div>
        <EditableTextButton field={visualField} onClick={() => onQuickEdit(visualField)} className="flex h-full items-center justify-center px-8 pb-8 pt-16">
          <Image
            src={config.hero.visualImage}
            alt="Mockup laptop project scope Build With Reys"
            width={1672}
            height={941}
            className="h-auto w-full max-w-[760px] object-contain drop-shadow-[0_24px_70px_rgba(15,23,42,0.18)]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 52vw, 760px"
          />
        </EditableTextButton>
      </div>

      <div className="absolute left-4 top-20 max-w-[230px] rounded-lg border border-slate-200 bg-white/90 p-4 shadow-sm backdrop-blur">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{config.hero.scopePreview.eyebrow}</p>
        <p className="mt-2 text-sm font-bold leading-snug text-slate-950">{config.hero.scopePreview.title}</p>
      </div>

      <div className="absolute bottom-5 right-5 w-[min(92%,330px)] rounded-lg border border-slate-200 bg-slate-950 p-4 text-white shadow-sm">
        <div className="mb-3 text-xs font-bold uppercase tracking-wider text-blue-200">{config.hero.scopePreview.projectLabel}</div>
        <div className="space-y-2">
          {scopeItems.map((item) => (
            <div key={item} className="flex items-start gap-2 text-xs leading-relaxed text-slate-200">
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-300" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TrustStripEditorPreview({ config, onQuickEdit }: { config: SiteConfig; onQuickEdit: (field: InlineEditField) => void }) {
  const field = getInlineEditFields("trustStrip", config)[0];
  return (
    <section className="w-full border-y border-slate-200 bg-[#f7faff] py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.34em] text-blue-600 md:text-sm">
            Kenapa Build With Reys?
          </p>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-slate-950 md:text-5xl">
            Website bukan cuma dibuat bagus, tapi dibangun dengan alur yang jelas.
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base font-medium leading-relaxed text-slate-600 md:text-lg">
            Dari perencanaan sampai serah terima, setiap langkah transparan dan terukur.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-6">
          {config.trustStrip.slice(0, 4).map((point, index) => {
            const meta = TRUST_EDITOR_STYLES[index] ?? TRUST_EDITOR_STYLES[0];

            return (
              <article
                key={point}
                className="rounded-lg border border-slate-200 bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.07)] md:min-h-[270px] md:p-6"
              >
                <div className="flex gap-4 md:block">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 md:mb-7 md:h-16 md:w-16">
                    {meta.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="mb-3 flex items-center gap-3 md:mb-5">
                      <span className="text-sm font-bold text-blue-600">{meta.number}</span>
                      <span className="h-px w-20 bg-blue-100" />
                    </div>
                    <EditableTextButton field={field} onClick={() => onQuickEdit(field)} className="px-1 text-left text-lg font-bold leading-tight text-slate-950 md:text-xl">
                      {point}
                    </EditableTextButton>
                    <p className="mt-3 text-sm font-medium leading-relaxed text-slate-600 md:mt-4 md:text-[15px]">
                      {TRUST_EDITOR_DESCRIPTIONS[point] ?? "Detail project dibuat jelas, mudah dipantau, dan siap dilanjutkan setelah launch."}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mx-auto mt-10 flex max-w-xl flex-col items-center gap-5 text-center">
          <p className="inline-flex items-center gap-3 text-sm font-medium text-slate-600 md:text-base">
            <ShieldCheck className="h-6 w-6 shrink-0 text-blue-600" />
            Proses jelas, hasil maksimal, dan support tetap ada.
          </p>
          <span className="inline-flex min-h-11 w-full max-w-sm items-center justify-center gap-3 rounded-lg bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-[0_14px_35px_rgba(37,99,235,0.24)] sm:w-auto sm:min-w-72">
            Mulai konsultasi project
            <ArrowRight className="h-5 w-5" />
          </span>
        </div>
      </div>
    </section>
  );
}

function ProblemsEditorPreview({ config, onQuickEdit }: { config: SiteConfig; onQuickEdit: (field: InlineEditField) => void }) {
  const fields = getInlineEditFields("problems", config);
  const fieldByName = new Map(fields.map((field) => [field.name, field]));
  const getField = (name: string) => fieldByName.get(name)!;

  return (
    <section className="w-full bg-white py-20 md:py-28">
      <div className="px-6 md:px-12">
        <div className="mb-14 max-w-3xl">
          <EditableTextButton field={getField("problems.eyebrow")} onClick={() => onQuickEdit(getField("problems.eyebrow"))} className="mb-4 px-1 text-left text-xs font-bold uppercase tracking-wider text-blue-600">
            {config.problems.eyebrow}
          </EditableTextButton>
          <EditableTextButton field={getField("problems.heading")} onClick={() => onQuickEdit(getField("problems.heading"))} className="block px-1 text-left text-3xl font-bold leading-tight text-slate-950 md:text-5xl">
            {config.problems.heading}
          </EditableTextButton>
          <EditableTextButton field={getField("problems.description")} onClick={() => onQuickEdit(getField("problems.description"))} className="mt-5 block px-1 text-left text-base leading-relaxed text-slate-600 md:text-lg">
            {config.problems.description}
          </EditableTextButton>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {config.problems.items.map((problem, index) => {
            const titleField = getField(`problems.items.${index}.title`);
            const descriptionField = getField(`problems.items.${index}.description`);
            return (
              <div key={index} className="rounded-lg border border-slate-200 bg-[#f7f9fb] p-7">
                <span className="mb-7 flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 bg-white text-sm font-bold text-blue-600">{String(index + 1).padStart(2, "0")}</span>
                <EditableTextButton field={titleField} onClick={() => onQuickEdit(titleField)} className="block px-1 text-left text-lg font-bold text-slate-950">
                  {problem.title}
                </EditableTextButton>
                <EditableTextButton field={descriptionField} onClick={() => onQuickEdit(descriptionField)} className="mt-4 block px-1 text-left text-sm leading-relaxed text-slate-600">
                  {problem.description}
                </EditableTextButton>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function WhatYouGetEditorPreview({ config, onQuickEdit }: { config: SiteConfig; onQuickEdit: (field: InlineEditField) => void }) {
  const fields = getInlineEditFields("whatYouGet", config);
  const fieldByName = new Map(fields.map((field) => [field.name, field]));
  const getField = (name: string) => fieldByName.get(name)!;

  return (
    <section className="w-full border-y border-slate-200 bg-[#f2f4f6] py-20 md:py-28">
      <div className="grid gap-12 px-6 md:px-12 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-4">
          <EditableTextButton field={getField("whatYouGet.eyebrow")} onClick={() => onQuickEdit(getField("whatYouGet.eyebrow"))} className="mb-4 px-1 text-left text-xs font-bold uppercase tracking-wider text-blue-600">
            {config.whatYouGet.eyebrow}
          </EditableTextButton>
          <EditableTextButton field={getField("whatYouGet.heading")} onClick={() => onQuickEdit(getField("whatYouGet.heading"))} className="block px-1 text-left text-3xl font-bold leading-tight text-slate-950 md:text-5xl">
            {config.whatYouGet.heading}
          </EditableTextButton>
          <EditableTextButton field={getField("whatYouGet.description")} onClick={() => onQuickEdit(getField("whatYouGet.description"))} className="mt-5 block px-1 text-left text-base leading-relaxed text-slate-600">
            {config.whatYouGet.description}
          </EditableTextButton>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-8">
          {config.whatYouGet.items.map((item) => {
            const itemField = getField("whatYouGet.items");
            return (
              <div key={item} className="flex gap-4 rounded-lg border border-slate-200 bg-white p-5">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-blue-600 text-white">
                  <Check className="h-4 w-4" />
                </span>
                <EditableTextButton field={itemField} onClick={() => onQuickEdit(itemField)} className="px-1 text-left text-sm font-semibold leading-relaxed text-slate-700">
                  {item}
                </EditableTextButton>
              </div>
            );
          })}
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
          style={{ WebkitTextStroke: "1.5px rgba(37,99,235,0.06)", color: "transparent" }}
        >
          STATS
        </span>
      </div>

      <div className="w-full border-y border-slate-200">
        <div className="w-full px-6 md:px-12">
          <div className="grid grid-cols-2 divide-x divide-slate-200 py-8 md:grid-cols-4">
            {config.stats.map((stat, index) => {
              const valueField = getField(`stats.${index}.value`);
              const suffixField = getField(`stats.${index}.suffix`);
              const labelField = getField(`stats.${index}.label`);
              const descriptionField = getField(`stats.${index}.description`);

              return (
                <div key={index} className="flex flex-col items-center px-6 py-4 text-center md:px-10 first:pl-0 last:pr-0">
                  <div className="mb-2 text-4xl font-bold text-blue-600 md:text-5xl lg:text-6xl">
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
    <section className="w-full bg-[#f7f9fb] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="mb-14 max-w-3xl">
          <EditableTextButton field={getField("services.eyebrow")} onClick={() => onQuickEdit(getField("services.eyebrow"))} className="mb-6 inline-flex w-fit items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-left text-xs font-bold uppercase tracking-wider text-slate-700">
            <span className="h-2 w-2 rounded-full bg-blue-600" />
            {config.services.eyebrow}
          </EditableTextButton>
          <EditableTextButton field={getField("services.heading")} onClick={() => onQuickEdit(getField("services.heading"))} className="max-w-4xl px-1 text-left text-3xl font-bold leading-tight text-slate-950 md:text-5xl">
            {config.services.heading}
          </EditableTextButton>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {config.services.items.map((service, index) => {
            const style = SERVICE_EDITOR_STYLES[index % SERVICE_EDITOR_STYLES.length];
            const numberField = getField(`services.items.${index}.number`);
            const titleField = getField(`services.items.${index}.title`);
            const descriptionField = getField(`services.items.${index}.description`);
            const isFeatured = index === 0;
            const colClass = isFeatured ? "lg:col-span-8" : "lg:col-span-4";

            return (
              <article key={index} className={cn("group relative flex min-h-[320px] flex-col overflow-hidden rounded-lg border border-slate-200 bg-white p-7", isFeatured && "min-h-[390px] p-8 md:p-10", colClass)}>
                <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 -translate-y-12 translate-x-12 rounded-full bg-blue-50 opacity-80 blur-2xl" />
                <div className="relative z-10 mb-8 flex items-start justify-between gap-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-950">{style.icon}</div>
                  <EditableTextButton field={numberField} onClick={() => onQuickEdit(numberField)} className="px-1 text-sm font-bold uppercase tracking-wider text-slate-400">
                    {service.number}
                  </EditableTextButton>
                </div>

                <div className="relative z-10 flex flex-1 flex-col">
                  <EditableTextButton field={titleField} onClick={() => onQuickEdit(titleField)} className={cn("max-w-xl px-1 text-left text-xl font-bold leading-snug text-slate-950", isFeatured && "text-2xl md:text-3xl")}>
                    {service.title}
                  </EditableTextButton>
                  <EditableTextButton field={descriptionField} onClick={() => onQuickEdit(descriptionField)} className={cn("mt-4 flex-1 px-1 text-left text-sm leading-relaxed text-slate-600", isFeatured && "text-base")}>
                    {service.description}
                  </EditableTextButton>
                  <span className="mt-auto inline-flex w-fit items-center gap-2 pt-8 text-sm font-bold text-blue-600">
                    {style.cta}
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </article>
            );
          })}
          <aside className="relative min-h-[320px] overflow-hidden rounded-lg border border-slate-200 bg-slate-100 lg:col-span-4">
            <Image src="/hero-desk-clean.jpg" alt="Workspace pengembangan website Build With Reys" fill className="object-cover opacity-90" sizes="420px" />
            <div className="absolute inset-0 bg-linear-to-t from-slate-950/50 via-slate-950/5 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 rounded-lg border border-white/20 bg-white/85 p-4 backdrop-blur">
              <p className="text-sm font-semibold leading-relaxed text-slate-950">
                Setiap halaman, fitur, timeline, dan deliverable dirapikan sebelum development dimulai.
              </p>
            </div>
          </aside>
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
    <section className="w-full border-y border-slate-200 bg-[#f2f4f6] py-20 md:py-28">
      <div className="grid gap-12 px-6 md:px-12 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-4">
          <EditableTextButton field={getField("workflow.eyebrow")} onClick={() => onQuickEdit(getField("workflow.eyebrow"))} className="mb-4 px-1 text-left text-xs font-bold uppercase tracking-wider text-blue-600">
            {config.workflow.eyebrow}
          </EditableTextButton>
          <h2 className="text-3xl font-bold leading-tight text-slate-950 md:text-5xl">
            <EditableTextButton field={getField("workflow.headingPrefix")} onClick={() => onQuickEdit(getField("workflow.headingPrefix"))} className="px-1">
              {config.workflow.headingPrefix}
            </EditableTextButton>{" "}
            <EditableTextButton field={getField("workflow.rotatingWords")} onClick={() => onQuickEdit(getField("workflow.rotatingWords"))} className="px-1 text-blue-600">
              {config.workflow.rotatingWords.join(", ")}
            </EditableTextButton>
          </h2>
          <EditableTextButton field={getField("workflow.description")} onClick={() => onQuickEdit(getField("workflow.description"))} className="mt-5 block px-2 text-left text-base leading-relaxed text-slate-600">
            {config.workflow.description}
          </EditableTextButton>
        </div>
        <div className="grid gap-5 lg:col-span-8 lg:grid-cols-2">
          {config.workflow.steps.map((item, idx) => {
            const stepField = getField(`workflow.steps.${idx}.step`);
            const titleField = getField(`workflow.steps.${idx}.title`);
            const descriptionField = getField(`workflow.steps.${idx}.description`);
            return (
              <article key={idx} className="rounded-lg border border-slate-200 bg-white p-7">
                <div className="mb-8 flex items-center justify-between gap-6">
                  <EditableTextButton field={stepField} onClick={() => onQuickEdit(stepField)} className="flex h-12 w-12 items-center justify-center rounded-lg border border-blue-100 bg-blue-50 text-sm font-bold text-blue-600">
                    {item.step}
                  </EditableTextButton>
                  <span className="h-px flex-1 bg-slate-200" />
                </div>
                <EditableTextButton field={titleField} onClick={() => onQuickEdit(titleField)} className="px-1 text-left text-xl font-bold text-slate-950">
                  {item.title}
                </EditableTextButton>
                <EditableTextButton field={descriptionField} onClick={() => onQuickEdit(descriptionField)} className="mt-3 block px-1 text-left text-sm leading-relaxed text-slate-600">
                  {item.description}
                </EditableTextButton>
              </article>
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
    <section className="w-full bg-white py-20 md:py-28">
      <div className="mx-auto mb-14 w-full max-w-3xl px-6 text-center md:px-12">
        <EditableTextButton field={getField("pricing.eyebrow")} onClick={() => onQuickEdit(getField("pricing.eyebrow"))} className="mb-4 px-1 text-xs font-bold uppercase tracking-wider text-blue-600">
          {config.pricing.eyebrow}
        </EditableTextButton>
        <EditableTextButton field={getField("pricing.heading")} onClick={() => onQuickEdit(getField("pricing.heading"))} className="mx-auto block px-1 text-3xl font-bold leading-tight text-slate-950 md:text-5xl">
          {config.pricing.heading}
        </EditableTextButton>
        <EditableTextButton field={getField("pricing.description")} onClick={() => onQuickEdit(getField("pricing.description"))} className="mx-auto mt-5 block max-w-2xl px-2 text-base leading-relaxed text-slate-600 md:text-lg">
          {config.pricing.description}
        </EditableTextButton>
      </div>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 md:px-12 lg:grid-cols-3">
        {config.pricing.tiers.map((tier, idx) => {
          const popular = tier.popular;
          const titleField = getField(`pricing.tiers.${idx}.title`);
          const priceField = getField(`pricing.tiers.${idx}.price`);
          const timelineField = getField(`pricing.tiers.${idx}.timeline`);
          const descriptionField = getField(`pricing.tiers.${idx}.description`);
          const featuresField = getField(`pricing.tiers.${idx}.features`);
          const buttonField = getField(`pricing.tiers.${idx}.buttonText`);
          return (
            <div key={idx} className={cn("relative flex min-h-[620px] flex-col rounded-lg border bg-[#f7f9fb] p-7", popular ? "border-blue-500 bg-white" : "border-slate-200")}>
              {popular ? <span className="mb-6 inline-block w-fit rounded-md bg-blue-600 px-3 py-2 text-xs font-bold uppercase tracking-wider text-white">Paling sesuai</span> : null}
              <EditableTextButton field={titleField} onClick={() => onQuickEdit(titleField)} className="mb-4 px-1 text-left text-2xl font-bold text-slate-950">
                {tier.title}
              </EditableTextButton>
              <div className="mb-3 flex items-baseline text-4xl font-bold text-slate-950">
                {tier.price !== "Custom" && <span className="mr-1 text-xl font-semibold text-slate-500">Rp</span>}
                <EditableTextButton field={priceField} onClick={() => onQuickEdit(priceField)} className="px-1">{tier.price}</EditableTextButton>
              </div>
              <EditableTextButton field={timelineField} onClick={() => onQuickEdit(timelineField)} className="mb-4 w-fit rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600">
                Estimasi {tier.timeline}
              </EditableTextButton>
              <EditableTextButton field={descriptionField} onClick={() => onQuickEdit(descriptionField)} className="mb-6 px-1 text-left text-sm leading-relaxed text-slate-600">
                {tier.description}
              </EditableTextButton>
              <div className="my-1 h-px bg-slate-200" />
              <EditableTextButton field={featuresField} onClick={() => onQuickEdit(featuresField)} className="mb-8 flex-1 px-1 text-left">
                <ul className="space-y-4">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start text-sm leading-relaxed text-slate-700"><span className={cn("mr-3 mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-xs font-bold", popular ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-700")}><Check className="h-3.5 w-3.5" /></span>{feature}</li>
                  ))}
                </ul>
              </EditableTextButton>
              <EditableTextButton field={buttonField} onClick={() => onQuickEdit(buttonField)} className={cn("mt-auto inline-flex w-full items-center justify-center rounded-md px-6 py-4 text-sm font-bold", popular ? "bg-blue-600 text-white" : "border border-slate-300 bg-white text-slate-950")}>
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
    <section className="w-full bg-white py-20 md:py-28">
      <div className="hidden" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.8) 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />
      <div className="relative z-10 mx-6 flex flex-col rounded-lg bg-slate-950 p-8 text-left text-white md:mx-12 md:p-14">
        <EditableTextButton field={getField("cta.badge")} onClick={() => onQuickEdit(getField("cta.badge"))} className="mb-6 inline-flex w-fit items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold uppercase tracking-wider text-blue-200">
          <span className="h-2 w-2 rounded-full bg-blue-400" />{config.cta.badge}
        </EditableTextButton>
        <h2 className="text-3xl font-bold leading-tight md:text-5xl">
          <EditableTextButton field={getField("cta.headingTop")} onClick={() => onQuickEdit(getField("cta.headingTop"))} className="px-1 text-white">{config.cta.headingTop}</EditableTextButton>
          <br />
          <EditableTextButton field={getField("cta.headingAccent")} onClick={() => onQuickEdit(getField("cta.headingAccent"))} className="px-1 text-blue-300">{config.cta.headingAccent}</EditableTextButton>
        </h2>
        <EditableTextButton field={getField("cta.description")} onClick={() => onQuickEdit(getField("cta.description"))} className="mt-5 max-w-2xl px-2 text-base leading-relaxed text-slate-300">
          {config.cta.description}
        </EditableTextButton>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <EditableTextButton field={getField("cta.primaryCta")} onClick={() => onQuickEdit(getField("cta.primaryCta"))} className="inline-flex items-center justify-center gap-3 rounded-md bg-blue-600 px-7 py-4 text-sm font-bold text-white">
            {config.cta.primaryCta} →
          </EditableTextButton>
          <EditableTextButton field={getField("cta.secondaryCta")} onClick={() => onQuickEdit(getField("cta.secondaryCta"))} className="inline-flex items-center justify-center gap-2 rounded-md border border-white/15 px-7 py-4 text-sm font-bold text-white">
            {config.cta.secondaryCta}
          </EditableTextButton>
        </div>
        <div className="mt-8 grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
          <EditableTextButton field={getField("cta.socialProof")} onClick={() => onQuickEdit(getField("cta.socialProof"))} className="inline-flex items-center gap-3 px-1">
            <CheckCircle2 className="h-5 w-5 text-blue-300" />{config.cta.socialProof}
          </EditableTextButton>
          <div className="hidden" />
          <EditableTextButton field={getField("cta.ratingText")} onClick={() => onQuickEdit(getField("cta.ratingText"))} className="inline-flex items-center gap-1 px-1">
            <CheckCircle2 className="h-5 w-5 text-blue-300" /><span>{config.cta.ratingText}</span>
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
    <section className="w-full border-y border-slate-200 bg-[#f7f9fb] py-20 md:py-28">
      <div className="grid gap-12 px-6 md:px-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <EditableTextButton field={getField("faq.eyebrow")} onClick={() => onQuickEdit(getField("faq.eyebrow"))} className="mb-4 w-fit px-1 text-left text-xs font-bold uppercase tracking-wider text-blue-600">
            {config.faq.eyebrow}
          </EditableTextButton>
          <EditableTextButton field={getField("faq.heading")} onClick={() => onQuickEdit(getField("faq.heading"))} className="px-1 text-left text-3xl font-bold leading-tight text-slate-950 md:text-5xl">
            {config.faq.heading}
          </EditableTextButton>
        </div>
        <div className="lg:col-span-8">
          {config.faq.items.map((faq, index) => {
            const questionField = getField(`faq.items.${index}.question`);
            const answerField = getField(`faq.items.${index}.answer`);
            return (
              <div key={index} className={cn("flex flex-col border-b border-slate-200", index === 0 && "border-t")}>
                <div className="flex w-full items-center gap-6 py-6 text-left">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-white text-blue-600">+</span>
                  <EditableTextButton field={questionField} onClick={() => onQuickEdit(questionField)} className="px-1 text-left text-lg font-bold text-slate-950">
                    {faq.question}
                  </EditableTextButton>
                </div>
                <EditableTextButton field={answerField} onClick={() => onQuickEdit(answerField)} className="mb-6 ml-14 px-1 text-left text-base leading-relaxed text-slate-600">
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
    <form action={formAction} className="mt-8 rounded-lg border border-dashed border-blue-200 bg-white p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-neutral-900">Tambah FAQ baru</p>
          <p className="mt-1 text-xs text-neutral-500">Isi pertanyaan dan jawaban, lalu simpan. Item baru akan muncul di bawah daftar FAQ.</p>
        </div>
        <span className="rounded-md bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600">Create</span>
      </div>

      <div className="mt-4 space-y-3">
        <label className="block text-xs font-semibold uppercase tracking-widest text-neutral-500" htmlFor="faq-question">
          Pertanyaan
        </label>
        <input
          id="faq-question"
          name="question"
          placeholder="Contoh: Apakah bisa request desain custom?"
          className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />

        <label className="block text-xs font-semibold uppercase tracking-widest text-neutral-500" htmlFor="faq-answer">
          Jawaban
        </label>
        <textarea
          id="faq-answer"
          name="answer"
          rows={4}
          placeholder="Tulis jawaban FAQ di sini..."
          className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      {state.error ? <p className="mt-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">{state.error}</p> : null}
      {state.success && state.message ? <p className="mt-3 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">{state.message}</p> : null}

      <div className="mt-4 flex justify-end">
        <button disabled={isPending} className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300">
          <Save className="h-4 w-4" />
          {isPending ? "Menambahkan..." : "Tambah Pertanyaan"}
        </button>
      </div>
    </form>
  );
}

