import { NextRequest, NextResponse } from "next/server";
import { getNewsletterClientIp, isValidNewsletterEmail, normalizeNewsletterEmail } from "@/features/newsletter/lib/newsletter-request";
import { rateLimitNewsletterSignup } from "@/features/newsletter/lib/rate-limit";
import { subscribeToNewsletter } from "@/features/newsletter/services/newsletter-service";

function redirectToBlog(req: NextRequest, status: "success" | "ratelimit" | "invalid" | "error") {
  return NextResponse.redirect(new URL(`/blog?subscribed=${status}`, req.url), 303);
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const honeypot = String(formData.get("website") || "").trim();

    if (honeypot) return redirectToBlog(req, "success");

    if (!rateLimitNewsletterSignup(getNewsletterClientIp(req))) {
      return redirectToBlog(req, "ratelimit");
    }

    const email = normalizeNewsletterEmail(formData.get("email"));

    if (!email || !isValidNewsletterEmail(email)) {
      return redirectToBlog(req, "invalid");
    }

    await subscribeToNewsletter(email);

    return redirectToBlog(req, "success");
  } catch (error) {
    console.error("[newsletter]", error);
    return redirectToBlog(req, "error");
  }
}
