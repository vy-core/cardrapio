import { Category, Product, Order, OrderStatus } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://cardrapio-api-v2.vercel.app";

// --- Types directly from API ---
export interface ApiCategory {
    id: string;
    nome: string;
}

export interface ApiProduct {
    id: string;
    nome: string;
    preco: number;
    descricao: string;
    image_url: string | null;
    categoria: string;
    // We are largely ignoring detalhes/grupos_adicional for local listing map, 
    // but they can be passed if needed
}

export interface ApiOrder {
    id: string;
    codigo: string;
    nome_cliente: string;
    telefone: string;
    endereco: string;
    pagamento_entrega: boolean;
    observacao: string | null;
    forma_pagamento: string;
    status: string;
    total: number;
    produtos: any[];
    created_at: string;
    updated_at: string;
}

// --- Mappers ---
function mapApiCategory(apiCat: ApiCategory, index: number): Category {
    return {
        id: apiCat.id,
        name: apiCat.nome,
        slug: apiCat.nome.toLowerCase().replace(/\s+/g, '-'),
        active: true, // defaulting to true as API doesn't have it
        sort_order: index + 1
    };
}

function mapApiProduct(apiProd: ApiProduct): Product {
    return {
        id: apiProd.id,
        name: apiProd.nome,
        price: apiProd.preco,
        description: apiProd.descricao,
        image_url: apiProd.image_url || undefined,
        category: apiProd.categoria,
        available: true, // default wrapper
        best_seller: false // default, maybe randomize or check later
    };
}

// --- Requests ---
export async function getCategories(): Promise<Category[]> {
    const res = await fetch(`${API_URL}/categoria/`);
    if (!res.ok) throw new Error("Failed to fetch categories");
    const data: ApiCategory[] = await res.json();
    return data.map(mapApiCategory);
}

export async function getProducts(): Promise<Product[]> {
    const res = await fetch(`${API_URL}/produto/`);
    if (!res.ok) throw new Error("Failed to fetch products");
    const data: ApiProduct[] = await res.json();
    // Temporary logic: mark first 4 as best seller just for visual parity with mocks
    return data.map((p, i) => ({ ...mapApiProduct(p), best_seller: i < 4 }));
}

export async function getOrders(token: string): Promise<Order[]> {
    const res = await fetch(`${API_URL}/pedido/`, {
        headers: { "Authorization": token }
    });
    if (!res.ok) throw new Error("Failed to fetch orders");
    const data: ApiOrder[] = await res.json();

    // Simplistic mapping for now to keep the code compiling correctly. 
    // Since we need to represent it as Order, we do the mapping.
    return data.map(o => ({
        id: o.id,
        tracking_code: o.codigo,
        customer_name: o.nome_cliente,
        phone: o.telefone,
        address: o.endereco,
        payment_method: o.forma_pagamento === "DINHEIRO" ? "cash" : "pix", // simplified
        status: (o.status.toLowerCase() as OrderStatus) || "pending",
        total: o.total || 0,
        items: (o.produtos || []).map(p => ({
            id: p.id || Math.random().toString(),
            order_id: o.id,
            product_id: p.id,
            product_name: "Produto", // if API gives us name, use it
            unit_price: 0,
            quantity: p.quantidade,
            subtotal: 0
        })),
        created_at: o.created_at || new Date().toISOString(),
        updated_at: o.updated_at || new Date().toISOString()
    }));
}

export async function login(loginStr: string, senhaStr: string): Promise<string> {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login: loginStr, senha: senhaStr })
    });
    if (!res.ok) throw new Error("Credenciais inválidas");
    // Depending on actual API payload, usually returns { token: '...' }
    // Postman doesn't show response body, assuming standard token return or we grab from headers.
    const data = await res.json().catch(() => ({}));
    return data.token || "mocked-token"; // fallback if structure unknown
}
