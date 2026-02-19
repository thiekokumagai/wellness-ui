import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Apple, Plus, Trash2, ChevronRight, Clock, User, FileText, Utensils } from "lucide-react";
import { mockStudents } from "@/data/mockData";

interface Meal {
  meal: string;
  time: string;
  foods: string;
  obs: string;
}

interface MealPlan {
  id: number;
  student: string;
  name: string;
  meals: Meal[];
  generalObs: string;
  createdAt: string;
  kcal: string;
}

const mockMealPlans: MealPlan[] = [
  {
    id: 1, student: "João Pedro", name: "Plano Emagrecimento Low Carb", createdAt: "11/02/2026", kcal: "1800",
    generalObs: "Evitar carboidratos simples após 18h.",
    meals: [
      { meal: "Café da manhã", time: "07:00", foods: "Ovos mexidos, abacate, café sem açúcar", obs: "" },
      { meal: "Almoço", time: "12:00", foods: "Frango grelhado, salada, brócolis", obs: "Comer devagar" },
      { meal: "Lanche", time: "15:30", foods: "Castanhas, whey protein", obs: "" },
      { meal: "Jantar", time: "19:00", foods: "Salmão, legumes no vapor", obs: "" },
    ],
  },
  {
    id: 2, student: "Maria Clara", name: "Plano Ganho de Massa", createdAt: "13/02/2026", kcal: "2800",
    generalObs: "Manter ingestão de proteínas acima de 2g/kg.",
    meals: [
      { meal: "Café da manhã", time: "06:30", foods: "Aveia, banana, whey, ovos", obs: "" },
      { meal: "Pré-treino", time: "09:00", foods: "Batata doce, frango", obs: "1h antes do treino" },
      { meal: "Pós-treino", time: "11:30", foods: "Whey protein, fruta", obs: "Imediatamente após" },
    ],
  },
];

const StudentMealPlans = () => {
  const [view, setView] = useState<"list" | "create" | "detail">("list");
  const [plans, setPlans] = useState<MealPlan[]>(mockMealPlans);
  const [selectedPlan, setSelectedPlan] = useState<MealPlan | null>(null);
  const [meals, setMeals] = useState<Meal[]>([{ meal: "", time: "", foods: "", obs: "" }]);
  const [student, setStudent] = useState("");
  const [planName, setPlanName] = useState("");
  const [kcal, setKcal] = useState("");
  const [generalObs, setGeneralObs] = useState("");

  const addMeal = () => setMeals([...meals, { meal: "", time: "", foods: "", obs: "" }]);
  const removeMeal = (i: number) => setMeals(meals.filter((_, j) => j !== i));
  const updateMeal = (i: number, field: keyof Meal, value: string) => {
    const n = [...meals];
    n[i][field] = value;
    setMeals(n);
  };

  const savePlan = () => {
    const newPlan: MealPlan = {
      id: Date.now(), student, name: planName, meals: meals.filter((m) => m.meal),
      generalObs, createdAt: new Date().toLocaleDateString("pt-BR"), kcal,
    };
    setPlans([...plans, newPlan]);
    setView("list");
    setMeals([{ meal: "", time: "", foods: "", obs: "" }]);
    setStudent(""); setPlanName(""); setKcal(""); setGeneralObs("");
  };

  const mealColors: Record<string, string> = {
    "Café da manhã": "text-accent",
    "Almoço": "text-primary",
    "Lanche": "text-accent",
    "Jantar": "text-primary",
    "Pré-treino": "text-primary",
    "Pós-treino": "text-accent",
  };

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
            <h1 className="font-heading text-4xl text-foreground">
              {view === "list" ? "PLANOS ALIMENTARES" : view === "create" ? "CRIAR PLANO" : selectedPlan?.name.toUpperCase()}
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              {view === "list" ? `${plans.length} planos criados` : view === "create" ? "Configure o plano alimentar do aluno" : ``}
            </p>
          </div>
        </div>

        {/* LIST */}
        {view === "list" && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.id}
                onClick={() => { setSelectedPlan(plan); setView("detail"); }}
                className="group cursor-pointer rounded-lg border border-border bg-card p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-card-hover"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 group-hover:gradient-primary transition-all duration-300">
                  <Apple className="h-5 w-5 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="font-bold text-foreground mb-1">{plan.name}</h3>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                  <User className="h-3 w-3" /> {plan.student}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Utensils className="h-3 w-3" /> {plan.meals.length} refeições</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {plan.createdAt}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                {plan.kcal && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <span className="text-xs text-muted-foreground">Meta calórica: </span>
                    <span className="text-xs font-bold text-primary">{plan.kcal} kcal/dia</span>
                  </div>
                )}
              </div>
            ))}

           
          </div>
        )}

        {/* DETAIL */}
        {view === "detail" && selectedPlan && (
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg border border-border bg-card p-5">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Aluno</p>
                <p className="font-bold text-foreground">{selectedPlan.student}</p>
              </div>
              <div className="rounded-lg border border-border bg-card p-5">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Refeições</p>
                <p className="font-heading text-3xl text-primary">{selectedPlan.meals.length}</p>
              </div>
              <div className="rounded-lg border border-border bg-card p-5">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Meta calórica</p>
                <p className="font-heading text-3xl text-accent">{selectedPlan.kcal || "—"} <span className="text-xs font-sans text-muted-foreground">kcal</span></p>
              </div>
            </div>

            {selectedPlan.generalObs && (
              <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 flex items-start gap-3">
                <FileText className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <p className="text-sm text-foreground/80">{selectedPlan.generalObs}</p>
              </div>
            )}

            <div className="rounded-lg border border-border bg-card overflow-hidden">
              <div className="border-b border-border p-4">
                <h2 className="font-bold text-sm uppercase tracking-wider text-foreground">Refeições do Dia</h2>
              </div>
              <div className="divide-y divide-border">
                {selectedPlan.meals.map((m, i) => (
                  <div key={i} className="flex items-start gap-4 p-4">
                    <div className="flex flex-col items-center gap-1">
                      <span className={`font-heading text-lg ${mealColors[m.meal] ?? "text-primary"}`}>{m.time}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground text-sm">{m.meal}</p>
                      <p className="text-sm text-muted-foreground mt-1">{m.foods}</p>
                      {m.obs && <p className="text-xs text-muted-foreground/70 mt-1 italic">{m.obs}</p>}
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

export default StudentMealPlans;
