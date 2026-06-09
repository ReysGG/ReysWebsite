"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import type { SiteConfig } from "@/lib/site-config";
import { getInlineEditFields, isSectionKey, LANDING_PAGE_SECTIONS, type InlineEditField, type SectionKey } from "@/features/admin/lib/landing-page-edit";
import { fieldMatchesEditableElement } from "@/features/admin/lib/landing-page-inline-edit";
import { cn } from "@/lib/utils";
import { SectionRenderer } from "./editor-previews";
import { EditableFrame, InlineEditModal, LANDING_EDIT_STYLE } from "./landing-page-editor-parts";
import { ExternalLink, Pencil } from "lucide-react";

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
      const matchedField = fields.find((field) => fieldMatchesEditableElement(field, currentElement));
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
                  "inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffcd80]",
                  editMode
                    ? "bg-[#ff8a00] text-white hover:bg-[#f4b738] active:bg-[#e07a00]"
                    : "border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50 active:bg-neutral-100"
                )}
              >
                <Pencil className="h-4 w-4" />
                {editMode ? "Mode Preview" : "Mode Edit"}
              </button>
              <Link href="/" target="_blank" className="inline-flex items-center gap-2 rounded-md border border-neutral-200 px-3 py-2 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 active:bg-neutral-100 active:scale-[0.98] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffcd80]">
                Lihat Website <ExternalLink className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        <div className="rounded-md border border-neutral-200 bg-neutral-50 p-3 shadow-none">
          <EditableFrame section={active} active editMode={editMode}>
            {editMode ? <style>{LANDING_EDIT_STYLE}</style> : null}
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
      {inlineField ? <InlineEditModal key={inlineField.name} field={inlineField} onClose={() => setInlineField(null)} /> : null}
    </>
  );
}
