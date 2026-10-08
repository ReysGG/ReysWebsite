import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { resolveUploadPath } from "@/lib/storage/local-storage";

const CONTENT_TYPES: Record<string, string> = {
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".html": "text/html; charset=utf-8",
};

type RouteContext = { params: Promise<{ path: string[] }> };

/** Serves files saved by the local storage fallback (images + showcase HTML). */
export async function GET(_req: Request, { params }: RouteContext) {
  const { path: segments } = await params;
  const key = segments.join("/");
  const ext = path.extname(key).toLowerCase();
  const contentType = CONTENT_TYPES[ext];
  const target = contentType ? resolveUploadPath(key) : null;
  if (!target) return new Response("Not found", { status: 404 });

  try {
    const info = await stat(target);
    if (!info.isFile()) return new Response("Not found", { status: 404 });
    const body = await readFile(target);
    return new Response(new Uint8Array(body), {
      headers: {
        "Content-Type": contentType,
        "Content-Length": String(info.size),
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
        // Uploaded HTML is rendered through /showcase/[slug]/embed; opened directly it gets no script privileges.
        ...(ext === ".html" ? { "Content-Security-Policy": "sandbox" } : {}),
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
