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
});






