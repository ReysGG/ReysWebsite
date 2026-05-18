CREATE TABLE "Showcase" (
  "id" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "category" TEXT NOT NULL,
  "htmlUrl" TEXT NOT NULL,
  "thumbnail" TEXT,
  "tags" TEXT[],
  "published" BOOLEAN NOT NULL DEFAULT true,
  "order" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Showcase_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Showcase_slug_key" ON "Showcase"("slug");
CREATE INDEX "Showcase_published_order_idx" ON "Showcase"("published", "order");

INSERT INTO "Showcase" ("id", "slug", "title", "description", "category", "htmlUrl", "thumbnail", "tags", "published", "order", "createdAt", "updatedAt")
VALUES (
  'cl_seed_inovasi_kerja_digital',
  'inovasi-kerja-digital',
  'PT Inovasi Kerja Digital',
  'Company profile bertema corporate-tech dengan layanan transformasi digital, hero gradient, kartu layanan, dan form konsultasi.',
  'Company Profile',
  '/showcase/inovasi-kerja-digital.html',
  '/images/homepage-slider-reference.webp',
  ARRAY['Corporate', 'Light Mode', 'Material'],
  true,
  0,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
)
ON CONFLICT ("slug") DO NOTHING;
