import "server-only";

import postgres from "postgres";

/**
 * Shared Postgres connection pool (DATABASE_URL). The schema lives in db/schema.sql (`npm run db:migrate`).
 * Kept on globalThis so dev hot-reloads don't open a new pool each time.
 */

const globalForDb = globalThis as typeof globalThis & { sql?: postgres.Sql };

export function isDatabaseConfigured() {
  return Boolean(process.env.DATABASE_URL);
}

export function db(): postgres.Sql {
  if (!globalForDb.sql) {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("DATABASE_URL must be set.");
    globalForDb.sql = postgres(url, { max: 5, idle_timeout: 30 });
  }
  return globalForDb.sql;
}
