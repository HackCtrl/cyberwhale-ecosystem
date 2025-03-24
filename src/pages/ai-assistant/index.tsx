import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Zap, 
  Cpu, 
  Brain, 
  Shield, 
  Terminal,
  Code,
  Database
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

const AIAssistant = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Привет! Я твой ИИ-ассистент. Чем могу помочь?',
    },
  ]);
  const [input, setInput] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (input.trim() !== '') {
      const newMessage = {
        id: Date.now(),
        sender: 'user',
        text: input,
      };
      setMessages([...messages, newMessage]);
      setInput('');

      // Simulate bot response (replace with actual AI logic)
      setTimeout(() => {
        const botResponse = {
          id: Date.now() + 1,
          sender: 'bot',
          text: `Я получил твое сообщение: "${input}". Вот что я думаю... (Это просто пример ответа)`,
        };
        setMessages((prevMessages) => [...prevMessages, botResponse]);
      }, 500);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4 flex items-center text-white">
        <Bot className="mr-2 w-6 h-6" />
        ИИ Ассистент
      </h1>

      <Card className="mb-4">
        <CardContent className="p-4">
          <p className="text-gray-400">
            Используйте ИИ-ассистента для получения помощи и советов по кибербезопасности.
          </p>
        </CardContent>
      </Card>

      <div className="flex flex-col h-[500px] bg-cyberdark-800 rounded-md shadow-md border border-cyberdark-700 overflow-hidden">
        <div 
          className="flex-grow p-4 overflow-y-auto"
          ref={chatContainerRef}
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-2 flex flex-col ${message.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`rounded-lg p-2 text-sm ${message.sender === 'user'
                  ? 'bg-cyberblue-500 text-white'
                  : 'bg-gray-700 text-gray-300'
                  }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-cyberdark-700">
          <div className="flex items-center">
            <Input
              type="text"
              placeholder="Введите сообщение..."
              className="flex-grow rounded-l-md bg-cyberdark-700 border-cyberdark-600 text-white"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSend();
                }
              }}
            />
            <Button 
              onClick={handleSend} 
              className="rounded-r-md bg-cyberblue-500 hover:bg-cyberblue-600"
            >
              <Send className="w-4 h-4 mr-2" />
              Отправить
            </Button>
          </div>
        </div>
      </div>

      <Separator className="my-4 bg-cyberdark-700" />

      <h2 className="text-xl font-semibold mb-4 text-white">Возможности</h2>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="bg-cyberdark-800 rounded-md p-2 border border-cyberdark-700">
          <TabsTrigger value="general" className="data-[state=active]:bg-cyberblue-500 data-[state=active]:text-white">
            <Brain className="mr-2 w-4 h-4" />
            Общие
          </TabsTrigger>
          <TabsTrigger value="ctf" className="data-[state=active]:bg-cyberblue-500 data-[state=active]:text-white">
            <Shield className="mr-2 w-4 h-4" />
            CTF
          </TabsTrigger>
          <TabsTrigger value="development" className="data-[state=active]:bg-cyberblue-500 data-[state=active]:text-white">
            <Code className="mr-2 w-4 h-4" />
            Разработка
          </TabsTrigger>
          <TabsTrigger value="system" className="data-[state=active]:bg-cyberblue-500 data-[state=active]:text-white">
            <Cpu className="mr-2 w-4 h-4" />
            Системные
          </TabsTrigger>
        </TabsList>
        <TabsContent value="general" className="mt-4">
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-2 text-white">Общие вопросы</h3>
              <p className="text-gray-400">
                Задавайте вопросы общие вопросы по кибербезопасности,
                получайте определения терминов и концепций.
              </p>
              <Badge className="mt-2 bg-green-500 text-white">Пример: Что такое XSS?</Badge>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="ctf" className="mt-4">
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-2 text-white">CTF</h3>
              <p className="text-gray-400">
                Получайте подсказки и советы по прохождению CTF-заданий,
                узнавайте о техниках и инструментах.
              </p>
              <Badge className="mt-2 bg-yellow-500 text-white">Пример: Как найти flag в веб-приложении?</Badge>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="development" className="mt-4">
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-2 text-white">Разработка</h3>
              <p className="text-gray-400">
                Получайте советы по безопасной разработке, узнавайте о
                лучших практиках и уязвимостях.
              </p>
              <Badge className="mt-2 bg-blue-500 text-white">Пример: Как защитить API от атак?</Badge>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="system" className="mt-4">
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-2 text-white">Системные вопросы</h3>
              <p className="text-gray-400">
                Задавайте вопросы о безопасности операционных систем, сетей и
                серверов.
              </p>
              <Badge className="mt-2 bg-red-500 text-white">Пример: Как настроить firewall?</Badge>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIAssistant;
