
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  BookOpen, 
  Shield, 
  Code, 
  Database, 
  Terminal, 
  Server, 
  AlertTriangle,
  ArrowRight,
  Clock,
  User,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Article } from '@/types';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ChatAssistant from '@/components/layout/ChatAssistant';

// Mock articles data
const mockArticles: Article[] = [
  {
    id: '1',
    title: 'Wireshark',
    description: 'Мощный анализатор сетевого трафика для исследования сетевых протоколов и пакетов.',
    content: '',
    category: 'tools',
    tags: ['network', 'traffic', 'security'],
    level: 'beginner',
    author: 'Сергей Иванов',
    readTime: 8,
    createdAt: new Date('2023-07-15'),
    updatedAt: new Date('2023-07-15'),
  },
  {
    id: '2',
    title: 'Настройка Kali Linux',
    description: 'Пошаговое руководство по настройке и оптимизации Kali Linux для тестирования на проникновение.',
    content: '',
    category: 'guides',
    tags: ['linux', 'security', 'setup'],
    level: 'beginner',
    author: 'Алексей Петров',
    readTime: 12,
    createdAt: new Date('2023-08-10'),
    updatedAt: new Date('2023-08-10'),
  },
  {
    id: '3',
    title: 'Основы криптографии',
    description: 'Базовый курс по криптографии и ее применению в информационной безопасности.',
    content: '',
    category: 'courses',
    tags: ['cryptography', 'security', 'theory'],
    level: 'beginner',
    author: 'Мария Сидорова',
    readTime: 15,
    createdAt: new Date('2023-06-25'),
    updatedAt: new Date('2023-06-25'),
  },
  {
    id: '4',
    title: 'Веб-уязвимости',
    description: 'Практическая лаборатория по поиску и эксплуатации веб-уязвимостей.',
    content: '',
    category: 'labs',
    tags: ['web', 'vulnerabilities', 'practice'],
    level: 'intermediate',
    author: 'Дмитрий Козлов',
    readTime: 10,
    createdAt: new Date('2023-09-05'),
    updatedAt: new Date('2023-09-05'),
  },
  {
    id: '5',
    title: 'Nmap',
    description: 'Сканер безопасности сети для обнаружения хостов и сервисов в компьютерной сети.',
    content: '',
    category: 'tools',
    tags: ['scanning', 'network', 'security'],
    level: 'beginner',
    author: 'Андрей Смирнов',
    readTime: 7,
    createdAt: new Date('2023-10-12'),
    updatedAt: new Date('2023-10-12'),
  },
  {
    id: '6',
    title: 'Реверс-инжиниринг',
    description: 'Курс по анализу и исследованию программного обеспечения.',
    content: '',
    category: 'courses',
    tags: ['analysis', 'security', 'development'],
    level: 'advanced',
    author: 'Ольга Новикова',
    readTime: 18,
    createdAt: new Date('2023-05-20'),
    updatedAt: new Date('2023-05-20'),
  },
];

// Define category icons
const categoryIcons = {
  tools: <Terminal className="w-5 h-5" />,
  guides: <BookOpen className="w-5 h-5" />,
  courses: <Shield className="w-5 h-5" />,
  labs: <Code className="w-5 h-5" />,
};

// Define level colors
const levelColors = {
  beginner: 'bg-green-500/20 text-green-400 border-green-500/30',
  intermediate: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  advanced: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
};

// Define level labels
const levelLabels = {
  beginner: 'Начинающий',
  intermediate: 'Средний',
  advanced: 'Продвинутый',
};

export default function KnowledgeBase() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterLevel, setFilterLevel] = useState<Article['level'] | 'all'>('all');

  // Filter articles based on search and filters
  const filteredArticles = mockArticles.filter(article => {
    // Apply search query filter
    const matchesSearch = 
      searchQuery === '' ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Apply category filter
    const matchesCategory = 
      filterCategory === 'all' || 
      article.category === filterCategory;
    
    // Apply level filter
    const matchesLevel = 
      filterLevel === 'all' || 
      article.level === filterLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <div className="min-h-screen bg-cyberdark-900 flex flex-col">
      <Navbar />
      
      <div className="pt-20 flex-grow">
        {/* Hero section */}
        <div className="bg-gradient-to-b from-cyberdark-800 to-cyberdark-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-3xl font-bold text-white sm:text-4xl">
                База знаний CyberWhale
              </h1>
              <p className="mt-4 text-lg text-gray-300">
                Всё необходимое для вашего развития в кибербезопасности
              </p>
              
              <div className="mt-8 max-w-xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Поиск по базе знаний..."
                    className="pl-10 w-full bg-cyberdark-700 border-cyberdark-600"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Filters */}
          <div className="mb-8 flex flex-wrap gap-4 items-center justify-between">
            <Tabs defaultValue="all" onValueChange={(value) => setFilterCategory(value)}>
              <TabsList className="bg-cyberdark-800">
                <TabsTrigger value="all">Все</TabsTrigger>
                <TabsTrigger value="tools">Инструменты</TabsTrigger>
                <TabsTrigger value="guides">Руководства</TabsTrigger>
                <TabsTrigger value="courses">Курсы</TabsTrigger>
                <TabsTrigger value="labs">Лаборатории</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="relative">
              <select
                className="appearance-none bg-cyberdark-800 border border-cyberdark-700 text-white py-2 px-4 pr-8 rounded focus:outline-none focus:ring-1 focus:ring-cyberblue-500"
                value={filterLevel}
                onChange={(e) => setFilterLevel(e.target.value as Article['level'] | 'all')}
              >
                <option value="all">Все уровни</option>
                <option value="beginner">Начинающий</option>
                <option value="intermediate">Средний</option>
                <option value="advanced">Продвинутый</option>
              </select>
              <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Featured article */}
          <div className="mb-12 bg-gradient-to-r from-cyberdark-800 to-cyberdark-900/70 rounded-xl overflow-hidden border border-cyberdark-700">
            <div className="md:flex">
              <div className="md:w-3/5 p-8">
                <div className="flex items-center space-x-2 mb-4">
                  <Badge variant="outline" className="bg-cyberdark-700 border-cyberdark-600">
                    Рекомендовано
                  </Badge>
                  <Badge variant="outline" className={levelColors.beginner}>
                    Начинающий
                  </Badge>
                </div>
                
                <h2 className="text-2xl font-bold text-white mb-3">
                  Вводный курс по кибербезопасности
                </h2>
                
                <p className="text-gray-300 mb-6">
                  Полное руководство для начинающих, которое поможет вам понять основы 
                  кибербезопасности, ключевые концепции и технологии. Идеально подходит для тех, 
                  кто только начинает свой путь в этой области.
                </p>
                
                <div className="flex items-center space-x-4 text-sm text-gray-400 mb-6">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    <span>Алексей Петров</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>20 минут чтения</span>
                  </div>
                </div>
                
                <Link to="/knowledge/intro-cybersecurity">
                  <Button className="bg-cyberblue-500 hover:bg-cyberblue-600">
                    Читать статью
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
              
              <div className="md:w-2/5 bg-cyberdark-700 flex items-center justify-center p-8">
                <div className="text-center">
                  <Shield className="h-20 w-20 text-cyberblue-500 mx-auto mb-4" />
                  <p className="text-white font-medium">Начните свой путь в кибербезопасности!</p>
                </div>
              </div>
            </div>
          </div>

          {/* Articles grid */}
          <h2 className="text-2xl font-bold text-white mb-6">Последние материалы</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                className="bg-cyberdark-800 rounded-lg overflow-hidden border border-cyberdark-700 hover:border-cyberblue-500/50 transition-all duration-300 hover:shadow-glow-sm"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="bg-cyberdark-700 rounded-full p-2">
                        {categoryIcons[article.category as keyof typeof categoryIcons]}
                      </div>
                      <span className="text-sm font-medium text-gray-300">
                        {article.category === 'tools' && 'Инструмент'}
                        {article.category === 'guides' && 'Руководство'}
                        {article.category === 'courses' && 'Курс'}
                        {article.category === 'labs' && 'Лаборатория'}
                      </span>
                    </div>
                    <div className={`text-xs font-medium px-2 py-1 rounded-full border ${levelColors[article.level]}`}>
                      {levelLabels[article.level]}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2">{article.title}</h3>
                  
                  <p className="text-gray-300 mb-6 line-clamp-3">
                    {article.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-gray-400 text-sm">
                      <Clock className="w-4 h-4" />
                      <span>{article.readTime} мин чтения</span>
                    </div>
                    
                    <Link to={`/knowledge/article/${article.id}`}>
                      <Button variant="outline" size="sm">
                        Подробнее
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Learning paths section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-white mb-8">
              Ваш путь к мастерству
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-cyberdark-800 rounded-lg p-6 border border-cyberdark-700">
                <div className="bg-cyberdark-700 inline-flex items-center justify-center p-3 rounded-full mb-4">
                  <Shield className="h-6 w-6 text-cyberblue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Для начинающих</h3>
                <p className="text-gray-300 mb-6">
                  Основы кибербезопасности, ключевые концепции и базовые навыки для тех, кто только начинает свой путь.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-gray-300">
                    <div className="w-2 h-2 bg-cyberblue-500 rounded-full mr-2"></div>
                    Основы сетевой безопасности
                  </li>
                  <li className="flex items-center text-gray-300">
                    <div className="w-2 h-2 bg-cyberblue-500 rounded-full mr-2"></div>
                    Введение в криптографию
                  </li>
                  <li className="flex items-center text-gray-300">
                    <div className="w-2 h-2 bg-cyberblue-500 rounded-full mr-2"></div>
                    Основы веб-безопасности
                  </li>
                </ul>
                <Link to="/knowledge/beginner-path">
                  <Button variant="outline" className="w-full">
                    Начать путь
                  </Button>
                </Link>
              </div>
              
              <div className="bg-cyberdark-800 rounded-lg p-6 border border-cyberdark-700">
                <div className="bg-cyberdark-700 inline-flex items-center justify-center p-3 rounded-full mb-4">
                  <Code className="h-6 w-6 text-cyberblue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Для практиков</h3>
                <p className="text-gray-300 mb-6">
                  Практические навыки и инструменты для тех, кто уже имеет базовые знания и хочет углубиться в практику.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-gray-300">
                    <div className="w-2 h-2 bg-cyberblue-500 rounded-full mr-2"></div>
                    Тестирование на проникновение
                  </li>
                  <li className="flex items-center text-gray-300">
                    <div className="w-2 h-2 bg-cyberblue-500 rounded-full mr-2"></div>
                    Анализ уязвимостей
                  </li>
                  <li className="flex items-center text-gray-300">
                    <div className="w-2 h-2 bg-cyberblue-500 rounded-full mr-2"></div>
                    Безопасная разработка
                  </li>
                </ul>
                <Link to="/knowledge/practitioner-path">
                  <Button variant="outline" className="w-full">
                    Начать путь
                  </Button>
                </Link>
              </div>
              
              <div className="bg-cyberdark-800 rounded-lg p-6 border border-cyberdark-700">
                <div className="bg-cyberdark-700 inline-flex items-center justify-center p-3 rounded-full mb-4">
                  <Database className="h-6 w-6 text-cyberblue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Для экспертов</h3>
                <p className="text-gray-300 mb-6">
                  Продвинутые концепции, исследования и методы для специалистов, стремящихся к высшему мастерству.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-gray-300">
                    <div className="w-2 h-2 bg-cyberblue-500 rounded-full mr-2"></div>
                    Обратная разработка
                  </li>
                  <li className="flex items-center text-gray-300">
                    <div className="w-2 h-2 bg-cyberblue-500 rounded-full mr-2"></div>
                    Эксплуатация уязвимостей
                  </li>
                  <li className="flex items-center text-gray-300">
                    <div className="w-2 h-2 bg-cyberblue-500 rounded-full mr-2"></div>
                    Криптография и исследования
                  </li>
                </ul>
                <Link to="/knowledge/expert-path">
                  <Button variant="outline" className="w-full">
                    Начать путь
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Laboratory section */}
          <div className="mt-16 bg-gradient-to-r from-cyberdark-800 to-cyberdark-900 rounded-lg overflow-hidden border border-cyberdark-700">
            <div className="md:flex">
              <div className="md:w-2/3 p-8">
                <h2 className="text-2xl font-bold text-white mb-4">Лабораторные работы</h2>
                <p className="text-gray-300 mb-6">
                  Практические задания в виртуальных лабораториях для отработки навыков. 
                  Решайте реальные сценарии безопасности и применяйте полученные знания на практике.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-cyberdark-700/50 p-4 rounded-lg">
                    <h3 className="font-medium text-white mb-2">Веб-безопасность</h3>
                    <p className="text-gray-300 text-sm">
                      Практика обнаружения и эксплуатации уязвимостей веб-приложений.
                    </p>
                  </div>
                  <div className="bg-cyberdark-700/50 p-4 rounded-lg">
                    <h3 className="font-medium text-white mb-2">Сетевая безопасность</h3>
                    <p className="text-gray-300 text-sm">
                      Анализ и защита сетевой инфраструктуры от атак.
                    </p>
                  </div>
                </div>
                <Link to="/knowledge/labs">
                  <Button className="bg-cyberblue-500 hover:bg-cyberblue-600">
                    Перейти в лаборатории
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
              <div className="md:w-1/3 bg-cyberdark-700 flex items-center justify-center p-8">
                <Server className="h-24 w-24 text-cyberblue-500" />
              </div>
            </div>
          </div>

          {/* Security news */}
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white">Новости безопасности</h2>
              <Link to="/knowledge/news" className="text-cyberblue-500 hover:text-cyberblue-400 flex items-center">
                Все новости
                <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-cyberdark-800 rounded-lg overflow-hidden border border-cyberdark-700">
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                    <span className="text-sm font-medium text-red-500">Критическая уязвимость</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    Обнаружена новая zero-day уязвимость в популярном веб-сервере
                  </h3>
                  <p className="text-gray-300 mb-4 line-clamp-3">
                    Исследователи обнаружили критическую уязвимость в Apache, которая позволяет 
                    удаленно выполнять код. Рекомендуется срочное обновление.
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">2 дня назад</span>
                    <Link to="/knowledge/news/1" className="text-cyberblue-500 hover:text-cyberblue-400">
                      Подробнее
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="bg-cyberdark-800 rounded-lg overflow-hidden border border-cyberdark-700">
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Shield className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium text-green-500">Обновление безопасности</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    Microsoft выпустила патчи для 87 уязвимостей в июльском обновлении
                  </h3>
                  <p className="text-gray-300 mb-4 line-clamp-3">
                    Ежемесячное обновление включает исправления для Windows, Office, Exchange и других продуктов.
                    13 уязвимостей классифицированы как критические.
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">5 дней назад</span>
                    <Link to="/knowledge/news/2" className="text-cyberblue-500 hover:text-cyberblue-400">
                      Подробнее
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="bg-cyberdark-800 rounded-lg overflow-hidden border border-cyberdark-700">
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Server className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-medium text-yellow-500">Исследование</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    Новое исследование показывает рост атак на цепочки поставок
                  </h3>
                  <p className="text-gray-300 mb-4 line-clamp-3">
                    Отчет показывает увеличение на 300% числа атак, нацеленных на компоненты программного 
                    обеспечения и цепочки поставок за последний год.
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">1 неделю назад</span>
                    <Link to="/knowledge/news/3" className="text-cyberblue-500 hover:text-cyberblue-400">
                      Подробнее
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <ChatAssistant />
    </div>
  );
}
