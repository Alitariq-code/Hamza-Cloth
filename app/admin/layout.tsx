import type { Metadata } from "next";
import Providers from "@/components/Providers";
import AdminShell from "@/components/admin/AdminShell";

export const metadata: Metadata = {
  title: "Admin · Hamza Cloth House",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <AdminShell>{children}</AdminShell>
    </Providers>
  );
}
