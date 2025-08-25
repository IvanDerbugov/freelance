$(".multiple-items").slick({
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    
    responsive: [
      {
        breakpoint: 1350,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 1050,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      }
    ]
  });

// Добавляем слушатель события resize для автоматического перестроения карусели
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // Перестраиваем карусель при изменении размера экрана
        $(".multiple-items").slick('setPosition');
    }, 250); // Задержка 250мс для оптимизации производительности
});

// Дополнительно слушаем событие orientationchange для мобильных устройств
window.addEventListener('orientationchange', function() {
    setTimeout(function() {
        $(".multiple-items").slick('setPosition');
    }, 500); // Увеличенная задержка для ориентации
});