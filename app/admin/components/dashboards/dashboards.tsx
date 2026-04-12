import { useState } from "react";
import { AgCharts } from "ag-charts-react";
import { AgChartOptions, ModuleRegistry, AllCommunityModule } from "ag-charts-community";
import { productsMonthlyData, salesByFlavourByMonthData, salesByHourData } from "./data";

ModuleRegistry.registerModules([AllCommunityModule]);

export default function ProductsMonthly() {
    const [options, setOptions] = useState<AgChartOptions>({
        title: {
            text: "Vendas por Categoria",
        },
        subtitle: {
            text: "Em R$",
        },
        data: productsMonthlyData(),
        series: [
            {
                type: "bar",
                xKey: "month",
                yKey: "sorvete",
                yName: "Sorvete",
                fill: "#FF6B6B",
            },
            {
                type: "bar",
                xKey: "month",
                yKey: "acai",
                yName: "Açaí",
                fill: "#6B46C1",
            },
            {
                type: "bar",
                xKey: "month",
                yKey: "bebidas",
                yName: "Bebidas",
                fill: "#40b9ffff",
            },
        ],
    });

    return <AgCharts options={options} />;
}

export function SalesByFlavourMonthly() {
    const [options, setOptions] = useState<AgChartOptions>({
        title: {
            text: "Vendas por Sabor",
        },
        subtitle: {
            text: "Em R$",
        },
        data: salesByFlavourByMonthData(),
        series: [
            {
                type: "bar",
                xKey: "month",
                yKey: "sorvete",
                yName: "Sorvete",
                fill: "#FF6B6B",
            },
            {
                type: "bar",
                xKey: "month",
                yKey: "acai",
                yName: "Açaí",
                fill: "#6B46C1",
            },
            {
                type: "bar",
                xKey: "month",
                yKey: "bebidas",
                yName: "Bebidas",
                fill: "#40b9ffff",
            },
        ],
    });

    return <AgCharts options={options} />;
}

export function SalesByHour() {
    const [options, setOptions] = useState<AgChartOptions>({
        title: {
            text: "Vendas por Hora",
        },
        subtitle: {
            text: "Em R$",
        },
        data: salesByHourData(),
        series: [
            {
                type: "line",
                xKey: "hour",
                yKey: "sales",
                yName: "Vendas",
            },
        ],
    });

    return <AgCharts options={options} />;
}