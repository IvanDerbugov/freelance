// reCAPTCHA v3 Integration
// Этот файл содержит функции для работы с reCAPTCHA v3

// Глобальные переменные
let recaptchaSiteKey = '6LcXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'; // Замените на ваш ключ
let recaptchaLoaded = false;

// Функция загрузки reCAPTCHA v3
function loadRecaptcha() {
    if (recaptchaLoaded) return Promise.resolve();
    
    return new Promise((resolve, reject) => {
        // Проверяем, не загружен ли уже скрипт
        if (window.grecaptcha && window.grecaptcha.ready) {
            recaptchaLoaded = true;
            resolve();
            return;
        }

        // Создаем скрипт для загрузки reCAPTCHA
        const script = document.createElement('script');
        script.src = `https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`;
        script.async = true;
        script.defer = true;
        
        script.onload = () => {
            recaptchaLoaded = true;
            resolve();
        };
        
        script.onerror = () => {
            reject(new Error('Failed to load reCAPTCHA'));
        };
        
        document.head.appendChild(script);
    });
}

// Функция получения токена reCAPTCHA
async function getRecaptchaToken(action = 'submit') {
    try {
        await loadRecaptcha();
        
        return new Promise((resolve, reject) => {
            grecaptcha.ready(() => {
                grecaptcha.execute(recaptchaSiteKey, { action: action })
                    .then(token => {
                        resolve(token);
                    })
                    .catch(error => {
                        console.error('reCAPTCHA error:', error);
                        reject(error);
                    });
            });
        });
    } catch (error) {
        console.error('Error loading reCAPTCHA:', error);
        throw error;
    }
}

// Функция для добавления reCAPTCHA в форму
function addRecaptchaToForm(formElement, action = 'submit') {
    // Добавляем скрытое поле для токена
    const tokenField = document.createElement('input');
    tokenField.type = 'hidden';
    tokenField.name = 'g-recaptcha-response';
    tokenField.id = 'g-recaptcha-response';
    formElement.appendChild(tokenField);
    
    // Перехватываем отправку формы
    formElement.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitButton = formElement.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        try {
            // Показываем индикатор загрузки
            submitButton.disabled = true;
            submitButton.textContent = 'Проверка...';
            
            // Получаем токен reCAPTCHA
            const token = await getRecaptchaToken(action);
            
            // Устанавливаем токен в скрытое поле
            tokenField.value = token;
            
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
            console.error('reCAPTCHA error:', error);
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

// Функция инициализации reCAPTCHA для всех форм на странице
function initRecaptcha() {
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
        
        addRecaptchaToForm(form, action);
    });
}

// Автоматическая инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initRecaptcha();
});

// Экспорт функций для использования в других скриптах
window.RecaptchaV3 = {
    loadRecaptcha,
    getRecaptchaToken,
    addRecaptchaToForm,
    initRecaptcha,
    showSuccessMessage,
    showErrorMessage
}; 