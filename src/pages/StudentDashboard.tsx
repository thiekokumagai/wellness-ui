import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Dumbbell, Apple, Bell, Star } from "lucide-react";
import { mockAppointments, professionals } from "@/data/mockData";

const StudentDashboard = () => {
  const upcomingAppointments = mockAppointments.filter((a) => a.professional).slice(0, 3);
  const activePros = professionals.slice(0, 2);

  return (
    <DashboardLayout type="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Olá, João! 👋</h1>
          <p className="text-muted-foreground">Aqui está um resumo da sua jornada wellness</p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Próximos Atendimentos", value: "3", icon: Calendar, color: "text-primary" },
            { label: "Profissionais Ativos", value: "2", icon: Star, color: "text-accent" },
            { label: "Planos de Treino", value: "1", icon: Dumbbell, color: "text-primary" },
            { label: "Planos Alimentares", value: "1", icon: Apple, color: "text-accent" },
          ].map((s) => (
            <Card key={s.label} className="border-0 shadow-card">
              <CardContent className="flex items-center gap-4 p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                  <s.icon className={`h-5 w-5 ${s.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Upcoming appointments */}
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle className="text-lg">Próximos Atendimentos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingAppointments.map((a) => (
                <div key={a.id} className="flex items-center justify-between rounded-lg bg-secondary p-3">
                  <div>
                    <p className="font-semibold text-sm">{a.title}</p>
                    <p className="text-xs text-muted-foreground">{a.date} · {a.time}</p>
                  </div>
                  <Badge variant={a.status === "confirmado" ? "success" : "pending"}>{a.status}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Active professionals */}
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle className="text-lg">Profissionais Ativos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {activePros.map((p) => (
                <div key={p.id} className="flex items-center gap-3 rounded-lg bg-secondary p-3">
                  <img src={p.photo} alt={p.name} className="h-10 w-10 rounded-full object-cover" />
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.profession}</p>
                  </div>
                  <Button variant="ghost" size="sm">Abrir</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Notifications */}
        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg"><Bell className="h-4 w-4 text-primary" /> Notificações</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { text: "Novo plano de treino disponível de Ana Martins", time: "Há 2 horas" },
              { text: "Lembrete: Consulta com Dr. Carlos amanhã às 14h", time: "Há 5 horas" },
              { text: "Seu plano alimentar foi atualizado", time: "Ontem" },
            ].map((n, i) => (
              <div key={i} className="flex items-start justify-between rounded-lg bg-secondary p-3">
                <p className="text-sm">{n.text}</p>
                <span className="shrink-0 text-xs text-muted-foreground">{n.time}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;