// Умное подключение header.html и footer.html через fetch
// Автоматически определяет правильные пути в зависимости от расположения страницы

function getBasePath() {
    // Определяем, где находится текущая страница
    const currentPath = window.location.pathname;
    
    // Если страница в корне (например, /index.html)
    if (currentPath === '/' || currentPath === '/index.html' || currentPath.endsWith('/mebelMarket/') || currentPath.endsWith('/mebelMarket/index.html')) {
        return '';
    }
    
    // Если страница в папке html (например, /html/aboutCompany.html)
    if (currentPath.includes('/html/')) {
        return '../';
    }
    
    // По умолчанию считаем, что страница в корне
    return '';
}

function fixImagePaths(container, basePath) {
    // Исправляем пути к изображениям в зависимости от расположения страницы
    const images = container.querySelectorAll('img[src^="img/"]');
    images.forEach(img => {
        const oldSrc = img.getAttribute('src');
        const newSrc = basePath + oldSrc;
        img.setAttribute('src', newSrc);
        console.log(`Исправлен путь изображения: ${oldSrc} → ${newSrc}`);
    });
}

function fixInternalLinks(container, basePath) {
    // Исправляем внутренние ссылки в зависимости от расположения страницы
    const links = container.querySelectorAll('a[href^="aboutCompany.html"], a[href^="payment.html"], a[href^="delivery.html"], a[href^="contacts.html"], a[href^="index.html"]');
    links.forEach(link => {
        const oldHref = link.getAttribute('href');
        let newHref = oldHref;
        
        if (basePath === '../') {
            // Если мы в папке html, исправляем ссылки
            if (oldHref === 'aboutCompany.html') {
                newHref = 'aboutCompany.html'; // Остается как есть
            } else if (oldHref === 'payment.html') {
                newHref = 'payment.html'; // Остается как есть
            } else if (oldHref === 'delivery.html') {
                newHref = 'delivery.html'; // Остается как есть
            } else if (oldHref === 'contacts.html') {
                newHref = 'contacts.html'; // Остается как есть
            } else if (oldHref === 'index.html') {
                newHref = '../index.html'; // На главную
            }
        } else {
            // Если мы в корне, исправляем ссылки
            if (oldHref === 'aboutCompany.html') {
                newHref = 'html/aboutCompany.html'; // В папку html
            } else if (oldHref === 'payment.html') {
                newHref = 'html/payment.html'; // В папку html
            } else if (oldHref === 'delivery.html') {
                newHref = 'html/delivery.html'; // В папку html
            } else if (oldHref === 'contacts.html') {
                newHref = 'html/contacts.html'; // В папку html
            } else if (oldHref === 'index.html') {
                newHref = 'index.html'; // Остается как есть
            }
        }
        
        if (oldHref !== newHref) {
            link.setAttribute('href', newHref);
            console.log(`Исправлена ссылка: ${oldHref} → ${newHref}`);
        }
    });
}

function includeHTML(selector, url, callback) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.querySelector(selector).innerHTML = data;
            
            // Исправляем пути к изображениям и ссылкам
            const container = document.querySelector(selector);
            const basePath = getBasePath();
            fixImagePaths(container, basePath);
            fixInternalLinks(container, basePath);
            
            if (callback) callback();
        })
        .catch(error => {
            console.error('Ошибка загрузки:', error);
            document.querySelector(selector).innerHTML = '<p>Ошибка загрузки контента</p>';
        });
}

document.addEventListener('DOMContentLoaded', function() {
    const basePath = getBasePath();
    
    console.log('Текущий базовый путь:', basePath);
    
    includeHTML('#header-container', basePath + 'html/header.html', function() {
        // Вызываем функцию инициализации header после загрузки
        if (typeof initHeaderFunctionality === 'function') {
            initHeaderFunctionality();
        }
        // Инициализируем выпадающий каталог с небольшой задержкой
        setTimeout(() => {
            if (typeof initCatalogDropdown === 'function') {
                initCatalogDropdown();
            }
        }, 100);
    });
    
    includeHTML('#footer-container', basePath + 'html/footer.html', function() {
        // Вызываем функцию инициализации footer после загрузки
        if (typeof initFooterFunctionality === 'function') {
            initFooterFunctionality();
        }
    });
});
