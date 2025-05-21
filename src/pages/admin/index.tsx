// src/pages/admin/index.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, 
  Upload, 
  Download, 
  Plus, 
  FileJson, 
  Settings,
  Users,
  Database,
  Search,
  Filter,
  Trash2,
  Edit,
  Eye,
  CheckCircle,
  XCircle,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Challenge } from '@/types';
import { mockChallenges } from '@/data/challenges'; // Используем локальный mock

export default function AdminPanel() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showPreviewDialog, setShowPreviewDialog] = useState(false);
  const [importFile, setImportFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [challenges, setChallenges] = useState<Challenge[]>(mockChallenges); // Локальное состояние

  // Проверка пароля
  const handlePasswordSubmit = () => {
    if (password === '301062Ki') {
      setIsAuthenticated(true);
    } else {
      toast({
        title: 'Неверный пароль',
        description: 'Введите правильный пароль для доступа к админ-панели',
        variant: 'destructive',
      });
    }
  };

  // Синхронизация mockChallenges с challenges при каждом изменении challenges
  useEffect(() => {
    // Обновляем mockChallenges, чтобы изменения сохранялись
    mockChallenges.length = 0; // Очищаем старые данные
    mockChallenges.push(...challenges); // Добавляем новые данные
  }, [challenges]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-cyberdark-900 flex items-center justify-center">
        <Card className="bg-cyberdark-800 border-cyberdark-700 w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-white">Вход в админ-панель</CardTitle>
            <CardDescription className="text-gray-400">
              Введите пароль для доступа
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-cyberdark-700 border-cyberdark-600"
              />
              <Button onClick={handlePasswordSubmit} className="w-full">
                Войти
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImportFile(e.target.files[0]);
    }
  };

  const handleImport = async () => {
    if (!importFile) {
      toast({
        title: "Ошибка",
        description: "Выберите файл для импорта",
        variant: "destructive",
      });
      return;
    }

    setProcessing(true);
    try {
      const content = await importFile.text();
      console.log('Raw JSON content:', content); // Логируем для отладки
      const newChallenges = JSON.parse(content);

      // Валидация
      if (!Array.isArray(newChallenges)) {
        throw new Error('JSON должен содержать массив заданий');
      }

      newChallenges.forEach((challenge: any, index: number) => {
        if (!challenge.id || !challenge.title || !challenge.description || !challenge.category) {
          throw new Error(`Некорректный формат задания #${index + 1}. Отсутствуют обязательные поля: id, title, description или category. Данные: ${JSON.stringify(challenge)}`);
        }
      });

      // Проверка на дубликаты
      const existingIds = new Set(challenges.map(c => c.id));
      for (const challenge of newChallenges) {
        if (existingIds.has(challenge.id)) {
          throw new Error(`Кейс с ID ${challenge.id} уже существует`);
        }
      }

      // Добавляем новые кейсы в локальный массив
      const updatedChallenges = [
        ...challenges,
        ...newChallenges.map((c: any) => ({
          id: c.id,
          title: c.title,
          description: c.description,
          category: c.category,
          difficulty: c.difficulty || 'beginner',
          points: c.points || 100,
          tags: c.tags || [],
          solved: c.solved ?? false,
          solvedBy: c.solvedBy ?? 0,
          createdAt: c.createdAt ? new Date(c.createdAt) : new Date(),
          updatedAt: c.updatedAt ? new Date(c.updatedAt) : new Date(),
          downloadUrl: c.downloadUrl || '',
          fileType: c.fileType || '',
        })),
      ];
      setChallenges(updatedChallenges); // Обновляем состояние, что вызовет useEffect для синхронизации

      toast({
        title: "Успешно",
        description: `Импортировано ${newChallenges.length} заданий`,
      });

      setImportFile(null);
    } catch (error) {
      console.error('Import error:', error); // Логируем ошибку
      toast({
        title: "Ошибка импорта",
        description: error instanceof Error ? error.message : 'Неизвестная ошибка при импорте',
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  const handleExport = () => {
    const data = JSON.stringify(challenges, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ctf-challenges.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Экспорт завершен",
      description: "Задания успешно экспортированы",
    });
  };

  const handleDelete = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (selectedChallenge) {
      const updatedChallenges = challenges.filter(c => c.id !== selectedChallenge.id);
      setChallenges(updatedChallenges); // Обновляем состояние, что вызовет useEffect для синхронизации
      toast({
        title: "Задание удалено",
        description: `Задание "${selectedChallenge.title}" успешно удалено`,
      });
    }
    setShowDeleteDialog(false);
    setSelectedChallenge(null);
  };

  const handlePreview = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    setShowPreviewDialog(true);
  };

  const filteredChallenges = challenges.filter(challenge => {
    const matchesSearch = 
      challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      challenge.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = filterCategory === 'all' || challenge.category === filterCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-cyberdark-900 pt-20 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Панель администратора</h1>
            <p className="text-gray-400 mt-2">Управление CTF заданиями и платформой</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button onClick={() => navigate('/admin/settings')} variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Настройки
            </Button>
            <Button onClick={() => navigate('/admin/users')} variant="outline">
              <Users className="w-4 h-4 mr-2" />
              Пользователи
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-cyberdark-800 border-cyberdark-700">
            <CardHeader>
              <CardTitle className="text-white">Всего заданий</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{challenges.length}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-cyberdark-800 border-cyberdark-700">
            <CardHeader>
              <CardTitle className="text-white">Активные задания</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">
                {challenges.filter(c => !c.solved).length}
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-cyberdark-800 border-cyberdark-700">
            <CardHeader>
              <CardTitle className="text-white">Категории</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">
                {new Set(challenges.map(c => c.category)).size}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-cyberdark-800 border-cyberdark-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white">Управление заданиями</CardTitle>
            <CardDescription className="text-gray-400">
              Импортируйте, экспортируйте и управляйте CTF заданиями
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <Input
                  type="file"
                  accept=".json"
                  onChange={handleFileChange}
                  className="bg-cyberdark-700 border-cyberdark-600"
                />
              </div>
              <Button 
                onClick={handleImport}
                disabled={!importFile || processing}
                className="bg-cyberblue-500 hover:bg-cyberblue-600"
              >
                {processing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Импорт...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Импортировать
                  </>
                )}
              </Button>
              <Button onClick={handleExport} variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Экспортировать
              </Button>
              <Button onClick={() => navigate('/admin/challenges/new')} className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                Новое задание
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Поиск заданий..."
                  className="pl-10 bg-cyberdark-700 border-cyberdark-600"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="relative">
                <select
                  className="appearance-none bg-cyberdark-700 border border-cyberdark-600 text-white py-2 px-4 pr-8 rounded focus:outline-none focus:ring-1 focus:ring-cyberblue-500"
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                >
                  <option value="all">Все категории</option>
                  <option value="web">Веб-безопасность</option>
                  <option value="crypto">Криптография</option>
                  <option value="steganography">Стеганография</option>
                  <option value="reverse-engineering">Реверс-инжиниринг</option>
                  <option value="network">Сети</option>
                  <option value="pwn">PWN</option>
                </select>
                <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-cyberdark-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Название</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Категория</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Сложность</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Очки</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Статус</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Действия</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cyberdark-700">
                  {filteredChallenges.map((challenge) => (
                    <tr key={challenge.id} className="hover:bg-cyberdark-700/50">
                      <td className="px-4 py-4 text-sm text-gray-300">{challenge.id}</td>
                      <td className="px-4 py-4">
                        <div className="text-white font-medium">{challenge.title}</div>
                        <div className="text-gray-400 text-sm truncate max-w-xs">
                          {challenge.description}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <Badge variant="outline" className="bg-cyberdark-700 text-gray-300">
                          {challenge.category}
                        </Badge>
                      </td>
                      <td className="px-4 py-4">
                        <Badge 
                          variant="outline" 
                          className={
                            challenge.difficulty === 'beginner' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                            challenge.difficulty === 'intermediate' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                            challenge.difficulty === 'advanced' ? 'bg-orange-500/20 text-orange-400 border-orange-500/30' :
                            'bg-red-500/20 text-red-400 border-red-500/30'
                          }
                        >
                          {challenge.difficulty}
                        </Badge>
                      </td>
                      <td className="px-4 py-4 text-white">{challenge.points}</td>
                      <td className="px-4 py-4">
                        {challenge.solved ? (
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                            Решено
                          </Badge>
                        ) : (
                          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                            Активно
                          </Badge>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handlePreview(challenge)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => navigate(`/admin/challenges/edit/${challenge.id}`)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDelete(challenge)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent className="bg-cyberdark-800 text-white border-cyberdark-700">
            <DialogHeader>
              <DialogTitle>Подтвердите удаление</DialogTitle>
              <DialogDescription className="text-gray-400">
                Вы уверены, что хотите удалить задание "{selectedChallenge?.title}"? 
                Это действие нельзя отменить.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowDeleteDialog(false)}
              >
                Отмена
              </Button>
              <Button
                onClick={confirmDelete}
                className="bg-red-500 hover:bg-red-600"
              >
                Удалить
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={showPreviewDialog} onOpenChange={setShowPreviewDialog}>
          <DialogContent className="bg-cyberdark-800 text-white border-cyberdark-700">
            <DialogHeader>
              <DialogTitle>Предпросмотр задания</DialogTitle>
            </DialogHeader>
            {selectedChallenge && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">{selectedChallenge.title}</h3>
                  <p className="text-gray-300">{selectedChallenge.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Категория</p>
                    <p className="text-white">{selectedChallenge.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Сложность</p>
                    <p className="text-white">{selectedChallenge.difficulty}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Очки</p>
                    <p className="text-white">{selectedChallenge.points}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Решили</p>
                    <p className="text-white">{selectedChallenge.solvedBy}</p>
                  </div>
                </div>
                {selectedChallenge.tags && selectedChallenge.tags.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-400 mb-2">Теги</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedChallenge.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="bg-cyberdark-700">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                {selectedChallenge.downloadUrl && (
                  <div>
                    <p className="text-sm text-gray-400 mb-2">Файлы</p>
                    <a 
                      href={selectedChallenge.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyberblue-400 hover:text-cyberblue-300 flex items-center"
                    >
                      <FileJson className="w-4 h-4 mr-2" />
                      Скачать материалы
                    </a>
                  </div>
                )}
              </div>
            )}
            <DialogFooter>
              <Button
                onClick={() => setShowPreviewDialog(false)}
              >
                Закрыть
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}