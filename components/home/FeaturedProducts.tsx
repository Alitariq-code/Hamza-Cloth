import ProductCard from "@/components/products/ProductCard";
import SectionHeading from "./SectionHeading";
import type { IProduct } from "@/types";

export default function FeaturedProducts({
  products,
}: {
  products: IProduct[];
}) {
  if (!products.length) return null;

  return (
    <section className="container-site py-14">
      <SectionHeading
        title="Bestsellers ✨"
        urdu="خاص انتخاب"
        href="/products?sort=featured"
      />
      {/* Horizontal scroll on mobile, grid on desktop */}
      <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 no-scrollbar sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:grid-cols-4">
        {products.map((p) => (
          <div key={p._id} className="w-[70%] shrink-0 sm:w-auto">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </section>
  );
}
