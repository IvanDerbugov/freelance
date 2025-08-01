// Подключение header.html и footer.html через fetch

function includeHTML(selector, url, callback) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.querySelector(selector).innerHTML = data;
            if (callback) callback();
        });
}

document.addEventListener('DOMContentLoaded', function() {
    includeHTML('#header-container', 'HTML/header.html', function() {
        // Вызываем функцию инициализации header после загрузки
        if (typeof initHeaderFunctionality === 'function') {
            initHeaderFunctionality();
        }
    });
    includeHTML('#footer-container', 'HTML/footer.html');
}); 