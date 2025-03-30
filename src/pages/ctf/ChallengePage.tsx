
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  ArrowLeft, 
  Trophy, 
  Clock, 
  AlertCircle, 
  CheckCircle, 
  Flag,
  Users,
  ShieldAlert,
  Lightbulb
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import ChatAssistant from '@/components/layout/ChatAssistant';
import { useAuth } from '@/lib/auth';
import { toast } from '@/hooks/use-toast';
import { mockChallenges } from '@/data/challenges';

// Подсказки для заданий
const challengeHints: Record<string, string[]> = {
  '1': [
    'Проверьте поля формы входа на наличие уязвимостей SQL-инъекции',
    'Попробуйте использовать одинарные кавычки и логические операторы в поле username',
    'Классическая инъекция: admin\' OR \'1\'=\'1'
  ],
  '2': [
    'Изучите метаданные изображения с помощью специальных инструментов',
    'Проверьте наличие скрытой информации в младших битах изображения (LSB стеганография)',
    'Попробуйте изменить контрастность или цветовые каналы изображения'
  ],
  '3': [
    'Обратите внимание на подсказку о "названии команды" (CyberWhale) и цикличности алфавита',
    'Подсчитайте сумму позиций букв в названии CyberWhale в английском алфавите',
    'Помните, что шифр Цезаря использует циклический сдвиг букв алфавита'
  ],
  '4': [
    'Используйте декомпилятор для анализа бинарного файла',
    'Обратите внимание на строковые константы в коде',
    'Проверьте функции проверки ввода пользователя'
  ],
  '5': [
    'Используйте Wireshark для анализа pcap-файла',
    'Обратите внимание на необычные HTTP-запросы',
    'Проверьте заголовки пакетов на наличие скрытой информации'
  ],
  '6': [
    'Проанализируйте входные данные, которые приводят к переполнению буфера',
    'Найдите адрес возврата функции в памяти',
    'Подготовьте payload с шеллкодом для выполнения'
  ]
};

// Флаги для заданий (в реальном приложении они должны храниться на сервере)
const challengeFlags: Record<string, string> = {
  '1': 'CW{SQLi_M4st3r}',
  '2': 'CW{H1dd3n_1n_pl41n_s1ght}',
  '3': 'CW{SecretFound}',
  '4': 'CW{R3v3rs1ng_Ch4mp}',
  '5': 'CW{P4ck3t_4n4lyst}',
  '6': 'CW{Buff3r_0v3rfl0w_pr0}',
};

export default function ChallengePage() {
  const { id } = useParams<{ id: string }>();
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [flagInput, setFlagInput] = useState('');
  const [showHints, setShowHints] = useState(false);
  const [currentHint, setCurrentHint] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [solved, setSolved] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);

  // Найти текущее задание
  const challenge = mockChallenges.find(c => c.id === id);
  
  // Доступные подсказки для текущего задания
  const hints = id ? challengeHints[id] || [] : [];

  useEffect(() => {
    // Если пользователь не авторизован и загрузка завершена, перенаправляем на страницу входа
    if (!isLoading && !user) {
      toast({
        title: "Требуется авторизация",
        description: "Для доступа к заданиям необходимо войти в систему",
        variant: "destructive",
      });
      navigate('/login?returnUrl=/ctf/challenge/' + id);
    }
  }, [user, isLoading, navigate, id]);

  useEffect(() => {
    // Запускаем таймер при открытии страницы
    if (user && !startTime && !solved) {
      const now = new Date();
      setStartTime(now);
      
      const interval = setInterval(() => {
        const currentTime = new Date();
        const elapsed = Math.floor((currentTime.getTime() - now.getTime()) / 1000);
        setElapsedTime(elapsed);
      }, 1000);
      
      setTimerInterval(interval);
    }
    
    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [user, startTime, solved, timerInterval]);

  // Форматирование времени в формат MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleSubmitFlag = () => {
    if (!flagInput.trim()) {
      toast({
        title: "Пустое поле",
        description: "Введите флаг перед отправкой",
        variant: "destructive",
      });
      return;
    }
    
    setSubmitting(true);
    
    // Имитация отправки на сервер
    setTimeout(() => {
      const correctFlag = id ? challengeFlags[id] : '';
      
      if (flagInput.trim() === correctFlag) {
        // Останавливаем таймер
        if (timerInterval) {
          clearInterval(timerInterval);
        }
        
        setSolved(true);
        toast({
          title: "Поздравляем!",
          description: "Вы успешно решили задание!",
          variant: "default",
        });
      } else {
        toast({
          title: "Неверный флаг",
          description: "Попробуйте еще раз",
          variant: "destructive",
        });
      }
      
      setSubmitting(false);
    }, 1000);
  };

  const handleNextHint = () => {
    if (currentHint < hints.length - 1) {
      setCurrentHint(prev => prev + 1);
      
      toast({
        title: "Новая подсказка",
        description: "Подсказка разблокирована!",
      });
    } else {
      toast({
        title: "Подсказки исчерпаны",
        description: "Больше подсказок нет, попробуйте решить задание",
        variant: "default",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cyberdark-900 flex flex-col">
        <Navbar />
        <div className="pt-20 flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyberblue-500"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Не показываем содержимое до перенаправления
  }

  if (!challenge) {
    return (
      <div className="min-h-screen bg-cyberdark-900 flex flex-col">
        <Navbar />
        <div className="pt-20 flex-grow">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-white mb-4">Задание не найдено</h1>
            <p className="text-gray-300 mb-8">Запрашиваемое задание не существует или было удалено</p>
            <Link to="/ctf">
              <Button>
                <ArrowLeft className="mr-2 w-4 h-4" />
                Вернуться на CTF платформу
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cyberdark-900 flex flex-col">
      <Navbar />
      
      <div className="pt-20 flex-grow">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Навигация */}
          <div className="mb-6">
            <Link to={`/ctf/category/${challenge.category}`} className="text-cyberblue-400 hover:text-cyberblue-300 flex items-center">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Назад к кейсам
            </Link>
          </div>
          
          {/* Header */}
          <div className="bg-cyberdark-800 rounded-lg p-6 border border-cyberdark-700 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <div className="bg-cyberdark-700 text-cyberblue-400 text-xs font-medium px-2.5 py-0.5 rounded">
                    Кейс #{challenge.id}
                  </div>
                  <div className="bg-cyberdark-700 text-gray-300 text-xs font-medium px-2.5 py-0.5 rounded">
                    {challenge.category === 'web' && 'Веб-безопасность'}
                    {challenge.category === 'crypto' && 'Криптография'}
                    {challenge.category === 'osint' && 'OSINT'}
                    {challenge.category === 'steganography' && 'Стеганография'}
                    {challenge.category === 'reverse-engineering' && 'Реверс-инжиниринг'}
                    {challenge.category === 'forensics' && 'Форензика'}
                    {challenge.category === 'pwn' && 'PWN'}
                    {challenge.category === 'programming' && 'Программирование'}
                    {challenge.category === 'network' && 'Сетевая безопасность'}
                  </div>
                </div>
                <h1 className="text-2xl font-bold text-white">{challenge.title}</h1>
              </div>
              
              <div className="mt-4 md:mt-0 flex flex-col items-end">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="flex items-center text-gray-400">
                    <Users className="w-4 h-4 mr-1" />
                    <span className="text-sm">{challenge.solvedBy} решили</span>
                  </div>
                  <div className="flex items-center text-yellow-500">
                    <Trophy className="w-4 h-4 mr-1" />
                    <span className="text-sm">{challenge.points} очков</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className={`text-xs font-medium px-2 py-1 rounded-full border
                    ${challenge.difficulty === 'beginner' ? 'bg-green-500/20 text-green-500 border-green-500/30' : ''}
                    ${challenge.difficulty === 'intermediate' ? 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30' : ''}
                    ${challenge.difficulty === 'advanced' ? 'bg-orange-500/20 text-orange-500 border-orange-500/30' : ''}
                    ${challenge.difficulty === 'expert' ? 'bg-red-500/20 text-red-500 border-red-500/30' : ''}
                  `}>
                    {challenge.difficulty === 'beginner' && 'Начальный'}
                    {challenge.difficulty === 'intermediate' && 'Средний'}
                    {challenge.difficulty === 'advanced' && 'Продвинутый'}
                    {challenge.difficulty === 'expert' && 'Эксперт'}
                  </div>
                  
                  <div className="bg-cyberdark-700 text-gray-300 text-xs font-medium px-2.5 py-0.5 rounded flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {formatTime(elapsedTime)}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              {challenge.tags.map((tag) => (
                <span key={tag} className="inline-block bg-cyberdark-700 text-gray-300 text-xs px-2.5 py-0.5 rounded mr-2 mb-2">
                  #{tag}
                </span>
              ))}
            </div>
            
            <div className="bg-cyberdark-700 p-4 rounded-md mb-6 text-gray-300">
              <p>{challenge.description}</p>
              
              {challenge.id === '3' && (
                <>
                  <p className="mt-4">В зашифрованных сообщениях один из участников оставил подсказку: "Ключ — в нашей команде, точнее, в её имени. Помни, что алфавит цикличен."</p>
                  <p className="mt-4">Перехваченное сообщение:<br />
                  <code className="bg-cyberdark-800 px-2 py-1 rounded font-mono text-cyan-400">{"Khoor#Zruog#43#Fkdw#lv#khuh1#Fkhhuv2#CW{HvsdqbVhfuhw}"}</code></p>
                  <p className="mt-4">Цель: Расшифровать перехваченное сообщение, используя подсказку, и найти флаг в формате CW{"{...}"}.</p>
                </>
              )}
            </div>
            
            {solved && (
              <div className="bg-green-900/20 border border-green-700 rounded-md p-4 mb-6 flex items-start">
                <CheckCircle className="text-green-500 w-5 h-5 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-green-500 font-semibold mb-1">Задание выполнено!</h3>
                  <p className="text-gray-300">Поздравляем! Вы успешно решили задание и получили {challenge.points} очков.</p>
                  <p className="text-gray-400 text-sm mt-2">Время решения: {formatTime(elapsedTime)}</p>
                </div>
              </div>
            )}
            
            {!solved && (
              <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
                <div className="flex-1 relative">
                  <Input
                    type="text"
                    placeholder="Введите флаг (например, CW{'{fl4g_h3r3}'})"
                    className="bg-cyberdark-700 border-cyberdark-600 pl-10"
                    value={flagInput}
                    onChange={(e) => setFlagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSubmitFlag();
                      }
                    }}
                  />
                  <Flag className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
                <Button 
                  disabled={submitting}
                  onClick={handleSubmitFlag}
                >
                  {submitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Проверка...
                    </>
                  ) : (
                    "Отправить флаг"
                  )}
                </Button>
              </div>
            )}
          </div>
          
          {/* Содержимое задания и подсказки */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="bg-cyberdark-800 rounded-lg p-6 border border-cyberdark-700 mb-6">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                  <ShieldAlert className="w-5 h-5 mr-2 text-cyberblue-400" />
                  Задание
                </h2>
                
                <div className="bg-cyberdark-700 p-4 rounded-md text-gray-300">
                  <p className="mb-4">Это задание требует применения знаний в области {
                    challenge.category === 'web' ? 'веб-безопасности' :
                    challenge.category === 'crypto' ? 'криптографии' :
                    challenge.category === 'osint' ? 'OSINT' :
                    challenge.category === 'steganography' ? 'стеганографии' :
                    challenge.category === 'reverse-engineering' ? 'реверс-инжиниринга' :
                    challenge.category === 'forensics' ? 'форензики' :
                    challenge.category === 'pwn' ? 'PWN' :
                    challenge.category === 'programming' ? 'программирования' :
                    'сетевой безопасности'
                  }.</p>
                  
                  {challenge.id === '3' && (
                    <>
                      <p>Для решения этого задания вам потребуется:</p>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Проанализировать подсказку о ключе и "цикличности алфавита"</li>
                        <li>Определить метод шифрования на основе подсказок</li>
                        <li>Расшифровать перехваченное сообщение</li>
                        <li>Найти флаг в формате CW{"{...}"}</li>
                      </ul>
                      
                      <div className="mt-4 p-4 bg-cyberdark-800 rounded-md">
                        <p className="text-sm text-gray-400 mb-2">Перехваченное сообщение:</p>
                        <code className="font-mono text-cyan-400 break-all">{"Khoor#Zruog#43#Fkdw#lv#khuh1#Fkhhuv2#CW{HvsdqbVhfuhw}"}</code>
                      </div>
                    </>
                  )}
                </div>
              </div>
              
              {/* Дополнительные материалы (если есть) */}
              {challenge.id === '3' && (
                <div className="bg-cyberdark-800 rounded-lg p-6 border border-cyberdark-700">
                  <h2 className="text-xl font-bold text-white mb-4">Дополнительная информация</h2>
                  
                  <div className="bg-cyberdark-700 p-4 rounded-md text-gray-300">
                    <p>В криптографии существует множество классических шифров замены, включая:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Шифр Цезаря - сдвиг каждой буквы на фиксированное число позиций</li>
                      <li>Шифр Виженера - использование ключевого слова для определения сдвига каждой буквы</li>
                      <li>Шифр замены - замена каждой буквы на другую по заданной таблице</li>
                    </ul>
                    
                    <p className="mt-4">Помните, что "алфавит цикличен" означает, что после последней буквы алфавита (Z) идет первая (A).</p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Подсказки */}
            <div className="md:col-span-1">
              <div className="bg-cyberdark-800 rounded-lg p-6 border border-cyberdark-700 sticky top-24">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                  <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
                  Подсказки
                </h2>
                
                {!showHints ? (
                  <div className="text-center py-6">
                    <p className="text-gray-400 mb-4">Подсказки могут помочь вам в решении задания, но использование подсказок уменьшает количество получаемых очков.</p>
                    <Button 
                      variant="outline" 
                      onClick={() => setShowHints(true)}
                    >
                      Показать подсказки
                    </Button>
                  </div>
                ) : (
                  <div>
                    {hints.slice(0, currentHint + 1).map((hint, index) => (
                      <div 
                        key={index}
                        className="bg-cyberdark-700 p-3 rounded-md mb-3 text-gray-300 text-sm"
                      >
                        <p className="text-xs text-gray-400 mb-1">Подсказка {index + 1}</p>
                        <p>{hint}</p>
                      </div>
                    ))}
                    
                    {currentHint < hints.length - 1 && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={handleNextHint}
                      >
                        Следующая подсказка
                      </Button>
                    )}
                    
                    {currentHint === hints.length - 1 && hints.length > 0 && (
                      <p className="text-xs text-gray-400 text-center mt-2">Больше подсказок нет</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ChatAssistant />
    </div>
  );
}
