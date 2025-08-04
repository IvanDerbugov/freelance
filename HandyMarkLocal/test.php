<?php
header('Content-Type: application/json');

echo json_encode([
    'success' => true,
    'message' => 'PHP is working correctly!',
    'timestamp' => date('Y-m-d H:i:s'),
    'server' => $_SERVER['SERVER_SOFTWARE'] ?? 'Unknown'
]);
?> 