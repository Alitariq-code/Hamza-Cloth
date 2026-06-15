import Image from "next/image";
import Link from "next/link";
import { SETTINGS_DEFAULTS } from "@/lib/constants";

export default function HeroSection({
  image = SETTINGS_DEFAULTS.heroImage,
  badgeTitle = SETTINGS_DEFAULTS.heroBadgeTitle,
  badgeSubtitle = SETTINGS_DEFAULTS.heroBadgeSubtitle,
}: {
  image?: string;
  badgeTitle?: string;
  badgeSubtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="container-site grid items-center gap-10 py-12 lg:grid-cols-2 lg:py-20">
        {/* Left — brand text */}
        <div className="order-2 lg:order-1">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
            Multan · Pakistan
          </p>
          <h1 className="font-display text-h1 font-bold leading-tight text-ink sm:text-hero">
            Hamza
            <br />
            <span className="relative inline-block">
              Cloth House
              <span className="absolute -bottom-2 left-0 h-1 w-full origin-left animate-underline-grow rounded-full bg-gold" />
            </span>
          </h1>

          <p className="mt-7 max-w-md text-lg text-muted">
            Where Elegance Meets Tradition.
          </p>
          <p
            className="urdu mt-1 max-w-md text-lg text-muted"
            lang="ur"
            dir="rtl"
          >
            جہاں خوبصورتی روایت سے ملتی ہے
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/products" className="btn-gold">
              Explore Collection
            </Link>
            <Link href="/new-arrivals" className="btn-outline">
              New Arrivals
            </Link>
          </div>
        </div>

        {/* Right — cinematic image with pink overlay */}
        <div className="order-1 lg:order-2">
          <div className="relative aspect-[4/5] overflow-hidden rounded-card shadow-gold-lg sm:aspect-[3/4]">
            <Image
              src={image}
              alt="Hamza Cloth House — featured collection"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-rose/50 via-rose/10 to-transparent" />
            {(badgeTitle || badgeSubtitle) && (
              <div className="absolute bottom-5 left-5 rounded-card bg-white/85 px-5 py-3 backdrop-blur">
                {badgeTitle && (
                  <p className="font-display text-lg font-bold text-ink">
                    {badgeTitle}
                  </p>
                )}
                {badgeSubtitle && (
                  <p className="text-sm text-muted">{badgeSubtitle}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
