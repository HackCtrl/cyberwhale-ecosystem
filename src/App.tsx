
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/lib/auth";

// Pages
import HomePage from "./pages/Index";
import CTFPlatform from "./pages/ctf/index";
import ChallengePage from "./pages/ctf/ChallengePage";
import KnowledgeBase from "./pages/knowledge/index";
import ArticlePage from "./pages/knowledge/ArticlePage";
import AIAssistant from "./pages/ai-assistant/index";
import Community from "./pages/community/index";
import Products from "./pages/products/index";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            
            {/* CTF Platform Routes */}
            <Route path="/ctf" element={<CTFPlatform />} />
            <Route path="/ctf/challenge/:id" element={<ChallengePage />} />
            
            {/* Knowledge Base Routes */}
            <Route path="/knowledge" element={<KnowledgeBase />} />
            <Route path="/knowledge/article/:id" element={<ArticlePage />} />
            
            {/* AI Assistant Routes */}
            <Route path="/ai-assistant" element={<AIAssistant />} />
            
            {/* Community Routes */}
            <Route path="/community" element={<Community />} />
            
            {/* Products Routes */}
            <Route path="/products" element={<Products />} />
            
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            
            {/* Not Found Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
