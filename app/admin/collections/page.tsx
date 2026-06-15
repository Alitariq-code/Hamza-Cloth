import CollectionsManager from "@/components/admin/CollectionsManager";

export const dynamic = "force-dynamic";

export default function AdminCollectionsPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="font-display text-h2 font-bold text-ink">Collections</h1>
        <p className="urdu text-sm text-muted" lang="ur" dir="rtl">
          کلیکشنز کا انتظام
        </p>
      </div>
      <CollectionsManager />
    </div>
  );
}
