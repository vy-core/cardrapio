// ─── Domain Types ────────────────────────────────────────────────────────────

export interface OrderStatus {
  status: string;
}

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
  pedido_id: string;
  produto: Produto;
  quantidade: number;
  valor_total: number;
}

export interface Order {
  codigo_rastreio: string;
  nome_cliente: string;
  endereco: string;
  forma_pagamento: string;
  status: OrderStatus;
  created_at: string;
  telefone: string;
  id: string;
  observacao: string;
  pagamento_entrega: boolean;
  total: number;
  troco: number;
  produtos: OrderItem[];
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
  payment_method: string;
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
