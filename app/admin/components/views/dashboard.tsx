import { formatPrice } from "@/lib/utils";
import { CircleDollarSign, HandCoins, IceCreamCone, ShoppingBag, TrendingDown, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProductsMonthly, { SalesByHour } from "../dashboards/dashboards";


export default function DashboardView() {

    const cards = [
        { title: "Vendas Totais", value: formatPrice(1240.50), icon: CircleDollarSign, trend: "up", change: "+15%", description: "em relação ao mês anterior" },
        { title: "Pedidos Feitos", value: "42", icon: ShoppingBag, trend: "down", change: "-35%", description: "Pedidos feitos este mês" },
        { title: "Ticket Médio", value: formatPrice(29.50), icon: HandCoins, trend: "up", change: "+R$8,55", description: "" },
        { title: "Açaí Vendido (L)", value: "35L", icon: IceCreamCone, trend: "down", change: "-4,250L", description: "" },
    ];

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {cards.map((c, i) => (
                    <Card key={i} className="gap-2 rounded-2xl">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="text-sm font-medium">
                                {c.title}
                            </CardTitle>
                            <c.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{c.value}</div>
                            <div className="flex items-center text-xs text-muted-foreground">
                                {c.trend === 'up' ? (
                                    <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                                ) : c.trend === 'down' ? (
                                    <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                                ) : (
                                    <></>
                                )}
                                <span className={c.trend === 'up' ? 'text-green-500' : c.trend === 'down' ? 'text-red-500' : 'hidden'}>
                                    {c.change}
                                </span>
                                <span className="ml-1">{c.description}</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-96">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col justify-center items-center text-gray-400 font-medium">
                    <ProductsMonthly />
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col justify-center items-center text-gray-400 font-medium">
                    <SalesByHour />
                </div>
            </div>
        </div>
    );
}