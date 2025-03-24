
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  Book, 
  Calendar, 
  Clock, 
  Tag, 
  ChevronLeft, 
  ChevronRight, 
  ThumbsUp, 
  MessageSquare,
  Bookmark
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ChatAssistant from '@/components/layout/ChatAssistant';

interface Article {
  id: number;
  title: string;
  content: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    avatar?: string;
  };
  date: string;
  readTime: number;
}

const articles = [
  {
    id: 1,
    title: "Understanding Cybersecurity Threats",
    content: "This is a detailed article about common cybersecurity threats...",
    category: "Cybersecurity",
    tags: ["threats", "security"],
    author: { name: "John Doe" },
    date: "2023-01-01",
    readTime: 10,
  },
  {
    id: 2,
    title: "The Basics of Network Security",
    content: "This article covers the fundamentals of network security...",
    category: "Network Security",
    tags: ["network", "security"],
    author: { name: "Jane Smith" },
    date: "2023-02-15",
    readTime: 15,
  },
];

export default function ArticlePage() {
  const { id } = useParams<{ id: string }>();
  const articleId = parseInt(id || '0', 10);
  const article = articles.find((a) => a.id === articleId);

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <Card className="mb-8">
        <CardContent className="p-8">
          <div className="mb-6">
            <Link to="/knowledge" className="text-cyberblue-500 hover:text-cyberblue-400 flex items-center">
              <ChevronLeft className="w-4 h-4 mr-1" />
              Назад к базе знаний
            </Link>
          </div>

          <h1 className="text-3xl font-semibold text-white mb-4">{article.title}</h1>

          <div className="flex items-center text-gray-400 mb-4">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{article.date}</span>
            <span className="mx-2">&middot;</span>
            <Clock className="w-4 h-4 mr-2" />
            <span>{article.readTime} мин</span>
            <span className="mx-2">&middot;</span>
            <Tag className="w-4 h-4 mr-2" />
            <span>{article.category}</span>
          </div>

          <p className="text-gray-400 leading-relaxed">{article.content}</p>

          <div className="mt-6">
            {article.tags.map((tag) => (
              <Badge key={tag} className="mr-2">{tag}</Badge>
            ))}
          </div>

          <div className="mt-8 border-t border-cyberdark-700 pt-4 flex justify-between items-center">
            <div className="flex items-center">
              <Button variant="ghost" className="mr-4">
                <ThumbsUp className="w-4 h-4 mr-2" />
                Полезно
              </Button>
              <Button variant="ghost">
                <MessageSquare className="w-4 h-4 mr-2" />
                Комментарии
              </Button>
            </div>
            <Button variant="secondary">
              <Bookmark className="w-4 h-4 mr-2" />
              Сохранить
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Похожие статьи</h2>
              <ul>
                <li>
                  <Link to="/knowledge/article/1" className="text-cyberblue-500 hover:text-cyberblue-400 flex items-center">
                    <ChevronRight className="w-4 h-4 mr-1" />
                    Статья 1
                  </Link>
                </li>
                <li>
                  <Link to="/knowledge/article/2" className="text-cyberblue-500 hover:text-cyberblue-400 flex items-center">
                    <ChevronRight className="w-4 h-4 mr-1" />
                    Статья 2
                  </Link>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
        <div>
          <ChatAssistant />
        </div>
      </div>
    </div>
  );
}
