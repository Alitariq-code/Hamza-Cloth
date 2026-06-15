import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getCollections } from "@/lib/data";
import PageHero from "@/components/layout/PageHero";

export const metadata: Metadata = { title: "Collections" };
export const revalidate = 60;

const PLACEHOLDER =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIj48cmVjdCB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI0U4QjRCOCIvPjwvc3ZnPg==";

export default async function CollectionsPage() {
  const collections = await getCollections();

  return (
    <>
      <PageHero
        title="Our Collections"
        urdu="کلیکشن"
        subtitle="Curated edits for every season and occasion."
        variant="gold"
      />
      <div className="container-site py-10">
        {collections.length === 0 ? (
          <div className="rounded-card border border-dashed border-blush-border bg-surface py-20 text-center text-muted">
            No collections yet — check back soon.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {collections.map((c) => (
              <Link
                key={c._id}
                href={`/collections/${c.slug}`}
                className="group card-surface overflow-hidden hover:-translate-y-1 hover:shadow-gold-lg"
              >
                <div className="relative aspect-[3/2] overflow-hidden">
                  <Image
                    src={c.coverImage || PLACEHOLDER}
                    alt={c.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-bold text-ink group-hover:text-gold">
                    {c.name}
                  </h3>
                  {c.urduTagline && (
                    <p className="urdu text-sm text-gold" lang="ur" dir="rtl">
                      {c.urduTagline}
                    </p>
                  )}
                  {c.description && (
                    <p className="mt-1 line-clamp-2 text-sm text-muted">
                      {c.description}
                    </p>
                  )}
                  <div className="mt-3 flex items-center justify-between">
                    <span className="pill">{c.itemCount ?? 0} items</span>
                    <span className="text-sm font-medium text-gold">
                      View Collection →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
