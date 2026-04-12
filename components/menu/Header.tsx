"use client";

import { Info, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const totalItems = useCartStore((s) => s.totalItems());
  const totalPrice = useCartStore((s) => s.totalPrice());
  const openCart   = useCartStore((s) => s.openCart);
  const pathname   = usePathname();

  if (pathname === "/about") return null;

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-brand-100 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 h-[72px] flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-brand-600 flex items-center justify-center shadow-md">
            <span className="text-xl text-white">🟣</span>
          </div>
          <div>
            <h1 className="font-display text-gray-900 font-bold text-lg leading-tight">
              Açaiteria Premium
            </h1>
            <Link href="/about" className="flex items-center gap-1 text-xs font-medium text-brand-600 hover:text-brand-800 transition-colors mt-0.5">
              <Info className="w-3 h-3" />
              <span>Ver informações da loja</span>
            </Link>
          </div>
        </div>

        {/* Cart button */}
        <button
          onClick={openCart}
          className="relative flex items-center gap-3 bg-brand-600 hover:bg-brand-700 active:scale-95 text-white rounded-2xl px-5 py-3 transition-all shadow-md group"
        >
          <ShoppingBag className="w-5 h-5" />
          <span className="text-sm font-semibold hidden md:block">
            {totalItems > 0 ? formatPrice(totalPrice) : "Ver carrinho"}
          </span>
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 w-6 h-6 bg-brand-900 text-white text-xs font-bold rounded-full flex items-center justify-center shadow">
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
