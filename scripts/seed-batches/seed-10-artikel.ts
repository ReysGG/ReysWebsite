import type { Prisma } from "@prisma/client";

type SeedPost = Omit<Prisma.PostCreateInput, "comments" | "likes"> & {
  slug: string;
};

const posts: SeedPost[] = [
  // ─────────────────────────────────────────────
  // ARTIKEL 1
  // ─────────────────────────────────────────────
  {
    title: "5 Alasan UMKM Wajib Punya Website di 2025, Bukan Cuma Medsos",
    slug: "alasan-umkm-wajib-punya-website-2025",
    excerpt:
      "Media sosial saja tidak cukup untuk tumbuh. Pelajari mengapa website untuk UMKM adalah investasi wajib di 2025 agar bisnis kamu tidak kalah saing.",
    content: `
      <h2>Medsos Sudah Cukup? Ini yang Kebanyakan UMKM Salah Sangka</h2>
      <p>
        Instagram dan TikTok memang luar biasa untuk membangun awareness. Tapi ada satu masalah besar: kamu tidak memiliki platform itu. Algoritmanya berubah sewaktu-waktu, akun bisa dibanned tanpa peringatan, dan jangkauan organik terus menyusut. Di sinilah <strong>website untuk UMKM</strong> menjadi aset yang tidak bisa digantikan — sebuah properti digital yang sepenuhnya milikmu.
      </p>
      <p>
        Data dari We Are Social 2024 menunjukkan bahwa 77% konsumen Indonesia melakukan riset online sebelum membeli, dan Google masih menjadi titik awal perjalanan belanja mereka. Jika bisnis kamu tidak hadir di sana, kamu tidak ada di peta mereka.
      </p>

      <h2>5 Alasan UMKM Wajib Punya Website di 2025</h2>

      <h3>1. Website Bekerja 24 Jam Tanpa Gaji</h3>
      <p>
        Toko fisik kamu tutup jam 9 malam. Karyawanmu istirahat di akhir pekan. Tapi website bekerja tanpa henti — menjawab pertanyaan calon pelanggan, menampilkan katalog produk, dan bahkan menerima pesanan saat kamu tidur. Untuk UMKM dengan sumber daya terbatas, ini adalah tenaga penjual paling efisien yang pernah ada.
      </p>

      <h3>2. Meningkatkan Kredibilitas di Mata Konsumen</h3>
      <p>
        Coba bayangkan dua bisnis katering: satu punya website rapi dengan testimoni, menu lengkap, dan kontak jelas — satunya hanya punya akun Instagram. Mana yang langsung kamu percaya? Survei BrightLocal menemukan bahwa 84% konsumen mempercayai bisnis dengan website profesional sama seperti rekomendasi dari teman.
      </p>

      <h3>3. Bisa Ditemukan Lewat Google (SEO)</h3>
      <p>
        Saat seseorang mengetik "katering pernikahan di Surabaya" atau "jasa desain interior Bandung" di Google, yang muncul adalah website — bukan akun Instagram. Dengan optimasi SEO yang tepat, bisnis kamu bisa muncul di halaman pertama Google dan mendapatkan traffic organik gratis setiap harinya, tanpa bayar iklan.
      </p>

      <h3>4. Kontrol Penuh atas Branding dan Narasi Bisnis</h3>
      <p>
        Di media sosial, tampilanmu dibatasi oleh template platform. Di website, kamu bebas menentukan warna, font, layout, dan pesan yang ingin disampaikan. Ini penting untuk membangun brand yang konsisten dan profesional, terutama saat kamu ingin masuk ke segmen pasar yang lebih premium.
      </p>

      <h3>5. Pintu Masuk ke Iklan Digital yang Lebih Efektif</h3>
      <p>
        Google Ads, Meta Ads, dan TikTok Ads semuanya membutuhkan landing page atau website sebagai tujuan klik iklan. Tanpa website, kamu tidak bisa menjalankan retargeting, memasang Facebook Pixel, atau melacak konversi secara akurat. Artinya, anggaran iklanmu terbuang sia-sia tanpa data yang bisa dioptimalkan.
      </p>

      <h2>Berapa Biaya Membuat Website UMKM?</h2>
      <p>
        Ini pertanyaan yang paling sering ditunda karena takut mahal. Kenyataannya, website profil bisnis yang fungsional bisa dimulai dari Rp 3–5 juta untuk yang sederhana, hingga Rp 15–30 juta untuk yang lebih lengkap dengan fitur e-commerce dan SEO on-page. Bandingkan dengan sewa toko fisik atau biaya iklan bulanan — investasi satu kali yang bekerja bertahun-tahun.
      </p>

      <blockquote>
        Website bukan pengeluaran, tapi aset. Bedanya: pengeluaran habis setelah dipakai, aset terus menghasilkan nilai.
      </blockquote>

      <h2>Apa yang Harus Ada di Website UMKM yang Efektif?</h2>
      <ul>
        <li>Halaman beranda yang jelas menjelaskan siapa kamu dan apa yang kamu tawarkan</li>
        <li>Halaman layanan atau produk dengan deskripsi lengkap dan harga (jika relevan)</li>
        <li>Testimoni atau portofolio dari klien nyata</li>
        <li>Tombol WhatsApp atau formulir kontak yang mudah ditemukan</li>
        <li>Informasi alamat dan jam operasional untuk bisnis lokal</li>
        <li>Blog atau artikel untuk membantu SEO jangka panjang</li>
      </ul>

      <h2>Kesimpulan</h2>
      <p>
        Di 2025, tidak punya website bukan berarti hemat — itu berarti menyerahkan calon pelanggan ke kompetitor yang lebih siap. Website untuk UMKM adalah fondasi digital yang memungkinkan semua strategi marketing lainnya bekerja lebih efektif, dari SEO hingga iklan berbayar. Mulailah dengan yang sederhana, konsisten ditingkatkan, dan biarkan website bekerja untukmu setiap hari.
      </p>
    `,
    coverImage:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1400&q=80",
    ogImage:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
    author: "BuildWebsite Team",
    category: "Website Bisnis",
    focusKeyword: "website untuk UMKM",
    canonicalUrl:
      "https://domain.com/blog/alasan-umkm-wajib-punya-website-2025",
    published: true,
    featured: false,
    publishedAt: new Date(),
    metaTitle: "5 Alasan UMKM Wajib Punya Website di 2025",
    metaDesc:
      "Medsos saja tidak cukup. Temukan 5 alasan kuat mengapa website untuk UMKM adalah investasi wajib di 2025 agar bisnis kamu tidak kalah saing.",
    tags: ["UMKM", "website bisnis", "digital marketing", "SEO"],
  },

  // ─────────────────────────────────────────────
  // ARTIKEL 2
  // ─────────────────────────────────────────────
  {
    title: "Company Profile Website: Investasi Nyata atau Sekadar Gengsi?",
    slug: "company-profile-website-investasi-atau-gengsi",
    excerpt:
      "Company profile website sering dianggap formalitas. Padahal jika dirancang tepat, ia bisa menjadi mesin akuisisi klien B2B yang paling efisien untuk bisnismu.",
    content: `
      <h2>Salah Kaprah tentang Company Profile Website</h2>
      <p>
        Banyak pemilik bisnis membuat <strong>company profile website</strong> hanya karena "terlihat profesional" atau karena diminta klien besar saat tender. Setelah jadi, website itu terparkir dan tidak disentuh selama bertahun-tahun. Tidak ada update, tidak ada traffic, tidak ada konversi. Tidak heran kalau banyak yang bilang company profile itu pemborosan.
      </p>
      <p>
        Masalahnya bukan pada konsep company profile-nya — tapi pada cara membuatnya. Company profile yang dirancang dengan strategi yang benar adalah salah satu aset B2B paling kuat yang bisa dimiliki sebuah bisnis.
      </p>

      <h2>Apa Bedanya Company Profile yang Bekerja vs yang Hanya Pajangan?</h2>
      <p>
        Company profile yang "pajangan" biasanya punya ciri-ciri ini:
      </p>
      <ul>
        <li>Konten generik: "Kami adalah perusahaan terkemuka yang berdedikasi..."</li>
        <li>Tidak ada bukti nyata: portofolio kosong atau testimoni tanpa detail</li>
        <li>Tidak teroptimasi SEO: tidak muncul di Google sama sekali</li>
        <li>Tidak ada CTA yang jelas: pengunjung bingung harus melakukan apa</li>
        <li>Loading lambat dan tidak mobile-friendly</li>
      </ul>
      <p>
        Sebaliknya, company profile yang bekerja sebagai mesin bisnis memiliki:
      </p>
      <ul>
        <li>Positioning yang tajam: jelas melayani siapa dan menyelesaikan masalah apa</li>
        <li>Portofolio dengan hasil terukur, bukan sekadar foto proyek</li>
        <li>Halaman layanan yang dioptimasi per kata kunci</li>
        <li>Form atau CTA yang mendorong calon klien untuk menghubungi</li>
        <li>Blog yang membangun otoritas di industri</li>
      </ul>

      <h2>Siapa yang Paling Butuh Company Profile Website?</h2>
      <p>
        Hampir semua bisnis B2B mendapat manfaat besar dari company profile yang kuat, tapi beberapa sektor ini paling terasa dampaknya:
      </p>
      <ul>
        <li><strong>Kontraktor dan jasa konstruksi</strong> — klien besar wajib melihat rekam jejak sebelum kontrak</li>
        <li><strong>Konsultan dan agensi</strong> — kredibilitas adalah produk utamanya</li>
        <li><strong>Manufaktur dan supplier</strong> — buyer internasional selalu cek website sebelum deal</li>
        <li><strong>Jasa profesional</strong> (hukum, keuangan, kesehatan) — kepercayaan dibangun dari kesan pertama online</li>
      </ul>

      <h2>Elemen Company Profile Website yang Mengkonversi Klien B2B</h2>

      <h3>Halaman "Tentang Kami" yang Jujur dan Spesifik</h3>
      <p>
        Jangan hanya tuliskan sejarah perusahaan. Ceritakan mengapa bisnis ini ada, masalah apa yang dipecahkan, dan apa yang membuat tim kamu berbeda. Sertakan foto tim nyata — bukan foto stok — untuk membangun koneksi personal.
      </p>

      <h3>Portofolio dengan Angka yang Berbicara</h3>
      <p>
        "Kami mengerjakan proyek renovasi kantor seluas 2.000 m² untuk PT XYZ dalam 45 hari, selesai tepat waktu dan 8% di bawah anggaran." Itu jauh lebih meyakinkan daripada hanya foto gedung yang sudah jadi.
      </p>

      <h3>Halaman Layanan yang Terpisah dan Teroptimasi</h3>
      <p>
        Jangan tumpuk semua layanan di satu halaman. Buat halaman terpisah per layanan sehingga bisa dioptimasi untuk kata kunci spesifik dan memberikan informasi yang lebih detail kepada calon klien yang sedang mempertimbangkan layanan tersebut.
      </p>

      <blockquote>
        Klien B2B tidak membeli impulsif. Mereka butuh keyakinan. Website kamu harus bisa membangun keyakinan itu bahkan sebelum mereka berbicara dengan salesmu.
      </blockquote>

      <h2>Berapa Lama Company Profile Website Mulai Menghasilkan?</h2>
      <p>
        Untuk traffic organik dari SEO, butuh 3–6 bulan untuk mulai terasa dampaknya. Tapi untuk konversi langsung — misalnya calon klien yang menemukan website kamu lewat referral atau presentasi — dampaknya bisa dirasakan sejak hari pertama website live. Banyak bisnis melaporkan mendapat inquiry pertama dalam minggu pertama setelah website mereka naik ke Google.
      </p>

      <h2>Kesimpulan</h2>
      <p>
        Company profile website bukan gengsi dan bukan formalitas. Jika dirancang dengan strategi yang tepat — positioning yang jelas, portofolio yang membuktikan, dan SEO yang teroptimasi — ia bisa menjadi sales tool paling powerful yang bekerja 24 jam tanpa biaya tambahan. Pertanyaannya bukan apakah kamu perlu company profile website, tapi apakah company profile yang kamu punya sekarang sudah bekerja cukup keras untukmu.
      </p>
    `,
    coverImage:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80",
    ogImage:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    author: "BuildWebsite Team",
    category: "Company Profile",
    focusKeyword: "company profile website",
    canonicalUrl:
      "https://domain.com/blog/company-profile-website-investasi-atau-gengsi",
    published: true,
    featured: false,
    publishedAt: new Date(),
    metaTitle: "Company Profile Website: Investasi atau Gengsi? (2025)",
    metaDesc:
      "Company profile website bukan sekadar formalitas. Pelajari cara merancangnya agar jadi mesin akuisisi klien B2B yang bekerja 24 jam untuk bisnismu.",
    tags: ["company profile", "website bisnis", "B2B", "digital marketing"],
  },

  // ─────────────────────────────────────────────
  // ARTIKEL 3
  // ─────────────────────────────────────────────
  {
    title: "Cara Kerja SEO untuk Bisnis Lokal Indonesia: Panduan Praktis 2025",
    slug: "cara-kerja-seo-bisnis-lokal-indonesia",
    excerpt:
      "SEO bisnis lokal Indonesia berbeda dari SEO umum. Pelajari strategi yang tepat agar bisnis kamu muncul di halaman pertama Google saat calon pelanggan mencari di kotamu.",
    content: `
      <h2>Apa Itu SEO Lokal dan Kenapa Berbeda?</h2>
      <p>
        <strong>SEO bisnis lokal Indonesia</strong> adalah praktik mengoptimasi kehadiran online bisnismu agar muncul di hasil pencarian yang relevan secara geografis. Ketika seseorang mengetik "bengkel mobil Bekasi" atau "klinik gigi Denpasar", Google menampilkan hasil yang dipersonalisasi berdasarkan lokasi pengguna — dan bisnis dengan optimasi lokal terbaiklah yang menang.
      </p>
      <p>
        Perbedaan utamanya dengan SEO umum: kamu tidak perlu bersaing dengan seluruh internet. Kamu hanya perlu mengalahkan kompetitor di kota atau area yang sama. Ini justru peluang besar bagi bisnis kecil dan menengah yang tidak punya anggaran marketing raksasa.
      </p>

      <h2>3 Pilar Utama SEO Lokal yang Harus Dikuasai</h2>

      <h3>1. Google Business Profile (Dulu Google My Business)</h3>
      <p>
        Ini adalah fondasi SEO lokal kamu. Google Business Profile (GBP) adalah profil bisnis yang muncul di Google Maps dan panel kanan hasil pencarian. Bisnis dengan GBP yang teroptimasi mendapat 7x lebih banyak klik daripada yang tidak punya profil.
      </p>
      <p>
        Yang perlu dilengkapi di GBP:
      </p>
      <ul>
        <li>Nama bisnis, alamat, dan nomor telepon yang konsisten (NAP)</li>
        <li>Kategori bisnis yang tepat dan spesifik</li>
        <li>Foto berkualitas tinggi: eksterior, interior, produk, tim</li>
        <li>Jam operasional yang selalu diupdate, termasuk hari libur</li>
        <li>Deskripsi bisnis yang mengandung keyword lokal</li>
        <li>Respons aktif terhadap semua review pelanggan</li>
      </ul>

      <h3>2. Optimasi On-Page dengan Keyword Lokal</h3>
      <p>
        Website kamu harus secara eksplisit menyebutkan lokasi yang kamu layani. Bukan hanya di kontak, tapi juga di:
      </p>
      <ul>
        <li>Tag judul halaman (title tag) — contoh: "Jasa Catering Pernikahan di Surabaya | NamaBisnis"</li>
        <li>Meta description dengan nama kota</li>
        <li>H1 dan H2 di halaman utama</li>
        <li>Konten paragraf yang menyebut area layanan secara natural</li>
        <li>URL yang mengandung nama kota jika relevan</li>
      </ul>
      <p>
        Jika kamu melayani beberapa kota, buat halaman terpisah untuk masing-masing lokasi. Satu halaman "Layanan Kami" yang mencantumkan 10 kota sekaligus jauh kurang efektif dibanding 10 halaman yang masing-masing fokus ke satu kota.
      </p>

      <h3>3. Membangun Ulasan dan Reputasi Online</h3>
      <p>
        Google menggunakan jumlah dan kualitas review sebagai sinyal peringkat lokal yang kuat. Bisnis dengan 50+ review bintang 4–5 secara konsisten mengalahkan kompetitor dengan review lebih sedikit, meski kompetitor tersebut punya website yang lebih bagus.
      </p>
      <p>
        Strategi mendapat review secara etis:
      </p>
      <ul>
        <li>Kirim link Google Review langsung ke WhatsApp pelanggan setelah transaksi selesai</li>
        <li>Pasang QR code di struk atau kartu nama yang mengarah ke halaman review</li>
        <li>Balas setiap review — positif maupun negatif — dengan profesional</li>
        <li>Jangan pernah beli review palsu: Google semakin pintar mendeteksi ini</li>
      </ul>

      <h2>Keyword Lokal: Cara Menemukannya untuk Bisnismu</h2>
      <p>
        Keyword lokal yang paling berharga biasanya mengikuti pola: <em>[layanan/produk] + [kota/area]</em>. Untuk menemukan keyword yang tepat, gunakan:
      </p>
      <ul>
        <li><strong>Google Autocomplete</strong> — ketik layananmu di Google dan lihat saran yang muncul</li>
        <li><strong>Google Search Console</strong> — lihat kata kunci yang sudah membawa traffic ke websitemu</li>
        <li><strong>Google Keyword Planner</strong> — gratis dengan akun Google Ads, tampilkan volume pencarian per kota</li>
        <li><strong>Ubersuggest atau Ahrefs</strong> — untuk analisis lebih mendalam termasuk tingkat kesulitan keyword</li>
      </ul>

      <blockquote>
        SEO lokal bukan tentang menjadi terkenal di seluruh Indonesia. Cukup jadi yang terbaik di kotamu — dan itu sudah lebih dari cukup untuk bisnis yang sehat.
      </blockquote>

      <h2>Berapa Lama SEO Lokal Mulai Terasa Hasilnya?</h2>
      <p>
        Untuk Google Maps dan GBP: 4–8 minggu jika profil dioptimasi dengan benar dan aktif diperbarui. Untuk peringkat organik di website: 3–6 bulan tergantung tingkat persaingan di kotamu. Kota kecil dan niche spesifik biasanya bisa lebih cepat.
      </p>

      <h2>Kesimpulan</h2>
      <p>
        SEO bisnis lokal Indonesia adalah salah satu investasi marketing dengan ROI terbaik untuk bisnis yang melayani area tertentu. Mulailah dengan mengoptimasi Google Business Profile, pastikan website menyebutkan lokasi secara eksplisit, dan bangun reputasi melalui review pelanggan yang konsisten. Hasilnya tidak instan, tapi begitu mesin ini berjalan, traffic organik gratis akan terus mengalir tanpa biaya per klik.
      </p>
    `,
    coverImage:
      "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=1400&q=80",
    ogImage:
      "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=1200&q=80",
    author: "BuildWebsite Team",
    category: "SEO",
    focusKeyword: "SEO bisnis lokal Indonesia",
    canonicalUrl:
      "https://domain.com/blog/cara-kerja-seo-bisnis-lokal-indonesia",
    published: true,
    featured: false,
    publishedAt: new Date(),
    metaTitle: "Cara Kerja SEO Bisnis Lokal Indonesia: Panduan 2025",
    metaDesc:
      "Pelajari 3 pilar SEO bisnis lokal Indonesia agar muncul di halaman pertama Google. Strategi praktis untuk UMKM dan bisnis berbasis lokasi.",
    tags: ["SEO", "SEO lokal", "Google Maps", "bisnis lokal", "UMKM"],
  },

  // ─────────────────────────────────────────────
  // ARTIKEL 4
  // ─────────────────────────────────────────────
  {
    title: "Landing Page vs Website: Kapan Harus Pakai yang Mana?",
    slug: "perbedaan-landing-page-vs-website-bisnis",
    excerpt:
      "Perbedaan landing page dan website sering bikin bingung pemilik bisnis. Panduan ini menjelaskan kapan kamu butuh masing-masing, dan bagaimana keduanya bisa bekerja bersama.",
    content: `
      <h2>Dua Aset Digital yang Sering Disamakan tapi Sangat Berbeda</h2>
      <p>
        Ketika klien datang dan bilang "aku mau bikin website", sering kali yang mereka maksud sebenarnya adalah landing page — atau sebaliknya. Kebingungan ini wajar, tapi bisa berujung pada investasi yang tidak tepat sasaran. Memahami <strong>perbedaan landing page dan website</strong> secara praktis akan membantu kamu mengalokasikan anggaran digital dengan lebih cerdas.
      </p>

      <h2>Apa Itu Website?</h2>
      <p>
        Website adalah ekosistem digital yang lengkap. Ia terdiri dari banyak halaman yang saling terhubung: beranda, tentang kami, layanan, portofolio, blog, kontak, dan seterusnya. Tujuannya beragam: membangun brand, mengedukasi pengunjung, mendatangkan traffic SEO, dan melayani berbagai segmen audiens sekaligus.
      </p>
      <p>
        Website cocok untuk:
      </p>
      <ul>
        <li>Bisnis yang punya banyak layanan atau produk berbeda</li>
        <li>Perusahaan yang membutuhkan kredibilitas jangka panjang (B2B, profesional)</li>
        <li>Bisnis yang ingin membangun traffic organik dari SEO konten</li>
        <li>Toko online dengan katalog produk yang luas</li>
      </ul>

      <h2>Apa Itu Landing Page?</h2>
      <p>
        Landing page adalah halaman tunggal yang dirancang untuk satu tujuan konversi saja. Tidak ada menu navigasi yang mengalihkan perhatian, tidak ada link ke halaman lain — hanya satu pesan dan satu ajakan bertindak. Pengunjung mendarat, membaca, dan memutuskan: ya atau tidak.
      </p>
      <p>
        Landing page cocok untuk:
      </p>
      <ul>
        <li>Kampanye iklan berbayar (Google Ads, Meta Ads)</li>
        <li>Peluncuran satu produk atau layanan spesifik</li>
        <li>Mengumpulkan leads dengan penawaran tertentu (free consultation, ebook gratis)</li>
        <li>Event atau promo terbatas waktu</li>
        <li>A/B testing pesan marketing</li>
      </ul>

      <h2>Perbandingan Langsung: Website vs Landing Page</h2>
      <p>
        Berikut perbedaan kunci keduanya dalam konteks bisnis:
      </p>
      <ul>
        <li><strong>Tujuan:</strong> Website = membangun brand & edukasi. Landing page = konversi spesifik.</li>
        <li><strong>Navigasi:</strong> Website = menu lengkap. Landing page = tidak ada menu (atau minimal).</li>
        <li><strong>Panjang:</strong> Website = banyak halaman. Landing page = satu halaman.</li>
        <li><strong>SEO:</strong> Website = kuat untuk jangka panjang. Landing page = terbatas, lebih ke paid traffic.</li>
        <li><strong>Waktu buat:</strong> Website = minggu hingga bulan. Landing page = hari hingga minggu.</li>
        <li><strong>Biaya:</strong> Website = lebih besar. Landing page = lebih terjangkau dan cepat.</li>
      </ul>

      <h2>Kapan Kamu Butuh Keduanya Sekaligus?</h2>
      <p>
        Jawabannya: hampir selalu. Strategi digital yang paling efektif biasanya menggunakan website sebagai "rumah utama" dan landing page sebagai "pintu masuk" untuk setiap kampanye spesifik.
      </p>
      <p>
        Contoh skenario nyata:
      </p>
      <ol>
        <li>Kamu punya website company profile untuk membangun kredibilitas dan SEO jangka panjang.</li>
        <li>Kamu jalankan Google Ads untuk promo Lebaran — iklan mengarah ke landing page khusus, bukan ke beranda website.</li>
        <li>Landing page fokus pada satu penawaran: "Diskon 30% jika booking sebelum 10 April."</li>
        <li>Setelah promo selesai, landing page dinonaktifkan. Website tetap berjalan seperti biasa.</li>
      </ol>

      <blockquote>
        Website membangun kepercayaan dari waktu ke waktu. Landing page mengonversi kepercayaan itu menjadi tindakan nyata pada momen yang tepat.
      </blockquote>

      <h2>Mana yang Harus Dibuat Lebih Dulu?</h2>
      <p>
        Jika bisnismu baru mulai dan punya anggaran terbatas, prioritaskan landing page terlebih dahulu — terutama jika kamu sudah siap beriklan. Landing page lebih cepat dibuat, lebih mudah diukur, dan langsung menghasilkan konversi.
      </p>
      <p>
        Setelah cashflow mulai stabil dan kamu ingin membangun kehadiran organik jangka panjang, barulah invest di website yang lebih lengkap. Keduanya bukan kompetitor — mereka adalah tim yang saling melengkapi.
      </p>

      <h2>Kesimpulan</h2>
      <p>
        Perbedaan landing page dan website bukan soal mana yang lebih baik, tapi soal mana yang tepat untuk tujuanmu saat ini. Pahami kebutuhan bisnis, strategi marketing, dan anggaran yang tersedia — lalu pilih alat yang paling sesuai. Terbaik adalah menggunakan keduanya secara strategis sebagai ekosistem digital yang saling mendukung.
      </p>
    `,
    coverImage:
      "https://images.unsplash.com/photo-1553484771-371a605b060b?auto=format&fit=crop&w=1400&q=80",
    ogImage:
      "https://images.unsplash.com/photo-1553484771-371a605b060b?auto=format&fit=crop&w=1200&q=80",
    author: "BuildWebsite Team",
    category: "Landing Page",
    focusKeyword: "perbedaan landing page dan website",
    canonicalUrl:
      "https://domain.com/blog/perbedaan-landing-page-vs-website-bisnis",
    published: true,
    featured: false,
    publishedAt: new Date(),
    metaTitle: "Landing Page vs Website: Kapan Pakai yang Mana? (2025)",
    metaDesc:
      "Bingung pilih landing page atau website? Pelajari perbedaan landing page dan website serta kapan harus menggunakan masing-masing untuk bisnis kamu.",
    tags: ["landing page", "website bisnis", "digital marketing", "konversi"],
  },

  // ─────────────────────────────────────────────
  // ARTIKEL 5
  // ─────────────────────────────────────────────
  {
    title: "7 Pertanyaan Wajib Sebelum Hire Jasa Pembuatan Website",
    slug: "pertanyaan-sebelum-hire-jasa-pembuatan-website",
    excerpt:
      "Memilih jasa pembuatan website yang tepat bisa jadi perbedaan antara investasi terbaik dan kerugian besar. Ini 7 pertanyaan yang harus kamu ajukan sebelum tanda tangan kontrak.",
    content: `
      <h2>Kenapa Memilih Jasa Pembuatan Website Itu Rawan Salah?</h2>
      <p>
        Setiap tahun, ribuan bisnis di Indonesia kehilangan uang karena memilih <strong>jasa pembuatan website</strong> yang salah. Websitenya jadi, tapi lambat. Atau selesai terlambat berbulan-bulan. Atau yang paling menyesakkan: agency-nya hilang setelah pembayaran lunas, meninggalkan website yang tidak bisa dikelola sendiri.
      </p>
      <p>
        Masalah ini hampir selalu berakar dari kurangnya due diligence sebelum hire. Dengan mengajukan pertanyaan yang tepat di awal, kamu bisa menghindari 90% potensi masalah tersebut.
      </p>

      <h2>7 Pertanyaan Wajib yang Harus Kamu Ajukan</h2>

      <h3>1. "Bisa Tunjukkan 3 Website yang Sudah Live dan Bisa Saya Cek Sendiri?"</h3>
      <p>
        Portofolio di presentasi bisa dipoles sedemikian rupa. Yang tidak bisa dipalsukan adalah website live yang bisa kamu buka, cek kecepatan loadingnya, uji di mobile, dan bahkan hubungi klien aslinya. Minta minimal 3 portofolio yang relevan dengan bisnismu dan luangkan waktu untuk benar-benar mengeceknya.
      </p>

      <h3>2. "Siapa yang Mengerjakan Proyek Ini dan Apa Background-nya?"</h3>
      <p>
        Banyak agency kecil menerima proyek lalu subkontrak ke freelancer yang belum tentu punya pengalaman relevan. Tanyakan secara eksplisit: apakah dikerjakan in-house? Siapa desainer dan developernya? Sudah berapa lama mereka berpengalaman di bidang ini? Kamu berhak tahu siapa yang membangun aset digitalmu.
      </p>

      <h3>3. "Platform Apa yang Dipakai dan Apakah Saya Bisa Kelola Sendiri?"</h3>
      <p>
        Tanyakan teknologi yang digunakan: WordPress, Webflow, custom coding, atau lainnya. Yang paling penting: setelah website selesai, apakah kamu bisa update konten sendiri tanpa perlu bayar mereka setiap kali ada perubahan kecil? Jika jawabannya tidak, pastikan ada kontrak maintenance yang jelas harganya.
      </p>

      <h3>4. "Apa yang Termasuk dan Tidak Termasuk dalam Harga?"</h3>
      <p>
        Banyak penawaran murah di awal yang berakhir mahal karena banyak item yang tidak termasuk: hosting, domain, SSL certificate, revisi setelah approval, halaman tambahan, integrasi WhatsApp, SEO on-page, dan lain-lain. Minta breakdown biaya yang sangat detail sebelum tanda tangan — jangan asumsi semua sudah termasuk.
      </p>

      <h3>5. "Berapa Lama Proses Pengerjaannya dan Bagaimana Jika Molor?"</h3>
      <p>
        Timeline yang tidak realistis adalah red flag besar. Website yang kompleks tidak bisa selesai dalam 3 hari. Tapi yang lebih penting: tanyakan apa yang terjadi jika proyek molor — apakah ada penalti atau kompensasi? Pastikan timeline, milestone, dan klausul keterlambatan tercantum jelas di kontrak.
      </p>

      <h3>6. "Bagaimana Proses Revisi dan Berapa Kali Saya Bisa Revisi?"</h3>
      <p>
        Revisi tanpa batas bisa membuat proyek tidak pernah selesai — dan biasanya justru merugikan klien karena agency jadi tidak prioritaskan proyekmu. Tapi revisi yang terlalu dibatasi juga berisiko jika hasil akhirnya tidak sesuai ekspektasi. Cari kesepakatan tengah: 2–3 putaran revisi per milestone adalah standar yang wajar.
      </p>

      <h3>7. "Apa yang Terjadi dengan File dan Akses Setelah Proyek Selesai?"</h3>
      <p>
        Ini pertanyaan yang paling sering dilupakan dan paling sering menimbulkan masalah. Pastikan kamu mendapatkan akses penuh ke: hosting, domain, repository kode (jika custom), akun Google Analytics, dan Google Search Console. Beberapa agency "menahan" aset ini sebagai cara untuk memastikan klien terus bayar mereka.
      </p>

      <blockquote>
        Agency yang baik tidak akan keberatan menjawab semua pertanyaan ini dengan transparan. Jika ada yang defensif atau menghindar, itu sinyal yang perlu kamu perhatikan.
      </blockquote>

      <h2>Tanda-Tanda Red Flag yang Harus Diwaspadai</h2>
      <ul>
        <li>Tidak bisa menunjukkan portofolio live yang bisa dicek</li>
        <li>Harga jauh di bawah pasaran tanpa penjelasan yang masuk akal</li>
        <li>Tidak ada kontrak tertulis atau kontrak yang sangat minim</li>
        <li>Meminta pembayaran full di awal sebelum ada pekerjaan apapun</li>
        <li>Komunikasi yang lambat atau tidak responsif saat fase penawaran</li>
      </ul>

      <h2>Kesimpulan</h2>
      <p>
        Memilih jasa pembuatan website yang tepat membutuhkan due diligence yang serius. Tujuh pertanyaan di atas bukan untuk menyulitkan agency yang kamu ajak bicara — tapi untuk memastikan kamu membuat keputusan yang tepat berdasarkan informasi yang lengkap. Agency yang profesional akan menyambut pertanyaan-pertanyaan ini sebagai bukti bahwa kamu adalah klien yang serius.
      </p>
    `,
    coverImage:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80",
    ogImage:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    author: "BuildWebsite Team",
    category: "Tips & Panduan",
    focusKeyword: "jasa pembuatan website",
    canonicalUrl:
      "https://domain.com/blog/pertanyaan-sebelum-hire-jasa-pembuatan-website",
    published: true,
    featured: false,
    publishedAt: new Date(),
    metaTitle: "7 Pertanyaan Wajib Sebelum Hire Jasa Pembuatan Website",
    metaDesc:
      "Jangan tanda tangan kontrak dulu! Ajukan 7 pertanyaan penting ini sebelum memilih jasa pembuatan website agar tidak menyesal dan rugi di kemudian hari.",
    tags: ["jasa pembuatan website", "tips bisnis", "website bisnis", "digital"],
  },

  // ─────────────────────────────────────────────
  // ARTIKEL 6
  // ─────────────────────────────────────────────
  {
    title: "Cara Meningkatkan Konversi Website Tanpa Ganti Desain",
    slug: "cara-meningkatkan-konversi-website-tanpa-redesain",
    excerpt:
      "Meningkatkan konversi website tidak selalu butuh redesain mahal. Pelajari perubahan kecil yang bisa memberikan dampak besar pada jumlah leads dan penjualan bisnis kamu.",
    content: `
      <h2>Masalahnya Bukan Desain — Tapi Ini yang Sering Disalahkan</h2>
      <p>
        Saat website tidak menghasilkan leads, reaksi pertama banyak pemilik bisnis adalah: "Desainnya kurang bagus, harus ganti." Lalu mereka investasi jutaan rupiah untuk redesain, dan hasilnya... sama saja. Karena masalahnya bukan di tampilannya.
      </p>
      <p>
        <strong>Meningkatkan konversi website</strong> jauh lebih sering soal pesan, posisi, dan psikologi daripada soal palet warna atau font baru. Dan kabar baiknya, banyak perubahan ini bisa dilakukan tanpa menyentuh desain sama sekali.
      </p>

      <h2>Audit Dulu: Di Mana Pengunjung Meninggalkan Website Kamu?</h2>
      <p>
        Sebelum mengubah apapun, kamu perlu data. Gunakan tools berikut untuk memahami perilaku pengunjung:
      </p>
      <ul>
        <li><strong>Google Analytics 4</strong> — lihat bounce rate per halaman dan funnel konversi</li>
        <li><strong>Microsoft Clarity</strong> (gratis) — rekaman sesi pengunjung dan heatmap klik</li>
        <li><strong>Hotjar</strong> — scroll map untuk melihat seberapa jauh pengunjung scroll sebelum pergi</li>
      </ul>
      <p>
        Dari data ini, kamu akan tahu halaman mana yang paling banyak "membuang" pengunjung — dan di situlah fokus optimasimu harus dimulai.
      </p>

      <h2>8 Perubahan Kecil yang Berdampak Besar pada Konversi</h2>

      <h3>1. Perbaiki Headline di Atas Fold</h3>
      <p>
        Headline adalah hal pertama yang dibaca pengunjung. Jika headline kamu masih berbunyi nama perusahaan atau tagline yang tidak bermakna, ganti segera. Tulis headline yang menjawab satu pertanyaan: "Apa manfaat langsung yang didapat pengunjung jika mereka memilih kamu?"
      </p>

      <h3>2. Pindahkan CTA ke Posisi yang Lebih Terlihat</h3>
      <p>
        Banyak website menyembunyikan tombol CTA di bawah fold atau di pojok halaman yang jarang terlihat. Coba pindahkan tombol utama ke bagian atas halaman, gunakan warna kontras yang mencolok, dan pastikan teksnya action-oriented: "Konsultasi Gratis" lebih baik dari "Hubungi Kami".
      </p>

      <h3>3. Tambahkan Nomor WhatsApp yang Langsung Bisa Diklik</h3>
      <p>
        Di Indonesia, WhatsApp adalah channel komunikasi bisnis yang paling efektif. Pasang tombol WhatsApp mengambang di sudut kanan bawah halaman — ini saja bisa meningkatkan kontak masuk 20–40% tanpa perubahan desain apapun.
      </p>

      <h3>4. Tampilkan Testimoni di Tempat yang Tepat</h3>
      <p>
        Testimoni yang diletakkan tepat sebelum CTA bisa meningkatkan konversi hingga 34%. Jangan hanya taruh semua testimoni di halaman "Tentang Kami" yang jarang dikunjungi. Sebar di beranda, di halaman layanan, dan tepat di atas tombol kontak.
      </p>

      <h3>5. Sederhanakan Form Kontak</h3>
      <p>
        Setiap field tambahan di form menurunkan kemungkinan pengisian. Coba hapus semua field yang tidak benar-benar kamu butuhkan di awal. Nama dan WhatsApp saja sudah cukup untuk follow up pertama — detail lainnya bisa dikumpulkan saat percakapan.
      </p>

      <h3>6. Tambahkan Elemen Urgensi yang Nyata</h3>
      <p>
        Pengunjung yang tidak punya alasan untuk bertindak sekarang akan menunda — dan akhirnya lupa. Urgensi yang autentik bisa berupa: slot konsultasi terbatas minggu ini, promo yang berakhir di tanggal tertentu, atau stok produk yang memang terbatas. Jangan buat urgensi palsu — ini merusak kepercayaan.
      </p>

      <h3>7. Optimalkan Kecepatan Loading</h3>
      <p>
        Google PageSpeed dan GTmetrix bisa mengidentifikasi masalah kecepatan spesifik. Solusi paling umum: kompres gambar sebelum upload, gunakan format WebP, aktifkan caching browser, dan minify file CSS/JS. Kecepatan bukan hanya soal UX — Google juga menggunakannya sebagai faktor peringkat.
      </p>

      <h3>8. Pastikan Tampilan Mobile Sempurna</h3>
      <p>
        Buka website kamu di smartphone dan coba melakukan semua tindakan yang kamu harapkan dari pengunjung: baca konten, klik CTA, isi form. Jika ada yang sulit atau tidak nyaman dilakukan di mobile, itu adalah kebocoran konversi yang harus segera ditambal.
      </p>

      <blockquote>
        Optimasi konversi adalah tentang menghilangkan hambatan, bukan menambah hiasan. Semakin sedikit gesekan yang dirasakan pengunjung, semakin besar kemungkinan mereka bertindak.
      </blockquote>

      <h2>Kesimpulan</h2>
      <p>
        Meningkatkan konversi website tidak harus mahal atau dramatis. Dengan audit data yang tepat dan perubahan kecil yang strategis, bisnis bisa melihat peningkatan signifikan dalam hitungan minggu — tanpa ganti desain, tanpa rebuild dari nol. Mulailah dari satu perubahan hari ini, ukur hasilnya, dan iterasi secara konsisten.
      </p>
    `,
    coverImage:
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1400&q=80",
    ogImage:
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80",
    author: "BuildWebsite Team",
    category: "Konversi & CRO",
    focusKeyword: "meningkatkan konversi website",
    canonicalUrl:
      "https://domain.com/blog/cara-meningkatkan-konversi-website-tanpa-redesain",
    published: true,
    featured: false,
    publishedAt: new Date(),
    metaTitle: "Cara Meningkatkan Konversi Website Tanpa Redesain",
    metaDesc:
      "Tingkatkan konversi website tanpa redesain mahal. Temukan 8 perubahan kecil yang berdampak besar pada leads dan penjualan bisnis kamu.",
    tags: ["konversi", "CRO", "website bisnis", "optimasi", "digital marketing"],
  },

  // ─────────────────────────────────────────────
  // ARTIKEL 7
  // ─────────────────────────────────────────────
  {
    title: "Google Ads vs SEO untuk UMKM: Mana yang Lebih Worth It?",
    slug: "google-ads-vs-seo-untuk-umkm",
    excerpt:
      "Google Ads vs SEO untuk UMKM — pertanyaan klasik yang tidak punya jawaban satu ukuran. Pelajari kelebihan, kelemahan, dan kapan harus memilih salah satu atau keduanya.",
    content: `
      <h2>Pertanyaan yang Selalu Muncul di Setiap Diskusi Digital Marketing</h2>
      <p>
        "Lebih baik mana: iklan Google atau SEO?" Ini adalah pertanyaan yang paling sering diajukan oleh pemilik UMKM yang baru mulai mengenal digital marketing. Dan jawaban yang jujur adalah: <em>tergantung situasimu</em>. Tapi bukan berarti jawabannya tidak bisa diperjelas.
      </p>
      <p>
        Memahami perbedaan mendasar antara <strong>Google Ads vs SEO untuk UMKM</strong> akan membantumu membuat keputusan yang lebih cerdas tentang di mana harus mengalokasikan waktu dan uangmu.
      </p>

      <h2>Cara Kerja Google Ads (Search)</h2>
      <p>
        Google Ads adalah sistem Pay-Per-Click (PPC): kamu membayar setiap kali seseorang mengklik iklanmu. Iklan muncul di posisi teratas atau bawah halaman pencarian Google, ditandai dengan label "Iklan" atau "Sponsored".
      </p>
      <p>
        Kelebihan Google Ads:
      </p>
      <ul>
        <li><strong>Instan</strong> — iklan bisa live dan mendatangkan traffic dalam hitungan jam</li>
        <li><strong>Terukur</strong> — kamu tahu persis berapa yang dikeluarkan dan berapa yang masuk</li>
        <li><strong>Kontrol penuh</strong> — bisa ditarget berdasarkan keyword, lokasi, waktu, perangkat, dan demografi</li>
        <li><strong>Fleksibel</strong> — bisa dinyalakan dan dimatikan kapan saja sesuai budget</li>
      </ul>
      <p>
        Kekurangan Google Ads:
      </p>
      <ul>
        <li>Traffic berhenti total begitu budget habis atau iklan dimatikan</li>
        <li>Biaya per klik (CPC) bisa sangat mahal di industri kompetitif</li>
        <li>Membutuhkan keahlian untuk optimasi agar tidak buang anggaran</li>
        <li>Pengguna semakin terbiasa mengabaikan hasil iklan dan scroll ke organik</li>
      </ul>

      <h2>Cara Kerja SEO</h2>
      <p>
        SEO adalah proses jangka panjang untuk mendapatkan peringkat tinggi di hasil pencarian organik (non-iklan). Tidak ada biaya per klik — tapi butuh waktu, konsistensi, dan keahlian teknis maupun konten.
      </p>
      <p>
        Kelebihan SEO:
      </p>
      <ul>
        <li><strong>Traffic gratis</strong> — tidak ada biaya per klik setelah peringkat tercapai</li>
        <li><strong>Berkelanjutan</strong> — konten yang bagus bisa menghasilkan traffic selama bertahun-tahun</li>
        <li><strong>Kepercayaan lebih tinggi</strong> — pengguna cenderung lebih percaya hasil organik daripada iklan</li>
        <li><strong>Compounding effect</strong> — setiap konten baru menambah aset traffic, bukan menghabiskan budget</li>
      </ul>
      <p>
        Kekurangan SEO:
      </p>
      <ul>
        <li>Butuh 3–6 bulan untuk mulai terasa hasil yang signifikan</li>
        <li>Algoritma Google berubah — peringkat bisa naik turun</li>
        <li>Membutuhkan investasi konten dan teknis yang konsisten</li>
        <li>Kompetisi di keyword populer bisa sangat ketat</li>
      </ul>

      <h2>Kapan UMKM Harus Pilih Google Ads?</h2>
      <ul>
        <li>Bisnis baru yang butuh traffic <em>sekarang</em> untuk generate cashflow</li>
        <li>Ada promo atau event terbatas waktu yang tidak bisa menunggu SEO</li>
        <li>Produk atau layanan yang permintaannya sudah tinggi di Google</li>
        <li>Ingin test pasar dengan cepat sebelum investasi jangka panjang</li>
      </ul>

      <h2>Kapan UMKM Harus Pilih SEO?</h2>
      <ul>
        <li>Bisnis sudah punya revenue yang cukup untuk investasi jangka panjang</li>
        <li>Industri dengan CPC tinggi di Google Ads (properti, asuransi, hukum)</li>
        <li>Ingin membangun otoritas dan kepercayaan sebagai pemain utama di industri</li>
        <li>Bisnis yang tidak terlalu bergantung pada musim atau promo tertentu</li>
      </ul>

      <blockquote>
        Google Ads adalah keran air — cepat mengalir, tapi berhenti begitu kamu tutup. SEO adalah sumur — lambat digali, tapi airnya terus tersedia.
      </blockquote>

      <h2>Strategi Ideal: Kombinasi Keduanya</h2>
      <p>
        Bisnis yang paling sukses secara digital biasanya tidak memilih satu atau yang lain. Mereka menggunakan Google Ads untuk mendapat traffic cepat di awal, sambil membangun SEO secara paralel. Begitu SEO mulai menghasilkan traffic organik yang stabil, anggaran iklan bisa dikurangi secara bertahap — tanpa kehilangan aliran leads.
      </p>

      <h2>Kesimpulan</h2>
      <p>
        Tidak ada jawaban universal untuk Google Ads vs SEO untuk UMKM. Yang penting adalah memahami di fase mana bisnis kamu berada, seberapa cepat kamu butuh hasil, dan berapa budget yang tersedia. Jika harus pilih satu untuk memulai: Google Ads untuk bisnis baru yang butuh validasi cepat, SEO untuk bisnis yang sudah berjalan dan ingin tumbuh secara berkelanjutan.
      </p>
    `,
    coverImage:
      "https://images.unsplash.com/photo-1611926653458-09294b3142bf?auto=format&fit=crop&w=1400&q=80",
    ogImage:
      "https://images.unsplash.com/photo-1611926653458-09294b3142bf?auto=format&fit=crop&w=1200&q=80",
    author: "BuildWebsite Team",
    category: "Digital Marketing",
    focusKeyword: "Google Ads vs SEO untuk UMKM",
    canonicalUrl:
      "https://domain.com/blog/google-ads-vs-seo-untuk-umkm",
    published: true,
    featured: false,
    publishedAt: new Date(),
    metaTitle: "Google Ads vs SEO untuk UMKM: Mana yang Worth It?",
    metaDesc:
      "Bingung pilih Google Ads atau SEO untuk UMKM? Pelajari kelebihan, kelemahan, dan strategi ideal untuk bisnis Indonesia di 2025.",
    tags: ["Google Ads", "SEO", "UMKM", "digital marketing", "iklan online"],
  },

  // ─────────────────────────────────────────────
  // ARTIKEL 8
  // ─────────────────────────────────────────────
  {
    title: "7 Alasan Kenapa Website Bisnis Kamu Tidak Menghasilkan Leads",
    slug: "kenapa-website-bisnis-tidak-menghasilkan-leads",
    excerpt:
      "Punya website tapi leads tidak masuk? Kemungkinan besar ada 1 dari 7 masalah ini yang menghambat bisnismu. Temukan dan perbaiki sekarang sebelum makin banyak peluang yang hilang.",
    content: `
      <h2>Website Ada, Tapi Telepon Tidak Berdering</h2>
      <p>
        Ini skenario yang lebih umum dari yang kamu kira: bisnis sudah invest di website, tapi tidak ada yang menghubungi. Traffic ada — mungkin puluhan atau ratusan pengunjung per bulan — tapi tidak ada yang berkonversi menjadi leads atau pelanggan. Jika ini yang kamu alami, selamat datang di masalah yang bisa diselesaikan.
      </p>
      <p>
        <strong>Website bisnis yang tidak menghasilkan leads</strong> hampir selalu disebabkan oleh salah satu atau kombinasi dari masalah berikut. Kenali mana yang berlaku untukmu.
      </p>

      <h2>Alasan 1: Pengunjung yang Datang Bukan Target Pasarmu</h2>
      <p>
        Traffic yang banyak tidak ada artinya jika orangnya salah. Jika websitemu muncul untuk kata kunci yang tidak relevan dengan penawaranmu, atau iklanmu menarget audiens yang terlalu luas, kamu akan mendapat banyak pengunjung yang tidak berniat membeli. Solusi: audit keyword yang membawa traffic di Google Search Console dan pastikan semua yang masuk adalah calon pelanggan potensial.
      </p>

      <h2>Alasan 2: Pesan Utama Tidak Jelas dalam 5 Detik</h2>
      <p>
        Pengunjung baru tidak membaca website — mereka men-scan. Jika dalam 5 detik pertama mereka tidak bisa memahami: apa yang kamu jual, untuk siapa, dan apa bedanya dengan kompetitor, mereka akan pergi. Uji websitemu dengan meminta orang asing melihatnya selama 5 detik, lalu tanyakan mereka mendapat kesan apa. Jawabannya akan mengejutkan.
      </p>

      <h2>Alasan 3: Tidak Ada CTA yang Jelas dan Mendesak</h2>
      <p>
        Website tanpa CTA yang jelas itu seperti toko yang tidak punya kasir. Pengunjung masuk, lihat-lihat, tapi tidak tahu harus ngapain selanjutnya. Pastikan setiap halaman punya satu CTA utama yang jelas, ditempatkan di posisi yang mudah dilihat, dengan teks yang action-oriented dan spesifik.
      </p>

      <h2>Alasan 4: Loading Terlalu Lambat</h2>
      <p>
        Data Google menunjukkan bahwa 53% pengguna mobile meninggalkan website yang membutuhkan lebih dari 3 detik untuk loading. Jika websitemu loading lebih dari 4–5 detik, kamu kehilangan lebih dari setengah pengunjung bahkan sebelum mereka sempat membaca apapun. Cek kecepatan di PageSpeed Insights dan prioritaskan perbaikan yang direkomendasikan.
      </p>

      <h2>Alasan 5: Tidak Ada Bukti Sosial yang Meyakinkan</h2>
      <p>
        Calon pelanggan selalu bertanya dalam hati: "Apakah bisnis ini bisa dipercaya?" Tanpa testimoni nyata, angka yang terverifikasi, atau portofolio yang relevan, kamu meminta mereka untuk percaya pada orang asing — dan itu sulit. Tambahkan social proof yang spesifik dan autentik di setiap halaman strategis websitemu.
      </p>

      <h2>Alasan 6: Tampilan Mobile yang Buruk</h2>
      <p>
        Lebih dari 70% traffic website bisnis di Indonesia berasal dari smartphone. Jika website kamu tidak dioptimasi untuk mobile — teks terlalu kecil, tombol terlalu rapat, form sulit diisi di layar kecil — kamu sedang menolak lebih dari separuh calon pelangganmu. Buka websitemu di berbagai ukuran layar dan perbaiki semua yang tidak nyaman digunakan.
      </p>

      <h2>Alasan 7: Tidak Ada Cara Mudah untuk Menghubungi</h2>
      <p>
        Di Indonesia, calon pelanggan ingin menghubungi bisnis dengan cara yang mudah dan familiar — dan itu berarti WhatsApp. Jika satu-satunya cara menghubungi kamu adalah formulir email yang responsnya bisa 1–2 hari, banyak yang akan pergi ke kompetitor yang lebih mudah dihubungi. Tambahkan tombol WhatsApp yang langsung bisa diklik, dan pastikan responmu cepat.
      </p>

      <blockquote>
        Website yang tidak menghasilkan leads bukan berarti websitemu gagal — tapi ada hambatan yang belum teridentifikasi antara ketertarikan pengunjung dan tindakan yang kamu harapkan.
      </blockquote>

      <h2>Cara Mengidentifikasi Masalah Spesifik di Website Kamu</h2>
      <ul>
        <li>Pasang Microsoft Clarity (gratis) untuk lihat rekaman sesi pengunjung</li>
        <li>Aktifkan goal tracking di Google Analytics 4 untuk lacak konversi</li>
        <li>Gunakan Google Search Console untuk audit keyword yang mendatangkan traffic</li>
        <li>Minta 3–5 orang (bukan keluarga dekat) untuk mencoba menggunakan websitemu dan catat di mana mereka bingung</li>
      </ul>

      <h2>Kesimpulan</h2>
      <p>
        Website bisnis yang tidak menghasilkan leads adalah masalah yang bisa diperbaiki — bukan dengan membuang website dan mulai dari nol, tapi dengan mengidentifikasi hambatan spesifik dan memperbaikinya satu per satu. Mulailah dari yang paling mudah: tambahkan tombol WhatsApp, perbaiki CTA, dan pastikan loading tidak lebih dari 3 detik. Tiga perubahan sederhana ini saja sudah bisa membuat perbedaan signifikan.
      </p>
    `,
    coverImage:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1400&q=80",
    ogImage:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
    author: "BuildWebsite Team",
    category: "Konversi & CRO",
    focusKeyword: "website bisnis tidak menghasilkan leads",
    canonicalUrl:
      "https://domain.com/blog/kenapa-website-bisnis-tidak-menghasilkan-leads",
    published: true,
    featured: false,
    publishedAt: new Date(),
    metaTitle: "7 Alasan Website Bisnis Tidak Menghasilkan Leads",
    metaDesc:
      "Website ada tapi leads tidak masuk? Temukan 7 alasan umum mengapa website bisnis tidak menghasilkan leads dan cara memperbaikinya sekarang.",
    tags: ["leads", "konversi", "website bisnis", "CRO", "digital marketing"],
  },

  // ─────────────────────────────────────────────
  // ARTIKEL 9
  // ─────────────────────────────────────────────
  {
    title: "Panduan Copywriting Website Bisnis yang Menjual (Bukan Sekadar Terlihat Bagus)",
    slug: "panduan-copywriting-website-bisnis-yang-menjual",
    excerpt:
      "Copywriting website bisnis yang buruk bisa membunuh konversi meski desainnya indah. Pelajari framework dan prinsip penulisan yang membuat pengunjung langsung action.",
    content: `
      <h2>Desain Menarik Perhatian, Kata-Kata Menutup Penjualan</h2>
      <p>
        Ada miskonsepsi besar di dunia pembuatan website: bahwa tampilan visual adalah segalanya. Padahal dalam realita bisnis, orang membeli karena apa yang mereka <em>baca</em>, bukan semata apa yang mereka <em>lihat</em>. <strong>Copywriting website bisnis</strong> yang kuat adalah perbedaan antara pengunjung yang pergi dan pengunjung yang menghubungi.
      </p>
      <p>
        Copywriting bukan tentang menulis dengan gaya sastra yang indah. Ini tentang menyusun kata dengan tujuan yang sangat spesifik: membuat pembaca mengambil tindakan yang kamu inginkan.
      </p>

      <h2>Framework PAS: Dasar Copywriting yang Selalu Berhasil</h2>
      <p>
        PAS (Problem → Agitate → Solution) adalah salah satu framework copywriting paling terbukti untuk website bisnis:
      </p>
      <ul>
        <li><strong>Problem</strong> — Identifikasi masalah spesifik yang dialami target pelangganmu. Buat mereka merasa "ini aku banget."</li>
        <li><strong>Agitate</strong> — Perkuat dampak dari masalah itu. Apa yang terjadi jika tidak diselesaikan? Biaya, rasa frustrasi, peluang yang hilang.</li>
        <li><strong>Solution</strong> — Perkenalkan solusimu sebagai jawaban yang sudah ditunggu-tunggu. Jelaskan bagaimana kamu menghilangkan masalah tersebut.</li>
      </ul>
      <p>
        Contoh untuk jasa pembuatan website: <em>Problem</em>: "Bisnis kamu bagus, tapi tidak ada yang tahu karena tidak terlihat online." <em>Agitate</em>: "Setiap hari tanpa website profesional adalah hari calon pelanggan memilih kompetitormu." <em>Solution</em>: "Kami membangun website yang tidak hanya terlihat bagus, tapi dirancang untuk menghasilkan kontak dan penjualan."
      </p>

      <h2>5 Prinsip Copywriting untuk Setiap Halaman Website</h2>

      <h3>1. Tulis untuk Pembaca, Bukan untuk Diri Sendiri</h3>
      <p>
        Kesalahan terbesar copywriting website adalah terlalu banyak bicara tentang perusahaan sendiri. Hitung berapa kali kamu menulis "Kami" vs "Kamu/Anda" di halaman beranda. Jika "kami" lebih banyak, itu masalah. Calon pelanggan tidak peduli tentang sejarah perusahaanmu — mereka peduli tentang masalah mereka sendiri.
      </p>

      <h3>2. Jadikan Manfaat Lebih Menonjol dari Fitur</h3>
      <p>
        Fitur adalah apa yang kamu tawarkan. Manfaat adalah apa yang dirasakan pelanggan. Contoh: "Website responsif mobile-first" adalah fitur. "Pelangganmu bisa menghubungi kamu dengan mudah dari HP mereka, kapanpun" adalah manfaat. Selalu terjemahkan fitur ke dalam konteks kehidupan nyata pelanggan.
      </p>

      <h3>3. Gunakan Bahasa yang Dipakai Pelangganmu</h3>
      <p>
        Baca ulasan produk serupa di Tokopedia, pertanyaan di forum, atau chat WhatsApp dari pelangganmu sendiri. Kata-kata yang mereka gunakan untuk mendeskripsikan masalah mereka adalah kata-kata terbaik untuk dipakai di websitemu — karena mereka akan langsung merasa "ini yang aku cari."
      </p>

      <h3>4. Satu Halaman, Satu Tujuan, Satu CTA Utama</h3>
      <p>
        Setiap halaman website harus punya satu tujuan konversi yang jelas. Halaman landing untuk Google Ads tidak perlu link ke blog. Halaman layanan tidak perlu menu ke semua halaman lain. Fokus pada satu tindakan yang ingin dilakukan pengunjung setelah membaca halaman tersebut.
      </p>

      <h3>5. Spesifisitas Membangun Kepercayaan</h3>
      <p>
        "Lebih dari 100 klien puas" kalah meyakinkan dibanding "127 UMKM di Jabodetabek sudah menggunakan layanan kami sejak 2021." Angka spesifik, nama kota, timeline yang konkret — semua ini membuat klaimmu lebih believable daripada pernyataan samar yang bisa diklaim siapa saja.
      </p>

      <h2>Checklist Copywriting Setiap Halaman Utama</h2>

      <h3>Halaman Beranda</h3>
      <ul>
        <li>Headline: Siapa yang dilayani + masalah yang diselesaikan + differensiasi unik</li>
        <li>Subheadline: Penjelasan singkat cara kerja atau bukti utama</li>
        <li>Social proof: Angka, testimoni singkat, atau logo klien</li>
        <li>CTA: Satu tindakan yang paling diinginkan dari pengunjung baru</li>
      </ul>

      <h3>Halaman Layanan</h3>
      <ul>
        <li>Deskripsikan masalah yang diselesaikan layanan ini (PAS)</li>
        <li>Jelaskan cara kerja layanan dengan bahasa sederhana</li>
        <li>Tampilkan hasil nyata dari klien sebelumnya</li>
        <li>Jawab keberatan umum (FAQ mini)</li>
        <li>CTA dengan tawaran yang meminimalkan risiko (konsultasi gratis, dll)</li>
      </ul>

      <blockquote>
        Copywriting terbaik tidak terasa seperti iklan — ia terasa seperti seseorang yang sangat memahami masalahmu, dan kebetulan punya solusinya.
      </blockquote>

      <h2>Kesimpulan</h2>
      <p>
        Copywriting website bisnis yang menjual bukan bakat — ini keahlian yang bisa dipelajari dan diasah. Mulailah dengan memahami pelangganmu lebih dalam daripada yang kamu kira perlu: apa yang mereka takutkan, apa yang mereka inginkan, dan kata-kata apa yang mereka gunakan. Dari sana, terapkan framework PAS, fokus pada manfaat bukan fitur, dan pastikan setiap halaman punya satu CTA yang jelas. Perubahan ini di konten website kamu bisa memberikan dampak yang lebih besar dari redesain manapun.
      </p>
    `,
    coverImage:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1400&q=80",
    ogImage:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80",
    author: "BuildWebsite Team",
    category: "Konten & Copywriting",
    focusKeyword: "copywriting website bisnis",
    canonicalUrl:
      "https://domain.com/blog/panduan-copywriting-website-bisnis-yang-menjual",
    published: true,
    featured: false,
    publishedAt: new Date(),
    metaTitle: "Panduan Copywriting Website Bisnis yang Menjual (2025)",
    metaDesc:
      "Pelajari framework dan prinsip copywriting website bisnis yang mengkonversi pengunjung jadi pelanggan — bukan sekadar terlihat bagus.",
    tags: [
      "copywriting",
      "website bisnis",
      "content marketing",
      "konversi",
      "digital marketing",
    ],
  },

  // ─────────────────────────────────────────────
  // ARTIKEL 10
  // ─────────────────────────────────────────────
  {
    title: "Mobile-First Website: Kenapa Ini Bukan Pilihan Lagi untuk Bisnis di 2025",
    slug: "mobile-first-website-bisnis-2025",
    excerpt:
      "Mobile-first website bukan tren, ini standar minimum. Jika website bisnis kamu belum dioptimasi untuk smartphone, kamu sedang kehilangan lebih dari setengah calon pelangganmu setiap hari.",
    content: `
      <h2>Realita yang Tidak Bisa Diabaikan Lagi</h2>
      <p>
        Per 2024, lebih dari 73% pengguna internet di Indonesia mengakses web secara eksklusif melalui smartphone. Bukan kadang-kadang — secara eksklusif. Artinya, jika <strong>mobile-first website bisnis</strong> bukan prioritas dalam desain websitemu, kamu sedang mendesain untuk minoritas pengguna dan mengabaikan mayoritas.
      </p>
      <p>
        Yang memperparah: Google sudah menggunakan Mobile-First Indexing sejak 2021. Ini berarti Google mengevaluasi dan memberi peringkat websitemu berdasarkan tampilan dan performa versi mobile-nya — bukan desktop. Website yang bagus di desktop tapi berantakan di mobile akan kalah peringkat di Google.
      </p>

      <h2>Apa Bedanya Mobile-First dengan "Responsif Saja"?</h2>
      <p>
        Banyak website sudah mengklaim "responsif" — tapi responsif dan mobile-first adalah dua hal yang berbeda:
      </p>
      <ul>
        <li><strong>Responsif</strong>: Didesain untuk desktop, lalu "diadaptasi" agar muat di layar kecil. Hasilnya sering kali kompromistis — teks terlalu kecil, tombol terlalu rapat, layout terasa dipaksakan.</li>
        <li><strong>Mobile-first</strong>: Didesain dari awal untuk layar kecil, lalu dikembangkan untuk layar lebih besar. Pengalaman mobile terasa natural dan nyaman karena memang dirancang untuk itu.</li>
      </ul>
      <p>
        Perbedaan ini terasa signifikan saat kamu mencoba menggunakan websitemu di smartphone: apakah jari kamu mudah menyentuh tombol yang tepat? Apakah teks bisa dibaca tanpa memperbesar layar? Apakah form mudah diisi dengan keyboard mobile?
      </p>

      <h2>Dampak Nyata Mobile-First pada Bisnis</h2>

      <h3>Dampak 1: Konversi Langsung</h3>
      <p>
        Calon pelanggan yang mencari jasa atau produkmu di Google melalui smartphone dan mendarat di website yang susah digunakan di mobile akan langsung menekan tombol "back" dan memilih kompetitormu. Studi Think with Google menunjukkan bahwa 61% pengguna tidak akan kembali ke website yang susah diakses di mobile — dan 40% langsung pindah ke kompetitor.
      </p>

      <h3>Dampak 2: Peringkat SEO</h3>
      <p>
        Dengan Mobile-First Indexing, performa mobile secara langsung mempengaruhi peringkatmu di Google. Core Web Vitals — metrik kecepatan dan stabilitas visual yang diukur Google — sebagian besar dievaluasi pada versi mobile. Website yang lambat atau tidak stabil di mobile akan mendapat penalti peringkat.
      </p>

      <h3>Dampak 3: Iklan Digital</h3>
      <p>
        Jika kamu menjalankan Google Ads atau Meta Ads, biaya per klikmu bisa lebih tinggi jika landing page destination score rendah — dan Google menghitung ini berdasarkan pengalaman mobile pengguna. Website mobile-friendly sama dengan Quality Score yang lebih tinggi, sama dengan biaya iklan yang lebih rendah.
      </p>

      <h2>Checklist Mobile-First Website yang Wajib Dipenuhi</h2>
      <ul>
        <li>Tombol dan CTA berukuran minimal 44x44px (sesuai panduan Apple dan Google)</li>
        <li>Font body minimal 16px agar terbaca tanpa zoom</li>
        <li>Tidak ada elemen yang keluar dari lebar layar (horizontal scrolling)</li>
        <li>Form bisa diisi dengan nyaman menggunakan keyboard mobile</li>
        <li>Gambar dikompresi dan menggunakan format WebP untuk loading cepat</li>
        <li>Tidak ada pop-up yang menutupi seluruh layar di mobile (Google menghukum ini)</li>
        <li>Navigasi yang sederhana dan mudah dijangkau jempol</li>
        <li>Nomor telepon bisa diklik langsung untuk menelepon</li>
        <li>Alamat bisa diklik langsung untuk membuka Google Maps</li>
      </ul>

      <h2>Cara Mengecek Apakah Website Kamu Sudah Mobile-First</h2>
      <p>
        Gunakan tools berikut — semuanya gratis:
      </p>
      <ul>
        <li><strong>Google Mobile-Friendly Test</strong> (search.google.com/test/mobile-friendly) — diagnosis dasar apakah halaman dianggap mobile-friendly oleh Google</li>
        <li><strong>PageSpeed Insights</strong> — cek kecepatan dan Core Web Vitals versi mobile spesifik</li>
        <li><strong>Google Search Console</strong> — bagian "Mobile Usability" menampilkan semua error mobile di seluruh halaman websitemu</li>
        <li><strong>Chrome DevTools</strong> — simulasikan berbagai ukuran layar smartphone langsung di browser kamu</li>
      </ul>

      <blockquote>
        Di 2025, website yang tidak dioptimasi untuk mobile bukan hanya pengalaman yang buruk — itu sinyal bahwa bisnismu tidak serius melayani pelanggannya.
      </blockquote>

      <h2>Mulai dari Mana Jika Website Kamu Belum Mobile-First?</h2>
      <p>
        Jika websitemu sudah ada tapi belum mobile-first, kamu tidak perlu langsung rebuild dari awal. Prioritaskan perbaikan berdasarkan dampak:
      </p>
      <ol>
        <li>Perbaiki kecepatan loading mobile terlebih dahulu — ini dampaknya paling langsung ke SEO dan konversi</li>
        <li>Perbaiki ukuran tombol dan CTA agar mudah diklik di layar sentuh</li>
        <li>Pastikan text terbaca tanpa zoom</li>
        <li>Sederhanakan navigasi untuk layar kecil</li>
        <li>Setelah itu, evaluasi apakah struktur halaman perlu dirombak lebih fundamental</li>
      </ol>

      <h2>Kesimpulan</h2>
      <p>
        Mobile-first website bukan fitur premium atau kemewahan yang hanya bisnis besar yang mampu — ini adalah standar minimum untuk berbisnis secara digital di Indonesia pada 2025. Dengan mayoritas pengguna internet Indonesia mengakses web lewat smartphone, dan Google mengevaluasi peringkat berdasarkan pengalaman mobile, tidak ada alasan lagi untuk menunda optimasi mobile. Audit websitemu hari ini, identifikasi masalah terbesar, dan mulai perbaiki satu per satu.
      </p>
    `,
    coverImage:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1400&q=80",
    ogImage:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80",
    author: "BuildWebsite Team",
    category: "Website Bisnis",
    focusKeyword: "mobile-first website bisnis",
    canonicalUrl:
      "https://domain.com/blog/mobile-first-website-bisnis-2025",
    published: true,
    featured: false,
    publishedAt: new Date(),
    metaTitle: "Mobile-First Website Bisnis: Standar Wajib 2025",
    metaDesc:
      "Mobile-first website bukan pilihan lagi. Pelajari mengapa bisnis di Indonesia wajib mengoptimasi website untuk smartphone di 2025 dan cara memulainya.",
    tags: [
      "mobile-first",
      "website bisnis",
      "SEO",
      "UX",
      "optimasi mobile",
    ],
  },
];

export default posts;
