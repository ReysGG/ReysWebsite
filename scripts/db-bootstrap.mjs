// Bootstraps an EMPTY database (e.g. the self-hosted Postgres container) before `prisma migrate deploy`.
// The early migrations ALTER tables that were originally created with `db push`, so they cannot run on
// an empty database. If the "Post" table is missing we create the full current schema, apply the
// raw-SQL extras (full-text search), and mark every migration as applied. Existing databases are untouched.
import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import pg from "pg";

const url = process.env.DIRECT_URL || process.env.DATABASE_URL;
if (!url) {
  console.log("[db-bootstrap] DATABASE_URL not set, skipping.");
  process.exit(0);
}

const prisma = (args) =>
  execFileSync("node", ["node_modules/prisma/build/index.js", ...args], {
    encoding: "utf8",
    env: { ...process.env, DATABASE_URL: url },
    stdio: ["ignore", "pipe", "inherit"],
  });

const client = new pg.Client({ connectionString: url });
await client.connect();
try {
  const { rows } = await client.query(`SELECT to_regclass('public."Post"') IS NOT NULL AS exists`);
  if (rows[0].exists) {
    console.log("[db-bootstrap] Existing schema found, nothing to do.");
    process.exit(0);
  }

  console.log("[db-bootstrap] Empty database detected, creating schema...");
  const schemaSql = prisma(["migrate", "diff", "--from-empty", "--to-schema", "prisma/schema.prisma", "--script"])
    .split("\n")
    .filter((line) => !/^(◇|Loaded Prisma config|.*injected env)/.test(line))
    .join("\n");
  await client.query(schemaSql);

  const migrationsDir = "prisma/migrations";
  const migrations = readdirSync(migrationsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  // Raw SQL not expressed in schema.prisma (generated tsvector column, trigram index).
  const extras = migrations.filter((name) => name.includes("full_text_search"));
  for (const name of extras) {
    await client.query(readFileSync(path.join(migrationsDir, name, "migration.sql"), "utf8"));
  }
  await client.end();

  for (const name of migrations) {
    prisma(["migrate", "resolve", "--applied", name]);
  }
  console.log(`[db-bootstrap] Schema created; ${migrations.length} migrations marked as applied.`);
} finally {
  await client.end().catch(() => undefined);
}
