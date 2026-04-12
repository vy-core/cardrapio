"use client";

import { useRouter, usePathname } from "next/navigation";
import { IceCream, LayoutDashboard, UtensilsCrossed, LogOut, ChevronRight } from "lucide-react";
import { clearAdminToken } from "@/lib/cart-store";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/admin",         label: "Pedidos",  icon: LayoutDashboard },
  { href: "/admin/cardapio",label: "Cardápio", icon: UtensilsCrossed },
];

export function AdminSidebar() {
  const router   = useRouter();
  const pathname = usePathname();

  function handleLogout() {
    clearAdminToken();
    router.push("/admin/login");
  }

  return (
    <aside className="w-56 flex-shrink-0 bg-gray-950 min-h-screen flex flex-col">
      {/* Logo */}
      <div className="px-5 pt-6 pb-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-brand-600 rounded-xl flex items-center justify-center">
            <IceCream className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-white font-display font-semibold text-sm leading-tight">
              Gelato & Pizza
            </p>
            <p className="text-gray-500 text-[11px]">Painel Admin</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        <p className="text-gray-600 text-[10px] font-medium uppercase tracking-widest px-2 mb-3">
          Menu
        </p>
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <button
              key={href}
              onClick={() => router.push(href)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group",
                active
                  ? "bg-brand-600 text-white"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon className="w-4 h-4" />
              <span className="flex-1 text-left">{label}</span>
              {active && <ChevronRight className="w-3.5 h-3.5 opacity-60" />}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-white/10">
        <div className="px-3 py-2 mb-2">
          <p className="text-gray-400 text-xs font-medium">Administrador</p>
          <p className="text-gray-600 text-[11px] truncate">admin@gelato.com</p>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
        >
          <LogOut className="w-4 h-4" />
          Sair
        </button>
      </div>
    </aside>
  );
}
