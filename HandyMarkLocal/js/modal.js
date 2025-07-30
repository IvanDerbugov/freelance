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
            
            // Запускаем анимацию кнопки
            const modalButton = modal.querySelector('.btnTextMe');
            if (modalButton) {
                modalButton.style.animationPlayState = 'running';
            }
        }
    }

    // Функция для скрытия модалки
    function hideModal() {
        modal.classList.remove('modal-show');
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
        modalTimer = setTimeout(showModal, 1500); // 15 секунд
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
