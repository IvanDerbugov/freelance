document.addEventListener('DOMContentLoaded', () => {

    const clickSound = document.getElementById('click-sound');

    // Функция для проигрывания звука
    function playClickSound() {
        if (clickSound) {
            clickSound.currentTime = 0; // Сбрасываем звук на начало
            clickSound.play().catch(error => console.log("Audio play failed:", error));
        }
    }

    // Находим все ссылки в навигации
    const navLinks = document.querySelectorAll('.LinkItem');
    const pages = document.querySelectorAll('.page-content');

    // Функция-обработчик клика
    function handleNavClick(event) {
        playClickSound();

        const targetPageId = event.currentTarget.dataset.target;
        if (!targetPageId) return;
        
        // Переключение активной ссылки
        navLinks.forEach(link => {
            link.classList.remove('activeLink');
        });
        event.currentTarget.classList.add('activeLink');

        // Переключение видимой страницы
        pages.forEach(page => {
            if (page.id === targetPageId) {
                page.classList.remove('hidden');
            } else {
                page.classList.add('hidden');
            }
        });
    }

    // Добавляем слушатель клика на каждую ссылку
    navLinks.forEach(link => {
        // Проверяем, есть ли у кнопки цель, прежде чем вешать обработчик
        if (link.dataset.target) {
            link.addEventListener('click', handleNavClick);
        }
    });

    // --- Accordion for Skills (mobile) ---
    const skillItems = document.querySelectorAll('.skill-item');

    skillItems.forEach(item => {
        const header = item.querySelector('.skill-header');
        header.addEventListener('click', () => {
            // Закрываем все другие открытые элементы
            skillItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('open');
                }
            });
            // Переключаем текущий элемент
            item.classList.toggle('open');
        });
    });

    // --- Кнопки "Нанять" и "Проекты" ---
    const hireMeBtn = document.getElementById('hire-me-btn');
    const projectsBtn = document.getElementById('projects-btn');
    const contactLink = document.querySelector('[data-target="contact-page"]');
    const portfolioLink = document.querySelector('[data-target="portfolio-page"]');

    if (hireMeBtn && contactLink) {
        hireMeBtn.addEventListener('click', () => {
            playClickSound();
            // Имитируем клик по ссылке "Контакты"
            contactLink.click();
        });
    }

    if (projectsBtn && portfolioLink) {
        projectsBtn.addEventListener('click', () => {
            playClickSound();
            // Имитируем клик по ссылке "Портфолио"
            portfolioLink.click();
        });
    }

    // --- Theme Switcher ---
    const themeToggle = document.getElementById('theme-toggle');
    const htmlEl = document.documentElement;

    if (themeToggle) {
        // Устанавливаем начальное состояние переключателя в соответствии с темой
        // Если light-theme нет, значит тема темная, и он должен быть checked.
        themeToggle.checked = !htmlEl.classList.contains('light-theme');

        themeToggle.addEventListener('change', () => {
            if (themeToggle.checked) {
                // ПЕРЕКЛЮЧАЕМ НА ТЕМНУЮ ТЕМУ
                htmlEl.classList.remove('light-theme');
                localStorage.setItem('theme', 'dark');
            } else {
                // ПЕРЕКЛЮЧАЕМ НА СВЕТЛУЮ ТЕМУ
                htmlEl.classList.add('light-theme');
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // --- ЛОГИКА ДЛЯ ХОВЕР-ЭФФЕКТА НАВЫКОВ БОЛЬШЕ НЕ НУЖНА ---
    // Весь эффект теперь реализован на чистом CSS

    // === Discount Modal ===
    const openDiscountModalBtn = document.getElementById('openDiscountModal');
    const discountModal = document.getElementById('discountModal');
    const closeDiscountModalBtn = document.getElementById('closeDiscountModal');

    if (openDiscountModalBtn && discountModal && closeDiscountModalBtn) {
        openDiscountModalBtn.addEventListener('click', () => {
            discountModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        closeDiscountModalBtn.addEventListener('click', () => {
            discountModal.classList.remove('active');
            document.body.style.overflow = '';
        });
        discountModal.addEventListener('click', (e) => {
            if (e.target === discountModal) {
                discountModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // --- Portfolio Project Switcher ---
    const portfolioBtns = document.querySelectorAll('.portfolio-btn');
    const nftBlock = document.getElementById('project-nft');
    const subsBlock = document.getElementById('project-subs');
    const weddingBlock = document.getElementById('project-wedding');
    const handymarkBlock = document.getElementById('project-handymark');
    if (portfolioBtns.length && nftBlock && subsBlock && weddingBlock && handymarkBlock) {
        portfolioBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                portfolioBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Скрываем все проекты
                nftBlock.style.display = 'none';
                subsBlock.style.display = 'none';
                weddingBlock.style.display = 'none';
                handymarkBlock.style.display = 'none';
                
                // Останавливаем видео SubScope и HandyMark
                const subsVideo = subsBlock.querySelector('video');
                const handymarkVideo = handymarkBlock.querySelector('video');
                if (subsVideo) { subsVideo.pause(); subsVideo.currentTime = 0; }
                if (handymarkVideo) { handymarkVideo.pause(); handymarkVideo.currentTime = 0; }
                
                // Показываем нужный проект
                if (btn.dataset.project === 'handymark') {
                    handymarkBlock.style.display = '';
                    // Запускаем видео HandyMark
                    if (handymarkVideo) { handymarkVideo.play(); }
                } else if (btn.dataset.project === 'wedding') {
                    weddingBlock.style.display = '';
                } else if (btn.dataset.project === 'subs') {
                    subsBlock.style.display = '';
                    // Запускаем видео SubScope
                    if (subsVideo) { subsVideo.play(); }
                } else if (btn.dataset.project === 'nft') {
                    nftBlock.style.display = '';
                }
            });
        });
    }

    // --- Discount Form Submission ---
    const discountForm = document.getElementById('discountForm');
    const discountSuccess = document.getElementById('discountSuccess');
    const discountLoading = document.getElementById('discountLoading');
    const discountSubmitBtn = document.getElementById('discountSubmitBtn');

    if (discountForm) {
        discountForm.addEventListener('submit', function (e) {
            e.preventDefault();
            discountSuccess.style.display = 'none';
            discountLoading.style.display = 'block';
            discountSubmitBtn.disabled = true;

            const formData = new FormData(discountForm);

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            })
            .then(res => res.json())
            .then(data => {
                discountLoading.style.display = 'none';
                discountSubmitBtn.disabled = false;
                if (data.success) {
                    discountForm.style.display = 'none';
                    discountSuccess.style.display = 'block';
                    discountForm.reset();
                } else {
                    discountSuccess.textContent = data.message || 'Ошибка отправки!';
                    discountSuccess.style.display = 'block';
                }
            })
            .catch(() => {
                discountLoading.style.display = 'none';
                discountSubmitBtn.disabled = false;
                discountSuccess.textContent = 'Ошибка соединения!';
                discountSuccess.style.display = 'block';
            });
        });
    }
}); 