
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import Navigation from "./components/Navigation";
import Elite12Questions from "./pages/Elite12Questions";
import CheatSheet from "./pages/CheatSheet";
import PrepChecklist from "./pages/PrepChecklist";
import Glossary from "./pages/Glossary";
import QuestionMaker from "./pages/QuestionMaker";
import MyNotes from "./pages/MyNotes";
import ContractorComparison from "./pages/ContractorComparison";
import ProjectTracker from "./pages/ProjectTracker";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Elite12Questions />} />
            <Route path="/elite-12" element={<Elite12Questions />} />
            <Route path="/cheat-sheet" element={<CheatSheet />} />
            <Route path="/prep-checklist" element={<PrepChecklist />} />
            <Route path="/glossary" element={<Glossary />} />
            <Route path="/question-maker" element={<QuestionMaker />} />
            <Route path="/my-notes" element={<MyNotes />} />
            <Route path="/contractor-comparison" element={<ContractorComparison />} />
            <Route path="/project-tracker" element={<ProjectTracker />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
