"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/products/ProductCard";
import type { IProduct } from "@/types";

export default function WishlistPage() {
  const [items, setItems] = useState<IProduct[] | null>(null);

  useEffect(() => {
    document.title = "Wishlist — Hamza Cloth House";
    let ids: string[] = [];
    try {
      ids = JSON.parse(localStorage.getItem("hch-wishlist") || "[]");
    } catch {
      ids = [];
    }
    if (!ids.length) {
      setItems([]);
      return;
    }
    fetch("/api/products?limit=100")
      .then((r) => r.json())
      .then((d) => {
        const set = new Set(ids);
        setItems(
          (d.products || []).filter((p: IProduct) => set.has(String(p._id))),
        );
      })
      .catch(() => setItems([]));
  }, []);

  return (
    <div className="container-site py-6">
      <div className="py-6 text-center sm:py-8">
        <p className="rule-eyebrow mb-3">Saved for Later</p>
        <h1 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-[2.6rem]">
          My Wishlist
        </h1>
      </div>

      {items === null ? (
        <p className="py-20 text-center text-muted">Loading your wishlist…</p>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
          <p className="text-muted">
            You haven&apos;t saved anything yet. Tap the heart on a product to
            add it here.
          </p>
          <Link href="/products" className="btn-gold">
            Browse the Collection
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-3 gap-y-6 pb-10 md:grid-cols-3 lg:grid-cols-4">
          {items.map((p, i) => (
            <ProductCard key={String(p._id)} product={p} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
