"use client";

import { useState } from "react";
import {
	LayoutDashboard, ShoppingBag, Store,
	BarChart3, PieChart, CheckCircle2,
	DollarSign,
	TrendingUp,
	TrendingDown,
	CircleDollarSign,
	HandCoins,
	IceCreamCone
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/admin/DashboardSidebar";
import ProdutosView from "./components/views/products";
import PedidosView from "./components/views/orders";
import DashboardView from "./components/views/dashboard";

type AdminTab = "dashboard" | "pedidos" | "produtos" | "relatorios" | "analytics";

export default function AdminDashboardPage() {
	const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");

	return (
		<SidebarProvider>
			<DashboardSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
			<div className="flex min-h-screen w-full bg-surface-50 text-gray-900">

				<div className="flex-1 flex flex-col min-w-0">
					<header className="flex h-16 shrink-0 items-center gap-2 border-b border-gray-200 px-4 bg-white">
						<SidebarTrigger className="-ml-1" />
						<Separator orientation="vertical" className="mr-2 h-4" />
						<span className="font-bold text-2xl text-brand-900 capitalize font-sans">{activeTab}</span>
					</header>

					<main className="flex-1 overflow-auto p-4 sm:p-8">
						<div className="max-w-6xl mx-auto h-full flex flex-col">
							<header className="mb-8 hidden lg:block">
								<h1 className="text-3xl font-bold text-gray-900 capitalize tracking-tight font-sans">
									{activeTab}
								</h1>
								<p className="text-gray-500 mt-1 font-medium">Gerencie sua açaiteria de forma inteligente.</p>
							</header>

							{activeTab === "dashboard" && <DashboardView />}
							{activeTab === "pedidos" && <PedidosView />}
							{activeTab === "produtos" && <ProdutosView />}
							{activeTab === "relatorios" && <BlankView title="Relatórios Financeiros" desc="Em breve: resumos em PDF e faturamento." />}
							{activeTab === "analytics" && <BlankView title="Analytics" desc="Em breve: mapas de calor de vendas e horários de pico." />}
						</div>
					</main>
				</div>
			</div>
		</SidebarProvider>
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
