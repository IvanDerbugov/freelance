// Animate.css scroll-triggered animations (excluding header and form)
document.addEventListener('DOMContentLoaded', function() {
    // Находим все элементы с Animate.css классами, кроме хедера и формы
    const animatedElements = document.querySelectorAll('.animate__animated:not(header .animate__animated):not(.getInTouch .animate__animated)');
    
    // Создаем Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Когда элемент становится видимым, запускаем анимацию
                const element = entry.target;
                element.style.animationPlayState = 'running';
            }
        });
    }, {
        threshold: 0.1, // Элемент должен быть виден на 10%
        rootMargin: '0px 0px -50px 0px' // Запускаем анимацию немного раньше
    });
    
    // Останавливаем все анимации по умолчанию и наблюдаем за элементами
    animatedElements.forEach(element => {
        element.style.animationPlayState = 'paused';
        observer.observe(element);
    });
});
