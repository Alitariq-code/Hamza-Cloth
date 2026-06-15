import Link from "next/link";
import Image from "next/image";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import { serialize } from "@/lib/serialize";
import { formatPKR } from "@/lib/constants";
import type { IProduct } from "@/types";

export const dynamic = "force-dynamic";

async function getStats() {
  try {
    await dbConnect();
    const [total, newArrivals, onSale, hidden, recent] = await Promise.all([
      Product.countDocuments({}),
      Product.countDocuments({ isNewArrival: true }),
      Product.countDocuments({ isOnSale: true }),
      Product.countDocuments({ isVisible: false }),
      Product.find({}).sort({ createdAt: -1 }).limit(10).lean(),
    ]);
    return {
      total,
      newArrivals,
      onSale,
      hidden,
      recent: serialize<IProduct[]>(recent),
    };
  } catch {
    return {
      total: 0,
      newArrivals: 0,
      onSale: 0,
      hidden: 0,
      recent: [] as IProduct[],
    };
  }
}

export default async function DashboardPage() {
  const stats = await getStats();

  const cards = [
    {
      label: "Total Products",
      urdu: "کل پروڈکٹس",
      value: stats.total,
      accent: "text-ink",
    },
    {
      label: "New Arrivals",
      urdu: "نئی آمد",
      value: stats.newArrivals,
      accent: "text-badge-green",
    },
    {
      label: "On Sale",
      urdu: "سیل پر",
      value: stats.onSale,
      accent: "text-badge-red",
    },
    {
      label: "Hidden",
      urdu: "چھپے ہوئے",
      value: stats.hidden,
      accent: "text-muted",
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-h2 font-bold text-ink">
            Dashboard
          </h1>
          <p className="text-sm text-muted">
            Welcome back 👋{" "}
            <span className="urdu" lang="ur" dir="rtl">
              · خوش آمدید
            </span>
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Link
            href="/admin/products/new"
            className="btn-gold justify-center text-sm"
          >
            + Add Product · نیا پروڈکٹ
          </Link>
          <Link
            href="/admin/collections"
            className="btn-outline justify-center text-sm"
          >
            + Add Collection · نیا کلیکشن
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="card-surface p-4 sm:p-5">
            <p className="text-sm text-muted">{c.label}</p>
            <p className="urdu text-xs text-muted" lang="ur" dir="rtl">
              {c.urdu}
            </p>
            <p className={`mt-1 font-display text-h2 font-bold ${c.accent}`}>
              {c.value}
            </p>
          </div>
        ))}
      </div>

      {/* Recent products */}
      <div className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="font-display text-lg font-bold text-ink">
              Recently Added
            </h2>
            <p className="urdu text-xs text-muted" lang="ur" dir="rtl">
              حال ہی میں شامل کیے گئے
            </p>
          </div>
          <Link
            href="/admin/products"
            className="shrink-0 text-sm font-medium text-gold hover:underline"
          >
            View all → سب دیکھیں
          </Link>
        </div>

        <div className="card-surface overflow-hidden">
          {stats.recent.length === 0 ? (
            <div className="p-8 text-center text-muted">
              <p>
                No products yet.{" "}
                <Link
                  href="/admin/products/new"
                  className="text-gold underline"
                >
                  Add your first product
                </Link>
                .
              </p>
              <p className="urdu mt-2" lang="ur" dir="rtl">
                ابھی کوئی پروڈکٹ نہیں — اوپر دیے گئے بٹن سے اپنا پہلا پروڈکٹ شامل
                کریں۔
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[440px] text-sm">
                <thead className="border-b border-blush-border text-left text-muted">
                  <tr>
                    <th className="px-4 py-3 font-medium">Product · پروڈکٹ</th>
                    <th className="hidden px-4 py-3 font-medium sm:table-cell">
                      Fabric · کپڑا
                    </th>
                    <th className="px-4 py-3 font-medium">Price · قیمت</th>
                    <th className="px-4 py-3 font-medium">Status · حالت</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recent.map((p) => (
                    <tr
                      key={p._id}
                      className="border-b border-blush-border/60 last:border-0"
                    >
                      <td className="px-4 py-3">
                        <Link
                          href={`/admin/products/${p._id}/edit`}
                          className="flex items-center gap-3 hover:text-gold"
                        >
                          <span className="relative block h-12 w-10 shrink-0 overflow-hidden rounded bg-blush-border/50">
                            {p.images?.[0] && (
                              <Image
                                src={p.images[0]}
                                alt=""
                                fill
                                sizes="40px"
                                className="object-cover"
                              />
                            )}
                          </span>
                          <span className="line-clamp-1 font-medium">
                            {p.name}
                          </span>
                        </Link>
                      </td>
                      <td className="hidden px-4 py-3 text-muted sm:table-cell">
                        {p.fabric}
                      </td>
                      <td className="px-4 py-3 text-muted">
                        {formatPKR(p.salePrice || p.price)}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`badge ${
                            p.isVisible
                              ? "bg-badge-green/15 text-badge-green"
                              : "bg-muted/15 text-muted"
                          }`}
                        >
                          {p.isVisible ? "Visible" : "Hidden"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
