import type { Metadata } from "next";
import Image from "next/image";
import { SHOP, SOCIAL } from "@/lib/constants";
import PageHero from "@/components/layout/PageHero";

export const metadata: Metadata = { title: "About Us" };

const REASONS = [
  {
    title: "Premium Fabric",
    text: "Hand-picked lawn, chiffon, silk & khaddar — quality you can feel.",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3 4-3 4-3-4z" />
        <path d="M4 9l8 13 8-13" />
        <path d="M4 9h16" />
      </svg>
    ),
  },
  {
    title: "Latest Designs",
    text: "Fresh seasonal drops inspired by modern Pakistani fashion.",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l1.8 4.6L18 9l-4.2 1.4L12 15l-1.8-4.6L6 9l4.2-1.4z" />
        <path d="M18 14l.7 1.8L20.5 16l-1.8.6L18 18l-.7-1.4L15.5 16l1.8-.2z" />
      </svg>
    ),
  },
  {
    title: "WhatsApp Ordering",
    text: "No checkout hassle — order and ask anything directly on WhatsApp.",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.5 8.5 0 01-12.5 7.5L3 20l1-4.5A8.5 8.5 0 1121 11.5z" />
      </svg>
    ),
  },
  {
    title: "Multan Based",
    text: "Proudly curated and shipped from the heart of Multan, Pakistan.",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21s-7-5.5-7-11a7 7 0 0114 0c0 5.5-7 11-7 11z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    ),
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title="Where Elegance Meets Tradition"
        urdu="ہماری کہانی"
      />

      <div className="container-site py-12">
        {/* Story */}
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
            <Image
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop"
              alt="Hamza Cloth House atelier"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="animate-reveal">
            <p className="eyebrow mb-3">A Family of Fine Fabric</p>
            <h2 className="mb-4 font-display text-3xl font-bold text-ink">
              Crafted with care, worn with pride
            </h2>
            <p className="leading-relaxed text-muted">
              Hamza Cloth House began with a simple belief: that every woman
              deserves to feel beautiful in clothing that honours both heritage
              and modern style. From our roots in Multan, we curate unstitched
              and ready-to-wear pieces that bring together the softest fabrics,
              intricate craftsmanship, and designs made for real life.
            </p>
            <p className="mt-4 leading-relaxed text-muted">
              Every piece in our collection is chosen with love — so that
              whether it&apos;s an everyday lawn suit or a statement bridal
              ensemble, you wear elegance with ease.
            </p>
          </div>
        </div>

        {/* Why choose us */}
        <section className="mt-20">
          <div className="mb-10 text-center">
            <p className="rule-eyebrow mb-3">The Hamza Promise</p>
            <h2 className="font-display text-3xl font-bold text-ink">
              Why Choose Us
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {REASONS.map((r) => (
              <div
                key={r.title}
                className="group border border-blush-border p-7 text-center transition-all duration-300 hover:border-ink hover:shadow-gold-lg"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-cream text-ink transition group-hover:bg-ink group-hover:text-white">
                  {r.icon}
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                  {r.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {r.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Location */}
        <section className="mt-20">
          <div className="mb-8 text-center">
            <p className="rule-eyebrow mb-3">Come Say Hello</p>
            <h2 className="font-display text-3xl font-bold text-ink">
              Visit Our Store
            </h2>
            <p className="mt-3 text-sm text-muted">
              {SHOP.addressLine}, {SHOP.city} · {SHOP.timing}
            </p>
          </div>
          <div className="overflow-hidden rounded-xl border border-blush-border">
            <iframe
              title="Hamza Cloth House location"
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                SHOP.mapsEmbedQuery,
              )}&output=embed`}
              className="h-[420px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="mt-6 text-center">
            <a
              href={SOCIAL.maps}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              Get Directions
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
