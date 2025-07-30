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
        }
    }
    
    // Добавляем обработчик скролла
    window.addEventListener('scroll', handleScroll);
    
    // Проверяем сразу при загрузке страницы
    handleScroll();
});
