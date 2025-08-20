// Управление модальными окнами
function initializeModals() {
    console.log('Инициализация модальных окон...');
    
    // Получаем все элементы модальных окон
    const modals = document.querySelectorAll('.modal');
    const modalTriggers = document.querySelectorAll('.modal-trigger');
    const closeButtons = document.querySelectorAll('.close');
    
    console.log('Найдено модальных окон:', modals.length);
    console.log('Найдено триггеров:', modalTriggers.length);
    console.log('Найдено кнопок закрытия:', closeButtons.length);
    
    // Функция для открытия модального окна
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'block';
            // Небольшая задержка для плавной анимации
            setTimeout(() => {
                modal.classList.add('show');
            }, 10);
            
            // Блокируем прокрутку страницы
            document.body.style.overflow = 'hidden';
        }
    }
    
    // Функция для закрытия модального окна
    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('show');
            // Ждем окончания анимации и скрываем
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
            
            // Восстанавливаем прокрутку страницы
            document.body.style.overflow = '';
        }
    }
    
    // Обработчики для открытия модальных окон
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            const modalId = this.getAttribute('data-modal');
            openModal(modalId);
        });
    });
    
    // Обработчики для закрытия модальных окон
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            closeModal(modalId);
        });
    });
    
    // Закрытие по клику вне модального окна
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                const modalId = this.id;
                closeModal(modalId);
            }
        });
    });
    
    // Закрытие по нажатию клавиши Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal.show');
            if (openModal) {
                closeModal(openModal.id);
            }
        }
    });
    
    // Обработчики для форм
    const forms = document.querySelectorAll('.modal-form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Получаем данные формы
            const formData = new FormData(this);
            const formObject = {};
            
            for (let [key, value] of formData.entries()) {
                formObject[key] = value;
            }
            
            // Здесь будет обработка отправки формы
            console.log('Данные формы:', formObject);
            
            // Показываем сообщение об успешной отправке
            showSuccessMessage(this);
        });
    });
    
    // Функция для показа сообщения об успешной отправке
    function showSuccessMessage(form) {
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        // Меняем текст кнопки
        submitBtn.textContent = 'Отправлено!';
        submitBtn.style.background = 'linear-gradient(135deg, #27ae60 0%, #229954 100%)';
        submitBtn.disabled = true;
        
        // Через 3 секунды возвращаем исходное состояние
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = 'linear-gradient(135deg, #27ae60 0%, #229954 100%)';
            submitBtn.disabled = false;
            
            // Закрываем модальное окно
            const modal = form.closest('.modal');
            if (modal) {
                closeModal(modal.id);
            }
        }, 3000);
    }
    
    // Валидация полей в реальном времени
    const inputs = document.querySelectorAll('.modal-form input[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
    
    // Функция валидации поля
    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        // Проверяем обязательные поля
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'Это поле обязательно для заполнения';
        }
        
        // Проверяем телефон
        if (field.type === 'tel' && value) {
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                errorMessage = 'Введите корректный номер телефона';
            }
        }
        
        // Убираем предыдущие ошибки
        removeFieldError(field);
        
        // Показываем ошибку если есть
        if (!isValid) {
            showFieldError(field, errorMessage);
        }
        
        return isValid;
    }
    
    // Функция для показа ошибки поля
    function showFieldError(field, message) {
        field.classList.add('error');
        
        // Создаем элемент с ошибкой
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        errorElement.style.cssText = `
            color: #e74c3c;
            font-size: 12px;
            margin-top: 5px;
            margin-left: 2px;
        `;
        
        // Вставляем после поля
        field.parentNode.appendChild(errorElement);
    }
    
    // Функция для удаления ошибки поля
    function removeFieldError(field) {
        field.classList.remove('error');
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }
}

// Инициализируем модальные окна при загрузке страницы (если header/footer уже загружены)
document.addEventListener('DOMContentLoaded', function() {
    // Проверяем, есть ли уже модальные окна в DOM
    if (document.querySelectorAll('.modal').length > 0) {
        initializeModals();
    }
});
