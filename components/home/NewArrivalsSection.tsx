import SectionHeading from "./SectionHeading";
import ProductGrid from "@/components/products/ProductGrid";
import type { IProduct } from "@/types";

export default function NewArrivalsSection({
  products,
}: {
  products: IProduct[];
}) {
  if (!products.length) return null;

  return (
    <section className="container-site py-14">
      <SectionHeading
        title="New Arrivals 🌸"
        urdu="نئی آمد"
        href="/new-arrivals"
      />
      <ProductGrid products={products} />
    </section>
  );
}
