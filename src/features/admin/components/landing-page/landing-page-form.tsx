"use client";

import React, { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { SectionRenderer } from "./editor-previews";
import {
  BarChart3,
  CircleHelp,
  DatabaseZap,
  DollarSign,
  ExternalLink,
  FileWarning,
  LayoutTemplate,
  ListChecks,
  Megaphone,
  MousePointerClick,
  PackageCheck,
  Pencil,
  Save,
} from "lucide-react";

const SECTION_ICONS: Record<SectionKey, React.ReactNode> = {
  hero: <LayoutTemplate className="h-4 w-4" />,
  trustStrip: <DatabaseZap className="h-4 w-4" />,
  problems: <FileWarning className="h-4 w-4" />,
  stats: <BarChart3 className="h-4 w-4" />,
  services: <ListChecks className="h-4 w-4" />,
  workflow: <MousePointerClick className="h-4 w-4" />,
  pricing: <DollarSign className="h-4 w-4" />,
  whatYouGet: <PackageCheck className="h-4 w-4" />,
  cta: <Megaphone className="h-4 w-4" />,
  faq: <CircleHelp className="h-4 w-4" />,
};

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

function InlineEditModal({ field, onClose }: { field: InlineEditField; onClose: () => void }) {
  const [state, formAction, isPending] = useActionState(saveLandingPageField, { success: false });
  const router = useRouter();

  useEffect(() => {
    if (!state.success) return;
    const timeout = window.setTimeout(() => {
      router.refresh();
      onClose();
    }, 700);

    return () => window.clearTimeout(timeout);
  }, [onClose, router, state.success]);

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
      {inlineField ? (
        <InlineEditModal
          key={inlineField.name}
          field={inlineField}
          onClose={() => setInlineField(null)}
        />
      ) : null}
    </>
  );
}
