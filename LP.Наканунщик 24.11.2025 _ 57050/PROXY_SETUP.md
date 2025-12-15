# Настройка прокси для API чата на продакшене

На продакшене запросы к API идут через прокси `/api/chat`, который нужно настроить на веб-сервере.

## Для Nginx

Добавьте в конфигурацию вашего сайта (обычно в `/etc/nginx/sites-available/your-site` или в блоке `server`):

```nginx
location /api/chat {
    proxy_pass https://amp.kinetica.su/clientservices/kinetica/bot/;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_cache_bypass $http_upgrade;
    proxy_set_header Content-Type application/json;
    
    # CORS заголовки (если нужно)
    add_header Access-Control-Allow-Origin *;
    add_header Access-Control-Allow-Methods 'POST, OPTIONS';
    add_header Access-Control-Allow-Headers 'Content-Type';
    
    # Обработка OPTIONS запросов
    if ($request_method = 'OPTIONS') {
        return 204;
    }
}
```

После изменения конфигурации перезагрузите Nginx:
```bash
sudo nginx -t  # Проверка конфигурации
sudo systemctl reload nginx  # Перезагрузка
```

## Для Apache

Добавьте в `.htaccess` или в конфигурацию виртуального хоста:

```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    
    # Прокси для API чата
    RewriteRule ^api/chat$ https://amp.kinetica.su/clientservices/kinetica/bot/ [P,L]
    
    # CORS заголовки
    <IfModule mod_headers.c>
        Header set Access-Control-Allow-Origin "*"
        Header set Access-Control-Allow-Methods "POST, OPTIONS"
        Header set Access-Control-Allow-Headers "Content-Type"
    </IfModule>
</IfModule>
```

Для работы прокси в Apache нужен модуль `mod_proxy` и `mod_proxy_http`:
```bash
sudo a2enmod proxy
sudo a2enmod proxy_http
sudo a2enmod headers
sudo systemctl restart apache2
```

## Альтернативный вариант: PHP прокси

Если нет доступа к настройке веб-сервера, можно создать PHP файл `api/chat.php`:

```php
<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$url = 'https://amp.kinetica.su/clientservices/kinetica/bot/';
$data = file_get_contents('php://input');

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Content-Length: ' . strlen($data)
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

http_response_code($httpCode);
echo $response;
?>
```

И изменить URL в коде на `/api/chat.php` или настроить rewrite правило.

## Проверка

После настройки проверьте, что прокси работает:
```bash
curl -X POST https://nakanunshchik.derbugov.ru/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"bot","content":"test"}]}'
```

Должен вернуться ответ от API.

