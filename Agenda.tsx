import { Calendar, Clock, User, MapPin, Car } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Agenda = () => {
  const scheduledTrips = [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmada": return "bg-status-success text-white";
      case "Agendada": return "bg-status-info text-white";
      case "Pendente": return "bg-status-warning text-white";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Agenda</h1>
        <p className="text-muted-foreground">
          Calendário e lista das corridas agendadas
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Corridas Agendadas - Hoje
              </CardTitle>
              <CardDescription>
                {scheduledTrips.length} corridas programadas para hoje
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {scheduledTrips.map((trip) => (
                <div key={trip.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{trip.id}</Badge>
                        <Badge className={getStatusColor(trip.status)}>
                          {trip.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        {new Date(trip.dateTime).toLocaleString('pt-BR')}
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">Motorista:</span>
                        <span>{trip.driver}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">Passageiro:</span>
                        <span>{trip.passenger}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Car className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">Veículo:</span>
                        <span>{trip.vehicle}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                      <div>
                        <div><span className="font-medium">Origem:</span> {trip.origin}</div>
                        <div><span className="font-medium">Destino:</span> {trip.destination}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Resumo do Dia</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Agendadas</span>
                <span className="font-semibold">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Confirmadas</span>
                <span className="font-semibold text-status-success">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Pendentes</span>
                <span className="font-semibold text-status-warning">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Em Preparação</span>
                <span className="font-semibold text-status-info">0</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Próximas Ações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Agendar Nova Corrida
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Clock className="w-4 h-4 mr-2" />
                Ver Agenda Semanal
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <User className="w-4 h-4 mr-2" />
                Gerenciar Motoristas
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Agenda;