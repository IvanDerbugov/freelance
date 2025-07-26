document.addEventListener('DOMContentLoaded', function() {
    // Обработчик кликов на тарифы только для десктопа (не мобильные)
    if (window.innerWidth > 740) {
        const tariffs = document.querySelectorAll('.tariff');
        tariffs.forEach(tariff => {
            tariff.addEventListener('click', function() {
                tariffs.forEach(t => t.classList.remove('tariff-active'));
                this.classList.add('tariff-active');
            });
        });
    }

    // --- Слайдер отзывов для десктопа ---
    const reviewsFlex = document.querySelector('.reviews-flex');
    const reviewsCards = document.querySelectorAll('.reviews-card');
    const reviewsDotsContainer = document.querySelector('.reviews-dots');
    const reviewsArrowPrev = document.querySelector('.reviews-arrow-prev');
    const reviewsArrowNext = document.querySelector('.reviews-arrow-next');

    // --- Бесшовный loop-слайдер для отзывов ---
    // Удаляем старую реализацию (всё, что было до этого для reviewsFlex, reviewsCards, reviewsDotsContainer, currentPage, totalSlides, totalDots, renderDots, goToPage, swipe logic)
    // Оставляем только новую реализацию ниже:
    if (reviewsCards.length > 1) {
        const firstClone = reviewsCards[0].cloneNode(true);
        const lastClone = reviewsCards[reviewsCards.length - 1].cloneNode(true);
        firstClone.classList.add('clone');
        lastClone.classList.add('clone');
        reviewsFlex.appendChild(firstClone);
        reviewsFlex.insertBefore(lastClone, reviewsCards[0]);
    }
    let allReviewsCards = document.querySelectorAll('.reviews-card');
    let currentPage = 1;
    const totalSlides = allReviewsCards.length - 2;
    const totalDots = totalSlides;
    let isTransitioning = false; // Флаг для защиты от множественных кликов
    
    function renderDots() {
        reviewsDotsContainer.innerHTML = '';
        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement('span');
            dot.className = 'reviews-dot';
            // Добавляем обработчик клика по dot для отзывов
            dot.addEventListener('click', function() {
                if (!isTransitioning) {
                    goToPage(i + 1); // +1, т.к. первый реальный слайд — индекс 1
                }
            });
            reviewsDotsContainer.appendChild(dot);
        }
    }
    function updateReviewsDots() {
        const dots = reviewsDotsContainer.children;
        let activeIdx = currentPage - 1;
        if (currentPage === 0) activeIdx = totalDots - 1;
        if (currentPage === allReviewsCards.length - 1) activeIdx = 0;
        for (let i = 0; i < dots.length; i++) {
            dots[i].classList.toggle('active', i === activeIdx);
        }
    }
    function setReviewsTransition(val) {
        reviewsFlex.style.transition = val;
    }
    function goToPage(page) {
        if (isTransitioning) return; // Защита от множественных кликов
        
        isTransitioning = true;
        setReviewsTransition('transform 0.5s cubic-bezier(0.4,0,0.2,1)');
        currentPage = page;
        reviewsFlex.style.transform = `translateX(-${page * (allReviewsCards[0].offsetWidth + 24)}px)`;
        updateReviewsDots();
    }
    reviewsFlex.addEventListener('transitionend', () => {
        if (currentPage === 0) {
            setReviewsTransition('none');
            currentPage = totalDots;
            reviewsFlex.style.transform = `translateX(-${currentPage * (allReviewsCards[0].offsetWidth + 24)}px)`;
            updateReviewsDots();
        }
        if (currentPage === allReviewsCards.length - 1) {
            setReviewsTransition('none');
            currentPage = 1;
            reviewsFlex.style.transform = `translateX(-${currentPage * (allReviewsCards[0].offsetWidth + 24)}px)`;
            updateReviewsDots();
        }
        isTransitioning = false; // Разрешаем новые переходы
    });
    if (reviewsArrowPrev) reviewsArrowPrev.addEventListener('click', () => {
        if (!isTransitioning) {
            goToPage(currentPage - 1);
        }
    });
    if (reviewsArrowNext) reviewsArrowNext.addEventListener('click', () => {
        if (!isTransitioning) {
            goToPage(currentPage + 1);
        }
    });
    // Swipe logic (по одной карточке)
    let startX = 0;
    let isDragging = false;
    let deltaX = 0;
    function onDragStart(e) {
        if (isTransitioning) return; // Защита от свайпов во время перехода
        
        // Проверяем, не кликнули ли на кнопку "посмотреть отзыв"
        const target = e.target;
        if (target.closest('.seeReview')) {
            return; // Не начинаем свайп, если кликнули на кнопку
        }
        
        isDragging = true;
        startX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        setReviewsTransition('none');
    }
    function onDragMove(e) {
        if (!isDragging) return;
        const x = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        deltaX = x - startX;
        reviewsFlex.style.transform = `translateX(${-currentPage * (allReviewsCards[0].offsetWidth + 24) + deltaX}px)`;
    }
    function onDragEnd() {
        if (!isDragging) return;
        setReviewsTransition('transform 0.5s cubic-bezier(0.4,0,0.2,1)');
        if (Math.abs(deltaX) > 50) {
            if (deltaX < 0) goToPage(currentPage + 1);
            else if (deltaX > 0) goToPage(currentPage - 1);
            else goToPage(currentPage);
        } else {
            goToPage(currentPage);
        }
        isDragging = false;
        deltaX = 0;
    }
    reviewsFlex.addEventListener('mousedown', onDragStart);
    reviewsFlex.addEventListener('mousemove', onDragMove);
    reviewsFlex.addEventListener('mouseup', onDragEnd);
    reviewsFlex.addEventListener('mouseleave', onDragEnd);
    // Touch события для отзывов с улучшенной поддержкой мобильных
    reviewsFlex.addEventListener('touchstart', e => {
        if (isTransitioning) return;
        
        // Проверяем, не кликнули ли на кнопку "посмотреть отзыв"
        const target = e.target;
        if (target.closest('.seeReview')) {
            return; // Не начинаем свайп, если кликнули на кнопку
        }
        
        isDragging = true;
        startX = e.touches[0].clientX;
        setReviewsTransition('none');
        e.preventDefault(); // Предотвращаем скролл страницы
    }, { passive: false });
    
    reviewsFlex.addEventListener('touchmove', e => {
        if (!isDragging) return;
        e.preventDefault(); // Предотвращаем скролл страницы
        const x = e.touches[0].clientX;
        deltaX = x - startX;
        reviewsFlex.style.transform = `translateX(${-currentPage * (allReviewsCards[0].offsetWidth + 24) + deltaX}px)`;
    }, { passive: false });
    
    reviewsFlex.addEventListener('touchend', e => {
        if (!isDragging) return;
        setReviewsTransition('transform 0.5s cubic-bezier(0.4,0,0.2,1)');
        
        // Уменьшаем порог для более чувствительных свайпов
        const threshold = 30; // Было 50, стало 30
        
        if (Math.abs(deltaX) > threshold) {
            if (deltaX < 0) goToPage(currentPage + 1);
            else if (deltaX > 0) goToPage(currentPage - 1);
            else goToPage(currentPage);
        } else {
            goToPage(currentPage);
        }
        isDragging = false;
        deltaX = 0;
    });
    
    reviewsFlex.addEventListener('touchcancel', e => {
        if (isDragging) {
            setReviewsTransition('transform 0.5s cubic-bezier(0.4,0,0.2,1)');
            goToPage(currentPage);
            isDragging = false;
            deltaX = 0;
        }
    });
    // Функция для пересчета позиций отзывов при изменении размера окна
    function recalculateReviewsPositions() {
        if (isTransitioning) return;
        
        // Пересчитываем позицию текущего слайда с новыми размерами
        const slideWidth = allReviewsCards[0].offsetWidth + 24;
        const newTransform = `translateX(-${currentPage * slideWidth}px)`;
        
        // Применяем новую позицию без анимации
        setReviewsTransition('none');
        reviewsFlex.style.transform = newTransform;
        
        // Восстанавливаем анимацию
        setTimeout(() => {
            setReviewsTransition('transform 0.5s cubic-bezier(0.4,0,0.2,1)');
        }, 10);
    }

    // Слушатель изменения размера окна для отзывов
    let reviewsResizeTimeout;
    window.addEventListener('resize', function() {
        // Используем debounce для оптимизации производительности
        clearTimeout(reviewsResizeTimeout);
        reviewsResizeTimeout = setTimeout(() => {
            recalculateReviewsPositions();
        }, 150); // Задержка 150мс
    });

    // Инициализация
    renderDots();
    setReviewsTransition('none');
    reviewsFlex.style.transform = `translateX(-${currentPage * (allReviewsCards[0].offsetWidth + 24)}px)`;
    updateReviewsDots();

    // --- Модальное окно заявки ---
    const modal = document.getElementById('modalRequest');
    const modalClose = modal.querySelector('.modal-close');
    const modalBackdrop = modal.querySelector('.modal-backdrop');
    const openModalBtn = document.querySelector('header .bottom-header button');
    const modalForm = modal.querySelector('.modal-form');
    const modalSpinner = modal.querySelector('.modal-spinner');
    const modalSuccess = modal.querySelector('.modal-success');

    function openModal() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        // Сброс состояния
        modalForm.style.display = '';
        modalSpinner.style.display = 'none';
        modalSuccess.style.display = 'none';
        modalForm.reset();
    }
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    openModalBtn.addEventListener('click', openModal);
    modalClose.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', closeModal);
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeModal();
    });

    // --- AJAX отправка формы в модалке ---
    modalForm.addEventListener('submit', function(e) {
        e.preventDefault();
        modalForm.style.display = 'none';
        modalSpinner.style.display = 'flex';
        modalSuccess.style.display = 'none';

        const formData = new FormData(modalForm);
        fetch(modalForm.action, {
            method: 'POST',
            body: formData
        })
        .then(res => res.ok ? res.json() : Promise.reject(res))
        .then(() => {
            modalSpinner.style.display = 'none';
            modalSuccess.style.display = 'flex';
        })
        .catch(() => {
            modalSpinner.style.display = 'none';
            modalSuccess.style.display = 'flex';
            modalSuccess.textContent = 'Произошла ошибка. Попробуйте ещё раз.';
        });
    });

    // Автозапуск первого видео в .works
    const worksFirstVideo = document.getElementById('mainWorkVideo');
    if (worksFirstVideo) {
        worksFirstVideo.muted = true;
        worksFirstVideo.play().catch(() => {});
    }

    // --- Кнопка включения звука на первом видео ---
    const unmuteBtn = document.getElementById('unmuteBtn');
    if (worksFirstVideo && unmuteBtn) {
        unmuteBtn.addEventListener('click', function() {
            worksFirstVideo.muted = false;
            worksFirstVideo.volume = 1;
            worksFirstVideo.play();
            unmuteBtn.classList.add('hidden');
        });
        // Если пользователь сам включил звук через controls
        worksFirstVideo.addEventListener('volumechange', function() {
            if (!worksFirstVideo.muted && worksFirstVideo.volume > 0) {
                unmuteBtn.classList.add('hidden');
            }
        });
    }

    // --- Фиксированная кнопка с таймером (wedding) ---
    (function() {
        const btnWrap = document.querySelector('.fixed-modal-btn-wrap-wedding');
        const timerEl = document.querySelector('.modal-timer-wedding');
        const btn = document.querySelector('.fixed-modal-btn-wedding');
        if (!btnWrap || !timerEl || !btn) return;
        let timeLeft = 10 * 60; // 10 минут в секундах
        function updateTimer() {
            const min = String(Math.floor(timeLeft / 60)).padStart(2, '0');
            const sec = String(timeLeft % 60).padStart(2, '0');
            timerEl.textContent = `${min}:${sec}`;
            if (timeLeft > 0) {
                timeLeft--;
            } else {
                timerEl.style.display = 'none';
                btn.textContent = 'Зафиксировать скидку 10%';
            }
        }
        updateTimer();
        const interval = setInterval(() => {
            updateTimer();
            if (timeLeft < 0) clearInterval(interval);
        }, 1000);
        // Открытие модального окна по клику
        btn.addEventListener('click', function() {
            const modal = document.getElementById('modalRequest');
            if (modal) {
                const modalForm = modal.querySelector('.modal-form');
                if (modalForm) {
                    const submitBtn = modalForm.querySelector('button[type="submit"]');
                    if (submitBtn) submitBtn.textContent = 'Зафиксировать скидку';
                }
            }
            if (typeof openModal === 'function') {
                openModal();
            } else {
                // fallback: клик по основной кнопке в header
                const openBtn = document.querySelector('header .bottom-header button');
                if (openBtn) openBtn.click();
            }
        });
        // Скрытие кнопки после успешной отправки формы
        const modal = document.getElementById('modalRequest');
        if (modal) {
            const modalForm = modal.querySelector('.modal-form');
            const modalSuccess = modal.querySelector('.modal-success');
            if (modalForm && modalSuccess) {
                const observer = new MutationObserver(() => {
                    if (modalSuccess.style.display !== 'none') {
                        btnWrap.style.display = 'none';
                    }
                });
                observer.observe(modalSuccess, { attributes: true, attributeFilter: ['style'] });
            }
        }
    })();

    // При обычном открытии модалки — возвращаем текст кнопки
    if (openModalBtn) {
        openModalBtn.addEventListener('click', function() {
            const modal = document.getElementById('modalRequest');
            if (modal) {
                const modalForm = modal.querySelector('.modal-form');
                if (modalForm) {
                    const submitBtn = modalForm.querySelector('button[type="submit"]');
                    if (submitBtn) submitBtn.textContent = 'Оставить заявку';
                }
            }
        });
    }

    // --- Модальное окно для скрина отзыва ---
    const reviewModal = document.getElementById('reviewModal');
    const reviewModalImg = document.getElementById('reviewModalImg');
    const reviewModalClose = document.querySelector('.review-modal-close');
    const reviewModalBackdrop = document.querySelector('.review-modal-backdrop');
    // Карта соответствия: номер отзыва -> путь к картинке
    const reviewScreens = {
        1: 'img/reviewScreen1.jpg',
        2: 'img/reviewScreen2.jpg',
        3: 'img/reviewScreen3.jpg',
        4: 'img/reviewScreen4.jpg',
        5: 'img/reviewScreen5.jpg',
        6: 'img/reviewScreen6.jpg',
    };
    // Присваиваем data-review-index всем .reviews-card (реальным и клонам)
    document.querySelectorAll('.reviews-flex .reviews-card').forEach((card, idx) => {
        // idx по порядку, но для клонов нужно вычислить реальный индекс
        // Считаем, что всего 5 отзывов (можно сделать динамически)
        const realCount = document.querySelectorAll('.reviews-flex .reviews-card:not(.clone)').length;
        let reviewIdx = idx;
        if (card.classList.contains('clone')) {
            // Клон в начале: idx < realCount ? последний : первый
            if (idx < realCount) reviewIdx = realCount;
            else reviewIdx = 1;
        } else {
            reviewIdx = idx + 1;
        }
        card.setAttribute('data-review-index', reviewIdx);
    });
    // Навесим обработчики на все .seeReview (и клоны тоже)
    document.querySelectorAll('.reviews-card .seeReview').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const card = btn.closest('.reviews-card');
            const num = Number(card.getAttribute('data-review-index'));
            if (reviewModal && reviewModalImg && reviewScreens[num]) {
                reviewModalImg.src = reviewScreens[num];
                reviewModal.classList.add('active');
                reviewModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Отдельный обработчик для отзыва Ольги (reviewScreen6.jpg)
    document.querySelectorAll('.reviews-card').forEach(card => {
        const textReview = card.querySelector('.textReview');
        const seeReviewBtn = card.querySelector('.seeReview');
        
        if (textReview && seeReviewBtn && textReview.textContent.includes('Мы остались в восторге!')) {
            // Это отзыв Ольги - добавляем специальный обработчик
            seeReviewBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                if (reviewModal && reviewModalImg) {
                    reviewModalImg.src = 'img/reviewScreen6.jpg';
                    reviewModal.classList.add('active');
                    reviewModal.style.display = 'flex';
                    document.body.style.overflow = 'hidden';
                }
            });
        }
    });
    function closeReviewModal() {
        if (reviewModal) {
            reviewModal.classList.remove('active');
            reviewModal.style.display = 'none';
            document.body.style.overflow = '';
            if (reviewModalImg) reviewModalImg.src = '';
        }
    }
    if (reviewModalClose) reviewModalClose.addEventListener('click', closeReviewModal);
    if (reviewModalBackdrop) reviewModalBackdrop.addEventListener('click', closeReviewModal);
    // Закрытие по клику вне окна
    if (reviewModal) {
        reviewModal.addEventListener('mousedown', function(e) {
            if (e.target === reviewModal) closeReviewModal();
        });
    }

    // --- Карусель "Примеры работ" ---
    const worksFlex = document.querySelector('.works-flex');
    const worksSlides = document.querySelectorAll('.works-slide');
    const worksDotsContainer = document.querySelector('.works-dots');
    const worksArrowPrev = document.querySelector('.works-arrow-prev');
    const worksArrowNext = document.querySelector('.works-arrow-next');
    // --- Бесшовный loop-слайдер для "Примеры работ" с 3 видимыми слайдами и кусками по краям ---
    // Клонируем первые и последние 2 слайда для seamless loop
    const VISIBLE_WORKS = 3;
    const CLONE_COUNT = VISIBLE_WORKS - 1; // по 2 куска слева и справа
    if (worksSlides.length > 1) {
        // Создаем клоны в правильном порядке для seamless loop
        // Слева должны быть клоны последних 2 слайдов (3, 1)
        // Справа должны быть клоны первых 2 слайдов (2, 3)
        
        // Клоны слева (последние 2 слайда)
        for (let i = 0; i < CLONE_COUNT; i++) {
            const cloneIndex = worksSlides.length - CLONE_COUNT + i; // последние 2 слайда
            const leftClone = worksSlides[cloneIndex].cloneNode(true);
            leftClone.classList.add('clone');
            worksFlex.insertBefore(leftClone, worksSlides[0]);
        }
        
        // Клоны справа (первые 2 слайда)
        for (let i = 0; i < CLONE_COUNT; i++) {
            const rightClone = worksSlides[i].cloneNode(true);
            rightClone.classList.add('clone');
            worksFlex.appendChild(rightClone);
        }
    }
    // Обновляем коллекцию слайдов
    let allWorksSlides = document.querySelectorAll('.works-slide');
    
    // Проверяем, мобильное ли устройство
    const isMobile = window.innerWidth <= 740;
    
    // На мобилке начинаем с третьего слайда, на десктопе со второго
    let worksCurrent = isMobile ? CLONE_COUNT + 2 : CLONE_COUNT + 1;
    
    const worksTotal = allWorksSlides.length - 2 * CLONE_COUNT; // без клонов
    let isWorksTransitioning = false; // Флаг для защиты от множественных кликов

    function renderWorksDots() {
        worksDotsContainer.innerHTML = '';
        for (let i = 0; i < worksTotal; i++) {
            const dot = document.createElement('span');
            dot.className = 'works-dot';
            dot.addEventListener('click', function() {
                if (!isWorksTransitioning) {
                    goToWorks(i + CLONE_COUNT); // +CLONE_COUNT, т.к. первый реальный слайд — индекс CLONE_COUNT
                } else {
                    // Если переход заблокирован, принудительно сбрасываем
                    setTimeout(() => {
                        isWorksTransitioning = false;
                        goToWorks(i + CLONE_COUNT);
                    }, 100);
                }
            });
            worksDotsContainer.appendChild(dot);
        }
    }
    function updateWorksDots() {
        const dots = worksDotsContainer.children;
        let activeIdx = worksCurrent - CLONE_COUNT;
        if (worksCurrent < CLONE_COUNT) activeIdx = worksTotal - 1;
        if (worksCurrent >= allWorksSlides.length - CLONE_COUNT) activeIdx = 0;
        for (let i = 0; i < dots.length; i++) {
            dots[i].classList.toggle('active', i === activeIdx);
        }
    }
    function setWorksTransition(val) {
        worksFlex.style.transition = val;
    }
    function goToWorks(idx) {
        if (isWorksTransitioning) {
            // Если переход заблокирован, принудительно сбрасываем через небольшую задержку
            setTimeout(() => {
                isWorksTransitioning = false;
                goToWorks(idx);
            }, 100);
            return;
        }
        
        isWorksTransitioning = true;
        setWorksTransition('transform 0.5s cubic-bezier(0.4,0,0.2,1)');
        worksCurrent = idx;
        const slideWidth = allWorksSlides[0].offsetWidth + 24;
        worksFlex.style.transform = `translateX(-${(idx - (VISIBLE_WORKS - 1)/2) * slideWidth}px)`;
        updateWorksDots();
    }
    // После анимации: если на клоне — мгновенно переключить на реальный
    worksFlex.addEventListener('transitionend', () => {
        if (worksCurrent < CLONE_COUNT) {
            setWorksTransition('none');
            worksCurrent = worksTotal + CLONE_COUNT - 1;
            const slideWidth = allWorksSlides[0].offsetWidth + 24;
            worksFlex.style.transform = `translateX(-${(worksCurrent - (VISIBLE_WORKS - 1)/2) * slideWidth}px)`;
            updateWorksDots();
        }
        if (worksCurrent >= allWorksSlides.length - CLONE_COUNT) {
            setWorksTransition('none');
            worksCurrent = CLONE_COUNT;
            const slideWidth = allWorksSlides[0].offsetWidth + 24;
            worksFlex.style.transform = `translateX(-${(worksCurrent - (VISIBLE_WORKS - 1)/2) * slideWidth}px)`;
            updateWorksDots();
        }
        isWorksTransitioning = false; // Разрешаем новые переходы
        
        // Управляем видео после завершения анимации на мобильных устройствах
        if (window.innerWidth <= 740) {
            manageVideosOnSlideChange();
        }
    });
    if (worksArrowPrev) worksArrowPrev.addEventListener('click', () => {
        if (!isWorksTransitioning) {
            goToWorks(worksCurrent - 1);
        } else {
            // Если переход заблокирован, принудительно сбрасываем
            setTimeout(() => {
                isWorksTransitioning = false;
                goToWorks(worksCurrent - 1);
            }, 100);
        }
    });
    if (worksArrowNext) worksArrowNext.addEventListener('click', () => {
        if (!isWorksTransitioning) {
            goToWorks(worksCurrent + 1);
        } else {
            // Если переход заблокирован, принудительно сбрасываем
            setTimeout(() => {
                isWorksTransitioning = false;
                goToWorks(worksCurrent + 1);
            }, 100);
        }
    });
    // Swipe logic
    let worksStartX = 0;
    let worksDragging = false;
    let worksDeltaX = 0;
    worksFlex.addEventListener('mousedown', e => {
        if (isWorksTransitioning) {
            // Если переход заблокирован, принудительно сбрасываем
            setTimeout(() => {
                isWorksTransitioning = false;
            }, 100);
            return;
        }
        // Универсальная проверка для всех интерактивных элементов внутри слайда
        if (e.target.closest('.play-btn, .mute-btn, .volume-btn, button, a')) return;
        worksDragging = true;
        worksStartX = e.clientX;
        setWorksTransition('none');
    });
    worksFlex.addEventListener('mousemove', e => {
        if (!worksDragging) return;
        worksDeltaX = e.clientX - worksStartX;
        const slideWidth = allWorksSlides[0].offsetWidth + 24;
        worksFlex.style.transform = `translateX(${-((worksCurrent - (VISIBLE_WORKS - 1)/2) * slideWidth) + worksDeltaX}px)`;
    });
    worksFlex.addEventListener('mouseup', () => {
        if (!worksDragging) return;
        setWorksTransition('transform 0.5s cubic-bezier(0.4,0,0.2,1)');
        if (Math.abs(worksDeltaX) > 50) {
            if (worksDeltaX < 0) goToWorks(worksCurrent + 1);
            else if (worksDeltaX > 0) goToWorks(worksCurrent - 1);
            else goToWorks(worksCurrent);
        } else goToWorks(worksCurrent);
        worksDragging = false;
        worksDeltaX = 0;
    });
    worksFlex.addEventListener('mouseleave', () => {
        if (worksDragging) {
            setWorksTransition('transform 0.5s cubic-bezier(0.4,0,0.2,1)');
            goToWorks(worksCurrent);
            worksDragging = false;
            worksDeltaX = 0;
        }
    });
    // Touch события для мобильных устройств
    worksFlex.addEventListener('touchstart', e => {
        if (isWorksTransitioning) {
            // Если переход заблокирован, принудительно сбрасываем
            setTimeout(() => {
                isWorksTransitioning = false;
            }, 100);
            return;
        }
        // Универсальная проверка для всех интерактивных элементов внутри слайда
        if (e.target.closest('.play-btn, .mute-btn, .volume-btn, button, a')) return;
        worksDragging = true;
        worksStartX = e.touches[0].clientX;
        setWorksTransition('none');
        
        // Предотвращаем скролл страницы во время свайпа
        e.preventDefault();
    }, { passive: false });
    
    worksFlex.addEventListener('touchmove', e => {
        if (!worksDragging) return;
        
        // Предотвращаем скролл страницы
        e.preventDefault();
        
        worksDeltaX = e.touches[0].clientX - worksStartX;
        const slideWidth = allWorksSlides[0].offsetWidth + 24;
        worksFlex.style.transform = `translateX(${-((worksCurrent - (VISIBLE_WORKS - 1)/2) * slideWidth) + worksDeltaX}px)`;
    }, { passive: false });
    
    worksFlex.addEventListener('touchend', e => {
        if (!worksDragging) return;
        
        setWorksTransition('transform 0.5s cubic-bezier(0.4,0,0.2,1)');
        
        // Уменьшаем порог для более чувствительных свайпов на мобильных
        const threshold = 30; // Было 50, стало 30
        
        if (Math.abs(worksDeltaX) > threshold) {
            if (worksDeltaX < 0) goToWorks(worksCurrent + 1);
            else if (worksDeltaX > 0) goToWorks(worksCurrent - 1);
            else goToWorks(worksCurrent);
        } else {
            // Возвращаемся к текущему слайду при недостаточном свайпе
            goToWorks(worksCurrent);
        }
        
        worksDragging = false;
        worksDeltaX = 0;
    });
    
    worksFlex.addEventListener('touchcancel', e => {
        if (worksDragging) {
            setWorksTransition('transform 0.5s cubic-bezier(0.4,0,0.2,1)');
            goToWorks(worksCurrent);
            worksDragging = false;
            worksDeltaX = 0;
        }
    });
    // Функция для пересчета позиций работ при изменении размера окна
    function recalculateWorksPositions() {
        if (isWorksTransitioning) return;
        
        // Пересчитываем позицию текущего слайда с новыми размерами
        const slideWidth = allWorksSlides[0].offsetWidth + 24;
        const newTransform = `translateX(-${(worksCurrent - (VISIBLE_WORKS - 1)/2) * slideWidth}px)`;
        
        // Применяем новую позицию без анимации
        setWorksTransition('none');
        worksFlex.style.transform = newTransform;
        
        // Восстанавливаем анимацию
        setTimeout(() => {
            setWorksTransition('transform 0.5s cubic-bezier(0.4,0,0.2,1)');
        }, 10);
    }

    // Слушатель изменения размера окна для работ
    let worksResizeTimeout;
    window.addEventListener('resize', function() {
        // Используем debounce для оптимизации производительности
        clearTimeout(worksResizeTimeout);
        worksResizeTimeout = setTimeout(() => {
            recalculateWorksPositions();
        }, 150); // Задержка 150мс
    });

    // Инициализация
    renderWorksDots();
    setWorksTransition('none');
    const slideWidth = allWorksSlides[0].offsetWidth + 24;
    worksFlex.style.transform = `translateX(-${(worksCurrent - (VISIBLE_WORKS - 1)/2) * slideWidth}px)`;
    updateWorksDots();

    // --- Функциональность кнопок play для видео в works ---
    function setupPlayButtons() {
        const allVideos = document.querySelectorAll('.works-slide video');
        const allPlayBtns = document.querySelectorAll('.works-slide .play-btn');
        
        // Создаем карту соответствия: клон -> оригинал
        const cloneToOriginalMap = new Map();
        const originalToClonesMap = new Map();
        
        // Находим соответствия между клонами и оригиналами
        document.querySelectorAll('.works-slide').forEach((slide, index) => {
            const video = slide.querySelector('video');
            if (slide.classList.contains('clone') && video) {
                // Определяем оригинал по содержимому видео (src)
                const videoSrc = video.src;
                let originalVideo = null;
                
                // Ищем оригинал с тем же src среди не-клонов
                document.querySelectorAll('.works-slide:not(.clone)').forEach(originalSlide => {
                    const origVideo = originalSlide.querySelector('video');
                    if (origVideo && origVideo.src === videoSrc) {
                        originalVideo = origVideo;
                    }
                });
                
                if (originalVideo) {
                    cloneToOriginalMap.set(video, originalVideo);
                    if (!originalToClonesMap.has(originalVideo)) {
                        originalToClonesMap.set(originalVideo, []);
                    }
                    originalToClonesMap.get(originalVideo).push(video);
                }
            }
        });
        
        document.querySelectorAll('.works-slide').forEach(slide => {
            const playBtn = slide.querySelector('.play-btn');
            const video = slide.querySelector('video');
            
            if (playBtn && video) {
                // Показываем кнопку изначально
                playBtn.style.display = 'block';
                playBtn.style.pointerEvents = 'auto';
                
                // Обработчик клика по кнопке play
                playBtn.addEventListener('click', function(e) {
                    // Предотвращаем конфликт со свайпами слайдера
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Ставим на паузу все остальные видео
                    allVideos.forEach(otherVideo => {
                        if (otherVideo !== video) {
                            otherVideo.pause();
                            // Также останавливаем связанные клоны/оригиналы
                            const relatedVideos = getRelatedVideos(otherVideo, cloneToOriginalMap, originalToClonesMap);
                            relatedVideos.forEach(relatedVideo => {
                                if (relatedVideo !== otherVideo) {
                                    relatedVideo.pause();
                                }
                            });
                        }
                    });
                    
                    // Показываем кнопки play для всех остальных видео
                    allPlayBtns.forEach(otherBtn => {
                        if (otherBtn !== playBtn) {
                            otherBtn.style.display = 'block';
                        }
                    });
                    
                    // Скрываем текущую кнопку и запускаем видео
                    playBtn.style.display = 'none';
                    
                    // Если это клон, синхронизируем с оригиналом
                    if (slide.classList.contains('clone')) {
                        const originalVideo = cloneToOriginalMap.get(video);
                        if (originalVideo) {
                            // Запускаем оригинал без звука
                            originalVideo.muted = true;
                            originalVideo.currentTime = video.currentTime;
                            originalVideo.play();
                            // Запускаем клон со звуком
                            video.play();
                        } else {
                            video.play();
                        }
                    } else {
                        // Если это оригинал, просто запускаем его (без синхронизации с клонами)
                        video.play();
                    }
                });
                
                // Синхронизация при воспроизведении (только для клонов)
                video.addEventListener('play', function() {
                    playBtn.style.display = 'none';
                    
                    // Синхронизируем связанные видео только если это клон
                    if (slide.classList.contains('clone')) {
                        const relatedVideos = getRelatedVideos(video, cloneToOriginalMap, originalToClonesMap);
                        relatedVideos.forEach(relatedVideo => {
                            if (relatedVideo !== video && relatedVideo.paused) {
                                relatedVideo.currentTime = video.currentTime;
                                relatedVideo.muted = true;
                                relatedVideo.play();
                            }
                        });
                    }
                });
                
                // Синхронизация при паузе
                video.addEventListener('pause', function() {
                    if (video.currentTime < video.duration) {
                        playBtn.style.display = 'block';
                    }
                    
                    // Останавливаем связанные видео
                    const relatedVideos = getRelatedVideos(video, cloneToOriginalMap, originalToClonesMap);
                    relatedVideos.forEach(relatedVideo => {
                        if (relatedVideo !== video) {
                            relatedVideo.pause();
                        }
                    });
                });
                
                // Синхронизация при изменении времени (только для клонов)
                video.addEventListener('timeupdate', function() {
                    if (slide.classList.contains('clone')) {
                        const relatedVideos = getRelatedVideos(video, cloneToOriginalMap, originalToClonesMap);
                        relatedVideos.forEach(relatedVideo => {
                            if (relatedVideo !== video && Math.abs(relatedVideo.currentTime - video.currentTime) > 0.1) {
                                relatedVideo.currentTime = video.currentTime;
                            }
                        });
                    }
                });
                
                // Показываем кнопку при окончании видео
                video.addEventListener('ended', function() {
                    playBtn.style.display = 'block';
                    
                    // Останавливаем связанные видео
                    const relatedVideos = getRelatedVideos(video, cloneToOriginalMap, originalToClonesMap);
                    relatedVideos.forEach(relatedVideo => {
                        if (relatedVideo !== video) {
                            relatedVideo.pause();
                            relatedVideo.currentTime = 0;
                        }
                    });
                    
                    // Сбрасываем состояние перехода, если оно заблокировано
                    if (isWorksTransitioning) {
                        setTimeout(() => {
                            isWorksTransitioning = false;
                        }, 100);
                    }
                });
            }
        });
        
        // Функция для получения связанных видео (клоны/оригиналы)
        function getRelatedVideos(video, cloneToOriginalMap, originalToClonesMap) {
            const related = [];
            
            // Если это клон, добавляем оригинал
            if (cloneToOriginalMap.has(video)) {
                related.push(cloneToOriginalMap.get(video));
            }
            
            // Если это оригинал, добавляем клоны
            if (originalToClonesMap.has(video)) {
                related.push(...originalToClonesMap.get(video));
            }
            
            return related;
        }
    }
    
    // Инициализируем кнопки play
    setupPlayButtons();
    
    // На мобильных устройствах запускаем видео на первом слайде
    if (window.innerWidth <= 740) {
        setTimeout(() => {
            manageVideosOnSlideChange();
        }, 500);
    }

    // Мобильная версия блока "Обо мне" - анимация при клике
    const aboutMeMobileText = document.getElementById('aboutMeMobileText');
    
    function setupAboutMeMobile() {
        if (aboutMeMobileText && window.innerWidth <= 740) {
            // Удаляем старый обработчик, если есть
            aboutMeMobileText.removeEventListener('click', toggleAboutMeMobile);
            // Добавляем новый обработчик
            aboutMeMobileText.addEventListener('click', toggleAboutMeMobile);
        } else if (aboutMeMobileText && window.innerWidth > 740) {
            // Убираем обработчик на десктопе
            aboutMeMobileText.removeEventListener('click', toggleAboutMeMobile);
            aboutMeMobileText.classList.remove('expanded', 'sliding-up', 'sliding-down');
        }
    }
    
    function toggleAboutMeMobile() {
        const element = this;
        
        if (element.classList.contains('expanded')) {
            // Скрываем блок
            element.classList.remove('expanded');
            element.classList.add('sliding-down');
            
            // Убираем класс анимации после завершения
            setTimeout(() => {
                element.classList.remove('sliding-down');
            }, 500);
        } else {
            // Показываем блок
            element.classList.add('sliding-up');
            
            // Добавляем класс expanded после завершения анимации
            setTimeout(() => {
                element.classList.remove('sliding-up');
                element.classList.add('expanded');
            }, 500);
        }
    }
    
    // Функция управления видео на мобильных устройствах
    function manageVideosOnSlideChange() {
        // Работаем только на мобильных устройствах
        if (window.innerWidth > 740) return;

        const allVideos = document.querySelectorAll('.works-slide video');
        const allSlides = document.querySelectorAll('.works-slide');

        // Определяем видимый слайд по его реальному положению на экране
        let visibleSlide = null;
        let visibleVideo = null;

        allSlides.forEach((slide, index) => {
            const rect = slide.getBoundingClientRect();
            const slideCenter = rect.left + rect.width / 2;
            const screenCenter = window.innerWidth / 2;
            
            // Если центр слайда находится в центре экрана (с небольшим допуском)
            if (Math.abs(slideCenter - screenCenter) < rect.width / 2) {
                visibleSlide = slide;
                visibleVideo = slide.querySelector('video');
            }
        });

        // Останавливаем все видео
        allVideos.forEach(video => {
            if (video !== visibleVideo) {
                video.pause();
                video.currentTime = 0;
            }
        });

        // Если есть видимое видео, запускаем его
        if (visibleVideo) {
            // Небольшая задержка для плавности
            setTimeout(() => {
                visibleVideo.currentTime = 0;
                visibleVideo.play().catch(e => {
                    // Игнорируем ошибки автовоспроизведения
                    console.log('Автовоспроизведение заблокировано браузером');
                });
            }, 100);
        }
    }
    
    // Инициализируем при загрузке
    setupAboutMeMobile();
    
    // Обновляем при изменении размера окна
    window.addEventListener('resize', () => {
        setupAboutMeMobile();
        
        // Если переключились на мобильную версию, запускаем видео на текущем слайде
        if (window.innerWidth <= 740) {
            setTimeout(() => {
                manageVideosOnSlideChange();
            }, 100);
        }
    });
});
