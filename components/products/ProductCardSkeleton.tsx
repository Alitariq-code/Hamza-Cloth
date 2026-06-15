export default function ProductCardSkeleton() {
  return (
    <div className="card-surface overflow-hidden">
      <div className="skeleton aspect-[4/5] w-full" />
      <div className="flex flex-col gap-3 p-4">
        <div className="skeleton h-4 w-16 rounded-pill" />
        <div className="skeleton h-5 w-3/4 rounded" />
        <div className="skeleton h-5 w-1/3 rounded" />
        <div className="skeleton mt-1 h-10 w-full rounded-btn" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
