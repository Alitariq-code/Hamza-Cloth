"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SITE_NAME } from "@/lib/constants";
import { CATEGORIES } from "@/types";
import {
  SearchIcon,
  MenuIcon,
  CloseIcon,
  HeartIcon,
} from "@/components/Icons";
import MenuDrawer from "./MenuDrawer";

const NAV = [
  { label: "New In", href: "/new-arrivals" },
  ...CATEGORIES.map((c) => ({
    label: c,
    href: `/products?category=${encodeURIComponent(c)}`,
  })),
];

export default function Navbar({
  collections = [],
}: {
  collections?: { name: string; slug: string }[];
}) {
  const router = useRouter();
  const [drawer, setDrawer] = useState(false);
  const [search, setSearch] = useState(false);
  const [q, setQ] = useState("");

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    if (q.trim()) {
      router.push(`/search?q=${encodeURIComponent(q.trim())}`);
      setQ("");
      setSearch(false);
    }
  }

  return (
    <header
      id="top"
      className="sticky top-0 z-40 border-b border-blush-border bg-white"
    >
      <nav className="container-site grid h-16 grid-cols-[1fr_auto_1fr] items-center sm:h-[72px]">
        {/* Left: menu + search */}
        <div className="flex items-center gap-3 sm:gap-5">
          <button
            aria-label="Open menu"
            onClick={() => setDrawer(true)}
            className="text-ink transition hover:text-muted"
          >
            <MenuIcon width={24} height={24} />
          </button>
          <button
            aria-label="Search"
            onClick={() => setSearch((s) => !s)}
            className="text-ink transition hover:text-muted"
          >
            <SearchIcon width={22} height={22} />
          </button>
        </div>

        {/* Center: wordmark */}
        <Link href="/" className="justify-self-center" aria-label={SITE_NAME}>
          <span className="font-display text-2xl font-semibold tracking-[0.18em] text-ink sm:text-[28px]">
            HAMZA<span className="text-[0.7em] align-top">.</span>
          </span>
        </Link>

        {/* Right: wishlist */}
        <div className="flex items-center justify-end gap-4 sm:gap-5">
          <Link
            href="/wishlist"
            aria-label="Wishlist"
            className="text-ink transition hover:text-muted"
          >
            <HeartIcon />
          </Link>
        </div>
      </nav>

      {/* Desktop quick nav */}
      <div className="hidden border-t border-blush-border lg:block">
        <div className="container-site flex items-center justify-center gap-8 py-2.5 text-[12px] font-medium uppercase tracking-[0.1em]">
          {NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="nav-underline text-ink transition-colors hover:text-muted"
            >
              {item.label}
            </Link>
          ))}

          {/* Collections dropdown */}
          <div className="group relative">
            <Link
              href="/collections"
              className="flex items-center gap-1 text-ink transition-colors hover:text-muted"
            >
              Collections
              <svg
                viewBox="0 0 24 24"
                width="12"
                height="12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-200 group-hover:rotate-180"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </Link>
            {collections.length > 0 && (
              <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                <div className="min-w-[230px] border border-blush-border bg-white py-2 shadow-xl">
                  {collections.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/collections/${c.slug}`}
                      className="block px-4 py-2.5 text-[12px] font-medium normal-case tracking-normal text-ink transition hover:bg-cream"
                    >
                      {c.name}
                    </Link>
                  ))}
                  <div className="my-1 border-t border-blush-border" />
                  <Link
                    href="/collections"
                    className="block px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted transition hover:text-ink"
                  >
                    View All Collections
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link
            href="/sale"
            className="nav-underline font-semibold text-accent"
          >
            Sale
          </Link>
        </div>
      </div>

      {/* Search dropdown */}
      {search && (
        <div className="border-t border-blush-border bg-white">
          <form
            onSubmit={submitSearch}
            className="container-site flex items-center gap-3 py-3"
          >
            <SearchIcon className="text-muted" width={20} height={20} />
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search for products…"
              aria-label="Search products"
              className="w-full bg-transparent text-sm uppercase tracking-wide outline-none placeholder:text-muted"
            />
            <button
              type="button"
              aria-label="Close search"
              onClick={() => setSearch(false)}
              className="text-muted transition hover:text-ink"
            >
              <CloseIcon width={20} height={20} />
            </button>
          </form>
        </div>
      )}

      <MenuDrawer
        open={drawer}
        onClose={() => setDrawer(false)}
        collections={collections}
      />
    </header>
  );
}
