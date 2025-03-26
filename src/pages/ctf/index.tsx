
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Filter, 
  Search, 
  ArrowRight, 
  Trophy, 
  Code, 
  Cpu, 
  BookOpen, 
  Shield, 
  Clock, 
  Users 
} from 'lucide-react';
import { ChallengeCategory, Challenge } from '@/types';
import Navbar from '@/components/layout/Navbar';
import ChatAssistant from '@/components/layout/ChatAssistant';

// Mock CTF challenges data
const mockChallenges: Challenge[] = [
  {
    id: '1',
    title: 'Уязвимый веб-сайт',
    description: 'Найдите SQL-инъекцию на странице входа и получите доступ к учетной записи администратора.',
    category: 'web',
    difficulty: 'beginner',
    points: 100,
    tags: ['sql-injection', 'authentication'],
    solved: false,
    solvedBy: 156,
    createdAt: new Date('2023-05-15'),
    updatedAt: new Date('2023-05-15'),
  },
  {
    id: '2',
    title: 'Скрытое сообщение',
    description: 'Найдите скрытое сообщение в изображении, используя методы стеганографии.',
    category: 'steganography',
    difficulty: 'beginner',
    points: 150,
    tags: ['steganography', 'image'],
    solved: false,
    solvedBy: 124,
    createdAt: new Date('2023-06-10'),
    updatedAt: new Date('2023-06-10'),
  },
  {
    id: '3',
    title: 'Утечка данных CyberWhale: Тайна зашифрованного чата',
    description: 'Ваша команда по кибербезопасности расследует утечку данных из компании CyberWhale. Вам удалось перехватить логи чата, который, предположительно, содержит информацию об утечке. Сообщения в чате зашифрованы.',
    category: 'crypto',
    difficulty: 'beginner',
    points: 200,
    tags: ['cryptography', 'caesar-cipher'],
    solved: false,
    solvedBy: 87,
    createdAt: new Date('2023-07-05'),
    updatedAt: new Date('2023-07-05'),
  },
  {
    id: '4',
    title: 'Обратная разработка',
    description: 'Декомпилируйте и проанализируйте бинарный файл, чтобы найти ключ к продолжению задания.',
    category: 'reverse-engineering',
    difficulty: 'advanced',
    points: 300,
    tags: ['binary', 'decompilation'],
    solved: false,
    solvedBy: 45,
    createdAt: new Date('2023-08-20'),
    updatedAt: new Date('2023-08-20'),
  },
  {
    id: '5',
    title: 'Сетевая атака',
    description: 'Проанализируйте сетевой трафик и найдите следы атаки в pcap-файле.',
    category: 'network',
    difficulty: 'intermediate',
    points: 250,
    tags: ['pcap', 'wireshark'],
    solved: false,
    solvedBy: 63,
    createdAt: new Date('2023-09-10'),
    updatedAt: new Date('2023-09-10'),
  },
  {
    id: '6',
    title: 'Переполнение буфера',
    description: 'Используйте уязвимость переполнения буфера для выполнения произвольного кода.',
    category: 'pwn',
    difficulty: 'expert',
    points: 400,
    tags: ['buffer-overflow', 'exploitation'],
    solved: false,
    solvedBy: 32,
    createdAt: new Date('2023-10-05'),
    updatedAt: new Date('2023-10-05'),
  },
];

// Map categories to icons
const categoryIcons: Record<ChallengeCategory, React.ReactNode> = {
  web: <Code className="w-5 h-5" />,
  crypto: <Shield className="w-5 h-5" />,
  osint: <Search className="w-5 h-5" />,
  steganography: <Search className="w-5 h-5" />,
  'reverse-engineering': <Cpu className="w-5 h-5" />,
  forensics: <Search className="w-5 h-5" />,
  pwn: <Shield className="w-5 h-5" />,
  programming: <Code className="w-5 h-5" />,
  network: <Shield className="w-5 h-5" />,
};

// Map categories to display names
const categoryNames: Record<ChallengeCategory, string> = {
  web: 'Web',
  crypto: 'Криптография',
  osint: 'OSINT',
  steganography: 'Стеганография',
  'reverse-engineering': 'Реверс-инжиниринг',
  forensics: 'Форензика',
  pwn: 'PWN',
  programming: 'Программирование',
  network: 'Сетевая безопасность',
};

// Map difficulty to color classes
const difficultyColors: Record<Challenge['difficulty'], string> = {
  beginner: 'bg-green-500/20 text-green-500 border-green-500/30',
  intermediate: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30',
  advanced: 'bg-orange-500/20 text-orange-500 border-orange-500/30',
  expert: 'bg-red-500/20 text-red-500 border-red-500/30',
};

export default function CTFPlatform() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<ChallengeCategory | 'all'>('all');
  const [filterDifficulty, setFilterDifficulty] = useState<Challenge['difficulty'] | 'all'>('all');

  // Filter challenges based on search and filters
  const filteredChallenges = mockChallenges.filter(challenge => {
    // Apply search query filter
    const matchesSearch = 
      searchQuery === '' ||
      challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      challenge.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      challenge.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Apply category filter
    const matchesCategory = 
      filterCategory === 'all' || 
      challenge.category === filterCategory;
    
    // Apply difficulty filter
    const matchesDifficulty = 
      filterDifficulty === 'all' || 
      challenge.difficulty === filterDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  return (
    <div className="min-h-screen bg-cyberdark-900 flex flex-col">
      <Navbar />
      
      <div className="pt-20 flex-grow">
        {/* Hero section */}
        <div className="bg-cyberdark-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="md:flex md:items-center md:justify-between">
              <div className="md:w-2/3">
                <h1 className="text-3xl font-bold text-white sm:text-4xl">
                  <span className="block text-cyberblue-400">CTF ПЛАТФОРМА</span>
                  <span className="block mt-1">Проверьте свои навыки в реальных сценариях</span>
                </h1>
                <p className="mt-3 text-lg text-gray-300">
                  Наша CTF платформа предлагает разнообразные задания по кибербезопасности, от начального до продвинутого уровня. 
                  Решайте задачи, зарабатывайте очки и соревнуйтесь с другими участниками.
                </p>
                <div className="mt-6 flex">
                  <Link to="/ctf/challenges">
                    <Button className="bg-cyberblue-500 hover:bg-cyberblue-600">
                      Перейти к заданиям
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="hidden md:block md:w-1/3 mt-8 md:mt-0">
                <div className="bg-cyberdark-700 rounded-lg p-6 text-center border border-cyberdark-600">
                  <h3 className="text-xl font-semibold text-white mb-4">Статистика платформы</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-cyberdark-800 p-4 rounded-md">
                      <div className="text-2xl font-bold text-white">25+</div>
                      <div className="text-sm text-gray-400">Активных заданий</div>
                    </div>
                    <div className="bg-cyberdark-800 p-4 rounded-md">
                      <div className="text-2xl font-bold text-white">500+</div>
                      <div className="text-sm text-gray-400">Участников</div>
                    </div>
                    <div className="bg-cyberdark-800 p-4 rounded-md">
                      <div className="text-2xl font-bold text-white">8</div>
                      <div className="text-sm text-gray-400">Категорий</div>
                    </div>
                    <div className="bg-cyberdark-800 p-4 rounded-md">
                      <div className="text-2xl font-bold text-white">3</div>
                      <div className="text-sm text-gray-400">Уровня сложности</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="md:flex md:items-center md:justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">Capture The Flag</h2>
            <p className="mt-2 md:mt-0 text-gray-400">
              Наша CTF платформа предлагает разнообразные задания по кибербезопасности, от начального до продвинутого уровня. 
              Решайте задачи, зарабатывайте очки и соревнуйтесь с другими участниками.
            </p>
          </div>

          {/* Search and filter */}
          <div className="mb-8 space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between">
            <div className="flex-1 relative sm:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="search"
                placeholder="Поиск по заданиям..."
                className="pl-10 w-full bg-cyberdark-800 border-cyberdark-700"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex space-x-2">
              <div className="relative">
                <select
                  className="appearance-none bg-cyberdark-800 border border-cyberdark-700 text-white py-2 px-4 pr-8 rounded focus:outline-none focus:ring-1 focus:ring-cyberblue-500"
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value as ChallengeCategory | 'all')}
                >
                  <option value="all">Все категории</option>
                  <option value="web">Web</option>
                  <option value="crypto">Криптография</option>
                  <option value="osint">OSINT</option>
                  <option value="steganography">Стеганография</option>
                  <option value="reverse-engineering">Реверс-инжиниринг</option>
                  <option value="forensics">Форензика</option>
                  <option value="pwn">PWN</option>
                  <option value="programming">Программирование</option>
                  <option value="network">Сетевая безопасность</option>
                </select>
                <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
              
              <div className="relative">
                <select
                  className="appearance-none bg-cyberdark-800 border border-cyberdark-700 text-white py-2 px-4 pr-8 rounded focus:outline-none focus:ring-1 focus:ring-cyberblue-500"
                  value={filterDifficulty}
                  onChange={(e) => setFilterDifficulty(e.target.value as Challenge['difficulty'] | 'all')}
                >
                  <option value="all">Все уровни</option>
                  <option value="beginner">Начальный</option>
                  <option value="intermediate">Средний</option>
                  <option value="advanced">Продвинутый</option>
                  <option value="expert">Эксперт</option>
                </select>
                <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Challenges grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredChallenges.map((challenge) => (
              <div
                key={challenge.id}
                className="bg-cyberdark-800 rounded-lg overflow-hidden border border-cyberdark-700 hover:border-cyberblue-500/50 transition-all duration-300 hover:shadow-glow-sm"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="bg-cyberdark-700 rounded-full p-2">
                        {categoryIcons[challenge.category]}
                      </div>
                      <span className="text-sm font-medium text-gray-300">
                        {categoryNames[challenge.category]}
                      </span>
                    </div>
                    <div className={`text-xs font-medium px-2 py-1 rounded-full border ${difficultyColors[challenge.difficulty]}`}>
                      {challenge.difficulty === 'beginner' && 'Начальный'}
                      {challenge.difficulty === 'intermediate' && 'Средний'}
                      {challenge.difficulty === 'advanced' && 'Продвинутый'}
                      {challenge.difficulty === 'expert' && 'Эксперт'}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2">{challenge.title}</h3>
                  
                  <p className="text-gray-300 mb-6 line-clamp-3">
                    {challenge.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-gray-400">
                        <Trophy className="w-4 h-4 mr-1" />
                        <span className="text-sm">{challenge.points} очков</span>
                      </div>
                      <div className="flex items-center text-gray-400">
                        <Users className="w-4 h-4 mr-1" />
                        <span className="text-sm">{challenge.solvedBy} решили</span>
                      </div>
                    </div>
                    
                    <Link to={`/ctf/challenge/${challenge.id}`}>
                      <Button variant="outline" size="sm">
                        Решить
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Features section */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-cyberdark-800 rounded-lg p-6 border border-cyberdark-700">
              <div className="bg-cyberdark-700 inline-flex items-center justify-center p-3 rounded-lg mb-4">
                <Code className="h-6 w-6 text-cyberblue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Практические навыки</h3>
              <p className="text-gray-300">
                Развивайте практические навыки кибербезопасности в безопасной среде с реалистичными сценариями.
              </p>
            </div>
            
            <div className="bg-cyberdark-800 rounded-lg p-6 border border-cyberdark-700">
              <div className="bg-cyberdark-700 inline-flex items-center justify-center p-3 rounded-lg mb-4">
                <Trophy className="h-6 w-6 text-cyberblue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Соревнования</h3>
              <p className="text-gray-300">
                Участвуйте в регулярных соревнованиях, сравнивайте свои результаты с другими и выигрывайте призы.
              </p>
            </div>
            
            <div className="bg-cyberdark-800 rounded-lg p-6 border border-cyberdark-700">
              <div className="bg-cyberdark-700 inline-flex items-center justify-center p-3 rounded-lg mb-4">
                <BookOpen className="h-6 w-6 text-cyberblue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Обучение</h3>
              <p className="text-gray-300">
                Изучайте новые концепции и техники кибербезопасности через практические задания и подробные разборы.
              </p>
            </div>
          </div>

          {/* Upcoming competition */}
          <div className="mt-16 bg-gradient-to-r from-cyberdark-800 to-cyberdark-900 rounded-lg overflow-hidden border border-cyberdark-700">
            <div className="md:flex">
              <div className="p-8 md:w-2/3">
                <div className="flex items-center mb-4">
                  <Clock className="h-5 w-5 text-cyberblue-400 mr-2" />
                  <span className="text-sm font-medium text-cyberblue-400">Следующая неделя, 18:00 МСК</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">CTF Соревнование</h3>
                <p className="text-gray-300 mb-6">
                  Примите участие в нашем ежемесячном CTF соревновании. Решайте уникальные задачи, соревнуйтесь с другими участниками и выигрывайте ценные призы. Подходит для всех уровней подготовки.
                </p>
                <Button className="bg-cyberblue-500 hover:bg-cyberblue-600">
                  Зарегистрироваться
                </Button>
              </div>
              <div className="md:w-1/3 bg-cyberdark-700 flex items-center justify-center p-8">
                <div className="text-center">
                  <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-white mb-2">1-е место</h4>
                  <p className="text-gray-300">5000 очков + VIP доступ на 1 месяц</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ChatAssistant />
    </div>
  );
}
