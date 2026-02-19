import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Star, Search, SlidersHorizontal, X } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { professionals } from "@/data/mockData";

const Catalog = () => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [modalityFilter, setModalityFilter] = useState<string>("");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return professionals.filter((p) => {
      const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.city.toLowerCase().includes(search.toLowerCase()) || p.specialties.some(s => s.toLowerCase().includes(search.toLowerCase()));
      const matchType = !typeFilter || p.profession === typeFilter;
      const matchModality = !modalityFilter || (modalityFilter === "online" ? p.online : p.presencial);
      return matchSearch && matchType && matchModality;
    });
  }, [search, typeFilter, modalityFilter]);

  const FilterPanel = () => (
    <div className="space-y-6">
      <div>
        <Label className="mb-2 block font-semibold">Tipo de Profissional</Label>
        <div className="flex flex-col gap-2">
          {["", "Personal Trainer", "Nutricionista"].map((t) => (
            <Button key={t} variant={typeFilter === t ? "default" : "outline"} size="sm" className="justify-start" onClick={() => setTypeFilter(t)}>
              {t || "Todos"}
            </Button>
          ))}
        </div>
      </div>
      <div>
        <Label className="mb-2 block font-semibold">Modalidade</Label>
        <div className="flex flex-col gap-2">
          {[{ v: "", l: "Todos" }, { v: "online", l: "Online" }, { v: "presencial", l: "Presencial" }].map((m) => (
            <Button key={m.v} variant={modalityFilter === m.v ? "default" : "outline"} size="sm" className="justify-start" onClick={() => setModalityFilter(m.v)}>
              {m.l}
            </Button>
          ))}
        </div>
      </div>
      {(typeFilter || modalityFilter) && (
        <Button variant="ghost" size="sm" onClick={() => { setTypeFilter(""); setModalityFilter(""); }}>
          <X className="mr-1 h-3 w-3" /> Limpar filtros
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold font-segoe">Encontre seu Profissional</h1>
          <p className="text-muted-foreground">Explore nosso catálogo de profissionais qualificados</p>
        </div>

        <div className="mb-6 flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Buscar por nome, especialidade ou cidade..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>
          <Button variant="outline" className="lg:hidden" onClick={() => setShowFilters(!showFilters)}>
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filters */}
          <aside className="hidden w-56 shrink-0 lg:block">
            <Card className="border-0 shadow-card">
              <CardContent className="p-5"><FilterPanel /></CardContent>
            </Card>
          </aside>

          {/* Mobile filters */}
          {showFilters && (
            <div className="fixed inset-0 z-50 flex lg:hidden">
              <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" onClick={() => setShowFilters(false)} />
              <div className="relative ml-auto w-72 border-l bg-card p-6 overflow-y-auto">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-bold">Filtros</h3>
                  <Button variant="ghost" size="icon" onClick={() => setShowFilters(false)}><X className="h-4 w-4" /></Button>
                </div>
                <FilterPanel />
              </div>
            </div>
          )}

          {/* Results */}
          <div className="flex-1">
            <p className="mb-4 text-sm text-muted-foreground">{filtered.length} profissionais encontrados</p>
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((pro) => (
                <Card key={pro.id} className="group overflow-hidden border-0 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1">
                  <CardContent className="p-0">
                    <div className="relative h-44 overflow-hidden">
                      <img src={pro.photo} alt={pro.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute bottom-3 left-3 flex gap-1.5">
                        {pro.online && <Badge variant="online">Online</Badge>}
                        {pro.presencial && <Badge variant="presencial">Presencial</Badge>}
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="mb-1 flex items-center justify-between">
                        <h3 className="font-bold">{pro.name}</h3>
                        <div className="flex items-center gap-1 text-sm">
                          <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                          <span className="font-semibold">{pro.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{pro.profession} · {pro.city}</p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {pro.specialties.slice(0, 2).map((s) => (
                          <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>
                        ))}
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="font-bold text-primary">R$ {pro.pricePerHour}<span className="text-xs font-normal text-muted-foreground">/h</span></span>
                        <Link to={`/profissional/${pro.id}`}>
                          <Button size="sm">Ver Perfil</Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Catalog;