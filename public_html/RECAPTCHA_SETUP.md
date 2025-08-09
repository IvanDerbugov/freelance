# Настройка reCAPTCHA v3 для сайта

## Что такое reCAPTCHA v3?

reCAPTCHA v3 - это невидимая система защиты от ботов от Google, которая анализирует поведение пользователя на сайте и присваивает оценку от 0.0 до 1.0, где:
- 1.0 = скорее всего человек
- 0.0 = скорее всего бот

## Шаги настройки

### 1. Получение ключей reCAPTCHA

1. Перейдите на https://www.google.com/recaptcha/admin
2. Войдите в аккаунт Google
3. Нажмите "+" для создания нового сайта
4. Выберите "reCAPTCHA v3"
5. Добавьте домены:
   - `рекордика.рф`
   - `*.рекордика.рф`
   - `recordica.ru`
   - `*.recordica.ru`
6. Примите условия и нажмите "Submit"
7. Скопируйте **Site Key** и **Secret Key**

### 2. Обновление ключей в файлах

Замените `6LcXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX` на ваш реальный Site Key в следующих файлах:

- `public_html/mainPage/JS/recaptcha-v3.js` (строка 5)
- `public_html/gusenichnyy-ekskavator/JS/recaptcha-v3.js` (строка 5)
- `public_html/ekskavator-pogruzchik/JS/recaptcha-v3.js` (строка 5)
- `public_html/avtokran/JS/recaptcha-v3.js` (строка 5)
- `public_html/avtovyshka/JS/recaptcha-v3.js` (строка 5)
- `public_html/dlinnomer/JS/recaptcha-v3.js` (строка 5)
- `public_html/manipuliator/JS/recaptcha-v3.js` (строка 5)
- `public_html/kolesnyy-ekskavator/JS/recaptcha-v3.js` (строка 5)

### 3. Настройка серверной проверки (опционально)

Если вы хотите проверять токены на сервере, добавьте Secret Key в ваш PHP обработчик:

```php
// В файле send-form.php или другом обработчике
$recaptchaSecret = 'YOUR_SECRET_KEY_HERE';
$recaptchaToken = $_POST['g-recaptcha-response'];

// Проверка токена
$recaptchaUrl = 'https://www.google.com/recaptcha/api/siteverify';
$recaptchaData = [
    'secret' => $recaptchaSecret,
    'response' => $recaptchaToken,
    'remoteip' => $_SERVER['REMOTE_ADDR']
];

$recaptchaOptions = [
    'http' => [
        'header' => "Content-type: application/x-www-form-urlencoded\r\n",
        'method' => 'POST',
        'content' => http_build_query($recaptchaData)
    ]
];

$recaptchaContext = stream_context_create($recaptchaOptions);
$recaptchaResult = file_get_contents($recaptchaUrl, false, $recaptchaContext);
$recaptchaResponse = json_decode($recaptchaResult, true);

if ($recaptchaResponse['success'] && $recaptchaResponse['score'] >= 0.5) {
    // Пользователь прошел проверку (score >= 0.5)
    // Продолжаем обработку формы
} else {
    // Пользователь не прошел проверку
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Проверка не пройдена']);
    exit;
}
```

### 4. Настройка пороговых значений

В файле `recaptcha-v3.js` вы можете настроить пороговые значения для разных действий:

```javascript
// Рекомендуемые пороги:
// - 0.9+ для критических действий (регистрация, оплата)
// - 0.7+ для обычных форм
// - 0.5+ для комментариев и отзывов
```

## Как это работает

1. **Загрузка**: При загрузке страницы автоматически загружается reCAPTCHA v3
2. **Анализ**: Google анализирует поведение пользователя (движения мыши, клики, время на странице)
3. **Отправка формы**: При отправке формы получается токен с оценкой
4. **Проверка**: Токен отправляется вместе с данными формы
5. **Верификация**: Сервер проверяет токен и принимает решение

## Преимущества

- ✅ Невидимая для пользователей
- ✅ Не требует решения головоломок
- ✅ Анализирует поведение в реальном времени
- ✅ Настраиваемые пороги для разных действий
- ✅ Защита от современных ботов

## Мониторинг

После настройки вы можете отслеживать эффективность в консоли Google reCAPTCHA:
- Процент успешных проверок
- Распределение оценок
- Попытки обхода

## Поддержка

При возникновении проблем:
1. Проверьте консоль браузера на ошибки
2. Убедитесь, что ключи правильно вставлены
3. Проверьте, что домены добавлены в настройках reCAPTCHA
4. Убедитесь, что скрипт загружается до других скриптов форм 