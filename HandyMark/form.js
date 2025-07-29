document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('requestForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Получаем данные формы
        const formData = new FormData(form);
        const name = formData.get('name');
        const contact = formData.get('contact');
        const message = formData.get('message');
        
        // Валидация
        if (!name || !contact || !message) {
            alert('Пожалуйста, заполните все поля!');
            return;
        }
        
        // Проверка контакта (email или телефон)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        
        if (!emailRegex.test(contact) && !phoneRegex.test(contact)) {
            alert('Пожалуйста, введите корректный email или номер телефона!');
            return;
        }
        
        // Показываем сообщение об отправке
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Отправляем...';
        submitBtn.disabled = true;
        
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
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            
            if (data.success) {
                // Показываем успешное сообщение
                alert(data.message);
                
                // Очищаем форму
                form.reset();
            } else {
                // Показываем ошибку
                alert(data.message || 'Ошибка отправки. Попробуйте позже.');
            }
        })
        .catch((error) => {
            console.error('Ошибка отправки формы:', error);
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            alert('Ошибка соединения! Попробуйте позже.');
        });
    });
    
    // Простая маска для телефона (если введен телефон)
    const contactInput = document.getElementById('contact');
    
    contactInput.addEventListener('input', function(e) {
        let value = e.target.value;
        
        // Проверяем, похоже ли это на телефон (начинается с цифры или +)
        if (/^[\d\+]/.test(value)) {
            // Это телефон - применяем маску
            let numbers = value.replace(/\D/g, '');
            
            // Ограничиваем до 10 цифр
            if (numbers.length > 10) {
                numbers = numbers.slice(0, 10);
            }
            
            // Форматируем номер
            if (numbers.length > 0) {
                if (numbers.length <= 3) {
                    value = '+1 (' + numbers;
                } else if (numbers.length <= 6) {
                    value = '+1 (' + numbers.slice(0, 3) + ') ' + numbers.slice(3);
                } else {
                    value = '+1 (' + numbers.slice(0, 3) + ') ' + numbers.slice(3, 6) + '-' + numbers.slice(6);
                }
            }
        }
        
        e.target.value = value;
    });
}); 