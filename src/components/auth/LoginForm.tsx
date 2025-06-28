import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, Loader2 } from 'lucide-react';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, isLoading, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('Login form submitted with:', { email: email.trim(), passwordLength: password.length });
    
    if (!email.trim() || !password) {
      console.log('Validation failed: missing email or password');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      console.log('LoginForm: Attempting login for:', email.trim());
      const session = await login(email.trim(), password);
      console.log('LoginForm: Login successful, session:', session);
      
      // Navigation will be handled by the auth state change in useAuthState
    } catch (err) {
      console.error('LoginForm: Login failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('Login button clicked directly');
    
    if (!email.trim() || !password) {
      console.log('Validation failed: missing email or password');
      return;
    }
    
    handleSubmit(e as any);
  };

  const isFormDisabled = isLoading || isSubmitting;
  const isSubmitDisabled = isFormDisabled || !email.trim() || !password;

  return (
    <>
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="email" className="block text-sm font-medium text-gray-200">
            Email
          </Label>
          <div className="mt-1">
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="bg-cyberdark-700 border-cyberdark-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              disabled={isFormDisabled}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="password" className="block text-sm font-medium text-gray-200">
            Пароль
          </Label>
          <div className="mt-1">
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="bg-cyberdark-700 border-cyberdark-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              disabled={isFormDisabled}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !isSubmitDisabled) {
                  handleSubmit(e as any);
                }
              }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              disabled={isFormDisabled}
              className="h-4 w-4 rounded border-cyberdark-600 bg-cyberdark-700 text-cyberblue-500 focus:ring-cyberblue-500"
            />
            <Label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
              Запомнить меня
            </Label>
          </div>

          <div className="text-sm">
            <Link to="/forgot-password" className="font-medium text-cyberblue-500 hover:text-cyberblue-400">
              Забыли пароль?
            </Link>
          </div>
        </div>

        <div>
          <Button
            type="submit"
            disabled={isSubmitDisabled}
            onClick={handleButtonClick}
            className="w-full bg-cyberblue-500 hover:bg-cyberblue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isFormDisabled ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Вход...
              </>
            ) : (
              'Войти'
            )}
          </Button>
        </div>
      </form>
    </>
  );
}