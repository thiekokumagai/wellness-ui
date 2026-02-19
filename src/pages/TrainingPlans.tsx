import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dumbbell, Plus, Trash2, ChevronRight, Clock, Target, User } from "lucide-react";
import { mockStudents } from "@/data/mockData";

interface Exercise {
  name: string;
  series: string;
  reps: string;
  obs: string;
}

interface Plan {
  id: number;
  student: string;
  name: string;
  exercises: Exercise[];
  createdAt: string;
}

const mockPlans: Plan[] = [
  { id: 1, student: "João Pedro", name: "Plano Hipertrofia Fase 1", exercises: [{ name: "Supino Reto", series: "4", reps: "10-12", obs: "Controle a descida" }, { name: "Agachamento", series: "4", reps: "12", obs: "Joelho alinhado" }], createdAt: "10/02/2026" },
  { id: 2, student: "Maria Clara", name: "Plano Funcional Core", exercises: [{ name: "Prancha", series: "3", reps: "45s", obs: "" }, { name: "Burpee", series: "3", reps: "15", obs: "Descanso 60s" }], createdAt: "12/02/2026" },
];

const TrainingPlans = () => {
  const [view, setView] = useState<"list" | "create" | "detail">("list");
  const [plans, setPlans] = useState<Plan[]>(mockPlans);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [exercises, setExercises] = useState<Exercise[]>([{ name: "", series: "", reps: "", obs: "" }]);
  const [student, setStudent] = useState("");
  const [planName, setPlanName] = useState("");

  const addExercise = () => setExercises([...exercises, { name: "", series: "", reps: "", obs: "" }]);
  const removeExercise = (i: number) => setExercises(exercises.filter((_, j) => j !== i));
  const updateExercise = (i: number, field: keyof Exercise, value: string) => {
    const n = [...exercises];
    n[i][field] = value;
    setExercises(n);
  };

  const savePlan = () => {
    const newPlan: Plan = {
      id: Date.now(),
      student,
      name: planName,
      exercises: exercises.filter((e) => e.name),
      createdAt: new Date().toLocaleDateString("pt-BR"),
    };
    setPlans([...plans, newPlan]);
    setView("list");
    setExercises([{ name: "", series: "", reps: "", obs: "" }]);
    setStudent("");
    setPlanName("");
  };

  return (
    <DashboardLayout type="professional">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            {view !== "list" && (
              <button onClick={() => setView("list")} className="mb-1 flex items-center gap-1 text-xs uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors">
                ← Voltar
              </button>
            )}
            <h1 className="font-heading text-4xl ">
              {view === "list" ? "PLANOS DE TREINO" : view === "create" ? "CRIAR PLANO" : selectedPlan?.name.toUpperCase()}
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              {view === "list" ? `${plans.length} planos criados` : view === "create" ? "Configure o plano para seu aluno" : `Aluno: ${selectedPlan?.student}`}
            </p>
          </div>
          {view === "list" && (
            <Button onClick={() => setView("create")} className="gradient-primary text-primary-foreground shadow-glow font-bold uppercase tracking-wider text-xs">
              <Plus className="h-4 w-4" /> Novo Plano
            </Button>
          )}
        </div>

        {/* LIST VIEW */}
        {view === "list" && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.id}
                onClick={() => { setSelectedPlan(plan); setView("detail"); }}
                className="group cursor-pointer rounded-lg border border-border bg-card p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-card-hover"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 group-hover:gradient-primary transition-all duration-300">
                  <Dumbbell className="h-5 w-5 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="font-bold text-foreground mb-1">{plan.name}</h3>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                  <User className="h-3 w-3" /> {plan.student}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Target className="h-3 w-3" /> {plan.exercises.length} exercícios</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {plan.createdAt}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </div>
            ))}

            {/* Empty create card */}
            <div
              onClick={() => setView("create")}
              className="group cursor-pointer rounded-lg border border-dashed border-border bg-card/50 p-6 transition-all duration-300 hover:border-primary/50 flex flex-col items-center justify-center min-h-[160px] gap-3"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-md border border-dashed border-border group-hover:border-primary transition-all duration-300">
                <Plus className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <p className="text-sm text-muted-foreground group-hover:text-primary transition-colors font-medium">Criar novo plano</p>
            </div>
          </div>
        )}

        {/* DETAIL VIEW */}
        {view === "detail" && selectedPlan && (
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg border border-border bg-card p-5">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Aluno</p>
                <p className="font-bold text-foreground">{selectedPlan.student}</p>
              </div>
              <div className="rounded-lg border border-border bg-card p-5">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Exercícios</p>
                <p className="font-heading text-3xl text-primary">{selectedPlan.exercises.length}</p>
              </div>
              <div className="rounded-lg border border-border bg-card p-5">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Criado em</p>
                <p className="font-bold text-foreground">{selectedPlan.createdAt}</p>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-card overflow-hidden">
              <div className="border-b border-border p-4">
                <h2 className="font-bold text-foreground uppercase tracking-wide text-sm">Lista de Exercícios</h2>
              </div>
              <div className="divide-y divide-border">
                {selectedPlan.exercises.map((ex, i) => (
                  <div key={i} className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-4">
                      <span className="font-heading text-2xl text-primary/30">{String(i + 1).padStart(2, "0")}</span>
                      <div>
                        <p className="font-semibold text-foreground">{ex.name}</p>
                        {ex.obs && <p className="text-xs text-muted-foreground">{ex.obs}</p>}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="text-center">
                        <p className="font-heading text-2xl text-foreground">{ex.series}</p>
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">séries</p>
                      </div>
                      <span className="text-muted-foreground">×</span>
                      <div className="text-center">
                        <p className="font-heading text-2xl text-foreground">{ex.reps}</p>
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">reps</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CREATE VIEW */}
        {view === "create" && (
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Aluno</Label>
                <select
                  value={student}
                  onChange={(e) => setStudent(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Selecione o aluno</option>
                  {mockStudents.map((s) => (
                    <option key={s.id} value={s.name}>{s.name}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Nome do Plano</Label>
                <Input placeholder="Ex: Plano Hipertrofia 30 dias" value={planName} onChange={(e) => setPlanName(e.target.value)} />
              </div>
            </div>

            <div className="rounded-lg border border-border bg-card overflow-hidden">
              <div className="flex items-center justify-between border-b border-border p-4">
                <h2 className="font-bold text-sm uppercase tracking-wider text-foreground">Exercícios</h2>
                <Button variant="outline" size="sm" onClick={addExercise} className="text-xs uppercase tracking-wider gap-1">
                  <Plus className="h-3 w-3" /> Adicionar
                </Button>
              </div>

              {/* Column headers */}
              <div className="grid grid-cols-[auto_1fr_80px_80px_1fr_40px] gap-3 border-b border-border bg-secondary px-4 py-2 text-[10px] uppercase tracking-widest text-muted-foreground">
                <span>#</span>
                <span>Exercício</span>
                <span>Séries</span>
                <span>Reps</span>
                <span>Observações</span>
                <span></span>
              </div>

              <div className="divide-y divide-border">
                {exercises.map((ex, i) => (
                  <div key={i} className="grid grid-cols-[auto_1fr_80px_80px_1fr_40px] gap-3 items-center px-4 py-3">
                    <span className="font-heading text-xl text-primary/40">{String(i + 1).padStart(2, "0")}</span>
                    <Input placeholder="Nome do exercício" value={ex.name} onChange={(e) => updateExercise(i, "name", e.target.value)} className="h-9" />
                    <Input placeholder="4" value={ex.series} onChange={(e) => updateExercise(i, "series", e.target.value)} className="h-9 text-center" />
                    <Input placeholder="12" value={ex.reps} onChange={(e) => updateExercise(i, "reps", e.target.value)} className="h-9 text-center" />
                    <Input placeholder="Observações..." value={ex.obs} onChange={(e) => updateExercise(i, "obs", e.target.value)} className="h-9" />
                    <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-destructive" onClick={() => removeExercise(i)}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={savePlan} className="gradient-primary text-primary-foreground shadow-glow font-bold uppercase tracking-wider text-xs">
                Salvar Plano
              </Button>
              <Button variant="outline" onClick={() => setView("list")} className="text-xs uppercase tracking-wider">
                Cancelar
              </Button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default TrainingPlans;
