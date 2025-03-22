
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger, 
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { LogOut, User, Settings, Award, ChevronDown } from 'lucide-react';

export default function UserMenu() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  
  if (!user) {
    return (
      <div className="flex items-center space-x-2">
        <Link to="/login">
          <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
            Войти
          </Button>
        </Link>
        <Link to="/register">
          <Button size="sm" className="bg-cyberblue-500 hover:bg-cyberblue-600 text-white">
            Регистрация
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="flex items-center space-x-2 px-2 py-1 hover:bg-cyberdark-800 rounded-md"
        >
          <Avatar className="h-8 w-8 rounded-full border border-cyberdark-600">
            <AvatarImage src={user.avatar} alt={user.username} />
            <AvatarFallback className="bg-cyberdark-700 text-white">
              {user.username.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:flex flex-col items-start">
            <span className="text-sm font-medium text-white">{user.username}</span>
            <span className="text-xs text-gray-400">Уровень {user.level}</span>
          </div>
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-cyberdark-800 border-cyberdark-700 text-white">
        <div className="px-4 py-2 md:hidden">
          <p className="text-sm font-medium">{user.username}</p>
          <p className="text-xs text-gray-400">{user.email}</p>
        </div>
        <DropdownMenuLabel className="md:hidden">
          <div className="flex items-center space-x-2 text-white">
            <Award className="h-4 w-4 text-cyberblue-500" />
            <span>Уровень {user.level} • {user.points} очков</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="md:hidden border-cyberdark-700" />
        <DropdownMenuItem className="focus:bg-cyberdark-700" asChild>
          <Link to="/profile" className="flex cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>Мой профиль</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="focus:bg-cyberdark-700" asChild>
          <Link to="/settings" className="flex cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            <span>Настройки</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="border-cyberdark-700" />
        <DropdownMenuItem className="focus:bg-cyberdark-700 text-red-400 focus:text-red-300" onClick={logout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Выйти</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
