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
    <div className="container-site py-8">
      <div className="py-4 text-center">
        <p className="rule-eyebrow mb-3">Find Your Favourite</p>
        <h1 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-[2.6rem]">
          Search
        </h1>
      </div>

      <div className="mx-auto mb-10 flex max-w-2xl items-center gap-3 border-b-2 border-blush-border bg-transparent px-1 py-3 transition-colors focus-within:border-ink">
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
        <div className="border border-dashed border-blush-border py-20 text-center">
          <p className="font-display text-xl text-ink">
            No results for “{query}”
          </p>
          <p className="mt-2 text-sm text-muted">
            Try a different keyword or fabric, or browse all products.
          </p>
        </div>
      )}

      {!loading && results.length > 0 && (
        <>
          <p className="mb-5 text-center text-sm uppercase tracking-[0.1em] text-muted">
            {results.length} {results.length === 1 ? "result" : "results"}
          </p>
          <ProductGrid products={results} />
        </>
      )}

      {!loading && !searched && (
        <p className="py-16 text-center text-muted">
          Start typing to discover your next favourite piece.
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
