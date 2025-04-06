
import React, { createContext, useState, useContext, ReactNode } from 'react';

export type Language = 'ru' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const translations = {
  ru: {
    // Навигация
    'nav.products': 'Продукты',
    'nav.ctf': 'CTF Платформа',
    'nav.ai_assistant': 'ИИ Ассистент',
    'nav.community': 'Сообщество',
    'nav.knowledge': 'База знаний',
    
    // Чат с ассистентом
    'chat.title': 'CyberWhale ИИ',
    'chat.level': 'Уровень 1 • 0 очков',
    'chat.placeholder': 'Задайте вопрос...',
    'chat.welcome': 'Привет! Я CyberWhale, ваш ИИ-наставник по кибербезопасности. Давайте начнем наше увлекательное путешествие! 🖊️',
    'chat.error': 'Извините, произошла ошибка при обработке вашего запроса. Пожалуйста, попробуйте позже.',
    'chat.connection_error': 'Похоже, возникли проблемы с подключением к AI. Вы можете попробовать перезагрузить страницу или воспользоваться основными функциями без ИИ.',
    
    // Футер
    'footer.description': 'Ваш путь в мир кибербезопасности начинается здесь. Учитесь, практикуйтесь и становитесь экспертом вместе с нами.',
    'footer.platform': 'Платформа',
    'footer.resources': 'Ресурсы',
    'footer.about': 'О нас',
    'footer.blog': 'Блог',
    'footer.faq': 'Часто задаваемые вопросы',
    'footer.support': 'Поддержка',
    'footer.contact': 'Связаться с нами',
    'footer.contact_button': 'Связаться',
    'footer.copyright': 'Все права защищены.',
    'footer.privacy': 'Политика конфиденциальности',
    'footer.terms': 'Условия использования',
    
    // Язык
    'language.switch': 'EN',
    'language.name': 'Русский',
  },
  en: {
    // Navigation
    'nav.products': 'Products',
    'nav.ctf': 'CTF Platform',
    'nav.ai_assistant': 'AI Assistant',
    'nav.community': 'Community',
    'nav.knowledge': 'Knowledge Base',
    
    // Chat with assistant
    'chat.title': 'CyberWhale AI',
    'chat.level': 'Level 1 • 0 points',
    'chat.placeholder': 'Ask a question...',
    'chat.welcome': 'Hello! I am CyberWhale, your AI mentor in cybersecurity. Let\'s start our exciting journey! 🖊️',
    'chat.error': 'Sorry, an error occurred while processing your request. Please try again later.',
    'chat.connection_error': 'It seems there are problems connecting to AI. You can try reloading the page or using the basic functions without AI.',
    
    // Footer
    'footer.description': 'Your journey into the world of cybersecurity begins here. Learn, practice and become an expert with us.',
    'footer.platform': 'Platform',
    'footer.resources': 'Resources',
    'footer.about': 'About Us',
    'footer.blog': 'Blog',
    'footer.faq': 'Frequently Asked Questions',
    'footer.support': 'Support',
    'footer.contact': 'Contact Us',
    'footer.contact_button': 'Contact',
    'footer.copyright': 'All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Use',
    
    // Language
    'language.switch': 'RU',
    'language.name': 'English',
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<Language>('ru');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
