"use client";

import { useEffect, useState } from "react";
import { HeartIcon } from "@/components/Icons";

const KEY = "hch-wishlist";

/** Small heart toggle that persists liked product ids to localStorage. */
export default function WishlistButton({
  id,
  className = "",
}: {
  id: string;
  className?: string;
}) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    try {
      const list: string[] = JSON.parse(localStorage.getItem(KEY) || "[]");
      setActive(list.includes(id));
    } catch {
      /* ignore */
    }
  }, [id]);

  function toggle(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    try {
      const set = new Set<string>(JSON.parse(localStorage.getItem(KEY) || "[]"));
      if (set.has(id)) set.delete(id);
      else set.add(id);
      localStorage.setItem(KEY, JSON.stringify(Array.from(set)));
      setActive(set.has(id));
    } catch {
      setActive((a) => !a);
    }
  }

  return (
    <button
      type="button"
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      aria-pressed={active}
      onClick={toggle}
      className={`flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur transition hover:bg-white ${
        active ? "text-accent" : "text-ink"
      } ${className}`}
    >
      <HeartIcon width={18} height={18} fill={active ? "currentColor" : "none"} />
    </button>
  );
}
