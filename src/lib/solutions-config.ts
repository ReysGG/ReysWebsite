export type SolutionExampleConfig = {
  title: string;
  description: string;
  media: string;
};

export type SolutionsConfig = {
  eyebrow: string;
  heading: string;
  description: string;
  items: SolutionExampleConfig[];
};

export const DEFAULT_SOLUTIONS_CONFIG: SolutionsConfig = {
  eyebrow: "Contoh solusi",
  heading: "Tidak semua project bisa dipublikasikan. Scope tetap bisa dinilai sejak awal.",
  description:
    "Saat portfolio publik belum tersedia, cara paling aman menilai kerja sama adalah dari contoh scope, staging link, dan deliverable yang jelas sebelum development.",
  items: [
    {
      title: "UMKM Storefront",
      description:
        "Storefront cepat untuk katalog produk, promo, checkout ringan, dan jalur kontak WhatsApp agar calon pembeli tidak berhenti di tengah jalan.",
      media: "/gif/Create_a_clean_modern_ui_animation_for_a_smal.gif",
    },
    {
      title: "Dashboard Operasional",
      description:
        "Dashboard internal untuk monitoring stok, transaksi, dan laporan harian agar owner bisa mengambil keputusan lebih cepat.",
      media: "/gif/Create_a_clean_operations_dashboard_ui_animat.gif",
    },
    {
      title: "Profil Bisnis Profesional",
      description:
        "Website representasi brand dengan struktur layanan, portfolio, testimoni, dan CTA yang jelas untuk meningkatkan trust pengunjung.",
      media: "/gif/Create_a_clean_company_profile_website_animat.gif",
    },
    {
      title: "Landing Page Campaign",
      description:
        "Halaman campaign dengan pesan yang fokus, section benefit, social proof, dan CTA yang disusun untuk mengubah visitor menjadi lead.",
      media: "/gif/Create_a_clean_landing_page_campaign_ui_anima.gif",
    },
  ],
};
