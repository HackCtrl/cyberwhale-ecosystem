
import React, { useState } from 'react';
import { useAuth } from '@/lib/auth';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Shield, Award, User, Camera } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { getAvatarFallbackText } from '@/lib/auth/utils';

export default function Profile() {
  const { user, isLoading, updateProfile } = useAuth();
  const [isUploading, setIsUploading] = useState(false);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !files[0] || !user) return;
    
    const file = files[0];
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, загрузите изображение",
        variant: "destructive"
      });
      return;
    }
    
    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "Ошибка",
        description: "Размер изображения не должен превышать 2MB",
        variant: "destructive"
      });
      return;
    }
    
    setIsUploading(true);
    
    try {
      // Create a unique filename
      const fileName = `avatar-${user.id}-${Date.now()}`;
      const fileExt = file.name.split('.').pop();
      const filePath = `${fileName}.${fileExt}`;
      
      console.log('Uploading avatar to path:', filePath);
      
      // Upload the file
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);
      
      if (uploadError) {
        console.error('Error uploading avatar:', uploadError);
        throw uploadError;
      }
      
      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);
      
      console.log('Avatar uploaded, public URL:', publicUrl);
      
      // Update the user profile with the new avatar URL
      await updateProfile({ avatar: publicUrl });
      
      // Update the avatar_url in the profiles table
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ 
          avatar_url: publicUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
        
      if (updateError) {
        console.error('Error updating profile in database:', updateError);
      }
      
      toast({
        title: "Успешно",
        description: "Аватар успешно обновлен",
      });
    } catch (error: any) {
      console.error('Error uploading avatar:', error);
      toast({
        title: "Ошибка",
        description: error.message || "Не удалось загрузить аватар",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-cyberdark-900 p-4">
        <Loader2 className="h-8 w-8 animate-spin text-cyberblue-500 mb-4" />
        <p className="text-gray-400">Загрузка профиля...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-cyberdark-900 p-4">
        <div className="text-center">
          <User className="h-12 w-12 text-gray-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">Профиль недоступен</h2>
          <p className="text-gray-400 mb-6">Войдите в аккаунт, чтобы увидеть ваш профиль</p>
        </div>
      </div>
    );
  }

  // Рассчитываем прогресс до следующего уровня
  const levelProgress = (user.points % 100) / 100 * 100; // Предполагаем, что каждые 100 очков - новый уровень
  const pointsToNextLevel = 100 - (user.points % 100);

  return (
    <div className="min-h-screen bg-cyberdark-900 pt-20 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center mb-8">
          <div className="relative group">
            <Avatar className="h-24 w-24 rounded-full border-4 border-cyberdark-700">
              <AvatarImage src={user.avatar} alt={user.username} />
              <AvatarFallback className="bg-cyberdark-700 text-xl font-bold text-white">
                {getAvatarFallbackText(user.username)}
              </AvatarFallback>
            </Avatar>
            
            <label 
              htmlFor="avatar-upload" 
              className="absolute bottom-0 right-0 p-1.5 rounded-full bg-cyberblue-500 hover:bg-cyberblue-600 cursor-pointer"
            >
              {isUploading ? (
                <Loader2 className="h-4 w-4 text-white animate-spin" />
              ) : (
                <Camera className="h-4 w-4 text-white" />
              )}
            </label>
            <input 
              id="avatar-upload" 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleAvatarUpload}
              disabled={isUploading}
            />
          </div>
          
          <h1 className="mt-4 text-3xl font-bold text-white">{user.username}</h1>
          <p className="text-gray-400">{user.email}</p>
          <div className="flex items-center mt-2">
            <Badge variant="secondary" className="mr-2 bg-cyberdark-800 text-white">
              {user.role === 'admin' ? 'Администратор' : 'Пользователь'}
            </Badge>
            <Badge variant="outline" className="border-cyberblue-500 text-cyberblue-500">
              Зарегистрирован {new Date(user.createdAt).toLocaleDateString()}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-cyberdark-800 border-cyberdark-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-white flex items-center text-lg">
                <Award className="h-5 w-5 mr-2 text-cyberblue-500" />
                Уровень
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white mb-2">{user.level}</div>
              <div className="mb-2">
                <Progress value={levelProgress} className="h-2 bg-cyberdark-700" />
              </div>
              <p className="text-sm text-gray-400">
                {pointsToNextLevel} очков до следующего уровня
              </p>
            </CardContent>
          </Card>

          <Card className="bg-cyberdark-800 border-cyberdark-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-white flex items-center text-lg">
                <Shield className="h-5 w-5 mr-2 text-cyberblue-500" />
                Очки
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white mb-2">{user.points}</div>
              <p className="text-sm text-gray-400">
                Заработано за участие в CTF соревнованиях и выполнение заданий
              </p>
            </CardContent>
          </Card>

          <Card className="bg-cyberdark-800 border-cyberdark-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-white flex items-center text-lg">
                <Shield className="h-5 w-5 mr-2 text-cyberblue-500" />
                Статус
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold text-white mb-2">
                {user.level < 5 ? 'Начинающий' : 
                 user.level < 10 ? 'Продвинутый' : 
                 user.level < 15 ? 'Эксперт' : 'Мастер'}
              </div>
              <p className="text-sm text-gray-400">
                Статус отражает ваш уровень опыта в кибербезопасности
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-cyberdark-800 border-cyberdark-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white">Достижения</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {/* Заглушка достижений */}
              <div className="flex items-center p-3 rounded-lg border border-cyberdark-700 bg-cyberdark-900">
                <div className="mr-3 p-2 rounded-full bg-cyberdark-800">
                  <Award className="h-6 w-6 text-gray-500" />
                </div>
                <div>
                  <p className="font-medium text-gray-300">???</p>
                  <p className="text-xs text-gray-500">Не разблокировано</p>
                </div>
              </div>

              <div className="flex items-center p-3 rounded-lg border border-cyberdark-700 bg-cyberdark-900">
                <div className="mr-3 p-2 rounded-full bg-cyberdark-800">
                  <Award className="h-6 w-6 text-gray-500" />
                </div>
                <div>
                  <p className="font-medium text-gray-300">???</p>
                  <p className="text-xs text-gray-500">Не разблокировано</p>
                </div>
              </div>

              <div className="flex items-center p-3 rounded-lg border border-cyberdark-700 bg-cyberdark-900">
                <div className="mr-3 p-2 rounded-full bg-cyberdark-800">
                  <Award className="h-6 w-6 text-gray-500" />
                </div>
                <div>
                  <p className="font-medium text-gray-300">???</p>
                  <p className="text-xs text-gray-500">Не разблокировано</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
