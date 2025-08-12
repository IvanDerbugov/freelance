// cards-carousel.js - Карусель для карточек товаров

class CardsCarousel {
    constructor() {
        this.currentIndex = 0;
        this.totalCards = 10; // Обновлено: теперь 10 карточек
        this.visibleCards = 4; // Оставляем 4 видимыми одновременно
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
        const gap = 50; // Промежуток между карточками
        const translateX = -(this.currentIndex * (cardWidth + gap));
        
        this.carouselWrapper.style.transform = `translateX(${translateX}px)`;
        
        // Обновляем видимость карточек после 4-й
        for (let i = 4; i < this.totalCards; i++) {
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
        
        // Кнопка "Вперед" - теперь можно пролистать до 6-й позиции (чтобы показать карточки 7-10)
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
