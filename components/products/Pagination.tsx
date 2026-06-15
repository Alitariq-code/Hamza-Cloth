import Link from "next/link";

export default function Pagination({
  page,
  pages,
  basePath,
  searchParams = {},
}: {
  page: number;
  pages: number;
  basePath: string;
  searchParams?: Record<string, string | undefined>;
}) {
  if (pages <= 1) return null;

  function hrefFor(p: number) {
    const sp = new URLSearchParams();
    Object.entries(searchParams).forEach(([k, v]) => {
      if (v && k !== "page") sp.set(k, v);
    });
    sp.set("page", String(p));
    return `${basePath}?${sp.toString()}`;
  }

  const nums = Array.from({ length: pages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === pages || Math.abs(p - page) <= 1,
  );

  return (
    <nav className="mt-10 flex items-center justify-center gap-2">
      {page > 1 && (
        <Link href={hrefFor(page - 1)} className="btn-outline px-4 py-2 text-sm">
          Prev
        </Link>
      )}
      {nums.map((p, i) => {
        const gap = i > 0 && p - nums[i - 1] > 1;
        return (
          <span key={p} className="flex items-center gap-2">
            {gap && <span className="text-muted">…</span>}
            <Link
              href={hrefFor(p)}
              className={`flex h-10 w-10 items-center justify-center rounded-btn text-sm transition ${
                p === page
                  ? "bg-gold text-white"
                  : "border border-blush-border bg-surface text-ink hover:border-gold"
              }`}
            >
              {p}
            </Link>
          </span>
        );
      })}
      {page < pages && (
        <Link href={hrefFor(page + 1)} className="btn-outline px-4 py-2 text-sm">
          Next
        </Link>
      )}
    </nav>
  );
}
