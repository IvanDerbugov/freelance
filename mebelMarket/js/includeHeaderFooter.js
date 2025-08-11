// Подключение header.html и footer.html через fetch

function includeHTML(selector, url, callback) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.querySelector(selector).innerHTML = data;
            if (callback) callback();
        })
        .catch(error => {
            console.error('Ошибка загрузки:', error);
            document.querySelector(selector).innerHTML = '<p>Ошибка загрузки контента</p>';
        });
}

document.addEventListener('DOMContentLoaded', function() {
    includeHTML('#header-container', 'html/header.html', function() {
        // Вызываем функцию инициализации header после загрузки
        if (typeof initHeaderFunctionality === 'function') {
            initHeaderFunctionality();
        }
    });
    includeHTML('#footer-container', 'html/footer.html', function() {
        // Вызываем функцию инициализации footer после загрузки
        if (typeof initFooterFunctionality === 'function') {
            initFooterFunctionality();
        }
    });
});
