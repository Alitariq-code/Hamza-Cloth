"use client";

import Link from "next/link";
import { useEffect } from "react";
import { SITE_NAME } from "@/lib/constants";
import { CATEGORIES, FABRICS } from "@/types";
import { CloseIcon } from "@/components/Icons";

// Primary tabs — all resolve to real routes.
const TABS = [
  { label: "New In", href: "/new-arrivals" },
  { label: "Sale", href: "/sale", accent: true },
  { label: "Collections", href: "/collections" },
  { label: "All", href: "/products" },
];

export default function MenuDrawer({
  open,
  onClose,
  collections = [],
}: {
  open: boolean;
  onClose: () => void;
  collections?: { name: string; slug: string }[];
}) {
  // Lock body scroll while the drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed left-0 top-0 z-50 flex h-full w-[88%] max-w-[380px] flex-col bg-white shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-blush-border px-6 py-5">
          <Link
            href="/"
            onClick={onClose}
            className="font-display text-xl font-semibold tracking-[0.18em] text-ink"
            aria-label={SITE_NAME}
          >
            HAMZA<span className="text-[0.7em] align-top">.</span>
          </Link>
          <button
            aria-label="Close menu"
            onClick={onClose}
            className="text-ink transition hover:text-muted"
          >
            <CloseIcon width={22} height={22} />
          </button>
        </div>

        {/* Top tabs */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-blush-border px-6 py-4 text-[13px] font-semibold uppercase tracking-[0.06em]">
          {TABS.map((t, i) => (
            <span key={t.label} className="flex items-center gap-4">
              <Link
                href={t.href}
                onClick={onClose}
                className={t.accent ? "text-accent" : "text-ink hover:text-muted"}
              >
                {t.label}
              </Link>
              {i < TABS.length - 1 && (
                <span className="text-blush-border">|</span>
              )}
            </span>
          ))}
        </div>

        {/* Scrollable body */}
        <nav className="flex-1 overflow-y-auto px-6 py-5">
          <MenuGroup title="Shop by Category">
            {CATEGORIES.map((c) => (
              <MenuItem
                key={c}
                href={`/products?category=${encodeURIComponent(c)}`}
                onClose={onClose}
              >
                {c}
              </MenuItem>
            ))}
          </MenuGroup>

          <MenuGroup title="Shop by Fabric">
            {FABRICS.filter((f) => f !== "Other").map((f) => (
              <MenuItem
                key={f}
                href={`/products?fabric=${encodeURIComponent(f)}`}
                onClose={onClose}
              >
                {f}
              </MenuItem>
            ))}
          </MenuGroup>

          {collections.length > 0 && (
            <MenuGroup title="Collections">
              {collections.map((col) => (
                <MenuItem
                  key={col.slug}
                  href={`/collections/${col.slug}`}
                  onClose={onClose}
                >
                  {col.name}
                </MenuItem>
              ))}
              <MenuItem href="/collections" onClose={onClose} muted>
                View all collections
              </MenuItem>
            </MenuGroup>
          )}

          <MenuGroup title="More">
            <MenuItem href="/about" onClose={onClose}>
              About Us
            </MenuItem>
            <MenuItem href="/contact" onClose={onClose}>
              Contact
            </MenuItem>
          </MenuGroup>
        </nav>
      </aside>
    </>
  );
}

function MenuGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-5">
      <h4 className="eyebrow mb-2">{title}</h4>
      <ul className="space-y-0.5">{children}</ul>
    </div>
  );
}

function MenuItem({
  href,
  onClose,
  children,
  muted = false,
}: {
  href: string;
  onClose: () => void;
  children: React.ReactNode;
  muted?: boolean;
}) {
  return (
    <li>
      <Link
        href={href}
        onClick={onClose}
        className={`block py-2 text-sm font-medium uppercase tracking-[0.04em] transition hover:text-muted ${
          muted ? "text-muted" : "text-ink"
        }`}
      >
        {children}
      </Link>
    </li>
  );
}
