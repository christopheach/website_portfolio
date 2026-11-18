/**
 * Creates or updates the database tables from db/schema.sql.
 *
 *   npm run db:migrate
 *
 * Needs DATABASE_URL (read from .env.local by the npm script, or from the environment in production).
 */
import { readFile } from "node:fs/promises";
import path from "node:path";
import postgres from "postgres";

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL must be set (see .env.example).");
  process.exit(1);
}

const sql = postgres(process.env.DATABASE_URL, { max: 1, onnotice: () => {} });
try {
  const schema = await readFile(path.resolve(import.meta.dirname, "..", "db", "schema.sql"), "utf8");
  await sql.unsafe(schema);
  console.log("Database schema is up to date.");
} catch (error) {
  console.error("Migration failed:", error.message);
  process.exitCode = 1;
} finally {
  await sql.end();
}
