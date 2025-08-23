// cards-carousel.js - Карусель для карточек товаров

class CardsCarousel {
    constructor() {
        this.currentIndex = 0;
        this.totalCards = 10; // Обновлено: теперь 10 карточек
        this.visibleCards = 3; // Обновлено: теперь 3 видимых одновременно
        this.carouselWrapper = document.querySelector('.best-works-carousel-wrapper');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        
        // Адаптивные настройки для разных экранов
        this.breakpoints = {
            5000: { visibleCards: 3, cardWidth: 320, gap: 30, step: 0.75 },
            1400: { visibleCards: 3, cardWidth: 320, gap: 30, step: 1.05 },
            1200: { visibleCards: 3, cardWidth: 260, gap: 43, step: 0.5 },
            1100: { visibleCards: 3, cardWidth: 280, gap: 30, step: 0.5 },
            992: { visibleCards: 2, cardWidth: 400, gap: 30, step: 1 },
            768: { visibleCards: 2, cardWidth: 350, gap: 25, step: 1 },
            576: { visibleCards: 1, cardWidth: 400, gap: 20, step: 1 }
        };
        
        this.init();
    }

    init() {
        if (!this.carouselWrapper || !this.prevBtn || !this.nextBtn) {
            console.warn('Carousel elements not found');
            return;
        }

        this.updateButtons();
        this.bindEvents();
        this.updateCarousel();
        
        // Добавляем слушатель изменения размера окна
        window.addEventListener('resize', () => {
            this.updateCarousel();
            this.updateButtons();
        });
    }

    // Метод для получения текущих адаптивных настроек
    getCurrentBreakpoint() {
        const width = window.innerWidth;
        
        if (width >= 5000) return this.breakpoints[5000];
        if (width >= 1400) return this.breakpoints[1400];
        if (width >= 1200) return this.breakpoints[1200];
        if (width >= 1100) return this.breakpoints[1100];
        if (width >= 992) return this.breakpoints[992];
        if (width >= 768) return this.breakpoints[768];
        if (width >= 576) return this.breakpoints[576];
        
        return this.breakpoints[576]; // По умолчанию для очень маленьких экранов
    }

    bindEvents() {
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
    }

    nextSlide() {
        const breakpoint = this.getCurrentBreakpoint();
        const maxIndex = this.totalCards - this.visibleCards;
        
        if (this.currentIndex < maxIndex) {
            this.currentIndex = Math.min(this.currentIndex + breakpoint.step, maxIndex);
            this.updateCarousel();
            this.updateButtons();
        }
    }

    prevSlide() {
        const breakpoint = this.getCurrentBreakpoint();
        
        if (this.currentIndex > 0) {
            this.currentIndex = Math.max(this.currentIndex - breakpoint.step, 0);
            this.updateCarousel();
            this.updateButtons();
        }
    }

    updateCarousel() {
        const breakpoint = this.getCurrentBreakpoint();
        this.visibleCards = breakpoint.visibleCards;
        
        const cardWidth = breakpoint.cardWidth;
        const gap = breakpoint.gap;
        const step = breakpoint.step;
        
        // Более плавное движение с учетом step
        const translateX = -(this.currentIndex * (cardWidth + gap) * step);
        
        this.carouselWrapper.style.transform = `translateX(${translateX}px)`;
        
        // Обновляем видимость карточек после количества видимых
        for (let i = this.visibleCards; i < this.totalCards; i++) {
            const card = this.carouselWrapper.querySelector(`.cardBestWorks:nth-child(${i + 1})`);
            if (card) {
                if (this.currentIndex > 0) {
                    card.classList.add('visible');
                } else {
                    card.classList.remove('visible');
                }
            }
        }
    }

    updateButtons() {
        // Кнопка "Назад"
        this.prevBtn.disabled = this.currentIndex === 0;
        
        // Кнопка "Вперед" - адаптивная логика для разных экранов
        this.nextBtn.disabled = this.currentIndex >= this.totalCards - this.visibleCards;
    }

    // Метод для получения текущего состояния
    getCurrentState() {
        return {
            currentIndex: this.currentIndex,
            totalCards: this.totalCards,
            visibleCards: this.visibleCards,
            canGoPrev: this.currentIndex > 0,
            canGoNext: this.currentIndex < this.totalCards - this.visibleCards
        };
    }

    // Метод для перехода к конкретной карточке
    goToSlide(index) {
        if (index >= 0 && index <= this.totalCards - this.visibleCards) {
            this.currentIndex = index;
            this.updateCarousel();
            this.updateButtons();
        }
    }

    // Метод для сброса к началу
    reset() {
        this.currentIndex = 0;
        this.updateCarousel();
        this.updateButtons();
    }
}

// Инициализация карусели после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    new CardsCarousel();
});

// Экспорт для использования в других модулях
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CardsCarousel;
}
