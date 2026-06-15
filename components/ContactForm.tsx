"use client";

import { useState } from "react";
import { buildWhatsAppLink } from "@/lib/constants";
import { WhatsAppIcon } from "@/components/Icons";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const text = `Hi Hamza Cloth House!%0A%0AName: ${form.name}%0AEmail: ${form.email}%0A%0A${form.message}`;
    // buildWhatsAppLink encodes; pre-format then decode placeholders.
    const message = `Hi Hamza Cloth House!\n\nName: ${form.name}\nEmail: ${form.email}\n\n${form.message}`;
    void text;
    window.open(buildWhatsAppLink(message), "_blank", "noopener,noreferrer");
  }

  const field =
    "w-full rounded-btn border border-blush-border bg-surface px-4 py-3 text-sm outline-none focus:border-gold";

  return (
    <form onSubmit={submit} className="card-surface space-y-4 p-6">
      <h3 className="font-display text-lg font-bold text-ink">
        Send us a message
      </h3>
      <div>
        <label className="mb-1 block text-sm text-ink">Name</label>
        <input
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className={field}
          placeholder="Your name"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm text-ink">Email</label>
        <input
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className={field}
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm text-ink">Message</label>
        <textarea
          required
          rows={4}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className={field}
          placeholder="How can we help you?"
        />
      </div>
      <button type="submit" className="btn-whatsapp w-full">
        <WhatsAppIcon width={18} height={18} /> Send via WhatsApp
      </button>
    </form>
  );
}
