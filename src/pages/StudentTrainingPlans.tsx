import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Dumbbell, Plus, Trash2, ChevronRight, Clock, Target, CalendarDays  } from "lucide-react";

interface Exercise {
  name: string;
  series: string;
  reps: string;
  obs: string;
}

interface Plan {
  id: number;
  weekday: string;
  name: string;
  exercises: Exercise[];
  createdAt: string;
}

const mockPlans: Plan[] = [
  { id: 1, weekday: "Segunda-feira", name: "Peito e ombro", exercises: [{ name: "Supino Reto", series: "4", reps: "10-12", obs: "Controle a descida" }, { name: "Agachamento", series: "4", reps: "12", obs: "Joelho alinhado" }], createdAt: "10/02/2026" },
  { id: 2, weekday: "Terça-feira", name: "Perna", exercises: [{ name: "Prancha", series: "3", reps: "45s", obs: "" }, { name: "Burpee", series: "3", reps: "15", obs: "Descanso 60s" }], createdAt: "12/02/2026" },
];

const StudentTrainingPlans = () => {
  const [view, setView] = useState<"list" | "create" | "detail">("list");
  const [plans, setPlans] = useState<Plan[]>(mockPlans);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null); 

  return (
    <DashboardLayout type="student">
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
              {view === "list" ? `${plans.length} planos criados` : view === "create" ? "Configure o plano para seu aluno" : ``}
            </p>
          </div>
         
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
                  <CalendarDays  className="h-3 w-3" /> {plan.weekday}
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
          </div>
        )}

        {/* DETAIL VIEW */}
        {view === "detail" && selectedPlan && (
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg border border-border bg-card p-5">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Dia da semana</p>
                <p className="font-bold text-foreground">{selectedPlan.weekday}</p>
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
      </div>
    </DashboardLayout>
  );
};

export default StudentTrainingPlans;
