import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL or DIRECT_URL is required to seed blog posts.');
}

const pool = new Pool({ connectionString });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

const now = new Date();
const daysAgo = (days) => new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

const posts = [
  {
    title: 'Cara Membuat Website UMKM yang Menarik, Cepat, dan Siap Menjual',
    slug: 'cara-membuat-website-umkm-yang-menarik',
    category: 'Website Bisnis',
    focusKeyword: 'website UMKM',
    excerpt: 'Panduan praktis membangun website UMKM yang terlihat profesional, mudah dipercaya, cepat diakses, dan siap mengubah pengunjung menjadi pelanggan.',
    coverImage: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=80',
    ogImage: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80',
    featured: true,
    publishedAt: daysAgo(2),
    tags: ['website UMKM', 'website bisnis', 'conversion', 'branding'],
    metaTitle: 'Cara Membuat Website UMKM yang Menarik dan Siap Menjual',
    metaDesc: 'Pelajari struktur website UMKM yang profesional: hero, value proposition, layanan, testimoni, CTA WhatsApp, dan optimasi kecepatan.',
    content: `
      <h2>Kenapa website UMKM harus dibuat serius?</h2>
      <p>Website untuk UMKM bukan sekadar kartu nama online. Website yang baik membantu calon pelanggan memahami produk, melihat bukti kepercayaan, lalu mengambil aksi seperti menghubungi WhatsApp, booking, atau membeli produk.</p>
      <p>Kesalahan paling umum adalah terlalu fokus pada tampilan, tetapi lupa pada alur pengunjung. Padahal website yang menjual harus menjawab tiga pertanyaan: apa yang ditawarkan, kenapa harus percaya, dan bagaimana cara mulai.</p>
      <h2>Struktur halaman yang direkomendasikan</h2>
      <ul>
        <li><strong>Hero section</strong> dengan headline jelas dan CTA utama.</li>
        <li><strong>Problem dan solusi</strong> agar pengunjung merasa relevan.</li>
        <li><strong>Layanan atau produk utama</strong> dengan benefit, bukan hanya fitur.</li>
        <li><strong>Portfolio atau contoh hasil</strong> untuk membangun bukti.</li>
        <li><strong>Testimoni</strong> dari pelanggan nyata.</li>
        <li><strong>FAQ</strong> untuk mengurangi keraguan sebelum kontak.</li>
      </ul>
      <blockquote>Website UMKM yang bagus tidak harus rumit. Yang penting cepat, jelas, dipercaya, dan mudah membuat pelanggan mengambil tindakan.</blockquote>
      <h2>Checklist sebelum publish</h2>
      <p>Pastikan website sudah mobile-friendly, tombol WhatsApp mudah ditemukan, gambar sudah terkompres, dan setiap halaman punya judul serta deskripsi SEO yang relevan.</p>
      <h2>Kesimpulan</h2>
      <p>Mulai dari struktur sederhana tetapi kuat. Setelah traffic bertambah, barulah tambahkan fitur seperti katalog, booking, payment, atau dashboard admin.</p>
    `,
  },
  {
    title: 'Checklist SEO Lokal untuk Bisnis Jasa agar Lebih Mudah Ditemukan Google',
    slug: 'checklist-seo-lokal-untuk-bisnis-jasa',
    category: 'SEO',
    focusKeyword: 'SEO lokal bisnis jasa',
    excerpt: 'SEO lokal membantu bisnis jasa muncul saat calon pelanggan mencari layanan di area tertentu. Ini checklist praktis yang bisa langsung diterapkan.',
    coverImage: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?auto=format&fit=crop&w=1400&q=80',
    ogImage: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?auto=format&fit=crop&w=1200&q=80',
    featured: true,
    publishedAt: daysAgo(6),
    tags: ['SEO lokal', 'Google Business Profile', 'bisnis jasa', 'content marketing'],
    metaTitle: 'Checklist SEO Lokal untuk Bisnis Jasa',
    metaDesc: 'Panduan SEO lokal untuk bisnis jasa: keyword area, landing page layanan, Google Business Profile, review, dan struktur konten.',
    content: `
      <h2>Apa itu SEO lokal?</h2>
      <p>SEO lokal adalah strategi agar bisnis muncul untuk pencarian berbasis lokasi, misalnya “jasa pembuatan website di Bandung” atau “konsultan SEO Jakarta”.</p>
      <h2>Checklist utama</h2>
      <ol>
        <li><strong>Gunakan keyword lokasi</strong> di title, heading, dan konten secara natural.</li>
        <li><strong>Buat halaman layanan spesifik</strong>, bukan hanya satu halaman umum.</li>
        <li><strong>Optimalkan Google Business Profile</strong> dengan kategori, foto, jam buka, dan link website.</li>
        <li><strong>Kumpulkan review</strong> dari pelanggan yang benar-benar pernah memakai layanan.</li>
        <li><strong>Tambahkan schema markup</strong> seperti LocalBusiness atau ProfessionalService bila relevan.</li>
      </ol>
      <h2>Konten yang layak dibuat</h2>
      <p>Buat artikel edukatif yang menjawab pertanyaan calon pelanggan, seperti harga, proses kerja, perbandingan solusi, dan studi kasus.</p>
      <blockquote>SEO lokal yang kuat biasanya datang dari kombinasi halaman layanan yang jelas, review yang konsisten, dan konten yang menjawab niat pencarian.</blockquote>
      <h2>Kesimpulan</h2>
      <p>Jangan tunggu website sempurna untuk mulai SEO. Mulai dari fondasi: struktur halaman, keyword lokal, profil bisnis, dan review.</p>
    `,
  },
  {
    title: 'Landing Page yang Convert: Elemen Penting untuk Iklan dan Campaign',
    slug: 'landing-page-yang-convert-untuk-iklan',
    category: 'Landing Page',
    focusKeyword: 'landing page yang convert',
    excerpt: 'Landing page campaign harus fokus pada satu tujuan. Pelajari elemen yang membuat pengunjung lebih mudah percaya dan klik CTA.',
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80',
    ogImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    featured: false,
    publishedAt: daysAgo(10),
    tags: ['landing page', 'ads', 'conversion rate', 'copywriting'],
    metaTitle: 'Landing Page yang Convert untuk Iklan dan Campaign',
    metaDesc: 'Elemen landing page yang efektif: headline, CTA, social proof, benefit, FAQ, form pendek, dan tracking conversion.',
    content: `
      <h2>Landing page berbeda dari homepage</h2>
      <p>Homepage menjelaskan banyak hal tentang brand. Landing page campaign harus lebih fokus: satu audiens, satu pesan, satu aksi.</p>
      <h2>Elemen wajib landing page</h2>
      <ul>
        <li>Headline dengan hasil yang jelas.</li>
        <li>Subheadline yang menjawab masalah utama.</li>
        <li>CTA yang konsisten dan mudah ditemukan.</li>
        <li>Visual produk, mockup, atau hasil kerja.</li>
        <li>Testimoni dan angka bukti.</li>
        <li>FAQ untuk mengatasi objection.</li>
      </ul>
      <h2>Optimasi untuk iklan</h2>
      <p>Pastikan pesan iklan sama dengan pesan landing page. Kalau iklan menjanjikan “website cepat untuk UMKM”, headline landing page juga harus membahas hal yang sama.</p>
      <h2>Tracking wajib</h2>
      <p>Pasang event untuk klik WhatsApp, submit form, klik tombol harga, dan scroll depth. Tanpa tracking, sulit tahu bagian mana yang perlu diperbaiki.</p>
    `,
  },
  {
    title: 'Kapan Bisnis Perlu Redesign Website? Ini Tanda dan Prioritasnya',
    slug: 'kapan-bisnis-perlu-redesign-website',
    category: 'UI/UX',
    focusKeyword: 'redesign website bisnis',
    excerpt: 'Redesign website bukan hanya soal tampilan baru. Kadang yang perlu diperbaiki adalah struktur konten, performa, navigasi, dan conversion flow.',
    coverImage: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&fit=crop&w=1400&q=80',
    ogImage: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&fit=crop&w=1200&q=80',
    featured: false,
    publishedAt: daysAgo(16),
    tags: ['redesign website', 'UI UX', 'website audit', 'conversion'],
    metaTitle: 'Kapan Bisnis Perlu Redesign Website?',
    metaDesc: 'Tanda website perlu redesign: lambat, tidak mobile-friendly, susah update, conversion rendah, dan tampilan tidak lagi sesuai brand.',
    content: `
      <h2>Redesign bukan sekadar ganti warna</h2>
      <p>Website bisa terlihat modern tetapi tetap tidak menghasilkan jika struktur informasinya berantakan. Karena itu redesign harus dimulai dari audit.</p>
      <h2>Tanda website perlu redesign</h2>
      <ul>
        <li>Website lambat dibuka di mobile.</li>
        <li>Informasi layanan sulit ditemukan.</li>
        <li>Desain tidak konsisten dengan brand sekarang.</li>
        <li>Admin sulit mengupdate konten.</li>
        <li>Traffic ada, tapi leads rendah.</li>
      </ul>
      <h2>Prioritas redesign</h2>
      <p>Mulai dari halaman dengan dampak bisnis terbesar: homepage, landing page iklan, halaman layanan, halaman harga, dan halaman kontak.</p>
      <blockquote>Redesign terbaik adalah redesign yang bisa diukur: lebih cepat, lebih jelas, dan lebih banyak menghasilkan action.</blockquote>
    `,
  },
  {
    title: 'Company Profile Website: Konten yang Harus Ada agar Terlihat Profesional',
    slug: 'company-profile-website-konten-yang-harus-ada',
    category: 'Company Profile',
    focusKeyword: 'company profile website',
    excerpt: 'Company profile website membantu calon klien menilai kredibilitas bisnis. Ini struktur konten yang wajib ada agar terlihat profesional.',
    coverImage: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=80',
    ogImage: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80',
    featured: false,
    publishedAt: daysAgo(24),
    tags: ['company profile', 'branding', 'website perusahaan', 'trust'],
    metaTitle: 'Company Profile Website: Konten Wajib agar Profesional',
    metaDesc: 'Struktur company profile website: profil perusahaan, layanan, portfolio, legalitas, testimoni, tim, dan CTA kontak.',
    content: `
      <h2>Fungsi company profile website</h2>
      <p>Company profile website adalah pusat kredibilitas digital. Calon klien biasanya mengecek website sebelum menghubungi atau mengirim permintaan penawaran.</p>
      <h2>Konten yang wajib ada</h2>
      <ul>
        <li>Ringkasan perusahaan dan positioning.</li>
        <li>Layanan utama dengan penjelasan singkat.</li>
        <li>Portfolio, studi kasus, atau daftar klien.</li>
        <li>Legalitas, sertifikasi, atau penghargaan bila ada.</li>
        <li>Testimoni dan kontak yang mudah diakses.</li>
      </ul>
      <h2>Kesalahan umum</h2>
      <p>Terlalu banyak memakai jargon, tidak ada CTA, foto buram, dan halaman layanan terlalu pendek. Buat konten yang mudah dipahami oleh orang yang baru mengenal bisnis kamu.</p>
    `,
  },
  {
    title: 'E-Commerce Kecil: Mulai dari Katalog, Checkout, atau Marketplace?',
    slug: 'ecommerce-kecil-mulai-dari-katalog-checkout-atau-marketplace',
    category: 'E-Commerce',
    focusKeyword: 'ecommerce kecil',
    excerpt: 'Tidak semua bisnis perlu langsung membuat toko online lengkap. Pilih antara katalog, checkout sederhana, atau marketplace berdasarkan tahap bisnis.',
    coverImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1400&q=80',
    ogImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80',
    featured: false,
    publishedAt: daysAgo(32),
    tags: ['ecommerce', 'katalog produk', 'checkout', 'UMKM'],
    metaTitle: 'E-Commerce Kecil: Katalog, Checkout, atau Marketplace?',
    metaDesc: 'Panduan memilih fitur e-commerce untuk bisnis kecil: katalog WhatsApp, checkout sederhana, payment gateway, atau integrasi marketplace.',
    content: `
      <h2>Mulai dari kebutuhan bisnis</h2>
      <p>Banyak bisnis kecil ingin langsung punya toko online lengkap. Padahal fitur yang terlalu banyak bisa membuat biaya dan maintenance membengkak.</p>
      <h2>Opsi yang bisa dipilih</h2>
      <ol>
        <li><strong>Katalog + WhatsApp</strong>: cocok untuk validasi produk dan order manual.</li>
        <li><strong>Checkout sederhana</strong>: cocok kalau produk sudah stabil dan stok mudah dikelola.</li>
        <li><strong>Marketplace integration</strong>: cocok jika channel utama masih marketplace.</li>
      </ol>
      <h2>Kapan perlu payment gateway?</h2>
      <p>Gunakan payment gateway saat volume transaksi cukup stabil dan proses manual mulai memakan waktu. Jangan lupa hitung fee, refund, dan alur konfirmasi.</p>
      <h2>Kesimpulan</h2>
      <p>Untuk tahap awal, katalog yang rapi dan CTA WhatsApp sering lebih efektif daripada toko online kompleks yang belum siap dioperasikan.</p>
    `,
  },
];

async function main() {
  for (const post of posts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: {
        ...post,
        author: 'BuildWebsite Team',
        published: true,
      },
      create: {
        ...post,
        author: 'BuildWebsite Team',
        published: true,
      },
    });
    console.log(`Seeded: ${post.slug}`);
  }

  const count = await prisma.post.count({ where: { published: true } });
  console.log(`Done. Published blog posts: ${count}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
