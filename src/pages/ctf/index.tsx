import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Search, 
  Filter, 
  ChevronDown, 
  Award, 
  Clock, 
  CheckCircle2, 
  Flag
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import ChatAssistant from '@/components/layout/ChatAssistant';

interface Challenge {
  id: number;
  title: string;
  category: string;
  difficulty: string;
  points: number;
  solvedBy: number;
  flag: string;
}

const challengesData: Challenge[] = [
  {
    id: 1,
    title: "Web Challenge 1",
    category: "Web",
    difficulty: "Easy",
    points: 100,
    solvedBy: 50,
    flag: "flag{web_easy_1}"
  },
  {
    id: 2,
    title: "Crypto Challenge 1",
    category: "Crypto",
    difficulty: "Medium",
    points: 200,
    solvedBy: 30,
    flag: "flag{crypto_medium_1}"
  },
  {
    id: 3,
    title: "Reverse Engineering Challenge 1",
    category: "Reverse Engineering",
    difficulty: "Hard",
    points: 300,
    solvedBy: 15,
    flag: "flag{reverse_hard_1}"
  },
  {
    id: 4,
    title: "Web Challenge 2",
    category: "Web",
    difficulty: "Medium",
    points: 150,
    solvedBy: 40,
    flag: "flag{web_medium_2}"
  },
  {
    id: 5,
    title: "Forensics Challenge 1",
    category: "Forensics",
    difficulty: "Easy",
    points: 120,
    solvedBy: 55,
    flag: "flag{forensics_easy_1}"
  },
];

const CTFPlatform = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  const categories = ['All', 'Web', 'Crypto', 'Reverse Engineering', 'Forensics'];
  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

  const filteredChallenges = challengesData.filter(challenge => {
    const searchMatch = challenge.title.toLowerCase().includes(searchQuery.toLowerCase());
    const categoryMatch = selectedCategory === 'All' || challenge.category === selectedCategory;
    const difficultyMatch = selectedDifficulty === 'All' || challenge.difficulty === selectedDifficulty;

    return searchMatch && categoryMatch && difficultyMatch;
  });

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-white">CTF Платформа</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Поиск заданий..."
              className="bg-cyberdark-700 border-cyberdark-600 text-gray-300 pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
          <Button variant="outline" className="bg-cyberdark-700 border-cyberdark-600 text-gray-300 hover:bg-cyberdark-600">
            <Filter className="mr-2" />
            Фильтры
            <ChevronDown className="ml-2" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-4">
        <TabsList className="bg-cyberdark-800 border-cyberdark-700 rounded-md p-1 inline-flex items-center">
          {categories.map(category => (
            <TabsTrigger 
              key={category} 
              value={category.toLowerCase()}
              className={`data-[state=active]:bg-cyberblue-500 data-[state=active]:text-white text-gray-300 rounded-md px-4 py-2 text-sm font-medium focus:outline-none transition-colors ${selectedCategory === category ? 'bg-cyberblue-500 text-white' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChallenges.map(challenge => (
          <Card key={challenge.id} className="bg-cyberdark-800 border-cyberdark-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-white">{challenge.title}</h2>
                  <Badge className="bg-cyberdark-700 text-gray-300 border-cyberdark-600 mt-1">{challenge.category}</Badge>
                </div>
                <div className="text-right">
                  <Award className="text-cyberblue-500 inline-block mr-1" />
                  <span className="text-gray-400">{challenge.points}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2 mb-3">
                <Clock className="text-gray-500 w-4 h-4" />
                <span className="text-sm text-gray-500">Сложность: {challenge.difficulty}</span>
              </div>
              <Progress value={(challenge.solvedBy / 100) * 100} className="mb-4" />
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Решили: {challenge.solvedBy}%</span>
                <Link to={`/ctf/challenge/${challenge.id}`}>
                  <Button className="bg-cyberblue-500 hover:bg-cyberblue-600 text-white">
                    Решить
                    <Flag className="ml-2" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <ChatAssistant />
    </div>
  );
};

export default CTFPlatform;
