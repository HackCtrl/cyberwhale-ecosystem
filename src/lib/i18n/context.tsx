
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ru';
type TranslationKey = string;
type TranslationValue = string;
type Translations = Record<Language, Record<TranslationKey, TranslationValue>>;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Translations = {
  en: {
    'site.title': 'CyberWhale',
    'site.slogan': 'Advanced cybersecurity solutions',
    'site.description': 'Platform for security specialists',

    // Navbar
    'nav.home': 'Home',
    'nav.ctf': 'CTF Platform',
    'nav.knowledge': 'Knowledge Base',
    'nav.community': 'Community',
    'nav.products': 'Products',
    'nav.aiAssistant': 'AI Assistant',
    'nav.login': 'Sign In',
    'nav.register': 'Sign Up',
    'nav.profile': 'Profile',
    'nav.settings': 'Settings',
    'nav.logout': 'Sign Out',

    // Footer
    'footer.copyright': '© 2025 CyberWhale. All rights reserved.',
    'footer.about': 'About Us',
    'footer.terms': 'Terms of Service',
    'footer.privacy': 'Privacy Policy',
    'footer.contact': 'Contact',
    'footer.company': 'Company',
    'footer.blog': 'Blog',
    'footer.careers': 'Careers',
    'footer.press': 'Press Kit',
    'footer.resources': 'Resources',
    'footer.documentation': 'Documentation',
    'footer.support': 'Support',
    'footer.community': 'Community',
    'footer.legal': 'Legal',
    'footer.subscribe': 'Subscribe to our newsletter',
    'footer.subscribeDesc': 'Get the latest updates and news',
    'footer.subscribeButton': 'Subscribe',
    'footer.subscribeSuccess': 'Thank you for subscribing!',

    // Chat assistant
    'chat.title': 'CyberAssistant',
    'chat.placeholder': 'Ask a question...',
    'chat.send': 'Send',
    'chat.close': 'Close',

    // Language
    'language.select': 'Select language',
    'language.switch': 'EN',

    // CTF Platform
    'ctf.backToCases': 'Back to cases',
    'ctf.case': 'Case',
    'ctf.categories.web': 'Web Security',
    'ctf.categories.crypto': 'Cryptography',
    'ctf.categories.osint': 'OSINT',
    'ctf.categories.steganography': 'Steganography',
    'ctf.categories.reverseEngineering': 'Reverse Engineering',
    'ctf.categories.forensics': 'Forensics',
    'ctf.categories.pwn': 'PWN',
    'ctf.categories.programming': 'Programming',
    'ctf.categories.network': 'Network Security',
    'ctf.flagFormat': 'Flag format',
    'ctf.difficulty': 'Difficulty',
    'ctf.difficultyLevels.beginner': 'Beginner',
    'ctf.difficultyLevels.intermediate': 'Intermediate',
    'ctf.difficultyLevels.advanced': 'Advanced',
    'ctf.difficultyLevels.expert': 'Expert',
    'ctf.skills': 'Skills',
    'ctf.downloadFiles': 'Download files',
    'ctf.downloadArchiveHint': 'Archive contains files needed to solve the challenge',
    'ctf.deploymentInstructions': 'Deployment Instructions',
    'ctf.challengeCompleted': 'Challenge completed!',
    'ctf.congratulations': 'Congratulations! You have successfully solved the challenge and received {points} points.',
    'ctf.solutionTime': 'Solution time',
    'ctf.enterFlag': 'Enter the flag (e.g., {example})',
    'ctf.checking': 'Checking...',
    'ctf.submitFlag': 'Submit Flag',
    'ctf.challenge': 'Challenge',
    'ctf.hints': 'Hints',
    'ctf.hintsHelp': 'Hints can help you solve the challenge, but using hints reduces the points you get.',
    'ctf.showHints': 'Show Hints',
    'ctf.hint': 'Hint',
    'ctf.nextHint': 'Next Hint',
    'ctf.noMoreHints': 'No more hints available',
    'ctf.additionalResources': 'Additional Resources',

    // Web Challenge
    'ctf.web.prepSystem': 'System Preparation',
    'ctf.web.ensureInstalled': 'Ensure you have',
    'ctf.web.and': 'and',
    'ctf.web.launchCTF': 'Launch CTF Environment',
    'ctf.web.extractArchive': 'Extract the archive',
    'ctf.web.launchDocker': 'Launch Docker container',
    'ctf.web.checkServer': 'Check if the server is running',
    'ctf.web.openBrowser': 'Open in browser',
    'ctf.web.skillWebAnalysis': 'Web application analysis (HTML, Cookies)',
    'ctf.web.skillJwt': 'Working with JWT (JSON Web Tokens)',
    'ctf.web.skillCryptoExploit': 'Exploiting weak cryptographic secrets',
    'ctf.web.skillPythonAutomation': 'Using Python for attack automation',
    'ctf.web.phantomChallenge': 'This challenge requires you to exploit a vulnerability in the JWT implementation of the Phantom Vault web application.',
    'ctf.web.yourTask': 'Your tasks are',
    'ctf.web.task1': 'Analyze the authentication mechanism of the application',
    'ctf.web.task2': 'Identify vulnerabilities in the JWT implementation',
    'ctf.web.task3': 'Exploit the vulnerability to gain admin access',
    'ctf.web.task4': 'Extract the flag from the admin panel',
    'ctf.web.appFeatures': 'Phantom Vault application features',
    'ctf.web.feature1': 'User login and registration system',
    'ctf.web.feature2': 'Protected user dashboard',
    'ctf.web.feature3': 'Admin panel with access to sensitive information',
    'ctf.web.findVulnerability': 'Find the vulnerability in the JWT implementation and exploit it to access the admin panel.',
    'ctf.web.jwtResources': 'Here are some helpful resources for working with JWT:',
    'ctf.web.jwtDecoderDebugger': 'JWT Decoder & Debugger',
    'ctf.web.jwtTool': 'Toolkit for testing, forging and manipulating JWT',
    'ctf.web.jwtVulnerabilities': 'Common JWT vulnerabilities and exploitation techniques',
    'ctf.web.basicPythonScript': 'Basic Python script for JWT manipulation:',

    // Knowledge base
    'knowledge.title': 'Knowledge Base',
    'knowledge.description': 'Learn cybersecurity concepts and techniques',

    // User profile
    'profile.title': 'Profile',
    'profile.description': 'View and edit your profile information',
  },
  ru: {
    'site.title': 'CyberWhale',
    'site.slogan': 'Передовые решения кибербезопасности',
    'site.description': 'Платформа для специалистов по безопасности',
    
    // Navbar
    'nav.home': 'Главная',
    'nav.ctf': 'CTF Платформа',
    'nav.knowledge': 'База знаний',
    'nav.community': 'Сообщество',
    'nav.products': 'Продукты',
    'nav.aiAssistant': 'AI Ассистент',
    'nav.login': 'Вход',
    'nav.register': 'Регистрация',
    'nav.profile': 'Профиль',
    'nav.settings': 'Настройки',
    'nav.logout': 'Выйти',

    // Footer
    'footer.copyright': '© 2025 CyberWhale. Все права защищены.',
    'footer.about': 'О нас',
    'footer.terms': 'Условия использования',
    'footer.privacy': 'Политика конфиденциальности',
    'footer.contact': 'Контакты',
    'footer.company': 'Компания',
    'footer.blog': 'Блог',
    'footer.careers': 'Вакансии',
    'footer.press': 'Пресс-кит',
    'footer.resources': 'Ресурсы',
    'footer.documentation': 'Документация',
    'footer.support': 'Поддержка',
    'footer.community': 'Сообщество',
    'footer.legal': 'Юридическая информация',
    'footer.subscribe': 'Подпишитесь на нашу рассылку',
    'footer.subscribeDesc': 'Получайте последние обновления и новости',
    'footer.subscribeButton': 'Подписаться',
    'footer.subscribeSuccess': 'Спасибо за подписку!',

    // Chat assistant
    'chat.title': 'КиберАссистент',
    'chat.placeholder': 'Задайте вопрос...',
    'chat.send': 'Отправить',
    'chat.close': 'Закрыть',

    // Language
    'language.select': 'Выбрать язык',
    'language.switch': 'RU',

    // CTF Platform
    'ctf.backToCases': 'Назад к кейсам',
    'ctf.case': 'Кейс',
    'ctf.categories.web': 'Веб-безопасность',
    'ctf.categories.crypto': 'Криптография',
    'ctf.categories.osint': 'OSINT',
    'ctf.categories.steganography': 'Стеганография',
    'ctf.categories.reverseEngineering': 'Реверс-инжиниринг',
    'ctf.categories.forensics': 'Форензика',
    'ctf.categories.pwn': 'PWN',
    'ctf.categories.programming': 'Программирование',
    'ctf.categories.network': 'Сетевая безопасность',
    'ctf.flagFormat': 'Формат флага',
    'ctf.difficulty': 'Сложность',
    'ctf.difficultyLevels.beginner': 'Начальный',
    'ctf.difficultyLevels.intermediate': 'Средний',
    'ctf.difficultyLevels.advanced': 'Продвинутый',
    'ctf.difficultyLevels.expert': 'Эксперт',
    'ctf.skills': 'Навыки',
    'ctf.downloadFiles': 'Скачать файлы',
    'ctf.downloadArchiveHint': 'Архив содержит файлы, необходимые для решения задания',
    'ctf.deploymentInstructions': 'Инструкция по развертыванию',
    'ctf.challengeCompleted': 'Задание выполнено!',
    'ctf.congratulations': 'Поздравляем! Вы успешно решили задание и получили {points} очков.',
    'ctf.solutionTime': 'Время решения',
    'ctf.enterFlag': 'Введите флаг (например, {example})',
    'ctf.checking': 'Проверка...',
    'ctf.submitFlag': 'Отправить флаг',
    'ctf.challenge': 'Задание',
    'ctf.hints': 'Подсказки',
    'ctf.hintsHelp': 'Подсказки могут помочь вам в решении задания, но использование подсказок уменьшает количество получаемых очков.',
    'ctf.showHints': 'Показать подсказки',
    'ctf.hint': 'Подсказка',
    'ctf.nextHint': 'Следующая подсказка',
    'ctf.noMoreHints': 'Больше подсказок нет',
    'ctf.additionalResources': 'Дополнительные ресурсы',

    // Web Challenge
    'ctf.web.prepSystem': 'Подготовка системы',
    'ctf.web.ensureInstalled': 'Убедитесь, что установлены',
    'ctf.web.and': 'и',
    'ctf.web.launchCTF': 'Запуск CTF-окружения',
    'ctf.web.extractArchive': 'Распакуйте архив',
    'ctf.web.launchDocker': 'Запустите Docker-контейнер',
    'ctf.web.checkServer': 'Проверьте, что сервер работает',
    'ctf.web.openBrowser': 'Откройте в браузере',
    'ctf.web.skillWebAnalysis': 'Анализ веб-приложений (HTML, Cookies)',
    'ctf.web.skillJwt': 'Работа с JWT (JSON Web Tokens)',
    'ctf.web.skillCryptoExploit': 'Эксплуатация слабых криптографических секретов',
    'ctf.web.skillPythonAutomation': 'Использование Python для автоматизации атак',
    'ctf.web.phantomChallenge': 'Это задание требует эксплуатации уязвимости в реализации JWT веб-приложения Phantom Vault.',
    'ctf.web.yourTask': 'Ваши задачи',
    'ctf.web.task1': 'Проанализировать механизм аутентификации приложения',
    'ctf.web.task2': 'Выявить уязвимости в реализации JWT',
    'ctf.web.task3': 'Использовать уязвимость для получения доступа администратора',
    'ctf.web.task4': 'Извлечь флаг из панели администратора',
    'ctf.web.appFeatures': 'Функции приложения Phantom Vault',
    'ctf.web.feature1': 'Система входа и регистрации пользователей',
    'ctf.web.feature2': 'Защищенная панель пользователя',
    'ctf.web.feature3': 'Панель администратора с доступом к конфиденциальной информации',
    'ctf.web.findVulnerability': 'Найдите уязвимость в реализации JWT и используйте ее для доступа к панели администратора.',
    'ctf.web.jwtResources': 'Вот несколько полезных ресурсов для работы с JWT:',
    'ctf.web.jwtDecoderDebugger': 'JWT декодер и отладчик',
    'ctf.web.jwtTool': 'Инструмент для тестирования, подделки и манипуляции JWT',
    'ctf.web.jwtVulnerabilities': 'Распространенные уязвимости JWT и методы эксплуатации',
    'ctf.web.basicPythonScript': 'Базовый скрипт Python для работы с JWT:',

    // Knowledge base
    'knowledge.title': 'База знаний',
    'knowledge.description': 'Изучение концепций и методов кибербезопасности',

    // User profile
    'profile.title': 'Профиль',
    'profile.description': 'Просмотр и редактирование информации профиля',
  },
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // Load language preference from localStorage if available
    const savedLang = localStorage.getItem('language');
    return (savedLang === 'en' || savedLang === 'ru') ? savedLang : 'ru';
  });

  useEffect(() => {
    // Save language preference to localStorage
    localStorage.setItem('language', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    const translation = translations[language][key];
    if (!translation) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
