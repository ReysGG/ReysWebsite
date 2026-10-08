import "server-only";

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

/**
 * Local-disk storage used when Supabase S3 is not configured (self-hosted setup).
 * Files land in UPLOAD_DIR (Docker: a named volume at /app/uploads) and are served by /uploads/[...path].
 */
export function getUploadDir() {
  return path.resolve(process.env.UPLOAD_DIR || path.join(process.cwd(), "uploads"));
}

export function isS3Configured() {
  return Boolean(process.env.SUPABASE_S3_ENDPOINT && process.env.SUPABASE_S3_ACCESS_KEY_ID && process.env.SUPABASE_S3_SECRET_ACCESS_KEY);
}

/** Resolves a storage key inside UPLOAD_DIR, rejecting traversal. Returns null for invalid keys. */
export function resolveUploadPath(key: string) {
  const root = getUploadDir();
  const target = path.resolve(root, key);
  if (!target.startsWith(`${root}${path.sep}`)) return null;
  return target;
}

export async function saveLocalFile(key: string, body: Buffer) {
  const target = resolveUploadPath(key);
  if (!target) throw new Error("Nama file upload tidak valid.");
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, body);
  return `/uploads/${key.split(path.sep).join("/")}`;
}
