document.addEventListener('DOMContentLoaded', function() {
    // Проверяем, мобильное ли устройство
    window.isMobile = window.innerWidth <= 740;
    
    if (!window.isMobile) return; // Если не мобилка, не инициализируем

    // Находим Bootstrap карусель
    const carousel = document.getElementById('carouselExampleIndicators');
    if (!carousel) {
        console.log('Карусель не найдена');
        return;
    }

    // Проверяем, что Bootstrap доступен
    if (typeof bootstrap === 'undefined') {
        console.log('Bootstrap не загружен');
        return;
    }

    // Инициализируем Bootstrap карусель
    const bsCarousel = new bootstrap.Carousel(carousel, {
        interval: false, // Отключаем автопереключение
        wrap: true, // Включаем зацикливание
        touch: false // Отключаем встроенные touch события Bootstrap
    });

    console.log('Bootstrap карусель инициализирована');

    // Добавляем только свайпы, не трогаем точки
    let startX = 0;
    let startY = 0;
    let isDragging = false;
    let deltaX = 0;
    let deltaY = 0;
    let isClick = false; // Флаг для определения клика

    function onCarouselDragStart(e) {
        // Не начинаем свайп, если кликнули на точку
        if (e.target.closest('.carousel-indicators')) {
            console.log('Клик по точке, свайп отменен');
            return;
        }
        isDragging = true;
        isClick = true; // Предполагаем, что это клик
        startX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        startY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
        console.log('Начало свайпа');
    }

    function onCarouselDragMove(e) {
        if (!isDragging) return;
        const x = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        const y = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
        deltaX = x - startX;
        deltaY = y - startY;
        
        // Если движение больше 5px, это не клик
        if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
            isClick = false;
        }
    }

    function onCarouselDragEnd() {
        if (!isDragging) return;
        
        const threshold = 30; // Уменьшенный порог для более чувствительного свайпа
        const verticalThreshold = 50; // Порог для вертикального движения
        
        // Проверяем, что движение больше горизонтальное, чем вертикальное
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > threshold && Math.abs(deltaY) < verticalThreshold) {
            if (deltaX < 0) {
                // Свайп влево - следующий слайд
                console.log('Свайп влево, следующий слайд');
                bsCarousel.next();
            } else {
                // Свайп вправо - предыдущий слайд
                console.log('Свайп вправо, предыдущий слайд');
                bsCarousel.prev();
            }
        }
        
        isDragging = false;
        isClick = false;
        deltaX = 0;
        deltaY = 0;
    }

    // Добавляем обработчики событий только для свайпов
    carousel.addEventListener('mousedown', onCarouselDragStart);
    carousel.addEventListener('mousemove', onCarouselDragMove);
    carousel.addEventListener('mouseup', onCarouselDragEnd);
    carousel.addEventListener('mouseleave', onCarouselDragEnd);
    
    // Touch события для мобильных устройств
    carousel.addEventListener('touchstart', e => {
        // Не начинаем свайп, если кликнули на точку
        if (e.target.closest('.carousel-indicators')) {
            console.log('Touch по точке, свайп отменен');
            return;
        }
        isDragging = true;
        isClick = true; // Предполагаем, что это клик
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        e.preventDefault(); // Предотвращаем скролл страницы
        e.stopPropagation(); // Останавливаем всплытие события
        console.log('Начало touch свайпа');
    }, { passive: false });
    
    carousel.addEventListener('touchmove', e => {
        if (!isDragging) return;
        e.preventDefault(); // Предотвращаем скролл страницы
        e.stopPropagation(); // Останавливаем всплытие события
        const x = e.touches[0].clientX;
        const y = e.touches[0].clientY;
        deltaX = x - startX;
        deltaY = y - startY;
        
        // Если движение больше 5px, это не клик
        if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
            isClick = false;
        }
    }, { passive: false });
    
    carousel.addEventListener('touchend', e => {
        if (!isDragging) return;
        
        const threshold = 30; // Уменьшенный порог для более чувствительного свайпа
        const verticalThreshold = 50; // Порог для вертикального движения
        
        // Проверяем, что движение больше горизонтальное, чем вертикальное
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > threshold && Math.abs(deltaY) < verticalThreshold) {
            if (deltaX < 0) {
                // Свайп влево - следующий слайд
                console.log('Touch свайп влево, следующий слайд');
                bsCarousel.next();
            } else {
                // Свайп вправо - предыдущий слайд
                console.log('Touch свайп вправо, предыдущий слайд');
                bsCarousel.prev();
            }
        } else if (isClick && e.target.closest('a[href^="#"]')) {
            // Если это был клик по ссылке, разрешаем стандартное поведение
            console.log('Клик по ссылке, разрешаем переход');
            const link = e.target.closest('a[href^="#"]');
            const href = link.getAttribute('href');
            if (href) {
                // Программно переходим по якорю
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }
        
        isDragging = false;
        isClick = false;
        deltaX = 0;
        deltaY = 0;
        e.preventDefault(); // Предотвращаем стандартное поведение
        e.stopPropagation(); // Останавливаем всплытие события
    }, { passive: false });
    
    carousel.addEventListener('touchcancel', e => {
        if (isDragging) {
            isDragging = false;
            isClick = false;
            deltaX = 0;
            deltaY = 0;
        }
    });

    // Начинаем со второго тарифа (Standard)
    setTimeout(() => {
        bsCarousel.to(1);
        console.log('Переключились на второй тариф');
    }, 100);
});
