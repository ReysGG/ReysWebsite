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
