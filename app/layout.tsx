import type { Metadata } from "next";
import { Playfair_Display, Inter, Noto_Nastaliq_Urdu } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const notoUrdu = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-urdu",
  display: "swap",
});

const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Hamza Cloth House";

export const metadata: Metadata = {
  title: {
    default: `${siteName} — Where Elegance Meets Tradition`,
    template: `%s · ${siteName}`,
  },
  description:
    "Hamza Cloth House — premium Pakistani women's clothing from Multan. Lawn, chiffon, silk & khaddar suits. Order easily on WhatsApp.",
  keywords: [
    "Pakistani clothing",
    "women's lawn suits",
    "Multan fashion",
    "chiffon",
    "silk",
    "Hamza Cloth House",
  ],
  openGraph: {
    title: siteName,
    description: "Where Elegance Meets Tradition — Multan, Pakistan.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${inter.variable} ${notoUrdu.variable} font-body bg-background text-ink antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
