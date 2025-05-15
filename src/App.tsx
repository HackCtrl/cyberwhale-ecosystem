import { useEffect } from "react";
import { I18nextProvider } from 'react-i18next';
import i18next from './lib/i18n';
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
import CategoryChallenges from "./pages/ctf/CategoryChallenges";
import KnowledgeBase from "./pages/knowledge/index";
import ArticlePage from "./pages/knowledge/ArticlePage";
import ReferenceGuide from "./pages/knowledge/reference-guide";
import AIAssistant from "./pages/ai-assistant/index";
import Community from "./pages/community/index";
import Products from "./pages/products/index";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import EmailConfirm from "./pages/auth/EmailConfirm";
import VerifyOTP from "./pages/auth/VerifyOTP";
import Profile from "./pages/profile/index";
import Settings from "./pages/settings/index";
import NotFound from "./pages/NotFound";

// Layout
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    console.log("App component mounted");
    document.body.style.backgroundColor = "#111827";
    document.body.style.color = "#e5e7eb";
    return () => {
      console.log("App component unmounted");
    };
  }, []);

  return (
    <I18nextProvider i18n={i18next}>
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
                  <Route path="/ctf" element={<CTFPlatform />} />
                  <Route path="/ctf/challenge/:id" element={<ChallengePage />} />
                  <Route path="/ctf/category/:category" element={<CategoryChallenges />} />
                  <Route path="/knowledge" element={<KnowledgeBase />} />
                  <Route path="/knowledge/article/:id" element={<ArticlePage />} />
                  <Route path="/knowledge/reference-guide" element={<ReferenceGuide />} />
                  <Route path="/ai-assistant" element={<AIAssistant />} />
                  <Route path="/community" element={<Community />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  <Route path="/auth/confirm" element={<EmailConfirm />} />
                  <Route path="/verify-otp" element={<VerifyOTP />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
              <Footer />
            </TooltipProvider>
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </I18nextProvider>
  );
};

export default App;