<?php
/**
 * Упрощенный обработчик формы для отправки на lead@kinetica.su
 * 
 * Форма должна содержать поля:
 * - name (обязательно)
 * - email (обязательно)
 * - company (опционально)
 * - content/textarea (опционально - о проекте)
 */

header('Content-Type: application/json; charset=utf-8');

// Настройки
$toEmail = 'lead@kinetica.su';
$fromEmail = 'lead@kinetica.su';
$fromName = 'KINETICA';

$response = ['success' => false];

// Получаем данные из POST запроса
$request = $_POST;

// Защита от ботов (скрытое поле login должно быть пустым)
$bot = isset($request['login']) ? trim(htmlspecialchars($request['login'], ENT_QUOTES)) : '';
if ($bot) {
    $response['error']['general'] = 'Доступ запрещен';
    echo json_encode($response);
    exit;
}

// Валидация и очистка данных
$name = isset($request['name']) ? trim(htmlspecialchars($request['name'], ENT_QUOTES)) : '';
$email = isset($request['email']) ? trim(htmlspecialchars($request['email'], ENT_QUOTES)) : '';
$company = isset($request['company']) ? trim(htmlspecialchars($request['company'], ENT_QUOTES)) : '';
$content = isset($request['content']) ? nl2br(trim(htmlspecialchars($request['content'], ENT_QUOTES))) : '';

// Валидация
if (!$name) {
    $response['error']['name'] = 'Укажите имя';
}
if (!$email) {
    $response['error']['email'] = 'Укажите email';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $response['error']['email'] = 'Укажите правильный email';
}

// Если есть ошибки - возвращаем их
if (isset($response['error'])) {
    echo json_encode($response);
    exit;
}

// Формируем содержимое письма
$subject = 'Новая заявка с сайта';
$body = '<html><body style="font-family: Arial, sans-serif;">';
$body .= '<h2>Новая заявка с сайта</h2>';
$body .= '<table style="border-collapse: collapse; width: 100%; max-width: 600px;">';
$body .= '<tr><td style="padding: 8px; border: 1px solid #ddd; background: #f5f5f5;"><b>Имя:</b></td>';
$body .= '<td style="padding: 8px; border: 1px solid #ddd;">' . $name . '</td></tr>';
$body .= '<tr><td style="padding: 8px; border: 1px solid #ddd; background: #f5f5f5;"><b>Email:</b></td>';
$body .= '<td style="padding: 8px; border: 1px solid #ddd;"><a href="mailto:' . $email . '">' . $email . '</a></td></tr>';

if ($company) {
    $body .= '<tr><td style="padding: 8px; border: 1px solid #ddd; background: #f5f5f5;"><b>Компания:</b></td>';
    $body .= '<td style="padding: 8px; border: 1px solid #ddd;">' . $company . '</td></tr>';
}

if ($content) {
    $body .= '<tr><td style="padding: 8px; border: 1px solid #ddd; background: #f5f5f5;"><b>О проекте:</b></td>';
    $body .= '<td style="padding: 8px; border: 1px solid #ddd;">' . $content . '</td></tr>';
}

$body .= '</table>';
$body .= '<p style="margin-top: 20px; color: #666; font-size: 12px;">';
$body .= 'Дата: ' . date('d.m.Y H:i:s') . '<br>';
$body .= 'IP: ' . ($_SERVER['REMOTE_ADDR'] ?? 'не определен') . '<br>';
$body .= 'URL: ' . ($_SERVER['HTTP_REFERER'] ?? 'не определен');
$body .= '</p>';
$body .= '</body></html>';

// Заголовки письма
$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=utf-8\r\n";
$headers .= "From: " . $fromName . " <" . $fromEmail . ">\r\n";
$headers .= "Reply-To: " . $email . "\r\n";

// Отправляем письмо
$mailSent = mail($toEmail, '=?utf-8?B?' . base64_encode($subject) . '?=', $body, $headers);

if ($mailSent) {
    $response['success'] = true;
    $response['message'] = 'Спасибо за заявку! Мы свяжемся с вами в ближайшее время.';
} else {
    $response['error']['general'] = 'Ошибка отправки. Попробуйте позже.';
}

echo json_encode($response, JSON_UNESCAPED_UNICODE);

