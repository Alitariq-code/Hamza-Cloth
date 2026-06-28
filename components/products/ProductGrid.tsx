import ProductCard from "./ProductCard";
import type { IProduct } from "@/types";

export default function ProductGrid({
  products,
  emptyMessage = "No products found.",
}: {
  products: IProduct[];
  emptyMessage?: string;
}) {
  if (!products.length) {
    return (
      <div className="flex flex-col items-center justify-center rounded-card border border-dashed border-blush-border bg-surface py-20 text-center">
        <span className="text-4xl">🌸</span>
        <p className="mt-3 text-muted">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-6 md:grid-cols-3 lg:grid-cols-4">
      {products.map((p, i) => (
        <ProductCard key={p._id} product={p} index={i} />
      ))}
    </div>
  );
}
