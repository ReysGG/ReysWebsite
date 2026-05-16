import db from "@/lib/db";

export type StatItemConfig = {
  value: number;
  suffix: string;
  label: string;
  description: string;
};

export type ServiceItemConfig = {
  number: string;
  title: string;
  description: string;
};

export type WorkflowStepConfig = {
  step: string;
  title: string;
  description: string;
};

export type PricingTierConfig = {
  title: string;
  price: string;
  timeline: string;
  description: string;
  features: string[];
  buttonText: string;
  popular: boolean;
};

export type FaqItemConfig = {
  question: string;
  answer: string;
};

export type SimpleTextItemConfig = {
  title: string;
  description: string;
};

export type SiteConfig = {
  hero: {
    trustText: string;
    headlinePrefix: string;
    rotatingWords: string[];
    description: string;
    primaryCta: string;
    secondaryCta: string;
    visualImage: string;
    scopePreview: {
      eyebrow: string;
      title: string;
      projectLabel: string;
      pages: string;
      features: string;
      timeline: string;
      revisions: string;
      deliverable: string;
      status: string;
    };
  };
  stats: StatItemConfig[];
  trustStrip: string[];
  problems: {
    eyebrow: string;
    heading: string;
    description: string;
    items: SimpleTextItemConfig[];
  };
  services: {
    eyebrow: string;
    heading: string;
    items: ServiceItemConfig[];
  };
  workflow: {
    eyebrow: string;
    headingPrefix: string;
    rotatingWords: string[];
    description: string;
    steps: WorkflowStepConfig[];
  };
  pricing: {
    eyebrow: string;
    heading: string;
    description: string;
    tiers: PricingTierConfig[];
  };
  whatYouGet: {
    eyebrow: string;
    heading: string;
    description: string;
    items: string[];
  };
  cta: {
    badge: string;
    headingTop: string;
    headingAccent: string;
    description: string;
    whatsappUrl: string;
    primaryCta: string;
    secondaryCta: string;
    socialProof: string;
    ratingText: string;
  };
  faq: {
    eyebrow: string;
    heading: string;
    items: FaqItemConfig[];
  };
};

export const SITE_CONFIG_KEY = "landing-page";

export const defaultSiteConfig: SiteConfig = {
  hero: {
    trustText: "Technical partner untuk website dan sistem bisnis",
    headlinePrefix: "Website & sistem digital",
    rotatingWords: ["yang rapi.", "siap dipakai.", "mudah dikelola."],
    description:
      "Build With Reys membantu bisnis membuat company profile, dashboard internal, e-commerce, dan website SEO-ready dengan scope jelas, staging link, dan handover penuh.",
    primaryCta: "Konsultasi via WhatsApp",
    secondaryCta: "Lihat Proses Kerja",
    visualImage: "/Untitled design.png",
    scopePreview: {
      eyebrow: "Before development",
      title: "Scope dikunci sebelum coding",
      projectLabel: "Project Brief",
      pages: "Home, About, Services, Contact",
      features: "Lead form, WhatsApp CTA, SEO setup",
      timeline: "14–21 hari kerja",
      revisions: "2x minor revision",
      deliverable: "Staging link, source code, handover",
      status: "Approved — Ready to build",
    },
  },
  stats: [
    { value: 50, suffix: "+", label: "Proyek Selesai", description: "Startup hingga korporat" },
    { value: 98, suffix: "%", label: "Klien Puas", description: "Berdasarkan feedback langsung" },
    { value: 3, suffix: "+", label: "Tahun Pengalaman", description: "Web & software development" },
    { value: 100, suffix: "%", label: "On-Time Delivery", description: "Tidak ada proyek terlambat" },
  ],
  trustStrip: [
    "Scope jelas sebelum development",
    "Progress bisa dicek via staging link",
    "Mobile-first dan SEO-ready",
    "Handover akses penuh setelah launch",
  ],
  problems: {
    eyebrow: "Masalah yang sering terjadi",
    heading: "Biasanya masalahnya bukan cuma belum punya website.",
    description: "Banyak bisnis butuh partner teknis yang bisa merapikan kebutuhan, bukan sekadar membuat halaman terlihat bagus.",
    items: [
      { title: "Website belum meyakinkan", description: "Calon customer sudah tertarik, tapi halaman bisnis belum cukup rapi untuk membangun trust." },
      { title: "Konten sulit diubah sendiri", description: "Setiap edit teks, gambar, atau artikel harus minta developer lagi karena tidak ada admin panel yang jelas." },
      { title: "Operasional masih manual", description: "Order, stok, booking, atau follow-up masih tersebar di chat dan spreadsheet sehingga sulit dipantau." },
      { title: "Scope sering abu-abu", description: "Project dimulai tanpa batas fitur, timeline, dan deliverable yang jelas; akhirnya molor dan banyak asumsi." },
    ],
  },
  services: {
    eyebrow: "Layanan berdasarkan kebutuhan bisnis",
    heading: "Solusi digital yang rapi dari sisi tampilan, konten, dan operasional.",
    items: [
      {
        number: "01",
        title: "Bangun trust bisnis",
        description:
          "Company profile dan landing page yang menjelaskan layanan, bukti kerja, dan jalur kontak dengan rapi.",
      },
      {
        number: "02",
        title: "Rapikan operasional",
        description:
          "Dashboard kustom untuk POS, inventory, booking, CRM, atau workflow internal yang masih tersebar di spreadsheet.",
      },
      {
        number: "03",
        title: "Jualan lebih praktis",
        description:
          "Katalog, checkout, payment, dan integrasi WhatsApp agar customer lebih mudah melihat produk dan melakukan order.",
      },
      {
        number: "04",
        title: "Siap ditemukan Google",
        description:
          "Struktur halaman, metadata, performa, dan content system agar website lebih mudah dibaca customer dan mesin pencari.",
      },
    ],
  },
  workflow: {
    eyebrow: "Proses Kerja",
    headingPrefix: "Proses kerja",
    rotatingWords: ["transparan", "terukur", "rapi", "jelas"],
    description: "Setiap project dimulai dari kebutuhan, scope, dan prioritas yang jelas sebelum masuk development.",
    steps: [
      { step: "01", title: "Discovery Call", description: "Bahas kebutuhan bisnis, target customer, fitur wajib, dan contoh referensi agar arah project jelas." },
      { step: "02", title: "Scope & Estimate", description: "Halaman, fitur, timeline, harga, dan batas revisi dirapikan sebelum development dimulai." },
      { step: "03", title: "Design & Build", description: "Desain dan development berjalan dengan preview staging link agar progress bisa dicek." },
      { step: "04", title: "Launch & Handover", description: "Deploy ke domain, serah terima akses admin, dokumentasi singkat, dan support awal." },
    ],
  },
  pricing: {
    eyebrow: "Harga",
    heading: "Paket project yang jelas sejak awal",
    description: "Harga final dikunci setelah scope disepakati, supaya tidak ada biaya abu-abu di tengah pengerjaan.",
    tiers: [
      {
        title: "Starter Website",
        price: "5 juta",
        timeline: "7-10 hari",
        description: "Untuk landing page, personal brand, atau company profile sederhana.",
        features: [
          "Landing page / company profile ringkas",
          "Desain responsif mobile-first",
          "CTA WhatsApp dan form kontak",
          "Basic SEO dan metadata",
          "Setup domain dan hosting",
        ],
        buttonText: "Mulai Sekarang",
        popular: false,
      },
      {
        title: "Business Website",
        price: "15 juta",
        timeline: "14-21 hari",
        description: "Untuk company profile serius dengan CMS, blog, portfolio, dan struktur SEO lebih lengkap.",
        features: [
          "Semua fitur Starter",
          "Hingga 10 halaman utama",
          "CMS untuk kelola konten sendiri",
          "Blog, portfolio, atau testimonial section",
          "SEO structure dan analytics setup",
          "Staging preview dan handover",
        ],
        buttonText: "Pilih Professional",
        popular: true,
      },
      {
        title: "Custom System",
        price: "Custom",
        timeline: "Sesuai scope",
        description: "Untuk dashboard internal, e-commerce, automation, atau workflow bisnis yang butuh scope khusus.",
        features: [
          "Semua fitur Professional",
          "Dashboard / e-commerce / automation",
          "Role, data, dan workflow custom",
          "Custom backend dan API integration",
          "Deployment, monitoring, dan handover",
          "Maintenance opsional setelah launch",
        ],
        buttonText: "Hubungi Kami",
        popular: false,
      },
    ],
  },
  whatYouGet: {
    eyebrow: "Yang kamu dapat",
    heading: "Deliverable dibuat jelas, bukan cuma “website jadi”.",
    description: "Setiap project dimulai dari scope yang rapi agar timeline, fitur, dan hasil akhirnya tidak abu-abu.",
    items: [
      "Responsive design untuk desktop dan mobile",
      "Admin panel/CMS jika konten perlu dikelola sendiri",
      "Basic technical SEO: struktur heading, metadata, dan performa",
      "Deployment ke domain dan hosting pilihan",
      "Staging preview selama proses development",
      "Handover akses penuh dan dokumentasi singkat",
      "Support awal setelah website launch",
      "Scope dan prioritas fitur yang disepakati sebelum coding",
    ],
  },
  cta: {
    badge: "Konsultasi Gratis - Tanpa Komitmen",
    headingTop: "Mulai dari scope call singkat.",
    headingAccent: "kita rapikan prioritasnya.",
    description:
      "Ceritakan bisnis, target pelanggan, dan fitur yang dibutuhkan. Kami bantu susun scope, estimasi waktu, dan langkah paling realistis.",
    whatsappUrl: "https://wa.me/6281234567890?text=Halo%20Build%20With%20Reys%2C%20saya%20ingin%20konsultasi%20pembuatan%20website.",
    primaryCta: "Konsultasi via WhatsApp",
    secondaryCta: "Lihat Proses Kerja",
    socialProof: "Scope jelas sebelum coding",
    ratingText: "Staging preview sebelum launch",
  },
  faq: {
    eyebrow: "Pertanyaan",
    heading: "Pertanyaan sebelum mulai project",
    items: [
      {
        question: "Berapa lama waktu pembuatan website?",
        answer:
          "Untuk Company Profile berkisar 1-2 minggu. Web App kustom atau E-Commerce membutuhkan waktu 3-6 minggu tergantung kompleksitas fitur.",
      },
      {
        question: "Apakah website sudah termasuk hosting dan domain?",
        answer: "Bisa termasuk setup domain dan hosting, atau memakai akun hosting/domain milik bisnis kamu sendiri. Detailnya dikunci di scope.",
      },
      {
        question: "Apakah saya bisa mengubah konten website sendiri nantinya?",
        answer: "Bisa, jika CMS/admin panel masuk scope project. Konten seperti artikel, portfolio, testimonial, dan halaman utama bisa dibuat editable.",
      },
      {
        question: "Apakah ada biaya maintenance tahunan?",
        answer: "Ada biaya perpanjangan domain/hosting jika memakai layanan tersebut. Maintenance teknis bisa dibuat opsional sesuai kebutuhan.",
      },
      {
        question: "Apakah website ini sudah SEO friendly?",
        answer: "Ya. Struktur heading, metadata, performa, dan halaman responsif disiapkan sejak awal. Untuk strategi konten SEO bulanan bisa dibahas terpisah.",
      },
    ],
  },
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

function isSiteConfig(value: unknown): value is Partial<SiteConfig> {
  if (!isRecord(value)) return false;
  return Boolean(value.hero || value.stats || value.services || value.workflow || value.pricing || value.cta || value.faq);
}

function mergeSiteConfig(value: Partial<SiteConfig>): SiteConfig {
  return {
    ...defaultSiteConfig,
    ...value,
    hero: {
      ...defaultSiteConfig.hero,
      ...value.hero,
      scopePreview: {
        ...defaultSiteConfig.hero.scopePreview,
        ...value.hero?.scopePreview,
      },
    },
    stats: Array.isArray(value.stats) ? value.stats : defaultSiteConfig.stats,
    trustStrip: Array.isArray(value.trustStrip) ? value.trustStrip : defaultSiteConfig.trustStrip,
    problems: {
      ...defaultSiteConfig.problems,
      ...value.problems,
      items: Array.isArray(value.problems?.items) ? value.problems.items : defaultSiteConfig.problems.items,
    },
    services: {
      ...defaultSiteConfig.services,
      ...value.services,
      items: Array.isArray(value.services?.items) ? value.services.items : defaultSiteConfig.services.items,
    },
    workflow: {
      ...defaultSiteConfig.workflow,
      ...value.workflow,
      rotatingWords: Array.isArray(value.workflow?.rotatingWords) ? value.workflow.rotatingWords : defaultSiteConfig.workflow.rotatingWords,
      steps: Array.isArray(value.workflow?.steps) ? value.workflow.steps : defaultSiteConfig.workflow.steps,
    },
    pricing: {
      ...defaultSiteConfig.pricing,
      ...value.pricing,
      tiers: Array.isArray(value.pricing?.tiers) ? value.pricing.tiers : defaultSiteConfig.pricing.tiers,
    },
    whatYouGet: {
      ...defaultSiteConfig.whatYouGet,
      ...value.whatYouGet,
      items: Array.isArray(value.whatYouGet?.items) ? value.whatYouGet.items : defaultSiteConfig.whatYouGet.items,
    },
    cta: { ...defaultSiteConfig.cta, ...value.cta },
    faq: {
      ...defaultSiteConfig.faq,
      ...value.faq,
      items: Array.isArray(value.faq?.items) ? value.faq.items : defaultSiteConfig.faq.items,
    },
  };
}

export async function getSiteConfig(): Promise<SiteConfig> {
  try {
    const row = await db.siteConfig.findUnique({ where: { key: SITE_CONFIG_KEY } });
    if (row && isSiteConfig(row.value)) {
      return mergeSiteConfig(row.value);
    }
  } catch {
    // Keep the public website usable if the database is unavailable.
  }

  return defaultSiteConfig;
}
