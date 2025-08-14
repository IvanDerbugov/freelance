// catalog.js - Функциональность каталога с кнопкой "Показать больше/Скрыть"

document.addEventListener('DOMContentLoaded', function() {
    const seeMoreBtn = document.getElementById('seeMore');
    let isExpanded = false;

    // Функция для получения правильного селектора в зависимости от размера экрана
    function getHiddenCardsSelector() {
        if (window.innerWidth <= 1100) {
            // Для экранов 1100px и меньше - скрываем карточки с 7-й по 24-ю
            return '.catologCard:nth-child(n+7):nth-child(-n+24)';
        } else {
            // Для больших экранов - скрываем карточки с 9-й по 24-ю
            return '.catologCard:nth-child(n+9):nth-child(-n+24)';
        }
    }

    // Функция для получения скрытых карточек
    function getHiddenCards() {
        return document.querySelectorAll(getHiddenCardsSelector());
    }

    // Функция для обработки клика
    function handleClick(e) {
        e.preventDefault();
        const hiddenCards = getHiddenCards();
        
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
            const isMobile743 = window.innerWidth <= 743;
            const isMobile1100 = window.innerWidth <= 1100;
            seeMoreBtn.textContent = 'Показать больше';
            seeMoreBtn.style.marginTop = isMobile743 ? '-1040px' : isMobile1100 ? '-500px' : '-165px';
            isExpanded = false;
        }
    }

    // Инициализация
    if (seeMoreBtn) {
        const hiddenCards = getHiddenCards();
        
        if (hiddenCards.length > 0) {
            seeMoreBtn.addEventListener('click', handleClick);
        }
    }

    // Обработка изменения медиа-запросов
    const mediaQuery743 = window.matchMedia('(max-width: 743px)');
    const mediaQuery1100 = window.matchMedia('(max-width: 1100px)');

    function handleMediaChange() {
        const hiddenCards = getHiddenCards();
        
        // Если карточки были развернуты, сбрасываем состояние
        if (isExpanded) {
            hiddenCards.forEach(card => {
                card.classList.remove('show');
            });
            
            const isMobile743 = window.innerWidth <= 743;
            const isMobile1100 = window.innerWidth <= 1100;
            
            seeMoreBtn.textContent = 'Показать больше';
            seeMoreBtn.style.marginTop = isMobile743 ? '-1040px' : isMobile1100 ? '-500px' : '-165px';
            isExpanded = false;
        }
    }

    // Функция для пересчета marginTop при изменении размера экрана
    function updateMarginTop() {
        if (!isExpanded) {
            const isMobile743 = window.innerWidth <= 743;
            const isMobile1100 = window.innerWidth <= 1100;
            seeMoreBtn.style.marginTop = isMobile743 ? '-1040px' : isMobile1100 ? '-500px' : '-165px';
        }
    }

    // Слушаем изменения медиа-запросов
    mediaQuery743.addEventListener('change', handleMediaChange);
    mediaQuery1100.addEventListener('change', handleMediaChange);

    // Дополнительно слушаем resize для пересчета marginTop
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(updateMarginTop, 100);
    });
}); 