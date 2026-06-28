export default function CollectionHeader({
  eyebrow,
  title,
  count,
}: {
  eyebrow?: string;
  title: string;
  count?: number;
}) {
  return (
    <div className="animate-reveal py-6 text-center sm:py-8">
      {eyebrow && <p className="rule-eyebrow mb-3">{eyebrow}</p>}
      <h1 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-[2.6rem]">
        {title}
      </h1>
      {count != null && (
        <p className="mt-2 text-sm text-muted">
          {count} {count === 1 ? "style" : "styles"}
        </p>
      )}
    </div>
  );
}
