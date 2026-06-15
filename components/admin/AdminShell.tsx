"use client";

import { usePathname } from "next/navigation";
import AdminSidebar from "./AdminSidebar";

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // The login page renders full-screen without the sidebar chrome.
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen flex-col bg-background lg:flex-row">
      <AdminSidebar />
      <div className="flex-1 overflow-x-hidden">{children}</div>
    </div>
  );
}
