import ProductForm from "@/components/admin/ProductForm";
import { getAllCollections } from "@/lib/adminData";

export const dynamic = "force-dynamic";

export default async function NewProductPage() {
  const collections = await getAllCollections();
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="font-display text-h2 font-bold text-ink">Add Product</h1>
        <p className="urdu text-sm text-muted" lang="ur" dir="rtl">
          نیا پروڈکٹ شامل کریں
        </p>
      </div>
      <ProductForm collections={collections} />
    </div>
  );
}
