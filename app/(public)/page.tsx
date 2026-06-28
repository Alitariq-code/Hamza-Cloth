import { getProducts } from "@/lib/data";
import CollectionListing from "@/components/products/CollectionListing";
import CollectionHeader from "@/components/products/CollectionHeader";
import Pagination from "@/components/products/Pagination";
import type { ProductQuery } from "@/types";

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
    limit: 16,
  };
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: SP;
}) {
  const { products, page, pages } = await getProducts(toQuery(searchParams));

  return (
    <div className="container-site py-2">
      {/* No big hero — a slim editorial header, then products directly. */}
      <CollectionHeader eyebrow="New Season 2026" title="The Collection" />
      <CollectionListing
        products={products}
        emptyMessage="No products to show yet. Please check back soon."
      />
      <Pagination
        page={page}
        pages={pages}
        basePath="/"
        searchParams={searchParams}
      />
    </div>
  );
}
