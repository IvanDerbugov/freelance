document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.form');
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Создаем модальное окно для успешной отправки
    const successModal = document.createElement('div');
    successModal.className = 'success-modal';
    successModal.innerHTML = `
        <div class="success-modal-content">
            <button class="success-modal-close">&times;</button>
            <div class="success-modal-header">
                <img src="img/logo/logoModal.png" alt="Handy Mark" class="success-modal-logo">
                <h3>Thank you!</h3>
            </div>
            <div class="success-modal-body">
                <p>Your request has been sent successfully!</p>
                <p>I will contact you soon.</p>
                <p class="success-modal-signature">Best regards,<br>Mark</p>
            </div>
            <button class="success-modal-btn">Close</button>
        </div>
    `;
    
    document.body.appendChild(successModal);
    
    // Функция для показа/скрытия модального окна
    function showSuccessModal() {
        successModal.classList.add('success-modal-show');
        document.body.style.overflow = 'hidden';
    }
    
    function hideSuccessModal() {
        successModal.classList.remove('success-modal-show');
        document.body.style.overflow = '';
    }
    
    // Обработчики закрытия модального окна
    successModal.querySelector('.success-modal-close').addEventListener('click', hideSuccessModal);
    successModal.querySelector('.success-modal-btn').addEventListener('click', hideSuccessModal);
    
    // Закрытие по клику вне модального окна
    successModal.addEventListener('click', function(e) {
        if (e.target === successModal) {
            hideSuccessModal();
        }
    });
    
    // Закрытие по Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && successModal.classList.contains('success-modal-show')) {
            hideSuccessModal();
        }
    });
    
    // Функция для создания спиннера
    function createSpinner() {
        const spinner = document.createElement('div');
        spinner.className = 'spinner';
        spinner.innerHTML = `
            <div class="spinner-inner"></div>
        `;
        return spinner;
    }
    
    // Обработчик отправки формы
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Получаем данные формы
        const nameInput = form.querySelector('input[type="text"]');
        const phoneInput = form.querySelector('input[type="tel"]');
        const messageInput = form.querySelector('textarea');
        
        const name = nameInput.value.trim();
        const contact = phoneInput.value.trim();
        const message = messageInput.value.trim();
        
        // Валидация
        if (!name || !contact || !message) {
            alert('Please fill in all required fields!');
            return;
        }
        
        // Показываем спиннер
        const originalText = submitBtn.textContent;
        submitBtn.textContent = '';
        submitBtn.disabled = true;
        
        const spinner = createSpinner();
        submitBtn.appendChild(spinner);
        
        // Отправляем данные на сервер
        fetch('send-form.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                contact: contact,
                message: message
            })
        })
        .then(res => res.json())
        .then(data => {
            // Скрываем спиннер
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            
            if (spinner) {
                spinner.remove();
            }
            
            if (data.success) {
                // Показываем модальное окно успеха
                showSuccessModal();
                
                // Очищаем форму
                form.reset();
            } else {
                // Показываем ошибку
                alert(data.message || 'Submission error. Please try again later.');
            }
        })
        .catch((error) => {
            console.error('Form submission error:', error);
            
            // Скрываем спиннер
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            
            if (spinner) {
                spinner.remove();
            }
            
            alert('Connection error! Please try again later.');
        });
    });
}); 