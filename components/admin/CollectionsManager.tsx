"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { COLLECTION_TYPES } from "@/types";
import { EditIcon, TrashIcon } from "@/components/Icons";
import type { ICollection } from "@/types";

const EMPTY = {
  name: "",
  slug: "",
  description: "",
  urduTagline: "",
  coverImage: "",
  type: "occasion" as ICollection["type"],
  isVisible: true,
};

export default function CollectionsManager() {
  const [collections, setCollections] = useState<ICollection[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({ ...EMPTY });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/collections");
    setCollections(await res.json());
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  function startNew() {
    setEditing("new");
    setForm({ ...EMPTY });
  }

  function startEdit(c: ICollection) {
    setEditing(c._id);
    setForm({
      name: c.name,
      slug: c.slug,
      description: c.description,
      urduTagline: c.urduTagline || "",
      coverImage: c.coverImage,
      type: c.type,
      isVisible: c.isVisible,
    });
  }

  async function uploadCover(file: File) {
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
        setForm((f) => ({ ...f, coverImage: data.url }));
      } else {
        // Fallback to local preview if Cloudinary isn't configured.
        setForm((f) => ({ ...f, coverImage: reader.result as string }));
      }
      setUploading(false);
    };
    reader.readAsDataURL(file);
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const isNew = editing === "new";
    await fetch(isNew ? "/api/collections" : `/api/collections/${editing}`, {
      method: isNew ? "POST" : "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    setEditing(null);
    load();
  }

  async function remove(id: string) {
    if (!confirm("Delete this collection?\nیہ کلیکشن حذف کریں؟")) return;
    await fetch(`/api/collections/${id}`, { method: "DELETE" });
    load();
  }

  const field =
    "w-full rounded-btn border border-blush-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-gold";

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* List */}
      <div className="space-y-3 lg:col-span-2">
        <button
          onClick={startNew}
          className="btn-gold w-full justify-center text-sm sm:w-auto"
        >
          + New Collection · نیا کلیکشن
        </button>

        {loading ? (
          <p className="text-muted">Loading… · لوڈ ہو رہا ہے…</p>
        ) : collections.length === 0 ? (
          <div className="card-surface p-8 text-center text-muted">
            <p>No collections yet.</p>
            <p className="urdu mt-1" lang="ur" dir="rtl">
              ابھی کوئی کلیکشن نہیں
            </p>
          </div>
        ) : (
          collections.map((c) => (
            <div
              key={c._id}
              className="card-surface flex items-center gap-4 p-4"
            >
              <span className="relative block h-16 w-20 shrink-0 overflow-hidden rounded bg-blush-border/50">
                {c.coverImage && (
                  <Image
                    src={c.coverImage}
                    alt=""
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                )}
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-ink">{c.name}</p>
                <p className="text-xs text-muted">
                  {c.type} · {c.itemCount ?? 0} items ·{" "}
                  {c.isVisible ? "Visible · دکھائی" : "Hidden · چھپا"}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => startEdit(c)}
                  className="rounded p-2 text-muted hover:text-gold"
                  aria-label="Edit"
                >
                  <EditIcon />
                </button>
                <button
                  onClick={() => remove(c._id)}
                  className="rounded p-2 text-muted hover:text-badge-red"
                  aria-label="Delete"
                >
                  <TrashIcon />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Editor */}
      <div>
        {editing ? (
          <form onSubmit={save} className="card-surface space-y-4 p-4 sm:p-5">
            <h3 className="font-display text-lg font-bold text-ink">
              {editing === "new"
                ? "New Collection · نیا کلیکشن"
                : "Edit Collection · کلیکشن تبدیل کریں"}
            </h3>

            <div>
              <label className="mb-1 flex items-center justify-between text-sm font-medium text-ink">
                <span>Cover Image</span>
                <span className="urdu text-muted" lang="ur" dir="rtl">
                  سرورق تصویر
                </span>
              </label>
              <div className="relative mb-2 aspect-[3/2] overflow-hidden rounded-btn border border-blush-border bg-background">
                {form.coverImage ? (
                  <Image
                    src={form.coverImage}
                    alt=""
                    fill
                    sizes="300px"
                    className="object-cover"
                  />
                ) : (
                  <span className="flex h-full items-center justify-center text-sm text-muted">
                    No image
                  </span>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  e.target.files?.[0] && uploadCover(e.target.files[0])
                }
                className="text-xs"
              />
              {uploading && (
                <p className="mt-1 text-xs text-muted">
                  Uploading… · اپلوڈ ہو رہا ہے…
                </p>
              )}
            </div>

            <div>
              <label className="mb-1 flex items-center justify-between text-sm font-medium text-ink">
                <span>Name *</span>
                <span className="urdu text-muted" lang="ur" dir="rtl">
                  نام
                </span>
              </label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={field}
                placeholder="Eid Collection 2025"
              />
            </div>

            <div>
              <label className="mb-1 flex items-center justify-between text-sm font-medium text-ink">
                <span>Description</span>
                <span className="urdu text-muted" lang="ur" dir="rtl">
                  تفصیل
                </span>
              </label>
              <textarea
                rows={3}
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className={field}
              />
            </div>

            <div>
              <label className="mb-1 flex items-center justify-between text-sm font-medium text-ink">
                <span>Urdu Tagline</span>
                <span className="urdu text-muted" lang="ur" dir="rtl">
                  اردو ٹیگ لائن
                </span>
              </label>
              <input
                dir="rtl"
                lang="ur"
                value={form.urduTagline}
                onChange={(e) =>
                  setForm({ ...form, urduTagline: e.target.value })
                }
                className={`${field} urdu`}
                placeholder="خوبصورتی روایت سے ملتی ہے"
              />
            </div>

            <div>
              <label className="mb-1 flex items-center justify-between text-sm font-medium text-ink">
                <span>Type</span>
                <span className="urdu text-muted" lang="ur" dir="rtl">
                  قسم
                </span>
              </label>
              <select
                value={form.type}
                onChange={(e) =>
                  setForm({
                    ...form,
                    type: e.target.value as ICollection["type"],
                  })
                }
                className={field}
              >
                {COLLECTION_TYPES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>

            <label className="flex items-center justify-between gap-3 text-sm">
              <span className="flex flex-col">
                <span className="text-ink">Visible on website</span>
                <span className="urdu text-xs text-muted" lang="ur" dir="rtl">
                  ویب سائٹ پر دکھائیں
                </span>
              </span>
              <input
                type="checkbox"
                checked={form.isVisible}
                onChange={(e) =>
                  setForm({ ...form, isVisible: e.target.checked })
                }
                className="h-5 w-5 shrink-0 accent-gold"
              />
            </label>

            <div className="flex gap-2">
              <button
                type="submit"
                disabled={saving}
                className="btn-gold flex-1 py-3 disabled:opacity-60"
              >
                {saving ? "Saving…" : "Save · محفوظ کریں"}
              </button>
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="btn-outline"
              >
                Cancel · منسوخ
              </button>
            </div>
          </form>
        ) : (
          <div className="card-surface p-6 text-center text-sm text-muted">
            <p>Select a collection to edit, or create a new one.</p>
            <p className="urdu mt-1" lang="ur" dir="rtl">
              تبدیلی کے لیے کلیکشن منتخب کریں یا نیا بنائیں
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
