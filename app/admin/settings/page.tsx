import SettingsForm from "@/components/admin/SettingsForm";
import { getSettings } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const settings = await getSettings();

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="font-display text-h2 font-bold text-ink">Settings</h1>
        <p className="urdu text-sm text-muted" lang="ur" dir="rtl">
          سائٹ کی ترتیبات
        </p>
      </div>
      <SettingsForm initial={settings} />
    </div>
  );
}
