// underConstruction.js

document.addEventListener('DOMContentLoaded', function() {
    // Список готовых страниц
    const existingPages = [
        'avtovyshka.рекордика.рф',
        'avtokran.рекордика.рф',
        'gusenichnyy-ekskavator.рекордика.рф',
        'dlinnomer.рекордика.рф',
        'manipuliator.рекордика.рф',
        'kolesnyy-ekskavator.рекордика.рф',
        'ekskavator-pogruzchik.рекордика.рф'
    ];

    // Функция для показа модального окна
    function showUnderConstructionModal(pageName) {
        
        // Создаём модальное окно
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'modal-overlay';
        modalOverlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;z-index:10000;';
        
        const modalWindow = document.createElement('div');
        modalWindow.className = 'modal-window';
        modalWindow.style.cssText = 'background:#fff;padding:30px;border-radius:16px;max-width:500px;width:90%;max-height:90vh;overflow-y:auto;position:relative;';
        modalWindow.innerHTML = `
            <button class="modal-close" title="Закрыть" style="position:absolute;top:10px;right:15px;background:none;border:none;font-size:24px;cursor:pointer;color:#666;">&times;</button>
            <h2 style="margin-bottom:20px;color:#043517;">Страница в разработке</h2>
            <p style="font-size:18px;color:#043517;text-align:center;margin-bottom:24px;line-height:1.5;">
                У нас есть данная спецтехника, но страница ещё находится в разработке. 
                Свяжитесь с нами для уточнения деталей и получения актуальной информации.
            </p>
            
            <div style="display:flex;gap:16px;margin-bottom:24px;justify-content:center;flex-wrap:wrap;">
                <a href="tel:+79011856562" style="display:flex;align-items:center;gap:8px;padding:12px 20px;border-radius:12px;text-decoration:none;font-weight:600;font-size:16px;background:linear-gradient(270deg, #DF6417, #ffc107);color:#fff;">
                    <svg width="20" height="20" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.5 18.2c-1.2 0-2.3-.2-3.4-.6-.5-.2-1-.1-1.4.2l-2.2 1.7c-3.2-1.7-5.8-4.3-7.5-7.5l1.7-2.2c.3-.4.4-.9.2-1.4-.4-1.1-.6-2.2-.6-3.4C7.3 4.6 6.7 4 6 4H3.5C2.7 4 2 4.7 2 5.5 2 16.1 9.9 24 20.5 24c.8 0 1.5-.7 1.5-1.5V20c0-.7-.6-1.3-1.5-1.3z" stroke="white" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <span>+7 (901) 185-65-62</span>
                </a>
                <a href="https://wa.me/79011856562" target="_blank" style="display:flex;align-items:center;gap:8px;padding:12px 20px;border-radius:12px;text-decoration:none;font-weight:600;font-size:16px;background:#25D366;color:#fff;">
                    <img src="img/icons/whatsapp2.svg" alt="whatsapp" style="width:20px;height:20px;" />
                    <span>WhatsApp</span>
                </a>
            </div>
            
            <form class="modal-form" id="formaUnderConstruction" style="display:flex;flex-direction:column;gap:15px;">
                <input type="hidden" name="form_type" value="Форма со страницы в разработке">
                <input type="hidden" name="page_name" value="${pageName}">
                <input type="text" name="name" placeholder="Ваше имя" required autocomplete="name" style="padding:12px;border:1px solid #ddd;border-radius:8px;font-size:16px;">
                <input type="text" name="contact" placeholder="Телефон или e-mail" required autocomplete="tel" style="padding:12px;border:1px solid #ddd;border-radius:8px;font-size:16px;">
                <input type="hidden" name="access_key" value="d759a276-7f88-4a85-a572-a472510fd51b">
                <button type="submit" class="modal-submit" style="padding:15px;background:linear-gradient(270deg, #DF6417, #ffc107);color:#fff;border:none;border-radius:12px;font-size:18px;font-weight:600;cursor:pointer;">Отправить заявку</button>
            </form>
            <div class="modal-success" style="display:none;text-align:center;font-size:22px;font-weight:600;color:#DF6417;margin-top:18px;">Заявка отправлена!</div>
        `;
        
        modalOverlay.appendChild(modalWindow);
        document.body.appendChild(modalOverlay);
        document.body.style.overflow = 'hidden';
        
        // Добавляем отслеживание ссылок в модальном окне
        if (typeof window.mainPageMetricsAddListeners === 'function') {
            window.mainPageMetricsAddListeners();
        }
        
        // Закрытие модального окна
        modalWindow.querySelector('.modal-close').addEventListener('click', function() {
            modalOverlay.remove();
            document.body.style.overflow = '';
        });
        
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                modalOverlay.remove();
                document.body.style.overflow = '';
            }
        });
        
        // Функция отправки в наш обработчик
        async function sendToOurHandler(formData) {
            try {
                const response = await fetch('webhook-handler.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(Object.fromEntries(formData))
                });
                
                const result = await response.json();
                console.log('Наш обработчик ответил:', result);
                return result.success;
            } catch (error) {
                console.error('Ошибка отправки в наш обработчик:', error);
                return false;
            }
        }

        // Обработка формы
        const form = modalWindow.querySelector('.modal-form');
        const success = modalWindow.querySelector('.modal-success');
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            success.style.display = 'none';
            const formData = new FormData(form);
            const submitBtn = modalWindow.querySelector('.modal-submit');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Отправка...';
            
            try {
                // Сначала отправляем в web3forms
                const web3formsResponse = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });
                
                const web3formsData = await web3formsResponse.json();
                
                if (web3formsData.success) {
                    // Если web3forms успешно обработал, отправляем в наш обработчик
                    console.log('web3forms успешно обработал форму, отправляем в наш обработчик...');
                    const ourHandlerSuccess = await sendToOurHandler(formData);
                    
                    // Отправка события в Яндекс.Метрику
                    if (typeof ym === 'function') {
                        ym(103637885, 'reachGoal', 'formaUnderConstruction');
                    }
                    
                    form.style.display = 'none';
                    success.textContent = 'Заявка отправлена!';
                    success.style.display = 'block';
                    
                    setTimeout(() => {
                        modalOverlay.remove();
                        document.body.style.overflow = '';
                        form.reset();
                        form.style.display = '';
                        success.style.display = 'none';
                    }, 2000);
                    
                    // Логируем результат
                    console.log('Результат обработки:', {
                        web3forms: 'success',
                        ourHandler: ourHandlerSuccess ? 'success' : 'failed'
                    });
                    
                } else {
                    throw new Error('web3forms вернул ошибку');
                }
            } catch (error) {
                console.error('Ошибка при отправке формы:', error);
                success.textContent = 'Ошибка отправки!';
                success.style.display = 'block';
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Отправить заявку';
            }
        });
    }

    // Функция для проверки, является ли ссылка на несуществующую страницу
    function isUnderConstructionLink(href) {
        if (!href) return false;
        
        // Исключаем внешние ссылки и якорные ссылки
        if (href.startsWith('http') && !href.includes('рекордика.рф')) return false;
        if (href.startsWith('mailto:') || href.startsWith('tel:')) return false;
        
        // Исключаем якорные ссылки (начинающиеся с #), но не пустые ссылки
        if (href.startsWith('#') && href !== '#') return false;
        
        // Если это ссылка "#" или пустая ссылка "" - это несуществующая страница
        if (href === '#' || href === '') return true;
        
        // Проверяем, есть ли ссылка в списке существующих страниц
        const hasExistingPage = existingPages.some(page => href.includes(page));
        
        // Если ссылка содержит "рекордика.рф" но не в списке существующих - это несуществующая страница
        if (href.includes('рекордика.рф') && !hasExistingPage) return true;
        
        // Если это внутренняя ссылка без домена (например, просто "#catalog") - не показываем модалку
        if (!href.includes('рекордика.рф') && !href.startsWith('http')) return false;
        
        return !hasExistingPage;
    }

    // Функция для получения названия страницы из ссылки
    function getPageNameFromLink(href, linkText) {
        // Если есть текст ссылки, используем его
        if (linkText && linkText.trim()) {
            return linkText.trim();
        }
        
        // Иначе пытаемся извлечь из href
        if (href.includes('рекордика.рф')) {
            const domain = href.split('рекордика.рф')[0];
            if (domain.includes('//')) {
                const subdomain = domain.split('//')[1];
                if (subdomain) {
                    // Преобразуем поддомен в читаемое название
                    const pageNames = {
                        'avtobetononasos': 'Автобетононасосы',
                        'avtogreider': 'Автогрейдеры',
                        'asfaltoukladchik': 'Асфальтоукладчики',
                        'buldozer': 'Бульдозеры',
                        'katok-gruntovyy': 'Катки грунтовые',
                        'katok-dorozhnyy': 'Катки дорожные',
                        'kompressor': 'Компрессоры',
                        'mini-pogruzchik': 'Мини-погрузчики',
                        'mini-ekskavator': 'Мини-экскаваторы',
                        'panelevoz': 'Панелевозы',
                        'samosval': 'Самосвалы',
                        'teleskopicheskiy-pogruzchik': 'Телескопические погрузчики',
                        'tral-nizkoramnyy': 'Тралы низкорамные',
                        'freza-dorozhnaya': 'Фрезы дорожные',
                        'frontalnyy-pogruzchik': 'Фронтальные погрузчики',
                        'uborka-sneg': 'Уборка и вывоз снега',
                        'yamobur': 'Ямобуры'
                    };
                    
                    for (const [key, value] of Object.entries(pageNames)) {
                        if (subdomain.includes(key)) {
                            return value;
                        }
                    }
                }
            }
        }
        
        return 'спецтехнику';
    }

    // Добавляем обработчики для всех ссылок
    function addUnderConstructionListeners() {
        const links = document.querySelectorAll('a[href]');
        
        links.forEach(function(link) {
            // Проверяем, не добавлен ли уже обработчик
            if (!link.hasAttribute('data-under-construction-listener')) {
                link.setAttribute('data-under-construction-listener', 'true');
                
                link.addEventListener('click', function(e) {
                    const href = this.getAttribute('href');
                    const linkText = this.textContent.trim();
                    
                    // Если это ссылка на несуществующую страницу
                    if (isUnderConstructionLink(href)) {
                        e.preventDefault();
                        const pageName = getPageNameFromLink(href, linkText);
                        showUnderConstructionModal(pageName);
                    }
                });
                
                // Также добавляем обработчик для пустых ссылок
                // Исключаем кнопки "Оставить заявку" (leaveRequest)
                if ((link.getAttribute('href') === '' || link.getAttribute('href') === '#') && !link.classList.contains('leaveRequest')) {
                    link.addEventListener('click', function(e) {
                        e.preventDefault();
                        const linkText = this.textContent.trim();
                        showUnderConstructionModal(linkText);
                    });
                }
            }
        });
    }

    // Добавляем обработчики для уже существующих элементов
    addUnderConstructionListeners();

    // Добавляем обработчики для динамически загружаемых элементов
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                addUnderConstructionListeners();
            }
        });
    });

    // Начинаем наблюдение за изменениями в body
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Также добавляем обработчики через небольшую задержку для динамически загружаемого контента
    setTimeout(function() {
        addUnderConstructionListeners();
    }, 1000);

    // И еще раз через 3 секунды для надежности
    setTimeout(function() {
        addUnderConstructionListeners();
    }, 3000);
}); 