"use client";

import Image from "next/image";
import { useState } from "react";

const PLACEHOLDER =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iNzUwIj48cmVjdCB3aWR0aD0iNjAwIiBoZWlnaHQ9Ijc1MCIgZmlsbD0iI0YwRTZFNiIvPjwvc3ZnPg==";

export default function ProductImageGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const gallery = images.length ? images : [PLACEHOLDER];
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      {/* Main image with hover zoom */}
      <div className="group relative aspect-[4/5] overflow-hidden rounded-card bg-blush-border/40">
        <Image
          src={gallery[active]}
          alt={`${name} — image ${active + 1}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Thumbnail strip */}
      {gallery.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1 no-scrollbar">
          {gallery.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              className={`relative h-20 w-16 shrink-0 overflow-hidden rounded-btn border-2 transition ${
                active === i ? "border-gold" : "border-transparent opacity-70"
              }`}
            >
              <Image
                src={img}
                alt=""
                fill
                sizes="64px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
