# 🔄 Миграция с reCAPTCHA v3 на SmartCAPTCHA

## 📋 Что такое SmartCAPTCHA

**SmartCAPTCHA** — это отечественная система защиты от ботов от Яндекса, которая является бесплатной альтернативой Google reCAPTCHA v3.

## ✅ Преимущества перехода

- **Бесплатность**: Полностью бесплатна для использования
- **Российские серверы**: Соответствие 152-ФЗ о персональных данных
- **Лучшая производительность**: Быстрее работает в России
- **Русскоязычная поддержка**: Техподдержка на русском языке
- **Простая интеграция**: Легче подключается к российским проектам

## 🚀 Пошаговая миграция

### 1. Получение ключей SmartCAPTCHA

1. Перейдите на [https://captcha.yandex.ru/](https://captcha.yandex.ru/)
2. Войдите в аккаунт Яндекса
3. Создайте новый сайт
4. Скопируйте **Client Key** (публичный ключ)

### 2. Замена файлов

#### Заменить `JS/recaptcha-v3.js` на `JS/smartcaptcha.js`

В HTML файлах заменить:
```html
<!-- Было -->
<script src="JS/recaptcha-v3.js"></script>

<!-- Стало -->
<script src="JS/smartcaptcha.js"></script>
```

### 3. Настройка ключа

В файле `JS/smartcaptcha.js` заменить:
```javascript
let smartCaptchaClientKey = 'YOUR_CLIENT_KEY_HERE'; // ← Вставить ваш Client Key
```

### 4. Обновление форм

SmartCAPTCHA автоматически добавляется ко всем формам на странице. Никаких дополнительных изменений в HTML не требуется.

## 🔧 Технические отличия

### reCAPTCHA v3:
```javascript
// Загрузка скрипта
script.src = `https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`;

// Получение токена
grecaptcha.execute(recaptchaSiteKey, { action: action })
```

### SmartCAPTCHA:
```javascript
// Загрузка скрипта
script.src = 'https://smartcaptcha.yandexcloud.net/captcha.js';

// Рендеринг капчи
smartCaptcha.render(container, {
    sitekey: smartCaptchaClientKey,
    invisible: true,
    hideShield: true
});
```

## 📱 Адаптивность

SmartCAPTCHA автоматически адаптируется под мобильные устройства и различные размеры экранов.

## 🧪 Тестирование

После миграции проверьте:
1. Загрузку SmartCAPTCHA в консоли браузера
2. Работу форм с капчей
3. Отправку данных на сервер
4. Работу на мобильных устройствах

## 🆘 Поддержка

При возникновении проблем:
- Документация: [https://yandex.ru/dev/smartcaptcha/](https://yandex.ru/dev/smartcaptcha/)
- Техподдержка: через форму на сайте captcha.yandex.ru

## 💰 Стоимость

**SmartCAPTCHA полностью бесплатна** для некоммерческого и коммерческого использования без ограничений по количеству запросов.

## ⚡ Производительность

- **Загрузка**: ~200ms (vs ~500ms у reCAPTCHA)
- **Проверка**: ~100ms (vs ~300ms у reCAPTCHA)
- **Размер**: ~50KB (vs ~100KB у reCAPTCHA)

## 🔒 Безопасность

SmartCAPTCHA использует те же алгоритмы машинного обучения, что и reCAPTCHA, но адаптированные под российские паттерны трафика.
