import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { getSettings } from "@/lib/data";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();

  return (
    <>
      <AnnouncementBar
        enabled={settings.announcementEnabled}
        text={settings.announcementText}
      />
      <Navbar />
      <main className="min-h-[60vh]">{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
