import { Link } from "react-router-dom";
import { Zap } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border bg-card">
    <div className="container py-16">
      <div className="grid gap-12 md:grid-cols-4">
        <div className="md:col-span-1">
          <Link to="/" className="flex items-center gap-2 mb-4 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-md gradient-primary shadow-glow transition-all duration-300 group-hover:scale-110">
              <Zap className="h-5 w-5 text-primary-foreground fill-primary-foreground" />
            </div>
            <span className="text-xl font-heading tracking-widest uppercase">Wellness<span className="text-primary">.</span></span>
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Conectando você aos melhores profissionais de wellness do Brasil.
          </p>
          <div className="mt-6 flex gap-3">
            {["IG", "TW", "LI"].map((s) => (
              <div key={s} className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-xs font-bold text-muted-foreground hover:border-primary hover:text-primary transition-all cursor-pointer">
                {s}
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-foreground">Plataforma</h4>
          <div className="flex flex-col gap-2.5 text-sm text-muted-foreground">
            <Link to="/catalogo" className="hover:text-primary transition-colors">Encontrar Profissionais</Link>
            <Link to="/quiz" className="hover:text-primary transition-colors">Quiz de Onboarding</Link>
            <Link to="/assinaturas" className="hover:text-primary transition-colors">Planos e Preços</Link>
          </div>
        </div>
        <div>
          <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-foreground">Profissionais</h4>
          <div className="flex flex-col gap-2.5 text-sm text-muted-foreground">
            <Link to="/dashboard-profissional" className="hover:text-primary transition-colors">Área do Profissional</Link>
            <Link to="/assinaturas" className="hover:text-primary transition-colors">Assinar Plataforma</Link>
          </div>
        </div>
        <div>
          <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-foreground">Suporte</h4>
          <div className="flex flex-col gap-2.5 text-sm text-muted-foreground">
            <span className="hover:text-primary transition-colors cursor-pointer">contato@wellness.com</span>
            <span className="hover:text-primary transition-colors cursor-pointer">Central de Ajuda</span>
            <span className="hover:text-primary transition-colors cursor-pointer">Termos de Uso</span>
            <span className="hover:text-primary transition-colors cursor-pointer">Privacidade</span>
          </div>
        </div>
      </div>
      <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground md:flex-row">
        <span>© 2026 Wellness Connect. Todos os direitos reservados.</span>
        <span className="uppercase tracking-widest">Feito com 💚 no Brasil</span>
      </div>
    </div>
  </footer>
);

export default Footer;
