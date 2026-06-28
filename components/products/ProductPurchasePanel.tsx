"use client";

import { useMemo, useState } from "react";
import {
  formatPKR,
  buildWhatsAppLink,
  discountPercent,
  SOCIAL,
} from "@/lib/constants";
import {
  WhatsAppIcon,
  InstagramIcon,
  FacebookIcon,
  CopyIcon,
} from "@/components/Icons";
import type { IProduct } from "@/types";

const COLOR_MAP: Record<string, string> = {
  pink: "#E8B4B8",
  red: "#D94F4F",
  blue: "#6C8FD9",
  white: "#FFFFFF",
  black: "#1A1A1A",
  green: "#4CAF7D",
  gold: "#C9A96E",
  cream: "#F5EFE0",
  maroon: "#7B2D3B",
  navy: "#2C3E66",
  grey: "#9A9A9A",
  gray: "#9A9A9A",
  yellow: "#E7C84B",
  purple: "#8B6BB1",
  orange: "#E08A3C",
  brown: "#8B5E3C",
  teal: "#3CA6A6",
};

export default function ProductPurchasePanel({
  product,
}: {
  product: IProduct;
}) {
  const [size, setSize] = useState(product.sizes?.[0] || "");
  const [color, setColor] = useState(product.colors?.[0] || "");
  const [copied, setCopied] = useState(false);

  const onSale = product.isOnSale && product.salePrice;
  const pct = onSale ? discountPercent(product.price, product.salePrice) : 0;

  const message = useMemo(() => {
    const base =
      product.whatsappMessage ||
      `Hi! I'm interested in ${product.name}`;
    const detail = [
      size ? `Size: ${size}` : null,
      color ? `Color: ${color}` : null,
    ]
      .filter(Boolean)
      .join(" - ");
    return detail
      ? `${base} - ${detail}. Please share availability and details.`
      : `${base}. Please share availability and details.`;
  }, [product, size, color]);

  function shareUrl() {
    return typeof window !== "undefined" ? window.location.href : "";
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* ignore */
    }
  }

  const badges = [
    product.isNewArrival && { label: "New Arrival", cls: "bg-ink text-white" },
    onSale && { label: "On Sale", cls: "bg-accent text-white" },
    product.isFeatured && {
      label: "Bestseller",
      cls: "border border-ink text-ink",
    },
  ].filter(Boolean) as { label: string; cls: string }[];

  return (
    <div className="flex flex-col gap-5">
      {/* Badges */}
      {badges.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {badges.map((b) => (
            <span
              key={b.label}
              className={`rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.06em] ${b.cls}`}
            >
              {b.label}
            </span>
          ))}
        </div>
      )}

      {/* Name */}
      <h1 className="font-display text-3xl font-bold leading-tight text-ink sm:text-[2.4rem]">
        {product.name}
      </h1>

      {/* Price */}
      <div className="flex items-end gap-3">
        {onSale ? (
          <>
            <span className="font-display text-3xl font-bold text-ink">
              {formatPKR(product.salePrice!)}
            </span>
            <span className="pb-1 text-lg text-muted line-through">
              {formatPKR(product.price)}
            </span>
            {pct > 0 && (
              <span className="mb-1 rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-white">
                Save {pct}%
              </span>
            )}
          </>
        ) : (
          <span className="font-display text-3xl font-bold text-ink">
            {formatPKR(product.price)}
          </span>
        )}
      </div>

      <span className="w-fit rounded-full border border-blush-border bg-cream px-3 py-1 text-xs text-muted">
        Fabric: {product.fabric}
      </span>

      <p className="leading-relaxed text-muted">{product.description}</p>

      {/* Sizes */}
      {product.sizes?.length > 0 && (
        <div>
          <h4 className="mb-2 text-sm font-semibold text-ink">Select Size</h4>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`min-w-[44px] rounded-pill border px-4 py-2 text-sm transition ${
                  size === s
                    ? "border-gold bg-gold text-white"
                    : "border-blush-border bg-surface text-ink hover:border-gold"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Colors */}
      {product.colors?.length > 0 && (
        <div>
          <h4 className="mb-2 text-sm font-semibold text-ink">Select Color</h4>
          <div className="flex flex-wrap gap-3">
            {product.colors.map((c) => {
              const swatch = COLOR_MAP[c.toLowerCase()] || "#DDDDDD";
              return (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  title={c}
                  aria-label={c}
                  className={`h-9 w-9 rounded-full border-2 transition ${
                    color === c
                      ? "border-gold ring-2 ring-gold/30"
                      : "border-blush-border"
                  }`}
                  style={{ backgroundColor: swatch }}
                />
              );
            })}
          </div>
          {color && <p className="mt-2 text-xs text-muted">Selected: {color}</p>}
        </div>
      )}

      {/* Order */}
      <div className="space-y-2">
        <a
          href={buildWhatsAppLink(message)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp w-full rounded-btn py-4 text-base normal-case tracking-normal"
        >
          <WhatsAppIcon width={22} height={22} /> Order via WhatsApp
        </a>
        <p className="text-center text-xs text-muted">
          Tap to chat — we usually reply within minutes.
        </p>
      </div>

      {/* Share */}
      <div className="flex items-center gap-3 pt-2">
        <span className="text-sm text-muted">Share:</span>
        <a
          href={buildWhatsAppLink(`Check this out: ${product.name} ${shareUrl()}`)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on WhatsApp"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-blush-border text-muted transition hover:border-gold hover:text-gold"
        >
          <WhatsAppIcon width={16} height={16} />
        </a>
        <a
          href={SOCIAL.instagram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-blush-border text-muted transition hover:border-gold hover:text-gold"
        >
          <InstagramIcon width={16} height={16} />
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl())}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Facebook"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-blush-border text-muted transition hover:border-gold hover:text-gold"
        >
          <FacebookIcon width={16} height={16} />
        </a>
        <button
          onClick={copyLink}
          aria-label="Copy link"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-blush-border text-muted transition hover:border-gold hover:text-gold"
        >
          <CopyIcon width={16} height={16} />
        </button>
        {copied && <span className="text-xs text-badge-green">Copied!</span>}
      </div>
    </div>
  );
}
