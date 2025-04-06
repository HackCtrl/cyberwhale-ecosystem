
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

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
    
    // Главная страница
    'home.welcome': 'Добро пожаловать в CyberWhale',
    'home.subtitle': 'Ваш путь в кибербезопасность',
    'home.getStarted': 'Начать',
    'home.learnMore': 'Узнать больше',
    'home.featuresTitle': 'Наши возможности',
    'home.feature1.title': 'CTF Платформа',
    'home.feature1.desc': 'Решайте задачи и развивайте навыки кибербезопасности',
    'home.feature2.title': 'ИИ Ассистент',
    'home.feature2.desc': 'Получите помощь от специализированного ИИ в вопросах кибербезопасности',
    'home.feature3.title': 'База знаний',
    'home.feature3.desc': 'Изучайте материалы по кибербезопасности',
    
    // Авторизация
    'auth.login': 'Вход',
    'auth.register': 'Регистрация',
    'auth.logout': 'Выход',
    'auth.email': 'Электронная почта',
    'auth.password': 'Пароль',
    'auth.forgotPassword': 'Забыли пароль?',
    'auth.noAccount': 'Нет аккаунта?',
    'auth.hasAccount': 'Уже есть аккаунт?',
    'auth.resetPassword': 'Сбросить пароль',
    'auth.signIn': 'Войти',
    'auth.signUp': 'Зарегистрироваться',
    
    // Профиль и настройки
    'profile.title': 'Мой профиль',
    'profile.edit': 'Редактировать профиль',
    'profile.settings': 'Настройки',
    'profile.stats': 'Статистика',
    'settings.title': 'Настройки',
    'settings.account': 'Аккаунт',
    'settings.security': 'Безопасность',
    'settings.notifications': 'Уведомления',
    'settings.appearance': 'Внешний вид',
    
    // CTF Платформа
    'ctf.title': 'CTF Платформа',
    'ctf.challenges': 'Задачи',
    'ctf.leaderboard': 'Таблица лидеров',
    'ctf.categories': 'Категории',
    'ctf.difficulty': 'Сложность',
    'ctf.points': 'Очки',
    'ctf.solved': 'Решено',
    'ctf.notSolved': 'Не решено',
    'ctf.submit': 'Отправить',
    'ctf.flag': 'Флаг',
    
    // ИИ Ассистент
    'chat.title': 'CyberWhale ИИ',
    'chat.level': 'Уровень 1 • 0 очков',
    'chat.placeholder': 'Задайте вопрос...',
    'chat.welcome': 'Привет! Я CyberWhale, ваш ИИ-наставник по кибербезопасности. Давайте начнем наше увлекательное путешествие! 🖊️',
    'chat.error': 'Извините, произошла ошибка при обработке вашего запроса. Пожалуйста, попробуйте позже.',
    'chat.connection_error': 'Похоже, возникли проблемы с подключением к AI. Вы можете попробовать перезагрузить страницу или воспользоваться основными функциями без ИИ.',
    
    // База знаний
    'kb.title': 'База знаний',
    'kb.search': 'Поиск по базе знаний',
    'kb.categories': 'Категории',
    'kb.recent': 'Недавние статьи',
    'kb.popular': 'Популярные статьи',
    'kb.readMore': 'Читать далее',
    
    // Сообщество
    'community.title': 'Сообщество',
    'community.discussions': 'Обсуждения',
    'community.members': 'Участники',
    'community.events': 'События',
    'community.join': 'Присоединиться',
    
    // Поиск
    'search.placeholder': 'Поиск по сайту...',
    'search.results': 'Результаты поиска',
    'search.noResults': 'Ничего не найдено',
    
    // Общие элементы
    'common.loading': 'Загрузка...',
    'common.error': 'Произошла ошибка',
    'common.success': 'Успешно',
    'common.cancel': 'Отмена',
    'common.save': 'Сохранить',
    'common.edit': 'Редактировать',
    'common.delete': 'Удалить',
    'common.back': 'Назад',
    'common.next': 'Далее',
    'common.more': 'Больше',
    'common.less': 'Меньше',
    'common.all': 'Все',
    
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
    
    // Продукты
    'products.title': 'Наши продукты',
    'products.explore': 'Исследовать',
    'products.learn': 'Учиться',
    'products.buy': 'Купить',
    'products.free': 'Бесплатно',
    'products.price': 'Цена',
    
    // 404 страница
    '404.title': 'Страница не найдена',
    '404.description': 'Похоже, вы заблудились в киберпространстве.',
    '404.goHome': 'На главную',
    
    // Язык
    'language.switch': 'EN',
    'language.name': 'Русский',
    'language.select': 'Выберите язык',
  },
  en: {
    // Navigation
    'nav.products': 'Products',
    'nav.ctf': 'CTF Platform',
    'nav.ai_assistant': 'AI Assistant',
    'nav.community': 'Community',
    'nav.knowledge': 'Knowledge Base',
    
    // Home page
    'home.welcome': 'Welcome to CyberWhale',
    'home.subtitle': 'Your path to cybersecurity',
    'home.getStarted': 'Get Started',
    'home.learnMore': 'Learn More',
    'home.featuresTitle': 'Our Features',
    'home.feature1.title': 'CTF Platform',
    'home.feature1.desc': 'Solve challenges and develop cybersecurity skills',
    'home.feature2.title': 'AI Assistant',
    'home.feature2.desc': 'Get help from specialized AI with cybersecurity questions',
    'home.feature3.title': 'Knowledge Base',
    'home.feature3.desc': 'Study cybersecurity materials',
    
    // Auth
    'auth.login': 'Login',
    'auth.register': 'Register',
    'auth.logout': 'Logout',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.forgotPassword': 'Forgot password?',
    'auth.noAccount': 'Don\'t have an account?',
    'auth.hasAccount': 'Already have an account?',
    'auth.resetPassword': 'Reset Password',
    'auth.signIn': 'Sign In',
    'auth.signUp': 'Sign Up',
    
    // Profile and Settings
    'profile.title': 'My Profile',
    'profile.edit': 'Edit Profile',
    'profile.settings': 'Settings',
    'profile.stats': 'Statistics',
    'settings.title': 'Settings',
    'settings.account': 'Account',
    'settings.security': 'Security',
    'settings.notifications': 'Notifications',
    'settings.appearance': 'Appearance',
    
    // CTF Platform
    'ctf.title': 'CTF Platform',
    'ctf.challenges': 'Challenges',
    'ctf.leaderboard': 'Leaderboard',
    'ctf.categories': 'Categories',
    'ctf.difficulty': 'Difficulty',
    'ctf.points': 'Points',
    'ctf.solved': 'Solved',
    'ctf.notSolved': 'Not Solved',
    'ctf.submit': 'Submit',
    'ctf.flag': 'Flag',
    
    // AI Assistant
    'chat.title': 'CyberWhale AI',
    'chat.level': 'Level 1 • 0 points',
    'chat.placeholder': 'Ask a question...',
    'chat.welcome': 'Hello! I am CyberWhale, your AI mentor in cybersecurity. Let\'s start our exciting journey! 🖊️',
    'chat.error': 'Sorry, an error occurred while processing your request. Please try again later.',
    'chat.connection_error': 'It seems there are problems connecting to AI. You can try reloading the page or using the basic functions without AI.',
    
    // Knowledge Base
    'kb.title': 'Knowledge Base',
    'kb.search': 'Search the knowledge base',
    'kb.categories': 'Categories',
    'kb.recent': 'Recent Articles',
    'kb.popular': 'Popular Articles',
    'kb.readMore': 'Read More',
    
    // Community
    'community.title': 'Community',
    'community.discussions': 'Discussions',
    'community.members': 'Members',
    'community.events': 'Events',
    'community.join': 'Join',
    
    // Search
    'search.placeholder': 'Search the site...',
    'search.results': 'Search Results',
    'search.noResults': 'No results found',
    
    // Common elements
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.more': 'More',
    'common.less': 'Less',
    'common.all': 'All',
    
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
    
    // Products
    'products.title': 'Our Products',
    'products.explore': 'Explore',
    'products.learn': 'Learn',
    'products.buy': 'Buy',
    'products.free': 'Free',
    'products.price': 'Price',
    
    // 404 page
    '404.title': 'Page Not Found',
    '404.description': 'Looks like you got lost in cyberspace.',
    '404.goHome': 'Go Home',
    
    // Language
    'language.switch': 'RU',
    'language.name': 'English',
    'language.select': 'Select language',
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  // Try to get the language from localStorage first
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    return savedLanguage === 'en' ? 'en' : 'ru'; // Default to 'ru' if not found
  });

  // Save the language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

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
