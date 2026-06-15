"use client";

import { useEffect, useState } from "react";
import { CloseIcon } from "@/components/Icons";
import { SETTINGS_DEFAULTS } from "@/lib/constants";

export default function AnnouncementBar({
  enabled = SETTINGS_DEFAULTS.announcementEnabled,
  text = SETTINGS_DEFAULTS.announcementText,
}: {
  enabled?: boolean;
  text?: string;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(sessionStorage.getItem("hch-announce-dismissed") !== "1");
  }, []);

  if (!enabled || !text || !visible) return null;

  return (
    <div className="relative bg-gold text-white">
      <div className="container-site flex items-center justify-center gap-2 py-2 text-center text-xs sm:text-sm">
        <span className="font-medium">{text}</span>
        <button
          aria-label="Dismiss announcement"
          onClick={() => {
            sessionStorage.setItem("hch-announce-dismissed", "1");
            setVisible(false);
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 opacity-80 transition hover:opacity-100"
        >
          <CloseIcon width={16} height={16} />
        </button>
      </div>
    </div>
  );
}
