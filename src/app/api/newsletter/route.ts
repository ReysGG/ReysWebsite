import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
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
