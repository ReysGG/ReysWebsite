"use client";

import React, { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import type { SiteConfig } from "@/lib/site-config";
import { saveLandingPageField } from "@/features/admin/actions/landing-page-actions";
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
  ExternalLink,
  LayoutTemplate,
  ListChecks,
  Megaphone,
  MousePointerClick,
  Pencil,
  Save,
} from "lucide-react";

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
      return <ServicesSection content={config.services} />;
    case "workflow":
      return <WorkflowSection content={config.workflow} />;
    case "pricing":
      return <PricingSection content={config.pricing} />;
    case "cta":
      return <CtaSection content={config.cta} />;
    case "faq":
      return <FaqSection content={config.faq} />;
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
            quickFields={editMode && (activeSection === "hero" || activeSection === "stats") ? [] : getInlineEditFields(activeSection, config)}
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
