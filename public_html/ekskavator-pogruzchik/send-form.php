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
if (empty($input['name']) || empty($input['contact'])) {
    echo json_encode(['success' => false, 'message' => 'Заполните все обязательные поля']);
    exit;
}

// Очищаем и валидируем данные
$name = htmlspecialchars(trim($input['name']));
$contact = htmlspecialchars(trim($input['contact']));
$formType = isset($input['form_type']) ? htmlspecialchars(trim($input['form_type'])) : 'Экскаватор-погрузчик';

// Настройки Telegram
$telegramToken = '7808482676:AAEM-SN7WMoy-lJlkD0LMEuDW2C_zw4AfDM';
$telegramGroupChatId = '-1002652686710'; // ID группы "Рекордика заявки"

// Настройки письма
$to = 'i.derbugoff2001@gmail.com';
$subject = "Новая заявка с сайта ЭКСКАВАТОР-ПОГРУЗЧИК - $formType";

// Формируем тело письма
$message = "
<html>
<head>
    <title>Новая заявка</title>
</head>
<body>
    <h2>Новая заявка с сайта ЭКСКАВАТОР-ПОГРУЗЧИК</h2>
    <table style='border-collapse: collapse; width: 100%;'>
        <tr>
            <td style='padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9; font-weight: bold;'>Тип формы:</td>
            <td style='padding: 10px; border: 1px solid #ddd;'>$formType</td>
        </tr>
        <tr>
            <td style='padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9; font-weight: bold;'>Имя:</td>
            <td style='padding: 10px; border: 1px solid #ddd;'>$name</td>
        </tr>
        <tr>
            <td style='padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9; font-weight: bold;'>Контакты:</td>
            <td style='padding: 10px; border: 1px solid #ddd;'>$contact</td>
        </tr>
        <tr>
            <td style='padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9; font-weight: bold;'>Дата и время:</td>
            <td style='padding: 10px; border: 1px solid #ddd;'>" . date('d.m.Y H:i:s') . "</td>
        </tr>
        <tr>
            <td style='padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9; font-weight: bold;'>IP адрес:</td>
            <td style='padding: 10px; border: 1px solid #ddd;'>" . $_SERVER['REMOTE_ADDR'] . "</td>
        </tr>
        <tr>
            <td style='padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9; font-weight: bold;'>User Agent:</td>
            <td style='padding: 10px; border: 1px solid #ddd;'>" . $_SERVER['HTTP_USER_AGENT'] . "</td>
        </tr>
    </table>
</body>
</html>
";

// Формируем сообщение для Telegram
$telegramMessage = "🚨 *НОВАЯ ЗАЯВКА С САЙТА ЭКСКАВАТОР-ПОГРУЗЧИК*

📋 *Тип формы:* $formType
👤 *Имя:* $name
📞 *Контакты:* $contact
📅 *Дата:* " . date('d.m.Y H:i:s') . "
🌐 *IP:* " . $_SERVER['REMOTE_ADDR'] . "

💻 *User Agent:* " . $_SERVER['HTTP_USER_AGENT'] . "";

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
    'From: noreply@recordica.ru',
    'Reply-To: noreply@recordica.ru',
    'X-Mailer: PHP/' . phpversion()
);

// Отправляем письмо
$mailSent = mail($to, $subject, $message, implode("\r\n", $headers));

// Отправляем в Telegram (только в группу)
$telegramGroupSent = sendTelegramMessage($telegramToken, $telegramGroupChatId, $telegramMessage);

$telegramSent = $telegramGroupSent;

if ($mailSent || $telegramSent) {
    // Логируем успешную отправку
    $logMessage = date('Y-m-d H:i:s') . " - Успешная отправка формы от $name ($contact) [Email: " . ($mailSent ? 'OK' : 'FAIL') . ", Telegram Group: " . ($telegramGroupSent ? 'OK' : 'FAIL') . "]\n";
    file_put_contents('form-logs.txt', $logMessage, FILE_APPEND | LOCK_EX);
    
    echo json_encode([
        'success' => true, 
        'message' => 'Заявка успешно отправлена!'
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