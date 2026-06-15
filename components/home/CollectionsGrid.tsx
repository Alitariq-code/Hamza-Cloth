import Image from "next/image";
import Link from "next/link";
import SectionHeading from "./SectionHeading";
import type { ICollection } from "@/types";

const PLACEHOLDER =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIj48cmVjdCB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI0U4QjRCOCIvPjwvc3ZnPg==";

export default function CollectionsGrid({
  collections,
}: {
  collections: ICollection[];
}) {
  if (!collections.length) return null;

  return (
    <section className="container-site py-14">
      <SectionHeading
        title="Shop by Collection"
        urdu="کلیکشن"
        href="/collections"
      />
      <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3">
        {collections.slice(0, 6).map((c, i) => (
          <Link
            key={c._id}
            href={`/collections/${c.slug}`}
            className={`group relative overflow-hidden rounded-card shadow-gold ${
              i === 0 ? "col-span-2 md:col-span-1 md:row-span-2" : ""
            }`}
          >
            <div
              className={`relative ${
                i === 0 ? "aspect-[2/1] md:aspect-[3/4]" : "aspect-[3/2]"
              }`}
            >
              <Image
                src={c.coverImage || PLACEHOLDER}
                alt={c.name}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="font-display text-lg font-bold text-white">
                  {c.name}
                </h3>
                {c.urduTagline && (
                  <p
                    className="urdu text-sm text-white/90"
                    lang="ur"
                    dir="rtl"
                  >
                    {c.urduTagline}
                  </p>
                )}
                {typeof c.itemCount === "number" && (
                  <p className="text-sm text-white/80">
                    {c.itemCount} {c.itemCount === 1 ? "item" : "items"}
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
