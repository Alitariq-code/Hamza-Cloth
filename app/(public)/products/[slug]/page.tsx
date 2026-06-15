import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductBySlug, getRelatedProducts } from "@/lib/data";
import ProductImageGallery from "@/components/products/ProductImageGallery";
import ProductPurchasePanel from "@/components/products/ProductPurchasePanel";
import ProductGrid from "@/components/products/ProductGrid";
import SectionHeading from "@/components/home/SectionHeading";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) return { title: "Product not found" };
  return {
    title: product.name,
    description: product.description?.slice(0, 160),
    openGraph: {
      title: product.name,
      images: product.images?.length ? [product.images[0]] : [],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  const related = await getRelatedProducts(product, 4);

  const badges = [
    product.isNewArrival && {
      label: "New Arrival",
      cls: "bg-badge-green text-white",
    },
    product.isOnSale && { label: "On Sale", cls: "bg-badge-red text-white" },
    product.isFeatured && { label: "Bestseller", cls: "bg-gold text-white" },
  ].filter(Boolean) as { label: string; cls: string }[];

  return (
    <div className="container-site py-10">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-muted">
        <Link href="/" className="hover:text-gold">
          Home
        </Link>{" "}
        /{" "}
        <Link href="/products" className="hover:text-gold">
          Products
        </Link>{" "}
        / <span className="text-ink">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <ProductImageGallery images={product.images} name={product.name} />

        <div>
          {badges.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {badges.map((b) => (
                <span key={b.label} className={`badge ${b.cls}`}>
                  {b.label}
                </span>
              ))}
            </div>
          )}
          <h1 className="mb-4 font-display text-h1 font-bold text-ink">
            {product.name}
          </h1>
          <ProductPurchasePanel product={product} />
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <SectionHeading title="You May Also Like" />
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  );
}
