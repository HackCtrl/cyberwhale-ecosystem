
import { createContext } from 'react';
import { Session } from '@supabase/supabase-js';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<any>;
  register: (username: string, email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<boolean>;
  updatePassword: (password: string) => Promise<boolean>;
  updateProfile: (updates: Partial<User>) => Promise<boolean>;
  verifyOtp: (email: string, token: string) => Promise<any>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isLoading: false,
  error: null,
  login: async () => ({}),
  register: async () => ({}),
  logout: async () => {},
  resetPassword: async () => false,
  updatePassword: async () => false,
  updateProfile: async () => false,
  verifyOtp: async () => ({}),
});
