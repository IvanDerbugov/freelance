<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Получаем данные из POST запроса
$input = json_decode(file_get_contents('php://input'), true);

// Если JSON не получен, пробуем обычный POST
if (!$input) {
    $input = $_POST;
}

// Проверяем наличие обязательных полей
if (empty($input['name']) || empty($input['contact']) || empty($input['message'])) {
    echo json_encode(['success' => false, 'message' => 'Заполните все обязательные поля']);
    exit;
}

// Очищаем данные
$name = htmlspecialchars(trim($input['name']));
$contact = htmlspecialchars(trim($input['contact']));
$message = htmlspecialchars(trim($input['message']));

// Настройки Telegram
$telegramToken = '8189134089:AAHenhnIexEBe16jQ90goRyOBpFnXgQvqUY';
$telegramChatId = '6169313997'; // Chat ID заказчика Markus

// Настройки письма
$to = 'Mark@handymark.su';
$subject = "Новая заявка с сайта HandyMark";

// Формируем тело письма
$emailMessage = "
<html>
<head>
    <title>Новая заявка HandyMark</title>
</head>
<body>
    <h2>Новая заявка с сайта HandyMark</h2>
    <table style='border-collapse: collapse; width: 100%;'>
        <tr>
            <td style='padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9; font-weight: bold;'>Имя:</td>
            <td style='padding: 10px; border: 1px solid #ddd;'>$name</td>
        </tr>
        <tr>
            <td style='padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9; font-weight: bold;'>Контакт:</td>
            <td style='padding: 10px; border: 1px solid #ddd;'>$contact</td>
        </tr>
        <tr>
            <td style='padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9; font-weight: bold;'>Сообщение:</td>
            <td style='padding: 10px; border: 1px solid #ddd;'>$message</td>
        </tr>
        <tr>
            <td style='padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9; font-weight: bold;'>Дата и время:</td>
            <td style='padding: 10px; border: 1px solid #ddd;'>" . date('d.m.Y H:i:s') . "</td>
        </tr>
        <tr>
            <td style='padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9; font-weight: bold;'>IP адрес:</td>
            <td style='padding: 10px; border: 1px solid #ddd;'>" . $_SERVER['REMOTE_ADDR'] . "</td>
        </tr>
    </table>
</body>
</html>
";

// Формируем сообщение для Telegram
$telegramMessage = "🔧 *НОВАЯ ЗАЯВКА HANDYMARK*

👤 *Имя:* $name
📞 *Контакт:* $contact
💬 *Сообщение:* $message
📅 *Дата:* " . date('d.m.Y H:i:s') . "
🌐 *IP:* " . $_SERVER['REMOTE_ADDR'] . "";

// Функция отправки в Telegram
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
            'content' => http_build_query($data)
        ]
    ];
    
    $context = stream_context_create($options);
    $result = file_get_contents($url, false, $context);
    
    return $result !== false;
}

// Заголовки для HTML письма
$headers = array(
    'MIME-Version: 1.0',
    'Content-type: text/html; charset=UTF-8',
    'From: noreply@handymark.us',
    'Reply-To: noreply@handymark.us',
    'X-Mailer: PHP/' . phpversion()
);

// Отправляем письмо
$mailSent = mail($to, $subject, $emailMessage, implode("\r\n", $headers));

// Отправляем в Telegram
$telegramSent = sendTelegramMessage($telegramToken, $telegramChatId, $telegramMessage);

if ($mailSent || $telegramSent) {
    // Логируем успешную отправку
    $logMessage = date('Y-m-d H:i:s') . " - Успешная отправка формы от $name ($contact) [Email: " . ($mailSent ? 'OK' : 'FAIL') . ", Telegram: " . ($telegramSent ? 'OK' : 'FAIL') . "]\n";
    file_put_contents('form-logs.txt', $logMessage, FILE_APPEND | LOCK_EX);
    
    echo json_encode([
        'success' => true, 
        'message' => 'Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.'
    ]);
} else {
    // Логируем ошибку
    $logMessage = date('Y-m-d H:i:s') . " - Ошибка отправки формы от $name ($contact)\n";
    file_put_contents('form-logs.txt', $logMessage, FILE_APPEND | LOCK_EX);
    
    echo json_encode([
        'success' => false, 
        'message' => 'Ошибка отправки. Попробуйте позже.'
    ]);
}
?> 