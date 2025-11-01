const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3001; // Используем другой порт, т.к. 3000 занят

const server = http.createServer((req, res) => {
    // Путь к файлу
    let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
    
    // Определяем тип контента
    const extname = path.extname(filePath);
    let contentType = 'text/html';
    
    if (extname === '.css') contentType = 'text/css';
    if (extname === '.js') contentType = 'text/javascript';
    if (extname === '.json') contentType = 'application/json';
    
    // Читаем и отправляем файл
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end('<h1>404 - Страница не найдена</h1>');
            } else {
                res.writeHead(500);
                res.end('Ошибка сервера: ' + err.code);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType + '; charset=utf-8' });
            res.end(content);
        }
    });
    
    console.log('Запрос:', req.url);
});

server.listen(PORT, '0.0.0.0', () => {
    console.log('═══════════════════════════════════════');
    console.log('🚀 Сервер запущен!');
    console.log('═══════════════════════════════════════');
    console.log(`📍 Локально:           http://localhost:${PORT}`);
    console.log(`📱 В сети (телефон):   http://192.168.1.173:${PORT}`);
    console.log('═══════════════════════════════════════');
    console.log('Нажмите Ctrl+C для остановки');
});

