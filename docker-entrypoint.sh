#!/bin/sh
set -e

echo "Running database migrations..."
# prisma.config.ts prefers DIRECT_URL for migrations (bypasses pgBouncer).
# Pass it explicitly so Prisma doesn't need to load dotenv in the container.
MIGRATE_URL="${DIRECT_URL:-$DATABASE_URL}"
DATABASE_URL="$MIGRATE_URL" npx prisma migrate deploy

echo "Starting Next.js server..."
exec node server.js
