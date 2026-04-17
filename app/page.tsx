"use client";

import Link from "next/link";
import { ArrowRight, Star, Heart, CheckCircle2, ChevronRight, MapPin, UserCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import { getProducts } from "@/lib/api";
import type { Produto } from "@/types";
import { ProductCard } from "@/components/menu/ProductCard";

export default function LandingPage() {
	const [products, setProducts] = useState<Produto[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getProducts().then(data => {
			setProducts(data);
			setLoading(false);
		}).catch(err => {
			console.error(err);
			setLoading(false);
		});
	}, []);

	return (
		<main className="min-h-screen bg-cream-50 font-sans text-brand-900 overflow-x-hidden">
			{/* Floating Glass Navigation */}
			<nav className="fixed top-4 left-4 right-4 sm:left-1/2 sm:-translate-x-1/2 sm:w-auto z-50">
				<div className="border border-brand-200 glass rounded-full px-4 sm:px-8 py-2 flex items-center justify-between gap-4 sm:gap-8 shadow-sm">
					<Link href="/" className="sm:font-bold text-lg text-brand-800 tracking-tight whitespace-nowrap">
						Açaí & Cia
					</Link>
					<div className="hidden sm:flex items-center gap-6 text-sm font-medium text-brand-700">
						<a href="#produtos" className="hover:text-brand-500 transition-colors">Produtos</a>
						<a href="#sobre" className="hover:text-brand-500 transition-colors">Sobre</a>
						<Link
							href="/cardapio"
							className="bg-brand-500 hover:bg-brand-600 text-white px-4 py-2 rounded-full text-sm font-semibold transition-all shadow-md hover:shadow-lg whitespace-nowrap flex items-center gap-1"
						>
							Fazer Pedido
						</Link>
					</div>
					<Link
						href="/login"
						className="bg-brand-500 hover:bg-brand-600 text-white px-4 py-2 rounded-full text-sm font-semibold transition-all shadow-md hover:shadow-lg whitespace-nowrap flex items-center gap-1"
					>
						<UserCircle2 className="h-4 w-4" />
						Login
					</Link>
				</div>
			</nav>

			{/* Hero Section */}
			<section className="relative pt-32 pb-20 sm:pt-48 sm:pb-32 px-4 flex flex-col items-center justify-center text-center overflow-hidden">
				{/* Abstract Background Shapes */}
				<div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 bg-cream-50">
					<div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-cream-200/50 blur-[100px]" />
					<div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-brand-100/50 blur-[120px]" />
				</div>

				<div className="max-w-4xl mx-auto flex flex-col items-center">
					<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 text-brand-700 font-medium text-xs sm:text-sm mb-6 border border-brand-200 shadow-sm animate-slide-up">
						<Star className="w-4 h-4 fill-brand-500 text-brand-500" />
						<span>O Melhor Açaí da Região</span>
					</div>

					<h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-brand-900 tracking-tight mb-6 animate-slide-up" style={{ animationDelay: "100ms" }}>
						Refrescante,<br />
						<span className="text-transparent bg-clip-text bg-linear-to-r from-brand-500 to-brand-700">
							Natural e Seu!
						</span>
					</h1>

					<p className="text-lg sm:text-xl text-brand-700/80 mb-10 max-w-2xl font-medium animate-slide-up" style={{ animationDelay: "200ms" }}>
						Nossos ingredientes são selecionados para garantir a melhor qualidade.
						Experimente nossos açaís, sorvetes e taças com o sabor inconfundível que você merece!
					</p>

					<div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-slide-up" style={{ animationDelay: "300ms" }}>
						<Link
							href="/cardapio"
							className="bg-brand-600 hover:bg-brand-700 text-white px-8 py-4 rounded-full text-lg font-bold transition-all shadow-xl hover:shadow-brand-500/30 flex items-center justify-center gap-2 group"
						>
							Ver Cardápio Completo
							<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
						</Link>
					</div>
				</div>
			</section>

			{/* Featured Products Mini-Section */}
			<section id="produtos" className="py-20 px-4 bg-white relative rounded-[3rem] shadow-sm z-10 border border-cream-100 -mt-10 overflow-hidden">
				<div className="container mx-auto max-w-6xl">
					<div className="text-center mb-12 sm:mb-16">
						<h2 className="text-3xl sm:text-5xl font-black text-brand-900 mb-4">Destaques da Casa</h2>
						<p className="text-brand-600 text-lg">Os favoritos dos nossos clientes, preparados com muito amor.</p>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
						{loading ? (
							<div className="col-span-full text-center py-10 font-medium text-brand-600">
								Carregando...
							</div>
						) : (
							products.filter(p => p.best_seller == true).slice(0, 4).map((p) => (
								<div key={p.id} className="pointer-events-none sm:pointer-events-auto">
									<ProductCard produto={p} />
								</div>
							))
						)}
					</div>

					<div className="mt-12 text-center">
						<Link href="/cardapio" className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-800 font-bold text-lg group">
							Explorar todos os produtos
							<ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
						</Link>
					</div>
				</div>
			</section>

			{/* Benefits / About Section */}
			<section id="sobre" className="py-24 px-4 relative overflow-hidden bg-cream-50">
				<div className="container mx-auto max-w-5xl">
					<div className="grid md:grid-cols-2 gap-12 items-center">
						<div className="space-y-8">
							<div>
								<h2 className="text-3xl sm:text-5xl font-black text-brand-900 mb-6">Por que escolher o Açaí & Cia?</h2>
								<p className="text-lg text-brand-700/80 leading-relaxed">
									Trabalhamos duro para proporcionar a melhor experiência de sabor para você e sua família, oferecendo ingredientes frescos e selecionados todos os dias.
								</p>
							</div>

							<ul className="space-y-4">
								<li className="flex items-start gap-3">
									<CheckCircle2 className="w-6 h-6 text-brand-500 shrink-0" />
									<span className="text-brand-800 font-medium text-lg">Açaí 100% puro e cremoso</span>
								</li>
								<li className="flex items-start gap-3">
									<CheckCircle2 className="w-6 h-6 text-brand-500 shrink-0" />
									<span className="text-brand-800 font-medium text-lg">Mais de +10 complementos gratuitos e premium</span>
								</li>
								<li className="flex items-start gap-3">
									<CheckCircle2 className="w-6 h-6 text-brand-500 shrink-0" />
									<span className="text-brand-800 font-medium text-lg">Ambiente familiar e acolhedor</span>
								</li>
								<li className="flex items-start gap-3">
									<CheckCircle2 className="w-6 h-6 text-brand-500 shrink-0" />
									<span className="text-brand-800 font-medium text-lg">Entrega rápida direto na sua porta</span>
								</li>
							</ul>
						</div>

						{/* Visual block replacing image since user requested creamy color/no complex images, we'll use a tasteful UI element */}
						<div className="relative">
							<div className="aspect-square w-full max-w-md mx-auto bg-brand-100 rounded-[3rem] select-none flex items-center justify-center p-8 relative shadow-lg transform rotate-3">
								<div className="absolute inset-0 bg-linear-to-tr from-brand-200/50 to-cream-100/50 rounded-[3rem]" />
								<Heart className="w-32 h-32 text-brand-400 absolute opacity-20 -top-8 -left-8" />
								<div className="glass rounded-4xl p-8 text-center relative w-full h-full flex flex-col justify-center items-center shadow-sm">
									<span className="text-6xl mb-4">💜</span>
									<h3 className="text-2xl font-bold text-brand-900">Feito com muito amor</h3>
									<p className="text-brand-700 mt-2 font-medium">Cada pedido é preparado com os melhores ingredientes de forma dedicada.</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="bg-brand-900 text-brand-100 py-16 px-4 rounded-t-[3rem] -mt-8 relative z-20 shadow-2xl">
				<div className="container mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
					<div className="col-span-1 sm:col-span-2">
						<h3 className="text-3xl font-bold text-white mb-4">Açaí & Cia</h3>
						<p className="text-brand-300 max-w-sm">
							Trazendo refrescância e sabor para os seus dias. Peça agora e experimente a melhor qualidade!
						</p>
					</div>
					<div>
						<h4 className="text-lg font-bold text-white mb-4">Links</h4>
						<ul className="space-y-2">
							<li><Link href="/" className="hover:text-white transition-colors">Início</Link></li>
							<li><Link href="/cardapio" className="hover:text-white transition-colors">Cardápio</Link></li>
						</ul>
					</div>
					<div>
						<h4 className="text-lg font-bold text-white mb-4">Contato</h4>
						<ul className="space-y-3">
							<li className="flex items-center gap-2">
								<MapPin className="w-5 h-5 text-brand-400" />
								<span>Rua Fortaleza, 31A <br /> Amaro Lanari, Cel. Fabriciano - MG</span>
							</li>
							<li className="flex items-center gap-2">
								<Star className="w-5 h-5 text-brand-400" />
								<span>Aberto Qua-Dom, 16:00 - 23:00</span>
							</li>
						</ul>
					</div>
				</div>
				<div className="container mx-auto max-w-6xl mt-12 pt-8 border-t border-brand-800 text-center text-brand-400 text-sm">
					<p>&copy; {new Date().getFullYear()} Açaí & Cia. Todos os direitos reservados.</p>
				</div>
			</footer>
		</main>
	);
}
