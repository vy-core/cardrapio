"use client";

import { Plus, Minus, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice, cn } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const items          = useCartStore((s) => s.items);
  const addItem        = useCartStore((s) => s.addItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const openCart       = useCartStore((s) => s.openCart);

  const cartItem = items.find((i) => i.product.id === product.id);
  const qty      = cartItem?.quantity ?? 0;

  const handleAdd = () => {
    addItem(product);
  };

  return (
    <div
      className={cn(
        "group relative bg-white rounded-2xl border border-brand-100/50 p-4 flex flex-col gap-3 transition-all duration-200",
        product.available
          ? "hover:shadow-md hover:-translate-y-1"
          : "opacity-60"
      )}
    >
      {!product.available && (
        <span className="absolute top-3 right-3 text-[10px] font-bold bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full border border-gray-200">
          ESGOTADO
        </span>
      )}

      {/* Emoji placeholder styled with new colors */}
      <div className="w-full h-32 rounded-2xl bg-gradient-to-br from-brand-50 to-cream-100 flex items-center justify-center text-5xl select-none shadow-sm">
        {product.category_id === "cat-1" ? "🟣"
          : product.category_id === "cat-2" ? "🍦"
          : product.category_id === "cat-3" ? "🍧"
          : product.category_id === "cat-4" ? "🥤"
          : "🍫"}
      </div>

      <div className="flex-1 flex flex-col gap-1.5 mt-1">
        <h3 className="font-sans font-bold text-gray-900 text-[15px] leading-snug">
          {product.name}
        </h3>
        <p className="text-[13px] text-gray-500 leading-relaxed line-clamp-2">
          {product.description}
        </p>
      </div>

      <div className="flex items-center justify-between mt-2 pt-3 border-t border-brand-50">
        <span className="font-sans font-extrabold text-brand-700 text-[17px]">
          {formatPrice(product.price)}
        </span>

        {product.available && (
          <>
            {qty === 0 ? (
              <button
                onClick={handleAdd}
                className="flex items-center gap-1.5 bg-brand-100 hover:bg-brand-200 active:bg-brand-300 text-brand-800 font-semibold px-4 py-2.5 rounded-full transition-colors"
                aria-label="Adicionar"
              >
                <Plus className="w-4 h-4" />
                <span className="text-sm">Adicionar</span>
              </button>
            ) : (
              <div className="flex items-center gap-1 bg-brand-50 rounded-full p-1 border border-brand-100">
                <button
                  onClick={() => updateQuantity(product.id, qty - 1)}
                  className="w-9 h-9 rounded-full bg-white hover:bg-brand-100 flex items-center justify-center transition-colors shadow-sm text-brand-700"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-6 text-center text-[15px] font-bold text-gray-900">{qty}</span>
                <button
                  onClick={() => addItem(product)}
                  className="w-9 h-9 rounded-full bg-brand-600 hover:bg-brand-700 flex items-center justify-center transition-colors shadow-sm text-white"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {qty > 0 && (
        <button
          onClick={openCart}
          className="w-full flex items-center justify-center gap-1.5 text-[13px] text-brand-600 font-semibold hover:underline mt-1 py-1"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          Visualizar carrinho
        </button>
      )}
    </div>
  );
}
