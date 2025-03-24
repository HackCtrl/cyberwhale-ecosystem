import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Calendar, 
  MessageSquare, 
  UserCheck, 
  ExternalLink,
  Trophy,
  Heart,
  ArrowRight,
  Edit
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ChatAssistant from '@/components/layout/ChatAssistant';

export default function Community() {
  return (
    <div className="container py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Сообщество</h1>
        <Input type="text" placeholder="Поиск участников..." className="max-w-md" />
      </div>

      <Tabs defaultValue="discussions" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="discussions">Обсуждения</TabsTrigger>
          <TabsTrigger value="events">События</TabsTrigger>
          <TabsTrigger value="leaderboard">Топ участников</TabsTrigger>
        </TabsList>
        <TabsContent value="discussions">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Пример карточки обсуждения */}
            <Card className="bg-cyberdark-800 border border-cyberdark-700">
              <CardContent className="p-4">
                <div className="flex items-center mb-2">
                  <Avatar className="mr-2 w-8 h-8">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="text-sm text-gray-400">
                    <span className="font-medium text-white">Имя участника</span>
                    <span className="ml-1">1 час назад</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Заголовок обсуждения
                </h3>
                <p className="text-gray-400 mb-4">
                  Краткое описание обсуждения. Здесь участники могут делиться своими мыслями и опытом.
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-gray-400">
                    <MessageSquare className="mr-2 w-4 h-4" />
                    <span>25</span>
                    <Heart className="ml-4 mr-2 w-4 h-4" />
                    <span>12</span>
                  </div>
                  <Link to="#" className="text-cyberblue-500 hover:text-cyberblue-400 flex items-center">
                    <span>Подробнее</span>
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>
            {/* Конец примера */}
            <Card className="bg-cyberdark-800 border border-cyberdark-700">
              <CardContent className="p-4">
                <div className="flex items-center mb-2">
                  <Avatar className="mr-2 w-8 h-8">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="text-sm text-gray-400">
                    <span className="font-medium text-white">Имя участника</span>
                    <span className="ml-1">3 час назад</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Заголовок обсуждения
                </h3>
                <p className="text-gray-400 mb-4">
                  Краткое описание обсуждения. Здесь участники могут делиться своими мыслями и опытом.
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-gray-400">
                    <MessageSquare className="mr-2 w-4 h-4" />
                    <span>25</span>
                    <Heart className="ml-4 mr-2 w-4 h-4" />
                    <span>12</span>
                  </div>
                  <Link to="#" className="text-cyberblue-500 hover:text-cyberblue-400 flex items-center">
                    <span>Подробнее</span>
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-cyberdark-800 border border-cyberdark-700">
              <CardContent className="p-4">
                <div className="flex items-center mb-2">
                  <Avatar className="mr-2 w-8 h-8">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="text-sm text-gray-400">
                    <span className="font-medium text-white">Имя участника</span>
                    <span className="ml-1">5 час назад</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Заголовок обсуждения
                </h3>
                <p className="text-gray-400 mb-4">
                  Краткое описание обсуждения. Здесь участники могут делиться своими мыслями и опытом.
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-gray-400">
                    <MessageSquare className="mr-2 w-4 h-4" />
                    <span>25</span>
                    <Heart className="ml-4 mr-2 w-4 h-4" />
                    <span>12</span>
                  </div>
                  <Link to="#" className="text-cyberblue-500 hover:text-cyberblue-400 flex items-center">
                    <span>Подробнее</span>
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="events">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Пример карточки события */}
            <Card className="bg-cyberdark-800 border border-cyberdark-700">
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Название события
                </h3>
                <div className="flex items-center text-gray-400 mb-2">
                  <Calendar className="mr-2 w-4 h-4" />
                  <span>Дата и время</span>
                </div>
                <p className="text-gray-400 mb-4">
                  Краткое описание события и его целей. Приглашаем всех желающих!
                </p>
                <Link to="#" className="text-cyberblue-500 hover:text-cyberblue-400 flex items-center">
                  <span>Подробнее</span>
                  <ExternalLink className="ml-2 w-4 h-4" />
                </Link>
              </CardContent>
            </Card>
            {/* Конец примера */}
            <Card className="bg-cyberdark-800 border border-cyberdark-700">
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Название события
                </h3>
                <div className="flex items-center text-gray-400 mb-2">
                  <Calendar className="mr-2 w-4 h-4" />
                  <span>Дата и время</span>
                </div>
                <p className="text-gray-400 mb-4">
                  Краткое описание события и его целей. Приглашаем всех желающих!
                </p>
                <Link to="#" className="text-cyberblue-500 hover:text-cyberblue-400 flex items-center">
                  <span>Подробнее</span>
                  <ExternalLink className="ml-2 w-4 h-4" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="leaderboard">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-cyberdark-700">
              <thead className="bg-cyberdark-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Место
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Участник
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Решено заданий
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Очки
                  </th>
                </tr>
              </thead>
              <tbody className="bg-cyberdark-800 divide-y divide-cyberdark-700">
                {/* Пример строки таблицы */}
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                    1
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    <div className="flex items-center">
                      <Avatar className="mr-2 w-6 h-6">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <span>Имя участника</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    42
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    4200
                  </td>
                </tr>
                {/* Конец примера */}
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                    2
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    <div className="flex items-center">
                      <Avatar className="mr-2 w-6 h-6">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <span>Имя участника</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    42
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    4200
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>

      <ChatAssistant />
    </div>
  );
}
