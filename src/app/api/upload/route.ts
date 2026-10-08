import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/features/admin/lib/auth';
import { MAX_IMAGE_BYTES, detectImageMime, sanitizeFolder, uploadImageBuffer } from '@/lib/storage/image-storage';

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();

    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const folder = sanitizeFolder(formData.get('folder'));
    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 });

    if (file.size > MAX_IMAGE_BYTES) {
      return NextResponse.json({ error: 'File too large. Max 5MB.' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    if (!detectImageMime(buffer)) {
      return NextResponse.json({ error: 'File type not allowed. Use JPG, PNG, WebP, or GIF.' }, { status: 400 });
    }

    let url: string;
    try {
      url = await uploadImageBuffer(buffer, folder);
    } catch (error) {
      if (error instanceof Error && error.message.startsWith('Image could not be processed')) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }
      throw error;
    }

    return NextResponse.json({ url });
  } catch (error) {
    console.error('[upload]', error);
    if (error instanceof Error && error.message.includes('Unauthorized')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Upload failed' }, { status: 500 });
  }
}
