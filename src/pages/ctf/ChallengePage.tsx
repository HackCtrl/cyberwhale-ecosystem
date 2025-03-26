import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  BookOpen, 
  Flag, 
  Clock, 
  Award, 
  Users, 
  MessageSquare, 
  AlertTriangle, 
  Tag, 
  Check, 
  X, 
  Loader2 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import { Challenge, ChallengeCategory } from '@/types';
import ChatAssistant from '@/components/layout/ChatAssistant';

// Mock challenge data
const mockChallenges: Record<string, Challenge> = {
  '1': {
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
  '2': {
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
  '3': {
    id: '3',
    title: 'Шифрование и дешифрование',
    description: 'Расшифруйте сообщение, зашифрованное с помощью классического шифра Виженера.',
    category: 'crypto',
    difficulty: 'intermediate',
    points: 200,
    tags: ['cryptography', 'vigenere'],
    solved: false,
    solvedBy: 87,
    createdAt: new Date('2023-07-05'),
    updatedAt: new Date('2023-07-05'),
  },
  '4': {
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
  '5': {
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
  '6': {
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

export default function ChallengePage() {
  const { id } = useParams<{ id: string }>();
  const [flag, setFlag] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<'success' | 'error' | null>(null);
  
  // Get challenge data
  const challenge = id ? mockChallenges[id] : null;
  
  if (!challenge) {
    return (
      <div className="min-h-screen bg-cyberdark-900 flex flex-col">
        <div className="pt-20 flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Задание не найдено</h2>
            <p className="text-gray-400 mb-6">Задание с указанным идентификатором не существует.</p>
            <Link to="/ctf">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Вернуться к списку заданий
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmitFlag = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!flag.trim()) return;
    
    setSubmitting(true);
    setSubmitResult(null);
    
    // Simulate API request
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock flag validation (correct flags for demo)
    const correctFlags: Record<string, string> = {
      '1': 'flag{sql_injection_success}',
      '2': 'flag{hidden_in_plain_sight}',
      '3': 'flag{vigenere_decoded}',
      '4': 'flag{binary_reversed}',
      '5': 'flag{packet_analysis_complete}',
      '6': 'flag{buffer_overflow_pwned}',
    };
    
    const isCorrect = flag.trim() === correctFlags[challenge.id];
    
    setSubmitResult(isCorrect ? 'success' : 'error');
    setSubmitting(false);
    
    if (isCorrect) {
      toast({
        title: "Правильный флаг!",
        description: `Поздравляем! Вы получили ${challenge.points} очков.`,
        variant: "default",
      });
    } else {
      toast({
        title: "Неправильный флаг",
        description: "Попробуйте еще раз.",
        variant: "destructive",
      });
    }
  };

  const resetSubmission = () => {
    setFlag('');
    setSubmitResult(null);
  };

  return (
    <div className="min-h-screen bg-cyberdark-900 flex flex-col">
      <div className="pt-20 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back button */}
          <div className="mb-6">
            <Link to="/ctf" className="inline-flex items-center text-gray-400 hover:text-white transition">
              <ArrowLeft className="mr-2 h-4 w-4" />
              <span>Вернуться к заданиям</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2">
              <div className="bg-cyberdark-800 rounded-lg border border-cyberdark-700 overflow-hidden">
                {/* Challenge header */}
                <div className="p-6 border-b border-cyberdark-700">
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="outline" className="bg-cyberdark-700 text-gray-300">
                      {categoryNames[challenge.category]}
                    </Badge>
                    <div className={`text-xs font-medium px-2 py-1 rounded-full border ${difficultyColors[challenge.difficulty]}`}>
                      {challenge.difficulty === 'beginner' && 'Начальный'}
                      {challenge.difficulty === 'intermediate' && 'Средний'}
                      {challenge.difficulty === 'advanced' && 'Продвинутый'}
                      {challenge.difficulty === 'expert' && 'Эксперт'}
                    </div>
                  </div>
                  
                  <h1 className="text-2xl font-bold text-white mb-2">{challenge.title}</h1>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center">
                      <Award className="w-4 h-4 mr-1" />
                      <span>{challenge.points} очков</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      <span>{challenge.solvedBy} решили</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>Добавлено {challenge.createdAt.toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                
                {/* Challenge tabs */}
                <Tabs defaultValue="description" className="w-full">
                  <TabsList className="grid grid-cols-3 bg-cyberdark-900 p-0 rounded-none">
                    <TabsTrigger 
                      value="description" 
                      className="py-3 rounded-none data-[state=active]:bg-cyberdark-800 data-[state=active]:shadow-none"
                    >
                      Описание
                    </TabsTrigger>
                    <TabsTrigger 
                      value="hints" 
                      className="py-3 rounded-none data-[state=active]:bg-cyberdark-800 data-[state=active]:shadow-none"
                    >
                      Подсказки
                    </TabsTrigger>
                    <TabsTrigger 
                      value="discussion" 
                      className="py-3 rounded-none data-[state=active]:bg-cyberdark-800 data-[state=active]:shadow-none"
                    >
                      Обсуждение
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="description" className="p-6 m-0">
                    <div className="prose prose-invert max-w-none">
                      <p className="text-gray-300 mb-4">{challenge.description}</p>
                      
                      {/* Challenge details - these would be custom per challenge */}
                      <div className="mt-8">
                        <h3 className="text-lg font-semibold text-white mb-3">Детали задания</h3>
                        
                        {challenge.category === 'web' && (
                          <>
                            <p className="text-gray-300 mb-4">
                              Вам предоставлен доступ к тестовому веб-сайту с уязвимостью SQL-инъекции. Ваша задача — 
                              использовать эту уязвимость для обхода аутентификации и получения доступа к учетной записи администратора.
                            </p>
                            <div className="bg-cyberdark-900 p-4 rounded-md mb-4">
                              <h4 className="text-white font-medium mb-2">Доступ к заданию:</h4>
                              <a 
                                href="#"
                                className="text-cyberblue-500 font-mono break-all hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                http://ctf-challenges.cyberwhale.com/web-vuln-1/
                              </a>
                            </div>
                            <Alert className="bg-yellow-500/10 border-yellow-500/20 mb-4">
                              <AlertTriangle className="h-4 w-4 text-yellow-500" />
                              <AlertDescription className="text-yellow-200">
                                Внимание: Используйте эти навыки только в учебных целях и на разрешенных системах.
                              </AlertDescription>
                            </Alert>
                          </>
                        )}
                        
                        {challenge.category === 'steganography' && (
                          <>
                            <p className="text-gray-300 mb-4">
                              В этом задании вам нужно найти скрытое сообщение в изображении ниже. Используйте методы 
                              стеганографии для анализа файла.
                            </p>
                            <div className="bg-cyberdark-900 p-4 rounded-md mb-6 flex flex-col items-center">
                              <img 
                                src="https://picsum.photos/400/300" 
                                alt="Stego Challenge" 
                                className="rounded-md mb-3 max-w-full" 
                              />
                              <Button variant="outline" size="sm">
                                Скачать изображение
                              </Button>
                            </div>
                          </>
                        )}
                        
                        {challenge.category === 'crypto' && (
                          <>
                            <p className="text-gray-300 mb-4">
                              Расшифруйте следующее сообщение, которое было зашифровано с использованием шифра Виженера.
                              Ключ для шифра содержится в тексте самого сообщения.
                            </p>
                            <div className="bg-cyberdark-900 p-4 rounded-md mb-4 font-mono text-sm text-gray-300 overflow-x-auto">
                              LWPATZVEQPKQVZHFFIYLWTZXZRMWMTLSRBAGXPVGAJUEGEVSUMXCSIEIVSBVZMRXPDLTIBEMXVVPKWQJLWBZVBIHWGIMWQLPVMXXZIGAJTSPGFLXZEGTARRWUCGCYPWDCFPBPNBEMXPCLVTYAPRKSLRKQPLXRGPTARRITRVPHFUPJTZJPNISRCFLWFVBXPCLWDDTTVGTXWVVCFVZHVPPTARRWUTSPMPUFEUAKUPNVRCLVTZTIKEPWPNVTZEUPNFQVZHFBVBVT
                            </div>
                          </>
                        )}
                        
                        {challenge.category === 'reverse-engineering' && (
                          <>
                            <p className="text-gray-300 mb-4">
                              Вам дан исполняемый файл, который проверяет правильность введенного ключа. Ваша задача — 
                              проанализировать этот файл, понять алгоритм проверки и найти правильный ключ.
                            </p>
                            <div className="bg-cyberdark-900 p-4 rounded-md mb-4">
                              <h4 className="text-white font-medium mb-2">Файл для анализа:</h4>
                              <Button variant="outline" size="sm">
                                Скачать бинарный файл
                              </Button>
                            </div>
                            <div className="bg-cyberdark-900 p-4 rounded-md mb-4">
                              <h4 className="text-white font-medium mb-2">Примечание:</h4>
                              <p className="text-gray-300 text-sm">
                                Файл скомпилирован для 64-битной архитектуры x86 под Linux. Для анализа вы можете 
                                использовать такие инструменты, как GDB, Ghidra, IDA Pro или Radare2.
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                      
                      <div className="mt-6 flex flex-wrap gap-2">
                        {challenge.tags.map((tag) => (
                          <div key={tag} className="inline-flex items-center rounded-full bg-cyberdark-700 px-2.5 py-0.5 text-xs font-medium text-gray-300">
                            <Tag className="mr-1 h-3 w-3" />
                            {tag}
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="hints" className="p-6 m-0">
                    <div className="space-y-4">
                      <div className="bg-cyberdark-700 rounded-lg p-4 border border-cyberdark-600">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-medium text-white">Подсказка 1</h3>
                          <Button size="sm" variant="outline">
                            Открыть (-10 очков)
                          </Button>
                        </div>
                        <p className="text-gray-400 text-sm">Получите подсказку, которая направит вас в правильном направлении.</p>
                      </div>
                      
                      <div className="bg-cyberdark-700 rounded-lg p-4 border border-cyberdark-600">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-medium text-white">Подсказка 2</h3>
                          <Button size="sm" variant="outline">
                            Открыть (-25 очков)
                          </Button>
                        </div>
                        <p className="text-gray-400 text-sm">Более конкретная подсказка о том, как решить это задание.</p>
                      </div>
                      
                      <Alert className="bg-cyberdark-900 border-cyberdark-700">
                        <BookOpen className="h-4 w-4" />
                        <AlertDescription>
                          Использование подсказок снижает количество очков, которые вы получаете за решение задания.
                        </AlertDescription>
                      </Alert>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="discussion" className="p-6 m-0">
                    <div className="space-y-4">
                      <div className="bg-cyberdark-700 rounded-lg p-4 border border-cyberdark-600">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-cyberdark-600 flex-shrink-0"></div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-white">user123</span>
                              <span className="text-xs text-gray-400">2 дня назад</span>
                            </div>
                            <p className="text-gray-300 text-sm">
                              Отличное задание! Я застрял на втором шаге, кто-нибудь может намекнуть, в каком направлении копать?
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-cyberdark-700 rounded-lg p-4 border border-cyberdark-600 ml-8">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-cyberdark-600 flex-shrink-0"></div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-white">expert_hacker</span>
                              <span className="text-xs text-gray-400">1 день назад</span>
                            </div>
                            <p className="text-gray-300 text-sm">
                              Попробуйте посмотреть на проблему с другой стороны. Иногда решение лежит на поверхности!
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <h3 className="font-medium text-white mb-2">Написать комментарий</h3>
                        <textarea 
                          className="w-full bg-cyberdark-700 border border-cyberdark-600 rounded-md p-3 text-white mb-2"
                          rows={3}
                          placeholder="Ваш комментарий..."
                        />
                        <Button>
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Отправить
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Submit flag */}
              <div className="bg-cyberdark-800 rounded-lg border border-cyberdark-700 p-6 mb-6">
                <h3 className="text-lg font-semibold text-white mb-4">Отправить флаг</h3>
                
                {submitResult === 'success' ? (
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 text-green-500 mb-4">
                      <Check className="h-8 w-8" />
                    </div>
                    <h4 className="text-lg font-medium text-white mb-2">Задание решено!</h4>
                    <p className="text-gray-300 mb-4">
                      Поздравляем! Вы успешно решили это задание и получили {challenge.points} очков.
                    </p>
                    <Button 
                      variant="outline"
                      className="mb-2 w-full"
                      onClick={resetSubmission}
                    >
                      Попробовать другой флаг
                    </Button>
                    <Link to="/ctf">
                      <Button className="w-full bg-cyberblue-500 hover:bg-cyberblue-600">
                        К другим заданиям
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitFlag}>
                    {submitResult === 'error' && (
                      <Alert variant="destructive" className="mb-4">
                        <X className="h-4 w-4" />
                        <AlertDescription>
                          Неверный флаг. Попробуйте еще раз.
                        </AlertDescription>
                      </Alert>
                    )}
                    
                    <div className="mb-4">
                      <p className="text-gray-300 text-sm mb-4">
                        Введите найденный флаг в формате <code className="bg-cyberdark-700 px-1 py-0.5 rounded">flag&#123;...&#125;</code>
                      </p>
                      <div className="flex">
                        <Input
                          className="bg-cyberdark-700 border-cyberdark-600 flex-1"
                          placeholder="flag{...}"
                          value={flag}
                          onChange={(e) => setFlag(e.target.value)}
                          disabled={submitting}
                        />
                      </div>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-cyberblue-500 hover:bg-cyberblue-600"
                      disabled={submitting}
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Проверка...
                        </>
                      ) : (
                        <>
                          <Flag className="mr-2 h-4 w-4" />
                          Отправить флаг
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>
              
              {/* Similar challenges */}
              <div className="bg-cyberdark-800 rounded-lg border border-cyberdark-700 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Похожие задания</h3>
                <div className="space-y-4">
                  {Object.values(mockChallenges)
                    .filter(c => c.id !== challenge.id && c.category === challenge.category)
                    .slice(0, 3)
                    .map((c) => (
                      <Link 
                        key={c.id} 
                        to={`/ctf/challenge/${c.id}`}
                        className="block bg-cyberdark-700 rounded-md p-3 hover:bg-cyberdark-600 transition"
                      >
                        <div className="flex justify-between items-center mb-1">
                          <h4 className="font-medium text-white">{c.title}</h4>
                          <span className="text-sm text-gray-300">{c.points} pts</span>
                        </div>
                        <div className="flex items-center text-xs text-gray-400">
                          <Badge variant="outline" className="bg-cyberdark-800 mr-2">
                            {categoryNames[c.category]}
                          </Badge>
                          <span>
                            {c.difficulty === 'beginner' && 'Начальный'}
                            {c.difficulty === 'intermediate' && 'Средний'}
                            {c.difficulty === 'advanced' && 'Продвинутый'}
                            {c.difficulty === 'expert' && 'Эксперт'}
                          </span>
                        </div>
                      </Link>
                    ))}
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

