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
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    arrows: true
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    arrows: true
                }
            },
            {
                breakpoint: 1100,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    arrows: true
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows: true
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
    }, 1000);
});
