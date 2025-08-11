// catalog-dropdown.js - Функциональность выпадающего каталога

function initCatalogDropdown() {
    const catalogDropdown = document.querySelector('.catalog-dropdown');
    const catalogBtn = document.querySelector('.catalog-button');

    if (catalogDropdown && catalogBtn) {
        // Toggle dropdown on button click
        catalogBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            catalogDropdown.classList.toggle('active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!catalogDropdown.contains(e.target)) {
                catalogDropdown.classList.remove('active');
            }
        });

        // Close dropdown on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                catalogDropdown.classList.remove('active');
            }
        });

        // Close dropdown on scroll
        window.addEventListener('scroll', function() {
            if (catalogDropdown.classList.contains('active')) {
                catalogDropdown.classList.remove('active');
            }
        }, { passive: true });

        // Close dropdown when clicking on links inside
        const dropdownLinks = catalogDropdown.querySelectorAll('a');
        dropdownLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                catalogDropdown.classList.remove('active');
            });
        });

        // Dropdown initialized successfully
    } else {
        console.warn('Catalog dropdown elements not found');
    }
}
