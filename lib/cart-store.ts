"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Produto, Adicionais } from "@/types";

interface CartStore {
  items: CartItem[];
  isOpen: boolean;

  // Actions
  addItem: (product: Produto, quantity?: number, observations?: string, selectedToppings?: Adicionais[]) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, quantity = 1, observations?: string, selectedToppings?: Adicionais[]) => {
        set((state) => {
          const existing = state.items.find((i) =>
            i.produto.id === product.id &&
            i.observations === observations &&
            JSON.stringify(i.selectedToppings || []) === JSON.stringify(selectedToppings || [])
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === existing.id
                  ? { ...i, quantity: i.quantity + quantity }
                  : i
              ),
            };
          }
          return { items: [...state.items, { id: crypto.randomUUID(), produto: product, quantity, observations, selectedToppings }] };
        });
      },

      removeItem: (itemId) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== itemId),
        }));
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.id === itemId ? { ...i, quantity } : i
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),
    }),
    { name: "sorveteria-cart-v2" }
  )
);

export const useTotalItems = () => useCartStore((state) => state.items.reduce((acc, i) => acc + i.quantity, 0));

export const useTotalPrice = () => useCartStore((state) =>
  state.items.reduce((acc, i) => {
    const toppingsPrice = i.selectedToppings?.reduce((sum, t) => sum + t.preco, 0) || 0;
    return acc + (i.produto.preco + toppingsPrice) * i.quantity;
  }, 0)
);

// ─── Order tracking (localStorage) ────────────────────────────────────────────

const TRACKING_KEY = "sorveteria-orders";

export function saveOrderTracking(trackingCode: string) {
  if (typeof window === "undefined") return;
  const existing: string[] = JSON.parse(
    localStorage.getItem(TRACKING_KEY) || "[]"
  );
  const updated = [trackingCode, ...existing.filter((c) => c !== trackingCode)].slice(0, 10);
  localStorage.setItem(TRACKING_KEY, JSON.stringify(updated));
}

export function getTrackedOrders(): string[] {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(TRACKING_KEY) || "[]");
}

// ─── Admin auth (localStorage simulation) ────────────────────────────────────

const AUTH_KEY = "sorveteria-admin-token";

export function saveAdminToken(token: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(AUTH_KEY, token);
}

export function getAdminToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(AUTH_KEY);
}

export function clearAdminToken() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(AUTH_KEY);
}
