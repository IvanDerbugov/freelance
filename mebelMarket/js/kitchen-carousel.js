// Универсальная карусель изображений для страниц кухонь
let currentImageIndex = 0;
let images = [];

// Функция для определения массива изображений на основе текущего изображения
function detectImages() {
    const mainImage = document.getElementById('kitchenCarouselImage');
    if (!mainImage) return;
    
    const currentSrc = mainImage.src;
    const baseName = currentSrc.split('/').pop().split('.')[0]; // Получаем имя файла без расширения
    
    // Определяем массив изображений в зависимости от базового имени
    if (baseName.includes('bestOffers1')) {
        images = [
            '../img/bestOffers1.webp',
            '../img/bestOffers1_2.webp',
            '../img/bestOffers1_3.webp'
        ];
    } else if (baseName.includes('bestOffers2')) {
        images = [
            '../img/bestOffers2.webp',
            '../img/bestOffers2_2.webp',
            '../img/bestOffers2_3.webp',
            '../img/bestOffers2_4.webp',
            '../img/bestOffers2_5.webp'
        ];
    } else if (baseName.includes('bestOffers4')) {
        images = [
            '../img/bestOffers4.webp',
            '../img/bestOffers4_2.webp',
            '../img/bestOffers4_3.webp',
            '../img/bestOffers4_5.webp',
            '../img/bestOffers4_6.webp'
        ];
    } else if (baseName.includes('bestOffers5')) {
        images = [
            '../img/bestOffers5.webp',
            '../img/bestOffers5_2.webp',
            '../img/bestOffers5_3.webp',
            '../img/bestOffers5_4.webp',
            '../img/bestOffers5_5.webp',
            '../img/bestOffers5_6.webp',
            '../img/bestOffers5_7.webp'
        ];
    } else if (baseName.includes('bestOffers6')) {
        images = [
            '../img/bestOffers6.webp',
            '../img/bestOffers6_2.webp',
            '../img/bestOffers6_3.webp',
            '../img/bestOffers6_4.webp',
            '../img/bestOffers6_5.webp'
        ];
    } else if (baseName.includes('bestOffers7')) {
        images = [
            '../img/bestOffers7.webp',
            '../img/bestOffers7_2.webp',
            '../img/bestOffers7_3.webp',
            '../img/bestOffers7_4.webp',
            '../img/bestOffers7_5.webp'
        ];
    } else if (baseName.includes('bestOffers8')) {
        images = [
            '../img/bestOffers8.webp',
            '../img/bestOffers8_2.webp',
            '../img/bestOffers8_3.webp',
            '../img/bestOffers8_4.webp',
            '../img/bestOffers8_5.webp'
        ];
    } else if (baseName.includes('bestOffers9')) {
        images = [
            '../img/bestOffers9.webp',
            '../img/bestOffers9_2.webp',
            '../img/bestOffers9_3.webp',
            '../img/bestOffers9_4.webp',
            '../img/bestOffers9_5.webp',
            '../img/bestOffers9_6.webp',
            '../img/bestOffers9_7.webp'
        ];
    } else if (baseName.includes('bestOffers3')) {
        images = [
            '../img/bestOffers3.webp',
            '../img/bestOffers3_2.webp',
            '../img/bestOffers3_3.webp',
            '../img/bestOffers3_4.webp',
            '../img/bestOffers3_5.webp',
            '../img/bestOffers3_6.webp',
            '../img/bestOffers3_7.webp',
            '../img/bestOffers3_8.webp',
            '../img/bestOffers3_9.webp'
        ];
    } else if (baseName.includes('card3Shale')) {
        images = [
            '../img/card3Shale.webp',
            '../img/card3Shale_2.webp'
        ];
    } else if (baseName.includes('card3Loft')) {
        images = [
            '../img/card3Loft.webp',
            '../img/card3Loft_2.webp',
            '../img/card3Loft_3.webp',
            '../img/card3Loft_4.webp',
            '../img/card3Loft_5.webp',
            '../img/card3Loft_6.webp'
        ];
    } else if (baseName.includes('card3Mari')) {
        images = [
            '../img/card3Mari.webp',
            '../img/card3Mari_2.webp',
            '../img/card3Mari_3.webp',
            '../img/card3Mari_4.webp',
            '../img/card3Mari_5.webp'
        ];
    } else if (baseName.includes('card3-new')) {
        images = [
            '../img/card3-new.webp',
            '../img/card3_2-new.webp',
            '../img/card3_3-new.webp',
            '../img/card3_4-new.webp',
            '../img/card3_5-new.webp'
        ];
    } else if (baseName.includes('card3')) {
        images = [
            '../img/card3.jpg',
            '../img/card3_2.webp',
            '../img/card3Big.webp'
        ];
    } else if (baseName.includes('card1Praga')) {
        images = [
            '../img/card1Praga.webp',
            '../img/card1Praga_2.webp',
            '../img/card1Praga_3.webp',
            '../img/card1Praga_4.webp',
            '../img/card1Praga_5.webp'
        ];
    } else if (baseName.includes('card1Shale')) {
        images = [
            '../img/card1Shale.webp',
            '../img/card1Shale_2.webp',
            '../img/card1Shale_3.webp'
        ];
    } else if (baseName.includes('card1Linda')) {
        images = [
            '../img/card1Linda.webp',
            '../img/card1Linda_2.webp',
            '../img/card1Linda_3.webp',
            '../img/card1Linda_4.webp',
            '../img/card1Linda_5.webp'
        ];
    } else if (baseName.includes('card1Grandel')) {
        images = [
            '../img/card1Grandel.webp',
            '../img/card1Grandel_2.webp',
            '../img/card1Grandel_3.webp',
            '../img/card1Grandel_4.webp',
            '../img/card1Grandel_5.webp',
            '../img/card1Grandel_6.webp',
            '../img/card1Grandel_7.webp'
        ];
    } else if (baseName.includes('card1Mari')) {
        images = [
            '../img/card1Mari.webp',
            '../img/card1Mari_2.webp'
        ];
    } else if (baseName.includes('card1-new')) {
        images = [
            '../img/card1-new.webp',
            '../img/card1_2-new.webp',
            '../img/card1_3-new.webp',
            '../img/card1_4-new.webp'
        ];
    } else if (baseName.includes('card1')) {
        images = [
            '../img/card1.jpg',
            '../img/card1Big.jpg'
        ];
    } else if (baseName.includes('card2Loft')) {
        images = [
            '../img/card2Loft.jpg',
            '../img/card2Loft_2.webp'
        ];
    } else if (baseName.includes('card2Grandel')) {
        images = [
            '../img/card2Grandel.webp',
            '../img/card2Grandel_2.webp',
            '../img/card2Grandel_3.webp'
        ];
    } else if (baseName.includes('card2Shale')) {
        images = [
            '../img/card2Shale.webp',
            '../img/card2Shale_2.webp'
        ];
    } else if (baseName.includes('card2Skala')) {
        images = [
            '../img/card2Skala.webp',
            '../img/card2Skala_2.webp',
            '../img/card2Skala_3.webp',
            '../img/card2Skala_4.webp'
        ];
    } else if (baseName.includes('card2-new')) {
        images = [
            '../img/card2-new.webp',
            '../img/card2_2-new.webp',
            '../img/card2_3-new.webp',
            '../img/card2_4-new.webp'
        ];
    } else if (baseName.includes('card2')) {
        images = [
            '../img/card2.jpg',
            '../img/card2Big.jpg'
        ];
    } else if (baseName.includes('card4Shale')) {
        images = [
            '../img/card4Shale.webp',
            '../img/card4Shale_2.webp'
        ];
    } else if (baseName.includes('card4Skala')) {
        images = [
            '../img/card4Skala.webp',
            '../img/card4Skala_2.webp'
        ];
    } else if (baseName.includes('card4Mari')) {
        images = [
            '../img/card4Mari.webp',
            '../img/card4Mari_2.webp',
            '../img/card4Mari_3.webp',
            '../img/card4Mari_4.webp'
        ];
    } else if (baseName.includes('card4Flat')) {
        images = [
            '../img/card4Flat.jpg',
            '../img/card4Flat_2.webp',
            '../img/card4Flat_3.webp',
            '../img/card4Flat_4.webp'
        ];
    } else if (baseName.includes('card4-new')) {
        images = [
            '../img/card4-new.webp',
            '../img/card4_2-new.webp',
            '../img/card4_3-new.webp',
            '../img/card4_4-new.webp',
            '../img/card4_5-new.webp',
            '../img/card4_6-new.webp'
        ];
    } else if (baseName.includes('card4')) {
        images = [
            '../img/card4.jpeg',
            '../img/card4Flat.jpg',
            '../img/card4FlatBig.jpg'
        ];
    } else if (baseName.includes('card5Mari')) {
        images = [
            '../img/card5Mari.webp',
            '../img/card5Mari_2.webp',
            '../img/card5Mari_3.webp',
            '../img/card5Mari_4.webp',
            '../img/card5Mari_5.webp'
        ];
    } else if (baseName.includes('card5Loft')) {
        images = [
            '../img/card5Loft.webp',
            '../img/card5Loft_2.webp',
            '../img/card5Loft_3.webp',
            '../img/card5Loft_4.webp'
        ];
    } else if (baseName.includes('card5Flat')) {
        images = [
            '../img/card5Flat.webp',
            '../img/card5Flat_2.webp'
        ];
    } else if (baseName.includes('card5-new')) {
        images = [
            '../img/card5-new.webp',
            '../img/card5_2-new.webp',
            '../img/card5_3-new.webp',
            '../img/card5_4-new.webp'
        ];
    } else if (baseName.includes('card5')) {
        images = [
            '../img/card5.jpeg',
            '../img/card5Flat.webp'
        ];
    } else if (baseName.includes('card6-new')) {
        images = [
            '../img/card6-new.webp',
            '../img/card6_2-new.webp',
            '../img/card6_3-new.webp',
            '../img/card6_4-new.webp',
            '../img/card6_5-new.webp',
            '../img/card6_6-new.webp'
        ];
    } else if (baseName.includes('card6Mari')) {
        images = [
            '../img/card6Mari.webp',
            '../img/card6Mari_2.webp'
        ];
    } else if (baseName.includes('card6')) {
        images = [
            '../img/card6.jpeg',
            '../img/card6Flat.webp'
        ];
    } else if (baseName.includes('card7Flat')) {
        images = [
            '../img/card7Flat.webp',
            '../img/card7Flat_2.webp',
            '../img/card7Flat_3.webp',
            '../img/card7Flat_4.webp',
            '../img/card7Flat_5.webp'
        ];
    } else if (baseName.includes('card7-new')) {
        images = [
            '../img/card7-new.webp',
            '../img/card7_2-new.webp',
            '../img/card7_3-new.webp'
        ];
    } else if (baseName.includes('card7')) {
        images = [
            '../img/card7.jpg',
            '../img/card7Flat.webp'
        ];
    } else if (baseName.includes('card8-new')) {
        images = [
            '../img/card8-new.webp',
            '../img/card8_2-new.webp'
        ];
    } else if (baseName.includes('card8')) {
        images = [
            '../img/card8.jpeg'
        ];
    } else if (baseName.includes('card9-new')) {
        images = [
            '../img/card9-new.webp',
            '../img/card9_2-new.webp',
            '../img/card9_3-new.webp'
        ];
    } else if (baseName.includes('card9')) {
        images = [
            '../img/card9.jpeg',
            '../img/card9_2.webp',
            '../img/card9_3.webp'
        ];
    } else if (baseName.includes('card10-new')) {
        images = [
            '../img/card10-new.webp',
            '../img/card10_2-new.webp'
        ];
    } else {
        // По умолчанию используем только текущее изображение
        images = [currentSrc];
    }
    
    // Находим индекс текущего изображения в массиве
    currentImageIndex = images.findIndex(img => img === currentSrc || currentSrc.includes(img.split('/').pop()));
    if (currentImageIndex === -1) currentImageIndex = 0;
}

// Инициализация карусели
document.addEventListener('DOMContentLoaded', function() {
    detectImages();
    updateModalImage();
});

// Переход к предыдущему изображению
function previousImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    updateImage();
    updateModalImage();
}

// Переход к следующему изображению
function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updateImage();
    updateModalImage();
}

// Переход к конкретному изображению по индексу
function goToImage(index) {
    currentImageIndex = index;
    updateImage();
    updateModalImage();
}

// Обновление основного изображения
function updateImage() {
    const mainImage = document.getElementById('kitchenCarouselImage');
    if (mainImage) {
        mainImage.src = images[currentImageIndex];
        // Сохраняем оригинальный alt, но добавляем номер фото
        const originalAlt = mainImage.alt || 'Кухня';
        mainImage.alt = `${originalAlt} - фото ${currentImageIndex + 1}`;
    }
}

// Обновление изображения в модальном окне
function updateModalImage() {
    const modalImage = document.getElementById('modalCarouselImage');
    if (modalImage) {
        modalImage.src = images[currentImageIndex];
        // Сохраняем оригинальный alt, но добавляем номер фото
        const originalAlt = modalImage.alt || 'Кухня';
        modalImage.alt = `${originalAlt} - фото ${currentImageIndex + 1}`;
    }
}

// Функции для модального окна
function previousImageModal() {
    previousImage();
}

function nextImageModal() {
    nextImage();
}

// Обработка клавиш клавиатуры
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft') {
        previousImage();
    } else if (event.key === 'ArrowRight') {
        nextImage();
    }
});

// Обработка свайпов для мобильных устройств
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(event) {
    touchStartX = event.changedTouches[0].screenX;
}, false);

document.addEventListener('touchend', function(event) {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
}, false);

function handleSwipe() {
    const swipeThreshold = 50; // Минимальное расстояние для срабатывания свайпа
    const swipeDistance = touchStartX - touchEndX;
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
        if (swipeDistance > 0) {
            // Свайп влево - следующее изображение
            nextImage();
        } else {
            // Свайп вправо - предыдущее изображение
            previousImage();
        }
    }
}

// Автоматическое переключение изображений отключено
