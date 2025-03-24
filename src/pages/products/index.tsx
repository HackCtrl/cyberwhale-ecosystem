import React from 'react';
import { 
  Shield, 
  Terminal, 
  Code, 
  Database, 
  Search, 
  Lock, 
  Cpu, 
  ArrowRight, 
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ChatAssistant from '@/components/layout/ChatAssistant';

export default function Products() {
  return (
    <div className="container mx-auto py-10">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-semibold text-white">Наши продукты</h1>
        <div className="flex items-center space-x-4">
          <Input type="text" placeholder="Поиск продуктов..." className="bg-cyberdark-700 border-cyberdark-600 text-white" />
          <Button variant="outline">
            <Search className="w-4 h-4 mr-2" />
            Поиск
          </Button>
        </div>
      </div>

      <Tabs defaultvalue="all" className="w-full">
        <TabsList className="bg-cyberdark-800 border-cyberdark-700 rounded-md p-1">
          <TabsTrigger value="all" className="data-[state=active]:bg-cyberblue-500 data-[state=active]:text-white">Все</TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-cyberblue-500 data-[state=active]:text-white">Безопасность</TabsTrigger>
          <TabsTrigger value="development" className="data-[state=active]:bg-cyberblue-500 data-[state=active]:text-white">Разработка</TabsTrigger>
          <TabsTrigger value="infrastructure" className="data-[state=active]:bg-cyberblue-500 data-[state=active]:text-white">Инфраструктура</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-cyberdark-800 border-cyberdark-700">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <Shield className="w-6 h-6 text-cyberblue-500" />
                  <h2 className="text-lg font-semibold text-white">CyberShield</h2>
                </div>
                <p className="text-gray-400 mb-4">Комплексное решение для защиты вашей сети от угроз.</p>
                <Badge className="bg-green-500 text-white">В наличии</Badge>
                <Button className="w-full mt-4 bg-cyberblue-500 hover:bg-cyberblue-600">
                  Подробнее
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-cyberdark-800 border-cyberdark-700">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <Terminal className="w-6 h-6 text-cyberblue-500" />
                  <h2 className="text-lg font-semibold text-white">CodeGuard</h2>
                </div>
                <p className="text-gray-400 mb-4">Инструмент для статического анализа кода на уязвимости.</p>
                <Badge className="bg-yellow-500 text-white">Бета</Badge>
                <Button className="w-full mt-4 bg-cyberblue-500 hover:bg-cyberblue-600">
                  Подробнее
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-cyberdark-800 border-cyberdark-700">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <Code className="w-6 h-6 text-cyberblue-500" />
                  <h2 className="text-lg font-semibold text-white">DevSecOps Platform</h2>
                </div>
                <p className="text-gray-400 mb-4">Платформа для автоматизации процессов DevSecOps.</p>
                <Badge className="bg-green-500 text-white">В наличии</Badge>
                <Button className="w-full mt-4 bg-cyberblue-500 hover:bg-cyberblue-600">
                  Подробнее
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-cyberdark-800 border-cyberdark-700">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <Database className="w-6 h-6 text-cyberblue-500" />
                  <h2 className="text-lg font-semibold text-white">Data Fortress</h2>
                </div>
                <p className="text-gray-400 mb-4">Защищенное хранилище данных с контролем доступа.</p>
                <Badge className="bg-red-500 text-white">Скоро</Badge>
                <Button disabled className="w-full mt-4 bg-cyberdark-700 text-gray-400 cursor-not-allowed">
                  Скоро в продаже
                  <Lock className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-cyberdark-800 border-cyberdark-700">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <Cpu className="w-6 h-6 text-cyberblue-500" />
                  <h2 className="text-lg font-semibold text-white">InfraSecure</h2>
                </div>
                <p className="text-gray-400 mb-4">Мониторинг и защита вашей инфраструктуры в реальном времени.</p>
                <Badge className="bg-green-500 text-white">В наличии</Badge>
                <Button className="w-full mt-4 bg-cyberblue-500 hover:bg-cyberblue-600">
                  Подробнее
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-cyberdark-800 border-cyberdark-700">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <Check className="w-6 h-6 text-cyberblue-500" />
                  <h2 className="text-lg font-semibold text-white">ComplianceCheck</h2>
                </div>
                <p className="text-gray-400 mb-4">Автоматизированная проверка соответствия стандартам безопасности.</p>
                <Badge className="bg-yellow-500 text-white">Бета</Badge>
                <Button className="w-full mt-4 bg-cyberblue-500 hover:bg-cyberblue-600">
                  Подробнее
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="security" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-cyberdark-800 border-cyberdark-700">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <Shield className="w-6 h-6 text-cyberblue-500" />
                  <h2 className="text-lg font-semibold text-white">CyberShield</h2>
                </div>
                <p className="text-gray-400 mb-4">Комплексное решение для защиты вашей сети от угроз.</p>
                <Badge className="bg-green-500 text-white">В наличии</Badge>
                <Button className="w-full mt-4 bg-cyberblue-500 hover:bg-cyberblue-600">
                  Подробнее
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="development" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             <Card className="bg-cyberdark-800 border-cyberdark-700">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <Terminal className="w-6 h-6 text-cyberblue-500" />
                  <h2 className="text-lg font-semibold text-white">CodeGuard</h2>
                </div>
                <p className="text-gray-400 mb-4">Инструмент для статического анализа кода на уязвимости.</p>
                <Badge className="bg-yellow-500 text-white">Бета</Badge>
                <Button className="w-full mt-4 bg-cyberblue-500 hover:bg-cyberblue-600">
                  Подробнее
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-cyberdark-800 border-cyberdark-700">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <Code className="w-6 h-6 text-cyberblue-500" />
                  <h2 className="text-lg font-semibold text-white">DevSecOps Platform</h2>
                </div>
                <p className="text-gray-400 mb-4">Платформа для автоматизации процессов DevSecOps.</p>
                <Badge className="bg-green-500 text-white">В наличии</Badge>
                <Button className="w-full mt-4 bg-cyberblue-500 hover:bg-cyberblue-600">
                  Подробнее
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="infrastructure" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-cyberdark-800 border-cyberdark-700">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <Database className="w-6 h-6 text-cyberblue-500" />
                  <h2 className="text-lg font-semibold text-white">Data Fortress</h2>
                </div>
                <p className="text-gray-400 mb-4">Защищенное хранилище данных с контролем доступа.</p>
                <Badge className="bg-red-500 text-white">Скоро</Badge>
                <Button disabled className="w-full mt-4 bg-cyberdark-700 text-gray-400 cursor-not-allowed">
                  Скоро в продаже
                  <Lock className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-cyberdark-800 border-cyberdark-700">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <Cpu className="w-6 h-6 text-cyberblue-500" />
                  <h2 className="text-lg font-semibold text-white">InfraSecure</h2>
                </div>
                <p className="text-gray-400 mb-4">Мониторинг и защита вашей инфраструктуры в реальном времени.</p>
                <Badge className="bg-green-500 text-white">В наличии</Badge>
                <Button className="w-full mt-4 bg-cyberblue-500 hover:bg-cyberblue-600">
                  Подробнее
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      <ChatAssistant />
    </div>
  );
}
