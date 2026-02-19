import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { User, Users, Dumbbell, Apple, Calendar, Receipt, MessageCircle, Award, CreditCard, Settings, Menu, X } from "lucide-react";
import { useState } from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
  type: "student" | "professional";
}

const studentMenu = [
  { label: "Meu Perfil", icon: User, path: "/dashboard-aluno" },
  { label: "Meus Profissionais", icon: Users, path: "/dashboard-aluno?tab=profissionais" },
  { label: "Planos de Treino", icon: Dumbbell, path: "/planos-treino-aluno" },
  { label: "Planos Alimentares", icon: Apple, path: "/planos-alimentares-aluno" },
  { label: "Agenda", icon: Calendar, path: "/agenda-aluno" },
  { label: "Recibos", icon: Receipt, path: "/recibos-aluno" },
  { label: "Chat", icon: MessageCircle, path: "/chat-aluno" },
];

const proMenu = [
  { label: "Perfil Profissional", icon: User, path: "/dashboard-profissional" },
  { label: "Certificações", icon: Award, path: "/dashboard-profissional?tab=certificacoes" },
  { label: "Agenda", icon: Calendar, path: "/agenda" },
  { label: "Alunos", icon: Users, path: "/dashboard-profissional?tab=alunos" },
  { label: "Planos de Treino", icon: Dumbbell, path: "/planos-treino" },
  { label: "Planos Alimentares", icon: Apple, path: "/planos-alimentares" },
  { label: "Chat", icon: MessageCircle, path: "/chat" },
  { label: "Recibos", icon: Receipt, path: "/recibos" },
  { label: "Assinatura", icon: CreditCard, path: "/assinaturas" },
];

const DashboardLayout = ({ children, type }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const menu = type === "student" ? studentMenu : proMenu;
  const title = type === "student" ? "Área do Aluno" : "Área do Profissional";

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 border-r border-border bg-card transition-transform duration-300 lg:static lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-16 items-center justify-between border-b border-border px-4">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-md gradient-primary shadow-glow transition-all duration-300 group-hover:scale-110">
              <span className="text-sm font-bold text-primary-foreground">W</span>
            </div>
            <span className="font-heading tracking-widest uppercase text-sm">{title}</span>
          </Link>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <nav className="flex flex-col gap-0.5 p-3">
          {menu.map((item) => {
            const isActive = location.pathname + location.search === item.path || (location.pathname === item.path.split("?")[0] && !item.path.includes("?") && location.search === "");
            return (
              <Link key={item.path} to={item.path} onClick={() => setSidebarOpen(false)}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 text-xs uppercase tracking-wider font-medium rounded-md",
                    isActive
                      ? "bg-primary/15 text-primary border border-primary/20"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-card/80 px-4 backdrop-blur-xl lg:px-6">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full gradient-primary shadow-glow flex items-center justify-center">
              <span className="text-xs font-bold text-primary-foreground">U</span>
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;