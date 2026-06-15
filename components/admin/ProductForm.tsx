"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ImageUploader from "./ImageUploader";
import { slugify } from "@/lib/constants";
import {
  FABRICS,
  CATEGORIES,
  SEASONS,
  PRICE_RANGES,
  SIZE_OPTIONS,
} from "@/types";
import type { IProduct, ICollection } from "@/types";

interface Props {
  product?: IProduct;
  collections: ICollection[];
}

/** Bilingual (English + Urdu) form field label. */
function FieldLabel({ en, ur }: { en: string; ur: string }) {
  return (
    <label className="mb-1.5 flex items-center justify-between gap-2 text-sm font-medium text-ink">
      <span>{en}</span>
      <span className="urdu text-muted" lang="ur" dir="rtl">
        {ur}
      </span>
    </label>
  );
}

/** Bilingual section heading. */
function SectionTitle({ en, ur }: { en: string; ur: string }) {
  return (
    <div className="flex items-baseline justify-between gap-2">
      <h2 className="font-display text-lg font-bold text-ink">{en}</h2>
      <span className="urdu text-sm text-muted" lang="ur" dir="rtl">
        {ur}
      </span>
    </div>
  );
}

type FormState = {
  name: string;
  slug: string;
  description: string;
  price: string;
  salePrice: string;
  images: string[];
  fabric: string;
  sizes: string[];
  colors: string[];
  category: string;
  season: string;
  priceRange: string;
  collections: string[];
  whatsappMessage: string;
  isNewArrival: boolean;
  isFeatured: boolean;
  isOnSale: boolean;
  isVisible: boolean;
};

function initial(product?: IProduct): FormState {
  return {
    name: product?.name || "",
    slug: product?.slug || "",
    description: product?.description || "",
    price: product?.price != null ? String(product.price) : "",
    salePrice: product?.salePrice != null ? String(product.salePrice) : "",
    images: product?.images || [],
    fabric: product?.fabric || "Lawn",
    sizes: product?.sizes || [],
    colors: product?.colors || [],
    category: product?.category || "Casual",
    season: product?.season || "All Season",
    priceRange: product?.priceRange || "Mid",
    collections:
      (product?.collections as ICollection[] | string[] | undefined)?.map((c) =>
        typeof c === "string" ? c : c._id,
      ) || [],
    whatsappMessage: product?.whatsappMessage || "",
    isNewArrival: product?.isNewArrival || false,
    isFeatured: product?.isFeatured || false,
    isOnSale: product?.isOnSale || false,
    isVisible: product?.isVisible ?? true,
  };
}

export default function ProductForm({ product, collections }: Props) {
  const router = useRouter();
  const isEdit = Boolean(product);
  const [form, setForm] = useState<FormState>(initial(product));
  const [slugEdited, setSlugEdited] = useState(isEdit);
  const [colorInput, setColorInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ ok: boolean; msg: string } | null>(null);

  // Auto-generate slug from name until the user edits the slug manually.
  useEffect(() => {
    if (!slugEdited) setForm((f) => ({ ...f, slug: slugify(f.name) }));
  }, [form.name, slugEdited]);

  // Auto-fill WhatsApp message from name when blank.
  useEffect(() => {
    if (!form.whatsappMessage && form.name) {
      setForm((f) => ({
        ...f,
        whatsappMessage: `Hi! I'm interested in ${f.name}. Please share availability and details.`,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.name]);

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function toggleSize(size: string) {
    set(
      "sizes",
      form.sizes.includes(size)
        ? form.sizes.filter((s) => s !== size)
        : [...form.sizes, size],
    );
  }

  function toggleCollection(id: string) {
    set(
      "collections",
      form.collections.includes(id)
        ? form.collections.filter((c) => c !== id)
        : [...form.collections, id],
    );
  }

  function addColor(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const val = colorInput.trim();
      if (val && !form.colors.includes(val)) {
        set("colors", [...form.colors, val]);
      }
      setColorInput("");
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setToast(null);

    const payload = {
      ...form,
      price: Number(form.price),
      salePrice: form.salePrice ? Number(form.salePrice) : undefined,
    };

    try {
      const res = await fetch(
        isEdit ? `/api/products/${product!._id}` : "/api/products",
        {
          method: isEdit ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Save failed");
      }
      setToast({ ok: true, msg: "Product saved!" });
      setTimeout(() => {
        router.push("/admin/products");
        router.refresh();
      }, 700);
    } catch (err) {
      setToast({
        ok: false,
        msg: err instanceof Error ? err.message : "Save failed",
      });
      setSaving(false);
    }
  }

  const field =
    "w-full rounded-btn border border-blush-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-gold";

  return (
    <form onSubmit={submit} className="grid gap-6 lg:grid-cols-3">
      {/* Main column */}
      <div className="space-y-6 lg:col-span-2">
        {/* Images */}
        <section className="card-surface p-4 sm:p-5">
          <div className="mb-3">
            <SectionTitle en="Images" ur="تصاویر" />
          </div>
          <ImageUploader
            images={form.images}
            onChange={(imgs) => set("images", imgs)}
          />
        </section>

        {/* Details */}
        <section className="card-surface space-y-4 p-4 sm:p-5">
          <SectionTitle en="Details" ur="تفصیلات" />
          <div>
            <FieldLabel en="Name *" ur="نام" />
            <input
              required
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              className={field}
              placeholder="Lawn Summer Suit Vol. 3"
            />
          </div>
          <div>
            <FieldLabel en="Slug (web link)" ur="ویب لنک" />
            <input
              value={form.slug}
              onChange={(e) => {
                setSlugEdited(true);
                set("slug", e.target.value);
              }}
              className={field}
              placeholder="lawn-summer-suit-vol-3"
            />
          </div>
          <div>
            <FieldLabel en="Description" ur="تفصیل" />
            <textarea
              rows={5}
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              className={field}
              placeholder="Describe the fabric, fit, work, and styling…"
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <FieldLabel en="Price (PKR) *" ur="قیمت (روپے)" />
              <input
                required
                type="number"
                min="0"
                value={form.price}
                onChange={(e) => set("price", e.target.value)}
                className={field}
                placeholder="2500"
              />
            </div>
            <div>
              <FieldLabel en="Sale Price (PKR)" ur="سیل قیمت" />
              <input
                type="number"
                min="0"
                value={form.salePrice}
                onChange={(e) => set("salePrice", e.target.value)}
                className={field}
                placeholder="optional"
              />
            </div>
          </div>
        </section>

        {/* Attributes */}
        <section className="card-surface space-y-4 p-4 sm:p-5">
          <SectionTitle en="Attributes" ur="خصوصیات" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <FieldLabel en="Fabric" ur="کپڑا" />
              <select
                value={form.fabric}
                onChange={(e) => set("fabric", e.target.value)}
                className={field}
              >
                {FABRICS.map((f) => (
                  <option key={f}>{f}</option>
                ))}
              </select>
            </div>
            <div>
              <FieldLabel en="Category" ur="قسم" />
              <select
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
                className={field}
              >
                {CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <FieldLabel en="Season" ur="موسم" />
              <select
                value={form.season}
                onChange={(e) => set("season", e.target.value)}
                className={field}
              >
                {SEASONS.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <FieldLabel en="Price Range" ur="قیمت کی حد" />
              <select
                value={form.priceRange}
                onChange={(e) => set("priceRange", e.target.value)}
                className={field}
              >
                {PRICE_RANGES.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Sizes */}
          <div>
            <FieldLabel en="Sizes" ur="سائز" />
            <div className="flex flex-wrap gap-2">
              {SIZE_OPTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => toggleSize(s)}
                  className={`rounded-pill border px-3 py-1.5 text-xs transition ${
                    form.sizes.includes(s)
                      ? "border-gold bg-gold text-white"
                      : "border-blush-border text-muted hover:border-gold"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div>
            <FieldLabel
              en="Colors (type & press Enter)"
              ur="رنگ (لکھ کر Enter)"
            />
            <input
              value={colorInput}
              onChange={(e) => setColorInput(e.target.value)}
              onKeyDown={addColor}
              className={field}
              placeholder="Pink, Blue, White…"
            />
            {form.colors.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {form.colors.map((c) => (
                  <span
                    key={c}
                    className="badge gap-1 bg-gold/10 text-gold"
                  >
                    {c}
                    <button
                      type="button"
                      onClick={() =>
                        set(
                          "colors",
                          form.colors.filter((x) => x !== c),
                        )
                      }
                      className="ml-1"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Sidebar column */}
      <div className="space-y-6">
        {/* Publish */}
        <section className="card-surface space-y-4 p-4 sm:p-5">
          <SectionTitle en="Publish" ur="شائع کریں" />
          {[
            { key: "isVisible", label: "Visible on website", ur: "ویب سائٹ پر دکھائیں" },
            { key: "isNewArrival", label: "New Arrival", ur: "نئی آمد" },
            { key: "isFeatured", label: "Featured / Bestseller", ur: "نمایاں / مقبول" },
            { key: "isOnSale", label: "On Sale", ur: "سیل پر" },
          ].map((t) => (
            <label
              key={t.key}
              className="flex cursor-pointer items-center justify-between gap-3 text-sm"
            >
              <span className="flex flex-col">
                <span className="text-ink">{t.label}</span>
                <span className="urdu text-xs text-muted" lang="ur" dir="rtl">
                  {t.ur}
                </span>
              </span>
              <input
                type="checkbox"
                checked={form[t.key as keyof FormState] as boolean}
                onChange={(e) =>
                  set(t.key as keyof FormState, e.target.checked as never)
                }
                className="h-5 w-5 shrink-0 accent-gold"
              />
            </label>
          ))}

          <button
            type="submit"
            disabled={saving}
            className="btn-gold w-full py-3.5 disabled:opacity-60"
          >
            {saving ? "Saving… · محفوظ ہو رہا ہے" : "Save Product · محفوظ کریں"}
          </button>
          {toast && (
            <p
              className={`text-center text-sm ${
                toast.ok ? "text-badge-green" : "text-badge-red"
              }`}
            >
              {toast.msg}
              <span className="urdu mt-0.5 block text-xs" lang="ur" dir="rtl">
                {toast.ok ? "محفوظ ہو گیا" : "کچھ غلط ہو گیا"}
              </span>
            </p>
          )}
        </section>

        {/* Collections */}
        <section className="card-surface space-y-3 p-4 sm:p-5">
          <SectionTitle en="Collections" ur="کلیکشنز" />
          {collections.length === 0 ? (
            <p className="text-xs text-muted">
              No collections yet. Create them in the Collections manager.
              <span className="urdu mt-1 block" lang="ur" dir="rtl">
                ابھی کوئی کلیکشن نہیں — کلیکشنز صفحے سے بنائیں۔
              </span>
            </p>
          ) : (
            collections.map((c) => (
              <label
                key={c._id}
                className="flex cursor-pointer items-center gap-2 text-sm"
              >
                <input
                  type="checkbox"
                  checked={form.collections.includes(c._id)}
                  onChange={() => toggleCollection(c._id)}
                  className="h-4 w-4 accent-gold"
                />
                <span className="text-ink">{c.name}</span>
              </label>
            ))
          )}
        </section>

        {/* WhatsApp message */}
        <section className="card-surface space-y-2 p-4 sm:p-5">
          <SectionTitle en="WhatsApp Message" ur="واٹس ایپ پیغام" />
          <p className="urdu text-xs text-muted" lang="ur" dir="rtl">
            یہ پیغام گاہک کے واٹس ایپ میں خود لکھا آئے گا
          </p>
          <textarea
            rows={4}
            value={form.whatsappMessage}
            onChange={(e) => set("whatsappMessage", e.target.value)}
            className={field}
          />
        </section>
      </div>
    </form>
  );
}
