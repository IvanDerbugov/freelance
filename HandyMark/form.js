document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('requestForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Получаем данные формы
        const formData = new FormData(form);
        const name = formData.get('name');
        const contact = formData.get('contact');
        const message = formData.get('message');
        
        // Валидация - просто проверяем что поля не пустые
        if (!name || !contact || !message) {
            alert('Пожалуйста, заполните все поля!');
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
}); 