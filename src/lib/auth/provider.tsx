import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './context';
import { useAuthState } from './useAuthState';
import { User } from '@/types';
import { 
  login, 
  register, 
  logout, 
  resetPassword, 
  updatePassword, 
  updateProfile, 
  verifyOtp 
} from './actions';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  
  const { 
    user, 
    setUser, 
    session, 
    setSession, 
    isLoading, 
    setIsLoading, 
    error, 
    setError,
    loadingTimedOut 
  } = useAuthState();

  const handleLogin = async (email: string, password: string) => {
    console.log('AuthProvider: handleLogin called with:', email);
    try {
      const session = await login(email, password, setIsLoading, setError);
      console.log('AuthProvider: Login successful');
      return session;
    } catch (error) {
      console.error('AuthProvider: Login failed:', error);
      throw error;
    }
  };

  const handleRegister = async (username: string, email: string, password: string) => {
    return register(username, email, password, setIsLoading, setError, navigate);
  };

  const handleLogout = async () => {
    return logout(setUser, setSession, setIsLoading, setError, navigate);
  };

  const handleResetPassword = async (email: string) => {
    return resetPassword(email, setIsLoading, setError);
  };

  const handleUpdatePassword = async (password: string) => {
    return updatePassword(password, setIsLoading, setError, navigate);
  };

  const handleUpdateProfile = async (updates: Partial<User>) => {
    if (!user) {
      setError('Пользователь не авторизован');
      return Promise.reject(new Error('Пользователь не авторизован'));
    }
    return updateProfile(user, updates, setUser, setIsLoading, setError);
  };

  const handleVerifyOtp = async (email: string, token: string) => {
    return verifyOtp(email, token, setIsLoading, setError);
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      isLoading,
      error,
      login: handleLogin,
      register: handleRegister,
      logout: handleLogout,
      resetPassword: handleResetPassword,
      updatePassword: handleUpdatePassword,
      updateProfile: handleUpdateProfile,
      verifyOtp: handleVerifyOtp,
      loadingTimedOut
    }}>
      {children}
    </AuthContext.Provider>
  );
};