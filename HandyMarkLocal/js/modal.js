// Modal functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('modal');
    const modalClose = document.getElementById('modalClose');
    let modalTimer;
    let isModalClosed = false;

    // Функция для показа модалки
    function showModal() {
        if (!isModalClosed) {
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
    }

    // Функция для скрытия модалки
    function hideModal() {
        modal.classList.remove('modal-show');
        
        // Останавливаем волны
        const waves = modal.querySelectorAll('.modal-wave');
        waves.forEach(wave => {
            wave.style.animation = 'none';
        });
    }

    // Обработчик закрытия модалки
    modalClose.addEventListener('click', function() {
        hideModal();
        isModalClosed = true;
        clearTimeout(modalTimer);
    });

    // Закрытие по Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('modal-show')) {
            hideModal();
            isModalClosed = true;
            clearTimeout(modalTimer);
        }
    });

    // Функция для запуска таймера модалки
    function startModalTimer() {
        modalTimer = setTimeout(showModal, 15000); // 15 секунд для тестирования
    }

    // Запускаем таймер при загрузке страницы
    startModalTimer();

    // Перезапускаем таймер после закрытия модалки (если нужно)
    function resetModal() {
        isModalClosed = false;
        startModalTimer();
    }

    // Экспортируем функцию для возможного использования
    window.resetModal = resetModal;
});
