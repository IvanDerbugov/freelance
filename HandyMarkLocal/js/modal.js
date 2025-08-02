// Modal functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('modal');
    const modalClose = document.getElementById('modalClose');
    let modalTimer;

    // Функция для показа модалки
    function showModal() {
        modal.classList.add('modal-show');
        
        // Запускаем волны
        const waves = modal.querySelectorAll('.modal-wave');
        waves.forEach((wave, index) => {
            wave.style.animation = 'none';
            setTimeout(() => {
                wave.style.animation = `modalWave 2s ease-out infinite ${index * 0.5}s`;
            }, 10);
        });
    }

    // Функция для скрытия модалки
    function hideModal() {
        modal.classList.remove('modal-show');
        
        // Останавливаем волны
        const waves = modal.querySelectorAll('.modal-wave');
        waves.forEach(wave => {
            wave.style.animation = 'none';
        });
        
        // Перезапускаем таймер после закрытия
        startModalTimer();
    }

    // Обработчик закрытия модалки
    modalClose.addEventListener('click', function() {
        hideModal();
    });

    // Закрытие по Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('modal-show')) {
            hideModal();
        }
    });

    // Функция для запуска таймера модалки
    function startModalTimer() {
        clearTimeout(modalTimer); // Очищаем предыдущий таймер
        modalTimer = setTimeout(showModal, 15000); // 15 секунд
    }

    // Запускаем таймер при загрузке страницы
    startModalTimer();

    // Экспортируем функцию для возможного использования
    window.resetModal = startModalTimer;
});
