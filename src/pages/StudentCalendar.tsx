import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Plus, Clock, User } from "lucide-react";
import { mockAppointments } from "@/data/mockData";
import { cn } from "@/lib/utils";

const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

const statusVariant: Record<string, "success" | "pending" | "destructive"> = {
  confirmado: "success",
  pendente: "pending",
  cancelado: "destructive",
};

const StudentCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 1, 1));
  const [selectedDay, setSelectedDay] = useState<number | null>(19);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = Array.from({ length: 42 }, (_, i) => {
    const dayNum = i - firstDay + 1;
    if (dayNum < 1 || dayNum > daysInMonth) return null;
    return dayNum;
  });

  const getAppointments = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return mockAppointments.filter((a) => a.date === dateStr);
  };

  const selectedApps = selectedDay ? getAppointments(selectedDay) : [];
  const today = 19;

  return (
    <DashboardLayout type="student">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-4xl text-foreground">AGENDA</h1>
            <p className="text-muted-foreground text-sm mt-1">{monthNames[month]} {year}</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          {/* Calendar */}
          <div className="rounded-lg border border-border bg-card overflow-hidden">
            {/* Month nav */}
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setCurrentDate(new Date(year, month - 1, 1))}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h2 className="font-heading text-xl uppercase tracking-wider text-foreground">{monthNames[month]} {year}</h2>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setCurrentDate(new Date(year, month + 1, 1))}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Day names */}
            <div className="grid grid-cols-7 border-b border-border">
              {daysOfWeek.map((d) => (
                <div key={d} className="py-2 text-center text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  {d}
                </div>
              ))}
            </div>

            {/* Days grid */}
            <div className="grid grid-cols-7">
              {days.map((day, i) => {
                if (day === null) return <div key={i} className="border-b border-r border-border/40 min-h-[70px]" />;
                const apps = getAppointments(day);
                const isToday = day === today && month === 1 && year === 2026;
                const isSelected = day === selectedDay;

                return (
                  <div
                    key={i}
                    onClick={() => setSelectedDay(day)}
                    className={cn(
                      "min-h-[70px] border-b border-r border-border/40 p-1.5 cursor-pointer transition-all duration-200 hover:bg-secondary/50",
                      isSelected && "bg-primary/10 border-primary/30",
                      isToday && !isSelected && "bg-primary/5"
                    )}
                  >
                    <span className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium",
                      isToday ? "gradient-primary text-primary-foreground font-bold" : "text-muted-foreground",
                      isSelected && !isToday && "bg-primary/20 text-primary font-bold"
                    )}>
                      {day}
                    </span>
                    <div className="mt-1 space-y-0.5">
                      {apps.slice(0, 2).map((a) => (
                        <div key={a.id} className={cn(
                          "truncate rounded px-1 py-0.5 text-[9px] font-medium",
                          a.status === "confirmado" ? "bg-primary/20 text-primary" : "bg-accent/20 text-accent"
                        )}>
                          {a.time} {a.title.split(" ")[0]}
                        </div>
                      ))}
                      {apps.length > 2 && (
                        <div className="text-[9px] text-muted-foreground pl-1">+{apps.length - 2}</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sidebar - day detail */}
          <div className="space-y-4">
            {/* Selected day */}
            <div className="rounded-lg border border-border bg-card p-4">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-heading text-xl text-foreground">
                  {selectedDay ? `${selectedDay} DE ${monthNames[month].toUpperCase()}` : "SELECIONE UM DIA"}
                </h3>
                <span className="font-heading text-3xl text-primary/30">{selectedApps.length}</span>
              </div>

              {selectedDay ? (
                selectedApps.length > 0 ? (
                  <div className="space-y-3">
                    {selectedApps.map((a) => (
                      <div key={a.id} className="rounded-lg border border-border bg-secondary/50 p-3">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-semibold text-sm text-foreground">{a.title}</p>
                            <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {a.time}</span>
                              {a.student && <span className="flex items-center gap-1"><User className="h-3 w-3" /> {a.student}</span>}
                            </div>
                          </div>
                          <Badge variant={statusVariant[a.status]} className="shrink-0">{a.status}</Badge>
                        </div>
                        {a.status === "pendente" && (
                          <div className="mt-3 flex gap-2">
                            <Button size="sm" className="h-7 text-[10px] uppercase tracking-wider flex-1 gradient-primary text-primary-foreground">Confirmar</Button>
                            <Button variant="outline" size="sm" className="h-7 text-[10px] uppercase tracking-wider flex-1">Recusar</Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                    <Clock className="h-8 w-8 mb-2 opacity-30" />
                    <p className="text-sm">Nenhum agendamento</p>
                    <Button variant="outline" size="sm" className="mt-3 text-xs uppercase tracking-wider">+ Adicionar</Button>
                  </div>
                )
              ) : (
                <p className="text-sm text-muted-foreground text-center py-8">Clique em um dia no calendário</p>
              )}
            </div>

            {/* Upcoming list */}
            <div className="rounded-lg border border-border bg-card overflow-hidden">
              <div className="border-b border-border p-4">
                <h3 className="font-bold text-sm uppercase tracking-wider text-foreground">Próximos</h3>
              </div>
              <div className="divide-y divide-border">
                {mockAppointments.filter(a => a.student).slice(0, 4).map((a) => (
                  <div key={a.id} className="flex items-center justify-between p-3">
                    <div>
                      <p className="text-xs font-semibold text-foreground">{a.title}</p>
                      <p className="text-[10px] text-muted-foreground">{a.date} · {a.time}</p>
                    </div>
                    <Badge variant={statusVariant[a.status]} className="text-[9px]">{a.status}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentCalendar;
