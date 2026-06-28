import Link from "next/link";
import {
  SITE_NAME,
  SOCIAL,
  SHOP,
  PHONE_NUMBERS,
  buildWhatsAppLink,
} from "@/lib/constants";
import {
  InstagramIcon,
  FacebookIcon,
  TikTokIcon,
  YouTubeIcon,
} from "@/components/Icons";

type FooterLink = { label: string; href: string; external?: boolean };

const SHOP_LINKS: FooterLink[] = [
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "All Products", href: "/products" },
  { label: "Collections", href: "/collections" },
  { label: "Sale", href: "/sale" },
];

const CARE_LINKS: FooterLink[] = [
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Store Locator", href: SOCIAL.maps, external: true },
  {
    label: "Track Your Order",
    href: buildWhatsAppLink("Hi! I'd like to track my order."),
    external: true,
  },
];

function FooterLinks({ links }: { links: FooterLink[] }) {
  return (
    <ul className="space-y-3 text-sm text-muted">
      {links.map((l) =>
        l.external ? (
          <li key={l.label}>
            <a
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-ink"
            >
              {l.label}
            </a>
          </li>
        ) : (
          <li key={l.label}>
            <Link href={l.href} className="transition hover:text-ink">
              {l.label}
            </Link>
          </li>
        ),
      )}
    </ul>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-blush-border bg-white">
      {/* Back to top */}
      <div className="border-b border-blush-border">
        <a
          href="#top"
          className="block py-6 text-center text-sm font-medium uppercase tracking-[0.1em] text-ink transition hover:text-muted"
        >
          Back to top
        </a>
      </div>

      {/* Newsletter */}
      <div className="container-site flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="font-display text-2xl font-semibold text-ink">
            Join our newsletter
          </h3>
          <p className="mt-1 text-sm text-muted">
            We&apos;ll send you updates once per week.
          </p>
        </div>
        <form className="flex w-full max-w-md items-stretch">
          <input
            type="email"
            placeholder="Enter your email"
            aria-label="Email address"
            className="w-full border border-blush-border px-4 py-3 text-sm outline-none focus:border-ink"
          />
          <button
            type="button"
            className="shrink-0 bg-ink px-6 py-3 text-sm font-medium uppercase tracking-wider text-white transition hover:bg-[#333]"
          >
            Subscribe
          </button>
        </form>
      </div>

      {/* Columns */}
      <div className="container-site grid gap-10 border-t border-blush-border py-10 md:grid-cols-[1.4fr_1fr_1fr]">
        {/* Brand + contact */}
        <div>
          <h2 className="font-display text-2xl font-semibold tracking-[0.18em] text-ink">
            HAMZA<span className="text-[0.7em] align-top">.</span>
          </h2>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            {SHOP.addressLine}
            <br />
            {SHOP.city}
          </p>
          <div className="mt-3 space-y-1 text-sm text-muted">
            <p>Call: +{PHONE_NUMBERS[0].intl}</p>
            <p>WhatsApp: +{PHONE_NUMBERS[1]?.intl ?? PHONE_NUMBERS[0].intl}</p>
            <p>Email: help@hamzaclothhouse.pk</p>
          </div>
        </div>

        {/* Shop */}
        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.08em] text-ink">
            Shop
          </h4>
          <FooterLinks links={SHOP_LINKS} />
        </div>

        {/* Customer Care */}
        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.08em] text-ink">
            Customer Care
          </h4>
          <FooterLinks links={CARE_LINKS} />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-blush-border">
        <div className="container-site flex flex-col items-center justify-between gap-4 py-6 text-xs text-muted sm:flex-row">
          <p>
            © {new Date().getFullYear()}, {SITE_NAME} (PK)
          </p>
          <div className="flex items-center gap-4">
            {[
              { href: SOCIAL.tiktok, Icon: YouTubeIcon, label: "YouTube" },
              { href: SOCIAL.instagram, Icon: InstagramIcon, label: "Instagram" },
              { href: SOCIAL.facebook, Icon: FacebookIcon, label: "Facebook" },
              { href: SOCIAL.tiktok, Icon: TikTokIcon, label: "TikTok" },
            ].map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-muted transition hover:text-ink"
              >
                <Icon width={18} height={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
