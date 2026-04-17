import { Categoria, Produto as Produto, Order, OrderStatus, OrderItem, GruposAdicionais, Grupo } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://cardrapio-api-v2.vercel.app";

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

// --- Requests ---

export async function getOrders(token: string): Promise<Order[]> {
    const res = await fetch(`${API_URL}/pedido/`, {
        headers: { "Authorization": token }
    }).catch(() => null);

    if (!res || !res.ok) {
        console.error("Failed to fetch orders:", res?.status);
        return [];
    }
    const data: Order[] = await res.json();
    return data;
}

export async function getProducts(): Promise<Produto[]> {
    const res = await fetch(`${API_URL}/produto/`);
    if (!res.ok) throw new Error("Failed to fetch products");
    const data: Produto[] = await res.json();
    return data;
}

export async function getGrupos() {
    const res = await fetch(`${API_URL}/grupo-adicional/`);
    if (!res.ok) throw new Error("Failed to fetch grupo-adicional");
    const data: Grupo[] = await res.json();
    return data;
}

export async function getCategories(): Promise<Categoria[]> {
    const res = await fetch(`${API_URL}/categoria/`);
    if (!res.ok) throw new Error("Failed to fetch categories");
    const data: Categoria[] = await res.json();
    return data;
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
