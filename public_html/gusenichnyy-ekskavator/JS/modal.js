// modal.js

document.addEventListener('DOMContentLoaded', function () {
    // Создаём контейнер для кнопки и таймера
    const modalBtnWrap = document.createElement('div');
    modalBtnWrap.className = 'fixed-modal-btn-wrap';

    // Таймер
    const timer = document.createElement('div');
    timer.className = 'modal-timer';
    timer.textContent = '05:00';
    modalBtnWrap.appendChild(timer);

    // Кнопка
    const btn = document.createElement('button');
    btn.className = 'fixed-modal-btn';
    btn.type = 'button';
    btn.textContent = 'Зафиксировать скидку 15%';
    modalBtnWrap.appendChild(btn);

    document.body.appendChild(modalBtnWrap);

    // Таймер логика
    let timeLeft = 5 * 60; // 5 минут в секундах
    function updateTimer() {
        const min = String(Math.floor(timeLeft / 60)).padStart(2, '0');
        const sec = String(timeLeft % 60).padStart(2, '0');
        timer.textContent = `${min}:${sec}`;
        if (timeLeft > 0) {
            timeLeft--;
        } else {
            timer.style.display = 'none';
            btn.textContent = 'Зафиксировать скидку в 10%';
        }
    }
    updateTimer();
    const interval = setInterval(() => {
        updateTimer();
        if (timeLeft < 0) clearInterval(interval);
    }, 1000);

    // --- Модальное окно ---
    // Создаём затемнение
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    modalOverlay.style.display = 'none';

    // Модальное окно
    const modalWindow = document.createElement('div');
    modalWindow.className = 'modal-window';
    modalWindow.innerHTML = `
        <button class="modal-close" title="Закрыть">&times;</button>
        <h2>Оставьте свои контакты и зафиксируйте свою скидку</h2>
        <form class="modal-form" id="formaGusenichnyexkavator" action="https://api.web3forms.com/submit" method="POST">
            <input type="hidden" name="access_key" value="d759a276-7f88-4a85-a572-a472510fd51b">
            <input type="hidden" name="form_type" value="Модальная форма">
            <input type="text" name="name" placeholder="Ваше имя" required autocomplete="name">
            <input type="text" name="contact" placeholder="Телефон или e-mail" required autocomplete="tel">
            <input type="hidden" name="subject" value="Новая заявка с сайта ГУСЕНИЧНЫЙ ЭКСКАВАТОР">
            <button type="submit" class="modal-submit">Зафиксировать скидку</button>
        </form>
        <div class="modal-success" style="display:none;text-align:center;font-size:22px;font-weight:600;color:#DF6417;margin-top:18px;">Скидка зафиксирована!</div>
    `;
    modalOverlay.appendChild(modalWindow);
    document.body.appendChild(modalOverlay);

    // Открытие модального окна
    btn.addEventListener('click', function () {
        openModal(true);
    });
    // Закрытие по крестику
    modalWindow.querySelector('.modal-close').addEventListener('click', function () {
        modalOverlay.style.display = 'none';
        document.body.style.overflow = '';
    });
    // Закрытие по клику вне окна
    modalOverlay.addEventListener('click', function (e) {
        if (e.target === modalOverlay) {
            modalOverlay.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
    // Обработка формы с reCAPTCHA v3
    const form = modalWindow.querySelector('.modal-form');
    const success = modalWindow.querySelector('.modal-success');
    
    // Добавляем reCAPTCHA v3 к форме
    if (window.RecaptchaV3) {
        window.RecaptchaV3.addRecaptchaToForm(form, 'gusenichnyy_ekskavator_form');
    }
    
    // Переопределяем обработчик отправки для совместимости с reCAPTCHA
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        success.style.display = 'none';
        
        const submitBtn = modalWindow.querySelector('.modal-submit');
        const originalText = submitBtn.textContent;
        
        try {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Проверка...';
            
            // Получаем токен reCAPTCHA
            const token = await window.RecaptchaV3.getRecaptchaToken('gusenichnyy_ekskavator_form');
            
            // Добавляем токен к данным формы
            const formData = new FormData(form);
            formData.append('g-recaptcha-response', token);
            
            submitBtn.textContent = 'Отправка...';
            
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });
            
            const responseText = await response.text();
            console.log('Raw response:', responseText);
            
            let data;
            try {
                data = JSON.parse(responseText);
            } catch (e) {
                console.error('JSON parse error:', e);
                throw new Error('Invalid JSON response');
            }
            
            if (data.success) {
                // Отправка события в Яндекс.Метрику
                if (typeof ym === 'function') {
                    ym(103422283, 'reachGoal', 'formaGusenichnyexkavator');
                    console.log('Цель "Отправка формы" отправлена в Яндекс Метрику (formaGusenichnyexkavator)');
                }
                form.style.display = 'none';
                success.textContent = 'Заявка отправлена!';
                success.style.display = 'block';
                setTimeout(() => {
                    modalOverlay.style.display = 'none';
                    document.body.style.overflow = '';
                    modalBtnWrap.style.display = 'none';
                    form.reset();
                    form.style.display = '';
                    success.style.display = 'none';
                }, 2000);
            } else {
                success.textContent = data.message || 'Ошибка отправки!';
                success.style.display = 'block';
            }
        } catch (error) {
            console.error('Form submission error:', error);
            success.textContent = 'Ошибка соединения!';
            success.style.display = 'block';
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });

    // Открытие модального окна по всем кнопкам с классом .open-modal-btn
    document.querySelectorAll('.open-modal-btn').forEach(function(el) {
        el.addEventListener('click', function(e) {
            if (el.tagName === 'A') e.preventDefault();
            openModal(false);
        });
    });

    function openModal(isDiscount) {
        modalOverlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        const h2 = modalWindow.querySelector('h2');
        const submitBtn = modalWindow.querySelector('.modal-submit');
        if (isDiscount) {
            h2.textContent = 'Оставьте свои контакты и зафиксируйте свою скидку';
            submitBtn.textContent = 'Зафиксировать скидку';
            submitBtn.dataset.defaultText = 'Зафиксировать скидку';
        } else {
            h2.textContent = 'Оставьте свои контакты';
            submitBtn.textContent = 'Отправить';
            submitBtn.dataset.defaultText = 'Отправить';
        }
        
        // Добавляем отслеживание ссылок после создания модального окна
        if (typeof window.phoneTrackingAddListeners === 'function') {
            window.phoneTrackingAddListeners();
        }
    }
}); 


