"use client";

import React, { useActionState, useCallback, useEffect, useState } from "react";
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
  solutions: <LayoutTemplate className="h-4 w-4" />,
  pricing: <DollarSign className="h-4 w-4" />,
  whatYouGet: <PackageCheck className="h-4 w-4" />,
  cta: <Megaphone className="h-4 w-4" />,
  faq: <CircleHelp className="h-4 w-4" />,
};

function EditableFrame({
  section,
  active,
  editMode,
  children,
}: {
  section: SectionMeta;
  active: boolean;
  editMode: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      id={`preview-${section.key}`}
      className={cn(
        "group relative overflow-hidden rounded-md border bg-white shadow-none transition-colors",
        active && editMode ? "border-[#ff8a00] ring-2 ring-[#ffcd80]/50" : "border-neutral-200"
      )}
    >
      <div className="sticky top-0 z-20 flex items-center justify-between border-b border-neutral-200 bg-white/95 px-3 py-2 backdrop-blur">
        <div className="flex items-center gap-2 text-sm font-semibold text-neutral-800">
          <span className={cn("text-neutral-400", active && "text-[#ff8a00]")}>{SECTION_ICONS[section.key]}</span>
          <span>{section.label}</span>
        </div>
        <p className="text-xs text-neutral-400">
          {editMode ? "Klik elemen untuk edit" : "Preview mode"}
        </p>
      </div>
      <div className={cn("relative bg-white", editMode && "cursor-pointer")}>{children}</div>
    </section>
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
            <p className="text-xs font-semibold uppercase tracking-widest text-[#ff8a00]">Inline Edit</p>
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
              className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm text-neutral-900 outline-none transition-colors focus:border-[#ff8a00] focus:ring-2 focus:ring-[#ffcd80]/50"
            />
          ) : (
            <input
              id={`inline-${field.name}`}
              name="value"
              defaultValue={field.value}
              className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm text-neutral-900 outline-none transition-colors focus:border-[#ff8a00] focus:ring-2 focus:ring-[#ffcd80]/50"
            />
          )}
          {state.error ? <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">{state.error}</p> : null}
          {state.success && state.message ? <p className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">{state.message}</p> : null}
          <div className="flex justify-end gap-2 border-t border-neutral-200 pt-4">
            <button type="button" onClick={onClose} className="rounded-md border border-neutral-200 px-4 py-2 text-sm font-semibold text-neutral-700 hover:bg-neutral-50">
              Batal
            </button>
            <button disabled={isPending} className="inline-flex items-center gap-2 rounded-md bg-[#ff8a00] px-4 py-2 text-sm font-semibold text-white shadow-none transition-colors hover:bg-[#f4b738] disabled:cursor-not-allowed disabled:bg-[#ffcd80]">
              <Save className="h-4 w-4" />
              {isPending ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


const normalizeEditableText = (value: string) =>
  value.replace(/\s+/g, " ").trim().toLowerCase();

function fieldMatchesElement(field: InlineEditField, element: HTMLElement) {
  if (element.dataset.editField === field.name) {
    return true;
  }

  const elementText = normalizeEditableText(element.innerText || element.textContent || "");
  const values = field.value
    .split("\n")
    .map((value) => normalizeEditableText(value))
    .filter((value) => value.length >= 2);

  if (values.some((value) => elementText === value || (elementText.length <= 220 && elementText.includes(value)))) {
    return true;
  }

  if (element instanceof HTMLImageElement) {
    return values.some((value) => element.currentSrc.includes(value) || element.src.includes(value) || normalizeEditableText(element.alt).includes(value));
  }

  return false;
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

  const handlePreviewClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (!editMode) return;

    event.preventDefault();
    event.stopPropagation();

    const fields = getInlineEditFields(activeSection, config).sort((left, right) => right.value.length - left.value.length);
    let element = event.target instanceof HTMLElement ? event.target : null;

    while (element) {
      if (element === event.currentTarget) break;

      const currentElement = element;
      const matchedField = fields.find((field) => fieldMatchesElement(field, currentElement));
      if (matchedField) {
        setActiveSection(matchedField.section);
        setInlineField(matchedField);
        return;
      }
      element = element.parentElement;
    }
  }, [activeSection, config, editMode]);

  return (
    <>
      <div className="space-y-4">
        <div className="sticky top-0 z-30 rounded-md border border-neutral-200 bg-white/95 p-3 shadow-none backdrop-blur">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#ff8a00]">Visual Editor</p>
              <p className="mt-1 text-sm text-neutral-600">Preview bersih secara default. Aktifkan mode edit untuk klik elemen dan ubah konten.</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-[#fffcc9] px-3 py-2 text-sm font-semibold text-[#ff8a00]">Aktif: {active.label}</span>
              <button
                type="button"
                onClick={() => setEditMode((current) => !current)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold transition-colors",
                  editMode
                    ? "bg-[#ff8a00] text-white hover:bg-[#f4b738]"
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
          >
            {editMode ? (
              <style>{`
                [data-landing-edit="true"] :is(h1, h2, h3, h4, h5, h6, p, a, button, li, img, [data-edit-field]):hover {
                  outline: 2px solid #ff8a00;
                  outline-offset: 4px;
                  border-radius: 6px;
                  cursor: pointer;
                }
              `}</style>
            ) : null}
            <div data-landing-edit={editMode ? "true" : undefined} onClickCapture={handlePreviewClick}>
              <SectionRenderer
                section={activeSection}
                config={config}
                editMode={editMode}
                onQuickEdit={(field) => {
                  setActiveSection(field.section);
                  setInlineField(field);
                }}
              />
            </div>
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
