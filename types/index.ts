// ─── Domain Types ────────────────────────────────────────────────────────────

export type PaymentMethod = "pix" | "card" | "cash";

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";

export interface Category {
  id: string;
  name: string;
  slug: string;
  active: boolean;
  sort_order: number;
}

export interface Product {
  id: string;
  category: string;
  name: string;
  description: string;
  price: number;
  image_url?: string;
  available: boolean;
  best_seller?: boolean;
}

// ─── Cart ────────────────────────────────────────────────────────────────────

export interface Topping {
  id: string;
  name: string;
  price: number;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  observations?: string;
  selectedToppings?: Topping[];
}

// ─── Orders ──────────────────────────────────────────────────────────────────

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  unit_price: number;
  quantity: number;
  subtotal: number;
}

export interface Order {
  id: string;
  tracking_code: string;
  customer_name: string;
  phone: string;
  address: string;
  payment_method: PaymentMethod;
  change_amount?: number;
  notes?: string;
  status: OrderStatus;
  total: number;
  items: OrderItem[];
  created_at: string;
  updated_at: string;
}

// ─── Admin ───────────────────────────────────────────────────────────────────

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "owner" | "staff";
}

// ─── API Contracts ────────────────────────────────────────────────────────────

export interface CreateOrderPayload {
  customer_name: string;
  phone: string;
  address: string;
  payment_method: PaymentMethod;
  change_amount?: number;
  notes?: string;
  items: { product_id: string; quantity: number }[];
}

export interface CreateOrderResponse {
  order_id: string;
  tracking_code: string;
  status: OrderStatus;
  total: number;
  created_at: string;
}
