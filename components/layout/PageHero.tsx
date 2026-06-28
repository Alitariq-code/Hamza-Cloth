export default function PageHero({
  title,
  urdu,
  subtitle,
  eyebrow,
}: {
  title: string;
  urdu?: string;
  subtitle?: string;
  eyebrow?: string;
}) {
  return (
    <section className="border-b border-blush-border bg-cream">
      <div className="container-site animate-reveal py-10 text-center sm:py-14">
        {eyebrow && <p className="rule-eyebrow mb-3">{eyebrow}</p>}
        <h1 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-[2.8rem]">
          {title}
        </h1>
        {urdu && (
          <p className="urdu mt-2 text-lg text-muted" lang="ur" dir="rtl">
            {urdu}
          </p>
        )}
        {subtitle && (
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
