"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, Info, ShoppingBag } from "lucide-react";
import { useCartStore, useTotalItems, useTotalPrice } from "@/lib/cart-store";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

export function Header() {
	const totalItems = useTotalItems();
	const totalPrice = useTotalPrice();
	const openCart = useCartStore((s) => s.openCart);
	const pathname = usePathname();

	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (pathname === "/about") return null;

	return (
		<header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-brand-100 shadow-sm">
			<div className="max-w-5xl mx-auto px-4 h-[72px] flex items-center justify-between gap-4">
				{/* Logo */}
				<div className="flex items-center gap-3">
					<Link href="/" className="w-11 h-11 rounded-2xl bg-brand-600 flex items-center justify-center shadow-md">
						<ChevronLeft className="w-5 h-5 text-white" />
					</Link>
					<div>
						<h1 className="font-display text-brand-800 font-bold text-lg leading-tight">
							Açaí & Cia
						</h1>
					</div>
				</div>

				{/* Cart button */}
				<Button
					onClick={openCart}
					className="relative flex items-center gap-3 bg-brand-600 hover:bg-brand-700 active:scale-95 text-white rounded-2xl p-5 transition-all shadow-md group"
				>
					<ShoppingBag className="w-5 h-5" />
					<span className="text-sm font-semibold hidden md:block">
						{mounted && totalItems > 0 ? formatPrice(totalPrice) : "Ver carrinho"}
					</span>
					{mounted && totalItems > 0 && (
						<span className="absolute -top-2 -right-2 w-6 h-6 bg-brand-900 text-white text-xs font-bold rounded-full flex items-center justify-center shadow">
							{totalItems}
						</span>
					)}
				</Button>
			</div>
		</header>
	);
}
