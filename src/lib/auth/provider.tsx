import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Session, User as SupabaseUser } from '@supabase/supabase-js';
import { User } from '@/types';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { AuthContext } from './context';
import { handleUserLogin } from './utils';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log("Auth provider mounted");
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log('Auth state changed:', event);
        setSession(currentSession);
        
        if (event === 'SIGNED_IN' && currentSession) {
          setIsLoading(true);
          const userProfile = await handleUserLogin(currentSession.user);
          setUser(userProfile);
          setIsLoading(false);
          
          const returnUrl = new URLSearchParams(location.search).get('returnUrl');
          const redirectTo = returnUrl || '/';
          if (location.pathname.includes('/login') || location.pathname.includes('/register')) {
            navigate(redirectTo);
          }
          
          toast({
            title: "Успешный вход",
            description: "Добро пожаловать в CyberWhale!",
          });
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setSession(null);
        } else if (event === 'PASSWORD_RECOVERY') {
          navigate('/reset-password');
        } else if (event === 'USER_UPDATED') {
          if (currentSession) {
            setIsLoading(true);
            const userProfile = await handleUserLogin(currentSession.user);
            setUser(userProfile);
            setIsLoading(false);
          }
        }
      }
    );
    
    supabase.auth.getSession().then(async ({ data: { session: currentSession } }) => {
      setSession(currentSession);
      
      if (currentSession) {
        const userProfile = await handleUserLogin(currentSession.user);
        setUser(userProfile);
      }
      
      setIsLoading(false);
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, location]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      return data;
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
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username
          },
          emailRedirectTo: `${window.location.origin}/auth/confirm`
        }
      });
      
      if (error) throw error;
      
      toast({
        title: "Регистрация успешна",
        description: "На ваш email отправлено письмо для подтверждения.",
      });
      
      return data;
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
      setSession(null);
      
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
      
      return true;
    } catch (err: any) {
      setError(err.message || 'Ошибка при сбросе пароля');
      return Promise.reject(err);
    } finally {
      setIsLoading(false);
    }
  };

  const updatePassword = async (password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase.auth.updateUser({
        password
      });
      
      if (error) throw error;
      
      toast({
        title: "Пароль обновлен",
        description: "Ваш пароль был успешно изменен.",
      });
      
      navigate('/login');
      return true;
    } catch (err: any) {
      setError(err.message || 'Ошибка при обновлении пароля');
      return Promise.reject(err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<User>) => {
    setIsLoading(true);
    setError(null);
    
    try {
      if (!user) throw new Error('Пользователь не авторизован');
      
      if (updates.username) {
        const { error: authError } = await supabase.auth.updateUser({
          data: { username: updates.username }
        });
        
        if (authError) throw authError;
      }
      
      const profileUpdates: any = {};
      
      if (updates.username) profileUpdates.username = updates.username;
      if (updates.avatar) profileUpdates.avatar_url = updates.avatar;
      
      if (Object.keys(profileUpdates).length > 0) {
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            ...profileUpdates,
            updated_at: new Date().toISOString()
          })
          .eq('id', user.id);
        
        if (profileError) throw profileError;
      }
      
      setUser({
        ...user,
        ...updates
      });
      
      toast({
        title: "Профиль обновлен",
        description: "Ваш профиль успешно обновлен.",
      });
      
      return true;
    } catch (err: any) {
      setError(err.message || 'Ошибка при обновлении профиля');
      return Promise.reject(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      isLoading,
      error,
      login,
      register,
      logout,
      resetPassword,
      updatePassword,
      updateProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
