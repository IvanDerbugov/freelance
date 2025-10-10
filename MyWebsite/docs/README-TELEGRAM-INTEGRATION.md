# 📱 Telegram Integration для отправки заявок

## 🎯 Описание

Система отправки заявок с сайта напрямую в Telegram с автоматическим логированием. Решение работает полностью на клиентской стороне (JavaScript), не требует серверных технологий (PHP).

## 🔧 Установка и настройка

### 1. Получение Chat ID

Вам нужно получить ваш личный Chat ID в Telegram:

1. Найдите бота [@userinfobot](https://t.me/userinfobot) в Telegram
2. Напишите ему `/start`
3. Бот отправит вам ваш **Chat ID** (например, `123456789`)
4. Скопируйте это число

### 2. Настройка бота

Бот уже создан: [@derbugov_bot](https://t.me/derbugov_bot)
- **Token:** `8439270981:AAFMnuowPXV9SJuu6ydkYdG2hHW4_GT2ahI`

⚠️ **ВАЖНО:** Перед использованием:
1. Откройте бота [@derbugov_bot](https://t.me/derbugov_bot)
2. Нажмите кнопку "START" (или напишите `/start`)
3. Это активирует бота для отправки вам сообщений

### 3. Обновление Chat ID в коде

Откройте файл `send-form.js` и замените Chat ID на свой:

```javascript
const TELEGRAM_CHAT_ID = '6169313997'; // ← Замените на ваш Chat ID
```

## 📋 Структура файлов

```
MyWebsite/
├── send-form.js          # Основной скрипт отправки в Telegram
├── main.js               # Обработчик формы
├── index.html            # HTML с формой
└── README-TELEGRAM-INTEGRATION.md  # Эта документация
```

## 🚀 Как это работает

1. **Пользователь заполняет форму** на сайте (проект, email, сроки)
2. **JavaScript отправляет данные** напрямую в Telegram Bot API
3. **Вы получаете уведомление** в Telegram с полной информацией
4. **Лог сохраняется** в localStorage браузера и отправляется как отдельное сообщение

## 📝 Формат сообщения в Telegram

```
🎨 НОВАЯ ЗАЯВКА С САЙТА-ПОРТФОЛИО

👤 Имя: Заявка с портфолио
📧 Email: client@example.com
💼 Проект: Разработка интернет-магазина
⏰ Сроки: 2 недели
📅 Дата: 10.10.2025, 15:30:45
🌐 IP/User Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)...
```

## 📊 Система логирования

### Типы логов

Все логи сохраняются в `localStorage` браузера:

- **SUCCESS** - успешная отправка
- **TELEGRAM_ERROR** - ошибка API Telegram
- **NETWORK_ERROR** - ошибка сети/соединения

### Просмотр логов

Откройте консоль браузера (F12) и выполните:

```javascript
// Посмотреть все логи
console.table(FormHandler.getAllLogs());

// Экспортировать логи в JSON файл
FormHandler.exportLogsToFile();

// Очистить все логи
FormHandler.clearLogs();
```

### Пример лог-записи

```json
{
  "status": "SUCCESS",
  "name": "Заявка с портфолио",
  "email": "client@example.com",
  "project": "Разработка сайта",
  "deadline": "1 неделя",
  "timestamp": "2025-10-10T12:30:45.123Z",
  "telegramResponse": "OK"
}
```

## 🔒 Безопасность

### ⚠️ Важные замечания

1. **Token виден в коде** - это нормально для Telegram ботов, НО:
   - Не используйте этого бота для критичных данных
   - Ограничьте права бота только отправкой сообщений
   - Регулярно проверяйте активность бота через [@BotFather](https://t.me/BotFather)

2. **Рекомендации**:
   - Используйте CSP (Content Security Policy) на сервере
   - Добавьте rate limiting (ограничение частоты запросов)
   - Рассмотрите использование CAPTCHA для защиты от спама

### 🛡️ Дополнительная защита (опционально)

Если нужна дополнительная безопасность, рекомендую:
- Использовать Cloudflare Workers для проксирования запросов
- Добавить Google reCAPTCHA v3
- Ограничить домены через CORS

## 🧪 Тестирование

### Локальное тестирование

1. Откройте `index.html` в браузере
2. Откройте консоль разработчика (F12)
3. Заполните форму и отправьте
4. Проверьте:
   - Сообщение в Telegram
   - Логи в консоли
   - `localStorage` → `formSubmissionLogs`

### Проверка работоспособности

```javascript
// Тестовая отправка
FormHandler.sendToTelegram(
  'Тест',
  'test@example.com',
  'Тестовый проект',
  '1 день'
).then(result => console.log(result));
```

## 📱 Получение Chat ID для группы

Если хотите отправлять заявки в группу:

1. Создайте группу в Telegram
2. Добавьте в неё вашего бота [@derbugov_bot](https://t.me/derbugov_bot)
3. Дайте боту права администратора
4. Отправьте любое сообщение в группу
5. Откройте в браузере:
   ```
   https://api.telegram.org/bot8439270981:AAFMnuowPXV9SJuu6ydkYdG2hHW4_GT2ahI/getUpdates
   ```
6. Найдите `"chat":{"id":-1234567890}` - это ID группы (с минусом!)
7. Используйте этот ID в `send-form.js`

## 🐛 Устранение неполадок

### Сообщения не приходят

1. ✅ Проверьте, что вы нажали START у бота
2. ✅ Убедитесь, что Chat ID правильный (без кавычек, только цифры)
3. ✅ Проверьте консоль браузера на ошибки
4. ✅ Убедитесь, что `send-form.js` загружается перед `main.js`

### Ошибка CORS

Если видите ошибку CORS при локальном тестировании:
- Используйте локальный сервер (Live Server в VS Code)
- Или откройте через `http://localhost`, а не `file://`

### Проверка токена бота

Откройте в браузере:
```
https://api.telegram.org/bot8439270981:AAFMnuowPXV9SJuu6ydkYdG2hHW4_GT2ahI/getMe
```

Должен вернуть информацию о боте.

## 📈 Расширенные возможности

### Отправка файлов

Можно добавить отправку файлов/изображений через `sendDocument` или `sendPhoto`:

```javascript
// В send-form.js добавьте функцию
async function sendFileToTelegram(file) {
    const formData = new FormData();
    formData.append('chat_id', TELEGRAM_CHAT_ID);
    formData.append('document', file);
    
    const response = await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendDocument`,
        { method: 'POST', body: formData }
    );
    return response.json();
}
```

### Уведомления со звуком

Добавьте в сообщение, чтобы уведомление пришло со звуком:

```javascript
body: JSON.stringify({
    chat_id: TELEGRAM_CHAT_ID,
    text: message,
    parse_mode: 'Markdown',
    disable_notification: false  // ← звук включен
})
```

## 🔗 Полезные ссылки

- [Telegram Bot API](https://core.telegram.org/bots/api)
- [BotFather](https://t.me/BotFather) - управление ботами
- [userinfobot](https://t.me/userinfobot) - получить свой Chat ID
- [Ваш бот](https://t.me/derbugov_bot)

## 📞 Поддержка

При возникновении проблем:
1. Проверьте консоль браузера (F12)
2. Просмотрите логи: `FormHandler.getAllLogs()`
3. Убедитесь, что бот активирован (START)

---

**Автор:** Иван Дербугов  
**Дата создания:** 10.10.2025  
**Версия:** 1.0

