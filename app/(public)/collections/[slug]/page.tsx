import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCollectionBySlug, getProducts } from "@/lib/data";
import PageHero from "@/components/layout/PageHero";
import CollectionListing from "@/components/products/CollectionListing";
import Pagination from "@/components/products/Pagination";
import type { ProductQuery } from "@/types";

export const revalidate = 60;

type SP = Record<string, string | undefined>;

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
  searchParams: SP;
}) {
  const collection = await getCollectionBySlug(params.slug);
  if (!collection) notFound();

  const { products, page, pages } = await getProducts({
    collection: collection._id,
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
        eyebrow="Collection"
        title={collection.name}
        urdu={collection.urduTagline}
        subtitle={collection.description}
      />
      <div className="container-site py-6">
        <CollectionListing
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
