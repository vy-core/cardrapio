"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getAdminToken } from "@/lib/cart-store";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router   = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (pathname === "/admin/login") { setReady(true); return; }
    // const token = getAdminToken();
    // if (!token) { router.replace("/admin/login"); return; }
    setReady(true); // Temporarily bypass for demo
  }, [pathname, router]);

  if (!ready) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {children}
    </div>
  );
}
