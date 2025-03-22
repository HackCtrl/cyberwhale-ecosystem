
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Clock, 
  User, 
  Calendar, 
  ThumbsUp, 
  Share, 
  Bookmark, 
  Tag, 
  BookOpen
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from '@/components/ui/use-toast';
import { Article } from '@/types';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ChatAssistant from '@/components/layout/ChatAssistant';

// Mock articles data
const mockArticles: Record<string, Article> = {
  '1': {
    id: '1',
    title: 'Wireshark',
    description: 'Мощный анализатор сетевого трафика для исследования сетевых протоколов и пакетов.',
    content: `# Wireshark - анализатор сетевого трафика

Wireshark - один из самых популярных и мощных инструментов для анализа сетевого трафика. Он позволяет перехватывать и интерактивно просматривать содержимое сетевых пакетов.

## Основные возможности Wireshark

- Перехват пакетов в реальном времени
- Глубокий анализ сотен протоколов
- Просмотр и фильтрация пакетов по множеству критериев
- Импорт и экспорт данных в различные форматы
- Поиск пакетов по разным параметрам
- Цветовое кодирование пакетов для удобного анализа

## Интерфейс Wireshark

Интерфейс Wireshark состоит из трех основных панелей:

1. **Панель списка пакетов** - отображает все перехваченные пакеты
2. **Панель деталей пакета** - показывает детали выбранного пакета
3. **Панель байтов пакета** - отображает необработанные данные пакета в шестнадцатеричном и ASCII форматах

## Использование фильтров

Фильтры - мощная функция Wireshark, которая позволяет вам сосредоточиться на конкретных типах трафика. Существует два типа фильтров:

- **Фильтры захвата** - определяют, какие пакеты будут перехвачены
- **Фильтры отображения** - определяют, какие пакеты из уже перехваченных будут показаны

### Примеры фильтров

\`\`\`
tcp.port == 80  # Показать только HTTP трафик
ip.addr == 192.168.1.1  # Показать трафик с указанным IP-адресом
http  # Показать только HTTP трафик
dns  # Показать только DNS трафик
\`\`\`

## Анализ трафика

Wireshark особенно полезен для:

- Определения причин проблем с сетью
- Обнаружения аномалий и потенциальных атак
- Анализа производительности сети
- Изучения протоколов и их работы
- Отладки сетевых приложений

## Безопасное использование

Важно помнить о нескольких моментах при использовании Wireshark:

- Получите разрешение перед анализом сетевого трафика
- Соблюдайте политики конфиденциальности
- Не перехватывайте конфиденциальные данные (пароли, личную информацию)
- Всегда используйте Wireshark для легитимных целей

## Заключение

Wireshark - незаменимый инструмент в арсенале любого специалиста по кибербезопасности или сетевого администратора. Освоив его, вы сможете глубже понимать работу сетей и эффективнее диагностировать проблемы.`,
    category: 'tools',
    tags: ['network', 'traffic', 'security'],
    level: 'beginner',
    author: 'Сергей Иванов',
    readTime: 8,
    createdAt: new Date('2023-07-15'),
    updatedAt: new Date('2023-07-15'),
  },
  '2': {
    id: '2',
    title: 'Настройка Kali Linux',
    description: 'Пошаговое руководство по настройке и оптимизации Kali Linux для тестирования на проникновение.',
    content: `# Настройка Kali Linux для тестирования на проникновение

Kali Linux - это дистрибутив Linux на базе Debian, предназначенный для продвинутого тестирования на проникновение и аудита безопасности. Это руководство поможет вам настроить и оптимизировать Kali Linux для ваших потребностей.

## Установка Kali Linux

Существует несколько способов установки Kali Linux:

1. **Полная установка** - установка Kali как основной операционной системы
2. **Dual Boot** - установка Kali рядом с вашей текущей ОС (Windows/macOS)
3. **Виртуальная машина** - запуск Kali в VirtualBox или VMware
4. **Live USB** - запуск Kali с USB-накопителя без установки

Для большинства пользователей рекомендуется использовать виртуальную машину или dual boot.

## Настройка после установки

### 1. Обновление системы

Первое, что следует сделать после установки Kali Linux, это обновить систему:

\`\`\`bash
sudo apt update
sudo apt upgrade -y
sudo apt dist-upgrade -y
\`\`\`

### 2. Установка дополнительных инструментов

Kali Linux включает множество инструментов для тестирования на проникновение, но вы можете установить дополнительные:

\`\`\`bash
sudo apt install -y gobuster dirbuster wpscan burpsuite nikto sqlmap
\`\`\`

### 3. Настройка рабочего окружения

#### Установка дополнительных рабочих столов

По умолчанию Kali использует XFCE, но вы можете установить другие:

\`\`\`bash
# Для GNOME
sudo apt install -y kali-desktop-gnome

# Для KDE
sudo apt install -y kali-desktop-kde
\`\`\`

#### Настройка брандмауэра

Включите и настройте брандмауэр UFW:

\`\`\`bash
sudo apt install -y ufw
sudo ufw enable
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw status verbose
\`\`\`

### 4. Оптимизация для виртуальной машины

Если вы используете Kali в виртуальной машине, установите гостевые дополнения:

\`\`\`bash
# Для VirtualBox
sudo apt install -y virtualbox-guest-x11

# Для VMware
sudo apt install -y open-vm-tools-desktop
\`\`\`

### 5. Настройка безопасности

#### Смена учетных данных по умолчанию

Измените пароль пользователя root и создайте нового пользователя:

\`\`\`bash
# Изменить пароль root
sudo passwd root

# Создать нового пользователя
sudo adduser yourusername
sudo usermod -aG sudo yourusername
\`\`\`

#### Настройка SSH

Настройте SSH для безопасного удаленного доступа:

\`\`\`bash
sudo apt install -y openssh-server
sudo systemctl enable ssh
sudo nano /etc/ssh/sshd_config
\`\`\`

Внесите следующие изменения в конфигурацию:
- PermitRootLogin no
- PasswordAuthentication no (если используете ключи)
- Port [нестандартный порт]

\`\`\`bash
sudo systemctl restart ssh
\`\`\`

## Установка необходимых инструментов по категориям

### Сбор информации
\`\`\`bash
sudo apt install -y maltego nmap dnsrecon theHarvester dmitry
\`\`\`

### Анализ уязвимостей
\`\`\`bash
sudo apt install -y openvas nikto owasp-zap lynis
\`\`\`

### Веб-приложения
\`\`\`bash
sudo apt install -y burpsuite zaproxy sqlmap wpscan dirb
\`\`\`

### Атаки на пароли
\`\`\`bash
sudo apt install -y hydra john hashcat
\`\`\`

### Беспроводные атаки
\`\`\`bash
sudo apt install -y aircrack-ng wifite kismet
\`\`\`

## Заключение

Теперь ваша система Kali Linux настроена и оптимизирована для тестирования на проникновение. Помните, что Kali Linux - это мощный инструмент, который следует использовать ответственно и только на системах, на которые у вас есть разрешение на тестирование.`,
    category: 'guides',
    tags: ['linux', 'security', 'setup'],
    level: 'beginner',
    author: 'Алексей Петров',
    readTime: 12,
    createdAt: new Date('2023-08-10'),
    updatedAt: new Date('2023-08-10'),
  },
  '3': {
    id: '3',
    title: 'Основы криптографии',
    description: 'Базовый курс по криптографии и ее применению в информационной безопасности.',
    content: `# Основы криптографии

Криптография - это наука о методах обеспечения конфиденциальности, целостности данных, аутентификации и невозможности отказа от авторства. В этой статье мы рассмотрим основные концепции криптографии и их применение в информационной безопасности.

## Основные цели криптографии

1. **Конфиденциальность** - защита информации от несанкционированного доступа
2. **Целостность** - обеспечение невозможности изменения информации без обнаружения
3. **Аутентификация** - подтверждение подлинности источника информации
4. **Невозможность отказа от авторства** - невозможность отрицания факта отправки или получения информации

## Симметричное шифрование

При симметричном шифровании один и тот же ключ используется как для шифрования, так и для дешифрования данных.

### Примеры алгоритмов симметричного шифрования

- **AES (Advanced Encryption Standard)** - современный стандарт шифрования, используемый правительством США
- **DES (Data Encryption Standard)** - исторический алгоритм, сейчас считается небезопасным
- **3DES (Triple DES)** - усиленная версия DES
- **Blowfish, Twofish, RC4, RC5, RC6** - другие популярные алгоритмы

### Преимущества симметричного шифрования

- Высокая скорость работы
- Простота реализации
- Малые вычислительные затраты

### Недостатки симметричного шифрования

- Проблема безопасной передачи ключа
- Сложность управления ключами при большом количестве участников

## Асимметричное шифрование

Асимметричное шифрование использует пару ключей: открытый (публичный) ключ для шифрования и закрытый (приватный) ключ для дешифрования.

### Примеры алгоритмов асимметричного шифрования

- **RSA** - один из первых и наиболее распространенных алгоритмов
- **ElGamal** - основан на проблеме вычисления дискретного логарифма
- **ECC (Elliptic Curve Cryptography)** - основан на эллиптических кривых
- **DSA (Digital Signature Algorithm)** - используется для создания цифровых подписей

### Преимущества асимметричного шифрования

- Решение проблемы распределения ключей
- Обеспечение невозможности отказа от авторства с помощью цифровых подписей
- Большее количество функциональных возможностей

### Недостатки асимметричного шифрования

- Низкая скорость работы
- Высокие вычислительные затраты
- Сложность реализации

## Хеширование

Хеширование - это процесс преобразования произвольного массива данных в строку фиксированной длины с помощью хеш-функции.

### Примеры хеш-функций

- **MD5** - сейчас считается небезопасным
- **SHA-1** - также считается небезопасным для критических применений
- **SHA-256, SHA-384, SHA-512** - более современные и безопасные алгоритмы
- **BLAKE2, BLAKE3** - высокопроизводительные хеш-функции
- **Argon2, bcrypt, scrypt** - функции, разработанные специально для хеширования паролей

### Свойства криптографических хеш-функций

- **Детерминированность** - одни и те же входные данные всегда дают один и тот же результат
- **Быстрота вычисления** - хеш-функция должна быть достаточно эффективной
- **Необратимость** - невозможность восстановления исходных данных по хешу
- **Эффект лавины** - небольшое изменение входных данных приводит к существенному изменению хеша
- **Устойчивость к коллизиям** - сложность нахождения двух разных входных данных с одинаковым хешем

## Цифровые подписи

Цифровая подпись - это математическая схема, позволяющая проверить подлинность, целостность и авторство цифрового документа.

### Процесс создания и проверки цифровой подписи

1. Отправитель создает хеш документа
2. Отправитель шифрует хеш своим закрытым ключом, создавая цифровую подпись
3. Отправитель отправляет документ и цифровую подпись получателю
4. Получатель расшифровывает подпись с помощью открытого ключа отправителя
5. Получатель создает хеш полученного документа и сравнивает с расшифрованным хешем

### Применение цифровых подписей

- Подписание электронных документов
- Аутентификация сообщений
- Подтверждение подлинности программного обеспечения
- Защита от изменений в электронных транзакциях

## Заключение

Криптография является фундаментальной составляющей информационной безопасности. Понимание основных концепций и механизмов криптографии необходимо для создания и оценки безопасных систем. В этой статье мы рассмотрели лишь базовые принципы, но криптография - обширная и постоянно развивающаяся область знаний.`,
    category: 'courses',
    tags: ['cryptography', 'security', 'theory'],
    level: 'beginner',
    author: 'Мария Сидорова',
    readTime: 15,
    createdAt: new Date('2023-06-25'),
    updatedAt: new Date('2023-06-25'),
  },
};

// Map difficulty to color classes
const levelColors: Record<Article['level'], string> = {
  beginner: 'bg-green-500/20 text-green-400 border-green-500/30',
  intermediate: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  advanced: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
};

// Define level labels
const levelLabels: Record<Article['level'], string> = {
  beginner: 'Начинающий',
  intermediate: 'Средний',
  advanced: 'Продвинутый',
};

export default function ArticlePage() {
  const { id } = useParams<{ id: string }>();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(42);
  const [isLiked, setIsLiked] = useState(false);
  
  // Get article data
  const article = id ? mockArticles[id] : null;
  
  if (!article) {
    return (
      <div className="min-h-screen bg-cyberdark-900 flex flex-col">
        <Navbar />
        <div className="pt-20 flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Статья не найдена</h2>
            <p className="text-gray-400 mb-6">Статья с указанным идентификатором не существует.</p>
            <Link to="/knowledge">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Вернуться к базе знаний
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Удалено из закладок" : "Добавлено в закладки",
      description: isBookmarked 
        ? "Статья удалена из ваших закладок." 
        : "Статья добавлена в ваши закладки для удобного доступа.",
    });
  };

  const toggleLike = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setIsLiked(!isLiked);
  };

  const shareArticle = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.description,
        url: window.location.href,
      })
      .catch((error) => console.log('Error sharing', error));
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Ссылка скопирована",
        description: "Ссылка на статью скопирована в буфер обмена.",
      });
    }
  };

  // Convert markdown to HTML (simplified for demo)
  const formatContent = (content: string) => {
    // In a real app, you would use a markdown library like marked or remark
    const html = content
      .replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold text-white mt-8 mb-4">$1</h1>')
      .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold text-white mt-6 mb-3">$1</h2>')
      .replace(/^### (.+)$/gm, '<h3 class="text-xl font-bold text-white mt-5 mb-2">$1</h3>')
      .replace(/^#### (.+)$/gm, '<h4 class="text-lg font-bold text-white mt-4 mb-2">$1</h4>')
      .replace(/^(.+)$/gm, (match) => {
        if (
          match.startsWith('# ') || 
          match.startsWith('## ') || 
          match.startsWith('### ') || 
          match.startsWith('#### ') ||
          match.startsWith('```') ||
          match.trim() === ''
        ) {
          return match;
        }
        return `<p class="text-gray-300 mb-4">${match}</p>`;
      })
      .replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold text-white">$1</strong>')
      .replace(/\*(.+?)\*/g, '<em class="italic">$1</em>')
      .replace(/```([^`]+)```/g, '<pre class="bg-cyberdark-700 p-4 rounded-md my-4 overflow-x-auto text-gray-300 font-mono text-sm">$1</pre>')
      .replace(/`(.+?)`/g, '<code class="bg-cyberdark-700 px-1 py-0.5 rounded text-gray-300 font-mono text-sm">$1</code>')
      .replace(/- (.+)$/gm, '<li class="flex items-start mb-2"><div class="w-2 h-2 bg-cyberblue-500 rounded-full mt-2 mr-2 flex-shrink-0"></div><div>$1</div></li>')
      .replace(/([0-9]+)\. (.+)$/gm, '<li class="flex items-start mb-2"><div class="flex-shrink-0 font-bold text-cyberblue-500 mr-2">$1.</div><div>$2</div></li>');
      
    // Very simplified, a real implementation would be more comprehensive
    return html;
  };

  return (
    <div className="min-h-screen bg-cyberdark-900 flex flex-col">
      <Navbar />
      
      <div className="pt-20 flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumbs */}
          <div className="mb-6">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <Link to="/knowledge" className="text-gray-400 hover:text-white">
                    База знаний
                  </Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <span className="mx-2 text-gray-500">/</span>
                    <Link to={`/knowledge?category=${article.category}`} className="text-gray-400 hover:text-white">
                      {article.category === 'tools' && 'Инструменты'}
                      {article.category === 'guides' && 'Руководства'}
                      {article.category === 'courses' && 'Курсы'}
                      {article.category === 'labs' && 'Лаборатории'}
                    </Link>
                  </div>
                </li>
                <li aria-current="page">
                  <div className="flex items-center">
                    <span className="mx-2 text-gray-500">/</span>
                    <span className="text-gray-300 truncate max-w-[150px] sm:max-w-xs">{article.title}</span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
          
          {/* Article header */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <Badge variant="outline" className="bg-cyberdark-700 border-cyberdark-600">
                {article.category === 'tools' && 'Инструмент'}
                {article.category === 'guides' && 'Руководство'}
                {article.category === 'courses' && 'Курс'}
                {article.category === 'labs' && 'Лаборатория'}
              </Badge>
              <Badge variant="outline" className={levelColors[article.level]}>
                {levelLabels[article.level]}
              </Badge>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{article.title}</h1>
            
            <p className="text-xl text-gray-300 mb-6">{article.description}</p>
            
            <div className="flex flex-wrap items-center text-sm text-gray-400 gap-y-2">
              <div className="flex items-center mr-6">
                <User className="w-4 h-4 mr-1" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center mr-6">
                <Clock className="w-4 h-4 mr-1" />
                <span>{article.readTime} мин чтения</span>
              </div>
              <div className="flex items-center mr-6">
                <Calendar className="w-4 h-4 mr-1" />
                <span>{article.createdAt.toLocaleDateString()}</span>
              </div>
              <div className="flex flex-wrap gap-2 ml-auto">
                {article.tags.map((tag) => (
                  <div key={tag} className="inline-flex items-center rounded-full bg-cyberdark-700 px-2.5 py-0.5 text-xs font-medium text-gray-300">
                    <Tag className="mr-1 h-3 w-3" />
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <Separator className="mb-8 bg-cyberdark-700" />
          
          {/* Article content */}
          <div className="prose prose-invert max-w-none mb-12">
            <div 
              className="article-content" 
              dangerouslySetInnerHTML={{ __html: formatContent(article.content) }}
            />
          </div>
          
          {/* Article footer */}
          <Separator className="mb-8 bg-cyberdark-700" />
          
          <div className="flex flex-wrap justify-between items-center mb-12">
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                size="sm" 
                className={isLiked ? "bg-cyberblue-500/20 border-cyberblue-500/50" : ""}
                onClick={toggleLike}
              >
                <ThumbsUp className={`mr-2 h-4 w-4 ${isLiked ? "text-cyberblue-500" : ""}`} />
                <span>{likeCount}</span>
              </Button>
              
              <Button variant="outline" size="sm" onClick={shareArticle}>
                <Share className="mr-2 h-4 w-4" />
                <span>Поделиться</span>
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                className={isBookmarked ? "bg-yellow-500/20 border-yellow-500/50" : ""}
                onClick={toggleBookmark}
              >
                <Bookmark className={`mr-2 h-4 w-4 ${isBookmarked ? "text-yellow-500" : ""}`} />
                <span>{isBookmarked ? "В закладках" : "В закладки"}</span>
              </Button>
            </div>
            
            <div className="mt-4 sm:mt-0">
              <Link to="/knowledge">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  <span>К списку статей</span>
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Related articles */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-white mb-6">Похожие статьи</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.values(mockArticles)
                .filter(a => a.id !== article.id && (a.category === article.category || a.tags.some(tag => article.tags.includes(tag))))
                .slice(0, 2)
                .map((relatedArticle) => (
                  <Link 
                    key={relatedArticle.id} 
                    to={`/knowledge/article/${relatedArticle.id}`}
                    className="bg-cyberdark-800 rounded-lg overflow-hidden border border-cyberdark-700 hover:border-cyberblue-500/50 transition-all duration-300"
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="outline" className="bg-cyberdark-700 border-cyberdark-600">
                          {relatedArticle.category === 'tools' && 'Инструмент'}
                          {relatedArticle.category === 'guides' && 'Руководство'}
                          {relatedArticle.category === 'courses' && 'Курс'}
                          {relatedArticle.category === 'labs' && 'Лаборатория'}
                        </Badge>
                        <Badge variant="outline" className={levelColors[relatedArticle.level]}>
                          {levelLabels[relatedArticle.level]}
                        </Badge>
                      </div>
                      
                      <h3 className="text-lg font-bold text-white mb-2">{relatedArticle.title}</h3>
                      
                      <p className="text-gray-300 mb-4 line-clamp-2">
                        {relatedArticle.description}
                      </p>
                      
                      <div className="flex items-center text-sm text-gray-400">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{relatedArticle.readTime} мин чтения</span>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
          
          {/* Get started section */}
          <div className="bg-gradient-to-r from-cyberdark-800 to-cyberdark-800/50 rounded-lg p-6 border border-cyberdark-700">
            <div className="flex items-center mb-4">
              <BookOpen className="h-6 w-6 text-cyberblue-500 mr-2" />
              <h2 className="text-xl font-bold text-white">Продолжить обучение</h2>
            </div>
            
            <p className="text-gray-300 mb-6">
              Готовы углубить свои знания и навыки? Ознакомьтесь с другими материалами нашей базы знаний 
              или практикуйтесь на практических задачах CTF.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/knowledge">
                <Button variant="outline">
                  Все статьи
                </Button>
              </Link>
              <Link to="/ctf">
                <Button className="bg-cyberblue-500 hover:bg-cyberblue-600">
                  Практические задания
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
      <ChatAssistant />
    </div>
  );
}
