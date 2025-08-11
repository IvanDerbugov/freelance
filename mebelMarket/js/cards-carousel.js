// cards-carousel.js - Карусель для карточек товаров

class CardsCarousel {
    constructor() {
        this.currentIndex = 0;
        this.totalCards = 5;
        this.visibleCards = 4;
        this.carouselWrapper = document.querySelector('.best-works-carousel-wrapper');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        
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
    }

    bindEvents() {
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
    }

    nextSlide() {
        if (this.currentIndex < this.totalCards - this.visibleCards) {
            this.currentIndex++;
            this.updateCarousel();
            this.updateButtons();
        }
    }

    prevSlide() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updateCarousel();
            this.updateButtons();
        }
    }

    updateCarousel() {
        const cardWidth = 259; // Ширина карточки
        const gap = 50; // Промежуток между карточками (обновлен)
        const translateX = -(this.currentIndex * (cardWidth + gap));
        
        this.carouselWrapper.style.transform = `translateX(${translateX}px)`;
        
        // Обновляем видимость 5-й карточки
        const fifthCard = this.carouselWrapper.querySelector('.cardBestWorks:nth-child(5)');
        if (fifthCard) {
            if (this.currentIndex > 0) {
                fifthCard.classList.add('visible');
            } else {
                fifthCard.classList.remove('visible');
            }
        }
    }

    updateButtons() {
        // Кнопка "Назад"
        this.prevBtn.disabled = this.currentIndex === 0;
        
        // Кнопка "Вперед"
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
