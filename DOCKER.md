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
DATABASE_URL=postgresql://postgres.xxxxx:PASSWORD@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1
DIRECT_URL=postgresql://postgres.xxxxx:PASSWORD@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
```

Catatan:
- `DATABASE_URL` pakai Supabase pooler untuk runtime app.
- `DIRECT_URL` opsional untuk runtime, tapi berguna kalau mau `prisma db push` atau seeding.
- Jangan commit `.env.docker`.

## 2. Build dan run

```bash
docker compose --env-file .env.docker up -d --build
```

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
