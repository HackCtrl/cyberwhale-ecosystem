
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { User } from '@/types';
import { supabase } from '@/lib/supabase';
import { toast } from '@/components/ui/use-toast';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
        await handleUserLogin(data.session.user);
      } else {
        setIsLoading(false);
      }
    };
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event);
        
        if (event === 'SIGNED_IN' && session) {
          await handleUserLogin(session.user);
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
  
  // Convert Supabase user to our User type
  const handleUserLogin = async (supabaseUser: SupabaseUser) => {
    try {
      // First check if profile exists
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', supabaseUser.id)
        .single();
      
      if (profileError && profileError.code !== 'PGRST116') {
        console.error('Error fetching profile:', profileError);
        throw profileError;
      }
      
      let userProfile = profile;
      
      // If profile doesn't exist, create one
      if (!profile) {
        const newProfile = {
          id: supabaseUser.id,
          username: supabaseUser.email?.split('@')[0] || 'user',
          avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${supabaseUser.email}`,
          level: 1,
          points: 0,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        
        const { data: createdProfile, error: createError } = await supabase
          .from('profiles')
          .insert(newProfile)
          .select()
          .single();
        
        if (createError) {
          console.error('Error creating profile:', createError);
          throw createError;
        }
        
        userProfile = createdProfile;
      }
      
      // Map to our User type
      const mappedUser: User = {
        id: supabaseUser.id,
        username: userProfile.username,
        email: supabaseUser.email || '',
        avatar: userProfile.avatar_url || undefined,
        role: 'user',
        points: userProfile.points,
        level: userProfile.level,
        createdAt: new Date(userProfile.created_at)
      };
      
      setUser(mappedUser);
    } catch (err) {
      console.error('Error in handleUserLogin:', err);
      setError('Ошибка при получении профиля пользователя');
    } finally {
      setIsLoading(false);
    }
  };

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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
