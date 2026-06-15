import Link from "next/link";
import {
  SITE_NAME,
  SOCIAL,
  SHOP,
  PHONE_NUMBERS,
  NAV_LINKS,
  buildWhatsAppLink,
} from "@/lib/constants";
import {
  InstagramIcon,
  FacebookIcon,
  TikTokIcon,
  WhatsAppIcon,
} from "@/components/Icons";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-blush-border bg-surface">
      <div className="container-site grid gap-10 py-14 md:grid-cols-4">
        {/* Brand */}
        <div className="md:col-span-1">
          <h3 className="font-display text-2xl font-bold text-ink">
            Hamza<span className="text-gold"> Cloth House</span>
          </h3>
          <p className="mt-3 text-sm text-muted">
            Where Elegance Meets Tradition.
          </p>
          <p className="urdu mt-1 text-sm text-muted" lang="ur">
            جہاں خوبصورتی روایت سے ملتی ہے
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-ink">
            Explore
          </h4>
          <ul className="space-y-2.5 text-sm text-muted">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition hover:text-gold">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Visit */}
        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-ink">
            Visit Us
          </h4>
          <p className="text-sm text-muted">{SHOP.addressLine}</p>
          <p className="mt-1 text-sm text-muted">{SHOP.city}</p>
          <p className="mt-2 text-sm text-muted">{SHOP.timing}</p>
          <a
            href={SOCIAL.maps}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-sm font-medium text-gold hover:underline"
          >
            Open in Google Maps →
          </a>
        </div>

        {/* Connect */}
        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-ink">
            Connect
          </h4>
          <div className="mb-4 space-y-2">
            {PHONE_NUMBERS.map((p) => (
              <a
                key={p.intl}
                href={buildWhatsAppLink(
                  "Hi! I'd like to place an order.",
                  p.intl,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-[#25D366]"
              >
                <WhatsAppIcon width={18} height={18} /> {p.display}
              </a>
            ))}
          </div>
          <div className="flex gap-3">
            {[
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
                className="flex h-10 w-10 items-center justify-center rounded-full border border-blush-border text-muted transition hover:border-gold hover:bg-gold hover:text-white"
              >
                <Icon width={18} height={18} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-blush-border">
        <div className="container-site flex flex-col items-center justify-between gap-2 py-5 text-center text-xs text-muted sm:flex-row sm:text-left">
          <p>
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
            <span className="urdu mx-2" lang="ur">
              جملہ حقوق محفوظ ہیں
            </span>
          </p>
          <p>Made with ❤️ in Multan, Pakistan</p>
        </div>
      </div>
    </footer>
  );
}
