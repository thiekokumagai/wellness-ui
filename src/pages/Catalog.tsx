import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Star, Search, SlidersHorizontal, X, Heart, Users, BookOpen,
  Video, MessageCircle, ChevronDown, TrendingUp, Shield
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { professionals } from "@/data/mockData";

const PRICE_RANGES = [
  { label: "Até R$ 100", min: 0, max: 100 },
  { label: "R$ 100 – 150", min: 100, max: 150 },
  { label: "R$ 150 – 200", min: 150, max: 200 },
  { label: "R$ 200+", min: 200, max: Infinity },
];

const Catalog = () => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [modalityFilter, setModalityFilter] = useState<string>("");
  const [priceFilter, setPriceFilter] = useState<string>("");
  const [sortBy, setSortBy] = useState<"rating" | "price_asc" | "price_desc">("rating");
  const [expandedBio, setExpandedBio] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const selectedPriceRange = PRICE_RANGES.find((r) => r.label === priceFilter);

  const filtered = useMemo(() => {
    let list = professionals.filter((p) => {
      const matchSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.city.toLowerCase().includes(search.toLowerCase()) ||
        p.specialties.some((s) => s.toLowerCase().includes(search.toLowerCase()));
      const matchType = !typeFilter || p.profession === typeFilter;
      const matchModality =
        !modalityFilter ||
        (modalityFilter === "online" ? p.online : p.presencial);
      const matchPrice =
        !selectedPriceRange ||
        (p.pricePerHour >= selectedPriceRange.min &&
          p.pricePerHour < selectedPriceRange.max);
      return matchSearch && matchType && matchModality && matchPrice;
    });

    if (sortBy === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    if (sortBy === "price_asc") list = [...list].sort((a, b) => a.pricePerHour - b.pricePerHour);
    if (sortBy === "price_desc") list = [...list].sort((a, b) => b.pricePerHour - a.pricePerHour);

    return list;
  }, [search, typeFilter, modalityFilter, selectedPriceRange, sortBy]);

  const toggleFav = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const clearFilters = () => {
    setTypeFilter("");
    setModalityFilter("");
    setPriceFilter("");
  };

  const hasFilters = typeFilter || modalityFilter || priceFilter;

  const FilterPanel = () => (
    <div className="space-y-7">
      {/* Tipo */}
      <div>
        <Label className="mb-3 block text-xs font-bold uppercase tracking-widest text-muted-foreground">
          Tipo de Profissional
        </Label>
        <div className="flex flex-col gap-1.5">
          {["", "Personal Trainer", "Nutricionista"].map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                typeFilter === t
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground/70 hover:bg-secondary hover:text-foreground"
              }`}
            >
              {t || "Todos"}
            </button>
          ))}
        </div>
      </div>

      {/* Modalidade */}
      <div>
        <Label className="mb-3 block text-xs font-bold uppercase tracking-widest text-muted-foreground">
          Modalidade
        </Label>
        <div className="flex flex-col gap-1.5">
          {[
            { v: "", l: "Todos" },
            { v: "online", l: "Online" },
            { v: "presencial", l: "Presencial" },
          ].map((m) => (
            <button
              key={m.v}
              onClick={() => setModalityFilter(m.v)}
              className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                modalityFilter === m.v
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground/70 hover:bg-secondary hover:text-foreground"
              }`}
            >
              {m.l}
            </button>
          ))}
        </div>
      </div>

      {/* Preço */}
      <div>
        <Label className="mb-3 block text-xs font-bold uppercase tracking-widest text-muted-foreground">
          Preço por hora
        </Label>
        <div className="flex flex-col gap-1.5">
          <button
            onClick={() => setPriceFilter("")}
            className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
              priceFilter === ""
                ? "bg-primary text-primary-foreground"
                : "text-foreground/70 hover:bg-secondary hover:text-foreground"
            }`}
          >
            Qualquer preço
          </button>
          {PRICE_RANGES.map((r) => (
            <button
              key={r.label}
              onClick={() => setPriceFilter(r.label)}
              className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                priceFilter === r.label
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground/70 hover:bg-secondary hover:text-foreground"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {hasFilters && (
        <button
          onClick={clearFilters}
          className="flex items-center gap-1.5 text-sm text-primary hover:underline"
        >
          <X className="h-3.5 w-3.5" /> Limpar filtros
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Top bar */}
      <div className="border-b border-border bg-card/60 backdrop-blur-sm">
        <div className="container py-6">
          <h1 className="mb-1 font-heading text-4xl">
            Profissionais de Wellness
          </h1>
          <p className="text-muted-foreground">
            {filtered.length} profissionais disponíveis
          </p>

          {/* Search + Sort row */}
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome, especialidade ou cidade..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 h-11 bg-secondary border-border"
              />
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2 rounded-lg border border-border bg-secondary px-3 h-11">
              <span className="text-sm text-muted-foreground whitespace-nowrap">Ordenar:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-sm font-medium outline-none cursor-pointer text-foreground"
              >
                <option value="rating" className=" text-black">Melhores avaliados</option>
                <option value="price_asc" className=" text-black">Menor preço</option>
                <option value="price_desc" className=" text-black">Maior preço</option>
              </select>
            </div>

            <Button
              variant="outline"
              className="lg:hidden h-11"
              onClick={() => setShowFilters(true)}
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" /> Filtros
            </Button>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="flex gap-8">
          {/* Desktop Filters sidebar */}
          <aside className="hidden w-60 shrink-0 lg:block">
            <div className="sticky top-4 rounded-xl border border-border bg-card p-5">
              <FilterPanel />
            </div>
          </aside>

          {/* Mobile filters overlay */}
          {showFilters && (
            <div className="fixed inset-0 z-50 flex lg:hidden">
              <div
                className="absolute inset-0 bg-background/80 backdrop-blur-sm"
                onClick={() => setShowFilters(false)}
              />
              <div className="relative ml-auto w-72 border-l border-border bg-card p-6 overflow-y-auto">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="font-bold text-lg">Filtros</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowFilters(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <FilterPanel />
              </div>
            </div>
          )}

          {/* Results list */}
          <div className="flex-1 space-y-4">
            {filtered.length === 0 && (
              <div className="rounded-xl border border-border bg-card p-12 text-center">
                <p className="text-muted-foreground">
                  Nenhum profissional encontrado com esses filtros.
                </p>
              </div>
            )}

            {filtered.map((pro, idx) => {
              const isBioExpanded = expandedBio === pro.id;
              const isFav = favorites.has(pro.id);
              const totalStudents = 12 + idx * 7;
              const totalSessions = 48 + idx * 23;

              return (
                <div
                  key={pro.id}
                  className="group relative flex gap-0 rounded-2xl border border-border bg-card overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_30px_hsl(var(--primary)/0.08)]"
                >
                  {/* Popular tag */}
                  {idx === 1 && (
                    <div className="absolute top-0 left-0 right-0 flex items-center gap-2 border-b border-border/50 bg-primary/8 px-5 py-2 z-10">
                      <TrendingUp className="h-3.5 w-3.5 text-primary" />
                      <span className="text-xs font-semibold text-primary">
                        Popular · {4 + idx} agendamentos esta semana
                      </span>
                    </div>
                  )}

                  <div className={`flex flex-1 gap-5 p-5 ${idx === 1 ? "pt-10" : ""}`}>
                    {/* Photo */}
                    <div className="shrink-0">
                      <div className="relative h-28 w-28 overflow-hidden rounded-xl">
                        <img
                          src={pro.photo}
                          alt={pro.name}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {pro.videoUrl && (
                          <div className="absolute bottom-1.5 right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-primary shadow-lg">
                            <Video className="h-3 w-3 text-primary-foreground" />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="mb-1 flex flex-wrap items-center gap-2">
                        <h3 className="font-bold text-lg leading-tight">{pro.name}</h3>
                        <Shield className="h-4 w-4 text-primary shrink-0" aria-label="Verificado" />
                        <Badge variant="secondary" className="text-xs">
                          {pro.profession}
                        </Badge>
                      </div>

                      {/* Stats row */}
                      <div className="mb-2 flex flex-wrap items-center gap-4 text-sm">
                        <span className="flex items-center gap-1 font-semibold">
                          <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                          {pro.rating}
                          <span className="font-normal text-muted-foreground">
                            ({pro.reviews} avaliações)
                          </span>
                        </span>
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Users className="h-3.5 w-3.5" />
                          {totalStudents} alunos
                        </span>
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <BookOpen className="h-3.5 w-3.5" />
                          {totalSessions} sessões
                        </span>
                      </div>

                      {/* City + modalities */}
                      <div className="mb-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                        <span>{pro.city}</span>
                        <span>·</span>
                        {pro.online && <Badge variant="online">Online</Badge>}
                        {pro.presencial && (
                          <Badge variant="presencial">Presencial</Badge>
                        )}
                      </div>

                      {/* Specialties */}
                      <div className="mb-3 flex flex-wrap gap-1.5">
                        {pro.specialties.map((s) => (
                          <span
                            key={s}
                            className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground"
                          >
                            {s}
                          </span>
                        ))}
                      </div>

                      {/* Bio */}
                      <div className="text-sm text-muted-foreground">
                        <p className={isBioExpanded ? "" : "line-clamp-2"}>
                          {pro.about}
                        </p>
                        <button
                          onClick={() =>
                            setExpandedBio(isBioExpanded ? null : pro.id)
                          }
                          className="mt-1 flex items-center gap-1 text-primary hover:underline text-xs font-medium"
                        >
                          {isBioExpanded ? "Ver menos" : "Saiba mais"}
                          <ChevronDown
                            className={`h-3.5 w-3.5 transition-transform ${isBioExpanded ? "rotate-180" : ""}`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right: price + actions */}
                  <div className="flex shrink-0 flex-col items-end justify-between border-l border-border p-5 min-w-[160px]">
                    <button
                      onClick={() => toggleFav(pro.id)}
                      className="rounded-full p-1.5 text-muted-foreground transition-colors hover:text-destructive"
                    >
                      <Heart
                        className={`h-5 w-5 ${isFav ? "fill-destructive text-destructive" : ""}`}
                      />
                    </button>

                    <div className="text-right">
                      <div className="text-2xl font-bold text-foreground">
                        R$ {pro.pricePerHour}
                      </div>
                      <div className="text-xs text-muted-foreground">por hora</div>

                      <div className="mt-4 flex flex-col gap-2">
                        <Link to={`/profissional/${pro.id}`}>
                          <Button className="w-full text-sm font-semibold" size="sm">
                            Agendar sessão
                          </Button>
                        </Link>
                        <Link to="/chat">
                          <Button
                            variant="outline"
                            className="w-full text-sm"
                            size="sm"
                          >
                            <MessageCircle className="mr-1.5 h-3.5 w-3.5" />
                            Mensagem
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Catalog;
