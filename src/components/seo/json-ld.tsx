import { Fragment } from "react";

type JsonLdProps = {
  /** One schema object or an array of them. */
  data: Record<string, unknown> | Array<Record<string, unknown> | null | undefined> | null | undefined;
};

/**
 * Renders schema.org JSON-LD as a <script> tag. Accepts a single object or an
 * array; null/undefined entries are skipped so callers can pass conditional schemas.
 */
export function JsonLd({ data }: JsonLdProps) {
  if (!data) return null;
  const items = (Array.isArray(data) ? data : [data]).filter(Boolean) as Array<Record<string, unknown>>;
  if (items.length === 0) return null;

  return (
    <Fragment>
      {items.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </Fragment>
  );
}
