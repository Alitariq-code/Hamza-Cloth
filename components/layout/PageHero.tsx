export default function PageHero({
  title,
  urdu,
  subtitle,
  variant = "pink",
}: {
  title: string;
  urdu?: string;
  subtitle?: string;
  variant?: "pink" | "red" | "gold";
}) {
  const bg =
    variant === "red"
      ? "from-badge-red/25 via-rose/15 to-background"
      : variant === "gold"
        ? "from-gold/25 via-rose/10 to-background"
        : "from-rose/30 via-rose/10 to-background";

  return (
    <section className={`bg-gradient-to-br ${bg}`}>
      <div className="container-site py-14 text-center">
        <h1 className="font-display text-h1 font-bold text-ink sm:text-hero">
          {title}
        </h1>
        {urdu && (
          <p className="urdu mt-2 text-xl text-muted" lang="ur" dir="rtl">
            {urdu}
          </p>
        )}
        {subtitle && (
          <p className="mx-auto mt-3 max-w-xl text-muted">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
