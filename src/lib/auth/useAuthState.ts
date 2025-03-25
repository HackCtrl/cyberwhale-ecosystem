
import { useState, useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import { useNavigate, useLocation } from 'react-router-dom';
import { User } from '@/types';
import { supabase } from '@/integrations/supabase/client';
import { handleUserLogin } from './utils';
import { toast } from '@/components/ui/use-toast';

export const useAuthState = () => {
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

  return {
    user,
    setUser,
    session,
    setSession,
    isLoading,
    setIsLoading,
    error,
    setError
  };
};
