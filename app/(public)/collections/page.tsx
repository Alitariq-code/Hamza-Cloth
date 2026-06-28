import type { Metadata } from "next";
import { getCollections } from "@/lib/data";
import PageHero from "@/components/layout/PageHero";
import CollectionCard from "@/components/products/CollectionCard";

export const metadata: Metadata = { title: "Collections" };
export const revalidate = 60;

export default async function CollectionsPage() {
  const collections = await getCollections();

  return (
    <>
      <PageHero
        eyebrow="Curated Edits"
        title="Our Collections"
        subtitle="Thoughtfully curated edits for every season and occasion."
      />
      <div className="container-site py-8">
        {collections.length === 0 ? (
          <div className="border border-dashed border-blush-border py-20 text-center text-muted">
            No collections yet — check back soon.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-3 lg:grid-cols-4">
            {collections.map((c, i) => (
              <CollectionCard key={c._id} collection={c} index={i} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
