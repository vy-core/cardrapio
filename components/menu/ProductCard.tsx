"use client";

import { useState } from "react";
import { Plus, Minus, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice, cn } from "@/lib/utils";
import type { Product, Topping } from "@/types";
import { Button } from "../ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useIsMobile } from "@/hooks/use-mobile";

interface ProductCardProps {
	product: Product;
}

const HARDCODED_TOPPINGS: Topping[] = [
	{ id: "t1", name: "Leite Condensado", price: 2.50 },
	{ id: "t2", name: "Morangos Frescos", price: 3.00 },
	{ id: "t3", name: "Granola", price: 1.50 },
	{ id: "t4", name: "Paçoca", price: 1.00 },
	{ id: "t5", name: "Nutella", price: 4.00 },
];

export function ProductCard({ product }: ProductCardProps) {
	const addItem = useCartStore((s) => s.addItem);
	const isMobile = useIsMobile();

	const [isOpen, setIsOpen] = useState(false);
	const [quantity, setQuantity] = useState(1);
	const [observations, setObservations] = useState("");
	const [selectedToppings, setSelectedToppings] = useState<Topping[]>([]);

	const handleOpen = () => {
		if (!product.available) return;
		setQuantity(1);
		setObservations("");
		setSelectedToppings([]);
		setIsOpen(true);
	};

	const handleAddToCart = () => {
		addItem(product, quantity, observations, selectedToppings);
		setIsOpen(false);
	};

	const handleToppingToggle = (topping: Topping) => {
		setSelectedToppings(prev =>
			prev.find(t => t.id === topping.id)
				? prev.filter(t => t.id !== topping.id)
				: [...prev, topping]
		);
	};

	const toppingsPrice = selectedToppings.reduce((sum, t) => sum + t.price, 0);
	const totalItemPrice = (product.price + toppingsPrice) * quantity;

	const FormContent = (
		<div className="flex flex-col max-h-full overflow-hidden w-full">
			<div className="px-5 py-6 space-y-6 overflow-y-auto flex-1">
				{/* Toppings Section */}
				<div className="space-y-3">
					<Label className="text-[15px] font-bold text-gray-800">
						Adicionais
					</Label>
					<div className="flex flex-col gap-2">
						{HARDCODED_TOPPINGS.map((topping) => {
							const isChecked = !!selectedToppings.find(t => t.id === topping.id);
							return (
								<Label
									key={topping.id}
									className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-colors ${isChecked ? 'border-brand-300 bg-brand-50' : 'border-gray-100 bg-white hover:border-brand-200'}`}
								>
									<div className="flex items-center gap-3">
										<Checkbox
											checked={isChecked}
											onCheckedChange={() => handleToppingToggle(topping)}
										/>
										<span className="text-[14px] font-medium text-gray-700">{topping.name}</span>
									</div>
									<span className="text-[13px] font-bold text-brand-600">+ {formatPrice(topping.price)}</span>
								</Label>
							);
						})}
					</div>
				</div>

				{/* Observations Section */}
				<div className="space-y-3 pt-4 border-t border-gray-100">
					<Label className="text-[15px] font-bold text-gray-800">
						Alguma observação?
					</Label>
					<Textarea
						placeholder="Ex: Tirar cebola, sem gelo, etc..."
						className="resize-none h-24 p-5 rounded-xl border-gray-200 focus-visible:ring-brand-500 focus-visible:border-brand-500 bg-gray-50 text-[15px]"
						value={observations}
						onChange={(e) => setObservations(e.target.value)}
					/>
				</div>

				{/* Quantity Section */}
				<div className="flex items-center justify-between py-2 pt-4 border-t border-gray-100">
					<Label className="text-[15px] font-bold text-gray-800">Quantidade</Label>
					<div className="flex items-center gap-3 bg-white px-2 py-1 rounded-full border border-gray-200 shadow-sm">
						<Button
							variant="ghost"
							size="icon"
							onClick={() => setQuantity(Math.max(1, quantity - 1))}
							className="w-10 h-10 rounded-full hover:bg-gray-100 text-gray-600"
						>
							<Minus className="w-4 h-4" />
						</Button>
						<span className="w-6 text-center font-bold text-lg text-gray-900">{quantity}</span>
						<Button
							variant="ghost"
							size="icon"
							onClick={() => setQuantity(quantity + 1)}
							className="w-10 h-10 rounded-full hover:bg-brand-50 text-brand-600"
						>
							<Plus className="w-4 h-4" />
						</Button>
					</div>
				</div>
			</div>

			<div className="px-5 py-5 border-t border-gray-100 bg-white z-10 relative shadow-[0_-4px_20px_rgba(0,0,0,0.03)] rounded-b-xl w-full">
				<Button
					onClick={handleAddToCart}
					className="w-full h-14 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold text-[16px] shadow-md flex items-center justify-between px-6"
				>
					<span>Adicionar</span>
					<span>{formatPrice(totalItemPrice)}</span>
				</Button>
			</div>
		</div>
	);

	return (
		<>
			<div
				className={cn(
					"group relative bg-white rounded-2xl border border-brand-100/50 p-4 flex flex-col gap-3 transition-all duration-200",
					product.available
						? "hover:shadow-md hover:-translate-y-1"
						: "opacity-60"
				)}
			>
				{!product.available && (
					<span className="absolute top-3 right-3 text-[10px] font-bold bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full border border-gray-200">
						ESGOTADO
					</span>
				)}

				{/* Emoji placeholder styled with new colors */}
				<div className="w-full h-32 rounded-2xl bg-linear-to-br from-brand-50 to-cream-100 flex items-center justify-center text-5xl select-none shadow-sm cursor-pointer" onClick={handleOpen}>
					{product.image_url ? (
						<img src={product.image_url} alt={product.name} className="w-full h-full object-cover rounded-2xl" />
					) : (
						product.category === "cat-1" ? "🟣"
							: product.category === "cat-2" ? "🍦"
								: product.category === "cat-3" ? "🍧"
									: product.category === "cat-4" ? "🥤"
										: "🍫"
					)}
				</div>

				<div className="flex-1 flex flex-col gap-1.5 mt-1 cursor-pointer" onClick={handleOpen}>
					<h3 className="font-sans font-bold text-gray-900 text-[15px] leading-snug line-clamp-1">
						{product.name}
					</h3>
					<p className="text-[13px] text-gray-500 leading-relaxed line-clamp-2 ">
						{product.description}
					</p>
				</div>

				<div className="flex items-center justify-between mt-2 pt-3 border-t border-brand-50">
					<span className="text-brand-700 font-semibold cursor-pointer" onClick={handleOpen}>
						{formatPrice(product.price)}
					</span>

					{product.available && (
						<Button
							onClick={handleOpen}
							className="flex items-center gap-1.5 bg-brand-100 hover:bg-brand-200 active:bg-brand-300 text-brand-800 font-semibold px-4 py-2.5 rounded-full transition-colors"
							aria-label="Adicionar"
						>
							<Plus className="w-4 h-4" />
						</Button>
					)}
				</div>
			</div>

			{isMobile ? (
				<Drawer open={isOpen} onOpenChange={setIsOpen}>
					<DrawerContent className="bg-white p-0 border-none outline-none overflow-hidden max-h-[90vh]">
						<DrawerHeader className="px-5 pt-6 pb-4 border-b border-gray-100 text-left bg-white z-10 relative">
							<DrawerTitle className="text-xl font-bold text-gray-900 pr-8 leading-tight">{product.name}</DrawerTitle>
							<p className="text-[14px] text-gray-500 mt-2 line-clamp-3">{product.description}</p>
						</DrawerHeader>
						{FormContent}
					</DrawerContent>
				</Drawer>
			) : (
				<Dialog open={isOpen} onOpenChange={setIsOpen}>
					<DialogContent className="p-0 max-w-lg rounded-2xl gap-0 h-4/5">
						<DialogHeader className="px-5 pt-6 pb-4 border-b border-gray-100 text-left bg-white z-10 relative rounded-full">
							<DialogTitle className="text-xl font-bold text-gray-900 pr-8 leading-tight">{product.name}</DialogTitle>
							<p className="text-[14px] text-gray-500 mt-2 line-clamp-3">{product.description}</p>
						</DialogHeader>
						{FormContent}
					</DialogContent>
				</Dialog>
			)}
		</>
	);
}
