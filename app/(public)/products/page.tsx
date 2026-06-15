import { Suspense } from "react";
import type { Metadata } from "next";
import { getProducts } from "@/lib/data";
import ProductGrid from "@/components/products/ProductGrid";
import ProductFilters from "@/components/products/ProductFilters";
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
    <div className="container-site py-10">
      <header className="mb-8">
        <h1 className="font-display text-h1 font-bold text-ink">All Products</h1>
        <p className="mt-1 text-muted">
          {total} {total === 1 ? "piece" : "pieces"} of timeless elegance
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <Suspense>
          <ProductFilters />
        </Suspense>

        <div>
          <ProductGrid
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
      </div>
    </div>
  );
}
