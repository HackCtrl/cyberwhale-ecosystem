
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { User } from '@/types';
import { supabase } from '@/lib/supabase';
import { toast } from '@/components/ui/use-toast';
import { AuthContext } from './context';
import { handleUserLogin } from './utils';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Check for user session on initial load
  useEffect(() => {
    console.log("Auth provider mounted");
    
    // Get current session
    const checkSession = async () => {
      setIsLoading(true);
      
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Error checking session:', error);
        setIsLoading(false);
        return;
      }
      
      if (data.session) {
        const userProfile = await handleUserLogin(data.session.user);
        if (userProfile) {
          setUser(userProfile);
        }
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    };
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event);
        
        if (event === 'SIGNED_IN' && session) {
          const userProfile = await handleUserLogin(session.user);
          if (userProfile) {
            setUser(userProfile);
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        }
      }
    );
    
    checkSession();
    
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      toast({
        title: "Успешный вход",
        description: "Добро пожаловать в CyberWhale!",
      });
    } catch (err: any) {
      setError(err.message || 'Ошибка при входе');
      return Promise.reject(err);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (username: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Register user with Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username
          }
        }
      });
      
      if (error) throw error;
      
      toast({
        title: "Регистрация успешна",
        description: "На ваш email отправлено письмо для подтверждения.",
      });
    } catch (err: any) {
      setError(err.message || 'Ошибка при регистрации');
      return Promise.reject(err);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      setUser(null);
      toast({
        title: "Выход выполнен",
        description: "Вы успешно вышли из системы.",
      });
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Ошибка при выходе');
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) throw error;
      
      toast({
        title: "Сброс пароля",
        description: "На ваш email отправлена инструкция по сбросу пароля.",
      });
    } catch (err: any) {
      setError(err.message || 'Ошибка при сбросе пароля');
      return Promise.reject(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      error,
      login,
      register,
      logout,
      resetPassword,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
