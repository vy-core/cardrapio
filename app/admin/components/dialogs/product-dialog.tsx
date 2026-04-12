import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { Product } from "@/types";
import { useState } from "react";

const categorias = [
    { label: "Açaí", value: "acai" },
    { label: "Sorvete", value: "sorvete" },
    { label: "Bebidas", value: "bebidas" },
];

const adicionais = [
    { nome: "Leite Condensado", preco: 1.00 },
    { nome: "Leite em Pó", preco: 1.00 },
    { nome: "Granola", preco: 1.50 },
    { nome: "Morango", preco: 2.00 },
    { nome: "Chocolate", preco: 1.00 },
    { nome: "Nutella", preco: 3.00 },
]

type ProductDialogProps = {
    product?: Product;
    onSubmit: (product: Product) => void;
    triggerName: string;
    triggerClassName?: string;
}
export default function ProductDialog({ product, onSubmit, triggerName, triggerClassName }: ProductDialogProps) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState(product?.name || "");
    const [description, setDescription] = useState(product?.description || "");
    const [price, setPrice] = useState(product?.price || 0);
    const [image_url, setImageUrl] = useState(product?.image_url || "");
    const [available, setAvailable] = useState<boolean>(product?.available ?? true);
    const [category, setCategory] = useState(product?.category || "");
    const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

    // useEffect(() => {
    //     if (product) {
    //         setName(product.name);
    //         setDescription(product.description);
    //         setPrice(product.price);
    //         setImageUrl(product.image_url);
    //         setAvailable(product.available);
    //         setCategoryId(product.category_id);
    //         setSortOrder(product.sort_order);
    //     }
    // }, [product]);

    const handleOpenChange = (open: boolean) => {
        setOpen(open);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger className={triggerClassName + " hover:cursor-pointer"}>
                {triggerName}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{product ? "Editar Produto" : "Adicionar Produto"}</DialogTitle>
                    <DialogDescription>
                        {product ? "Atualize os detalhes do produto" : "Adicione um novo produto"}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-medium">Nome</Label>
                        <Input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-sm font-medium">Descrição</Label>
                        <Textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div className="flex justify-between gap-4">
                        <div className="space-y-2 w-full">
                            <Label htmlFor="price" className="text-sm font-medium">Preço</Label>
                            <Input
                                id="price"
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(Number(e.target.value))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="available" className="text-sm font-medium">Disponível</Label>
                            <Checkbox
                                id="available"
                                checked={available}
                                onCheckedChange={(checked) => setAvailable(checked === true)}
                                className="w-8 h-8 justify-center m-auto"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="image_url" className="text-sm font-medium">URL da Imagem</Label>
                        <Input
                            id="image_url"
                            type="text"
                            value={image_url}
                            onChange={(e) => setImageUrl(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="category_id" className="text-sm font-medium">Categoria</Label>
                        <Select value={category} onValueChange={(val) => setCategory(val ?? "")}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Selecione uma categoria" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Categoria</SelectLabel>
                                    {categorias.map((item) => (
                                        <SelectItem key={item.value} value={item.value}>
                                            {item.label}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className={`space-y-2 ${category === "acai" || category === "sorvete" ? "" : "hidden"}`}>
                        <Label htmlFor="sort_order" className="text-sm font-medium">Selecionar Adicionais Disponíveis (Opcional)</Label>
                        <div className="flex flex-wrap gap-2">
                            {adicionais.map((item) => (
                                <div key={item.nome} className="flex items-center gap-2">
                                    <Checkbox
                                        id={item.nome}
                                        checked={selectedAddons.includes(item.nome)}
                                        onCheckedChange={(checked) => {
                                            if (checked) {
                                                setSelectedAddons([...selectedAddons, item.nome]);
                                            } else {
                                                setSelectedAddons(selectedAddons.filter((addon) => addon !== item.nome));
                                            }
                                        }}
                                    />
                                    <Label htmlFor={item.nome} className="text-sm font-medium">{item.nome}</Label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>
                            Cancelar
                        </Button>
                        <Button type="submit">{product ? "Atualizar" : "Adicionar"}</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}