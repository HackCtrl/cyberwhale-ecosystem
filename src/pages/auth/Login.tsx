
import React from 'react';
import { Link } from 'react-router-dom';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { SocialLogin } from '@/components/auth/SocialLogin';
import { LoginForm } from '@/components/auth/LoginForm';

export default function Login() {
  return (
    <AuthLayout 
      title="Войти в аккаунт"
      subtitle={
        <>
          Или{' '}
          <Link to="/register" className="font-medium text-cyberblue-500 hover:text-cyberblue-400">
            зарегистрироваться, если у вас еще нет аккаунта
          </Link>
        </>
      }
    >
      <LoginForm />
      <SocialLogin type="login" />
    </AuthLayout>
  );
}
