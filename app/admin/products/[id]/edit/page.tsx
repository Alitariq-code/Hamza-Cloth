import { notFound } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";
import { getAllCollections, getProductById } from "@/lib/adminData";

export const dynamic = "force-dynamic";

export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const [product, collections] = await Promise.all([
    getProductById(params.id),
    getAllCollections(),
  ]);

  if (!product) notFound();

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="font-display text-h2 font-bold text-ink">Edit Product</h1>
        <p className="urdu text-sm text-muted" lang="ur" dir="rtl">
          پروڈکٹ میں تبدیلی کریں
        </p>
      </div>
      <ProductForm product={product} collections={collections} />
    </div>
  );
}
