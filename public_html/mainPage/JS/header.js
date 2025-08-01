// Функция инициализации header функциональности
function initHeaderFunctionality() {
    const catalogDropdown = document.querySelector('.catalog-dropdown');
    const catalogBtn = document.querySelector('.catalog-btn');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    // Проверяем, что элементы существуют
    if (catalogDropdown && catalogBtn) {
        // Toggle dropdown on button click
        catalogBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            catalogDropdown.classList.toggle('active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function (e) {
            if (!catalogDropdown.contains(e.target)) {
                catalogDropdown.classList.remove('active');
            }
        });

        // Close dropdown on escape key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                catalogDropdown.classList.remove('active');
            }
        });
    }

    // Burger menu functionality
    const burgerDropdown = document.querySelector('.burger-dropdown');
    const burgerBtn = document.querySelector('.burger-btn');
    const burgerMenu = document.querySelector('.burger-menu');

    // Проверяем, что элементы существуют
    if (burgerDropdown && burgerBtn) {
        // Toggle burger menu on button click
        burgerBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            burgerDropdown.classList.toggle('active');
        });

        // Close burger menu when clicking outside
        document.addEventListener('click', function (e) {
            if (!burgerDropdown.contains(e.target)) {
                burgerDropdown.classList.remove('active');
            }
        });

        // Close burger menu on escape key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                burgerDropdown.classList.remove('active');
            }
        });
    }

    // Modal functionality
    const modalBtn = document.querySelector('.open-modal-btn');
    const modal = document.querySelector('.modal');
    const modalClose = document.querySelector('.modal-close');
    const modalOverlay = document.querySelector('.modal-overlay');

    if (modalBtn) {
        modalBtn.addEventListener('click', function (e) {
            e.preventDefault();
            if (modal) modal.classList.add('active');
        });
    }

    if (modalClose) {
        modalClose.addEventListener('click', function () {
            if (modal) modal.classList.remove('active');
        });
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', function () {
            if (modal) modal.classList.remove('active');
        });
    }

    // Close modal on escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            modal.classList.remove('active');
        }
    });
}

// Вызываем функцию сразу (если header уже загружен)
initHeaderFunctionality();

// Также вызываем при загрузке DOM (на случай, если header загружается синхронно)
document.addEventListener('DOMContentLoaded', initHeaderFunctionality);