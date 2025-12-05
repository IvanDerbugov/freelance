# Упрощенный обработчик формы для отправки на lead@kinetica.su

Это упрощенный вариант обработчика формы из проекта kinetica4.su, адаптированный под простую форму с полями:
- **name** (обязательно) - имя
- **email** (обязательно) - email
- **company** (опционально) - компания
- **content** (опционально) - о проекте (textarea)

## Файлы

1. **form-handler-simple.php** - Простой PHP обработчик (standalone, без фреймворков)
2. **form-handler-symfony.php** - Обработчик для Symfony проекта
3. **form-handler.js** - JavaScript обработчик для фронтенда

## Вариант 1: Простой PHP обработчик (form-handler-simple.php)

### Установка:

1. Скопируйте `form-handler-simple.php` на ваш сервер
2. Укажите правильный путь в форме:
```html
<form action="/path/to/form-handler-simple.php" method="POST">
```

### Использование:

```html
<form action="/path/to/form-handler-simple.php" method="POST">
    <!-- Скрытое поле для защиты от ботов -->
    <input type="text" name="login" style="display:none" tabindex="-1" autocomplete="off">
    
    <input type="text" name="name" placeholder="Ваше имя" required>
    <input type="email" name="email" placeholder="Email" required>
    <input type="text" name="company" placeholder="Компания">
    <textarea name="content" placeholder="О проекте"></textarea>
    
    <button type="submit">Отправить</button>
</form>
```

## Вариант 2: Symfony обработчик (form-handler-symfony.php)

### Установка:

1. Скопируйте код в `src/Controller/Frontend/SimpleFormController.php`
2. Роут уже настроен через атрибут: `/api/form/submit`
3. Если используете MailManager (как в kinetica4.su), раскомментируйте соответствующий код

### Использование:

```html
<form action="/api/form/submit" method="POST">
    <input type="text" name="login" style="display:none">
    <input type="text" name="name" required>
    <input type="email" name="email" required>
    <input type="text" name="company">
    <textarea name="content"></textarea>
    <button type="submit">Отправить</button>
</form>
```

## Вариант 3: JavaScript обработчик (form-handler.js)

### Установка:

1. Подключите файл на странице:
```html
<script src="/path/to/form-handler.js"></script>
```

2. Настройте в начале файла:
```javascript
const FORM_ACTION = '/api/form/submit'; // Ваш URL обработчика
const FORM_SELECTOR = 'form'; // Селектор вашей формы
```

### Использование:

Форма должна иметь правильные `name` атрибуты:
```html
<form>
    <input type="text" name="name" placeholder="Ваше имя" required>
    <input type="email" name="email" placeholder="Email" required>
    <input type="text" name="company" placeholder="Компания">
    <textarea name="content" placeholder="О проекте"></textarea>
    <button type="submit">Отправить</button>
</form>
```

## Пример полной формы (HTML)

```html
<!DOCTYPE html>
<html>
<head>
    <title>Форма обратной связи</title>
    <style>
        .field { margin-bottom: 15px; }
        .field.error input,
        .field.error textarea {
            border-color: red;
        }
        .error-message {
            color: red;
            font-size: 12px;
            display: block;
            margin-top: 5px;
        }
        .form-success {
            background: #d4edda;
            border: 1px solid #c3e6cb;
            padding: 10px;
            margin-bottom: 15px;
            border-radius: 4px;
        }
        .form-error {
            background: #f8d7da;
            border: 1px solid #f5c6cb;
            padding: 10px;
            margin-bottom: 15px;
            border-radius: 4px;
        }
    </style>
</head>
<body>
    <form action="/api/form/submit" method="POST">
        <!-- Скрытое поле для защиты от ботов -->
        <input type="text" name="login" style="display:none" tabindex="-1" autocomplete="off">
        
        <div class="field">
            <input type="text" name="name" placeholder="Ваше имя 👤" required>
        </div>
        
        <div class="field">
            <input type="email" name="email" placeholder="Email 📧" required>
        </div>
        
        <div class="field">
            <input type="text" name="company" placeholder="Компания 🏢">
        </div>
        
        <div class="field">
            <textarea name="content" placeholder="О проекте ✏️" rows="4"></textarea>
        </div>
        
        <button type="submit">🚀 ХОЧУ УСПЕТЬ!</button>
    </form>
    
    <script src="/path/to/form-handler.js"></script>
</body>
</html>
```

## Настройка отправки писем

### Если используете простой mail():

В файле `form-handler-simple.php` или `form-handler-symfony.php` уже настроена отправка через `mail()`. Убедитесь, что на сервере настроен sendmail.

### Если используете MailManager (как в kinetica4.su):

В `form-handler-symfony.php` раскомментируйте код:
```php
$settings = ['from_email' => 'lead@kinetica.su', 'from_name' => 'KINETICA', 'bcc' => 'lead@kinetica.su'];
$mail = MailManager::doCompile($name, $toEmail, $subject, $body, 23, false, 1, false, $settings, new \DateTimeImmutable());
$entityManager->persist($mail);
$entityManager->flush();
```

И добавьте в начало файла:
```php
use App\Utils\Manager\MailManager;
use Doctrine\ORM\EntityManagerInterface;
```

## Защита от ботов

Обработчик проверяет скрытое поле `login`. Если оно заполнено - запрос блокируется. Убедитесь, что в форме есть:
```html
<input type="text" name="login" style="display:none" tabindex="-1" autocomplete="off">
```

## Ответы сервера

### Успешная отправка:
```json
{
    "success": true,
    "message": "Спасибо за заявку! Мы свяжемся с вами в ближайшее время."
}
```

### Ошибка валидации:
```json
{
    "success": false,
    "error": {
        "name": "Укажите имя",
        "email": "Укажите правильный email"
    }
}
```

## Примечания

- Все данные очищаются через `htmlspecialchars()` для защиты от XSS
- Email валидируется через `filter_var()`
- Письма отправляются на `lead@kinetica.su`
- В письме указывается IP адрес и URL страницы откуда пришла заявка

