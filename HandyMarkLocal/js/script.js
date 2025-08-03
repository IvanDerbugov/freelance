// Создание бегущей строки
document.addEventListener('DOMContentLoaded', function() {
    const marqueeContainer = document.querySelector('.orange-bar-content');
    
    // Удаляем первый span (шаблон)
    marqueeContainer.innerHTML = '';
    
    // Создаем 1000 спанов
    for (let i = 0; i < 1000; i++) {
        const span = document.createElement('span');
        span.textContent = 'HandyMark';
        marqueeContainer.appendChild(span);
    }
}); 



// Services - плавная анимация с задержкой для мобильных
document.getElementById('arrowSeeMoreServices').addEventListener('click', function() {
    const additionalServiceCards = document.querySelectorAll('.services-card:nth-child(n+6)');
    const arrow = document.getElementById('arrowSeeMoreServices');
    
    // Проверяем текущее состояние по первому дополнительному сервису
    if (additionalServiceCards[0] && additionalServiceCards[0].style.opacity === '1') {
        // Если карточки показаны - скрываем их с задержкой
        additionalServiceCards.forEach((card, index) => {
            setTimeout(() => {
                // Сначала добавляем класс для анимации скрытия
                card.classList.add('hiding');
                // Затем скрываем после завершения анимации
                setTimeout(() => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    card.style.pointerEvents = 'none';
                    card.style.maxHeight = '0';
                    card.style.overflow = 'hidden';
                    card.style.margin = '0';
                    card.style.padding = '0';
                    card.classList.remove('hiding');
                }, 300); // Время анимации
            }, index * 30);
        });
        arrow.style.transform = 'rotate(180deg)'; // Поворачиваем на 180° когда скрываем (показываем, что можно развернуть)
    } else {
        // Если карточки скрыты - показываем их с задержкой
        additionalServiceCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
                card.style.pointerEvents = 'auto';
                card.style.maxHeight = 'none';
                card.style.overflow = 'visible';
                card.style.margin = '';
                card.style.padding = '';
            }, index * 50);
        });
        arrow.style.transform = 'rotate(0deg)'; // Возвращаем в исходное положение когда показываем
    }
});

// Before & After - плавная анимация с задержкой
document.getElementById('arrowSeeMore').addEventListener('click', function() {
    const isSmallMobile = window.innerWidth <= 600;
    const arrow = document.getElementById('arrowSeeMore');
    
    if (isSmallMobile) {
        // На мобильных устройствах показываем карточки 5-6 (которые скрыты CSS)
        const additionalBeforeAfterCards = document.querySelectorAll('.BeforeAfter-card:nth-child(n+5)');
        const hiddenBeforeAfterCards = document.querySelectorAll('.BeforeAfter-card-hidden');
        
        // Проверяем текущее состояние по первой дополнительной карточке
        if (additionalBeforeAfterCards[0] && additionalBeforeAfterCards[0].style.opacity === '1') {
            // Если карточки показаны - скрываем их с задержкой
            additionalBeforeAfterCards.forEach((card, index) => {
                setTimeout(() => {
                    // Сначала добавляем класс для анимации скрытия
                    card.classList.add('hiding');
                    // Затем скрываем после завершения анимации
                    setTimeout(() => {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        card.style.pointerEvents = 'none';
                        card.style.maxHeight = '0';
                        card.style.overflow = 'hidden';
                        card.style.margin = '0';
                        card.style.padding = '0';
                        card.classList.remove('hiding');
                    }, 300); // Время анимации
                }, index * 30);
            });
            hiddenBeforeAfterCards.forEach((card, index) => {
                setTimeout(() => {
                    // Сначала добавляем класс для анимации скрытия
                    card.classList.add('hiding');
                    // Затем скрываем после завершения анимации
                    setTimeout(() => {
                        card.style.display = 'none';
                        card.classList.remove('hiding');
                    }, 300); // Время анимации
                }, (additionalBeforeAfterCards.length + index) * 30);
            });
            arrow.style.transform = 'rotate(0deg)'; // Стрелка в исходном положении когда скрываем
        } else {
            // Если карточки скрыты CSS - показываем их с задержкой
            additionalBeforeAfterCards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                    card.style.pointerEvents = 'auto';
                    card.style.maxHeight = 'none';
                    card.style.overflow = 'visible';
                    card.style.margin = '';
                    card.style.padding = '';
                }, index * 50);
            });
            hiddenBeforeAfterCards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.display = 'block';
                }, (additionalBeforeAfterCards.length + index) * 50);
            });
            arrow.style.transform = 'rotate(180deg)'; // Поворачиваем на 180° когда показываем
        }
    } else {
        // На больших экранах показываем только скрытые карточки (7+)
        const beforeAfterCards = document.querySelectorAll('.BeforeAfter-card-hidden');
        
        // Проверяем текущее состояние
        if (beforeAfterCards[0].style.display === 'block') {
            // Если карточки показаны - скрываем их с задержкой
            beforeAfterCards.forEach((card, index) => {
                setTimeout(() => {
                    // Сначала добавляем класс для анимации скрытия
                    card.classList.add('hiding');
                    // Затем скрываем после завершения анимации
                    setTimeout(() => {
                        card.style.display = 'none';
                        card.classList.remove('hiding');
                    }, 300); // Время анимации
                }, index * 30);
            });
            arrow.style.transform = 'rotate(0deg)';
        } else {
            // Если карточки скрыты - показываем их с задержкой
            beforeAfterCards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.display = 'block';
                }, index * 50);
            });
            arrow.style.transform = 'rotate(180deg)';
        }
    }
});


// Reviews - обработка кликов на "learn more"
document.addEventListener('DOMContentLoaded', function() {
    const learnMoreButtons = document.querySelectorAll('.learnMore');
    
    learnMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const reviewCard = this.closest('.reviews-card');
            const shortText = reviewCard.querySelector('.review-text-short');
            const fullText = reviewCard.querySelector('.review-text-full');
            const arrow = this.querySelector('svg');
            
            if (fullText.style.display === 'none') {
                // Показываем полный отзыв
                shortText.style.display = 'none';
                fullText.style.display = 'block';
                this.classList.add('toBottom');
                arrow.style.transform = 'rotate(180deg)';
            } else {
                // Показываем короткий отзыв
                shortText.style.display = 'block';
                fullText.style.display = 'none';
                this.classList.remove('toBottom');
                arrow.style.transform = 'rotate(0deg)';
            }
        });
    });
    
    // Инициализация состояния отзывов при загрузке
    const isMobile = window.innerWidth <= 1000;
    const isSmallMobile = window.innerWidth <= 600;
    const additionalReviewCards = document.querySelectorAll('.reviews-card:nth-child(n+3):not(.reviews-card-hidden)');
    const hiddenReviewCards = document.querySelectorAll('.reviews-card-hidden');
    const arrow = document.getElementById('arrowSeeMoreReviews');
    
    // Инициализация состояния сервисов при загрузке
    const additionalServiceCards = document.querySelectorAll('.services-card:nth-child(n+6)');
    const servicesArrow = document.getElementById('arrowSeeMoreServices');
    
    // Инициализация состояния Before & After при загрузке
    const additionalBeforeAfterCards = document.querySelectorAll('.BeforeAfter-card:nth-child(n+5)');
    const hiddenBeforeAfterCards = document.querySelectorAll('.BeforeAfter-card-hidden');
    const beforeAfterArrow = document.getElementById('arrowSeeMore');
    
    if (isMobile) {
        // На мобильных устройствах НЕ устанавливаем inline стили для отзывов 3-6
        // Они будут скрыты CSS медиазапросом через opacity, transform и max-height
        additionalReviewCards.forEach(card => {
            // Убираем любые inline стили, чтобы CSS медиазапрос работал
            card.style.removeProperty('opacity');
            card.style.removeProperty('transform');
            card.style.removeProperty('pointer-events');
            card.style.removeProperty('max-height');
            card.style.removeProperty('overflow');
            card.style.removeProperty('margin');
            card.style.removeProperty('padding');
        });
        // Скрываем полностью скрытые отзывы (7-12)
        hiddenReviewCards.forEach(card => {
            card.style.display = 'none';
        });
        arrow.style.transform = 'rotate(0deg)';
    } else {
        // На десктопе показываем все видимые отзывы (1-6), скрываем только полностью скрытые (7-12)
        additionalReviewCards.forEach(card => {
            card.style.display = 'block';
        });
        hiddenReviewCards.forEach(card => {
            card.style.display = 'none';
        });
        arrow.style.transform = 'rotate(0deg)';
    }
    
    // Инициализация сервисов
    if (isSmallMobile) {
        // На мобильных устройствах НЕ устанавливаем inline стили для сервисов 6-9
        // Они будут скрыты CSS медиазапросом через opacity, transform и max-height
        additionalServiceCards.forEach(card => {
            // Убираем любые inline стили, чтобы CSS медиазапрос работал
            card.style.removeProperty('opacity');
            card.style.removeProperty('transform');
            card.style.removeProperty('pointer-events');
            card.style.removeProperty('max-height');
            card.style.removeProperty('overflow');
            card.style.removeProperty('margin');
            card.style.removeProperty('padding');
        });
        servicesArrow.style.transform = 'rotate(180deg)'; // Стрелка повёрнута на 180° когда карточки скрыты
    } else {
        // На больших экранах показываем все сервисы
        additionalServiceCards.forEach(card => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            card.style.pointerEvents = 'auto';
            card.style.maxHeight = 'none';
            card.style.overflow = 'visible';
            card.style.margin = '';
            card.style.padding = '';
        });
        servicesArrow.style.transform = 'rotate(0deg)'; // Стрелка в исходном положении когда все показаны
    }
    
    // Инициализация Before & After
    if (isSmallMobile) {
        // На мобильных устройствах НЕ устанавливаем inline стили для карточек 5-6
        // Они будут скрыты CSS медиазапросом через opacity, transform и max-height
        additionalBeforeAfterCards.forEach(card => {
            // Убираем любые inline стили, чтобы CSS медиазапрос работал
            card.style.removeProperty('opacity');
            card.style.removeProperty('transform');
            card.style.removeProperty('pointer-events');
            card.style.removeProperty('max-height');
            card.style.removeProperty('overflow');
            card.style.removeProperty('margin');
            card.style.removeProperty('padding');
        });
        // Скрываем полностью скрытые карточки (7+)
        hiddenBeforeAfterCards.forEach(card => {
            card.style.display = 'none';
        });
        beforeAfterArrow.style.transform = 'rotate(0deg)'; // Стрелка в исходном положении когда карточки скрыты
    } else {
        // На больших экранах показываем все карточки 1-6, скрываем только полностью скрытые (7+)
        additionalBeforeAfterCards.forEach(card => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            card.style.pointerEvents = 'auto';
            card.style.maxHeight = 'none';
            card.style.overflow = 'visible';
            card.style.margin = '';
            card.style.padding = '';
        });
        hiddenBeforeAfterCards.forEach(card => {
            card.style.display = 'none';
        });
        beforeAfterArrow.style.transform = 'rotate(180deg)'; // Стрелка повёрнута на 180° когда все показаны
    }
});

// Reviews - разворачивание скрытых карточек с плавной анимацией
document.getElementById('arrowSeeMoreReviews').addEventListener('click', function() {
    const arrow = document.getElementById('arrowSeeMoreReviews');
    const isMobile = window.innerWidth <= 1000;
    
    if (isMobile) {
        // На мобильных устройствах показываем отзывы 3-6 (которые скрыты CSS)
        const additionalReviewCards = document.querySelectorAll('.reviews-card:nth-child(n+3):not(.reviews-card-hidden)');
        const hiddenReviewCards = document.querySelectorAll('.reviews-card-hidden');
        
        // Проверяем текущее состояние по первому дополнительному отзыву
        // На мобильных проверяем, есть ли inline стиль opacity: 1 (показан)
        if (additionalReviewCards[0] && additionalReviewCards[0].style.opacity === '1') {
            // Если карточки показаны - скрываем их с задержкой
            additionalReviewCards.forEach((card, index) => {
                setTimeout(() => {
                    // Сначала добавляем класс для анимации скрытия
                    card.classList.add('hiding');
                    // Затем скрываем после завершения анимации
                    setTimeout(() => {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        card.style.pointerEvents = 'none';
                        card.style.maxHeight = '0';
                        card.style.overflow = 'hidden';
                        card.style.margin = '0';
                        card.style.padding = '0';
                        card.classList.remove('hiding');
                    }, 300); // Время анимации
                }, index * 30);
            });
            hiddenReviewCards.forEach((card, index) => {
                setTimeout(() => {
                    // Сначала добавляем класс для анимации скрытия
                    card.classList.add('hiding');
                    // Затем скрываем после завершения анимации
                    setTimeout(() => {
                        card.style.display = 'none';
                        card.classList.remove('hiding');
                    }, 300); // Время анимации
                }, (additionalReviewCards.length + index) * 30);
            });
            arrow.style.transform = 'rotate(0deg)';
        } else {
            // Если карточки скрыты CSS - показываем их с задержкой
            additionalReviewCards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                    card.style.pointerEvents = 'auto';
                    card.style.maxHeight = 'none';
                    card.style.overflow = 'visible';
                    card.style.margin = '';
                    card.style.padding = '32px';
                }, index * 50);
            });
            hiddenReviewCards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.display = 'block';
                }, (additionalReviewCards.length + index) * 50);
            });
            arrow.style.transform = 'rotate(180deg)';
        }
    } else {
        // На десктопе показываем только скрытые отзывы (7-12)
        const hiddenReviewCards = document.querySelectorAll('.reviews-card-hidden');
        
        // Проверяем текущее состояние
        if (hiddenReviewCards[0] && hiddenReviewCards[0].style.display === 'block') {
            // Если карточки показаны - скрываем их с задержкой
            hiddenReviewCards.forEach((card, index) => {
                setTimeout(() => {
                    // Сначала добавляем класс для анимации скрытия
                    card.classList.add('hiding');
                    // Затем скрываем после завершения анимации
                    setTimeout(() => {
                        card.style.display = 'none';
                        card.classList.remove('hiding');
                    }, 300); // Время анимации
                }, index * 30);
            });
            arrow.style.transform = 'rotate(0deg)';
        } else {
            // Если карточки скрыты - показываем их с задержкой
            hiddenReviewCards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.display = 'block';
                }, index * 50);
            });
            arrow.style.transform = 'rotate(180deg)';
        }
    }
});

// Обработчик изменения размера окна для корректной работы отзывов и сервисов
window.addEventListener('resize', function() {
    const isMobile = window.innerWidth <= 1000;
    const isSmallMobile = window.innerWidth <= 600;
    const additionalReviewCards = document.querySelectorAll('.reviews-card:nth-child(n+3):not(.reviews-card-hidden)');
    const hiddenReviewCards = document.querySelectorAll('.reviews-card-hidden');
    const arrow = document.getElementById('arrowSeeMoreReviews');
    const additionalServiceCards = document.querySelectorAll('.services-card:nth-child(n+6)');
    const servicesArrow = document.getElementById('arrowSeeMoreServices');
    const additionalBeforeAfterCards = document.querySelectorAll('.BeforeAfter-card:nth-child(n+5)');
    const hiddenBeforeAfterCards = document.querySelectorAll('.BeforeAfter-card-hidden');
    const beforeAfterArrow = document.getElementById('arrowSeeMore');
    
    if (isMobile) {
        // При переходе на мобильную версию убираем inline стили
        // CSS медиазапрос сам скроет отзывы 3-6
        additionalReviewCards.forEach(card => {
            // Убираем любые inline стили, чтобы CSS медиазапрос работал
            card.style.removeProperty('opacity');
            card.style.removeProperty('transform');
            card.style.removeProperty('pointer-events');
            card.style.removeProperty('max-height');
            card.style.removeProperty('overflow');
            card.style.removeProperty('margin');
            card.style.removeProperty('padding');
        });
        hiddenReviewCards.forEach(card => {
            card.style.display = 'none';
        });
        arrow.style.transform = 'rotate(0deg)';
    } else {
        // При переходе на десктоп показываем дополнительные отзывы
        additionalReviewCards.forEach(card => {
            card.style.display = 'block';
        });
        hiddenReviewCards.forEach(card => {
            card.style.display = 'none';
        });
        arrow.style.transform = 'rotate(0deg)';
    }
    
    // Обработка сервисов при изменении размера окна
    if (isSmallMobile) {
        // При переходе на мобильную версию убираем inline стили
        // CSS медиазапрос сам скроет сервисы 6-9
        additionalServiceCards.forEach(card => {
            // Убираем любые inline стили, чтобы CSS медиазапрос работал
            card.style.removeProperty('opacity');
            card.style.removeProperty('transform');
            card.style.removeProperty('pointer-events');
            card.style.removeProperty('max-height');
            card.style.removeProperty('overflow');
            card.style.removeProperty('margin');
            card.style.removeProperty('padding');
        });
        servicesArrow.style.transform = 'rotate(180deg)'; // Стрелка повёрнута на 180° когда карточки скрыты
    } else {
        // При переходе на большие экраны показываем все сервисы
        additionalServiceCards.forEach(card => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            card.style.pointerEvents = 'auto';
            card.style.maxHeight = 'none';
            card.style.overflow = 'visible';
            card.style.margin = '';
            card.style.padding = '';
        });
        servicesArrow.style.transform = 'rotate(0deg)'; // Стрелка в исходном положении когда все показаны
    }
    
    // Обработка Before & After при изменении размера окна
    if (isSmallMobile) {
        // При переходе на мобильную версию убираем inline стили
        // CSS медиазапрос сам скроет карточки 5-6
        additionalBeforeAfterCards.forEach(card => {
            // Убираем любые inline стили, чтобы CSS медиазапрос работал
            card.style.removeProperty('opacity');
            card.style.removeProperty('transform');
            card.style.removeProperty('pointer-events');
            card.style.removeProperty('max-height');
            card.style.removeProperty('overflow');
            card.style.removeProperty('margin');
            card.style.removeProperty('padding');
        });
        hiddenBeforeAfterCards.forEach(card => {
            card.style.display = 'none';
        });
        beforeAfterArrow.style.transform = 'rotate(0deg)'; // Стрелка в исходном положении когда карточки скрыты
    } else {
        // При переходе на большие экраны показываем все карточки 1-6
        additionalBeforeAfterCards.forEach(card => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            card.style.pointerEvents = 'auto';
            card.style.maxHeight = 'none';
            card.style.overflow = 'visible';
            card.style.margin = '';
            card.style.padding = '';
        });
        hiddenBeforeAfterCards.forEach(card => {
            card.style.display = 'none';
        });
        beforeAfterArrow.style.transform = 'rotate(180deg)'; // Стрелка повёрнута на 180° когда все показаны
    }
});






