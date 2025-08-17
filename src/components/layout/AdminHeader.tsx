import { Bell, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { AdminProfileModal } from "./AdminProfileModal";

export const AdminHeader = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const handleOpenProfile = () => setProfileOpen(true);
  const handleCloseProfile = () => setProfileOpen(false);
  return (
    <header className="h-16 flex items-center justify-between px-6 border-b bg-card">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            Painel Administrativo
          </h2>
          <p className="text-sm text-muted-foreground">
            Gestão de Transporte Executivo
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center text-xs text-primary-foreground">
            3
          </span>
        </Button>
        
        <ThemeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 hover:bg-secondary">
              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  AD
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">Admin</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleOpenProfile}>
              <User className="w-4 h-4 mr-2" />
              Perfil
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
  </DropdownMenu>
  <AdminProfileModal open={profileOpen} onClose={handleCloseProfile} />
      </div>
    </header>
  );
};