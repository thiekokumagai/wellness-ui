import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Star, MapPin, MessageCircle, Calendar as CalendarIcon, CheckCircle, Award,
  Play, Heart, Users, BookOpen, Shield, TrendingUp, ChevronDown,
  Clock, Globe, Dumbbell, X, MessageSquareQuote
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { professionals } from "@/data/mockData";
import { cn } from "@/lib/utils";

const TIMES_BY_DATE: Record<string, string[]> = {
  default: ["08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"],
};

const ALL_REVIEWS = [
  { name: "João P.", text: "Excelente profissional! Muito dedicado e atencioso. Os treinos são desafiadores mas sempre dentro dos meus limites.", rating: 5, date: "Jan 2026", reply: "Obrigada, João! Foi um prazer acompanhar sua evolução. Continue firme no foco! 💪" },
  { name: "Maria L.", text: "Plano de treino incrível, já estou vendo resultados concretos em menos de 2 meses. Super recomendo!", rating: 5, date: "Dez 2025", reply: "Fico muito feliz com seu progresso, Maria! Você se dedicou muito e merece cada resultado." },
  { name: "Carlos R.", text: "Recomendo para quem busca profissionalismo e resultados. Muito comprometido com o progresso dos alunos.", rating: 4, date: "Nov 2025", reply: "Obrigada, Carlos! Seu comprometimento também faz toda a diferença nos resultados." },
  { name: "Beatriz S.", text: "Atendimento excelente, sempre pontual e atenciosa. Os treinos são adaptados perfeitamente ao meu nível.", rating: 5, date: "Out 2025", reply: "Muito obrigada, Beatriz! Adoro trabalhar com sua determinação. Vamos continuar evoluindo juntos!" },
  { name: "Rafael M.", text: "Profissional muito competente. Minha resistência melhorou bastante nas últimas semanas.", rating: 5, date: "Set 2025", reply: "Fico feliz em ver sua evolução, Rafael! O segredo é a constância, continue assim!" },
  { name: "Juliana T.", text: "Ótima comunicação, explica tudo com clareza e paciência. Recomendo demais!", rating: 4, date: "Ago 2025", reply: "Obrigada, Juliana! Comunicação clara é fundamental para um bom treinamento. 😊" },
  { name: "André F.", text: "Superou minhas expectativas. Resultado em 60 dias que achei que levaria 6 meses!", rating: 5, date: "Jul 2025", reply: "André, você se dedicou muito! Eu só tracei o caminho, quem percorreu foi você. Parabéns!" },
  { name: "Patrícia N.", text: "Profissional diferenciada. Além do treino, ensina sobre postura e hábitos saudáveis.", rating: 5, date: "Jun 2025", reply: "Acredito muito numa abordagem holística do bem-estar. Obrigada por confiar no trabalho, Patrícia!" },
  { name: "Lucas B.", text: "Treinos dinâmicos e sempre variados. Nunca tive tédio em nenhuma aula!", rating: 4, date: "Mai 2025", reply: "Treino divertido é treino eficiente! Fico feliz que esteja gostando, Lucas." },
  { name: "Isabela C.", text: "Completamente transformei meu condicionamento físico. Gratidão enorme por todo o suporte!", rating: 5, date: "Abr 2025", reply: "Isabela, você é uma inspiração! Sua evolução me motiva a continuar melhorando como profissional. ❤️" },
  { name: "Fernando A.", text: "Atendimento humanizado e resultado visível. Voltarei com certeza no próximo semestre.", rating: 5, date: "Mar 2025", reply: "Será um prazer ter você de volta, Fernando! Até a próxima etapa! 🙌" },
];

const PREVIEW_REVIEWS = ALL_REVIEWS.slice(0, 3);

function ReviewCard({ r, proName, proPhoto }: { r: typeof ALL_REVIEWS[0]; proName: string; proPhoto: string }) {
  return (
    <div className="border-b border-border pb-6 last:border-0 last:pb-0">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary font-bold text-sm">
            {r.name[0]}
          </div>
          <span className="font-semibold text-sm">{r.name}</span>
        </div>
        <span className="text-xs text-muted-foreground">{r.date}</span>
      </div>
      <div className="mb-2 flex gap-0.5">
        {Array.from({ length: 5 }).map((_, j) => (
          <Star key={j} className={`h-3.5 w-3.5 ${j < r.rating ? "fill-accent text-accent" : "text-border"}`} />
        ))}
      </div>
      <p className="text-sm text-muted-foreground mb-3">{r.text}</p>
      {r.reply && (
        <div className="rounded-xl border border-border bg-secondary/50 p-3.5 ml-2">
          <div className="flex items-center gap-2 mb-2">
            <img src={proPhoto} alt={proName} className="h-6 w-6 rounded-full object-cover" />
            <span className="text-xs font-semibold text-foreground">{proName}</span>
            <MessageSquareQuote className="h-3.5 w-3.5 text-primary ml-auto" />
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">{r.reply}</p>
        </div>
      )}
    </div>
  );
}

const ProfessionalProfile = () => {
  const { id } = useParams();
  const pro = professionals.find((p) => p.id === id) || professionals[0];
  const [isFav, setIsFav] = useState(false);
  const [bioExpanded, setBioExpanded] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [showReviewsModal, setShowReviewsModal] = useState(false);

  const totalStudents = 34;
  const totalSessions = 287;

  const availableTimes = TIMES_BY_DATE.default;

  const isWeekend = (date: Date) => date.getDay() === 0 || date.getDay() === 6;
  const isPast = (date: Date) => date < new Date(new Date().setHours(0, 0, 0, 0));

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container py-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          {/* LEFT COLUMN */}
          <div className="space-y-6">

            {/* Video player */}
            <div className="overflow-hidden rounded-2xl border border-border bg-card">
              {videoPlaying ? (
                <div className="aspect-video">
                  <iframe
                    src={pro.videoUrl || "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"}
                    className="h-full w-full"
                    allow="autoplay; fullscreen"
                    title="Vídeo de apresentação"
                  />
                </div>
              ) : (
                <div
                  className="relative aspect-video cursor-pointer overflow-hidden"
                  onClick={() => setVideoPlaying(true)}
                >
                  <img
                    src={pro.photo}
                    alt={pro.name}
                    className="h-full w-full object-cover"
                    style={{ filter: "brightness(0.55)" }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary shadow-[0_0_40px_hsl(var(--primary)/0.5)] transition-transform hover:scale-110">
                      <Play className="h-8 w-8 translate-x-0.5 text-primary-foreground" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <p className="text-xs text-white/60 uppercase tracking-widest">Vídeo de apresentação</p>
                    <p className="text-lg font-bold text-white">{pro.name}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Profile identity */}
            <div className="flex items-start gap-4">
              <img src={pro.photo} alt={pro.name} className="h-16 w-16 rounded-xl object-cover border-2 border-primary/30" />
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h1 className="font-heading text-3xl">{pro.name}</h1>
                  <Shield className="h-5 w-5 text-primary" aria-label="Verificado" />
                  <Badge variant="default">{pro.profession}</Badge>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {pro.city}</span>
                  {pro.online && <span className="flex items-center gap-1"><Globe className="h-3.5 w-3.5" /> Online</span>}
                  {pro.presencial && <span className="flex items-center gap-1"><Dumbbell className="h-3.5 w-3.5" /> Presencial</span>}
                </div>
              </div>
            </div>

            {/* Stats strip */}
            <div className="grid grid-cols-3 rounded-xl border border-border bg-card overflow-hidden">
              {[
                { value: `${pro.rating} ★`, label: `${pro.reviews} avaliações`, color: "text-accent" },
                { value: totalStudents, label: "alunos ativos", color: "text-primary" },
                { value: totalSessions, label: "sessões realizadas", color: "text-primary" },
              ].map((stat, i) => (
                <div key={i} className={`flex flex-col items-center py-5 ${i < 2 ? "border-r border-border" : ""}`}>
                  <span className={`text-2xl font-bold ${stat.color}`}>{stat.value}</span>
                  <span className="text-xs text-muted-foreground mt-0.5">{stat.label}</span>
                </div>
              ))}
            </div>

            {/* Popular signal */}
            <div className="flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3">
              <TrendingUp className="h-4 w-4 text-primary" />
              <p className="text-sm text-primary font-medium">Popular · 6 novos contatos nas últimas 48 horas</p>
            </div>

            {/* Bio */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="mb-3 font-heading text-xl">Sobre o Profissional</h2>
              <p className={`text-muted-foreground leading-relaxed text-sm ${bioExpanded ? "" : "line-clamp-4"}`}>{pro.about}</p>
              <button onClick={() => setBioExpanded(!bioExpanded)} className="mt-2 flex items-center gap-1 text-sm text-primary hover:underline font-medium">
                {bioExpanded ? "Ver menos" : "Saiba mais"}
                <ChevronDown className={`h-4 w-4 transition-transform ${bioExpanded ? "rotate-180" : ""}`} />
              </button>
            </div>

            {/* Specialties */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="mb-4 font-heading text-xl flex items-center gap-2">
                <Dumbbell className="h-5 w-5 text-primary" /> Especialidades
              </h2>
              <div className="flex flex-wrap gap-2">
                {pro.specialties.map((s) => (
                  <span key={s} className="rounded-full border border-border bg-secondary px-4 py-1.5 text-sm font-medium">{s}</span>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="mb-4 font-heading text-xl flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" /> Qualificações e Certificações
              </h2>
              <ul className="space-y-3">
                {pro.certifications.map((c) => (
                  <li key={c} className="flex items-center gap-3 text-sm">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            {/* Locations */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="mb-4 font-heading text-xl flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" /> Locais de Atendimento
              </h2>
              <ul className="space-y-2">
                {pro.locations.map((l) => (
                  <li key={l} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-primary shrink-0" /> {l}
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="mb-4 font-heading text-xl">Benefícios Inclusos</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {pro.benefits.map((b) => (
                  <div key={b} className="flex items-center gap-3 rounded-lg bg-secondary px-4 py-3 text-sm">
                    <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                    {b}
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews — preview + show all button */}
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="font-heading text-xl">Avaliações dos Alunos</h2>
                <div className="flex items-center gap-1.5">
                  <Star className="h-4 w-4 fill-accent text-accent" />
                  <span className="font-bold">{pro.rating}</span>
                  <span className="text-sm text-muted-foreground">({pro.reviews})</span>
                </div>
              </div>

              <div className="space-y-6">
                {PREVIEW_REVIEWS.map((r, i) => (
                  <ReviewCard key={i} r={r} proName={pro.name} proPhoto={pro.photo} />
                ))}
              </div>

              {/* Show all button */}
              <div className="mt-6 flex justify-center">
                <button
                  onClick={() => setShowReviewsModal(true)}
                  className="flex items-center gap-2 rounded-xl border border-border bg-secondary px-6 py-3 text-sm font-semibold text-foreground transition-all hover:border-primary/50 hover:bg-primary/5 hover:text-primary"
                >
                  <Star className="h-4 w-4 text-accent" />
                  Mostrar {ALL_REVIEWS.length} avaliações totais
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN — Sticky booking sidebar */}
          <div className="space-y-4">
            <div className="sticky top-20 space-y-4">

              {/* Booking card */}
              <div className="rounded-2xl border border-border bg-card p-5">
                {/* Price */}
                <div className="mb-3 flex items-baseline gap-2">
                  <span className="text-4xl font-bold">R$ {pro.pricePerHour}</span>
                  <span className="text-sm text-muted-foreground">/ hora</span>
                </div>

                {/* Mini stats */}
                <div className="mb-5 flex items-center gap-3 text-sm">
                  <span className="flex items-center gap-1 font-semibold">
                    <Star className="h-4 w-4 fill-accent text-accent" />
                    {pro.rating}
                  </span>
                  <span className="text-muted-foreground">{pro.reviews} avaliações</span>
                  <span className="text-muted-foreground">·</span>
                  <span className="text-muted-foreground">{totalSessions} sessões</span>
                </div>

                {/* ─── Calendar Preply-style ─── */}
                <div className="mb-4">
                  <p className="mb-2 flex items-center gap-2 text-sm font-semibold">
                    <CalendarIcon className="h-4 w-4 text-primary" />
                    Selecione uma data
                  </p>
                  <div className="rounded-xl border border-border bg-secondary/40 overflow-hidden">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(d) => { setSelectedDate(d); setSelectedTime(null); }}
                      disabled={(date) => isPast(date) || isWeekend(date)}
                      className={cn("p-3 pointer-events-auto w-full")}
                      classNames={{
                        months: "w-full",
                        month: "w-full",
                        table: "w-full",
                        head_row: "flex w-full",
                        head_cell: "text-muted-foreground rounded-md flex-1 font-normal text-[0.75rem] text-center",
                        row: "flex w-full mt-1",
                        cell: "flex-1 h-8 text-center text-sm p-0 relative focus-within:relative focus-within:z-20",
                        day: cn("h-8 w-full p-0 font-normal rounded-lg text-xs aria-selected:opacity-100 hover:bg-primary/20 hover:text-foreground transition-colors"),
                        day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-lg",
                        day_today: "border border-primary/50 text-primary font-bold",
                        day_outside: "text-muted-foreground opacity-30",
                        day_disabled: "text-muted-foreground opacity-25 cursor-not-allowed",
                      }}
                    />
                  </div>
                </div>

                {/* Time slots — shown after date selected */}
                {selectedDate && (
                  <div className="mb-4">
                    <p className="mb-2 text-sm font-semibold text-foreground">
                      Horários disponíveis
                    </p>
                    <div className="grid grid-cols-3 gap-1.5">
                      {availableTimes.map((t) => (
                        <button
                          key={t}
                          onClick={() => setSelectedTime(t)}
                          className={`rounded-lg border py-2 text-xs font-medium transition-all ${
                            selectedTime === t
                              ? "border-primary bg-primary text-primary-foreground shadow-[0_0_12px_hsl(var(--primary)/0.3)]"
                              : "border-border bg-secondary text-muted-foreground hover:border-primary/50 hover:text-foreground"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {!selectedDate && (
                  <p className="mb-4 text-center text-xs text-muted-foreground">
                    Selecione uma data para ver os horários disponíveis
                  </p>
                )}

                {/* CTA */}
                <Button
                  className="w-full mb-3 font-bold text-base h-12"
                  size="lg"
                  disabled={!selectedDate || !selectedTime}
                >
                  <CalendarIcon className="mr-2 h-5 w-5" />
                  {selectedDate && selectedTime
                    ? `Agendar · ${selectedTime}`
                    : "Agendar sessão"}
                </Button>
                <Link to="/chat">
                  <Button variant="outline" className="w-full h-11">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Enviar mensagem
                  </Button>
                </Link>

                <button
                  onClick={() => setIsFav(!isFav)}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Heart className={`h-4 w-4 ${isFav ? "fill-destructive text-destructive" : ""}`} />
                  {isFav ? "Salvo nos favoritos" : "Salvar nos favoritos"}
                </button>
              </div>

              {/* Response time */}
              <div className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Resposta rápida</p>
                    <p className="text-xs text-muted-foreground">Responde em menos de 1 hora</p>
                  </div>
                </div>
              </div>

              {/* Trust note */}
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                <div className="flex items-start gap-3">
                  <Shield className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Perfil verificado pela Wellness Connect. Certificações confirmadas e avaliações autênticas de alunos reais.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Reviews Modal ─── */}
      <Dialog open={showReviewsModal} onOpenChange={setShowReviewsModal}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-hidden flex flex-col p-0">
          <DialogHeader className="px-6 pt-6 pb-4 border-b border-border shrink-0">
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="font-heading text-2xl">Avaliações dos Alunos</DialogTitle>
                <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                  <Star className="h-4 w-4 fill-accent text-accent" />
                  <span className="font-bold text-foreground">{pro.rating}</span>
                  <span>· {ALL_REVIEWS.length} avaliações</span>
                  <span>· {pro.name}</span>
                </div>
              </div>
            </div>
          </DialogHeader>

          <div className="overflow-y-auto flex-1 px-6 py-5 space-y-6">
            {ALL_REVIEWS.map((r, i) => (
              <ReviewCard key={i} r={r} proName={pro.name} proPhoto={pro.photo} />
            ))}
          </div>

          <div className="px-6 py-4 border-t border-border shrink-0">
            <Button className="w-full" onClick={() => setShowReviewsModal(false)}>
              Fechar
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default ProfessionalProfile;
