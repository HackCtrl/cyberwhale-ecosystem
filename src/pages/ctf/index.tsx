
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { 
  ShieldAlert, 
  Trophy, 
  Search, 
  Code, 
  LockKeyhole, 
  Eye, 
  Network, 
  Bomb,
  Info 
} from 'lucide-react';
import { mockChallenges } from '@/data/challenges';
import { Challenge } from '@/types';
import { useAuth } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';

// Group challenges by category
const groupChallengesByCategory = (challenges: Challenge[]) => {
  const grouped: Record<string, Challenge[]> = {};
  
  challenges.forEach(challenge => {
    if (!grouped[challenge.category]) {
      grouped[challenge.category] = [];
    }
    grouped[challenge.category].push(challenge);
  });
  
  return grouped;
};

// Mock fetch challenges function (simulates API call)
const fetchChallenges = (): Promise<Challenge[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockChallenges);
    }, 600);
  });
};

export default function CTFPlatform() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/login?returnUrl=' + encodeURIComponent('/ctf'));
      toast({
        title: "Авторизация требуется",
        description: "Для доступа к CTF платформе необходимо авторизоваться.",
        variant: "destructive"
      });
    }
  }, [user, navigate, toast]);

  // Fetch challenges
  const { data: challenges, isLoading, error } = useQuery({
    queryKey: ['challenges'],
    queryFn: fetchChallenges,
    enabled: !!user, // Only fetch if user is authenticated
  });
  
  if (!user) {
    return null; // Don't render anything if not authenticated
  }

  // Filter challenges by search query
  const filteredChallenges = challenges?.filter(challenge => 
    challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    challenge.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (challenge.tags && challenge.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
  );
  
  // Group challenges by category
  const groupedChallenges = filteredChallenges ? groupChallengesByCategory(filteredChallenges) : {};
  
  // Category names in Russian
  const categoryNames: Record<string, string> = {
    'web': 'Веб-безопасность',
    'crypto': 'Криптография',
    'steganography': 'Стеганография',
    'reverse-engineering': 'Обратная разработка',
    'network': 'Сетевая безопасность',
    'pwn': 'Бинарная эксплуатация'
  };
  
  // Category icons
  const categoryIcons: Record<string, React.ReactNode> = {
    'web': <Code className="w-5 h-5" />,
    'crypto': <LockKeyhole className="w-5 h-5" />,
    'steganography': <Eye className="w-5 h-5" />,
    'reverse-engineering': <ShieldAlert className="w-5 h-5" />,
    'network': <Network className="w-5 h-5" />,
    'pwn': <Bomb className="w-5 h-5" />
  };
  
  // Category descriptions
  const categoryDescriptions: Record<string, string> = {
    'web': 'Задания, связанные с веб-уязвимостями, SQL-инъекциями, XSS, CSRF и другими атаками на веб-приложения.',
    'crypto': 'Задания по криптографии, шифрованию и дешифрованию данных, взлому криптографических алгоритмов.',
    'steganography': 'Поиск скрытой информации в изображениях, аудио, видео и других файлах.',
    'reverse-engineering': 'Анализ и исследование программного обеспечения для понимания его функциональности.',
    'network': 'Задания, связанные с анализом сетевого трафика, протоколов и сетевых атак.',
    'pwn': 'Эксплуатация уязвимостей в программном обеспечении для получения контроля над системой.'
  };
  
  // Render loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-24 animate-pulse">
        <div className="h-12 bg-cyberdark-800 rounded w-1/3 mb-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-64 bg-cyberdark-800 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-24">
        <Alert variant="destructive">
          <AlertDescription>
            Произошла ошибка при загрузке заданий. Пожалуйста, попробуйте позже.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">CTF Платформа</h1>
          <p className="text-gray-400">
            Проверьте свои навыки в различных областях кибербезопасности
          </p>
        </div>
        
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Поиск заданий..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {Object.keys(categoryNames).map((category) => (
          <Card key={category} className="overflow-hidden hover:border-primary/50 transition-colors">
            <CardHeader className="bg-cyberdark-800 pb-2">
              <div className="flex items-center gap-2 mb-1">
                <div className="bg-cyberdark-700 p-2 rounded-full">
                  {categoryIcons[category]}
                </div>
                <CardTitle className="text-lg">{categoryNames[category]}</CardTitle>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {(groupedChallenges[category]?.length || 0)} кейсов
                </Badge>
                <Badge variant="secondary" className="text-xs bg-secondary/50">
                  {['crypto', 'web'].includes(category) ? 'Популярное' : ''}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="pt-4">
              <p className="text-sm text-gray-400 line-clamp-3 mb-2">
                {categoryDescriptions[category]}
              </p>
              
              <div className="flex justify-between text-xs text-gray-400 mb-2">
                <span>Сложность</span>
                <span>
                  {category === 'web' || category === 'crypto' || category === 'steganography' 
                    ? 'Начальный' 
                    : category === 'network' 
                    ? 'Средний' 
                    : 'Продвинутый'}
                </span>
              </div>
              
              <Progress 
                value={
                  category === 'web' || category === 'crypto' || category === 'steganography' 
                    ? 25 
                    : category === 'network' 
                    ? 50 
                    : 75
                } 
                className="h-1 mb-4" 
              />
            </CardContent>
            
            <CardFooter className="border-t border-cyberdark-700 pt-4">
              <Button 
                className="w-full" 
                onClick={() => navigate(`/ctf/category/${category}`)}
              >
                Решать кейсы
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <Separator className="my-10" />
      
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-6">
          <Trophy className="w-6 h-6 text-yellow-500" />
          <h2 className="text-2xl font-bold">Рейтинг участников</h2>
        </div>
        
        <div className="bg-cyberdark-800 rounded-lg p-6">
          <div className="text-center py-8">
            <Info className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <p className="text-lg text-gray-400">Таблица лидеров будет доступна после запуска соревнований</p>
            <Button 
              className="mt-4" 
              variant="outline"
              onClick={() => {
                toast({
                  title: "Скоро!",
                  description: "Соревнования начнутся в ближайшее время.",
                  variant: "default"
                });
              }}
            >
              Подписаться на уведомления
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
