import type { Metadata } from "next";
import Image from "next/image";
import { SHOP, SOCIAL } from "@/lib/constants";
import PageHero from "@/components/layout/PageHero";

export const metadata: Metadata = { title: "About Us" };

const REASONS = [
  {
    icon: "🧵",
    title: "Premium Fabric",
    text: "Hand-picked lawn, chiffon, silk & khaddar — quality you can feel.",
  },
  {
    icon: "✨",
    title: "Latest Designs",
    text: "Fresh seasonal drops inspired by modern Pakistani fashion.",
  },
  {
    icon: "💬",
    title: "Easy WhatsApp Ordering",
    text: "No checkout hassle — order and ask anything directly on WhatsApp.",
  },
  {
    icon: "📍",
    title: "Multan Based",
    text: "Proudly crafted and shipped from the heart of Multan, Pakistan.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="Our Story"
        urdu="ہماری کہانی"
        subtitle="Where elegance meets tradition."
        variant="gold"
      />

      <div className="container-site py-12">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-card shadow-gold">
            <Image
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop"
              alt="Hamza Cloth House atelier"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="section-title mb-4">A Family of Fine Fabric</h2>
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
        <section className="mt-16">
          <h2 className="section-title mb-8 text-center">Why Choose Us</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {REASONS.map((r) => (
              <div key={r.title} className="card-surface p-6 text-center">
                <div className="text-4xl">{r.icon}</div>
                <h3 className="mt-3 font-display text-lg font-bold text-ink">
                  {r.title}
                </h3>
                <p className="mt-2 text-sm text-muted">{r.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Location */}
        <section className="mt-16">
          <h2 className="section-title mb-6 text-center">Visit Our Store</h2>
          <p className="mb-6 text-center text-muted">
            {SHOP.name} · {SHOP.addressLine}, {SHOP.city} · {SHOP.timing}
          </p>
          <div className="overflow-hidden rounded-card shadow-gold">
            <iframe
              title="Hamza Cloth House location"
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                SHOP.mapsEmbedQuery,
              )}&output=embed`}
              className="h-[400px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="mt-4 text-center">
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
