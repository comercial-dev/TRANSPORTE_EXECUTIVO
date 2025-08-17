import { NavLink, useLocation } from "react-router-dom";
import {
  Calendar,
  FileText,
  Activity,
  MapPin,
  Users,
  Building2,
  History,
  UserCheck,
  Globe,
  User,
  Car,
  Info,
  Grid3X3,
  BarChart3
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Dashboard", url: "/", icon: BarChart3 },
  { title: "Agenda", url: "/agenda", icon: Calendar },
  { title: "Clientes", url: "/clientes", icon: Users },
  // { title: "Histórico de Transfers", url: "/historico", icon: History },
  { title: "Motoristas", url: "/motoristas", icon: UserCheck },
  { title: "Transfers", url: "/transfers", icon: Car },
  // { title: "Veículos", url: "/veiculos", icon: Car },
  { title: "Sobre", url: "/sobre", icon: Info },
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 w-full px-3 py-2 rounded-lg transition-all duration-200 ${
      isActive 
        ? "bg-primary shadow-sm text-black" 
        : "text-black hover:bg-secondary"
    }`;

  return (
    <Sidebar className={isCollapsed ? "w-16" : "w-64"} collapsible="icon">
      <SidebarContent className="border-r bg-card">
        <div className="p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Car className="w-5 h-5 text-primary-foreground" />
            </div>
            {!isCollapsed && (
              <div>
                <h1 className="text-lg font-semibold text-foreground">DRIVE PREMIUM</h1>
                <p className="text-xs text-muted-foreground">Admin Panel</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="px-6 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {!isCollapsed && "Menu Principal"}
          </SidebarGroupLabel>
          <SidebarGroupContent className="px-3">
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {!isCollapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}