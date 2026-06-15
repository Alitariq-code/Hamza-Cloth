export const SITE_NAME =
  process.env.NEXT_PUBLIC_SITE_NAME || "Hamza Cloth House";

// Primary WhatsApp / ordering number (intl format, no +).
export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "923084265402";

// All contact phone numbers shown across the site.
export const PHONE_NUMBERS = [
  { display: "0308 4265402", intl: "923084265402" },
  { display: "0317 7033935", intl: "923177033935" },
];

export const SOCIAL = {
  instagram:
    process.env.NEXT_PUBLIC_INSTAGRAM_URL ||
    "https://instagram.com/hamzaclothinghouse",
  facebook:
    process.env.NEXT_PUBLIC_FACEBOOK_URL ||
    "https://facebook.com/hamzaclothinghouse",
  tiktok:
    process.env.NEXT_PUBLIC_TIKTOK_URL ||
    "https://tiktok.com/@hamzaclothinghouse",
  maps:
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL ||
    "https://maps.google.com/?q=Haji+Iqbal+Market+Bohar+Gate+Multan",
};

export const SHOP = {
  name: "Hamza Cloth House",
  addressLine:
    "Androon Bohar Gate, Near Sadiq Pehalwan ka Daira, Haji Iqbal Market, Multan",
  city: "Multan, Pakistan",
  timing: "Mon – Sat: 11:00 AM – 9:00 PM",
  // Embeddable Google Maps query for the store location.
  mapsEmbedQuery: "Haji Iqbal Market Bohar Gate Multan",
};

/** Fallback site settings used when none are saved in the database yet. */
export const SETTINGS_DEFAULTS = {
  announcementEnabled: true,
  announcementText:
    "✨ Eid Collection 2025 is live — Free delivery across Pakistan on orders over ₨ 5,000",
  heroImage:
    "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1200&auto=format&fit=crop",
  heroBadgeTitle: "Eid Collection 2025",
  heroBadgeSubtitle: "Lawn · Chiffon · Silk",
};

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Collections", href: "/collections" },
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "Sale", href: "/sale" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/** Build a wa.me link with a pre-filled, URL-encoded message. */
export function buildWhatsAppLink(message: string, number = WHATSAPP_NUMBER) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/** Format a number as PKR currency, e.g. ₨ 2,500 */
export function formatPKR(value: number) {
  return `₨ ${new Intl.NumberFormat("en-PK").format(value)}`;
}

/** Calculate discount percentage between original and sale price. */
export function discountPercent(price: number, salePrice?: number) {
  if (!salePrice || salePrice >= price) return 0;
  return Math.round(((price - salePrice) / price) * 100);
}

/** Make a URL-safe slug from a string. */
export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
