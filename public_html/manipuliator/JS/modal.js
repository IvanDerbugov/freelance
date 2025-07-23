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
        <form class="modal-form" id="formaManipulator" method="POST">
            <input type="text" name="name" placeholder="Ваше имя" required autocomplete="name">
            <input type="text" name="contact" placeholder="Телефон или e-mail" required autocomplete="tel">
            <input type="hidden" name="form_type" value="manipulator">
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
    // Обработка формы
    const form = modalWindow.querySelector('.modal-form');
    const success = modalWindow.querySelector('.modal-success');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        success.style.display = 'none';
        const formData = new FormData(form);
        const submitBtn = modalWindow.querySelector('.modal-submit');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Отправка...';
        fetch('send-form.php', {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            submitBtn.disabled = false;
            submitBtn.textContent = submitBtn.dataset.defaultText || 'Отправить';
            if (data.success) {
                // Отправка события в Яндекс.Метрику
                if (typeof ym === 'function') {
                    ym(103422173, 'reachGoal', 'formaManipulator');
                    console.log('Цель "Отправка формы" отправлена в Яндекс Метрику (formaManipulator)');
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
        })
        .catch(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = submitBtn.dataset.defaultText || 'Отправить';
            success.textContent = 'Ошибка соединения!';
            success.style.display = 'block';
        });
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
        
        // Добавляем отслеживание для динамически созданных ссылок
        if (typeof window.phoneTrackingAddListeners === 'function') {
            setTimeout(window.phoneTrackingAddListeners, 100);
        }
    }
}); 