document.addEventListener('DOMContentLoaded', function() {
    // Проверяем, мобильное ли устройство
    window.isMobile = window.innerWidth <= 740;
    
    if (!window.isMobile) return; // Если не мобилка, не инициализируем слайдер

    // Элементы слайдера тарифов
    const tariffsFlex = document.querySelector('.tariffs-flex');
    const tariffsSlides = document.querySelectorAll('.tariffs-flex .tariff');
    const tariffsDotsContainer = document.querySelector('.tariffs-dots');
    const tariffsArrowPrev = document.querySelector('.tariffs-arrow-prev');
    const tariffsArrowNext = document.querySelector('.tariffs-arrow-next');

    if (!tariffsFlex || tariffsSlides.length === 0) return;

    let currentTariffSlide = 0;
    const totalTariffSlides = tariffsSlides.length;
    let isTariffTransitioning = false;

    // Создаем точки навигации
    function renderTariffDots() {
        tariffsDotsContainer.innerHTML = ''; //очищаем контейнер точек
        for (let i = 0; i < totalTariffSlides; i++) { //создаем точки для каждого слайда
            const dot = document.createElement('span'); //создаем элемент span
            dot.className = 'tariffs-dot'; //добавляем класс точки
            dot.addEventListener('click', function() { //добавляем обработчик клика на точку
                if (!isTariffTransitioning) { //если нет перехода
                    goToTariffSlide(i);
                }
            });
            tariffsDotsContainer.appendChild(dot);
        }
    }

    // Обновляем активную точку
    function updateTariffDots() {
        const dots = tariffsDotsContainer.children;
        for (let i = 0; i < dots.length; i++) {
            dots[i].classList.toggle('active', i === currentTariffSlide);
        }
    }

    // Переход к слайду
    function goToTariffSlide(index) {
        if (isTariffTransitioning) return;
        
        isTariffTransitioning = true;
        currentTariffSlide = index;
        
        const slideWidth = tariffsSlides[0].offsetWidth;
        const gap = 8; // gap между слайдами
        const totalOffset = index * (slideWidth + gap);
        
        // Центрируем слайд относительно контейнера
        const container = tariffsFlex.parentElement;
        const containerWidth = container.offsetWidth;
        const slideCenter = totalOffset + slideWidth / 2;
        const containerCenter = containerWidth / 2;
        const centeringOffset = containerCenter - slideCenter;
        
        // Добавляем небольшое смещение для лучшего визуального центрирования
        const visualOffset = centeringOffset - 20; // Учитываем padding контейнера
        
        tariffsFlex.style.transform = `translateX(${visualOffset}px)`;
        
        updateTariffDots();
        
        // Снимаем флаг после завершения анимации
        setTimeout(() => {
            isTariffTransitioning = false;
        }, 500);
    }

    // Обработчики стрелок
    if (tariffsArrowPrev) {
        tariffsArrowPrev.addEventListener('click', () => {
            if (!isTariffTransitioning) {
                const prevIndex = currentTariffSlide > 0 ? currentTariffSlide - 1 : totalTariffSlides - 1;
                goToTariffSlide(prevIndex);
            }
        });
    }

    if (tariffsArrowNext) {
        tariffsArrowNext.addEventListener('click', () => {
            if (!isTariffTransitioning) {
                const nextIndex = currentTariffSlide < totalTariffSlides - 1 ? currentTariffSlide + 1 : 0;
                goToTariffSlide(nextIndex);
            }
        });
    }

    // Свайп функциональность
    let startX = 0;
    let isDragging = false;
    let deltaX = 0;

    function onTariffDragStart(e) {
        if (isTariffTransitioning) return;
        // Проверяем, не кликнули ли на якорь-ссылку
        if (e.target.closest('a[href^="#"]')) {
            return; // Не начинаем свайп, если кликнули на якорь-ссылку
        }
        isDragging = true;
        startX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        tariffsFlex.style.transition = 'none';
    }

    function onTariffDragMove(e) {
        if (!isDragging) return;
        const x = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        deltaX = x - startX;
        
        const slideWidth = tariffsSlides[0].offsetWidth;
        const gap = 8;
        const totalOffset = currentTariffSlide * (slideWidth + gap);
        
        // Центрируем слайд относительно контейнера
        const container = tariffsFlex.parentElement;
        const containerWidth = container.offsetWidth;
        const slideCenter = totalOffset + slideWidth / 2;
        const containerCenter = containerWidth / 2;
        const centeringOffset = containerCenter - slideCenter;
        
        // Добавляем небольшое смещение для лучшего визуального центрирования
        const visualOffset = centeringOffset - 20; // Учитываем padding контейнера
        
        tariffsFlex.style.transform = `translateX(${visualOffset + deltaX}px)`;
    }

    function onTariffDragEnd() {
        if (!isDragging) return;
        tariffsFlex.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        
        if (Math.abs(deltaX) > 30) {
            if (deltaX < 0) {
                // Свайп влево - следующий слайд
                const nextIndex = currentTariffSlide < totalTariffSlides - 1 ? currentTariffSlide + 1 : 0;
                goToTariffSlide(nextIndex);
            } else {
                // Свайп вправо - предыдущий слайд
                const prevIndex = currentTariffSlide > 0 ? currentTariffSlide - 1 : totalTariffSlides - 1;
                goToTariffSlide(prevIndex);
            }
        } else {
            // Возвращаемся к текущему слайду
            goToTariffSlide(currentTariffSlide);
        }
        
        isDragging = false;
        deltaX = 0;
    }

    // Добавляем обработчики событий для свайпов
    tariffsFlex.addEventListener('mousedown', onTariffDragStart);
    tariffsFlex.addEventListener('mousemove', onTariffDragMove);
    tariffsFlex.addEventListener('mouseup', onTariffDragEnd);
    tariffsFlex.addEventListener('mouseleave', onTariffDragEnd);
    // Touch события для тарифов с улучшенной поддержкой мобильных
    tariffsFlex.addEventListener('touchstart', e => {
        if (isTariffTransitioning) return;
        // Проверяем, не кликнули ли на якорь-ссылку
        if (e.target.closest('a[href^="#"]')) {
            return; // Не начинаем свайп, если кликнули на якорь-ссылку
        }
        isDragging = true;
        startX = e.touches[0].clientX;
        tariffsFlex.style.transition = 'none';
        e.preventDefault(); // Предотвращаем скролл страницы
    }, { passive: false });
    
    tariffsFlex.addEventListener('touchmove', e => {
        if (!isDragging) return;
        e.preventDefault(); // Предотвращаем скролл страницы
        const x = e.touches[0].clientX;
        deltaX = x - startX;
        
        const slideWidth = tariffsSlides[0].offsetWidth;
        const gap = 8;
        const totalOffset = currentTariffSlide * (slideWidth + gap);
        
        // Центрируем слайд относительно контейнера
        const container = tariffsFlex.parentElement;
        const containerWidth = container.offsetWidth;
        const slideCenter = totalOffset + slideWidth / 2;
        const containerCenter = containerWidth / 2;
        const centeringOffset = containerCenter - slideCenter;
        
        // Добавляем небольшое смещение для лучшего визуального центрирования
        const visualOffset = centeringOffset - 20;
        
        tariffsFlex.style.transform = `translateX(${visualOffset + deltaX}px)`;
    }, { passive: false });
    
    tariffsFlex.addEventListener('touchend', e => {
        if (!isDragging) return;
        tariffsFlex.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        
        // Уменьшаем порог для более чувствительных свайпов
        const threshold = 30; // Было 50, стало 30
        
        if (Math.abs(deltaX) > threshold) {
            if (deltaX < 0) {
                // Свайп влево - следующий слайд
                const nextIndex = currentTariffSlide < totalTariffSlides - 1 ? currentTariffSlide + 1 : 0;
                goToTariffSlide(nextIndex);
            } else {
                // Свайп вправо - предыдущий слайд
                const prevIndex = currentTariffSlide > 0 ? currentTariffSlide - 1 : totalTariffSlides - 1;
                goToTariffSlide(prevIndex);
            }
        } else if (deltaX !== 0) {
            // Был небольшой свайп - возвращаемся к текущему слайду
            goToTariffSlide(currentTariffSlide);
        }
        
        isDragging = false;
        deltaX = 0;
    });
    
    tariffsFlex.addEventListener('touchcancel', e => {
        if (isDragging) {
            tariffsFlex.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            goToTariffSlide(currentTariffSlide);
            isDragging = false;
            deltaX = 0;
        }
    });

    // Функция для пересчета позиций при изменении размера окна
    function recalculateTariffPositions() {
        if (isTariffTransitioning) return;
        
        // Пересчитываем позицию текущего слайда с новыми размерами
        const slideWidth = tariffsSlides[0].offsetWidth;
        const gap = 8;
        const totalOffset = currentTariffSlide * (slideWidth + gap);
        
        // Центрируем слайд относительно контейнера
        const container = tariffsFlex.parentElement;
        const containerWidth = container.offsetWidth;
        const slideCenter = totalOffset + slideWidth / 2;
        const containerCenter = containerWidth / 2;
        const centeringOffset = containerCenter - slideCenter;
        
        // Добавляем небольшое смещение для лучшего визуального центрирования
        const visualOffset = centeringOffset - 20;
        
        // Применяем новую позицию без анимации
        tariffsFlex.style.transition = 'none';
        tariffsFlex.style.transform = `translateX(${visualOffset}px)`;
        
        // Восстанавливаем анимацию
        setTimeout(() => {
            tariffsFlex.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        }, 10);
    }

    // Слушатель изменения размера окна
    let resizeTimeout;
    window.addEventListener('resize', function() {
        // Используем debounce для оптимизации производительности
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            recalculateTariffPositions();
        }, 150); // Задержка 150мс
    });

    // Инициализация
    renderTariffDots();
    updateTariffDots();
    
    // Начинаем со второго тарифа (Standard) и центрируем его
    setTimeout(() => {
        goToTariffSlide(1);
    }, 50);
});
