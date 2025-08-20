// Обработчики форм для Web3Forms и Telegram уведомлений

// Конфигурация
const CONFIG = {
    web3forms: {
        accessKey: 'fa427f88-52e1-4116-b58f-4f7845816c64',
        endpoint: 'https://api.web3forms.com/submit'
    },
    telegram: {
        botToken: '8343811100:AAFksZstnN76FVLcutLXYWhrMhU_CiLd4PE', // Токен вашего бота
        chatId: '955498826', // ID чата для уведомлений
        clientChatId: 'CLIENT_CHAT_ID' // ID чата клиента (опционально)
    }
};

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initializeFormHandlers();
});

// Инициализация обработчиков форм
function initializeFormHandlers() {
    // Форма замера
    const measureForm = document.getElementById('measureForm');
    if (measureForm) {
        measureForm.addEventListener('submit', handleMeasureForm);
    }
    
    // Форма сборки
    const assemblyForm = document.getElementById('assemblyForm');
    if (assemblyForm) {
        assemblyForm.addEventListener('submit', handleAssemblyForm);
    }
    
    // Форма квиза (подарок)
    const giftForm = document.getElementById('giftForm');
    if (giftForm) {
        giftForm.addEventListener('submit', handleQuizForm);
    }
}

// Обработчик формы замера
async function handleMeasureForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const formType = 'measure';
    
    try {
        // Показываем индикатор загрузки
        showLoadingState(e.target, true);
        
        // Отправляем через Web3Forms
        const web3formsResult = await submitToWeb3Forms(formData);
        
        if (web3formsResult.success) {
            // Отправляем уведомление в Telegram
            await sendTelegramNotification(formData, formType);
            
            // Показываем успешное сообщение
            showSuccessMessage(e.target, 'Заявка на замер успешно отправлена! Мы свяжемся с вами в ближайшее время.');
            
            // Очищаем форму
            e.target.reset();
            
            // Закрываем модальное окно
            closeModal('measureModal');
        } else {
            throw new Error('Ошибка отправки через Web3Forms');
        }
    } catch (error) {
        console.error('Ошибка отправки формы:', error);
        showErrorMessage(e.target, 'Произошла ошибка при отправке заявки. Попробуйте еще раз или свяжитесь с нами по телефону.');
    } finally {
        // Скрываем индикатор загрузки
        showLoadingState(e.target, false);
    }
}

// Обработчик формы сборки
async function handleAssemblyForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const formType = 'assembly';
    
    try {
        // Показываем индикатор загрузки
        showLoadingState(e.target, true);
        
        // Отправляем через Web3Forms
        const web3formsResult = await submitToWeb3Forms(formData);
        
        if (web3formsResult.success) {
            // Отправляем уведомление в Telegram
            await sendTelegramNotification(formData, formType);
            
            // Показываем успешное сообщение
            showSuccessMessage(e.target, 'Заявка на сборку успешно отправлена! Мы свяжемся с вами в ближайшее время.');
            
            // Очищаем форму
            e.target.reset();
            
            // Закрываем модальное окно
            closeModal('assemblyModal');
        } else {
            throw new Error('Ошибка отправки через Web3Forms');
        }
    } catch (error) {
        console.error('Ошибка отправки формы:', error);
        showErrorMessage(e.target, 'Произошла ошибка при отправке заявки. Попробуйте еще раз или свяжитесь с нами по телефону.');
    } finally {
        // Скрываем индикатор загрузки
        showLoadingState(e.target, false);
    }
}

// Обработчик формы квиза
async function handleQuizForm(e) {
    e.preventDefault();
    
    // Собираем результаты квиза
    const quizResults = collectQuizResults();
    
    // Добавляем результаты в форму
    const formData = new FormData(e.target);
    formData.set('quiz_layout', quizResults.layout);
    formData.set('quiz_dimensions', quizResults.dimensions);
    formData.set('quiz_material', quizResults.material);
    formData.set('quiz_countertop', quizResults.countertop);
    formData.set('quiz_urgency', quizResults.urgency);
    
    const formType = 'quiz';
    
    try {
        // Показываем индикатор загрузки
        showLoadingState(e.target, true);
        
        // Отправляем через Web3Forms
        const web3formsResult = await submitToWeb3Forms(formData);
        
        if (web3formsResult.success) {
            // Отправляем уведомление в Telegram
            await sendTelegramNotification(formData, formType);
            
            // Показываем успешное сообщение
            showSuccessMessage(e.target, 'Результаты квиза успешно отправлены! Мы свяжемся с вами в ближайшее время для расчета стоимости.');
            
            // Очищаем форму
            e.target.reset();
            
            // Закрываем модальное окно квиза
            closeModal('kvizModal');
        } else {
            throw new Error('Ошибка отправки через Web3Forms');
        }
    } catch (error) {
        console.error('Ошибка отправки формы:', error);
        showErrorMessage(e.target, 'Произошла ошибка при отправке результатов. Попробуйте еще раз или свяжитесь с нами по телефону.');
    } finally {
        // Скрываем индикатор загрузки
        showLoadingState(e.target, false);
    }
}

// Отправка формы через Web3Forms
async function submitToWeb3Forms(formData) {
    try {
        const response = await fetch(CONFIG.web3forms.endpoint, {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        
        if (response.ok && result.success) {
            return { success: true, data: result };
        } else {
            return { success: false, error: result.message || 'Неизвестная ошибка' };
        }
    } catch (error) {
        console.error('Ошибка Web3Forms:', error);
        return { success: false, error: error.message };
    }
}

// Сбор результатов квиза
function collectQuizResults() {
    const results = {
        layout: '',
        dimensions: '',
        material: '',
        countertop: '',
        urgency: ''
    };
    
    // Шаг 1: Планировка
    const selectedLayout = document.querySelector('.kviz-option[data-step="1"].selected');
    if (selectedLayout) {
        const layoutValue = selectedLayout.getAttribute('data-value');
        const layoutText = selectedLayout.querySelector('.option-text').textContent;
        results.layout = `${layoutText} (${layoutValue})`;
    }
    
    // Шаг 2: Размеры
    const dimensionInputs = document.querySelectorAll('.dimension-input');
    if (dimensionInputs.length > 0) {
        const dimensions = [];
        dimensionInputs.forEach(input => {
            if (input.value) {
                const label = input.closest('.input-group').querySelector('label');
                dimensions.push(`${label.textContent}: ${input.value} см`);
            }
        });
        results.dimensions = dimensions.join(', ');
    }
    
    // Шаг 3: Материал
    const selectedMaterial = document.querySelector('.kviz-option[data-step="3"].selected');
    if (selectedMaterial) {
        const materialValue = selectedMaterial.getAttribute('data-value');
        const materialText = selectedMaterial.querySelector('.option-text').textContent;
        results.material = `${materialText} (${materialValue})`;
    }
    
    // Шаг 4: Столешница
    const selectedCountertop = document.querySelector('.kviz-option[data-step="4"].selected');
    if (selectedCountertop) {
        const countertopValue = selectedCountertop.getAttribute('data-value');
        const countertopText = selectedCountertop.querySelector('.option-text').textContent;
        results.countertop = `${countertopText} (${countertopValue})`;
    }
    
    // Шаг 5: Срочность
    const selectedUrgency = document.querySelector('.kviz-option[data-step="5"].selected');
    if (selectedUrgency) {
        const urgencyValue = selectedUrgency.getAttribute('data-value');
        const urgencyText = selectedUrgency.querySelector('.option-text').textContent;
        results.urgency = `${urgencyText} (${urgencyValue})`;
    }
    
    return results;
}

// Отправка уведомления в Telegram
async function sendTelegramNotification(formData, formType) {
    // Проверяем, настроен ли Telegram бот
    if (!CONFIG.telegram.botToken || !CONFIG.telegram.chatId) {
        console.warn('Telegram бот не настроен');
        return;
    }
    
    try {
        const message = formatTelegramMessage(formData, formType);
        
        // Отправляем уведомление администратору
        await sendTelegramMessage(message, CONFIG.telegram.chatId);
        
        // Если есть ID чата клиента, отправляем ему подтверждение
        if (CONFIG.telegram.clientChatId && CONFIG.telegram.clientChatId !== 'CLIENT_CHAT_ID') {
            const clientMessage = formatClientMessage(formData, formType);
            await sendTelegramMessage(clientMessage, CONFIG.telegram.clientChatId);
        }
        
    } catch (error) {
        console.error('Ошибка отправки в Telegram:', error);
        // Не блокируем основной процесс, если Telegram недоступен
    }
}

// Форматирование сообщения для Telegram
function formatTelegramMessage(formData, formType) {
    let message = '';
    
    if (formType === 'quiz') {
        // Сообщение для квиза
        const name = formData.get('name');
        const phone = formData.get('phone');
        const layout = formData.get('quiz_layout');
        const dimensions = formData.get('quiz_dimensions');
        const material = formData.get('quiz_material');
        const countertop = formData.get('quiz_countertop');
        const urgency = formData.get('quiz_urgency');
        
        message = `🎯 НОВЫЙ КВИЗ: ДИЗАЙН-ПРОЕКТ КУХНИ\n\n`;
        message += `👤 Имя: ${name}\n`;
        message += `📱 Телефон: ${phone}\n\n`;
        message += `🏠 Планировка: ${layout || 'Не выбрано'}\n`;
        message += `📏 Размеры: ${dimensions || 'Не указаны'}\n`;
        message += `🪵 Материал: ${material || 'Не выбран'}\n`;
        message += `🔲 Столешница: ${countertop || 'Не выбрана'}\n`;
        message += `⏰ Срочность: ${urgency || 'Не указана'}\n`;
        
    } else {
        // Сообщение для замера/сборки
        const formTypeText = formType === 'measure' ? 'ЗАМЕР' : 'СБОРКА';
        const name = formData.get('name');
        const phone = formData.get('phone');
        const address = formData.get('address');
        const date = formData.get('date');
        
        message = `🚨 НОВАЯ ЗАЯВКА: ${formTypeText}\n\n`;
        message += `👤 Имя: ${name}\n`;
        message += `📱 Телефон: ${phone}\n`;
        message += `📍 Адрес: ${address}\n`;
        
        if (date) {
            message += `📅 Дата: ${date}\n`;
        }
    }
    
    message += `\n⏰ Время: ${new Date().toLocaleString('ru-RU')}`;
    
    return message;
}

// Форматирование сообщения для клиента
function formatClientMessage(formData, formType) {
    const name = formData.get('name');
    let message = '';
    
    if (formType === 'quiz') {
        message = `✅ Спасибо, ${name}!\n\n`;
        message += `Результаты вашего квиза дизайн-проекта кухни успешно получены.\n`;
        message += `Наш дизайнер свяжется с вами в ближайшее время для расчета стоимости и обсуждения деталей.\n\n`;
        message += `📞 По всем вопросам: +7 (980) 098-00-54`;
    } else {
        const formTypeText = formType === 'measure' ? 'замер' : 'сборку';
        message = `✅ Спасибо, ${name}!\n\n`;
        message += `Ваша заявка на ${formTypeText} кухни успешно получена.\n`;
        message += `Наш специалист свяжется с вами в ближайшее время для уточнения деталей.\n\n`;
        message += `📞 По всем вопросам: +7 (980) 098-00-54`;
    }
    
    return message;
}

// Отправка сообщения в Telegram
async function sendTelegramMessage(message, chatId) {
    const url = `https://api.telegram.org/bot${CONFIG.telegram.botToken}/sendMessage`;
    
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: 'HTML'
        })
    });
    
    if (!response.ok) {
        throw new Error(`Telegram API error: ${response.status}`);
    }
    
    return response.json();
}

// Показать/скрыть состояние загрузки
function showLoadingState(form, isLoading) {
    let submitBtn = form.querySelector('.submit-btn');
    
    // Если это форма квиза, ищем кнопку подарка
    if (!submitBtn) {
        submitBtn = form.querySelector('.gift-submit-btn');
    }
    
    if (submitBtn) {
        if (isLoading) {
            submitBtn.disabled = true;
            const originalText = submitBtn.textContent;
            submitBtn.setAttribute('data-original-text', originalText);
            submitBtn.textContent = 'Отправка...';
            submitBtn.classList.add('loading');
        } else {
            submitBtn.disabled = false;
            const originalText = submitBtn.getAttribute('data-original-text') || 'Отправить заявку';
            submitBtn.textContent = originalText;
            submitBtn.classList.remove('loading');
        }
    }
}

// Показать сообщение об успехе
function showSuccessMessage(form, message) {
    // Убираем предыдущие сообщения
    removeMessages(form);
    
    const successDiv = document.createElement('div');
    successDiv.className = 'form-message form-message-success';
    successDiv.textContent = message;
    
    form.appendChild(successDiv);
    
    // Автоматически убираем через 5 секунд
    setTimeout(() => {
        if (successDiv.parentNode) {
            successDiv.remove();
        }
    }, 5000);
}

// Показать сообщение об ошибке
function showErrorMessage(form, message) {
    // Убираем предыдущие сообщения
    removeMessages(form);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-message form-message-error';
    errorDiv.textContent = message;
    
    form.appendChild(errorDiv);
    
    // Автоматически убираем через 5 секунд
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.remove();
        }
    }, 5000);
}

// Убрать все сообщения
function removeMessages(form) {
    const messages = form.querySelectorAll('.form-message');
    messages.forEach(msg => msg.remove());
}

// Закрыть модальное окно
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        }, 300);
    }
}
