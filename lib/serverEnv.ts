import fs from "fs";
import path from "path";

/**
 * Server-side env access with an optional gitignored fallback file.
 *
 * Lookup order:
 *   1. process.env[key]            (real env / .env.local — preferred)
 *   2. env.fallback.json at repo root  (gitignored — never committed)
 *
 * This lets the app keep running even when no .env file is present, while
 * keeping real secrets out of version control. Server-only (uses fs).
 */
let fileFallback: Record<string, string> = {};
try {
  const p = path.join(process.cwd(), "env.fallback.json");
  if (fs.existsSync(p)) {
    fileFallback = JSON.parse(fs.readFileSync(p, "utf8")) as Record<
      string,
      string
    >;
  }
} catch {
  // Missing or malformed fallback file — fall through to process.env only.
}

export function serverEnv(key: string): string | undefined {
  return process.env[key] ?? fileFallback[key];
}
