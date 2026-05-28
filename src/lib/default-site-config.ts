import { DEFAULT_SOLUTIONS_CONFIG } from "@/lib/solutions-config";
import type { SiteConfig } from "@/lib/site-config-types";

export const defaultSiteConfig: SiteConfig = {
  hero: {
    trustText: "Technical partner untuk website dan sistem bisnis",
    headlinePrefix: "Website & sistem digital",
    rotatingWords: ["yang rapi.", "siap dipakai.", "mudah dikelola."],
    description:
      "Build With Reys membantu bisnis membuat company profile, dashboard internal, e-commerce, dan website SEO-ready dengan scope jelas, staging link, dan handover penuh.",
    primaryCta: "Konsultasi via WhatsApp",
    secondaryCta: "Lihat Proses Kerja",
    visualImage: "/Asset/Build With Reys_20260527_120546_0005.png",
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
  trustStrip: {
    eyebrow: "Kenapa Build With Reys?",
    heading: "Website bukan cuma dibuat bagus, tapi dibangun dengan alur yang jelas.",
    description: "Dari perencanaan sampai serah terima, setiap langkah transparan dan terukur.",
    items: [
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
    ],
    footerText: "Proses jelas, hasil maksimal, dan support tetap ada.",
    buttonText: "Mulai konsultasi project",
  },
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
  solutions: DEFAULT_SOLUTIONS_CONFIG,
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
