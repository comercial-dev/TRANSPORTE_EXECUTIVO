import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Clientes from "@/pages/Clientes";
import Orcamentos from "@/pages/Orcamentos";
import Sobre from "@/pages/Sobre"; // Correct import statement
import { AdminLayout } from "./components/layout/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Agenda from "../Agenda";
import Transfers from "./pages/Transfers";
import Motoristas from "./pages/Motoristas";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="agenda" element={<Agenda />} />
            <Route path="transfers" element={<Transfers />} />
            <Route path="motoristas" element={<Motoristas />} />
            <Route path="orcamentos" element={<Orcamentos />} />
            <Route path="operacoes" element={<div className="p-6"><h1 className="text-2xl font-bold">Operações</h1><p className="text-muted-foreground">Em desenvolvimento...</p></div>} />
            <Route path="abrangencia" element={<div className="p-6"><h1 className="text-2xl font-bold">Abrangência</h1><p className="text-muted-foreground">Em desenvolvimento...</p></div>} />
            <Route path="clientes" element={<Clientes />} />
            <Route path="empresas" element={<div className="p-6"><h1 className="text-2xl font-bold">Empresas</h1><p className="text-muted-foreground">Em desenvolvimento...</p></div>} />
            <Route path="historico" element={<div className="p-6"><h1 className="text-2xl font-bold">Histórico de Transfers</h1><p className="text-muted-foreground">Em desenvolvimento...</p></div>} />
            <Route path="paises" element={<div className="p-6"><h1 className="text-2xl font-bold">Países</h1><p className="text-muted-foreground">Em desenvolvimento...</p></div>} />
            <Route path="passageiros" element={<div className="p-6"><h1 className="text-2xl font-bold">Passageiros</h1><p className="text-muted-foreground">Em desenvolvimento...</p></div>} />
            <Route path="veiculos" element={<div className="p-6"><h1 className="text-2xl font-bold">Veículos</h1><p className="text-muted-foreground">Em desenvolvimento...</p></div>} />
            <Route path="sobre" element={<Sobre />} />
            <Route path="gallery" element={<div className="p-6"><h1 className="text-2xl font-bold">App Gallery</h1><p className="text-muted-foreground">Em desenvolvimento...</p></div>} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
