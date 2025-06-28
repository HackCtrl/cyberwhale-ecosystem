import { supabase } from '@/integrations/supabase/client';
import { User } from '@/types';

export const login = async (
  email: string, 
  password: string, 
  setIsLoading: (loading: boolean) => void,
  setError: (error: string | null) => void
) => {
  setIsLoading(true);
  setError(null);
  
  try {
    console.log('Attempting login for:', email);
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: password,
    });

    if (error) {
      console.error('Login error from Supabase:', error);
      throw error;
    }

    if (!data.session) {
      throw new Error('Не удалось создать сессию');
    }

    console.log('Login successful, session created:', data.session.user.id);
    return data.session;
  } catch (error: any) {
    console.error('Login error:', error);
    setError(error.message || 'Произошла ошибка при входе');
    throw error;
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
  navigate: (path: string) => void
) => {
  setIsLoading(true);
  setError(null);
  
  try {
    console.log('Attempting registration for:', email, 'with username:', username);
    
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password: password,
      options: {
        data: {
          username: username.trim(),
        }
      }
    });

    if (error) {
      console.error('Registration error from Supabase:', error);
      throw error;
    }

    console.log('Registration response:', data);

    // If user is immediately confirmed (email confirmation disabled)
    if (data.session) {
      console.log('User immediately confirmed, session created');
      return data.session;
    }

    // If email confirmation is required
    if (data.user && !data.session) {
      console.log('Email confirmation required');
      navigate('/verify-otp', { state: { email } });
      return null;
    }

    return data.session;
  } catch (error: any) {
    console.error('Registration error:', error);
    setError(error.message || 'Произошла ошибка при регистрации');
    throw error;
  } finally {
    setIsLoading(false);
  }
};

export const logout = async (
  setUser: (user: User | null) => void,
  setSession: (session: any) => void,
  setIsLoading: (loading: boolean) => void,
  setError: (error: string | null) => void,
  navigate: (path: string) => void
) => {
  setIsLoading(true);
  setError(null);
  
  try {
    console.log('Attempting logout');
    
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      throw error;
    }

    console.log('Logout successful');
    setUser(null);
    setSession(null);
    navigate('/');
  } catch (error: any) {
    console.error('Logout error:', error);
    setError(error.message || 'Произошла ошибка при выходе');
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

    if (error) {
      throw error;
    }
  } catch (error: any) {
    console.error('Reset password error:', error);
    setError(error.message || 'Произошла ошибка при сбросе пароля');
    throw error;
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
      password: password
    });

    if (error) {
      throw error;
    }

    navigate('/login');
  } catch (error: any) {
    console.error('Update password error:', error);
    setError(error.message || 'Произошла ошибка при обновлении пароля');
    throw error;
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
    const { error } = await supabase
      .from('profiles')
      .update({
        username: updates.username,
        avatar_url: updates.avatar,
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id);

    if (error) {
      throw error;
    }

    // Update local user state
    setUser({ ...user, ...updates });
  } catch (error: any) {
    console.error('Update profile error:', error);
    setError(error.message || 'Произошла ошибка при обновлении профиля');
    throw error;
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

    if (error) {
      throw error;
    }

    return data.session;
  } catch (error: any) {
    console.error('Verify OTP error:', error);
    setError(error.message || 'Произошла ошибка при подтверждении кода');
    throw error;
  } finally {
    setIsLoading(false);
  }
};