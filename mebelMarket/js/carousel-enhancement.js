// carousel-enhancement.js - Улучшение функциональности карусели Bootstrap

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация карусели с поддержкой свайпов
    const carousel = document.getElementById('carouselExampleAutoplaying');
    
    if (carousel) {
        // Создаем экземпляр карусели Bootstrap
        const bsCarousel = new bootstrap.Carousel(carousel, {
            interval: 4000,
            wrap: true,
            keyboard: true,
            pause: 'hover',
            touch: true // Включаем поддержку касаний
        });

        // Добавляем поддержку свайпов для мобильных устройств и компьютеров
        let startX = 0;
        let endX = 0;
        let isDragging = false;
        let currentTranslateX = 0;
        let prevTranslateX = 0;
        let animationID = 0;
        let isAnimating = false;

        // Обработчики для касаний (мобильные устройства)
        carousel.addEventListener('touchstart', function(e) {
            // Игнорируем касания по кнопкам навигации
            if (e.target.closest('.carousel-control-prev') || e.target.closest('.carousel-control-next')) {
                return;
            }
            
            startX = e.touches[0].clientX;
            isDragging = true;
            isAnimating = false;
            cancelAnimationFrame(animationID);
            
            // Останавливаем автопрокрутку
            bsCarousel.pause();
        }, { passive: true });

        carousel.addEventListener('touchmove', function(e) {
            if (!isDragging) return;
            
            const currentX = e.touches[0].clientX;
            const diffX = currentX - startX;
            
            // Плавно перемещаем слайд
            currentTranslateX = prevTranslateX + diffX;
            setTransform(currentTranslateX);
        }, { passive: true });

        carousel.addEventListener('touchend', function(e) {
            if (!isDragging) return;
            
            endX = e.changedTouches[0].clientX;
            const diffX = startX - endX;
            const threshold = 100; // Увеличиваем порог для плавности
            
            if (Math.abs(diffX) > threshold) {
                if (diffX > 0) {
                    // Свайп влево - следующий слайд
                    slideToNext();
                } else {
                    // Свайп вправо - предыдущий слайд
                    slideToPrev();
                }
            } else {
                // Возвращаем слайд на место
                slideToCurrent();
            }
            
            isDragging = false;
            // Возобновляем автопрокрутку
            bsCarousel.cycle();
        }, { passive: true });

        // Обработчики для мыши (компьютеры)
        carousel.addEventListener('mousedown', function(e) {
            // Игнорируем клики по кнопкам навигации
            if (e.target.closest('.carousel-control-prev') || e.target.closest('.carousel-control-next')) {
                return;
            }
            
            startX = e.clientX;
            isDragging = true;
            isAnimating = false;
            cancelAnimationFrame(animationID);
            carousel.style.cursor = 'grabbing';
            
            // Останавливаем автопрокрутку
            bsCarousel.pause();
        });

        carousel.addEventListener('mousemove', function(e) {
            if (!isDragging) return;
            
            const currentX = e.clientX;
            const diffX = currentX - startX;
            
            // Плавно перемещаем слайд
            currentTranslateX = prevTranslateX + diffX;
            setTransform(currentTranslateX);
        });

        carousel.addEventListener('mouseup', function(e) {
            if (!isDragging) return;
            
            endX = e.clientX;
            const diffX = startX - endX;
            const threshold = 100; // Увеличиваем порог для плавности
            
            if (Math.abs(diffX) > threshold) {
                if (diffX > 0) {
                    // Свайп влево - следующий слайд
                    slideToNext();
                } else {
                    // Свайп вправо - предыдущий слайд
                    slideToPrev();
                }
            } else {
                // Возвращаем слайд на место
                slideToCurrent();
            }
            
            isDragging = false;
            carousel.style.cursor = 'grab';
            // Возобновляем автопрокрутку
            bsCarousel.cycle();
        });

        // Обработчик для выхода мыши за пределы карусели
        carousel.addEventListener('mouseleave', function(e) {
            if (isDragging) {
                isDragging = false;
                carousel.style.cursor = 'grab';
                // Возвращаем слайд на место
                slideToCurrent();
                // Возобновляем автопрокрутку
                bsCarousel.cycle();
            }
        });

        // Устанавливаем курсор по умолчанию
        carousel.style.cursor = 'grab';

        // Восстанавливаем курсор при наведении на кнопки навигации
        const navButtons = carousel.querySelectorAll('.carousel-control-prev, .carousel-control-next');
        navButtons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                carousel.style.cursor = 'default';
            });
            
            button.addEventListener('mouseleave', function() {
                if (!isDragging) {
                    carousel.style.cursor = 'grab';
                }
            });
        });

        // Функции для плавной анимации
        function setTransform(translateX) {
            const carouselInner = carousel.querySelector('.carousel-inner');
            if (carouselInner) {
                carouselInner.style.transform = `translateX(${translateX}px)`;
                carouselInner.style.transition = 'none';
            }
        }

        function slideToNext() {
            if (isAnimating) return;
            isAnimating = true;
            
            const carouselInner = carousel.querySelector('.carousel-inner');
            if (carouselInner) {
                carouselInner.style.transition = 'transform 0.3s ease-out';
                carouselInner.style.transform = 'translateX(-100%)';
                
                setTimeout(() => {
                    bsCarousel.next();
                    carouselInner.style.transition = 'none';
                    carouselInner.style.transform = 'translateX(0)';
                    currentTranslateX = 0;
                    prevTranslateX = 0;
                    isAnimating = false;
                }, 300);
            }
        }

        function slideToPrev() {
            if (isAnimating) return;
            isAnimating = true;
            
            const carouselInner = carousel.querySelector('.carousel-inner');
            if (carouselInner) {
                carouselInner.style.transition = 'transform 0.3s ease-out';
                carouselInner.style.transform = 'translateX(100%)';
                
                setTimeout(() => {
                    bsCarousel.prev();
                    carouselInner.style.transition = 'none';
                    carouselInner.style.transform = 'translateX(0)';
                    currentTranslateX = 0;
                    prevTranslateX = 0;
                    isAnimating = false;
                }, 300);
            }
        }

        function slideToCurrent() {
            if (isAnimating) return;
            isAnimating = true;
            
            const carouselInner = carousel.querySelector('.carousel-inner');
            if (carouselInner) {
                carouselInner.style.transition = 'transform 0.3s ease-out';
                carouselInner.style.transform = 'translateX(0)';
                
                setTimeout(() => {
                    currentTranslateX = 0;
                    prevTranslateX = 0;
                    isAnimating = false;
                }, 300);
            }
        }

        // Добавляем поддержку клавиатуры
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') {
                bsCarousel.prev();
            } else if (e.key === 'ArrowRight') {
                bsCarousel.next();
            }
        });

        // Добавляем индикаторы прогресса для каждого слайда
        const indicators = carousel.querySelectorAll('.carousel-indicators button');
        const progressBars = [];
        
        indicators.forEach((indicator, index) => {
            const progressBar = document.createElement('div');
            progressBar.className = 'carousel-progress';
            progressBar.style.cssText = `
                position: absolute;
                bottom: 0;
                left: 0;
                height: 3px;
                background: rgba(255, 255, 255, 0.7);
                width: 0%;
                transition: width 0.1s linear;
                z-index: 10;
            `;
            
            indicator.parentNode.appendChild(progressBar);
            progressBars.push(progressBar);
        });

        // Анимация прогресса для активного слайда
        let progressInterval;
        
        function startProgress() {
            const activeIndex = Array.from(indicators).findIndex(indicator => 
                indicator.classList.contains('active')
            );
            
            if (activeIndex !== -1) {
                const progressBar = progressBars[activeIndex];
                let progress = 0;
                
                progressInterval = setInterval(() => {
                    progress += 0.1;
                    progressBar.style.width = progress + '%';
                    
                    if (progress >= 100) {
                        clearInterval(progressInterval);
                    }
                }, 40); // 4000ms / 100 = 40ms на каждый процент
            }
        }

        function resetProgress() {
            if (progressInterval) {
                clearInterval(progressInterval);
            }
            
            progressBars.forEach(bar => {
                bar.style.width = '0%';
            });
        }

        // Запускаем прогресс при смене слайда
        carousel.addEventListener('slid.bs.carousel', function() {
            resetProgress();
            startProgress();
        });

        // Запускаем прогресс для первого слайда
        startProgress();

        // Пауза при наведении мыши
        carousel.addEventListener('mouseenter', function() {
            if (progressInterval) {
                clearInterval(progressInterval);
            }
        });

        carousel.addEventListener('mouseleave', function() {
            startProgress();
        });

        console.log('Карусель инициализирована с поддержкой свайпов и прогресс-барами');
    } else {
        console.log('Карусель не найдена на странице');
    }
});
