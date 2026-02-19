import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, MessageCircle, Calendar, CheckCircle, Award, Play } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { professionals } from "@/data/mockData";

const ProfessionalProfile = () => {
  const { id } = useParams();
  const pro = professionals.find((p) => p.id === id) || professionals[0];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Profile Header */}
      <section className="gradient-soft border-b">
        <div className="container py-10">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
            <img src={pro.photo} alt={pro.name} className="h-32 w-32 rounded-2xl object-cover shadow-card-hover" />
            <div className="flex-1">
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <h1 className="text-3xl font-bold">{pro.name}</h1>
                <Badge variant="default">{pro.profession}</Badge>
              </div>
              <div className="mb-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {pro.city}</span>
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-accent text-accent" /> {pro.rating} ({pro.reviews} avaliações)
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {pro.online && <Badge variant="online">Online</Badge>}
                {pro.presencial && <Badge variant="presencial">Presencial</Badge>}
                {pro.specialties.map((s) => <Badge key={s} variant="secondary">{s}</Badge>)}
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:items-end">
              <span className="text-3xl font-bold text-primary">R$ {pro.pricePerHour}<span className="text-sm font-normal text-muted-foreground">/hora</span></span>
              <div className="flex gap-2">
                <Button size="lg">Contratar</Button>
                <Link to="/chat">
                  <Button variant="outline" size="lg"><MessageCircle className="mr-1 h-4 w-4" /> Chat</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container py-10">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            {/* Video */}
            {pro.videoUrl && (
              <Card className="border-0 shadow-card overflow-hidden">
                <CardContent className="p-0">
                  <div className="aspect-video bg-muted flex items-center justify-center">
                    <div className="text-center">
                      <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full gradient-primary">
                        <Play className="h-7 w-7 text-primary-foreground" />
                      </div>
                      <p className="text-sm text-muted-foreground">Vídeo de Apresentação</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* About */}
            <Card className="border-0 shadow-card">
              <CardContent className="p-6">
                <h2 className="mb-3 text-xl font-bold">Sobre o Profissional</h2>
                <p className="text-muted-foreground leading-relaxed">{pro.about}</p>
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card className="border-0 shadow-card">
              <CardContent className="p-6">
                <h2 className="mb-4 text-xl font-bold flex items-center gap-2"><Award className="h-5 w-5 text-primary" /> Qualificações e Certificações</h2>
                <ul className="space-y-2">
                  {pro.certifications.map((c) => (
                    <li key={c} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                      {c}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card className="border-0 shadow-card">
              <CardContent className="p-6">
                <h2 className="mb-4 text-xl font-bold">Avaliações</h2>
                <div className="space-y-4">
                  {[
                    { name: "João P.", text: "Excelente profissional! Muito dedicado e atencioso.", rating: 5, date: "Jan 2026" },
                    { name: "Maria L.", text: "Plano de treino incrível, já estou vendo resultados.", rating: 5, date: "Dez 2025" },
                    { name: "Carlos R.", text: "Recomendo para quem busca profissionalismo e resultados.", rating: 4, date: "Nov 2025" },
                  ].map((r, i) => (
                    <div key={i} className="border-b pb-4 last:border-0 last:pb-0">
                      <div className="mb-1 flex items-center justify-between">
                        <span className="font-semibold text-sm">{r.name}</span>
                        <span className="text-xs text-muted-foreground">{r.date}</span>
                      </div>
                      <div className="mb-1 flex gap-0.5">
                        {Array.from({ length: r.rating }).map((_, j) => <Star key={j} className="h-3 w-3 fill-accent text-accent" />)}
                      </div>
                      <p className="text-sm text-muted-foreground">{r.text}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {/* Locations */}
            <Card className="border-0 shadow-card">
              <CardContent className="p-6">
                <h3 className="mb-3 font-bold flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> Locais de Atendimento</h3>
                <ul className="space-y-2">
                  {pro.locations.map((l) => (
                    <li key={l} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-3.5 w-3.5 text-primary shrink-0" /> {l}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card className="border-0 shadow-card">
              <CardContent className="p-6">
                <h3 className="mb-3 font-bold">Benefícios</h3>
                <ul className="space-y-2">
                  {pro.benefits.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-3.5 w-3.5 text-primary shrink-0" /> {b}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Schedule */}
            <Card className="border-0 shadow-card">
              <CardContent className="p-6">
                <h3 className="mb-3 font-bold flex items-center gap-2"><Calendar className="h-4 w-4 text-primary" /> Agenda Disponível</h3>
                <div className="space-y-2">
                  {["Seg 10:00 - 18:00", "Ter 10:00 - 18:00", "Qua 10:00 - 18:00", "Qui 10:00 - 18:00", "Sex 10:00 - 16:00"].map((s) => (
                    <div key={s} className="flex items-center justify-between rounded-lg bg-secondary p-2.5 text-sm">
                      <span>{s.split(" ")[0]}</span>
                      <span className="text-muted-foreground">{s.substring(4)}</span>
                    </div>
                  ))}
                </div>
                <Button className="mt-4 w-full" size="lg">Agendar Consulta</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfessionalProfile;