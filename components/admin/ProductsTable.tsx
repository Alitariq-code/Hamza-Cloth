"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { formatPKR } from "@/lib/constants";
import { EditIcon, TrashIcon } from "@/components/Icons";
import type { IProduct } from "@/types";

export default function ProductsTable() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const load = useCallback(async () => {
    setLoading(true);
    const sp = new URLSearchParams({ page: String(page), limit: "20" });
    if (search.trim()) sp.set("search", search.trim());
    const res = await fetch(`/api/products?${sp.toString()}`);
    const data = await res.json();
    setProducts(data.products || []);
    setPages(data.pages || 1);
    setTotal(data.total || 0);
    setSelected(new Set());
    setLoading(false);
  }, [page, search]);

  useEffect(() => {
    const t = setTimeout(load, search ? 300 : 0);
    return () => clearTimeout(t);
  }, [load, search]);

  async function toggleVisible(p: IProduct) {
    // Optimistic update
    setProducts((prev) =>
      prev.map((x) =>
        x._id === p._id ? { ...x, isVisible: !x.isVisible } : x,
      ),
    );
    await fetch(`/api/products/${p._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isVisible: !p.isVisible }),
    });
  }

  async function remove(id: string) {
    if (
      !confirm(
        "Delete this product permanently?\nکیا آپ واقعی یہ پروڈکٹ حذف کرنا چاہتے ہیں؟",
      )
    )
      return;
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    load();
  }

  function toggleSelect(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  async function bulk(action: "hide" | "delete") {
    if (selected.size === 0) return;
    const ids = Array.from(selected);
    if (
      action === "delete" &&
      !confirm(`Delete ${ids.length} products?\n${ids.length} پروڈکٹس حذف کریں؟`)
    )
      return;
    await Promise.all(
      ids.map((id) =>
        action === "delete"
          ? fetch(`/api/products/${id}`, { method: "DELETE" })
          : fetch(`/api/products/${id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ isVisible: false }),
            }),
      ),
    );
    load();
  }

  /** Reusable on/off visibility switch. */
  function VisibilityToggle({ p }: { p: IProduct }) {
    return (
      <button
        onClick={() => toggleVisible(p)}
        aria-label="Toggle visibility"
        className={`relative h-7 w-12 shrink-0 rounded-pill transition ${
          p.isVisible ? "bg-badge-green" : "bg-blush-border"
        }`}
      >
        <span
          className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-all ${
            p.isVisible ? "left-[22px]" : "left-0.5"
          }`}
        />
      </button>
    );
  }

  function Badges({ p }: { p: IProduct }) {
    return (
      <div className="flex flex-wrap gap-1">
        {p.isNewArrival && (
          <span className="badge bg-badge-green/15 text-badge-green">New</span>
        )}
        {p.isOnSale && (
          <span className="badge bg-badge-red/15 text-badge-red">Sale</span>
        )}
        {p.isFeatured && (
          <span className="badge bg-gold/15 text-gold">Feat</span>
        )}
      </div>
    );
  }

  return (
    <div>
      {/* Toolbar */}
      <div className="mb-4 space-y-3">
        <input
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
          placeholder="Search products… · پروڈکٹ تلاش کریں"
          className="w-full rounded-btn border border-blush-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-gold sm:max-w-xs"
        />
        <div className="flex flex-wrap items-center gap-2">
          {selected.size > 0 && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted">
                {selected.size} selected · منتخب
              </span>
              <button
                onClick={() => bulk("hide")}
                className="rounded-btn border border-blush-border px-3 py-1.5 hover:border-gold"
              >
                Hide · چھپائیں
              </button>
              <button
                onClick={() => bulk("delete")}
                className="rounded-btn border border-badge-red px-3 py-1.5 text-badge-red hover:bg-badge-red hover:text-white"
              >
                Delete · حذف
              </button>
            </div>
          )}
          <span className="ml-auto text-sm text-muted">
            {total} total · کل {total}
          </span>
        </div>
      </div>

      {loading ? (
        <div className="card-surface p-10 text-center text-muted">
          Loading… · لوڈ ہو رہا ہے…
        </div>
      ) : products.length === 0 ? (
        <div className="card-surface p-10 text-center text-muted">
          <p>No products found.</p>
          <p className="urdu mt-1" lang="ur" dir="rtl">
            کوئی پروڈکٹ نہیں ملا
          </p>
        </div>
      ) : (
        <>
          {/* ---- Mobile: card list ---- */}
          <div className="space-y-3 lg:hidden">
            {products.map((p) => (
              <div key={p._id} className="card-surface p-3">
                <div className="flex gap-3">
                  <input
                    type="checkbox"
                    checked={selected.has(p._id)}
                    onChange={() => toggleSelect(p._id)}
                    aria-label={`Select ${p.name}`}
                    className="mt-1 h-4 w-4 shrink-0 accent-gold"
                  />
                  <span className="relative block h-20 w-16 shrink-0 overflow-hidden rounded bg-blush-border/50">
                    {p.images?.[0] && (
                      <Image
                        src={p.images[0]}
                        alt=""
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 font-medium text-ink">{p.name}</p>
                    <p className="mt-0.5 font-semibold text-gold">
                      {formatPKR(p.salePrice || p.price)}
                    </p>
                    <p className="text-xs text-muted">
                      {p.fabric} · {p.category}
                    </p>
                    <div className="mt-1.5">
                      <Badges p={p} />
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-blush-border/60 pt-3">
                  <div className="flex items-center gap-2">
                    <VisibilityToggle p={p} />
                    <span className="text-xs text-muted">
                      {p.isVisible ? "Visible · دکھائی" : "Hidden · چھپا"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/products/${p._id}/edit`}
                      className="flex items-center gap-1 rounded-btn border border-blush-border px-3 py-2 text-sm text-ink"
                    >
                      <EditIcon /> Edit · تبدیل
                    </Link>
                    <button
                      onClick={() => remove(p._id)}
                      aria-label="Delete"
                      className="rounded-btn border border-blush-border p-2 text-muted hover:border-badge-red hover:text-badge-red"
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ---- Desktop: table ---- */}
          <div className="hidden lg:block">
            <div className="card-surface overflow-x-auto">
              <table className="w-full min-w-[760px] text-sm">
                <thead className="border-b border-blush-border text-left text-muted">
                  <tr>
                    <th className="px-3 py-3">
                      <input
                        type="checkbox"
                        aria-label="Select all"
                        checked={
                          products.length > 0 &&
                          selected.size === products.length
                        }
                        onChange={(e) =>
                          setSelected(
                            e.target.checked
                              ? new Set(products.map((p) => p._id))
                              : new Set(),
                          )
                        }
                      />
                    </th>
                    <th className="px-3 py-3 font-medium">Product · پروڈکٹ</th>
                    <th className="px-3 py-3 font-medium">Price · قیمت</th>
                    <th className="px-3 py-3 font-medium">Fabric · کپڑا</th>
                    <th className="px-3 py-3 font-medium">Category · قسم</th>
                    <th className="px-3 py-3 font-medium">Badges</th>
                    <th className="px-3 py-3 font-medium">Visible · دکھائیں</th>
                    <th className="px-3 py-3 font-medium">Actions · آپشن</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr
                      key={p._id}
                      className="border-b border-blush-border/60 last:border-0"
                    >
                      <td className="px-3 py-3">
                        <input
                          type="checkbox"
                          checked={selected.has(p._id)}
                          onChange={() => toggleSelect(p._id)}
                          aria-label={`Select ${p.name}`}
                        />
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-3">
                          <span className="relative block h-12 w-10 shrink-0 overflow-hidden rounded bg-blush-border/50">
                            {p.images?.[0] && (
                              <Image
                                src={p.images[0]}
                                alt=""
                                fill
                                sizes="40px"
                                className="object-cover"
                              />
                            )}
                          </span>
                          <span className="line-clamp-1 font-medium text-ink">
                            {p.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-muted">
                        {formatPKR(p.salePrice || p.price)}
                      </td>
                      <td className="px-3 py-3 text-muted">{p.fabric}</td>
                      <td className="px-3 py-3 text-muted">{p.category}</td>
                      <td className="px-3 py-3">
                        <Badges p={p} />
                      </td>
                      <td className="px-3 py-3">
                        <VisibilityToggle p={p} />
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/admin/products/${p._id}/edit`}
                            className="rounded p-1.5 text-muted transition hover:bg-background hover:text-gold"
                            aria-label="Edit"
                          >
                            <EditIcon />
                          </Link>
                          <button
                            onClick={() => remove(p._id)}
                            className="rounded p-1.5 text-muted transition hover:bg-background hover:text-badge-red"
                            aria-label="Delete"
                          >
                            <TrashIcon />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Pagination */}
      {pages > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="rounded-btn border border-blush-border px-3 py-2 text-sm disabled:opacity-40"
          >
            ← Prev · پچھلا
          </button>
          <span className="text-sm text-muted">
            {page} / {pages}
          </span>
          <button
            disabled={page >= pages}
            onClick={() => setPage((p) => p + 1)}
            className="rounded-btn border border-blush-border px-3 py-2 text-sm disabled:opacity-40"
          >
            Next · اگلا →
          </button>
        </div>
      )}
    </div>
  );
}
