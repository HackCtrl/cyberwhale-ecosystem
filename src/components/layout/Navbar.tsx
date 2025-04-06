
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  ChevronDown, 
  Menu, 
  Shield, 
  Database, 
  Bot, 
  Users,
  X 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import UserMenu from './UserMenu';
import SearchBox from '@/components/search/SearchBox';
import { useAuth } from '@/lib/auth';
import { useLanguage } from '@/lib/i18n/context';
import LanguageSwitch from './LanguageSwitch';

type NavLink = {
  name: string;
  translationKey: string;
  to: string;
  icon?: React.ReactNode;
  submenu?: NavLink[];
  current?: boolean;
  requiresAuth?: boolean;
};

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobileSearchVisible, setIsMobileSearchVisible] = useState(false);

  const navLinks: NavLink[] = [
    {
      name: t('nav.products'),
      translationKey: 'nav.products',
      to: '/products',
      icon: <Shield className="w-4 h-4 mr-1" />,
      requiresAuth: false,
    },
    {
      name: t('nav.ctf'),
      translationKey: 'nav.ctf',
      to: '/ctf',
      icon: <Shield className="w-4 h-4 mr-1" />,
      requiresAuth: true,
    },
    {
      name: t('nav.ai_assistant'),
      translationKey: 'nav.ai_assistant',
      to: '/ai-assistant',
      icon: <Bot className="w-4 h-4 mr-1" />,
      requiresAuth: true,
    },
    {
      name: t('nav.community'),
      translationKey: 'nav.community',
      to: '/community',
      icon: <Users className="w-4 h-4 mr-1" />,
      requiresAuth: true,
    },
    {
      name: t('nav.knowledge'),
      translationKey: 'nav.knowledge',
      to: '/knowledge',
      icon: <Database className="w-4 h-4 mr-1" />,
      requiresAuth: false,
    },
  ];

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

  const handleNavLinkClick = (link: NavLink) => {
    if (link.requiresAuth && !user) {
      navigate('/login?returnUrl=' + encodeURIComponent(link.to));
      setMobileMenuOpen(false);
      return;
    }
  };

  const isExternalLink = (url: string) => url.startsWith('http');

  return (
    <nav
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        isScrolled || mobileMenuOpen
          ? "bg-cyberblue-900/95 backdrop-blur-md border-b border-cyberblue-800/50 shadow-md" 
          : "bg-gradient-to-b from-cyberdark-900/95 to-cyberdark-900/75 border-b border-cyberdark-800/30"
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
            {updatedNavLinks.map((link) => {
              const handleClick = () => handleNavLinkClick(link);
              
              const LinkComponent = isExternalLink(link.to) ? (
                <a
                  href={link.to}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    link.current
                      ? "text-white bg-cyberblue-700/50"
                      : "text-gray-300 hover:text-white hover:bg-cyberblue-800/40"
                  )}
                >
                  {link.icon}
                  {link.name}
                </a>
              ) : (
                <Link
                  to={!link.requiresAuth || user ? link.to : '/login?returnUrl=' + encodeURIComponent(link.to)}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    link.current
                      ? "text-white bg-cyberblue-700/50"
                      : "text-gray-300 hover:text-white hover:bg-cyberblue-800/40"
                  )}
                  onClick={handleClick}
                >
                  {link.icon}
                  {link.name}
                  {link.submenu && (
                    <ChevronDown className="ml-1 w-4 h-4 transition-transform group-hover:rotate-180" />
                  )}
                </Link>
              );

              return (
                <div key={link.to} className="relative group">
                  {LinkComponent}
                  {link.submenu && (
                    <div className="absolute left-0 mt-1 w-48 rounded-md shadow-lg bg-cyberblue-900 py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 transform origin-top-right">
                      {link.submenu.map((sublink) => (
                        <Link
                          key={sublink.to}
                          to={sublink.to}
                          className={cn(
                            "block px-4 py-2 text-sm",
                            sublink.current
                              ? "text-white bg-cyberblue-700/50"
                              : "text-gray-300 hover:text-white hover:bg-cyberblue-800/40"
                          )}
                        >
                          {sublink.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <SearchBox className="w-60" />
            <LanguageSwitch />
            <UserMenu />
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-cyberblue-800/40"
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
        <div className="md:hidden bg-cyberblue-900/95 backdrop-blur-md border-b border-cyberblue-800/50 animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {updatedNavLinks.map((link) => {
              const handleClick = () => handleNavLinkClick(link);
              
              const MobileLinkComponent = isExternalLink(link.to) ? (
                <a
                  href={link.to}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "block px-3 py-2 rounded-md text-base font-medium",
                    link.current
                      ? "text-white bg-cyberblue-700/50"
                      : "text-gray-300 hover:text-white hover:bg-cyberblue-800/40"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="flex items-center">
                    {link.icon}
                    {link.name}
                  </div>
                </a>
              ) : (
                <Link
                  to={!link.requiresAuth || user ? link.to : '/login?returnUrl=' + encodeURIComponent(link.to)}
                  className={cn(
                    "block px-3 py-2 rounded-md text-base font-medium",
                    link.current
                      ? "text-white bg-cyberblue-700/50"
                      : "text-gray-300 hover:text-white hover:bg-cyberblue-800/40"
                  )}
                  onClick={(e) => {
                    if (link.requiresAuth && !user) {
                      e.preventDefault();
                      handleClick();
                    } else {
                      setMobileMenuOpen(false);
                    }
                  }}
                >
                  <div className="flex items-center">
                    {link.icon}
                    {link.name}
                  </div>
                </Link>
              );

              return (
                <React.Fragment key={link.to}>
                  {MobileLinkComponent}
                  {link.submenu && (
                    <div className="pl-4 space-y-1">
                      {link.submenu.map((sublink) => (
                        <Link
                          key={sublink.to}
                          to={sublink.to}
                          className={cn(
                            "block px-3 py-2 rounded-md text-sm font-medium",
                            sublink.current
                              ? "text-white bg-cyberblue-700/70"
                              : "text-gray-300 hover:text-white hover:bg-cyberblue-800/30"
                          )}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {sublink.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
          <div className="pt-4 pb-3 border-t border-cyberblue-800/50">
            <div className="px-4 py-2">
              <SearchBox className="w-full mb-3" />
              <div className="flex items-center justify-between">
                <LanguageSwitch />
                <UserMenu />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
