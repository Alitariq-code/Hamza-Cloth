"use client";

import { WhatsAppIcon } from "@/components/Icons";
import { buildWhatsAppLink } from "@/lib/constants";

export default function WhatsAppButton() {
  const href = buildWhatsAppLink(
    "Hi Hamza Cloth House! I'd like to know more about your latest collection.",
  );

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform duration-300 hover:scale-110"
    >
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-40" />
      <WhatsAppIcon width={28} height={28} className="relative" />
    </a>
  );
}
