"use client";

import Image from "next/image";
import { useState } from "react";
import type { ISettings } from "@/types";

export default function SettingsForm({ initial }: { initial: ISettings }) {
  const [form, setForm] = useState<ISettings>(initial);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState<{ ok: boolean; msg: string } | null>(null);

  function set<K extends keyof ISettings>(key: K, value: ISettings[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function uploadHero(file: File) {
    setUploading(true);
    const reader = new FileReader();
    reader.onload = async () => {
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ file: reader.result }),
      });
      if (res.ok) {
        const data = await res.json();
        set("heroImage", data.url);
      } else {
        // Fallback to local preview if Cloudinary isn't configured.
        set("heroImage", reader.result as string);
      }
      setUploading(false);
    };
    reader.readAsDataURL(file);
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setToast(null);
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("save failed");
      setToast({ ok: true, msg: "Settings saved! · محفوظ ہو گیا" });
    } catch {
      setToast({ ok: false, msg: "Save failed · محفوظ نہیں ہوا" });
    } finally {
      setSaving(false);
    }
  }

  const field =
    "w-full rounded-btn border border-blush-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-gold";

  return (
    <form onSubmit={save} className="max-w-3xl space-y-6">
      {/* Announcement bar */}
      <section className="card-surface space-y-4 p-4 sm:p-5">
        <div className="flex items-baseline justify-between gap-2">
          <h2 className="font-display text-lg font-bold text-ink">
            Announcement Bar
          </h2>
          <span className="urdu text-sm text-muted" lang="ur" dir="rtl">
            اوپر کی پٹی
          </span>
        </div>
        <p className="text-xs text-muted">
          The gold strip at the very top of the website.
          <span className="urdu mt-0.5 block" lang="ur" dir="rtl">
            ویب سائٹ کے سب سے اوپر سنہری پٹی پر یہ پیغام دکھے گا۔
          </span>
        </p>

        <label className="flex items-center justify-between gap-3 text-sm">
          <span className="flex flex-col">
            <span className="text-ink">Show announcement bar</span>
            <span className="urdu text-xs text-muted" lang="ur" dir="rtl">
              پٹی دکھائیں
            </span>
          </span>
          <input
            type="checkbox"
            checked={form.announcementEnabled}
            onChange={(e) => set("announcementEnabled", e.target.checked)}
            className="h-5 w-5 shrink-0 accent-gold"
          />
        </label>

        <div>
          <label className="mb-1.5 flex items-center justify-between text-sm font-medium text-ink">
            <span>Announcement text</span>
            <span className="urdu text-muted" lang="ur" dir="rtl">
              پیغام
            </span>
          </label>
          <textarea
            rows={2}
            value={form.announcementText}
            onChange={(e) => set("announcementText", e.target.value)}
            className={field}
            placeholder="✨ Eid Collection 2025 is live — Free delivery…"
          />
        </div>
      </section>

      {/* Hero section */}
      <section className="card-surface space-y-4 p-4 sm:p-5">
        <div className="flex items-baseline justify-between gap-2">
          <h2 className="font-display text-lg font-bold text-ink">
            Home Hero
          </h2>
          <span className="urdu text-sm text-muted" lang="ur" dir="rtl">
            ہوم پیج کی مرکزی تصویر
          </span>
        </div>

        {/* Hero image */}
        <div>
          <label className="mb-1.5 flex items-center justify-between text-sm font-medium text-ink">
            <span>Hero image</span>
            <span className="urdu text-muted" lang="ur" dir="rtl">
              مرکزی تصویر
            </span>
          </label>
          <div className="relative mb-2 aspect-[4/3] max-w-sm overflow-hidden rounded-card border border-blush-border bg-background">
            {form.heroImage ? (
              <Image
                src={form.heroImage}
                alt="Hero preview"
                fill
                sizes="384px"
                className="object-cover"
              />
            ) : (
              <span className="flex h-full items-center justify-center text-sm text-muted">
                No image
              </span>
            )}
          </div>
          <label className="btn-outline inline-flex cursor-pointer text-sm">
            {uploading ? "Uploading… · اپلوڈ…" : "Upload image · تصویر اپلوڈ کریں"}
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) =>
                e.target.files?.[0] && uploadHero(e.target.files[0])
              }
            />
          </label>
        </div>

        {/* Badge */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 flex items-center justify-between text-sm font-medium text-ink">
              <span>Image badge — title</span>
              <span className="urdu text-muted" lang="ur" dir="rtl">
                تصویر کا عنوان
              </span>
            </label>
            <input
              value={form.heroBadgeTitle}
              onChange={(e) => set("heroBadgeTitle", e.target.value)}
              className={field}
              placeholder="Eid Collection 2025"
            />
          </div>
          <div>
            <label className="mb-1.5 flex items-center justify-between text-sm font-medium text-ink">
              <span>Image badge — subtitle</span>
              <span className="urdu text-muted" lang="ur" dir="rtl">
                ذیلی عنوان
              </span>
            </label>
            <input
              value={form.heroBadgeSubtitle}
              onChange={(e) => set("heroBadgeSubtitle", e.target.value)}
              className={field}
              placeholder="Lawn · Chiffon · Silk"
            />
          </div>
        </div>
      </section>

      <div className="sticky bottom-0 -mx-4 border-t border-blush-border bg-background/95 px-4 py-3 backdrop-blur sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:p-0">
        <button
          type="submit"
          disabled={saving}
          className="btn-gold w-full justify-center py-3.5 disabled:opacity-60 sm:w-auto"
        >
          {saving ? "Saving…" : "Save Settings · محفوظ کریں"}
        </button>
        {toast && (
          <p
            className={`mt-2 text-sm ${
              toast.ok ? "text-badge-green" : "text-badge-red"
            }`}
          >
            {toast.msg}
          </p>
        )}
      </div>
    </form>
  );
}
