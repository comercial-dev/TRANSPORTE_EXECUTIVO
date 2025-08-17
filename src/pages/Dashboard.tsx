import { useState, useMemo } from "react";
import { 
  Car, 
  DollarSign, 
  Clock, 
  MapPin, 
  TrendingUp,
  Users,
  Calendar,
  BarChart3
} from "lucide-react";
import { KPICard } from "@/components/dashboard/KPICard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from "recharts";

interface TripData {
  "Código Corrida": string;
  "Data/Hora da Corrida": string;
  "Motorista": string;
  "Passageiro": string;
  "Origem": string;
  "Destino": string;
  "Distância (km)": string;
  "Duração (min)": string;
  "Valor Corrida": string;
  "Forma de Pagamento": string;
  "Status": string;
  "Empresa Cliente": string;
}

const Dashboard = () => {
  // Simulação de dados locais de corridas
  const [tripData, setTripData] = useState<TripData[]>([]);

  const dashboardData = useMemo(() => {
    if (!tripData.length) return null;

    // KPIs
    const totalTrips = tripData.length;
    const totalRevenue = tripData.reduce((sum, trip) => sum + parseFloat(trip["Valor Corrida"] || "0"), 0);
    const avgTicket = totalRevenue / totalTrips;
    const avgDistance = tripData.reduce((sum, trip) => sum + parseFloat(trip["Distância (km)"] || "0"), 0) / totalTrips;
    const avgDuration = tripData.reduce((sum, trip) => sum + parseFloat(trip["Duração (min)"] || "0"), 0) / totalTrips;

    // Status distribution
    const statusCount = tripData.reduce((acc, trip) => {
      const status = trip.Status || "Indefinido";
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const statusData = Object.entries(statusCount).map(([status, count]) => ({
      name: status,
      value: count,
      percentage: (count / totalTrips * 100).toFixed(1)
    }));

    // Monthly revenue and trips
    const monthlyData = tripData.reduce((acc, trip) => {
      const date = new Date(trip["Data/Hora da Corrida"]);
      const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
      
      if (!acc[monthYear]) {
        acc[monthYear] = { month: monthYear, trips: 0, revenue: 0 };
      }
      
      acc[monthYear].trips += 1;
      acc[monthYear].revenue += parseFloat(trip["Valor Corrida"] || "0");
      
      return acc;
    }, {} as Record<string, { month: string; trips: number; revenue: number }>);

    const monthlyChartData = Object.values(monthlyData).sort((a, b) => {
      const [monthA, yearA] = a.month.split('/');
      const [monthB, yearB] = b.month.split('/');
      return new Date(parseInt(yearA), parseInt(monthA) - 1).getTime() - 
             new Date(parseInt(yearB), parseInt(monthB) - 1).getTime();
    });

    // Driver performance
    const driverData = tripData.reduce((acc, trip) => {
      const driver = trip.Motorista || "Indefinido";
      if (!acc[driver]) {
        acc[driver] = { name: driver, trips: 0, revenue: 0 };
      }
      acc[driver].trips += 1;
      acc[driver].revenue += parseFloat(trip["Valor Corrida"] || "0");
      return acc;
    }, {} as Record<string, { name: string; trips: number; revenue: number }>);

    const driverChartData = Object.values(driverData)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 10);

    // Routes analysis
    const routeData = tripData.reduce((acc, trip) => {
      const route = `${trip.Origem} → ${trip.Destino}`;
      acc[route] = (acc[route] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const routeChartData = Object.entries(routeData)
      .map(([route, count]) => ({ route, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    return {
      kpis: {
        totalTrips,
        totalRevenue,
        avgTicket,
        avgDistance,
        avgDuration
      },
      statusData,
      monthlyChartData,
      driverChartData,
      routeChartData
    };
  }, [tripData]);

  const COLORS = ['hsl(210 100% 50%)', 'hsl(142 76% 36%)', 'hsl(45 93% 47%)', 'hsl(0 84% 60%)', 'hsl(43 84% 56%)'];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  if (!dashboardData) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Painel de controle para análise de operações de transporte executivo
          </p>
        </div>
        <div className="p-6 text-gray-500">Cadastre a primeira corrida para visualizar as análises.</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Análise operacional e estratégica • {dashboardData.kpis.totalTrips} corridas carregadas
          </p>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <KPICard
          title="Total de Corridas"
          value={dashboardData.kpis.totalTrips.toLocaleString('pt-BR')}
          description="Corridas registradas"
          icon={Car}
          trend={{ value: 12, isPositive: true }}
        />
        <KPICard
          title="Faturamento Total"
          value={formatCurrency(dashboardData.kpis.totalRevenue)}
          description="Receita acumulada"
          icon={DollarSign}
          trend={{ value: 8, isPositive: true }}
        />
        <KPICard
          title="Ticket Médio"
          value={formatCurrency(dashboardData.kpis.avgTicket)}
          description="Valor médio por corrida"
          icon={TrendingUp}
          trend={{ value: 3, isPositive: false }}
        />
        <KPICard
          title="Distância Média"
          value={`${dashboardData.kpis.avgDistance.toFixed(1)} km`}
          description="Por corrida"
          icon={MapPin}
        />
        <KPICard
          title="Duração Média"
          value={`${Math.round(dashboardData.kpis.avgDuration)} min`}
          description="Tempo médio"
          icon={Clock}
        />
      </div>

      {/* Charts */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="routes">Rotas</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Faturamento Mensal</CardTitle>
                <CardDescription>Evolução da receita ao longo do tempo</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={dashboardData.monthlyChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => formatCurrency(value)} />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Line type="monotone" dataKey="revenue" stroke="hsl(210 100% 50%)" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Status das Corridas</CardTitle>
                <CardDescription>Distribuição por situação</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={dashboardData.statusData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percentage }) => `${name}: ${percentage}%`}
                    >
                      {dashboardData.statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance por Motorista</CardTitle>
              <CardDescription>Top 10 motoristas por faturamento</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={dashboardData.driverChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                  <YAxis tickFormatter={(value) => formatCurrency(value)} />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Bar dataKey="revenue" fill="hsl(142 76% 36%)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="routes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Rotas Mais Frequentes</CardTitle>
              <CardDescription>Top 10 rotas por número de corridas</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={dashboardData.routeChartData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="route" width={200} />
                  <Tooltip />
                  <Bar dataKey="count" fill="hsl(45 93% 47%)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;