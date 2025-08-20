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
            
            // Проверяем, что элементы загрузились
            console.log('📁 versions.html загружен и вставлен в DOM');
            console.log('📁 Поиск элемента nonono после вставки:', document.querySelector('.nonono'));
            console.log('📁 Все элементы versions:', document.querySelectorAll('[class*="version"]'));
            
            // Инициализируем отображение версий с небольшой задержкой
            setTimeout(() => {
                console.log('⏰ Инициализация с задержкой...');
                initVersionDisplay();
            }, 100);
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
        console.log('🔍 Поиск элемента nonono:', nonono);
        console.log('🔍 Текущая ширина экрана:', width, 'px');
        console.log('🔍 Условие активации защиты:', width < 1500);
        
        if (nonono) {
            if (width < 1500) {
                // Принудительно сбрасываем display: none если он был установлен
                if (nonono.style.display === 'none') {
                    console.log('🔄 СБРАСЫВАЕМ display: none для активации защиты');
                    // Принудительно сбрасываем все inline стили
                    nonono.removeAttribute('style');
                }
                
                nonono.style.position = 'fixed';
                nonono.style.top = '0';
                nonono.style.left = '0';
                nonono.style.width = '100%';
                nonono.style.height = '100%';
                nonono.style.backgroundColor = '#000';
                nonono.style.color = '#fff';
                nonono.style.fontSize = '70px';
                nonono.style.zIndex = '9999';
                nonono.style.display = 'flex';
                nonono.style.alignItems = 'center';
                nonono.style.justifyContent = 'center';
                nonono.style.textAlign = 'center';
                nonono.style.padding = '20px';
                nonono.style.boxSizing = 'border-box';
                
                // Блокируем взаимодействие с основным контентом
                document.body.style.overflow = 'hidden';
                document.body.style.pointerEvents = 'none';
                
                // Делаем nonono некликабельным
                nonono.style.pointerEvents = 'none';
                nonono.style.cursor = 'default';
                
                console.log('🔒 ЗАЩИТА АКТИВИРОВАНА для экрана шириной:', width, 'px');
            } else {
                nonono.style.display = 'none';
                // Восстанавливаем взаимодействие с основным контентом
                document.body.style.overflow = '';
                document.body.style.pointerEvents = '';
                console.log('✅ ЗАЩИТА ОТКЛЮЧЕНА для экрана шириной:', width, 'px');
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
    window.addEventListener('resize', () => {
        console.log('🔄 РЕСАЙЗ ОКНА - обновляем защиту');
        console.log('🔄 Новая ширина окна:', window.innerWidth, 'px');
        
        // Принудительно обновляем защиту при ресайзе
        setTimeout(() => {
            updateVersionDisplay();
        }, 50); // Небольшая задержка для стабилизации размера
    });
    
    // Периодически проверяем защиту (каждые 1 секунду)
    setInterval(() => {
        const currentWidth = window.innerWidth;
        const nonono = document.querySelector('.nonono');
        if (nonono && currentWidth < 1500) {
            // Проверяем, что защита активна
            if (nonono.style.display !== 'flex') {
                console.log('⚠️ ЗАЩИТА БЫЛА ОТКЛЮЧЕНА - ВОССТАНАВЛИВАЕМ');
                console.log('⚠️ Текущий display:', nonono.style.display);
                console.log('⚠️ Текущая ширина:', currentWidth, 'px');
                updateVersionDisplay();
            }
        }
    }, 1000);
    
    // Добавляем функцию для ручного тестирования защиты
    window.testProtection = function() {
        console.log('🧪 ТЕСТИРОВАНИЕ ЗАЩИТЫ');
        const nonono = document.querySelector('.nonono');
        if (nonono) {
            nonono.style.display = 'flex';
            nonono.style.position = 'fixed';
            nonono.style.top = '0';
            nonono.style.left = '0';
            nonono.style.width = '100%';
            nonono.style.height = '100%';
            nonono.style.backgroundColor = '#000';
            nonono.style.color = '#fff';
            nonono.style.fontSize = '70px';
            nonono.style.zIndex = '9999';
            nonono.style.alignItems = 'center';
            nonono.style.justifyContent = 'center';
            nonono.style.textAlign = 'center';
            nonono.style.padding = '20px';
            nonono.style.boxSizing = 'border-box';
            document.body.style.overflow = 'hidden';
            document.body.style.pointerEvents = 'none';
            console.log('✅ ЗАЩИТА ПРИНУДИТЕЛЬНО АКТИВИРОВАНА');
        } else {
            console.log('❌ Элемент nonono не найден');
        }
    };
    
    console.log('🧪 Для тестирования защиты введите в консоль: testProtection()');
    console.log('🧪 Для тестирования ресайза введите в консоль: testResize()');
    console.log('🧪 Для принудительного обновления защиты введите в консоль: forceUpdate()');
    
    // Функция для тестирования ресайза
    window.testResize = function() {
        console.log('🧪 ТЕСТИРОВАНИЕ РЕСАЙЗА');
        console.log('🧪 Текущая ширина:', window.innerWidth, 'px');
        console.log('🧪 Симулируем ресайз...');
        
        // Симулируем событие ресайза
        window.dispatchEvent(new Event('resize'));
        
        setTimeout(() => {
            console.log('🧪 После ресайза ширина:', window.innerWidth, 'px');
            const nonono = document.querySelector('.nonono');
            if (nonono) {
                console.log('🧪 Статус защиты:', nonono.style.display);
                console.log('🧪 Стили защиты:', {
                    position: nonono.style.position,
                    zIndex: nonono.style.zIndex,
                    backgroundColor: nonono.style.backgroundColor
                });
            }
        }, 100);
    };
    
    // Функция для принудительного обновления защиты
    window.forceUpdate = function() {
        console.log('🧪 ПРИНУДИТЕЛЬНОЕ ОБНОВЛЕНИЕ ЗАЩИТЫ');
        console.log('🧪 Текущая ширина:', window.innerWidth, 'px');
        updateVersionDisplay();
        
        setTimeout(() => {
            const nonono = document.querySelector('.nonono');
            if (nonono) {
                console.log('🧪 После обновления display:', nonono.style.display);
                console.log('🧪 После обновления position:', nonono.style.position);
                console.log('🧪 После обновления zIndex:', nonono.style.zIndex);
            }
        }, 100);
    };
}

// Автоматически подключаем версии при загрузке DOM
document.addEventListener('DOMContentLoaded', includeVersions); 