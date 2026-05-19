import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/features/admin/lib/auth';
import {
  MAX_SHOWCASE_HTML_SIZE,
  looksLikeHtml,
  uploadShowcaseHtml,
} from '@/features/admin/services/showcase-html-storage-service';

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();

    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const slugValue = formData.get('slug');
    const slug = typeof slugValue === 'string' && /^[a-z0-9-]+$/i.test(slugValue) ? slugValue : null;

    if (!file) return NextResponse.json({ error: 'File HTML wajib diisi.' }, { status: 400 });
    if (file.size === 0) return NextResponse.json({ error: 'File kosong.' }, { status: 400 });
    if (file.size > MAX_SHOWCASE_HTML_SIZE) {
      return NextResponse.json({ error: 'File terlalu besar. Maks 2MB.' }, { status: 400 });
    }

    const text = await file.text();
    if (!looksLikeHtml(text)) {
      return NextResponse.json({ error: 'File tidak terlihat seperti HTML valid.' }, { status: 400 });
    }

    const url = await uploadShowcaseHtml({ html: text, slug });

    return NextResponse.json({ url });
  } catch (error) {
    console.error('[upload-showcase]', error);
    if (error instanceof Error && error.message.includes('Unauthorized')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Upload failed' }, { status: 500 });
  }
}
