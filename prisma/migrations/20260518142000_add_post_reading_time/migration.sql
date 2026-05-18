-- Add readingTime column to Post for fast list rendering without selecting full content.
-- Backfill existing rows with a rough estimate (1 minute per 200 words, after stripping HTML).

ALTER TABLE "Post"
  ADD COLUMN IF NOT EXISTS "readingTime" INTEGER NOT NULL DEFAULT 1;

UPDATE "Post"
SET "readingTime" = GREATEST(
  1,
  CEIL(
    array_length(
      regexp_split_to_array(
        btrim(
          regexp_replace(
            regexp_replace(
              regexp_replace("content", '<script[\s\S]*?</script>', ' ', 'gi'),
              '<style[\s\S]*?</style>', ' ', 'gi'
            ),
            '<[^>]+>|&nbsp;|&amp;|&lt;|&gt;|&quot;|&#39;', ' ', 'gi'
          )
        ),
        '\s+'
      ),
      1
    )::numeric / 200
  )::int
)
WHERE "readingTime" IS NULL OR "readingTime" = 1;

-- Backfill missing excerpts from a stripped slice of content (max ~160 chars).
UPDATE "Post"
SET "excerpt" = LEFT(
  btrim(
    regexp_replace(
      regexp_replace(
        regexp_replace("content", '<script[\s\S]*?</script>', ' ', 'gi'),
        '<style[\s\S]*?</style>', ' ', 'gi'
      ),
      '<[^>]+>|&nbsp;|&amp;|&lt;|&gt;|&quot;|&#39;', ' ', 'gi'
    )
  ),
  160
)
WHERE "excerpt" IS NULL OR length(btrim("excerpt")) = 0;
