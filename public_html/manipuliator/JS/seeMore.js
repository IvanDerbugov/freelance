document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.wrapCardGrid .card');
    const seeMoreShowBtn = document.querySelector('.seeMoreShow');
    const seeMoreHideBtn = document.querySelector('.seeMoreHide');
    let expanded = false;
    let modalShown = false;
    let modalTimer = null;
    let advantagesSection = document.querySelector('.titleBlock');
    let wasSeeMoreClicked = false; // Флаг для отслеживания нажатия кнопки "Посмотреть все модели"

    function updateCards() {
        cards.forEach((card, idx) => {
            if (!expanded && idx > 2) {
                card.classList.add('card-collapsed');
            } else {
                card.classList.remove('card-collapsed');
            }
        });
        if (expanded) {
            seeMoreShowBtn.style.display = 'none';
            seeMoreHideBtn.style.display = 'block';
        } else {
            seeMoreShowBtn.style.display = 'block';
            seeMoreHideBtn.style.display = 'none';
        }
    }

    function showContactModal() {
        if (modalShown) return;
        modalShown = true;
        
        // Создаём модальное окно для связи
        const contactModalOverlay = document.createElement('div');
        contactModalOverlay.className = 'modal-overlay contact-modal-overlay';
        contactModalOverlay.style.display = 'flex';
        
        const contactModalWindow = document.createElement('div');
        contactModalWindow.className = 'modal-window contact-modal-window';
        contactModalWindow.innerHTML = `
            <button class="modal-close" title="Закрыть">&times;</button>
            <h2>Не нашли нужную модель?</h2>
            <p class="contact-modal-text">Свяжитесь с нами и менеджер оперативно Вам поможет.</p>
            
            <div class="contact-modal-buttons">
                <a href="tel:+79011856562" class="contact-modal-phone">
                    <svg class="phone-icon-main" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.5 18.2c-1.2 0-2.3-.2-3.4-.6-.5-.2-1-.1-1.4.2l-2.2 1.7c-3.2-1.7-5.8-4.3-7.5-7.5l1.7-2.2c.3-.4.4-.9.2-1.4-.4-1.1-.6-2.2-.6-3.4C7.3 4.6 6.7 4 6 4H3.5C2.7 4 2 4.7 2 5.5 2 16.1 9.9 24 20.5 24c.8 0 1.5-.7 1.5-1.5V20c0-.7-.6-1.3-1.5-1.3z" stroke="white" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <span>+7 (901) 185-65-62</span>
                </a>
                <a href="https://wa.me/79011856562" class="contact-modal-whatsapp" target="_blank">
                    <img src="img/icons/whatsapp2.svg" alt="whatsapp" class="icon-svg" />
                    <span>WhatsApp</span>
                </a>
            </div>
            
            <form class="modal-form" method="POST" id="formaManipulator">
                <input type="text" name="name" placeholder="Ваше имя" required autocomplete="name">
                <input type="text" name="contact" placeholder="Телефон или e-mail" required autocomplete="tel">
                <input type="hidden" name="form_type" value="manipulator">
                <button type="submit" class="modal-submit">Отправить заявку</button>
            </form>
            <div class="modal-success" style="display:none;text-align:center;font-size:22px;font-weight:600;color:#DF6417;margin-top:18px;">Заявка отправлена!</div>
        `;
        
        contactModalOverlay.appendChild(contactModalWindow);
        document.body.appendChild(contactModalOverlay);
        document.body.style.overflow = 'hidden';
        
        // Закрытие модального окна
        contactModalWindow.querySelector('.modal-close').addEventListener('click', function() {
            contactModalOverlay.remove();
            document.body.style.overflow = '';
        });
        
        contactModalOverlay.addEventListener('click', function(e) {
            if (e.target === contactModalOverlay) {
                contactModalOverlay.remove();
                document.body.style.overflow = '';
            }
        });
        
        // Обработка формы
        const form = contactModalWindow.querySelector('.modal-form');
        const success = contactModalWindow.querySelector('.modal-success');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            success.style.display = 'none';
            const formData = new FormData(form);
            const submitBtn = contactModalWindow.querySelector('.modal-submit');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Отправка...';
            
            fetch('send-form.php', {
                method: 'POST',
                body: formData
            })
            .then(res => res.json())
            .then(data => {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Отправить заявку';
                if (data.success) {
                    if (typeof ym === 'function') {
                        ym(103422173, 'reachGoal', 'formaManipulator');
                        console.log('Цель "Отправка формы из модального окна" отправлена в Яндекс Метрику (formaManipulator)');
                    }
                    form.style.display = 'none';
                    success.textContent = 'Заявка отправлена!';
                    success.style.display = 'block';
                    setTimeout(() => {
                        contactModalOverlay.remove();
                        document.body.style.overflow = '';
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
                submitBtn.textContent = 'Отправить заявку';
                success.textContent = 'Ошибка соединения!';
                success.style.display = 'block';
            });
        });
        
        // Добавляем отслеживание для динамически созданных ссылок
        if (typeof window.phoneTrackingAddListeners === 'function') {
            setTimeout(window.phoneTrackingAddListeners, 100);
        }
    }

    function startModalTimer() {
        // Очищаем предыдущий таймер если он есть
        if (modalTimer) {
            clearTimeout(modalTimer);
        }
        
        // Запускаем новый таймер на 20 секунд
        modalTimer = setTimeout(() => {
            showContactModal();
        }, 20000); // 20 секунд
    }

    function stopModalTimer() {
        if (modalTimer) {
            clearTimeout(modalTimer);
            modalTimer = null;
        }
    }

    // Функция для проверки видимости секции преимуществ
    function checkAdvantagesVisibility() {
        if (!advantagesSection || modalShown || !wasSeeMoreClicked) return;
        
        const rect = advantagesSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Если заголовок "8 ключевых преимуществ" виден в окне браузера
        if (rect.top <= windowHeight && rect.bottom >= 0) {
            showContactModal();
        }
    }

    // Отслеживаем прокрутку страницы
    window.addEventListener('scroll', function() {
        checkAdvantagesVisibility();
    });

    updateCards();

    seeMoreShowBtn.addEventListener('click', function() {
        expanded = true;
        wasSeeMoreClicked = true; // Устанавливаем флаг при нажатии кнопки
        updateCards();
    });
    
    seeMoreHideBtn.addEventListener('click', function() {
        expanded = false;
        updateCards();
        // Флаг wasSeeMoreClicked остается true, чтобы модальное окно могло появиться при прокрутке
    });
});
