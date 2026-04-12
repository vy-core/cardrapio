"use client";

import { cn } from "@/lib/utils";
import type { Category } from "@/types";
import { Button } from "../ui/button";

interface CategoryTabsProps {
	categories: Category[];
	active: string;
	onChange: (id: string) => void;
}

export function CategoryTabs({ categories, active, onChange }: CategoryTabsProps) {
	return (
		<div className="sticky top-[72px] z-20 bg-white/95 backdrop-blur-md border-b border-brand-50 shadow-sm">
			<div className="max-w-5xl mx-auto px-4">
				<div className="flex gap-2 overflow-x-auto py-3.5 scrollbar-hide no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
					<Button
						onClick={() => onChange("")}
						variant={active === "" ? "default" : "outline"}
					>
						<span>Todos</span>
					</Button>
					{categories.map((cat) => (
						<Button
							key={cat.id}
							onClick={() => onChange(cat.id)}
							variant={active === cat.id ? "default" : "outline"}
						>
							<span>{cat.name}</span>
						</Button>
					))}
				</div>
			</div>
		</div>
	);
}
