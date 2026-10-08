import "server-only";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";
import { isS3Configured, saveLocalFile } from "@/lib/storage/local-storage";

const BUCKET = process.env.SUPABASE_S3_BUCKET ?? "blog-images";
export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
/** Remote downloads (stock photos / AI renders) may be larger before sharp re-encodes them. */
const MAX_REMOTE_IMAGE_BYTES = 15 * 1024 * 1024;

export type ImageMime = "image/jpeg" | "image/png" | "image/webp" | "image/gif";

export function detectImageMime(buffer: Buffer): ImageMime | null {
  if (buffer.length < 12) return null;
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) return "image/jpeg";
  if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47) return "image/png";
  if (buffer[0] === 0x47 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x38) return "image/gif";
  if (
    buffer[0] === 0x52 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x46 &&
    buffer[8] === 0x57 && buffer[9] === 0x45 && buffer[10] === 0x42 && buffer[11] === 0x50
  ) return "image/webp";
  return null;
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
    throw new Error("Storage belum dikonfigurasi. Lengkapi SUPABASE_S3_ENDPOINT, SUPABASE_S3_ACCESS_KEY_ID, dan SUPABASE_S3_SECRET_ACCESS_KEY.");
  }

  return new S3Client({
    endpoint,
    region: process.env.SUPABASE_S3_REGION ?? "ap-southeast-1",
    credentials: { accessKeyId, secretAccessKey },
    forcePathStyle: true,
  });
}

export async function processImage(input: Buffer, declaredMime: string) {
  const isGif = declaredMime === "image/gif";
  const pipeline = sharp(input, { animated: isGif }).rotate();
  const metadata = await pipeline.metadata();
  const needsResize = (metadata.width ?? 0) > 2000 || (metadata.height ?? 0) > 2000;

  if (isGif) {
    const out = needsResize
      ? await pipeline.resize({ width: 2000, withoutEnlargement: true }).gif().toBuffer()
      : await pipeline.gif().toBuffer();
    return { buffer: out, contentType: "image/gif" as const, ext: "gif" as const };
  }

  const out = await pipeline
    .resize({ width: 2000, height: 2000, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 80 })
    .toBuffer();
  return { buffer: out, contentType: "image/webp" as const, ext: "webp" as const };
}

export function sanitizeFolder(value: unknown, fallback = "blog") {
  return typeof value === "string" && /^[a-z0-9/_-]+$/i.test(value) ? value.replace(/^\/+|\/+$/g, "") : fallback;
}

/** Validates, re-encodes (WebP, max 2000px) and uploads an image. Returns its public URL. */
export async function uploadImageBuffer(buffer: Buffer, folder = "blog") {
  const detected = detectImageMime(buffer);
  if (!detected) throw new Error("File type not allowed. Use JPG, PNG, WebP, or GIF.");

  let processed;
  try {
    processed = await processImage(buffer, detected);
  } catch {
    throw new Error("Image could not be processed. Coba file lain.");
  }

  const random = Math.random().toString(36).slice(2, 8);
  const filename = `${sanitizeFolder(folder)}/${Date.now()}-${random}.${processed.ext}`;

  // Self-hosted setup: no S3 configured → keep files on local disk.
  if (!isS3Configured()) return saveLocalFile(filename, processed.buffer);

  await getStorageClient().send(new PutObjectCommand({
    Bucket: BUCKET,
    Key: filename,
    Body: processed.buffer,
    ContentType: processed.contentType,
    CacheControl: "public, max-age=31536000, immutable",
  }));

  return publicSupabaseUrl(filename);
}

function isPrivateHost(hostname: string) {
  const host = hostname.toLowerCase();
  if (host === "localhost" || host.endsWith(".local") || host.endsWith(".internal")) return true;
  if (/^(127\.|10\.|192\.168\.|169\.254\.|0\.)/.test(host)) return true;
  if (/^172\.(1[6-9]|2\d|3[01])\./.test(host)) return true;
  if (host === "[::1]" || host.startsWith("[fc") || host.startsWith("[fd") || host.startsWith("[fe80")) return true;
  return false;
}

/**
 * Downloads a remote image (https only, no private hosts, size-capped, 20s timeout)
 * and re-hosts it in our storage. Used by AI tools so posts never hotlink third-party images.
 */
export async function uploadImageFromUrl(url: string, folder = "blog/ai") {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    throw new Error("URL gambar tidak valid.");
  }
  if (parsed.protocol !== "https:") throw new Error("Hanya URL https yang diizinkan.");
  if (isPrivateHost(parsed.hostname)) throw new Error("Host gambar tidak diizinkan.");

  const response = await fetch(parsed, { signal: AbortSignal.timeout(20_000), redirect: "follow" });
  if (!response.ok || !response.body) throw new Error(`Gagal mengunduh gambar (HTTP ${response.status}).`);

  const declaredLength = Number(response.headers.get("content-length") ?? 0);
  if (declaredLength > MAX_REMOTE_IMAGE_BYTES) throw new Error("Gambar terlalu besar.");

  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let received = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    received += value.byteLength;
    if (received > MAX_REMOTE_IMAGE_BYTES) {
      await reader.cancel();
      throw new Error("Gambar terlalu besar.");
    }
    chunks.push(value);
  }

  return uploadImageBuffer(Buffer.concat(chunks), folder);
}
