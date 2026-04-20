import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// ─── Tailwind helper ──────────────────────────────────────────────────────────

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ─── Formatters ───────────────────────────────────────────────────────────────

export function formatPrice(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

export function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "agora mesmo";
  if (mins < 60) return `há ${mins} min`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `há ${hrs}h`;
  return formatDate(iso);
}

// ─── Status helpers ────────────────────────────────────────────────────────────

// export const STATUS_LABELS: Record<OrderStatus, string> = {
//   pending:          "Pendente",
//   confirmed:        "Confirmado",
//   preparing:        "Em preparo",
//   out_for_delivery: "Saiu para entrega",
//   delivered:        "Entregue",
//   cancelled:        "Cancelado",
// };

// export const STATUS_COLORS: Record<OrderStatus, string> = {
//   pending:          "bg-amber-100 text-amber-800 border-amber-200",
//   confirmed:        "bg-blue-100 text-blue-800 border-blue-200",
//   preparing:        "bg-orange-100 text-orange-800 border-orange-200",
//   out_for_delivery: "bg-purple-100 text-purple-800 border-purple-200",
//   delivered:        "bg-green-100 text-green-800 border-green-200",
//   cancelled:        "bg-red-100 text-red-700 border-red-200",
// };

// export const STATUS_STEP: Record<OrderStatus, number> = {
//   pending: 0, confirmed: 1, preparing: 2, out_for_delivery: 3, delivered: 4, cancelled: -1,
// };

// export const NEXT_STATUS: Partial<Record<OrderStatus, OrderStatus>> = {
//   pending:          "confirmed",
//   confirmed:        "preparing",
//   preparing:        "out_for_delivery",
//   out_for_delivery: "delivered",
// };

// ─── Payment labels ───────────────────────────────────────────────────────────

export const PAYMENT_LABELS: Record<string, string> = {
  pix: "Pix",
  card: "Cartão",
  cash: "Dinheiro",
};

// ─── Tracking code generator ──────────────────────────────────────────────────

export function generateTrackingCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "PED-";
  for (let i = 0; i < 4; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

// ─── Phone mask ───────────────────────────────────────────────────────────────

export function maskPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 11)
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  return digits;
}
