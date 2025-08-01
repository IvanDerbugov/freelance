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
$formType = isset($input['form_type']) ? htmlspecialchars(trim($input['form_type'])) : 'Длинномер';

// Настройки Telegram
$telegramToken = '7808482676:AAEM-SN7WMoy-lJlkD0LMEuDW2C_zw4AfDM';
$telegramGroupChatId = '-1002652686710'; // ID группы "Рекордика заявки"
$telegramCustomerChatId = '7501193489'; // ID личного чата Дмитрия

// Настройки письма
$to = 'info-recordica@mail.ru';
$subject = "Новая заявка с сайта ДЛИННОМЕР - $formType";

// Формируем тело письма
$message = "
<html>
<head>
    <title>Новая заявка</title>
</head>
<body>
    <h2>Новая заявка с сайта ДЛИННОМЕР</h2>
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
$telegramMessage = "🚨 *НОВАЯ ЗАЯВКА С САЙТА ДЛИННОМЕР*

📋 *Тип формы:* $formType
👤 *Имя:* $name
📞 *Контакты:* $contact
📅 *Дата:* " . date('d.m.Y H:i:s') . "
🌐 *IP:* " . $_SERVER['REMOTE_ADDR'] . "

💻 *User Agent:* " . $_SERVER['HTTP_USER_AGENT'] . "";

// Улучшенная функция отправки в Telegram с детальным логированием
function sendTelegramMessage($token, $chatId, $message) {
    $url = "https://api.telegram.org/bot{$token}/sendMessage";
    $data = [
        'chat_id' => $chatId,
        'text' => $message,
        'parse_mode' => 'Markdown'
    ];
    
    $errorLog = '';
    $success = false;
    
    // Сначала пробуем cURL (более надежный способ)
    if (function_exists('curl_init')) {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/x-www-form-urlencoded'
        ]);
        
        $result = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $curlError = curl_error($ch);
        curl_close($ch);
        
        if ($result !== false && $httpCode == 200) {
            $response = json_decode($result, true);
            if ($response && isset($response['ok']) && $response['ok']) {
                $success = true;
                $errorLog = "cURL SUCCESS: HTTP $httpCode";
            } else {
                $errorLog = "cURL API ERROR: " . ($response['description'] ?? 'Unknown error') . " (HTTP $httpCode)";
            }
        } else {
            $errorLog = "cURL FAILED: HTTP $httpCode, Error: $curlError";
        }
    }
    
    // Если cURL не сработал, пробуем file_get_contents
    if (!$success) {
        $options = [
            'http' => [
                'method' => 'POST',
                'header' => "Content-Type: application/x-www-form-urlencoded\r\n",
                'content' => http_build_query($data),
                'timeout' => 10
            ]
        ];
        
        $context = stream_context_create($options);
        $result = @file_get_contents($url, false, $context);
        
        if ($result !== false) {
            $response = json_decode($result, true);
            if ($response && isset($response['ok']) && $response['ok']) {
                $success = true;
                $errorLog = "file_get_contents SUCCESS";
            } else {
                $errorLog .= " | file_get_contents API ERROR: " . ($response['description'] ?? 'Unknown error');
            }
        } else {
            $errorLog .= " | file_get_contents FAILED";
        }
    }
    
    return ['success' => $success, 'error' => $errorLog];
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

// Отправляем в Telegram (в группу и в личку заказчику) с детальным логированием
$telegramGroupResult = sendTelegramMessage($telegramToken, $telegramGroupChatId, $telegramMessage);
$telegramGroupSent = $telegramGroupResult['success'];
$telegramGroupError = $telegramGroupResult['error'];

$telegramCustomerResult = sendTelegramMessage($telegramToken, $telegramCustomerChatId, $telegramMessage);
$telegramCustomerSent = $telegramCustomerResult['success'];
$telegramCustomerError = $telegramCustomerResult['error'];

$telegramSent = $telegramGroupSent || $telegramCustomerSent;

if ($mailSent || $telegramSent) {
    // Логируем успешную отправку с деталями
    $logMessage = date('Y-m-d H:i:s') . " - Успешная отправка формы от $name ($contact) [Email: " . ($mailSent ? 'OK' : 'FAIL') . ", Telegram Group: " . ($telegramGroupSent ? 'OK' : 'FAIL') . ($telegramGroupError ? " - $telegramGroupError" : "") . ", Telegram Customer: " . ($telegramCustomerSent ? 'OK' : 'FAIL') . ($telegramCustomerError ? " - $telegramCustomerError" : "") . "]\n";
    file_put_contents('form-logs.txt', $logMessage, FILE_APPEND | LOCK_EX);
    
    echo json_encode([
        'success' => true, 
        'message' => 'Заявка успешно отправлена!'
    ]);
} else {
    // Логируем ошибку с деталями
    $logMessage = date('Y-m-d H:i:s') . " - Ошибка отправки формы от $name ($contact) [Email: " . ($mailSent ? 'OK' : 'FAIL') . ", Telegram Group: " . ($telegramGroupSent ? 'OK' : 'FAIL') . ($telegramGroupError ? " - $telegramGroupError" : "") . ", Telegram Customer: " . ($telegramCustomerSent ? 'OK' : 'FAIL') . ($telegramCustomerError ? " - $telegramCustomerError" : "") . "]\n";
    file_put_contents('form-logs.txt', $logMessage, FILE_APPEND | LOCK_EX);
    
    echo json_encode([
        'success' => false, 
        'message' => 'Ошибка отправки. Попробуйте позже.'
    ]);
}
?> 