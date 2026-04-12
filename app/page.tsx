"use client";

import { useState } from "react";
import { Header } from "@/components/menu/Header";
import { CategoryTabs } from "@/components/menu/CategoryTabs";
import { ProductCard } from "@/components/menu/ProductCard";
import { CartDrawer } from "@/components/menu/CartDrawer";
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from "@/lib/mocks";
import { Search } from "lucide-react";

export default function MenuPage() {
  const [activeCat, setActiveCat] = useState(MOCK_CATEGORIES[0].id);
  const [query, setQuery]         = useState("");

  const products = MOCK_PRODUCTS.filter((p) => {
    const inCat = p.category_id === activeCat;
    if (!query.trim()) return inCat;
    return inCat && p.name.toLowerCase().includes(query.toLowerCase());
  });

  const category = MOCK_CATEGORIES.find((c) => c.id === activeCat);

  return (
    <div className="min-h-screen bg-surface-50 flex flex-col">
      <Header />
      <CategoryTabs
        categories={MOCK_CATEGORIES}
        active={activeCat}
        onChange={(id) => { setActiveCat(id); setQuery(""); }}
      />

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-6 sm:py-8">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <div>
            <h2 className="font-sans text-[22px] font-bold text-gray-900 flex items-center gap-2">
              <span className="text-2xl">{category?.emoji}</span>
              {category?.name}
            </h2>
            <p className="text-[14px] text-gray-500 font-medium mt-1">
              {MOCK_PRODUCTS.filter((p) => p.category_id === activeCat && p.available).length} itens disponíveis
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar nesta categoria..."
              className="w-full pl-10 pr-4 py-3 text-[14px] rounded-2xl border border-gray-200 bg-surface-100 outline-none focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-100 transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Grid */}
        {products.length === 0 ? (
          <div className="text-center py-24 text-gray-400 bg-white rounded-3xl border border-gray-100 shadow-sm mx-auto">
            <p className="text-5xl mb-4">🔍</p>
            <p className="font-bold text-gray-800 text-lg">Nenhum produto encontrado</p>
            <p className="text-sm mt-1">Tente buscar por outro termo.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
            {products.map((p, i) => (
              <div
                key={p.id}
                className="animate-slide-up h-full"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        )}

        {/* Footer note */}
        <div className="text-center mt-12 pb-8 opacity-80">
          <p className="text-[13px] font-medium text-gray-400 mt-2">
            🟣 Produtos preparados na hora com muito carinho
          </p>
        </div>
      </main>

      <CartDrawer />
    </div>
  );
}
