"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/menu/Header";
import { CategoryTabs } from "@/components/menu/CategoryTabs";
import { ProductCard } from "@/components/menu/ProductCard";
import { CartDrawer } from "@/components/menu/CartDrawer";
import { getProducts, getCategories } from "@/lib/api";
import type { Produto, Categoria } from "@/types";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function MenuPage() {
	const [activeCat, setActiveCat] = useState("");
	const [query, setQuery] = useState("");
	const [categories, setCategories] = useState<Categoria[]>([]);
	const [allProducts, setAllProducts] = useState<Produto[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		Promise.all([getCategories(), getProducts()]).then(([cats, prods]) => {
			setCategories(cats);
			setAllProducts(prods);
			setLoading(false);
		}).catch(err => {
			console.error(err);
			setLoading(false);
		});
	}, []);

	const filteredProducts = allProducts.filter((p) => {
		if (activeCat === "") {
			if (!query.trim()) return true;
			return p.nome.toLowerCase().includes(query.toLowerCase());
		}
		const inCat = p.categoria_id === activeCat;
		if (!query.trim()) return inCat;
		return inCat && p.nome.toLowerCase().includes(query.toLowerCase());
	});

	const category = categories.find((c) => c.id === activeCat);

	return (
		<div className="min-h-screen bg-surface-50 flex flex-col">
			<Header />
			<CategoryTabs
				categories={categories}
				active={activeCat}
				onChange={(id) => { setActiveCat(id); setQuery(""); }}
			/>

			<main className="flex-1 w-full max-w-5xl mx-auto px-4 py-6 sm:py-8">
				{/* Section header */}
				<div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
					<div>
						<h2 className="font-sans text-[22px] font-bold text-gray-900 flex items-center gap-2">
							{category?.nome || "Todos os Produtos"}
						</h2>
						<p className="text-[14px] text-gray-500 font-medium mt-1">
							{allProducts.filter((p) => p.categoria_id === activeCat && p.disponivel || activeCat === "").length} itens disponíveis
						</p>
					</div>

					{/* Search */}
					<div className="relative w-full sm:w-72">
						<Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
						<Input
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							placeholder="Buscar nesta categoria..."
							className="w-full pl-10 pr-4 py-3 text-[14px]"
						/>
					</div>
				</div>

				{/* Grid */}
				{loading ? (
					<div className="text-center py-24 text-gray-400 bg-white rounded-3xl border border-gray-100 shadow-sm mx-auto">
						<div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
						<p className="font-bold text-gray-800 text-lg">Carregando...</p>
					</div>
				) : filteredProducts.length === 0 ? (
					<div className="text-center py-24 text-gray-400 bg-white rounded-3xl border border-gray-100 shadow-sm mx-auto">
						<p className="text-5xl mb-4">🔍</p>
						<p className="font-bold text-gray-800 text-lg">Nenhum produto encontrado</p>
						<p className="text-sm mt-1">Tente buscar por outro termo.</p>
					</div>
				) : (
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
						{filteredProducts.map((p, i) => (
							<div
								key={p.id}
								className="animate-slide-up h-full"
								style={{ animationDelay: `${i * 40}ms` }}
							>
								<ProductCard produto={p} />
							</div>
						))}
					</div>
				)}

				{/* Footer note */}
				<div className="text-center mt-12 pb-8 opacity-80">
					<p className="text-[13px] font-medium text-gray-400 mt-2">
						🟣 Produtos preparados na hora com muito carinho
					</p>
				</div>
			</main>

			<CartDrawer />
		</div>
	);
}
