import { config } from "dotenv";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

config({ path: ".env", override: true });
config({ path: ".env.local", override: true });

const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DIRECT_URL or DATABASE_URL is required to seed blog posts.");
}

const pool = new Pool({ connectionString });
const db = new PrismaClient({ adapter: new PrismaPg(pool) });

const now = new Date();

const posts = [
  {
    title: "Kenapa Website Bisnis Harus Punya Satu Tujuan Utama",
    slug: "website-bisnis-satu-tujuan-utama",
    excerpt: "Website yang efektif tidak mencoba menjelaskan semuanya sekaligus. Ia mengarahkan pengunjung ke satu aksi utama yang paling penting untuk bisnis.",
    category: "Strategi Website",
    focusKeyword: "website bisnis",
    tags: ["website bisnis", "conversion", "strategy"],
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1400&auto=format&fit=crop",
    content: `<h2>Mulai dari satu aksi utama</h2>
<p>Banyak website bisnis terlihat ramai karena ingin menampilkan semua informasi sekaligus. Ada profil perusahaan, daftar layanan, galeri, testimoni, promo, dan tombol kontak yang tersebar di banyak tempat.</p>
<p>Masalahnya, pengunjung baru biasanya tidak punya waktu untuk membaca semuanya. Mereka ingin cepat paham: bisnis ini menawarkan apa, cocok atau tidak untuk kebutuhan mereka, dan langkah berikutnya harus ke mana.</p>
<p>Karena itu, setiap website perlu punya satu tujuan utama. Misalnya mengarahkan pengunjung untuk menghubungi WhatsApp, booking konsultasi, mengisi form, atau melihat katalog produk.</p>
<h2>Konten mengikuti tujuan</h2>
<p>Kalau tujuan utamanya WhatsApp, maka struktur halaman harus mendukung keputusan itu. Headline harus jelas, manfaat layanan harus cepat dipahami, bukti kepercayaan harus terlihat, dan tombol WhatsApp harus mudah ditemukan.</p>
<p>Dengan cara ini, website tidak hanya terlihat rapi, tetapi juga bekerja sebagai alat penjualan yang fokus.</p>
<h2>Kesimpulan</h2>
<p>Sebelum menambah banyak fitur, tentukan dulu aksi utama yang ingin dilakukan pengunjung. Website yang punya tujuan jelas biasanya lebih mudah dipahami dan lebih kuat menghasilkan konversi.</p>`,
  },
  {
    title: "Checklist Singkat Sebelum Launching Website UMKM",
    slug: "checklist-launching-website-umkm",
    excerpt: "Sebelum website dipublikasikan, ada beberapa hal sederhana yang perlu dicek agar tampil profesional dan siap dikunjungi calon pelanggan.",
    category: "UMKM Digital",
    focusKeyword: "website UMKM",
    tags: ["website UMKM", "launching", "SEO"],
    coverImage: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1400&auto=format&fit=crop",
    content: `<h2>Pastikan informasi utama sudah jelas</h2>
<p>Sebelum website UMKM dipublikasikan, cek dulu apakah pengunjung bisa langsung memahami bisnis Anda dalam beberapa detik pertama. Nama bisnis, jenis produk atau layanan, area layanan, dan cara menghubungi harus mudah ditemukan.</p>
<p>Kalau pengunjung masih harus menebak bisnis ini bergerak di bidang apa, berarti bagian hero atau pembuka halaman perlu diperbaiki.</p>
<h2>Cek tombol aksi</h2>
<p>Tombol seperti WhatsApp, booking, lihat katalog, atau pesan sekarang harus diuji satu per satu. Pastikan link tidak rusak, nomor tujuan benar, dan teks tombol cukup jelas.</p>
<p>Jangan hanya mengecek dari laptop. Buka juga dari handphone karena sebagian besar calon pelanggan biasanya datang dari mobile.</p>
<h2>Rapikan SEO dasar</h2>
<p>Setiap halaman penting sebaiknya punya title dan deskripsi SEO yang relevan. Gambar juga perlu alt text sederhana agar lebih mudah dipahami mesin pencari.</p>
<h2>Kesimpulan</h2>
<p>Launching website tidak harus rumit. Yang penting informasi jelas, tombol aksi bekerja, tampilan mobile rapi, dan SEO dasar tidak kosong.</p>`,
  },
  {
    title: "Kenapa Halaman Layanan Lebih Penting dari Sekadar Galeri",
    slug: "halaman-layanan-lebih-penting-dari-galeri",
    excerpt: "Galeri memang membantu membangun kepercayaan, tetapi halaman layanan yang jelas lebih cepat menjawab kebutuhan calon pelanggan.",
    category: "Conversion",
    focusKeyword: "halaman layanan",
    tags: ["layanan", "conversion", "copywriting"],
    coverImage: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1400&auto=format&fit=crop",
    content: `<h2>Galeri menunjukkan hasil, layanan menjelaskan nilai</h2>
<p>Banyak bisnis ingin langsung menonjolkan galeri karena terlihat visual dan menarik. Itu bagus, terutama untuk bisnis kreatif, kuliner, properti, atau jasa visual.</p>
<p>Namun calon pelanggan tidak hanya ingin melihat hasil. Mereka juga ingin tahu layanan apa yang tersedia, prosesnya bagaimana, estimasi harga seperti apa, dan masalah mereka bisa dibantu sejauh mana.</p>
<h2>Halaman layanan membuat keputusan lebih mudah</h2>
<p>Halaman layanan yang baik menjelaskan masalah pelanggan, solusi yang ditawarkan, benefit, proses kerja, dan tombol aksi yang jelas. Informasi ini membantu pengunjung merasa lebih yakin sebelum menghubungi bisnis.</p>
<p>Galeri tetap penting, tetapi sebaiknya dipakai sebagai bukti pendukung, bukan satu-satunya isi website.</p>
<h2>Kesimpulan</h2>
<p>Jika website ingin lebih menjual, jangan hanya tampilkan gambar. Jelaskan layanan dengan bahasa yang mudah dipahami dan arahkan pengunjung ke langkah berikutnya.</p>`,
  },
  {
    title: "Cara Membuat Homepage yang Tidak Membingungkan Pengunjung",
    slug: "homepage-tidak-membingungkan-pengunjung",
    excerpt: "Homepage yang baik membantu pengunjung memahami bisnis secara bertahap: apa yang ditawarkan, kenapa bisa dipercaya, dan harus klik apa setelahnya.",
    category: "UI/UX",
    focusKeyword: "homepage website",
    tags: ["homepage", "UI UX", "branding"],
    coverImage: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=1400&auto=format&fit=crop",
    content: `<h2>Jangan mulai dari terlalu banyak pilihan</h2>
<p>Homepage sering menjadi halaman pertama yang dilihat calon pelanggan. Karena itu, halaman ini harus membantu mereka memahami bisnis secara cepat dan terarah.</p>
<p>Kesalahan umum adalah menaruh terlalu banyak menu, terlalu banyak tombol, dan terlalu banyak klaim di bagian awal. Akhirnya pengunjung bingung harus membaca atau klik bagian mana.</p>
<h2>Susun alur dari atas ke bawah</h2>
<p>Bagian atas homepage sebaiknya menjelaskan penawaran utama. Setelah itu tampilkan manfaat, layanan, proses, bukti kepercayaan, dan CTA. Alur ini membuat pengunjung mengikuti cerita yang logis.</p>
<p>Setiap section harus punya fungsi. Kalau sebuah section tidak membantu pengunjung mengambil keputusan, lebih baik disederhanakan atau disembunyikan dulu.</p>
<h2>Kesimpulan</h2>
<p>Homepage yang bagus bukan yang paling ramai, tetapi yang paling mudah dipahami. Buat alurnya jelas dan arahkan pengunjung ke satu aksi utama.</p>`,
  },
  {
    title: "Tanda Website Perlu Dirombak, Bukan Sekadar Dipoles",
    slug: "tanda-website-perlu-dirombak",
    excerpt: "Kadang masalah website bukan hanya warna atau layout, tetapi struktur, pesan, dan alur pengunjung yang memang perlu diperbaiki dari dasar.",
    category: "Website Audit",
    focusKeyword: "audit website",
    tags: ["audit website", "redesign", "performance"],
    coverImage: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1400&auto=format&fit=crop",
    content: `<h2>Bukan semua masalah selesai dengan desain baru</h2>
<p>Website yang terlihat kurang modern memang bisa dipoles dengan warna, font, dan gambar baru. Tetapi kalau struktur informasinya membingungkan, hasilnya tetap tidak maksimal.</p>
<p>Website perlu dirombak ketika pengunjung sulit memahami layanan, tombol aksi tidak jelas, halaman penting terlalu tersembunyi, atau konten tidak menjawab pertanyaan pelanggan.</p>
<h2>Lihat dari perilaku pengunjung</h2>
<p>Jika banyak orang masuk tetapi tidak menghubungi, bisa jadi alur website belum cukup meyakinkan. Jika traffic ada tetapi bounce tinggi, mungkin halaman terlalu lambat, terlalu panjang, atau tidak relevan dengan ekspektasi pengunjung.</p>
<p>Audit sederhana bisa dimulai dari tiga pertanyaan: apa yang ditawarkan, kenapa harus percaya, dan bagaimana cara mulai.</p>
<h2>Kesimpulan</h2>
<p>Kalau masalahnya ada di alur dan pesan, redesign visual saja tidak cukup. Perbaiki struktur website agar lebih mudah dipahami dan lebih kuat mengarahkan aksi.</p>`,
  },
];

async function main() {
  for (let index = 0; index < posts.length; index += 1) {
    const post = posts[index];
    const publishedAt = new Date(now.getTime() - index * 24 * 60 * 60 * 1000);
    await db.post.upsert({
      where: { slug: post.slug },
      update: {
        ...post,
        ogImage: post.coverImage,
        author: "BuildWebsite Team",
        published: true,
        featured: index < 2,
        publishedAt,
        metaTitle: post.title,
        metaDesc: post.excerpt,
      },
      create: {
        ...post,
        ogImage: post.coverImage,
        author: "BuildWebsite Team",
        published: true,
        featured: index < 2,
        publishedAt,
        metaTitle: post.title,
        metaDesc: post.excerpt,
      },
    });
  }

  console.log(`Seeded ${posts.length} short blog posts.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await db.$disconnect();
    await pool.end();
  });
