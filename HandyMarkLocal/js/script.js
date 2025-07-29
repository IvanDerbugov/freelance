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