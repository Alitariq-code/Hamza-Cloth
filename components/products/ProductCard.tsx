import Image from "next/image";
import Link from "next/link";
import {
  formatPKR,
  discountPercent,
  buildWhatsAppLink,
} from "@/lib/constants";
import { WhatsAppIcon } from "@/components/Icons";
import WishlistButton from "./WishlistButton";
import type { IProduct } from "@/types";

const PLACEHOLDER =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNTAwIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjUwMCIgZmlsbD0iI0YwRTZFNiIvPjwvc3ZnPg==";

export default function ProductCard({
  product,
  index = 0,
}: {
  product: IProduct;
  index?: number;
}) {
  const primary = product.images?.[0] || PLACEHOLDER;
  const secondary = product.images?.[1];
  const onSale = product.isOnSale && product.salePrice;
  const pct = onSale ? discountPercent(product.price, product.salePrice) : 0;
  const slug = `/products/${product.slug}`;

  const wa = buildWhatsAppLink(
    product.whatsappMessage ||
      `Hi! I'm interested in ${product.name}. Please share availability and details.`,
  );

  return (
    <div
      className="group animate-reveal"
      style={{ animationDelay: `${Math.min(index, 10) * 55}ms` }}
    >
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-[#f2f2f2]">
        <Link href={slug} aria-label={product.name} className="absolute inset-0">
          <Image
            src={primary}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={`object-cover transition-all duration-700 ease-out group-hover:scale-[1.06] ${
              secondary ? "group-hover:opacity-0" : ""
            }`}
          />
          {secondary && (
            <Image
              src={secondary}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="absolute inset-0 object-cover opacity-0 transition-all duration-700 ease-out group-hover:scale-[1.06] group-hover:opacity-100"
            />
          )}
        </Link>

        {/* Badges */}
        <div className="pointer-events-none absolute left-3 top-3 z-10 flex flex-col items-start gap-1.5">
          {product.isNewArrival && (
            <span className="rounded-full bg-white px-3 py-1 text-[11px] font-medium text-ink shadow-sm">
              New
            </span>
          )}
          {pct > 0 && (
            <span className="rounded-full bg-accent px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm">
              -{pct}%
            </span>
          )}
        </div>

        {/* Wishlist (reveal on hover) */}
        <div className="absolute right-3 top-3 z-20 translate-y-1 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <WishlistButton id={String(product._id)} />
        </div>

        {/* Quick order (slide up on hover) */}
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-x-2 bottom-2 z-20 flex translate-y-3 items-center justify-center gap-2 rounded-lg bg-white/95 py-2.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-ink opacity-0 shadow-md backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-ink hover:text-white"
        >
          <WhatsAppIcon width={15} height={15} /> Order on WhatsApp
        </a>
      </div>

      {/* Meta */}
      <div className="mt-3 space-y-1">
        {product.fabric && <p className="eyebrow">{product.fabric}</p>}
        <Link href={slug}>
          <h3 className="line-clamp-1 text-sm text-ink transition group-hover:text-accent">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-baseline gap-2 pt-0.5">
          {onSale ? (
            <>
              <span className="text-sm font-semibold text-ink">
                {formatPKR(product.salePrice!)}
              </span>
              <span className="text-xs text-muted line-through">
                {formatPKR(product.price)}
              </span>
            </>
          ) : (
            <span className="text-sm font-semibold text-ink">
              {formatPKR(product.price)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
