import "server-only";

import { Buffer } from "node:buffer";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const BUCKET = process.env.SUPABASE_S3_BUCKET ?? "blog-images";
const FOLDER = "showcase";

export const MAX_SHOWCASE_HTML_SIZE = 2 * 1024 * 1024; // 2MB

let storageClient: S3Client | null = null;

export function looksLikeHtml(content: string) {
  const head = content.slice(0, 2000).toLowerCase();
  return head.includes("<!doctype html") || /<html[\s>]/.test(head) || /<body[\s>]/.test(head);
}

export async function uploadShowcaseHtml({ html, slug }: { html: string; slug?: string | null }) {
  const size = Buffer.byteLength(html, "utf-8");
  if (size === 0) throw new Error("HTML kosong.");
  if (size > MAX_SHOWCASE_HTML_SIZE) throw new Error("HTML terlalu besar. Maks 2MB.");
  if (!looksLikeHtml(html)) throw new Error("Konten tidak terlihat seperti HTML valid.");

  const filename = buildShowcaseHtmlFilename(slug);

  await getStorageClient().send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: filename,
      Body: Buffer.from(html, "utf-8"),
      ContentType: "text/html; charset=utf-8",
      CacheControl: "public, max-age=31536000, immutable",
    }),
  );

  return publicSupabaseUrl(filename);
}

function buildShowcaseHtmlFilename(slug?: string | null) {
  const timestamp = Date.now();
  const random = Math.random().toString(36).slice(2, 8);
  const slugPart = normalizeFilenameSlug(slug) || "prototype";
  return `${FOLDER}/${slugPart}-${timestamp}-${random}.html`;
}

function normalizeFilenameSlug(value?: string | null) {
  if (!value) return "";
  return value
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function publicSupabaseUrl(filename: string) {
  const projectRef = process.env.SUPABASE_PROJECT_REF;
  if (projectRef) {
    return `https://${projectRef}.supabase.co/storage/v1/object/public/${BUCKET}/${filename}`;
  }

  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (baseUrl) {
    return `${baseUrl.replace(/\/$/, "")}/storage/v1/object/public/${BUCKET}/${filename}`;
  }

  throw new Error("Storage public URL belum dikonfigurasi. Lengkapi SUPABASE_PROJECT_REF atau NEXT_PUBLIC_SUPABASE_URL.");
}

function getStorageClient() {
  const endpoint = process.env.SUPABASE_S3_ENDPOINT;
  const accessKeyId = process.env.SUPABASE_S3_ACCESS_KEY_ID;
  const secretAccessKey = process.env.SUPABASE_S3_SECRET_ACCESS_KEY;

  if (!endpoint || !accessKeyId || !secretAccessKey) {
    throw new Error(
      "Storage belum dikonfigurasi. Lengkapi SUPABASE_S3_ENDPOINT, SUPABASE_S3_ACCESS_KEY_ID, dan SUPABASE_S3_SECRET_ACCESS_KEY.",
    );
  }

  storageClient ??= new S3Client({
    endpoint,
    region: process.env.SUPABASE_S3_REGION ?? "ap-southeast-1",
    credentials: { accessKeyId, secretAccessKey },
    forcePathStyle: true,
  });

  return storageClient;
}
