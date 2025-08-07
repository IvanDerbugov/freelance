document.addEventListener('DOMContentLoaded', function() {
    // Получаем элементы галереи
    const bigImagePicture = document.querySelector('.bigImg picture');
    const bigImage = document.querySelector('.bigImg img');
    const littleImages = document.querySelectorAll('.littleImg div');
    
    // Массивы с путями к изображениям для разных размеров экрана
    const bigImages = [
        'img/galleryBig1.jpg',
        'img/galleryBig2.jpg', 
        'img/galleryBig3.jpg',
        'img/galleryBig4.jpg',
        'img/galleryBig5.jpg',
        'img/galleryBig6.jpg',
        'img/galleryBig7.jpg'
    ];
    
    const mobileImages = [
        'img/galleryBig1Mobile450.jpg',
        'img/galleryBig2Mobile450.jpg', 
        'img/galleryBig3Mobile450.jpg',
        'img/galleryBig4Mobile450.jpg',
        'img/galleryBig5Mobile450.jpg',
        'img/galleryBig6Mobile450.jpg',
        'img/galleryBig7Mobile450.jpg'
    ];
    
    // Функция для смены активного состояния
    function setActiveImage(index) {
        // Убираем активный класс у всех маленьких изображений
        littleImages.forEach(img => {
            img.classList.remove('littleImgActive');
        });
        
        // Добавляем активный класс к выбранному изображению
        littleImages[index].classList.add('littleImgActive');
        
        // Определяем размер экрана и выбираем соответствующее изображение
        const isMobile450 = window.innerWidth <= 450;
        const imagePath = isMobile450 ? mobileImages[index] : bigImages[index];
        
        // Обновляем source для desktop (450px и больше)
        const desktopSource = bigImagePicture.querySelector('source[media="(min-width: 450px)"]');
        if (desktopSource) {
            desktopSource.srcset = bigImages[index];
        }
        
        // Обновляем source для mobile (450px и меньше)
        const mobileSource = bigImagePicture.querySelector('source[media="(max-width: 450px)"]');
        if (mobileSource) {
            mobileSource.srcset = mobileImages[index];
        }
        
        // Обновляем fallback изображение
        bigImage.src = imagePath;
    }
    
    // Добавляем обработчики кликов для каждого маленького изображения
    littleImages.forEach((img, index) => {
        img.addEventListener('click', function() {
            setActiveImage(index);
        });
    });
    
    // Обработчик изменения размера окна для обновления изображений
    window.addEventListener('resize', function() {
        // Находим активное изображение
        const activeIndex = Array.from(littleImages).findIndex(img => 
            img.classList.contains('littleImgActive')
        );
        
        if (activeIndex !== -1) {
            setActiveImage(activeIndex);
        }
    });
}); 