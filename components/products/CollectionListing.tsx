"use client";

import { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import ProductFilters from "./ProductFilters";
import ProductCard from "./ProductCard";
import { FilterIcon, SortIcon } from "@/components/Icons";
import type { IProduct } from "@/types";

const SORTS = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "featured", label: "Featured" },
];

// Grid-layout toggles (icons mirror the reference: 2-up, 4-up grid, rows).
const LAYOUTS = [
  {
    cols: 2 as const,
    label: "2 columns",
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <rect x="3" y="3" width="7" height="18" rx="1" />
        <rect x="14" y="3" width="7" height="18" rx="1" />
      </svg>
    ),
  },
  {
    cols: 4 as const,
    label: "4 columns",
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    cols: 3 as const,
    label: "3 columns",
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <rect x="3" y="4" width="18" height="4" rx="1" />
        <rect x="3" y="10" width="18" height="4" rx="1" />
        <rect x="3" y="16" width="18" height="4" rx="1" />
      </svg>
    ),
  },
];

export default function CollectionListing({
  products,
  emptyMessage = "No products match these filters.",
}: {
  products: IProduct[];
  emptyMessage?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [cols, setCols] = useState<2 | 3 | 4>(4);
  const [sortOpen, setSortOpen] = useState(false);

  const activeSort = params.get("sort") || "newest";

  function setSort(value: string) {
    const next = new URLSearchParams(params.toString());
    if (value) next.set("sort", value);
    else next.delete("sort");
    next.delete("page");
    router.push(`${pathname}?${next.toString()}`);
    setSortOpen(false);
  }

  const colClass =
    cols === 2
      ? "grid-cols-1 sm:grid-cols-2"
      : cols === 3
        ? "grid-cols-2 sm:grid-cols-3"
        : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4";

  return (
    <div>
      {/* Toolbar */}
      <div className="flex items-center justify-between py-2.5">
        <button
          onClick={() => setShowFilters((s) => !s)}
          className="flex items-center gap-2 text-sm font-medium text-ink transition hover:text-muted"
        >
          <FilterIcon />
          Show Filter&apos;s
        </button>

        <div className="flex items-center gap-3 sm:gap-5">
          {/* Layout toggles */}
          <div className="hidden items-center gap-1 sm:flex">
            {LAYOUTS.map((l) => (
              <button
                key={l.cols}
                aria-label={l.label}
                onClick={() => setCols(l.cols)}
                className={`flex h-8 w-8 items-center justify-center rounded transition ${
                  cols === l.cols
                    ? "bg-[#ededed] text-ink"
                    : "text-[#bdbdbd] hover:text-ink"
                }`}
              >
                {l.icon}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="relative">
            <button
              onClick={() => setSortOpen((o) => !o)}
              className="flex items-center gap-2 rounded bg-[#f4f4f4] px-4 py-2 text-sm font-medium text-ink transition hover:bg-[#ededed]"
            >
              <SortIcon />
              Sort
            </button>
            {sortOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setSortOpen(false)}
                />
                <div className="absolute right-0 z-20 mt-2 w-52 border border-blush-border bg-white py-1 shadow-lg">
                  {SORTS.map((s) => (
                    <button
                      key={s.value}
                      onClick={() => setSort(s.value)}
                      className={`block w-full px-4 py-2 text-left text-sm transition hover:bg-[#f7f7f7] ${
                        activeSort === s.value
                          ? "font-semibold text-ink"
                          : "text-muted"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className={showFilters ? "grid gap-8 lg:grid-cols-[260px_1fr]" : ""}>
        {showFilters && <ProductFilters />}

        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center border border-dashed border-blush-border py-24 text-center">
            <p className="text-muted">{emptyMessage}</p>
          </div>
        ) : (
          <div className={`grid ${colClass} gap-x-3 gap-y-6`}>
            {products.map((p, i) => (
              <ProductCard key={p._id} product={p} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
