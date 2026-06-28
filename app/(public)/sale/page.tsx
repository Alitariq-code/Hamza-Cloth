import type { Metadata } from "next";
import { getProducts } from "@/lib/data";
import PageHero from "@/components/layout/PageHero";
import CollectionListing from "@/components/products/CollectionListing";
import Pagination from "@/components/products/Pagination";
import type { ProductQuery } from "@/types";

export const metadata: Metadata = { title: "Sale" };
export const revalidate = 60;

type SP = Record<string, string | undefined>;

export default async function SalePage({
  searchParams,
}: {
  searchParams: SP;
}) {
  const { products, page, pages } = await getProducts({
    isOnSale: true,
    season: searchParams.season as ProductQuery["season"],
    fabric: searchParams.fabric as ProductQuery["fabric"],
    category: searchParams.category as ProductQuery["category"],
    priceRange: searchParams.priceRange as ProductQuery["priceRange"],
    sort: (searchParams.sort as ProductQuery["sort"]) || "newest",
    page: searchParams.page ? Number(searchParams.page) : 1,
    limit: 12,
  });

  return (
    <>
      <PageHero
        eyebrow="Limited Time"
        title="Sale"
        subtitle="Special prices on selected pieces — while stock lasts."
      />
      <div className="container-site py-6">
        <CollectionListing
          products={products}
          emptyMessage="No sale items right now — new offers drop often."
        />
        <Pagination
          page={page}
          pages={pages}
          basePath="/sale"
          searchParams={searchParams}
        />
      </div>
    </>
  );
}
