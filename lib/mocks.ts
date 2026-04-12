import type { Category, Product, Order } from "@/types";

// ─── Categories ───────────────────────────────────────────────────────────────

export const MOCK_CATEGORIES: Category[] = [
  { id: "acai", name: "Açaí", slug: "acai", emoji: "🟣", active: true, sort_order: 1 },
  { id: "sorvete", name: "Sorvetes", slug: "sorvetes", emoji: "🍦", active: true, sort_order: 2 },
  { id: "picole", name: "Picolés", slug: "picoles", emoji: "🍧", active: true, sort_order: 3 },
  { id: "bebida", name: "Bebidas", slug: "bebidas", emoji: "🥤", active: true, sort_order: 4 },
  { id: "complemento", name: "Complementos", slug: "complementos", emoji: "🍫", active: true, sort_order: 5 },
];

// ─── Products ─────────────────────────────────────────────────────────────────

export const MOCK_PRODUCTS: Product[] = [
  // Açaí
  {
    id: "prod-1", category: "acai",
    name: "Copo de Açaí 300ml",
    description: "Copo de açaí natural, acompanha 2 complementos gratuitos.",
    price: 14.90, available: true,
    image_url: "https://images.unsplash.com/photo-1676515841519-7bb498597c73?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    best_seller: true
  },
  {
    id: "prod-2", category: "acai",
    name: "Barca de Açaí Média",
    description: "Barca com 500g de açaí cremoso, leite condensado, morangos e granola.",
    price: 32.90, available: true,
    image_url: "https://images.unsplash.com/photo-1610450624105-58a2f25f7911?q=80&w=715&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: "prod-3", category: "acai",
    name: "Copo de Açaí 500ml Puro",
    description: "Copo 500ml de açaí tradicional, sem adições.",
    price: 18.90, available: true,
    image_url: "https://images.unsplash.com/photo-1672959202028-51e3b71255bd?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },

  // Sorvetes
  {
    id: "prod-4", category: "sorvete",
    name: "Sorvete Sabores",
    description: "Sabores variados de sorvete (Morango, Chocolate, Creme, Flocos).",
    price: 4.00, available: true,
    image_url: "https://images.unsplash.com/photo-1621096229451-38ce90f1035c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    best_seller: true
  },
  {
    id: "prod-5", category: "sorvete",
    name: "Taça Sundae Especial",
    description: "Três bolas, calda quente, chantilly, amendoim e cereja.",
    price: 24.50, available: true,
    image_url: "https://images.unsplash.com/photo-1695886855588-47117bca2fe6?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: "prod-6", category: "sorvete",
    name: "Casquinha Trufada",
    description: "Casquinha banhada no chocolate com bola à escolha.",
    price: 8.50, available: true,
    image_url: "https://images.unsplash.com/photo-1580915411954-282cb1b0d780?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },

  // Picolés
  {
    id: "prod-7", category: "picole",
    name: "Picolé de Fruta",
    description: "Sabores naturais: Limão, Uva, Abacaxi ou Maracujá.",
    price: 4.50, available: true,
    image_url: "https://plus.unsplash.com/premium_photo-1669905375364-df717469e14c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    best_seller: true
  },
  {
    id: "prod-8", category: "picole",
    name: "Paleta Mexicana Morango",
    description: "Paleta recheada com leite condensado.",
    price: 10.90, available: true,
    image_url: "https://images.unsplash.com/photo-1594305178909-03ab72b8205e?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },

  // Bebidas
  {
    id: "prod-9", category: "bebida",
    name: "Milkshake Crocante 500ml",
    description: "Sorvete de creme batido com ovomaltine e calda de chocolate.",
    price: 22.90, available: true,
    image_url: "https://images.unsplash.com/photo-1592452319703-9a68b88dd26b?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    best_seller: true
  },
  {
    id: "prod-10", category: "bebida",
    name: "Água Mineral 500ml",
    description: "Com ou sem gás.",
    price: 3.50, available: true,
    image_url: "https://images.unsplash.com/photo-1616118132534-381148898bb4?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: "prod-11", category: "bebida",
    name: "Refrigerante 2L",
    description: "Coca-Cola, Guaraná, Soda.",
    price: 10.00, available: true,
    image_url: "https://images.unsplash.com/photo-1649550275607-e0835d18a9a7?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },

  // Complementos
  {
    id: "prod-12", category: "complemento",
    name: "Porção de Morangos",
    description: "Morangos frescos fatiados.",
    price: 5.00, available: true,
    image_url: "https://images.unsplash.com/photo-1724237890317-d0f88e3ae765?q=80&w=1467&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: "prod-13", category: "complemento",
    name: "Nutella Extra",
    description: "Uma generosa colher de Nutella.",
    price: 6.50, available: true,
    image_url: "https://images.unsplash.com/photo-1543254077-8bd7c22afbf1?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: "prod-14", category: "complemento",
    name: "Leite em Pó",
    description: "Cobertura de leite ninho.",
    price: 3.50, available: true,
    image_url: "https://images.unsplash.com/photo-1774793476321-70f77d85a3a7?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
  return MOCK_PRODUCTS.filter((p) => p.category === categoryId);
}

export function getOrderByTracking(trackingCode: string): Order | undefined {
  return MOCK_ORDERS.find(
    (o) => o.tracking_code.toLowerCase() === trackingCode.toLowerCase()
  );
}
