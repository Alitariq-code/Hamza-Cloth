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
      <nav className="mt-12 flex items-center justify-center gap-1.5">
        {page > 1 && (
          <Link
            href={hrefFor(page - 1)}
            className="flex h-10 items-center gap-1 px-3 text-sm font-medium uppercase tracking-[0.06em] text-ink transition hover:text-muted"
          >
            ← Prev
          </Link>
        )}
        {nums.map((p, i) => {
          const gap = i > 0 && p - nums[i - 1] > 1;
          return (
            <span key={p} className="flex items-center gap-1.5">
              {gap && <span className="px-1 text-muted">…</span>}
              <Link
                href={hrefFor(p)}
                aria-current={p === page ? "page" : undefined}
                className={`flex h-10 w-10 items-center justify-center text-sm transition ${
                  p === page
                    ? "bg-ink font-semibold text-white"
                    : "border border-blush-border bg-white text-ink hover:border-ink"
                }`}
              >
                {p}
              </Link>
            </span>
          );
        })}
        {page < pages && (
          <Link
            href={hrefFor(page + 1)}
            className="flex h-10 items-center gap-1 px-3 text-sm font-medium uppercase tracking-[0.06em] text-ink transition hover:text-muted"
          >
            Next →
          </Link>
        )}
      </nav>
    );
}
