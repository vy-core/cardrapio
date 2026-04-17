"use client";

import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  ShoppingBag,
  Store,
  BarChart3,
  PieChart,
  LogOut,
  Settings,
  UserCircle2,
  Tags,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { AdminTab } from "@/types";

interface DashboardSidebarProps {
  activeTab: string;
  setActiveTab: (tab: AdminTab) => void;
  className?: string;
}

export function DashboardSidebar({ activeTab, setActiveTab, className }: DashboardSidebarProps) {

  const router = useRouter();

  return (
    <Sidebar className={className} collapsible="icon">
      <SidebarHeader className="border-b flex items-center px-4">
        <SidebarMenuButton>
          <UserCircle2 className="h-6 w-6 text-brand-900" />
          <span className="font-bold text-xl text-brand-900">Açaí & Cia</span>
        </SidebarMenuButton>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeTab === "dashboard"}
                  onClick={() => setActiveTab("dashboard")}
                  tooltip="Dashboard"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeTab === "pedidos"}
                  onClick={() => setActiveTab("pedidos")}
                  tooltip="Pedidos"
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span>Pedidos</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeTab === "produtos"}
                  onClick={() => setActiveTab("produtos")}
                  tooltip="Produtos"
                >
                  <Store className="h-4 w-4" />
                  <span>Produtos</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeTab === "grupos"}
                  onClick={() => setActiveTab("grupos adicionais")}
                  tooltip="Grupos de Adicionais"
                >
                  <Tags className="h-4 w-4" />
                  <span>Grupos</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Análises</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeTab === "relatorios"}
                  onClick={() => setActiveTab("relatorios")}
                  tooltip="Relatórios"
                >
                  <BarChart3 className="h-4 w-4" />
                  <span>Relatórios</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeTab === "analytics"}
                  onClick={() => setActiveTab("analytics")}
                  tooltip="Analytics"
                >
                  <PieChart className="h-4 w-4" />
                  <span>Analytics</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Sistema</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Configurações">
                  <Settings className="h-4 w-4" />
                  <span>Configurações</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={() => router.push("/")}>
              <LogOut className="h-4 w-4" />
              <span>Sair do sistema</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
