import "server-only";

import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Single-owner backoffice auth: one password (ADMIN_PASSWORD) and a signed, httpOnly session cookie.
 * The cookie holds only an expiry date and an HMAC of it, so nothing secret is stored client-side.
 */

const COOKIE_NAME = "sc_admin";
const SESSION_DAYS = 7;

function secret() {
  const value = process.env.ADMIN_SESSION_SECRET;
  if (!value || value.length < 32) throw new Error("ADMIN_SESSION_SECRET must be set (32+ characters).");
  return value;
}

function sign(payload: string) {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

/** Constant-time comparison that also works for strings of different lengths. */
function safeEqual(a: string, b: string) {
  const hash = (value: string) => createHash("sha256").update(value).digest();
  return timingSafeEqual(hash(a), hash(b));
}

export function isPasswordValid(password: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) throw new Error("ADMIN_PASSWORD must be set.");
  return safeEqual(password, expected);
}

export async function createSession() {
  const expires = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);
  const payload = String(expires.getTime());
  (await cookies()).set(COOKIE_NAME, `${payload}.${sign(payload)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires,
  });
}

export async function destroySession() {
  (await cookies()).delete(COOKIE_NAME);
}

export async function isAuthenticated() {
  const value = (await cookies()).get(COOKIE_NAME)?.value;
  if (!value) return false;
  const [payload, signature] = value.split(".");
  if (!payload || !signature || !safeEqual(signature, sign(payload))) return false;
  return Number(payload) > Date.now();
}

/** Call at the top of every admin page and server action. Redirects to the login page when signed out. */
export async function requireAdmin() {
  if (!(await isAuthenticated())) redirect("/admin/login");
}
