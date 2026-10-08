import "server-only";

import { createCipheriv, createDecipheriv, createHash, createHmac, randomBytes } from "node:crypto";

const VERSION = "v1";

function getKey() {
  const secret = process.env.AI_ENCRYPTION_KEY;
  if (!secret || secret.length < 16) {
    throw new Error("AI_ENCRYPTION_KEY belum di-set (minimal 16 karakter). Generate dengan: openssl rand -base64 32");
  }
  // Derive a fixed 32-byte key so any sufficiently long secret works.
  return createHash("sha256").update(secret).digest();
}

/** AES-256-GCM. Output: v1:<iv>:<tag>:<ciphertext> (base64url). */
export function encryptSecret(plain: string) {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", getKey(), iv);
  const encrypted = Buffer.concat([cipher.update(plain, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return [VERSION, iv.toString("base64url"), tag.toString("base64url"), encrypted.toString("base64url")].join(":");
}

export function decryptSecret(payload: string) {
  const [version, iv, tag, data] = payload.split(":");
  if (version !== VERSION || !iv || !tag || !data) throw new Error("Format API key terenkripsi tidak valid.");
  const decipher = createDecipheriv("aes-256-gcm", getKey(), Buffer.from(iv, "base64url"));
  decipher.setAuthTag(Buffer.from(tag, "base64url"));
  return Buffer.concat([decipher.update(Buffer.from(data, "base64url")), decipher.final()]).toString("utf8");
}

export function maskSecret(plain: string) {
  if (plain.length <= 8) return "••••";
  return `${plain.slice(0, 4)}…${plain.slice(-4)}`;
}

/** Secret used by the AI SDK to HMAC-sign tool approval requests in the admin chat. */
export function getToolApprovalSecret() {
  return createHmac("sha256", getKey()).update("tool-approval").digest("base64url");
}

export function isEncryptionConfigured() {
  return Boolean(process.env.AI_ENCRYPTION_KEY && process.env.AI_ENCRYPTION_KEY.length >= 16);
}
