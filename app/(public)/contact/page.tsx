import type { Metadata } from "next";
import {
  SHOP,
  SOCIAL,
  PHONE_NUMBERS,
  buildWhatsAppLink,
} from "@/lib/constants";
import PageHero from "@/components/layout/PageHero";
import ContactForm from "@/components/ContactForm";
import {
  WhatsAppIcon,
  InstagramIcon,
  FacebookIcon,
  TikTokIcon,
} from "@/components/Icons";

export const metadata: Metadata = { title: "Contact Us" };

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Get in Touch"
        urdu="ہم سے رابطہ کریں"
        subtitle="We'd love to help you find your perfect outfit."
        variant="pink"
      />

      <div className="container-site py-12">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Left — contact info */}
          <div className="space-y-6">
            <div className="space-y-3">
              {PHONE_NUMBERS.map((p, i) => (
                <a
                  key={p.intl}
                  href={buildWhatsAppLink(
                    "Hi! I'd like to place an order.",
                    p.intl,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp w-full py-4 text-base"
                >
                  <WhatsAppIcon width={22} height={22} />{" "}
                  {i === 0 ? "Chat on WhatsApp · " : "Call / WhatsApp · "}
                  {p.display}
                </a>
              ))}
            </div>

            <div className="card-surface p-6">
              <h3 className="mb-3 font-display text-lg font-bold text-ink">
                Visit Our Store
              </h3>
              <p className="font-medium text-ink">{SHOP.name}</p>
              <p className="mt-1 text-muted">{SHOP.addressLine}</p>
              <p className="mt-1 text-muted">{SHOP.city}</p>
              <p className="mt-2 text-muted">{SHOP.timing}</p>
            </div>

            <div className="card-surface p-6">
              <h3 className="mb-4 font-display text-lg font-bold text-ink">
                Follow Us
              </h3>
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
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-blush-border text-muted transition hover:border-gold hover:bg-gold hover:text-white"
                  >
                    <Icon width={20} height={20} />
                  </a>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-card shadow-gold">
              <iframe
                title="Store location"
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  SHOP.mapsEmbedQuery,
                )}&output=embed`}
                className="h-[280px] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Right — form */}
          <ContactForm />
        </div>
      </div>
    </>
  );
}
