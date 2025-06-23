
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Elite12Questions from "./pages/Elite12Questions";
import CheatSheet from "./pages/CheatSheet";
import PrepChecklist from "./pages/PrepChecklist";
import Glossary from "./pages/Glossary";
import QuestionMaker from "./pages/QuestionMaker";
import MyNotes from "./pages/MyNotes";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Elite12Questions />} />
          <Route path="/elite-12" element={<Elite12Questions />} />
          <Route path="/cheat-sheet" element={<CheatSheet />} />
          <Route path="/prep-checklist" element={<PrepChecklist />} />
          <Route path="/glossary" element={<Glossary />} />
          <Route path="/question-maker" element={<QuestionMaker />} />
          <Route path="/my-notes" element={<MyNotes />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
