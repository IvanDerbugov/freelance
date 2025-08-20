// Умное подключение header.html и footer.html через fetch
// Автоматически определяет правильные пути в зависимости от расположения страницы

// Глобальная функция для открытия квиза
window.openKitchenQuiz = function() {
    const kvizModal = document.getElementById('kvizModal');
    if (kvizModal) {
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
    

    
    // Функция открытия модального окна квиза
    function openKvizModal() {
        if (kvizModal) {
            // Блокируем скролл страницы
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
            
            kvizModal.style.display = 'block';
            setTimeout(() => {
                kvizModal.classList.add('show');
            }, 10);
        }
    }
    
    // Функция закрытия модального окна квиза
    function closeKvizModal() {
        if (kvizModal) {
            kvizModal.classList.remove('show');
            setTimeout(() => {
                kvizModal.style.display = 'none';
                // Восстанавливаем скролл страницы
                document.body.style.overflow = '';
                document.documentElement.style.overflow = '';
            }, 300);
        }
    }
    
    // Обработчик клика по крестику
    const closeBtn = document.querySelector('#kvizModal .close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeKvizModal);
    }
    
    // Обработчик клика вне модального окна
    if (kvizModal) {
        kvizModal.addEventListener('click', function(e) {
            if (e.target === kvizModal) {
                closeKvizModal();
            }
        });
    }
    
    // Функция показа шага
    function showStep(stepNumber) {
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
            console.log('=== ОТЛАДКА ВТОРОГО ШАГА ===');
            console.log('Выбранная планировка:', selectedLayout);
            console.log('Все элементы планировок:', document.querySelectorAll('.kviz-dimensions'));
            
            if (selectedLayout) {
                const layoutElements = document.querySelectorAll('.kviz-dimensions');
                layoutElements.forEach(element => {
                    element.style.display = 'none';
                    console.log('Скрываем элемент:', element.dataset.layout);
                });
                
                const selectedElement = document.querySelector(`[data-layout="${selectedLayout}"]`);
                console.log('Найденный элемент для показа:', selectedElement);
                if (selectedElement) {
                    selectedElement.style.display = 'block';
                    selectedElement.style.visibility = 'visible';
                    selectedElement.style.opacity = '1';
                    console.log('Показываем элемент:', selectedLayout);
                    console.log('Стили элемента после показа:', {
                        display: selectedElement.style.display,
                        visibility: selectedElement.style.visibility,
                        opacity: selectedElement.style.opacity
                    });
                } else {
                    console.log('Элемент НЕ найден для планировки:', selectedLayout);
                }
            } else {
                console.log('Планировка НЕ выбрана в первом шаге!');
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
    
    // Функция обновления навигации
    function updateNavigation() {
        // Находим кнопки в текущем шаге
        const currentStepElement = document.querySelector(`[data-step="${currentStep}"]`);
        if (!currentStepElement) return;
        
        const backBtn = currentStepElement.querySelector('.kviz-btn-back');
        const nextBtn = currentStepElement.querySelector('.kviz-btn-next');
        
        if (backBtn) {
            backBtn.disabled = currentStep === 1;
        }
        
        if (nextBtn) {
            let canProceed = false;
            
            if (currentStep === 1) {
                // На первом шаге проверяем, выбран ли вариант планировки
                canProceed = !!answers[`step${currentStep}`];
            } else if (currentStep === 2) {
                // На втором шаге проверяем, заполнены ли все поля размеров
                const selectedLayout = answers.step1;
                const currentLayoutElement = document.querySelector(`[data-layout="${selectedLayout}"]`);
                if (currentLayoutElement) {
                    const inputs = currentLayoutElement.querySelectorAll('.dimension-input');
                    canProceed = Array.from(inputs).every(input => input.value.trim() !== '');
                }
            }
            
            nextBtn.disabled = !canProceed;
        }
    }
    
    // Обработчик выбора варианта
    options.forEach(option => {
        option.addEventListener('click', function() {
            // Убираем выделение со всех вариантов
            options.forEach(opt => opt.classList.remove('selected'));
            
            // Выделяем выбранный вариант
            this.classList.add('selected');
            
            // Сохраняем ответ
            const selectedValue = this.dataset.value;
            answers[`step${currentStep}`] = selectedValue;
            console.log('=== ВЫБОР ПЛАНИРОВКИ ===');
            console.log('Выбрана планировка:', selectedValue);
            console.log('Сохранено в answers:', answers);
            
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
            }
        }
    }
    
    // Обработчик кнопки "Далее"
    function handleNextClick() {
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
        }
    }
    
    // Добавляем обработчики для всех кнопок навигации
    function addNavigationHandlers() {
        const allBackBtns = document.querySelectorAll('.kviz-btn-back');
        const allNextBtns = document.querySelectorAll('.kviz-btn-next');
        
        allBackBtns.forEach(btn => {
            btn.addEventListener('click', handleBackClick);
        });
        
        allNextBtns.forEach(btn => {
            btn.addEventListener('click', handleNextClick);
        });
    }
    
    // Функция сброса квиза
    function resetQuiz() {
        currentStep = 1;
        answers = {};
        
        // Сбрасываем выбор вариантов
        options.forEach(option => option.classList.remove('selected'));
        
        // Сбрасываем поля ввода
        dimensionInputs.forEach(input => input.value = '');
        
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
