import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AdminProfileModalProps {
  open: boolean;
  onClose: () => void;
}

export const AdminProfileModal = ({ open, onClose }: AdminProfileModalProps) => {
  const [form, setForm] = useState({
    nome: "Administrador",
    email: "admin@empresa.com",
    telefone: "(00) 00000-0000",
    senha: "",
    cargo: "Administrador Geral",
    empresa: "Empresa Exemplo Ltda.",
    endereco: "Rua Exemplo, 123, Centro, Cidade/UF",
    cpf: "000.000.000-00",
    nascimento: "1990-01-01",
    avatar: "https://ui-avatars.com/api/?name=Admin",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSave() {
    // Aqui você pode salvar os dados do admin
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Perfil do Administrador</DialogTitle>
        </DialogHeader>
  {/* Avatar section removed as requested */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-medium mb-1">Nome</label>
            <Input name="nome" value={form.nome} onChange={handleChange} />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">E-mail</label>
            <Input name="email" value={form.email} onChange={handleChange} />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Telefone</label>
            <Input name="telefone" value={form.telefone} onChange={handleChange} />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Cargo</label>
            <Input name="cargo" value={form.cargo} onChange={handleChange} />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Empresa</label>
            <Input name="empresa" value={form.empresa} onChange={handleChange} />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Endereço</label>
            <Input name="endereco" value={form.endereco} onChange={handleChange} />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">CPF</label>
            <Input name="cpf" value={form.cpf} onChange={handleChange} />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Data de Nascimento</label>
            <Input name="nascimento" type="date" value={form.nascimento} onChange={handleChange} />
          </div>
        </div>
  {/* Password field removed as requested */}
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSave}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
