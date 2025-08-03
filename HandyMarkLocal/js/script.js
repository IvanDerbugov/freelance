// Создание бегущей строки
document.addEventListener('DOMContentLoaded', function() {
    const marqueeContainer = document.querySelector('.orange-bar-content');
    
    // Удаляем первый span (шаблон)
    marqueeContainer.innerHTML = '';
    
    // Создаем 1000 спанов
    for (let i = 0; i < 1000; i++) {
        const span = document.createElement('span');
        span.textContent = 'HandyMark';
        marqueeContainer.appendChild(span);
    }
}); 



// Before & After - плавная анимация с задержкой
document.getElementById('arrowSeeMore').addEventListener('click', function() {
    const beforeAfterCards = document.querySelectorAll('.BeforeAfter-card-hidden');
    const arrow = document.getElementById('arrowSeeMore');
    
    // Проверяем текущее состояние
    if (beforeAfterCards[0].style.display === 'block') {
        // Если карточки показаны - скрываем их с задержкой
        beforeAfterCards.forEach((card, index) => {
            setTimeout(() => {
                // Сначала добавляем класс для анимации скрытия
                card.classList.add('hiding');
                // Затем скрываем после завершения анимации
                setTimeout(() => {
                    card.style.display = 'none';
                    card.classList.remove('hiding');
                }, 300); // Время анимации
            }, index * 30); // Быстрее скрываем
        });
        arrow.style.transform = 'rotate(0deg)';
    } else {
        // Если карточки скрыты - показываем их с задержкой
        beforeAfterCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.display = 'block';
            }, index * 50); // Задержка 50ms между карточками
        });
        arrow.style.transform = 'rotate(180deg)';
    }
});


// Reviews - обработка кликов на "learn more"
document.addEventListener('DOMContentLoaded', function() {
    const learnMoreButtons = document.querySelectorAll('.learnMore');
    
    learnMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const reviewCard = this.closest('.reviews-card');
            const shortText = reviewCard.querySelector('.review-text-short');
            const fullText = reviewCard.querySelector('.review-text-full');
            const arrow = this.querySelector('svg');
            
            if (fullText.style.display === 'none') {
                // Показываем полный отзыв
                shortText.style.display = 'none';
                fullText.style.display = 'block';
                this.classList.add('toBottom');
                arrow.style.transform = 'rotate(180deg)';
            } else {
                // Показываем короткий отзыв
                shortText.style.display = 'block';
                fullText.style.display = 'none';
                this.classList.remove('toBottom');
                arrow.style.transform = 'rotate(0deg)';
            }
        });
    });
    
    // Инициализация состояния отзывов при загрузке
    const isMobile = window.innerWidth <= 1000;
    const additionalReviewCards = document.querySelectorAll('.reviews-card:nth-child(n+3):not(.reviews-card-hidden)');
    const hiddenReviewCards = document.querySelectorAll('.reviews-card-hidden');
    const arrow = document.getElementById('arrowSeeMoreReviews');
    
    if (isMobile) {
        // На мобильных устройствах НЕ устанавливаем inline стили для отзывов 3-6
        // Они будут скрыты CSS медиазапросом
        additionalReviewCards.forEach(card => {
            card.style.display = '';
        });
        // Скрываем полностью скрытые отзывы (7-12)
        hiddenReviewCards.forEach(card => {
            card.style.display = 'none';
        });
        arrow.style.transform = 'rotate(0deg)';
    } else {
        // На десктопе показываем все видимые отзывы (1-6), скрываем только полностью скрытые (7-12)
        additionalReviewCards.forEach(card => {
            card.style.display = 'block';
        });
        hiddenReviewCards.forEach(card => {
            card.style.display = 'none';
        });
        arrow.style.transform = 'rotate(0deg)';
    }
});

// Reviews - разворачивание скрытых карточек с плавной анимацией
document.getElementById('arrowSeeMoreReviews').addEventListener('click', function() {
    const arrow = document.getElementById('arrowSeeMoreReviews');
    const isMobile = window.innerWidth <= 1000;
    
    if (isMobile) {
        // На мобильных устройствах показываем отзывы 3-6 (которые скрыты CSS)
        const additionalReviewCards = document.querySelectorAll('.reviews-card:nth-child(n+3):not(.reviews-card-hidden)');
        const hiddenReviewCards = document.querySelectorAll('.reviews-card-hidden');
        
        // Проверяем текущее состояние по первому дополнительному отзыву
        // На мобильных проверяем, есть ли inline стиль display: block
        if (additionalReviewCards[0] && additionalReviewCards[0].style.display === 'block') {
            // Если карточки показаны - скрываем их с задержкой
            additionalReviewCards.forEach((card, index) => {
                setTimeout(() => {
                    // Сначала добавляем класс для анимации скрытия
                    card.classList.add('hiding');
                    // Затем скрываем после завершения анимации
                    setTimeout(() => {
                        card.style.display = 'none';
                        card.classList.remove('hiding');
                    }, 300); // Время анимации
                }, index * 30);
            });
            hiddenReviewCards.forEach((card, index) => {
                setTimeout(() => {
                    // Сначала добавляем класс для анимации скрытия
                    card.classList.add('hiding');
                    // Затем скрываем после завершения анимации
                    setTimeout(() => {
                        card.style.display = 'none';
                        card.classList.remove('hiding');
                    }, 300); // Время анимации
                }, (additionalReviewCards.length + index) * 30);
            });
            arrow.style.transform = 'rotate(0deg)';
        } else {
            // Если карточки скрыты CSS - показываем их с задержкой
            additionalReviewCards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.display = 'block';
                }, index * 50);
            });
            hiddenReviewCards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.display = 'block';
                }, (additionalReviewCards.length + index) * 50);
            });
            arrow.style.transform = 'rotate(180deg)';
        }
    } else {
        // На десктопе показываем только скрытые отзывы (7-12)
        const hiddenReviewCards = document.querySelectorAll('.reviews-card-hidden');
        
        // Проверяем текущее состояние
        if (hiddenReviewCards[0] && hiddenReviewCards[0].style.display === 'block') {
            // Если карточки показаны - скрываем их с задержкой
            hiddenReviewCards.forEach((card, index) => {
                setTimeout(() => {
                    // Сначала добавляем класс для анимации скрытия
                    card.classList.add('hiding');
                    // Затем скрываем после завершения анимации
                    setTimeout(() => {
                        card.style.display = 'none';
                        card.classList.remove('hiding');
                    }, 300); // Время анимации
                }, index * 30);
            });
            arrow.style.transform = 'rotate(0deg)';
        } else {
            // Если карточки скрыты - показываем их с задержкой
            hiddenReviewCards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.display = 'block';
                }, index * 50);
            });
            arrow.style.transform = 'rotate(180deg)';
        }
    }
});

// Обработчик изменения размера окна для корректной работы отзывов
window.addEventListener('resize', function() {
    const isMobile = window.innerWidth <= 1000;
    const additionalReviewCards = document.querySelectorAll('.reviews-card:nth-child(n+3):not(.reviews-card-hidden)');
    const hiddenReviewCards = document.querySelectorAll('.reviews-card-hidden');
    const arrow = document.getElementById('arrowSeeMoreReviews');
    
    if (isMobile) {
        // При переходе на мобильную версию НЕ устанавливаем inline стили
        // CSS медиазапрос сам скроет отзывы 3-6
        additionalReviewCards.forEach(card => {
            card.style.display = '';
        });
        hiddenReviewCards.forEach(card => {
            card.style.display = 'none';
        });
        arrow.style.transform = 'rotate(0deg)';
    } else {
        // При переходе на десктоп показываем дополнительные отзывы
        additionalReviewCards.forEach(card => {
            card.style.display = 'block';
        });
        hiddenReviewCards.forEach(card => {
            card.style.display = 'none';
        });
        arrow.style.transform = 'rotate(0deg)';
    }
});






