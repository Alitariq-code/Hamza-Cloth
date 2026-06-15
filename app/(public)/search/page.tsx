"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductGrid from "@/components/products/ProductGrid";
import { ProductGridSkeleton } from "@/components/products/ProductCardSkeleton";
import { SearchIcon } from "@/components/Icons";
import type { IProduct } from "@/types";

function SearchInner() {
  const initial = useSearchParams().get("q") || "";
  const [query, setQuery] = useState(initial);
  const [results, setResults] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const term = query.trim();
    if (!term) {
      setResults([]);
      setSearched(false);
      return;
    }

    const ctrl = new AbortController();
    setLoading(true);
    const t = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/products?search=${encodeURIComponent(term)}&limit=24`,
          { signal: ctrl.signal },
        );
        const data = await res.json();
        setResults(data.products || []);
        setSearched(true);
      } catch (err) {
        if (!(err instanceof DOMException)) setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      clearTimeout(t);
      ctrl.abort();
    };
  }, [query]);

  return (
    <div className="container-site py-10">
      <h1 className="mb-6 font-display text-h1 font-bold text-ink">Search</h1>

      <div className="mx-auto mb-10 flex max-w-2xl items-center gap-3 rounded-pill border border-blush-border bg-surface px-5 py-3 shadow-gold">
        <SearchIcon className="text-muted" />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, fabric, or description…"
          className="w-full bg-transparent text-base outline-none placeholder:text-muted"
        />
      </div>

      {loading && <ProductGridSkeleton count={8} />}

      {!loading && searched && results.length === 0 && (
        <div className="rounded-card border border-dashed border-blush-border bg-surface py-20 text-center">
          <span className="text-4xl">🔍</span>
          <p className="mt-3 font-medium text-ink">
            No results for “{query}”
          </p>
          <p className="mt-1 text-sm text-muted">
            Try a different keyword, fabric, or browse all products.
          </p>
        </div>
      )}

      {!loading && results.length > 0 && (
        <>
          <p className="mb-4 text-sm text-muted">
            {results.length} {results.length === 1 ? "result" : "results"}
          </p>
          <ProductGrid products={results} />
        </>
      )}

      {!loading && !searched && (
        <p className="text-center text-muted">
          Start typing to discover your next favourite piece 🌸
        </p>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<ProductGridSkeleton />}>
      <SearchInner />
    </Suspense>
  );
}
