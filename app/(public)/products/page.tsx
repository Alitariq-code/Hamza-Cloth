import type { Metadata } from "next";
import Link from "next/link";
import { getProducts } from "@/lib/data";
import CollectionListing from "@/components/products/CollectionListing";
import CollectionHeader from "@/components/products/CollectionHeader";
import Pagination from "@/components/products/Pagination";
import type { ProductQuery } from "@/types";

export const metadata: Metadata = { title: "All Products" };
export const revalidate = 60;

type SP = Record<string, string | undefined>;

function toQuery(sp: SP): ProductQuery {
  return {
    season: sp.season as ProductQuery["season"],
    fabric: sp.fabric as ProductQuery["fabric"],
    category: sp.category as ProductQuery["category"],
    priceRange: sp.priceRange as ProductQuery["priceRange"],
    sort: (sp.sort as ProductQuery["sort"]) || "newest",
    page: sp.page ? Number(sp.page) : 1,
    limit: 12,
  };
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: SP;
}) {
  const { products, total, page, pages } = await getProducts(
    toQuery(searchParams),
  );

  return (
    <div className="container-site py-4">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs uppercase tracking-[0.06em] text-muted">
        <Link href="/" className="transition hover:text-ink">
          Home
        </Link>
        <span>/</span>
        <Link href="/products" className="transition hover:text-ink">
          Products
        </Link>
        <span>/</span>
        <span className="text-ink">All</span>
      </nav>

      <CollectionHeader
        eyebrow="The Collection"
        title="All Products"
        count={total}
      />

      <CollectionListing
        products={products}
        emptyMessage="No products match these filters. Try clearing some."
      />

      <Pagination
        page={page}
        pages={pages}
        basePath="/products"
        searchParams={searchParams}
      />
    </div>
  );
}
