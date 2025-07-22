# 📇 PrintersQueue

Backend-сервис для управления очередями печати документов

📌 Принимает задания на печать от сотрудников
    
📌 Управляет очередями печати для каждого принтера
    
📌 Предоставляет статусы выполнения через HTTP API

# 📍 Копирование репозитория

```bash
git init
git clone https://github.com/OgurecRoman/PrintersQueue.git
```

# 🧲 Установка зависимостей

```bash
npm install
```

# 📎 Подготовка переменных окружения

копирование файла с примером в нужный

```bash
cp .testenv .env # для linux
```

```bash
copy .testenv .env # для windows
```

Поменяйте значения переменных окружения при необходимости (пароли, настройка базы данных)

# Запуск тестов

```bash
npm test
```

# Запуск сервера

```bash
npm start
```

# Примеры запросов в Postman

![Главная страница: требуется авторизация](images/postman/1.jpg)
![Логин: требуется пароль](images/postman/2.jpg)
![Логин: получение токена](images/postman/3.jpg)
![Главная страница](images/postman/4.jpg)
![Создание принтера](images/postman/5.jpg)
![Получение списка принтеров](images/postman/6.jpg)
![Статус конкретного принтера](images/postman/7.jpg)
![Создание задания на печать](images/postman/8.jpg)
![Статус задания](images/postman/9.jpg)
![Очередь заданий к принтеру](images/postman/10.jpg)
