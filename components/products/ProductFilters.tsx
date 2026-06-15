"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState } from "react";
import { SEASONS, FABRICS, CATEGORIES, PRICE_RANGES } from "@/types";
import { CloseIcon } from "@/components/Icons";

const SORTS = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "featured", label: "Featured" },
];

const GROUPS = [
  { key: "season", label: "Season", options: SEASONS },
  { key: "fabric", label: "Fabric", options: FABRICS },
  { key: "category", label: "Occasion", options: CATEGORIES },
  { key: "priceRange", label: "Price Range", options: PRICE_RANGES },
] as const;

export default function ProductFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [open, setOpen] = useState(false);

  function setParam(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value && next.get(key) !== value) next.set(key, value);
    else next.delete(key);
    next.delete("page");
    router.push(`${pathname}?${next.toString()}`);
  }

  function clearAll() {
    const next = new URLSearchParams();
    const sort = params.get("sort");
    if (sort) next.set("sort", sort);
    router.push(`${pathname}?${next.toString()}`);
  }

  const activeFilters = GROUPS.flatMap((g) => {
    const v = params.get(g.key);
    return v ? [{ key: g.key, label: g.label, value: v }] : [];
  });

  const Panel = (
    <div className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-semibold text-ink">
          Sort By
        </label>
        <select
          value={params.get("sort") || "newest"}
          onChange={(e) => setParam("sort", e.target.value)}
          className="w-full rounded-btn border border-blush-border bg-surface px-3 py-2 text-sm outline-none focus:border-gold"
        >
          {SORTS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      {GROUPS.map((g) => (
        <div key={g.key}>
          <h4 className="mb-2 text-sm font-semibold text-ink">{g.label}</h4>
          <div className="flex flex-wrap gap-2">
            {g.options.map((opt) => {
              const active = params.get(g.key) === opt;
              return (
                <button
                  key={opt}
                  onClick={() => setParam(g.key, opt)}
                  className={`rounded-pill border px-3 py-1.5 text-xs transition ${
                    active
                      ? "border-gold bg-gold text-white"
                      : "border-blush-border bg-surface text-muted hover:border-gold hover:text-gold"
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      {/* Active filter pills */}
      {activeFilters.length > 0 && (
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {activeFilters.map((f) => (
            <button
              key={f.key}
              onClick={() => setParam(f.key, "")}
              className="badge gap-1 bg-gold/10 text-gold transition hover:bg-gold/20"
            >
              {f.value}
              <CloseIcon width={12} height={12} />
            </button>
          ))}
          <button
            onClick={clearAll}
            className="text-xs font-medium text-muted underline hover:text-gold"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Mobile trigger */}
      <button
        onClick={() => setOpen(true)}
        className="btn-outline mb-4 w-full py-2.5 text-sm lg:hidden"
      >
        Filters & Sort
        {activeFilters.length > 0 && ` (${activeFilters.length})`}
      </button>

      {/* Desktop sidebar */}
      <aside className="sticky top-24 hidden lg:block">
        <div className="card-surface p-5">{Panel}</div>
      </aside>

      {/* Mobile bottom sheet */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-card bg-surface p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-lg font-bold">Filters & Sort</h3>
              <button onClick={() => setOpen(false)} aria-label="Close">
                <CloseIcon />
              </button>
            </div>
            {Panel}
            <button
              onClick={() => setOpen(false)}
              className="btn-gold mt-6 w-full"
            >
              Show Results
            </button>
          </div>
        </div>
      )}
    </>
  );
}
