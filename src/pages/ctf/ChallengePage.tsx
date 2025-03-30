
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { mockChallenges } from '@/data/challenges';
import { Challenge } from '@/types';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  ShieldAlert, 
  Trophy, 
  Users, 
  CalendarDays, 
  Tag, 
  CheckCircle, 
  BarChart 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/lib/auth';

// Mock function to fetch a challenge by ID
const fetchChallengeById = (id: string): Promise<Challenge | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const challenge = mockChallenges.find(c => c.id === id);
      resolve(challenge);
    }, 600);
  });
};

export default function ChallengePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [flag, setFlag] = useState('');
  const [attemptCount, setAttemptCount] = useState(0);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [hints, setHints] = useState<string[]>([]);
  const [showHint, setShowHint] = useState<number | null>(null);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/login?returnUrl=' + encodeURIComponent('/ctf/challenge/' + id));
    }
  }, [user, navigate, id]);

  // Fetch challenge data
  const { data: challenge, isLoading, error } = useQuery({
    queryKey: ['challenge', id],
    queryFn: () => fetchChallengeById(id || ''),
    enabled: !!id && !!user,
  });

  // Initialize hints based on challenge category
  useEffect(() => {
    if (challenge) {
      let challengeHints: string[] = [];
      
      switch (challenge.category) {
        case 'crypto':
          challengeHints = [
            "Подсказка 1: Ключ связан с названием команды 'CyberWhale'.",
            "Подсказка 2: Помните, что алфавит цикличен.",
            "Подсказка 3: Попробуйте найти связь между буквами в названии и их позициями в алфавите."
          ];
          break;
        case 'web':
          challengeHints = [
            "Подсказка 1: Проверьте исходный код страницы.",
            "Подсказка 2: Обратите внимание на параметры запросов.",
            "Подсказка 3: SQL-инъекция может помочь вам обойти аутентификацию."
          ];
          break;
        case 'steganography':
          challengeHints = [
            "Подсказка 1: Изображение может содержать скрытые данные.",
            "Подсказка 2: Попробуйте использовать инструменты для анализа метаданных.",
            "Подсказка 3: Биты изображения могут быть изменены для хранения информации."
          ];
          break;
        default:
          challengeHints = [
            "Подсказка 1: Внимательно изучите все доступные данные.",
            "Подсказка 2: Иногда решение проще, чем кажется.",
            "Подсказка 3: Попробуйте нестандартный подход."
          ];
      }
      
      setHints(challengeHints);
    }
  }, [challenge]);

  // Handle flag submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!challenge) return;
    
    setAttemptCount(prev => prev + 1);
    setHasSubmitted(true);
    
    let correctFlag = '';
    
    // Determine correct flag based on challenge category
    switch (challenge.category) {
      case 'crypto':
        correctFlag = 'CW{SecretFound}';
        break;
      case 'web':
        correctFlag = 'CW{SQLInjected}';
        break;
      case 'steganography':
        correctFlag = 'CW{HiddenMessage}';
        break;
      default:
        correctFlag = 'CW{Flag' + challenge.id + '}';
    }
    
    // Check if flag is correct
    if (flag.trim() === correctFlag) {
      setIsCorrect(true);
      toast({
        title: "Правильно!",
        description: "Вы успешно решили задание!",
        variant: "default"
      });
    } else {
      setIsCorrect(false);
      toast({
        title: "Неправильный флаг",
        description: "Попробуйте ещё раз.",
        variant: "destructive"
      });
    }
  };

  // Show a specific hint
  const handleShowHint = (index: number) => {
    if (showHint === index) {
      setShowHint(null);
    } else {
      setShowHint(index);
      toast({
        title: "Подсказка открыта",
        description: "Это может снизить количество полученных очков.",
        variant: "destructive"
      });
    }
  };

  // If still loading
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-24 animate-pulse">
        <div className="h-8 bg-cyberdark-800 rounded w-1/3 mb-6"></div>
        <div className="h-48 bg-cyberdark-800 rounded mb-8"></div>
        <div className="h-32 bg-cyberdark-800 rounded"></div>
      </div>
    );
  }

  // If error or challenge not found
  if (error || !challenge) {
    return (
      <div className="container mx-auto px-4 py-24">
        <Alert variant="destructive">
          <AlertDescription>
            Задание не найдено или произошла ошибка при загрузке.
          </AlertDescription>
        </Alert>
        <div className="mt-6">
          <Button onClick={() => navigate('/ctf')}>Вернуться к заданиям</Button>
        </div>
      </div>
    );
  }

  // Render challenge details
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="mb-6">
        <Button 
          variant="outline" 
          onClick={() => navigate('/ctf/category/' + challenge.category)}
          className="mb-4"
        >
          ← Назад к кейсам
        </Button>
        
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <Badge className="text-sm bg-secondary/70">{challenge.category === 'crypto' ? 'Криптография' : 
                          challenge.category === 'web' ? 'Веб-безопасность' : 
                          challenge.category === 'steganography' ? 'Стеганография' : 
                          challenge.category === 'reverse-engineering' ? 'Обратная разработка' : 
                          challenge.category === 'network' ? 'Сетевая безопасность' : 
                          challenge.category === 'pwn' ? 'Бинарная эксплуатация' : 
                          challenge.category}</Badge>
          <Badge variant="outline" className="text-sm">{challenge.difficulty === 'beginner' ? 'Начальный' : 
                                           challenge.difficulty === 'intermediate' ? 'Средний' : 
                                           challenge.difficulty === 'advanced' ? 'Продвинутый' : 
                                           challenge.difficulty === 'expert' ? 'Экспертный' : 
                                           challenge.difficulty}</Badge>
          <Badge variant="outline" className="text-sm">{challenge.points} баллов</Badge>
        </div>
        
        <h1 className="text-3xl font-bold mb-2">{challenge.title}</h1>
        
        <div className="flex flex-wrap gap-6 text-sm text-gray-400 mb-6">
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            <span>Решено: {challenge.solvedBy}</span>
          </div>
          <div className="flex items-center">
            <CalendarDays className="w-4 h-4 mr-1" />
            <span>Добавлено: {challenge.createdAt.toLocaleDateString()}</span>
          </div>
          {challenge.tags && challenge.tags.length > 0 && (
            <div className="flex items-center">
              <Tag className="w-4 h-4 mr-1" />
              <span>Теги: {challenge.tags.join(', ')}</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Описание задания</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-line">{challenge.description}</p>
              
              {challenge.category === 'crypto' && (
                <div className="mt-6 p-4 bg-cyberdark-800 rounded-md font-mono text-sm">
                  <p className="mb-2">Перехваченный лог чата:</p>
                  <div className="space-y-2">
                    <p><span className="text-green-400">admin:</span> Ew ctgcpf zcu dggp eqortqokugf! Yg pggf vq ejcpig vjg rcuuyqtfu koofkcvgna.</p>
                    <p><span className="text-blue-400">security:</span> Yjkej wugt ceewpvu ygtg chhgevgf?</p>
                    <p><span className="text-green-400">admin:</span> Cnn qh vjgo! Vjg hnci ku CW{'SecretFound'}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          {hasSubmitted && (
            <Alert variant={isCorrect ? "default" : "destructive"}>
              <AlertDescription>
                {isCorrect ? (
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
                    <span>Правильно! Вы успешно решили задание.</span>
                  </div>
                ) : (
                  <div>
                    <span>Неправильный флаг. Попробуйте ещё раз.</span>
                    {attemptCount >= 3 && !showHint && (
                      <div className="mt-2">
                        <Button variant="outline" size="sm" onClick={() => setShowHint(0)}>
                          Показать подсказку
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </AlertDescription>
            </Alert>
          )}
          
          {!isCorrect && (
            <Card>
              <CardHeader>
                <CardTitle>Отправить флаг</CardTitle>
                <CardDescription>
                  Формат флага: CW{'{XXXX}'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input
                      placeholder="Введите флаг (например, CW{XXXX})"
                      value={flag}
                      onChange={(e) => setFlag(e.target.value)}
                      className="font-mono"
                    />
                  </div>
                  <Button type="submit">Отправить</Button>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Прогресс</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Сложность</span>
                    <span className="text-sm">{
                      challenge.difficulty === 'beginner' ? 'Начальный' : 
                      challenge.difficulty === 'intermediate' ? 'Средний' : 
                      challenge.difficulty === 'advanced' ? 'Продвинутый' : 
                      challenge.difficulty === 'expert' ? 'Экспертный' : 
                      challenge.difficulty
                    }</span>
                  </div>
                  <Progress value={
                    challenge.difficulty === 'beginner' ? 25 : 
                    challenge.difficulty === 'intermediate' ? 50 : 
                    challenge.difficulty === 'advanced' ? 75 : 
                    challenge.difficulty === 'expert' ? 100 : 
                    0
                  } className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Очки</span>
                    <span className="text-sm">{challenge.points}</span>
                  </div>
                  <Progress value={challenge.points / 4} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Решено пользователями</span>
                    <span className="text-sm">{challenge.solvedBy}</span>
                  </div>
                  <Progress value={challenge.solvedBy / 2} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Подсказки</CardTitle>
              <CardDescription>
                Использование подсказок уменьшает количество очков
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {hints.map((hint, index) => (
                  <Button
                    key={index}
                    variant={showHint === index ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => handleShowHint(index)}
                  >
                    Подсказка {index + 1}
                  </Button>
                ))}
              </div>
              
              {showHint !== null && (
                <div className="mt-4 p-3 bg-cyberdark-800 rounded-md text-sm">
                  {hints[showHint]}
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Теги</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {challenge.tags && challenge.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-sm">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
