import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { requireAdmin } from '@/features/admin/lib/auth';

const BUCKET = process.env.SUPABASE_S3_BUCKET ?? 'blog-images';
const SUPABASE_PROJECT = process.env.SUPABASE_PROJECT_REF || 'diqptdnkfcxyvepefypx';

function getStorageClient() {
  const endpoint = process.env.SUPABASE_S3_ENDPOINT;
  const accessKeyId = process.env.SUPABASE_S3_ACCESS_KEY_ID;
  const secretAccessKey = process.env.SUPABASE_S3_SECRET_ACCESS_KEY;

  if (!endpoint || !accessKeyId || !secretAccessKey) {
    throw new Error('Storage belum dikonfigurasi. Lengkapi SUPABASE_S3_ENDPOINT, SUPABASE_S3_ACCESS_KEY_ID, dan SUPABASE_S3_SECRET_ACCESS_KEY.');
  }

  return new S3Client({
    endpoint,
    region: process.env.SUPABASE_S3_REGION ?? 'ap-southeast-1',
    credentials: { accessKeyId, secretAccessKey },
    forcePathStyle: true,
  });
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();

    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const folderValue = formData.get('folder');
    const folder = typeof folderValue === 'string' && /^[a-z0-9/_-]+$/i.test(folderValue) ? folderValue.replace(/^\/+|\/+$/g, '') : 'blog';
    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 });

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'File type not allowed. Use JPG, PNG, WebP, or GIF.' }, { status: 400 });
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'File too large. Max 5MB.' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg';
    const timestamp = Date.now();
    const random = Math.random().toString(36).slice(2, 8);
    const filename = `${folder}/${timestamp}-${random}.${ext}`;

    await getStorageClient().send(new PutObjectCommand({
      Bucket: BUCKET,
      Key: filename,
      Body: buffer,
      ContentType: file.type,
      CacheControl: 'public, max-age=31536000',
    }));

    // Public URL via Supabase Storage CDN
    const url = `https://${SUPABASE_PROJECT}.supabase.co/storage/v1/object/public/${BUCKET}/${filename}`;

    return NextResponse.json({ url });
  } catch (error) {
    console.error('[upload]', error);
    if (error instanceof Error && error.message.includes('Unauthorized')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Upload failed' }, { status: 500 });
  }
}
