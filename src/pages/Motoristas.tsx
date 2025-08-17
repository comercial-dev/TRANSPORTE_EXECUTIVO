import { Plus, Search, Star, Phone, Car, FileText, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

import React, { useState } from "react";

const Motoristas = () => {
  const [drivers, setDrivers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editando, setEditando] = useState(null); // id do motorista em edição
  const [detalhes, setDetalhes] = useState(null); // motorista em detalhes
  const emptyForm = {
    name: "",
    phone: "",
    email: "",
    rating: 5,
    totalTrips: 0,
    vehicle: "",
    vehiclePlate: "",
    vehicleModel: "",
    vehicleYear: "",
    cnhValidade: "",
    fotoVeiculo: null,
    fotoMotorista: null,
    lastTrip: new Date().toISOString()
  };
  const [form, setForm] = useState(emptyForm);
  const [erro, setErro] = useState("");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Disponível": return "bg-status-success text-white";
      case "Em Viagem": return "bg-status-info text-white";
      case "Folga": return "bg-status-warning text-white";
      case "Indisponível": return "bg-status-error text-white";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getDocumentStatus = (valid: boolean) => {
    return valid ? "text-status-success" : "text-status-error";
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) 
            ? "fill-yellow-400 text-yellow-400" 
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Motoristas</h1>
          <p className="text-muted-foreground">
            Cadastro, disponibilidade, documentação e avaliação
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary-hover" onClick={() => { setShowModal(true); setEditando(null); setForm(emptyForm); setErro(""); }}>
          <Plus className="w-4 h-4 mr-2" />
          Novo Motorista
        </Button>
      {/* Modal de cadastro de motorista */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">{editando ? "Editar Motorista" : "Cadastrar Motorista e Veículo"}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block font-medium">Foto do Veículo</label>
                <input type="file" accept="image/*" onChange={e => setForm(f => ({ ...f, fotoVeiculo: e.target.files && e.target.files[0] }))} className="border rounded w-full p-2" />
                {form.fotoVeiculo && (
                  <img src={URL.createObjectURL(form.fotoVeiculo)} alt="Foto do Veículo" className="mt-2 h-24 object-contain rounded" />
                )}
              </div>
              <div className="md:col-span-2">
                <label className="block font-medium">Foto do Rosto do Motorista</label>
                <input type="file" accept="image/*" onChange={e => setForm(f => ({ ...f, fotoMotorista: e.target.files && e.target.files[0] }))} className="border rounded w-full p-2" />
                {form.fotoMotorista && (
                  <img src={URL.createObjectURL(form.fotoMotorista)} alt="Foto do Motorista" className="mt-2 h-24 object-contain rounded" />
                )}
              </div>
              <div>
                <label className="block font-medium">Nome Completo *</label>
                <input name="name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="border rounded w-full p-2" required />
              </div>
              <div>
                <label className="block font-medium">Telefone *</label>
                <input name="phone" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value.replace(/\D/g,"") }))} className="border rounded w-full p-2" required maxLength={15} />
              </div>
              <div>
                <label className="block font-medium">E-mail *</label>
                <input name="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="border rounded w-full p-2" required />
              </div>
              {/* Status removido */}
              <div>
                <label className="block font-medium">Modelo do Veículo *</label>
                <input name="vehicleModel" value={form.vehicleModel} onChange={e => setForm(f => ({ ...f, vehicleModel: e.target.value }))} className="border rounded w-full p-2" required />
              </div>
              <div>
                <label className="block font-medium">Placa *</label>
                <input name="vehiclePlate" value={form.vehiclePlate} onChange={e => setForm(f => ({ ...f, vehiclePlate: e.target.value.toUpperCase() }))} className="border rounded w-full p-2" required maxLength={8} />
              </div>
              <div>
                <label className="block font-medium">Ano *</label>
                <input name="vehicleYear" value={form.vehicleYear} onChange={e => setForm(f => ({ ...f, vehicleYear: e.target.value.replace(/\D/g,"") }))} className="border rounded w-full p-2" required maxLength={4} />
              </div>
              <div>
                <label className="block font-medium">Veículo (Descrição)</label>
                <input name="vehicle" value={form.vehicle} onChange={e => setForm(f => ({ ...f, vehicle: e.target.value }))} className="border rounded w-full p-2" />
              </div>
              <div>
                <label className="block font-medium">CNH válida até</label>
                <input name="cnhValidade" value={form.cnhValidade} onChange={e => setForm(f => ({ ...f, cnhValidade: e.target.value }))} className="border rounded w-full p-2" placeholder="00/0000" maxLength={7} />
              </div>
            </div>
            {erro && <div className="text-red-500 mt-2">{erro}</div>}
            <div className="flex justify-end gap-2 mt-6">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={() => {
                  if (!form.name.trim() || !form.phone.trim() || !form.email.trim() || !form.vehicleModel.trim() || !form.vehiclePlate.trim() || !form.vehicleYear.trim()) {
                    setErro("Preencha todos os campos obrigatórios.");
                    return;
                  }
                  if (editando) {
                    setDrivers(prev => prev.map(d => d.id === editando ? { ...d, ...form } : d));
                  } else {
                    setDrivers(prev => [
                      ...prev,
                      {
                        ...form,
                        id: Date.now(),
                        lastTrip: new Date().toISOString(),
                        status: "Disponível",
                        documents: {
                          cnh: { valid: true, validade: form.cnhValidade },
                          criminal: { valid: true },
                          medical: { valid: true }
                        },
                        fotoVeiculo: form.fotoVeiculo ? URL.createObjectURL(form.fotoVeiculo) : null,
                        fotoMotorista: form.fotoMotorista ? URL.createObjectURL(form.fotoMotorista) : null
                      }
                    ]);
                  }
                  setShowModal(false);
                  setEditando(null);
                  setForm(emptyForm);
                  setErro("");
                }}
              >{editando ? "Atualizar" : "Salvar"}</button>
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => { setShowModal(false); setEditando(null); setErro(""); }}
              >Cancelar</button>
            </div>
          </div>
        </div>
      )}
      </div>

      {/* Busca e Filtros */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4 items-center">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome, telefone ou documento..."
                  className="pl-10"
                />
              </div>
            </div>
            <Button variant="outline">Todos os Status</Button>
            <Button variant="outline">Documentação</Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Motoristas */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {drivers.map((driver) => (
          <Card key={driver.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {driver.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{driver.name}</CardTitle>
                    <CardDescription>{driver.id}</CardDescription>
                  </div>
                </div>
                <Badge className={getStatusColor(driver.status)}>
                  {driver.status}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Contato */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>{driver.phone}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {driver.email}
                </div>
              </div>

              {/* Avaliação */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex">{renderStars(driver.rating)}</div>
                  <span className="text-sm font-medium">{driver.rating}</span>
                  <span className="text-sm text-muted-foreground">
                    ({driver.totalTrips} corridas)
                  </span>
                </div>
                <Progress value={(driver.rating / 5) * 100} className="h-2" />
              </div>

              {/* Veículo */}
              <div className="flex items-center gap-2 text-sm">
                <Car className="w-4 h-4 text-muted-foreground" />
                <span>{driver.vehicle}</span>
              </div>

              {/* Status da Documentação */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Documentação</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className={`text-center p-2 rounded ${getDocumentStatus(driver.documents.cnh.valid)} bg-muted/20`}>
                    <div className="font-medium">CNH</div>
                    <div className={driver.documents.cnh.valid ? "text-status-success" : "text-status-error"}>
                      {driver.documents.cnh.valid ? "OK" : "Vencida"}
                    </div>
                  </div>
                  <div className={`text-center p-2 rounded ${getDocumentStatus(driver.documents.criminal.valid)} bg-muted/20`}>
                    <div className="font-medium">Antec.</div>
                    <div className={driver.documents.criminal.valid ? "text-status-success" : "text-status-error"}>
                      {driver.documents.criminal.valid ? "OK" : "Vencido"}
                    </div>
                  </div>
                  <div className={`text-center p-2 rounded ${getDocumentStatus(driver.documents.medical.valid)} bg-muted/20`}>
                    <div className="font-medium">Médico</div>
                    <div className={driver.documents.medical.valid ? "text-status-success" : "text-status-error"}>
                      {driver.documents.medical.valid ? "OK" : "Vencido"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Última Corrida */}
              <div className="text-sm text-muted-foreground">
                <span className="font-medium">Última corrida:</span><br />
                {new Date(driver.lastTrip).toLocaleString('pt-BR')}
              </div>

              {/* Ações */}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => {
                  setEditando(driver.id);
                  setForm({ ...driver });
                  setShowModal(true);
                  setErro("");
                }}>
                  Editar
                </Button>
                <Button variant="outline" size="sm" className="flex-1" onClick={() => setDetalhes(driver)}>
                  Detalhes
                </Button>
              </div>
      {/* Modal de detalhes do motorista */}
      {detalhes && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">Detalhes do Motorista</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><strong>Nome:</strong> {detalhes.name}</div>
              <div><strong>Telefone:</strong> {detalhes.phone}</div>
              <div><strong>Email:</strong> {detalhes.email}</div>
              <div><strong>Modelo do Veículo:</strong> {detalhes.vehicleModel}</div>
              <div><strong>Placa:</strong> {detalhes.vehiclePlate}</div>
              <div><strong>Ano:</strong> {detalhes.vehicleYear}</div>
              <div><strong>Veículo (Descrição):</strong> {detalhes.vehicle}</div>
              <div><strong>CNH válida até:</strong> {detalhes.cnhValidade}</div>
              <div className="md:col-span-2">
                <strong>Foto do Veículo:</strong><br />
                {detalhes.fotoVeiculo && <img src={detalhes.fotoVeiculo} alt="Foto do Veículo" className="mt-2 h-24 object-contain rounded" />}
              </div>
              <div className="md:col-span-2">
                <strong>Foto do Motorista:</strong><br />
                {detalhes.fotoMotorista && <img src={detalhes.fotoMotorista} alt="Foto do Motorista" className="mt-2 h-24 object-contain rounded" />}
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => setDetalhes(null)}
              >Fechar</button>
            </div>
          </div>
        </div>
      )}
            </CardContent>
          </Card>
        ))}
      </div>

  {/* Resumo removido: cards de status fictícios */}
    </div>
  );
};

export default Motoristas;