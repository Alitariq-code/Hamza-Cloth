"use client";

import { useState } from "react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function subscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    // Showcase site — store locally; wire up to a provider later.
    setDone(true);
    setEmail("");
  }

  return (
    <section className="container-site py-14">
      <div className="rounded-card bg-gradient-to-br from-rose/25 via-background to-gold/15 px-6 py-14 text-center shadow-gold sm:px-12">
        <h2 className="font-display text-h2 font-bold text-ink">
          Stay in the Loop
        </h2>
        <p className="urdu mt-1 text-base text-muted" lang="ur" dir="rtl">
          نئی آمد اور سیل کی اطلاع پائیں
        </p>
        <p className="mx-auto mt-3 max-w-md text-muted">
          Be the first to know about new drops and exclusive sales.
        </p>

        {done ? (
          <p className="mt-6 font-medium text-badge-green">
            🌸 Thank you for subscribing!
          </p>
        ) : (
          <form
            onSubmit={subscribe}
            className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full rounded-btn border border-blush-border bg-surface px-4 py-3 text-sm outline-none focus:border-gold"
            />
            <button type="submit" className="btn-gold shrink-0">
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
