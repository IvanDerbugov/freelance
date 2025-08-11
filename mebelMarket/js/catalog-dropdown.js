// catalog-dropdown.js - Функциональность выпадающего каталога

function initCatalogDropdown() {
    const catalogDropdown = document.querySelector('.catalog-dropdown');
    const catalogBtn = document.querySelector('.catalog-button');

    if (catalogDropdown && catalogBtn) {
        // Toggle dropdown on button click
        catalogBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            catalogDropdown.classList.toggle('active');
            console.log('Catalog button clicked, dropdown active:', catalogDropdown.classList.contains('active'));
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

        console.log('Catalog dropdown initialized successfully');
    } else {
        console.log('Catalog dropdown elements not found:', { catalogDropdown, catalogBtn });
    }
}
