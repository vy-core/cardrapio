"use client";

import { useState } from "react";
import {
  LayoutDashboard, ShoppingBag, Store,
  BarChart3, PieChart, LogOut, Menu, X, CheckCircle2, ChevronRight
} from "lucide-react";
import { MOCK_ORDERS, MOCK_PRODUCTS } from "@/lib/mocks";
import { formatPrice, timeAgo, STATUS_LABELS, STATUS_COLORS, PAYMENT_LABELS } from "@/lib/utils";

type AdminTab = "dashboard" | "pedidos" | "produtos" | "relatorios" | "analytics";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>("pedidos");
  const [sideOpen, setSideOpen] = useState(false);

  const TABS = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "pedidos", label: "Pedidos", icon: ShoppingBag },
    { id: "produtos", label: "Produtos", icon: Store },
    { id: "relatorios", label: "Relatórios", icon: BarChart3 },
    { id: "analytics", label: "Analytics", icon: PieChart },
  ] as const;

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 text-gray-900">
      {/* Mobile overlay */}
      {sideOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSideOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 ${sideOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        {/* Brand */}
        <div className="flex items-center gap-3 px-6 py-6 border-b border-gray-100">
          <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center shadow-md">
            <span className="text-white text-[18px]">🟣</span>
          </div>
          <div>
            <h2 className="font-sans font-bold text-gray-900 leading-tight">Admin Premium</h2>
            <p className="text-xs text-gray-500 font-medium">Açaiteria</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 flex flex-col gap-1.5 overflow-y-auto">
          {TABS.map((tab) => {
            const active = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setSideOpen(false); }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[15px] font-semibold transition-all ${
                  active
                    ? "bg-brand-50 text-brand-700 hover:bg-brand-100"
                    : "text-gray-600 hover:bg-gray-100/80 hover:text-gray-900"
                }`}
              >
                <Icon className={`w-5 h-5 ${active ? "text-brand-600" : "text-gray-400"}`} />
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="p-4 border-t border-gray-100 bg-gray-50/50">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-gray-600 hover:text-red-600 hover:bg-red-50 transition-all">
            <LogOut className="w-4 h-4" />
            Sair do sistema
          </button>
        </div>
      </aside>

      {/* Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center px-4 h-16 bg-white border-b border-gray-200">
          <button onClick={() => setSideOpen(true)} className="p-2 -ml-2 text-gray-600">
            <Menu className="w-6 h-6" />
          </button>
          <span className="font-bold text-gray-900 capitalize ml-2">{activeTab}</span>
        </div>

        <main className="flex-1 overflow-auto p-4 sm:p-8">
          <div className="max-w-6xl mx-auto h-full flex flex-col">
            {/* Header */}
            <header className="mb-8 mt-2 hidden lg:block">
              <h1 className="text-3xl font-bold text-gray-900 capitalize tracking-tight font-sans">
                {activeTab}
              </h1>
              <p className="text-gray-500 mt-1 font-medium">Gerencie sua açaiteria de forma inteligente.</p>
            </header>

            {/* View Switching */}
            {activeTab === "dashboard" && <DashboardView />}
            {activeTab === "pedidos" && <PedidosView />}
            {activeTab === "produtos" && <ProdutosView />}
            {activeTab === "relatorios" && <BlankView title="Relatórios Financeiros" desc="Em breve: resumos em PDF e faturamento." />}
            {activeTab === "analytics" && <BlankView title="Analytics" desc="Em breve: mapas de calor de vendas e horários de pico." />}
          </div>
        </main>
      </div>
    </div>
  );
}

function DashboardView() {
  const cards = [
    { title: "Vendas Hoje", value: formatPrice(1240.50), subtitle: "+15% vs ontem" },
    { title: "Pedidos Concluídos", value: "42", subtitle: "2 cancelados" },
    { title: "Açaí Vendido (Litros)", value: "35L", subtitle: "Média excelente" },
    { title: "Ticket Médio", value: formatPrice(29.50), subtitle: "Estável" }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-[13px] font-bold text-gray-500 uppercase tracking-wider">{c.title}</h3>
            <p className="text-3xl font-black text-gray-900 mt-2">{c.value}</p>
            <p className="text-sm font-semibold text-brand-600 mt-1">{c.subtitle}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-96">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col justify-center items-center text-gray-400 font-medium">
          <BarChart3 className="w-10 h-10 mb-2 opacity-50" />
          [Gráfico de Vendas por Hora aqui]
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col justify-center items-center text-gray-400 font-medium">
          <PieChart className="w-10 h-10 mb-2 opacity-50" />
          [Gráfico de Produtos mais vendidos]
        </div>
      </div>
    </div>
  );
}

function PedidosView() {
  const orders = MOCK_ORDERS;
  
  return (
    <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/2 border-r border-gray-100 flex flex-col">
        <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
          <span className="font-bold text-gray-700">Fila de Pedidos</span>
          <span className="bg-brand-100 font-bold text-brand-700 px-2.5 py-1 rounded-full text-xs">{orders.length} novos</span>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50/50">
          {orders.map((o) => (
            <div key={o.id} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm cursor-pointer hover:border-brand-300 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="text-xs font-bold font-mono text-brand-600 bg-brand-50 px-2 py-0.5 rounded mr-2">{o.tracking_code}</span>
                  <span className="text-xs font-bold text-gray-500 uppercase">{STATUS_LABELS[o.status] || o.status}</span>
                </div>
                <span className="text-xs font-semibold text-gray-400">{timeAgo(o.created_at)}</span>
              </div>
              <h4 className="font-bold text-gray-900 text-base">{o.customer_name}</h4>
              <p className="text-sm font-medium text-gray-500 mt-1 line-clamp-1">{o.items.map(i => `${i.quantity}x ${i.product_name}`).join(", ")}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full lg:w-1/2 bg-white flex flex-col items-center justify-center text-gray-400 p-8 text-center h-96 lg:h-auto">
        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-300">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <p className="font-bold text-gray-700 mb-1">Detalhes do Pedido</p>
        <p className="text-sm text-gray-500">Selecione um pedido na lista para visualizar itens, endereço e despachar.</p>
      </div>
    </div>
  );
}

function ProdutosView() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 overflow-hidden flex flex-col">
      <div className="flex items-center justify-between mb-6">
         <h2 className="text-lg font-bold text-gray-900">Gerenciar Cardápio</h2>
         <button className="bg-brand-600 hover:bg-brand-700 text-white font-bold py-2 px-4 rounded-xl text-sm transition-colors shadow-sm">
           + Novo Produto
         </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="font-bold text-xs text-gray-500 uppercase tracking-wider p-4 pl-0">Produto</th>
              <th className="font-bold text-xs text-gray-500 uppercase tracking-wider p-4">Categoria</th>
              <th className="font-bold text-xs text-gray-500 uppercase tracking-wider p-4">Preço</th>
              <th className="font-bold text-xs text-gray-500 uppercase tracking-wider p-4 text-center">Status</th>
              <th className="font-bold text-xs text-gray-500 uppercase tracking-wider p-4"></th>
            </tr>
          </thead>
          <tbody>
            {MOCK_PRODUCTS.slice(0, 5).map((p) => (
              <tr key={p.id} className="border-b border-gray-50">
                <td className="p-4 pl-0">
                  <p className="font-bold text-[14px] text-gray-900">{p.name}</p>
                  <p className="text-xs font-semibold text-gray-500 mt-1 max-w-[200px] truncate">{p.description}</p>
                </td>
                <td className="p-4 text-sm font-semibold text-gray-600 capitalize">
                  {p.category_id.replace("cat-", "Categoria ")}
                </td>
                <td className="p-4 text-sm font-black text-brand-700">{formatPrice(p.price)}</td>
                <td className="p-4 text-center">
                  <span className={`inline-block px-3 py-1 text-[11px] font-bold uppercase rounded-full ${p.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {p.available ? "Disponível" : "Esgotado"}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button className="text-sm font-bold text-brand-600 hover:underline">Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pt-4 mt-auto border-t border-gray-100 text-center">
        <button className="text-sm font-bold text-gray-500 hover:text-gray-800 transition-colors">Exibir todos ({MOCK_PRODUCTS.length})</button>
      </div>
    </div>
  );
}

function BlankView({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="flex-1 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/50 flex flex-col items-center justify-center text-center p-8">
       <CheckCircle2 className="w-12 h-12 text-brand-300 mb-4" />
       <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
       <p className="font-medium text-gray-500 max-w-sm">{desc}</p>
    </div>
  );
}
