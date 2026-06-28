import Image from "next/image";
import Link from "next/link";
import type { ICollection } from "@/types";

const PLACEHOLDER =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIj48cmVjdCB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI0YyRjJGMiIvPjwvc3ZnPg==";

export default function CollectionCard({
  collection: c,
  index = 0,
}: {
  collection: ICollection & { itemCount?: number };
  index?: number;
}) {
  return (
    <Link
      href={`/collections/${c.slug}`}
      className="group animate-reveal block"
      style={{ animationDelay: `${Math.min(index, 8) * 60}ms` }}
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-[#f2f2f2]">
        <Image
          src={c.coverImage || PLACEHOLDER}
          alt={c.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
          {c.urduTagline && (
            <p className="urdu mb-1 text-sm text-white/80" lang="ur" dir="rtl">
              {c.urduTagline}
            </p>
          )}
          <h3 className="font-display text-xl font-semibold sm:text-2xl">
            {c.name}
          </h3>
          <div className="mt-2 flex items-center gap-3 text-[11px] uppercase tracking-[0.12em] text-white/85">
            <span>{c.itemCount ?? 0} items</span>
            <span className="h-px w-6 bg-white/50 transition-all duration-300 group-hover:w-10" />
            <span>Shop Now</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
