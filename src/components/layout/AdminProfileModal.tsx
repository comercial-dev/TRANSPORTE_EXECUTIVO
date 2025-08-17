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
    nome: "",
    email: "",
    telefone: "",
    senha: "",
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Configurar Perfil do Administrador</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input name="nome" placeholder="Nome" value={form.nome} onChange={handleChange} />
          <Input name="email" placeholder="E-mail" value={form.email} onChange={handleChange} />
          <Input name="telefone" placeholder="Telefone" value={form.telefone} onChange={handleChange} />
          <Input name="senha" placeholder="Senha" type="password" value={form.senha} onChange={handleChange} />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSave}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
