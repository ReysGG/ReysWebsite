# Docker deploy ReysWebsite

Setup ini hanya menjalankan app Next.js di Docker. Database tetap memakai Supabase PostgreSQL, bukan PostgreSQL lokal.

## 1. Buat env Docker

Copy template:

```bash
cp .env.docker.example .env.docker
```

Isi `.env.docker` dari project Supabase + Clerk:

```env
APP_PORT=3000
NEXT_PUBLIC_SITE_URL=https://domain-kamu.com

# Database
DATABASE_URL=postgresql://postgres.xxxxx:PASSWORD@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1
DIRECT_URL=postgresql://postgres.xxxxx:PASSWORD@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...

# Supabase Storage — untuk upload gambar & HTML showcase via admin
# Dapatkan dari: Supabase Dashboard → Settings → Storage → S3 Access Keys
SUPABASE_PROJECT_REF=xxxxx
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_S3_ENDPOINT=https://xxxxx.supabase.co/storage/v1/s3
SUPABASE_S3_REGION=ap-southeast-1
SUPABASE_S3_ACCESS_KEY_ID=your-access-key
SUPABASE_S3_SECRET_ACCESS_KEY=your-secret-key
SUPABASE_S3_BUCKET=your-bucket-name
```

Catatan:
- `DATABASE_URL` pakai Supabase pooler untuk runtime app.
- `DIRECT_URL` opsional untuk runtime, tapi berguna kalau mau `prisma db push` atau seeding.
- Supabase Storage wajib diisi kalau mau upload gambar/HTML dari admin panel.
- Jangan commit `.env.docker`.

## 2. Build dan run

```bash
docker compose --env-file .env.docker up -d --build
```

Saat container start, migration database akan otomatis dijalankan via `docker-entrypoint.sh`. Tidak perlu apply migration manual.

Setelah build, bersihkan dangling image:

```bash
docker image prune -f
```

Buka:

```text
http://localhost:3000
```

Kalau mau port lain:

```env
APP_PORT=3003
```

Lalu run ulang compose.

## 3. Cek status dan logs

```bash
docker compose --env-file .env.docker ps
docker compose --env-file .env.docker logs -f app
```

## 4. Rebuild setelah update code

```bash
docker compose --env-file .env.docker up -d --build app && docker image prune -f
```

Migration baru akan otomatis diapply saat container restart — tidak perlu langkah manual.

## 5. Run Prisma/schema atau seed manual ke Supabase

Karena database memakai Supabase, jangan otomatis reset/drop data di entrypoint.
Kalau butuh sync schema manual:

```bash
docker compose --env-file .env.docker exec app node node_modules/prisma/build/index.js db push --skip-generate
```

Kalau butuh seed blog manual:

```bash
docker compose --env-file .env.docker exec app node node_modules/.bin/tsx scripts/seed-blog-articles.ts
```

## 6. Stop

```bash
docker compose --env-file .env.docker down
```

## 7. Line ending (Windows)

`docker-entrypoint.sh` harus pakai line ending Unix (LF). Pastikan git config:

```bash
git config core.autocrlf false
```

Atau sudah ada di `.gitattributes`:

```
docker-entrypoint.sh text eol=lf
```

