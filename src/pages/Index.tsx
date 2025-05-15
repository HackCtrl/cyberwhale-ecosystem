import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Shield, 
  Code, 
  Terminal, 
  UserCheck, 
  Book, 
  Cpu, 
  Bot, 
  Database, 
  Users, 
  ArrowRight,
  Zap,
  Award,
  Check,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/layout/Navbar';
import ChatAssistant from '@/components/layout/ChatAssistant';

export default function HomePage() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  
  // Parallax effect for hero background
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 300]);

  // Animate on scroll refs
  const featuresRef = useRef<HTMLDivElement>(null);
  const ctfRef = useRef<HTMLDivElement>(null);
  const aiRef = useRef<HTMLDivElement>(null);
  const communityRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            entry.target.classList.add('opacity-100');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = [
      featuresRef.current,
      ctfRef.current,
      aiRef.current,
      communityRef.current,
      statsRef.current,
      testimonialsRef.current,
      ctaRef.current,
    ];

    elements.forEach((el) => {
      if (el) {
        el.classList.add('opacity-0');
        observer.observe(el);
      }
    });

    return () => {
      elements.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const HeroStars = () => (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(100)].map((_, i) => (
        <div 
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: Math.random() * 2 + 1 + 'px',
            height: Math.random() * 2 + 1 + 'px',
            top: Math.random() * 100 + '%',
            left: Math.random() * 100 + '%',
            opacity: Math.random() * 0.5 + 0.3,
            animation: `pulse-light ${Math.random() * 3 + 2}s ease-in-out infinite ${Math.random() * 2}s`
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-cyberdark-900">
      <Navbar />
      
      {/* Hero section */}
      <div ref={targetRef} className="relative pt-16 pb-32 overflow-hidden">
        <HeroStars />
        
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ 
            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
            y: parallaxY
          }}
        />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pt-24 sm:pb-32">
          <motion.div
            style={{ opacity, scale, y }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge variant="outline" className="mb-6 px-4 py-2 bg-cyberdark-800/80 backdrop-blur-md border-cyberdark-700 text-gray-300">
              Ваш путь к мастерству в кибербезопасности
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
              <span className="block text-white">Освойте кибербезопасность с</span>
              <span className="block text-cyberblue-500 mt-2">CyberWhale</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
              Продвинутые CTF-задания, обучение с помощью ИИ и профессиональные
              инструменты безопасности. Присоединяйтесь к новому поколению специалистов
              по кибербезопасности.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/products">
                <Button className="text-white bg-cyberblue-500 hover:bg-cyberblue-600 btn-glow text-lg px-8 py-6">
                  Наши продукты
                  <Zap className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/ctf">
                <Button variant="outline" className="text-white text-lg px-8 py-6">
                  Смотреть задания
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-cyberdark-900 to-transparent"></div>
      </div>
      
      {/* Features section */}
      <div ref={featuresRef} className="transition-opacity duration-1000 bg-cyberdark-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl font-bold text-cyberblue-400 mb-2">ВОЗМОЖНОСТИ</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white">
              Всё необходимое для освоения кибербезопасности
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-cyberdark-800 rounded-lg p-6 border border-cyberdark-700 hover:border-cyberblue-500/50 transition-all duration-300 hover:shadow-glow-sm flex flex-col">
              <div className="bg-cyberdark-700 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-cyberblue-500" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">CTF Платформа</h4>
              <p className="text-gray-300 mb-6 flex-grow">
                Практикуйтесь на реальных сценариях и соревнуйтесь в заданиях разной сложности.
              </p>
              <Link to="/ctf" className="text-cyberblue-400 hover:text-cyberblue-300 font-medium flex items-center">
                Перейти к платформе
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            
            <div className="bg-cyberdark-800 rounded-lg p-6 border border-cyberdark-700 hover:border-cyberblue-500/50 transition-all duration-300 hover:shadow-glow-sm flex flex-col">
              <div className="bg-cyberdark-700 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                <Bot className="h-8 w-8 text-cyberblue-500" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">ИИ Ассистент</h4>
              <p className="text-gray-300 mb-6 flex-grow">
                Получайте мгновенную помощь и рекомендации от нашего продвинутого ИИ-ассистента.
              </p>
              <Link to="/ai-assistant" className="text-cyberblue-400 hover:text-cyberblue-300 font-medium flex items-center">
                Познакомиться с ассистентом
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            
            <div className="bg-cyberdark-800 rounded-lg p-6 border border-cyberdark-700 hover:border-cyberblue-500/50 transition-all duration-300 hover:shadow-glow-sm flex flex-col">
              <div className="bg-cyberdark-700 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-cyberblue-500" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Сообщество</h4>
              <p className="text-gray-300 mb-6 flex-grow">
                Обменивайтесь опытом с другими профессионалами и энтузиастами кибербезопасности.
              </p>
              <Link to="/community" className="text-cyberblue-400 hover:text-cyberblue-300 font-medium flex items-center">
                Присоединиться к сообществу
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            
            <div className="bg-cyberdark-800 rounded-lg p-6 border border-cyberdark-700 hover:border-cyberblue-500/50 transition-all duration-300 hover:shadow-glow-sm flex flex-col">
              <div className="bg-cyberdark-700 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                <Database className="h-8 w-8 text-cyberblue-500" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">База знаний</h4>
              <p className="text-gray-300 mb-6 flex-grow">
                Получите доступ к обширной коллекции учебных материалов, руководств и лабораторных работ.
              </p>
              <Link to="/knowledge" className="text-cyberblue-400 hover:text-cyberblue-300 font-medium flex items-center">
                Изучить материалы
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTF Platform section */}
      <div ref={ctfRef} className="transition-opacity duration-1000 bg-gradient-to-b from-cyberdark-900 to-cyberdark-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:gap-12">
            <div className="lg:w-1/2 mb-12 lg:mb-0">
              <h2 className="text-2xl font-bold text-cyberblue-400 mb-2">CTF ПЛАТФОРМА</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Проверьте свои навыки в реальных сценариях
              </h3>
              <p className="text-xl text-gray-300 mb-8">
                Наша CTF платформа предлагает разнообразные задания по кибербезопасности, от начального до продвинутого уровня. 
                Решайте задачи, зарабатывайте очки и соревнуйтесь с другими участниками.
              </p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-cyberblue-500/20 flex items-center justify-center mr-3">
                    <Check className="h-4 w-4 text-cyberblue-500" />
                  </div>
                  <p className="text-gray-300">
                    <span className="font-medium text-white">Реалистичные сценарии</span> - практические задания, основанные на реальных уязвимостях
                  </p>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-cyberblue-500/20 flex items-center justify-center mr-3">
                    <Check className="h-4 w-4 text-cyberblue-500" />
                  </div>
                  <p className="text-gray-300">
                    <span className="font-medium text-white">Разные категории</span> - от веб-безопасности до криптографии и реверс-инжиниринга
                  </p>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-cyberblue-500/20 flex items-center justify-center mr-3">
                    <Check className="h-4 w-4 text-cyberblue-500" />
                  </div>
                  <p className="text-gray-300">
                    <span className="font-medium text-white">Соревнования</span> - регулярные CTF турниры с ценными призами
                  </p>
                </li>
              </ul>
              
              <Link to="/ctf">
                <Button className="bg-cyberblue-500 hover:bg-cyberblue-600 btn-glow">
                  Перейти к заданиям
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            <div className="lg:w-1/2">
              <div className="glass-card rounded-lg overflow-hidden border border-cyberdark-700 shadow-lg">
                <div className="bg-cyberdark-800 p-4 border-b border-cyberdark-700">
                  <h4 className="font-medium text-white">Capture The Flag</h4>
                </div>
                <div className="p-6">
                  <div className="mb-6">
                    <h5 className="text-xl font-bold text-white mb-4">Статистика платформы</h5>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-cyberdark-700 p-4 rounded-md">
                        <div className="text-2xl font-bold text-white">25+</div>
                        <div className="text-sm text-gray-400">Активных заданий</div>
                      </div>
                      <div className="bg-cyberdark-700 p-4 rounded-md">
                        <div className="text-2xl font-bold text-white">500+</div>
                        <div className="text-sm text-gray-400">Участников</div>
                      </div>
                      <div className="bg-cyberdark-700 p-4 rounded-md">
                        <div className="text-2xl font-bold text-white">8</div>
                        <div className="text-sm text-gray-400">Категорий</div>
                      </div>
                      <div className="bg-cyberdark-700 p-4 rounded-md">
                        <div className="text-2xl font-bold text-white">3</div>
                        <div className="text-sm text-gray-400">Уровня сложности</div>
                      </div>
                    </div>
                  </div>
                  
                  <h5 className="text-xl font-bold text-white mb-4">Топ категорий</h5>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-cyberdark-600 flex items-center justify-center mr-3">
                        <Code className="h-4 w-4 text-cyberblue-400" />
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between mb-1">
                          <span className="text-white">Web</span>
                          <span className="text-gray-400">12 заданий</span>
                        </div>
                        <div className="w-full bg-cyberdark-600 rounded-full h-2">
                          <div className="bg-cyberblue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-cyberdark-600 flex items-center justify-center mr-3">
                        <Shield className="h-4 w-4 text-cyberblue-400" />
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between mb-1">
                          <span className="text-white">Криптография</span>
                          <span className="text-gray-400">8 заданий</span>
                        </div>
                        <div className="w-full bg-cyberdark-600 rounded-full h-2">
                          <div className="bg-cyberblue-500 h-2 rounded-full" style={{ width: '50%' }}></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-cyberdark-600 flex items-center justify-center mr-3">
                        <Cpu className="h-4 w-4 text-cyberblue-400" />
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between mb-1">
                          <span className="text-white">Реверс-инжиниринг</span>
                          <span className="text-gray-400">9 заданий</span>
                        </div>
                        <div className="w-full bg-cyberdark-600 rounded-full h-2">
                          <div className="bg-cyberblue-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* AI Assistant section */}
      <div ref={aiRef} className="transition-opacity duration-1000 bg-cyberdark-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:gap-12 flex-row-reverse">
            <div className="lg:w-1/2 mb-12 lg:mb-0">
              <h2 className="text-2xl font-bold text-cyberblue-400 mb-2">ИИ АССИСТЕНТ</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Получайте мгновенную помощь и рекомендации
              </h3>
              <p className="text-xl text-gray-300 mb-8">
                Наш продвинутый ИИ-ассистент всегда готов помочь вам с изучением кибербезопасности, решением задач и 
                предоставлением персонализированных рекомендаций.
              </p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-cyberblue-500/20 flex items-center justify-center mr-3">
                    <Check className="h-4 w-4 text-cyberblue-500" />
                  </div>
                  <p className="text-gray-300">
                    <span className="font-medium text-white">Персональный помощник</span> - задавайте вопросы и получайте конкретные ответы
                  </p>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-cyberblue-500/20 flex items-center justify-center mr-3">
                    <Check className="h-4 w-4 text-cyberblue-500" />
                  </div>
                  <p className="text-gray-300">
                    <span className="font-medium text-white">Интеллектуальные подсказки</span> - получайте рекомендации по решению заданий CTF
                  </p>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-cyberblue-500/20 flex items-center justify-center mr-3">
                    <Check className="h-4 w-4 text-cyberblue-500" />
                  </div>
                  <p className="text-gray-300">
                    <span className="font-medium text-white">Доступен 24/7</span> - круглосуточная поддержка в любое удобное время
                  </p>
                </li>
              </ul>
              
              <Link to="/ai-assistant">
                <Button className="bg-cyberblue-500 hover:bg-cyberblue-600 btn-glow">
                  Попробовать ИИ-ассистента
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            <div className="lg:w-1/2">
              <div className="glass-card rounded-lg overflow-hidden border border-cyberdark-700 shadow-lg">
                <div className="bg-cyberdark-800 p-4 border-b border-cyberdark-700 flex items-center">
                  <div className="w-8 h-8 bg-cyberblue-500 rounded-full flex items-center justify-center mr-2">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">CyberWhale ИИ</h4>
                    <div className="text-xs text-gray-400">Уровень 1 • 0 очков</div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start max-w-[80%]">
                      <div className="bg-cyberdark-700 rounded-lg p-3 text-white">
                        Привет! Я CyberWhale, ваш ИИ-наставник по кибербезопасности. Давайте начнем наше увлекательное путешествие! 🖊️
                      </div>
                    </div>
                    
                    <div className="flex items-start ml-auto max-w-[80%]">
                      <div className="bg-cyberblue-500 rounded-lg p-3 text-white ml-auto">
                        Привет! Я хочу научиться кибербезопасности. С чего лучше начать?
                      </div>
                    </div>
                    
                    <div className="flex items-start max-w-[80%]">
                      <div className="bg-cyberdark-700 rounded-lg p-3 text-white">
                        Отличный вопрос! В кибербезопасности очень важно начинать с основ. Я рекомендую изучить наш раздел по веб-уязвимостям, где вы найдете материалы для начинающих. Также попробуйте решить несколько простых CTF-заданий для практики.
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-cyberdark-700">
                    <div className="flex">
                      <input
                        type="text"
                        placeholder="Задайте вопрос..."
                        className="bg-cyberdark-700 border-cyberdark-600 rounded-l-md flex-1 px-4 py-2 text-white"
                      />
                      <button className="bg-cyberblue-500 text-white rounded-r-md px-4 flex items-center">
                        <ArrowRight className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Community section */}
      <div ref={communityRef} className="transition-opacity duration-1000 bg-gradient-to-b from-cyberdark-800 to-cyberdark-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:gap-12">
            <div className="lg:w-1/2 mb-12 lg:mb-0">
              <h2 className="text-2xl font-bold text-cyberblue-400 mb-2">СООБЩЕСТВО</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Присоединяйтесь к нашей сети безопасности
              </h3>
              <p className="text-xl text-gray-300 mb-8">
                Присоединяйтесь к активному сообществу специалистов и энтузиастов кибербезопасности. 
                Обменивайтесь опытом, участвуйте в дискуссиях и расширяйте свою профессиональную сеть.
              </p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-cyberblue-500/20 flex items-center justify-center mr-3">
                    <Check className="h-4 w-4 text-cyberblue-500" />
                  </div>
                  <p className="text-gray-300">
                    <span className="font-medium text-white">5,000+ активных участников</span> - общайтесь с единомышленниками
                  </p>
                </li>
                <li className="flex items-center">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-cyberblue-500/20 flex items-center justify-center mr-3">
                    <Check className="h-4 w-4 text-cyberblue-500" />
                  </div>
                  <p className="text-gray-300">
                    <span className="font-medium text-white">Каналы для обсуждений 24/7</span> - всегда найдется тема для разговора
                  </p>
                </li>
                <li className="flex items-center">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-cyberblue-500/20 flex items-center justify-center mr-3">
                    <Check className="h-4 w-4 text-cyberblue-500" />
                  </div>
                  <p className="text-gray-300">
                    <span className="font-medium text-white">Еженедельные события и воркшопы</span> - регулярное обучение и нетворкинг
                  </p>
                </li>
              </ul>
              
              <a href="https://t.me/HackCtrl_Official" target="_blank" rel="noopener noreferrer">
                <Button className="bg-cyberblue-500 hover:bg-cyberblue-600 btn-glow">
                  Присоединиться к Telegram
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
            
            <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-card rounded-lg overflow-hidden border border-cyberdark-700 shadow-lg">
                <div className="p-6">
                  <h5 className="text-xl font-bold text-white mb-4">Обзор сообщества</h5>
                  <ul className="space-y-4">
                    <li className="flex items-center">
                      <Users className="w-5 h-5 text-cyberblue-400 mr-3" />
                      <span className="text-gray-300">5,000+ активных участников</span>
                    </li>
                    <li className="flex items-center">
                      <Terminal className="w-5 h-5 text-cyberblue-400 mr-3" />
                      <span className="text-gray-300">Каналы для обсуждений 24/7</span>
                    </li>
                    <li className="flex items-center">
                      <Calendar className="w-5 h-5 text-cyberblue-400 mr-3" />
                      <span className="text-gray-300">Еженедельные события и воркшопы</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="glass-card rounded-lg overflow-hidden border border-cyberdark-700 shadow-lg">
                <div className="p-6">
                  <h5 className="text-xl font-bold text-white mb-4">Предстоящие события</h5>
                  <ul className="space-y-4">
                    <li>
                      <div className="flex items-center mb-1">
                        <div className="w-2 h-2 bg-cyberblue-500 rounded-full mr-2"></div>
                        <span className="text-xs text-cyberblue-400">Завтра, 14:00 МСК</span>
                      </div>
                      <h6 className="font-medium text-white">Воркшоп по веб-безопасности</h6>
                      <p className="text-gray-400 text-sm">Изучите распространенные веб-уязвимости и методы их предотвращения.</p>
                    </li>
                    <li>
                      <div className="flex items-center mb-1">
                        <div className="w-2 h-2 bg-cyberblue-500 rounded-full mr-2"></div>
                        <span className="text-xs text-cyberblue-400">Следующая неделя, 18:00 МСК</span>
                      </div>
                      <h6 className="font-medium text-white">CTF Соревнование</h6>
                      <p className="text-gray-400 text-sm">Проверьте свои навыки в нашем ежемесячном соревновании.</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats section */}
      <div ref={statsRef} className="transition-opacity duration-1000 bg-cyberdark-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl font-bold text-cyberblue-400 mb-2">СТАТИСТИКА</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white">
              Наши достижения в цифрах
            </h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gradient-to-br from-cyberdark-800 to-cyberdark-700 rounded-lg p-6 border border-cyberdark-700 text-center">
              <div className="w-14 h-14 bg-cyberdark-700/50 rounded-lg flex items-center justify-center mx-auto mb-4">
                <UserCheck className="h-8 w-8 text-cyberblue-500" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">5,000+</div>
              <div className="text-gray-400">Активных пользователей</div>
            </div>
            
            <div className="bg-gradient-to-br from-cyberdark-800 to-cyberdark-700 rounded-lg p-6 border border-cyberdark-700 text-center">
              <div className="w-14 h-14 bg-cyberdark-700/50 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-cyberblue-500" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">100+</div>
              <div className="text-gray-400">CTF заданий</div>
            </div>
            
            <div className="bg-gradient-to-br from-cyberdark-800 to-cyberdark-700 rounded-lg p-6 border border-cyberdark-700 text-center">
              <div className="w-14 h-14 bg-cyberdark-700/50 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Book className="h-8 w-8 text-cyberblue-500" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">50+</div>
              <div className="text-gray-400">Учебных материалов</div>
            </div>
            
            <div className="bg-gradient-to-br from-cyberdark-800 to-cyberdark-700 rounded-lg p-6 border border-cyberdark-700 text-center">
              <div className="w-14 h-14 bg-cyberdark-700/50 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-cyberblue-500" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">20+</div>
              <div className="text-gray-400">Партнеров</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}