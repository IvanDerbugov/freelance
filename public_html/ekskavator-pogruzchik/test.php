<?php
header('Content-Type: application/json');

// Простой тест
echo json_encode([
    'success' => true,
    'message' => 'PHP работает!',
    'time' => date('Y-m-d H:i:s'),
    'post_data' => $_POST,
    'get_data' => $_GET
]);
?> 