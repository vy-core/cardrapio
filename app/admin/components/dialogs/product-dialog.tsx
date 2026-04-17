import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { getCategories, getGrupos } from "@/lib/api";
import type { Categoria, Grupo, Produto } from "@/types";
import { useEffect, useState } from "react";

type ProductDialogProps = {
    produto?: Produto;
    onSubmit: (product: Produto) => void;
    triggerName: string;
    triggerClassName?: string;
}
export default function ProductDialog({ produto, onSubmit, triggerName, triggerClassName }: ProductDialogProps) {
    const [allCategories, setAllCategories] = useState<Categoria[]>([]);
    const [allGruposAdd, setAllGruposAdd] = useState<Grupo[]>([]);
    const [open, setOpen] = useState(false);
    const [name, setName] = useState(produto?.nome || "");
    const [description, setDescription] = useState(produto?.descricao || "");
    const [price, setPrice] = useState(produto?.preco || 0);
    const [image_url, setImageUrl] = useState(produto?.image_url || "");
    const [available, setAvailable] = useState<boolean>(produto?.disponivel ?? true);
    const [category, setCategory] = useState(produto?.categoria || null);
    const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const categories = await getCategories();
            setAllCategories(categories);
        };
        const fetchGruposAdd = async () => {
            const gruposAdd = await getGrupos();
            setAllGruposAdd(gruposAdd);
        };
        fetchCategories();
        fetchGruposAdd();
    }, []);

    const handleOpenChange = (open: boolean) => {
        setOpen(open);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();


    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger className={triggerClassName + " hover:cursor-pointer"}>
                {triggerName}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{produto ? "Editar Produto" : "Adicionar Produto"}</DialogTitle>
                    <DialogDescription>
                        {produto ? "Atualize os detalhes do produto" : "Adicione um novo produto"}
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
                        <Select value={category?.nome}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Selecione uma categoria" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Categoria</SelectLabel>
                                    {allCategories.map((item) => (
                                        <SelectItem key={item.id} value={item.id} onClick={() => setCategory(item)}>
                                            {item.nome}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className={"space-y-2"}>
                        <Label htmlFor="sort_order" className="text-sm font-medium">Selecionar Adicionais Disponíveis (Opcional)</Label>
                        <div className="grid grid-cols-3 gap-2">
                            {allGruposAdd.length > 0 ? allGruposAdd.map((item) => (
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
                            )) : <Input disabled placeholder="Nenhum adicional cadastrado no sistema." />}
                        </div>
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>
                            Cancelar
                        </Button>
                        <Button type="submit">{produto ? "Atualizar" : "Adicionar"}</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}