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
    
    // Set a timeout to force exit loading state after 3 seconds
    const loadingTimeout = setTimeout(() => {
      if (isLoading) {
        console.log("Loading timed out, forcing exit loading state");
        setLoadingTimedOut(true);
        setIsLoading(false);
      }
    }, 3000);
    
    // Set up the auth state change subscription
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log('Auth state changed:', event, currentSession?.user?.id);
        
        // Clear any previous errors
        setError(null);
        
        if (event === 'SIGNED_IN' && currentSession) {
          if (userUpdateInProgress.current) {
            console.log('User update already in progress, skipping');
            return;
          }
          userUpdateInProgress.current = true;
          
          try {
            console.log('Processing signed in user:', currentSession.user.id);
            const userProfile = await handleUserLogin(currentSession.user);
            
            if (userProfile) {
              console.log('User profile loaded successfully:', userProfile.username);
              setUser(userProfile);
              setSession(currentSession);
              
              // Handle navigation
              const returnUrl = new URLSearchParams(location.search).get('returnUrl');
              const redirectTo = returnUrl || '/';
              if (location.pathname.includes('/login') || location.pathname.includes('/register')) {
                console.log('Redirecting to:', redirectTo);
                navigate(redirectTo);
              }
              
              toast({
                title: "Успешный вход",
                description: `Добро пожаловать, ${userProfile.username}!`,
              });
            } else {
              console.error('Failed to load user profile');
              setError('Ошибка загрузки профиля пользователя');
            }
          } catch (err) {
            console.error('Error processing signed in user:', err);
            setError('Ошибка загрузки профиля пользователя');
          } finally {
            setIsLoading(false);
            userUpdateInProgress.current = false;
          }
        } else if (event === 'SIGNED_OUT') {
          console.log('User signed out');
          setUser(null);
          setSession(null);
          setIsLoading(false);
          setLoadingTimedOut(false);
        } else if (event === 'PASSWORD_RECOVERY') {
          console.log('Password recovery event');
          navigate('/reset-password');
          setIsLoading(false);
        } else if (event === 'USER_UPDATED' && currentSession) {
          if (userUpdateInProgress.current) {
            console.log('User update already in progress, skipping');
            return;
          }
          userUpdateInProgress.current = true;
          
          try {
            console.log('Processing user update:', currentSession.user.id);
            const userProfile = await handleUserLogin(currentSession.user);
            if (userProfile) {
              setUser(userProfile);
              setSession(currentSession);
            }
          } catch (err) {
            console.error('Error processing user update:', err);
          } finally {
            setIsLoading(false);
            userUpdateInProgress.current = false;
          }
        } else {
          // For other events or no session, just stop loading
          setSession(currentSession);
          setIsLoading(false);
        }
      }
    );
    
    // Get the initial session
    if (!authInitialized.current) {
      const loadInitialSession = async () => {
        try {
          console.log('Loading initial session...');
          const { data: { session: currentSession }, error } = await supabase.auth.getSession();
          
          if (error) {
            console.error('Error getting initial session:', error);
            setError('Ошибка загрузки сессии');
            setIsLoading(false);
            authInitialized.current = true;
            return;
          }
          
          console.log('Initial session loaded:', currentSession?.user?.id || 'no session');
          
          if (currentSession) {
            if (userUpdateInProgress.current) return;
            userUpdateInProgress.current = true;
            
            try {
              console.log('Loading initial user profile for:', currentSession.user.id);
              const userProfile = await handleUserLogin(currentSession.user);
              
              if (userProfile) {
                console.log('Initial user profile loaded:', userProfile.username);
                setUser(userProfile);
                setSession(currentSession);
              } else {
                console.error('Failed to load initial user profile');
                setError('Ошибка загрузки профиля пользователя');
              }
            } catch (err) {
              console.error('Error loading initial user profile:', err);
              setError('Ошибка загрузки профиля пользователя');
            } finally {
              setIsLoading(false);
              authInitialized.current = true;
              userUpdateInProgress.current = false;
            }
          } else {
            setIsLoading(false);
            authInitialized.current = true;
          }
        } catch (err) {
          console.error('Error in loadInitialSession:', err);
          setError('Ошибка инициализации');
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