// Отслеживание событий для Яндекс.Метрики
// ID счетчика: 103637885

// Функция для отправки событий в Яндекс.Метрику
function sendMetricEvent(goalName, params = {}) {
    try {
        if (typeof ym === 'function') {
            ym(103637885, 'reachGoal', goalName, params);
            console.log(`✅ Событие "${goalName}" отправлено в Яндекс.Метрику`, params);
        } else {
            console.warn('⚠️ Яндекс.Метрика не загружена');
        }
    } catch (error) {
        console.error('❌ Ошибка при отправке события в Яндекс.Метрику:', error);
    }
}

// Отслеживание кликов по телефонам
function trackPhoneClicks() {
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    
    phoneLinks.forEach(link => {
        // Проверяем, не добавлен ли уже обработчик
        if (!link.hasAttribute('data-phone-tracked')) {
            link.setAttribute('data-phone-tracked', 'true');
            link.addEventListener('click', function(e) {
                const phoneNumber = this.href.replace('tel:', '');
                const location = this.closest('header') ? 'header' : 
                               this.closest('footer') ? 'footer' : 
                               this.closest('.modal') ? 'modal' : 'other';
                
                sendMetricEvent('phone_click', {
                    phone: phoneNumber,
                    location: location,
                    url: window.location.href
                });
            });
        }
    });
    
    return phoneLinks.length;
}

// Отслеживание кликов по WhatsApp
function trackWhatsAppClicks() {
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp"]');
    
    whatsappLinks.forEach(link => {
        // Проверяем, не добавлен ли уже обработчик
        if (!link.hasAttribute('data-whatsapp-tracked')) {
            link.setAttribute('data-whatsapp-tracked', 'true');
            link.addEventListener('click', function(e) {
                const location = this.closest('header') ? 'header' : 
                               this.closest('footer') ? 'footer' : 
                               this.closest('.modal') ? 'modal' : 'other';
                
                sendMetricEvent('whatsapp_click', {
                    location: location,
                    url: window.location.href
                });
            });
        }
    });
    
    return whatsappLinks.length;
}

// Отслеживание отправки форм
function trackFormSubmissions() {
    // Основная форма "Оставить заявку"
    const mainForm = document.getElementById('formaMainPage');
    if (mainForm) {
        mainForm.addEventListener('submit', function(e) {
            sendMetricEvent('form_submit', {
                form_type: 'main_modal',
                url: window.location.href
            });
        });
    }
    
    // Форма "Страница в разработке"
    const underConstructionForm = document.getElementById('formaUnderConstruction');
    if (underConstructionForm) {
        underConstructionForm.addEventListener('submit', function(e) {
            sendMetricEvent('form_submit', {
                form_type: 'under_construction',
                url: window.location.href
            });
        });
    }
}

// Отслеживание кликов по кнопкам "Оставить заявку"
function trackRequestButtons() {
    const requestButtons = document.querySelectorAll('.open-modal-btn, .leaveRequest');
    
    requestButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const location = this.closest('header') ? 'header' : 
                           this.closest('footer') ? 'footer' : 'other';
            
            sendMetricEvent('request_button_click', {
                location: location,
                url: window.location.href
            });
        });
    });
}

// Отслеживание кликов по кнопкам "Зафиксировать скидку"
function trackDiscountButtons() {
    const discountButtons = document.querySelectorAll('.fixed-modal-btn');
    
    discountButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            sendMetricEvent('discount_button_click', {
                url: window.location.href
            });
        });
    });
}

// Отслеживание кликов по кнопкам каталога
function trackCatalogButtons() {
    const catalogButtons = document.querySelectorAll('.catologCardLink');
    
    catalogButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const cardName = this.closest('.catologCard')?.querySelector('.catologCardName')?.textContent?.trim() || 'unknown';
            
            sendMetricEvent('catalog_button_click', {
                card_name: cardName,
                url: window.location.href
            });
        });
    });
}

// Отслеживание кликов по кнопке "Показать еще"
function trackShowMoreButton() {
    const showMoreButton = document.getElementById('seeMore');
    if (showMoreButton) {
        showMoreButton.addEventListener('click', function(e) {
            sendMetricEvent('show_more_click', {
                url: window.location.href
            });
        });
    }
}

// Отслеживание кликов по ссылкам в каталоге
function trackCatalogLinks() {
    const catalogLinks = document.querySelectorAll('.dropdown-menu a, .catalog-dropdown a');
    
    catalogLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const linkText = this.textContent.trim();
            const location = this.closest('.headerBottom') ? 'header' : 
                           this.closest('.footerBottom') ? 'footer' : 'other';
            
            sendMetricEvent('catalog_link_click', {
                link_text: linkText,
                location: location,
                url: window.location.href
            });
        });
    });
}

// Инициализация всех отслеживаний
function initMetricsTracking() {
    try {
        console.log('🚀 Инициализация отслеживания Яндекс.Метрики...');
        
        // Функция для запуска отслеживания
        function runTracking() {
            try {
                const phoneCount = trackPhoneClicks();
                const whatsappCount = trackWhatsAppClicks();
                trackFormSubmissions();
                trackRequestButtons();
                trackDiscountButtons();
                trackCatalogButtons();
                trackShowMoreButton();
                trackCatalogLinks();
                
                console.log(`📊 Отслеживание ссылок инициализировано: ${phoneCount} телефонных, ${whatsappCount} WhatsApp`);
            } catch (error) {
                console.error('❌ Ошибка при инициализации отслеживания:', error);
            }
        }
        
        // Ждем полной загрузки страницы (включая header/footer)
        window.addEventListener('load', function() {
            // Небольшая задержка для гарантии загрузки всех компонентов
            setTimeout(runTracking, 500);
        });
        
        // Резервный запуск через 3 секунды на случай, если load не сработал
        setTimeout(function() {
            runTracking();
        }, 3000);
        
    } catch (error) {
        console.error('❌ Ошибка при инициализации отслеживания Яндекс.Метрики:', error);
    }
}

// Функция для добавления отслеживания к динамически созданным элементам
function addListenersToDynamicElements() {
    trackPhoneClicks();
    trackWhatsAppClicks();
    trackRequestButtons();
    trackCatalogLinks();
}

// Экспортируем функцию для использования в других скриптах
// Используем уникальное имя для избежания конфликтов с другими скриптами
window.mainPageMetricsAddListeners = addListenersToDynamicElements;

// Запускаем инициализацию
initMetricsTracking();

// Отслеживаем изменения в DOM для динамически созданных элементов
const metricsObserver = new MutationObserver(function(mutations) {
    try {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                // Проверяем, есть ли в добавленных узлах ссылки
                let hasNewLinks = false;
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1) { // Element node
                        if (node.querySelectorAll && (
                            node.querySelectorAll('a[href^="tel:"]').length > 0 ||
                            node.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp"]').length > 0
                        )) {
                            hasNewLinks = true;
                        }
                    }
                });
                
                if (hasNewLinks) {
                    // Добавляем отслеживание к новым элементам
                    setTimeout(function() {
                        try {
                            const phoneCount = trackPhoneClicks();
                            const whatsappCount = trackWhatsAppClicks();
                            if (phoneCount > 0 || whatsappCount > 0) {
                                console.log(`📊 Добавлено отслеживание к новым элементам: ${phoneCount} телефонных, ${whatsappCount} WhatsApp`);
                            }
                        } catch (error) {
                            console.error('❌ Ошибка при добавлении отслеживания к новым элементам:', error);
                        }
                    }, 100);
                }
            }
        });
    } catch (error) {
        console.error('❌ Ошибка в MutationObserver:', error);
    }
});

// Начинаем наблюдение за изменениями в body
try {
    metricsObserver.observe(document.body, {
        childList: true,
        subtree: true
    });
} catch (error) {
    console.error('❌ Ошибка при запуске MutationObserver:', error);
} 