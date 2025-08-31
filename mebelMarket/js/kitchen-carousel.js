// Карусель изображений для страницы кухни
let currentImageIndex = 0;
const images = [
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

// Инициализация карусели
document.addEventListener('DOMContentLoaded', function() {
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
        mainImage.alt = `Модульная кухня Марта 3600 Горчица - фото ${currentImageIndex + 1}`;
    }
}

// Обновление изображения в модальном окне
function updateModalImage() {
    const modalImage = document.getElementById('modalCarouselImage');
    if (modalImage) {
        modalImage.src = images[currentImageIndex];
        modalImage.alt = `Модульная кухня Марта 3600 Горчица - фото ${currentImageIndex + 1}`;
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

// Автоматическое переключение изображений каждые 5 секунд
setInterval(function() {
    nextImage();
}, 5000);
