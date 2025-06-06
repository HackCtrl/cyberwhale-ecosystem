
import { useState, useEffect, useRef } from 'react';
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
  const authInitialized = useRef<boolean>(false);
  const userUpdateInProgress = useRef<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log("Auth provider mounted");
    
    // Set a shorter timeout to force exit loading state after 2 seconds
    const loadingTimeout = setTimeout(() => {
      if (isLoading) {
        console.log("Loading timed out, forcing exit loading state");
        setLoadingTimedOut(true);
        setIsLoading(false);
      }
    }, 2000);
    
    // First set up the subscription
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log('Auth state changed:', event);
        
        // Set session synchronously
        setSession(currentSession);
        
        if (event === 'SIGNED_IN' && currentSession) {
          if (userUpdateInProgress.current) return;
          userUpdateInProgress.current = true;
          
          // Use setTimeout to prevent blocking the auth state change
          setTimeout(async () => {
            try {
              const userProfile = await handleUserLogin(currentSession.user);
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
              userUpdateInProgress.current = false;
            }
          }, 0);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setIsLoading(false);
          setLoadingTimedOut(false); // Reset timeout state on sign-out
        } else if (event === 'PASSWORD_RECOVERY') {
          navigate('/reset-password');
          setIsLoading(false);
        } else if (event === 'USER_UPDATED') {
          if (currentSession && !userUpdateInProgress.current) {
            userUpdateInProgress.current = true;
            
            // Use setTimeout to prevent blocking the auth state change
            setTimeout(async () => {
              try {
                const userProfile = await handleUserLogin(currentSession.user);
                setUser(userProfile);
              } catch (err) {
                console.error('Error updating user profile:', err);
              } finally {
                setIsLoading(false);
                userUpdateInProgress.current = false;
              }
            }, 0);
          }
        }
      }
    );
    
    // Then get the initial session (if not already initialized)
    if (!authInitialized.current) {
      const loadInitialSession = async () => {
        try {
          const { data: { session: currentSession } } = await supabase.auth.getSession();
          console.log('Initial session:', currentSession);
          
          // Set session synchronously
          setSession(currentSession);
          
          if (currentSession) {
            if (userUpdateInProgress.current) return;
            userUpdateInProgress.current = true;
            
            // Use setTimeout to prevent potential deadlocks
            setTimeout(async () => {
              try {
                const userProfile = await handleUserLogin(currentSession.user);
                setUser(userProfile);
              } catch (err) {
                console.error('Error loading initial user profile:', err);
                setError('Ошибка загрузки профиля');
              } finally {
                setIsLoading(false);
                authInitialized.current = true;
                userUpdateInProgress.current = false;
              }
            }, 0);
          } else {
            setIsLoading(false);
            authInitialized.current = true;
          }
        } catch (err) {
          console.error('Error loading initial session:', err);
          setError('Ошибка загрузки сессии');
          setIsLoading(false);
          authInitialized.current = true;
        }
      };
      
      loadInitialSession();
    }
    
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
