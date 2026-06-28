import { SOCIAL, SETTINGS_DEFAULTS } from "@/lib/constants";

/**
 * Thin black utility bar at the very top: promo text on the left,
 * social links (Facebook, TikTok) on the right.
 */
export default function AnnouncementBar({
  enabled = SETTINGS_DEFAULTS.announcementEnabled,
  text = SETTINGS_DEFAULTS.announcementText,
}: {
  enabled?: boolean;
  text?: string;
}) {
  return (
    <div className="bg-ink text-white">
      <div className="container-site flex h-9 items-center justify-between gap-4 text-[11px] uppercase tracking-[0.1em]">
        {/* Promo (optional) */}
        <p className="flex-1 truncate font-medium normal-case tracking-normal opacity-90">
          {enabled && text ? text : ""}
        </p>

        {/* Social links */}
        <div className="flex shrink-0 items-center gap-3">
          <a
            href={SOCIAL.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-80 transition hover:opacity-100"
          >
            Facebook
          </a>
          <span className="opacity-30">|</span>
          <a
            href={SOCIAL.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-80 transition hover:opacity-100"
          >
            TikTok
          </a>
        </div>
      </div>
    </div>
  );
}
