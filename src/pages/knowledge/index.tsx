import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Book, 
  Search, 
  Filter, 
  ChevronDown, 
  Calendar, 
  Clock, 
  Tag, 
  BookOpen,
  Bookmark
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import ChatAssistant from '@/components/layout/ChatAssistant';

const articlesData = [
  {
    id: 1,
    title: "Введение в кибербезопасность",
    description: "Основные понятия и принципы кибербезопасности для начинающих.",
    category: "Основы",
    tags: ["кибербезопасность", "безопасность", "основы"],
    author: {
      name: "Иван Иванов",
      avatar: "https://via.placeholder.com/50"
    },
    date: "2023-01-15",
    readTime: 5,
    imageUrl: "https://via.placeholder.com/640x360"
  },
  {
    id: 2,
    title: "Как защитить свой компьютер от вирусов",
    description: "Пошаговая инструкция по защите компьютера от вредоносного ПО.",
    category: "Безопасность",
    tags: ["вирусы", "защита", "компьютер"],
    author: {
      name: "Петр Петров",
      avatar: "https://via.placeholder.com/50"
    },
    date: "2023-02-20",
    readTime: 8,
    imageUrl: "https://via.placeholder.com/640x360"
  },
  {
    id: 3,
    title: "Основы криптографии",
    description: "Введение в криптографию и ее применение в кибербезопасности.",
    category: "Криптография",
    tags: ["криптография", "шифрование", "дешифрование"],
    author: {
      name: "Анна Смирнова",
      avatar: "https://via.placeholder.com/50"
    },
    date: "2023-03-10",
    readTime: 12,
    imageUrl: "https://via.placeholder.com/640x360"
  },
  {
    id: 4,
    title: "Безопасность веб-приложений",
    description: "Основные угрозы и методы защиты веб-приложений.",
    category: "Веб-безопасность",
    tags: ["веб-безопасность", "уязвимости", "защита"],
    author: {
      name: "Дмитрий Кузнецов",
      avatar: "https://via.placeholder.com/50"
    },
    date: "2023-04-05",
    readTime: 10,
    imageUrl: "https://via.placeholder.com/640x360"
  },
  {
    id: 5,
    title: "Анализ вредоносного ПО",
    description: "Методы и инструменты для анализа вредоносного программного обеспечения.",
    category: "Анализ ВПО",
    tags: ["вредоносное ПО", "анализ", "инструменты"],
    author: {
      name: "Елена Васильева",
      avatar: "https://via.placeholder.com/50"
    },
    date: "2023-05-12",
    readTime: 15,
    imageUrl: "https://via.placeholder.com/640x360"
  },
];

export default function KnowledgeBase() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const filteredArticles = articlesData.filter(article => {
    const searchTerm = searchQuery.toLowerCase();
    const titleMatch = article.title.toLowerCase().includes(searchTerm);
    const descriptionMatch = article.description.toLowerCase().includes(searchTerm);
    const categoryMatch = article.category.toLowerCase().includes(searchTerm);
    const tagsMatch = article.tags.some(tag => tag.toLowerCase().includes(searchTerm));

    let categoryFilterMatch = true;
    if (activeTab !== 'all') {
      categoryFilterMatch = article.category.toLowerCase() === activeTab;
    }

    return (titleMatch || descriptionMatch || categoryMatch || tagsMatch) && categoryFilterMatch;
  });

  const categories = [...new Set(articlesData.map(article => article.category))];

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-white">База знаний</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Поиск статей..."
              className="bg-cyberdark-700 border-cyberdark-600 text-gray-300 placeholder-gray-500 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyberblue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
          <Button variant="outline" className="bg-cyberdark-700 border-cyberdark-600 text-gray-300 hover:bg-cyberdark-600 hover:text-white rounded-md">
            <Filter className="mr-2 h-4 w-4" />
            Фильтры
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-4" onValueChange={(value) => setActiveTab(value)}>
        <TabsList className="bg-cyberdark-800 border-cyberdark-700 rounded-md p-1 inline-flex space-x-2">
          <TabsTrigger value="all" className="data-[state=active]:bg-cyberblue-500 data-[state=active]:text-white text-gray-300 hover:bg-cyberdark-700 hover:text-gray-100 rounded-md px-3 py-2 text-sm font-medium focus:outline-none transition-colors">
            Все статьи
          </TabsTrigger>
          {categories.map(category => (
            <TabsTrigger key={category} value={category.toLowerCase()} className="data-[state=active]:bg-cyberblue-500 data-[state=active]:text-white text-gray-300 hover:bg-cyberdark-700 hover:text-gray-100 rounded-md px-3 py-2 text-sm font-medium focus:outline-none transition-colors">
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map(article => (
              <Card key={article.id} className="bg-cyberdark-800 border-cyberdark-700">
                {article.imageUrl && (
                  <img src={article.imageUrl} alt={article.title} className="rounded-md h-48 w-full object-cover mb-4" />
                )}
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <Link to={`/knowledge/article/${article.id}`} className="text-lg font-semibold text-white hover:text-cyberblue-500 transition-colors">
                      {article.title}
                    </Link>
                    <Bookmark className="h-5 w-5 text-gray-400 hover:text-cyberblue-500 transition-colors cursor-pointer" />
                  </div>
                  <p className="text-gray-400 text-sm mb-4">{article.description}</p>
                  <div className="flex flex-wrap items-center space-x-2 mb-4">
                    {article.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="bg-cyberdark-700 border-cyberdark-600 text-gray-300 rounded-full px-2 py-1 text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex justify-between items-center text-gray-500 text-xs">
                    <div className="flex items-center">
                      <BookOpen className="mr-1 h-4 w-4" />
                      <span>{article.category}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4" />
                      <span>{article.date}</span>
                      <span className="mx-2">•</span>
                      <Clock className="mr-1 h-4 w-4" />
                      <span>{article.readTime} мин</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        {categories.map(category => (
          <TabsContent key={category} value={category.toLowerCase()} className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles
                .filter(article => article.category.toLowerCase() === category.toLowerCase())
                .map(article => (
                  <Card key={article.id} className="bg-cyberdark-800 border-cyberdark-700">
                    {article.imageUrl && (
                      <img src={article.imageUrl} alt={article.title} className="rounded-md h-48 w-full object-cover mb-4" />
                    )}
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <Link to={`/knowledge/article/${article.id}`} className="text-lg font-semibold text-white hover:text-cyberblue-500 transition-colors">
                          {article.title}
                        </Link>
                        <Bookmark className="h-5 w-5 text-gray-400 hover:text-cyberblue-500 transition-colors cursor-pointer" />
                      </div>
                      <p className="text-gray-400 text-sm mb-4">{article.description}</p>
                      <div className="flex flex-wrap items-center space-x-2 mb-4">
                        {article.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="bg-cyberdark-700 border-cyberdark-600 text-gray-300 rounded-full px-2 py-1 text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex justify-between items-center text-gray-500 text-xs">
                        <div className="flex items-center">
                          <BookOpen className="mr-1 h-4 w-4" />
                          <span>{article.category}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="mr-1 h-4 w-4" />
                          <span>{article.date}</span>
                          <span className="mx-2">•</span>
                          <Clock className="mr-1 h-4 w-4" />
                          <span>{article.readTime} мин</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
      <ChatAssistant />
    </div>
  );
}
