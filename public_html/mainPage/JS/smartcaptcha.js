// SmartCAPTCHA Integration
// Отечественная альтернатива reCAPTCHA v3 от Яндекса

// Глобальные переменные
let smartCaptchaClientKey = 'YOUR_CLIENT_KEY_HERE'; // Замените на ваш Client Key
let smartCaptchaLoaded = false;

// Функция загрузки SmartCAPTCHA
function loadSmartCaptcha() {
    if (smartCaptchaLoaded) return Promise.resolve();
    
    return new Promise((resolve, reject) => {
        // Проверяем, не загружен ли уже скрипт
        if (window.smartCaptcha) {
            smartCaptchaLoaded = true;
            resolve();
            return;
        }

        // Создаем скрипт для загрузки SmartCAPTCHA
        const script = document.createElement('script');
        script.src = 'https://smartcaptcha.yandexcloud.net/captcha.js';
        script.async = true;
        script.defer = true;
        
        script.onload = () => {
            smartCaptchaLoaded = true;
            resolve();
        };
        
        script.onerror = () => {
            reject(new Error('Failed to load SmartCAPTCHA'));
        };
        
        document.head.appendChild(script);
    });
}

// Функция получения токена SmartCAPTCHA
async function getSmartCaptchaToken() {
    try {
        await loadSmartCaptcha();
        
        return new Promise((resolve, reject) => {
            // SmartCAPTCHA автоматически обрабатывает токен
            // Просто возвращаем успех
            resolve('smartcaptcha_token');
        });
    } catch (error) {
        console.error('SmartCAPTCHA error:', error);
        throw error;
    }
}

// Функция для добавления SmartCAPTCHA в форму
function addSmartCaptchaToForm(formElement, action = 'submit') {
    // Создаем контейнер для SmartCAPTCHA
    const captchaContainer = document.createElement('div');
    captchaContainer.className = 'smartcaptcha-container';
    captchaContainer.style.cssText = 'margin: 15px 0;';
    
    // Добавляем контейнер после формы
    formElement.parentNode.insertBefore(captchaContainer, formElement.nextSibling);
    
    // Инициализируем SmartCAPTCHA
    loadSmartCaptcha().then(() => {
        if (window.smartCaptcha) {
            smartCaptcha.render(captchaContainer, {
                sitekey: smartCaptchaClientKey,
                callback: function(token) {
                    // Токен получен, можно отправлять форму
                    console.log('SmartCAPTCHA token received:', token);
                },
                invisible: true, // Невидимая капча
                hideShield: true // Скрываем щит
            });
        }
    });
    
    // Перехватываем отправку формы
    formElement.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitButton = formElement.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        try {
            // Показываем индикатор загрузки
            submitButton.disabled = true;
            submitButton.textContent = 'Проверка...';
            
            // Проверяем, что SmartCAPTCHA прошла
            const captchaInput = document.querySelector('input[name="smart-token"]');
            if (!captchaInput || !captchaInput.value) {
                throw new Error('SmartCAPTCHA не пройдена');
            }
            
            // Продолжаем отправку формы
            submitButton.textContent = 'Отправка...';
            
            // Если форма использует web3forms, отправляем через fetch
            if (formElement.action.includes('web3forms.com')) {
                const formData = new FormData(formElement);
                
                const response = await fetch(formElement.action, {
                    method: 'POST',
                    body: formData
                });
                
                const result = await response.json();
                
                if (result.success) {
                    // Успешная отправка
                    showSuccessMessage(formElement, 'Заявка отправлена!');
                } else {
                    // Ошибка отправки
                    showErrorMessage(formElement, 'Ошибка отправки!');
                }
            } else {
                // Для других обработчиков форм
                formElement.submit();
            }
            
        } catch (error) {
            console.error('SmartCAPTCHA error:', error);
            showErrorMessage(formElement, 'Ошибка проверки!');
        } finally {
            // Восстанавливаем кнопку
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }
    });
}

// Функция показа сообщения об успехе
function showSuccessMessage(formElement, message) {
    // Ищем существующий элемент для сообщений
    let messageElement = formElement.parentNode.querySelector('.form-message');
    
    if (!messageElement) {
        messageElement = document.createElement('div');
        messageElement.className = 'form-message';
        messageElement.style.cssText = 'text-align: center; font-size: 18px; font-weight: 600; color: #4CAF50; margin-top: 15px;';
        formElement.parentNode.appendChild(messageElement);
    }
    
    messageElement.textContent = message;
    messageElement.style.color = '#4CAF50';
    messageElement.style.display = 'block';
    
    // Скрываем сообщение через 3 секунды
    setTimeout(() => {
        messageElement.style.display = 'none';
    }, 3000);
}

// Функция показа сообщения об ошибке
function showErrorMessage(formElement, message) {
    // Ищем существующий элемент для сообщений
    let messageElement = formElement.parentNode.querySelector('.form-message');
    
    if (!messageElement) {
        messageElement = document.createElement('div');
        messageElement.className = 'form-message';
        messageElement.style.cssText = 'text-align: center; font-size: 18px; font-weight: 600; color: #f44336; margin-top: 15px;';
        formElement.parentNode.appendChild(messageElement);
    }
    
    messageElement.textContent = message;
    messageElement.style.color = '#f44336';
    messageElement.style.display = 'block';
    
    // Скрываем сообщение через 5 секунд
    setTimeout(() => {
        messageElement.style.display = 'none';
    }, 5000);
}

// Функция инициализации SmartCAPTCHA для всех форм на странице
function initSmartCaptcha() {
    // Находим все формы
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        // Определяем действие на основе ID формы или других атрибутов
        let action = 'submit';
        
        if (form.id === 'formaMainPage') {
            action = 'main_page_form';
        } else if (form.id === 'formaGusenichnyexkavator') {
            action = 'gusenichnyy_ekskavator_form';
        } else if (form.id === 'formaPogruzchik') {
            action = 'ekskavator_pogruzchik_form';
        } else if (form.id === 'formaAvtokran') {
            action = 'avtokran_form';
        } else if (form.id === 'formaAvtovyshka') {
            action = 'avtovyshka_form';
        } else if (form.id === 'formaDlinnomer') {
            action = 'dlinnomer_form';
        } else if (form.id === 'formaManipuliator') {
            action = 'manipuliator_form';
        } else if (form.id === 'formaKolesnyyEkskavator') {
            action = 'kolesnyy_ekskavator_form';
        }
        
        addSmartCaptchaToForm(form, action);
    });
}

// Автоматическая инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initSmartCaptcha();
});

// Экспорт функций для использования в других скриптах
window.SmartCaptcha = {
    loadSmartCaptcha,
    getSmartCaptchaToken,
    addSmartCaptchaToForm,
    initSmartCaptcha,
    showSuccessMessage,
    showErrorMessage
};
