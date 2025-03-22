import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ChevronDown, 
  Menu, 
  Search, 
  Shield, 
  Database, 
  Bot, 
  Users,
  X 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import UserMenu from './UserMenu';

type NavLink = {
  name: string;
  to: string;
  icon?: React.ReactNode;
  submenu?: NavLink[];
  current?: boolean;
};

const navLinks: NavLink[] = [
  {
    name: 'Продукты',
    to: '/products',
    icon: <Shield className="w-4 h-4 mr-1" />,
  },
  {
    name: 'CTF Платформа',
    to: '/ctf',
    icon: <Shield className="w-4 h-4 mr-1" />,
  },
  {
    name: 'ИИ Ассистент',
    to: '/ai-assistant',
    icon: <Bot className="w-4 h-4 mr-1" />,
  },
  {
    name: 'Сообщество',
    to: '/community',
    icon: <Users className="w-4 h-4 mr-1" />,
  },
  {
    name: 'База знаний',
    to: '/knowledge',
    icon: <Database className="w-4 h-4 mr-1" />,
  },
];

export default function Navbar() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const updatedNavLinks = navLinks.map(link => ({
    ...link,
    current: location.pathname === link.to || location.pathname.startsWith(`${link.to}/`),
    submenu: link.submenu
      ? link.submenu.map(sublink => ({
          ...sublink,
          current: location.pathname === sublink.to,
        }))
      : undefined,
  }));

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        isScrolled ? "bg-cyberdark-900/90 backdrop-blur-md border-b border-cyberdark-800" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-white tracking-tight">CYBERWHALE</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {updatedNavLinks.map((link) => (
              <div key={link.to} className="relative group">
                <Link
                  to={link.to}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    link.current
                      ? "text-white bg-secondary/50"
                      : "text-gray-300 hover:text-white hover:bg-secondary/30"
                  )}
                >
                  {link.icon}
                  {link.name}
                  {link.submenu && (
                    <ChevronDown className="ml-1 w-4 h-4 transition-transform group-hover:rotate-180" />
                  )}
                </Link>
                {link.submenu && (
                  <div className="absolute left-0 mt-1 w-48 rounded-md shadow-lg bg-secondary py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 transform origin-top-right">
                    {link.submenu.map((sublink) => (
                      <Link
                        key={sublink.to}
                        to={sublink.to}
                        className={cn(
                          "block px-4 py-2 text-sm",
                          sublink.current
                            ? "text-white bg-primary/20"
                            : "text-gray-300 hover:text-white hover:bg-secondary/50"
                        )}
                      >
                        {sublink.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Поиск по сайту..."
                className="pl-10 w-60 bg-cyberdark-800 border-cyberdark-700 text-sm"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
            <UserMenu />
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-cyberdark-800"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-cyberdark-900/95 backdrop-blur-md border-b border-cyberdark-800 animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {updatedNavLinks.map((link) => (
              <React.Fragment key={link.to}>
                <Link
                  to={link.to}
                  className={cn(
                    "block px-3 py-2 rounded-md text-base font-medium",
                    link.current
                      ? "text-white bg-secondary"
                      : "text-gray-300 hover:text-white hover:bg-secondary/50"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="flex items-center">
                    {link.icon}
                    {link.name}
                  </div>
                </Link>
                {link.submenu && (
                  <div className="pl-4 space-y-1">
                    {link.submenu.map((sublink) => (
                      <Link
                        key={sublink.to}
                        to={sublink.to}
                        className={cn(
                          "block px-3 py-2 rounded-md text-sm font-medium",
                          sublink.current
                            ? "text-white bg-secondary/70"
                            : "text-gray-300 hover:text-white hover:bg-secondary/30"
                        )}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {sublink.name}
                      </Link>
                    ))}
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-cyberdark-800">
            <div className="px-4 py-2">
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Поиск по сайту..."
                  className="pl-10 w-full bg-cyberdark-800 border-cyberdark-700"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </div>
              <UserMenu />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
