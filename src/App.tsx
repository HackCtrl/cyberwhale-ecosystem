
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/lib/auth";
import './App.css';

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
import Profile from "./pages/profile/index";
import Settings from "./pages/settings/index";
import NotFound from "./pages/NotFound";

// Layout
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

const queryClient = new QueryClient();

const App = () => {
  // Добавляем эффект для отладки загрузки приложения
  useEffect(() => {
    console.log("App component mounted");
    
    // Устанавливаем базовые стили для body
    document.body.style.backgroundColor = "#111827";
    document.body.style.color = "#e5e7eb";
    
    return () => {
      console.log("App component unmounted");
    };
  }, []);

  return (
    <div className="app-container">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <Navbar />
              <div className="content-wrapper">
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
                  
                  {/* User Routes */}
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/settings" element={<Settings />} />
                  
                  {/* Not Found Route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
              <Footer />
            </TooltipProvider>
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
};

export default App;
