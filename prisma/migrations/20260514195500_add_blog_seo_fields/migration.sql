-- Add first-class blog CMS fields.
-- Safe/non-destructive: all new optional fields are nullable except featured with a default.

ALTER TABLE "Post"
  ADD COLUMN IF NOT EXISTS "ogImage" TEXT,
  ADD COLUMN IF NOT EXISTS "category" TEXT,
  ADD COLUMN IF NOT EXISTS "focusKeyword" TEXT,
  ADD COLUMN IF NOT EXISTS "canonicalUrl" TEXT,
  ADD COLUMN IF NOT EXISTS "featured" BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS "publishedAt" TIMESTAMP(3);

-- Backfill publishedAt for existing published posts so SEO/article dates work immediately.
UPDATE "Post"
SET "publishedAt" = COALESCE("publishedAt", "createdAt")
WHERE "published" = true;

CREATE INDEX IF NOT EXISTS "Post_published_publishedAt_idx" ON "Post" ("published", "publishedAt");
CREATE INDEX IF NOT EXISTS "Post_category_idx" ON "Post" ("category");
CREATE INDEX IF NOT EXISTS "Post_featured_idx" ON "Post" ("featured");
