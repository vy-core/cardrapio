// ─── Domain Types ────────────────────────────────────────────────────────────

export type PaymentMethod = "pix" | "card" | "cash";

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";

export interface Produto {
  id: string;
  nome: string;
  preco: number;
  image_url: string;
  created_at: string;
  descricao: string;
  disponivel: boolean;
  categoria_id: string;
  updated_at: string;
  categoria: Categoria;
  grupos_adicionais: GruposAdicionais[];
}

export interface Categoria {
  id: string;
  nome: string;
  created_at: string;
  updated_at: string;
  updated_by: string;
}

export interface GruposAdicionais {
  id: string;
  nome: string;
  max_itens: number;
  grupo_id: string;
  required: boolean;
  min_itens: number;
  produto_id: string;
  grupo: Grupo;
}

export interface Grupo {
  id: string;
  nome: string;
  adicionais: Adicionais[];
}

export interface Adicionais {
  id: string;
  nome: string;
  image_url: string;
  preco: number;
  disponivel: boolean;
}

// ─── Cart ────────────────────────────────────────────────────────────────────

export interface CartItem {
  id: string;
  produto: Produto;
  quantity: number;
  observations?: string;
  selectedToppings?: Adicionais[];
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

export type AdminTab = "dashboard" | "pedidos" | "produtos" | "grupos adicionais" | "categorias" | "relatorios" | "analytics";


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
