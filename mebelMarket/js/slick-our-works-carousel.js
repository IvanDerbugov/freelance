$(".multiple-items").slick({
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    
    responsive: [
      {
        breakpoint: 1400,
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



// Дополнительно делаем то же самое после полной загрузки страницы
$(window).on('load', function() {
    setTimeout(function() {
        // Снова листаем вправо и обратно для гарантии
        $(".multiple-items").slick('slickNext');
        
        setTimeout(function() {
            $(".multiple-items").slick('slickGoTo', 0);
            
            // И еще раз нажимаем кнопку влево
            setTimeout(function() {
                $(".multiple-items").slick('slickPrev');
            }, 500);
        }, 50);
    }, 200);
});

// Добавляем слушатель события resize для автоматического перестроения карусели
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // При изменении размера тоже делаем листание туда-сюда
        $(".multiple-items").slick('slickNext');
        setTimeout(function() {
            $(".multiple-items").slick('slickGoTo', 0);
            
            // И еще раз нажимаем кнопку влево
            setTimeout(function() {
                $(".multiple-items").slick('slickPrev');
            }, 50);
        }, 50);
    }, 250);
});

// Дополнительно слушаем событие orientationchange для мобильных устройств
window.addEventListener('orientationchange', function() {
    setTimeout(function() {
        $(".multiple-items").slick('slickNext');
        setTimeout(function() {
            $(".multiple-items").slick('slickGoTo', 0);
            
            // И еще раз нажимаем кнопку влево
            setTimeout(function() {
                $(".multiple-items").slick('slickPrev');
            }, 50);
        }, 500);
    });
});