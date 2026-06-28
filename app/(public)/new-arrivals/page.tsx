import type { Metadata } from "next";
import { getProducts } from "@/lib/data";
import PageHero from "@/components/layout/PageHero";
import CollectionListing from "@/components/products/CollectionListing";
import Pagination from "@/components/products/Pagination";
import type { ProductQuery } from "@/types";

export const metadata: Metadata = { title: "New Arrivals" };
export const revalidate = 60;

type SP = Record<string, string | undefined>;

export default async function NewArrivalsPage({
  searchParams,
}: {
  searchParams: SP;
}) {
  const { products, page, pages } = await getProducts({
    isNewArrival: true,
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
        eyebrow="Just In"
        title="New Arrivals"
        subtitle="The latest additions to the Hamza wardrobe."
      />
      <div className="container-site py-6">
        <CollectionListing
          products={products}
          emptyMessage="No new arrivals just yet — check back soon."
        />
        <Pagination
          page={page}
          pages={pages}
          basePath="/new-arrivals"
          searchParams={searchParams}
        />
      </div>
    </>
  );
}
