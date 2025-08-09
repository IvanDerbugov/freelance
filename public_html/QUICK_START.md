# 🚀 Быстрый старт reCAPTCHA v3

## 1. Получите ключи reCAPTCHA

1. Перейдите на https://www.google.com/recaptcha/admin
2. Создайте новый сайт с типом "reCAPTCHA v3"
3. Добавьте домены: `рекордика.рф`, `*.рекордика.рф`, `recordica.ru`, `*.recordica.ru`
4. Скопируйте **Site Key**

## 2. Запустите автоматическую настройку

```bash
cd public_html
node setup-recaptcha.js
```

## 3. Обновите ключи

Замените `6LcXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX` на ваш Site Key во всех файлах:
- `mainPage/JS/recaptcha-v3.js`
- `gusenichnyy-ekskavator/JS/recaptcha-v3.js`
- `ekskavator-pogruzchik/JS/recaptcha-v3.js`
- `avtokran/JS/recaptcha-v3.js`
- `avtovyshka/JS/recaptcha-v3.js`
- `dlinnomer/JS/recaptcha-v3.js`
- `manipuliator/JS/recaptcha-v3.js`
- `kolesnyy-ekskavator/JS/recaptcha-v3.js`

## 4. Готово! ✅

reCAPTCHA v3 теперь защищает все формы на вашем сайте от ботов.

## Что происходит при отправке формы:

1. Пользователь заполняет форму
2. При нажатии "Отправить" запускается проверка reCAPTCHA
3. Google анализирует поведение пользователя
4. Получается токен с оценкой (0.0-1.0)
5. Форма отправляется с токеном
6. Сервер может проверить токен (опционально)

## Тестирование

Откройте любую страницу с формой и попробуйте отправить заявку. В консоли браузера вы увидите процесс проверки reCAPTCHA.

## Поддержка

При проблемах смотрите полную инструкцию в `RECAPTCHA_SETUP.md` 