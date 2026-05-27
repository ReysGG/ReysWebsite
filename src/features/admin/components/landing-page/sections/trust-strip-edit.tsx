import type { SiteConfig, SimpleTextItemConfig } from "@/lib/site-config";
import type { InlineEditField } from "@/features/admin/lib/landing-page-edit";

const DEFAULT_TRUST_STRIP_COPY = {
  eyebrow: "Kenapa Build With Reys?",
  heading: "Website bukan cuma dibuat bagus, tapi dibangun dengan alur yang jelas.",
  description: "Dari perencanaan sampai serah terima, setiap langkah transparan dan terukur.",
  footerText: "Proses jelas, hasil maksimal, dan support tetap ada.",
  buttonText: "Mulai konsultasi project",
};

const DEFAULT_TRUST_STRIP_ITEMS: SimpleTextItemConfig[] = [
  {
    title: "Scope jelas sebelum development",
    description: "Halaman, fitur, timeline, dan kebutuhan project disepakati di awal agar semua terarah dan sesuai tujuan.",
  },
  {
    title: "Progress bisa dicek via staging link",
    description: "Pantau hasil website secara real-time sebelum masuk tahap launch, jadi lebih transparan dan minim revisi.",
  },
  {
    title: "Mobile-first dan SEO-ready",
    description: "Website dibuat responsif, cepat, dan lebih mudah dipahami Google untuk performa yang lebih baik.",
  },
  {
    title: "Handover akses penuh setelah launch",
    description: "Akses, dokumentasi, dan panduan penggunaan diberikan setelah project selesai, jadi kamu bisa kelola sendiri.",
  },
];

function normalizeTrustStripItem(item: SimpleTextItemConfig | string, index: number): SimpleTextItemConfig {
  const fallback = DEFAULT_TRUST_STRIP_ITEMS[index] ?? { title: "", description: "" };
  if (typeof item === "string") {
    return { title: item, description: fallback.description };
  }
  return {
    title: item.title || fallback.title,
    description: item.description || fallback.description,
  };
}

function normalizeTrustStrip(content: SiteConfig["trustStrip"] | string[]): SiteConfig["trustStrip"] {
  if (Array.isArray(content)) {
    return { ...DEFAULT_TRUST_STRIP_COPY, items: content.map(normalizeTrustStripItem) };
  }

  return {
    ...DEFAULT_TRUST_STRIP_COPY,
    ...content,
    items: Array.isArray(content.items) ? content.items.map(normalizeTrustStripItem) : DEFAULT_TRUST_STRIP_ITEMS,
  };
}

export function getTrustStripEditFields(config: SiteConfig): InlineEditField[] {
  const section = "trustStrip" as const;
  const trustStrip = normalizeTrustStrip(config.trustStrip);
  return [
    {
      section,
      label: "Eyebrow",
      name: "trustStrip.eyebrow",
      value: trustStrip.eyebrow,
    },
    {
      section,
      label: "Heading",
      name: "trustStrip.heading",
      value: trustStrip.heading,
      textarea: true,
    },
    {
      section,
      label: "Deskripsi",
      name: "trustStrip.description",
      value: trustStrip.description,
      textarea: true,
    },
    {
      section,
      label: "Judul kartu",
      name: "trustStrip.items",
      value: trustStrip.items.map((item) => item.title).join("\n"),
      textarea: true,
    },
    ...trustStrip.items.map((item, index) => ({
      section,
      label: `Keterangan kartu ${index + 1}`,
      name: `trustStrip.items.${index}.description`,
      value: item.description,
      textarea: true,
    })),
    {
      section,
      label: "Footer text",
      name: "trustStrip.footerText",
      value: trustStrip.footerText,
    },
    {
      section,
      label: "Teks tombol",
      name: "trustStrip.buttonText",
      value: trustStrip.buttonText,
    },
  ];
}
