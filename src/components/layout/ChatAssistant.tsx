
import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Minimize2, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

type Message = {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
};

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Привет! Я CyberWhale, ваш ИИ-наставник по кибербезопасности. Давайте начнем наше увлекательное путешествие! 🖊️',
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      inputRef.current?.focus();
    }
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    // Добавляем сообщение пользователя
    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      isBot: false,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);

    try {
      // Отправляем запрос к нашей Edge Function
      const { data, error } = await supabase.functions.invoke('chat-assistant', {
        body: {
          message: message.trim(),
          history: messages.slice(-5) // Отправляем последние 5 сообщений для контекста
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      if (!data || !data.botResponse) {
        throw new Error("Получен пустой ответ от сервера");
      }

      // Добавляем ответ бота
      const botMessage: Message = {
        id: Date.now().toString(),
        text: data.botResponse,
        isBot: true,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
      setRetryCount(0); // Сбрасываем счетчик попыток при успешном ответе
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Произошла ошибка при отправке сообщения");
      
      // Добавляем сообщение об ошибке от бота
      const errorMessage: Message = {
        id: Date.now().toString(),
        text: "Извините, произошла ошибка при обработке вашего запроса. Пожалуйста, попробуйте позже.",
        isBot: true,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
      setRetryCount(prev => prev + 1);
      
      // Если слишком много ошибок подряд, предлагаем альтернативный вариант
      if (retryCount >= 2) {
        setTimeout(() => {
          const helpMessage: Message = {
            id: Date.now().toString(),
            text: "Похоже, возникли проблемы с подключением к AI. Вы можете попробовать перезагрузить страницу или воспользоваться основными функциями без ИИ.",
            isBot: true,
            timestamp: new Date(),
          };
          setMessages(prev => [...prev, helpMessage]);
        }, 1000);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Floating chat button */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="w-14 h-14 rounded-full bg-cyberblue-500 hover:bg-cyberblue-600 text-white shadow-glow flex items-center justify-center transition-all duration-300 animate-pulse-light"
        >
          <Bot className="w-6 h-6" />
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div 
          className={cn(
            "bg-cyberdark-900 border border-cyberdark-700 rounded-lg shadow-lg overflow-hidden transition-all duration-300 flex flex-col",
            isMinimized ? "w-72 h-16" : "w-80 sm:w-96 h-[500px]"
          )}
        >
          {/* Header */}
          <div className="bg-cyberdark-800 p-3 flex items-center justify-between border-b border-cyberdark-700">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-cyberblue-500 rounded-full flex items-center justify-center mr-2">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-white font-medium">CyberWhale ИИ</h3>
                <div className="text-xs text-gray-400">Уровень 1 • 0 очков</div>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <button 
                onClick={toggleMinimize} 
                className="p-1 text-gray-400 hover:text-white rounded-full hover:bg-cyberdark-700"
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </button>
              <button 
                onClick={toggleChat} 
                className="p-1 text-gray-400 hover:text-white rounded-full hover:bg-cyberdark-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages container */}
              <div className="flex-1 p-4 overflow-y-auto">
                {messages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={cn(
                      "mb-4 max-w-[80%] animate-slide-in",
                      msg.isBot ? "mr-auto" : "ml-auto"
                    )}
                  >
                    <div 
                      className={cn(
                        "rounded-lg p-3",
                        msg.isBot 
                          ? "bg-cyberdark-800 text-white" 
                          : "bg-cyberblue-500 text-white"
                      )}
                    >
                      {msg.text}
                    </div>
                    <div 
                      className={cn(
                        "text-xs mt-1 text-gray-400",
                        msg.isBot ? "text-left" : "text-right"
                      )}
                    >
                      {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="mb-4 max-w-[80%] mr-auto">
                    <div className="bg-cyberdark-800 rounded-lg p-3 flex items-center space-x-2">
                      <div className="h-2 w-2 bg-gray-500 rounded-full animate-pulse"></div>
                      <div className="h-2 w-2 bg-gray-500 rounded-full animate-pulse delay-75"></div>
                      <div className="h-2 w-2 bg-gray-500 rounded-full animate-pulse delay-150"></div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Message input */}
              <div className="p-3 border-t border-cyberdark-700">
                <form onSubmit={handleSubmit} className="flex">
                  <Input
                    ref={inputRef}
                    type="text"
                    placeholder="Задайте вопрос..."
                    className="bg-cyberdark-800 border-cyberdark-700 flex-1"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={isLoading}
                  />
                  <Button 
                    type="submit" 
                    size="icon" 
                    className="ml-2 bg-cyberblue-500 hover:bg-cyberblue-600"
                    disabled={!message.trim() || isLoading}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
