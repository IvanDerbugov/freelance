// Функциональность для страницы детального просмотра кухни

document.addEventListener('DOMContentLoaded', function() {
    // Модальное окно для изображения
    const imageModal = document.getElementById('imageModal');
    const kitchenImage = document.querySelector('.kitchen-image-clickable');
    const closeModal = document.querySelector('.close-modal');

    // Открытие модального окна при клике на изображение
    if (kitchenImage) {
        kitchenImage.addEventListener('click', function() {
            imageModal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Блокируем прокрутку страницы
        });
    }

    // Закрытие модального окна при клике на крестик
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            imageModal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Возвращаем прокрутку страницы
        });
    }

    // Закрытие модального окна при клике вне изображения
    if (imageModal) {
        imageModal.addEventListener('click', function(e) {
            if (e.target === imageModal) {
                imageModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Закрытие модального окна по клавише Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && imageModal.style.display === 'block') {
            imageModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Обработчики для кнопок
    const consultantBtn = document.querySelector('.btn-consultant-main');
    const buyOneClickBtn = document.querySelector('.btn-buy-one-click');

    // Кнопка "Помощь консультанта"
    if (consultantBtn) {
        consultantBtn.addEventListener('click', function() {
            // Здесь можно добавить логику для связи с консультантом
            alert('Спасибо! Наш консультант свяжется с вами в ближайшее время.');
        });
    }

    // Кнопка "Купить в 1 клик"
    if (buyOneClickBtn) {
        buyOneClickBtn.addEventListener('click', function() {
            // Здесь можно добавить логику для быстрой покупки
            alert('Функция "Купить в 1 клик" будет доступна в ближайшее время.');
        });
    }

    // Кнопка "Рассчитать стоимость" - теперь использует onclick="openKitchenQuiz()"
    // Обработчик не нужен, так как используется прямая функция

    // Кнопка "Заявка на бесплатный замер" - теперь использует onclick="openMeasureModal()"
    // Обработчик не нужен, так как используется прямая функция

    // Обработчики для модалки квиза не нужны, так как она управляется из includeHeaderFooter.js
});
