"use client";

import { cn } from "@/lib/utils";
import type { Category } from "@/types";

interface CategoryTabsProps {
  categories: Category[];
  active: string;
  onChange: (id: string) => void;
}

export function CategoryTabs({ categories, active, onChange }: CategoryTabsProps) {
  return (
    <div className="sticky top-[72px] z-20 bg-white/95 backdrop-blur-md border-b border-brand-50 shadow-sm">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex gap-2 overflow-x-auto py-3.5 scrollbar-hide no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onChange(cat.id)}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-full text-[14px] font-semibold whitespace-nowrap transition-all border",
                active === cat.id
                  ? "bg-brand-600 text-white border-brand-600 shadow-md transform scale-[1.02]"
                  : "bg-white text-gray-600 border-gray-200 hover:border-brand-200 hover:bg-brand-50"
              )}
            >
              <span className="text-lg">{cat.emoji}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
