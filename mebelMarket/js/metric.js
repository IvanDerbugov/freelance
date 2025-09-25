// ========================================
// СКРИПТ ОТСЛЕЖИВАНИЯ ДЛЯ ЯНДЕКС.МЕТРИКИ
// ========================================

// ID счетчика Яндекс.Метрики
const METRIKA_ID = 103948733;

// Флаг инициализации
let metricInitialized = false;

// ========================================
// ОСНОВНЫЕ ФУНКЦИИ ОТСЛЕЖИВАНИЯ
// ========================================

// Отслеживание кликов по Telegram
function trackTelegramClicks() {
    const telegramLinks = document.querySelectorAll('a[href*="t.me"], a[href*="telegram.me"], a[href*="telegram"], a[href*="tg://"]');
    
    telegramLinks.forEach(link => {
        if (!link.hasAttribute('data-telegram-tracked')) {
            link.setAttribute('data-telegram-tracked', 'true');
            
            // Проверяем, есть ли onclick атрибут
            const onclickValue = link.getAttribute('onclick');
            if (onclickValue && onclickValue.includes('window.location')) {
                // Обрабатываем onclick атрибуты
                const urlMatch = onclickValue.match(/window\.location='([^']+)'/);
                if (urlMatch) {
                    link.addEventListener('click', function(e) {
                        console.log('🔥 КЛИК ПО TELEGRAM (onclick)!', this);
                        
                        // Отправляем цель в метрику
                        sendGoal('clickTelegram', {
                            telegram_url: urlMatch[1],
                            page_url: window.location.href
                        });
                        
                        // Открываем в новом окне
                        e.preventDefault();
                        window.open(urlMatch[1], '_blank');
                    });
                }
            } else {
                // Обычная обработка для ссылок без onclick
                link.addEventListener('click', function(e) {
                    console.log('🔥 КЛИК ПО TELEGRAM!', this);
                    
                    let telegramUrl = this.getAttribute('href');
                    if (telegramUrl.startsWith('tg://')) {
                        telegramUrl = 'https://t.me/silaperemenmos';
                    }
                    
                    sendGoal('clickTelegram', {
                        telegram_url: telegramUrl,
                        page_url: window.location.href
                    });
                    
                    // Если есть target="_blank", открываем в новом окне
                    if (this.getAttribute('target') === '_blank') {
                        e.preventDefault();
                        window.open(telegramUrl, '_blank');
                    }
                });
            }
        }
    });
    
    console.log(`📊 Найдено ${telegramLinks.length} ссылок на Telegram`);
}

// Отслеживание кликов по WhatsApp
function trackWhatsAppClicks() {
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp.com"], a[href*="whatsapp"]');
    
    whatsappLinks.forEach(link => {
        if (!link.hasAttribute('data-whatsapp-tracked')) {
            link.setAttribute('data-whatsapp-tracked', 'true');
            
            // Проверяем, есть ли onclick атрибут
            const onclickValue = link.getAttribute('onclick');
            if (onclickValue && onclickValue.includes('window.location')) {
                // Обрабатываем onclick атрибуты
                const urlMatch = onclickValue.match(/window\.location='([^']+)'/);
                if (urlMatch) {
                    link.addEventListener('click', function(e) {
                        console.log('🔥 КЛИК ПО WHATSAPP (onclick)!', this);
                        
                        // Отправляем цель в метрику
                        sendGoal('clickWhatsApp', {
                            whatsapp_url: urlMatch[1],
                            page_url: window.location.href
                        });
                        
                        // Открываем в новом окне
                        e.preventDefault();
                        window.open(urlMatch[1], '_blank');
                    });
                }
            } else {
                // Обычная обработка для ссылок без onclick
                link.addEventListener('click', function(e) {
                    console.log('🔥 КЛИК ПО WHATSAPP!', this);
                    
                    const whatsappUrl = this.getAttribute('href');
                    
                    sendGoal('clickWhatsApp', {
                        whatsapp_url: whatsappUrl,
                        page_url: window.location.href
                    });
                    
                    // Если есть target="_blank", открываем в новом окне
                    if (this.getAttribute('target') === '_blank') {
                        e.preventDefault();
                        window.open(whatsappUrl, '_blank');
                    }
                });
            }
        }
    });
    
    console.log(`📊 Найдено ${whatsappLinks.length} ссылок на WhatsApp`);
}

// Отслеживание кликов по телефону
function trackPhoneClicks() {
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    
    phoneLinks.forEach(link => {
        if (!link.hasAttribute('data-phone-tracked')) {
            link.setAttribute('data-phone-tracked', 'true');
            
            // Проверяем, есть ли onclick атрибут
            const onclickValue = link.getAttribute('onclick');
            if (onclickValue && onclickValue.includes('window.location')) {
                // Обрабатываем onclick атрибуты
                const urlMatch = onclickValue.match(/window\.location='([^']+)'/);
                if (urlMatch) {
                    link.addEventListener('click', function(e) {
                        console.log('🔥 КЛИК ПО ТЕЛЕФОНУ (onclick)!', this);
                        
                        sendGoal('clickPhone', {
                            phone_number: urlMatch[1].replace('tel:', ''),
                            page_url: window.location.href
                        });
                    });
                }
            } else {
                // Обычная обработка для ссылок без onclick
                link.addEventListener('click', function(e) {
                    console.log('🔥 КЛИК ПО ТЕЛЕФОНУ!', this);
                    
                    const phoneNumber = this.getAttribute('href').replace('tel:', '');
                    
                    sendGoal('clickPhone', {
                        phone_number: phoneNumber,
                        page_url: window.location.href
                    });
                });
            }
        }
    });
    
    console.log(`📊 Найдено ${phoneLinks.length} телефонных ссылок`);
}

// Отслеживание кликов по email
function trackEmailClicks() {
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    
    emailLinks.forEach(link => {
        if (!link.hasAttribute('data-email-tracked')) {
            link.setAttribute('data-email-tracked', 'true');
            
            link.addEventListener('click', function(e) {
                console.log('🔥 КЛИК ПО EMAIL!', this);
                
                const email = this.getAttribute('href').replace('mailto:', '');
                
                sendGoal('clickEmail', {
                    email: email,
                    page_url: window.location.href
                });
            });
        }
    });
    
    console.log(`📊 Найдено ${emailLinks.length} email ссылок`);
}

// Отслеживание отправки форм (кроме квиза)
function trackFormSubmissions() {
    const forms = document.querySelectorAll('form:not(#giftForm)');
    
    forms.forEach(form => {
        if (!form.hasAttribute('data-form-tracked')) {
            form.setAttribute('data-form-tracked', 'true');
            
            form.addEventListener('submit', function(e) {
                console.log('🔥 ОТПРАВКА ФОРМЫ!', this);
                
                const formId = this.id || 'unknown';
                const formType = getFormType(this);
                
                sendGoal('submittingSimpleForm', {
                    form_id: formId,
                    form_type: formType,
                    page_url: window.location.href
                });
            });
        }
    });
    
    console.log(`📊 Найдено ${forms.length} форм для отслеживания`);
}

// Отслеживание отправки формы квиза
function trackQuizFormSubmissions() {
    const quizForms = document.querySelectorAll('#giftForm, form[data-quiz="true"]');
    
    quizForms.forEach(form => {
        if (!form.hasAttribute('data-quiz-tracked')) {
            form.setAttribute('data-quiz-tracked', 'true');
            
            form.addEventListener('submit', function(e) {
                console.log('🔥 ОТПРАВКА ФОРМЫ КВИЗА!', this);
                
                const formId = this.id || 'quiz_form';
                
                sendGoal('submittingQuizForm', {
                    form_id: formId,
                    page_url: window.location.href
                });
            });
        }
    });
    
    console.log(`📊 Найдено ${quizForms.length} форм квиза`);
}

// ========================================
// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// ========================================

// Определение типа формы
function getFormType(form) {
    const formId = form.id.toLowerCase();
    const formClass = form.className.toLowerCase();
    
    if (formId.includes('measure') || formClass.includes('measure')) {
        return 'measure';
    } else if (formId.includes('assembly') || formClass.includes('assembly')) {
        return 'assembly';
    } else if (formId.includes('callback') || formClass.includes('callback')) {
        return 'callback';
    } else if (formId.includes('quiz') || formClass.includes('quiz')) {
        return 'quiz';
    } else {
        return 'other';
    }
}

// Отправка цели в Яндекс.Метрику
function sendGoal(goalName, goalData = {}) {
    try {
        if (typeof ym === 'function') {
            ym(METRIKA_ID, 'reachGoal', goalName, goalData);
            console.log(`✅ Цель "${goalName}" отправлена:`, goalData);
            return true;
        } else {
            console.warn(`⚠️ Яндекс.Метрика не загружена, цель "${goalName}" не отправлена`);
            return false;
        }
    } catch (error) {
        console.error(`❌ Ошибка при отправке цели "${goalName}":`, error);
        return false;
    }
}

// Проверка доступности Яндекс.Метрики
function checkMetrika() {
    console.log('🔍 Проверка Яндекс.Метрики...');
    console.log('ym функция:', typeof ym);
    console.log('ym.a:', window.ym && window.ym.a ? 'доступен' : 'недоступен');
    
    if (typeof ym === 'function') {
        console.log('✅ Яндекс.Метрика загружена');
        return true;
    } else {
        console.log('❌ Яндекс.Метрика не загружена');
        return false;
    }
}

// Инициализация отслеживания
function initTracking() {
    if (metricInitialized) {
        console.log('⚠️ Отслеживание уже инициализировано');
        return;
    }
    
    console.log('🚀 Инициализация отслеживания...');
    
    // Проверяем доступность метрики
    if (!checkMetrika()) {
        console.log('⏳ Ждем загрузки Яндекс.Метрики...');
        setTimeout(initTracking, 1000);
        return;
    }
    
    // Запускаем отслеживание
    trackTelegramClicks();
    trackWhatsAppClicks();
    trackPhoneClicks();
    trackEmailClicks();
    trackFormSubmissions();
    trackQuizFormSubmissions();
    
    metricInitialized = true;
    console.log('✅ Отслеживание инициализировано');
}

// ========================================
// ЗАПУСК ОТСЛЕЖИВАНИЯ
// ========================================

// Запуск при загрузке DOM
document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 DOM загружен');
    
    // Даем время для загрузки динамического контента
    setTimeout(() => {
        initTracking();
    }, 1000);
});

// Запуск для динамически загруженного контента
if (typeof includeHTML === 'function') {
    const originalIncludeHTML = includeHTML;
    includeHTML = function(selector, url, callback) {
        originalIncludeHTML(selector, url, function() {
            // Перезапускаем отслеживание для нового контента
            if (!metricInitialized) {
                initTracking();
            } else {
                // Обновляем отслеживание для новых элементов
                trackTelegramClicks();
                trackWhatsAppClicks();
                trackPhoneClicks();
                trackEmailClicks();
                trackFormSubmissions();
                trackQuizFormSubmissions();
                console.log('🔄 Отслеживание обновлено для динамического контента');
            }
            if (callback) callback();
        });
    };
}

// ========================================
// ТЕСТИРОВАНИЕ
// ========================================

// Функция для тестирования отправки целей
function testMetrika() {
    console.log('🧪 Тестирование отправки целей...');
    
    if (typeof ym === 'function') {
        // Тестовая цель
        sendGoal('test_goal', {
            test: true,
            timestamp: new Date().toISOString()
        });
        console.log('✅ Тестовая цель отправлена');
    } else {
        console.log('❌ Яндекс.Метрика недоступна для тестирования');
    }
}

// Запуск теста через 3 секунды после загрузки
setTimeout(testMetrika, 3000);

console.log('📊 Скрипт отслеживания загружен');
