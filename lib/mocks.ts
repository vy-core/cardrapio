import type { Category, Product, Order } from "@/types";

// ─── Categories ───────────────────────────────────────────────────────────────

export const MOCK_CATEGORIES: Category[] = [
  { id: "cat-1", name: "Açaí",          slug: "acai",         emoji: "🟣", active: true, sort_order: 1 },
  { id: "cat-2", name: "Sorvetes",      slug: "sorvetes",     emoji: "🍦", active: true, sort_order: 2 },
  { id: "cat-3", name: "Picolés",       slug: "picoles",      emoji: "🍧", active: true, sort_order: 3 },
  { id: "cat-4", name: "Bebidas",       slug: "bebidas",      emoji: "🥤", active: true, sort_order: 4 },
  { id: "cat-5", name: "Complementos",  slug: "complementos", emoji: "🍫", active: true, sort_order: 5 },
];

// ─── Products ─────────────────────────────────────────────────────────────────

export const MOCK_PRODUCTS: Product[] = [
  // Açaí
  {
    id: "prod-1", category_id: "cat-1",
    name: "Copo de Açaí 300ml",
    description: "Copo de açaí natural, acompanha 2 complementos gratuitos.",
    price: 14.90, available: true,
  },
  {
    id: "prod-2", category_id: "cat-1",
    name: "Barca de Açaí Média",
    description: "Barca com 500g de açaí cremoso, leite condensado, morangos e granola.",
    price: 32.90, available: true,
  },
  {
    id: "prod-3", category_id: "cat-1",
    name: "Copo de Açaí 500ml Puro",
    description: "Copo 500ml de açaí tradicional, sem adições.",
    price: 18.90, available: true,
  },

  // Sorvetes
  {
    id: "prod-4", category_id: "cat-2",
    name: "Copo 2 Bolas",
    description: "Duas bolas de sorvete (Morango, Chocolate, Creme, Flocos).",
    price: 12.00, available: true,
  },
  {
    id: "prod-5", category_id: "cat-2",
    name: "Taça Sundae Especial",
    description: "Três bolas, calda quente, chantilly, amendoim e cereja.",
    price: 24.50, available: true,
  },
  {
    id: "prod-6", category_id: "cat-2",
    name: "Casquinha Trufada",
    description: "Casquinha banhada no chocolate com bola à escolha.",
    price: 8.50, available: true,
  },
  
  // Picolés
  {
    id: "prod-7", category_id: "cat-3",
    name: "Picolé de Fruta",
    description: "Sabores naturais: Limão, Uva, Abacaxi ou Maracujá.",
    price: 4.50, available: true,
  },
  {
    id: "prod-8", category_id: "cat-3",
    name: "Paleta Mexicana Morango",
    description: "Paleta recheada com leite condensado.",
    price: 10.90, available: true,
  },

  // Bebidas
  {
    id: "prod-9", category_id: "cat-4",
    name: "Milkshake Crocante 500ml",
    description: "Sorvete de creme batido com ovomaltine e calda de chocolate.",
    price: 22.90, available: true,
  },
  {
    id: "prod-10", category_id: "cat-4",
    name: "Água Mineral 500ml",
    description: "Com ou sem gás.",
    price: 3.50, available: true,
  },

  // Complementos
  {
    id: "prod-11", category_id: "cat-5",
    name: "Porção de Morangos",
    description: "Morangos frescos fatiados.",
    price: 5.00, available: true,
  },
  {
    id: "prod-12", category_id: "cat-5",
    name: "Nutella Extra",
    description: "Uma generosa colher de Nutella.",
    price: 6.50, available: true,
  },
  {
    id: "prod-13", category_id: "cat-5",
    name: "Leite em Pó",
    description: "Cobertura de leite ninho.",
    price: 3.50, available: true,
  },
];

// ─── Mock Orders ──────────────────────────────────────────────────────────────

export const MOCK_ORDERS: Order[] = [
  {
    id: "ord-001",
    tracking_code: "AC-1234",
    customer_name: "Mariana Souza",
    phone: "11988887777",
    address: "Rua das Bromélias, 102 - Apto 5",
    payment_method: "cash",
    change_amount: 50,
    notes: "Tocar o interfone alto",
    status: "preparing",
    total: 36.80,
    items: [
      { id: "i1", order_id: "ord-001", product_id: "prod-1", product_name: "Copo de Açaí 300ml", unit_price: 14.90, quantity: 2, subtotal: 29.80 },
      { id: "i2", order_id: "ord-001", product_id: "prod-13", product_name: "Leite em Pó", unit_price: 3.50, quantity: 2, subtotal: 7.00 },
    ],
    created_at: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
  },
  {
    id: "ord-002",
    tracking_code: "SR-5678",
    customer_name: "Felipe Almeida",
    phone: "11977776666",
    address: "Av. do Sol, 400",
    payment_method: "pix",
    status: "delivered",
    total: 24.50,
    items: [
      { id: "i3", order_id: "ord-002", product_id: "prod-5", product_name: "Taça Sundae Especial", unit_price: 24.50, quantity: 1, subtotal: 24.50 },
    ],
    created_at: new Date(Date.now() - 50 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
  }
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function getProductsByCategory(categoryId: string): Product[] {
  return MOCK_PRODUCTS.filter((p) => p.category_id === categoryId);
}

export function getOrderByTracking(trackingCode: string): Order | undefined {
  return MOCK_ORDERS.find(
    (o) => o.tracking_code.toLowerCase() === trackingCode.toLowerCase()
  );
}
