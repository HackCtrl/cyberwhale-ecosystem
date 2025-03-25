
import { Session, User as SupabaseUser } from '@supabase/supabase-js';
import { User } from '@/types';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { handleUserLogin } from './utils';

export const login = async (email: string, password: string, setIsLoading: (loading: boolean) => void, setError: (error: string | null) => void) => {
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

export const register = async (
  username: string, 
  email: string, 
  password: string, 
  setIsLoading: (loading: boolean) => void, 
  setError: (error: string | null) => void,
  navigate: (path: string, options?: any) => void
) => {
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
        emailRedirectTo: `${window.location.origin}/auth/confirm`,
      }
    });
    
    if (error) throw error;
    
    if (!data.session) {
      // If email confirmation is required
      toast({
        title: "Требуется подтверждение",
        description: "На вашу почту отправлен код подтверждения.",
      });
      navigate('/verify-otp', { state: { email } });
    }
    
    return data;
  } catch (err: any) {
    setError(err.message || 'Ошибка при регистрации');
    return Promise.reject(err);
  } finally {
    setIsLoading(false);
  }
};

export const verifyOtp = async (
  email: string, 
  token: string, 
  setIsLoading: (loading: boolean) => void, 
  setError: (error: string | null) => void
) => {
  setIsLoading(true);
  setError(null);
  
  try {
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'signup'
    });
    
    if (error) throw error;
    
    toast({
      title: "Аккаунт подтвержден",
      description: "Ваш аккаунт успешно подтвержден.",
    });
    
    return data;
  } catch (err: any) {
    setError(err.message || 'Ошибка при подтверждении');
    return Promise.reject(err);
  } finally {
    setIsLoading(false);
  }
};

export const logout = async (
  setUser: (user: User | null) => void,
  setSession: (session: Session | null) => void,
  setIsLoading: (loading: boolean) => void,
  setError: (error: string | null) => void,
  navigate: (path: string) => void
) => {
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

export const resetPassword = async (
  email: string, 
  setIsLoading: (loading: boolean) => void, 
  setError: (error: string | null) => void
) => {
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

export const updatePassword = async (
  password: string, 
  setIsLoading: (loading: boolean) => void, 
  setError: (error: string | null) => void,
  navigate: (path: string) => void
) => {
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

export const updateProfile = async (
  user: User,
  updates: Partial<User>,
  setUser: (user: User) => void,
  setIsLoading: (loading: boolean) => void,
  setError: (error: string | null) => void
) => {
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
