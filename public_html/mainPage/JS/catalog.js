// catalog.js - Функциональность каталога с кнопкой "Показать больше/Скрыть"

document.addEventListener('DOMContentLoaded', function() {
    const seeMoreBtn = document.getElementById('seeMore');
    const hiddenCards = document.querySelectorAll('.catologCard:nth-child(n+9):nth-child(-n+24)');
    let isExpanded = false;

    if (seeMoreBtn && hiddenCards.length > 0) {
        seeMoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (!isExpanded) {
                // Показываем скрытые карточки с задержкой
                hiddenCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('show');
                    }, index * 50); // Задержка 50ms между карточками
                });
                
                // Меняем текст кнопки
                seeMoreBtn.textContent = 'Скрыть';
                seeMoreBtn.style.marginTop = '65px';
                isExpanded = true;
            } else {
                // Скрываем карточки с задержкой
                hiddenCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.remove('show');
                    }, index * 30); // Быстрее скрываем
                });
                
                // Меняем текст кнопки обратно
                seeMoreBtn.textContent = 'Показать больше';
                seeMoreBtn.style.marginTop = '-165px';
                isExpanded = false;
            }
        });
    }
}); 