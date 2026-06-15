import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCollectionBySlug, getProducts } from "@/lib/data";
import PageHero from "@/components/layout/PageHero";
import ProductGrid from "@/components/products/ProductGrid";
import Pagination from "@/components/products/Pagination";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const collection = await getCollectionBySlug(params.slug);
  return { title: collection?.name || "Collection" };
}

export default async function CollectionDetailPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: Record<string, string | undefined>;
}) {
  const collection = await getCollectionBySlug(params.slug);
  if (!collection) notFound();

  const page = searchParams.page ? Number(searchParams.page) : 1;
  const { products, pages } = await getProducts({
    collection: collection._id,
    page,
    limit: 12,
  });

  return (
    <>
      <PageHero
        title={collection.name}
        urdu={collection.urduTagline}
        subtitle={collection.description}
        variant="gold"
      />
      <div className="container-site py-10">
        <ProductGrid
          products={products}
          emptyMessage="This collection has no products yet."
        />
        <Pagination
          page={page}
          pages={pages}
          basePath={`/collections/${params.slug}`}
          searchParams={searchParams}
        />
      </div>
    </>
  );
}
