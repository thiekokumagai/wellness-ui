import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Receipt, Download, Search, TrendingUp, DollarSign, Calendar, Filter } from "lucide-react";

interface ReceiptItem {
  id: string;
  student: string;
  description: string;
  amount: number;
  date: string;
  status: "pago" | "pendente" | "cancelado";
  type: "mensalidade" | "avulso" | "plano";
}

const mockReceipts: ReceiptItem[] = [
  { id: "REC-001", student: "João Pedro", description: "Mensalidade Fevereiro 2026", amount: 480, date: "01/02/2026", status: "pago", type: "mensalidade" },
  { id: "REC-002", student: "Maria Clara", description: "Plano Hipertrofia 30 dias", amount: 360, date: "05/02/2026", status: "pago", type: "plano" },
  { id: "REC-003", student: "Lucas Santos", description: "Sessão Avulsa", amount: 120, date: "10/02/2026", status: "pendente", type: "avulso" },
  { id: "REC-004", student: "Beatriz Lima", description: "Mensalidade Fevereiro 2026", amount: 480, date: "01/02/2026", status: "pago", type: "mensalidade" },
  { id: "REC-005", student: "João Pedro", description: "Sessão Avulsa — Avaliação", amount: 120, date: "14/02/2026", status: "pendente", type: "avulso" },
  { id: "REC-006", student: "Maria Clara", description: "Mensalidade Janeiro 2026", amount: 480, date: "01/01/2026", status: "pago", type: "mensalidade" },
  { id: "REC-007", student: "Lucas Santos", description: "Plano Funcional 30 dias", amount: 320, date: "08/01/2026", status: "cancelado", type: "plano" },
];

const statusVariant: Record<string, "success" | "pending" | "destructive"> = {
  pago: "success",
  pendente: "pending",
  cancelado: "destructive",
};

const statusLabel: Record<string, string> = {
  pago: "Pago",
  pendente: "Pendente",
  cancelado: "Cancelado",
};

const Receipts = () => {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"todos" | "pago" | "pendente" | "cancelado">("todos");

  const filtered = mockReceipts.filter((r) => {
    const matchSearch = r.student.toLowerCase().includes(search.toLowerCase()) || r.description.toLowerCase().includes(search.toLowerCase()) || r.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "todos" || r.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const totalPago = mockReceipts.filter((r) => r.status === "pago").reduce((sum, r) => sum + r.amount, 0);
  const totalPendente = mockReceipts.filter((r) => r.status === "pendente").reduce((sum, r) => sum + r.amount, 0);
  const totalMes = mockReceipts.filter((r) => r.date.includes("02/2026") && r.status === "pago").reduce((sum, r) => sum + r.amount, 0);

  return (
    <DashboardLayout type="professional">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="font-heading text-4xl text-foreground">RECIBOS</h1>
          <p className="text-muted-foreground text-sm mt-1">Gerencie seus pagamentos e recebimentos</p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { label: "Total Recebido", value: `R$ ${totalPago.toLocaleString("pt-BR")}`, icon: TrendingUp, color: "text-primary", bg: "bg-primary/10", glowColor: "shadow-glow" },
            { label: "Recebido em Fev/26", value: `R$ ${totalMes.toLocaleString("pt-BR")}`, icon: DollarSign, color: "text-accent", bg: "bg-accent/10" },
            { label: "A Receber", value: `R$ ${totalPendente.toLocaleString("pt-BR")}`, icon: Calendar, color: "text-muted-foreground", bg: "bg-secondary" },
          ].map((s) => (
            <div key={s.label} className={`rounded-lg border border-border bg-card p-5 ${s.glowColor ?? ""}`}>
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">{s.label}</p>
                <div className={`flex h-8 w-8 items-center justify-center rounded-md ${s.bg}`}>
                  <s.icon className={`h-4 w-4 ${s.color}`} />
                </div>
              </div>
              <p className={`font-heading text-3xl ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar recibo..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 w-full rounded-md border border-input bg-background pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="flex gap-2">
            {(["todos", "pago", "pendente", "cancelado"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`rounded-md px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-all ${
                  filterStatus === s
                    ? "gradient-primary text-primary-foreground shadow-glow"
                    : "border border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="rounded-lg border border-border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary">
                  <th className="p-4 text-left text-[10px] font-bold uppercase tracking-widest text-muted-foreground">ID</th>
                  <th className="p-4 text-left text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Aluno</th>
                  <th className="p-4 text-left text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Descrição</th>
                  <th className="p-4 text-left text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Tipo</th>
                  <th className="p-4 text-left text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Data</th>
                  <th className="p-4 text-right text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Valor</th>
                  <th className="p-4 text-center text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Status</th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id} className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors">
                    <td className="p-4 font-mono text-xs text-muted-foreground">{r.id}</td>
                    <td className="p-4 font-semibold text-foreground">{r.student}</td>
                    <td className="p-4 text-muted-foreground">{r.description}</td>
                    <td className="p-4">
                      <span className="rounded-full border border-border px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                        {r.type}
                      </span>
                    </td>
                    <td className="p-4 text-muted-foreground">{r.date}</td>
                    <td className="p-4 text-right font-heading text-xl text-foreground">R$ {r.amount}</td>
                    <td className="p-4 text-center">
                      <Badge variant={statusVariant[r.status]}>{statusLabel[r.status]}</Badge>
                    </td>
                    <td className="p-4">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                        <Download className="h-3.5 w-3.5" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
              <Receipt className="h-8 w-8 mb-3 opacity-40" />
              <p className="text-sm">Nenhum recibo encontrado</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Receipts;
