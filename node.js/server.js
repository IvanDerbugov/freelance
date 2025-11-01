const http = require('http');

const server = http.createServer(function (request, response) {
    response.end(`
        <h1>hi node!</h1>
    `);
    console.log('Запрос с:', request.socket.remoteAddress);
});

server.listen(3000, '0.0.0.0', function () {
    console.log('Сервер слушает на всех интерфейсах, порт 3000'); 
});