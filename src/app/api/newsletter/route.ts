import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 3;
const ipCounts = new Map<string, { count: number; resetAt: number }>();

function rateLimit(ip: string) {
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

function clientIp(req: NextRequest) {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    req.headers.get('cf-connecting-ip') ||
    'unknown'
  );
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const honeypot = String(formData.get('website') || '').trim();
    if (honeypot) {
      return NextResponse.redirect(new URL('/blog?subscribed=success', req.url), 303);
    }

    if (!rateLimit(clientIp(req))) {
      return NextResponse.redirect(new URL('/blog?subscribed=ratelimit', req.url), 303);
    }

    const email = String(formData.get('email') || '').trim().toLowerCase();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.redirect(new URL('/blog?subscribed=invalid', req.url), 303);
    }

    await db.subscriber.upsert({
      where: { email },
      update: { active: true },
      create: { email, source: 'blog-sidebar' },
    });

    return NextResponse.redirect(new URL('/blog?subscribed=success', req.url), 303);
  } catch (error) {
    console.error('[newsletter]', error);
    return NextResponse.redirect(new URL('/blog?subscribed=error', req.url), 303);
  }
}
