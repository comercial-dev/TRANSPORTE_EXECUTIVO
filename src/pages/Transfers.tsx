import { Plus, Search, Filter, MapPin, Clock, DollarSign } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import React, { useState } from "react";
const Transfers = () => {
  const [transfers, setTransfers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  // Simula motoristas cadastrados (depois trocar para buscar do backend)
  const [drivers] = useState([
    { id: '', name: 'Motorista não selecionado' },
    // Exemplo: { id: '1', name: 'João Silva' }
  ]);
  const [form, setForm] = useState({
    origin: '',
    destination: '',
    dateTime: '',
    passenger: '',
    driver: '',
    value: '',
    distance: '',
    duration: '',
    payment: '',
    status: '',
    company: '',
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Concluída": return "bg-status-success text-white";
      case "Em Andamento": return "bg-status-info text-white";
      case "Agendada": return "bg-status-warning text-white";
      case "Cancelada": return "bg-status-error text-white";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const formatCurrency = (value: string) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(parseFloat(value));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transfers</h1>
          <p className="text-muted-foreground">
            Criação, edição e acompanhamento de corridas
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary-hover" onClick={() => setShowForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Nova Corrida
        </Button>
      {/* Modal de Nova Corrida */}
      {showForm && (
        <form
          onSubmit={e => {
            e.preventDefault();
            setTransfers(prev => [
              ...prev,
              { ...form, id: Date.now() }
            ]);
            setForm({
              origin: '', destination: '', dateTime: '', passenger: '', driver: '', value: '', distance: '', duration: '', payment: '', status: '', company: ''
            });
            setShowForm(false);
          }}
          className="bg-white p-6 rounded shadow space-y-4 max-w-xl mx-auto mb-6"
        >
          <div>
            <label className="block font-medium">Origem</label>
            <Input name="origin" value={form.origin} onChange={e => setForm(f => ({ ...f, origin: e.target.value }))} required />
          </div>
          <div>
            <label className="block font-medium">Destino</label>
            <Input name="destination" value={form.destination} onChange={e => setForm(f => ({ ...f, destination: e.target.value }))} required />
          </div>
          <div>
            <label className="block font-medium">Data e Hora</label>
            <Input type="datetime-local" name="dateTime" value={form.dateTime} onChange={e => setForm(f => ({ ...f, dateTime: e.target.value }))} required />
          </div>
          <div>
            <label className="block font-medium">Passageiro</label>
            <Input name="passenger" value={form.passenger} onChange={e => setForm(f => ({ ...f, passenger: e.target.value }))} required />
          </div>
          <div>
            <label className="block font-medium">Motorista</label>
            <select
              className="border rounded w-full p-2"
              name="driver"
              value={form.driver}
              onChange={e => setForm(f => ({ ...f, driver: e.target.value }))}
              required
            >
              {drivers.map(d => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block font-medium">Valor</label>
              <Input name="value" value={form.value} onChange={e => setForm(f => ({ ...f, value: e.target.value }))} required />
            </div>
            <div className="flex-1">
              <label className="block font-medium">Distância (km)</label>
              <Input name="distance" value={form.distance} onChange={e => setForm(f => ({ ...f, distance: e.target.value }))} required />
            </div>
            <div className="flex-1">
              <label className="block font-medium">Duração (min)</label>
              <Input name="duration" value={form.duration} onChange={e => setForm(f => ({ ...f, duration: e.target.value }))} required />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block font-medium">Pagamento</label>
              <Input name="payment" value={form.payment} onChange={e => setForm(f => ({ ...f, payment: e.target.value }))} />
            </div>
            <div className="flex-1">
              <label className="block font-medium">Status</label>
              <Input name="status" value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} />
            </div>
            <div className="flex-1">
              <label className="block font-medium">Empresa</label>
              <Input name="company" value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancelar</Button>
            <Button type="submit" className="bg-primary">Salvar</Button>
          </div>
        </form>
      )}
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4 items-center">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por código, motorista, passageiro..."
                  className="pl-10"
                />
              </div>
            </div>
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="agendada">Agendada</SelectItem>
                <SelectItem value="andamento">Em Andamento</SelectItem>
                <SelectItem value="concluida">Concluída</SelectItem>
                <SelectItem value="cancelada">Cancelada</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Motorista" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="joao">João Silva</SelectItem>
                <SelectItem value="carlos">Carlos Oliveira</SelectItem>
                <SelectItem value="ana">Ana Costa</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Transfers */}
      <div className="space-y-4">
        {transfers.map((transfer) => (
          <Card key={transfer.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="font-mono">
                    {transfer.id}
                  </Badge>
                  <Badge className={getStatusColor(transfer.status)}>
                    {transfer.status}
                  </Badge>
                  {transfer.company && (
                    <Badge variant="secondary">
                      {transfer.company}
                    </Badge>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Editar
                  </Button>
                  <Button variant="outline" size="sm">
                    Detalhes
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Informações do Transfer */}
                <div className="space-y-3">
                  <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                    Informações Gerais
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Data/Hora:</span>
                      <div className="font-medium">
                        {new Date(transfer.dateTime).toLocaleString('pt-BR')}
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Motorista:</span>
                      <div className="font-medium">{transfer.driver}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Passageiro:</span>
                      <div className="font-medium">{transfer.passenger}</div>
                    </div>
                  </div>
                </div>

                {/* Rota */}
                <div className="space-y-3">
                  <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                    Rota
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-muted-foreground">Origem:</div>
                        <div className="font-medium">{transfer.origin}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-muted-foreground">Destino:</div>
                        <div className="font-medium">{transfer.destination}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Detalhes Financeiros */}
                <div className="space-y-3">
                  <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                    Detalhes
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Distância:</span>
                      <span className="font-medium">{transfer.distance} km</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duração:</span>
                      <span className="font-medium">{transfer.duration} min</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Valor:</span>
                      <span className="font-bold text-primary">
                        {formatCurrency(transfer.value)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Pagamento:</span>
                      <span className="font-medium">{transfer.payment}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Paginação */}
      <div className="flex justify-center">
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Anterior</Button>
          <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">1</Button>
          <Button variant="outline" size="sm">2</Button>
          <Button variant="outline" size="sm">3</Button>
          <Button variant="outline" size="sm">Próximo</Button>
        </div>
      </div>
    </div>
  );
};

export default Transfers;