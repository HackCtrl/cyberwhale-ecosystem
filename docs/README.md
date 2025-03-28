
# CyberWhale Platform Documentation

Welcome to the official documentation for the CyberWhale platform. This comprehensive guide provides detailed information about our cybersecurity education and training ecosystem, including architecture, features, technologies, and implementation details.

## Table of Contents

- [Introduction](./introduction/README.md)
- [Architecture](./architecture/README.md)
- [Features](./features/README.md)
- [Technologies](./technologies/README.md)
- [Development](./development/README.md)
- [API Reference](./api/README.md)
- [Deployment](./deployment/README.md)

## Настройка проекта

### Аутентификация

В проекте реализована аутентификация с подтверждением по электронной почте:

1. Для включения подтверждения электронной почты настройте в Supabase:
   - В разделе Authentication -> Email Templates настройте шаблоны писем
   - В разделе Authentication -> Settings включите опцию "Email confirmation"
   - Убедитесь, что настроен SMTP провайдер в разделе Authentication -> Email Settings

2. Для тестирования можно временно отключить подтверждение, установив "Email confirmation" в значение "No"

## Последние обновления

- Добавлено новое задание по криптографии: "Утечка данных CyberWhale: Тайна зашифрованного чата"
- Улучшена система подсказок в CTF заданиях
- Добавлена детальная документация по архитектуре проекта
- Внедрена защита контента для авторизованных пользователей

