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
        touch: true // Включаем поддержку свайпов
    });

    console.log('Bootstrap карусель инициализирована');

    // Добавляем только свайпы, не трогаем точки
    let startX = 0;
    let isDragging = false;
    let deltaX = 0;

    function onCarouselDragStart(e) {
        // Не начинаем свайп, если кликнули на точку или якорь-ссылку
        if (e.target.closest('.carousel-indicators') || e.target.closest('a[href^="#"]')) {
            console.log('Клик по точке или ссылке, свайп отменен');
            return;
        }
        isDragging = true;
        startX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        console.log('Начало свайпа');
    }

    function onCarouselDragMove(e) {
        if (!isDragging) return;
        const x = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        deltaX = x - startX;
    }

    function onCarouselDragEnd() {
        if (!isDragging) return;
        
        const threshold = 50; // Порог для свайпа
        
        if (Math.abs(deltaX) > threshold) {
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
        deltaX = 0;
    }

    // Добавляем обработчики событий только для свайпов
    carousel.addEventListener('mousedown', onCarouselDragStart);
    carousel.addEventListener('mousemove', onCarouselDragMove);
    carousel.addEventListener('mouseup', onCarouselDragEnd);
    carousel.addEventListener('mouseleave', onCarouselDragEnd);
    
    // Touch события для мобильных устройств
    carousel.addEventListener('touchstart', e => {
        // Не начинаем свайп, если кликнули на точку или якорь-ссылку
        if (e.target.closest('.carousel-indicators') || e.target.closest('a[href^="#"]')) {
            console.log('Touch по точке или ссылке, свайп отменен');
            return;
        }
        isDragging = true;
        startX = e.touches[0].clientX;
        e.preventDefault(); // Предотвращаем скролл страницы
        console.log('Начало touch свайпа');
    }, { passive: false });
    
    carousel.addEventListener('touchmove', e => {
        if (!isDragging) return;
        e.preventDefault(); // Предотвращаем скролл страницы
        const x = e.touches[0].clientX;
        deltaX = x - startX;
    }, { passive: false });
    
    carousel.addEventListener('touchend', e => {
        if (!isDragging) return;
        
        const threshold = 30; // Уменьшенный порог для мобильных
        
        if (Math.abs(deltaX) > threshold) {
            if (deltaX < 0) {
                // Свайп влево - следующий слайд
                console.log('Touch свайп влево, следующий слайд');
                bsCarousel.next();
            } else {
                // Свайп вправо - предыдущий слайд
                console.log('Touch свайп вправо, предыдущий слайд');
                bsCarousel.prev();
            }
        }
        
        isDragging = false;
        deltaX = 0;
    });
    
    carousel.addEventListener('touchcancel', e => {
        if (isDragging) {
            isDragging = false;
            deltaX = 0;
        }
    });

    // Начинаем со второго тарифа (Standard)
    setTimeout(() => {
        bsCarousel.to(1);
        console.log('Переключились на второй тариф');
    }, 100);
});
