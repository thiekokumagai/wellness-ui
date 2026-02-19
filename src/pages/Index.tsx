import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Star, ArrowRight, ArrowUpRight, Dumbbell, Apple, Users, Zap, Shield, TrendingUp } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { professionals, testimonials } from "@/data/mockData";
import heroImage from "@/assets/hero-wellness.jpg";

const Index = () => {
  const featuredPros = professionals.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Background image with aggressive overlay */}
        <div className="absolute inset-0">
          <img src={heroImage} alt="Wellness lifestyle" className="h-full w-full object-cover scale-105" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        {/* Decorative elements */}
        <div className="absolute right-0 top-0 h-full w-1/2 opacity-20">
          <div className="absolute right-20 top-20 h-96 w-96 rounded-full bg-primary blur-[120px]" />
          <div className="absolute right-40 bottom-40 h-64 w-64 rounded-full bg-accent blur-[100px] opacity-50" />
        </div>

        <div className="container relative z-10 py-24">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary animate-fade-in">
              <Zap className="h-3 w-3 fill-primary" />
              Plataforma #1 de Wellness no Brasil
            </div>

            <h1 className="mb-6 font-heading text-7xl leading-none text-foreground md:text-8xl lg:text-9xl animate-fade-in" style={{ animationDelay: "0.05s" }}>
              ELEVE SEU<br />
              <span className="text-gradient">CORPO</span><br />
              AO LIMITE.
            </h1>

            <p className="mb-10 max-w-xl text-lg text-muted-foreground animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Conecte-se com personal trainers e nutricionistas de elite. Resultados reais, acompanhamento profissional.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row animate-fade-in" style={{ animationDelay: "0.15s" }}>
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Personal trainer, nutricionista, cidade..."
                  className="h-14 w-full rounded-lg border border-border bg-card/80 pl-12 pr-4 text-foreground backdrop-blur-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                />
              </div>
              <Link to="/catalogo">
                <Button size="lg" className="h-14 gradient-primary text-primary-foreground shadow-glow font-bold uppercase tracking-wider px-8 hover:opacity-90 hover:shadow-lg transition-all">
                  Buscar Agora
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>

            <div className="mt-8 flex items-center gap-8 text-sm animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {["bg-primary", "bg-accent", "bg-primary/70"].map((c, i) => (
                    <div key={i} className={`h-8 w-8 rounded-full ${c} border-2 border-background`} />
                  ))}
                </div>
                <span className="text-muted-foreground">+500 profissionais</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(s => <Star key={s} className="h-3.5 w-3.5 fill-accent text-accent" />)}
                </div>
                <span className="text-muted-foreground">4.8 média</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground animate-bounce">
          <div className="h-10 w-px bg-gradient-to-b from-primary to-transparent" />
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-border bg-card">
        <div className="container">
          <div className="grid grid-cols-2 divide-x divide-border md:grid-cols-4">
            {[
              { value: "500+", label: "Profissionais" },
              { value: "12K+", label: "Alunos Ativos" },
              { value: "4.8★", label: "Avaliação Média" },
              { value: "98%", label: "Satisfação" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center py-6 px-4 text-center">
                <span className="font-heading text-4xl text-primary">{s.value}</span>
                <span className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="container py-24">
        <div className="mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-primary">Como Funciona</p>
            <h2 className="font-heading text-6xl text-foreground md:text-7xl">3 PASSOS<br />SIMPLES.</h2>
          </div>
          <p className="max-w-xs text-muted-foreground md:text-right">Em minutos você encontra e contrata o profissional ideal para seus objetivos</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { step: "01", icon: Search, title: "Busque", desc: "Filtre por especialidade, localização, preço e disponibilidade para encontrar o profissional certo.", color: "text-primary" },
            { step: "02", icon: Users, title: "Conecte", desc: "Veja perfis completos, certificações, vídeos de apresentação e agende sua consulta.", color: "text-accent" },
            { step: "03", icon: TrendingUp, title: "Evolua", desc: "Receba planos personalizados, acompanhamento contínuo e alcance seus objetivos.", color: "text-primary" },
          ].map((item, idx) => (
            <div key={item.step} className="group relative overflow-hidden rounded-lg border border-border bg-card p-8 transition-all duration-500 hover:border-primary/50 hover:shadow-card-hover">
              <div className="absolute right-6 top-6 font-heading text-7xl text-border transition-colors duration-300 group-hover:text-primary/10 select-none">
                {item.step}
              </div>
              <div className="relative z-10">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-md bg-secondary transition-all duration-300 group-hover:gradient-primary">
                  <item.icon className={`h-5 w-5 ${item.color} transition-colors duration-300 group-hover:text-primary-foreground`} />
                </div>
                <h3 className="mb-3 font-heading text-4xl text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Professional types */}
      <section className="gradient-soft py-24">
        <div className="container">
          <div className="mb-16">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-primary">Especialidades</p>
            <h2 className="font-heading text-6xl text-foreground md:text-7xl">ENCONTRE SEU<br />PROFISSIONAL.</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                icon: Dumbbell,
                title: "Personal Trainers",
                desc: "Musculação, HIIT, CrossFit, Yoga, Pilates e muito mais. Treinos presenciais ou online adaptados ao seu nível.",
                count: "320+",
                tag: "Mais procurado",
              },
              {
                icon: Apple,
                title: "Nutricionistas",
                desc: "Nutrição esportiva, emagrecimento, nutrição clínica, vegana e mais. Planos alimentares totalmente personalizados.",
                count: "180+",
                tag: "Alto impacto",
              },
            ].map((item) => (
              <Link to="/catalogo" key={item.title}>
                <div className="group relative overflow-hidden rounded-lg border border-border bg-card p-10 transition-all duration-500 hover:border-primary/50 hover:shadow-card-hover cursor-pointer">
                  <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/5 transition-all duration-500 group-hover:bg-primary/10 group-hover:scale-150" />
                  <div className="relative z-10 flex items-start gap-6">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-md bg-secondary transition-all duration-300 group-hover:gradient-primary">
                      <item.icon className="h-7 w-7 text-primary transition-colors duration-300 group-hover:text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="mb-3 flex items-center gap-3">
                        <h3 className="font-heading text-3xl text-foreground">{item.title}</h3>
                        <Badge variant="outline" className="text-[10px] uppercase tracking-wider border-primary/30 text-primary">{item.tag}</Badge>
                      </div>
                      <p className="mb-4 text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-heading text-4xl text-primary">{item.count} <span className="text-base font-sans text-muted-foreground">profissionais</span></span>
                        <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all duration-300 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured professionals */}
      <section className="container py-24">
        <div className="mb-16 flex items-end justify-between">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-primary">Destaque</p>
            <h2 className="font-heading text-6xl text-foreground md:text-7xl">TOP<br />PROFISSIONAIS.</h2>
          </div>
          <Link to="/catalogo" className="hidden md:flex">
            <Button variant="outline" className="gap-2 border-border text-xs uppercase tracking-wider">
              Ver todos <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featuredPros.map((pro, idx) => (
            <Card key={pro.id} className={`group overflow-hidden border border-border bg-card transition-all duration-500 hover:border-primary/50 hover:shadow-card-hover ${idx === 0 ? "md:row-span-1" : ""}`}>
              <CardContent className="p-0">
                <div className="relative h-52 overflow-hidden">
                  <img src={pro.photo} alt={pro.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex gap-1.5">
                    {pro.online && <Badge className="bg-primary/90 text-primary-foreground text-[10px] uppercase tracking-wider">Online</Badge>}
                    {pro.presencial && <Badge className="bg-accent/90 text-accent-foreground text-[10px] uppercase tracking-wider">Presencial</Badge>}
                  </div>
                  <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-card/90 backdrop-blur-sm px-2.5 py-1 text-xs font-bold">
                    <Star className="h-3 w-3 fill-accent text-accent" />
                    {pro.rating}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-foreground text-lg leading-tight">{pro.name}</h3>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mt-0.5">{pro.profession} · {pro.city}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <span className="font-heading text-3xl text-primary">R${pro.pricePerHour}</span>
                      <span className="text-xs text-muted-foreground">/hora</span>
                    </div>
                    <Link to={`/profissional/${pro.id}`}>
                      <Button size="sm" className="gradient-primary text-primary-foreground text-xs uppercase tracking-wider font-bold shadow-glow">
                        Ver Perfil
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Link to="/catalogo" className="mt-6 flex justify-center md:hidden">
          <Button variant="outline" className="gap-2 border-border text-xs uppercase tracking-wider">Ver todos <ArrowRight className="h-4 w-4" /></Button>
        </Link>
      </section>

      {/* Testimonials */}
      <section className="gradient-soft py-24">
        <div className="container">
          <div className="mb-16">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-primary">Depoimentos</p>
            <h2 className="font-heading text-6xl text-foreground md:text-7xl">HISTÓRIAS<br />REAIS.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <div key={i} className="group rounded-lg border border-border bg-card p-8 transition-all duration-300 hover:border-primary/50 hover:shadow-card-hover">
                <div className="mb-4 flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="mb-6 text-foreground/80 leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-3 border-t border-border pt-4">
                  <div className="h-9 w-9 rounded-full gradient-primary flex items-center justify-center">
                    <span className="text-xs font-bold text-primary-foreground">{t.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container py-24">
        <div className="relative overflow-hidden rounded-lg border border-primary/30 bg-card p-12 md:p-20">
          {/* BG decoration */}
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-primary/10 blur-[80px]" />
          <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-accent/10 blur-[80px]" />
          <div className="relative z-10 flex flex-col items-center text-center">
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-primary">Comece Hoje</p>
            <h2 className="mb-6 font-heading text-6xl text-foreground md:text-7xl lg:text-8xl">
              PRONTO PARA<br />
              <span className="text-gradient">EVOLUIR?</span>
            </h2>
            <p className="mb-10 max-w-lg text-muted-foreground">
              Cadastre-se gratuitamente e encontre o profissional perfeito para transformar sua saúde e performance.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link to="/quiz">
                <Button size="lg" className="h-14 gradient-primary text-primary-foreground shadow-glow font-bold uppercase tracking-wider px-10 hover:opacity-90">
                  <Zap className="h-5 w-5 fill-primary-foreground" />
                  Começar Agora
                </Button>
              </Link>
              <Link to="/catalogo">
                <Button variant="outline" size="lg" className="h-14 border-border font-bold uppercase tracking-wider px-10">
                  Ver Profissionais
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-6 text-xs text-muted-foreground">
              {[
                { icon: Shield, text: "Sem cartão de crédito" },
                { icon: Zap, text: "Acesso imediato" },
                { icon: Star, text: "Garantia de satisfação" },
              ].map(({ icon: Icon, text }) => (
                <span key={text} className="flex items-center gap-1.5">
                  <Icon className="h-3.5 w-3.5 text-primary" />
                  {text}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
