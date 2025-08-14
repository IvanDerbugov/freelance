// our-works-carousel.js - Карусель для секции "Наши работы"

class OurWorksCarousel {
    constructor() {
        this.currentIndex = 0;
        this.totalCards = 16; // 16 карточек
        this.visibleCards = 4; // 4 видимых одновременно
        this.carouselWrapper = document.querySelector('.our-works-carousel-wrapper');
        this.prevBtn = document.getElementById('ourWorksPrevBtn');
        this.nextBtn = document.getElementById('ourWorksNextBtn');
        
        this.init();
    }

    init() {
        if (!this.carouselWrapper || !this.prevBtn || !this.nextBtn) {
            console.warn('Our Works Carousel elements not found');
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
        const cardWidth = 280; // Ширина карточки 280px
        const gap = 40; // Промежуток между карточками 40px
        const translateX = -(this.currentIndex * (cardWidth + gap));
        
        this.carouselWrapper.style.transform = `translateX(${translateX}px)`;
        
        // Обновляем видимость карточек после 4-й
        for (let i = 4; i < this.totalCards; i++) {
            const card = this.carouselWrapper.querySelector(`.cardOurWorks:nth-child(${i + 1})`);
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
        
        // Кнопка "Вперед" - можно пролистать до 12-й позиции (чтобы показать карточки 13-16)
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
    new OurWorksCarousel();
});

// Экспорт для использования в других модулях
if (typeof module !== 'undefined' && module.exports) {
    module.exports = OurWorksCarousel;
}
