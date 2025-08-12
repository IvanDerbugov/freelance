// Функция для подключения versions.html как шаблона
function includeVersions() {
    // Определяем правильный путь в зависимости от расположения страницы
    const currentPath = window.location.pathname;
    let versionsPath;
    
    // Если страница в корне (например, /index.html)
    if (currentPath === '/' || currentPath === '/index.html' || currentPath.endsWith('/mebelMarket/') || currentPath.endsWith('/mebelMarket/index.html')) {
        versionsPath = 'html/versions.html';
    } else if (currentPath.includes('/html/')) {
        // Если страница в папке html (например, /html/aboutCompany.html)
        versionsPath = 'versions.html';
    } else {
        // По умолчанию считаем, что страница в корне
        versionsPath = 'html/versions.html';
    }
    
    console.log('Загружаем versions.html по пути:', versionsPath);
    
    fetch(versionsPath)
        .then(response => response.text())
        .then(html => {
            // Создаем временный div для парсинга HTML
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;
            
            // Вставляем содержимое в начало body текущей страницы
            document.body.insertBefore(tempDiv, document.body.firstChild);
            
            // Инициализируем отображение версий
            initVersionDisplay();
        })
        .catch(error => {
            console.error('Ошибка загрузки versions.html:', error);
        });
}

// Функция для управления отображением версий
function initVersionDisplay() {
    function updateVersionDisplay() {
        const width = window.innerWidth;
        const versionDesktop = document.querySelector('.versionDesktop');
        const versionTablet1500 = document.querySelector('.versionTablet1500');
        const versionTablet1400 = document.querySelector('.versionTablet1400');
        const versionTablet1100 = document.querySelector('.versionTablet1100');
        const versionTablet935 = document.querySelector('.versionTablet935');
        const version743 = document.querySelector('.version743');
        const version450 = document.querySelector('.version450');
        const version360 = document.querySelector('.version360');
        const nonono = document.querySelector('.nonono');

        // Скрываем все версии и делаем их некликабельными
        [versionDesktop, versionTablet1500, versionTablet1400, versionTablet1100, versionTablet935, version743, version450, version360].forEach(el => {
            if (el) {
                el.style.display = 'none';
                el.style.pointerEvents = 'none'; // Не блокирует клики
                el.style.userSelect = 'none'; // Не выделяется текст
            }
        });

        // Настраиваем nonono для всех экранов меньше 1500px (если элемент существует)
        if (nonono) {
            if (width <= 1400) {
                nonono.style.display = 'block';
                nonono.style.position = 'fixed';
                nonono.style.top = '0';
                nonono.style.left = '0';
                nonono.style.width = '100%';
                nonono.style.height = '100%';
                nonono.style.backgroundColor = '#000';
                nonono.style.color = '#fff';
                nonono.style.fontSize = '70px';
                nonono.style.zIndex = '15';
            } else {
                nonono.style.display = 'none';
            }
        }

        // Показываем соответствующую версию и делаем её некликабельной
        if (width > 1500) {
            if (versionDesktop) {
                versionDesktop.style.display = 'flex';
                versionDesktop.style.pointerEvents = 'none';
                versionDesktop.style.userSelect = 'none';
            }
        } else if (width <= 1500 && width > 1400) {
            if (versionTablet1500) {
                versionTablet1500.style.display = 'flex';
                versionTablet1500.style.pointerEvents = 'none';
                versionTablet1500.style.userSelect = 'none';
            }
        } else if (width <= 1400 && width > 1100) {
            if (versionTablet1400) {
                versionTablet1400.style.display = 'flex';
                versionTablet1400.style.pointerEvents = 'none';
                versionTablet1400.style.userSelect = 'none';
            }
        } else if (width <= 1100 && width > 935) {
            if (versionTablet1100) {
                versionTablet1100.style.display = 'flex';
                versionTablet1100.style.pointerEvents = 'none';
                versionTablet1100.style.userSelect = 'none';
            }
        } else if (width <= 935 && width > 743) {
            if (versionTablet935) {
                versionTablet935.style.display = 'flex';
                versionTablet935.style.pointerEvents = 'none';
                versionTablet935.style.userSelect = 'none';
            }
        } else if (width <= 743 && width > 450) {
            if (version743) {
                version743.style.display = 'flex';
                version743.style.borderRadius = '5px';
                version743.style.width = 'auto';
                version743.style.height = 'auto';
                version743.style.padding = '10px 20px';
                version743.style.fontSize = '14px';
                version743.style.pointerEvents = 'none';
                version743.style.userSelect = 'none';
            }
        } else if (width <= 450 && width > 360) {
            if (version450) {
                version450.style.display = 'flex';
                version450.style.borderRadius = '5px';
                version450.style.width = 'auto';
                version450.style.height = 'auto';
                version450.style.padding = '10px 20px';
                version450.style.fontSize = '14px';
                version450.style.pointerEvents = 'none';
                version450.style.userSelect = 'none';
            }
        } else if (width <= 360) {
            if (version360) {
                version360.style.display = 'flex';
                version360.style.borderRadius = '5px';
                version360.style.width = 'auto';
                version360.style.height = 'auto';
                version360.style.padding = '10px 20px';
                version360.style.fontSize = '14px';
                version360.style.pointerEvents = 'none';
                version360.style.userSelect = 'none';
            }
        }
    }

    // Запускаем при загрузке страницы
    updateVersionDisplay();

    // Обновляем при изменении размера окна
    window.addEventListener('resize', updateVersionDisplay);
}

// Автоматически подключаем версии при загрузке DOM
document.addEventListener('DOMContentLoaded', includeVersions); 