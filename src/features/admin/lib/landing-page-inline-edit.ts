import type { InlineEditField } from "@/features/admin/lib/landing-page-edit";

export function fieldMatchesEditableElement(field: InlineEditField, element: HTMLElement) {
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

function normalizeEditableText(value: string) {
  return value.replace(/\s+/g, " ").trim().toLowerCase();
}
