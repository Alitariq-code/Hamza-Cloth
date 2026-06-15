"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { MenuIcon, CloseIcon } from "@/components/Icons";

const LINKS = [
  { href: "/admin/dashboard", label: "Dashboard", urdu: "ڈیش بورڈ", icon: "📊" },
  { href: "/admin/products", label: "Products", urdu: "پروڈکٹس", icon: "👗" },
  {
    href: "/admin/products/new",
    label: "Add Product",
    urdu: "نیا پروڈکٹ",
    icon: "➕",
  },
  {
    href: "/admin/collections",
    label: "Collections",
    urdu: "کلیکشنز",
    icon: "🗂️",
  },
  { href: "/admin/settings", label: "Settings", urdu: "ترتیبات", icon: "⚙️" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const nav = (
    <nav className="flex flex-col gap-1.5">
      {LINKS.map((l) => {
        const active =
          pathname === l.href ||
          (l.href !== "/admin/products" &&
            l.href !== "/admin/products/new" &&
            pathname.startsWith(l.href)) ||
          (l.href === "/admin/products" &&
            pathname.startsWith("/admin/products") &&
            !pathname.includes("/new"));
        return (
          <Link
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            className={`flex items-center gap-3 rounded-btn px-4 py-3 text-sm font-medium transition ${
              active
                ? "bg-gold text-white"
                : "text-ink hover:bg-background hover:text-gold"
            }`}
          >
            <span className="text-lg">{l.icon}</span>
            <span>{l.label}</span>
            <span
              className={`urdu ml-auto text-sm ${
                active ? "text-white/90" : "text-muted"
              }`}
              lang="ur"
              dir="rtl"
            >
              {l.urdu}
            </span>
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-blush-border bg-surface px-4 py-3 lg:hidden">
        <Link
          href="/admin/dashboard"
          className="font-display text-lg font-bold"
        >
          Hamza <span className="text-gold">Admin</span>
        </Link>
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
          className="flex h-10 w-10 items-center justify-center rounded-btn border border-blush-border"
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {open && (
        <div className="sticky top-[57px] z-30 border-b border-blush-border bg-surface p-4 lg:hidden">
          {nav}
          <div className="mt-3 space-y-2">
            <Link
              href="/"
              target="_blank"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-btn px-4 py-2.5 text-sm text-muted hover:text-gold"
            >
              <span>↗ View site</span>
              <span className="urdu" lang="ur" dir="rtl">
                سائٹ دیکھیں
              </span>
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="btn-outline w-full py-2.5 text-sm"
            >
              Sign out · لاگ آؤٹ
            </button>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-blush-border bg-surface p-5 lg:flex">
        <Link
          href="/admin/dashboard"
          className="mb-8 font-display text-xl font-bold text-ink"
        >
          Hamza <span className="text-gold">Admin</span>
        </Link>
        {nav}
        <div className="mt-auto space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between rounded-btn px-4 py-2 text-sm text-muted hover:text-gold"
          >
            <span>↗ View site</span>
            <span className="urdu" lang="ur" dir="rtl">
              سائٹ دیکھیں
            </span>
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="btn-outline w-full py-2 text-sm"
          >
            Sign out · لاگ آؤٹ
          </button>
        </div>
      </aside>
    </>
  );
}
