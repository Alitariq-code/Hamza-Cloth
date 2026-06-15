"use client";

import { Suspense, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

/**
 * Reduce any callbackUrl to a same-origin relative path. This keeps the user
 * on whatever host they logged in from (e.g. an ngrok / proxy URL) instead of
 * jumping to the absolute host baked into the callbackUrl (often localhost).
 */
function safeCallbackPath(raw: string | null): string {
  const fallback = "/admin/dashboard";
  if (!raw) return fallback;
  try {
    // Absolute URL → keep only path + query; relative → use as-is.
    const path = raw.startsWith("http")
      ? new URL(raw).pathname + new URL(raw).search
      : raw;
    return path.startsWith("/admin") ? path : fallback;
  } catch {
    return fallback;
  }
}

function LoginInner() {
  const router = useRouter();
  const callbackUrl = safeCallbackPath(useSearchParams().get("callbackUrl"));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    if (res?.error) {
      setError("Invalid email or password.");
    } else {
      router.push(callbackUrl);
      router.refresh();
    }
  }

  const field =
    "w-full rounded-btn border border-blush-border bg-surface px-4 py-3 text-sm outline-none focus:border-gold";

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-rose/20 via-background to-gold/10 px-4">
      <div className="card-surface w-full max-w-md p-8">
        <div className="mb-8 text-center">
          <Link
            href="/"
            className="font-display text-2xl font-bold text-ink"
          >
            Hamza <span className="text-gold">Cloth House</span>
          </Link>
          <p className="mt-2 text-sm text-muted">Admin Panel Login</p>
          <p className="urdu text-sm text-muted" lang="ur" dir="rtl">
            ایڈمن پینل میں داخل ہوں
          </p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="mb-1 flex items-center justify-between text-sm font-medium text-ink">
              <span>Email</span>
              <span className="urdu text-muted" lang="ur" dir="rtl">
                ای میل
              </span>
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={field}
              placeholder="admin@hamzaclothing.com"
            />
          </div>
          <div>
            <label className="mb-1 flex items-center justify-between text-sm font-medium text-ink">
              <span>Password</span>
              <span className="urdu text-muted" lang="ur" dir="rtl">
                پاس ورڈ
              </span>
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={field}
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="rounded-btn bg-badge-red/10 px-3 py-2 text-sm text-badge-red">
              {error}
              <span className="urdu mt-1 block" lang="ur" dir="rtl">
                ای میل یا پاس ورڈ غلط ہے
              </span>
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-gold w-full disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign In · لاگ ان کریں"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-muted">
          ← <Link href="/" className="hover:text-gold">Back to store · سائٹ پر واپس</Link>
        </p>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense>
      <LoginInner />
    </Suspense>
  );
}
