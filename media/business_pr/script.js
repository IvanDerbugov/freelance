// Простая анимация для кнопок и элементов
document.addEventListener('DOMContentLoaded', function() {
    // Анимация появления элементов
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Применяем анимацию к элементам
    const animatedElements = document.querySelectorAll('.mockup, .text-section');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Обработка клика на кнопку CTA
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            // Здесь можно добавить логику отправки формы или переход
            alert('Спасибо за интерес! Мы свяжемся с вами в ближайшее время.');
        });
    }

    // Анимация сетки на фоне
    const pattern = document.querySelector('.background-pattern');
    if (pattern) {
        let offset = 0;
        setInterval(() => {
            offset += 0.5;
            pattern.style.backgroundPosition = `${offset}px ${offset}px`;
        }, 50);
    }
});
