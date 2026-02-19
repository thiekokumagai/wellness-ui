import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Catalog from "./pages/Catalog";
import ProfessionalProfile from "./pages/ProfessionalProfile";
import StudentDashboard from "./pages/StudentDashboard";
import ProfessionalDashboard from "./pages/ProfessionalDashboard";
import Chat from "./pages/Chat";
import Agenda from "./pages/Agenda";
import Quiz from "./pages/Quiz";
import Subscriptions from "./pages/Subscriptions";
import TrainingPlans from "./pages/TrainingPlans";
import MealPlans from "./pages/MealPlans";
import Receipts from "./pages/Receipts";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/catalogo" element={<Catalog />} />
          <Route path="/profissional/:id" element={<ProfessionalProfile />} />
          <Route path="/dashboard-aluno" element={<StudentDashboard />} />
          <Route path="/dashboard-profissional" element={<ProfessionalDashboard />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/assinaturas" element={<Subscriptions />} />
          <Route path="/planos-treino" element={<TrainingPlans />} />
          <Route path="/planos-alimentares" element={<MealPlans />} />
          <Route path="/recibos" element={<Receipts />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;