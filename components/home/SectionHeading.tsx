import Link from "next/link";

export default function SectionHeading({
  title,
  urdu,
  href,
  linkLabel = "View all",
}: {
  title: string;
  urdu?: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="mb-8 flex items-end justify-between gap-4">
      <div>
        <h2 className="section-title">{title}</h2>
        {urdu && (
          <p className="urdu mt-1 text-base text-muted" lang="ur" dir="rtl">
            {urdu}
          </p>
        )}
      </div>
      {href && (
        <Link
          href={href}
          className="shrink-0 text-sm font-medium text-gold transition hover:underline"
        >
          {linkLabel} →
        </Link>
      )}
    </div>
  );
}
