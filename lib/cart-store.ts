"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Product } from "@/types";

interface CartStore {
  items: CartItem[];
  isOpen: boolean;

  // Actions
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  // Selectors
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product) => {
        set((state) => {
          const existing = state.items.find((i) => i.product.id === product.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.product.id === product.id
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            };
          }
          return { items: [...state.items, { product, quantity: 1 }] };
        });
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((i) => i.product.id !== productId),
        }));
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.product.id === productId ? { ...i, quantity } : i
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      openCart:   () => set({ isOpen: true }),
      closeCart:  () => set({ isOpen: false }),
      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),

      totalItems: () => get().items.reduce((acc, i) => acc + i.quantity, 0),
      totalPrice: () =>
        get().items.reduce((acc, i) => acc + i.product.price * i.quantity, 0),
    }),
    { name: "sorveteria-cart" }
  )
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
