// empty-links-handler.js - Обработка кнопок с пустыми ссылками в выпадающих списках
// С полной интеграцией Web3Forms, PHP обработчика и Yandex.Метрики

document.addEventListener('DOMContentLoaded', function() {
    
    // Функция для добавления обработчиков для кнопок с пустыми ссылками
    function addEmptyLinkListeners() {
        // Находим все ссылки с пустыми href в выпадающих списках
        const emptyLinks = document.querySelectorAll('.catalog-dropdown a[href=""], .burger-dropdown a[href=""], .burger-menu a[href=""]');
        
        emptyLinks.forEach(function(link) {
            // Проверяем, не добавлен ли уже обработчик
            if (!link.hasAttribute('data-empty-link-listener')) {
                link.setAttribute('data-empty-link-listener', 'true');
                
                link.addEventListener('click', function(e) {
                    e.preventDefault(); // Предотвращаем переход по пустой ссылке
                    
                    // Закрываем выпадающий список
                    const dropdown = link.closest('.catalog-dropdown, .burger-dropdown, .burger-menu');
                    if (dropdown) {
                        dropdown.classList.remove('active');
                    }
                    
                    // Логируем клик для отладки
                    console.log('Кнопка с пустой ссылкой нажата:', link.textContent.trim());
                    
                    // Показываем модальное окно "Страница в разработке"
                    showPageInDevelopmentMessage(link.textContent.trim());
                });
            }
        });
    }
    
    // Функция для показа сообщения о том, что страница в разработке
    function showPageInDevelopmentMessage(pageName) {
        // Создаем модальное окно для уведомления
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'page-development-modal-overlay';
        modalOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        `;
        
        const modalWindow = document.createElement('div');
        modalWindow.className = 'page-development-modal-window';
        modalWindow.style.cssText = `
            background: #fff;
            padding: 30px;
            border-radius: 16px;
            max-width: 500px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
            text-align: center;
            font-family: 'Montserrat', sans-serif;
        `;
        
        modalWindow.innerHTML = `
            <button class="modal-close" style="
                position: absolute;
                top: 15px;
                right: 20px;
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                color: #666;
            ">&times;</button>
            <h2 style="
                color: #333;
                margin-bottom: 20px;
                font-size: 24px;
                font-weight: 600;
            ">Страница в разработке</h2>
            <p style="
                color: #666;
                margin-bottom: 30px;
                line-height: 1.6;
                font-size: 16px;
            ">У нас есть данная спецтехника, но страница ещё находится в разработке. Свяжитесь с нами для уточнения деталей и получения актуальной информации.</p>
            <div style="
                display: flex;
                gap: 15px;
                justify-content: center;
                margin-bottom: 30px;
                flex-wrap: wrap;
            ">
                <a href="tel:+79011856562" class="phone-contact" style="
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 12px 20px;
                    background: #FF6B35;
                    color: white;
                    text-decoration: none;
                    border-radius: 8px;
                    font-weight: 500;
                    transition: background 0.3s;
                " onmouseover="this.style.background='#E55A2B'" onmouseout="this.style.background='#FF6B35'">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                    +7 (901) 185-65-62
                </a>
                <a href="https://wa.me/79011856562" class="whatsapp-contact" style="
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 12px 20px;
                    background: #25D366;
                    color: white;
                    text-decoration: none;
                    border-radius: 8px;
                    font-weight: 500;
                    transition: background 0.3s;
                " onmouseover="this.style.background='#20BD5A'" onmouseout="this.style.background='#25D366'">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                    WhatsApp
                </a>
            </div>
            <form class="empty-links-form" style="
                display: flex;
                flex-direction: column;
                gap: 15px;
            ">
                <input type="text" name="name" placeholder="Ваше имя" style="
                    padding: 12px 16px;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    font-size: 16px;
                    font-family: inherit;
                " required>
                <input type="text" name="contact" placeholder="Телефон или e-mail" style="
                    padding: 12px 16px;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    font-size: 16px;
                    font-family: inherit;
                " required>
                <input type="hidden" name="form_type" value="empty_links_development">
                <input type="hidden" name="page_name" value="${pageName}">
                <button type="submit" class="submit-btn" style="
                    padding: 15px 30px;
                    background: #FF6B35;
                    color: white;
                    border: none;
                    border-radius: 8px;
                    font-size: 16px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: background 0.3s;
                    font-family: inherit;
                " onmouseover="this.style.background='#E55A2B'" onmouseout="this.style.background='#FF6B35'">
                    Отправить заявку
                </button>
            </form>
            <div class="form-success" style="
                display: none;
                color: #25D366;
                font-weight: 600;
                margin-top: 15px;
                text-align: center;
            ">Заявка отправлена! Мы свяжемся с вами в ближайшее время.</div>
            <div class="form-error" style="
                display: none;
                color: #FF4444;
                font-weight: 600;
                margin-top: 15px;
                text-align: center;
            ">Ошибка отправки! Попробуйте еще раз.</div>
        `;
        
        modalOverlay.appendChild(modalWindow);
        document.body.appendChild(modalOverlay);
        
        // Обработчик закрытия по клику на крестик
        const closeBtn = modalWindow.querySelector('.modal-close');
        closeBtn.addEventListener('click', function() {
            document.body.removeChild(modalOverlay);
        });
        
        // Обработчик закрытия по клику вне модального окна
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                document.body.removeChild(modalOverlay);
            }
        });
        
        // Обработчик закрытия по клавише Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                if (document.body.contains(modalOverlay)) {
                    document.body.removeChild(modalOverlay);
                }
            }
        });
        
        // Обработчики для кликов по контактам (метрика)
        const phoneContact = modalWindow.querySelector('.phone-contact');
        const whatsappContact = modalWindow.querySelector('.whatsapp-contact');
        
        if (phoneContact) {
            phoneContact.addEventListener('click', function() {
                // Отправляем цель в Яндекс.Метрику
                if (typeof ym === 'function') {
                    ym(103307535, 'reachGoal', 'telPogruzchik');
                    console.log('Цель "Клик по телефону" отправлена в Яндекс Метрику (telPogruzchik)');
                }
            });
        }
        
        if (whatsappContact) {
            whatsappContact.addEventListener('click', function() {
                // Отправляем цель в Яндекс.Метрику
                if (typeof ym === 'function') {
                    ym(103307535, 'reachGoal', 'WhatsAppPogruzchik');
                    console.log('Цель "Клик по WhatsApp" отправлена в Яндекс Метрику (WhatsAppPogruzchik)');
                }
            });
        }
        
        // Обработчик отправки формы
        const form = modalWindow.querySelector('.empty-links-form');
        const successMessage = modalWindow.querySelector('.form-success');
        const errorMessage = modalWindow.querySelector('.form-error');
        const submitBtn = modalWindow.querySelector('.submit-btn');
        
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Скрываем предыдущие сообщения
            successMessage.style.display = 'none';
            errorMessage.style.display = 'none';
            
            // Блокируем кнопку и меняем текст
            submitBtn.disabled = true;
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Отправка...';
            
            try {
                // Создаем FormData для отправки
                const formData = new FormData(form);
                
                // Добавляем дополнительные поля
                formData.append('subject', `Заявка со страницы "${pageName}" (в разработке)`);
                formData.append('access_key', 'd759a276-7f88-4a85-a572-a472510fd51b');
                
                // Отправляем на Web3Forms
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });
                
                const data = await response.json();
                
                if (data.success) {
                                       // Отправляем цель в Яндекс.Метрику
                   if (typeof ym === 'function') {
                       ym(103307535, 'reachGoal', 'formaPogruzchik');
                       console.log('Цель "Отправка формы" отправлена в Яндекс Метрику (formaPogruzchik)');
                   }
                    
                    // Показываем сообщение об успехе
                    successMessage.style.display = 'block';
                    form.reset();
                    
                    // Закрываем модальное окно через 2 секунды
                    setTimeout(() => {
                        if (document.body.contains(modalOverlay)) {
                            document.body.removeChild(modalOverlay);
                        }
                    }, 2000);
                    
                } else {
                    throw new Error(data.message || 'Ошибка отправки');
                }
                
            } catch (error) {
                console.error('Ошибка отправки формы:', error);
                
                // Показываем сообщение об ошибке
                errorMessage.textContent = 'Ошибка отправки! Попробуйте еще раз.';
                errorMessage.style.display = 'block';
                
            } finally {
                // Восстанавливаем кнопку
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        });
    }
    
    // Добавляем обработчики для уже существующих элементов
    addEmptyLinkListeners();
    
    // Добавляем обработчики для динамически загружаемых элементов
    // Создаем наблюдатель за изменениями в DOM только для конкретных контейнеров
    const observer = new MutationObserver(function(mutations) {
        let shouldUpdate = false;
        
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                // Проверяем, затронуты ли только интересующие нас контейнеры
                if (mutation.target.matches('.catalog-dropdown, .burger-dropdown, .burger-menu, #header-container, #footer-container')) {
                    shouldUpdate = true;
                }
            }
        });
        
        // Обновляем обработчики только если затронуты нужные контейнеры
        if (shouldUpdate) {
            addEmptyLinkListeners();
        }
    });
    
    // Начинаем наблюдение только за конкретными контейнерами
    const headerContainer = document.getElementById('header-container');
    const footerContainer = document.getElementById('footer-container');
    
    if (headerContainer) {
        observer.observe(headerContainer, {
            childList: true,
            subtree: true
        });
    }
    
    if (footerContainer) {
        observer.observe(footerContainer, {
            childList: true,
            subtree: true
        });
    }
    
    // Добавляем обработчики с небольшой задержкой для надежности (только один раз)
    setTimeout(addEmptyLinkListeners, 1000);
});
