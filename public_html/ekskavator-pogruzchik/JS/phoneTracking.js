// phoneTracking.js - Отслеживание кликов по телефонным ссылкам и WhatsApp

document.addEventListener('DOMContentLoaded', function () {
    
    // Функция для отправки события в Яндекс.Метрику с проверками
    function sendYandexMetricGoal(goalName, description) {
        try {
            if (typeof ym === 'function') {
                ym(103307535, 'reachGoal', goalName);
                console.log(`Цель "${description}" отправлена в Яндекс Метрику (${goalName})`);
                return true;
            } else {
                console.warn('Яндекс.Метрика не загружена');
                return false;
            }
        } catch (error) {
            console.error('Ошибка при отправке цели в Яндекс.Метрику:', error);
            return false;
        }
    }

    // Функция для обработки клика по ссылке
    function handleLinkClick(e, goalName, description) {
        // Предотвращаем стандартное поведение на короткое время
        e.preventDefault();
        
        // Отправляем событие в Яндекс.Метрику
        const success = sendYandexMetricGoal(goalName, description);
        
        // Небольшая задержка для корректной отправки события
        setTimeout(function() {
            // Восстанавливаем переход по ссылке
            window.location.href = e.target.href || e.target.closest('a').href;
        }, success ? 150 : 50);
    }

    // Функция для добавления обработчиков к ссылкам
    function addEventListeners() {
        // Находим все ссылки с телефоном
        const phoneLinks = document.querySelectorAll('a[href^="tel:+79011856562"]');
        
        // Добавляем обработчик для каждой ссылки
        phoneLinks.forEach(function(link) {
            // Проверяем, не добавлен ли уже обработчик
            if (!link.hasAttribute('data-phone-tracked')) {
                link.setAttribute('data-phone-tracked', 'true');
                link.addEventListener('click', function(e) {
                    handleLinkClick(e, 'telPogruzchik', 'Клик по телефону');
                });
            }
        });

        // Находим все ссылки WhatsApp
        const whatsappLinks = document.querySelectorAll('a[href^="https://wa.me/79011856562"]');
        
        // Добавляем обработчик для каждой WhatsApp ссылки
        whatsappLinks.forEach(function(link) {
            // Проверяем, не добавлен ли уже обработчик
            if (!link.hasAttribute('data-whatsapp-tracked')) {
                link.setAttribute('data-whatsapp-tracked', 'true');
                link.addEventListener('click', function(e) {
                    handleLinkClick(e, 'WhatsAppPogruzchik', 'Клик по WhatsApp');
                });
            }
        });

        // Логируем количество найденных ссылок только один раз
        if (!window.phoneTrackingInitialized) {
            console.log(`📞 Отслеживание ссылок инициализировано: ${phoneLinks.length} телефонных, ${whatsappLinks.length} WhatsApp`);
            window.phoneTrackingInitialized = true;
        }
    }

    // Делаем функцию глобальной для вызова из других скриптов
    window.phoneTrackingAddListeners = addEventListeners;

    // Ждем полной загрузки страницы (включая header/footer)
    window.addEventListener('load', function() {
        // Небольшая задержка для гарантии загрузки всех компонентов
        setTimeout(addEventListeners, 500);
    });

    // Резервный запуск через 3 секунды на случай, если load не сработал
    setTimeout(function() {
        if (!window.phoneTrackingInitialized) {
            addEventListeners();
        }
    }, 3000);
}); 