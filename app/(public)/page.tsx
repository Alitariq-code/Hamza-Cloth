import HeroSection from "@/components/home/HeroSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import NewArrivalsSection from "@/components/home/NewArrivalsSection";
import CollectionsGrid from "@/components/home/CollectionsGrid";
import NewsletterSection from "@/components/home/NewsletterSection";
import { getProducts, getCollections, getSettings } from "@/lib/data";

export const revalidate = 60;

export default async function HomePage() {
  const [featured, newArrivals, collections, settings] = await Promise.all([
    getProducts({ isFeatured: true, limit: 8, sort: "featured" }),
    getProducts({ isNewArrival: true, limit: 8 }),
    getCollections(),
    getSettings(),
  ]);

  return (
    <>
      <HeroSection
        image={settings.heroImage}
        badgeTitle={settings.heroBadgeTitle}
        badgeSubtitle={settings.heroBadgeSubtitle}
      />
      <FeaturedProducts products={featured.products} />
      <NewArrivalsSection products={newArrivals.products} />
      <CollectionsGrid collections={collections} />
      <NewsletterSection />
    </>
  );
}
