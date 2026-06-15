"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { formatPKR, buildWhatsAppLink } from "@/lib/constants";
import { WhatsAppIcon } from "@/components/Icons";
import ProductBadge from "./ProductBadge";
import type { IProduct } from "@/types";

const PLACEHOLDER =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNTAwIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjUwMCIgZmlsbD0iI0YwRTZFNiIvPjwvc3ZnPg==";

export default function ProductCard({ product }: { product: IProduct }) {
  const [hover, setHover] = useState(false);
  const primary = product.images?.[0] || PLACEHOLDER;
  const secondary = product.images?.[1];
  const onSale = product.isOnSale && product.salePrice;

  const waMessage =
    product.whatsappMessage ||
    `Hi! I'm interested in ${product.name}. Please share availability and details.`;

  return (
    <div
      className="group card-surface overflow-hidden hover:-translate-y-1 hover:shadow-gold-lg"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Link
        href={`/products/${product.slug}`}
        className="relative block aspect-[4/5] overflow-hidden bg-blush-border/40"
      >
        <Image
          src={hover && secondary ? secondary : primary}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          <ProductBadge product={product} />
        </div>
      </Link>

      <div className="flex flex-col gap-2 p-4">
        <span className="pill w-fit">{product.fabric}</span>
        <Link href={`/products/${product.slug}`}>
          <h3 className="line-clamp-1 font-display text-base font-semibold text-ink transition group-hover:text-gold">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-baseline gap-2">
          {onSale ? (
            <>
              <span className="font-semibold text-gold">
                {formatPKR(product.salePrice!)}
              </span>
              <span className="text-sm text-muted line-through">
                {formatPKR(product.price)}
              </span>
            </>
          ) : (
            <span className="font-semibold text-gold">
              {formatPKR(product.price)}
            </span>
          )}
        </div>

        {product.sizes?.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {product.sizes.slice(0, 5).map((s) => (
              <span
                key={s}
                className="rounded border border-blush-border px-1.5 py-0.5 text-[10px] text-muted"
              >
                {s}
              </span>
            ))}
          </div>
        )}

        <a
          href={buildWhatsAppLink(waMessage)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="btn-whatsapp mt-1 w-full py-2.5 text-sm"
        >
          <WhatsAppIcon width={16} height={16} /> Order on WhatsApp
        </a>
      </div>
    </div>
  );
}
