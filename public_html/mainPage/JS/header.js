// Глобальная функция для закрытия всех выпадающих меню
function closeAllDropdowns() {
    const allDropdowns = document.querySelectorAll('.catalog-dropdown, .burger-dropdown');
    allDropdowns.forEach(dropdown => {
        dropdown.classList.remove('active');
    });
}

// Функция инициализации header функциональности
function initHeaderFunctionality() {

    // Header catalog dropdown
    const catalogDropdown = document.querySelector('.headerBottom .catalog-dropdown');
    const catalogBtn = document.querySelector('.headerBottom .catalog-btn');
    const dropdownMenu = document.querySelector('.headerBottom .dropdown-menu');

    // Проверяем, что элементы существуют
    if (catalogDropdown && catalogBtn) {
        // Toggle dropdown on button click
        catalogBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            // Закрываем все другие выпадающие меню перед открытием текущего
            closeAllDropdowns();
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

        // Close dropdown on scroll
        let scrollTimeout;
        window.addEventListener('scroll', function() {
            if (catalogDropdown.classList.contains('active')) {
                catalogDropdown.classList.remove('active');
            }
        }, { passive: true });

        // Прокрутка колесом мыши для выпадающего списка
        let isDropdownActive = false;
        
        // Отслеживаем состояние выпадающего списка
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    isDropdownActive = catalogDropdown.classList.contains('active');
                }
            });
        });
        
        observer.observe(catalogDropdown, { attributes: true });
        
        // Обработчик прокрутки колесом мыши
        document.addEventListener('wheel', function(e) {
            if (isDropdownActive && dropdownMenu) {
                const scrollTop = dropdownMenu.scrollTop;
                const scrollHeight = dropdownMenu.scrollHeight;
                const clientHeight = dropdownMenu.clientHeight;
                
                // Проверяем, можно ли прокручивать
                const canScrollUp = scrollTop > 0;
                const canScrollDown = scrollTop < scrollHeight - clientHeight;
                
                // Если прокрутка возможна, предотвращаем прокрутку страницы
                if ((e.deltaY < 0 && canScrollUp) || (e.deltaY > 0 && canScrollDown)) {
                    e.preventDefault();
                    
                    // Прокручиваем выпадающий список
                    dropdownMenu.scrollTop += e.deltaY;
                }
            }
        }, { passive: false });

        // Close dropdown when clicking on links inside
        function addDropdownLinkListeners() {
            const dropdownLinks = catalogDropdown.querySelectorAll('a');
            dropdownLinks.forEach(function(link) {
                if (!link.hasAttribute('data-dropdown-link-listener')) {
                    link.setAttribute('data-dropdown-link-listener', 'true');
                    link.addEventListener('click', function() {
                        catalogDropdown.classList.remove('active');
                    });
                }
            });
        }
        
        // Добавляем обработчики для уже существующих ссылок
        addDropdownLinkListeners();
        
        // Добавляем обработчики для динамически загружаемых ссылок
        const dropdownObserver = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList') {
                    addDropdownLinkListeners();
                }
            });
        });
        
        dropdownObserver.observe(catalogDropdown, {
            childList: true,
            subtree: true
        });
    }



    // Burger menu functionality (header only)
    const burgerDropdown = document.querySelector('.headerBottom .burger-dropdown');
    const burgerBtn = document.querySelector('.headerBottom .burger-btn');
    const burgerMenu = document.querySelector('.headerBottom .burger-menu');

    // Проверяем, что элементы существуют
    if (burgerDropdown && burgerBtn) {
        // Toggle burger menu on button click
        burgerBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            // Закрываем все другие выпадающие меню перед открытием текущего
            closeAllDropdowns();
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

        // Close burger menu on scroll
        window.addEventListener('scroll', function() {
            if (burgerDropdown.classList.contains('active')) {
                burgerDropdown.classList.remove('active');
            }
        }, { passive: true });

        // Close burger menu when clicking on links inside
        function addBurgerLinkListeners() {
            const burgerLinks = burgerDropdown.querySelectorAll('a');
            burgerLinks.forEach(function(link) {
                if (!link.hasAttribute('data-burger-link-listener')) {
                    link.setAttribute('data-burger-link-listener', 'true');
                    link.addEventListener('click', function() {
                        burgerDropdown.classList.remove('active');
                    });
                }
            });
        }
        
        // Добавляем обработчики для уже существующих ссылок
        addBurgerLinkListeners();
        
        // Добавляем обработчики для динамически загружаемых ссылок
        const burgerObserver = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList') {
                    addBurgerLinkListeners();
                }
            });
        });
        
        burgerObserver.observe(burgerDropdown, {
            childList: true,
            subtree: true
        });
    }

    // Modal functionality (header and footer)
    const modalBtns = document.querySelectorAll('.open-modal-btn');
    const modal = document.querySelector('.modal');
    const modalClose = document.querySelector('.modal-close');
    const modalOverlay = document.querySelector('.modal-overlay');

    modalBtns.forEach(function(modalBtn) {
        modalBtn.addEventListener('click', function (e) {
            e.preventDefault();
            if (modal) modal.classList.add('active');
        });
    });

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

// Добавляем поддержку динамически загружаемого контента (футер)
const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.type === 'childList') {
            // Проверяем, появился ли футер
            const footer = document.querySelector('#footer');
            if (footer) {
                // Инициализируем функциональность для футера
                initFooterFunctionality();
            }
        }
    });
});

// Начинаем наблюдение за изменениями в body
observer.observe(document.body, {
    childList: true,
    subtree: true
});

// Также добавляем инициализацию с задержкой для надежности
setTimeout(function() {
    const footer = document.querySelector('#footer');
    if (footer) {
        initFooterFunctionality();
    }
}, 1000);

setTimeout(function() {
    const footer = document.querySelector('#footer');
    if (footer) {
        initFooterFunctionality();
    }
}, 3000);

// Функция для инициализации функциональности футера
function initFooterFunctionality() {
    // Footer catalog dropdown
    const footerCatalogDropdown = document.querySelector('.footerBottom .catalog-dropdown');
    const footerCatalogBtn = document.querySelector('.footerBottom .catalog-btn');
    
    // Проверяем, что элементы существуют и обработчики еще не добавлены
    if (footerCatalogDropdown && footerCatalogBtn && !footerCatalogBtn.hasAttribute('data-footer-listener')) {
        footerCatalogBtn.setAttribute('data-footer-listener', 'true');
        
        // Toggle dropdown on button click
        footerCatalogBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            // Закрываем все другие выпадающие меню перед открытием текущего
            closeAllDropdowns();
            footerCatalogDropdown.classList.toggle('active');
            
            // Управляем overflow футера
            const footer = document.querySelector('footer');
            if (footer) {
                if (footerCatalogDropdown.classList.contains('active')) {
                    footer.style.overflow = 'visible';
                } else {
                    footer.style.overflow = 'hidden';
                }
            }
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function (e) {
            if (!footerCatalogDropdown.contains(e.target)) {
                footerCatalogDropdown.classList.remove('active');
                
                // Возвращаем overflow футера
                const footer = document.querySelector('footer');
                if (footer) {
                    footer.style.overflow = 'hidden';
                }
            }
        });

        // Прокрутка колесом мыши для выпадающего списка в футере
        let isFooterDropdownActive = false;
        const footerDropdownMenu = footerCatalogDropdown.querySelector('.dropdown-menu');
        
        // Отслеживаем состояние выпадающего списка футера
        const footerObserver = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    isFooterDropdownActive = footerCatalogDropdown.classList.contains('active');
                }
            });
        });
        
        footerObserver.observe(footerCatalogDropdown, { attributes: true });
        
        // Обработчик прокрутки колесом мыши для футера
        document.addEventListener('wheel', function(e) {
            if (isFooterDropdownActive && footerDropdownMenu) {
                const scrollTop = footerDropdownMenu.scrollTop;
                const scrollHeight = footerDropdownMenu.scrollHeight;
                const clientHeight = footerDropdownMenu.clientHeight;
                
                // Проверяем, можно ли прокручивать
                const canScrollUp = scrollTop > 0;
                const canScrollDown = scrollTop < scrollHeight - clientHeight;
                
                // Если прокрутка возможна, предотвращаем прокрутку страницы
                if ((e.deltaY < 0 && canScrollUp) || (e.deltaY > 0 && canScrollDown)) {
                    e.preventDefault();
                    
                    // Прокручиваем выпадающий список
                    footerDropdownMenu.scrollTop += e.deltaY;
                }
            }
        }, { passive: false });

        // Close dropdown on escape key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                footerCatalogDropdown.classList.remove('active');
                
                // Возвращаем overflow футера
                const footer = document.querySelector('footer');
                if (footer) {
                    footer.style.overflow = 'hidden';
                }
            }
        });

        // Close dropdown on scroll
        window.addEventListener('scroll', function() {
            if (footerCatalogDropdown.classList.contains('active')) {
                footerCatalogDropdown.classList.remove('active');
                
                // Возвращаем overflow футера
                const footer = document.querySelector('footer');
                if (footer) {
                    footer.style.overflow = 'hidden';
                }
            }
        }, { passive: true });

        // Close dropdown when clicking on links inside
        function addFooterDropdownLinkListeners() {
            const footerDropdownLinks = footerCatalogDropdown.querySelectorAll('a');
            footerDropdownLinks.forEach(function(link) {
                if (!link.hasAttribute('data-footer-dropdown-link-listener')) {
                    link.setAttribute('data-footer-dropdown-link-listener', 'true');
                    link.addEventListener('click', function() {
                        footerCatalogDropdown.classList.remove('active');
                        
                        // Возвращаем overflow футера
                        const footer = document.querySelector('footer');
                        if (footer) {
                            footer.style.overflow = 'hidden';
                        }
                    });
                }
            });
        }
        
        // Добавляем обработчики для уже существующих ссылок
        addFooterDropdownLinkListeners();
        
        // Добавляем обработчики для динамически загружаемых ссылок
        const footerDropdownObserver = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList') {
                    addFooterDropdownLinkListeners();
                }
            });
        });
        
        footerDropdownObserver.observe(footerCatalogDropdown, {
            childList: true,
            subtree: true
        });
    }
}