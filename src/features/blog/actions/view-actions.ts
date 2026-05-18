'use server';
import { headers } from 'next/headers';
import db from '@/lib/db';

const WINDOW_MS = 30 * 60 * 1000;
const BOT_PATTERN = /(bot|crawl|spider|preview|fetch|monitor|headless|lighthouse|axios|curl|wget|python-requests|node-fetch|go-http-client|httpclient)/i;
const cache = new Map<string, number>();
let lastSweep = 0;

function sweep(now: number) {
  if (now - lastSweep < WINDOW_MS) return;
  lastSweep = now;
  for (const [key, timestamp] of cache) {
    if (now - timestamp > WINDOW_MS) cache.delete(key);
  }
}

async function clientFingerprint() {
  const h = await headers();
  const ua = h.get('user-agent') ?? '';
  const ip =
    h.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    h.get('x-real-ip') ||
    h.get('cf-connecting-ip') ||
    'unknown';
  return { ua, ip, isBot: !ua || BOT_PATTERN.test(ua) };
}

export async function incrementPostViews(id: string) {
  try {
    const { ua, ip, isBot } = await clientFingerprint();
    if (isBot) return;

    const now = Date.now();
    sweep(now);
    const key = `${id}::${ip}::${ua.slice(0, 64)}`;
    const last = cache.get(key);
    if (last && now - last < WINDOW_MS) return;
    cache.set(key, now);

    await db.post.update({ where: { id }, data: { views: { increment: 1 } } });
  } catch {
    /* silent */
  }
}
