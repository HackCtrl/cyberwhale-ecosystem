
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bot, 
  Send, 
  ArrowRight, 
  Check, 
  BrainCog, 
  Rocket, 
  Shield, 
  Code, 
  BookOpen, 
  Zap, 
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ChatAssistant from '@/components/layout/ChatAssistant';

type Message = {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
};

export default function AIAssistant() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Привет! Я CyberWhale, ваш ИИ-наставник по кибербезопасности. Давайте начнем наше увлекательное путешествие! 🖊️',
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
    if (messages.length === 1) {
      inputRef.current?.focus();
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      isBot: false,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        "Отличный вопрос! В кибербезопасности очень важно начинать с основ. Я рекомендую изучить наш раздел по веб-уязвимостям. Там вы найдете материалы для начинающих. Также попробуйте решить несколько простых CTF-заданий для практики.",
        "Для начинающих в CTF рекомендую начать с простых задач в разделе Web. Там вы найдете задания для новичков с подробными объяснениями. Постепенно переходите к более сложным заданиям по мере получения опыта.",
        "Криптография - увлекательное направление! Вы можете найти материалы в нашей базе знаний и практические задания на платформе CTF. Начните с изучения основных алгоритмов шифрования, таких как AES и RSA.",
        "Обязательно ознакомьтесь с нашими лабораторными работами для практики. Теория важна, но практика — ключ к успеху в кибербезопасности. У нас есть виртуальные лаборатории для безопасного тестирования различных уязвимостей.",
        "В нашем сообществе много опытных специалистов. Не стесняйтесь задавать вопросы и делиться своим опытом! Также регулярно проводятся мероприятия и вебинары, где вы можете получить новые знания и установить полезные контакты."
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const botMessage: Message = {
        id: Date.now().toString(),
        text: randomResponse,
        isBot: true,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  // Example questions
  const exampleQuestions = [
    "Как начать изучение кибербезопасности?",
    "Что такое SQL-инъекции и как от них защититься?",
    "Как решать CTF задания по криптографии?",
    "Какие инструменты нужны для тестирования на проникновение?",
    "Как защитить веб-приложение от XSS атак?"
  ];

  const handleExampleQuestion = (question: string) => {
    setMessage(question);
    inputRef.current?.focus();
  };

  return (
    <div className="min-h-screen bg-cyberdark-900 flex flex-col">
      <Navbar />
      
      <div className="pt-20 flex-grow">
        {/* Hero section */}
        <div className="bg-gradient-to-b from-cyberdark-800 to-cyberdark-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-3xl font-bold text-white sm:text-4xl mb-4">
                ИИ АССИСТЕНТ
              </h1>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">
                <span className="text-gradient">Получайте мгновенную помощь и рекомендации</span>
              </h2>
              <p className="text-lg text-gray-300 mb-6">
                Наш продвинутый ИИ-ассистент всегда готов помочь вам с изучением кибербезопасности, решением задач и 
                предоставлением персонализированных рекомендаций.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Chat interface */}
            <div className="lg:w-2/3">
              <div className="bg-cyberdark-800 rounded-lg border border-cyberdark-700 overflow-hidden shadow-lg">
                {/* Chat header */}
                <div className="bg-cyberdark-700 p-4 flex items-center border-b border-cyberdark-600">
                  <div className="w-10 h-10 bg-cyberblue-500 rounded-full flex items-center justify-center mr-3">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">CyberWhale ИИ</h3>
                    <div className="text-xs text-gray-400">Уровень 1 • 0 очков</div>
                  </div>
                </div>
                
                {/* Chat messages */}
                <div className="p-4 h-[500px] overflow-y-auto">
                  <div className="space-y-4">
                    {messages.map((msg) => (
                      <div 
                        key={msg.id} 
                        className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}
                      >
                        {msg.isBot && (
                          <div className="w-8 h-8 bg-cyberblue-500 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                            <Bot className="w-4 h-4 text-white" />
                          </div>
                        )}
                        <div 
                          className={`max-w-[80%] rounded-lg p-3 ${
                            msg.isBot ? "bg-cyberdark-700 text-white" : "bg-cyberblue-500 text-white"
                          }`}
                        >
                          {msg.text}
                          <div 
                            className={`text-xs mt-1 opacity-70 ${
                              msg.isBot ? "text-left" : "text-right"
                            }`}
                          >
                            {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </div>
                        </div>
                        {!msg.isBot && (
                          <div className="w-8 h-8 bg-cyberblue-600 rounded-full flex items-center justify-center ml-2 flex-shrink-0">
                            <User className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="w-8 h-8 bg-cyberblue-500 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                        <div className="bg-cyberdark-700 rounded-lg px-4 py-3 text-white">
                          <div className="flex space-x-2">
                            <div className="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                            <div className="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                            <div className="h-2 w-2 bg-white rounded-full animate-bounce"></div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </div>
                
                {/* Chat input */}
                <div className="bg-cyberdark-700 p-4 border-t border-cyberdark-600">
                  <form onSubmit={handleSubmit} className="flex">
                    <Input
                      ref={inputRef}
                      type="text"
                      placeholder="Задайте вопрос..."
                      className="bg-cyberdark-600 border-cyberdark-500 flex-1"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      disabled={isTyping}
                    />
                    <Button 
                      type="submit" 
                      className="ml-2 bg-cyberblue-500 hover:bg-cyberblue-600"
                      disabled={!message.trim() || isTyping}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                  <div className="mt-4">
                    <h4 className="text-sm text-gray-400 mb-2">Примеры вопросов:</h4>
                    <div className="flex flex-wrap gap-2">
                      {exampleQuestions.map((question, index) => (
                        <Badge 
                          key={index} 
                          variant="outline" 
                          className="bg-cyberdark-600 border-cyberdark-500 cursor-pointer hover:bg-cyberdark-500 transition-colors"
                          onClick={() => handleExampleQuestion(question)}
                        >
                          {question}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Features sidebar */}
            <div className="lg:w-1/3 space-y-6">
              <div className="bg-cyberdark-800 rounded-lg border border-cyberdark-700 p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <BrainCog className="w-5 h-5 mr-2 text-cyberblue-500" />
                  Возможности ИИ
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-cyberblue-500/20 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                      <Check className="w-3 h-3 text-cyberblue-500" />
                    </div>
                    <span className="text-gray-300">Помощь в изучении кибербезопасности</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-cyberblue-500/20 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                      <Check className="w-3 h-3 text-cyberblue-500" />
                    </div>
                    <span className="text-gray-300">Подсказки для решения CTF заданий</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-cyberblue-500/20 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                      <Check className="w-3 h-3 text-cyberblue-500" />
                    </div>
                    <span className="text-gray-300">Объяснение сложных концепций</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-cyberblue-500/20 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                      <Check className="w-3 h-3 text-cyberblue-500" />
                    </div>
                    <span className="text-gray-300">Рекомендации по инструментам и методам</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-cyberblue-500/20 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                      <Check className="w-3 h-3 text-cyberblue-500" />
                    </div>
                    <span className="text-gray-300">Персонализированное обучение</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-cyberdark-800 rounded-lg border border-cyberdark-700 p-6">
                <Tabs defaultValue="ctf">
                  <TabsList className="grid grid-cols-2 mb-4">
                    <TabsTrigger value="ctf">CTF Помощь</TabsTrigger>
                    <TabsTrigger value="learn">Обучение</TabsTrigger>
                  </TabsList>
                  <TabsContent value="ctf" className="space-y-4">
                    <h3 className="text-white font-medium">Как ИИ помогает с CTF:</h3>
                    <div className="bg-cyberdark-700 rounded-md p-3 flex items-start">
                      <Shield className="w-5 h-5 text-cyberblue-500 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="text-white font-medium mb-1">Подсказки без спойлеров</h4>
                        <p className="text-sm text-gray-300">Получайте наводящие подсказки, которые помогут решить задание, но не раскроют полный ответ.</p>
                      </div>
                    </div>
                    <div className="bg-cyberdark-700 rounded-md p-3 flex items-start">
                      <Code className="w-5 h-5 text-cyberblue-500 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="text-white font-medium mb-1">Объяснение концепций</h4>
                        <p className="text-sm text-gray-300">Понимание основных принципов и технологий, необходимых для решения задач.</p>
                      </div>
                    </div>
                    <Link to="/ctf" className="inline-flex items-center text-cyberblue-500 hover:text-cyberblue-400 mt-2">
                      Перейти к CTF платформе
                      <ArrowRight className="ml-1 w-4 h-4" />
                    </Link>
                  </TabsContent>
                  <TabsContent value="learn" className="space-y-4">
                    <h3 className="text-white font-medium">Как ИИ помогает в обучении:</h3>
                    <div className="bg-cyberdark-700 rounded-md p-3 flex items-start">
                      <BookOpen className="w-5 h-5 text-cyberblue-500 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="text-white font-medium mb-1">Персонализированные пути обучения</h4>
                        <p className="text-sm text-gray-300">Индивидуальные рекомендации материалов на основе ваших интересов и уровня.</p>
                      </div>
                    </div>
                    <div className="bg-cyberdark-700 rounded-md p-3 flex items-start">
                      <Rocket className="w-5 h-5 text-cyberblue-500 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="text-white font-medium mb-1">Интерактивное обучение</h4>
                        <p className="text-sm text-gray-300">Задавайте вопросы и получайте подробные объяснения сложных тем.</p>
                      </div>
                    </div>
                    <Link to="/knowledge" className="inline-flex items-center text-cyberblue-500 hover:text-cyberblue-400 mt-2">
                      Перейти к базе знаний
                      <ArrowRight className="ml-1 w-4 h-4" />
                    </Link>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
          
          {/* Features section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Почему стоит использовать ИИ-ассистента</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-cyberdark-800 rounded-lg p-6 border border-cyberdark-700 flex flex-col">
                <div className="bg-gradient-to-br from-cyberblue-500 to-cyberblue-700 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <BrainCog className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Интеллектуальные ответы</h3>
                <p className="text-gray-300 flex-grow">
                  Получайте точные и контекстуально релевантные ответы на ваши вопросы по кибербезопасности.
                </p>
              </div>
              
              <div className="bg-cyberdark-800 rounded-lg p-6 border border-cyberdark-700 flex flex-col">
                <div className="bg-gradient-to-br from-cyberblue-500 to-cyberblue-700 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Мгновенная помощь</h3>
                <p className="text-gray-300 flex-grow">
                  Получайте помощь в режиме реального времени, когда она вам нужна, без необходимости ждать ответа от людей.
                </p>
              </div>
              
              <div className="bg-cyberdark-800 rounded-lg p-6 border border-cyberdark-700 flex flex-col">
                <div className="bg-gradient-to-br from-cyberblue-500 to-cyberblue-700 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Доступен 24/7</h3>
                <p className="text-gray-300 flex-grow">
                  Наш ИИ-ассистент всегда доступен для помощи, независимо от времени суток или дня недели.
                </p>
              </div>
            </div>
          </div>
          
          {/* Testimonials */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Что говорят пользователи</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-cyberdark-800 rounded-lg p-6 border border-cyberdark-700">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-cyberdark-600"></div>
                  <div className="ml-3">
                    <h4 className="font-medium text-white">Алексей П.</h4>
                    <p className="text-gray-400 text-sm">Пентестер</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-4">
                  "ИИ-ассистент помог мне разобраться в сложных концепциях криптографии. Объяснения очень понятные и легко усваиваются."
                </p>
                <div className="flex text-yellow-500">
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                </div>
              </div>
              
              <div className="bg-cyberdark-800 rounded-lg p-6 border border-cyberdark-700">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-cyberdark-600"></div>
                  <div className="ml-3">
                    <h4 className="font-medium text-white">Мария С.</h4>
                    <p className="text-gray-400 text-sm">Студентка</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-4">
                  "Как новичку в кибербезопасности, ИИ-ассистент стал для меня настоящим спасением. Он терпеливо отвечает на все мои вопросы и направляет обучение."
                </p>
                <div className="flex text-yellow-500">
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                </div>
              </div>
              
              <div className="bg-cyberdark-800 rounded-lg p-6 border border-cyberdark-700">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-cyberdark-600"></div>
                  <div className="ml-3">
                    <h4 className="font-medium text-white">Дмитрий В.</h4>
                    <p className="text-gray-400 text-sm">Разработчик</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-4">
                  "Использую ИИ-ассистента при решении CTF задач. Подсказки очень помогают, при этом не раскрывая полностью решение."
                </p>
                <div className="flex text-yellow-500">
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <HalfStarIcon />
                </div>
              </div>
            </div>
          </div>
          
          {/* CTA section */}
          <div className="mt-16 bg-gradient-to-r from-cyberdark-800 to-cyberdark-700 rounded-lg overflow-hidden border border-cyberdark-700">
            <div className="md:flex">
              <div className="p-8 md:w-2/3">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Начните использовать ИИ-ассистента сегодня
                </h2>
                <p className="text-gray-300 mb-6">
                  Зарегистрируйтесь на платформе CyberWhale и получите полный доступ к ИИ-ассистенту и всем возможностям
                  нашей экосистемы кибербезопасности.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/register">
                    <Button className="bg-cyberblue-500 hover:bg-cyberblue-600">
                      Зарегистрироваться
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to="/about">
                    <Button variant="outline">
                      Узнать больше
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="md:w-1/3 bg-cyberdark-700 flex items-center justify-center p-8">
                <div className="w-24 h-24 rounded-full bg-cyberblue-500/20 flex items-center justify-center">
                  <Bot className="h-12 w-12 text-cyberblue-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <ChatAssistant />
    </div>
  );
}

// Star icon components
const StarIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
  </svg>
);

const HalfStarIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <defs>
      <linearGradient id="halfGradient">
        <stop offset="50%" stopColor="currentColor" />
        <stop offset="50%" stopColor="#4B5563" />
      </linearGradient>
    </defs>
    <path fill="url(#halfGradient)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
  </svg>
);

// User icon component
const User = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);
