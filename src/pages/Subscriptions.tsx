import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Subscriptions = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-12">
        {/* Professional subscription */}
        <section className="mb-16">
          <div className="mb-8 text-center">
            <Badge variant="default" className="mb-3">Para Profissionais</Badge>
            <h1 className="mb-2 text-3xl font-bold">Assinatura da Plataforma</h1>
            <p className="text-muted-foreground">Escolha o plano ideal para expandir sua presença e atrair mais alunos</p>
          </div>
          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
            {[
              { name: "Starter", price: "49", features: ["Perfil básico", "Até 5 alunos", "Chat ilimitado", "1 especialidade"], popular: false },
              { name: "Profissional", price: "99", features: ["Perfil completo", "Até 20 alunos", "Chat ilimitado", "Todas especialidades", "Destaque na busca", "Agenda integrada", "Relatórios"], popular: true },
              { name: "Premium", price: "179", features: ["Tudo do Profissional", "Alunos ilimitados", "Selo verificado", "Prioridade no suporte", "API de integração", "Analytics avançado"], popular: false },
            ].map((plan) => (
              <Card key={plan.name} className={`relative border-0 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 ${plan.popular ? "ring-2 ring-primary" : ""}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant="default">Mais Popular</Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-lg">{plan.name}</CardTitle>
                  <div className="mt-2">
                    <span className="text-4xl font-extrabold text-primary">R${plan.price}</span>
                    <span className="text-muted-foreground">/mês</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-primary shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                    Assinar {plan.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Student subscription per professional */}
        <section>
          <div className="mb-8 text-center">
            <Badge variant="secondary" className="mb-3">Para Alunos</Badge>
            <h2 className="mb-2 text-3xl font-bold">Planos por Profissional</h2>
            <p className="text-muted-foreground">Contrate planos diretamente com seus profissionais favoritos</p>
          </div>
          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
            {[
              { name: "Avulso", price: "120", unit: "/sessão", features: ["1 sessão", "Sem compromisso", "Chat por 7 dias", "Plano básico"] },
              { name: "Mensal", price: "399", unit: "/mês", features: ["4 sessões/mês", "Chat ilimitado", "Plano completo", "Ajustes semanais", "Acompanhamento diário"] },
              { name: "Trimestral", price: "999", unit: "/trimestre", features: ["12 sessões", "Chat ilimitado", "Plano completo", "Ajustes ilimitados", "Reavaliação mensal", "20% de desconto"] },
            ].map((plan) => (
              <Card key={plan.name} className="border-0 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1">
                <CardHeader className="text-center">
                  <CardTitle className="text-lg">{plan.name}</CardTitle>
                  <div className="mt-2">
                    <span className="text-4xl font-extrabold text-primary">R${plan.price}</span>
                    <span className="text-muted-foreground">{plan.unit}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-primary shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant="outline">Contratar</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Subscriptions;