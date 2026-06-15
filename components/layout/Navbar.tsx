"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { NAV_LINKS, SITE_NAME } from "@/lib/constants";
import { SearchIcon, MenuIcon, CloseIcon } from "@/components/Icons";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    if (q.trim()) {
      router.push(`/search?q=${encodeURIComponent(q.trim())}`);
      setQ("");
      setOpen(false);
    }
  }

  return (
    <header className="sticky top-0 z-40 border-b border-blush-border bg-background/90 backdrop-blur">
      <nav className="container-site flex items-center justify-between gap-4 py-4">
        {/* Brand */}
        <Link href="/" className="shrink-0">
          <span className="font-display text-xl font-bold tracking-tight text-ink sm:text-2xl">
            Hamza
            <span className="text-gold"> Cloth House</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => {
            const active =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative text-sm font-medium transition-colors hover:text-gold ${
                    active ? "text-gold" : "text-ink"
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute -bottom-1.5 left-0 h-0.5 w-full rounded-full bg-gold" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop search */}
        <form
          onSubmit={submitSearch}
          className="hidden items-center gap-2 rounded-pill border border-blush-border bg-surface px-3 py-1.5 lg:flex"
        >
          <SearchIcon className="text-muted" width={16} height={16} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search…"
            aria-label="Search products"
            className="w-32 bg-transparent text-sm outline-none placeholder:text-muted"
          />
        </form>

        {/* Mobile toggle */}
        <button
          className="lg:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-blush-border bg-surface lg:hidden">
          <div className="container-site flex flex-col gap-1 py-4">
            <form
              onSubmit={submitSearch}
              className="mb-2 flex items-center gap-2 rounded-pill border border-blush-border bg-background px-3 py-2"
            >
              <SearchIcon className="text-muted" width={18} height={18} />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search products…"
                className="w-full bg-transparent text-sm outline-none"
              />
            </form>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-btn px-3 py-2.5 text-sm font-medium text-ink transition hover:bg-background hover:text-gold"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
      <span className="sr-only">{SITE_NAME}</span>
    </header>
  );
}
