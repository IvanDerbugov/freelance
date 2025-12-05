/**
 * Упрощенный JavaScript обработчик формы
 * 
 * Использование:
 * 1. Подключите этот файл на странице с формой
 * 2. Убедитесь, что форма имеет правильные name атрибуты:
 *    - name="name"
 *    - name="email"
 *    - name="company" (опционально)
 *    - name="content" (опционально)
 * 3. Укажите правильный action в форме или в коде ниже
 */

(function() {
    'use strict';

    // Настройки
    const FORM_ACTION = '/api/form/submit'; // Измените на ваш URL обработчика
    const FORM_SELECTOR = 'form'; // Селектор вашей формы

    /**
     * Обработчик отправки формы
     */
    function handleFormSubmit(e) {
        e.preventDefault();

        const form = e.target;
        const submitButton = form.querySelector('button[type="submit"]');
        
        // Блокируем повторную отправку
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Отправка...';
        }

        // Очищаем предыдущие ошибки
        clearErrors(form);

        // Собираем данные формы
        const formData = new FormData(form);
        
        // Добавляем скрытое поле для защиты от ботов (должно быть пустым)
        if (!formData.has('login')) {
            formData.append('login', '');
        }

        // Отправляем AJAX запрос
        fetch(FORM_ACTION, {
            method: 'POST',
            body: formData,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Успешная отправка
                showSuccess(form, data.message || 'Спасибо за заявку!');
                form.reset();
            } else {
                // Ошибки валидации
                showErrors(form, data.error);
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
            showError(form, 'Произошла ошибка. Попробуйте позже.');
        })
        .finally(() => {
            // Разблокируем кнопку
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = submitButton.getAttribute('data-original-text') || 'Отправить';
            }
        });
    }

    /**
     * Показать ошибки валидации
     */
    function showErrors(form, errors) {
        if (!errors) return;

        Object.keys(errors).forEach(fieldName => {
            const field = form.querySelector(`[name="${fieldName}"]`);
            if (field) {
                const fieldContainer = field.closest('.field') || field.parentElement;
                fieldContainer.classList.add('error');
                
                // Добавляем сообщение об ошибке
                let errorMessage = fieldContainer.querySelector('.error-message');
                if (!errorMessage) {
                    errorMessage = document.createElement('span');
                    errorMessage.className = 'error-message';
                    fieldContainer.appendChild(errorMessage);
                }
                errorMessage.textContent = errors[fieldName];
            }
        });

        // Общая ошибка
        if (errors.general) {
            showError(form, errors.general);
        }
    }

    /**
     * Показать общую ошибку
     */
    function showError(form, message) {
        let errorContainer = form.querySelector('.form-error');
        if (!errorContainer) {
            errorContainer = document.createElement('div');
            errorContainer.className = 'form-error';
            form.insertBefore(errorContainer, form.firstChild);
        }
        errorContainer.textContent = message;
        errorContainer.style.display = 'block';
        errorContainer.style.color = 'red';
        errorContainer.style.padding = '10px';
        errorContainer.style.marginBottom = '10px';
    }

    /**
     * Показать сообщение об успехе
     */
    function showSuccess(form, message) {
        let successContainer = form.querySelector('.form-success');
        if (!successContainer) {
            successContainer = document.createElement('div');
            successContainer.className = 'form-success';
            form.insertBefore(successContainer, form.firstChild);
        }
        successContainer.innerHTML = message;
        successContainer.style.display = 'block';
        successContainer.style.color = 'green';
        successContainer.style.padding = '10px';
        successContainer.style.marginBottom = '10px';
        
        // Скрываем через 5 секунд
        setTimeout(() => {
            successContainer.style.display = 'none';
        }, 5000);
    }

    /**
     * Очистить ошибки
     */
    function clearErrors(form) {
        // Убираем классы ошибок
        form.querySelectorAll('.error').forEach(el => {
            el.classList.remove('error');
        });
        
        // Удаляем сообщения об ошибках
        form.querySelectorAll('.error-message').forEach(el => {
            el.remove();
        });
        
        // Скрываем общие сообщения
        const errorContainer = form.querySelector('.form-error');
        if (errorContainer) {
            errorContainer.style.display = 'none';
        }
    }

    /**
     * Инициализация
     */
    function init() {
        const forms = document.querySelectorAll(FORM_SELECTOR);
        
        forms.forEach(form => {
            // Сохраняем оригинальный текст кнопки
            const submitButton = form.querySelector('button[type="submit"]');
            if (submitButton && !submitButton.getAttribute('data-original-text')) {
                submitButton.setAttribute('data-original-text', submitButton.textContent);
            }

            // Добавляем обработчик
            form.addEventListener('submit', handleFormSubmit);
        });
    }

    // Инициализация при загрузке DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

