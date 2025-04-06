
import React from 'react';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/context';
import { cn } from '@/lib/utils';

interface LanguageSwitchProps {
  className?: string;
}

export default function LanguageSwitch({ className }: LanguageSwitchProps) {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'ru' ? 'en' : 'ru');
  };

  return (
    <Button 
      onClick={toggleLanguage} 
      variant="ghost" 
      size="sm" 
      className={cn("flex items-center gap-1.5 text-gray-300 hover:text-white", className)}
    >
      <Globe className="h-4 w-4" />
      <span>{t('language.switch')}</span>
    </Button>
  );
}
