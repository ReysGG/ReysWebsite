-- Add full-text search for Post (title + excerpt + content).
-- Generated tsvector column + GIN index. English+simple config to handle mixed Indonesian/English.

ALTER TABLE "Post"
  ADD COLUMN IF NOT EXISTS "searchVector" tsvector
  GENERATED ALWAYS AS (
    setweight(to_tsvector('simple', coalesce("title", '')), 'A') ||
    setweight(to_tsvector('simple', coalesce("excerpt", '')), 'B') ||
    setweight(to_tsvector('simple', coalesce("content", '')), 'C')
  ) STORED;

CREATE INDEX IF NOT EXISTS "Post_searchVector_idx" ON "Post" USING GIN ("searchVector");

-- Trigram index on title for fast prefix/fuzzy autocomplete fallback.
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE INDEX IF NOT EXISTS "Post_title_trgm_idx" ON "Post" USING GIN ("title" gin_trgm_ops);
