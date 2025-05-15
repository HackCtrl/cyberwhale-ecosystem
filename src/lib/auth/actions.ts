
import { NavigateFunction } from 'react-router-dom';
import { Dispatch, SetStateAction } from 'react';
import { Session } from '@supabase/supabase-js';
import { User } from '@/types';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { handleUserLogin } from './utils';

// Login action
export const login = async (
  email: string,
  password: string,
  setIsLoading: Dispatch<SetStateAction<boolean>>,
  setError: Dispatch<SetStateAction<string | null>>
): Promise<Session | null> => {
  setIsLoading(true);
  setError(null);
  
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      console.error('Login error:', error);
      setError(error.message);
      toast({
        title: "Ошибка входа",
        description: error.message,
        variant: "destructive",
      });
      return null;
    }
    
    return data.session;
  } catch (err: any) {
    console.error('Unexpected login error:', err);
    setError(err.message);
    toast({
      title: "Ошибка входа",
      description: "Произошла неожиданная ошибка при входе",
      variant: "destructive",
    });
    return null;
  } finally {
    setIsLoading(false);
  }
};

// Register action
export const register = async (
  username: string,
  email: string,
  password: string,
  setIsLoading: Dispatch<SetStateAction<boolean>>,
  setError: Dispatch<SetStateAction<string | null>>,
  navigate: NavigateFunction
): Promise<Session | null> => {
  setIsLoading(true);
  setError(null);
  
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
        },
      },
    });
    
    if (error) {
      console.error('Registration error:', error);
      setError(error.message);
      toast({
        title: "Ошибка регистрации",
        description: error.message,
        variant: "destructive",
      });
      return null;
    }
    
    // If email confirmation is required
    if (!data.session) {
      toast({
        title: "Проверьте свою почту",
        description: "Мы отправили вам ссылку для подтверждения аккаунта",
      });
      navigate('/email-confirm');
    } else {
      toast({
        title: "Регистрация успешна",
        description: "Добро пожаловать в CyberWhale!",
      });
    }
    
    return data.session;
  } catch (err: any) {
    console.error('Unexpected registration error:', err);
    setError(err.message);
    toast({
      title: "Ошибка регистрации",
      description: "Произошла неожиданная ошибка при регистрации",
      variant: "destructive",
    });
    return null;
  } finally {
    setIsLoading(false);
  }
};

// Logout action
export const logout = async (
  setUser: Dispatch<SetStateAction<User | null>>,
  setSession: Dispatch<SetStateAction<Session | null>>,
  setIsLoading: Dispatch<SetStateAction<boolean>>,
  setError: Dispatch<SetStateAction<string | null>>,
  navigate: NavigateFunction
): Promise<void> => {
  setIsLoading(true);
  
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error('Logout error:', error);
      setError(error.message);
      toast({
        title: "Ошибка выхода",
        description: error.message,
        variant: "destructive",
      });
      return;
    }
    
    setUser(null);
    setSession(null);
    
    navigate('/');
    
    toast({
      title: "Выход выполнен",
      description: "Вы успешно вышли из системы",
    });
  } catch (err: any) {
    console.error('Unexpected logout error:', err);
    setError(err.message);
    toast({
      title: "Ошибка выхода",
      description: "Произошла неожиданная ошибка при выходе",
      variant: "destructive",
    });
  } finally {
    setIsLoading(false);
  }
};

// Reset password action
export const resetPassword = async (
  email: string,
  setIsLoading: Dispatch<SetStateAction<boolean>>,
  setError: Dispatch<SetStateAction<string | null>>
): Promise<void> => {
  setIsLoading(true);
  setError(null);
  
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    
    if (error) {
      console.error('Reset password error:', error);
      setError(error.message);
      toast({
        title: "Ошибка сброса пароля",
        description: error.message,
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Проверьте свою почту",
      description: "Мы отправили вам инструкции по сбросу пароля",
    });
  } catch (err: any) {
    console.error('Unexpected reset password error:', err);
    setError(err.message);
    toast({
      title: "Ошибка сброса пароля",
      description: "Произошла неожиданная ошибка при сбросе пароля",
      variant: "destructive",
    });
  } finally {
    setIsLoading(false);
  }
};

// Update password action
export const updatePassword = async (
  password: string,
  setIsLoading: Dispatch<SetStateAction<boolean>>,
  setError: Dispatch<SetStateAction<string | null>>,
  navigate: NavigateFunction
): Promise<void> => {
  setIsLoading(true);
  setError(null);
  
  try {
    const { error } = await supabase.auth.updateUser({
      password,
    });
    
    if (error) {
      console.error('Update password error:', error);
      setError(error.message);
      toast({
        title: "Ошибка обновления пароля",
        description: error.message,
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Пароль обновлен",
      description: "Ваш пароль был успешно обновлен",
    });
    
    navigate('/login');
  } catch (err: any) {
    console.error('Unexpected update password error:', err);
    setError(err.message);
    toast({
      title: "Ошибка обновления пароля",
      description: "Произошла неожиданная ошибка при обновлении пароля",
      variant: "destructive",
    });
  } finally {
    setIsLoading(false);
  }
};

// Update profile action
export const updateProfile = async (
  user: User,
  updates: Partial<User>,
  setUser: Dispatch<SetStateAction<User | null>>,
  setIsLoading: Dispatch<SetStateAction<boolean>>,
  setError: Dispatch<SetStateAction<string | null>>
): Promise<void> => {
  setIsLoading(true);
  setError(null);
  
  try {
    // First update the profile in the database
    const profileUpdates: Record<string, any> = {};
    
    if (updates.username) profileUpdates.username = updates.username;
    if (updates.avatar) profileUpdates.avatar_url = updates.avatar;
    
    if (Object.keys(profileUpdates).length > 0) {
      profileUpdates.updated_at = new Date().toISOString();
      
      const { error } = await supabase
        .from('profiles')
        .update(profileUpdates)
        .eq('id', user.id);
      
      if (error) {
        console.error('Update profile error:', error);
        setError(error.message);
        toast({
          title: "Ошибка обновления профиля",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
    }
    
    // Then update the local user state
    setUser({
      ...user,
      ...updates
    });
    
    toast({
      title: "Профиль обновлен",
      description: "Ваш профиль был успешно обновлен",
    });
  } catch (err: any) {
    console.error('Unexpected update profile error:', err);
    setError(err.message);
    toast({
      title: "Ошибка обновления профиля",
      description: "Произошла неожиданная ошибка при обновлении профиля",
      variant: "destructive",
    });
  } finally {
    setIsLoading(false);
  }
};

// Verify OTP action
export const verifyOtp = async (
  email: string,
  token: string,
  setIsLoading: Dispatch<SetStateAction<boolean>>,
  setError: Dispatch<SetStateAction<string | null>>
): Promise<void> => {
  setIsLoading(true);
  setError(null);
  
  try {
    const { error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'email',
    });
    
    if (error) {
      console.error('Verify OTP error:', error);
      setError(error.message);
      toast({
        title: "Ошибка верификации",
        description: error.message,
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Успешная верификация",
      description: "Ваш аккаунт успешно подтвержден",
    });
  } catch (err: any) {
    console.error('Unexpected verify OTP error:', err);
    setError(err.message);
    toast({
      title: "Ошибка верификации",
      description: "Произошла неожиданная ошибка при верификации",
      variant: "destructive",
    });
  } finally {
    setIsLoading(false);
  }
};
