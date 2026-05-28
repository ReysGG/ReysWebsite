const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 3;

const ipCounts = new Map<string, { count: number; resetAt: number }>();

export function rateLimitNewsletterSignup(ip: string) {
  const now = Date.now();
  const entry = ipCounts.get(ip);

  if (!entry || now > entry.resetAt) {
    ipCounts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }

  if (entry.count >= MAX_REQUESTS) return false;

  entry.count += 1;
  return true;
}
