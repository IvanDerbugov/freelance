// Функция для отслеживания кликов по телефонным ссылкам
function trackPhoneClicks() {
    // Находим все ссылки с телефонными номерами
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    
    // Добавляем обработчики событий для каждой телефонной ссылки
    phoneLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Получаем номер телефона из href
            const phoneNumber = this.getAttribute('href').replace('tel:', '');
            
            // Отправляем цель в Яндекс.Метрику
            if (typeof ym !== 'undefined') {
                ym(103948733, 'reachGoal', 'clickPhone', {
                    phone_number: phoneNumber,
                    page_url: window.location.href,
                    timestamp: new Date().toISOString()
                });
                
                console.log('Цель "клик по телефону" отправлена:', phoneNumber);
            } else {
                console.warn('Яндекс.Метрика не загружена');
            }
        });
    });
    
    console.log(`Найдено ${phoneLinks.length} телефонных ссылок для отслеживания`);
}

// Функция для отслеживания кликов по Telegram
function trackTelegramClicks() {
    // Находим все ссылки на Telegram
    const telegramLinks = document.querySelectorAll('a[href*="t.me"], a[href*="telegram.me"], a[href*="telegram"]');
    
    // Добавляем обработчики событий для каждой ссылки на Telegram
    telegramLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Получаем ссылку на Telegram
            const telegramUrl = this.getAttribute('href');
            
            // Отправляем цель в Яндекс.Метрику
            if (typeof ym !== 'undefined') {
                ym(103948733, 'reachGoal', 'clickTelegram', {
                    telegram_url: telegramUrl,
                    page_url: window.location.href,
                    timestamp: new Date().toISOString()
                });
                
                console.log('Цель "клик по Telegram" отправлена:', telegramUrl);
            } else {
                console.warn('Яндекс.Метрика не загружена');
            }
        });
    });
    
    console.log(`Найдено ${telegramLinks.length} ссылок на Telegram для отслеживания`);
}

// Функция для отслеживания кликов по WhatsApp
function trackWhatsAppClicks() {
    // Находим все ссылки на WhatsApp
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp.com"], a[href*="whatsapp"]');
    
    // Добавляем обработчики событий для каждой ссылки на WhatsApp
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Получаем ссылку на WhatsApp
            const whatsappUrl = this.getAttribute('href');
            
            // Отправляем цель в Яндекс.Метрику
            if (typeof ym !== 'undefined') {
                ym(103948733, 'reachGoal', 'clickWhatsApp', {
                    whatsapp_url: whatsappUrl,
                    page_url: window.location.href,
                    timestamp: new Date().toISOString()
                });
                
                console.log('Цель "клик по WhatsApp" отправлена:', whatsappUrl);
            } else {
                console.warn('Яндекс.Метрика не загружена');
            }
        });
    });
    
    console.log(`Найдено ${whatsappLinks.length} ссылок на WhatsApp для отслеживания`);
}

// Функция для отслеживания кликов по email
function trackEmailClicks() {
    // Находим все ссылки с email
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    
    // Добавляем обработчики событий для каждой email ссылки
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Получаем email из href
            const email = this.getAttribute('href').replace('mailto:', '');
            
            // Отправляем цель в Яндекс.Метрику
            if (typeof ym !== 'undefined') {
                ym(103948733, 'reachGoal', 'clickEmail', {
                    email: email,
                    page_url: window.location.href,
                    timestamp: new Date().toISOString()
                });
                
                console.log('Цель "клик по email" отправлена:', email);
            } else {
                console.warn('Яндекс.Метрика не загружена');
            }
        });
    });
    
    console.log(`Найдено ${emailLinks.length} email ссылок для отслеживания`);
}

// Функция для отслеживания кликов по кнопкам, открывающим квиз
function trackQuizClicks() {
    let quizButtonsCount = 0;
    
    // 1. Кнопки в header с data-modal="kvizModal"
    const headerQuizButtons = document.querySelectorAll('a[data-modal="kvizModal"]');
    headerQuizButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            sendQuizGoal('header', this.textContent.trim());
        });
        quizButtonsCount++;
    });
    
    // 2. Кнопки в footer с onclick="openKitchenQuiz()"
    const footerQuizButtons = document.querySelectorAll('a[onclick*="openKitchenQuiz"]');
    footerQuizButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            sendQuizGoal('footer', this.textContent.trim());
        });
        quizButtonsCount++;
    });
    
    // 3. Кнопки в карточках товаров с классом btn-calculate-cost
    const productQuizButtons = document.querySelectorAll('.btn-calculate-cost');
    productQuizButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            sendQuizGoal('product_card', this.textContent.trim());
        });
        quizButtonsCount++;
    });
    
    // 4. Кнопки с onclick="openKitchenQuiz()" (для случаев, когда onclick не заменен)
    const onclickQuizButtons = document.querySelectorAll('[onclick*="openKitchenQuiz"]');
    onclickQuizButtons.forEach(button => {
        // Проверяем, что это не footer кнопка (чтобы не дублировать)
        if (!button.closest('footer') && !button.classList.contains('btn-calculate-cost')) {
            button.addEventListener('click', function(e) {
                sendQuizGoal('other', this.textContent.trim());
            });
            quizButtonsCount++;
        }
    });
    
    console.log(`Найдено ${quizButtonsCount} кнопок для открытия квиза`);
}

// Вспомогательная функция для отправки цели квиза
function sendQuizGoal(source, buttonText) {
    const goalId = `quiz_${source}_${buttonText}`;
    
    debounceGoal(goalId, () => {
        if (typeof ym !== 'undefined') {
            // Отправляем цель в Яндекс.Метрику
            ym(103948733, 'reachGoal', 'clickKviz', {
                source: source,
                button_text: buttonText,
                page_url: window.location.href,
                timestamp: new Date().toISOString()
            });
            
            console.log(`✅ Цель "клик по кнопке квиза" отправлена:`, source, buttonText);
            console.log(`📊 Данные:`, {
                goal: 'clickKviz',
                source: source,
                button_text: buttonText,
                page_url: window.location.href
            });
            
            // Дополнительная проверка - пытаемся получить счетчик
            if (window.ym && window.ym.a) {
                console.log(`🔢 Счетчик Яндекс.Метрики активен, ID: 103948733`);
            }
        } else {
            console.error('❌ Яндекс.Метрика не загружена! Проверьте подключение скрипта');
        }
    });
}

// Функция для отслеживания кликов по кнопкам замера и сборки
function trackMeasureAssemblyClicks() {
    let measureAssemblyButtonsCount = 0;
    
    // 1. Кнопки в header с data-modal="measureModal" и "assemblyModal"
    const headerMeasureButtons = document.querySelectorAll('a[data-modal="measureModal"]');
    const headerAssemblyButtons = document.querySelectorAll('a[data-modal="assemblyModal"]');
    
    headerMeasureButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            sendMeasureAssemblyGoal('header', 'measure', this.textContent.trim());
        });
        measureAssemblyButtonsCount++;
    });
    
    headerAssemblyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            sendMeasureAssemblyGoal('header', 'assembly', this.textContent.trim());
        });
        measureAssemblyButtonsCount++;
    });
    
    // 2. Кнопки в footer с onclick="openMeasureModal()" и "openAssemblyModal()"
    const footerMeasureButtons = document.querySelectorAll('a[onclick*="openMeasureModal"]');
    const footerAssemblyButtons = document.querySelectorAll('a[onclick*="openAssemblyModal"]');
    
    footerMeasureButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            sendMeasureAssemblyGoal('footer', 'measure', this.textContent.trim());
        });
        measureAssemblyButtonsCount++;
    });
    
    footerAssemblyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            sendMeasureAssemblyGoal('footer', 'assembly', this.textContent.trim());
        });
        measureAssemblyButtonsCount++;
    });
    
    // 3. Кнопки в карточках товаров с классом btn-free-measurement
    const productMeasureButtons = document.querySelectorAll('.btn-free-measurement');
    productMeasureButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            sendMeasureAssemblyGoal('product_card', 'measure', this.textContent.trim());
        });
        measureAssemblyButtonsCount++;
    });
    
    // 4. Кнопки с onclick="openMeasureModal()" и "openAssemblyModal()" (для случаев, когда onclick не заменен)
    const onclickMeasureButtons = document.querySelectorAll('[onclick*="openMeasureModal"]');
    const onclickAssemblyButtons = document.querySelectorAll('[onclick*="openAssemblyModal"]');
    
    onclickMeasureButtons.forEach(button => {
        // Проверяем, что это не footer кнопка (чтобы не дублировать)
        if (!button.closest('footer') && !button.classList.contains('btn-free-measurement')) {
            button.addEventListener('click', function(e) {
                sendMeasureAssemblyGoal('other', 'measure', this.textContent.trim());
            });
            measureAssemblyButtonsCount++;
        }
    });
    
    onclickAssemblyButtons.forEach(button => {
        // Проверяем, что это не footer кнопка (чтобы не дублировать)
        if (!button.closest('footer')) {
            button.addEventListener('click', function(e) {
                sendMeasureAssemblyGoal('other', 'assembly', this.textContent.trim());
            });
            measureAssemblyButtonsCount++;
        }
    });
    
    console.log(`Найдено ${measureAssemblyButtonsCount} кнопок для замера и сборки`);
}

// Вспомогательная функция для отправки цели замера/сборки
function sendMeasureAssemblyGoal(source, type, buttonText) {
    if (typeof ym !== 'undefined') {
        ym(103948733, 'reachGoal', 'clickZamerOrSborka', {
            source: source,
            type: type, // 'measure' или 'assembly'
            button_text: buttonText,
            page_url: window.location.href,
            timestamp: new Date().toISOString()
        });
        
        console.log(`Цель "клик по кнопке ${type === 'measure' ? 'замера' : 'сборки'}" отправлена:`, source, buttonText);
    } else {
        console.warn('Яндекс.Метрика не загружена');
    }
}

// Функция для отслеживания кликов по кнопкам в карточках товаров
function trackProductCardClicks() {
    let productCardButtonsCount = 0;
    
    // 1. Кнопки "Помощь консультанта" в карточках товаров
    const consultantButtons = document.querySelectorAll('.btn-consultant-main');
    consultantButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            sendProductCardGoal('consultant', this.textContent.trim());
        });
        productCardButtonsCount++;
    });
    
    // 2. Кнопки "Купить в 1 клик" в карточках товаров
    const buyOneClickButtons = document.querySelectorAll('.btn-buy-one-click');
    buyOneClickButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            sendProductCardGoal('buy_one_click', this.textContent.trim());
        });
        productCardButtonsCount++;
    });
    
    console.log(`Найдено ${productCardButtonsCount} кнопок в карточках товаров`);
}

// Вспомогательная функция для отправки цели карточки товара
function sendProductCardGoal(type, buttonText) {
    if (typeof ym !== 'undefined') {
        ym(103948733, 'reachGoal', 'clickCallback', {
            type: type, // 'consultant' или 'buy_one_click'
            button_text: buttonText,
            page_url: window.location.href,
            timestamp: new Date().toISOString()
        });
        
        console.log(`Цель "клик по кнопке ${type === 'consultant' ? 'консультанта' : 'покупки'}" отправлена:`, buttonText);
    } else {
        console.warn('Яндекс.Метрика не загружена');
    }
}

// Функция для отслеживания отправки форм
function trackFormSubmissions() {
    let formsCount = 0;
    
    // 1. Форма "Замер" (measureForm)
    const measureForm = document.getElementById('measureForm');
    if (measureForm) {
        measureForm.addEventListener('submit', function(e) {
            sendFormGoal('measure', 'Заявка на замер кухни');
        });
        formsCount++;
    }
    
    // 2. Форма "Сборка" (assemblyForm)
    const assemblyForm = document.getElementById('assemblyForm');
    if (assemblyForm) {
        assemblyForm.addEventListener('submit', function(e) {
            sendFormGoal('assembly', 'Заявка на сборку кухни');
        });
        formsCount++;
    }
    
    // 3. Форма "Обратный звонок" (callbackForm)
    const callbackForm = document.getElementById('callbackForm');
    if (callbackForm) {
        callbackForm.addEventListener('submit', function(e) {
            sendFormGoal('callback', 'Заявка на обратный звонок');
        });
        formsCount++;
    }
    
    // 4. Форма квиза (giftForm) - отдельная цель
    const giftForm = document.getElementById('giftForm');
    if (giftForm) {
        giftForm.addEventListener('submit', function(e) {
            sendQuizFormGoal('quiz', 'Результаты квиза дизайн-проекта кухни');
        });
        formsCount++;
    }
    
    // 5. Ищем все остальные формы на странице (кроме уже обработанных)
    const allForms = document.querySelectorAll('form');
    allForms.forEach(form => {
        const formId = form.id;
        // Пропускаем уже обработанные формы
        if (!['measureForm', 'assemblyForm', 'callbackForm', 'giftForm'].includes(formId)) {
            form.addEventListener('submit', function(e) {
                sendFormGoal('other', `Форма ${formId || 'без ID'}`);
            });
            formsCount++;
        }
    });
    
    console.log(`Найдено ${formsCount} форм для отслеживания`);
}

// Функция для отслеживания форм при открытии модальных окон
function trackModalForms() {
    // Отслеживаем открытие модальных окон
    const modalTriggers = document.querySelectorAll('[data-modal]');
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            const modalId = this.getAttribute('data-modal');
            // Даем время модальному окну открыться
            setTimeout(() => {
                trackFormsInModal(modalId);
            }, 100);
        });
    });
    
    // Также отслеживаем кнопки с onclick функциями
    const onclickTriggers = document.querySelectorAll('[onclick*="openKitchenQuiz"], [onclick*="openMeasureModal"], [onclick*="openAssemblyModal"]');
    onclickTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            // Даем время модальному окну открыться
            setTimeout(() => {
                trackAllForms();
            }, 100);
        });
    });
}

// Функция для отслеживания форм в конкретном модальном окне
function trackFormsInModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        const forms = modal.querySelectorAll('form');
        forms.forEach(form => {
            if (!form.hasAttribute('data-metrika-tracked')) {
                form.setAttribute('data-metrika-tracked', 'true');
                form.addEventListener('submit', function(e) {
                    const formType = getFormType(form, modalId);
                    if (formType === 'quiz') {
                        sendQuizFormGoal('quiz', `Форма квиза в ${modalId}`);
                    } else {
                        sendFormGoal(formType, `Форма ${formType} в ${modalId}`);
                    }
                });
                console.log(`Добавлено отслеживание для формы в модальном окне ${modalId}`);
            }
        });
    }
}

// Функция для определения типа формы
function getFormType(form, modalId) {
    if (modalId === 'kvizModal' || form.id === 'giftForm') {
        return 'quiz';
    } else if (modalId === 'measureModal' || form.id === 'measureForm') {
        return 'measure';
    } else if (modalId === 'assemblyModal' || form.id === 'assemblyForm') {
        return 'assembly';
    } else if (modalId === 'callbackModal' || form.id === 'callbackForm') {
        return 'callback';
    } else {
        return 'other';
    }
}

// Функция для повторного поиска всех форм (для случаев, когда модальные окна открываются динамически)
function trackAllForms() {
    const allForms = document.querySelectorAll('form:not([data-metrika-tracked])');
    allForms.forEach(form => {
        form.setAttribute('data-metrika-tracked', 'true');
        const formType = getFormType(form, '');
        if (formType === 'quiz') {
            form.addEventListener('submit', function(e) {
                sendQuizFormGoal('quiz', `Форма квиза ${form.id || 'без ID'}`);
            });
        } else {
            form.addEventListener('submit', function(e) {
                sendFormGoal(formType, `Форма ${formType} ${form.id || 'без ID'}`);
            });
        }
        console.log(`Добавлено отслеживание для скрытой формы: ${form.id || 'без ID'}`);
    });
}

// Глобальные переменные для дебаунсинга
const goalDebounceTimers = {};
const GOAL_DEBOUNCE_DELAY = 1000; // 1 секунда между одинаковыми целями

// Функция для дебаунсинга целей
function debounceGoal(goalId, callback) {
    if (goalDebounceTimers[goalId]) {
        clearTimeout(goalDebounceTimers[goalId]);
    }
    
    goalDebounceTimers[goalId] = setTimeout(() => {
        callback();
        delete goalDebounceTimers[goalId];
    }, GOAL_DEBOUNCE_DELAY);
}

// Вспомогательная функция для отправки цели обычной формы
function sendFormGoal(type, formName) {
    const goalId = `form_${type}_${formName}`;
    
    debounceGoal(goalId, () => {
        if (typeof ym !== 'undefined') {
            // Отправляем цель в Яндекс.Метрику
            ym(103948733, 'reachGoal', 'submittingSimpleForm', {
                form_type: type,
                form_name: formName,
                page_url: window.location.href,
                timestamp: new Date().toISOString()
            });
            
            console.log(`✅ Цель "отправка формы" отправлена:`, type, formName);
            console.log(`📊 Данные:`, {
                goal: 'submittingSimpleForm',
                form_type: type,
                form_name: formName,
                page_url: window.location.href
            });
            
            // Дополнительная проверка - пытаемся получить счетчик
            if (window.ym && window.ym.a) {
                console.log(`🔢 Счетчик Яндекс.Метрики активен, ID: 103948733`);
            }
        } else {
            console.error('❌ Яндекс.Метрика не загружена! Проверьте подключение скрипта');
        }
    });
}

// Вспомогательная функция для отправки цели формы квиза
function sendQuizFormGoal(type, formName) {
    if (typeof ym !== 'undefined') {
        ym(103948733, 'reachGoal', 'submittingQuizForm', {
            form_type: type,
            form_name: formName,
            page_url: window.location.href,
            timestamp: new Date().toISOString()
        });
        
        console.log(`Цель "отправка формы квиза" отправлена:`, type, formName);
    } else {
        console.warn('Яндекс.Метрика не загружена');
    }
}

// Запускаем отслеживание при загрузке DOM
document.addEventListener('DOMContentLoaded', function() {
    trackPhoneClicks();
    trackTelegramClicks();
    trackWhatsAppClicks();
    trackEmailClicks();
    trackQuizClicks();
    trackMeasureAssemblyClicks();
    trackProductCardClicks();
    trackFormSubmissions();
    trackModalForms();
});

// Также запускаем для динамически загруженного контента
if (typeof includeHTML === 'function') {
    // Перехватываем оригинальную функцию includeHTML
    const originalIncludeHTML = includeHTML;
    includeHTML = function(selector, url, callback) {
        originalIncludeHTML(selector, url, function() {
            // После загрузки контента запускаем отслеживание
            trackPhoneClicks();
            trackTelegramClicks();
            trackWhatsAppClicks();
            trackEmailClicks();
            trackQuizClicks();
            trackMeasureAssemblyClicks();
            trackProductCardClicks();
            trackFormSubmissions();
            trackModalForms();
            if (callback) callback();
        });
    };
}

// Функция для настройки Яндекс.Метрики (оптимизация)
function configureYandexMetrika() {
    if (typeof ym !== 'undefined') {
        try {
            // Настройка параметров для снижения нагрузки
            ym(103948733, 'params', {
                // Увеличиваем интервал отправки данных
                'hit-callback': function() {
                    console.log('📊 Данные отправлены в Яндекс.Метрику');
                }
            });
            
            // Отключаем Webvisor для снижения нагрузки (если не нужен)
            // ym(103948733, 'webvisor', false);
            
            console.log('⚙️ Настройки Яндекс.Метрики применены');
        } catch (error) {
            console.warn('⚠️ Не удалось применить настройки:', error);
        }
    }
}

// Функция для тестирования Яндекс.Метрики
function testYandexMetrika() {
    console.log('🧪 Тестирование Яндекс.Метрики...');
    
    if (typeof ym !== 'undefined') {
        console.log('✅ ym() функция доступна');
        
        // Проверяем счетчик
        if (window.ym && window.ym.a) {
            console.log('✅ Счетчик активен');
            console.log('📊 Информация о счетчике:', window.ym.a);
        } else {
            console.log('⚠️ Счетчик не активен');
        }
        
        // Тестовая цель
        try {
            ym(103948733, 'reachGoal', 'test_goal', {
                test: true,
                timestamp: new Date().toISOString()
            });
            console.log('✅ Тестовая цель отправлена успешно');
        } catch (error) {
            console.error('❌ Ошибка при отправке тестовой цели:', error);
        }
        
    } else {
        console.error('❌ ym() функция недоступна');
        console.log('🔍 Проверьте:');
        console.log('1. Подключен ли скрипт Яндекс.Метрики');
        console.log('2. Правильный ли ID счетчика (103948733)');
        console.log('3. Нет ли блокировщиков рекламы');
    }
}

// Запускаем тест при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Ждем загрузки Яндекс.Метрики
    setTimeout(() => {
        configureYandexMetrika();
        testYandexMetrika();
    }, 2000);
});
