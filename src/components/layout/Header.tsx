import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Zap } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-md gradient-primary shadow-glow transition-all duration-300 group-hover:scale-110">
            <Zap className="h-5 w-5 text-primary-foreground fill-primary-foreground" />
          </div>
          <span className="text-xl font-heading tracking-widest text-foreground uppercase">Wellness<span className="text-primary">.</span></span>
        </Link>

        <nav className="hidden items-center gap-0 md:flex">
          {[
            { to: "/catalogo", label: "Profissionais" },
            { to: "/quiz", label: "Quiz" },
            { to: "/assinaturas", label: "Planos" },
          ].map(({ to, label }) => (
            <Link key={to} to={to}>
              <Button
                variant="ghost"
                size="sm"
                className="relative text-muted-foreground hover:text-foreground font-medium tracking-wide uppercase text-xs after:absolute after:bottom-1 after:left-1/2 after:h-px after:w-0 after:-translate-x-1/2 after:bg-primary after:transition-all after:duration-300 hover:after:w-4/5"
              >
                {label}
              </Button>
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link to="/dashboard-profissional">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground text-xs uppercase tracking-wider">
              Sou Profissional
            </Button>
          </Link>
          <Link to="/dashboard-aluno">
            <Button variant="outline" size="sm" className="border-border text-xs uppercase tracking-wider">
              Login
            </Button>
          </Link>
          <Link to="/quiz">
            <Button size="sm" className="gradient-primary text-primary-foreground shadow-glow text-xs uppercase tracking-wider font-bold">
              Criar Conta
            </Button>
          </Link>
        </div>

        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-card p-4 md:hidden">
          <nav className="flex flex-col gap-1">
            <Link to="/catalogo" onClick={() => setMobileOpen(false)}>
              <Button variant="ghost" className="w-full justify-start text-xs uppercase tracking-wider text-muted-foreground">Profissionais</Button>
            </Link>
            <Link to="/quiz" onClick={() => setMobileOpen(false)}>
              <Button variant="ghost" className="w-full justify-start text-xs uppercase tracking-wider text-muted-foreground">Quiz</Button>
            </Link>
            <Link to="/assinaturas" onClick={() => setMobileOpen(false)}>
              <Button variant="ghost" className="w-full justify-start text-xs uppercase tracking-wider text-muted-foreground">Planos</Button>
            </Link>
            <hr className="my-2 border-border" />
            <Link to="/dashboard-profissional" onClick={() => setMobileOpen(false)}>
              <Button variant="outline" className="w-full text-xs uppercase tracking-wider">Sou Profissional</Button>
            </Link>
            <Link to="/dashboard-aluno" onClick={() => setMobileOpen(false)}>
              <Button variant="ghost" className="w-full text-xs uppercase tracking-wider">Login</Button>
            </Link>
            <Link to="/quiz" onClick={() => setMobileOpen(false)}>
              <Button className="w-full gradient-primary text-xs uppercase tracking-wider font-bold">Criar Conta</Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
