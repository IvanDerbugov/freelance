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
    const links = container.querySelectorAll('a[href^="aboutCompany.html"], a[href^="payment.html"], a[href^="delivery.html"], a[href^="contacts.html"], a[href^="privacyPolicy.html"], a[href^="termsOfUse.html"], a[href^="index.html"], a[href^="#"]');
    links.forEach(link => {
        const oldHref = link.getAttribute('href');
        let newHref = oldHref;
        
        // Обрабатываем якорные ссылки (например, #catalog)
        if (oldHref.startsWith('#')) {
            if (basePath === '../') {
                // Если мы в папке html, добавляем путь к главной странице
                newHref = '../index.html' + oldHref;
            } else {
                // Если мы в корне, добавляем только якорь
                newHref = 'index.html' + oldHref;
            }
        } else if (basePath === '../') {
            // Если мы в папке html, исправляем ссылки
            if (oldHref === 'aboutCompany.html') {
                newHref = 'aboutCompany.html'; // Остается как есть
            } else if (oldHref === 'payment.html') {
                newHref = 'payment.html'; // Остается как есть
            } else if (oldHref === 'delivery.html') {
                newHref = 'delivery.html'; // Остается как есть
            } else if (oldHref === 'contacts.html') {
                newHref = 'contacts.html'; // Остается как есть
            } else if (oldHref === 'privacyPolicy.html') {
                newHref = 'privacyPolicy.html'; // Остается как есть
            } else if (oldHref === 'termsOfUse.html') {
                newHref = 'termsOfUse.html'; // Остается как есть
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
            } else if (oldHref === 'privacyPolicy.html') {
                newHref = 'html/privacyPolicy.html'; // В папку html
            } else if (oldHref === 'termsOfUse.html') {
                newHref = 'html/termsOfUse.html'; // В папку html
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

function highlightActiveLink(container) {
    // Определяем текущую страницу
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html';
    
    // Находим все ссылки в шапке
    const headerLinks = container.querySelectorAll('.header-top-left a');
    
    headerLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href) {
            // Убираем все классы active
            link.classList.remove('active');
            
            // Проверяем, соответствует ли ссылка текущей странице
            if (href === '#catalog') {
                // Каталог - это выпадающий список, не выделяем как активную страницу
                return;
            } else if (href.includes('index.html') || href === 'index.html') {
                // Главная страница
                if (currentPage === 'index.html' || currentPage === '' || currentPath.endsWith('/mebelMarket/')) {
                    link.classList.add('active');
                    console.log(`Выделена активная ссылка: Главная на странице ${currentPage}`);
                }
            } else if (href.includes('aboutCompany.html') && currentPage === 'aboutCompany.html') {
                link.classList.add('active');
                console.log(`Выделена активная ссылка: О компании на странице ${currentPage}`);
            } else if (href.includes('payment.html') && currentPage === 'payment.html') {
                link.classList.add('active');
                console.log(`Выделена активная ссылка: Оплата на странице ${currentPage}`);
            } else if (href.includes('delivery.html') && currentPage === 'delivery.html') {
                link.classList.add('active');
                console.log(`Выделена активная ссылка: Доставка на странице ${currentPage}`);
            } else if (href.includes('contacts.html') && currentPage === 'contacts.html') {
                link.classList.add('active');
                console.log(`Выделена активная ссылка: Контакты на странице ${currentPage}`);
            }
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
            
            // Если это header, выделяем активную ссылку
            if (selector === '#header-container') {
                highlightActiveLink(container);
            }
            
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
