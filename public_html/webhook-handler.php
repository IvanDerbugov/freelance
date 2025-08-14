<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Проверяем метод запроса
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Метод не поддерживается']);
    exit;
}

// Получаем данные из POST запроса
$input = json_decode(file_get_contents('php://input'), true);

// Если JSON не получен, пробуем обычный POST
if (!$input) {
    $input = $_POST;
}

// Логируем входящие данные для отладки
$logData = date('Y-m-d H:i:s') . " - Webhook получен: " . json_encode($input) . "\n";
file_put_contents('webhook-logs.txt', $logData, FILE_APPEND | LOCK_EX);

// Проверяем наличие обязательных полей
if (empty($input['name']) || empty($input['contact'])) {
    $logData = date('Y-m-d H:i:s') . " - Ошибка: отсутствуют обязательные поля\n";
    file_put_contents('webhook-logs.txt', $logData, FILE_APPEND | LOCK_EX);
    echo json_encode(['success' => false, 'message' => 'Отсутствуют обязательные поля']);
    exit;
}

// Очищаем и валидируем данные
$name = htmlspecialchars(trim($input['name']));
$contact = htmlspecialchars(trim($input['contact']));
$formType = isset($input['form_type']) ? htmlspecialchars(trim($input['form_type'])) : 'Главная страница';

// Настройки Telegram
$telegramToken = '7808482676:AAEM-SN7WMoy-lJlkD0LMEuDW2C_zw4AfDM';
$telegramCustomerChatId = '7501193489'; // ID личного чата Дмитрия (заказчика)

// Формируем сообщение для Telegram
$telegramMessage = "🚨 *НОВАЯ ЗАЯВКА С ГЛАВНОЙ СТРАНИЦЫ*

📋 *Тип формы:* $formType
👤 *Имя:* $name
📞 *Контакты:* $contact
📅 *Дата:* " . date('d.m.Y H:i:s') . "
🌐 *IP:* " . $_SERVER['REMOTE_ADDR'] . "
🔗 *Источник:* Webhook от web3forms

💻 *User Agent:* " . $_SERVER['HTTP_USER_AGENT'] . "";

// Улучшенная функция отправки в Telegram с детальным логированием
function sendTelegramMessage($token, $chatId, $message) {
    $url = "https://api.telegram.org/bot{$token}/sendMessage";
    $data = [
        'chat_id' => $chatId,
        'text' => $message,
        'parse_mode' => 'Markdown'
    ];
    
    $options = [
        'http' => [
            'method' => 'POST',
            'header' => "Content-Type: application/x-www-form-urlencoded\r\n",
            'content' => http_build_query($data),
            'timeout' => 10
        ]
    ];
    
    $context = stream_context_create($options);
    $result = file_get_contents($url, false, $context);
    
    if ($result === false) {
        return ['success' => false, 'error' => 'Ошибка соединения с Telegram API'];
    }
    
    $response = json_decode($result, true);
    
    if ($response && isset($response['ok']) && $response['ok']) {
        return ['success' => true, 'error' => null];
    } else {
        $error = isset($response['description']) ? $response['description'] : 'Неизвестная ошибка';
        return ['success' => false, 'error' => $error];
    }
}

// Отправляем в Telegram (только в личку заказчику)
$telegramResult = sendTelegramMessage($telegramToken, $telegramCustomerChatId, $telegramMessage);
$telegramSent = $telegramResult['success'];
$telegramError = $telegramResult['error'];

if ($telegramSent) {
    // Логируем успешную отправку
    $logMessage = date('Y-m-d H:i:s') . " - Успешная отправка webhook от $name ($contact) [Telegram Customer: OK]\n";
    file_put_contents('webhook-logs.txt', $logMessage, FILE_APPEND | LOCK_EX);
    
    echo json_encode([
        'success' => true, 
        'message' => 'Webhook обработан успешно',
        'telegram_sent' => true
    ]);
} else {
    // Логируем ошибку
    $logMessage = date('Y-m-d H:i:s') . " - Ошибка отправки webhook от $name ($contact) [Telegram Customer: FAIL - $telegramError]\n";
    file_put_contents('webhook-logs.txt', $logMessage, FILE_APPEND | LOCK_EX);
    
    echo json_encode([
        'success' => false, 
        'message' => 'Ошибка отправки в Telegram',
        'telegram_error' => $telegramError
    ]);
}
?> 