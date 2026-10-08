import Link from "next/link";
import { Fragment, type ReactNode } from "react";

/** Tiny, safe markdown renderer for assistant replies (no HTML injection, internal + https links only). */
function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)\s]+\))/g;
  let last = 0;
  let index = 0;
  for (const match of text.matchAll(pattern)) {
    const start = match.index ?? 0;
    if (start > last) nodes.push(text.slice(last, start));
    const token = match[0];
    const key = `${keyPrefix}-${index++}`;
    if (token.startsWith("**")) {
      nodes.push(<strong key={key} className="font-semibold text-neutral-900">{token.slice(2, -2)}</strong>);
    } else if (token.startsWith("`")) {
      nodes.push(<code key={key} className="rounded bg-neutral-100 px-1 py-0.5 font-mono text-[0.85em]">{token.slice(1, -1)}</code>);
    } else {
      const [, label, href] = token.match(/\[([^\]]+)\]\(([^)\s]+)\)/) ?? [];
      if (href?.startsWith("/")) {
        nodes.push(<Link key={key} href={href} className="font-medium text-brand-deep underline underline-offset-2">{label}</Link>);
      } else if (href?.startsWith("https://")) {
        nodes.push(<a key={key} href={href} target="_blank" rel="noopener noreferrer" className="font-medium text-brand-deep underline underline-offset-2">{label}</a>);
      } else {
        nodes.push(label ?? token);
      }
    }
    last = start + token.length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export function ChatMarkdown({ text }: { text: string }) {
  const lines = text.replace(/\r\n/g, "\n").split("\n");
  const blocks: ReactNode[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;
  let paragraph: string[] = [];

  const flushParagraph = () => {
    if (!paragraph.length) return;
    const key = `p-${blocks.length}`;
    blocks.push(
      <p key={key}>
        {paragraph.map((line, i) => (
          <Fragment key={i}>{i > 0 && <br />}{renderInline(line, `${key}-${i}`)}</Fragment>
        ))}
      </p>,
    );
    paragraph = [];
  };
  const flushList = () => {
    if (!list) return;
    const key = `l-${blocks.length}`;
    const items = list.items.map((item, i) => <li key={i}>{renderInline(item, `${key}-${i}`)}</li>);
    blocks.push(list.ordered ? <ol key={key} className="list-decimal space-y-1 pl-5">{items}</ol> : <ul key={key} className="list-disc space-y-1 pl-5">{items}</ul>);
    list = null;
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    const bullet = line.match(/^\s*[-*]\s+(.*)$/);
    const ordered = line.match(/^\s*\d+[.)]\s+(.*)$/);
    const heading = line.match(/^#{1,4}\s+(.*)$/);
    if (bullet || ordered) {
      flushParagraph();
      const isOrdered = Boolean(ordered);
      if (!list || list.ordered !== isOrdered) {
        flushList();
        list = { ordered: isOrdered, items: [] };
      }
      list.items.push((bullet ?? ordered)![1]);
    } else if (heading) {
      flushParagraph();
      flushList();
      blocks.push(<p key={`h-${blocks.length}`} className="font-semibold text-neutral-900">{renderInline(heading[1], `h-${blocks.length}`)}</p>);
    } else if (!line.trim()) {
      flushParagraph();
      flushList();
    } else {
      flushList();
      paragraph.push(line);
    }
  }
  flushParagraph();
  flushList();

  return <div className="space-y-2 text-sm leading-relaxed text-neutral-800">{blocks}</div>;
}
