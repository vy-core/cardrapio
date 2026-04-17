import { formatPrice } from "@/lib/utils";
import ProductDialog from "../dialogs/product-dialog";
import { getProducts } from "@/lib/api";
import { useState, useEffect } from "react";
import type { Produto } from "@/types";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProdutosView() {
    const [products, setProducts] = useState<Produto[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getProducts().then((data) => {
            setProducts(data);
            setLoading(false);
        }).catch((err) => {
            console.error(err);
            setLoading(false);
        });
    }, []);

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 overflow-hidden flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900">Gerenciar Cardápio</h2>
                <ProductDialog onSubmit={(product) => console.log(product)}
                    triggerName="+ Novo Produto"
                    triggerClassName="bg-brand-600 hover:bg-brand-700 p-2 rounded-full px-4 text-white"
                />
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th className="font-bold text-xs uppercase p-4 md:p-2 pl-0"></th>
                            <th className="font-bold text-xs uppercase p-4 pl-0">Produto</th>
                            <th className="font-bold text-xs uppercase p-4">Categoria</th>
                            <th className="font-bold text-xs uppercase p-4">Preço</th>
                            <th className="font-bold text-xs uppercase p-4 text-center">Status</th>
                            <th className="font-bold text-xs uppercase p-4"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={5} className="p-8 text-center text-gray-500 font-medium">Carregando produtos...</td>
                            </tr>
                        ) : products.slice(0, 7).map((p) => (
                            <tr key={p.id} className="border-b border-gray-50">
                                <td className="p-4 md:p-2 pl-0">
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
                                </td>
                                <td className="p-4 pl-0">
                                    <p className="font-bold text-[14px] text-gray-900">{p.nome}</p>
                                    <p className="text-xs font-semibold text-gray-500 mt-1 max-w-[200px] truncate">{p.descricao}
                                    </p>
                                </td>
                                <td className="p-4 text-sm font-semibold text-gray-600 capitalize">
                                    {p.categoria.nome}
                                </td>
                                <td className="p-4 text-sm font-semibold text-brand-700">{formatPrice(p.preco)}</td>
                                <td className="p-4 text-center">
                                    <span className={`inline-block px-3 py-1 text-[11px] font-bold uppercase rounded-full
                            ${p.disponivel ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {p.disponivel ? "Disponível" : "Esgotado"}
                                    </span>
                                </td>
                                <td className="p-4 text-right">
                                    <ProductDialog produto={p} onSubmit={(product) => console.log(product)}
                                        triggerName="Editar"
                                        triggerClassName="text-sm font-bold text-brand-600 hover:underline"
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="pt-4 mt-auto border-t border-gray-100 text-center">
                <Button>Exibir todos
                    ({products.length})</Button>
            </div>
        </div>
    );
}