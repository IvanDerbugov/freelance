document.addEventListener('DOMContentLoaded', function() {
    // Получаем элементы галереи
    const bigImage = document.querySelector('.bigImg img');
    const littleImages = document.querySelectorAll('.littleImg div');
    
    // Массив с путями к большим изображениям
    const bigImages = [
        'img/galleryBig1.jpg',
        'img/galleryBig2.jpg', 
        'img/galleryBig3.jpg',
        'img/galleryBig4.jpg',
        'img/galleryBig5.jpg',
        'img/galleryBig6.jpg',
        'img/galleryBig7.jpg'
    ];
    
    // Функция для смены активного состояния
    function setActiveImage(index) {
        // Убираем активный класс у всех маленьких изображений
        littleImages.forEach(img => {
            img.classList.remove('littleImgActive');
        });
        
        // Добавляем активный класс к выбранному изображению
        littleImages[index].classList.add('littleImgActive');
        
        // Меняем большое изображение
        bigImage.src = bigImages[index];
    }
    
    // Добавляем обработчики кликов для каждого маленького изображения
    littleImages.forEach((img, index) => {
        img.addEventListener('click', function() {
            setActiveImage(index);
        });
    });
}); 