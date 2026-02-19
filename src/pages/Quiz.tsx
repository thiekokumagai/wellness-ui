import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import Header from "@/components/layout/Header";
import { cn } from "@/lib/utils";

interface Step {
  question: string;
  options: string[];
}

const steps: Step[] = [
  { question: "Qual é o seu principal objetivo?", options: ["Emagrecimento", "Ganho de massa muscular", "Condicionamento físico", "Flexibilidade e mobilidade", "Saúde e bem-estar geral", "Nutrição e alimentação"] },
  { question: "Qual seu nível de atividade física?", options: ["Sedentário", "Iniciante", "Intermediário", "Avançado", "Atleta"] },
  { question: "Quantos dias por semana você pode treinar?", options: ["1-2 dias", "3-4 dias", "5-6 dias", "Todos os dias"] },
  { question: "Prefere atendimento online ou presencial?", options: ["Online", "Presencial", "Tanto faz"] },
  { question: "Tem alguma restrição alimentar?", options: ["Nenhuma", "Vegetariano/Vegano", "Intolerância à lactose", "Intolerância ao glúten", "Diabetes", "Outra"] },
];

const Quiz = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const navigate = useNavigate();

  const isComplete = currentStep >= steps.length;
  const step = steps[currentStep];

  const selectAnswer = (answer: string) => {
    setAnswers({ ...answers, [currentStep]: answer });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container max-w-2xl py-12">
        {!isComplete ? (
          <>
            {/* Progress */}
            <div className="mb-8">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-semibold text-primary">Passo {currentStep + 1} de {steps.length}</span>
                <span className="text-muted-foreground">{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
              </div>
              <div className="h-2 rounded-full bg-secondary">
                <div className="h-full rounded-full gradient-primary transition-all duration-500" style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }} />
              </div>
            </div>

            <Card className="border-0 shadow-card">
              <CardContent className="p-8">
                <h2 className="mb-6 text-2xl font-bold text-center">{step.question}</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {step.options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => selectAnswer(opt)}
                      className={cn(
                        "rounded-xl border-2 p-4 text-left text-sm font-medium transition-all duration-200 hover:border-primary hover:bg-primary/5",
                        answers[currentStep] === opt
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border"
                      )}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="mt-6 flex justify-between">
              <Button variant="ghost" onClick={() => setCurrentStep(Math.max(0, currentStep - 1))} disabled={currentStep === 0}>
                <ArrowLeft className="mr-1 h-4 w-4" /> Anterior
              </Button>
              <Button onClick={() => setCurrentStep(currentStep + 1)} disabled={!answers[currentStep]}>
                {currentStep === steps.length - 1 ? "Concluir" : "Próximo"} <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </>
        ) : (
          <Card className="border-0 shadow-card">
            <CardContent className="flex flex-col items-center p-12 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full gradient-primary">
                <CheckCircle className="h-8 w-8 text-primary-foreground" />
              </div>
              <h2 className="mb-2 text-2xl font-bold">Quiz Concluído!</h2>
              <p className="mb-6 text-muted-foreground">Com base nas suas respostas, encontraremos os melhores profissionais para você.</p>
              <div className="mb-6 w-full max-w-sm space-y-2 text-left">
                {steps.map((s, i) => (
                  <div key={i} className="flex items-center justify-between rounded-lg bg-secondary p-3 text-sm">
                    <span className="text-muted-foreground">{s.question.substring(0, 30)}...</span>
                    <span className="font-semibold text-primary">{answers[i]}</span>
                  </div>
                ))}
              </div>
              <Button variant="hero" size="lg" onClick={() => navigate("/catalogo")}>
                Ver Profissionais Recomendados
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Quiz;