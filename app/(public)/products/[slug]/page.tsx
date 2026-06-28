import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductBySlug, getRelatedProducts } from "@/lib/data";
import ProductImageGallery from "@/components/products/ProductImageGallery";
import ProductPurchasePanel from "@/components/products/ProductPurchasePanel";
import ProductGrid from "@/components/products/ProductGrid";

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

const FEATURES = [
  {
    title: "Free Delivery",
    sub: "On orders over Rs.5,000",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="6" width="13" height="11" rx="1" />
        <path d="M14 9h4l3 3v5h-7z" />
        <circle cx="6" cy="18" r="2" />
        <circle cx="18" cy="18" r="2" />
      </svg>
    ),
  },
  {
    title: "Easy Exchange",
    sub: "7-day hassle-free returns",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12a9 9 0 0115-6.7L21 8" />
        <path d="M21 3v5h-5" />
        <path d="M21 12a9 9 0 01-15 6.7L3 16" />
        <path d="M3 21v-5h5" />
      </svg>
    ),
  },
  {
    title: "100% Original",
    sub: "Authentic, quality assured",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
];

export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  const related = await getRelatedProducts(product, 4);

  const details = [
    product.fabric && { label: "Fabric", value: product.fabric },
    product.category && { label: "Category", value: product.category },
    product.season && { label: "Season", value: product.season },
    product.priceRange && { label: "Range", value: product.priceRange },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <div className="container-site py-5">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-xs uppercase tracking-[0.06em] text-muted">
        <Link href="/" className="transition hover:text-ink">
          Home
        </Link>
        <span>/</span>
        <Link href="/products" className="transition hover:text-ink">
          Products
        </Link>
        <span>/</span>
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
        {/* Gallery (sticky on desktop) */}
        <div className="lg:sticky lg:top-24">
          <ProductImageGallery images={product.images} name={product.name} />
        </div>

        {/* Info */}
        <div className="animate-reveal">
          <ProductPurchasePanel product={product} />

          {/* Trust strip */}
          <div className="mt-8 grid grid-cols-3 gap-3 border-y border-blush-border py-5">
            {FEATURES.map((f) => (
              <div key={f.title} className="flex flex-col items-center gap-1.5 text-center">
                <span className="text-ink">{f.icon}</span>
                <span className="text-xs font-semibold text-ink">{f.title}</span>
                <span className="hidden text-[11px] leading-tight text-muted sm:block">
                  {f.sub}
                </span>
              </div>
            ))}
          </div>

          {/* Details */}
          {details.length > 0 && (
            <div className="mt-8">
              <h3 className="eyebrow mb-3">Product Details</h3>
              <dl className="divide-y divide-blush-border border-t border-blush-border">
                {details.map((d) => (
                  <div key={d.label} className="flex justify-between py-2.5 text-sm">
                    <dt className="text-muted">{d.label}</dt>
                    <dd className="font-medium text-ink">{d.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <div className="mb-8 text-center">
            <p className="rule-eyebrow mb-3">You May Also Like</p>
            <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
              Complete the Look
            </h2>
          </div>
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  );
}
