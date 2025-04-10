
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
  Lightbulb,
  Download,
  Terminal,
  Code,
  Bot
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import ChatAssistant from '@/components/layout/ChatAssistant';
import { useAuth } from '@/lib/auth';
import { useLanguage } from '@/lib/i18n/context';
import { toast } from '@/hooks/use-toast';
import { mockChallenges } from '@/data/challenges';

const challengeHints: Record<string, string[]> = {
  '1': [
    'Изучите, как формируется и проверяется JWT токен в приложении',
    'Обратите внимание на секрет, используемый для подписи токенов',
    'Попробуйте перехватить и декодировать существующий токен'
  ],
  '2': [
    'Изучите метаданные изображения с помощью специальных инструментов',
    'Проверьте наличие скрытой информации в младших битах изображения (LSB стеганография)',
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
  ],
  '7': [
    'Внимательно изучите подсказку в файле hint.txt о комбинации названия компании и цифры',
    'Для вычисления ASCII-значений букв можно использовать таблицу ASCII или функции языков программирования',
    'После распаковки архива, обратите внимание на формат зашифрованных данных - это может быть Base64 с AES-шифрованием'
  ],
  '8': [
    'Начните с анализа заметок в notes.txt, они могут содержать ключи или подсказки',
    'Проверьте сетевой трафик с помощью Wireshark, ищите необычные пакеты или закономерности',
    'Для работы с зашифрованным изображением может потребоваться использовать инструменты стеганографии'
  ]
};

const challengeFlags: Record<string, string> = {
  '1': 'CTF{JWT_s3cr3t_t00_w34k}',
  '2': 'CW{H1dd3n_1n_pl41n_s1ght}',
  '3': 'CW{SecretFound}',
  '4': 'CW{R3v3rs1ng_Ch4mp}',
  '5': 'CW{P4ck3t_4n4lyst}',
  '6': 'CW{Buff3r_0v3rfl0w_pr0}',
  '7': 'CW{HiddenInPlainSight}',
  '8': 'CW{Caesar_AES_Stego}',
};

export default function ChallengePage() {
  const { id } = useParams<{ id: string }>();
  const { user, isLoading } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [flagInput, setFlagInput] = useState('');
  const [showHints, setShowHints] = useState(false);
  const [currentHint, setCurrentHint] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [solved, setSolved] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);

  const challenge = mockChallenges.find(c => c.id === id);
  
  const hints = id ? challengeHints[id] || [] : [];

  useEffect(() => {
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
    
    setTimeout(() => {
      const correctFlag = id ? challengeFlags[id] : '';
      
      if (flagInput.trim() === correctFlag) {
        if (timerInterval) {
          clearInterval(timerInterval);
        }
        
        setSolved(true);
        toast({
          title: "Поздравляем!",
          description: t('ctf.congratulations', { points: challenge.points }),
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
    return null;
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
          <div className="mb-6">
            <Link to={`/ctf/category/${challenge.category}`} className="text-cyberblue-400 hover:text-cyberblue-300 flex items-center">
              <ArrowLeft className="mr-2 w-4 h-4" />
              {t('ctf.backToCases')}
            </Link>
          </div>
          
          <div className="bg-cyberdark-800 rounded-lg p-6 border border-cyberdark-700 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <div className="bg-cyberdark-700 text-cyberblue-400 text-xs font-medium px-2.5 py-0.5 rounded">
                    {t('ctf.case')} #{challenge.id}
                  </div>
                  <div className="bg-cyberdark-700 text-gray-300 text-xs font-medium px-2.5 py-0.5 rounded">
                    {challenge.category === 'web' && t('ctf.categories.web')}
                    {challenge.category === 'crypto' && t('ctf.categories.crypto')}
                    {challenge.category === 'osint' && t('ctf.categories.osint')}
                    {challenge.category === 'steganography' && t('ctf.categories.steganography')}
                    {challenge.category === 'reverse-engineering' && t('ctf.categories.reverseEngineering')}
                    {challenge.category === 'forensics' && t('ctf.categories.forensics')}
                    {challenge.category === 'pwn' && t('ctf.categories.pwn')}
                    {challenge.category === 'programming' && t('ctf.categories.programming')}
                    {challenge.category === 'network' && t('ctf.categories.network')}
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
              
              {challenge.id === '1' && (
                <>
                  <div className="mt-4">
                    <div className="bg-cyberdark-800 p-4 rounded-md">
                      <p className="text-sm font-medium text-gray-400 mb-2">{t('ctf.flagFormat')}:</p>
                      <code className="bg-cyberdark-900 px-2 py-1 rounded font-mono text-cyan-400">CTF{'{...}'}</code>
                    </div>
                    
                    <div className="mt-4 bg-cyberdark-800 p-4 rounded-md">
                      <p className="font-medium mb-2">{t('ctf.difficulty')}:</p>
                      <div className="bg-green-500/20 text-green-500 border border-green-500/30 text-xs font-medium px-2.5 py-0.5 rounded-full inline-flex">
                        {t('ctf.difficultyLevels.beginner')}
                      </div>
                    </div>
                    
                    <div className="mt-4 bg-cyberdark-800 p-4 rounded-md">
                      <p className="font-medium mb-2">{t('ctf.skills')}:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>{t('ctf.web.skillWebAnalysis')}</li>
                        <li>{t('ctf.web.skillJwt')}</li>
                        <li>{t('ctf.web.skillCryptoExploit')}</li>
                        <li>{t('ctf.web.skillPythonAutomation')}</li>
                      </ul>
                    </div>
                    
                    <div className="mt-4">
                      <a 
                        href="https://cloud.mail.ru/public/ip9t/ajXd2ZLbp" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center px-4 py-2 bg-cyberblue-600 text-white rounded-md hover:bg-cyberblue-700 transition-colors"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Скачать архив
                      </a>
                      <p className="text-sm text-gray-400 mt-2">Скачать архив для решения задания</p>
                    </div>
                    
                    <div className="mt-6 bg-cyberdark-800 p-4 rounded-md">
                      <p className="font-medium mb-4">{t('ctf.deploymentInstructions')}:</p>
                      
                      <h3 className="text-lg font-medium text-white mt-4 mb-2">1. {t('ctf.web.prepSystem')} (Kali Linux / Ubuntu):</h3>
                      <p className="mb-2">{t('ctf.web.ensureInstalled')} Docker {t('ctf.web.and')} Python3:</p>
                      <div className="bg-cyberdark-900 p-3 rounded-md mb-4">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-400">bash</span>
                          <button className="text-xs text-gray-400 hover:text-white" onClick={() => navigator.clipboard.writeText('sudo apt update && sudo apt install -y docker.io python3 python3-pip')}>
                            Copy
                          </button>
                        </div>
                        <pre className="text-cyan-400 font-mono text-sm overflow-x-auto"><code>sudo apt update && sudo apt install -y docker.io python3 python3-pip</code></pre>
                      </div>
                      
                      <h3 className="text-lg font-medium text-white mt-4 mb-2">2. {t('ctf.web.launchCTF')}:</h3>
                      <ol className="list-decimal pl-5 space-y-3">
                        <li>
                          <p className="mb-2">{t('ctf.web.extractArchive')} (phantom_vault.zip):</p>
                          <div className="bg-cyberdark-900 p-3 rounded-md mb-2">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs text-gray-400">bash</span>
                              <button className="text-xs text-gray-400 hover:text-white" onClick={() => navigator.clipboard.writeText('unzip phantom_vault.zip -d ~/phantom_vault && cd ~/phantom_vault')}>
                                Copy
                              </button>
                            </div>
                            <pre className="text-cyan-400 font-mono text-sm overflow-x-auto"><code>unzip phantom_vault.zip -d ~/phantom_vault && cd ~/phantom_vault</code></pre>
                          </div>
                        </li>
                        
                        <li>
                          <p className="mb-2">{t('ctf.web.launchDocker')}:</p>
                          <div className="bg-cyberdark-900 p-3 rounded-md mb-2">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs text-gray-400">bash</span>
                              <button className="text-xs text-gray-400 hover:text-white" onClick={() => navigator.clipboard.writeText('docker-compose up -d --build')}>
                                Copy
                              </button>
                            </div>
                            <pre className="text-cyan-400 font-mono text-sm overflow-x-auto"><code>docker-compose up -d --build</code></pre>
                          </div>
                        </li>
                        
                        <li>
                          <p className="mb-2">{t('ctf.web.checkServer')}:</p>
                          <p>{t('ctf.web.openBrowser')}:</p>
                          <div className="bg-cyberdark-900 p-3 rounded-md mb-2">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs text-gray-400">url</span>
                              <button className="text-xs text-gray-400 hover:text-white" onClick={() => navigator.clipboard.writeText('http://localhost:5000')}>
                                Copy
                              </button>
                            </div>
                            <pre className="text-cyan-400 font-mono text-sm overflow-x-auto"><code>http://localhost:5000</code></pre>
                          </div>
                        </li>
                      </ol>
                    </div>
                  </div>
                </>
              )}

              {challenge.id === '3' && (
                <>
                  <p className="mt-4">В зашифрованных сообщениях один из участников оставил подсказку: "Ключ — в нашей команде, точнее, в её имени. Помни, что алфавит цикличен."</p>
                  <p className="mt-4">Перехваченное сообщение:<br />
                  <code className="bg-cyberdark-800 px-2 py-1 rounded font-mono text-cyan-400">{"Khoor#Zruog#43#Fkdw#lv#khuh1#Fkhhuv2#CW{HvsdqbVhfuhw}"}</code></p>
                  <p className="mt-4">Цель: Расшифровать перехваченное сообщение, используя подсказку, и найти флаг в формате CW{"{...}"}.</p>
                </>
              )}
              
              {challenge.id === '7' && (
                <>
                  <p className="mt-4">Анализируя метаданные архива, вы обнаружили следующее:</p>
                  <ol className="list-decimal pl-5 mt-2 space-y-1">
                    <li>Архив содержит один файл с названием secret.txt.</li>
                    <li>Пароль для распаковки архива был сгенерирован на основе фразы, связанной с компанией CyberWhale.</li>
                    <li>Вместе с архивом был найден текстовый файл hint.txt, содержащий подсказку.</li>
                  </ol>
                  
                  <div className="mt-4 p-4 bg-cyberdark-800 rounded-md">
                    <p className="font-medium mb-2">Содержимое файла hint.txt:</p>
                    <p>Пароль представляет собой комбинацию названия компании и цифры.</p>
                    <p>Цифра представляет собой сумму значений в формате ASCII первых трех букв названия компании.</p>
                  </div>
                  
                  <div className="mt-4">
                    <a 
                      href="https://cloud.mail.ru/public/DMbD/FVSq8QsaK" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center px-4 py-2 bg-cyberblue-600 text-white rounded-md hover:bg-cyberblue-700 transition-colors"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Скачать архив
                    </a>
                    <p className="text-sm text-gray-400 mt-2">Архив содержит зашифрованный файл secret.txt</p>
                  </div>
                </>
              )}
              
              {challenge.id === '8' && (
                <>
                  <p className="mt-4">Формат флага: CW{"{...}"}</p>
                  <p className="mt-4">Сложность: Продвинутый</p>
                  <p className="mt-4">Навыки: Анализ сетевого трафика (Wireshark), криптография (AES, шифр Цезаря), стеганография, base64, работа с командной строкой.</p>
                  
                  <div className="mt-4 p-4 bg-cyberdark-800 rounded-md">
                    <p className="font-medium mb-2">Предоставляемые файлы:</p>
                    <ol className="list-decimal pl-5 mt-2 space-y-1">
                      <li>notes.txt: Текстовый файл с обрывками заметок.</li>
                      <li>encrypted_image.png: Зашифрованное изображение.</li>
                      <li>traffic.pcapng: Дамп сетевого трафика Wireshark.</li>
                    </ol>
                  </div>
                  
                  <div className="mt-4">
                    <a 
                      href="https://cloud.mail.ru/public/cFib/6dkAnZzfo" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center px-4 py-2 bg-cyberblue-600 text-white rounded-md hover:bg-cyberblue-700 transition-colors"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Скачать архив
                    </a>
                    <p className="text-sm text-gray-400 mt-2">Архив содержит необходимые файлы для решения задания</p>
                  </div>
                </>
              )}
            </div>
            
            {solved && (
              <div className="bg-green-900/20 border border-green-700 rounded-md p-4 mb-6 flex items-start">
                <CheckCircle className="text-green-500 w-5 h-5 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-green-500 font-semibold mb-1">{t('ctf.challengeCompleted')}</h3>
                  <p className="text-gray-300">{t('ctf.congratulations', { points: challenge.points })}</p>
                  <p className="text-gray-400 text-sm mt-2">{t('ctf.solutionTime')}: {formatTime(elapsedTime)}</p>
                </div>
              </div>
            )}
            
            {!solved && (
              <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
                <div className="flex-1 relative">
                  <Input
                    type="text"
                    placeholder={t('ctf.enterFlag', { example: challenge.id === '1' ? 'CTF{flag}' : 'CW{flag}' })}
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
                      {t('ctf.checking')}
                    </>
                  ) : (
                    t('ctf.submitFlag')
                  )}
                </Button>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="bg-cyberdark-800 rounded-lg p-6 border border-cyberdark-700 mb-6">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                  <ShieldAlert className="w-5 h-5 mr-2 text-cyberblue-400" />
                  {t('ctf.challenge')}
                </h2>
                
                <div className="bg-cyberdark-700 p-4 rounded-md text-gray-300">
                  {challenge.id === '1' && (
                    <>
                      <p className="mb-4">{t('ctf.web.phantomChallenge')}</p>
                      
                      <p className="mb-2">{t('ctf.web.yourTask')}:</p>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>{t('ctf.web.task1')}</li>
                        <li>{t('ctf.web.task2')}</li>
                        <li>{t('ctf.web.task3')}</li>
                        <li>{t('ctf.web.task4')}</li>
                      </ul>
                      
                      <div className="mt-4 p-4 bg-cyberdark-800 rounded-md">
                        <p className="text-sm text-gray-400 mb-2">{t('ctf.web.appFeatures')}:</p>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                          <li>{t('ctf.web.feature1')}</li>
                          <li>{t('ctf.web.feature2')}</li>
                          <li>{t('ctf.web.feature3')}</li>
                        </ul>
                      </div>
                      
                      <p className="mt-4">{t('ctf.web.findVulnerability')}</p>
                    </>
                  )}
                  
                  {challenge.id === '3' && (
                    <>
                      <p className="mb-4">Это задание требует применения знаний в области криптографии.</p>
                      
                      <p className="mb-2">Для решения этого задания вам потребуется:</p>
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
                  
                  {challenge.id === '7' && (
                    <>
                      <p className="mb-4">Это задание требует применения знаний в области криптографии и анализа архивов.</p>
                      
                      <p className="mb-2">Для решения этого задания вам потребуется:</p>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Скачать и проанализировать зашифрованный архив</li>
                        <li>Расшифровать пароль архива, используя подсказку</li>
                        <li>Извлечь содержимое архива</li>
                        <li>Расшифровать содержимое файла secret.txt</li>
                        <li>Найти флаг в формате CW{"{...}"}</li>
                      </ul>
                      
                      <div className="mt-4 p-4 bg-cyberdark-800 rounded-md">
                        <p className="text-sm text-gray-400 mb-2">Цель:</p>
                        <p>Расшифруйте архив, извлеките содержимое файла secret.txt и найдите флаг в формате CW{"{...}"}.</p>
                      </div>
                    </>
                  )}
                  
                  {challenge.id === '8' && (
                    <>
                      <p className="mb-4">Это задание требует комплексного применения знаний в различных областях кибербезопасности.</p>
                      
                      <p className="mb-2">Для решения этого комплексного задания вам потребуется:</p>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Проанализировать текстовый файл с обрывками заметок</li>
                        <li>Расшифровать зашифрованное изображение</li>
                        <li>Проанализировать дамп сетевого трафика с помощью Wireshark</li>
                        <li>Объединить полученные данные для нахождения завещания</li>
                        <li>Найти и отправить флаг в формате CW{"{...}"}</li>
                      </ul>
                      
                      <div className="mt-4 p-4 bg-cyberdark-800 rounded-md">
                        <p className="text-sm text-gray-400 mb-2">Цель:</p>
                        <p>Собрать воедино все улики, расшифровать сообщения и найти спрятанное завещание в формате CW{"{...}"}.</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
              
              {challenge.id === '1' && (
                <div className="bg-cyberdark-800 rounded-lg p-6 border border-cyberdark-700">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                    <Code className="w-5 h-5 mr-2 text-cyberblue-400" />
                    {t('ctf.additionalResources')}
                  </h2>
                  
                  <div className="bg-cyberdark-700 p-4 rounded-md text-gray-300">
                    <p className="mb-3">{t('ctf.web.jwtResources')}</p>
                    
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        <a href="https://jwt.io/" target="_blank" rel="noopener noreferrer" className="text-cyberblue-400 hover:underline hover:text-cyberblue-300">
                          JWT.io - {t('ctf.web.jwtDecoderDebugger')}
                        </a>
                      </li>
                      <li>
                        <a href="https://github.com/ticarpi/jwt_tool" target="_blank" rel="noopener noreferrer" className="text-cyberblue-400 hover:underline hover:text-cyberblue-300">
                          jwt_tool - {t('ctf.web.jwtTool')}
                        </a>
                      </li>
                      <li>
                        <a href="https://www.npmjs.com/package/jwt-decode" target="_blank" rel="noopener noreferrer" className="text-cyberblue-400 hover:underline hover:text-cyberblue-300">
                          jwt-decode - {t('ctf.web.jwtDecoder')}
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
