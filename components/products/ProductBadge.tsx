import { discountPercent } from "@/lib/constants";
import type { IProduct } from "@/types";

/** Renders the top-priority badge for a product card (Sale > New > Featured). */
export default function ProductBadge({ product }: { product: IProduct }) {
  if (product.isOnSale && product.salePrice) {
    const pct = discountPercent(product.price, product.salePrice);
    return (
      <span className="badge bg-badge-red text-white">
        {pct > 0 ? `-${pct}%` : "SALE"}
      </span>
    );
  }
  if (product.isNewArrival) {
    return <span className="badge bg-badge-green text-white">NEW</span>;
  }
  if (product.isFeatured) {
    return <span className="badge bg-gold text-white">FEATURED</span>;
  }
  return null;
}
