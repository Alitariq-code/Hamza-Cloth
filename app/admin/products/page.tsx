import Link from "next/link";
import ProductsTable from "@/components/admin/ProductsTable";

export const dynamic = "force-dynamic";

export default function AdminProductsPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-h2 font-bold text-ink">Products</h1>
          <p className="urdu text-sm text-muted" lang="ur" dir="rtl">
            پروڈکٹس کا انتظام
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="btn-gold justify-center text-sm"
        >
          + Add Product · نیا پروڈکٹ
        </Link>
      </div>
      <ProductsTable />
    </div>
  );
}
