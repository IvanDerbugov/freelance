// slick-carousel.js - Инициализация Slick карусели для "Распродажа месяца"

$(document).ready(function(){
    // Проверяем количество карточек
    const totalCards = $('.slick-carousel .cardBestWorks').length;
    console.log('Найдено карточек:', totalCards);
    
    // Инициализация карусели "Распродажа месяца"
    $('.slick-carousel').slick({
        dots: false,                    // Отключаем точки
        infinite: false,                // Отключаем бесконечную прокрутку
        speed: 300,                     // Скорость анимации
        slidesToShow: 3,               // Показываем 3 карточки по умолчанию
        slidesToScroll: 1,             // Прокручиваем по 1 карточке
        arrows: true,                   // Показываем стрелки
        prevArrow: '<button type="button" class="slick-prev carousel-arrow prev"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" /></svg></button>',
        nextArrow: '<button type="button" class="slick-next carousel-arrow next"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" /></svg></button>',
        adaptiveHeight: false,          // Фиксированная высота
        centerMode: false,              // Центрирование отключено
        variableWidth: false,           // Фиксированная ширина
        useCSS: true,                   // Используем CSS анимации
        useTransform: true,             // Используем CSS transform
        touchMove: true,                // Разрешаем свайп
        swipe: true,                    // Разрешаем свайп
        edgeFriction: 0.15,            // Сопротивление на краях
        
        lazyLoad: 'ondemand',           // Ленивая загрузка изображений
        fade: false,                    // Отключаем эффект затухания
        cssEase: 'ease-out',           // Тип анимации
        rtl: false,                     // Направление слева направо
        rows: 1,                        // Количество рядов
        slidesPerRow: 1,                // Слайдов в ряду
        focusOnSelect: false,           // Фокус на выбранном слайде
        centerPadding: '0px',           // Отступы по центру
        asNavFor: null,                 // Синхронизация с другой каруселью
                 autoplay: false,                // Автопрокрутка отключена
         autoplaySpeed: 3000,            // Скорость автопрокрутки
         pauseOnHover: true,             // Пауза при наведении
         pauseOnFocus: true,             // Пауза при фокусе
         accessibility: true,             // Доступность
        responsive: true,               // Включаем адаптивность
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 4,  /* Показываем 4 карточки на больших экранах */
                    slidesToScroll: 1,
                    arrows: true,
                    centerMode: false,
                    centerPadding: '0px',
                    variableWidth: false,
                    adaptiveHeight: false
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,  /* Показываем 4 карточки на средних экранах */
                    slidesToScroll: 1,
                    arrows: true,
                    centerMode: false,
                    centerPadding: '0px',
                    variableWidth: false,
                    adaptiveHeight: false
                }
            },
            {
                breakpoint: 1100,
                settings: {
                    slidesToShow: 3,  /* Показываем 3 карточки на планшетах */
                    slidesToScroll: 1,
                    arrows: true,
                    centerMode: false,
                    centerPadding: '0px',
                    variableWidth: false,
                    adaptiveHeight: false
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,  /* Показываем 2 карточки на планшетах */
                    slidesToScroll: 1,
                    arrows: true,
                    centerMode: false,
                    centerPadding: '0px',
                    variableWidth: false,
                    adaptiveHeight: false
                }
            },
            {
                breakpoint: 850,
                settings: {
                    slidesToShow: 3,  /* Показываем 3 карточки на средних планшетах */
                    slidesToScroll: 1,
                    arrows: true,
                    centerMode: false,
                    centerPadding: '0px',
                    variableWidth: false,
                    adaptiveHeight: false
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows: true
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: true
                }
            }
        ]
    });

    // Специальная настройка для точного позиционирования
    $('.slick-carousel').on('init', function(event, slick){
        // Принудительно устанавливаем точное позиционирование
        const totalSlides = slick.slideCount;
        const slidesToShow = slick.options.slidesToShow;
        
        // Вычисляем максимальное количество прокруток
        const maxScrolls = Math.ceil(totalSlides / slidesToShow);
        console.log('Всего слайдов:', totalSlides);
        console.log('Показываем слайдов:', slidesToShow);
        console.log('Максимум прокруток:', maxScrolls);
        
        // Устанавливаем точное позиционирование
        $(this).slick('slickGoTo', 0);
        
        // Вычисляем точные значения translate3d для разных экранов
        calculateExactTransform(slick);
        
        // ПРИНУДИТЕЛЬНО пересоздаём карусель с правильными настройками для 1400px
        if (window.innerWidth >= 1400) {
            console.log('ПРИНУДИТЕЛЬНО пересоздаём карусель для 1400px');
            setTimeout(() => {
                $('.slick-carousel').slick('unslick');
                $('.slick-carousel').slick({
                    dots: false,
                    infinite: false,
                    speed: 300,
                    slidesToShow: 4,  // ПРИНУДИТЕЛЬНО 4 карточки
                    slidesToScroll: 1,
                    arrows: true,
                    prevArrow: '<button type="button" class="slick-prev carousel-arrow prev"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" /></svg></button>',
                    nextArrow: '<button type="button" class="slick-next carousel-arrow next"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" /></svg></button>',
                    adaptiveHeight: false,
                    centerMode: false,
                    variableWidth: false,
                    useCSS: true,
                    useTransform: true,
                    touchMove: true,
                    swipe: true,
                    edgeFriction: 0.15
                });
                
                // После пересоздания устанавливаем правильный transform
                setTimeout(() => {
                    const newSlick = $('.slick-carousel').slick('getSlick');
                    if (newSlick) {
                        forceCorrectTransform(newSlick);
                    }
                }, 100);
            }, 500);
        }
    });

    // Добавляем класс для стилизации стрелок Slick
    $('.slick-carousel').on('init', function(event, slick){
        console.log('Slick инициализирован');
        console.log('Всего слайдов:', slick.slideCount);
        console.log('Показываем слайдов:', slick.options.slidesToShow);
        
        // Добавляем классы для стилизации
        $(this).find('.slick-prev').addClass('carousel-arrow prev');
        $(this).find('.slick-next').addClass('carousel-arrow next');
    });

    // Обновляем стили стрелок после инициализации
    $('.slick-carousel').on('afterChange', function(event, slick, currentSlide){
        console.log('Слайд изменен на:', currentSlide);
        console.log('Максимальный слайд:', slick.slideCount - slick.options.slidesToShow);
        
        // Обновляем состояние стрелок
        const $prevBtn = $(this).find('.slick-prev');
        const $nextBtn = $(this).find('.slick-next');
        
        // Отключаем кнопку "Назад" на первом слайде
        if (currentSlide === 0) {
            $prevBtn.prop('disabled', true).addClass('disabled');
        } else {
            $prevBtn.prop('disabled', false).removeClass('disabled');
        }
        
        // Отключаем кнопку "Вперед" на последнем слайде
        const maxSlide = slick.slideCount - slick.options.slidesToShow;
        if (currentSlide >= maxSlide) {
            $nextBtn.prop('disabled', true).addClass('disabled');
        } else {
            $nextBtn.prop('disabled', false).removeClass('disabled');
        }
    });

    // Инициализируем состояние стрелок
    $('.slick-carousel').on('init', function(event, slick){
        const $prevBtn = $(this).find('.slick-prev');
        $prevBtn.prop('disabled', true).addClass('disabled');
    });

    console.log('Slick карусель "Распродажа месяца" инициализирована');
    
    // Дополнительная отладка
    setTimeout(() => {
        const slickInstance = $('.slick-carousel').slick('getSlick');
        console.log('Slick instance:', slickInstance);
        console.log('Current slide:', slickInstance.currentSlide);
        console.log('Total slides:', slickInstance.slideCount);
        console.log('Slides to show:', slickInstance.options.slidesToShow);
        
        // Проверяем, что все слайды доступны
        $('.slick-carousel .slick-slide').each(function(index) {
            console.log(`Слайд ${index}:`, $(this).find('.cardBestWorks').length > 0 ? 'содержит карточку' : 'пустой');
        });
        
        // Пересчитываем transform после полной загрузки
        calculateExactTransform(slickInstance);
    }, 1000);
    
    // Функция для вычисления точного translate3d
    function calculateExactTransform(slick) {
        const windowWidth = window.innerWidth;
        const totalSlides = slick.slideCount;
        
        let slidesToShow, slideWidth, gap;
        
        // Определяем параметры в зависимости от ширины экрана
        if (windowWidth >= 1400) {
            slidesToShow = 4;
            slideWidth = 25; // 25% от ширины контейнера для 4 карточек
            gap = 15; // 15px отступ между слайдами
        } else if (windowWidth >= 1200) {
            slidesToShow = 4;
            slideWidth = 25;
            gap = 15;
        } else if (windowWidth >= 1100) {
            slidesToShow = 3;
            slideWidth = 33.333;
            gap = 20;
        } else if (windowWidth >= 992) {
            slidesToShow = 3;
            slideWidth = 30;
            gap = 15;
        } else if (windowWidth >= 850) {
            slidesToShow = 3;
            slideWidth = 50;
            gap = 20;
        } else if (windowWidth >= 768) {
            slidesToShow = 2;
            slideWidth = 50;
            gap = 15;
        } else {
            slidesToShow = 1;
            slideWidth = 100;
            gap = 10;
        }
        
        // Вычисляем максимальное количество прокруток
        const maxScrolls = Math.ceil(totalSlides / slidesToShow);
        
        // Вычисляем точную ширину слайда в пикселях
        const containerWidth = $('.best-works-container').width();
        const slideWidthPx = (containerWidth * slideWidth / 100) + gap;
        
        // Вычисляем максимальный translate3d
        const maxTranslate3d = (maxScrolls - 1) * slideWidthPx;
        
        console.log('=== РАСЧЁТ TRANSFORM ===');
        console.log('Ширина окна:', windowWidth);
        console.log('Показываем слайдов:', slidesToShow);
        console.log('Ширина слайда (%):', slideWidth);
        console.log('Ширина слайда (px):', slideWidthPx);
        console.log('Максимум прокруток:', maxScrolls);
        console.log('Максимальный translate3d:', maxTranslate3d);
        console.log('========================');
        
                 // ПРИНУДИТЕЛЬНО устанавливаем начальную позицию на первый слайд
         slick.slickGoTo(0);
         
         // ПРИНУДИТЕЛЬНО устанавливаем transform в 0 для первого слайда
         setTimeout(() => {
             const track = $('.slick-track');
             track.css('transform', 'translate3d(0px, 0px, 0px)');
             console.log('Установлен начальный transform: translate3d(0px, 0px, 0px)');
         }, 100);
        
                 // Специальная настройка для 1400px - устанавливаем только ширину track
         if (windowWidth >= 1400) {
             // Для 1400px с 4 карточками и 10 слайдами
             const containerWidth = $('.best-works-container').width();
             const cardWidth = containerWidth * 0.25; // 25% от ширины контейнера
             const gap = 15;
             const totalCardWidth = cardWidth + gap;
             
             console.log('=== СПЕЦИАЛЬНЫЙ РАСЧЁТ ДЛЯ 1400px ===');
             console.log('Ширина контейнера:', containerWidth);
             console.log('Ширина карточки:', cardWidth);
             console.log('Отступ:', gap);
             console.log('Общая ширина карточки + отступ:', totalCardWidth);
             console.log('========================================');
             
             // Устанавливаем только ширину track, НЕ transform
             setTimeout(() => {
                 const track = $('.slick-track');
                 const totalWidth = 10 * totalCardWidth; // 10 карточек
                 track.css('width', `${totalWidth}px`);
                 console.log('Установлена ширина track для 1400px:', totalWidth);
             }, 200);
         } else if (windowWidth >= 992) {
             // Специальная настройка для 992px - устанавливаем только ширину track
             // Для 992px с 2 карточками и 10 слайдами
             const containerWidth = $('.best-works-container').width();
             const cardWidth = containerWidth * 0.5; // 50% от ширины контейнера
             const gap = 15;
             const totalCardWidth = cardWidth + gap;
             
             console.log('=== СПЕЦИАЛЬНЫЙ РАСЧЁТ ДЛЯ 992px ===');
             console.log('Ширина контейнера:', containerWidth);
             console.log('Ширина карточки:', cardWidth);
             console.log('Отступ:', gap);
             console.log('Общая ширина карточки + отступ:', totalCardWidth);
             console.log('========================================');
             
             // Устанавливаем только ширину track, НЕ transform
             setTimeout(() => {
                 const track = $('.slick-track');
                 const totalWidth = 10 * totalCardWidth; // 10 карточек
                 track.css('width', `${totalWidth}px`);
                 console.log('Установлена ширина track для 992px:', totalWidth);
             }, 200);
         }
    }
    
         // Функция для ПРИНУДИТЕЛЬНОЙ установки правильного transform
     function forceCorrectTransform(slick) {
         const windowWidth = window.innerWidth;
         
         if (windowWidth >= 1400) {
             // Для 1400px: 10 карточек, показываем 4
             const containerWidth = $('.best-works-container').width();
             const cardWidth = containerWidth * 0.25; // 25%
             const gap = 15;
             const totalCardWidth = cardWidth + gap;
             
             console.log('=== ПРИНУДИТЕЛЬНАЯ УСТАНОВКА TRANSFORM ===');
             console.log('Ширина контейнера:', containerWidth);
             console.log('Ширина карточки:', cardWidth);
             console.log('Отступ:', gap);
             console.log('Общая ширина карточки + отступ:', totalCardWidth);
             console.log('==========================================');
             
             // Устанавливаем правильную ширину track для 10 карточек
             const totalWidth = 10 * totalCardWidth; // 10 карточек
             const track = $('.slick-track');
             track.css('width', `${totalWidth}px`);
             console.log('Установлена ширина track:', totalWidth);
             
             // НЕ устанавливаем transform - карусель должна начинаться с первого слайда
             console.log('Transform оставлен в начальной позиции (первый слайд)');
         } else if (windowWidth >= 992) {
             // Для 992px: 10 карточек, показываем 2
             const containerWidth = $('.best-works-container').width();
             const cardWidth = containerWidth * 0.5; // 50%
             const gap = 15;
             const totalCardWidth = cardWidth + gap;
             
             console.log('=== ПРИНУДИТЕЛЬНАЯ УСТАНОВКА TRANSFORM ДЛЯ 992px ===');
             console.log('Ширина контейнера:', containerWidth);
             console.log('Ширина карточки:', cardWidth);
             console.log('Отступ:', gap);
             console.log('Общая ширина карточки + отступ:', totalCardWidth);
             console.log('==========================================');
             
             // Устанавливаем правильную ширину track для 10 карточек
             const totalWidth = 10 * totalCardWidth; // 10 карточек
             const track = $('.slick-track');
             track.css('width', `${totalWidth}px`);
             console.log('Установлена ширина track для 992px:', totalWidth);
             
             // НЕ устанавливаем transform - карусель должна начинаться с первого слайда
             console.log('Transform оставлен в начальной позиции (первый слайд)');
         }
     }
    
    // Обработчик изменения размера окна для пересчёта transform
    $(window).on('resize', function() {
        setTimeout(() => {
            const slickInstance = $('.slick-carousel').slick('getSlick');
            if (slickInstance) {
                calculateExactTransform(slickInstance);
            }
        }, 300);
    });
});
