import { config } from "dotenv";
import { PrismaClient, type Prisma } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

import seedPostsBatchOne from "./seed-batches/seed-posts-10-artikel";
import seedPostsBatchTwo from "./seed-batches/seed-10-artikel";

config({ path: ".env", override: true });
config({ path: ".env.local", override: true });

const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DIRECT_URL or DATABASE_URL is required to seed blog articles.");
}

const pool = new Pool({ connectionString });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://buildwebsite.com").replace(/\/$/, "");

type SeedPost = Omit<Prisma.PostCreateInput, "comments" | "likes"> & { slug: string };

const articleDates = {
  websiteLeads: new Date("2026-05-15T09:00:00.000Z"),
  landingPage: new Date("2026-05-14T09:00:00.000Z"),
  websiteUmkm: new Date("2026-05-13T09:00:00.000Z"),
};

const posts: SeedPost[] = [
  {
    title: "Cara Membuat Website Bisnis yang Menghasilkan Leads",
    slug: "cara-membuat-website-bisnis-yang-menghasilkan-leads",
    excerpt:
      "Pelajari cara membuat website bisnis yang profesional, dipercaya calon pelanggan, dan mampu menghasilkan leads untuk pertumbuhan usaha.",
    content: `
      <h2>Mengapa Website Bisnis Harus Lebih dari Sekadar Online?</h2>
      <p>Di era digital, memiliki <strong>website bisnis</strong> bukan lagi sekadar pelengkap. Website adalah wajah utama bisnis di internet, tempat calon pelanggan menilai apakah sebuah usaha terlihat profesional, terpercaya, dan layak dipilih. Banyak UMKM, jasa profesional, hingga perusahaan lokal mulai sadar bahwa media sosial saja tidak cukup untuk membangun kepercayaan jangka panjang.</p>
      <p>Media sosial memang penting untuk menjangkau audiens, tetapi website memiliki peran yang berbeda. Website menjadi pusat informasi resmi yang bisa dikendalikan sepenuhnya oleh pemilik bisnis. Di dalamnya, Anda bisa menampilkan profil usaha, layanan, portofolio, testimoni pelanggan, artikel edukatif, hingga tombol kontak yang mengarahkan pengunjung untuk melakukan tindakan tertentu.</p>
      <blockquote>Website bisnis yang baik bukan hanya terlihat menarik, tetapi juga mampu mengubah pengunjung menjadi calon pelanggan.</blockquote>

      <h2>Apa Itu Website Bisnis yang Menghasilkan Leads?</h2>
      <p>Website bisnis yang menghasilkan leads adalah website yang dirancang untuk mendorong pengunjung meninggalkan kontak, mengirim pesan, melakukan konsultasi, mengisi formulir, atau menghubungi bisnis secara langsung. Leads bisa berupa nomor WhatsApp, email, data formulir, atau permintaan penawaran dari calon pelanggan.</p>
      <p>Artinya, website tidak hanya menjadi brosur digital. Website harus memiliki struktur, pesan, dan alur yang jelas. Pengunjung perlu memahami siapa Anda, masalah apa yang Anda bantu selesaikan, apa keunggulan bisnis Anda, dan langkah apa yang harus mereka ambil setelah membaca informasi di website.</p>
      <p>Website seperti ini biasanya dibuat dengan pendekatan conversion-first. Setiap section punya fungsi: menarik perhatian, menjelaskan manfaat, membangun kepercayaan, mengurangi keraguan, lalu mengarahkan pengunjung ke aksi utama.</p>

      <h2>Elemen Penting dalam Website Bisnis</h2>
      <p>Agar website mampu bekerja secara maksimal, ada beberapa elemen penting yang perlu diperhatikan sejak awal. Elemen ini membantu website terlihat profesional sekaligus memudahkan pengunjung mengambil keputusan.</p>
      <ul>
        <li><strong>Headline yang jelas:</strong> jelaskan manfaat utama bisnis Anda dalam satu kalimat singkat.</li>
        <li><strong>Deskripsi layanan:</strong> tampilkan layanan atau produk dengan bahasa yang mudah dipahami.</li>
        <li><strong>Call to action:</strong> gunakan tombol seperti Konsultasi Gratis, Hubungi Kami, atau Minta Penawaran.</li>
        <li><strong>Testimoni pelanggan:</strong> tampilkan ulasan untuk membangun rasa percaya.</li>
        <li><strong>Portofolio:</strong> berikan bukti nyata dari pekerjaan atau hasil yang pernah dicapai.</li>
        <li><strong>Kontak yang mudah ditemukan:</strong> pastikan nomor WhatsApp, email, dan lokasi mudah diakses.</li>
      </ul>

      <h2>Gunakan Struktur Halaman yang Mudah Dipahami</h2>
      <p>Pengunjung website biasanya tidak membaca semua bagian secara detail. Mereka akan memindai halaman untuk menemukan informasi yang paling relevan. Karena itu, struktur halaman harus dibuat rapi, ringkas, dan mudah diikuti.</p>
      <p>Bagian awal website sebaiknya langsung menjelaskan siapa bisnis Anda dan manfaat utama yang ditawarkan. Setelah itu, lanjutkan dengan penjelasan layanan, alasan memilih bisnis Anda, bukti sosial, portofolio, dan ajakan untuk menghubungi. Struktur seperti ini membantu pengunjung merasa diarahkan, bukan dibiarkan bingung.</p>
      <h3>Contoh alur halaman yang efektif</h3>
      <ol>
        <li>Hero section dengan headline, subheadline, dan tombol aksi.</li>
        <li>Penjelasan singkat tentang masalah pelanggan.</li>
        <li>Solusi yang ditawarkan oleh bisnis Anda.</li>
        <li>Daftar layanan atau paket.</li>
        <li>Testimoni dan portofolio.</li>
        <li>FAQ untuk menjawab keraguan umum.</li>
        <li>Call to action terakhir untuk menghubungi bisnis.</li>
      </ol>

      <h2>Optimalkan Website Bisnis untuk SEO</h2>
      <p>Website yang bagus akan lebih efektif jika mudah ditemukan di Google. Di sinilah SEO berperan penting. SEO membantu halaman website muncul saat calon pelanggan mencari produk atau layanan yang Anda tawarkan.</p>
      <p>Untuk memulai, gunakan keyword yang sesuai dengan bisnis Anda. Misalnya, jika Anda menawarkan jasa pembuatan website, gunakan keyword seperti jasa pembuatan website, website bisnis, landing page UMKM, atau website company profile. Keyword tersebut perlu ditempatkan secara natural di judul, paragraf awal, heading, meta description, dan beberapa bagian konten.</p>
      <p>Namun, SEO bukan hanya soal memasukkan keyword. Kecepatan website, struktur heading, kualitas konten, tampilan mobile, internal link, dan pengalaman pengguna juga sangat berpengaruh. Website yang lambat, sulit dibaca, atau tidak responsif dapat membuat pengunjung keluar sebelum melakukan tindakan apa pun.</p>

      <h2>Desain yang Profesional Meningkatkan Kepercayaan</h2>
      <p>Desain website memiliki pengaruh besar terhadap persepsi pelanggan. Website dengan tampilan rapi, warna konsisten, font mudah dibaca, dan gambar berkualitas akan terlihat lebih terpercaya. Sebaliknya, desain yang berantakan bisa membuat bisnis terlihat kurang serius, meskipun produk atau layanan yang ditawarkan sebenarnya bagus.</p>
      <p>Untuk website bisnis, desain tidak harus terlalu ramai. Fokus utama adalah kejelasan informasi dan kemudahan navigasi. Gunakan ruang kosong dengan baik, pilih warna yang sesuai dengan identitas brand, dan pastikan tombol penting terlihat menonjol.</p>

      <h2>Pastikan Website Mudah Diakses dari Mobile</h2>
      <p>Banyak calon pelanggan membuka website melalui smartphone. Karena itu, website harus responsif dan nyaman digunakan di layar kecil. Tombol tidak boleh terlalu kecil, teks harus mudah dibaca, dan halaman harus cepat dimuat.</p>
      <p>Website yang tidak mobile-friendly bisa kehilangan banyak peluang. Pengunjung mungkin tertarik dengan layanan Anda, tetapi batal menghubungi karena tampilan website sulit digunakan. Hal sederhana seperti tombol WhatsApp yang terlihat jelas di mobile bisa meningkatkan jumlah leads secara signifikan.</p>

      <h2>Strategi Konten agar Leads Lebih Berkualitas</h2>
      <p>Lead yang banyak belum tentu selalu bagus. Website bisnis perlu menarik orang yang memang sesuai dengan layanan Anda. Karena itu, konten harus menjawab pertanyaan yang biasanya muncul sebelum calon pelanggan menghubungi: harga, proses kerja, estimasi waktu, contoh hasil, garansi, area layanan, dan siapa yang cocok menggunakan layanan tersebut.</p>
      <p>Konten seperti ini membantu menyaring calon pelanggan. Orang yang sudah membaca detail proses dan memahami value biasanya datang dengan ekspektasi yang lebih jelas. Tim sales juga lebih mudah melanjutkan percakapan karena calon pelanggan sudah mendapat edukasi awal dari website.</p>

      <h2>Tracking dan Pengukuran Leads</h2>
      <p>Website bisnis yang serius harus bisa diukur. Setidaknya, pasang tracking untuk klik WhatsApp, submit form, klik tombol harga, klik email, dan sumber traffic. Data ini membantu Anda mengetahui halaman mana yang menghasilkan leads dan bagian mana yang perlu diperbaiki.</p>
      <p>Tanpa tracking, optimasi hanya berdasarkan perasaan. Dengan tracking, Anda bisa melihat apakah pengunjung berhenti di hero, membaca sampai FAQ, atau langsung klik CTA. Dari sana, keputusan desain dan konten menjadi lebih objektif.</p>

      <h2>Kesalahan Umum yang Perlu Dihindari</h2>
      <p>Banyak pemilik bisnis membuat website hanya berdasarkan tampilan, tanpa memikirkan strategi. Akibatnya, website terlihat bagus tetapi tidak menghasilkan leads. Beberapa kesalahan umum yang sering terjadi antara lain:</p>
      <ul>
        <li>Tidak memiliki call to action yang jelas.</li>
        <li>Informasi layanan terlalu umum dan tidak menjawab kebutuhan pelanggan.</li>
        <li>Tidak menampilkan bukti seperti testimoni, portofolio, atau studi kasus.</li>
        <li>Website lambat dan tidak nyaman dibuka di smartphone.</li>
        <li>Tidak mengoptimalkan halaman untuk SEO.</li>
        <li>Kontak bisnis sulit ditemukan.</li>
      </ul>

      <h2>Kesimpulan</h2>
      <p>Membuat <strong>website bisnis</strong> yang menghasilkan leads membutuhkan strategi yang tepat. Website harus memiliki pesan yang jelas, desain profesional, struktur halaman yang mudah dipahami, konten yang relevan, serta call to action yang kuat.</p>
      <p>Bagi UMKM dan bisnis jasa, website bisa menjadi aset digital jangka panjang. Dengan website yang dirancang secara serius, bisnis tidak hanya terlihat lebih profesional, tetapi juga memiliki peluang lebih besar untuk mendapatkan calon pelanggan baru dari internet.</p>
      <p>Jika website Anda saat ini belum menghasilkan leads, mulailah dengan mengevaluasi halaman utama, kejelasan layanan, tombol kontak, kecepatan website, dan kualitas konten. Perbaikan kecil pada bagian yang tepat bisa memberi dampak besar terhadap pertumbuhan bisnis.</p>
    `,
    coverImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80",
    ogImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    author: "BuildWebsite Team",
    category: "Website Bisnis",
    focusKeyword: "website bisnis",
    canonicalUrl: `${SITE_URL}/blog/cara-membuat-website-bisnis-yang-menghasilkan-leads`,
    published: true,
    featured: true,
    publishedAt: articleDates.websiteLeads,
    metaTitle: "Cara Membuat Website Bisnis yang Menghasilkan Leads",
    metaDesc:
      "Panduan membuat website bisnis profesional yang dipercaya pelanggan, SEO-friendly, dan mampu menghasilkan leads untuk pertumbuhan usaha.",
    tags: ["website bisnis", "SEO", "UMKM", "landing page", "digital marketing"],
  },
  {
    title: "Anatomi Landing Page yang Mengkonversi: Panduan Lengkap untuk Bisnis Indonesia",
    slug: "anatomi-landing-page-yang-mengkonversi",
    excerpt:
      "Landing page yang mengkonversi bukan soal desain cantik semata. Pelajari elemen-elemen kunci yang mendorong pengunjung untuk langsung mengambil tindakan.",
    content: `
      <h2>Mengapa Landing Page yang Mengkonversi Itu Berbeda dari Website Biasa?</h2>
      <p>Banyak pemilik bisnis mengira website yang bagus sudah cukup untuk mendatangkan pelanggan. Kenyataannya, ada perbedaan mendasar antara website umum dan <strong>landing page yang mengkonversi</strong>. Landing page dirancang dengan satu tujuan tunggal: membuat pengunjung mengambil satu tindakan spesifik baik itu mengisi formulir, menghubungi WhatsApp, atau melakukan pembelian.</p>
      <p>Studi dari HubSpot menunjukkan bahwa bisnis dengan 10-15 landing page aktif menghasilkan lebih banyak leads dibanding bisnis yang hanya mengandalkan halaman beranda. Artinya, satu halaman yang teroptimasi bisa mengubah total performa digital marketing kamu.</p>

      <h2>6 Elemen Wajib di Setiap Landing Page yang Mengkonversi</h2>
      <p>Sebelum bicara desain atau warna, pahami dulu bahwa konversi terjadi karena <em>psikologi</em>, bukan estetika semata. Berikut elemen yang tidak boleh absen:</p>
      <h3>1. Headline yang Langsung Menjawab Masalah</h3>
      <p>Kamu punya sekitar 5 detik untuk meyakinkan pengunjung bahwa mereka berada di tempat yang tepat. Headline yang kuat tidak mendeskripsikan produkmu, ia berbicara langsung ke rasa sakit atau keinginan audiens.</p>
      <h3>2. Subheadline yang Memperkuat Headline</h3>
      <p>Subheadline bertugas memperjelas janji di headline. Gunakan 1-2 kalimat yang menjelaskan <em>bagaimana</em> kamu membantu dan <em>siapa</em> yang kamu layani. Ini bukan tempat untuk daftar fitur, fokus pada manfaat nyata.</p>
      <h3>3. Visual Hero yang Relevan</h3>
      <p>Gambar atau video di bagian atas halaman harus memperlihatkan hasil, bukan proses. Tampilkan screenshot dashboard, wajah pelanggan yang puas, atau demo produk singkat. Hindari foto stok generik yang tidak menceritakan apapun tentang bisnis kamu.</p>
      <h3>4. Social Proof: Bukti yang Berbicara Sendiri</h3>
      <p>Otak manusia secara naluriah mencari validasi dari orang lain sebelum mengambil keputusan. Social proof bisa berupa:</p>
      <ul>
        <li>Testimoni spesifik dengan nama lengkap dan foto nyata.</li>
        <li>Angka yang terverifikasi, contoh 200+ website sudah live.</li>
        <li>Logo klien atau media yang pernah meliput.</li>
        <li>Rating bintang dari Google atau marketplace.</li>
      </ul>
      <h3>5. Call to Action (CTA) yang Tidak Bisa Diabaikan</h3>
      <p>CTA adalah tombol atau link yang meminta pengunjung untuk bertindak. Gunakan kata kerja aktif, warna kontras, dan ulangi CTA di bagian atas, tengah, dan bawah halaman.</p>
      <h3>6. Form yang Tidak Meminta Terlalu Banyak</h3>
      <p>Setiap field tambahan pada form dapat menurunkan tingkat konversi. Untuk tahap pertama, cukup minta nama dan nomor WhatsApp. Data detail bisa dikumpulkan belakangan setelah mereka sudah yakin dengan layananmu.</p>

      <h2>Urutan Section Landing Page yang Ideal</h2>
      <p>Landing page yang baik terasa seperti percakapan sales yang rapi. Ia tidak langsung memaksa orang membeli, tetapi membawa pengunjung melewati alur berpikir yang natural: mengenali masalah, memahami solusi, percaya pada bukti, lalu merasa aman untuk mengambil tindakan.</p>
      <ol>
        <li><strong>Hero:</strong> headline, subheadline, visual, dan CTA utama.</li>
        <li><strong>Problem:</strong> jelaskan masalah yang dialami audiens.</li>
        <li><strong>Solution:</strong> tampilkan solusi dan manfaat utama.</li>
        <li><strong>How it works:</strong> jelaskan proses dalam 3-5 langkah.</li>
        <li><strong>Proof:</strong> testimoni, angka, portfolio, studi kasus, atau logo klien.</li>
        <li><strong>Offer:</strong> paket, benefit, bonus, atau alasan kenapa penawaran layak dipilih.</li>
        <li><strong>FAQ:</strong> jawab keberatan umum sebelum calon pelanggan bertanya.</li>
        <li><strong>Final CTA:</strong> ajakan tindakan yang jelas dan rendah friksi.</li>
      </ol>

      <h2>Kesalahan Paling Umum yang Bikin Landing Page Gagal</h2>
      <p>Banyak bisnis sudah punya landing page, tapi konversinya rendah. Biasanya karena satu atau lebih dari kesalahan ini:</p>
      <ul>
        <li><strong>Terlalu banyak informasi:</strong> landing page bukan brosur perusahaan. Fokus pada satu penawaran saja.</li>
        <li><strong>Tidak ada urgensi:</strong> tanpa alasan untuk bertindak sekarang, pengunjung akan menunda dan akhirnya lupa.</li>
        <li><strong>Kecepatan loading lambat:</strong> setiap tambahan waktu loading bisa memangkas konversi.</li>
        <li><strong>Tidak mobile-friendly:</strong> mayoritas traffic bisnis lokal Indonesia datang dari smartphone.</li>
        <li><strong>Pesan tidak konsisten:</strong> jika iklan berjanji diskon, landing page harus langsung membahas diskon itu.</li>
      </ul>
      <blockquote>Landing page terbaik bukan yang paling indah, melainkan yang paling jelas. Kejelasan selalu mengalahkan kreativitas ketika tujuannya adalah konversi.</blockquote>

      <h2>Cara Mengoptimalkan Landing Page untuk SEO Tanpa Mengorbankan Konversi</h2>
      <p>Landing page dan SEO sering dianggap bertentangan. Satu butuh teks minimal, yang lain butuh konten panjang. Solusinya adalah <strong>struktur halaman berlapis</strong>:</p>
      <ol>
        <li>Bagian atas atau above the fold: fokus 100% pada konversi, headline, CTA, dan social proof ringkas.</li>
        <li>Bagian tengah: jelaskan detail penawaran, manfaat, dan cara kerja. Ini bagian yang ramah SEO.</li>
        <li>Bagian bawah: FAQ, testimoni panjang, dan CTA final.</li>
      </ol>
      <p>Pastikan <strong>focus keyword</strong> muncul di title, meta description, H1, paragraf pertama, dan minimal satu H2. Gunakan internal linking ke halaman layanan atau artikel terkait untuk memperkuat otoritas halaman.</p>

      <h2>A/B Testing dan Optimasi Berkelanjutan</h2>
      <p>Landing page yang bagus jarang langsung sempurna di versi pertama. Setelah halaman berjalan, lakukan pengujian kecil: variasi headline, teks tombol, urutan section, panjang form, warna CTA, atau bukti sosial yang ditampilkan. Jangan mengubah semuanya sekaligus karena Anda akan sulit tahu perubahan mana yang berdampak.</p>
      <p>Mulai dari metrik utama seperti conversion rate, klik CTA, form submit, bounce rate, dan scroll depth. Jika banyak pengunjung berhenti sebelum melihat offer, berarti bagian awal halaman kurang kuat. Jika pengunjung membaca sampai bawah tetapi tidak klik CTA, mungkin penawaran atau risiko belum cukup jelas.</p>

      <h2>Mulai dari Mana Jika Kamu Belum Punya Landing Page?</h2>
      <p>Jika bisnis kamu masih mengandalkan media sosial atau profil marketplace saja, kamu sedang kehilangan banyak potensi konversi. Audiens yang datang dari iklan atau pencarian Google membutuhkan halaman yang berbicara langsung ke kebutuhan mereka, sesuatu yang tidak bisa dilakukan oleh halaman Instagram.</p>
      <p>Langkah pertama yang paling praktis: identifikasi satu layanan atau produk unggulanmu, tulis headline yang menjawab masalah spesifik, tambahkan 2-3 testimoni nyata, dan pasang satu tombol CTA yang jelas. Itulah fondasi landing page yang mengkonversi dan kamu bisa membangunnya dalam satu hari.</p>

      <h2>Kesimpulan</h2>
      <p>Landing page yang mengkonversi adalah aset digital yang paling berdampak langsung pada revenue bisnis kamu. Bukan tentang tampilan yang viral, bukan tentang fitur yang banyak, tapi tentang kejelasan pesan, kepercayaan yang dibangun lewat bukti nyata, dan satu ajakan bertindak yang tak terbantahkan.</p>
      <p>Mulai audit landing page kamu sekarang: apakah pengunjung baru bisa langsung memahami apa yang kamu tawarkan dalam 5 detik? Jika tidak, itulah pekerjaan rumah pertama yang harus diselesaikan.</p>
    `,
    coverImage:
      "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=1400&q=80",
    ogImage:
      "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=1200&q=80",
    author: "BuildWebsite Team",
    category: "Konversi & CRO",
    focusKeyword: "landing page yang mengkonversi",
    canonicalUrl: `${SITE_URL}/blog/anatomi-landing-page-yang-mengkonversi`,
    published: true,
    featured: true,
    publishedAt: articleDates.landingPage,
    metaTitle: "Anatomi Landing Page yang Mengkonversi (2025)",
    metaDesc:
      "Pelajari elemen wajib landing page yang mengkonversi pengunjung jadi pelanggan, plus kesalahan umum yang wajib dihindari bisnis Indonesia.",
    tags: ["landing page", "konversi", "CRO", "website bisnis", "digital marketing"],
  },
  {
    title: "Pentingnya Website Bisnis UMKM di Era Digital untuk Penjualan",
    slug: "pentingnya-website-bisnis-umkm-di-era-digital",
    excerpt:
      "Pelajari mengapa website bisnis UMKM sangat krusial untuk meningkatkan kredibilitas, jangkauan pasar, dan meroketkan konversi penjualan Anda.",
    content: `
      <h2>Pendahuluan: Transformasi Digital untuk Usaha Anda</h2>
      <p>Di era digital saat ini, memiliki kehadiran online bukan lagi sekadar pilihan, melainkan sebuah keharusan. Bagi para pelaku Usaha Mikro, Kecil, dan Menengah (UMKM), membangun sebuah <strong>website bisnis umkm</strong> adalah langkah strategis pertama untuk bersaing di pasar yang semakin kompetitif.</p>
      <p>Sayangnya, masih banyak pengusaha yang menganggap bahwa media sosial saja sudah cukup untuk memasarkan produk atau jasa mereka kepada khalayak luas. Padahal, bergantung sepenuhnya pada platform pihak ketiga seperti media sosial atau marketplace memiliki risiko tersendiri. Anda rentan terhadap perubahan algoritma, kebijakan platform, atau hilangnya akun secara sepihak.</p>

      <h2>Mengapa Website Bisnis UMKM Sangat Krusial?</h2>
      <p>Banyak pelanggan saat ini melakukan riset secara online sebelum mereka memutuskan untuk membeli suatu produk atau menggunakan sebuah jasa. Jika bisnis Anda tidak dapat ditemukan di mesin pencari seperti Google, Anda otomatis kehilangan potensi pendapatan yang sangat besar.</p>
      <h3>1. Meningkatkan Kredibilitas dan Profesionalisme</h3>
      <p>Kesan pertama sangatlah penting dalam dunia bisnis. Sebuah website yang dirancang dengan rapi, memiliki navigasi yang jelas, dan terlihat profesional akan langsung meningkatkan tingkat kepercayaan calon pelanggan terhadap bisnis Anda.</p>
      <h3>2. Akses Pasar 24 Jam Non-Stop</h3>
      <p>Berbeda dengan toko fisik konvensional yang memiliki jam operasional terbatas, website Anda aktif selama 24 jam sehari. Calon pelanggan dapat membaca informasi produk, melihat testimoni, dan menghubungi bisnis kapan saja.</p>
      <h3>3. Strategi Pemasaran yang Lebih Efektif dengan SEO</h3>
      <p>Dengan menerapkan teknik optimasi mesin pencari atau SEO pada situs Anda, bisnis memiliki peluang muncul di halaman pertama Google saat calon pelanggan mencari produk atau layanan yang relevan.</p>

      <h2>Website sebagai Aset Digital Milik Sendiri</h2>
      <p>Media sosial adalah channel yang penting, tetapi bukan aset yang sepenuhnya Anda miliki. Algoritma bisa berubah, jangkauan organik bisa turun, dan akun bisa terkena pembatasan. Website berbeda. Domain, konten, struktur halaman, database leads, dan strategi SEO berada dalam kendali bisnis Anda.</p>
      <p>Untuk UMKM, kendali ini sangat penting. Website bisa menjadi pusat dari semua aktivitas pemasaran: iklan diarahkan ke landing page, konten edukasi dibaca di blog, katalog produk ditampilkan lebih rapi, dan data calon pelanggan dikumpulkan melalui form atau WhatsApp.</p>

      <h2>Strategi Jitu Membangun Website Bisnis yang Menghasilkan</h2>
      <p>Setelah menyadari pentingnya memiliki situs web, langkah selanjutnya adalah memastikan bahwa situs yang dibangun benar-benar dapat berfungsi maksimal, bukan hanya sekadar pajangan digital. Perhatikan elemen berikut:</p>
      <ul>
        <li><strong>Desain responsif:</strong> pastikan tampilan situs menyesuaikan smartphone, tablet, dan desktop.</li>
        <li><strong>Kecepatan akses:</strong> optimalkan gambar, caching, hosting, dan script agar halaman cepat dimuat.</li>
        <li><strong>Call-to-action yang jelas:</strong> pandu pengunjung dengan tombol Beli Sekarang, Konsultasi Gratis via WhatsApp, atau Unduh Katalog.</li>
        <li><strong>Informasi kontak mudah ditemukan:</strong> tampilkan nomor telepon, email, alamat, dan jam respon.</li>
        <li><strong>Konten yang menjawab kebutuhan:</strong> jelaskan manfaat, harga, proses, FAQ, dan bukti hasil.</li>
      </ul>
      <blockquote>Website bisnis Anda bukan sekadar brosur digital yang pasif, melainkan mesin pencetak prospek otomatis yang bekerja tanpa henti untuk mendorong pertumbuhan bisnis.</blockquote>

      <h2>Pentingnya Menggunakan Landing Page Khusus</h2>
      <p>Jika Anda menjalankan kampanye iklan tertentu, sangat disarankan untuk mengarahkan audiens ke <strong>landing page</strong> khusus. Halaman arahan ini didesain untuk satu tujuan kampanye tunggal, dengan meminimalkan gangguan dari menu navigasi lainnya.</p>
      <p>Contohnya, jika iklan menawarkan paket website UMKM, pengunjung sebaiknya diarahkan ke halaman yang langsung menjelaskan paket tersebut, bukan ke homepage umum. Pesan yang konsisten antara iklan dan halaman tujuan dapat meningkatkan rasa relevan dan memperbesar peluang konversi.</p>

      <h2>Mengukur Kesuksesan dengan Alat Analitik</h2>
      <p>Keunggulan utama memiliki website sendiri adalah kemampuannya untuk dilacak dan diukur. Dengan mengintegrasikan alat seperti Google Analytics dan Search Console, Anda bisa mengetahui dari mana asal pengunjung, halaman mana yang paling lama dibaca, serta tombol mana yang paling sering diklik.</p>
      <p>Data ini membantu pemilik UMKM mengambil keputusan yang lebih rasional. Jika artikel tertentu mendatangkan traffic, Anda bisa menambah CTA ke halaman layanan. Jika banyak pengunjung keluar dari halaman harga, mungkin informasi paket belum cukup jelas.</p>

      <h2>Peran Penting Jasa Pembuatan Website Profesional</h2>
      <p>Membangun website dari nol mungkin terdengar menakutkan bagi pemilik usaha yang tidak memiliki latar belakang teknis. Di sinilah peran agensi atau penyedia jasa pembuatan website profesional menjadi relevan. Mereka membantu merancang tampilan, struktur konten, performa, keamanan, dan SEO teknis.</p>
      <p>Mempercayakan proses pembuatan website kepada tim ahli adalah investasi bisnis yang cerdas. Anda bisa fokus pada operasional, sementara tim profesional memastikan website berjalan lancar dan siap menerima calon pelanggan baru.</p>

      <h2>Checklist Website UMKM Sebelum Launching</h2>
      <ul>
        <li>Headline menjelaskan produk atau layanan utama.</li>
        <li>Tombol WhatsApp atau form kontak mudah ditemukan.</li>
        <li>Halaman mobile nyaman dibaca.</li>
        <li>Gambar sudah dikompres agar tidak lambat.</li>
        <li>Meta title dan meta description sudah diisi.</li>
        <li>Testimoni, portfolio, atau bukti kepercayaan tersedia.</li>
        <li>Tracking klik CTA sudah aktif.</li>
      </ul>

      <h2>Kesimpulan: Jangan Tunda, Saatnya Bisnis Anda Go Digital</h2>
      <p>Membuat dan mengembangkan website adalah salah satu keputusan terbaik untuk mengamankan masa depan bisnis. Dengan memiliki website sendiri, Anda memegang kendali penuh atas identitas merek, database pelanggan, dan arah pemasaran online.</p>
      <p>Jangan menunggu pesaing mengambil alih pangsa pasar digital. Mulailah merencanakan website bisnis Anda hari ini, lalu bangun secara bertahap: halaman utama, layanan, kontak, portfolio, blog, dan landing page campaign.</p>
    `,
    coverImage:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=80",
    ogImage:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80",
    author: "BuildWebsite Team",
    category: "Website Bisnis",
    focusKeyword: "website bisnis umkm",
    canonicalUrl: `${SITE_URL}/blog/pentingnya-website-bisnis-umkm-di-era-digital`,
    published: true,
    featured: false,
    publishedAt: articleDates.websiteUmkm,
    metaTitle: "Pentingnya Website Bisnis UMKM Saat Ini",
    metaDesc:
      "Ketahui mengapa website bisnis UMKM wajib dimiliki di era digital untuk tingkatkan kredibilitas, konversi penjualan, dan performa pemasaran Anda.",
    tags: ["website bisnis", "UMKM", "SEO", "digital marketing", "company profile"],
  },
];

const allPosts = [...posts, ...seedPostsBatchOne, ...seedPostsBatchTwo].map((post, index) => ({
  ...post,
  canonicalUrl: post.canonicalUrl?.replace(/^https:\/\/domain\.com/, SITE_URL),
  publishedAt: post.publishedAt ?? new Date(Date.UTC(2026, 4, 15 - index, 9, 0, 0)),
}));

async function main() {
  const uniquePosts = Array.from(new Map(allPosts.map((post) => [post.slug, post])).values());

  for (const post of uniquePosts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
    console.log(`Seeded blog article: ${post.slug}`);
  }

  const published = await prisma.post.count({ where: { published: true } });
  console.log(`Done. Upserted ${uniquePosts.length} articles. Published: ${published}.`);
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
