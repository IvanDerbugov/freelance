# 🏗️ Архитектура Telegram Integration

## 📊 Схема работы системы

```
┌─────────────────────────────────────────────────────────────────┐
│                         ПОЛЬЗОВАТЕЛЬ                             │
│                    (Посетитель сайта)                            │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ 1. Заполняет форму
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                        index.html                                │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  <form id="discountForm">                                │   │
│  │    - Проект (textarea)                                   │   │
│  │    - Email (input)                                       │   │
│  │    - Сроки (input)                                       │   │
│  │    <button type="submit">                                │   │
│  │  </form>                                                 │   │
│  └──────────────────────────────────────────────────────────┘   │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ 2. Событие submit
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                         main.js                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  discountForm.addEventListener('submit', async (e) => {  │   │
│  │    e.preventDefault();                                   │   │
│  │    const formData = new FormData(discountForm);          │   │
│  │    const result = await FormHandler.sendToTelegram(...)  │   │
│  │  });                                                     │   │
│  └──────────────────────────────────────────────────────────┘   │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ 3. Вызов FormHandler.sendToTelegram()
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      send-form.js                                │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  async function sendToTelegram(name, email, ...) {       │   │
│  │    // Формирование сообщения                             │   │
│  │    const message = `🎨 НОВАЯ ЗАЯВКА...`;                │   │
│  │                                                           │   │
│  │    // Отправка через Telegram Bot API                    │   │
│  │    fetch('https://api.telegram.org/bot.../sendMessage')  │   │
│  │                                                           │   │
│  │    // Логирование                                        │   │
│  │    logFormSubmission({ status, email, ... })             │   │
│  │  }                                                       │   │
│  └──────────────────────────────────────────────────────────┘   │
└───────────────┬────────────────────────┬────────────────────────┘
                │                        │
                │ 4. HTTP POST           │ 5. Сохранение лога
                ▼                        ▼
┌──────────────────────────┐  ┌──────────────────────────────┐
│   Telegram Bot API       │  │    localStorage Browser      │
│                          │  │                              │
│  POST /sendMessage       │  │  Key: formSubmissionLogs     │
│  {                       │  │  Value: [{                   │
│    chat_id: "...",       │  │    status: "SUCCESS",        │
│    text: "...",          │  │    email: "...",             │
│    parse_mode: "Markdown"│  │    timestamp: "...",         │
│  }                       │  │    ...                       │
│                          │  │  }]                          │
└───────────┬──────────────┘  └──────────────────────────────┘
            │                              │
            │ 6. Response                  │ 7. Чтение логов
            ▼                              ▼
┌──────────────────────────┐  ┌──────────────────────────────┐
│   Telegram Messenger     │  │      admin-logs.html         │
│                          │  │                              │
│  Уведомление приходит    │  │  - Отображение статистики    │
│  владельцу бота:         │  │  - Таблица с заявками        │
│                          │  │  - Фильтрация и сортировка   │
│  🎨 НОВАЯ ЗАЯВКА С       │  │  - Экспорт в JSON/CSV        │
│     САЙТА-ПОРТФОЛИО      │  │                              │
│                          │  │                              │
│  👤 Имя: Иван            │  │                              │
│  📧 Email: ivan@...      │  │                              │
│  💼 Проект: ...          │  │                              │
└──────────────────────────┘  └──────────────────────────────┘
```

---

## 🔄 Поток данных

### 1. Пользовательский ввод
- Пользователь заполняет форму на сайте
- Нажимает кнопку "Получить скидку"

### 2. Обработка формы (main.js)
- Event listener перехватывает submit
- Извлекаются данные через FormData API
- Данные передаются в `FormHandler.sendToTelegram()`

### 3. Отправка в Telegram (send-form.js)
- Формируется красивое сообщение с emoji
- Выполняется HTTP POST запрос к Telegram Bot API
- Используется метод `sendMessage` с Markdown форматированием

### 4. Логирование
- Результат отправки сохраняется в localStorage
- Лог содержит: статус, email, timestamp, ошибки (если есть)
- Логи доступны через `FormHandler.getAllLogs()`

### 5. Уведомление
- Сообщение приходит в Telegram владельцу
- Можно настроить отправку в группу или канал

### 6. Аналитика
- Просмотр через admin-logs.html
- Экспорт данных в JSON/CSV
- Статистика: всего/успешно/ошибок

---

## 📦 Структура модулей

```
MyWebsite/
│
├── 🌐 Frontend Layer (Пользовательский интерфейс)
│   ├── index.html           ← HTML-разметка и форма
│   ├── style.css            ← Основные стили
│   └── media.css            ← Адаптивные стили
│
├── 🎮 Application Layer (Логика приложения)
│   ├── main.js              ← Основная логика и обработчики
│   ├── animation.js         ← Canvas-анимации
│   └── send-form.js         ← 📨 Telegram Integration
│
├── 💾 Storage Layer (Хранение данных)
│   └── localStorage         ← Логи заявок (в браузере)
│
├── 🔌 External Services (Внешние сервисы)
│   └── Telegram Bot API     ← Отправка уведомлений
│
└── 🛠️ Tools & Utils (Утилиты)
    ├── admin-logs.html      ← Админ-панель
    ├── test-telegram.html   ← Тестирование
    └── README-*.md          ← Документация
```

---

## 🔐 Безопасность

### Уровни защиты

```
┌─────────────────────────────────────────────────────┐
│ Level 1: Client-Side Validation                     │
│ - Required fields check                             │
│ - Email format validation                           │
│ - Input sanitization (htmlspecialchars)             │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│ Level 2: Telegram API Security                      │
│ - HTTPS connection (encrypted)                      │
│ - Bot token authentication                          │
│ - Rate limiting by Telegram (30 msg/sec)            │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│ Level 3: localStorage Isolation                     │
│ - Browser sandboxing                                │
│ - Same-origin policy                                │
│ - User-controlled data                              │
└─────────────────────────────────────────────────────┘
```

### Рекомендуемые улучшения

1. **CAPTCHA** - защита от ботов
   ```javascript
   // Google reCAPTCHA v3
   grecaptcha.execute('site_key', {action: 'submit'})
   ```

2. **Rate Limiting** - ограничение частоты
   ```javascript
   // Максимум 3 заявки за 5 минут
   const lastSubmissions = [];
   if (lastSubmissions.length >= 3) return;
   ```

3. **CSP Headers** - Content Security Policy
   ```html
   <meta http-equiv="Content-Security-Policy" 
         content="default-src 'self'; connect-src 'self' https://api.telegram.org">
   ```

---

## 📊 Система логирования

### Структура лога

```javascript
{
  "status": "SUCCESS" | "TELEGRAM_ERROR" | "NETWORK_ERROR",
  "name": "string",
  "email": "string",
  "project": "string",
  "deadline": "string",
  "timestamp": "ISO 8601 datetime",
  "telegramResponse": "OK" | null,
  "error": "string" | null
}
```

### Жизненный цикл лога

```
1. Создание          2. Сохранение        3. Чтение
   (send-form.js)       (localStorage)       (admin-logs.html)
       │                     │                     │
       ├─> Log Object ───────┤                     │
       │                     │                     │
       │                     ├─> Array of Logs ────┤
       │                     │                     │
       │                     │                     ├─> Display
       │                     │                     ├─> Filter
       │                     │                     ├─> Sort
       │                     │                     └─> Export
```

### Операции с логами

```javascript
// Получение всех логов
FormHandler.getAllLogs()
// Возвращает: Array<LogEntry>

// Экспорт в JSON
FormHandler.exportLogsToFile()
// Скачивает: form-logs-YYYY-MM-DD.json

// Очистка логов
FormHandler.clearLogs()
// Возвращает: boolean
```

---

## 🧪 Тестирование

### Уровни тестирования

```
┌──────────────────────────────────────────────────┐
│ Level 1: Bot Connectivity Test                   │
│ - GET /getMe                                     │
│ - Проверка токена и доступности бота             │
└────────────────────┬─────────────────────────────┘
                     ↓
┌──────────────────────────────────────────────────┐
│ Level 2: Message Delivery Test                   │
│ - POST /sendMessage (test message)               │
│ - Проверка получения в Telegram                  │
└────────────────────┬─────────────────────────────┘
                     ↓
┌──────────────────────────────────────────────────┐
│ Level 3: Full Form Integration Test              │
│ - Симуляция заполнения формы                     │
│ - Проверка всего потока: form → TG → log         │
└──────────────────────────────────────────────────┘
```

### Команды тестирования

**Автоматическое:** Открыть `test-telegram.html`

**Ручное через консоль:**
```javascript
// Тест отправки
FormHandler.sendToTelegram(
  'Тест', 
  'test@example.com', 
  'Тестовый проект', 
  '1 день'
).then(console.log);

// Проверка логов
console.table(FormHandler.getAllLogs());
```

---

## 🔧 API Reference

### FormHandler Object

```javascript
window.FormHandler = {
  // Отправка в Telegram
  sendToTelegram: async (name, email, project, deadline) => Promise<Result>,
  
  // Получение логов
  getAllLogs: () => Array<LogEntry>,
  
  // Экспорт в JSON
  exportLogsToFile: () => void,
  
  // Очистка логов
  clearLogs: () => boolean
}
```

### Telegram Bot API Methods

```javascript
// Получить информацию о боте
GET https://api.telegram.org/bot{token}/getMe

// Отправить сообщение
POST https://api.telegram.org/bot{token}/sendMessage
Body: {
  chat_id: string,
  text: string,
  parse_mode?: "Markdown" | "HTML"
}

// Получить обновления
GET https://api.telegram.org/bot{token}/getUpdates
```

---

## 📈 Метрики и мониторинг

### Отслеживаемые метрики

1. **Успешность отправки**
   - Процент успешных отправок
   - Количество ошибок
   - Типы ошибок

2. **Производительность**
   - Время отправки сообщения
   - Время сохранения лога
   - Задержки сети

3. **Использование**
   - Количество заявок в день/неделю/месяц
   - Пиковые часы активности
   - Популярные типы проектов

### Просмотр в админ-панели

```
admin-logs.html показывает:
├─ Всего заявок: X
├─ Успешных: Y (Z%)
├─ Ошибок: W (Q%)
└─ Последняя активность: DD.MM.YYYY HH:MM
```

---

## 🚀 Production Checklist

Перед деплоем на production:

- [ ] ✅ Заменен Chat ID на свой
- [ ] ✅ Бот активирован (START)
- [ ] ✅ Проведено тестирование (test-telegram.html)
- [ ] ✅ Проверена работа на всех устройствах
- [ ] ✅ Добавлен CAPTCHA (опционально)
- [ ] ✅ Настроен rate limiting (опционально)
- [ ] ✅ Проверена безопасность токена
- [ ] ✅ Настроена аналитика (Яндекс.Метрика/Google Analytics)
- [ ] ✅ Создан бэкап логов
- [ ] ✅ Документация прочитана

---

## 📚 Дополнительные ресурсы

- 📖 [Telegram Bot API Docs](https://core.telegram.org/bots/api)
- 🛠️ [BotFather Guide](https://core.telegram.org/bots#botfather)
- 💾 [localStorage MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- 🎨 [Markdown Formatting](https://core.telegram.org/bots/api#markdown-style)

---

**Версия:** 1.0  
**Дата:** 10.10.2025  
**Автор:** Иван Дербугов

