import type { Metadata } from "next";
import { getProducts } from "@/lib/data";
import PageHero from "@/components/layout/PageHero";
import ProductGrid from "@/components/products/ProductGrid";
import Pagination from "@/components/products/Pagination";

export const metadata: Metadata = { title: "New Arrivals" };
export const revalidate = 60;

export default async function NewArrivalsPage({
  searchParams,
}: {
  searchParams: Record<string, string | undefined>;
}) {
  const page = searchParams.page ? Number(searchParams.page) : 1;
  const { products, pages } = await getProducts({
    isNewArrival: true,
    page,
    limit: 12,
  });

  return (
    <>
      <PageHero
        title="Fresh Drops 🌸"
        urdu="نئی آمد"
        subtitle="The latest additions to the Hamza wardrobe — straight off the rack."
        variant="pink"
      />
      <div className="container-site py-10">
        <ProductGrid
          products={products}
          emptyMessage="No new arrivals just yet — check back soon!"
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
