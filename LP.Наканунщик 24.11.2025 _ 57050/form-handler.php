<?php
/**
 * Обработчик формы для отправки заявок
 * Отправляет на lead@kinetica.su и тестовую почту i.derbugoff2001@gmail.com
 * Сохраняет все заявки в form-submissions.json
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Быстрый ответ на preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$response = ['success' => false];

// Простое логирование в файл рядом со скриптом
function log_event(array $data): void {
    $logFile = __DIR__ . '/form-handler.log';
    $payload = '[' . date('Y-m-d H:i:s') . '] ' . json_encode($data, JSON_UNESCAPED_UNICODE) . PHP_EOL;
    @file_put_contents($logFile, $payload, FILE_APPEND | LOCK_EX);
}

// Получаем данные из POST запроса
$request = $_POST;

// Если данные пришли как JSON
if (empty($request)) {
    $json = file_get_contents('php://input');
    $request = json_decode($json, true);
    if (!$request) {
        $request = [];
    }
}

// Защита от ботов (скрытое поле login должно быть пустым)
$bot = isset($request['login']) ? trim(htmlspecialchars($request['login'], ENT_QUOTES)) : '';
if ($bot) {
    $response['error'] = ['general' => 'Доступ запрещен'];
    echo json_encode($response, JSON_UNESCAPED_UNICODE);
    exit;
}

// Валидация и очистка данных
$name = isset($request['name']) ? trim(htmlspecialchars($request['name'], ENT_QUOTES)) : '';
$email = isset($request['email']) ? trim(htmlspecialchars($request['email'], ENT_QUOTES)) : '';
$company = isset($request['company']) ? trim(htmlspecialchars($request['company'], ENT_QUOTES)) : '';
$message = isset($request['message']) ? nl2br(trim(htmlspecialchars($request['message'], ENT_QUOTES))) : '';

// Валидация
if (!$name) {
    $response['error'] = ['name' => 'Укажите имя'];
}
if (!$email) {
    if (isset($response['error'])) {
        $response['error']['email'] = 'Укажите email';
    } else {
        $response['error'] = ['email' => 'Укажите email'];
    }
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    if (isset($response['error'])) {
        $response['error']['email'] = 'Укажите правильный email';
    } else {
        $response['error'] = ['email' => 'Укажите правильный email'];
    }
}

// Если есть ошибки - возвращаем их
if (isset($response['error'])) {
    echo json_encode($response, JSON_UNESCAPED_UNICODE);
    exit;
}

// Настройки
$toEmails = [
    'lead@kinetica.su',
    'i.derbugoff2001@gmail.com'
];
$fromEmail = 'noreply@kinetica.su';
$fromName = 'Наканунщик';

// Формируем содержимое письма
$subject = 'Новая заявка - Пакет «Успеть всё»';
$body = '<html><body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">';
$body .= '<h2 style="color: #ff0055;">Новая заявка с сайта</h2>';
$body .= '<table style="border-collapse: collapse; width: 100%; max-width: 600px; margin: 20px 0;">';
$body .= '<tr><td style="padding: 12px; border: 1px solid #ddd; background: #f5f5f5; font-weight: bold; width: 150px;">Имя:</td>';
$body .= '<td style="padding: 12px; border: 1px solid #ddd;">' . $name . '</td></tr>';
$body .= '<tr><td style="padding: 12px; border: 1px solid #ddd; background: #f5f5f5; font-weight: bold;">Email:</td>';
$body .= '<td style="padding: 12px; border: 1px solid #ddd;"><a href="mailto:' . $email . '">' . $email . '</a></td></tr>';

if ($company) {
    $body .= '<tr><td style="padding: 12px; border: 1px solid #ddd; background: #f5f5f5; font-weight: bold;">Компания:</td>';
    $body .= '<td style="padding: 12px; border: 1px solid #ddd;">' . $company . '</td></tr>';
}

if ($message) {
    $body .= '<tr><td style="padding: 12px; border: 1px solid #ddd; background: #f5f5f5; font-weight: bold; vertical-align: top;">О проекте:</td>';
    $body .= '<td style="padding: 12px; border: 1px solid #ddd;">' . $message . '</td></tr>';
}

$body .= '</table>';
$body .= '<div style="margin-top: 20px; padding: 15px; background: #f9f9f9; border-radius: 4px; font-size: 12px; color: #666;">';
$body .= '<strong>Дополнительная информация:</strong><br>';
$body .= 'Дата: ' . date('d.m.Y H:i:s') . '<br>';
$body .= 'IP: ' . ($_SERVER['REMOTE_ADDR'] ?? 'не определен') . '<br>';
$body .= 'URL: ' . ($_SERVER['HTTP_REFERER'] ?? 'не определен');
$body .= '</div>';
$body .= '</body></html>';

// Заголовки письма
$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=utf-8\r\n";
$headers .= "From: " . $fromName . " <" . $fromEmail . ">\r\n";
$headers .= "Reply-To: " . $email . "\r\n";

// Сохраняем заявку в файл
$submissionsFile = __DIR__ . '/form-submissions.json';
$submission = [
    'date' => date('Y-m-d H:i:s'),
    'name' => $name,
    'email' => $email,
    'company' => $company,
    'message' => $message,
    'ip' => $_SERVER['REMOTE_ADDR'] ?? 'не определен',
    'url' => $_SERVER['HTTP_REFERER'] ?? 'не определен'
];

// Читаем существующие заявки
$submissions = [];
if (file_exists($submissionsFile)) {
    $existingData = @file_get_contents($submissionsFile);
    if ($existingData) {
        $submissions = json_decode($existingData, true) ?: [];
    }
}

// Добавляем новую заявку
$submissions[] = $submission;

// Сохраняем обратно в файл (ограничиваем до последних 1000 заявок)
if (count($submissions) > 1000) {
    $submissions = array_slice($submissions, -1000);
}
@file_put_contents($submissionsFile, json_encode($submissions, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT), LOCK_EX);

// Отправляем письма на все адреса и логируем результат
$allSent = true;
$mailDetails = [];
foreach ($toEmails as $toEmail) {
    $mailSent = @mail($toEmail, '=?utf-8?B?' . base64_encode($subject) . '?=', $body, $headers);
    $mailDetails[] = ['to' => $toEmail, 'sent' => (bool) $mailSent];
    if (!$mailSent) {
        $allSent = false;
    }
}

$response['success'] = true;
$response['message'] = $allSent
    ? 'Спасибо за заявку! Мы свяжемся с вами в ближайшее время.'
    : 'Заявка сохранена, но письма не отправлены. Свяжемся вручную.';
$response['mail_sent'] = $allSent;

log_event([
    'submission' => $submission,
    'mail' => $mailDetails,
    'mail_all_sent' => $allSent,
]);

echo json_encode($response, JSON_UNESCAPED_UNICODE);
