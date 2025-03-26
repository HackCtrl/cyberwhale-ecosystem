
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
  const [loadingTimedOut, setLoadingTimedOut] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log("Auth provider mounted");
    
    // Set a timeout to force exit loading state after 5 seconds
    const loadingTimeout = setTimeout(() => {
      if (isLoading) {
        console.log("Loading timed out, forcing exit loading state");
        setLoadingTimedOut(true);
        setIsLoading(false);
      }
    }, 5000);
    
    // Set up the subscription first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log('Auth state changed:', event, currentSession);
        
        setSession(currentSession);
        
        if (event === 'SIGNED_IN' && currentSession) {
          setIsLoading(true);
          setLoadingTimedOut(false); // Reset timeout state on sign-in
          try {
            const userProfile = await handleUserLogin(currentSession.user);
            console.log('User profile after sign in:', userProfile);
            setUser(userProfile);
            
            const returnUrl = new URLSearchParams(location.search).get('returnUrl');
            const redirectTo = returnUrl || '/';
            if (location.pathname.includes('/login') || location.pathname.includes('/register')) {
              navigate(redirectTo);
            }
            
            toast({
              title: "Успешный вход",
              description: "Добро пожаловать в CyberWhale!",
            });
          } catch (err) {
            console.error('Error loading user profile:', err);
            setError('Ошибка загрузки профиля');
          } finally {
            setIsLoading(false);
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setSession(null);
          setIsLoading(false);
          setLoadingTimedOut(false); // Reset timeout state on sign-out
        } else if (event === 'PASSWORD_RECOVERY') {
          navigate('/reset-password');
          setIsLoading(false);
        } else if (event === 'USER_UPDATED') {
          if (currentSession) {
            setIsLoading(true);
            try {
              const userProfile = await handleUserLogin(currentSession.user);
              setUser(userProfile);
            } catch (err) {
              console.error('Error updating user profile:', err);
            } finally {
              setIsLoading(false);
            }
          }
        }
      }
    );
    
    // Then get the initial session
    const loadInitialSession = async () => {
      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        console.log('Initial session:', currentSession);
        
        setSession(currentSession);
        
        if (currentSession) {
          const userProfile = await handleUserLogin(currentSession.user);
          console.log('Initial user profile:', userProfile);
          setUser(userProfile);
        }
      } catch (err) {
        console.error('Error loading initial session:', err);
        setError('Ошибка загрузки сессии');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadInitialSession();
    
    return () => {
      clearTimeout(loadingTimeout);
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
    setError,
    loadingTimedOut
  };
};
