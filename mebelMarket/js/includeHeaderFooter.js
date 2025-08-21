// Умное подключение header.html и footer.html через fetch
// Автоматически определяет правильные пути в зависимости от расположения страницы

// Глобальная функция для открытия квиза
window.openKitchenQuiz = function() {
    const kvizModal = document.getElementById('kvizModal');
    if (kvizModal) {
        // Убираем все подсказки при открытии
        document.querySelectorAll('.kviz-hint').forEach(hint => hint.remove());
        
        // Блокируем скролл страницы
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        
        kvizModal.style.display = 'block';
        setTimeout(() => {
            kvizModal.classList.add('show');
        }, 10);
        
        // Сбрасываем квиз к первому шагу
        if (window.kitchenQuiz) {
            window.kitchenQuiz.reset();
        }
    }
};

// Глобальная функция для открытия модалки замера
window.openMeasureModal = function() {
    const measureModal = document.getElementById('measureModal');
    if (measureModal) {
        // Блокируем скролл страницы
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        
        measureModal.style.display = 'block';
        setTimeout(() => {
            measureModal.classList.add('show');
        }, 10);
    }
};

// Глобальная функция для открытия модалки сборки
window.openAssemblyModal = function() {
    const assemblyModal = document.getElementById('assemblyModal');
    if (assemblyModal) {
        // Блокируем скролл страницы
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        
        assemblyModal.style.display = 'block';
        setTimeout(() => {
            assemblyModal.classList.add('show');
        }, 10);
    }
};

// Глобальная функция для открытия модалки обратного звонка
window.openCallbackModal = function() {
    const callbackModal = document.getElementById('callbackModal');
    if (callbackModal) {
        // Блокируем скролл страницы
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        
        callbackModal.style.display = 'block';
        setTimeout(() => {
            callbackModal.classList.add('show');
        }, 10);
    }
};

// Инициализация обработчиков для модалок замера и сборки
function initServiceModals() {
    // Модалка замера
    const measureModal = document.getElementById('measureModal');
    const measureCloseBtn = document.querySelector('#measureModal .close');
    
    if (measureCloseBtn && measureModal) {
        measureCloseBtn.addEventListener('click', function() {
            measureModal.classList.remove('show');
            setTimeout(() => {
                measureModal.style.display = 'none';
                document.body.style.overflow = '';
                document.documentElement.style.overflow = '';
            }, 300);
        });
    }
    
    // Модалка сборки
    const assemblyModal = document.getElementById('assemblyModal');
    const assemblyCloseBtn = document.querySelector('#assemblyModal .close');
    
    if (assemblyCloseBtn && assemblyModal) {
        assemblyCloseBtn.addEventListener('click', function() {
            assemblyModal.classList.remove('show');
            setTimeout(() => {
                assemblyModal.style.display = 'none';
                document.body.style.overflow = '';
                document.documentElement.style.overflow = '';
            }, 300);
        });
    }
    
    // Закрытие по клику вне модалки
    if (measureModal) {
        measureModal.addEventListener('click', function(e) {
            if (e.target === measureModal) {
                measureModal.classList.remove('show');
                setTimeout(() => {
                    measureModal.style.display = 'none';
                    document.body.style.overflow = '';
                    document.documentElement.style.overflow = '';
                }, 300);
            }
        });
    }
    
    if (assemblyModal) {
        assemblyModal.addEventListener('click', function(e) {
            if (e.target === assemblyModal) {
                assemblyModal.classList.remove('show');
                setTimeout(() => {
                    assemblyModal.style.display = 'none';
                    document.body.style.overflow = '';
                    document.documentElement.style.overflow = '';
                }, 300);
            }
        });
    }
    
    // Обработчик клавиши Escape для модалок услуг
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (measureModal && measureModal.style.display === 'block') {
                measureModal.classList.remove('show');
                setTimeout(() => {
                    measureModal.style.display = 'none';
                    document.body.style.overflow = '';
                    document.documentElement.style.overflow = '';
                }, 300);
            }
            
            if (assemblyModal && assemblyModal.style.display === 'block') {
                assemblyModal.classList.remove('show');
                setTimeout(() => {
                    assemblyModal.style.display = 'none';
                    document.body.style.overflow = '';
                    document.documentElement.style.overflow = '';
                }, 300);
            }
            
            if (callbackModal && callbackModal.style.display === 'block') {
                callbackModal.classList.remove('show');
                setTimeout(() => {
                    callbackModal.style.display = 'none';
                    document.body.style.overflow = '';
                    document.documentElement.style.overflow = '';
                }, 300);
            }
        }
    });
    
    // Модалка обратного звонка
    const callbackModal = document.getElementById('callbackModal');
    const callbackCloseBtn = document.querySelector('#callbackModal .close');
    
    if (callbackCloseBtn && callbackModal) {
        callbackCloseBtn.addEventListener('click', function() {
            callbackModal.classList.remove('show');
            setTimeout(() => {
                callbackModal.style.display = 'none';
                document.body.style.overflow = '';
                document.documentElement.style.overflow = '';
            }, 300);
        });
    }
    
    // Закрытие по клику вне модалки обратного звонка
    if (callbackModal) {
        callbackModal.addEventListener('click', function(e) {
            if (e.target === callbackModal) {
                callbackModal.classList.remove('show');
                setTimeout(() => {
                    callbackModal.style.display = 'none';
                    document.body.style.overflow = '';
                    document.documentElement.style.overflow = '';
                }, 300);
            }
        });
    }
}

    // Функция для инициализации квиза
    function initKitchenQuiz() {
        let currentStep = 1;
        const totalSteps = 6;
        const answers = {};
        
        // Инициализируем answers как глобальную переменную
        window.quizAnswers = answers;
    
    // Находим элементы квиза
    const kvizModal = document.getElementById('kvizModal');
    const progressText = document.querySelector('.progress-text');
    const progressBars = document.querySelectorAll('.progress-bar');
    const options = document.querySelectorAll('.kviz-option');
    const steps = document.querySelectorAll('.kviz-step');
    const dimensionInputs = document.querySelectorAll('.dimension-input');
    

    
    // Обработчик клика по крестику
    const closeBtn = document.querySelector('#kvizModal .close');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            if (kvizModal) {
                // Убираем все подсказки при закрытии
                document.querySelectorAll('.kviz-hint').forEach(hint => hint.remove());
                
                kvizModal.classList.remove('show');
                setTimeout(() => {
                    kvizModal.style.display = 'none';
                    // Восстанавливаем скролл страницы
                    document.body.style.overflow = '';
                    document.documentElement.style.overflow = '';
                }, 300);
            }
        });
    }
    
    // Обработчик клика вне модального окна
    if (kvizModal) {
        kvizModal.addEventListener('click', function(e) {
            if (e.target === kvizModal) {
                if (kvizModal) {
                    // Убираем все подсказки при закрытии
                    document.querySelectorAll('.kviz-hint').forEach(hint => hint.remove());
                    
                    kvizModal.classList.remove('show');
                    setTimeout(() => {
                        kvizModal.style.display = 'none';
                        // Восстанавливаем скролл страницы
                        document.body.style.overflow = '';
                        document.documentElement.style.overflow = '';
                    }, 300);
                }
            }
        });
    }
    
    // Функция показа шага
    function showStep(stepNumber) {
        // Убираем все подсказки при смене шага
        const existingHints = document.querySelectorAll('.kviz-hint');
        existingHints.forEach(hint => hint.remove());
        
        steps.forEach(step => {
            step.style.display = 'none';
        });
        
        const currentStepElement = document.querySelector(`[data-step="${stepNumber}"]`);
        if (currentStepElement) {
            currentStepElement.style.display = 'block';
        }
        
        // Показываем соответствующие поля для размеров на втором шаге
        if (stepNumber === 2) {
            const selectedLayout = answers.step1;
            
            if (selectedLayout) {
                const layoutElements = document.querySelectorAll('.kviz-dimensions');
                layoutElements.forEach(element => {
                    element.style.display = 'none';
                });
                
                const selectedElement = document.querySelector(`[data-layout="${selectedLayout}"]`);
                if (selectedElement) {
                    selectedElement.style.display = 'block';
                }
            }
        }
        

        
        // Обновляем навигацию для текущего шага
        updateNavigation();
    }
    
    // Функция обновления прогресса
    function updateProgress() {
        if (progressText) {
            progressText.textContent = `Шаг ${currentStep} из ${totalSteps}`;
        }
        
        progressBars.forEach((bar, index) => {
            if (index < currentStep) {
                bar.classList.add('active');
            } else {
                bar.classList.remove('active');
            }
        });
    }
    
    // Функция показа подсказки
    function showHint(message, type = 'warning') {
        // Убираем предыдущую подсказку
        const existingHint = document.querySelector('.kviz-hint');
        if (existingHint) {
            existingHint.remove();
        }
        
        // Создаем новую подсказку
        const hint = document.createElement('div');
        hint.className = `kviz-hint kviz-hint-${type}`;
        hint.innerHTML = `
            <div class="hint-content">
                <span class="hint-icon">⚠️</span>
                <span class="hint-text">${message}</span>
            </div>
        `;
        
        // Добавляем подсказку в текущий шаг
        const currentStepElement = document.querySelector(`[data-step="${currentStep}"]`);
        if (currentStepElement) {
            currentStepElement.appendChild(hint);
            
            // Автоматически убираем подсказку через 4 секунды
            setTimeout(() => {
                if (hint.parentNode) {
                    hint.remove();
                }
            }, 4000);
        } else {
            // Если не можем найти текущий шаг, добавляем подсказку в модальное окно
            const kvizModal = document.getElementById('kvizModal');
            if (kvizModal) {
                kvizModal.appendChild(hint);
                
                // Автоматически убираем подсказку через 4 секунды
                setTimeout(() => {
                    if (hint.parentNode) {
                        hint.remove();
                    }
                }, 4000);
            }
        }
    }
    
    // Функция обновления навигации
    function updateNavigation() {
        // Находим кнопки навигации (они находятся вне шагов)
        const backBtn = document.querySelector('#kvizModal .kviz-btn-back');
        const nextBtn = document.querySelector('#kvizModal .kviz-btn-next');
        
        if (backBtn) {
            backBtn.disabled = currentStep === 1;
        }
        
        if (nextBtn) {
            // Кнопка всегда активна
            nextBtn.disabled = false;
        }
    }
    
    // Обработчик выбора варианта
    options.forEach(option => {
        option.addEventListener('click', function() {
            // Убираем выделение со всех вариантов в текущем шаге
            const currentStepOptions = document.querySelectorAll(`[data-step="${currentStep}"] .kviz-option`);
            currentStepOptions.forEach(opt => opt.classList.remove('selected'));
            
            // Выделяем выбранный вариант
            this.classList.add('selected');
            
            // Сохраняем ответ
            const selectedValue = this.dataset.value;
            answers[`step${currentStep}`] = selectedValue;
            
            console.log(`Выбрана планировка: ${selectedValue}`);
            console.log('Текущие ответы:', answers);
            
            // Обновляем навигацию
            updateNavigation();
        });
    });
    
    // Обработчик ввода размеров
    dimensionInputs.forEach(input => {
        input.addEventListener('input', function() {
            updateNavigation();
        });
    });
    
    // Обработчики для всех опций квиза (материал, столешница, срочность)
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('kviz-option') || e.target.closest('.kviz-option')) {
            const option = e.target.classList.contains('kviz-option') ? e.target : e.target.closest('.kviz-option');
            
            // Находим родительский шаг
            const stepElement = option.closest('.kviz-step');
            if (!stepElement) return;
            
            const step = stepElement.dataset.step;
            const value = option.dataset.value;
            
            if (!step || !value) return;
            
            // Убираем выделение со всех опций в текущем шаге
            const currentStepOptions = stepElement.querySelectorAll('.kviz-option');
            currentStepOptions.forEach(opt => opt.classList.remove('selected'));
            
            // Выделяем выбранную опцию
            option.classList.add('selected');
            
            // Сохраняем ответ
            answers[`step${step}`] = value;
            
            console.log(`Выбрана опция: шаг ${step}, значение ${value}`);
            console.log('Текущие ответы:', answers);
            
            // Обновляем навигацию
            updateNavigation();
        }
    });
    
    // Обработчик кнопки "Назад"
    function handleBackClick() {
        if (currentStep > 1) {
            currentStep--;
            showStep(currentStep);
            updateProgress();
            updateNavigation();
            
            // Восстанавливаем предыдущий выбор
            if (currentStep === 1) {
                const previousAnswer = answers[`step${currentStep}`];
                if (previousAnswer) {
                    const selectedOption = document.querySelector(`[data-value="${previousAnswer}"]`);
                    if (selectedOption) {
                        selectedOption.classList.add('selected');
                    }
                }
            } else if (currentStep === 3) {
                const previousAnswer = answers[`step${currentStep}`];
                if (previousAnswer) {
                    const selectedOption = document.querySelector(`[data-step="3"] [data-value="${previousAnswer}"]`);
                    if (selectedOption) {
                        selectedOption.classList.add('selected');
                    }
                }
            } else if (currentStep === 4) {
                const previousAnswer = answers[`step${currentStep}`];
                if (previousAnswer) {
                    const selectedOption = document.querySelector(`[data-step="4"] [data-value="${previousAnswer}"]`);
                    if (selectedOption) {
                        selectedOption.classList.add('selected');
                    }
                }
            } else if (currentStep === 5) {
                const previousAnswer = answers[`step${currentStep}`];
                if (previousAnswer) {
                    const selectedOption = document.querySelector(`[data-step="5"] [data-value="${previousAnswer}"]`);
                    if (selectedOption) {
                        selectedOption.classList.add('selected');
                    }
                }
            } else if (currentStep === 6) {
                // Восстанавливаем данные формы подарка
                const giftName = answers[`step6_name`];
                const giftPhone = answers[`step6_phone`];
                
                const giftNameInput = document.getElementById('giftName');
                const giftPhoneInput = document.getElementById('giftPhone');
                
                if (giftNameInput && giftName) giftNameInput.value = giftName;
                if (giftPhoneInput && giftPhone) giftPhoneInput.value = giftPhone;
            }
        }
    }
    
    // Обработчик кнопки "Далее"
    function handleNextClick() {
        // Проверяем, можно ли перейти к следующему шагу
        let canProceed = true;
        let hintMessage = '';
        
        if (currentStep === 1) {
            // На первом шаге проверяем, выбран ли вариант планировки
            if (!answers[`step${currentStep}`]) {
                canProceed = false;
                hintMessage = 'Пожалуйста, выберите планировку кухни';
            }
        } else if (currentStep === 2) {
            // На втором шаге проверяем, заполнены ли все поля размеров
            const selectedLayout = answers.step1;
            const currentLayoutElement = document.querySelector(`[data-layout="${selectedLayout}"]`);
            if (currentLayoutElement) {
                const inputs = currentLayoutElement.querySelectorAll('.dimension-input');
                const emptyInputs = Array.from(inputs).filter(input => input.value.trim() === '');
                if (emptyInputs.length > 0) {
                    canProceed = false;
                    hintMessage = 'Пожалуйста, заполните все поля с размерами';
                }
            }
        } else if (currentStep === 3) {
            // На третьем шаге проверяем, выбран ли материал
            if (!answers[`step${currentStep}`]) {
                canProceed = false;
                hintMessage = 'Пожалуйста, выберите материал кухни';
            }
        } else if (currentStep === 4) {
            // На четвёртом шаге проверяем, выбран ли тип столешницы
            if (!answers[`step${currentStep}`]) {
                canProceed = false;
                hintMessage = 'Пожалуйста, выберите тип столешницы';
            }
        } else if (currentStep === 5) {
            // На пятом шаге проверяем, выбрана ли срочность
            if (!answers[`step${currentStep}`]) {
                canProceed = false;
                hintMessage = 'Пожалуйста, выберите срочность заказа';
            }
        } else if (currentStep === 6) {
            // На шестом шаге проверяем, заполнены ли поля формы
            const giftName = document.getElementById('giftName')?.value.trim();
            const giftPhone = document.getElementById('giftPhone')?.value.trim();
            if (!giftName || !giftPhone) {
                canProceed = false;
                hintMessage = 'Пожалуйста, заполните имя и телефон';
            }
        }
        
        // Если нельзя перейти, показываем подсказку и останавливаемся
        if (!canProceed) {
            showHint(hintMessage, 'warning');
            return;
        }
        
        // Если можно перейти, переходим к следующему шагу
        if (currentStep < totalSteps) {
            currentStep++;
            showStep(currentStep);
            updateProgress();
            updateNavigation();
            
            // Сохраняем размеры на втором шаге
            if (currentStep === 2) {
                const selectedLayout = answers.step1;
                const currentLayoutElement = document.querySelector(`[data-layout="${selectedLayout}"]`);
                if (currentLayoutElement) {
                    const inputs = currentLayoutElement.querySelectorAll('.dimension-input');
                    inputs.forEach(input => {
                        answers[`step2_${input.dataset.dimension}`] = input.value;
                    });
                }
            }
            
            // На третьем шаге сбрасываем предыдущий выбор материала
            if (currentStep === 3) {
                // Убираем выделение со всех вариантов материалов
                const materialOptions = document.querySelectorAll('[data-step="3"] .kviz-option');
                materialOptions.forEach(option => option.classList.remove('selected'));
            }
            
            // На четвёртом шаге сбрасываем предыдущий выбор столешницы
            if (currentStep === 4) {
                // Убираем выделение со всех вариантов столешниц
                const countertopOptions = document.querySelectorAll('[data-step="4"] .kviz-option');
                countertopOptions.forEach(option => option.classList.remove('selected'));
            }
            
            // На пятом шаге сбрасываем предыдущий выбор срочности
            if (currentStep === 5) {
                // Убираем выделение со всех вариантов срочности
                const urgencyOptions = document.querySelectorAll('[data-step="5"] .kviz-option');
                urgencyOptions.forEach(option => option.classList.remove('selected'));
            }
            
            // На шестом шаге сбрасываем поля формы подарка
            if (currentStep === 6) {
                // Очищаем поля формы
                const giftNameInput = document.getElementById('giftName');
                const giftPhoneInput = document.getElementById('giftPhone');
                if (giftNameInput) giftNameInput.value = '';
                if (giftPhoneInput) giftPhoneInput.value = '';
            }
        }
    }
    
    // Добавляем обработчики для всех кнопок навигации
    function addNavigationHandlers() {
        // Находим все кнопки навигации в квизе
        const allBackBtns = document.querySelectorAll('#kvizModal .kviz-btn-back');
        const allNextBtns = document.querySelectorAll('#kvizModal .kviz-btn-next');
        
        allBackBtns.forEach(btn => {
            btn.addEventListener('click', handleBackClick);
        });
        
        allNextBtns.forEach(btn => {
            btn.addEventListener('click', handleNextClick);
        });
        
        // Обработчики для полей формы подарка
        const giftNameInput = document.getElementById('giftName');
        const giftPhoneInput = document.getElementById('giftPhone');
        
        if (giftNameInput) {
            giftNameInput.addEventListener('input', function() {
                // Сохраняем имя в ответы
                answers[`step6_name`] = this.value.trim();
                updateNavigation();
            });
        }
        
        if (giftPhoneInput) {
            giftPhoneInput.addEventListener('input', function() {
                // Сохраняем телефон в ответы
                answers[`step6_phone`] = this.value.trim();
                updateNavigation();
            });
        }
    }
    
    // Функция сброса квиза
    function resetQuiz() {
        currentStep = 1;
        answers = {};
        
        // Сбрасываем выбор вариантов планировки
        options.forEach(option => option.classList.remove('selected'));
        
        // Сбрасываем поля ввода размеров
        dimensionInputs.forEach(input => input.value = '');
        
        // Сбрасываем выбранные материалы
        const materialOptions = document.querySelectorAll('[data-step="3"] .kviz-option');
        materialOptions.forEach(option => option.classList.remove('selected'));
        
        // Сбрасываем выбранные столешницы
        const countertopOptions = document.querySelectorAll('[data-step="4"] .kviz-option');
        countertopOptions.forEach(option => option.classList.remove('selected'));
        
        // Сбрасываем выбранную срочность
        const urgencyOptions = document.querySelectorAll('[data-step="5"] .kviz-option');
        urgencyOptions.forEach(option => option.classList.remove('selected'));
        
        // Очищаем поля формы подарка
        const giftNameInput = document.getElementById('giftName');
        const giftPhoneInput = document.getElementById('giftPhone');
        if (giftNameInput) giftNameInput.value = '';
        if (giftPhoneInput) giftPhoneInput.value = '';
        
        // Убираем все подсказки
        const existingHints = document.querySelectorAll('.kviz-hint');
        existingHints.forEach(hint => hint.remove());
        
        // Показываем первый шаг
        showStep(currentStep);
        updateProgress();
        updateNavigation();
    }
    
    // Добавляем обработчики для кнопок навигации
    addNavigationHandlers();
    
    // Делаем функцию сброса доступной глобально
    window.kitchenQuiz = {
        reset: resetQuiz
    };
    
    // Инициализация
    showStep(currentStep);
    updateProgress();
    updateNavigation();
    

}

function getBasePath() {
    // Определяем, где находится текущая страница
    const currentPath = window.location.pathname;
    
    // Если страница в корне (например, /index.html)
    if (currentPath === '/' || currentPath === '/index.html' || currentPath.endsWith('/mebelMarket/') || currentPath.endsWith('/mebelMarket/index.html')) {
        return '';
    }
    
    // Если страница в папке html (например, /html/aboutCompany.html)
    if (currentPath.includes('/html/')) {
        return '../';
    }
    
    // По умолчанию считаем, что страница в корне
    return '';
}

function fixImagePaths(container, basePath) {
    // Исправляем пути к изображениям в зависимости от расположения страницы
    const images = container.querySelectorAll('img[src^="img/"]');
    images.forEach(img => {
        const oldSrc = img.getAttribute('src');
        const newSrc = basePath + oldSrc;
        img.setAttribute('src', newSrc);

    });
}

function fixInternalLinks(container, basePath) {
    // Исправляем внутренние ссылки в зависимости от расположения страницы
    const links = container.querySelectorAll('a[href^="aboutCompany.html"], a[href^="payment.html"], a[href^="delivery.html"], a[href^="contacts.html"], a[href^="privacyPolicy.html"], a[href^="termsOfUse.html"], a[href^="flat.html"], a[href^="fusion.html"], a[href^="mari.html"], a[href^="skala.html"], a[href^="verona.html"], a[href^="valeria.html"], a[href^="grandel.html"], a[href^="linda.html"], a[href^="praga.html"], a[href^="shale.html"], a[href^="loft.html"], a[href^="praga-"], a[href^="shale-"], a[href^="loft-"], a[href^="flat-"], a[href^="fusion-"], a[href^="mari-"], a[href^="skala-"], a[href^="verona-"], a[href^="valeria-"], a[href^="grandel-"], a[href^="linda-"], a[href^="index.html"], a[href^="#"]');
    links.forEach(link => {
        const oldHref = link.getAttribute('href');
        let newHref = oldHref;
        
        // Обрабатываем якорные ссылки (например, #catalog)
        if (oldHref.startsWith('#')) {
            if (basePath === '../') {
                // Если мы в папке html, добавляем путь к главной странице
                newHref = '../index.html' + oldHref;
            } else {
                // Если мы в корне, добавляем только якорь
                newHref = 'index.html' + oldHref;
            }
        } else if (basePath === '../') {
            // Если мы в папке html, исправляем ссылки
            if (oldHref === 'aboutCompany.html') {
                newHref = 'aboutCompany.html'; // Остается как есть
            } else if (oldHref === 'payment.html') {
                newHref = 'payment.html'; // Остается как есть
            } else if (oldHref === 'delivery.html') {
                newHref = 'delivery.html'; // Остается как есть
            } else if (oldHref === 'contacts.html') {
                newHref = 'contacts.html'; // Остается как есть
            } else if (oldHref === 'privacyPolicy.html') {
                newHref = 'privacyPolicy.html'; // Остается как есть
            } else if (oldHref === 'termsOfUse.html') {
                newHref = 'termsOfUse.html'; // Остается как есть
            } else if (oldHref === 'flat.html') {
                newHref = 'flat.html'; // Остается как есть
            } else if (oldHref === 'fusion.html') {
                newHref = 'fusion.html'; // Остается как есть
            } else if (oldHref === 'mari.html') {
                newHref = 'mari.html'; // Остается как есть
            } else if (oldHref === 'skala.html') {
                newHref = 'skala.html'; // Остается как есть
            } else if (oldHref === 'verona.html') {
                newHref = 'verona.html'; // Остается как есть
            } else if (oldHref === 'valeria.html') {
                newHref = 'valeria.html'; // Остается как есть
            } else if (oldHref === 'grandel.html') {
                newHref = 'grandel.html'; // Остается как есть
            } else if (oldHref === 'linda.html') {
                newHref = 'linda.html'; // Остается как есть
            } else if (oldHref === 'praga.html') {
                newHref = 'praga.html'; // Остается как есть
            } else if (oldHref === 'shale.html') {
                newHref = 'shale.html'; // Остается как есть
            } else if (oldHref === 'loft.html') {
                newHref = 'loft.html'; // Остается как есть
            } else if (oldHref.startsWith('praga-')) {
                newHref = oldHref; // Остается как есть
            } else if (oldHref.startsWith('shale-')) {
                newHref = oldHref; // Остается как есть
            } else if (oldHref.startsWith('loft-')) {
                newHref = oldHref; // Остается как есть
            } else if (oldHref.startsWith('flat-')) {
                newHref = oldHref; // Остается как есть
            } else if (oldHref.startsWith('fusion-')) {
                newHref = oldHref; // Остается как есть
            } else if (oldHref.startsWith('mari-')) {
                newHref = oldHref; // Остается как есть
            } else if (oldHref.startsWith('skala-')) {
                newHref = oldHref; // Остается как есть
            } else if (oldHref.startsWith('verona-')) {
                newHref = oldHref; // Остается как есть
            } else if (oldHref.startsWith('valeria-')) {
                newHref = oldHref; // Остается как есть
            } else if (oldHref.startsWith('grandel-')) {
                newHref = oldHref; // Остается как есть
            } else if (oldHref.startsWith('linda-')) {
                newHref = oldHref; // Остается как есть
            } else if (oldHref === 'index.html') {
                newHref = '../index.html'; // На главную
            }
        } else {
            // Если мы в корне, исправляем ссылки
            if (oldHref === 'aboutCompany.html') {
                newHref = 'html/aboutCompany.html'; // В папку html
            } else if (oldHref === 'payment.html') {
                newHref = 'html/payment.html'; // В папку html
            } else if (oldHref === 'delivery.html') {
                newHref = 'html/delivery.html'; // В папку html
            } else if (oldHref === 'contacts.html') {
                newHref = 'html/contacts.html'; // В папку html
            } else if (oldHref === 'privacyPolicy.html') {
                newHref = 'html/privacyPolicy.html'; // В папку html
            } else if (oldHref === 'termsOfUse.html') {
                newHref = 'html/termsOfUse.html'; // В папку html
            } else if (oldHref === 'flat.html') {
                newHref = 'html/flat.html'; // В папку html
            } else if (oldHref === 'fusion.html') {
                newHref = 'html/fusion.html'; // В папку html
            } else if (oldHref === 'mari.html') {
                newHref = 'html/mari.html'; // В папку html
            } else if (oldHref === 'skala.html') {
                newHref = 'html/skala.html'; // В папку html
            } else if (oldHref === 'verona.html') {
                newHref = 'html/verona.html'; // В папку html
            } else if (oldHref === 'valeria.html') {
                newHref = 'html/valeria.html'; // В папку html
            } else if (oldHref === 'grandel.html') {
                newHref = 'html/grandel.html'; // В папку html
            } else if (oldHref === 'linda.html') {
                newHref = 'html/linda.html'; // В папку html
            } else if (oldHref === 'praga.html') {
                newHref = 'html/praga.html'; // В папку html
            } else if (oldHref === 'shale.html') {
                newHref = 'html/shale.html'; // В папку html
            } else if (oldHref === 'loft.html') {
                newHref = 'html/loft.html'; // В папку html
            } else if (oldHref.startsWith('praga-')) {
                newHref = 'html/' + oldHref; // В папку html
            } else if (oldHref.startsWith('shale-')) {
                newHref = 'html/' + oldHref; // В папку html
            } else if (oldHref.startsWith('loft-')) {
                newHref = 'html/' + oldHref; // В папку html
            } else if (oldHref.startsWith('flat-')) {
                newHref = 'html/' + oldHref; // В папку html
            } else if (oldHref.startsWith('fusion-')) {
                newHref = 'html/' + oldHref; // В папку html
            } else if (oldHref.startsWith('mari-')) {
                newHref = 'html/' + oldHref; // В папку html
            } else if (oldHref.startsWith('skala-')) {
                newHref = 'html/' + oldHref; // В папку html
            } else if (oldHref.startsWith('verona-')) {
                newHref = 'html/' + oldHref; // В папку html
            } else if (oldHref.startsWith('valeria-')) {
                newHref = 'html/' + oldHref; // В папку html
            } else if (oldHref.startsWith('grandel-')) {
                newHref = 'html/' + oldHref; // В папку html
            } else if (oldHref.startsWith('linda-')) {
                newHref = 'html/' + oldHref; // В папку html
            } else if (oldHref === 'index.html') {
                newHref = 'index.html'; // Остается как есть
            }
        }
        
        if (oldHref !== newHref) {
            link.setAttribute('href', newHref);

        }
    });
}

function highlightActiveLink(container) {
    // Определяем текущую страницу
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html';
    
    // Находим все ссылки в шапке
    const headerLinks = container.querySelectorAll('.header-top-left a');
    
    headerLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href) {
            // Убираем все классы active
            link.classList.remove('active');
            
            // Проверяем, соответствует ли ссылка текущей странице
            if (href === '#catalog' || href.includes('catalog') || link.textContent.trim().toLowerCase() === 'каталог') {
                // Каталог - никогда не выделяем как активную ссылку
                return;
            } else if (href.includes('index.html') || href === 'index.html') {
                // Главная страница - выделяем всегда на главной странице
                if (currentPage === 'index.html' || currentPage === '' || currentPath.endsWith('/mebelMarket/')) {
                    link.classList.add('active');

                }
            } else if (href.includes('aboutCompany.html') && currentPage === 'aboutCompany.html') {
                link.classList.add('active');

            } else if (href.includes('payment.html') && currentPage === 'payment.html') {
                link.classList.add('active');

            } else if (href.includes('delivery.html') && currentPage === 'delivery.html') {
                link.classList.add('active');

            } else if (href.includes('contacts.html') && currentPage === 'contacts.html') {
                link.classList.add('active');

            } else if (href.includes('flat.html') && (currentPage === 'flat.html' || currentPage.startsWith('flat-'))) {
                link.classList.add('active');

            } else if (href.includes('praga.html') && (currentPage === 'praga.html' || currentPage.startsWith('praga-'))) {
                link.classList.add('active');

            } else if (href.includes('shale.html') && (currentPage === 'shale.html' || currentPage.startsWith('shale-'))) {
                link.classList.add('active');

            } else if (href.includes('loft.html') && (currentPage === 'loft.html' || currentPage.startsWith('loft-'))) {
                link.classList.add('active');

            } else if (href.includes('fusion.html') && (currentPage === 'fusion.html' || currentPage.startsWith('fusion-'))) {
                link.classList.add('active');

            } else if (href.includes('mari.html') && (currentPage === 'mari.html' || currentPage.startsWith('mari-'))) {
                link.classList.add('active');

            } else if (href.includes('skala.html') && (currentPage === 'skala.html' || currentPage.startsWith('skala-'))) {
                link.classList.add('active');

            } else if (href.includes('verona.html') && (currentPage === 'verona.html' || currentPage.startsWith('verona-'))) {
                link.classList.add('active');

            } else if (href.includes('valeria.html') && (currentPage === 'valeria.html' || currentPage.startsWith('valeria-'))) {
                link.classList.add('active');

            } else if (href.includes('grandel.html') && (currentPage === 'grandel.html' || currentPage.startsWith('grandel-'))) {
                link.classList.add('active');

            } else if (href.includes('linda.html') && (currentPage === 'linda.html' || currentPage.startsWith('linda-'))) {
                link.classList.add('active');

            }
        }
    });
}

function includeHTML(selector, url, callback) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.querySelector(selector).innerHTML = data;
            
            // Исправляем пути к изображениям и ссылкам
            const container = document.querySelector(selector);
            const basePath = getBasePath();
            fixImagePaths(container, basePath);
            fixInternalLinks(container, basePath);
            
            // Если это header, выделяем активную ссылку
            if (selector === '#header-container') {
                highlightActiveLink(container);
            }
            
            if (callback) callback();
        })
        .catch(error => {
            console.error('Ошибка загрузки:', error);
            document.querySelector(selector).innerHTML = '<p>Ошибка загрузки контента</p>';
        });
}

document.addEventListener('DOMContentLoaded', function() {
    const basePath = getBasePath();
    

    
    includeHTML('#header-container', basePath + 'html/header.html', function() {
        // Вызываем функцию инициализации header после загрузки
        if (typeof initHeaderFunctionality === 'function') {
            initHeaderFunctionality();
        }
        // Инициализируем выпадающий каталог с небольшой задержкой
        setTimeout(() => {
            if (typeof initCatalogDropdown === 'function') {
                initCatalogDropdown();
            }
        }, 100);
        
        // Инициализируем модальные окна после загрузки header
        if (typeof initializeModals === 'function') {
            initializeModals();
        }
        
        // Инициализируем квиз после загрузки header
        initKitchenQuiz();
        
        // Инициализируем модалки услуг
        initServiceModals();
    });
    
    includeHTML('#footer-container', basePath + 'html/footer.html', function() {
        // Вызываем функцию инициализации footer после загрузки
        if (typeof initFooterFunctionality === 'function') {
            initFooterFunctionality();
        }
        
        // Инициализируем модальные окна после загрузки footer (если еще не инициализированы)
        if (typeof initializeModals === 'function') {
            initializeModals();
        }
    });
});
