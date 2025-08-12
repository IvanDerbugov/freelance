// reviews-carousel.js - Управление каруселью отзывов

class ReviewsCarousel {
    constructor() {
        this.currentIndex = 0;
        this.visibleCards = 4;
        this.totalCards = 0;
        this.wrapper = null;
        this.prevBtn = null;
        this.nextBtn = null;
        this.cardWidth = this.getCardWidth();
        this.gap = this.getGap();
        
        this.init();
    }

    init() {
        this.wrapper = document.querySelector('.reviews-carousel-wrapper');
        this.prevBtn = document.getElementById('reviewsPrevBtn');
        this.nextBtn = document.getElementById('reviewsNextBtn');
        
        if (!this.wrapper || !this.prevBtn || !this.nextBtn) {
            console.warn('Reviews carousel elements not found');
            return;
        }

        this.totalCards = this.wrapper.children.length;
        this.visibleCards = this.getVisibleCards();
        this.updateButtons();
        this.bindEvents();
        
        console.log(`Reviews carousel initialized with ${this.totalCards} cards, ${this.visibleCards} visible`);
    }

    bindEvents() {
        this.prevBtn.addEventListener('click', () => this.prev());
        this.nextBtn.addEventListener('click', () => this.next());
        
        // Добавляем поддержку свайпа для мобильных устройств
        let startX = 0;
        let currentX = 0;
        let isDragging = false;

        this.wrapper.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        });

        this.wrapper.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
        });

        this.wrapper.addEventListener('touchend', () => {
            if (!isDragging) return;
            
            const diff = startX - currentX;
            const threshold = 50;
            
            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    this.next();
                } else {
                    this.prev();
                }
            }
            
            isDragging = false;
        });

        // Обновляем размеры при изменении размера окна
        window.addEventListener('resize', () => {
            this.cardWidth = this.getCardWidth();
            this.gap = this.getGap();
            this.updateCarousel();
        });
    }

    prev() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updateCarousel();
        }
    }

    next() {
        if (this.currentIndex < this.totalCards - this.visibleCards) {
            this.currentIndex++;
            this.updateCarousel();
        }
    }

    updateCarousel() {
        const translateX = -(this.currentIndex * (this.cardWidth + this.gap));
        this.wrapper.style.transform = `translateX(${translateX}px)`;
        
        this.updateButtons();
        this.updateCardVisibility();
    }

    updateButtons() {
        this.prevBtn.disabled = this.currentIndex === 0;
        this.nextBtn.disabled = this.currentIndex >= this.totalCards - this.visibleCards;
    }

    updateCardVisibility() {
        const cards = this.wrapper.children;
        
        for (let i = 0; i < cards.length; i++) {
            const card = cards[i];
            
            if (i >= this.currentIndex && i < this.currentIndex + this.visibleCards) {
                card.classList.add('visible');
            } else {
                card.classList.remove('visible');
            }
        }
    }

    // Метод для автоматического переключения (опционально)
    startAutoPlay(interval = 5000) {
        this.autoPlayInterval = setInterval(() => {
            if (this.currentIndex >= this.totalCards - this.visibleCards) {
                this.currentIndex = 0;
            } else {
                this.currentIndex++;
            }
            this.updateCarousel();
        }, interval);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    // Метод для перехода к конкретной карточке
    goToCard(index) {
        if (index >= 0 && index <= this.totalCards - this.visibleCards) {
            this.currentIndex = index;
            this.updateCarousel();
        }
    }

    // Метод для получения информации о текущем состоянии
    getCarouselInfo() {
        return {
            currentIndex: this.currentIndex,
            totalCards: this.totalCards,
            visibleCards: this.visibleCards,
            isAtStart: this.currentIndex === 0,
            isAtEnd: this.currentIndex >= this.totalCards - this.visibleCards
        };
    }

    // Метод для определения ширины карточки в зависимости от размера экрана
    getCardWidth() {
        if (window.innerWidth <= 480) {
            return 220;
        } else if (window.innerWidth <= 768) {
            return 240;
        } else {
            return 259;
        }
    }

    // Метод для определения отступа между карточками в зависимости от размера экрана
    getGap() {
        if (window.innerWidth <= 480) {
            return 20;
        } else if (window.innerWidth <= 768) {
            return 30;
        } else {
            return 50;
        }
    }

    // Метод для определения количества видимых карточек в зависимости от размера экрана
    getVisibleCards() {
        if (window.innerWidth <= 480) {
            return 2;
        } else if (window.innerWidth <= 768) {
            return 3;
        } else {
            return 4;
        }
    }
}

// Инициализация карусели отзывов после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    new ReviewsCarousel();
});

// Экспорт для использования в других модулях
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ReviewsCarousel;
}
