
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string, verificationCode: string) => Promise<void>;
  logout: () => void;
  sendVerificationCode: (email: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock implementation for demo purposes
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('cyberwhale_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation
      if (email !== 'demo@example.com' && email !== 'user@example.com') {
        throw new Error('Неверный email или пароль');
      }
      
      if (password !== 'password123') {
        throw new Error('Неверный email или пароль');
      }
      
      // Mock successful login
      const mockUser: User = {
        id: '1',
        username: email === 'demo@example.com' ? 'demo_user' : 'test_user',
        email,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + email,
        role: 'user',
        points: 150,
        level: 2,
        createdAt: new Date(),
      };
      
      setUser(mockUser);
      localStorage.setItem('cyberwhale_user', JSON.stringify(mockUser));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка при входе');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (username: string, email: string, password: string, verificationCode: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock validation
      if (!username || !email || !password) {
        throw new Error('Все поля обязательны для заполнения');
      }
      
      if (password.length < 8) {
        throw new Error('Пароль должен содержать не менее 8 символов');
      }
      
      if (verificationCode !== '123456') {
        throw new Error('Неверный код подтверждения');
      }
      
      // Mock successful registration
      const mockUser: User = {
        id: Date.now().toString(),
        username,
        email,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + email,
        role: 'user',
        points: 0,
        level: 1,
        createdAt: new Date(),
      };
      
      setUser(mockUser);
      localStorage.setItem('cyberwhale_user', JSON.stringify(mockUser));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка при регистрации');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('cyberwhale_user');
  };

  const sendVerificationCode = async (email: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (!email || !email.includes('@')) {
        throw new Error('Пожалуйста, введите корректный email');
      }
      
      // In a real application, this would send a verification code
      console.log(`Verification code 123456 sent to ${email}`);
      
      // For demonstration, we'll show a success message in the UI
      return Promise.resolve();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка отправки кода');
      return Promise.reject(err);
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (!email || !email.includes('@')) {
        throw new Error('Пожалуйста, введите корректный email');
      }
      
      // In a real application, this would send a reset link
      console.log(`Password reset link sent to ${email}`);
      
      return Promise.resolve();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка сброса пароля');
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
      sendVerificationCode,
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
