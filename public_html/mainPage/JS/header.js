document.addEventListener('DOMContentLoaded', function () {
    const catalogDropdown = document.querySelector('.catalog-dropdown');
    const catalogBtn = document.querySelector('.catalog-btn');
    const dropdownMenu = document.querySelector('.dropdown-menu');

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

    // Burger menu functionality
    const burgerDropdown = document.querySelector('.burger-dropdown');
    const burgerBtn = document.querySelector('.burger-btn');
    const burgerMenu = document.querySelector('.burger-menu');

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
});