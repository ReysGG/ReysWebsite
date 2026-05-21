<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Project Architecture Rules

### Data access boundaries

- UI components in `src/components/**` and `src/features/**/components/**` must not import `@/lib/db`, Prisma clients, or database adapters directly.
- Route pages in `src/app/**/page.tsx` should stay thin. They may read `params` and `searchParams`, call a service/data function, handle `notFound()` or redirects, and pass plain props to UI components.
- Put database reads and dashboard query composition in one of these layers:
  - `src/features/<feature>/data/**` for public/read model data used by the feature.
  - `src/features/<feature>/services/**` for admin dashboards, mutations, transactions, and cross-query orchestration.
  - `src/lib/**` only for shared app-level configuration/data helpers used across features.
- Server actions in `src/features/**/actions/**` should handle auth, form parsing if needed, cache revalidation, and redirects. Non-trivial database work should be delegated to a service function.
- If a service imports `@/lib/db`, add `import "server-only";` at the top so it cannot be pulled into client bundles.

### Query and scalability rules

- Select only fields needed by the caller. Avoid `findMany()` without `select` on user-facing or admin listing pages.
- Prefer server-side search/filter/pagination over client-only filtering for admin lists that can grow.
- Use `db.$transaction([...])` for multiple Prisma queries that form one dashboard result. Do not use it with non-Prisma promises.
- Avoid unnecessary read-before-write queries. Use single updates, `updateMany`, raw SQL, or database constraints when they are simpler and safe.
- Build list services around explicit return types so UI components do not depend on Prisma model internals.
- For public cached data, use tags/revalidation consistently and revalidate both list and dynamic detail routes when mutations affect them.

### UI/component rules

- Client components should receive serializable props and call server actions or API routes for mutations/uploads.
- Keep presentation components focused on rendering, local interaction state, and form UX. Do not mix dashboard aggregation or Prisma query logic into component files.
- When a form has live preview state, keep derived values computed during render or via `useMemo`; avoid setting state synchronously inside `useEffect`.

## Deployment Safety Rules

Setiap kali kamu membuat perubahan pada file-file berikut, kamu **wajib** memeriksa apakah perubahan tersebut bisa menyebabkan kegagalan saat deployment ke VPS/Docker. Jika iya, perbaiki sekaligus atau beri peringatan eksplisit ke user.

### File yang wajib dicek dampak deployment-nya

- `prisma/schema.prisma` — perubahan model/datasource bisa break `prisma migrate deploy`
- `prisma.config.ts` — diload otomatis oleh Prisma 7 CLI; jika import package baru, pastikan package ada di `dependencies` (bukan hanya `devDependencies`)
- `package.json` — jika menambah/hapus dependency, pastikan tersedia di production image
- `Dockerfile` — jika ada file baru yang dibutuhkan saat runtime, pastikan di-COPY ke runner stage
- `docker-entrypoint.sh` — script ini jalan pertama kali di container; pastikan env vars yang dibutuhkan tersedia
- `next.config.ts` / `next.config.js` — perubahan output mode, headers, atau env vars bisa break build
- `.env.example` — jika menambah env var baru yang wajib, tambahkan ke sini dan ingatkan user untuk update `.env.docker` di VPS

### Aturan khusus Prisma + Docker

- `prisma.config.ts` menggunakan `dotenv` untuk load `.env` / `.env.local` — file ini **tidak ada** di dalam container. Env vars di container datang dari `env_file: .env.docker`. Jangan andalkan dotenv untuk production.
- `prisma migrate deploy` di container harus mendapat `DATABASE_URL` atau `DIRECT_URL` langsung dari environment, bukan dari dotenv.
- `prisma.config.ts` harus di-COPY ke runner stage di Dockerfile agar Prisma 7 bisa menemukannya.
- Setiap package yang di-import oleh `prisma.config.ts` harus ada di `dependencies`, bukan `devDependencies`.
- Gunakan `DIRECT_URL` untuk migrate (bypass pgBouncer), `DATABASE_URL` untuk runtime app.

### Checklist sebelum selesai

Jika perubahan yang kamu buat menyentuh salah satu file di atas, tambahkan catatan singkat ke response kamu:

> "Perubahan ini mempengaruhi deployment. Pastikan: [list hal yang perlu dilakukan user di VPS]"
