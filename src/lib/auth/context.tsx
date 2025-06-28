import { createContext } from 'react';
import { Session } from '@supabase/supabase-js';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  error: string | null;
  loadingTimedOut?: boolean;
  login: (email: string, password: string) => Promise<Session | null>;
  register: (username: string, email: string, password: string) => Promise<Session | null>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
  verifyOtp: (email: string, token: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isLoading: false,
  error: null,
  loadingTimedOut: false,
  login: () => Promise.resolve(null),
  register: () => Promise.resolve(null),
  logout: () => Promise.resolve(),
  resetPassword: () => Promise.resolve(),
  updatePassword: () => Promise.resolve(),
  updateProfile: () => Promise.resolve(),
  verifyOtp: () => Promise.resolve(),
});