import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { getSettings, getCollections } from "@/lib/data";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, collections] = await Promise.all([
    getSettings(),
    getCollections(),
  ]);

  const navCollections = collections.map((c) => ({
    name: c.name,
    slug: c.slug,
  }));

  return (
    <>
      <AnnouncementBar
        enabled={settings.announcementEnabled}
        text={settings.announcementText}
      />
      <Navbar collections={navCollections} />
      <main className="min-h-[40vh]">{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
