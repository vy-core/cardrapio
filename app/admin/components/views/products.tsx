import { formatPrice } from "@/lib/utils";
import ProductDialog from "../dialogs/product-dialog";
import { getProducts } from "@/lib/api";
import { useState, useEffect, useMemo } from "react";
import type { Produto, Categoria } from "@/types";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from "@/components/ui/pagination";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function ProdutosView() {
    const [products, setProducts] = useState<Produto[]>([]);
    const [loading, setLoading] = useState(true);

    const [activeCat, setActiveCat] = useState<string>("");
    const [query, setQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    useEffect(() => {
        getProducts().then((data) => {
            setProducts(data);
            setLoading(false);
        }).catch((err) => {
            console.error(err);
            setLoading(false);
        });
    }, []);

    const categories = useMemo(() => {
        const map = new Map<string, Categoria>();
        products.forEach(p => map.set(p.categoria.id, p.categoria));
        return Array.from(map.values());
    }, [products]);

    const filteredProducts = useMemo(() => {
        return products.filter((p) => {
            const matchesCat = activeCat === "" || p.categoria.id === activeCat;
            const matchesQuery = query === "" || p.nome.toLowerCase().includes(query.toLowerCase());
            return matchesCat && matchesQuery;
        });
    }, [products, activeCat, query]);

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const paginatedProducts = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredProducts.slice(start, start + itemsPerPage);
    }, [filteredProducts, currentPage]);

    useEffect(() => {
        setCurrentPage(1);
    }, [activeCat, query]);

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 overflow-hidden flex flex-col h-full min-h-[600px]">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900">Gerenciar Cardápio</h2>
                <ProductDialog onSubmit={(product) => console.log(product)}
                    triggerName="+ Novo Produto"
                    triggerClassName="bg-brand-600 hover:bg-brand-700 p-2 rounded-full px-4 text-white"
                />
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
                <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
                    <Button
                        variant={activeCat === "" ? "default" : "outline"}
                        onClick={() => setActiveCat("")}
                        size="sm"
                        className="rounded-full whitespace-nowrap"
                    >
                        Todos
                    </Button>
                    {categories.map(c => (
                        <Button
                            key={c.id}
                            variant={activeCat === c.id ? "default" : "outline"}
                            onClick={() => setActiveCat(c.id)}
                            size="sm"
                            className="rounded-full whitespace-nowrap capitalize"
                        >
                            {c.nome}
                        </Button>
                    ))}
                </div>
                <div className="relative w-full sm:w-64 shrink-0">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                        placeholder="Buscar produto..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="pl-9 h-9"
                    />
                </div>
            </div>

            <div className="overflow-x-auto">
                <Table className="min-w-[600px]">
                    <TableHeader>
                        <TableRow className="border-b border-gray-200 hover:bg-transparent">
                            <TableHead className="md:p-2 pl-0 w-[60px]"></TableHead>
                            <TableHead className="font-bold text-xs uppercase p-4 pl-0">Produto</TableHead>
                            <TableHead className="font-bold text-xs uppercase p-4">Categoria</TableHead>
                            <TableHead className="font-bold text-xs uppercase p-4">Preço</TableHead>
                            <TableHead className="font-bold text-xs uppercase p-4 text-center">Status</TableHead>
                            <TableHead className="font-bold text-xs uppercase p-4 w-[80px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-32 text-center text-gray-500 font-medium">Carregando produtos...</TableCell>
                            </TableRow>
                        ) : paginatedProducts.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-32 text-center text-gray-500 font-medium">Nenhum produto encontrado.</TableCell>
                            </TableRow>
                        ) : paginatedProducts.map((p) => (
                            <TableRow key={p.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                                <TableCell className="p-4 md:p-2 pl-0">
                                    <Avatar>
                                        <AvatarImage
                                            src={p.image_url || "/placeholder.jpg"}
                                            alt={p.nome}
                                            width={50}
                                            height={50}
                                            className="rounded-lg object-cover"
                                        />
                                        <AvatarFallback>{p.nome.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                </TableCell>
                                <TableCell className="p-4 pl-0">
                                    <p className="font-bold text-[14px] text-gray-900">{p.nome}</p>
                                    <p className="text-xs font-semibold text-gray-500 mt-1 max-w-[200px] truncate">{p.descricao}
                                    </p>
                                </TableCell>
                                <TableCell className="p-4 text-sm font-semibold text-gray-600 capitalize">
                                    {p.categoria.nome}
                                </TableCell>
                                <TableCell className="p-4 text-sm font-semibold text-brand-700">{formatPrice(p.preco)}</TableCell>
                                <TableCell className="p-4 text-center">
                                    <span className={`inline-block px-3 py-1 text-[11px] font-bold uppercase rounded-full
                                        ${p.disponivel ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {p.disponivel ? "Disponível" : "Esgotado"}
                                    </span>
                                </TableCell>
                                <TableCell className="p-4 text-right">
                                    <ProductDialog produto={p} onSubmit={(product) => console.log(product)}
                                        triggerName="Editar"
                                        triggerClassName="text-sm font-bold text-brand-600 hover:underline"
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {!loading && totalPages > 0 && (
                <div className="pt-6 mt-auto border-t border-gray-100">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    href="#"
                                    onClick={(e) => { e.preventDefault(); setCurrentPage(p => Math.max(1, p - 1)) }}
                                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                                />
                            </PaginationItem>

                            {Array.from({ length: totalPages }).map((_, i) => {
                                const page = i + 1;

                                if (totalPages > 5 && page !== 1 && page !== totalPages && Math.abs(page - currentPage) > 1) {
                                    if (page === currentPage - 2 || page === currentPage + 2) {
                                        return <PaginationItem key={`ellipsis-${page}`}><PaginationEllipsis /></PaginationItem>
                                    }
                                    return null;
                                }

                                return (
                                    <PaginationItem key={page}>
                                        <PaginationLink
                                            href="#"
                                            onClick={(e) => { e.preventDefault(); setCurrentPage(page) }}
                                            isActive={currentPage === page}
                                        >
                                            {page}
                                        </PaginationLink>
                                    </PaginationItem>
                                );
                            })}

                            <PaginationItem>
                                <PaginationNext
                                    href="#"
                                    onClick={(e) => { e.preventDefault(); setCurrentPage(p => Math.min(totalPages, p + 1)) }}
                                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}
        </div>
    );
}