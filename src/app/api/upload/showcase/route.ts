import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { requireAdmin } from '@/features/admin/lib/auth';

const BUCKET = process.env.SUPABASE_S3_BUCKET ?? 'blog-images';
const MAX_HTML_SIZE = 2 * 1024 * 1024; // 2MB
const FOLDER = 'showcase';

function publicSupabaseUrl(filename: string) {
  const projectRef = process.env.SUPABASE_PROJECT_REF;
  if (projectRef) {
    return `https://${projectRef}.supabase.co/storage/v1/object/public/${BUCKET}/${filename}`;
  }
  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (baseUrl) {
    return `${baseUrl.replace(/\/$/, '')}/storage/v1/object/public/${BUCKET}/${filename}`;
  }
  throw new Error('Storage public URL belum dikonfigurasi. Lengkapi SUPABASE_PROJECT_REF atau NEXT_PUBLIC_SUPABASE_URL.');
}

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

function looksLikeHtml(content: string) {
  const head = content.slice(0, 2000).toLowerCase();
  return head.includes('<!doctype html') || /<html[\s>]/.test(head) || /<body[\s>]/.test(head);
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();

    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const slugValue = formData.get('slug');
    const slug = typeof slugValue === 'string' && /^[a-z0-9-]+$/i.test(slugValue) ? slugValue : null;

    if (!file) return NextResponse.json({ error: 'File HTML wajib diisi.' }, { status: 400 });
    if (file.size === 0) return NextResponse.json({ error: 'File kosong.' }, { status: 400 });
    if (file.size > MAX_HTML_SIZE) {
      return NextResponse.json({ error: 'File terlalu besar. Maks 2MB.' }, { status: 400 });
    }

    const text = await file.text();
    if (!looksLikeHtml(text)) {
      return NextResponse.json({ error: 'File tidak terlihat seperti HTML valid.' }, { status: 400 });
    }

    const timestamp = Date.now();
    const random = Math.random().toString(36).slice(2, 8);
    const slugPart = slug || 'prototype';
    const filename = `${FOLDER}/${slugPart}-${timestamp}-${random}.html`;

    await getStorageClient().send(new PutObjectCommand({
      Bucket: BUCKET,
      Key: filename,
      Body: Buffer.from(text, 'utf-8'),
      ContentType: 'text/html; charset=utf-8',
      CacheControl: 'public, max-age=31536000, immutable',
    }));

    return NextResponse.json({ url: publicSupabaseUrl(filename) });
  } catch (error) {
    console.error('[upload-showcase]', error);
    if (error instanceof Error && error.message.includes('Unauthorized')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Upload failed' }, { status: 500 });
  }
}
