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

export type SiteConfig = {
  hero: {
    trustText: string;
    headlinePrefix: string;
    rotatingWords: string[];
    description: string;
    primaryCta: string;
    secondaryCta: string;
  };
  stats: StatItemConfig[];
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
    trustText: "Dipercaya 50+ bisnis dan founder",
    headlinePrefix: "Website cepat, rapi,",
    rotatingWords: ["siap jualan.", "mudah dikelola.", "terlihat profesional."],
    description:
      "Kami bantu UMKM dan startup membangun website yang terlihat profesional, loading cepat, responsif, dan siap dipakai untuk menerima calon pelanggan.",
    primaryCta: "Konsultasi Gratis",
    secondaryCta: "Lihat Portofolio",
  },
  stats: [
    { value: 50, suffix: "+", label: "Proyek Selesai", description: "Startup hingga korporat" },
    { value: 98, suffix: "%", label: "Klien Puas", description: "Berdasarkan feedback langsung" },
    { value: 3, suffix: "+", label: "Tahun Pengalaman", description: "Web & software development" },
    { value: 100, suffix: "%", label: "On-Time Delivery", description: "Tidak ada proyek terlambat" },
  ],
  services: {
    eyebrow: "Layanan Utama",
    heading: "Bukan cuma tampil bagus. Website harus membantu bisnis bergerak.",
    items: [
      {
        number: "01",
        title: "Website yang membangun trust",
        description:
          "Company profile modern untuk membuat bisnis terlihat kredibel, jelas, dan mudah dihubungi calon pelanggan.",
      },
      {
        number: "02",
        title: "Dashboard operasional",
        description:
          "Web app kustom untuk POS, inventory, booking, CRM, atau workflow internal yang masih berantakan di spreadsheet.",
      },
      {
        number: "03",
        title: "Toko online siap transaksi",
        description:
          "E-commerce cepat dengan katalog produk, checkout, pembayaran, dan integrasi WhatsApp agar proses jualan lebih praktis.",
      },
      {
        number: "04",
        title: "SEO dan performa loading",
        description:
          "Struktur halaman, metadata, dan optimasi teknis supaya website lebih cepat, mudah dibaca Google, dan nyaman dibuka mobile.",
      },
    ],
  },
  workflow: {
    eyebrow: "Proses Kerja",
    headingPrefix: "Dari Ide ke",
    rotatingWords: ["Realisasi", "Kenyataan", "Kesuksesan", "Laba"],
    description: "Metodologi transparan dan terukur untuk menjamin keberhasilan setiap produk digital.",
    steps: [
      { step: "01", title: "Discovery", description: "Analisis kebutuhan, target audiens, dan tujuan bisnis utama Anda." },
      { step: "02", title: "Strategy", description: "Pembuatan struktur konten, wireframe, dan rencana teknis yang presisi." },
      { step: "03", title: "Execution", description: "Pengembangan visual dan kode interaktif dengan performa tinggi." },
      { step: "04", title: "Delivery", description: "Testing, peluncuran, dan serah terima aset digital secara utuh." },
    ],
  },
  pricing: {
    eyebrow: "Harga",
    heading: "Paket yang jelas sejak awal",
    description: "Pilih paket sesuai kebutuhan bisnis. Scope, estimasi waktu, dan deliverable dibuat transparan sebelum mulai.",
    tiers: [
      {
        title: "Starter",
        price: "5 juta",
        timeline: "7-10 hari",
        description: "Sempurna untuk personal branding & bisnis pemula.",
        features: [
          "Landing Page Profesional",
          "Desain Responsif",
          "Form Kontak & Integrasi WhatsApp",
          "Setup SEO Dasar",
          "Gratis Domain & Hosting 1 Tahun",
        ],
        buttonText: "Mulai Sekarang",
        popular: false,
      },
      {
        title: "Professional",
        price: "15 juta",
        timeline: "14-21 hari",
        description: "Untuk bisnis yang siap berskala dengan fitur tingkat lanjut.",
        features: [
          "Semua fitur Starter",
          "Hingga 10 Halaman",
          "CMS untuk kelola konten",
          "Animasi UI/UX Premium",
          "SEO & Analytics Lanjutan",
          "Prioritas Support",
        ],
        buttonText: "Pilih Professional",
        popular: true,
      },
      {
        title: "Enterprise",
        price: "Custom",
        timeline: "Sesuai scope",
        description: "Solusi eksklusif untuk korporat / kebutuhan kompleks.",
        features: [
          "Semua fitur Professional",
          "E-Commerce / Web Application",
          "Micro-interactions kustom",
          "Custom Backend / API Integration",
          "Optimasi Konversi",
          "Dedicated Project Manager",
        ],
        buttonText: "Hubungi Kami",
        popular: false,
      },
    ],
  },
  cta: {
    badge: "Konsultasi Gratis - Tanpa Komitmen",
    headingTop: "Punya ide website?",
    headingAccent: "kita rapikan scopenya.",
    description:
      "Ceritakan bisnis, target pelanggan, dan fitur yang dibutuhkan. Kami bantu susun scope, estimasi waktu, dan langkah paling realistis.",
    whatsappUrl: "https://wa.me/6281234567890?text=Halo%20WebServices%2C%20saya%20ingin%20konsultasi%20pembuatan%20website.",
    primaryCta: "Konsultasi via WhatsApp",
    secondaryCta: "Lihat Portofolio",
    socialProof: "50+ klien puas",
    ratingText: "5.0 rating rata-rata",
  },
  faq: {
    eyebrow: "Pertanyaan",
    heading: "Frequently asked questions",
    items: [
      {
        question: "Berapa lama waktu pembuatan website?",
        answer:
          "Untuk Company Profile berkisar 1-2 minggu. Web App kustom atau E-Commerce membutuhkan waktu 3-6 minggu tergantung kompleksitas fitur.",
      },
      {
        question: "Apakah website sudah termasuk hosting dan domain?",
        answer: "Ya, paket utama sudah termasuk domain dan hosting selama 1 tahun pertama.",
      },
      {
        question: "Apakah saya bisa mengubah konten website sendiri nantinya?",
        answer: "Tentu. Konten utama website bisa diedit melalui admin panel.",
      },
      {
        question: "Apakah ada biaya maintenance tahunan?",
        answer: "Ada biaya perpanjangan domain, hosting, dan maintenance keamanan opsional mulai tahun kedua.",
      },
      {
        question: "Apakah website ini sudah SEO friendly?",
        answer: "Ya. Struktur heading, metadata, performa, dan halaman responsif dibuat SEO friendly sejak awal.",
      },
    ],
  },
};

function isSiteConfig(value: unknown): value is SiteConfig {
  if (!value || typeof value !== "object") return false;
  const maybe = value as Partial<SiteConfig>;
  return Boolean(maybe.hero && maybe.stats && maybe.services && maybe.workflow && maybe.pricing && maybe.cta && maybe.faq);
}

export async function getSiteConfig(): Promise<SiteConfig> {
  try {
    const row = await db.siteConfig.findUnique({ where: { key: SITE_CONFIG_KEY } });
    if (row && isSiteConfig(row.value)) {
      return row.value;
    }
  } catch {
    // Keep the public website usable if the database is unavailable.
  }

  return defaultSiteConfig;
}
