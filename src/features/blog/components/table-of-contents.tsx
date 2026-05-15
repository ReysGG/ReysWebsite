"use client";

import { useEffect, useRef, useState } from "react";
import { ListTree } from "lucide-react";
import { cn } from "@/lib/utils";

type Heading = { id: string; text: string; level: number };

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function parseHeadings(): Heading[] {
  const article = document.querySelector(".quill-content");
  if (!article) return [];
  const nodes = article.querySelectorAll("h2, h3");
  const items: Heading[] = [];
  nodes.forEach((node) => {
    const text = node.textContent?.trim() || "";
    if (!text) return;
    let id = node.id;
    if (!id) {
      id = slugify(text);
      node.id = id;
    }
    items.push({ id, text, level: node.tagName === "H2" ? 2 : 3 });
  });
  return items;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const parsed = useRef(false);

  useEffect(() => {
    if (parsed.current) return;
    parsed.current = true;
    const frame = window.requestAnimationFrame(() => {
      const items = parseHeadings();
      if (items.length) setHeadings(items);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          const top = visible.reduce((prev, curr) =>
            prev.target.getBoundingClientRect().top < curr.target.getBoundingClientRect().top
              ? prev
              : curr
          );
          setActiveId(top.target.id);
        }
      },
      { rootMargin: "-100px 0px -60% 0px" }
    );

    headings.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (!headings.length) return null;

  return (
    <nav aria-label="Daftar Isi" className="sticky top-28">
      <div className="rounded-2xl border border-indigo-100 bg-white/85 p-5 shadow-sm">
        <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">
          <ListTree className="h-4 w-4" />
          Daftar Isi
        </div>
        <ul className="space-y-2 text-sm">
          {headings.map((h) => (
            <li key={h.id} className={h.level === 3 ? "pl-4" : ""}>
              <a
                href={`#${h.id}`}
                className={cn(
                  "block border-l-2 py-0.5 pl-3 transition-colors",
                  activeId === h.id
                    ? "border-indigo-600 font-semibold text-indigo-700"
                    : "border-neutral-200 text-neutral-600 hover:border-indigo-300 hover:text-indigo-700"
                )}
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
