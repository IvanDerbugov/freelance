<?php
// Тестовый файл для проверки статуса Telegram бота и поиска Chat ID
header('Content-Type: text/html; charset=UTF-8');

$telegramToken = '7808482676:AAEM-SN7WMoy-lJlkD0LMEuDW2C_zw4AfDM';
$telegramGroupChatId = '-1002652686710';
$telegramCustomerChatId = '7501193489'; // ID личного чата Дмитрия

echo "<h2>Тест Telegram бота - МАНИПУЛЯТОР</h2>";

// 1. Проверяем информацию о боте
echo "<h3>1. Информация о боте:</h3>";
$botInfoUrl = "https://api.telegram.org/bot{$telegramToken}/getMe";
$botInfo = @file_get_contents($botInfoUrl);
if ($botInfo) {
    $botData = json_decode($botInfo, true);
    if ($botData && isset($botData['ok']) && $botData['ok']) {
        echo "<p style='color: green;'>✅ Бот активен: @{$botData['result']['username']} ({$botData['result']['first_name']})</p>";
    } else {
        echo "<p style='color: red;'>❌ Ошибка получения информации о боте: " . ($botData['description'] ?? 'Unknown error') . "</p>";
    }
} else {
    echo "<p style='color: red;'>❌ Не удалось получить информацию о боте</p>";
}

// 2. Проверяем статус бота в группе
echo "<h3>2. Статус бота в группе:</h3>";
$chatMemberUrl = "https://api.telegram.org/bot{$telegramToken}/getChatMember?chat_id={$telegramGroupChatId}&user_id=7808482676";
$chatMember = @file_get_contents($chatMemberUrl);
if ($chatMember) {
    $memberData = json_decode($chatMember, true);
    if ($memberData && isset($memberData['ok']) && $memberData['ok']) {
        $status = $memberData['result']['status'];
        $canSendMessages = isset($memberData['result']['can_send_messages']) ? $memberData['result']['can_send_messages'] : false;
        
        echo "<p>Статус: <strong>$status</strong></p>";
        echo "<p>Может отправлять сообщения: <strong>" . ($canSendMessages ? 'Да' : 'Нет') . "</strong></p>";
        
        if ($status === 'administrator' && $canSendMessages) {
            echo "<p style='color: green;'>✅ Бот имеет права администратора и может отправлять сообщения</p>";
        } elseif ($status === 'member') {
            echo "<p style='color: orange;'>⚠️ Бот является участником группы, но не администратором</p>";
        } else {
            echo "<p style='color: red;'>❌ Проблема с правами бота в группе</p>";
        }
    } else {
        echo "<p style='color: red;'>❌ Ошибка получения статуса бота: " . ($memberData['description'] ?? 'Unknown error') . "</p>";
    }
} else {
    echo "<p style='color: red;'>❌ Не удалось получить статус бота в группе</p>";
}

// 3. ПОИСК CHAT ID ЗАКАЗЧИКА - получаем обновления бота
echo "<h3>3. Поиск Chat ID заказчика (обновления бота):</h3>";
echo "<p><strong>Инструкция:</strong></p>";
echo "<ol>";
echo "<li>Попросите заказчика написать боту @recordica_forms_bot любое сообщение</li>";
echo "<li>Нажмите кнопку 'Получить обновления' ниже</li>";
echo "<li>Найдите в результатах его Chat ID</li>";
echo "</ol>";

if (isset($_GET['get_updates'])) {
    $updatesUrl = "https://api.telegram.org/bot{$telegramToken}/getUpdates";
    $updates = @file_get_contents($updatesUrl);
    
    if ($updates) {
        $updatesData = json_decode($updates, true);
        if ($updatesData && isset($updatesData['ok']) && $updatesData['ok']) {
            echo "<p style='color: green;'>✅ Обновления получены:</p>";
            echo "<pre style='background: #f5f5f5; padding: 10px; border-radius: 5px; max-height: 400px; overflow-y: auto;'>";
            echo htmlspecialchars(json_encode($updatesData, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
            echo "</pre>";
            
            // Парсим и показываем Chat ID
            if (!empty($updatesData['result'])) {
                echo "<h4>Найденные Chat ID:</h4>";
                $chatIds = [];
                foreach ($updatesData['result'] as $update) {
                    if (isset($update['message']['chat']['id'])) {
                        $chatId = $update['message']['chat']['id'];
                        $chatType = $update['message']['chat']['type'];
                        $chatTitle = isset($update['message']['chat']['title']) ? $update['message']['chat']['title'] : '';
                        $firstName = isset($update['message']['from']['first_name']) ? $update['message']['from']['first_name'] : '';
                        $lastName = isset($update['message']['from']['last_name']) ? $update['message']['from']['last_name'] : '';
                        $username = isset($update['message']['from']['username']) ? $update['message']['from']['username'] : '';
                        
                        $key = $chatId . '_' . $chatType;
                        if (!isset($chatIds[$key])) {
                            $chatIds[$key] = [
                                'id' => $chatId,
                                'type' => $chatType,
                                'title' => $chatTitle,
                                'name' => trim($firstName . ' ' . $lastName),
                                'username' => $username
                            ];
                        }
                    }
                }
                
                foreach ($chatIds as $chat) {
                    $name = $chat['name'] ?: $chat['title'] ?: $chat['username'] ?: 'Неизвестно';
                    echo "<p><strong>Chat ID:</strong> <code>{$chat['id']}</code> | <strong>Тип:</strong> {$chat['type']} | <strong>Имя:</strong> $name</p>";
                }
            }
        } else {
            echo "<p style='color: red;'>❌ Ошибка получения обновлений: " . ($updatesData['description'] ?? 'Unknown error') . "</p>";
        }
    } else {
        echo "<p style='color: red;'>❌ Не удалось получить обновления</p>";
    }
} else {
    echo "<p><a href='?get_updates=1' class='btn' style='background: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;'>Получить обновления</a></p>";
}

// 4. Пробуем отправить тестовое сообщение в группу
echo "<h3>4. Тест отправки сообщения в группу:</h3>";
$testMessage = "🧪 *ТЕСТОВОЕ СООБЩЕНИЕ - МАНИПУЛЯТОР*

📅 Дата: " . date('d.m.Y H:i:s') . "
🌐 IP: " . $_SERVER['REMOTE_ADDR'] . "
💻 User Agent: " . $_SERVER['HTTP_USER_AGENT'] . "

Это тестовое сообщение для проверки работы бота.";

$sendUrl = "https://api.telegram.org/bot{$telegramToken}/sendMessage";
$sendData = [
    'chat_id' => $telegramGroupChatId,
    'text' => $testMessage,
    'parse_mode' => 'Markdown'
];

// Пробуем cURL
if (function_exists('curl_init')) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $sendUrl);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($sendData));
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
            echo "<p style='color: green;'>✅ Тестовое сообщение отправлено успешно (cURL)</p>";
            echo "<p>Message ID: {$response['result']['message_id']}</p>";
        } else {
            echo "<p style='color: red;'>❌ Ошибка отправки (cURL): " . ($response['description'] ?? 'Unknown error') . "</p>";
        }
    } else {
        echo "<p style='color: red;'>❌ cURL ошибка: HTTP $httpCode, $curlError</p>";
    }
} else {
    echo "<p style='color: orange;'>⚠️ cURL недоступен</p>";
}

// 5. Пробуем отправить тестовое сообщение в личку заказчику
echo "<h3>5. Тест отправки сообщения в личку заказчику:</h3>";
$sendDataCustomer = [
    'chat_id' => $telegramCustomerChatId,
    'text' => $testMessage,
    'parse_mode' => 'Markdown'
];

// Пробуем cURL
if (function_exists('curl_init')) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $sendUrl);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($sendDataCustomer));
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
            echo "<p style='color: green;'>✅ Тестовое сообщение отправлено в личку заказчику (cURL)</p>";
            echo "<p>Message ID: {$response['result']['message_id']}</p>";
        } else {
            echo "<p style='color: red;'>❌ Ошибка отправки в личку (cURL): " . ($response['description'] ?? 'Unknown error') . "</p>";
        }
    } else {
        echo "<p style='color: red;'>❌ cURL ошибка для лички: HTTP $httpCode, $curlError</p>";
    }
} else {
    echo "<p style='color: orange;'>⚠️ cURL недоступен</p>";
}

// 6. Информация о сервере
echo "<h3>6. Информация о сервере:</h3>";
echo "<p>PHP версия: " . phpversion() . "</p>";
echo "<p>cURL доступен: " . (function_exists('curl_init') ? 'Да' : 'Нет') . "</p>";
echo "<p>allow_url_fopen: " . (ini_get('allow_url_fopen') ? 'Включен' : 'Выключен') . "</p>";
echo "<p>Текущее время: " . date('Y-m-d H:i:s') . "</p>";

echo "<hr>";
echo "<p><a href='send-form.php' target='_blank'>Открыть send-form.php</a></p>";
echo "<p><a href='form-logs.txt' target='_blank'>Открыть логи форм</a></p>";
?> 