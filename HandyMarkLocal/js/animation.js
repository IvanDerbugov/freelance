// Header animations
document.addEventListener('DOMContentLoaded', function() {
    const headerSection = document.querySelector('header');
    const contactFormSection = document.querySelector('.getInTouch'); // Исправлен селектор
    
    // Функция для проверки видимости элемента
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Функция для обработки скролла
    function handleScroll() {
        if (headerSection && isElementInViewport(headerSection)) {
            headerSection.classList.add('animate');
        }
        
        if (contactFormSection && isElementInViewport(contactFormSection)) {
            contactFormSection.classList.add('animate');
            // Изменяем z-index с -1 на 0 при срабатывании анимации
            contactFormSection.style.zIndex = '0';
        }

        // Анимация для Before & After карточек на мобилке
        if (window.innerWidth <= 600) {
            const beforeAfterCards = document.querySelectorAll('.BeforeAfter-card');
            beforeAfterCards.forEach((card, index) => {
                if (isElementInViewport(card)) {
                    // Добавляем задержку для каждой карточки
                    setTimeout(() => {
                        card.classList.add('animate');
                    }, index * 200); // 200ms задержка между карточками
                }
            });
        }
    }
    
    // Добавляем обработчик скролла
    window.addEventListener('scroll', handleScroll);
    
    // Проверяем сразу при загрузке страницы
    handleScroll();

    // Обработчик изменения размера окна
    window.addEventListener('resize', function() {
        // Сбрасываем анимацию при переходе с мобильной на десктопную версию
        if (window.innerWidth > 600) {
            const beforeAfterCards = document.querySelectorAll('.BeforeAfter-card');
            beforeAfterCards.forEach(card => {
                card.classList.remove('animate');
            });
        }
    });
});
