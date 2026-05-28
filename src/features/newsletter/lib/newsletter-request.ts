import type { NextRequest } from "next/server";

export function getNewsletterClientIp(req: NextRequest) {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    req.headers.get("cf-connecting-ip") ||
    "unknown"
  );
}

export function normalizeNewsletterEmail(value: FormDataEntryValue | null) {
  return String(value || "").trim().toLowerCase();
}

export function isValidNewsletterEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
