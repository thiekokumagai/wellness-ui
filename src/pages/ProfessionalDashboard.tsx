import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Users, Dumbbell, Apple, Plus, Trash2 } from "lucide-react";
import { mockStudents, mockAppointments } from "@/data/mockData";

const ProfessionalDashboard = () => {
  const [exercises, setExercises] = useState([{ name: "", series: "", reps: "", obs: "" }]);
  const [meals, setMeals] = useState([{ meal: "", time: "", obs: "" }]);

  return (
    <DashboardLayout type="professional">
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="flex-wrap">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="profile">Perfil</TabsTrigger>
          <TabsTrigger value="students">Alunos</TabsTrigger>
          <TabsTrigger value="training">Plano de Treino</TabsTrigger>
          <TabsTrigger value="meal">Plano Alimentar</TabsTrigger>
        </TabsList>

        {/* Overview */}
        <TabsContent value="overview" className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold">Dashboard Profissional</h1>
            <p className="text-muted-foreground">Gerencie seus alunos e atendimentos</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Alunos Ativos", value: "4", icon: Users },
              { label: "Atendimentos Hoje", value: "2", icon: Calendar },
              { label: "Planos de Treino", value: "6", icon: Dumbbell },
              { label: "Planos Alimentares", value: "4", icon: Apple },
            ].map((s) => (
              <Card key={s.label} className="border-0 shadow-card">
                <CardContent className="flex items-center gap-4 p-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                    <s.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{s.value}</p>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <Card className="border-0 shadow-card">
            <CardHeader><CardTitle className="text-lg">Próximos Atendimentos</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {mockAppointments.filter(a => a.student).slice(0, 3).map((a) => (
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
        </TabsContent>

        {/* Profile edit */}
        <TabsContent value="profile" className="space-y-6">
          <h2 className="text-xl font-bold">Editar Perfil Profissional</h2>
          <Card className="border-0 shadow-card">
            <CardContent className="p-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div><Label>Nome completo</Label><Input defaultValue="Ana Martins" /></div>
                <div><Label>Especialidade</Label><Input defaultValue="Personal Trainer" /></div>
                <div><Label>Cidade</Label><Input defaultValue="São Paulo" /></div>
                <div><Label>Valor hora/aula (R$)</Label><Input type="number" defaultValue="120" /></div>
                <div><Label>Modalidade</Label>
                  <div className="flex gap-2 mt-1">
                    <Badge variant="online">Online</Badge>
                    <Badge variant="presencial">Presencial</Badge>
                  </div>
                </div>
                <div><Label>Vídeo apresentação (URL)</Label><Input placeholder="https://youtube.com/..." /></div>
              </div>
              <div><Label>Sobre</Label><Textarea rows={4} defaultValue="Personal trainer certificada com 8 anos de experiência..." /></div>
              <div><Label>Qualificações</Label><Textarea rows={3} defaultValue="CREF 12345-G/SP&#10;Certificação CrossFit L2&#10;Especialização em Biomecânica" /></div>
              <div><Label>Benefícios</Label><Textarea rows={3} defaultValue="Avaliação física completa&#10;Plano personalizado&#10;Acompanhamento por app" /></div>
              <div><Label>Locais de atendimento</Label><Textarea rows={2} defaultValue="Studio Fitness Vila Madalena&#10;Parque Ibirapuera" /></div>
              <div><Label>Upload certificações</Label><Input type="file" accept=".pdf,.jpg,.png" /></div>
              <Button>Salvar Perfil</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Students */}
        <TabsContent value="students" className="space-y-6">
          <h2 className="text-xl font-bold">Meus Alunos</h2>
          <Card className="border-0 shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-secondary">
                    <th className="p-3 text-left font-semibold">Nome</th>
                    <th className="p-3 text-left font-semibold">Objetivo</th>
                    <th className="p-3 text-left font-semibold">Plano Ativo</th>
                    <th className="p-3 text-left font-semibold">Próximo Atendimento</th>
                    <th className="p-3 text-left font-semibold">Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {mockStudents.map((s) => (
                    <tr key={s.id} className="border-b last:border-0 hover:bg-secondary/50 transition-colors">
                      <td className="p-3 font-medium">{s.name}</td>
                      <td className="p-3 text-muted-foreground">{s.objective}</td>
                      <td className="p-3"><Badge variant="secondary">{s.activePlan}</Badge></td>
                      <td className="p-3 text-muted-foreground">{s.nextAppointment}</td>
                      <td className="p-3"><Button variant="ghost" size="sm">Abrir</Button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        {/* Training plan editor */}
        <TabsContent value="training" className="space-y-6">
          <h2 className="text-xl font-bold">Criar Plano de Treino</h2>
          <Card className="border-0 shadow-card">
            <CardContent className="p-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div><Label>Aluno</Label><Input placeholder="Selecione o aluno" /></div>
                <div><Label>Nome do Plano</Label><Input placeholder="Ex: Plano Hipertrofia 30 dias" /></div>
              </div>
              <div>
                <Label className="mb-2 block">Exercícios</Label>
                {exercises.map((ex, i) => (
                  <div key={i} className="mb-2 grid grid-cols-[1fr_80px_80px_1fr_40px] gap-2 items-end">
                    <Input placeholder="Exercício" value={ex.name} onChange={(e) => { const n = [...exercises]; n[i].name = e.target.value; setExercises(n); }} />
                    <Input placeholder="Séries" value={ex.series} onChange={(e) => { const n = [...exercises]; n[i].series = e.target.value; setExercises(n); }} />
                    <Input placeholder="Reps" value={ex.reps} onChange={(e) => { const n = [...exercises]; n[i].reps = e.target.value; setExercises(n); }} />
                    <Input placeholder="Observações" value={ex.obs} onChange={(e) => { const n = [...exercises]; n[i].obs = e.target.value; setExercises(n); }} />
                    <Button variant="ghost" size="icon" onClick={() => setExercises(exercises.filter((_, j) => j !== i))}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => setExercises([...exercises, { name: "", series: "", reps: "", obs: "" }])}><Plus className="mr-1 h-3 w-3" /> Adicionar</Button>
              </div>
              <Button>Salvar Plano de Treino</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Meal plan editor */}
        <TabsContent value="meal" className="space-y-6">
          <h2 className="text-xl font-bold">Criar Plano Alimentar</h2>
          <Card className="border-0 shadow-card">
            <CardContent className="p-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div><Label>Aluno</Label><Input placeholder="Selecione o aluno" /></div>
                <div><Label>Upload PDF</Label><Input type="file" accept=".pdf" /></div>
              </div>
              <div>
                <Label className="mb-2 block">Refeições</Label>
                {meals.map((m, i) => (
                  <div key={i} className="mb-2 grid grid-cols-[1fr_120px_1fr_40px] gap-2 items-end">
                    <Input placeholder="Refeição" value={m.meal} onChange={(e) => { const n = [...meals]; n[i].meal = e.target.value; setMeals(n); }} />
                    <Input type="time" value={m.time} onChange={(e) => { const n = [...meals]; n[i].time = e.target.value; setMeals(n); }} />
                    <Input placeholder="Observações" value={m.obs} onChange={(e) => { const n = [...meals]; n[i].obs = e.target.value; setMeals(n); }} />
                    <Button variant="ghost" size="icon" onClick={() => setMeals(meals.filter((_, j) => j !== i))}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => setMeals([...meals, { meal: "", time: "", obs: "" }])}><Plus className="mr-1 h-3 w-3" /> Adicionar</Button>
              </div>
              <Textarea placeholder="Observações gerais sobre o plano alimentar..." rows={3} />
              <Button>Salvar Plano Alimentar</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default ProfessionalDashboard;