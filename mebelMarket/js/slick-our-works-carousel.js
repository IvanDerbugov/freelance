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
          infinite: false,
          dots: true
        }
      },
      {
        breakpoint: 1050,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: false,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
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
// let resizeTimer;
// window.addEventListener('resize', function() {
//     clearTimeout(resizeTimer);
//     resizeTimer = setTimeout(function() {
//         // При изменении размера тоже делаем листание туда-сюда
//         $(".multiple-items").slick('slickNext');
//         setTimeout(function() {
//             $(".multiple-items").slick('slickGoTo', 0);
            
//             // И еще раз нажимаем кнопку влево
//             setTimeout(function() {
//                 $(".multiple-items").slick('slickPrev');
//             }, 50);
//         }, 50);
//     }, 250);
// });

// Добавляем слушатель изменения масштаба страницы
let zoomTimer;
window.addEventListener('wheel', function(e) {
    // Проверяем, что это изменение масштаба (Ctrl + колесо мыши)
    if (e.ctrlKey) {
        clearTimeout(zoomTimer);
        zoomTimer = setTimeout(function() {
            // При изменении масштаба перестраиваем карусель
            $(".multiple-items").slick('slickNext');
            setTimeout(function() {
                $(".multiple-items").slick('slickGoTo', 0);
                
                setTimeout(function() {
                    $(".multiple-items").slick('slickPrev');
                }, 50);
            }, 50);
        }, 300); // Задержка для завершения изменения масштаба
    }
});

// Добавляем слушатель изменения viewport (видимой ширины контента)
let viewportTimer;
let lastViewportWidth = window.innerWidth;

// Функция для проверки изменения viewport
function checkViewportChange() {
    const currentViewportWidth = window.innerWidth;
    
    // Если ширина viewport изменилась, перестраиваем карусель
    if (currentViewportWidth !== lastViewportWidth) {
        lastViewportWidth = currentViewportWidth;
        
        clearTimeout(viewportTimer);
        viewportTimer = setTimeout(function() {
            // При изменении viewport перестраиваем карусель
            $(".multiple-items").slick('slickNext');
            setTimeout(function() {
                $(".multiple-items").slick('slickGoTo', 0);
                
                setTimeout(function() {
                    $(".multiple-items").slick('slickPrev');
                }, 50);
            }, 50);
        }, 200);
    }
}

// Проверяем изменения viewport каждые 100мс
// setInterval(checkViewportChange, 100);

// Добавляем слушатель для изменения масштаба через жесты на мобильных
// let gestureTimer;
// window.addEventListener('gesturestart', function() {
//     clearTimeout(gestureTimer);
// });

// window.addEventListener('gestureend', function() {
//     gestureTimer = setTimeout(function() {
//         // При завершении жеста изменения масштаба перестраиваем карусель
//         $(".multiple-items").slick('slickNext');
//         setTimeout(function() {
//             $(".multiple-items").slick('slickGoTo', 0);
            
//             setTimeout(function() {
//                 $(".multiple-items").slick('slickPrev');
//             }, 50);
//         }, 50);
//     }, 300);
// });

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