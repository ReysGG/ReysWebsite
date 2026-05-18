import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import sharp from 'sharp';
import { requireAdmin } from '@/features/admin/lib/auth';

const BUCKET = process.env.SUPABASE_S3_BUCKET ?? 'blog-images';

function detectImageMime(buffer: Buffer): 'image/jpeg' | 'image/png' | 'image/webp' | 'image/gif' | null {
  if (buffer.length < 12) return null;
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) return 'image/jpeg';
  if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47) return 'image/png';
  if (buffer[0] === 0x47 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x38) return 'image/gif';
  if (
    buffer[0] === 0x52 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x46 &&
    buffer[8] === 0x57 && buffer[9] === 0x45 && buffer[10] === 0x42 && buffer[11] === 0x50
  ) return 'image/webp';
  return null;
}

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

async function processImage(input: Buffer, declaredMime: string) {
  const isGif = declaredMime === 'image/gif';
  const pipeline = sharp(input, { animated: isGif }).rotate();
  const metadata = await pipeline.metadata();
  const needsResize = (metadata.width ?? 0) > 2000 || (metadata.height ?? 0) > 2000;

  if (isGif) {
    const out = needsResize
      ? await pipeline.resize({ width: 2000, withoutEnlargement: true }).gif().toBuffer()
      : await pipeline.gif().toBuffer();
    return { buffer: out, contentType: 'image/gif' as const, ext: 'gif' as const };
  }

  const out = await pipeline
    .resize({ width: 2000, height: 2000, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 80 })
    .toBuffer();
  return { buffer: out, contentType: 'image/webp' as const, ext: 'webp' as const };
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();

    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const folderValue = formData.get('folder');
    const folder = typeof folderValue === 'string' && /^[a-z0-9/_-]+$/i.test(folderValue) ? folderValue.replace(/^\/+|\/+$/g, '') : 'blog';
    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 });

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'File too large. Max 5MB.' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const detected = detectImageMime(buffer);
    if (!detected) {
      return NextResponse.json({ error: 'File type not allowed. Use JPG, PNG, WebP, or GIF.' }, { status: 400 });
    }

    let processed;
    try {
      processed = await processImage(buffer, detected);
    } catch {
      return NextResponse.json({ error: 'Image could not be processed. Coba file lain.' }, { status: 400 });
    }

    const timestamp = Date.now();
    const random = Math.random().toString(36).slice(2, 8);
    const filename = `${folder}/${timestamp}-${random}.${processed.ext}`;

    await getStorageClient().send(new PutObjectCommand({
      Bucket: BUCKET,
      Key: filename,
      Body: processed.buffer,
      ContentType: processed.contentType,
      CacheControl: 'public, max-age=31536000, immutable',
    }));

    return NextResponse.json({ url: publicSupabaseUrl(filename) });
  } catch (error) {
    console.error('[upload]', error);
    if (error instanceof Error && error.message.includes('Unauthorized')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Upload failed' }, { status: 500 });
  }
}
