// Скрипт для переключения между web3forms и PHP обработчиком - АВТОКРАН
// Использование: node switch-form-handler.js [web3forms|php]

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const mode = args[0];

if (!mode || !['web3forms', 'php'].includes(mode)) {
    console.log('Использование: node switch-form-handler.js [web3forms|php]');
    console.log('  web3forms - переключить на web3forms');
    console.log('  php       - переключить на PHP обработчик');
    process.exit(1);
}

const modalJsPath = path.join(__dirname, 'JS', 'modal.js');
const modalJsBackupPath = path.join(__dirname, 'JS', 'modal.js.backup');
const seeMoreJsPath = path.join(__dirname, 'JS', 'seeMore.js');
const seeMoreJsBackupPath = path.join(__dirname, 'JS', 'seeMore.js.backup');

if (mode === 'web3forms') {
    console.log('Переключаю на web3forms...');
    
    // Проверяем, есть ли уже web3forms версия в modal.js
    const currentModalContent = fs.readFileSync(modalJsPath, 'utf8');
    const currentSeeMoreContent = fs.readFileSync(seeMoreJsPath, 'utf8');
    
    if (currentModalContent.includes('web3forms.com') && currentSeeMoreContent.includes('web3forms.com')) {
        console.log('Уже используется web3forms!');
        process.exit(0);
    }
    
    // Создаем web3forms версию для modal.js
    const web3formsContent = `// modal.js - WEB3FORMS ВЕРСИЯ - АВТОКРАН

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
        timer.textContent = \`\${min}:\${sec}\`;
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
    modalWindow.innerHTML = \`
        <button class="modal-close" title="Закрыть">&times;</button>
        <h2>Оставьте свои контакты и зафиксируйте свою скидку</h2>
        <form class="modal-form" id="formaAvtokrany" action="https://api.web3forms.com/submit" method="POST">
            <input type="hidden" name="access_key" value="d759a276-7f88-4a85-a572-a472510fd51b">
            <input type="hidden" name="form_type" value="Модальная форма">
            <input type="text" name="name" placeholder="Ваше имя" required autocomplete="name">
            <input type="text" name="contact" placeholder="Телефон или e-mail" required autocomplete="tel">
            <input type="hidden" name="subject" value="Новая заявка с сайта АВТОКРАН">
            <button type="submit" class="modal-submit">Зафиксировать скидку</button>
        </form>
        <div class="modal-success" style="display:none;text-align:center;font-size:22px;font-weight:600;color:#DF6417;margin-top:18px;">Скидка зафиксирована!</div>
    \`;
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
        
        // Отправляем на web3forms
        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        })
        .then(res => {
            console.log('Response status:', res.status);
            console.log('Response headers:', res.headers);
            return res.text().then(text => {
                console.log('Raw response:', text);
                try {
                    return JSON.parse(text);
                } catch (e) {
                    console.error('JSON parse error:', e);
                    throw new Error('Invalid JSON response');
                }
            });
        })
        .then(data => {
            submitBtn.disabled = false;
            submitBtn.textContent = submitBtn.dataset.defaultText || 'Отправить';
            
            if (data.success) {
                // Отправка события в Яндекс.Метрику
                if (typeof ym === 'function') {
                    ym(103422261, 'reachGoal', 'formaAvtokrany');
                    console.log('Цель "Отправка формы" отправлена в Яндекс Метрику (formaAvtokrany)');
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
        .catch((error) => {
            console.error('Ошибка отправки формы:', error);
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
    }
});`;

    fs.writeFileSync(modalJsPath, web3formsContent);
    
    // Создаем web3forms версию для seeMore.js
    const seeMoreWeb3formsContent = `document.addEventListener('DOMContentLoaded', function() {
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
        contactModalWindow.innerHTML = \`
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
            
            <form class="modal-form" id="formaAvtokrany" action="https://api.web3forms.com/submit" method="POST">
                <input type="hidden" name="access_key" value="d759a276-7f88-4a85-a572-a472510fd51b">
                <input type="hidden" name="form_type" value="Форма из модального окна">
                <input type="text" name="name" placeholder="Ваше имя" required autocomplete="name">
                <input type="text" name="contact" placeholder="Телефон или e-mail" required autocomplete="tel">
                <input type="hidden" name="subject" value="Новая заявка с сайта АВТОКРАН (см. больше)">
                <button type="submit" class="modal-submit">Отправить заявку</button>
            </form>
            <div class="modal-success" style="display:none;text-align:center;font-size:22px;font-weight:600;color:#DF6417;margin-top:18px;">Заявка отправлена!</div>
        \`;
        
        contactModalOverlay.appendChild(contactModalWindow);
        document.body.appendChild(contactModalOverlay);
        document.body.style.overflow = 'hidden';
        
        // Добавляем отслеживание ссылок в модальном окне
        if (typeof window.phoneTrackingAddListeners === 'function') {
            window.phoneTrackingAddListeners();
        }
        
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
            
            // Отправляем на web3forms
            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            })
            .then(res => {
                console.log('Response status:', res.status);
                console.log('Response headers:', res.headers);
                return res.text().then(text => {
                    console.log('Raw response:', text);
                    try {
                        return JSON.parse(text);
                    } catch (e) {
                        console.error('JSON parse error:', e);
                        throw new Error('Invalid JSON response');
                    }
                });
            })
            .then(data => {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Отправить заявку';
                
                if (data.success) {
                    // Отправка события в Яндекс.Метрику
                    if (typeof ym === 'function') {
                        ym(103422261, 'reachGoal', 'formaAvtokrany');
                        console.log('Цель "Отправка формы из модального окна" отправлена в Яндекс Метрику (formaAvtokrany)');
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
            .catch((error) => {
                console.error('Ошибка отправки формы:', error);
                submitBtn.disabled = false;
                submitBtn.textContent = 'Отправить заявку';
                success.textContent = 'Ошибка соединения!';
                success.style.display = 'block';
            });
        });
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
});`;

    fs.writeFileSync(seeMoreJsPath, seeMoreWeb3formsContent);
    console.log('✅ Переключено на web3forms!');
    
} else if (mode === 'php') {
    console.log('Переключаю на PHP обработчик...');
    
    // Проверяем, есть ли резервные копии
    if (!fs.existsSync(modalJsBackupPath)) {
        console.log('❌ Резервная копия modal.js не найдена!');
        process.exit(1);
    }
    
    if (!fs.existsSync(seeMoreJsBackupPath)) {
        console.log('❌ Резервная копия seeMore.js не найдена!');
        process.exit(1);
    }
    
    // Восстанавливаем из резервных копий
    const modalBackupContent = fs.readFileSync(modalJsBackupPath, 'utf8');
    const seeMoreBackupContent = fs.readFileSync(seeMoreJsBackupPath, 'utf8');
    
    fs.writeFileSync(modalJsPath, modalBackupContent);
    fs.writeFileSync(seeMoreJsPath, seeMoreBackupContent);
    console.log('✅ Переключено на PHP обработчик!');
}

console.log('Готово!'); 