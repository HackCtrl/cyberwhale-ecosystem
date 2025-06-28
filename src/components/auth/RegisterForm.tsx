import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export function RegisterForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const { register, isLoading, error } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim() || !email.trim() || !password || !confirmPassword) {
      return;
    }
    
    if (password !== confirmPassword) {
      return; // Password mismatch is handled by form validation
    }
    
    try {
      console.log('RegisterForm: Attempting registration');
      const session = await register(username, email, password);
      console.log('RegisterForm: Registration successful', session ? 'with session' : 'without session');
      
      // Navigation is handled in the auth provider or register function
    } catch (err) {
      console.error('RegisterForm: Registration failed:', err);
      // Error is handled by the auth context
    }
  };

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
          <Label htmlFor="username" className="block text-sm font-medium text-gray-200">
            Имя пользователя
          </Label>
          <div className="mt-1">
            <Input
              id="username"
              name="username"
              type="text"
              required
              className="bg-cyberdark-700 border-cyberdark-600"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username"
              minLength={3}
              maxLength={30}
              disabled={isLoading}
            />
          </div>
        </div>

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
              disabled={isLoading}
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
              required
              className="bg-cyberdark-700 border-cyberdark-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              minLength={6}
              disabled={isLoading}
            />
          </div>
          <p className="mt-1 text-xs text-gray-400">Минимум 6 символов</p>
        </div>

        <div>
          <Label htmlFor="confirm-password" className="block text-sm font-medium text-gray-200">
            Подтвердите пароль
          </Label>
          <div className="mt-1">
            <Input
              id="confirm-password"
              name="confirm-password"
              type="password"
              required
              className={`bg-cyberdark-700 border-cyberdark-600 ${
                confirmPassword && password !== confirmPassword ? 'border-red-500' : ''
              }`}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              disabled={isLoading}
            />
          </div>
          {confirmPassword && password !== confirmPassword && (
            <p className="mt-1 text-xs text-red-500">Пароли не совпадают</p>
          )}
        </div>

        <div className="flex items-center">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            required
            disabled={isLoading}
            className="h-4 w-4 rounded border-cyberdark-600 bg-cyberdark-700 text-cyberblue-500 focus:ring-cyberblue-500"
          />
          <Label htmlFor="terms" className="ml-2 block text-sm text-gray-300">
            Я согласен с{' '}
            <Link to="/terms" className="font-medium text-cyberblue-500 hover:text-cyberblue-400">
              условиями использования
            </Link>{' '}
            и{' '}
            <Link to="/privacy" className="font-medium text-cyberblue-500 hover:text-cyberblue-400">
              политикой конфиденциальности
            </Link>
          </Label>
        </div>

        <div>
          <Button
            type="submit"
            disabled={isLoading || !username.trim() || !email.trim() || !password || !confirmPassword || (confirmPassword && password !== confirmPassword)}
            className="w-full bg-cyberblue-500 hover:bg-cyberblue-600"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Регистрация...
              </>
            ) : (
              'Зарегистрироваться'
            )}
          </Button>
        </div>
      </form>
    </>
  );
}