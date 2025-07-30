// Animate.css scroll-triggered animations (excluding header and form)
document.addEventListener('DOMContentLoaded', function() {
    // Находим все элементы с Animate.css классами, кроме хедера и элементов формы
    const animatedElements = document.querySelectorAll('.animate__animated:not(header .animate__animated):not(.getInTouch .form .animate__animated)');
    
    // Создаем Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Когда элемент становится видимым, запускаем анимацию
                const element = entry.target;
                element.classList.remove('animate-hidden');
            }
        });
    }, {
        threshold: 0.1, // Элемент должен быть виден на 10%
        rootMargin: '0px 0px -50px 0px' // Запускаем анимацию немного раньше
    });
    
    // Скрываем все анимации по умолчанию и наблюдаем за элементами
    animatedElements.forEach(element => {
        element.classList.add('animate-hidden');
        observer.observe(element);
    });
});
