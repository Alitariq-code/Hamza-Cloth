import type { Metadata } from "next";
import { getProducts } from "@/lib/data";
import PageHero from "@/components/layout/PageHero";
import ProductGrid from "@/components/products/ProductGrid";
import Pagination from "@/components/products/Pagination";

export const metadata: Metadata = { title: "Sale" };
export const revalidate = 60;

export default async function SalePage({
  searchParams,
}: {
  searchParams: Record<string, string | undefined>;
}) {
  const page = searchParams.page ? Number(searchParams.page) : 1;
  const { products, pages } = await getProducts({
    isOnSale: true,
    page,
    limit: 12,
  });

  return (
    <>
      <PageHero
        title="Sale On! 🔥"
        urdu="سیل"
        subtitle="Limited-time prices on selected pieces. Grab them before they're gone."
        variant="red"
      />
      <div className="container-site py-10">
        <ProductGrid
          products={products}
          emptyMessage="No sale items right now — but new offers drop often!"
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
