"use client";

import { useState, useEffect } from "react";
import { MOCK_ORDERS } from "@/lib/mocks";
import { STATUS_LABELS, STATUS_COLORS, PAYMENT_LABELS, timeAgo, formatPrice, cn } from "@/lib/utils";
import { ShoppingBag, MapPin, Phone, CreditCard, Clock, ChevronRight } from "lucide-react";
import type { Order } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerDescription,
    DrawerFooter,
    DrawerClose,
} from "@/components/ui/drawer";

export default function PedidosView() {
    const orders = MOCK_ORDERS;
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [isDesktop, setIsDesktop] = useState(true);

    // Track window resize to toggle between Drawer and Desktop Card
    useEffect(() => {
        const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
        checkDesktop();
        window.addEventListener("resize", checkDesktop);
        return () => window.removeEventListener("resize", checkDesktop);
    }, []);

    const handleOrderClick = (order: Order) => {
        setSelectedOrder(order);
    };

    return (
        <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col lg:flex-row h-[70vh] lg:h-auto">
            {/* List of Orders */}
            <div className={cn(
                "w-full lg:w-1/2 border-r border-gray-100 flex flex-col overflow-hidden",
                selectedOrder ? "hidden lg:flex" : "flex"
            )}>
                <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between shrink-0">
                    <span className="font-bold text-gray-700">Fila de Pedidos</span>
                    <span className="bg-brand-100 font-bold text-brand-700 px-2.5 py-1 rounded-full text-xs">{orders.length} novos</span>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50/50">
                    {orders.map((o) => (
                        <button
                            key={o.id}
                            onClick={() => handleOrderClick(o)}
                            className={cn(
                                "w-full text-left bg-white p-4 rounded-xl border transition-all cursor-pointer shadow-sm flex flex-col gap-2",
                                selectedOrder?.id === o.id
                                    ? "border-brand-500 ring-1 ring-brand-500/20"
                                    : "border-gray-200 hover:border-brand-300"
                            )}
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold font-mono text-brand-600 bg-brand-50 px-2 py-0.5 rounded">{o.tracking_code}</span>
                                    <Badge variant="outline" className={cn("text-[10px] uppercase font-bold px-2 py-0", STATUS_COLORS[o.status])}>
                                        {STATUS_LABELS[o.status]}
                                    </Badge>
                                </div>
                                <span className="text-xs font-semibold text-gray-400">{timeAgo(o.created_at)}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <h4 className="font-bold text-gray-900 text-base">{o.customer_name}</h4>
                                <span className="font-bold text-brand-700">{formatPrice(o.total)}</span>
                            </div>
                            <p className="text-sm font-medium text-gray-500 line-clamp-1">{o.items.map(i => `${i.quantity}x ${i.product_name}`).join(", ")}</p>
                        </button>
                    ))}
                </div>
            </div>

            {/* Desktop Details Card */}
            <div className="hidden lg:flex lg:w-1/2 bg-white flex-col overflow-hidden">
                {selectedOrder ? (
                    <OrderDetails order={selectedOrder} />
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-8 text-center bg-gray-50/20">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-300">
                            <ShoppingBag className="w-10 h-10" />
                        </div>
                        <p className="font-bold text-gray-700 mb-1">Detalhes do Pedido</p>
                        <p className="text-sm text-gray-500 max-w-[250px]">Selecione um pedido na lista para visualizar itens, endereço e despachar.</p>
                    </div>
                )}
            </div>

            {/* Mobile View Toggle Helper */}
            <Drawer open={!isDesktop && !!selectedOrder} onOpenChange={(open) => !open && setSelectedOrder(null)}>
                <DrawerContent className="lg:hidden p-0 max-h-[90vh]">
                    {selectedOrder && (
                        <div className="flex flex-col h-full bg-white rounded-t-3xl overflow-hidden">
                            <DrawerHeader className="border-b px-6 py-5 text-left shrink-0">
                                <div className="flex items-center justify-between mb-1">
                                    <DrawerTitle className="text-xl font-bold text-gray-900">Detalhes do Pedido</DrawerTitle>
                                    <Badge variant="outline" className={cn("uppercase font-bold", STATUS_COLORS[selectedOrder.status])}>
                                        {STATUS_LABELS[selectedOrder.status]}
                                    </Badge>
                                </div>
                                <DrawerDescription className="font-mono text-brand-600 font-bold text-sm">
                                    {selectedOrder.tracking_code}
                                </DrawerDescription>
                            </DrawerHeader>

                            <div className="flex-1 overflow-y-auto px-6 py-4">
                                <OrderDetails order={selectedOrder} isMobile />
                            </div>

                            <DrawerFooter className="border-t px-6 py-6 pb-10 bg-gray-50/50 shrink-0">
                                <div className="flex gap-3">
                                    <Button variant="outline" className="flex-1 h-12 rounded-xl font-bold" onClick={() => setSelectedOrder(null)}>
                                        Fechar
                                    </Button>
                                    <Button className="flex-1 h-12 rounded-xl font-bold bg-brand-600 hover:bg-brand-700">
                                        Despachar
                                    </Button>
                                </div>
                            </DrawerFooter>
                        </div>
                    )}
                </DrawerContent>
            </Drawer>
        </div>
    );
}

function OrderDetails({ order, isMobile }: { order: Order; isMobile?: boolean }) {
    return (
        <div className={cn("flex-1 flex flex-col min-h-0", !isMobile && "p-6")}>
            <div className="flex-1 overflow-y-auto space-y-6 pr-1 custom-scrollbar">
                {/* Client Info */}
                <section>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-11 h-11 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center shadow-sm">
                            <Clock className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Cliente</h3>
                            <p className="font-bold text-gray-900 text-lg leading-tight">{order.customer_name}</p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-start gap-3 bg-brand-50/30 p-4 rounded-2xl border border-brand-100/50">
                            <MapPin className="w-4 h-4 text-brand-600 mt-1 shrink-0" />
                            <div className="text-sm">
                                <p className="font-bold text-brand-950 mb-0.5">Endereço de Entrega</p>
                                <p className="text-brand-800/80 font-medium leading-relaxed">{order.address}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                            <Phone className="w-4 h-4 text-gray-400 shrink-0" />
                            <div className="text-sm flex items-center gap-2">
                                <p className="font-bold text-gray-700">Telefone:</p>
                                <p className="text-gray-500 font-medium">{order.phone}</p>
                            </div>
                        </div>
                    </div>
                </section>

                <Separator className="opacity-50" />

                {/* Items */}
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Itens do Pedido</h3>
                        <span className="text-xs font-bold text-gray-400">{order.items.length} itens</span>
                    </div>
                    <div className="space-y-4">
                        {order.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-start group">
                                <div className="flex gap-3">
                                    <div className="font-black text-brand-600 bg-brand-50 w-7 h-7 rounded-lg flex items-center justify-center text-xs shrink-0 border border-brand-100">
                                        {item.quantity}
                                    </div>
                                    <div className="pt-0.5">
                                        <p className="font-bold text-gray-900 leading-tight group-hover:text-brand-600 transition-colors">{item.product_name}</p>
                                        <p className="text-[11px] text-gray-400 font-bold mt-1 uppercase tracking-tighter">
                                            {formatPrice(item.unit_price)} / un
                                        </p>
                                    </div>
                                </div>
                                <span className="font-bold text-gray-900 pt-0.5">{formatPrice(item.subtotal)}</span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 pt-5 border-t-2 border-dashed border-gray-100">
                        <div className="flex justify-between items-center text-gray-500 mb-2">
                            <span className="text-sm font-bold">Subtotal</span>
                            <span className="font-bold">{formatPrice(order.total)}</span>
                        </div>
                        <div className="flex justify-between items-center text-brand-700">
                            <span className="text-lg font-bold">Total</span>
                            <span className="text-2xl font-bold">{formatPrice(order.total)}</span>
                        </div>
                    </div>
                </section>

                <Separator className="opacity-50" />

                {/* Payment */}
                <section className="bg-brand-900 text-white p-5 rounded-3xl shadow-xl shadow-brand-900/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-brand-800 rounded-full -mr-10 -mt-10 opacity-50" />
                    <div className="relative flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-brand-800 flex items-center justify-center">
                                <CreditCard className="w-5 h-5 text-brand-200" />
                            </div>
                            <div>
                                <h3 className="text-[10px] font-bold text-brand-300 uppercase tracking-widest mb-0.5">Meio de Pagamento</h3>
                                <p className="font-bold text-white text-base">{PAYMENT_LABELS[order.payment_method]}</p>
                            </div>
                        </div>
                        {order.change_amount && order.change_amount > 0 && (
                            <div className="text-right">
                                <p className="text-[10px] font-bold text-brand-300 uppercase">Troco para</p>
                                <p className="font-black text-brand-100 text-lg">{formatPrice(order.change_amount)}</p>
                            </div>
                        )}
                    </div>
                </section>
            </div>

            {/* Sticky Actions for Desktop */}
            {!isMobile && (
                <div className="pt-6 mt-auto">
                    <Button className="w-full h-14 rounded-2xl bg-brand-600 hover:bg-brand-700 text-lg font-bold shadow-lg shadow-brand-600/20 group">
                        Confirmar e Despachar
                        <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </div>
            )}
        </div>
    );
}
