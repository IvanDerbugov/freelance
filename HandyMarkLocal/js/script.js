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



// Before & After
document.getElementById('arrowSeeMore').addEventListener('click', function() {
    const beforeAfterCards = document.querySelectorAll('.BeforeAfter-card-hidden');
    const arrow = document.getElementById('arrowSeeMore');
    
    // Проверяем текущее состояние
    if (beforeAfterCards[0].style.display === 'block') {
        // Если карточки показаны - скрываем их
        beforeAfterCards.forEach(card => {
            card.style.display = 'none';
        });
        arrow.style.transform = 'rotate(0deg)';
    } else {
        // Если карточки скрыты - показываем их
        beforeAfterCards.forEach(card => {
            card.style.display = 'block';
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
        // На мобильных устройствах скрываем дополнительные отзывы (3-6)
        additionalReviewCards.forEach(card => {
            card.style.display = 'none';
        });
        // Скрываем полностью скрытые отзывы (7-12)
        hiddenReviewCards.forEach(card => {
            card.style.display = 'none';
        });
        arrow.style.transform = 'rotate(0deg)';
    } else {
        // На десктопе показываем все видимые отзывы (1-6), скрываем только полностью скрытые (7-12)
        additionalReviewCards.forEach(card => {
            card.style.display = '';
        });
        hiddenReviewCards.forEach(card => {
            card.style.display = 'none';
        });
        arrow.style.transform = 'rotate(0deg)';
    }
});

// Reviews - разворачивание скрытых карточек
document.getElementById('arrowSeeMoreReviews').addEventListener('click', function() {
    const arrow = document.getElementById('arrowSeeMoreReviews');
    const isMobile = window.innerWidth <= 1000;
    
    if (isMobile) {
        // На мобильных устройствах показываем отзывы 3-6 (которые скрыты CSS)
        const additionalReviewCards = document.querySelectorAll('.reviews-card:nth-child(n+3):not(.reviews-card-hidden)');
        const hiddenReviewCards = document.querySelectorAll('.reviews-card-hidden');
        
        // Проверяем текущее состояние по первому дополнительному отзыву
        if (additionalReviewCards[0] && additionalReviewCards[0].style.display === 'block') {
            // Если карточки показаны - скрываем их
            additionalReviewCards.forEach(card => {
                card.style.display = 'none';
            });
            hiddenReviewCards.forEach(card => {
                card.style.display = 'none';
            });
            arrow.style.transform = 'rotate(0deg)';
        } else {
            // Если карточки скрыты - показываем их
            additionalReviewCards.forEach(card => {
                card.style.display = 'block';
            });
            hiddenReviewCards.forEach(card => {
                card.style.display = 'block';
            });
            arrow.style.transform = 'rotate(180deg)';
        }
    } else {
        // На десктопе показываем только скрытые отзывы (7-12)
        const hiddenReviewCards = document.querySelectorAll('.reviews-card-hidden');
        
        // Проверяем текущее состояние
        if (hiddenReviewCards[0] && hiddenReviewCards[0].style.display === 'block') {
            // Если карточки показаны - скрываем их
            hiddenReviewCards.forEach(card => {
                card.style.display = 'none';
            });
            arrow.style.transform = 'rotate(0deg)';
        } else {
            // Если карточки скрыты - показываем их
            hiddenReviewCards.forEach(card => {
                card.style.display = 'block';
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
        // При переходе на мобильную версию сбрасываем состояние
        additionalReviewCards.forEach(card => {
            card.style.display = '';
        });
        hiddenReviewCards.forEach(card => {
            card.style.display = 'none';
        });
        arrow.style.transform = 'rotate(0deg)';
    } else {
        // При переходе на десктоп сбрасываем состояние
        additionalReviewCards.forEach(card => {
            card.style.display = '';
        });
        hiddenReviewCards.forEach(card => {
            card.style.display = 'none';
        });
        arrow.style.transform = 'rotate(0deg)';
    }
});






