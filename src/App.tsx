
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
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import EnhancedAuth from "./pages/EnhancedAuth";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/elite-12" element={
              <ProtectedRoute>
                <Elite12Questions />
              </ProtectedRoute>
            } />
            <Route path="/cheat-sheet" element={
              <ProtectedRoute>
                <CheatSheet />
              </ProtectedRoute>
            } />
            <Route path="/prep-checklist" element={
              <ProtectedRoute>
                <PrepChecklist />
              </ProtectedRoute>
            } />
            <Route path="/glossary" element={
              <ProtectedRoute>
                <Glossary />
              </ProtectedRoute>
            } />
            <Route path="/question-maker" element={
              <ProtectedRoute>
                <QuestionMaker />
              </ProtectedRoute>
            } />
            <Route path="/my-notes" element={
              <ProtectedRoute>
                <MyNotes />
              </ProtectedRoute>
            } />
            <Route path="/contractor-comparison" element={
              <ProtectedRoute>
                <ContractorComparison />
              </ProtectedRoute>
            } />
            <Route path="/project-tracker" element={
              <ProtectedRoute>
                <ProjectTracker />
              </ProtectedRoute>
            } />
            <Route path="/auth" element={<EnhancedAuth />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
